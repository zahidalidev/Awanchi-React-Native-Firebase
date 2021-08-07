import React, { useState, useEffect } from "react";
import { Divider, Drawer } from "react-native-paper";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../config/Colors";

const height = Dimensions.get('window').height;

function AppDrawer({ navigation }) {
    const [orderTypes, showOrderTypes] = useState(false);
    const [currentUser, showCurrentUser] = useState('');

    let validateCurrentUser = async () => {
        try {
            let res = await AsyncStorage.getItem('user');
            res = JSON.parse(res)
            showCurrentUser(res.role)
        } catch (error) {
            console.log("auto login: ", error)
        }
    }

    useEffect(() => {
        validateCurrentUser();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        navigation.navigate('LoginScreen')
    }

    return (
        <Drawer.Section >
            <View style={{ justifyContent: "center", alignItems: 'center', width: "90%", height: RFPercentage(15), flexDirection: 'row', padding: RFPercentage(2.4), marginTop: RFPercentage(3) }} >
                <View style={{ width: "45%", justifyContent: 'center', alignItems: 'center' }} >
                    <Image height={RFPercentage(9)} width={RFPercentage(9)} style={{ width: RFPercentage(9), height: RFPercentage(9) }} source={{ uri: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-21.jpg" }} />
                </View>
                <View style={{ width: "55%", justifyContent: 'center', alignItems: 'flex-start', marginLeft: RFPercentage(1) }} >
                    <Text numberOfLines={1} style={{ fontSize: RFPercentage(2.8) }} >Furqan Raqeeb</Text>
                    <Text numberOfLines={1} style={{ fontSize: RFPercentage(2) }} >Okara, Pakistan</Text>
                </View>
            </View>
            <Divider />
            <Drawer.Item
                label="Home"
                icon="home"
                // active={active === 'ProfileScreen'}
                onPress={() => {
                    navigation.navigate(currentUser === 'manager' ? 'ManagerDashboard' : (currentUser === 'admin' ? 'AdminDashboard' : 'UserDashboard'))
                }}
            />

            <Drawer.Item
                label="Profile"
                icon="account"
                // active={active === 'ProfileScreen'}
                onPress={() => {
                    navigation.navigate(currentUser === 'manager' ? 'ManagerProfileScreen' : (currentUser === 'admin' ? 'AdminProfileScreen' : 'ProfileScreen'))
                }}
            />

            {/* for manager */}
            {currentUser === 'manager' ?
                <Drawer.Item
                    label="Employees"
                    icon="account-multiple"
                    // active={active === 'ProfileScreen'}
                    onPress={() => {
                        navigation.navigate('ManagerEmployees')
                    }}
                /> : null
            }

            {currentUser === 'admin' ?
                <>
                    <Drawer.Item
                        label="Managers"
                        icon="account-multiple"
                        // active={active === 'ProfileScreen'}
                        onPress={() => {
                            navigation.navigate('AdminManagers')
                        }}
                    />
                    <Drawer.Item
                        label="Employees"
                        icon="account-multiple"
                        // active={active === 'ProfileScreen'}
                        onPress={() => {
                            navigation.navigate('AdminEmployees')
                        }}
                    />
                </> : <Drawer.Item
                    label="Orders"
                    icon="basket-fill"
                    // active={active === 'second'}
                    onPress={() => {
                        showOrderTypes(!orderTypes)
                    }}
                />
            }

            {orderTypes ?
                <View style={{ marginLeft: RFPercentage(3) }} >
                    <Drawer.Item
                        label="Organic Orders"
                        icon="alpha-o-circle-outline"
                        // active={active === 'second'}
                        onPress={() => {
                            navigation.navigate(currentUser === 'manager' ? 'ManOrganicOrders' : 'OrganicOrders')
                            // setActive('ProfileScreen')
                        }}
                    />
                    <Drawer.Item
                        label="Fake Orders"
                        icon="alpha-f-circle-outline"
                        // active={active === 'second'}
                        onPress={() => {
                            navigation.navigate(currentUser === 'manager' ? 'ManFakeOrders' : 'FakeOrders')
                            // setActive('ProfileScreen')
                        }}
                    />
                </View> : null

            }


            <View style={{ position: 'absolute', width: '80%', marginLeft: RFPercentage(6), marginTop: height - 100, }} >
                <Drawer.Item
                    label="Logout"
                    icon="import"
                    // active={active === 'second'}
                    onPress={() => handleLogout()}
                />
            </View>
        </Drawer.Section>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        justifyContent: "flex-start",
        paddingVertical: RFPercentage(2.4),

    }
})

export default AppDrawer;