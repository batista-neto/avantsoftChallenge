import { ExpoConfig } from 'expo/config';
import 'ts-node/register'; // Add this to import TypeScript files

const config: ExpoConfig = {
  name: 'Avantsfot App',
  slug: 'avantsoft-app',
  "plugins": [
    "expo-font"
  ]
};

export default config;