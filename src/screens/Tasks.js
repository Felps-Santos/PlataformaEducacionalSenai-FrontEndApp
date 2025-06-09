import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fontFamily, colors } from '../css/theme';
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Tarefas() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Concluídas', value: 'concluidas' },
        { label: 'Em andamento', value: 'em andamento' },
        { label: 'Atrasadas', value: 'atrasadas' },
    ]);

    const tarefas = [
        { id: 1, title: 'Tarefa 1', status: 'concluidas' },
        { id: 2, title: 'Tarefa 2', status: 'em andamento' },
        { id: 3, title: 'Tarefa 3', status: 'atrasadas' },
        { id: 4, title: 'Tarefa 4', status: 'concluidas' },
        { id: 5, title: 'Tarefa 5', status: 'em andamento' },
        { id: 6, title: 'Tarefa 6', status: 'atrasadas' },
        { id: 7, title: 'Tarefa 7', status: 'concluidas' },
        { id: 8, title: 'Tarefa 8', status: 'em andamento' },
        { id: 9, title: 'Tarefa 9', status: 'atrasadas' },
        { id: 10, title: 'Tarefa 10', status: 'concluidas' },
    ];

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
                <TouchableOpacity onPress={() => navigation.goBack()} style={s.backIcon}>
                    <AntDesign name="arrowleft" size={48} color={colors.whiteText} />
                </TouchableOpacity>
                <Text style={s.title}>TAREFAS</Text>
            </View>

            <View style={s.filterContainer}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Selecione uma categoria..."
                    style={s.dropDown}
                    dropDownContainerStyle={s.dropDownOpen}
                    textStyle={s.textDropDown}
                />
            </View>

            <FlatList
                data={tarefas.filter(tarefa => value === null || tarefa.status === value)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => Alert.alert(`Tarefa: ${item.title}`)}
                        style={s.taskItem}
                    >
                        <Text style={s.taskText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    <TouchableOpacity
                        onPress={() => Alert.alert('Nenhuma tarefa encontrada')}
                        style={{ padding: 20, alignItems: 'center' }}
                    >
                        <Text style={{ fontFamily: fontFamily.regular, color: colors.blackText }}>Nenhuma tarefa encontrada</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={s.listContent}
                showsVerticalScrollIndicator={false}
            />
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
        alignItems: 'center',
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
        marginTop: 74,
    },
    filterContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
        zIndex: 1,
    },
    dropDown: {
        borderColor: colors.purpleLight,
    },
    dropDownOpen: {
        borderColor: colors.purpleLight,
    },
    textDropDown: {
        fontSize: 16,
        color: colors.blackText,
    },
    listContent: {
        paddingBottom: 20,
    },
    taskItem: {
        padding: 15,
        borderWidth: 1,
        borderColor: colors.purpleLight,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    taskText: {
        fontFamily: fontFamily.regular,
        fontSize: 18,
    },
});