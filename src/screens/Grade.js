import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fontFamily, colors } from '../css/theme';
import { AntDesign } from '@expo/vector-icons';
import { getData } from '../services/asyncStorage';
import { getPeriodStudent } from '../services/api';

export default function Grade() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [dataGrade, setDataGrade] = useState(null);

    const fetchData = async () => {
        try {
            const user = await getData();
            if (user) {
                const periodResponse = await getPeriodStudent(user.id, user.token);
                if (periodResponse) {
                    const periodosEmAndamento = periodResponse
                        .filter(item => item.status === "ANDAMENTO")
                        .sort((a, b) => b.numero - a.numero);

                    if (periodosEmAndamento.length > 0) {
                        console.log("Periodos em andamento: ", periodosEmAndamento[0]);
                        setDataGrade(periodosEmAndamento[0]);
                    } else {
                        Alert.alert("Erro", "Nenhum semestre em andamento encontrado.");
                    }
                } else {
                    Alert.alert("Erro", "Não foi possível carregar os dados.");
                }
            } else {
                Alert.alert("Erro", "Usuário não encontrado.");
                navigation.goBack();
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Ocorreu um erro ao buscar a grade.");
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

    return (
        <View style={s.container}>
            <View style={s.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={48} color={colors.whiteText} style={s.backIcon} />
                </TouchableOpacity>
                <Text style={s.title}>GRADE</Text>
            </View>

            <View style={s.content}>
                <FlatList
                    data={dataGrade?.semestreDisciplinas || []}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={s.card}>
                            <Text style={s.label}>📘NOME: {item.id.nomeDisciplina}</Text>
                            <Text style={s.label}>⏱️CARGA HORÁRIA: {item.id.cargaHoraria} horas</Text>
                            <Text style={s.label}>👨‍🏫PROFº: {item.id.nomeProfessor}</Text>
                            <Text style={s.label}>🎓PERÍODO: {dataGrade.numero}º Semestre</Text>
                            <Text style={s.label}>📅DIA: {item.diaSemana}</Text>
                            <Text style={s.status}>📌STATUS: {item.status}</Text>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <Text style={{ textAlign: 'center', marginTop: 20, fontFamily: fontFamily.regular, color: colors.blackText }}>
                            Nenhuma disciplina encontrada.
                        </Text>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
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
    },
    header: {
        width: '100%',
        height: 160,
        backgroundColor: colors.marine,
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
    },
    backIcon: {
        position: 'absolute',
        top: 70,
        left: 20,
    },
    title: {
        fontFamily: fontFamily.semiBold,
        fontSize: 28,
        color: colors.whiteText,
        alignSelf: 'center',
        marginTop: 75,
    },
    content: {
        marginTop: 180,
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: colors.whiteBackground,
        borderColor: colors.purpleLight,
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,
    },
    label: {
        fontFamily: fontFamily.medium,
        fontSize: 14,
        color: colors.blackText,
        marginBottom: 4,
    },
    status: {
        marginTop: 6,
        fontFamily: fontFamily.medium,
        fontSize: 14,
        color: colors.purpleLight,
    },
});
