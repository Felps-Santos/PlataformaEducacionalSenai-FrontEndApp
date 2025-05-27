import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fontFamily, colors } from '../css/theme';
import { AntDesign } from '@expo/vector-icons';

export default function Boletim() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    if (loading) {
        return (
            <View style={s.loadingContainer}>
                <ActivityIndicator size="large" color={colors.purpleButton} />
            </View>
        );
    }

    return (
        <View style={s.container}>
            <View style={s.header}>
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <AntDesign name='arrowleft' size={48} color={colors.whiteText} style={s.backIcon}/>
                </TouchableOpacity>
                <Text style={s.title}>
                    BOLETIM
                </Text>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    loadingContainer: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: colors.whiteBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: '100%',
        height: 160,
        backgroundColor: colors.marine,
        top: 0,
        position: 'absolute',
    },
    backIcon: {
        marginTop: 70,
        marginLeft: 20,
        position: 'absolute',
    },
    title: {
        fontFamily: fontFamily.semiBold,
        fontSize: 28,
        color: colors.whiteText,
        top: 75,
        alignSelf: 'center',
    },
})