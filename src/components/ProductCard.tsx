import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scan, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export const ProductCard = ({ name, price, category, image }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-[var(--shadow-card)]">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="w-full">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{category}</p>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-xl font-bold text-primary mt-1">${price}</p>
        </div>
        
        <div className="flex gap-2 w-full">
          <Button variant="ar" className="flex-1 gap-2">
            <Scan className="h-4 w-4" />
            View in AR
          </Button>
          <Button variant="outline" size="icon">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
