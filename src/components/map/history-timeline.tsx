//import type { HistoryEvent } from '@/lib/data';
import { ScrollText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';


interface HistoryEvent {
  year: string;
  title: string;
  description: string;
}
interface HistoryTimelineProps {
  events: HistoryEvent[];
}

export function HistoryTimeline({ events }: HistoryTimelineProps) {
  if (!events || events.length === 0) {
    return <p>No historical events to display.</p>;
  }

  return (
    <div className="relative space-y-8 ">
      {events.map((event, index) => (
        <div key={index} className="relative pl-10 md:pl-12 group">
          {/* Timeline line */}
          {index < events.length -1 && <div className="absolute left-4 top-5 bottom-[-2rem] w-1 bg-[#E26A5A]/30 group-hover:bg-[#E26A5A] transition-colors duration-200" />}
          
          {/* Dot */}
          <div className="absolute left-0 top-2.5 flex items-center justify-center w-8 h-8 rounded-full bg-[#f35f4c] shadow-md">
            <ScrollText size={20} color="#fff" />
          </div>
          
          <Card className="ml-4 sm:ml-0 bg-[#f7faf7] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-0">
            <CardContent className="p-7">
              <h3 className="text-xl font-semibold mb-1" style={{ color: '#507ea6' }}>{event.year} - {event.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
