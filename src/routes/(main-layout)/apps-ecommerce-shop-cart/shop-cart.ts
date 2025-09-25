import { writable } from 'svelte/store';

export const shopCartData = writable([
  {
    id: 1,
    image: '/assets/images/products/img-04.png',
    category: 'Fashion',
    name: 'Crop top Sweater Clothing',
    price: 29.49,
    discount: 0.25,
    colors: ['pink', 'gray', 'blue', 'green', 'red'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    count: 1,
    inStock: true
  },
  {
    id: 2,
    image: '/assets/images/products/img-03.png',
    category: 'Footwear',
    name: 'Spar Men Black Running Shoes',
    price: 35.78,
    discount: 0,
    colors: ['gray', 'pink'],
    sizes: ['6', '7', '8', '9', '10'],
    count: 1,
    inStock: false
  },
  {
    id: 3,
    image: '/assets/images/products/img-09.png',
    category: 'Fashion',
    name: 'Hoodie Jacket Letterman Sleeve Coat',
    price: 44.49,
    discount: 0,
    colors: ['blue'],
    sizes: ['M', 'L', 'XL'],
    count: 1,
    inStock: true
  }
]);
