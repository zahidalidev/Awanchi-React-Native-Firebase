import React from 'react';
import { StatusBar, Text, View } from "react-native";
import { Appbar } from 'react-native-paper';
import { RFPercentage } from 'react-native-responsive-fontsize';

// config
import Colors from "../config/Colors";

function AppBar({ navigation, title, menu = true, backAction = false }) {
    return (
        <>
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
            <Appbar style={{ backgroundColor: Colors.primary }} >
                {menu ? <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} /> : null}
                {backAction ? <Appbar.BackAction onPress={() => navigation.navigate(backAction)} /> : null}
                <View style={{ maxWidth: "80%", justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                    <Text style={{ color: Colors.white, fontSize: RFPercentage(2.7) }} >{title}</Text>
                </View>
            </Appbar>
        </>
    );
}


export default AppBar;