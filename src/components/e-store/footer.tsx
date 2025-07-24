import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-headline font-bold mb-4">AdiBazar</h3>
            <p className="text-sm">Empowering tribal artisans by bringing their craft to the world.</p>
          </div>
          <div>
            <h3 className="text-lg font-headline font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-headline font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop?category=Handicrafts" className="hover:text-primary">Handicrafts</Link></li>
              <li><Link href="/shop?category=Clothing" className="hover:text-primary">Clothing</Link></li>
              <li><Link href="/shop?category=Jewelry" className="hover:text-primary">Jewelry</Link></li>
              <li><Link href="/shop?category=Home+Decor" className="hover:text-primary">Home Decor</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-headline font-bold mb-4">Newsletter</h3>
            <p className="text-sm mb-2">Subscribe to get the latest updates on new arrivals and special offers.</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-background" />
              <Button type="submit" variant="default">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AdiBazar. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
