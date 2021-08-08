import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase"
import "firebase/firestore"
import uuid from "uuid";

import { firebaseConfig } from "../config/Db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();

const userRef = firestore.collection('user')

const uploadImage = async (uri) => {
    try {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const ref = firebase.storage().ref().child(uuid.v4());
        const snapshot = await ref.put(blob);

        // We're done with the blob, close and release it
        blob.close();
        return await snapshot.ref.getDownloadURL()
    } catch (error) {
        console.log("upload image error: ", error)
    }
}

export const loginUser = async (email, password) => {
    const snapshot = await userRef.where('email', '==', email).where('password', '==', password).get();
    if (snapshot.empty) {
        return false;
    }

    let res = {}
    snapshot.forEach(doc => {
        res = doc.data()
        res.id = doc.id
    });

    return res
}

export const updateUser = async (id, userInfo2, uri = [false], picturesNames = []) => {
    try {
        let userInfo = { ...userInfo2 };
        if (uri[0]) {
            let pictures = {};
            for (let i = 0; i < picturesNames.length; i++) {
                let imgUrl = await uploadImage(uri[i]);
                pictures[picturesNames[i]] = imgUrl;
            }
            userInfo.pictures = { ...userInfo.pictures, ...pictures }
        }
        await userRef.doc(id).update(userInfo)
        const snapshot = await userRef.where('email', '==', userInfo.email).where('password', '==', userInfo.password).get();
        if (snapshot.empty) {
            return false;
        }

        let res = {}
        snapshot.forEach(doc => {
            res = doc.data()
            res.id = doc.id
        });

        await AsyncStorage.removeItem('user')
        await AsyncStorage.setItem('user', JSON.stringify(res))
        return res

    } catch (error) {
        console.log("false: ", error)
        return false
    }
}

export const getUserRef = () => {
    return userRef;
}