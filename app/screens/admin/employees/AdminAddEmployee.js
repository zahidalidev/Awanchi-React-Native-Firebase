import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components
import AppBar from '../../../components/AppBar';
import AppTextButton from '../../../components/commom/AppTextButton';

// config
import Colors from '../../../config/Colors';
import AppTextInput from '../../../components/commom/AppTextInput';
import LoadingModal from '../../../components/commom/LoadingModal';
import { AddUser } from '../../../services/UserServices';

function AdminAddEmployee(props) {
    const [indicator, setIndicator] = useState(false);

    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "Name",
            value: '',
        },
        {
            id: 1,
            placeHolder: "email",
            value: '',
        },
        {
            id: 2,
            placeHolder: "Fiver Username",
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

    const handleSubmit = async () => {
        try {
            setIndicator(true);
            const body = {
                name: feilds[0].value,
                email: feilds[1].value.toLowerCase(),
                fiverUserName: feilds[2].value,
                address: feilds[3].value,
                password: feilds[4].value,
                role: "employee",
            }
            let res = await AddUser(body);
            if (!res) {
                alert("Email already exist!")
                return;
            }
            alert("employee Added")
            setIndicator(false)
            props.navigation.navigate('AdminEmployees')
        } catch (error) {
            alert("Adding Employee Error")
            console.log("Adding Employee Error: ", error)
        }
        setIndicator(false)
    }

    return (
        <View style={{ flex: 1 }} >
            <AppBar {...props} menu={false} title="Employee" backAction={"AdminEmployees"} />
            <LoadingModal show={indicator} />
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: "80%", flex: 1 }} >

                    {/* Text feilds */}
                    {feilds.map((item, i) =>
                        <View key={i} style={{ marginTop: i == 0 ? RFPercentage(6) : RFPercentage(5), width: "100%" }} >
                            <AppTextInput
                                placeHolder={item.placeHolder}
                                width="100%"
                                value={item.value}
                                onChange={(text) => handleChange(text, item.id)}
                                secure={item.secure}
                            />
                        </View>
                    )}

                    {/* Add Employee button */}
                    <View style={{ marginBottom: RFPercentage(4), width: "100%", marginTop: RFPercentage(5), justifyContent: 'center', alignItems: 'center' }} >
                        <AppTextButton
                            name="Add Employee"
                            borderRadius={RFPercentage(1.3)}
                            onSubmit={() => handleSubmit()}
                            backgroundColor={Colors.primary}
                            width="80%"
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

export default AdminAddEmployee;