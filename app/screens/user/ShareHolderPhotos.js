import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import AppBar from '../../components/AppBar';
import AppTextButton from '../../components/commom/AppTextButton';
import LoadingModal from "../../components/commom/LoadingModal";

// config
import Colors from '../../config/Colors';

// services
import { updateUser } from '../../services/UserServices';

function ShareHolderPhotos(props) {
    const [indicator, setIndicator] = useState(false)
    const [cnicFront, setCnicFront] = useState(false)
    const [cnicBack, setCnicBack] = useState(false)
    const [agreementForm, setAgreementForm] = useState(false)

    const uploadImages = async (eventType) => {
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

            if (eventType === "cnicFront") {
                setCnicFront(uri);
            } else if (eventType === 'cnicBack') {
                setCnicBack(uri);
            } else {
                setAgreementForm(uri);
            }

        } catch (error) {
            console.log("Image selection error: ", error);
            alert("Image not selected");
        }
    }

    const handleUpdatePhotos = async () => {
        setIndicator(true)
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user)
        try {
            await updateUser(user.id, user, [cnicFront, cnicBack, agreementForm], ['cnicFront', 'cnicBack', 'agreementForm'])
            props.navigation.navigate('ShareHolderInfo')
        } catch (error) {
            console.log("porfile pictures: ", error)
        }
        setIndicator(false)
    }

    const getLatesPictures = async () => {
        if (props.route.params.user) {
            const user = props.route.params.user;
            setCnicFront(user.cnicFront)
            setCnicBack(user.cnicBack)
            setAgreementForm(user.agreementForm)
            console.log(user)
        }
    }

    useEffect(() => {
        getLatesPictures()
    }, [props.route.params])

    return (
        <View>
            <AppBar {...props} menu={false} title="Profile" backAction={"ProfileScreen"} />
            <LoadingModal show={indicator} />
            <View style={styles.container}>
                {/* Image containers */}
                <View style={{ marginTop: RFPercentage(4) }} >
                    <TouchableOpacity onPress={() => uploadImages('cnicFront')} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', width: RFPercentage(33), height: RFPercentage(22), borderWidth: 1, borderColor: Colors.mediumGrey, borderRadius: 10 }} >
                        {cnicFront ?
                            <Image resizeMode="contain" width={RFPercentage(22)} height={RFPercentage(22)} style={{ width: RFPercentage(33), height: RFPercentage(22), borderRadius: 10 }} source={{ uri: cnicFront }} /> :
                            <Text style={{ fontSize: RFPercentage(2.6), color: Colors.grey }} >Upload CNIC Front</Text>
                        }
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: RFPercentage(2) }} >
                    <TouchableOpacity onPress={() => uploadImages('cnicBack')} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', width: RFPercentage(33), height: RFPercentage(22), borderWidth: 1, borderColor: Colors.mediumGrey, borderRadius: 10 }} >
                        {cnicBack ?
                            <Image resizeMode="contain" width={RFPercentage(22)} height={RFPercentage(22)} style={{ width: RFPercentage(33), height: RFPercentage(22), borderRadius: 10 }} source={{ uri: cnicBack }} /> :
                            <Text style={{ fontSize: RFPercentage(2.6), color: Colors.grey }} >Upload CNIC Back</Text>
                        }
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: RFPercentage(2) }} >
                    <TouchableOpacity onPress={() => uploadImages()} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', width: RFPercentage(33), height: RFPercentage(22), borderWidth: 1, borderColor: Colors.mediumGrey, borderRadius: 10 }} >
                        {agreementForm ?
                            <Image resizeMode="contain" width={RFPercentage(22)} height={RFPercentage(22)} style={{ width: RFPercentage(33), height: RFPercentage(22), borderRadius: 10 }} source={{ uri: agreementForm }} /> :
                            <Text style={{ fontSize: RFPercentage(2.6), color: Colors.grey }} >Upload Agreement Form</Text>
                        }
                    </TouchableOpacity>
                </View>

                {(cnicFront && cnicBack && agreementForm)
                    ? <View style={{ marginTop: RFPercentage(4), flexDirection: "row", justifyContent: "space-between" }} >
                        <AppTextButton
                            buttonStyle={{ marginRight: RFPercentage(2) }}
                            name="Skip"
                            width={RFPercentage(15)}
                            backgroundColor={Colors.secondary}
                            onSubmit={() => props.navigation.navigate('ShareHolderInfo')}
                        />
                        <AppTextButton
                            name="Next"
                            width={RFPercentage(15)}
                            onSubmit={() => handleUpdatePhotos()}
                        />
                    </View> : null
                }
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

export default ShareHolderPhotos;