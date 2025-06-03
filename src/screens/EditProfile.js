import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fontFamily, colors } from '../css/theme';
import { AntDesign } from '@expo/vector-icons';
import { updateDataStudent } from '../services/api';
import { getData } from '../services/asyncStorage';

export default function EditProfile() {
    const navigation = useNavigation();
    const route = useRoute();
    const { dataProfile } = route.params;

    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState(dataProfile.nome);
    const [telefone, setTelefone] = useState(dataProfile.telefone);
    const [logradouro, setLogradouro] = useState(dataProfile.logradouro);
    const [bairro, setBairro] = useState(dataProfile.bairro);
    const [numero, setNumero] = useState(dataProfile.numero.toString());
    const [cidade, setCidade] = useState(dataProfile.cidade);
    const [UF, setUF] = useState(dataProfile.UF);

    const handleSave = async () => {
        setLoading(true);
        try {
            const updatedData = {
                nome,
                telefone,
                logradouro,
                bairro,
                numero: parseInt(numero),
                cidade,
                UF,
            };

            const storage = await getData();
            const response = await updateDataStudent(storage.id, updatedData, storage.token);
            if (response) {
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
                navigation.goBack();
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
        } finally {
            setLoading(false);
        }
    };

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
                <Text style={s.title}>EDITAR PERFIL</Text>
            </View>

            <ScrollView contentContainerStyle={s.scrollContent}>
                <View style={s.form}>
                    <Text style={s.label}>Nome</Text>
                    <TextInput
                        style={s.input}
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Text style={s.label}>Telefone</Text>
                    <TextInput
                        style={s.input}
                        placeholder="Telefone"
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType="phone-pad"
                    />

                    <Text style={s.label}>Logradouro</Text>
                    <TextInput
                        style={s.input}
                        placeholder="Logradouro"
                        value={logradouro}
                        onChangeText={setLogradouro}
                    />

                    <Text style={s.label}>Bairro</Text>
                    <TextInput
                        style={s.input}
                        placeholder="Bairro"
                        value={bairro}
                        onChangeText={setBairro}
                    />

                    <Text style={s.label}>Número</Text>
                    <TextInput
                        style={s.input}
                        placeholder="Número"
                        value={numero}
                        onChangeText={setNumero}
                        keyboardType="numeric"
                    />

                    <Text style={s.label}>Cidade</Text>
                    <TextInput
                        style={s.input}
                        placeholder="Cidade"
                        value={cidade}
                        onChangeText={setCidade}
                    />

                    <Text style={s.label}>UF</Text>
                    <TextInput
                        style={s.input}
                        placeholder="UF"
                        value={UF}
                        onChangeText={setUF}
                    />

                    <TouchableOpacity style={s.button} onPress={handleSave}>
                        <Text style={s.text}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const s = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: colors.whiteBackground,
    },
    header: {
        width: '100%',
        height: 160,
        backgroundColor: colors.marine,
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
        marginTop: 72,
        alignSelf: "center",
    },
    scrollContent: {
        paddingBottom: 20,
    },
    form: {
        padding: 20,
    },
    label: {
        fontFamily: fontFamily.medium,
        fontSize: 14,
        color: colors.blackText,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.purpleLight,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        fontFamily: fontFamily.regular,
        fontSize: 14,
    },
    button: {
        backgroundColor: colors.purpleButton,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        fontFamily: fontFamily.semiBold,
        fontSize: 16,
        color: colors.whiteText,
    },
});