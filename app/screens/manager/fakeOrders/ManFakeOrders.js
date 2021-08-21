import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons"

// components
import AppBar from '../../../components/AppBar';
import AppTextButton from '../../../components/commom/AppTextButton';

// config
import Colors from '../../../config/Colors';
import { useEffect } from 'react';
import { getManOrders, getOrderRef } from '../../../services/OrderServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '../../../components/commom/LoadingModal';

function ManFakeOrders(props) {

    const [indicator, setIndicator] = useState();
    const [fakeOrders, setFakeOrders] = useState([])

    const handleFakeOrder = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            user = JSON.parse(user);
            const orderRef = getOrderRef();
            orderRef.onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(async (change) => {
                    setIndicator(true);
                    let orderRes = await getManOrders('fake', user.id);
                    if (orderRes) {
                        setFakeOrders(orderRes)
                    }
                    setIndicator(false);
                })
            })

        } catch (error) {

        }
        setIndicator(false);
    }

    useEffect(() => {
        handleFakeOrder()
    }, [])

    const handleAddOrganicOrder = () => {
        props.navigation.navigate('ManAddFakeOrders')
    }

    return (
        <View style={{ backgroundColor: Colors.white, flex: 1 }} >
            <AppBar {...props} menu={false} title="Fake Orders" backAction={"ManagerDashboard"} />
            <View style={styles.container}>
                <LoadingModal show={indicator} />
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: "80%", flex: 1 }} >
                    {fakeOrders.map((item, index) => (
                        <View activeOpacity={0.4} key={index} style={{ justifyContent: "space-between", flexDirection: 'row', marginTop: RFPercentage(3), padding: RFPercentage(1), borderBottomWidth: 1, borderBottomColor: Colors.lightGrey }} >
                            <Text style={{ fontSize: RFPercentage(3), color: Colors.primary }} >{item.clientName}</Text>
                            <View style={{ flexDirection: "row", width: "25%", justifyContent: "space-between" }} >
                                <TouchableOpacity onPress={() => props.navigation.navigate('ManUpdateFakeOrders', { item: item })} >
                                    <Feather size={RFPercentage(3)} color={Colors.secondary} name="edit" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => props.navigation.navigate('ManDetailFakeOrders', { item: item })} >
                                    <MaterialCommunityIcons size={RFPercentage(3)} color={Colors.secondary} name="eye-outline" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    {/* Add Order button */}
                    <View style={{ marginBottom: RFPercentage(4), width: "100%", marginTop: RFPercentage(5), justifyContent: 'center', alignItems: 'center' }} >
                        <AppTextButton
                            name="Add Fake Order"
                            borderRadius={RFPercentage(1.3)}
                            onSubmit={() => handleAddOrganicOrder()}
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

export default ManFakeOrders;