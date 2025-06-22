import { DIContainer, DIMapper } from "../../../../core/di/api";
import { Provider } from "./Provider";

export default function AnalyticsProviderUi(mapper: DIContainer & DIMapper) {
  new Provider(mapper).provide();
}