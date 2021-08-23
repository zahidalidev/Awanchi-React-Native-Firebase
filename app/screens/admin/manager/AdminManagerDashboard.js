import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from "@expo/vector-icons"

// components
import AppBar from '../../../components/AppBar';
import AppTextButton from '../../../components/commom/AppTextButton';
import AppTextInput from '../../../components/commom/AppTextInput';
import LoadingModal from '../../../components/commom/LoadingModal';
import Colors from '../../../config/Colors';
import { getOrdersEarnings } from '../../../services/OrderServices';
import { getSpecificUsersByRoles, getUserRef, updateUser } from '../../../services/UserServices';

function AdminManagerDashboard(props) {
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
            let user = props.route.params.item;

            if (user.availableForOrders && user.pendingClearance && user.totalPaid && user.lastMonthPaid) {
                handleChange(user.availableForOrders, 0)
                handleChange(user.pendingClearance, 1)
                handleChange(user.totalPaid, 2)
                handleChange(user.lastMonthPaid, 3)
            } else {
                handleChange(0, 0)
                handleChange(0, 1)
                handleChange(0, 2)
                handleChange(0, 3)
            }

            let orderRes = await getSpecificUsersByRoles('employee', user.name);
            if (!orderRes) {
                return;
            }

            let userIds = [];
            for (let i = 0; i < orderRes.length; i++) {
                userIds.push(orderRes[i].docId)
            }


            let res = [];
            for (let i = 0; i < userIds.length; i++) {
                let tempRes = await getOrdersEarnings(userIds[i]);
                if (tempRes) {
                    res = [...res, ...tempRes]
                }
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
        }
    }, [props.route.params])

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

    const userEarningFromAsyncStor = async () => {
        try {
            let user = props.route.params.item;
            let availableForOrders = user.availableForOrders;
            let pendingClearance = user.pendingClearance;
            let totalPaid = user.totalPaid;
            let lastMonthPaid = user.lastMonthPaid;

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
        let user = props.route.params.item;

        var reg = /^\d*(\.\d+)?$/;
        if (!(feilds[0].value.match(reg) && feilds[1].value.match(reg) && feilds[2].value.match(reg) && feilds[3].value.match(reg))) {
            alert("Only Numbers are allowed");
            setIndicator(false)
            return;
        }

        const userDetail = {
            availableForOrders: feilds[0].value,
            pendingClearance: feilds[1].value,
            totalPaid: feilds[2].value,
            lastMonthPaid: feilds[3].value,
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
                <AppBar {...props} menu={false} title="Manager Dashboard" backAction={"AdminManagerProfile"} />
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

export default AdminManagerDashboard;