import { Header } from "@/components/e-store/header";
import { Footer } from "@/components/e-store/footer";
import { ProductCard } from "@/components/e-store/product-card";
import { products } from "@/lib/e-store/data";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WishlistPage() {
  const wishlistItems = products.slice(0, 3); // Mock data

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Your Wishlist</h1>
          <p className="text-lg text-muted-foreground mt-2">
            The items you love, all in one place.
          </p>
        </div>
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Your wishlist is empty</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Add items to your wishlist by clicking the heart icon on a product.
            </p>
            <Button asChild className="mt-6">
                <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
