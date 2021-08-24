import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from "@expo/vector-icons"

// components
import AppBar from '../../components/AppBar';
import AppTextButton from '../../components/commom/AppTextButton';
import AppTextInput from '../../components/commom/AppTextInput';
import LoadingModal from '../../components/commom/LoadingModal';
import Colors from '../../config/Colors';
import { getOrdersEarnings, getAllOrdersEarnings } from '../../services/OrderServices';
import { getSpecificUsersByRoles, getUserRef, updateUser } from '../../services/UserServices';

function AdminDashboard(props) {
    const [showFeilds, setShowFeilds] = useState(false);
    const [indicator, setIndicator] = useState(false);
    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "Available for orders",
            value: '',
        },
        {
            id: 1,
            placeHolder: "Pending clearance",
            value: '',
        },
        {
            id: 2,
            placeHolder: "Total paid",
            value: '',
        },
        {
            id: 3,
            placeHolder: "Last month paid",
            value: '',
        }
    ]);

    const [userEarnings, setUserEarnings] = useState([
        {
            id: 0,
            label: "Total USD",
            price: 0
        },
        {
            id: 1,
            label: "Last month earning",
            price: 0
        },
        {
            id: 2,
            label: "Available for orders",
            price: 0
        },
        {
            id: 3,
            label: "Pending clearance",
            price: 0
        },
        {
            id: 4,
            label: "Total paid",
            price: 0
        },
        {
            id: 5,
            label: "Last month paid",
            price: 0
        },

    ])

    const getMyAllOrdersEarning = async () => {
        try {


            let res = await getAllOrdersEarnings();

            if (!res) {
                return;
            }

            let totalOrganicEarning = 0;
            let lastMonthEarning = 0;
            for (let i = 0; i < res.length; i++) {
                res[i].date = res[i].date.toDate()
                if (res[i].type === 'organic') {
                    totalOrganicEarning += parseFloat(res[i].budget);

                    let PrevMonthDate = new Date();
                    PrevMonthDate.setMonth(PrevMonthDate.getMonth() - 1);
                    if (res[i].date >= PrevMonthDate) {
                        lastMonthEarning += parseFloat(res[i].budget);
                    }
                }
            }

            // organic earning (Total USD)
            totalOrganicEarning = totalOrganicEarning * 0.8;
            totalOrganicEarning = totalOrganicEarning.toFixed(3);
            totalOrganicEarning = parseFloat(totalOrganicEarning);

            // last month earning
            lastMonthEarning = lastMonthEarning * 0.8;
            lastMonthEarning = lastMonthEarning.toFixed(3);
            lastMonthEarning = parseFloat(lastMonthEarning);

            let tempUserEarnings = [...userEarnings];
            tempUserEarnings[0].price = totalOrganicEarning;
            tempUserEarnings[1].price = lastMonthEarning;

            setUserEarnings(tempUserEarnings);

        } catch (error) {
            console.log("Getting Order Earnings Error: ", error)
        }
    }

    useEffect(() => {
        getMyAllOrdersEarning()
        handleUserEarning();

        return () => {
            let tempUserEarnings = [...userEarnings];
            tempUserEarnings[0].price = 0;
            tempUserEarnings[1].price = 0;
            tempUserEarnings[2].price = 0;
            tempUserEarnings[3].price = 0;
            tempUserEarnings[4].price = 0;
            tempUserEarnings[5].price = 0;
            setUserEarnings(tempUserEarnings)
        }
    }, [])

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

    const userEarningFromAsyncStor = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            user = JSON.parse(user);
            let availableForOrders = user.availableForOrders;
            let pendingClearance = user.pendingClearance;
            let totalPaid = user.totalPaid;
            let lastMonthPaid = user.lastMonthPaid;

            handleChange(availableForOrders ? availableForOrders : '0', 0)
            handleChange(pendingClearance ? pendingClearance : '0', 1)
            handleChange(totalPaid ? totalPaid : '0', 2)
            handleChange(lastMonthPaid ? lastMonthPaid : '0', 3)

            availableForOrders = parseFloat(availableForOrders);
            pendingClearance = parseFloat(pendingClearance);
            totalPaid = parseFloat(totalPaid);
            lastMonthPaid = parseFloat(lastMonthPaid);

            let tempUserEarnings = [...userEarnings];
            tempUserEarnings[2].price = availableForOrders;
            tempUserEarnings[3].price = pendingClearance;
            tempUserEarnings[4].price = totalPaid;
            tempUserEarnings[5].price = lastMonthPaid;



            setUserEarnings(tempUserEarnings);
        } catch (error) {
            console.log("userEarningFromAsyncStor Error: ", error)
        }
    }

    const handleUserEarning = async () => {
        try {
            const userRef = getUserRef();
            userRef.onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(async (change) => {
                    setIndicator(true);
                    await userEarningFromAsyncStor();
                    setIndicator(false);
                })
            })
        } catch (error) {

        }
        setIndicator(false);
    }

    const handleUpdate = async () => {
        setIndicator(true)
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
        var reg = /^\d*(\.\d+)?$/;
        if (!(feilds[0].value.match(reg) && feilds[1].value.match(reg) && feilds[2].value.match(reg) && feilds[3].value.match(reg))) {
            alert("Only Numbers are allowed");
            setIndicator(false)
            return;
        }

        const userDetail = {
            availableForOrders: feilds[0].value ? feilds[0].value : 0,
            pendingClearance: feilds[1].value ? feilds[1].value : 0,
            totalPaid: feilds[2].value ? feilds[2].value : 0,
            lastMonthPaid: feilds[3].value ? feilds[3].value : 0,
            email: user.email,
            password: user.password,
        }

        try {
            await updateUser(user.id, userDetail);
            await handleUserEarning()
        } catch (error) {
            console.log("user Update: ", error)
        }
        setIndicator(false)
        setShowFeilds(false)
    }

    return (
        <ScrollView>
            <View>
                <AppBar {...props} title="Dashboard" />
                <LoadingModal show={indicator} />

                <View style={{ width: "94%", alignItems: "flex-end", marginTop: RFPercentage(2) }} >
                    <TouchableOpacity activeOpacity={0.5} onPress={() => setShowFeilds(!showFeilds)} >
                        <MaterialCommunityIcons name="pencil-outline" color={Colors.secondary} size={30} />
                    </TouchableOpacity>
                </View>

                <View style={styles.container} >
                    <FlatList
                        style={{ width: "85%", marginTop: RFPercentage(1) }}
                        numColumns={2}
                        data={userEarnings}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={(data) =>
                            <View style={{ marginTop: RFPercentage(3), maxWidth: "50%", marginLeft: (data.index % 2) != 0 ? RFPercentage(2) : 0, alignItems: 'flex-start', justifyContent: "flex-start", flex: 1 }} >
                                <Text style={{ fontSize: RFPercentage(2.6), color: Colors.primary }} >{data.item.label}</Text>
                                <Text style={{ fontSize: RFPercentage(2.8), color: Colors.secondary, marginTop: RFPercentage(0.5) }} >{data.item.price ? data.item.price : 0}</Text>
                            </View>
                        }
                    />
                </View>

                {showFeilds ? <>
                    {/* updating*/}
                    {feilds.map((item, i) =>
                        <View key={i} style={{ marginTop: i == 0 ? RFPercentage(4) : RFPercentage(2), width: "85%", marginLeft: "7.5%" }} >
                            <Text style={{ marginBottom: RFPercentage(1) }} >{item.placeHolder}</Text>
                            <AppTextInput
                                placeHolder={item.placeHolder}
                                width="100%"
                                value={item.value}
                                onChange={(text) => handleChange(text, item.id)}
                            />
                        </View>
                    )}

                    {/* Login button */}
                    <View style={{ marginBottom: RFPercentage(3), width: "100%", marginTop: RFPercentage(4), justifyContent: 'center', alignItems: 'center' }} >
                        <AppTextButton
                            name="Update"
                            borderRadius={RFPercentage(1.3)}
                            onSubmit={() => handleUpdate()}
                            backgroundColor={Colors.primary}
                            width="60%"
                            height={RFPercentage(5.5)}
                        />
                    </View>
                </> : null}

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: "100%",
        marginRight: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AdminDashboard;