package com.lovable.ar;

import android.content.Intent;
import android.net.Uri;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.ar.core.ArCoreApk;

@CapacitorPlugin(name = "ARPlugin")
public class ARPlugin extends Plugin {

    @PluginMethod
    public void openARView(PluginCall call) {
        String modelPath = call.getString("modelPath");
        String productName = call.getString("productName");

        if (modelPath == null || modelPath.isEmpty()) {
            call.reject("Model path is required");
            return;
        }

        // Check if ARCore is installed and up to date
        ArCoreApk.Availability availability = ArCoreApk.getInstance().checkAvailability(getContext());
        
        if (availability.isTransient()) {
            // Re-query at 5Hz while we check compatibility
            call.reject("Checking AR compatibility...");
            return;
        }
        
        if (availability != ArCoreApk.Availability.SUPPORTED_INSTALLED) {
            call.reject("ARCore is not installed or not supported on this device");
            return;
        }

        try {
            // Launch AR activity with model
            Intent intent = new Intent(getContext(), ARActivity.class);
            intent.putExtra("MODEL_PATH", modelPath);
            intent.putExtra("PRODUCT_NAME", productName);
            getActivity().startActivity(intent);

            JSObject ret = new JSObject();
            ret.put("success", true);
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Failed to launch AR view: " + e.getMessage());
        }
    }

    @PluginMethod
    public void checkARSupport(PluginCall call) {
        ArCoreApk.Availability availability = ArCoreApk.getInstance().checkAvailability(getContext());
        
        JSObject ret = new JSObject();
        ret.put("supported", availability == ArCoreApk.Availability.SUPPORTED_INSTALLED);
        
        if (availability != ArCoreApk.Availability.SUPPORTED_INSTALLED) {
            ret.put("reason", "ARCore is not installed or supported");
        }
        
        call.resolve(ret);
    }
}
