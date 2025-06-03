import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fontFamily, colors } from '../css/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { z } from 'zod';
import { postLogin, getDataStudent } from '../services/api';

const loginSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    senha: z.string()
        .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
        .regex(/[a-z]/, { message: "Senha deve conter letra minúscula" })
        .regex(/[A-Z]/, { message: "Senha deve conter letra maiúscula" })
        .regex(/[0-9]/, { message: "Senha deve conter número" })
        .regex(/[^a-zA-Z0-9]/, { message: "Senha deve conter caractere especial" }),
});

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);


    const handleLogin = async () => {
    setLoading(true);

    const resultSchema = loginSchema.safeParse({ email, senha });
        if (!resultSchema.success) {
            const messages = resultSchema.error.errors.map(e => e.message).join('\n');
            Alert.alert('Erro', messages);
            setLoading(false);
            return;
        }

        try {
            const response = await postLogin(email, senha);
            console.log("Response do login: ", response)
            if (response) {
                const dataStudent = await getDataStudent(response.id, response.token)
                if (dataStudent) {
                    navigation.navigate('Home', { student: dataStudent });
                }
            }

        } catch (error) {
            const errorMessage =
                error.response?.data ||
                error.message ||
                "Erro desconhecido";

            Alert.alert('Erro', errorMessage);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <View style={s.loadingContainer}>
                <ActivityIndicator size="large" color={colors.purpleButton} />
            </View>
        )
    }

    return (
        <View style={s.container}>
            <View style={s.header}>
                <Image
                    source={require('../../assets/img/logo.png')}
                    style={s.logo}
                />
            </View>
            <Text style={s.title}>
                LOGIN
            </Text>
            <View style={s.form}>
                <View style={s.viewInput}>
                    <MaterialIcons name="perm-identity" size={24} color={colors.purpleLight} />
                    <TextInput 
                        placeholder='Email'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        style={s.textInput}
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                </View>
                <View style={s.viewInput}>
                    <MaterialIcons name="lock-outline" size={24} color={colors.purpleLight} />
                    <TextInput 
                        placeholder='Senha'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        style={s.textInput}
                        onChangeText={text => setSenha(text)}
                        value={senha}
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('ChangePass')}>
                    <Text style={s.forgotPassword}>
                        Esqueci minha senha?
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={s.button} onPress={handleLogin}>
                <Text style={s.text}>
                    ENTRAR
                </Text>
            </TouchableOpacity>
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
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },
    title: {
        fontFamily: fontFamily.semiBold,
        fontSize: 28,
        color: colors.blackText,
        marginTop: 30,
    },
    form: {
        width: '100%',
        height: 200,
        backgroundColor: colors.whiteBackground,
        borderRadius: 10,
        alignItems: 'center',
        gap: 20,
        marginTop: 20,
    },
    viewInput: {
        borderColor: colors.purpleLight,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        placeholderTextColor: colors.blackText,
        fontSize: 14,
        fontFamily: fontFamily.medium,
        width: '60%',
        marginLeft: 5,
    },
    forgotPassword: {
        fontFamily: fontFamily.medium,
        fontSize: 14,
        color: colors.purpleLight,
    },
    button: {
        backgroundColor: colors.purpleButton,
        padding: 10,
        borderRadius: 5,
        width: '80%',
    },
    text: {
        textAlign: 'center',
        fontFamily: fontFamily.semiBold,
        fontSize: 16,
        color: colors.whiteText,
    },
})