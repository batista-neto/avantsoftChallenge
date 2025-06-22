import { AbstractDIProvider } from "core/di/api";
import { NavigationMapWriter } from "core/navigation/api";
import { getHomeScreenInfo } from "../screens/HomeScreen";

export class Provider extends AbstractDIProvider {
  provide(): void {
    this.providerScreens();
  }


  private providerScreens(): void {
    const navMapper = this.mapper.inject<NavigationMapWriter>("NavigationMapWriter");

    navMapper.addScreen(getHomeScreenInfo());
  }
}
