import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/e-store/header";
import { Footer } from "@/components/e-store/footer";
import { ImageSlider } from "@/components/e-store/image-slider";
import { ProductCard } from "@/components/e-store/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products, categories as categoryData } from "@/lib/e-store/data";
import { Brush, Shirt, Gem, Home as HomeIcon, Leaf, ArrowRight } from "lucide-react";

const iconMap: { [key: string]: React.ElementType } = {
  Handicrafts: Brush,
  Clothing: Shirt,
  Jewelry: Gem,
  "Home Decor": HomeIcon,
  "Herbal Products": Leaf,
};

export default function Home() {
  const bestsellers = products.filter(p => p.bestseller);

  return (
    <div className="site-container ">
      <Header />
      <main className="flex-1">
        <ImageSlider />
        
        <section className="py-12 md:py-24 bg-secondary">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
              {categoryData.map((category) => {
                const Icon = iconMap[category.name];
                return (
                  <Link href={`e-store/shop?category=${category.name}`} key={category.name}>
                    <Card className="text-center p-4 md:p-6 flex flex-col items-center justify-center aspect-square transition-all hover:shadow-xl hover:-translate-y-1">
                      <CardContent className="p-0 flex flex-col items-center gap-4">
                        <Icon className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                        <h3 className="text-md md:text-lg font-bold font-body">{category.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Our Bestsellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {bestsellers.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="e-store/shop">Shop All Products <ArrowRight className="ml-2 h-5 w-5"/></Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-background py-12 md:py-24">
          <div className="container mx-auto">
            <div className="relative rounded-lg overflow-hidden">
                <Image
                    src="https://www.aurusjewels.com/cdn/shop/files/Custom-made_indian_wedding_necklace.png?v=1684396749"
                    alt="Tribal festival"
                    width={1200}
                    height={400}
                    className="w-full h-full object-cover"
                    data-ai-hint="tribal festival"
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center text-white p-6">
                    <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4">Celebrating Our Culture</h2>
                    <p className="text-lg md:text-xl max-w-3xl mb-8">
                        Every purchase supports the preservation of rich tribal heritage and empowers artisan communities.
                    </p>
                    <Button variant="secondary" size="lg">Learn More</Button>
                </div>
            </div>
          </div>
        </section>

      </main>
      
    </div>
  );
}
