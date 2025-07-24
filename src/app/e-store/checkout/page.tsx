import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { products } from "@/lib/data";

export default function CheckoutPage() {
    const cartItems = products.slice(0, 2);
    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const shipping = 50;
    const total = subtotal + shipping;

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-1 container py-8 md:py-12">
        <div className="grid lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" />
                    </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Payment Method</CardTitle>
                <CardDescription>Razorpay, UPI, and COD options available.</CardDescription>
              </CardHeader>
               <CardContent>
                {/* Payment gateway integration would go here */}
                <p className="text-sm text-muted-foreground">Select a payment option at the final step.</p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center gap-4">
                                <div className="w-16 h-16 relative">
                                  <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" className="rounded-md" data-ai-hint={item.imageHint} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">By {item.artisan}</p>
                                </div>
                                <p className="font-semibold">₹{item.price.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                    <Separator className="my-6" />
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                        </div>
                         <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>₹{shipping.toLocaleString()}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4">
                    <div className="w-full">
                        <h4 className="font-semibold mb-2">Support a Tribal Artisan</h4>
                        <RadioGroup defaultValue="none" className="flex gap-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="none" id="r-none" />
                                <Label htmlFor="r-none">None</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="10" id="r10" />
                                <Label htmlFor="r10">₹10</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="50" id="r50" />
                                <Label htmlFor="r50">₹50</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="100" id="r100" />
                                <Label htmlFor="r100">₹100</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">Place Order</Button>
                </CardFooter>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
