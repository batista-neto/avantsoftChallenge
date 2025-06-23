import AsyncStorage from "@react-native-async-storage/async-storage";
import base64 from "react-native-base64";
import axios from "../../../../../axiosMock";
import { AuthService } from "../../api/services/AuthService";

export class AuthServiceImpl implements AuthService {

    private baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

    async login(username: string, password: string): Promise<string> {
        try {
            const basicToken = base64.encode(`${username}:${password}`);
    
            const headers = {
                Authorization: `Basic ${basicToken}`,
            };
            
            const response = await axios.post(`${this.baseUrl}/auth/login`, {}, {
                headers,
            });
    
            await AsyncStorage.setItem('login', basicToken);
    
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            await AsyncStorage.removeItem("login");
        } catch (error) {
            throw error;
        }
    }
}