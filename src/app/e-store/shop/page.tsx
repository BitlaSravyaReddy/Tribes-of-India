"use client";
import { useSearchParams } from "next/navigation";

import { useState, useEffect } from 'react';
import { Header } from "@/components/e-store/header";
import { Footer } from "@/components/e-store/footer";
import { ProductCard } from "@/components/e-store/product-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { products, categories } from "@/lib/e-store/data";

const allTribes = Array.from(new Set(products.map(p => p.tribe)));
const allRegions = Array.from(new Set(products.map(p => p.region)));
const allMaterials = Array.from(new Set(products.map(p => p.material)));

export default function ShopPage() {
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const category = searchParams.get("category");
    setSelectedCategory(category);
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Shop All Products</h1>
            <p className="text-lg text-muted-foreground mt-2">Discover unique creations from tribal artisans across India.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <h2 className="text-2xl font-headline font-bold mb-6">Filters</h2>
            <Accordion type="multiple" defaultValue={['category', 'price']} className="w-full">
              <AccordionItem value="category">
                <AccordionTrigger className="font-bold text-lg">Category</AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                    {categories.map(cat => (
                        <div key={cat.name} className="flex items-center space-x-2">
                            <Checkbox id={`cat-${cat.name}`} />
                            <label htmlFor={`cat-${cat.name}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {cat.name}
                            </label>
                        </div>
                    ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger className="font-bold text-lg">Price</AccordionTrigger>
                <AccordionContent className="pt-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                    </div>
                    <Slider
                        defaultValue={[0, 10000]}
                        max={10000}
                        step={100}
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value)}
                    />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tribe">
                <AccordionTrigger className="font-bold text-lg">Tribe</AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                    {allTribes.map(tribe => (
                        <div key={tribe} className="flex items-center space-x-2">
                            <Checkbox id={`tribe-${tribe}`} />
                            <label htmlFor={`tribe-${tribe}`} className="text-sm font-medium">
                                {tribe}
                            </label>
                        </div>
                    ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="region">
                <AccordionTrigger className="font-bold text-lg">State</AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                    {allRegions.map(region => (
                        <div key={region} className="flex items-center space-x-2">
                            <Checkbox id={`region-${region}`} />
                            <label htmlFor={`region-${region}`} className="text-sm font-medium">
                                {region}
                            </label>
                        </div>
                    ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="material">
                <AccordionTrigger className="font-bold text-lg">Material</AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                    {allMaterials.map(material => (
                        <div key={material} className="flex items-center space-x-2">
                            <Checkbox id={`material-${material}`} />
                            <label htmlFor={`material-${material}`} className="text-sm font-medium">
                                {material}
                            </label>
                        </div>
                    ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </aside>

          <section className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">{
          products.filter(
            product => !selectedCategory || product.category === selectedCategory
          ).length
        }{" "}
        products</p>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products
  .filter(product => !selectedCategory || product.category === selectedCategory)
  .map((product) => (

                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-12 flex justify-center">
                <Button variant="outline">Load More</Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
