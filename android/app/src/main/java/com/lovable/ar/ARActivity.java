package com.lovable.ar;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.widget.Toast;

import com.google.ar.core.Anchor;
import com.google.ar.core.ArCoreApk;
import com.google.ar.core.Camera;
import com.google.ar.core.Frame;
import com.google.ar.core.HitResult;
import com.google.ar.core.Plane;
import com.google.ar.core.Session;
import com.google.ar.core.TrackingState;
import com.google.ar.core.exceptions.CameraNotAvailableException;
import com.google.ar.core.exceptions.UnavailableException;
import com.google.ar.sceneform.AnchorNode;
import com.google.ar.sceneform.rendering.ModelRenderable;
import com.google.ar.sceneform.ux.ArFragment;
import com.google.ar.sceneform.ux.TransformableNode;

public class ARActivity extends Activity {
    private static final String TAG = "ARActivity";
    private ArFragment arFragment;
    private ModelRenderable modelRenderable;
    private String modelPath;
    private String productName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ar);

        // Get model info from intent
        modelPath = getIntent().getStringExtra("MODEL_PATH");
        productName = getIntent().getStringExtra("PRODUCT_NAME");

        if (modelPath == null || modelPath.isEmpty()) {
            Toast.makeText(this, "No model specified", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        // Initialize AR Fragment
        arFragment = (ArFragment) getSupportFragmentManager().findFragmentById(R.id.ar_fragment);
        
        if (arFragment == null) {
            Log.e(TAG, "AR Fragment not found");
            finish();
            return;
        }

        // Load 3D model
        loadModel();

        // Set up tap listener for placing objects
        arFragment.setOnTapArPlaneListener(
            (HitResult hitResult, Plane plane, MotionEvent motionEvent) -> {
                if (modelRenderable == null) {
                    Toast.makeText(this, "Model is still loading...", Toast.LENGTH_SHORT).show();
                    return;
                }

                // Create anchor at tap location
                Anchor anchor = hitResult.createAnchor();
                AnchorNode anchorNode = new AnchorNode(anchor);
                anchorNode.setParent(arFragment.getArSceneView().getScene());

                // Create transformable node (user can move, rotate, scale)
                TransformableNode node = new TransformableNode(arFragment.getTransformationSystem());
                node.setParent(anchorNode);
                node.setRenderable(modelRenderable);
                node.select();

                Toast.makeText(this, productName + " placed!", Toast.LENGTH_SHORT).show();
            }
        );

        // Show instructions
        Toast.makeText(this, "Point at a flat surface and tap to place " + productName, Toast.LENGTH_LONG).show();
    }

    private void loadModel() {
        // Convert path to URI
        Uri modelUri = Uri.parse("file:///android_asset" + modelPath);

        ModelRenderable.builder()
            .setSource(this, modelUri)
            .build()
            .thenAccept(renderable -> {
                modelRenderable = renderable;
                Toast.makeText(this, "Model loaded! Tap to place.", Toast.LENGTH_SHORT).show();
            })
            .exceptionally(throwable -> {
                Log.e(TAG, "Unable to load model", throwable);
                Toast.makeText(this, "Error loading model: " + throwable.getMessage(), Toast.LENGTH_LONG).show();
                return null;
            });
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (arFragment != null && arFragment.getArSceneView() != null) {
            try {
                arFragment.getArSceneView().resume();
            } catch (Exception e) {
                Log.e(TAG, "Failed to resume AR", e);
            }
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (arFragment != null && arFragment.getArSceneView() != null) {
            arFragment.getArSceneView().pause();
        }
    }
}
