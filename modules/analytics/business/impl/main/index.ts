import { DIContainer, DIMapper } from "../../../../../core/di/api";
import { Provider } from "./Provider";

export default function AnalyticsProvider(container: DIMapper & DIContainer) {
  console.log("MODULE ANALYTICS - BUSINESS");
  const provider = new Provider(container);
  provider.provide();
}
