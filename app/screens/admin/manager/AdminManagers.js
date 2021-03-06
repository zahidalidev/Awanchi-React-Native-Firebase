import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons"

// components
import AppBar from '../../../components/AppBar';
import AppTextButton from '../../../components/commom/AppTextButton';

// config
import Colors from '../../../config/Colors';

function AdminManagers(props) {

    const [managers, setManagers] = useState([
        {
            id: 0,
            name: 'Furqan'
        },
        {
            id: 1,
            name: 'Raqeeb'
        },
        {
            id: 2,
            name: 'Ateeg Saqib'
        },
        {
            id: 3,
            name: 'Mutiur Rehman'
        },
        {
            id: 4,
            name: 'Usama Ramzan'
        },
        {
            id: 5,
            name: 'Abdul Rehman'
        }

    ])

    const handleAddManager = () => {
        props.navigation.navigate('AdminAddManager')
    }

    return (
        <View style={{ backgroundColor: Colors.white, flex: 1 }} >
            <AppBar {...props} menu={false} title="Admin Managers" backAction={"AdminDashboard"} />
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: "80%", flex: 1 }} >
                    {managers.map((item, index) => (
                        <View activeOpacity={0.4} key={index} style={{ justifyContent: "space-between", flexDirection: 'row', marginTop: RFPercentage(3), padding: RFPercentage(1), borderBottomWidth: 1, borderBottomColor: Colors.lightGrey }} >
                            <Text style={{ fontSize: RFPercentage(3), color: Colors.primary }} >{item.name}</Text>
                            <View style={{ flexDirection: "row", width: "25%", justifyContent: "space-between" }} >
                                <TouchableOpacity onPress={() => props.navigation.navigate('AdminUpdateManager')} >
                                    <Feather size={RFPercentage(3)} color={Colors.secondary} name="edit" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => props.navigation.navigate('AdminManagerProfile')} >
                                    <MaterialCommunityIcons size={RFPercentage(3)} color={Colors.secondary} name="eye-outline" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    {/* Add Order button */}
                    <View style={{ marginBottom: RFPercentage(4), width: "100%", marginTop: RFPercentage(5), justifyContent: 'center', alignItems: 'center' }} >
                        <AppTextButton
                            name="Add Manager"
                            borderRadius={RFPercentage(1.3)}
                            onSubmit={() => handleAddManager()}
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

export default AdminManagers;