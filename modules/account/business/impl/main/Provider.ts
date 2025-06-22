import { Navigator } from "core/navigation/api";
import { AbstractDIProvider } from "../../../../../core/di/api";
import { AuthController } from "../../api/controllers/AuthController";
import { AuthService } from "../../api/services/AuthService";
import { AuthControllerImpl } from "../controllers/AuthControllerImpl";
import { AuthServiceImpl } from "../services/AuthServiceImpl";

export class Provider extends AbstractDIProvider {
  provide(): void {
    this.provideInteractors();
    this.provideControllers();
  }

  protected provideControllers() {
    this.mapper.single("AuthController", () => this.getAuthController());
  }
  protected provideInteractors() {
    this.mapper.single("AuthService", () => new AuthServiceImpl());
  }

  protected getAuthController(): AuthController {
    const authSerice = this.mapper.inject<AuthService>("AuthService");
    const navigator = this.mapper.inject<Navigator>("Navigator");
    return new AuthControllerImpl(authSerice, navigator);
  }
}
