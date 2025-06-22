import { DIFactory } from "./DIFactory";

export interface DIContainer {
  inject<T>(token: string): T;
  get(token: string): Readonly<DIFactory> | undefined;
}