import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fontFamily, colors } from '../css/theme';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from "date-fns";

export default function Perfil({ route }) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { dataProfile } = route.params;
    
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
                    PERFIL
                </Text>
            </View>
            <View style={s.mainInformation}>
                <Image
                    source={require('../../assets/img/user.png')}
                    style={s.user}
                />
                <View style={s.nameStudent}>
                    <Text style={s.textStudent}>
                        {dataProfile.nome}
                    </Text>
                </View>
                <View style={s.card}>
                    <Text>
                        Aqui contém o curso
                    </Text>
                    <Text>
                        Aqui contém o email
                    </Text>
                    <Text>
                        Aqui contém o período
                    </Text>
                </View>
                <View style={s.information}>
                    <Text style={s.label}>
                        CPF:
                    </Text>
                    <Text style={s.value}>
                        {dataProfile.CPF}
                    </Text>
                </View>
                <View style={s.information}>
                    <Text style={s.label}>
                        Telefone:
                    </Text>
                    <Text style={s.value}>
                        {dataProfile.telefone}
                    </Text>
                </View>
                <View style={s.information}>
                    <Text style={s.label}>
                        Email:
                    </Text>
                    <Text style={s.value}>
                        {dataProfile.email}
                    </Text>
                </View>
                <Text style={[s.label, { marginTop: 10, color: colors.purpleLight, fontFamily: fontFamily.medium }]}>
                    Logradouro
                </Text>
                <View style={s.information}>
                    <Text style={s.label}>
                        Logradouro:
                    </Text>
                    <Text style={s.value}>
                        {dataProfile.logradouro}
                    </Text>
                </View>
                <View style={s.information}>
                    <Text style={s.label}>
                        Numero:
                    </Text>
                    <Text style={s.value}>
                        {dataProfile.numero}
                    </Text>
                </View>
                <View style={s.information}>
                    <Text style={s.label}>
                        Bairro:
                    </Text>
                    <Text style={s.value}>
                        {dataProfile.bairro}
                    </Text>
                </View>
                <View style={s.information}>
                    <Text style={s.label}>
                        Cidade:
                    </Text>
                    <Text style={s.value}>
                        {dataProfile.cidade}
                    </Text>
                </View>
                <TouchableOpacity style={s.button}>
                    <Text style={s.text}>
                        EDITAR PERFIL
                    </Text>
                </TouchableOpacity>
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
        justifyContent: 'flex-end',
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
    user: {
        width: 130,
        height: 130,
        alignSelf: "center",
    },
    title: {
        fontFamily: fontFamily.semiBold,
        fontSize: 28,
        color: colors.whiteText,
        top: 75,
        alignSelf: 'center',
    },
    card: {
        borderColor: colors.purpleLight,
        borderWidth: 1,
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        padding: 10,
    },
    mainInformation: {
        width: "100%",
        height: "80%",
        marginTop: 75,
        gap: 5,
    },
    information: {
        flexDirection: 'row',
    },
    nameStudent: {
        alignSelf: "center",
    },
    textStudent: {
        fontFamily: fontFamily.medium,
        fontSize: 18,
    },
    label: {
        fontFamily: fontFamily.regular,
        color: colors.blackText,
        width: 150,
        paddingLeft: 20,
    },
    value: {
        fontFamily: fontFamily.regular,
        color: colors.blackText
    },
    button: {
        backgroundColor: colors.purpleButton,
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignSelf: "center",
        marginTop: 20,
    },
    text: {
        textAlign: 'center',
        fontFamily: fontFamily.semiBold,
        fontSize: 16,
        color: colors.whiteText,
    },
})