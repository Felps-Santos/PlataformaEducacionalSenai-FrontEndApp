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
        console.log("Attempting login with CPF:", cpf, "and password:", senha);
        const response = await api.post("auth/login", {
            cpf: cpf,
            senha: senha,
        })
        console.log("Login response:", response);
        if (response.status === 200) {
            saveData(response.data.id, response.data.token);
            return response.data;
        } else {
            throw new Error(error.response?.data?.message || "Login failed");

        }
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

// cpf = 83582821846