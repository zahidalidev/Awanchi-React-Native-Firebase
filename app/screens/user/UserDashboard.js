import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from "@expo/vector-icons";

// components
import AppBar from '../../components/AppBar';
import Colors from '../../config/Colors';
import LoadingModal from "../../components/commom/LoadingModal";

// services
import { getOrderRef, getOrdersEarnings } from '../../services/OrderServices';
import AppTextInput from '../../components/commom/AppTextInput';
import AppTextButton from '../../components/commom/AppTextButton';
import { getUserRef, updateUser } from '../../services/UserServices';

function UserDashboard(props) {
    const [showFeilds, setShowFeilds] = useState(false);
    const [indicator, setIndicator] = useState(false);
    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "Total Tip",
            value: '',
        },
        {
            id: 1,
            placeHolder: "Pending Clearance",
            value: '',
        },
        {
            id: 2,
            placeHolder: "Sent to Payoneer",
            value: '',
        },
        {
            id: 3,
            placeHolder: "Available in Account",
            value: '',
        }
    ]);


    const [userEarnings, setUserEarnings] = useState([
        {
            id: 0,
            label: "Net Earning",
            price: 0
        },
        {
            id: 1,
            label: "Total Tip Earning",
            price: 0
        },
        {
            id: 2,
            label: "Original Order Earning",
            price: 0
        },
        {
            id: 3,
            label: "Fake Order Earning",
            price: 0
        },
        {
            id: 4,
            label: "Last Month Earn PKR",
            price: 0
        },
        {
            id: 5,
            label: "Pending Clearance",
            price: 0
        },
        {
            id: 6,
            label: "Sent to Payoneer",
            price: 0
        },
        {
            id: 7,
            label: "Available in Account",
            price: 0
        }
    ])

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

    const getMyAllOrdersEarning = async () => {
        try {
            let user = await AsyncStorage.getItem("user");

            handleChange(user.totalTip ? user.totalTip : 0, 0)
            handleChange(user.pendingClearance ? user.pendingClearance : 0, 1)
            handleChange(user.sentToPayoneer ? user.sentToPayoneer : 0, 2)
            handleChange(user.availableInAccount ? user.availableInAccount : 0, 3)

            user = JSON.parse(user);
            let res = await getOrdersEarnings(user.id);
            if (!res) {
                console.log("Orders not found");
                return;
            }

            let totalNetEarning = 0;
            let totalOrganicEarning = 0;
            let totalFakeEarning = 0;
            let lastMonthEarning = 0;
            for (let i = 0; i < res.length; i++) {
                totalNetEarning += parseFloat(res[i].budget);
                res[i].date = res[i].date.toDate()
                if (res[i].type === 'organic') {
                    totalOrganicEarning += parseFloat(res[i].budget);
                }
                if (res[i].type === 'fake') {
                    totalFakeEarning += parseFloat(res[i].budget);
                }

                let PrevMonthDate = new Date();
                PrevMonthDate.setMonth(PrevMonthDate.getMonth() - 1);
                if (res[i].date >= PrevMonthDate) {
                    lastMonthEarning += parseFloat(res[i].budget);
                }
            }

            // net earning
            totalNetEarning = totalNetEarning * 0.8;
            totalNetEarning = totalNetEarning.toFixed(3);
            totalNetEarning = parseFloat(totalNetEarning);

            // organic earning
            totalOrganicEarning = totalOrganicEarning * 0.8;
            totalOrganicEarning = totalOrganicEarning.toFixed(3);
            totalOrganicEarning = parseFloat(totalOrganicEarning);

            // fake earning
            totalFakeEarning = totalFakeEarning * 0.8;
            totalFakeEarning = totalFakeEarning.toFixed(3);
            totalFakeEarning = parseFloat(totalFakeEarning);

            // last month earning
            lastMonthEarning = lastMonthEarning * 0.8;
            lastMonthEarning = lastMonthEarning.toFixed(3);
            lastMonthEarning = parseFloat(lastMonthEarning);


            let tempUserEarnings = [...userEarnings];
            tempUserEarnings[0].price = totalNetEarning;
            tempUserEarnings[2].price = totalOrganicEarning;
            tempUserEarnings[3].price = totalFakeEarning;
            tempUserEarnings[4].price = lastMonthEarning;

            setUserEarnings(tempUserEarnings);

        } catch (error) {
            console.log("Getting Order Earnings Error: ", error)
        }
    }

    const handleAllOrder = async () => {
        try {
            const orderRef = getOrderRef();
            orderRef.onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(async (change) => {
                    setIndicator(true);
                    await getMyAllOrdersEarning();
                    setIndicator(false);
                })
            })
        } catch (error) {

        }
        setIndicator(false);
    }

    const userEarningFromAsyncStor = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            user = JSON.parse(user);
            let totalTipEarning = user.totalTip;
            let totalPendingEarning = user.pendingClearance;
            let sentToPayoneer = user.sentToPayoneer;
            let availableInAccount = user.availableInAccount;

            totalTipEarning = parseFloat(totalTipEarning);
            totalPendingEarning = parseFloat(totalPendingEarning);
            sentToPayoneer = parseFloat(sentToPayoneer);
            availableInAccount = parseFloat(availableInAccount);

            let tempUserEarnings = [...userEarnings];
            tempUserEarnings[1].price = totalTipEarning;
            tempUserEarnings[5].price = totalPendingEarning;
            tempUserEarnings[6].price = sentToPayoneer;
            tempUserEarnings[7].price = availableInAccount;
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

    useEffect(() => {
        handleAllOrder();
        handleUserEarning();

        return () => {
            let tempUserEarnings = [...userEarnings];
            tempUserEarnings[0].price = 0;
            tempUserEarnings[1].price = 0;
            tempUserEarnings[2].price = 0;
            tempUserEarnings[3].price = 0;
            tempUserEarnings[4].price = 0;
            tempUserEarnings[5].price = 0;
            tempUserEarnings[6].price = 0;
            tempUserEarnings[7].price = 0;
            setUserEarnings(tempUserEarnings)
        }
    }, [])

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
            totalTip: feilds[0].value ? feilds[0].value : 0,
            pendingClearance: feilds[1].value ? feilds[1].value : 0,
            sentToPayoneer: feilds[2].value ? feilds[2].value : 0,
            availableInAccount: feilds[3].value ? feilds[3].value : 0,
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
                <AppBar {...props} title="Employee Dashboard" />
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
                        <View key={i} style={{ marginTop: i == 0 ? RFPercentage(5) : RFPercentage(2), width: "85%", marginLeft: "7.5%" }} >
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

export default UserDashboard;