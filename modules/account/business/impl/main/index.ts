import { DIContainer, DIMapper } from "../../../../../core/di/api";
import { Provider } from "./Provider";

export default function AccountProvider(container: DIMapper & DIContainer) {
  console.log("MODULE ACCOUNT - BUSINESS");
  const provider = new Provider(container);
  provider.provide();
}
