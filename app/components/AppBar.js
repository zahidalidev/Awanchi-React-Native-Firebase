import React from 'react';
import { StatusBar, Text, View } from "react-native";
import { Appbar } from 'react-native-paper';
import { RFPercentage } from 'react-native-responsive-fontsize';

// config
import Colors from "../config/Colors";

function AppBar(props) {
    return (
        <>
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
            <Appbar style={{ backgroundColor: Colors.primary }} >
                <Appbar.Action icon="menu" onPress={() => props.navigation.openDrawer()} />
                <View style={{ maxWidth: "80%", justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                    <Text style={{ color: Colors.white, fontSize: RFPercentage(2.7) }} >{props.title}</Text>
                </View>
            </Appbar>
        </>
    );
}


export default AppBar;