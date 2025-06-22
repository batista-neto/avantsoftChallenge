import { AuthObserver } from "../observers/AuthObserver";

export interface AuthController {
    login(username: string, password: string): Promise<void>;
    logout(): Promise<void>;
    subscribe(observer: AuthObserver): void;
    unSubscribe(): void;
}