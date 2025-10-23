import { registerPlugin } from '@capacitor/core';
import type { ARPlugin as ARPluginInterface } from '../types/ar-plugin';

const ARPluginImpl = registerPlugin<ARPluginInterface>('ARPlugin', {
  web: () => import('./ar-plugin-web').then(m => new m.ARPluginWeb()),
});

export const ARPlugin = ARPluginImpl;
