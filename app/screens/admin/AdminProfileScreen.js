import React, { useState, useEffect } from 'react';
import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import AppBar from '../../components/AppBar';
import AppTextButton from '../../components/commom/AppTextButton';
import LoadingModal from "../../components/commom/LoadingModal";

// config
import Colors from '../../config/Colors';
import { updateUser } from '../../services/UserServices';

function AdminProfileScreen(props) {

    const [indicator, setIndicator] = useState(false)
    const [profileImage, setProfileImage] = useState(false)
    const [userDetails, setUserDetails] = useState(
        {
            id: 0,
            name: "Full Name",
            address: "Address",
            aboutUser: "About",
            picture: null,
            skills: []
        }
    )

    const uploadImages = async (evetnType) => {

        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert("Permission to access camera roll is required!");
                return;
            }

            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 0.6
            });

            const { uri } = pickerResult;

            setProfileImage(uri)
            setIndicator(true)
            await updateUser(userDetails.id, userDetails, [uri], ['profilePicture'])
        } catch (error) {

        }
        setIndicator(false)
    }

    let getCurrentUser = async () => {
        try {
            let res = await AsyncStorage.getItem('user');
            res = JSON.parse(res)
            // console.log(res)
            setUserDetails(res)
            setProfileImage(res.pictures.profilePicture)
        } catch (error) {
            console.log("Admin Profile: ", error)
        }
    }

    const editDetail = () => {
        props.navigation.navigate('AdminProfileInfo');
    }

    useEffect(() => {
        getCurrentUser();
    }, [props.route.params])

    return (
        <View>
            <AppBar {...props} menu={false} title="Admin Profile" backAction={"AdminDashboard"} />

            <LoadingModal show={indicator} />

            {/* Image container */}
            <View style={styles.container}>
                <View style={{ marginTop: RFPercentage(4) }} >
                    <TouchableOpacity onPress={() => uploadImages()} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', width: RFPercentage(23), height: RFPercentage(23), borderWidth: 1, borderColor: Colors.mediumGrey, borderRadius: 10 }} >
                        {profileImage ?
                            <Image width={RFPercentage(23)} height={RFPercentage(23)} style={{ width: RFPercentage(23), height: RFPercentage(23), borderRadius: 10 }} source={{ uri: profileImage }} /> :
                            <Text style={{ fontSize: RFPercentage(3.5), color: Colors.grey }} >Upload</Text>
                        }
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: RFPercentage(6), flexDirection: 'row', width: "80%", justifyContent: 'center', alignItems: "center" }} >
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: "flex-start" }} >
                        <Text style={{ fontSize: RFPercentage(3.2), color: Colors.primary, fontWeight: Platform.OS === "android" ? "bold" : "600" }} >{userDetails.name}</Text>
                        <Text>{userDetails.address}</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: "center" }} >
                        <AppTextButton
                            name="Edit Details"
                            textStyle={{ fontSize: RFPercentage(2) }}
                            height={RFPercentage(5)}
                            onSubmit={() => editDetail()}
                        />
                    </View>
                </View>
                <View style={{ marginTop: RFPercentage(3), flexDirection: 'row', width: "80%", justifyContent: 'flex-start', alignItems: "center" }} >
                    <Text style={{ color: Colors.grey, fontSize: RFPercentage(2.3) }} >{userDetails.aboutUser}</Text>
                </View>
                <View style={{ backfaceVisibility: Colors.light, marginTop: RFPercentage(5), flexDirection: 'column', width: "80%", justifyContent: 'center', alignItems: "flex-start" }} >
                    <Text style={{ fontSize: RFPercentage(3.2), color: Colors.primary, fontWeight: Platform.OS === "android" ? "bold" : "600" }} >Skills</Text>

                    <FlatList
                        style={{ marginTop: RFPercentage(1), width: "100%" }}
                        numColumns={3}
                        data={userDetails.skills}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <View style={{ margin: RFPercentage(1), marginBottom: 0, marginLeft: 0, padding: RFPercentage(0.5), paddingLeft: RFPercentage(2), paddingRight: RFPercentage(2), borderRadius: 10, borderWidth: 1, borderColor: Colors.secondaryLight }} >
                                <Text style={{ maxWidth: RFPercentage(10), fontSize: RFPercentage(2.2), fontWeight: "bold", color: Colors.primaryLight }} >{item}</Text>
                            </View>
                        }
                    />

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginRight: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AdminProfileScreen;