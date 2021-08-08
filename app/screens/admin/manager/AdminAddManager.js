import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components
import AppBar from '../../../components/AppBar';
import AppTextButton from '../../../components/commom/AppTextButton';
import AppTextInput from '../../../components/commom/AppTextInput';
import LoadingModal from '../../../components/commom/LoadingModal';

// config
import Colors from '../../../config/Colors';
import { AddUser } from '../../../services/UserServices';

function AdminAddManager(props) {

    const [indicator, setIndicator] = useState(false);

    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "Name",
            value: '',
        },
        {
            id: 1,
            placeHolder: "Email",
            value: '',
        },
        {
            id: 2,
            placeHolder: "Fiver UserName",
            value: '',
        },
        {
            id: 3,
            placeHolder: "Address",
            value: '',
        },
        {
            id: 4,
            placeHolder: "Password",
            value: '',
            secure: true
        },
    ]);

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

    const handleAddManager = async () => {
        try {
            setIndicator(true);
            const body = {
                name: feilds[0].value,
                email: feilds[1].value.toLowerCase(),
                fiverUserName: feilds[2].value,
                address: feilds[3].value,
                password: feilds[4].value,
                role: "manager",
            }
            let res = await AddUser(body);
            if (!res) {
                alert("Email already exist!")
                return;
            }
            alert("Manager Added")
            setIndicator(false)
            props.navigation.navigate('AdminManagers')
        } catch (error) {
            alert("Adding Manager Error")
            console.log("Adding Manager Error: ", error)
        }
        setIndicator(false)
    }

    return (
        <View style={{ flex: 1 }} >
            <AppBar {...props} menu={false} title="Add Manager" backAction={"AdminManagers"} />

            <LoadingModal show={indicator} />
            <View style={styles.container}>
                <View style={{ marginTop: RFPercentage(3), width: "85%", alignItems: "center" }} >
                    <Text style={{ color: Colors.primary, fontSize: Platform.OS === "ios" ? RFPercentage(3.2) : RFPercentage(4.3) }} >Manager Details</Text>
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

                    {/* Add Order button */}
                    <View style={{ marginBottom: RFPercentage(4), width: "100%", marginTop: RFPercentage(5), justifyContent: 'center', alignItems: 'center' }} >
                        <AppTextButton
                            name="Add Manager"
                            borderRadius={RFPercentage(1.3)}
                            onSubmit={() => handleAddManager()}
                            backgroundColor={Colors.primary}
                            width="50%"
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

export default AdminAddManager;