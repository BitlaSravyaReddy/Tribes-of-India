"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation';
import LanguageSwitcher  from '../layout/LanguageSwitcher'; //
import { useHasMounted } from "@/hooks/useHasMounted";

import { useTranslation } from 'react-i18next'; //
import { useState, useEffect } from 'react';
import { Menu, Search, ShoppingCart, User, Languages, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { categories } from "@/lib/e-store/data"

export function Header() {
  const { t } = useTranslation(); //
  const pathname = usePathname(); //
  const hasMounted= useHasMounted();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden mr-4">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <span className="font-bold text-xl font-headline">AdiBazar</span>
                </Link>
                {hasMounted && (
                  <>
                    <Link href="/shop" className="hover:text-foreground">{t('e-storeNavbar.shop_all')}</Link> </>)}
                    {categories.map((category) => (
                      <Link href={`/shop?category=${category.name}`} key={category.name} className="hover:text-foreground">{category.name}</Link>
                    ))}
                  
              
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl font-headline">AdiBazar</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {hasMounted && (
                  <>
            <Link href="/shop" className="transition-colors hover:text-primary">{t('e-storeNavbar.shop_all')}</Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="transition-colors hover:text-primary focus:outline-none">{t('e-storeNavbar.categories')}</DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link href={`/shop?category=${category.name}`}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            </> )}
          </nav>
        </div>

        <div className="flex items-center justify-end space-x-1 md:space-x-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Language options">
                <Languages className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            {/* <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>हिन्दी</DropdownMenuItem>
              <DropdownMenuItem>गोंडी</DropdownMenuItem>
            </DropdownMenuContent> */}
          </DropdownMenu>
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/checkout">
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          {hasMounted && (
          <div className="hidden sm:flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">{t('e-storeNavbar.login')}</Link>
            </Button>
            <Button asChild>
              <Link href="/register">{t('e-storeNavbar.sign_up')}</Link>
            </Button>
          </div>
          )}
           <Link href="/login">
            <Button variant="ghost" size="icon" aria-label="User Profile" className="sm:hidden">
                <User className="h-5 w-5" />
            </Button>
           </Link>
        </div>
      </div>
    </header>
  )
}
