import axios from "../../../../../axiosMock";
import { RegisterService } from "../../api";

export class RegisterServiceImpl implements RegisterService {
    private baseUrl = process.env.EXPO_PUBLIC_BASE_URL; 

    async register(user: any): Promise<void> {
        try {
            const body = {
                name: user.name,
                email: user.email,
                password: user.password,
                dateOfBirth: user.dateOfBirth
            };
    
            await axios.post(`${this.baseUrl}/user`, body);
            
            } catch (error: any) {
            throw error;
        }
    }
}