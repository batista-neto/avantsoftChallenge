import { registerRootComponent } from 'expo';

import App from './App';
import { DIContainerImpl } from 'core/di/impl';
import { ModuleLoader } from 'core/moduleLoader/ModuleLoader';
import { AppProvider } from 'AppProvider';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

const container = DIContainerImpl.getDefault();
const appProvider = new AppProvider(container);
appProvider.provideDependencies();
ModuleLoader.loadModules(container);
registerRootComponent(App);