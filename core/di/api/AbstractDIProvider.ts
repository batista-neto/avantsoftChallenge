import { DIContainer } from "./DIContainer";
import { DIMapper } from "./DIMapper";

export abstract class AbstractDIProvider {
    constructor(protected mapper: DIMapper & DIContainer) {}

    abstract provide(): void
}