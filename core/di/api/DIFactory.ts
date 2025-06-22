export class DIFactory {
    constructor(private factoryFn: (...args: any[]) => any) { }

    create(): any {
        return this.factoryFn();
    }
}  