import { ProductCard } from "./ProductCard";
import sofaImg from "@/assets/products/sofa.jpg";
import tableImg from "@/assets/products/coffee-table.jpg";
import lampImg from "@/assets/products/lamp.jpg";
import plantImg from "@/assets/products/plant.jpg";

const products = [
  {
    id: "1",
    name: "Modern Gray Sofa",
    price: 899,
    category: "Furniture",
    image: sofaImg,
  },
  {
    id: "2",
    name: "Wooden Coffee Table",
    price: 349,
    category: "Furniture",
    image: tableImg,
  },
  {
    id: "3",
    name: "Pendant Lamp",
    price: 129,
    category: "Lighting",
    image: lampImg,
  },
  {
    id: "4",
    name: "Monstera Plant",
    price: 49,
    category: "Decor",
    image: plantImg,
  },
];

export const ProductGrid = () => {
  return (
    <section id="products" className="py-20 px-4">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our collection and visualize each piece in your space using AR
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};
