import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase"
import "firebase/firestore"
import uuid from "uuid";

import { firebaseConfig } from "../config/Db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();

const orderRef = firestore.collection('order')

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

export const AddOrder = async (body, uri) => {
    let body2 = { ...body };
    body2.orderPicture = await uploadImage(uri);
    await orderRef.add(body2);
}

export const getOrderRef = () => {
    return orderRef;
}

export const getOrders = async (type) => {
    const snapshot = await orderRef.where('type', '==', type).get();
    if (snapshot.empty) {
        return false;
    }

    let res = []
    snapshot.forEach(doc => {
        let tempRes = doc.data()
        tempRes.docId = doc.id
        res.push(tempRes)
    });

    return res;
}