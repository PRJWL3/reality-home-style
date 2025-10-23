# Native AR Implementation Guide

## Overview
This guide explains how to complete the native Android ARCore integration for full AR functionality.

## What's Already Done (Web Side)
✅ Model selection UI in ARCamera component
✅ Capacitor plugin bridge setup
✅ Product data structure
✅ Native plugin interface

## What You Need to Do (Android Side)

### Step 1: Update build.gradle Files

**android/app/build.gradle** - Add ARCore and Sceneform dependencies:
```gradle
dependencies {
    // ... existing dependencies ...
    
    // ARCore
    implementation 'com.google.ar:core:1.38.0'
    
    // Sceneform (for 3D rendering)
    implementation 'com.google.ar.sceneform.ux:sceneform-ux:1.17.1'
    implementation 'com.google.ar.sceneform:core:1.17.1'
}
```

### Step 2: Update AndroidManifest.xml

Add ARCore features and permissions to **android/app/src/main/AndroidManifest.xml**:

```xml
<manifest ...>
    <!-- AR Required Features -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera.ar" android:required="true" />
    
    <application ...>
        <!-- ARCore metadata -->
        <meta-data
            android:name="com.google.ar.core"
            android:value="required" />
        
        <!-- Register ARActivity -->
        <activity
            android:name="com.lovable.ar.ARActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.AppCompat.NoActionBar" />
        
        <!-- ... existing activities ... -->
    </application>
</manifest>
```

### Step 3: Register the Plugin

In **android/app/src/main/java/.../MainActivity.java**, register the AR plugin:

```java
import com.lovable.ar.ARPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Register plugins
        registerPlugin(ARPlugin.class);
    }
}
```

### Step 4: Add 3D Models

Place your GLB model files in:
```
android/app/src/main/assets/models/
  ├── sofa.glb
  ├── table.glb
  ├── lamp.glb
  └── plant.glb
```

**Important**: The models must be in GLB format and should be optimized for mobile:
- Recommended size: Under 5MB per model
- Use compressed textures
- Optimize polygon count

### Step 5: Build and Test

1. **Sync the project:**
   ```bash
   npx cap sync android
   ```

2. **Open in Android Studio:**
   ```bash
   npx cap open android
   ```

3. **In Android Studio:**
   - Let Gradle sync and download dependencies
   - Resolve any dependency conflicts
   - Build the project (Build > Make Project)

4. **Run on device:**
   - Connect ARCore-compatible Android device
   - Enable USB debugging
   - Run the app
   - Grant camera permissions when prompted

### Step 6: Testing the AR Experience

1. Open the app on your Android device
2. Navigate to a product
3. Tap "View in AR"
4. Select a product from the grid
5. Point camera at a flat surface (floor, table)
6. Tap to place the 3D model
7. Use gestures to:
   - **Move**: Drag with one finger
   - **Rotate**: Twist with two fingers
   - **Scale**: Pinch with two fingers

## Troubleshooting

### ARCore Not Available
- Install Google Play Services for AR from Play Store
- Device must support ARCore (check: https://developers.google.com/ar/devices)

### Model Not Loading
- Verify GLB files are in `assets/models/` folder
- Check Android Studio Logcat for errors
- Ensure models are under 5MB

### Camera Permission Denied
- Go to Settings > Apps > Your App > Permissions
- Enable Camera permission

### Build Errors
```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew build
```

### Sceneform Dependency Issues
If Sceneform can't be found, add this to **android/build.gradle**:
```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
}
```

## Alternative: Scene Viewer (Simpler)

If Sceneform setup is too complex, you can use ARCore's Scene Viewer instead:

**Modify ARPlugin.java:**
```java
@PluginMethod
public void openARView(PluginCall call) {
    String modelPath = call.getString("modelPath");
    
    Intent intent = new Intent(Intent.ACTION_VIEW);
    Uri modelUri = Uri.parse("file:///android_asset" + modelPath);
    intent.setData(modelUri);
    intent.setPackage("com.google.ar.core");
    
    if (intent.resolveActivity(getActivity().getPackageManager()) != null) {
        getActivity().startActivity(intent);
        // ... return success
    } else {
        call.reject("ARCore Scene Viewer not available");
    }
}
```

This launches Google's ARCore viewer directly (simpler but less customizable).

## Production Checklist

Before releasing:
- [ ] Test on multiple ARCore-compatible devices
- [ ] Optimize all 3D models for mobile performance
- [ ] Add loading states and error handling
- [ ] Test camera permission flows
- [ ] Verify ARCore installation prompts work
- [ ] Add analytics to track AR usage
- [ ] Test in different lighting conditions
- [ ] Verify models scale correctly in real world

## Resources

- [ARCore Documentation](https://developers.google.com/ar)
- [Sceneform Overview](https://developers.google.com/sceneform)
- [ARCore Supported Devices](https://developers.google.com/ar/devices)
- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)

## Next Steps

1. Complete the Android setup above
2. Test the AR experience
3. Fine-tune model scales and placement
4. Add more products and models
5. Consider adding:
   - Model preview before placement
   - Multiple instances of same model
   - Photo capture of AR scene
   - Social sharing
