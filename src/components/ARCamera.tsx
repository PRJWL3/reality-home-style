import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, RotateCw, Maximize2, Camera, Scan } from "lucide-react";
import { toast } from "sonner";
import { Capacitor } from "@capacitor/core";

interface Product {
  id: string;
  name: string;
  modelPath: string;
  image: string;
}

interface ARCameraProps {
  onClose: () => void;
  selectedProduct?: Product;
}

export const ARCamera = ({ onClose, selectedProduct }: ARCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [isNative, setIsNative] = useState(false);
  
  const availableProducts: Product[] = [
    {
      id: "1",
      name: "Modern Gray Sofa",
      modelPath: "/models/sofa.glb",
      image: "/assets/products/sofa.jpg"
    },
    {
      id: "2",
      name: "Wooden Coffee Table",
      modelPath: "/models/table.glb",
      image: "/assets/products/coffee-table.jpg"
    },
    {
      id: "3",
      name: "Pendant Lamp",
      modelPath: "/models/lamp.glb",
      image: "/assets/products/lamp.jpg"
    },
    {
      id: "4",
      name: "Monstera Plant",
      modelPath: "/models/plant.glb",
      image: "/assets/products/plant.jpg"
    }
  ];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        toast.success("Camera activated");
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Failed to access camera. Please grant camera permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  const switchCamera = () => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
    if (isNative && selectedProduct) {
      launchNativeAR(selectedProduct);
    } else {
      startCamera();
    }
    return () => stopCamera();
  }, [facingMode, selectedProduct, isNative]);

  const launchNativeAR = async (product: Product) => {
    try {
      // Check if running on native platform
      if (!Capacitor.isNativePlatform()) {
        toast.error("Native AR is only available on Android devices");
        return;
      }

      // Call native ARCore plugin
      const { ARPlugin } = await import('../plugins/ar-plugin');
      const result = await ARPlugin.openARView({
        modelPath: product.modelPath,
        productName: product.name
      });

      if (result.success) {
        toast.success("AR view launched!");
        onClose();
      }
    } catch (error) {
      console.error("AR launch error:", error);
      toast.error("Failed to launch AR. Make sure ARCore is installed and device supports AR.");
    }
  };

  const handleProductSelect = (product: Product) => {
    if (isNative) {
      launchNativeAR(product);
    } else {
      toast.info(`Selected ${product.name}. Install as native app for full AR experience.`);
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Camera View */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* AR Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Center Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-48 h-48">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent rounded-br-lg" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute top-24 left-0 right-0 text-center px-4">
          <div className="inline-block bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full">
            <p className="text-white text-sm font-medium">
              Point camera at a flat surface
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        {isStreaming && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2 bg-accent/90 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white text-sm font-medium">AR Active</span>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-auto">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {/* Close Button */}
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full w-14 h-14 bg-white/90 hover:bg-white"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Capture Button - Launch AR or show models */}
          <Button
            variant="hero"
            size="icon"
            className="rounded-full w-20 h-20 shadow-[var(--shadow-ar)]"
            disabled
          >
            <Camera className="h-8 w-8" />
          </Button>

          {/* Switch Camera Button */}
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full w-14 h-14 bg-white/90 hover:bg-white"
            onClick={switchCamera}
          >
            <RotateCw className="h-6 w-6" />
          </Button>
        </div>

        {/* Product Selection Grid */}
        <div className="mt-6 max-w-lg mx-auto space-y-3">
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-white font-semibold mb-3">Select a product to place in AR:</p>
            <div className="grid grid-cols-2 gap-3">
              {availableProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className="bg-white/10 hover:bg-white/20 rounded-xl p-3 transition-all active:scale-95"
                >
                  <div className="aspect-square bg-white/5 rounded-lg mb-2 flex items-center justify-center">
                    <Scan className="h-8 w-8 text-white/60" />
                  </div>
                  <p className="text-white text-sm font-medium">{product.name}</p>
                </button>
              ))}
            </div>
          </div>
          
          {!isNative && (
            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Maximize2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-white text-sm">
                  <p className="font-semibold mb-1">Full AR on Native App</p>
                  <p className="text-white/80">
                    Export to native Android app with Capacitor for real 3D placement and surface detection
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
