import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Modal, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components
import AppTextInput from "../../components/commom/AppTextInput"
import AppTextButton from "../../components/commom/AppTextButton"

// services
import { loginUser } from "../../services/UserServices"

// config
import Colors from '../../config/Colors';
import LoadingModal from '../../components/commom/LoadingModal';

function Login(props) {
    const [indicator, setIndicator] = useState(false);

    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "Email",
            value: '',
            secure: false
        },
        {
            id: 1,
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

    const handleSubmit = async () => {
        const email = feilds[0].value.trim().toLowerCase();
        const password = feilds[1].value.trim();
        try {
            setIndicator(true)

            const res = await loginUser(email, password);
            if (!res) {
                setIndicator(false)
                alert("Email or Password is incorrect")
                return;
            }
            await AsyncStorage.setItem('user', JSON.stringify(res));
            setIndicator(false)

            if (res.role === 'employee') {
                props.navigation.navigate('UserDashboard')
            } else if (res.role === 'manager') {
                props.navigation.navigate('riderScreen')
            } else if (res.role === 'restaurant') {
                props.navigation.navigate('resturentScreen')
            } else {
                props.navigation.navigate('homeScreen')
            }
            // props.navigation.navigate('User')
            // props.navigation.navigate('ManagerDashboard')
            // props.navigation.navigate('AdminDashboard')

        } catch (error) {
            console.log("login error: ", error);
            setIndicator(false)
            alert("Email or Password is incorrect")
        }
    }

    // get user from AsyncStorage to confirm login or logout
    let validateCurrentUser = async () => {
        // await AsyncStorage.removeItem('user');
        try {
            let res = await AsyncStorage.getItem('user');
            if (res) {
                // if (res.role === 'admin') {
                //     props.navigation.navigate('adminScreen')
                // } else if (res.role === 'rider') {
                //     props.navigation.navigate('riderScreen')
                // } else if (res.role === 'restaurant') {
                //     props.navigation.navigate('resturentScreen')
                // } else {
                //     props.navigation.navigate('homeScreen')
                // }
                return;
            }
            // props.navigation.navigate('LoginScreen');
        } catch (error) {
            console.log("auto login: ", error)
        }
    }

    useEffect(() => {
        validateCurrentUser();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ marginTop: RFPercentage(3), width: "85%", alignItems: "center" }} >
                <Text style={{ color: Colors.primary, fontSize: Platform.OS === "ios" ? RFPercentage(3.5) : RFPercentage(5) }} >Hello!</Text>
                <Text style={{ color: Colors.grey, fontSize: Platform.OS === "ios" ? RFPercentage(2) : RFPercentage(2.6) }} >Login to continue </Text>
            </View>

            <LoadingModal show={indicator} />

            {/* Text feilds */}
            {feilds.map((item, i) =>
                <View key={i} style={{ marginTop: i == 0 ? RFPercentage(8) : RFPercentage(5), width: "100%" }} >
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
            <View style={{ width: "100%", marginTop: RFPercentage(7), justifyContent: 'center', alignItems: 'center' }} >
                <AppTextButton
                    name="LOGIN"
                    borderRadius={RFPercentage(1.3)}
                    onSubmit={() => handleSubmit()}
                    backgroundColor={Colors.primary}
                    width="80%"
                    height={RFPercentage(5.5)}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Login;