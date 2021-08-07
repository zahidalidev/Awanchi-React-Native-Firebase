import React, { useState, useEffect } from 'react';
import {
    StatusBar, StyleSheet, Text, View, TouchableOpacity, Animated, ScrollView, Dimensions
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components
import Login from './Login';
import SignUp from './SignUp';

// config
import Colors from "../../config/Colors"


const { width } = Dimensions.get("window");

function Index(props) {

    const [translateXTabOne, setTranslateXTabOne] = useState(new Animated.Value(2000));
    const [translateY, setTranslateY] = useState(-1000);

    const handleSlide = type => {
        Animated.parallel([
            Animated.spring(translateXTabOne, {
                toValue: 0,
                duration: 100000,
                useNativeDriver: true
            }).start(),
        ]);
    };

    useEffect(() => {
        handleSlide()
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor={Colors.primary} />

            {/* top container */}
            <View style={{ backgroundColor: Colors.primary, width: "100%", flex: 0.9, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ marginTop: RFPercentage(-7), fontSize: RFPercentage(6), color: Colors.white }} >
                    Logo
                </Text>
            </View>

            {/* Bottom Contaienr */}
            <View style={{ marginTop: -RFPercentage(5), borderTopRightRadius: RFPercentage(5), borderTopLeftRadius: RFPercentage(5), backgroundColor: Colors.lightGrey, width: "100%", flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                <View style={{ width: "100%", justifyContent: 'flex-start', flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <ScrollView style={{ marginTop: RFPercentage(4) }} >
                        <Animated.View style={{ justifyContent: "center", alignItems: "center", transform: [{ translateX: translateXTabOne }] }} onLayout={event => setTranslateY(event.nativeEvent.layout.height)}>
                            <Login {...props} />
                        </Animated.View>
                    </ScrollView>
                </View>
            </View>
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