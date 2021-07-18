import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components
import AppBar from '../../components/AppBar';
import AppTextInput from '../../components/commom/AppTextInput';
import AppTextButton from '../../components/commom/AppTextButton';

// config
import Colors from '../../config/Colors';

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
    ]);

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

    const handleSubmit = () => {

    }

    return (
        <View>
            <AppBar {...props} menu={false} title="Personal Information" backAction={"ProfileScreen"} />
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
                <View style={{ width: "100%", marginTop: RFPercentage(7), justifyContent: 'center', alignItems: 'center' }} >
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