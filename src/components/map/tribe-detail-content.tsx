//import type { Tribe } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollText, Sparkles, LocateFixed, PartyPopper, Briefcase, AlertTriangle, BookOpen, Workflow, Leaf, Mountain, Sun, Moon, Users, MapPin, Landmark, CalendarDays, Wheat, Sprout, HelpingHand } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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


interface TribeDetailContentProps {
  tribe: Tribe;
}

const SectionIcon = ({ section }: { section: string }) => {
  const iconProps = { className: "w-5 h-5 mr-2 text-accent" };
  switch (section.toLowerCase()) {
    case 'history': return <ScrollText {...iconProps} />;
    case 'origin': return <Sparkles {...iconProps} />;
    case 'distribution': return <LocateFixed {...iconProps} />;
    case 'festivals': return <PartyPopper {...iconProps} />;
    case 'livelihood': return <Briefcase {...iconProps} />;
    case 'challenges': return <AlertTriangle {...iconProps} />;
    case 'beliefs': return <HelpingHand {...iconProps} />;
    case 'practices': return <Workflow {...iconProps} />;
    default: return <Leaf {...iconProps} />;
  }
};

export function TribeDetailContent({ tribe }: TribeDetailContentProps) {
  const sections = [
    { title: 'History', content: tribe.history, icon: ScrollText },
    { title: 'Origin', content: tribe.origin, icon: Sparkles },
    { title: 'Distribution', content: tribe.distribution, icon: LocateFixed },
    { title: 'Livelihood', content: tribe.livelihood, icon: Briefcase },
    { title: 'Beliefs', content: tribe.beliefs, icon: HelpingHand },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden shadow-xl mb-8">
        <div className="relative w-full h-72 sm:h-96">
          <Image
            src={tribe.imageSrc}
            alt={`Image of ${tribe.name}`}
            layout="fill"
            objectFit="cover"
            data-ai-hint={tribe.imageHint}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-white shadow- D">{tribe.name}</h1>
            <p className="text-xl sm:text-2xl text-gray-200 italic mt-1 shadow-sm">{tribe.title}</p>
          </div>
        </div>
      </Card>

      <Accordion type="multiple" defaultValue={['History', 'Festivals']} className="w-full space-y-4">
        {sections.map((section) => (
          <AccordionItem key={section.title} value={section.title} className="border-b-0">
             <Card className="overflow-hidden shadow-lg">
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline text-primary hover:bg-muted/50 rounded-t-lg">
                  <div className="flex items-center">
                    <section.icon className="w-6 h-6 mr-3 text-accent" />
                    {section.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <p className="text-foreground/90 leading-relaxed">{section.content}</p>
                </AccordionContent>
             </Card>
          </AccordionItem>
        ))}

        <AccordionItem value="Festivals" className="border-b-0">
          <Card className="overflow-hidden shadow-lg">
            <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline text-primary hover:bg-muted/50 rounded-t-lg">
              <div className="flex items-center">
                <PartyPopper className="w-6 h-6 mr-3 text-accent" />
                Festivals
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-0 space-y-4">
              {tribe.festivals.map((festival, index) => (
                <div key={index} className="p-4 border rounded-md bg-background shadow-sm">
                  <h4 className="font-semibold text-primary">{festival.name}</h4>
                  <p className="text-sm text-muted-foreground">{festival.description}</p>
                </div>
              ))}
            </AccordionContent>
          </Card>
        </AccordionItem>

        <AccordionItem value="Practices" className="border-b-0">
          <Card className="overflow-hidden shadow-lg">
            <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline text-primary hover:bg-muted/50 rounded-t-lg">
              <div className="flex items-center">
                <Workflow className="w-6 h-6 mr-3 text-accent" />
                Practices
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-0">
              <ul className="list-disc list-inside space-y-1 text-foreground/90">
                {tribe.practices.map((practice, index) => (
                  <li key={index}>{practice}</li>
                ))}
              </ul>
            </AccordionContent>
          </Card>
        </AccordionItem>
        
        <AccordionItem value="Challenges" className="border-b-0">
          <Card className="overflow-hidden shadow-lg">
            <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline text-primary hover:bg-muted/50 rounded-t-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-accent" />
                Challenges
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-0">
              <div className="flex flex-wrap gap-2">
              {tribe.challenges.map((challenge, index) => (
                <Badge key={index} variant="outline" className="text-sm border-destructive/50 text-destructive">
                  {challenge}
                </Badge>
              ))}
              </div>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
