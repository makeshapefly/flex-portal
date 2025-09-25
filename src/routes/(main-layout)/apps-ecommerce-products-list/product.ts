export interface Product {
  productId: string | number;
  productName: string;
  category: string;
  price: string;
  revenue: string;
  qty: number;
  image: string;
  status: string;
}

export const products: Product[] = [
  {
    productId: '1',
    productName: 'Blouse Ruffle Tube top',
    category: 'Fashion',
    price: '$14.99',
    revenue: '$15,236',
    qty: 154,
    image: '/assets/images/products/img-01.png',
    status: 'Published'
  },
  {
    productId: '2',
    productName: 'Gold-colored locket watch',
    category: 'Watch',
    price: '$59.99',
    revenue: '$18,956',
    qty: 187,
    image: '/assets/images/products/img-02.png',
    status: 'Published'
  },
  {
    productId: '3',
    productName: 'Spar Men Black Running Shoes',
    category: 'Footwear',
    price: '$35.78',
    revenue: '$0',
    qty: 487,
    image: '/assets/images/products/img-03.png',
    status: 'Inactive'
  },
  {
    productId: '4',
    productName: 'Crop top Sweater Clothing',
    category: 'Fashion',
    price: '$29.49',
    revenue: '$4,265',
    qty: 177,
    image: '/assets/images/products/img-04.png',
    status: 'Inactive'
  },
  {
    productId: '5',
    productName: 'Sleeve Clothing Leggings',
    category: 'Fashion',
    price: '$22.00',
    revenue: '$7,465',
    qty: 183,
    image: '/assets/images/products/img-05.png',
    status: 'Published'
  },
  {
    productId: '6',
    productName: 'Bra Lace Crop top',
    category: 'Fashion',
    price: '$29.99',
    revenue: '$9,613',
    qty: 326,
    image: '/assets/images/products/img-06.png',
    status: 'Published'
  },
  {
    productId: '7',
    productName: 'Yellow women shoes',
    category: 'Footwear',
    price: '$36.87',
    revenue: '$11,074',
    qty: 147,
    image: '/assets/images/products/img-07.png',
    status: 'Inactive'
  },
  {
    productId: '8',
    productName: 'Tote bag Leather Handbag Dolce',
    category: 'Bags',
    price: '$79.99',
    revenue: '$19,803',
    qty: 98,
    image: '/assets/images/products/img-08.png',
    status: 'Published'
  },
  {
    productId: '9',
    productName: 'Hoodie Jacket Letterman Sleeve Coat',
    category: 'Fashion',
    price: '$44.49',
    revenue: '$9,961',
    qty: 246,
    image: '/assets/images/products/img-09.png',
    status: 'Published'
  },
  {
    productId: '10',
    productName: 'Straw hat Cap Cowboy hat Sun hat',
    category: 'Accessories',
    price: '$24.99',
    revenue: '$6,087',
    qty: 213,
    image: '/assets/images/products/img-10.png',
    status: 'Inactive'
  },
  {
    productId: '11',
    productName: 'Sneakers Shoe Nike Basketball',
    category: 'Footwear',
    price: '$32.00',
    revenue: '$14,872',
    qty: 198,
    image: '/assets/images/products/img-11.png',
    status: 'Published'
  },
  {
    productId: '12',
    productName: 'Bermuda shorts Denim Jeans Waist',
    category: 'Fashion',
    price: '$24.87',
    revenue: '$5,108',
    qty: 54,
    image: '/assets/images/products/img-12.png',
    status: 'Inactive'
  },
  {
    productId: '13',
    productName: 'Jean jacket Denim Levi Strauss & Co. Jeans',
    category: 'Fashion',
    price: '$39.49',
    revenue: '$9,780',
    qty: 119,
    image: '/assets/images/products/img-13.png',
    status: 'Published'
  }
];
