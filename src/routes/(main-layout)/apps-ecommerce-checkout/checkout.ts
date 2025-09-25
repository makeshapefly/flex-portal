export const products = [
  {
    id: 1,
    image: '/assets/images/products/img-04.png',
    name: 'Crop top Sweater Clothing',
    qty: 1,
    color: 'Pink',
    size: 'M',
    price: 22.12,
    discount: 0
  },
  {
    id: 2,
    image: '/assets/images/products/img-03.png',
    name: 'Spar Men Black Running Shoes',
    qty: 2,
    color: 'Black',
    size: '8',
    price: 71.56,
    discount: 0
  },
  {
    id: 3,
    image: '/assets/images/products/img-09.png',
    name: 'Hoodie Jacket Letterman Sleeve Coat',
    qty: 1,
    color: 'Blue',
    size: 'L',
    price: 44.49,
    discount: 0
  }
];

export function orderSummary() {
  return {
    products: [...products],
    shippingCharge: 35.0,
    discountCode: '',
    vatRate: 0.06,
    discountRate: 0.1,
    get subtotal() {
      return this.products.reduce(
        (sum, item) => sum + item.price * item.qty * (1 - item.discount),
        0
      );
    },
    get vat() {
      return this.subtotal * this.vatRate;
    },
    get discount() {
      return this.discountCode ? this.subtotal * this.discountRate : 0;
    },
    get total() {
      return this.subtotal + this.vat + this.shippingCharge - this.discount;
    }
  };
}

export const addresses = [
  {
    addressId: 1,
    type: 'Home',
    firstName: 'Jordan',
    lastName: 'Roughley',
    phone: '2015184185',
    address: '13833 Jayda Squares Apt. 849, Sharonville',
    city: 'Washington',
    country: 'USA',
    zip: '33199 8539'
  },
  {
    addressId: 2,
    type: 'Work',
    firstName: 'Prof. Ronaldo ',
    lastName: 'Funk',
    phone: '6179419815',
    address: '6602 Schroeder Ville Apt. 066',
    city: 'Bennytown',
    country: 'USA',
    zip: '62144 1437'
  }
];
