import { TribalItem } from '@/types/tryon';

// tribalItems.ts
export const tribalItems: TribalItem[] = [
  {
    id: 'necklace-1',
    name: 'Golden Tribal Necklace',
    type: 'necklace',
    imagePath: '/tribal-items/necklace1.png', // ✅ use relative path (no public/)
    defaultPosition: { x: 0, y: 140 },         // ✅ increased Y to move down
    defaultScale: 0.3                          // ✅ smaller size
  },
  {
    id: 'necklace-2',
    name: 'Beaded Earth Necklace',
    type: 'necklace',
    imagePath: '/tribal-items/necklace2.png',
    defaultPosition: { x: 0, y: 135 },
    defaultScale: 0.28
  },
  {
    id: 'necklace-3',
    name: 'Swaroski Necklace',
    type: 'necklace',
    imagePath: '/tribal-items/necklace3.png',
    defaultPosition: { x: 0, y: 130 },
    defaultScale: 0.28
  },
  {
    id: 'dress-1',
    name: 'Traditional Tribal Dress',
    type: 'dress',
    imagePath: '/tribal-items/dress1.jpg',
    defaultPosition: { x: 0, y: 150 },
    defaultScale: 0.6
  },
  {
    id: 'dress-2',
    name: 'Ceremonial Earth Dress',
    type: 'dress',
    imagePath: '/tribal-items/dress-2.png',
    defaultPosition: { x: 0, y: 130 },
    defaultScale: 0.5
  }
];
