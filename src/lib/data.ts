import type { StaticImageData } from 'next/image';

// It's better to import actual images or use URLs if you have them.
// For now, we'll define a type that can accommodate string URLs for placeholders.
// If you were using local images:
// import tribe1Image from '@/../public/images/tribe1.jpg'; // Example

export type Tribe = {
  id: string;
  name: string;
  title: string;
  imageSrc: string; // URL for picsum or path to local image
  imageHint: string;
  history: string;
  origin: string;
  distribution: string;
  festivals: { name: string; description: string }[];
  livelihood: string;
  challenges: string[];
  beliefs: string;
  practices: string[];
};

export type HistoryEvent = {
  year: string;
  title: string;
  description: string;
};

export const stateData = {
  name: "Andhra Pradesh",
  tagline: "Discover the vibrant heritage and timeless traditions of our land.",
  history: [
    { year: "Ancient Times", title: "First Settlers", description: "Early tribal communities establish themselves in the region, living in harmony with nature, developing unique hunter-gatherer lifestyles." },
    { year: "c. 500 BCE", title: "Emergence of Chiefdoms", description: "Small kingdoms and chiefdoms emerge, influencing local tribal customs through trade and occasional conflict, leading to cultural exchange." },
    { year: "Medieval Era", title: "Flourishing Arts & Crafts", description: "Tribal arts, weaving, and pottery reach new heights, with distinct styles reflecting the diverse cultural landscape." },
    { year: "Colonial Period", title: "Resilience and Adaptation", description: "Tribes face new challenges, adapting their ways of life while striving to preserve their identity and ancestral lands." },
    { year: "Post-Independence", title: "Recognition and Development", description: "Efforts towards recognition of tribal rights and socio-economic development begin, aiming to integrate communities while preserving their heritage." },
  ] as HistoryEvent[],
  tribes: [
    {
      id: "aranya",
      name: "Aranya People",
      title: "Guardians of the Ancient Forests",
      imageSrc: "https://picsum.photos/seed/aranya/600/400",
      imageHint: "dense forest tribal dwelling",
      history: "The Aranya have inhabited the deep forests for millennia, their history interwoven with the ancient trees and spirits of the wild. They are known for their sustainable living practices.",
      origin: "Oral traditions speak of their emergence from a sacred grove, blessed by the forest deities. Their lineage is traced back to the first guardians of the woods.",
      distribution: "Primarily found in the dense tropical rainforests of the southern districts, living in small, self-sufficient communities.",
      festivals: [
        { name: "Vanaprastha", description: "A harvest festival celebrating the bounty of the forest, marked by offerings, communal feasts, and traditional dances." },
        { name: "Aranyani Puja", description: "A ritual to honor the forest goddess, seeking her protection and blessings for the community." }
      ],
      livelihood: "Sustainable forestry, collection of non-timber forest products, traditional herbal medicine, and limited subsistence agriculture.",
      challenges: ["Deforestation and habitat loss", "Access to modern healthcare and education", "Preserving traditional knowledge against external influences"],
      beliefs: "Animistic beliefs centered around forest spirits, ancestor worship, and the sacredness of all living beings. They believe the forest is a conscious entity.",
      practices: ["Ritualistic offerings to nature spirits", "Complex storytelling traditions", "Use of natural dyes for intricate textile patterns", "Shamanistic healing practices"],
    },
    {
      id: "nadi",
      name: "Nadi Dwellers",
      title: "Masters of Riverine Life",
      imageSrc: "https://picsum.photos/seed/nadi/600/400",
      imageHint: "river village tribal boats",
      history: "The Nadi people's history is tied to the great rivers that crisscross the state. They developed sophisticated fishing techniques and river navigation skills.",
      origin: "Legends say they were born from the river's embrace, their ancestors being mythical river beings who taught them the ways of water.",
      distribution: "Along the major riverbanks and delta regions, with settlements adapted to seasonal floods and changes in water levels.",
      festivals: [
        { name: "Jal Utsav", description: "A festival celebrating the river, involving boat races, offerings to the river gods, and cultural performances on riverbanks." },
        { name: "Matsya Jayanti", description: "A day dedicated to the fish deity, praying for abundant catches and sustainable fishing." }
      ],
      livelihood: "Fishing, boat making, river trade, and cultivation of river-fed lands. Some communities are also involved in pearl diving.",
      challenges: ["River pollution and declining fish stocks", "Impact of dams and water diversion projects", "Maintaining traditional fishing rights"],
      beliefs: "Reverence for river deities and water spirits. They believe rivers are lifelines and possess spiritual power.",
      practices: ["Elaborate boat crafting rituals", "Traditional net-weaving techniques", "Water-based healing therapies", "Oral histories recited during evening gatherings by the river"],
    },
    {
      id: "shaila",
      name: "Shaila Highlanders",
      title: "Keepers of Mountain Traditions",
      imageSrc: "https://picsum.photos/seed/shaila/600/400",
      imageHint: "mountain village tribal people",
      history: "The Shaila people have thrived in the high-altitude regions for centuries, known for their resilience and deep understanding of mountain ecosystems.",
      origin: "Their creation myths often involve mountain peaks as the home of their ancestral spirits or gods who sculpted the land.",
      distribution: "In the remote hilly and mountainous terrains of the northern and eastern parts of the state, often in isolated hamlets.",
      festivals: [
        { name: "Giri Puja", description: "A festival to worship the mountain gods, seeking protection from natural calamities and ensuring prosperity." },
        { name: "Pathar Nach", description: "A unique stone dance performed during harvest, symbolizing the strength and endurance of the mountain people." }
      ],
      livelihood: "Terrace farming, animal husbandry (yak, mountain goats), collection of medicinal herbs from high altitudes, and intricate wool weaving.",
      challenges: ["Harsh climatic conditions and difficult terrain", "Limited access to markets and infrastructure", "Preserving unique dialects and cultural practices"],
      beliefs: "Strong belief in mountain deities, ancestral spirits residing in peaks and caves, and the interconnectedness of the mountain ecosystem.",
      practices: ["Building stone and wood houses adapted to cold climates", "Traditional weather forecasting based on natural signs", "Singing epic ballads of mountain heroes", "Intricate beadwork and jewelry making"],
    },
  ] as Tribe[]
};
