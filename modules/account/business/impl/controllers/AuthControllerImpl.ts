import AsyncStorage from "@react-native-async-storage/async-storage";
import { Navigator } from "../../../../../core/navigation/api";
import { AuthController } from "../../api/controllers/AuthController";
import { AuthObserver } from "../../api/observers/AuthObserver";
import { AuthService } from "../../api/services/AuthService";

export class AuthControllerImpl implements AuthController {
    private observer: AuthObserver | null = null;  

    constructor(
        private authService: AuthService,
        private navigator: Navigator,
    ) {}

    async login(username: string, password: string): Promise<void> {
        this.observer?.onLoading?.(true);
        try {
            const token = await this.authService.login(username, password);
            this.observer?.onLoginSuccess?.(token);
            this.navigator.navigate("Home");
        } catch (error) {
            this.observer?.onError?.("Login failed");
        } finally {
            this.observer?.onLoading?.(false);
        }
    }

    async logout(): Promise<void> {
        this.observer?.onLoading?.(true);
        try {
            await this.authService.logout();
            this.navigator.navigate("Login");
            this.observer?.onLogoutSuccess?.();
        } catch (error) {
            this.observer?.onError?.("Logout failed");
        } finally {
            this.observer?.onLoading?.(false);
        }
    }

    async isLogedIn(): Promise<void> {
        try {
            const login = await AsyncStorage.getItem("login");
            if (login) {
                this.navigator.navigate("Home");
            }
        } catch (error) {
            this.observer?.onError?.("Failed to check login status");
        }
    }

    subscribe(observer: AuthObserver): void {
        this.observer = observer;
    }

    unSubscribe(): void {
        this.observer = null;
    }
}