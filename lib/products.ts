export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  sizes: string[];
  variants: { color: string; imgs: string[] }[];
  rating: number;
  reviews: number;
  inStock: boolean;
}

export const PRODUCTS: Record<string, Product> = {
  '1': {
    id: '1', name: 'Structured Oversized Jacket', category: "Women's · Outerwear",
    price: 890000, description: 'Jaket oversized struktural yang elegan. Dibuat dari bahan premium dengan detail yang sangat teliti — sempurna untuk tampilan kasual maupun formal.',
    details: ['Material: 80% Polyester, 20% Nylon', 'Fit: Oversized', 'Care: Dry clean only', 'SKU: VOG-OW-001'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Black', imgs: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&auto=format&fit=crop'] },
      { color: 'Tan',   imgs: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&h=1000&auto=format&fit=crop'] },
    ],
    rating: 4.8, reviews: 124, inStock: true,
  },
  '2': {
    id: '2', name: 'Wide Leg Cargo Pant', category: "Women's · Bottoms",
    price: 650000, description: 'Celana cargo wide leg dengan siluet modern. Kenyamanan maksimal dengan sentuhan editorial yang cocok untuk berbagai kesempatan.',
    details: ['Material: 100% Cotton Twill', 'Fit: Wide Leg', 'Care: Machine wash cold', 'SKU: VOG-BT-002'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Sand',     imgs: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&auto=format&fit=crop'] },
    ],
    rating: 4.6, reviews: 89, inStock: true,
  },
  '3': {
    id: '3', name: 'Essential Pullover Hoodie', category: "Men's · Tops",
    price: 420000, originalPrice: 600000,
    description: 'Hoodie pullover essential dengan bahan fleece premium. Nyaman sepanjang hari untuk aktivitas sehari-hari.',
    details: ['Material: 70% Cotton, 30% Polyester', 'Fit: Regular', 'Care: Machine wash warm', 'SKU: VOG-TP-003'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Black', imgs: ['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&h=1000&auto=format&fit=crop'] },
    ],
    rating: 4.7, reviews: 203, inStock: true,
  },
  '4': {
    id: '4', name: 'Canvas Studio Tote', category: 'Accessories · Bags',
    price: 480000, description: 'Tote bag kanvas studio yang luas dan kuat. Ideal untuk aktivitas sehari-hari dengan gaya yang tetap terjaga.',
    details: ['Material: Heavy Canvas', 'Capacity: ~20L', 'Care: Spot clean', 'SKU: VOG-AC-004'],
    sizes: ['One Size'],
    variants: [
      { color: 'Sand',  imgs: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&auto=format&fit=crop'] },
    ],
    rating: 4.9, reviews: 67, inStock: true,
  },
  '5': {
    id: '5', name: 'Relaxed Linen Shirt', category: "Men's · Tops",
    price: 540000, description: 'Kemeja linen relaksed dengan cut yang breathable. Sempurna untuk musim panas dan tampilan kasual yang bersih.',
    details: ['Material: 100% Linen', 'Fit: Relaxed', 'Care: Machine wash cold', 'SKU: VOG-TP-005'],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Ecru',      imgs: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&auto=format&fit=crop'] },
    ],
    rating: 4.5, reviews: 91, inStock: true,
  },
  '6': {
    id: '6', name: 'Urban Runner Mono', category: 'Accessories · Footwear',
    price: 1200000, description: 'Sneaker urban monokrom dengan desain minimalis dan sol yang nyaman untuk pemakaian seharian.',
    details: ['Material: Mesh + Rubber Sole', 'Fit: True to size', 'Care: Wipe clean', 'SKU: VOG-FW-006'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    variants: [
      { color: 'Black', imgs: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&auto=format&fit=crop'] },
    ],
    rating: 4.8, reviews: 156, inStock: true,
  }
}

export const ALL_PRODUCTS_LIST = Object.values(PRODUCTS)