import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_600SemiBold,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { DIContainerImpl } from 'core/di/impl';
import { DIProvider } from 'core/di/screens';
import { NavDefaultTree } from 'core/navigation';
import { ScreenFactoryFactory, ScreenGroups } from 'core/navigation/api';
import React from 'react';
import Toast from 'react-native-toast-message';

export default function App() {
  const container = DIContainerImpl.getDefault();
  const tree = new NavDefaultTree();
  const factory = container.inject("ScreenFactoryFactory") as ScreenFactoryFactory;
  const groups = container.inject("ScreenGroups") as ScreenGroups;
  
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_600SemiBold,
    Roboto_700Bold,
  });
  
  return (
    <DIProvider container={container}>
      {tree.create(factory, groups)}
      <Toast />
    </DIProvider>
  );
}