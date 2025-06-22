import React, { ReactElement } from "react";

interface DeeplinkOptions {
  deeplinkAuth?: boolean;
  deeplinkPath?: string;
  deeplinkParams?: string[];
}

export interface BottomBarOptions {
  icon: (props: { focused: boolean; color: string; size: number }) => React.ReactNode;
  label: string;
  accessibilityLabel?: string;
  testID?: string;
  onPress: () => void;
  onLongPress?: () => void;
  index: number;
}

export class ScreenInfo {
  constructor(
    private route: string,
    private component: React.ComponentType<{}> | React.ComponentType<any>,
    private title = "",
    private groupName = "default",
    private headerShown = true,
    private deeplinkOptions?: DeeplinkOptions,
    private bottomBarOptions?: BottomBarOptions
  ) {}

  getComponent() {
    return this.component;
  }

  getRoute(): string {
    return this.route;
  }

  getTitle() {
    return this.title;
  }

  getGroupName() {
    return this.groupName;
  }

  isHeaderShown() {
    return this.headerShown;
  }
}
