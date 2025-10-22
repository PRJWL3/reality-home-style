# Full Native AR Setup Guide

This guide will help you set up full native AR capabilities with ARCore for Android.

## Prerequisites
- Node.js & npm installed
- Android Studio installed
- A physical Android device with ARCore support (most modern Android phones)
- Git installed

## Step 1: Export to GitHub

1. Click the **GitHub** button in the top right of Lovable
2. Click **Connect to GitHub** and authorize
3. Click **Create Repository**
4. Clone your repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Initialize Capacitor (Already configured!)

The `capacitor.config.ts` file is already set up. Now add the Android platform:

```bash
npx cap add android
```

## Step 4: Configure Android for ARCore

After running `npx cap add android`, you need to:

### 4.1 Add ARCore Dependency

Edit `android/app/build.gradle` and add in the `dependencies` section:

```gradle
dependencies {
    // ... existing dependencies
    implementation 'com.google.ar:core:1.41.0'
}
```

### 4.2 Add ARCore Required Feature

Edit `android/app/src/main/AndroidManifest.xml` and add inside `<application>` tag:

```xml
<meta-data
    android:name="com.google.ar.core"
    android:value="required" />
```

Also add these permissions before the `<application>` tag:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera.ar" android:required="true" />
<uses-feature android:glEsVersion="0x00020000" android:required="true" />
```

### 4.3 Update Minimum SDK Version

In `android/app/build.gradle`, ensure minSdkVersion is at least 24:

```gradle
android {
    defaultConfig {
        minSdkVersion 24  // ARCore requires API level 24+
        targetSdkVersion 34
    }
}
```

## Step 5: Build and Sync

```bash
npm run build
npx cap sync android
npx cap update android
```

## Step 6: Open in Android Studio

```bash
npx cap open android
```

## Step 7: Test on Physical Device

1. Connect your Android device via USB
2. Enable Developer Options and USB Debugging on your device
3. In Android Studio, select your device from the device dropdown
4. Click the **Run** button (green play icon)

## Step 8: Implementing ARCore Features

Once you have the native app running, you'll need to add ARCore SDK integration:

### Install ARCore SDK for Web (SceneViewer)

For easier integration, you can use ARCore's Scene Viewer which allows launching AR experiences:

1. Add the Scene Viewer intent to your app
2. Prepare 3D models in `.glb` or `.gltf` format
3. Use Android intents to launch AR view

### Alternative: Full ARCore Integration

For complete control, you'd need to:
1. Create native Android code (Kotlin/Java) that uses ARCore SDK
2. Use Capacitor plugins to bridge between React and native code
3. Handle 3D rendering with SceneForm or similar library

## Hot Reload During Development

The `capacitor.config.ts` is configured to use the Lovable preview URL, which means:
- You can edit code in Lovable
- Changes automatically appear in your mobile app
- No need to rebuild constantly!

## Building for Production

When ready to publish:

1. Update `capacitor.config.ts` - remove the `server` section
2. Build production assets: `npm run build`
3. Sync: `npx cap sync android`
4. In Android Studio: Build → Generate Signed Bundle/APK
5. Upload to Google Play Store

## Troubleshooting

### Camera Permission Issues
Make sure you've accepted camera permissions in the app settings on your device.

### ARCore Not Available
Check if your device supports ARCore: https://developers.google.com/ar/devices

### Build Errors
- Clean the project: In Android Studio, Build → Clean Project
- Invalidate caches: File → Invalidate Caches / Restart

## Next Steps

1. Test the camera functionality on your device
2. Add 3D model files (`.glb` format) to your assets
3. Implement ARCore Scene Viewer or full ARCore integration
4. Test product placement with real AR surface detection

## Useful Resources

- [ARCore Documentation](https://developers.google.com/ar)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [ARCore Supported Devices](https://developers.google.com/ar/devices)
- [Lovable Capacitor Guide](https://docs.lovable.dev/tips-tricks/capacitor)
