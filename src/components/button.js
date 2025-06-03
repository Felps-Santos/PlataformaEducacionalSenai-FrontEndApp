import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { colors, fontFamily, icon } from "../css/theme";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const icons = {
    FontAwesome,
    AntDesign,
}

export function Button({ typeIcon, nameIcon, nameTitle, nav, args }) {
    const navigation = useNavigation();
    const Icon = icons[typeIcon];
    
    return (
        <TouchableOpacity style={s.button} onPress={() => navigation.navigate(nav, args)}>
            <Icon name={nameIcon} size={48} color={colors.purpleLight} />
            <Text style={s.buttonText}>{nameTitle}</Text>
        </TouchableOpacity>
    )
}

export const s = StyleSheet.create({
    button: {
        width: 130,
        height: 130,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.purpleLight,
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: fontFamily.medium,
        color: colors.purpleLight,
    },
});