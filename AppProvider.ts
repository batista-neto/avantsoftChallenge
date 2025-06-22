import { DIContainer, DIMapper } from "core/di/api";
import { DIContainerImpl } from "core/di/impl";
import { NavigatorImpl, StackNavFactory } from "core/navigation";
import { ScreenFactoryFactory, ScreenGroups } from "core/navigation/api";


export class AppProvider {
  private container: DIContainer & DIMapper;

  constructor(container: DIContainer & DIMapper) {
      this.container = container
  }

  provideDependencies() {
    const groups = this.getScreenGroups();

    this.container
      .single("ScreenGroups", () => groups)
      .single("ScreenFactoryFactory", this.getScreenFactoryFactory)
      .single("Navigator", () => new NavigatorImpl(groups))
      .single("NavigationMapWriter", () => groups)
      .single("DIMapper", () => this.getMapper())
      .single("DIContainer", () => this.getMapper())
  }

  getContainer(): DIContainer {
    return DIContainerImpl.getDefault();
  }
  protected getMapper(): DIMapper {
    return DIContainerImpl.getDefault();
  }

  protected getScreenFactoryFactory() {
    return new ScreenFactoryFactory()
      .register("default", StackNavFactory);
  }

  protected getScreenGroups() {
    const groups = new ScreenGroups();
    groups.setGroupInitialRoute("default", "Login");
    return groups;
  }
}
