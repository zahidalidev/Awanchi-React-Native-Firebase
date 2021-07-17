import React from 'react';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components
import AppBar from '../../components/AppBar';
import Colors from '../../config/Colors';

function UserDashboard(props) {

    const [userEarnings, setUserEarnings] = useState([
        {
            id: 0,
            label: "Net Earning",
            price: 20
        },
        {
            id: 1,
            label: "Total Tip Earning",
            price: 10
        },
        {
            id: 2,
            label: "Original Order Earning",
            price: 20
        },
        {
            id: 3,
            label: "Fake Order Earning",
            price: 20
        },
        {
            id: 4,
            label: "Earning in PKR",
            price: 20
        },
        {
            id: 5,
            label: "Earning in $",
            price: 20
        },
        {
            id: 6,
            label: "Last Month Earn PKR",
            price: 20
        },
        {
            id: 7,
            label: "Pending Clearance",
            price: 20
        },
        {
            id: 8,
            label: "Send to Payoneer",
            price: 20
        },
        {
            id: 9,
            label: "Available in Account",
            price: 20
        },
    ])

    return (
        <View>
            <AppBar {...props} title="Dashboard" />

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