# 📱 Build Your Native Android AR App

Your app is fully configured for native Android with ARCore support! Follow these steps to build the APK.

## ✅ Prerequisites
- **Android Studio** installed ([Download here](https://developer.android.com/studio))
- **ARCore-compatible Android device** ([Check compatibility](https://developers.google.com/ar/devices))
- **Git** installed

## 🚀 Step-by-Step Build Process

### 1️⃣ Export to GitHub

1. Click the **GitHub** button in the top right of Lovable
2. Click **Connect to GitHub** and authorize
3. Click **Create Repository**
4. Clone your repository locally:
```bash
git clone <YOUR_GIT_URL>
cd reality-home-style
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Add Android Platform

```bash
npx cap add android
```

This creates the `android/` folder with your native Android project.

### 4️⃣ Configure Native AR (Complete all of NATIVE_AR_SETUP.md)

**IMPORTANT**: Open and follow `NATIVE_AR_SETUP.md` to configure:
- ✅ Sceneform and ARCore dependencies in `build.gradle`
- ✅ Permissions and ARActivity in `AndroidManifest.xml`
- ✅ ARPlugin registration in `MainActivity.java`
- ✅ Copy `.glb` models to `android/app/src/main/assets/models/`

These steps are REQUIRED for AR to work!

### 5️⃣ Build and Sync

```bash
npm run build
npx cap sync android
```

### 6️⃣ Open in Android Studio

```bash
npx cap open android
```

Wait for Android Studio to load and index the project.

### 7️⃣ Build APK in Android Studio

#### Option A: Generate Signed APK (For Distribution)

1. In Android Studio menu: **Build** → **Generate Signed Bundle / APK**
2. Select **APK** (not Bundle)
3. Click **Next**
4. Create a new key store:
   - Click **Create new...**
   - Choose a location and password
   - Fill in certificate details
   - Click **OK**
5. Select **release** build variant
6. Click **Finish**
7. APK will be in: `android/app/release/app-release.apk`

#### Option B: Quick Build (For Testing)

1. In Android Studio menu: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for build to complete
3. Click **locate** in the notification
4. APK will be in: `android/app/build/outputs/apk/debug/app-debug.apk`

### 8️⃣ Install APK on Device

**Method 1: Direct USB Install**
1. Connect device via USB
2. Enable USB Debugging on device
3. In Android Studio: **Run** → **Run 'app'**

**Method 2: Transfer APK File**
1. Copy the APK file to your device
2. Open the APK file on device
3. Grant "Install from Unknown Sources" permission if needed
4. Install

## 🔥 Hot Reload During Development

The app is configured to load from Lovable's live preview:
- Edit code in Lovable
- Changes appear instantly in the mobile app
- No rebuild needed!

## 🚀 Building for Production

When ready to publish to Google Play Store:

1. **Update config** - Edit `capacitor.config.json` and remove the `server` section
2. **Build**: `npm run build`
3. **Sync**: `npx cap sync android`
4. **Generate Signed Bundle** in Android Studio
5. **Upload** to Google Play Console

## 🔧 Troubleshooting

### ❌ APK Won't Install
- Enable "Install from Unknown Sources" in device settings
- Check minimum Android version is 7.0+ (API 24)

### ❌ AR Not Working
- Verify device is [ARCore compatible](https://developers.google.com/ar/devices)
- Install "Google Play Services for AR" from Play Store
- Grant camera permissions in app settings

### ❌ Models Not Appearing
- Ensure `.glb` files are in `android/app/src/main/assets/models/`
- File names are case-sensitive!
- Check Android Studio Logcat for errors

### ❌ Build Fails
- Clean project: **Build** → **Clean Project**
- Invalidate caches: **File** → **Invalidate Caches / Restart**
- Check all steps in `NATIVE_AR_SETUP.md` are complete

### ❌ App Crashes on Launch
- Check Logcat in Android Studio for crash logs
- Verify all permissions are declared in `AndroidManifest.xml`
- Ensure ARPlugin is registered in `MainActivity.java`

## 📚 Resources

- [ARCore Documentation](https://developers.google.com/ar)
- [Capacitor Android Docs](https://capacitorjs.com/docs/android)
- [ARCore Supported Devices](https://developers.google.com/ar/devices)
- [Lovable Capacitor Guide](https://docs.lovable.dev/tips-tricks/capacitor)

## 🎯 What You Get

✅ Full ARCore surface detection  
✅ Real-world 3D model placement  
✅ 4 furniture models (sofa, table, lamp, plant)  
✅ Scale, rotate, and move controls  
✅ Camera switching  
✅ Professional AR experience
