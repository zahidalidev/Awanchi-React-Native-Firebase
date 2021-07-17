import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from "../../config/Colors"

function AppTextInput({ autoFocus = false, elevation = 0, borderColor = Colors.primary, rightIcon = false, rightFunction, borderWidth = 0, placeHolder, value, onChange, width = "100%", height = RFPercentage(6), icon, fontWeight, rightButtonText, secure = false, iconType = "MaterialCommunityIcons", editable = true, startEdit, endEdit, border = false }) {
    const [eyeIcon, setEyeIcon] = useState(false)

    return (
        <View style={{
            backgroundColor: Colors.white, borderRadius: RFPercentage(1.2),
            width: width, alignItems: 'flex-start', justifyContent: 'center',
            borderWidth: borderWidth, borderColor: borderColor, height, elevation
        }}>
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }} >
                {iconType === "MaterialIcons" ?
                    <MaterialIcons color={Colors.grey} style={{ padding: RFPercentage(1), paddingRight: 0 }} size={RFPercentage(2.2)} name={icon} />
                    :
                    <MaterialCommunityIcons color={Colors.mediumGrey} style={{ padding: RFPercentage(1), paddingRight: 0 }} size={RFPercentage(3)} name={icon} />
                }

                <TextInput style={{ color: Colors.grey, padding: RFPercentage(1), width: rightButtonText ? "70%" : "90%", width: rightIcon ? "80%" : "90%", fontSize: RFPercentage(2.2) }}
                    placeholder={placeHolder}
                    value={value}
                    secureTextEntry={secure && !eyeIcon}
                    editable={editable}
                    onChangeText={(text) => onChange(text)}
                    onResponderStart={startEdit}
                    onSubmitEditing={endEdit}
                    autoFocus={autoFocus}
                />

                {secure ?
                    <TouchableOpacity onPress={() => setEyeIcon(!eyeIcon)} style={{ width: "10%", justifyContent: "center", alignItems: "flex-start" }} >
                        <MaterialCommunityIcons color={eyeIcon ? Colors.primary : Colors.secondary} style={{ right: RFPercentage(1) }} size={RFPercentage(3)} name={eyeIcon ? "eye-outline" : "eye-off-outline"} />
                    </TouchableOpacity>
                    : null}

                {rightButtonText ?
                    <TouchableOpacity style={{ width: "20%" }}>
                        <Text style={{ fontWeight: Platform.OS === "ios" ? "500" : "bold", color: Colors.primary, fontSize: RFPercentage(2) }} >{rightButtonText}</Text>
                    </TouchableOpacity>
                    : null}

                {rightIcon ?
                    <TouchableOpacity onPress={() => rightFunction()} style={{ width: "10%", justifyContent: "center", alignItems: "center" }} >
                        <MaterialCommunityIcons key={'3'} color={Colors.primary} style={{ right: RFPercentage(1) }} size={RFPercentage(3)} name={rightIcon} />
                    </TouchableOpacity>
                    : null
                }
            </View>
        </View>
    );
}

export default AppTextInput;