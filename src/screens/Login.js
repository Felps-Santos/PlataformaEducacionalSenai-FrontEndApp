import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fontFamily, colors } from '../css/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { z } from 'zod';
import { postLogin } from '../services/api';

function isValidCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

const loginSchema = z.object({
    cpf: z.string()
        .length(11, { message: "CPF deve ter 11 dígitos" })
        .regex(/^\d+$/, { message: "Matrícula deve conter apenas números" })
        .refine((cpf) => isValidCPF(cpf), { message: "CPF inválido" }),
    senha: z.string()
        .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
        .regex(/[a-z]/, { message: "Senha deve conter letra minúscula" })
        .regex(/[A-Z]/, { message: "Senha deve conter letra maiúscula" })
        .regex(/[0-9]/, { message: "Senha deve conter número" })
        .regex(/[^a-zA-Z0-9]/, { message: "Senha deve conter caractere especial" }),
});

export default function Login() {
    const navigation = useNavigation();
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);


    const handleLogin = async () => {
        setLoading(true);

        const resultSchema = loginSchema.safeParse({ cpf, senha });
        if (!resultSchema.success) {
            const messages = resultSchema.error.errors.map(e => e.message).join('\n');
            Alert.alert('Erro', messages);
            setLoading(false);
            return;
        }

        try {
            console.log('Tentando login com CPF:', cpf, 'e senha:', senha);
            const response = await postLogin(cpf, senha);
            console.log('Resposta do login:', response);
            if (response) {
                Alert.alert('Sucesso', 'Login realizado com sucesso!');
                navigation.navigate('Home');
            }
        } catch (error) {
            Alert.alert('Erro', error);
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
                        placeholder='CPF'
                        keyboardType='numeric'
                        style={s.textInput}
                        onChangeText={text => setCpf(text)}
                        value={cpf}
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