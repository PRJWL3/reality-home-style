import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.prjwl3.realityhomestyle',
  appName: 'ARDesign',
  webDir: 'dist',
  server: {
    url: 'https://2d2d9f4e-b7b9-4a64-80f5-ac0b3fc54410.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    }
  }
};

export default config;
