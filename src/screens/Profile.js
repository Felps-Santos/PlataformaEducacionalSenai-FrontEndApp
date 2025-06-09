import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fontFamily, colors } from '../css/theme';
import { AntDesign } from '@expo/vector-icons';
import { getDataStudent, getCurseStudent, getPeriodStudent } from '../services/api';
import { getData } from '../services/asyncStorage';

export default function Perfil() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [dataProfile, setDataProfile] = useState(null);
    const [curse, setCurse] = useState(null);
    const [period, setPeriod] = useState(null);
    const maskCPF = (cpf) => {
        if (!cpf) return '';
        return cpf.replace(/^(\d{3})\d{3}\d{3}(\d{2})$/, '$1.***.***-$2');
    };

    const maskPhone = (phone) => {
        if (!phone) return '';
        return phone.replace(/^(\d{2})\d{5}(\d{2})(\d{2})$/, '($1)*****-**$3');
    };



    const fetchData = async () => {
        try {
            const user = await getData();
            if (user) {
                const response = await getDataStudent(user.id, user.token);
                const curseResponse = await getCurseStudent(user.id, user.token);
                const periodResponse = await getPeriodStudent(user.id, user.token);
                if (response && curseResponse && periodResponse) {
                    const maiorPeriodo = periodResponse.length > 0 ? Math.max(...periodResponse.map(item => item.numero)) : null;
                    setDataProfile(response);
                    setCurse(curseResponse);
                    setPeriod(maiorPeriodo);
                } else {
                    Alert.alert("Erro", "Não foi possível carregar os dados.");
                }
            } else {
                Alert.alert("Erro", "Usuário não encontrado.");
                navigation.goBack();
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Ocorreu um erro ao buscar os dados.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            fetchData();
        }, [])
    );

    if (loading) {
        return (
            <View style={s.loadingContainer}>
                <ActivityIndicator size="large" color={colors.purpleButton} />
            </View>
        );
    }

    if (!dataProfile) {
        return (
            <View style={s.loadingContainer}>
                <Text>Dados não encontrados.</Text>
            </View>
        );
    }

    return (
        <View style={s.container}>
            <View style={s.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={48} color={colors.whiteText} style={s.backIcon} />
                </TouchableOpacity>
                <Text style={s.title}>PERFIL</Text>
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
                    <View style={s.information}>
                        <Text style={s.textCard}>Curso:</Text>
                        <Text style={s.value}>{curse.nome}</Text>
                    </View>
                    <View style={s.information}>
                        <Text style={s.textCard}>Email:</Text>
                        <Text style={s.value}>{dataProfile.email}</Text>
                    </View>
                    <View style={s.information}>
                        <Text style={s.textCard}>Período:</Text>
                        <Text style={s.value}>{period ? `${period}º Semestre` : 'Período não informado'}</Text>
                    </View>
                </View>

                <View style={s.information}>
                    <Text style={s.label}>CPF:</Text>
                    <Text style={s.value}>{maskCPF(dataProfile.CPF)}</Text>
                </View>

                <View style={s.information}>
                    <Text style={s.label}>Telefone:</Text>
                    <Text style={s.value}>{maskPhone(dataProfile.telefone)}</Text>
                </View>

                <Text style={[s.label, { marginTop: 10, color: colors.purpleLight, fontFamily: fontFamily.medium }]}>
                    Endereço
                </Text>

                <View style={s.information}>
                    <Text style={s.label}>Logradouro:</Text>
                    <Text style={s.value}>{dataProfile.logradouro}</Text>
                </View>
                <View style={s.information}>
                    <Text style={s.label}>Número:</Text>
                    <Text style={s.value}>{dataProfile.numero}</Text>
                </View>
                <View style={s.information}>
                    <Text style={s.label}>Bairro:</Text>
                    <Text style={s.value}>{dataProfile.bairro}</Text>
                </View>
                <View style={s.information}>
                    <Text style={s.label}>Cidade:</Text>
                    <Text style={s.value}>{dataProfile.cidade}, {dataProfile.UF}</Text>
                </View>

                <TouchableOpacity style={s.button} onPress={() => navigation.navigate('EditProfile', { dataProfile })}>
                    <Text style={s.text}>EDITAR PERFIL</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
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
        borderColor: colors.purpleLight,
        borderWidth: 2,
        borderRadius: 100,
        marginTop: 20,
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
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        padding: 10,
        gap: 5,
    },
    textCard: {
        fontFamily: fontFamily.medium,
        paddingRight: 10,
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
        marginTop: 10,
    },
    text: {
        textAlign: 'center',
        fontFamily: fontFamily.semiBold,
        fontSize: 16,
        color: colors.whiteText,
    },
})