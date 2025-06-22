import { AbstractDIProvider } from "core/di/api";
import { NavigationMapWriter } from "core/navigation/api";
import { getLoginScreenInfo } from "../screens/LoginScreen";

export class Provider extends AbstractDIProvider {
  provide(): void {
    this.providerScreens();
  }


  private providerScreens(): void {
    const navMapper = this.mapper.inject<NavigationMapWriter>("NavigationMapWriter");

    navMapper.addScreen(getLoginScreenInfo());
  }
}
