import { DIContainer } from "./DIContainer";
import { DIMapper } from "./DIMapper";

export interface DIProvider {
    provide(mapper: DIMapper & DIContainer): void
}