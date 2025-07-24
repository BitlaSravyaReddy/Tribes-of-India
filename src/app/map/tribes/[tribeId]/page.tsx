// import { stateData, type Tribe } from '@/lib/data';
// import { TribeDetailContent } from '@/components/tribe-detail-content';
// import { notFound } from 'next/navigation';
// import type { Metadata, ResolvingMetadata } from 'next';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft } from 'lucide-react';


// interface TribePageProps {
//   params: {
//     tribeId: string;
//   };

// }

// // Function to get tribe data. In a real app, this might fetch from an API.
// async function getTribe(id: string): Promise<Tribe | undefined> {
//   return stateData.tribes.find((tribe) => tribe.id === id);
// }



// export async function generateStaticParams() {
//   return stateData.tribes.map((tribe) => ({
//     tribeId: tribe.id,
//   }));
// }


// export async function generateMetadata(
//   { params }: TribePageProps,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const tribe = await getTribe(params.tribeId);

//   if (!tribe) {
//     return {
//       title: 'Tribe Not Found | Tribal Echoes',
//     };
//   }

//   return {
//     title: `${tribe.name} | Tribal Echoes`,
//     description: `Learn about the ${tribe.name}: ${tribe.title}. Discover their history, culture, and traditions.`,
//   };
// }


// export default async function TribePage({ params }: TribePageProps) {
//   const tribe = await getTribe(params.tribeId);

//   if (!tribe) {
//     notFound();
//   }

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
//       <div className="mb-8">
//         <Button asChild variant="outline">
//           <Link href="/" className="inline-flex items-center text-primary hover:text-accent">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to All Tribes
//           </Link>
//         </Button>
//       </div>
//       <TribeDetailContent tribe={tribe} />
//     </div>
//   );
// }
import { TribeDetailContent } from '../../../../components/map/tribe-detail-content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamicParams = true;


interface TribePageProps {
  params: {
    tribeId: string;
  };
}

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

async function fetchAllTribes(): Promise<Tribe[]> {
  // const res = await fetch('http://localhost:5000/api/data', {
  //   cache: 'no-store', // disable caching so you get fresh data
  // });
    const res = await fetch('/api/data', { cache: 'no-store' });

});

  if (!res.ok) {
    throw new Error('Failed to fetch tribe data from API');
  }

  const data = await res.json();

  return [
    ...data.ap.tribes,
    ...data.ts.tribes,
    ...data.tn.tribes,
  ];
}

async function getTribe(id: string): Promise<Tribe | undefined> {
  const allTribes = await fetchAllTribes();
  return allTribes.find((tribe) => tribe.id === id);
}

export async function generateStaticParams() {
  const tribes = await fetchAllTribes();
  return tribes.map((tribe) => ({
    tribeId: tribe.id,
  }));
}

export async function generateMetadata({ params }: TribePageProps): Promise<Metadata> {
  const tribe = await getTribe(params.tribeId);

  if (!tribe) {
    return {
      title: 'Tribe Not Found | Tribal Echoes',
    };
  }

  return {
    title: `${tribe.name} | Tribal Echoes`,
    description: `Learn about the ${tribe.name}: ${tribe.title}. Discover their history, culture, and traditions.`,
  };
}

export default async function TribePage({ params }: TribePageProps) {
  const tribe = await getTribe(params.tribeId);

  if (!tribe) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link href="/" className="inline-flex items-center text-primary hover:text-accent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Tribes
          </Link>
        </Button>
      </div>
      <TribeDetailContent tribe={tribe} />
    </div>
  );
}
