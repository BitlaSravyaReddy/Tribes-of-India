'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import LanguageSwitcher  from '../layout/LanguageSwitcher'; //
import { useHasMounted } from "@/hooks/useHasMounted";
import { useTranslation } from 'react-i18next'; //
import { useState, useEffect } from 'react';
import { Heart } from "lucide-react"
import { type Product } from "@/lib/e-store/data"
import { cn } from "@/lib/e-store/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { t } = useTranslation(); //
  const pathname = usePathname(); //
  const hasMounted= useHasMounted();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-lg flex flex-col", className)}>
      <CardHeader className="p-0 relative group">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.imageUrl}
            alt={product.name || "Product image"}
            width={600}
            height={600}
            className="object-cover w-full aspect-square transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.imageHint}
          />
        </Link>
        <Button variant="secondary" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full z-10">
          {hasMounted && (
                  <>
          <Heart className="w-5 h-5" />
          <span className="sr-only">{t("product_card.add_to_wishlist")}</span>
          </>)}
        </Button>
      </CardHeader>
      <CardContent className="p-4 space-y-2 flex-grow">
        <div className="flex flex-wrap gap-1">
          {product.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <CardTitle className="text-lg font-body leading-tight">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">By {product.artisan} ({product.tribe})</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        
            <p className="text-xl font-bold font-headline text-primary">₹{product.price.toLocaleString()}</p>
            {hasMounted && (
          <>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">{t('product_card.add_to_cart')}</Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
