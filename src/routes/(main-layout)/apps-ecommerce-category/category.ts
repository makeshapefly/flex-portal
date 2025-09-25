import { writable } from 'svelte/store';

export interface Category {
  categoryId?: number | string;
  category: string;
  products: number;
  price?: string;
  revenue?: string;
  image: string;
  status: string;
  description?: string;
}

// categoryData is now a writable store
export const categoryStore = writable<Category[]>([
  {
    category: 'Fashion',
    products: 154,
    price: '$29.49',
    revenue: '$4,265',
    image: '/assets/images/products/img-01.png',
    status: 'Active',
    description: 'Trendy apparel for all seasons.'
  },
  {
    category: 'Electronics',
    products: 187,
    price: '$30.49',
    revenue: '$4,005',
    image: '/assets/images/products/img-24.png',
    status: 'Active',
    description: 'Latest gadgets and tech devices.'
  },
  {
    category: 'Footwear',
    price: '$35.78',
    revenue: '$0',
    products: 487,
    image: '/assets/images/products/img-03.png',
    status: 'Inactive',
    description: 'Comfortable and stylish shoes.'
  },
  {
    category: 'Furniture',
    price: '$29.49',
    revenue: '$4,265',
    products: 177,
    image: '/assets/images/products/img-23.png',
    status: 'Inactive',
    description: 'Modern and classic furniture pieces.'
  },
  {
    category: 'Groceries',
    price: '$22.00',
    revenue: '$7,465',
    products: 183,
    image: '/assets/images/products/img-20.png',
    status: 'Active',
    description: 'Everyday essentials for your pantry.'
  },
  {
    category: 'Books',
    price: '$29.99',
    revenue: '$9,613',
    products: 326,
    image: '/assets/images/products/img-21.png',
    status: 'Active',
    description: 'Wide range of books across genres.'
  },
  {
    category: 'Food and beverage',
    price: '$36.87',
    revenue: '$11,074',
    products: 147,
    image: '/assets/images/products/img-22.png',
    status: 'Inactive',
    description: 'Delicious snacks and drinks.'
  },
  {
    category: 'Jewellery',
    price: '$79.99',
    revenue: '$19,803',
    products: 98,
    image: '/assets/images/products/img-19.png',
    status: 'Active',
    description: 'Elegant and stylish jewellery pieces.'
  },
  {
    category: 'Sports',
    price: '$44.49',
    revenue: '$9,961',
    products: 246,
    image: '/assets/images/products/img-28.png',
    status: 'Active',
    description: 'Sports equipment and accessories.'
  },
  {
    category: 'Accessories',
    price: '$24.99',
    revenue: '$6,087',
    products: 213,
    image: '/assets/images/products/img-17.png',
    status: 'Inactive',
    description: 'Fashionable accessories for all outfits.'
  },
  {
    category: 'Cosmetics',
    price: '$32.00',
    revenue: '$14,872',
    products: 198,
    image: '/assets/images/products/img-16.png',
    status: 'Active',
    description: 'High-quality beauty products.'
  },
  {
    category: 'Toys and games',
    price: '$24.87',
    revenue: '$5,108',
    products: 54,
    image: '/assets/images/products/img-15.png',
    status: 'Inactive',
    description: 'Fun toys and engaging games.'
  },
  {
    category: 'Stationery',
    price: '$39.49',
    revenue: '$9,780',
    products: 119,
    image: '/assets/images/products/img-14.png',
    status: 'Active',
    description: 'Office and school supplies.'
  }
]);
