import React, { useState } from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker';

// components
import AppBar from '../../components/AppBar';

// config
import Colors from '../../config/Colors';

function OrderDetail(props) {
    const [profileImage, setProfileImage] = useState('https://www.sidehustlenation.com/wp-content/uploads/2015/02/10k-day-on-fiverr.png')

    const [orderDetails, setOrderDetails] = useState({
        name: "John",
        orderPrice: "400",
        status: "accepted",
        country: "USA"
    })

    return (
        <View style={{ backgroundColor: Colors.white, flex: 1 }} >
            <AppBar {...props} menu={false} title="Order Detail" backAction={"UserDashboard"} />
            <View style={styles.container}>
                <View style={{ marginTop: RFPercentage(4) }} >
                    <TouchableOpacity activeOpacity={1} style={{ justifyContent: "center", alignItems: 'center', width: RFPercentage(30), height: RFPercentage(30), borderWidth: 1, borderColor: Colors.mediumGrey, borderRadius: 10 }} >
                        {profileImage ?
                            <Image resizeMode="contain" width={RFPercentage(30)} height={RFPercentage(30)} style={{ width: RFPercentage(30), height: RFPercentage(30), borderRadius: 10 }} source={{ uri: profileImage }} /> :
                            <Text style={{ fontSize: RFPercentage(3.5), color: Colors.grey }} >Empty</Text>
                        }
                    </TouchableOpacity>
                </View>

                <View style={{ marginLeft: "10%", marginTop: RFPercentage(6), flexDirection: 'column', width: "85%", justifyContent: 'center', alignItems: "center" }} >
                    <View style={{ flexDirection: "row", width: "100%", justifyContent: 'space-between', alignItems: "center" }} >
                        <Text style={{ width: "40%", fontSize: RFPercentage(3.2), color: Colors.primary, fontWeight: Platform.OS === "android" ? "bold" : "600" }} >Name</Text>
                        <Text style={{ width: "40%", fontSize: RFPercentage(2.8) }} >{orderDetails.name}</Text>
                    </View>
                    <View style={{ marginTop: RFPercentage(2), flexDirection: "row", width: "100%", justifyContent: 'space-between', alignItems: "center" }} >
                        <Text style={{ width: "40%", fontSize: RFPercentage(3.2), color: Colors.primary, fontWeight: Platform.OS === "android" ? "bold" : "600" }} >Order Price</Text>
                        <Text style={{ width: "40%", fontSize: RFPercentage(2.8) }} >{orderDetails.orderPrice}</Text>
                    </View>
                    <View style={{ marginTop: RFPercentage(2), flexDirection: "row", width: "100%", justifyContent: 'space-between', alignItems: "center" }} >
                        <Text style={{ width: "40%", fontSize: RFPercentage(3.2), color: Colors.primary, fontWeight: Platform.OS === "android" ? "bold" : "600" }} >Status</Text>
                        <Text style={{ width: "40%", fontSize: RFPercentage(2.8) }} >{orderDetails.status}</Text>
                    </View>
                    <View style={{ marginTop: RFPercentage(2), flexDirection: "row", width: "100%", justifyContent: 'space-between', alignItems: "center" }} >
                        <Text style={{ width: "40%", fontSize: RFPercentage(3.2), color: Colors.primary, fontWeight: Platform.OS === "android" ? "bold" : "600" }} >Country</Text>
                        <Text style={{ width: "40%", fontSize: RFPercentage(2.8) }} >{orderDetails.country}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    }
})

export default OrderDetail;