'use client';

import Link from "next/link";
import { useState , useEffect} from "react";
import { Header } from "@/components/e-store/header";
import { Footer } from "@/components/e-store/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/e-store/data";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

export default function AddProductPage() {
    const { toast } = useToast();
    

// Inside your component
const [productName, setProductName] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');
const [quantity, setQuantity] = useState('');
const [category, setCategory] = useState('');
const [image, setImage] = useState<File | null>(null);
const [tags, setTags] = useState<string[]>([]);
const [artisan, setArtisan]=useState('');
const [tribe ,setTribe] = useState('');
const [region, setRegion]= useState('');
const [material, setMaterial]= useState('');

const [sellerId, setSellerId] = useState('');

  // ✅ Set sellerId only on client side
  useEffect(() => {
    const id = localStorage.getItem('sellerId');
    if (id) {
      setSellerId(id);
    }
  }, []);


    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!sellerId) {
  toast({
    title: "Login Required",
    description: "Please log in again. Seller ID is missing.",
    variant: "destructive",
  });
  return;
}


  if (!image) return;

  const formData = new FormData();
  formData.append("sellerId", sellerId);
  formData.append("productName", productName);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("quantity", quantity);
  formData.append("category", category);
  formData.append("tags", JSON.stringify(tags));
  formData.append("artisan", JSON.stringify(artisan));
  formData.append("tribe", JSON.stringify(tribe));
  formData.append("image", image); // we'll store this as base64 or handle on backend

  try {
    // const response = await fetch('http://localhost:5000/api/add-product', {
    //   method: 'POST',
    //   body: formData
    // });
    const response = await fetch('/api/add-product', {
  method: 'POST',
  body: formData,
});


    const data = await response.json();

    if (response.ok) {
      toast({ title: "Success!", description: "Your product has been added." });
    } else {
      toast({ title: "Error", description: data.message || "Failed to add product." });
    }
  } catch (error) {
    toast({ title: "Error", description: "Something went wrong." });
    console.error(error);
  }
};


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-secondary py-8 md:py-12">
        <div className="container">
            <Button asChild variant="ghost" className="mb-4 pl-0">
                <Link href="/seller-dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Link>
            </Button>
            <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Add a New Product</CardTitle>
                <CardDescription>Fill out the details below to list a new item in your shop.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" value={productName}
  onChange={(e) => setProductName(e.target.value)} placeholder="e.g., Handwoven Cotton Stole" required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={description}
  onChange={(e) => setDescription(e.target.value)} placeholder="Describe your product in detail..." required rows={5}/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="space-y-2">
    <Label htmlFor="price">Price (₹)</Label>
    <Input id="price" type="number" value={price}
  onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 1800" required />
  </div>

  <div className="space-y-2">
    <Label htmlFor="quantity">Quantity</Label>
    <Input id="quantity" type="number" value={quantity}
  onChange={(e) => setQuantity(e.target.value)} placeholder="e.g., 20" required />
  </div>

  <div className="space-y-2">
    <Label htmlFor="category">Category</Label>
    <Select onValueChange={(value) => setCategory(value)}>
      <SelectTrigger id="category">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((cat) => (
          <SelectItem key={cat.name} value={cat.name}>
            {cat.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
</div>

                <div className="space-y-2">
                    <Label htmlFor="product-image">Product Image</Label>
  <Input
    id="product-image"
    type="file"
    
    required
    accept="image/*"
  onChange={(e) => setImage(e.target.files?.[0] || null)}
    className="file:text-foreground"
  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                  <Label htmlFor="artisan">Artisan Name</Label>
<Input id="artisan" value={artisan} onChange={(e) => setArtisan(e.target.value)} required />
</div>
               <div className="space-y-2">
                <Label htmlFor="tribe">Tribe Name</Label>
                <Input id="tribe" value={tribe} onChange={(e) => setTribe(e.target.value)} required/>

               </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
<Input id="region" value={region} onChange={(e) => setRegion(e.target.value)} required />
</div>
               <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Input id='material' value={material} onChange={(e) =>setMaterial(e.target.value)} required/>
               </div>
                </div>

                <div className="space-y-3">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="tag-handmade" checked={tags.includes('Hand-made')}
  onCheckedChange={(checked) => {
    setTags(prev =>
      checked ? [...prev, 'Hand-made'] : prev.filter(t => t !== 'Hand-made')
    );
  }}/>
                            <Label htmlFor="tag-handmade" className="font-normal">Hand-made</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="tag-eco" checked={tags.includes('Eco-friendly')}
  onCheckedChange={(checked) => {
    setTags(prev =>
      checked ? [...prev, 'Eco-friendly'] : prev.filter(t => t !== 'Eco-friendly')
    );
  }}/>
                            <Label htmlFor="tag-eco" className="font-normal">Eco-friendly</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="tag-organic" checked={tags.includes('Organic')}
  onCheckedChange={(checked) => {
    setTags(prev =>
      checked ? [...prev, 'Organic'] : prev.filter(t => t !== 'Organic')
    );
  }}/>
                            <Label htmlFor="tag-organic" className="font-normal">Organic</Label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg" className="bg-yellow-300 text-black hover:bg-black hover:text-yellow-300">
                        Add Product
                    </Button>
                </div>
                <div className=""></div>

                </form>
            </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
