import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2d2d9f4eb7b94a6480f5ac0b3fc54410',
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
