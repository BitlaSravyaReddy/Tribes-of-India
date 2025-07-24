import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';




interface StateData {
  imageSrc: string;
  name: string; // Add this
}

interface InteractiveMapProps {
  state: StateData;
}

export function InteractiveMap({ state }: InteractiveMapProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
      <CardContent className="p-0">
        <div className="aspect-video relative w-full">
          <Image
            src={state.imageSrc}
            alt="Map of the state highlighting tribal areas"
            layout="fill"
            objectFit="cover"
            data-ai-hint="state map tribal regions"
            className="transition-transform duration-500 hover:scale-105"
          />
        </div>
      </CardContent>
      <CardHeader className="p-6">
        <CardDescription className="text-center text-muted-foreground">
          A visual representation of {''}
          <span className="font-semibold text-foreground">{state.name}</span>
          , highlighting its diverse districts and significant tribal homelands. 
          Clickable regions (future feature) would provide insights into local cultures and demographics.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
