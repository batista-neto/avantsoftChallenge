import { Route } from "@react-navigation/native";

export interface Navigator {
  navigate(route: string, value?: any): void;
  goBack(): void;
  removeFromStack(routes: string[]): void;
  getCurrentRoute(): Promise<Route<string> | undefined>;
}
