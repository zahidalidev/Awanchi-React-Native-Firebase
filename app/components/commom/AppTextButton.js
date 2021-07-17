import React from 'react';
import { Text } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Button } from 'react-native-paper';

function AppTextButton({ onLayout = () => { }, disabled = false, name, icon, onSubmit, width, height = RFPercentage(6), borderRadius = 10, backgroundColor = "black", iconSize = 20, iconLeft, buttonStyle, textStyle }) {
    return (
        <Button onLayout={(event) => onLayout(event)} disabled={disabled} width={width} color={backgroundColor} mode="contained" onPress={() => onSubmit()} style={{ height, borderRadius: borderRadius, justifyContent: "center", ...buttonStyle }} >
            {
                iconLeft ?
                    <MaterialCommunityIcons style={{ padding: RFPercentage(1.6), paddingRight: name ? 0 : RFPercentage(1.6) }
                    } color="white" size={iconSize} name={iconLeft} />
                    : null
            }
            {
                name ?
                    <Text numberOfLines={1} style={{ color: "white", fontSize: RFPercentage(2.2), ...textStyle }} >{name}</Text>
                    : null
            }
            {
                icon ?
                    <MaterialCommunityIcons style={{ padding: RFPercentage(1.6), paddingLeft: name ? 0 : RFPercentage(1.6) }} color="white" size={iconSize} name={icon} />
                    : null
            }
        </Button >
    );
}

export default AppTextButton;