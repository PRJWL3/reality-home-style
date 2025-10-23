export interface ARPlugin {
  openARView(options: { modelPath: string; productName: string }): Promise<{ success: boolean }>;
  checkARSupport(): Promise<{ supported: boolean; reason?: string }>;
}
