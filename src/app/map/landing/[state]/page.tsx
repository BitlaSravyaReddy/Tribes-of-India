//import { stateData } from '@/lib/data';
'use client';
import { InteractiveMap } from '@/components/map/interactive-map';
import { HistoryTimeline } from '@/components/map/history-timeline';
import { TribeCard } from '@/components/map/tribe-card';
import { MapPin, Landmark, Users, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams , useParams} from 'next/navigation';

import axios from 'axios';

export default function HomePage() {
   const params = useParams();
  const stateCode = (Array.isArray(params.state) ? params.state[0] : params.state)?.toLowerCase();
  const [stateData, setStateData] = useState<any>(null);

  useEffect(() => {
    if (!stateCode) return;

    const fetchData = async () => {
      try {
        

        // const res = await axios.get('http://localhost:5000/api/data');
        const res = await axios.get('/api/data');

        console.log('stateCode from params:', stateCode);
        console.log('Available keys from API:', Object.keys(res.data as object));
        setStateData((res.data as Record<string, any>)[stateCode]);
        
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [stateCode]);


  if (!stateData) return <div>Loading...</div>;

  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 shadow-2xl rounded-xl bg-[#f5f3f3]">
      <section id="state-title" className="text-center mb-12 sm:mb-16">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight" style={{ color: '#507ea6' }}>
          <span className="block text-primary">{stateData.name}</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          {stateData.tagline}
        </p>
      </section>

      <section id="interactive-map" className="mb-12 sm:mb-16">
        <div className="flex items-center mb-6 sm:mb-8">
          <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-[#E26A5A] mr-3" />
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">Discover Our Lands</h2>
        </div>
        <InteractiveMap state={{ imageSrc: stateData.stateImage, name: stateData.name }}/>
      </section>

      <section id="state-history" className="mb-12 sm:mb-16">
        <div className="flex items-center mb-6 sm:mb-8">
          <Landmark className="h-8 w-8 sm:h-10 sm:w-10 text-[#E26A5A] mr-3" />
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">A Journey Through Time</h2>
        </div>
        <HistoryTimeline events={stateData.history} />
      </section>

      <section id="tribe-showcase">
        <div className="flex items-center mb-6 sm:mb-8">
          <Users className="h-8 w-8 sm:h-10 sm:w-10 text-[#E26A5A] mr-3" />
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">Meet The Tribes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stateData.tribes.map((tribe:any) => (
            <TribeCard key={tribe.id} tribe={tribe} />
          ))}
        </div>
      </section>
    </div>
  );
}
