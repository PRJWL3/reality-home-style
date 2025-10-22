import { Home, Scan, Grid3x3, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  onOpenCamera: () => void;
}

export const BottomNav = ({ onOpenCamera }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="grid grid-cols-4 h-16">
        <button className={cn(
          "flex flex-col items-center justify-center gap-1 text-primary"
        )}>
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Home</span>
        </button>
        
        <button className={cn(
          "flex flex-col items-center justify-center gap-1 text-muted-foreground"
        )}>
          <Grid3x3 className="h-5 w-5" />
          <span className="text-xs font-medium">Products</span>
        </button>
        
        <button 
          className={cn(
            "flex flex-col items-center justify-center gap-1 text-muted-foreground"
          )}
          onClick={onOpenCamera}
        >
          <Scan className="h-5 w-5" />
          <span className="text-xs font-medium">AR View</span>
        </button>
        
        <button className={cn(
          "flex flex-col items-center justify-center gap-1 text-muted-foreground"
        )}>
          <User className="h-5 w-5" />
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    </nav>
  );
};
