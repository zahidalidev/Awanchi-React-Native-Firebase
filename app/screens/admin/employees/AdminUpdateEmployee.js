import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReactNativeCrossPicker from "react-native-cross-picker"

// components
import AppBar from '../../../components/AppBar';
import AppTextButton from '../../../components/commom/AppTextButton';

// config
import Colors from '../../../config/Colors';
import AppTextInput from '../../../components/commom/AppTextInput';
import { useEffect } from 'react';
import { getAllUsersByRoles, getUserRef, updateUser } from '../../../services/UserServices';
import LoadingModal from '../../../components/commom/LoadingModal';

function AdminUpdateEmployee(props) {
    const [indicator, setIndicator] = useState(false);
    const [selectedManager, setManager] = useState('')

    const [allManagers, setAllmanagers] = useState([{}])

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

    const getAllManagers = async () => {
        try {
            let userRef = await getUserRef();
            userRef.onSnapshot(querySnapShot => {
                querySnapShot.docChanges().forEach(async (change) => {
                    setIndicator(true);
                    let res = await getAllUsersByRoles('manager');
                    if (!res) {
                        alert('No manager found');
                        return;
                    }
                    let temp = []
                    for (let i = 0; i < res.length; i++) {
                        let tempObj = { label: res[i].name, value: res[i].name };
                        temp.push(tempObj);
                    }
                    setAllmanagers(temp)
                    setIndicator(false);
                })
            })
        } catch (error) {

        }
    }

    const updateEmployeeDetails = () => {
        let user = props.route.params.item;
        let tempFeilds = [...feilds];
        tempFeilds[0].value = user.name
        tempFeilds[1].value = user.email
        tempFeilds[2].value = user.fiverUserName
        tempFeilds[3].value = user.address
        tempFeilds[4].value = user.password
        setManager(user.manager)
        setFeilds(tempFeilds);
    }

    useEffect(() => {
        getAllManagers();
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
            manager: selectedManager
        }

        try {
            await updateUser(props.route.params.item.docId, userDetail)
        } catch (error) {
            console.log("user Update: ", error)
        }
        setIndicator(false)
    }

    return (
        <View style={{ flex: 1 }} >
            <AppBar {...props} menu={false} title="Update Employee" backAction={"AdminEmployees"} />
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

                    <View style={{ marginTop: RFPercentage(5), width: "100%" }} >
                        <ReactNativeCrossPicker
                            modalTextStyle={{ color: Colors.primary }}
                            mainComponentStyle={{ borderColor: "rgba(0, 74, 173, 0)", backgroundColor: Colors.white }}
                            iconComponent={iconComponent}
                            items={allManagers}
                            setItem={setManager} selectedItem={selectedManager}
                            placeholder="Change Manager"
                            modalMarginTop={"90%"} // popup model margin from the top 
                        />
                    </View>

                    {/* Add Employee button */}
                    <View style={{ marginBottom: RFPercentage(4), width: "100%", marginTop: RFPercentage(5), justifyContent: 'center', alignItems: 'center' }} >
                        <AppTextButton
                            name="Update Employee"
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

export default AdminUpdateEmployee;