// import { Header } from "@/components/header";
// import { Footer } from "@/components/footer";
// import { ProductCard } from "@/components/product-card";
// import { products } from "@/lib/data";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { PlusCircle, Package, CircleDollarSign, Clock, ArrowRight } from "lucide-react";
// import Link from "next/link";

// export default function SellerDashboardPage() {
//   const sellerProducts = products.slice(0, 4); // Mock: show first 4 products as seller's

//   return (
//     <div className="flex flex-col min-h-screen bg-secondary">
//       <Header />
//       <main className="flex-1 container py-8 md:py-12">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-headline font-bold">Seller Dashboard</h1>
//             <p className="text-muted-foreground mt-1">Welcome back, Artisan!</p>
//           </div>
//           <Button asChild className="mt-4 md:mt-0 bg-accent text-accent-foreground hover:bg-accent/90">
//             <Link href="/add-product">
//               <PlusCircle className="mr-2 h-5 w-5" />
//               Add New Product
//             </Link>
//           </Button>
//         </div>

//         {/* Stats Section */}
//         <div className="grid gap-4 md:grid-cols-3 mb-12">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//               <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">₹45,231.89</div>
//               <p className="text-xs text-muted-foreground">+20.1% from last month</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
//               <Package className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">+{sellerProducts.length}</div>
//               <p className="text-xs text-muted-foreground">Total products for sale</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
//               <Clock className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">3</div>
//               <p className="text-xs text-muted-foreground">Ready to be shipped</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Products Section */}
//         <section>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-headline font-bold">Your Products</h2>
//             <Button variant="ghost" asChild>
//                 <Link href="#">View All<ArrowRight className="ml-2 h-4 w-4" /></Link>
//             </Button>
//           </div>
//           {sellerProducts.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
//               {sellerProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-20 border-2 border-dashed rounded-lg bg-card">
//               <Package className="mx-auto h-12 w-12 text-muted-foreground" />
//               <h3 className="mt-4 text-lg font-medium">No products yet</h3>
//               <p className="mt-1 text-sm text-muted-foreground">
//                 Add your first product to start selling.
//               </p>
//               <Button asChild className="mt-6">
//                 <Link href="/add-product">Add Product</Link>
//               </Button>
//             </div>
//           )}
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/e-store/header';
import { Footer } from '@/components/e-store/footer';
import { ProductCard } from '@/components/e-store/product-card';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  PlusCircle,
  Package,
  CircleDollarSign,
  Clock,
  ArrowRight,
} from 'lucide-react';


export interface Product {
  id: string;
  _id?: string; // Add this line to allow for backend _id
  name: string;
  imageUrl: string;
  imageHint?: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  sellerId: string;
  createdAt: string;
  updatedAt: string;

  // Optional fields
  artisan: string;
  tribe: string;
  region: string;
  tags: string[];
  material: string;
}


export default function SellerDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      const sellerId = localStorage.getItem('sellerId');
      if (!sellerId) return;

      try {
        //const res = await fetch(`http://localhost:5000/api/products?sellerId=${sellerId}`);
        const res = await fetch(`/api/products?sellerId=${sellerId}`);
        const data = await res.json();

        if (res.ok) {
          setProducts(data.products); // backend should return { products: [...] }
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching seller products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-1 container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold">Seller Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, Artisan!</p>
          </div>
          <Button asChild className="mt-4 md:mt-0 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/add-product">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add New Product
            </Link>
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid gap-4 md:grid-cols-3 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">Total products for sale</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Ready to be shipped</p>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-headline font-bold">Your Products</h2>
            <Button variant="ghost" asChild>
              <Link href="#">View All<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {products.map((product) => {
                // Map backend product fields to the expected ProductCard type
                // const mappedProduct = {
                //   id: product._id,
                //   name: product.name,
                //   image: product.image,
                //   imageHint: product.imageHint,
                //   price: product.price,
                //   description: product.description,
                //   category: product.category,
                //   stock: product.stock,
                //   sellerId: product.sellerId,
                //   createdAt: product.createdAt,
                //   updatedAt: product.updatedAt,
                //   // Add any other fields required by ProductCard
                // };
                const allowedMaterials = ["Bamboo", "Terracotta", "Cotton", "Brass", "Cane"] as const;
                const mappedProduct = {
  id: product._id?.toString() || "",
  name: product.name,
  imageUrl: product.imageUrl,
  imageHint: product.imageHint || "", // optional fallback
  price: product.price,
  description: product.description,
  category: product.category as "Handicrafts" | "Clothing" | "Jewelry" | "Home Decor" | "Herbal Products", // ✅ Fixed here
  stock: product.stock,
  sellerId: product.sellerId,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
  artisan: product.artisan || "Unknown",
  tribe: product.tribe || "N/A",
  region: product.region || "N/A",
  tags: product.tags as ("Eco-friendly" | "Hand-made" | "Organic")[],
  material: allowedMaterials.includes(product.material as any)
    ? (product.material as typeof allowedMaterials[number])
    : "Cotton", // fallback
};

                
                return (
                  <ProductCard key={mappedProduct.id} product={mappedProduct} />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed rounded-lg bg-card">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No products yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add your first product to start selling.
              </p>
              <Button asChild className="mt-6">
                <Link href="/add-product">Add Product</Link>
              </Button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

