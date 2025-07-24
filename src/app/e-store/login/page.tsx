'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const LoginForm = ({ role }: { role: 'buyer' | 'seller' }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // const res = await fetch('http://localhost:5000/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //     userType: role, // 'buyer' or 'seller'
    //   }),
    // });
   const res = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email,
    password,
    userType: role,
  }),
});


    const data = await res.json();

    if (res.ok) {
      toast({
        title: 'Login Successful',
        description: data.message,
      });

      // Optional: Store user info/token here

      // Redirect based on user type
      if (data.user && role === 'seller') {
  localStorage.setItem('sellerId', data.user._id); // ✅ Save seller's ID
}

      if (role === 'buyer') {
        router.push('/');
      } else {
        router.push('/seller-dashboard');
      }
    } else {
      toast({
        title: 'Login Failed',
        description: data.message || 'Invalid email or password.',
        variant: 'destructive',
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    toast({
      title: 'Server Error',
      description: 'Something went wrong. Please try again.',
      variant: 'destructive',
    });
  }
};


  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${role}-email`}>Email</Label>
        <Input
          id={`${role}-email`}
          type="email"
          placeholder="m@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <Label htmlFor={`${role}-password`}>Password</Label>
          <Link href="#" className="ml-auto inline-block text-sm underline">
            Forgot your password?
          </Link>
        </div>
        <Input
          id={`${role}-password`}
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        className="w-full !mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
      >
        Login
      </Button>
    </form>
  );
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary px-4">
      <Tabs defaultValue="buyer" className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <Link href="/" className="mb-4">
              <h1 className="text-3xl font-bold font-headline">AdiBazar</h1>
            </Link>
            <CardTitle className="text-2xl font-body">Welcome Back</CardTitle>
            <CardDescription>
              Select your role and enter your credentials to access your
              account.
            </CardDescription>
            <TabsList className="grid w-full grid-cols-2 mt-4">
              <TabsTrigger value="buyer">Buyer</TabsTrigger>
              <TabsTrigger value="seller">Seller</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="buyer">
              <LoginForm role="buyer" />
            </TabsContent>
            <TabsContent value="seller">
              <LoginForm role="seller" />
            </TabsContent>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
