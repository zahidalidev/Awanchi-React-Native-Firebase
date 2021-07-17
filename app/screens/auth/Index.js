import React, { useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from "../../config/Colors"

function Index(props) {

    const [indicator, showIndicator] = useState(false)

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor={Colors.primary} />

            {/* Kitchen buddy top container */}
            <View style={{ backgroundColor: Colors.primary, width: "100%", flex: 0.7, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ marginTop: RFPercentage(-4), fontSize: RFPercentage(6), color: Colors.white }} >
                    Logo
                </Text>
            </View>

            {indicator
                ? <View style={{ marginTop: -RFPercentage(5), borderTopRightRadius: RFPercentage(5), borderTopLeftRadius: RFPercentage(5), backgroundColor: Colors.lightGrey, width: "100%", flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                    <ActivityIndicator color={Colors.primary} size={RFPercentage(6)} />
                </View>
                : <>
                    {/* Bottom Contaienr */}
                    <View style={{ marginTop: -RFPercentage(5), borderTopRightRadius: RFPercentage(5), borderTopLeftRadius: RFPercentage(5), backgroundColor: Colors.lightGrey, width: "100%", flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >


                    </View>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: Colors.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    }
})

export default Index;