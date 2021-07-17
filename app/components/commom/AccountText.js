import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../config/Colors';

function AccountText(props) {
    const { description, buttnText, location, navigate } = props;
    return (
        <View style={{ width: "100%", backgroundColor: Colors.lightGrey }} >
            <View style={{ marginBottom: RFPercentage(5), marginLeft: "7.5%", width: "85%", flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }} >
                <Text style={{ color: "grey", fontSize: RFPercentage(1.7) }} >{description}</Text>
                <TouchableOpacity onPress={() => navigate(location)} ><Text style={{ color: Colors.secondary, fontWeight: "bold", fontSize: RFPercentage(1.7) }} >{buttnText}</Text></TouchableOpacity>
            </View>
        </View>
    );
}


export default AccountText;