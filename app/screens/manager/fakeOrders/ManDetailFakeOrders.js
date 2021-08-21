import React, { useState } from 'react';
import { useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components
import AppBar from '../../../components/AppBar';

// config
import Colors from '../../../config/Colors';

function ManDetailFakeOrders(props) {

    const [detail, setDetail] = useState(
        {
            id: 0,
            clientName: "",
            budget: "",
            employee: ''
        }
    );

    const getOrderDetails = async () => {
        try {
            let tempobj = props.route.params.item;
            setDetail(tempobj)
        } catch (error) {

        }
    }

    useEffect(() => {
        getOrderDetails()
    }, [props.route.params])

    return (
        <View style={{ flex: 1 }} >
            <AppBar {...props} menu={false} title="Fake Order Detail" backAction={"ManFakeOrders"} />
            <View style={styles.container}>
                <View style={{ marginTop: RFPercentage(3), width: "85%", alignItems: "center" }} >
                    <Text style={{ color: Colors.primary, fontSize: Platform.OS === "ios" ? RFPercentage(3.2) : RFPercentage(4.3) }} >Order Details</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{ width: "80%", flex: 1 }} >
                    {/* Text feilds */}
                    <View style={{ marginTop: RFPercentage(5), width: "100%", marginLeft: RFPercentage(2) }} >
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }} >
                            <Text style={{ width: "50%", fontSize: RFPercentage(2.7), fontWeight: Platform.OS === 'android' ? "bold" : "600" }} >Order Name</Text>
                            <Text style={{ width: "50%", fontSize: RFPercentage(2.7) }} >{detail.clientName}</Text>
                        </View>
                        <View style={{ marginTop: RFPercentage(2), flexDirection: "row", justifyContent: "space-around" }} >
                            <Text style={{ width: "50%", fontSize: RFPercentage(2.7), fontWeight: Platform.OS === 'android' ? "bold" : "600" }} >Order Price</Text>
                            <Text style={{ width: "50%", fontSize: RFPercentage(2.7) }} >${detail.budget}</Text>
                        </View>
                        <View style={{ marginTop: RFPercentage(2), flexDirection: "row", justifyContent: "space-around" }} >
                            <Text style={{ width: "50%", fontSize: RFPercentage(2.7), fontWeight: Platform.OS === 'android' ? "bold" : "600" }} >Employee Name</Text>
                            <Text style={{ width: "50%", fontSize: RFPercentage(2.7) }} >{detail.employee}</Text>
                        </View>
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

export default ManDetailFakeOrders;