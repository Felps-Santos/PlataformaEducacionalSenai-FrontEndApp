import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fontFamily, colors } from '../css/theme';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { z } from 'zod';

export default function Redefinicao() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const changePassSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    senha: z.string()
        .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
        .regex(/[a-z]/, { message: "Senha deve conter letra minúscula" })
        .regex(/[A-Z]/, { message: "Senha deve conter letra maiúscula" })
        .regex(/[0-9]/, { message: "Senha deve conter número" })
        .regex(/[^a-zA-Z0-9]/, { message: "Senha deve conter caractere especial" }),
    confirmarSenha: z.string()
    }).refine(data => data.senha === data.confirmarSenha, {
        message: "As senhas não coincidem",
        path: ["confirmarSenha"]
    });

    const handleChange = () => {
        setLoading(true);
        const result = changePassSchema.safeParse({ email, senha, confirmarSenha });
        if (!result.success) {
            const messages = result.error.errors.map(e => e.message).join('\n');
            Alert.alert('Erro', messages);
            setLoading(false);
            return;
        }
        setLoading(false);
        Alert.alert('Senha alterada com sucesso!');
        navigation.navigate('Login');
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
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <AntDesign name='arrowleft' size={48} color={colors.whiteText} style={s.backIcon}/>
                </TouchableOpacity>
            </View>
            <Text style={s.title}>
                REDEFINIÇÃO DE SENHA
            </Text>
            <View style={s.form}>
                <View style={s.viewInput}>
                    <MaterialIcons name="alternate-email" size={22} color={colors.purpleLight} />
                    <TextInput 
                        placeholder='Email'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        style={s.textInput}
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                </View>
                <View style={s.viewInput}>
                    <MaterialIcons name="lock-outline" size={22} color={colors.purpleLight} />
                    <TextInput 
                        placeholder='Senha'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        style={s.textInput}
                        onChangeText={text => setSenha(text)}
                        value={senha}
                    />
                </View>
                <View style={s.viewInput}>
                    <MaterialIcons name="lock-outline" size={22} color={colors.purpleLight} />
                    <TextInput 
                        placeholder='Confirmar Senha'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        style={s.textInput}
                        onChangeText={text => setConfirmarSenha(text)}
                        value={confirmarSenha}
                    />
                </View>
            </View>
            <TouchableOpacity style={s.button} onPress={handleChange}>
                <Text style={s.text}>
                    ALTERAR
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
    backIcon: {
        marginTop: 70,
        marginLeft: 20,
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
    button: {
        backgroundColor: colors.purpleButton,
        padding: 10,
        borderRadius: 5,
        width: '80%',
        marginTop: 10,
    },
    text: {
        textAlign: 'center',
        fontFamily: fontFamily.semiBold,
        fontSize: 16,
        color: colors.whiteText,
    },
})