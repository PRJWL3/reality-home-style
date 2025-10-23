import type { ARPlugin } from '../types/ar-plugin';

export class ARPluginWeb implements ARPlugin {
  async openARView(_options: { modelPath: string; productName: string }): Promise<{ success: boolean }> {
    console.log('AR view not available in web browser');
    return { success: false };
  }

  async checkARSupport(): Promise<{ supported: boolean; reason?: string }> {
    return {
      supported: false,
      reason: 'AR is only supported on native Android devices with ARCore'
    };
  }
}
