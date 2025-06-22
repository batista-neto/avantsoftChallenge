import { User } from "../models/User";
import { RegisterObserver } from "../observers/RegisterObserver";

export interface RegisterController {
    register(user: User): Promise<void>;
    subscribe(observer: RegisterObserver): void;
    unsubscribe(): void;
}