import { User } from "../models/User";

export interface RegisterService {
    register(user: User): Promise<void>;
}