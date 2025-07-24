// src/components/home/FamousTribalPeople.tsx
import PersonCard from './PersonCard';

interface TribalPerson {
  id: number;
  name: string;
  tribe: string;
  title: string;
  description: string;
  imageUrl: string;
  achievements: string[];
  state: string;
}

const FamousTribalPeople = () => {
  const tribalPeople: TribalPerson[] = [
    {
      id: 1,
      name: "Birsa Munda",
      tribe: "Munda",
      title: "Freedom Fighter & Tribal Leader",
      description: "A legendary freedom fighter who led the tribal rebellion against British colonial rule and fought for the rights of indigenous people.",
      imageUrl: "/images/famous-people/birsa-munda.jpg",
      achievements: [
        "Led the Munda Rebellion (1899-1900)",
        "Fought against British land policies",
        "Champion of tribal rights"
      ],
      state: "Jharkhand"
    },
    {
      id: 2,
      name: "Rani Gaidinliu",
      tribe: "Naga",
      title: "Freedom Fighter & Spiritual Leader",
      description: "A courageous Naga spiritual and political leader who fought against British rule and was imprisoned for 14 years.",
      imageUrl: "/images/famous-people/rani-gaidinliu.jpg",
      achievements: [
        "Led Heraka movement",
        "Imprisoned for 14 years by British",
        "Padma Bhushan recipient (1982)"
      ],
      state: "Manipur"
    },
    {
      id: 3,
      name: "Komaram Bheem",
      tribe: "Gond",
      title: "Revolutionary & Tribal Leader",
      description: "A tribal leader who fought against feudal lords and for the rights of tribal people in the Hyderabad state.",
      imageUrl: "/images/famous-people/komaram-bheem.jpg",
      achievements: [
        "Led armed struggle against Nizams",
        "Fought for tribal land rights",
        "Inspired Telangana movement"
      ],
      state: "Telangana"
    },
    {
      id: 4,
      name: "Tantya Mama",
      tribe: "Bhil",
      title: "Freedom Fighter & Social Reformer",
      description: "A Bhil freedom fighter who rebelled against British rule and fought for the welfare of tribal communities.",
      imageUrl: "/images/famous-people/tantya-mama.jpg",
      achievements: [
        "Led Bhil rebellion",
        "Social reformer",
        "Champion of tribal education"
      ],
      state: "Madhya Pradesh"
    },
    {
      id: 5,
      name: "Jyoti Jawar",
      tribe: "Gond",
      title: "Contemporary Tribal Artist",
      description: "A renowned contemporary Gond artist who has brought traditional tribal art to international recognition.",
      imageUrl: "/images/famous-people/jyothi-jawar.jpg",
      achievements: [
        "International art exhibitions",
        "Traditional Gond art preservation",
        "Cultural ambassador"
      ],
      state: "Madhya Pradesh"
    },
    {
      id: 6,
      name: "Droupadi Murmu",
      tribe: "Santhal",
      title: "President of India",
      description: "The 15th President of India and the first tribal woman to hold this prestigious office.",
      imageUrl: "/images/famous-people/droupadi-murmu.jpg",
      achievements: [
        "15th President of India",
        "Former Governor of Jharkhand",
        "First tribal woman President"
      ],
      state: "Odisha"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tribalPeople.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
};

export default FamousTribalPeople;