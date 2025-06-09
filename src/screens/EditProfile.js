import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
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
    const [open, setOpen] = useState(false);
    const [valueUF, setValueUF] = useState(dataProfile.UF);
    const [items, setItems] = useState([
        { label: 'AC', value: 'AC' },
        { label: 'AL', value: 'AL' },
        { label: 'AP', value: 'AP' },
        { label: 'AM', value: 'AM' },
        { label: 'BA', value: 'BA' },
        { label: 'CE', value: 'CE' },
        { label: 'DF', value: 'DF' },
        { label: 'ES', value: 'ES' },
        { label: 'GO', value: 'GO' },
        { label: 'MA', value: 'MA' },
        { label: 'MT', value: 'MT' },
        { label: 'MS', value: 'MS' },
        { label: 'MG', value: 'MG' },
        { label: 'PA', value: 'PA' },
        { label: 'PB', value: 'PB' },
        { label: 'PR', value: 'PR' },
        { label: 'PE', value: 'PE' },
        { label: 'PI', value: 'PI' },
        { label: 'RJ', value: 'RJ' },
        { label: 'RN', value: 'RN' },
        { label: 'RS', value: 'RS' },
        { label: 'RO', value: 'RO' },
        { label: 'RR', value: 'RR' },
        { label: 'SC', value: 'SC' },
        { label: 'SP', value: 'SP' },
        { label: 'SE', value: 'SE' },
        { label: 'TO', value: 'TO' },
    ]);


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
                UF: valueUF,
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
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={s.container}>
                <View style={s.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={48} color={colors.whiteText} style={s.backIcon} />
                    </TouchableOpacity>
                    <Text style={s.title}>EDITAR PERFIL</Text>
                </View>

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

                    <Text style={s.label}>UF</Text>
                    <DropDownPicker
                    open={open}
                    value={valueUF}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValueUF}
                    setItems={setItems}
                    onChangeValue={(value) => setValueUF(value)}
                    style={s.dropDown}
                    dropDownContainerStyle={s.dropDownOpen}
                    textStyle={s.textDropDown}
                    dropDownDirection="TOP"
                    listMode="MODAL"
                    />

                    <Text style={s.label}>Cidade</Text>
                    <TextInput
                    style={s.input}
                    placeholder="Cidade"
                    value={cidade}
                    onChangeText={setCidade}
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

                    <TouchableOpacity style={s.button} onPress={handleSave}>
                    <Text style={s.text}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
    dropDown: {
        borderColor: colors.purpleLight,
        marginBottom: 15,
    },
    dropDownOpen: {
        borderColor: colors.purpleLight,
    },
    textDropDown: {
        fontSize: 16,
        color: colors.blackText,
    },
});