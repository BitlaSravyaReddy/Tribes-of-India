import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Feather } from 'lucide-react';

interface Tribe {
  id: string;
  name: string;
  title: string;
  imageSrc: string;
  imageHint: string;
  history: string;
  origin: string;
  distribution: string;
  festivals: { name: string; description: string }[]; 
  livelihood: string;
  challenges: string[];
  beliefs: string;
  practices: string[];
}

interface TribeCardProps {
  tribe: Tribe;
}

export function TribeCard({ tribe }: TribeCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 h-full bg-white border-0">
      <div className="relative w-full h-48">
        <Image
          src={tribe.imageSrc}
          alt={`Image of ${tribe.name}`}
          layout="fill"
          objectFit="cover"
          data-ai-hint={tribe.imageHint}
          className="transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold text-primary flex items-center" style={{ color: '#507ea6' }}>
          <Feather className="mr-2 h-6 w-6 text-[#E26A5A] bg-white rounded-full shadow-md p-1"  />
          {tribe.name}
        </CardTitle>
        <CardDescription className="text-sm italic text-muted-foreground">{tribe.title}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground line-clamp-3">{tribe.history.substring(0, 120)}...</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="default" className="w-full bg-[#2563eb] hover:bg-blue-700 text-white group">
          <Link href={`/tribes/${tribe.id}`}>
            Learn More <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
