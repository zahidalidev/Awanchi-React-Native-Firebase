import React, { useState } from "react";
import { Divider, Drawer } from "react-native-paper";
import { Image, StyleSheet, Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

import Colors from "../config/Colors";

function AppDrawer({ navigation }) {
    const [orderTypes, showOrderTypes] = useState(false);

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
                label="Profile"
                icon="account"
                // active={active === 'ProfileScreen'}
                onPress={() => {
                    navigation.navigate('ProfileScreen')
                }}
            />

            <Drawer.Item
                label="Orders"
                icon="basket-fill"
                // active={active === 'second'}
                onPress={() => {
                    showOrderTypes(!orderTypes)
                }}
            />
            {orderTypes ?
                <View style={{ marginLeft: RFPercentage(3) }} >
                    <Drawer.Item
                        label="Organic Orders"
                        icon="alpha-o-circle-outline"
                        // active={active === 'second'}
                        onPress={() => {
                            navigation.navigate('ProfileScreen')
                            setActive('ProfileScreen')
                        }}
                    />
                    <Drawer.Item
                        style={{ marginTop: RFPercentage(-1) }}
                        label="Fake Orders"
                        icon="alpha-f-circle-outline"
                        // active={active === 'second'}
                        onPress={() => {
                            navigation.navigate('ProfileScreen')
                            setActive('ProfileScreen')
                        }}
                    />
                </View> : null

            }
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