import { Navigator } from "../../../../../core/navigation/api";
import { RegisterController, RegisterObserver, RegisterService } from "../../api";
import { User } from "../../api/models/User";

export class RegisterControllerImpl implements RegisterController {
    private observer: RegisterObserver | null = null;

    constructor(
        private registerService: RegisterService,
        private navigator: Navigator
    ) {}

    async register(user: User, confirmPassword: string): Promise<void> {
        this.observer?.onLoading?.(true);
        if (user.password !== confirmPassword) {
            this.observer?.onError("Passwords do not match");
            return;
        }
        try {
            await this.registerService.register(user);
            this.observer?.onRegisterSuccess();
            this.navigator.navigate("Login");
        } catch (error) {
            this.observer?.onError();
        } finally {
            this.observer?.onLoading?.(false);
        }
    }

    subscribe(observer: RegisterObserver): void {
        this.observer = observer;
    }

    unsubscribe(): void {
        this.observer = null;
    }
}