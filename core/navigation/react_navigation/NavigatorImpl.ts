import { Navigator, ScreenGroups } from "../api";
import { CommonActions, Route, StackActions, createNavigationContainerRef } from "@react-navigation/native";

export class NavigatorImpl implements Navigator {
  static readonly navigationRef = createNavigationContainerRef<any>();
  static readonly stackActionsRef = StackActions;
  static readonly commonActionsRef = CommonActions;

  constructor(private groups: ScreenGroups) {}

  navigate(route: string, value?: any): void {
    const ref = NavigatorImpl.navigationRef;
    if (ref.isReady()) {
      const info = this.groups.getScreenByRoute(route);
      if (info) {
        if (info.getGroupName() == "default" || info.getGroupName() == "overlay") ref.navigate(route, value);
        else
          ref.navigate(info.getGroupName(), {
            screen: info.getRoute(),
            params: { ...value },
          });
      } else {
        console.log(`no info found ${route}`);
      }
    }
  }

  goBack(): void {
    const ref = NavigatorImpl.navigationRef;
    if (ref.isReady()) {
      ref.goBack();
    }
  }

  removeFromStack(routes: string[]): void {
    const ref = NavigatorImpl.navigationRef;
    const commonActionsref = NavigatorImpl.commonActionsRef;

    ref.dispatch((state) => {
      const routesToReplace = state.routes.filter((navigationRoute) => !routes.includes(navigationRoute.name));
      const index = Math.max(routesToReplace.length - 1, 0);

      return commonActionsref.reset({
        ...state,
        routes: routesToReplace,
        index,
      });
    });
  }

  getCurrentRoute(): Promise<Route<string> | undefined> {
    const ref = NavigatorImpl.navigationRef;
    let route: Route<string> | undefined;
 
    const result = new Promise<Route<string> | undefined>((resolve) => {
      const run = () => {
        if(ref.isReady()) {
          route = ref.current?.getCurrentRoute();
          resolve(route)
        } 
        requestAnimationFrame(run);
        
      }
      requestAnimationFrame(run);
    })
    
    return result;
  }
}
