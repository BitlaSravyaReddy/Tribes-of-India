
import { TribeDetailContent } from '@/components/map/tribe-detail-content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { dbConnect } from '@/lib/dbConnect';
import MainDocument from '@/models/MainDocument';

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
  await dbConnect();

  const mainDocument = await MainDocument.findOne();
  if (!mainDocument) {
    throw new Error('No data found');
  }

  const data = mainDocument.toObject();
  const tribes: Tribe[] = [];

  for (const stateKey of Object.keys(data)) {
    if (stateKey === '_id') continue;

    const state = data[stateKey];
    if (state?.tribes?.length) {
      tribes.push(...state.tribes);
    }
  }

  return tribes;
}

async function getTribe(id: string): Promise<Tribe | undefined> {
  const allTribes = await fetchAllTribes();
  return allTribes.find((tribe) => tribe.id === id);
}

export async function generateStaticParams() {
  const tribes = await fetchAllTribes();
  return tribes
    .filter((tribe) => typeof tribe.id === 'string' && tribe.id.trim() !== '')
    .map((tribe) => ({
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
