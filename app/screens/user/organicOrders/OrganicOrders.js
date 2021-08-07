import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from "@expo/vector-icons"

// components
import AppBar from '../../../components/AppBar';
import AppTextButton from '../../../components/commom/AppTextButton';

// config
import Colors from '../../../config/Colors';
import { getOrderRef, getOrders } from '../../../services/OrderServices';
import { useEffect } from 'react';

function OrganicOrders(props) {

    const [organicOrders, setOrganicOrders] = useState([])

    const handleOrganicOrder = async () => {
        try {
            const orderRef = getOrderRef();
            orderRef.onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(async (change) => {
                    let orderRes = await getOrders();
                    if (orderRes) {
                        setOrganicOrders(orderRes)
                    }
                })
            })

        } catch (error) {

        }
    }

    useEffect(() => {
        handleOrganicOrder()
    }, [])

    return (
        <View style={{ backgroundColor: Colors.white, flex: 1 }} >
            <AppBar {...props} menu={false} title="Organic Orders" backAction={"UserDashboard"} />
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: "80%", flex: 1 }} >
                    {organicOrders.map((item, index) => (
                        <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetail')} activeOpacity={0.4} key={index} style={{ justifyContent: "space-between", flexDirection: 'row', marginTop: RFPercentage(3), padding: RFPercentage(1), borderBottomWidth: 1, borderBottomColor: Colors.lightGrey }} >
                            <Text style={{ fontSize: RFPercentage(3), color: Colors.primary }} >{item.clientName}</Text>
                            <MaterialCommunityIcons size={RFPercentage(3)} color={Colors.primary} name="chevron-right" />
                        </TouchableOpacity>
                    ))}

                    {/* Add Order button */}
                    <View style={{ marginBottom: RFPercentage(4), width: "100%", marginTop: RFPercentage(5), justifyContent: 'center', alignItems: 'center' }} >
                        <AppTextButton
                            name="Add Organic Order"
                            borderRadius={RFPercentage(1.3)}
                            onSubmit={() => handleOrganicOrder()}
                            backgroundColor={Colors.primary}
                            width="80%"
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
        backgroundColor: Colors.white,
        marginTop: RFPercentage(2),
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrganicOrders;