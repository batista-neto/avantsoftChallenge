import { ScreenInfo } from "./ScreenInfo";

export interface NavigationMapWriter {
  addScreen(info: ScreenInfo): NavigationMapWriter;
}