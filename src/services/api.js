import axios from "axios";
import { saveData, getData } from "./asyncStorage";

const API_BASE_URL = "http://192.168.248.84:8080/aluno/"

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const postLogin = async (email, senha) => {
    try {
        const response = await api.post("auth/login", {
            email: email,
            senha: senha,
        })
        if (response.status === 200) {
            console.log("Id: ", response.data.id, "\nToken: ", response.data.token)
            await saveData(response.data.id, response.data.token);
            return response.data;
        } else {
            console.error("Error during login:", error);
            throw error;
        }
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

export const getDataStudent = async (id, token) => {
    try {
        const response = await api.get(`${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response && response.data) {
            return response.data;
        } else {
            console.error("Aluno não encontrado");
            return null;
        }
    } catch (error) {
        console.error("Erro ao tentar buscar dados do aluno: ", error);
        return null
    }
}

export const getCurseStudent = async (id, token) => {
    try {
        const response = await api.get(`curso/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error("Erro ao buscar curso do aluno: ", error);
        return null
    }
}

export const getPeriodStudent = async (id, token) => {
    try {
        const response = await api.get(`${id}/semestres`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response && response.data) {
            return response.data
        }
    } catch (error) {
        console.error("Erro ao buscar periodo do aluno: ", error);
        return null
    }
}

export const updateDataStudent = async (id, updatedData, token) => {
    try {
        const response = await api.put(`editar/${id}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar os dados do estudante:", error);
        throw error;
    }
};