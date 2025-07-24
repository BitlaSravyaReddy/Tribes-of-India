import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle } from 'lucide-react';

export default function LoadingTribeDetail() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)]">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl font-medium text-muted-foreground">Loading tribe details...</p>
      </div>
      <div className="max-w-4xl mx-auto space-y-6 mt-8 hidden"> {/* Hidden as visual structure, actual loader above */}
        <Skeleton className="h-12 w-1/2" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-72 w-full rounded-lg" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-24 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
