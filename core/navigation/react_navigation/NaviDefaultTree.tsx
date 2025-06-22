import { ScreenGroups, ScreenFactoryFactory } from "../api";
import { NavRoot } from "./NavRoot";
import React from "react";
import { LinkingOptions, NavigationContainer, NavigationState } from "@react-navigation/native";
import { NavigatorImpl } from "./NavigatorImpl";
 
type OnStateChange = (state: NavigationState | undefined) => void;
 
export class NavDefaultTree {
  create(
    factory: ScreenFactoryFactory,
    groups: ScreenGroups,
    onStateChange?: OnStateChange,
    onReady?: () => void,
    linking?: LinkingOptions<Object>
  ) {
    return (
      <NavigationContainer
        onStateChange={onStateChange}
        onReady={onReady}
        ref={NavigatorImpl.navigationRef}
        linking={linking}
      >
          {factory.create(groups)}
      </NavigationContainer>
    );
  }
}