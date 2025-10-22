import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Maximize2, RotateCw, CheckCircle } from "lucide-react";

export const ARFeature = () => {
  return (
    <section id="ar" className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Experience AR Design
            </h2>
            <p className="text-muted-foreground text-lg">
              Point your camera at any space and place virtual furniture to see 
              exactly how it fits and looks in your home.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Camera className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Point & Place</h3>
                  <p className="text-sm text-muted-foreground">
                    Use your camera to see products in your actual space
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Maximize2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Scale Perfectly</h3>
                  <p className="text-sm text-muted-foreground">
                    See true-to-life dimensions with 1:1 scale accuracy
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <RotateCw className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Rotate & Move</h3>
                  <p className="text-sm text-muted-foreground">
                    Adjust position and angle to find the perfect placement
                  </p>
                </div>
              </div>
            </div>
            
            <Button variant="hero" size="lg" className="gap-2">
              <Camera className="h-5 w-5" />
              Launch AR Camera
            </Button>
          </div>
          
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2">
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Camera className="h-16 w-16 mx-auto text-primary/60" />
                <p className="text-muted-foreground">AR Camera Preview</p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Full AR functionality available with native mobile app
                </p>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Real-time 3D rendering</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Surface detection</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Lighting adjustment</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
