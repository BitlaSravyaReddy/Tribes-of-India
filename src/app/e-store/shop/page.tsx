// app/e-store/shop/page.tsx
export const dynamic = "force-dynamic";

import { ShopClient } from "@/components/e-store/shop-page-client";
import { products, categories } from "@/lib/e-store/data";

export default function ShopPage() {
  return <ShopClient products={products} categories={categories.map(({ name }) => ({ name }))} />;
}
