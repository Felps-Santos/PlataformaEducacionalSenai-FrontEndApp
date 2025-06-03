import AsyncStorage from "@react-native-async-storage/async-storage";
import { use } from "react";

export const saveData = async (id, token) => {
    try {
        const userData = { id, token }
        const jsonValue = JSON.stringify(userData);
        await AsyncStorage.setItem('user', jsonValue);
    } catch (error) {
        console.error("Error storing data:", error);
    }
}

export const getData = async () => {
    try {
        const response = await AsyncStorage.getItem('user');
        return response != null ? JSON.parse(response) : null;
    } catch (error) {
        console.error("Error retrieving data:", error);
        return null;
    }
};

export const deleteData = async () => {
    try {
        await AsyncStorage.removeItem('user');
    } catch (error) {
        console.error("Error deleting data:", error);
    }
}