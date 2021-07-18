import React from "react";
import { Divider, Drawer } from "react-native-paper";
import { Image, StyleSheet, Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

function AppDrawer({ navigation }) {
    const [active, setActive] = React.useState('');

    return (
        <Drawer.Section  >
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
                active={active === 'second'}
                onPress={() => navigation.navigate('LoginScreen')}
            />
            <Drawer.Item
                label="Orders"
                icon="shopping"
                active={active === 'second'}
                onPress={() => navigation.navigate('LoginScreen')}
            />
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