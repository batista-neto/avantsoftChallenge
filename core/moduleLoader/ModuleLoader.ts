import { DIMapper } from "core/di/api";
import AccountProvider from "modules/account/business/impl/main";
import AccountProviderUi from "modules/account/ui/main";
import AnalyticsProviderUi from "modules/analytics/ui/main";
import { DIContainer } from "../di/api/DIContainer";
export class ModuleLoader {
    static loadModules(container: DIMapper & DIContainer): void {
        //Account module
        AccountProvider(container);
        AccountProviderUi(container); 

        //Analytics module
        AnalyticsProviderUi(container)
    }
}