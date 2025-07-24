export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  imageHint: string;
  price: number;
  category: 'Handicrafts' | 'Clothing' | 'Jewelry' | 'Home Decor' | 'Herbal Products';
  artisan: string;
  tribe: string;
  region: string; // state
  tags: ('Eco-friendly' | 'Hand-made' | 'Organic')[];
  bestseller?: boolean;
  material: 'Bamboo' | 'Terracotta' | 'Cotton' | 'Brass' | 'Cane';
};

export const categories = [
  { name: 'Handicrafts', icon: 'Brush' },
  { name: 'Clothing', icon: 'Shirt' },
  { name: 'Jewelry', icon: 'Gem' },
  { name: 'Home Decor', icon: 'Home' },
  { name: 'Herbal Products', icon: 'Leaf' },
] as const;


export const products: Product[] = [
  {
    id: '1',
    name: 'Bamboo Weave Basket',
    imageUrl: 'https://www.akway.in/cdn/shop/files/6a.png?v=1701503951',
    imageHint: 'bamboo basket',
    price: 1200,
    category: 'Handicrafts',
    artisan: 'Rani Devi',
    tribe: 'Gond',
    region: 'Madhya Pradesh',
    tags: ['Eco-friendly', 'Hand-made'],
    bestseller: true,
    material: 'Bamboo'
  },
  {
    id: '2',
    name: 'Terracotta Warrior Figurine',
    imageUrl: 'https://m.media-amazon.com/images/I/71avAtEGGTL._AC_UF894,1000_QL80_.jpg',
    imageHint: 'terracotta figurine',
    price: 2500,
    category: 'Home Decor',
    artisan: 'Sanjay Kumar',
    tribe: 'Bhil',
    region: 'Rajasthan',
    tags: ['Hand-made'],
    material: 'Terracotta'
  },
  {
    id: '3',
    name: 'Handwoven Cotton Stole',
    imageUrl: 'https://cdn.shopaccino.com/swadescreations/products/whatsapp-image-2025-04-19-at-92833-am-77348156683744_l.jpeg?v=573',
    imageHint: 'cotton stole',
    price: 1800,
    category: 'Clothing',
    artisan: 'Meena Kumari',
    tribe: 'Santhal',
    region: 'Jharkhand',
    tags: ['Hand-made', 'Organic'],
    bestseller: true,
    material: 'Cotton'
  },
  {
    id: '4',
    name: 'Dhokra Brass Necklace',
    imageUrl: 'https://qurcha.com/wp-content/uploads/2021/05/Dhokra-Brass-Metal-Necklace-By-Qurcha.jpg',
    imageHint: 'brass necklace',
    price: 3500,
    category: 'Jewelry',
    artisan: 'Laxman Singh',
    tribe: 'Dhokra',
    region: 'Chhattisgarh',
    tags: ['Hand-made'],
    material: 'Brass'
  },
  {
    id: '5',
    name: 'Organic Healing Balm',
    imageUrl: 'https://allgoodbodycare.com/cdn/shop/files/allgoods-goop-2oz-11-4.jpg?v=1712863487&width=1946',
    imageHint: 'herbal balm',
    price: 800,
    category: 'Herbal Products',
    artisan: 'Vanaja Herbal',
    tribe: 'Chenchu',
    region: 'Andhra Pradesh',
    tags: ['Organic', 'Eco-friendly'],
    material: 'Cane' // Placeholder
  },
  {
    id: '6',
    name: 'Cane & Bamboo Lamp Shade',
    imageUrl: 'https://m.media-amazon.com/images/I/81hHDCUxeVL._AC_UF350,350_QL80_.jpg',
    imageHint: 'bamboo lampshade',
    price: 2200,
    category: 'Home Decor',
    artisan: 'Arun Bora',
    tribe: 'Mishing',
    region: 'Assam',
    tags: ['Eco-friendly', 'Hand-made'],
    bestseller: true,
    material: 'Cane'
  },
  {
    id: '7',
    name: 'Tribal Art Cotton T-Shirt',
    imageUrl: 'https://smarteez.in/cdn/shop/files/Tridev-PatachitrainspiredBengalHeritageArtStyleBlackT-Shirt.png?v=1744124444&width=1946',
    imageHint: 'art t-shirt',
    price: 1500,
    category: 'Clothing',
    artisan: 'Artisan Collective',
    tribe: 'Warli',
    region: 'Maharashtra',
    tags: ['Hand-made', 'Organic'],
    material: 'Cotton'
  },
  {
    id: '8',
    name: 'Beaded Tribal Earrings',
    imageUrl: 'https://assets.ajio.com/medias/sys_master/root/20230616/1wcq/648c639142f9e729d7476319/-473Wx593H-466281138-multi-MODEL.jpg',
    imageHint: 'beaded earrings',
    price: 950,
    category: 'Jewelry',
    artisan: 'Priya',
    tribe: 'Toda',
    region: 'Tamil Nadu',
    tags: ['Hand-made'],
    bestseller: true,
    material: 'Brass'
  },
];
