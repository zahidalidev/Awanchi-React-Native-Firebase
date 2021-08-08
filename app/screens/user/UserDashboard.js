import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import AppBar from '../../components/AppBar';
import Colors from '../../config/Colors';
import { getOrderRef, getOrdersEarnings } from '../../services/OrderServices';
import LoadingModal from "../../components/commom/LoadingModal";

function UserDashboard(props) {
    const [indicator, setIndicator] = useState(false);
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

    const getMyAllOrdersEarning = async () => {
        try {
            let user = await AsyncStorage.getItem("user");
            user = JSON.parse(user);
            let res = await getOrdersEarnings(user.id);
            if (!res) {
                alert("Orders not found");
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
                    getMyAllOrdersEarning();
                    setIndicator(false);
                })
            })

        } catch (error) {

        }
        setIndicator(false);
    }

    useEffect(() => {
        handleAllOrder()
    }, [])

    return (
        <View>
            <AppBar {...props} title="Employee Dashboard" />
            <LoadingModal show={indicator} />

            <View style={styles.container} >
                <FlatList
                    style={{ width: "85%", marginTop: RFPercentage(5) }}
                    numColumns={2}
                    data={userEarnings}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(data) =>
                        <View style={{ marginTop: RFPercentage(3), maxWidth: "50%", marginLeft: (data.index % 2) != 0 ? RFPercentage(2) : 0, alignItems: 'flex-start', justifyContent: "flex-start", flex: 1 }} >
                            <Text style={{ fontSize: RFPercentage(2.6), color: Colors.primary }} >{data.item.label}</Text>
                            <Text style={{ fontSize: RFPercentage(2.8), color: Colors.secondary, marginTop: RFPercentage(0.5) }} >{data.item.price}</Text>
                        </View>
                    }
                />
            </View>
        </View>
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