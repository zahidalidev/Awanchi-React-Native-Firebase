import React, { useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker';
import ReactNativeCrossPicker from "react-native-cross-picker"
import { MaterialCommunityIcons } from "@expo/vector-icons"

// components
import AppBar from '../../../components/AppBar';
import AppTextButton from '../../../components/commom/AppTextButton';
import AppTextInput from '../../../components/commom/AppTextInput';

// config
import Colors from '../../../config/Colors';
import { updateOrder } from '../../../services/OrderServices';
import { useEffect } from 'react';
import { getSpecificUsersByRoles, getUserRef } from '../../../services/UserServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '../../../components/commom/LoadingModal';

function ManUpdateOrganicOrders(props) {

    const [indicator, setIndicator] = useState(false);
    const [orderImage, setOrderImage] = useState(false)
    const [selectedEmployee, setEmployee] = useState('')

    const [employees, setEmployees] = useState([{}]);
    const [allEmployees, setAllEmployees] = useState([{}]);

    const iconComponent = () => {
        return <MaterialCommunityIcons
            name={"chevron-down"}
            size={20}
            color={"grey"}
        />
    }

    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "Client Name",
            value: '',
        },
        {
            id: 1,
            placeHolder: "Price in $",
            value: '',
        }
    ]);

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

    const getAllEmployees = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            user = JSON.parse(user);

            let userRef = await getUserRef();
            userRef.onSnapshot(querySnapShot => {
                querySnapShot.docChanges().forEach(async (change) => {
                    setIndicator(true);
                    let orderRes = await getSpecificUsersByRoles('employee', user.name);
                    if (orderRes) {
                        let tempUsers = []
                        for (let i = 0; i < orderRes.length; i++) {
                            let tempObj = { label: orderRes[i].name, value: orderRes[i].docId };
                            tempUsers.push(tempObj);
                        }
                        setAllEmployees(orderRes)
                        setEmployees(tempUsers)
                    }
                    setIndicator(false);
                })
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        getAllEmployees();
        fillOrderDetail()
    }, [props.route.params])

    const fillOrderDetail = () => {
        if (props.route.params.item) {
            let tempFeilds = [...feilds];
            tempFeilds[0].value = props.route.params.item.clientName
            tempFeilds[1].value = props.route.params.item.budget
            setEmployee(props.route.params.item.userId)
        }
    }

    const handleUpdateFakeOrder = async () => {
        try {
            setIndicator(true);
            let tempEmp = allEmployees.filter(item => item.docId == selectedEmployee);
            const body = {
                clientName: feilds[0].value,
                budget: feilds[1].value,
                userId: selectedEmployee,
                employee: tempEmp[0].name,
            }
            await updateOrder(props.route.params.item.docId, body);
            alert("Order Updated")
            setIndicator(false)
        } catch (error) {
            console.log("Update Organic Order Error: ", error)
        }
        setIndicator(false)
    }

    return (
        <View style={{ flex: 1 }} >
            <AppBar {...props} menu={false} title="Update Organic Orders" backAction={"ManOrganicOrders"} />
            <View style={styles.container}>
                <View style={{ marginTop: RFPercentage(3), width: "85%", alignItems: "center" }} >
                    <Text style={{ color: Colors.primary, fontSize: Platform.OS === "ios" ? RFPercentage(3.2) : RFPercentage(4.3) }} >Order Details</Text>
                </View>
                <LoadingModal show={indicator} />
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: "80%", flex: 1 }} >
                    {/* Text feilds */}
                    {feilds.map((item, i) =>
                        <View key={i} style={{ marginTop: i == 0 ? RFPercentage(5) : RFPercentage(4), width: "100%" }} >
                            <AppTextInput
                                placeHolder={item.placeHolder}
                                width="100%"
                                value={item.value}
                                onChange={(text) => handleChange(text, item.id)}
                                secure={item.secure}
                            />
                        </View>
                    )}

                    <View style={{ marginTop: RFPercentage(4), width: "100%" }} >
                        <ReactNativeCrossPicker
                            modalTextStyle={{ color: Colors.primary }}
                            mainComponentStyle={{ borderColor: "rgba(0, 74, 173, 0)", backgroundColor: Colors.white }}
                            iconComponent={iconComponent}
                            items={employees}
                            setItem={setEmployee} selectedItem={selectedEmployee}
                            placeholder="Select Employee"
                            modalMarginTop={"90%"} // popup model margin from the top 
                        />
                    </View>

                    {/* Add Order button */}
                    <View style={{ marginBottom: RFPercentage(4), width: "100%", marginTop: RFPercentage(5), justifyContent: 'center', alignItems: 'center' }} >
                        <AppTextButton
                            name="Update Order"
                            borderRadius={RFPercentage(1.3)}
                            onSubmit={() => handleUpdateFakeOrder()}
                            backgroundColor={Colors.primary}
                            width="55%"
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

export default ManUpdateOrganicOrders;