import { DIMapper, DIContainer, DIFactory } from "../api";

export class DIContainerImpl implements DIMapper, DIContainer {
  
  private static defaultContainer = new DIContainerImpl();

  private container = new Map<string, DIFactory>();

  inject<T>(token: string): T {
    if (this.container.has(token)) {
      const factory = this.container.get(token);
      return factory!!.create() as T;
    }
    throw new Error(`dependency '${token}' not found`);
  }

  get(token: string): Readonly<DIFactory> | undefined {
    return this.container.get(token)
  }

  factory(token: string, factoryFn: (...args: any[]) => any): DIMapper {
    this.container.set(token, new DIFactory(factoryFn));
    return this;
  }

  single(token: string, factoryFn: (...args: any[]) => any): DIMapper {
    this.container.set(token, new SingleDIFactory(factoryFn));
    return this;
  }

  static getDefault() {
    return this.defaultContainer;
  }
}

class SingleDIFactory extends DIFactory {
  protected result: any | null = null;

  override create(): any {
    if (this.result == null) {
      this.result = super.create();
    }
    return this.result;
  }
}
