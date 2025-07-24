import { Category , Product} from '../../types/index'
export const categories: Category[] = [
  {
    id: '1',
    name: 'Wooden Makers',
    slug: 'blocks-stacking',
    image: 'https://lsmedia.linker-cdn.net/282256/2021/7131317.jpeg?width=1200&height=1125',
    description: 'Colorful wooden blocks and stacking toys for creative play'
  },
  {
    id: '2',
    name: 'Jewellery',
    slug: 'vehicles',
    image: 'https://www.jiomart.com/images/product/original/rvp1cvq3sp/jfl-jewellery-for-less-stylish-tribal-antique-oxidised-gold-plated-with-multi-colour-bead-necklace-and-dangler-earring-for-women-product-images-rvp1cvq3sp-0-202301121326.jpg',
    description: 'Handcrafted wooden cars, trucks, and trains'
  },
  {
    id: '3',
    name: 'Paintings and art',
    slug: 'animals',
    image: 'https://gallerist.in/cdn/shop/products/EuYPG3KTbX.jpg',
    description: 'Adorable wooden animal figures and playsets'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'The Spiral Forest Archway',
    price: 34.00,
    image: 'https://gallerist.in/cdn/shop/products/EuYPG3KTbX.jpg',
    category: 'blocks',
    description: 'Beautiful rainbow archway with forest elements',
    isBestSeller: true,
    isOnSale: false
  },
  {
    id: '2',
    name: 'The Sparrow and the Pea',
    price: 39.00,
    image: 'https://gallerist.in/cdn/shop/products/EuYPG3KTbX.jpg',
    category: 'blocks',
    description: 'Charming stacking toy with bird and nature elements',
    isBestSeller: true,
    isOnSale: false
  },
  {
    id: '3',
    name: 'Journey Across the Horizon',
    price: 34.00,
    image: 'https://gallerist.in/cdn/shop/products/EuYPG3KTbX.jpg',
    category: 'vehicles',
    description: 'Adventure-themed vehicle set for imaginative play',
    isBestSeller: true,
    isOnSale: false
  },
  {
    id: '4',
    name: 'Rolling Thunder Trio',
    price: 29.00,
    image: 'https://gallerist.in/cdn/shop/products/EuYPG3KTbX.jpg',
    category: 'vehicles',
    description: 'Set of three colorful wooden vehicles',
    isBestSeller: true,
    isOnSale: false
  },
  {
    id: '5',
    name: 'Gentle Woodland Pair',
    price: 29.00,
    image: 'https://gallerist.in/cdn/shop/products/EuYPG3KTbX.jpg',
    category: 'animals',
    description: 'Adorable deer duo for forest-themed play',
    isBestSeller: true,
    isOnSale: false
  },
  {
    id: '6',
    name: 'Feathered Friends',
    price: 26.00,
    image: 'https://gallerist.in/cdn/shop/products/EuYPG3KTbX.jpg',
    category: 'animals',
    description: 'Colorful wooden bird pair on natural perches',
    isBestSeller: true,
    isOnSale: false
  }
];
