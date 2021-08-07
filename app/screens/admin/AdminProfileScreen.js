import React, { useState } from 'react';
import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker';

// components
import AppBar from '../../components/AppBar';
import AppTextButton from '../../components/commom/AppTextButton';

// config
import Colors from '../../config/Colors';

function AdminProfileScreen(props) {

    const [profileImage, setProfileImage] = useState(false)
    const [skills, setSkills] = useState([
        {
            id: 0,
            name: "web"
        },
        {
            id: 1,
            name: "illustration"
        },
        {
            id: 2,
            name: "graphics"
        },
        {
            id: 3,
            name: "ui"
        },
        {
            id: 4,
            name: "interface"
        },
        {
            id: 5,
            name: "adobe"
        },
        {
            id: 6,
            name: "mobile app"
        },
        {
            id: 7,
            name: "android app"
        },
        {
            id: 8,
            name: "ios app"
        },
    ])

    return (
        <View>
            <AppBar {...props} menu={false} title="Admin Profile" backAction={"ManagerDashboard"} />
            {/* Image container */}
            <View style={styles.container}>
                <View style={{ marginTop: RFPercentage(4) }} >
                    <TouchableOpacity activeOpacity={1} style={{ justifyContent: "center", alignItems: 'center', width: RFPercentage(23), height: RFPercentage(23), borderWidth: 1, borderColor: Colors.mediumGrey, borderRadius: 10 }} >
                        {profileImage ?
                            <Image width={RFPercentage(23)} height={RFPercentage(23)} style={{ width: RFPercentage(23), height: RFPercentage(23), borderRadius: 10 }} source={{ uri: profileImage }} /> :
                            <Text style={{ fontSize: RFPercentage(3), color: Colors.grey }} >Picture Not Found</Text>
                        }
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: RFPercentage(6), flexDirection: 'row', width: "80%", justifyContent: 'center', alignItems: "center" }} >
                    <View style={{ width: "100%", justifyContent: 'center', alignItems: "flex-start" }} >
                        <Text style={{ fontSize: RFPercentage(3.2), color: Colors.primary, fontWeight: Platform.OS === "android" ? "bold" : "600" }} >Arbaz Sheraz</Text>
                        <Text>Lahore, Pakistan</Text>
                    </View>
                </View>
                <View style={{ marginTop: RFPercentage(3), flexDirection: 'row', width: "80%", justifyContent: 'center', alignItems: "center" }} >
                    <Text style={{ color: Colors.grey, fontSize: RFPercentage(2.3) }} >Hi, My name is arbaz shehraz. I'm a creative geek from san francisco, CA I enjoy creating eye candy solutions for web and mobile app. Contact me at john@gmail.com</Text>
                </View>
                <View style={{ backfaceVisibility: Colors.light, marginTop: RFPercentage(5), flexDirection: 'column', width: "80%", justifyContent: 'center', alignItems: "flex-start" }} >
                    <Text style={{ fontSize: RFPercentage(3.2), color: Colors.primary, fontWeight: Platform.OS === "android" ? "bold" : "600" }} >Skills</Text>
                    <FlatList
                        style={{ marginTop: RFPercentage(1), width: "100%" }}
                        numColumns={3}
                        data={skills}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <View style={{ margin: RFPercentage(1), marginBottom: 0, marginLeft: 0, padding: RFPercentage(0.5), paddingLeft: RFPercentage(2), paddingRight: RFPercentage(2), borderRadius: 10, borderWidth: 1, borderColor: Colors.secondaryLight }} >
                                <Text style={{ maxWidth: RFPercentage(10), fontSize: RFPercentage(2.2), fontWeight: "bold", color: Colors.primaryLight }} >{item.name}</Text>
                            </View>
                        }
                    />

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginRight: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AdminProfileScreen;