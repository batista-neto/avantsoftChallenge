import { AuthObserver } from "../observers/AuthObserver";

export interface AuthController {
    login(email: string, password: string): Promise<void>;
    logout(): Promise<void>;
    subscribe(observer: AuthObserver): void;
    unSubscribe(): void;
}