import React, { useState } from 'react';
import {
    ActivityIndicator, StatusBar, StyleSheet, Text, View, TouchableOpacity, Animated, ScrollView, Dimensions
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components

// config
import Colors from "../../config/Colors"

const { width } = Dimensions.get("window");

function Index(props) {

    const [indicator, showIndicator] = useState(false);
    const [active, setActive] = useState(0);
    const [xTabOne, setXTabOne] = useState(0);
    const [xTabTwo, setXTabTwo] = useState(0);
    const [translateX, setTranslateX] = useState(new Animated.Value(0));
    const [translateXTabOne, setTranslateXTabOne] = useState(new Animated.Value(0));
    const [translateXTabTwo, setTranslateXTabTwo] = useState(new Animated.Value(width));
    const [translateY, setTranslateY] = useState(-1000);

    const handleSlide = type => {
        Animated.spring(translateX, {
            toValue: type,
            duration: 100,
            useNativeDriver: true
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100,
                    useNativeDriver: true
                }).start()
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100,
                    useNativeDriver: true
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }).start()
            ]);
        }
    };

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
                        <View style={{ width: "70%", justifyContent: 'flex-start', flex: 1 }}>

                            {/* Tabs */}
                            <View style={{ flexDirection: "row", height: RFPercentage(5), marginTop: RFPercentage(3) }}>
                                <Animated.View style={{ position: "absolute", width: "50%", height: "100%", top: 0, left: 0, backgroundColor: Colors.primary, borderRadius: 4, transform: [{ translateX }] }} />
                                <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 4, borderRightWidth: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                    onLayout={event => setXTabOne(event.nativeEvent.layout.x)} onPress={() => { setActive(0); handleSlide(xTabOne) }}
                                >
                                    <Text style={{ fontSize: RFPercentage(2.2), color: active === 0 ? Colors.white : Colors.primary }}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 4, borderLeftWidth: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                    onLayout={event => { setXTabTwo(event.nativeEvent.layout.x) }} onPress={() => { setActive(1); handleSlide(xTabTwo) }}
                                >
                                    <Text style={{ fontSize: RFPercentage(2.2), color: active === 1 ? Colors.white : Colors.primary }}>
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Login and Sign Up Container */}
                            <ScrollView style={{ marginTop: RFPercentage(4) }} >
                                <Animated.View style={{ justifyContent: "center", alignItems: "center", transform: [{ translateX: translateXTabOne }] }} onLayout={event => setTranslateY(event.nativeEvent.layout.height)}>
                                    <Text>Hi, I am a Login</Text>
                                </Animated.View>

                                <Animated.View style={{ justifyContent: "center", alignItems: "center", transform: [{ translateX: translateXTabTwo }, { translateY: -translateY }] }}>
                                    <Text>Hi, I am a SignUp</Text>
                                </Animated.View>
                            </ScrollView>
                        </View>

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