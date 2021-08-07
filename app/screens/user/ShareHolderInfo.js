import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from "@react-native-async-storage/async-storage"

// components
import AppBar from '../../components/AppBar';
import AppTextInput from '../../components/commom/AppTextInput';
import AppTextButton from '../../components/commom/AppTextButton';
import LoadingModal from "../../components/commom/LoadingModal";

// config
import Colors from '../../config/Colors';
import { updateUser } from '../../services/UserServices';

function ShareHolderInfo(props) {

    const [indicator, setIndicator] = useState(false);

    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "Name",
            value: '',
        },
        {
            id: 1,
            placeHolder: "Father Name",
            value: '',
        },
        {
            id: 2,
            placeHolder: "CNIC",
            value: '',
        },
        {
            id: 3,
            placeHolder: "Address",
            value: '',
        },
        {
            id: 4,
            placeHolder: "Skills eg. web, ui ux design",
            value: '',
        },
        {
            id: 5,
            placeHolder: "Fiver Username",
            value: '',
        },
        {
            id: 6,
            placeHolder: "Fiver Gmail",
            value: '',
        },
        {
            id: 7,
            placeHolder: "About",
            value: '',
        },
    ]);

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

    const handleSubmit = async () => {
        setIndicator(true)
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        const userDetail = {
            name: feilds[0].value,
            fatherName: feilds[1].value,
            cnic: feilds[2].value,
            address: feilds[3].value,
            skills: feilds[4].value.split(','),
            fiverUserName: feilds[5].value,
            fiverGmail: feilds[6].value,
            aboutUser: feilds[7].value,
            email: user.email,
            password: user.password
        }

        try {
            await updateUser(user.id, userDetail)
            props.navigation.navigate('ProfileScreen', { user: userDetail })
        } catch (error) {
            console.log("user Update: ", error)
        }
        setIndicator(false)
    }

    return (
        <View>
            <AppBar {...props} menu={false} title="Personal Information" backAction={"ShareHolderPhotos"} />
            <LoadingModal show={indicator} />
            <ScrollView style={{ width: "100%" }}>
                <View style={styles.container}>
                    {/* Text feilds */}
                    {feilds.map((item, i) =>
                        <View key={i} style={{ marginTop: i == 0 ? RFPercentage(8) : RFPercentage(3.5), width: "85%" }} >
                            <AppTextInput
                                placeHolder={item.placeHolder}
                                width="100%"
                                value={item.value}
                                onChange={(text) => handleChange(text, item.id)}
                                secure={item.secure}
                            />
                        </View>
                    )}

                    {/* Login button */}
                    <View style={{ width: "100%", marginTop: RFPercentage(2), marginBottom: RFPercentage(5), justifyContent: 'center', alignItems: 'center' }} >
                        <AppTextButton
                            name="SAVE"
                            borderRadius={RFPercentage(1.3)}
                            onSubmit={() => handleSubmit()}
                            backgroundColor={Colors.primary}
                            width="60%"
                            height={RFPercentage(5.5)}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ShareHolderInfo;