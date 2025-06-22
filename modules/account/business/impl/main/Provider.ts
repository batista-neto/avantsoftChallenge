import { Navigator } from "core/navigation/api";
import { AbstractDIProvider } from "../../../../../core/di/api";
import { RegisterController, RegisterService } from "../../api";
import { AuthController } from "../../api/controllers/AuthController";
import { AuthService } from "../../api/services/AuthService";
import { AuthControllerImpl } from "../controllers/AuthControllerImpl";
import { RegisterControllerImpl } from "../controllers/RegisterControllerImpl";
import { AuthServiceImpl } from "../services/AuthServiceImpl";
import { RegisterServiceImpl } from "../services/RegisterServiceImpl";

export class Provider extends AbstractDIProvider {
  provide(): void {
    this.provideInteractors();
    this.provideControllers();
  }

  protected provideControllers() {
    this.mapper.single("AuthController", () => this.getAuthController());
    this.mapper.single("RegisterController", () => this.getRegisterController());
  }
  protected provideInteractors() {
    this.mapper.single("AuthService", () => new AuthServiceImpl());
    this.mapper.single("RegisterService", () => new RegisterServiceImpl());
  }

  protected getAuthController(): AuthController {
    const authSerice = this.mapper.inject<AuthService>("AuthService");
    const navigator = this.mapper.inject<Navigator>("Navigator");
    return new AuthControllerImpl(authSerice, navigator);
  }

  protected getRegisterController(): RegisterController {
    const registerSerice = this.mapper.inject<RegisterService>("RegisterService");
    const navigator = this.mapper.inject<Navigator>("Navigator");
    return new RegisterControllerImpl(registerSerice, navigator);
  }
}
