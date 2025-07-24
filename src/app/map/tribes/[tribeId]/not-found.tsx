import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function TribeNotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-4 py-16 text-center">
      <AlertTriangle className="w-24 h-24 text-destructive mb-6" />
      <h1 className="text-4xl font-bold text-foreground mb-4">Tribe Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Sorry, we couldn't find the tribe you were looking for. It might have been moved or doesn't exist.
      </p>
      <Button asChild size="lg">
        <Link href="/">Go Back to Homepage</Link>
      </Button>
    </div>
  );
}
