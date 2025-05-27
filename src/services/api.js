import axios from "axios";
import { saveData } from "./asyncStorage";

const API_BASE_URL = "http://192.168.248.84:8080/aluno/"

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const postLogin = async (cpf, senha) => {
    try {
        const response = await api.post("auth/login", {
            CPF: cpf,
            senha: senha,
        })
        if (response.status === 200) {
            saveData(response.data.id, response.data.token);
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

// cpf = 83582821846
// nao existe = 00602480841