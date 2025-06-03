import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { fontFamily, colors } from "../css/theme";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { ViewButtons } from "../components/viewButtons";
import { deleteData, getData } from "../services/asyncStorage";

export default function Home({ route }) {
    const navigation = useNavigation();
    const { student } = route.params;
    const firstName = student.nome.split(" ")[0];

    const handleLogout = async () => {
        await deleteData();
        const response = await getData();
        if (response === null) {
            navigation.navigate('Login');
        }
    }

    return (
        <View style={s.container}>
            <View style={s.header}>
                <Image
                    source={require('../../assets/img/logo.png')}
                    style={s.logo}
                />
                <TouchableOpacity style={s.logoutButton} onPress={handleLogout}>
                    <AntDesign name="logout" color={colors.whiteText} size={32}/>
                </TouchableOpacity>
            </View>
            <View style={s.apresentation}>
                <Text style={s.title}>
                    Olá, {firstName}
                </Text>
                <Text style={s.subtitle}>
                    Seja bem-vindo(a) ao portal
                </Text>
            </View>
            <ViewButtons
                typeIcon1="FontAwesome"
                nameIcon1="tasks"
                nameTitle1="TAREFAS"
                nav1="Tasks"
                typeIcon2="AntDesign"
                nameIcon2="file1"
                nameTitle2="BOLETIM"
                nav2="ReportCard"
            />
            <ViewButtons
                typeIcon1="FontAwesome"
                nameIcon1="calendar"
                nameTitle1="GRADE"
                nav1="Grade"
                typeIcon2="FontAwesome"
                nameIcon2="user"
                nameTitle2="PERFIL"
                nav2="Profile"
                args2={{ dataProfile: student }}
            />
        </View>
    )
}

const s = StyleSheet.create({
    logoutButton: {
        alignSelf: 'flex-end',
        top: 80,
        right: 20,
        position: 'absolute',
    },
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
    apresentation: {
        marginTop: 80,
        alignItems: "center",
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'flex-start',
        top: 20,
    },
    title: {
        fontFamily: fontFamily.semiBold,
        fontSize: 32,
        color: colors.blackText,
    },
    subtitle: {
        fontFamily: fontFamily.medium,
        fontSize: 14,
    },
})