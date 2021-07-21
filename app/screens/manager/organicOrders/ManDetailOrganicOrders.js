import React, { useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker';
import ReactNativeCrossPicker from "react-native-cross-picker"
import { MaterialCommunityIcons } from "@expo/vector-icons"

// components
import AppBar from '../../../components/AppBar';
import AppTextButton from '../../../components/commom/AppTextButton';
import AppTextInput from '../../../components/commom/AppTextInput';

// config
import Colors from '../../../config/Colors';

function ManDetailOrganicOrders(props) {

    const [indicator, setIndicator] = useState(false);
    const [orderImage, setOrderImage] = useState(false)
    const [selectedEmployee, setEmployee] = useState('')

    const employees = [
        { label: "Employee1", value: "Employee1" },
        { label: "Employee2", value: "Employee2" },
        { label: "Employee3", value: "Employee3" },
        { label: "Employee4", value: "Employee4" },
    ]

    const iconComponent = () => {
        return <MaterialCommunityIcons
            name={"chevron-down"}
            size={20}
            color={"grey"}
        />
    }

    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "Order Name",
            value: '',
        },
        {
            id: 1,
            placeHolder: "Price in $",
            value: '',
        }
    ]);

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

    const uploadImages = async (evetnType) => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert("Permission to access camera roll is required!");
                return;
            }

            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                // allowsEditing: true,
                quality: 0.6
            });

            const { height, width, type, uri } = pickerResult;

            setOrderImage(uri)
        } catch (error) {

        }
    }

    const handleAddOrganicOrder = () => {
        // props.navigation.navigate('ManDetailOrganicOrders')
    }

    return (
        <View style={{ flex: 1 }} >
            <AppBar {...props} menu={false} title="Update Organic Orders" backAction={"ManOrganicOrders"} />
            <View style={styles.container}>
                <View style={{ marginTop: RFPercentage(3), width: "85%", alignItems: "center" }} >
                    <Text style={{ color: Colors.primary, fontSize: Platform.OS === "ios" ? RFPercentage(3.2) : RFPercentage(4.3) }} >Order Details</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{ width: "80%", flex: 1 }} >
                    {/* Text feilds */}
                    {feilds.map((item, i) =>
                        <View key={i} style={{ marginTop: i == 0 ? RFPercentage(5) : RFPercentage(4), width: "100%" }} >
                            <AppTextInput
                                placeHolder={item.placeHolder}
                                width="100%"
                                value={item.value}
                                onChange={(text) => handleChange(text, item.id)}
                                secure={item.secure}
                            />
                        </View>
                    )}

                    <View style={{ marginTop: RFPercentage(4), width: "100%" }} >
                        <ReactNativeCrossPicker
                            modalTextStyle={{ color: Colors.primary }}
                            mainComponentStyle={{ borderColor: "rgba(0, 74, 173, 0)", backgroundColor: Colors.white }}
                            iconComponent={iconComponent}
                            items={employees}
                            setItem={setEmployee} selectedItem={selectedEmployee}
                            placeholder="Select Employee"
                            modalMarginTop={"90%"} // popup model margin from the top 
                        />
                    </View>

                    {/* Add Order button */}
                    <View style={{ marginBottom: RFPercentage(4), width: "100%", marginTop: RFPercentage(5), justifyContent: 'center', alignItems: 'center' }} >
                        <AppTextButton
                            name="Update Order"
                            borderRadius={RFPercentage(1.3)}
                            onSubmit={() => handleAddOrganicOrder()}
                            backgroundColor={Colors.primary}
                            width="55%"
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
        marginTop: RFPercentage(2),
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ManDetailOrganicOrders;