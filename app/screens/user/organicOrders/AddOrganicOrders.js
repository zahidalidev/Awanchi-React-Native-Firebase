import React, { useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker';

// components
import AppBar from '../../../components/AppBar';
import AppTextButton from '../../../components/commom/AppTextButton';
import AppTextInput from '../../../components/commom/AppTextInput';
import LoadingModal from "../../../components/commom/LoadingModal";

// services
import { AddOrder } from "../../../services/OrderServices"

// config
import Colors from '../../../config/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddOrganicOrders(props) {

    const [indicator, setIndicator] = useState(false);
    const [orderImage, setOrderImage] = useState(false)

    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "Client Name",
            value: '',
        },
        {
            id: 1,
            placeHolder: "Budget in $",
            value: '',
        },
        {
            id: 2,
            placeHolder: "Country",
            value: '',
        },
    ]);

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

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

            setOrderImage(uri)
        } catch (error) {

        }
    }

    const handleAddOrganicOrder = async () => {
        try {
            setIndicator(true);
            let user = await AsyncStorage.getItem('user');
            user = JSON.parse(user);
            const body = {
                clientName: feilds[0].value,
                budget: feilds[1].value,
                country: feilds[2].value,
                userId: user.id,
                status: "accepted",
                type: "organic",
                date: new Date()
            }
            await AddOrder(body, orderImage);
            setIndicator(false)
            props.navigation.navigate('OrganicOrders')
        } catch (error) {
            console.log("Add Organic Order Error: ", error)
        }
        setIndicator(false)
    }

    return (
        <View style={{ flex: 1 }} >
            <AppBar {...props} menu={false} title="Add Organic Orders" backAction={"OrganicOrders"} />

            <LoadingModal show={indicator} />

            <View style={styles.container}>
                <View style={{ marginTop: RFPercentage(3), width: "85%", alignItems: "center" }} >
                    <Text style={{ color: Colors.primary, fontSize: Platform.OS === "ios" ? RFPercentage(3.2) : RFPercentage(4.3) }} >Order Details</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{ width: "80%", flex: 1 }} >
                    {/* Text feilds */}
                    {feilds.map((item, i) =>
                        <View key={i} style={{ marginTop: i == 0 ? RFPercentage(5) : RFPercentage(3), width: "100%" }} >
                            <AppTextInput
                                placeHolder={item.placeHolder}
                                width="100%"
                                value={item.value}
                                onChange={(text) => handleChange(text, item.id)}
                                secure={item.secure}
                            />
                        </View>
                    )}

                    <View style={{ marginTop: RFPercentage(4), width: "100%", justifyContent: "center", alignItems: 'center' }} >
                        <TouchableOpacity onPress={() => uploadImages()} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', width: RFPercentage(25), height: RFPercentage(23), borderWidth: 1, borderColor: Colors.mediumGrey, borderRadius: 10 }} >
                            {orderImage ?
                                <Image width={RFPercentage(23)} height={RFPercentage(23)} style={{ width: RFPercentage(25), height: RFPercentage(23), borderRadius: 10 }} source={{ uri: orderImage }} /> :
                                <Text style={{ fontSize: RFPercentage(2.8), color: Colors.grey }} >Order Screenshot</Text>
                            }
                        </TouchableOpacity>
                    </View>

                    {/* Add Order button */}
                    <View style={{ marginBottom: RFPercentage(4), width: "100%", marginTop: RFPercentage(5), justifyContent: 'center', alignItems: 'center' }} >
                        <AppTextButton
                            name="Add Order"
                            borderRadius={RFPercentage(1.3)}
                            onSubmit={() => handleAddOrganicOrder()}
                            backgroundColor={Colors.primary}
                            width="50%"
                            height={RFPercentage(5.5)}
                        />
                    </View>
                </ScrollView>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: RFPercentage(2),
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AddOrganicOrders;