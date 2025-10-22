import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, RotateCw, Maximize2, Camera } from "lucide-react";
import { toast } from "sonner";

interface ARCameraProps {
  onClose: () => void;
}

export const ARCamera = ({ onClose }: ARCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");

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
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

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

          {/* Capture Button */}
          <Button
            variant="hero"
            size="icon"
            className="rounded-full w-20 h-20 shadow-[var(--shadow-ar)]"
            onClick={() => toast.info("Product placement coming soon with native AR")}
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

        {/* Info Card */}
        <div className="mt-6 bg-black/60 backdrop-blur-sm rounded-2xl p-4 max-w-lg mx-auto">
          <div className="flex items-start gap-3">
            <Maximize2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-white text-sm">
              <p className="font-semibold mb-1">Upgrade to Full AR</p>
              <p className="text-white/80">
                For 3D object placement and surface detection, export to native Android app with Capacitor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
