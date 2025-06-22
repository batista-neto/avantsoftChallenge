import { AbstractDIProvider } from "core/di/api";
import { NavigationMapWriter } from "core/navigation/api";
import { getLoginScreenInfo } from "../screens/LoginScreen";
import { getRegisterScreenInfo } from "../screens/RegisterScreen";

export class Provider extends AbstractDIProvider {
  provide(): void {
    this.providerScreens();
  }


  private providerScreens(): void {
    const navMapper = this.mapper.inject<NavigationMapWriter>("NavigationMapWriter");

    navMapper.addScreen(getLoginScreenInfo());
    navMapper.addScreen(getRegisterScreenInfo());
  }
}
