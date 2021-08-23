import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components
import AppBar from '../../../components/AppBar';
import AppTextButton from '../../../components/commom/AppTextButton';

// config
import Colors from '../../../config/Colors';
import AppTextInput from '../../../components/commom/AppTextInput';
import { useEffect } from 'react';
import { updateUser } from '../../../services/UserServices';
import LoadingModal from '../../../components/commom/LoadingModal';

function AdminUpdateManager(props) {
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

    const updateEmployeeDetails = () => {
        let user = props.route.params.item;
        let tempFeilds = [...feilds];
        tempFeilds[0].value = user.name
        tempFeilds[1].value = user.email
        tempFeilds[2].value = user.fiverUserName
        tempFeilds[3].value = user.address
        tempFeilds[4].value = user.password
        setFeilds(tempFeilds)
    }

    useEffect(() => {
        updateEmployeeDetails()
    }, [props.route])

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

    const handleSubmit = async () => {
        setIndicator(true)
        const userDetail = {
            name: feilds[0].value,
            email: feilds[1].value,
            fiverUserName: feilds[2].value,
            address: feilds[3].value,
            password: feilds[4].value,
        }
        try {
            await updateUser(props.route.params.item.docId, userDetail)
        } catch (error) {
            console.log("Manager Update Error: ", error)
        }
        setIndicator(false)
    }

    return (
        <View style={{ flex: 1 }} >
            <AppBar {...props} menu={false} title="Update Manager" backAction={"AdminManagers"} />
            <View style={styles.container}>
                <LoadingModal show={indicator} />
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
                            name="Update Manager"
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

export default AdminUpdateManager;