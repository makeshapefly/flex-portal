export interface Product {
  productId?: string;
  ordersDate: string;
  deliveredDate: string;
  customersName: string;
  productName: string;
  payment: 'Paid' | 'Unpaid' | 'Pending' | 'COD'; // Assuming only these statuses exist
  price: number;
  total: number;
  qty: number;
  status: 'Delivered' | 'Pending' | 'Cancelled' | 'New' | 'Shipping'; // Adjust as needed
  image: string;
}

export const products: Product[] = [
  {
    ordersDate: '15 Mar, 2022',
    deliveredDate: '21 Mar, 2022',
    customersName: 'Ella Patel',
    productName: 'Denim Jacket',
    payment: 'Paid',
    price: 45.99,
    total: 45.99,
    qty: 1,
    status: 'Delivered',
    image: '/assets/images/products/img-01.png'
  },
  {
    ordersDate: '02 Apr, 2022',
    deliveredDate: '09 Apr, 2022',
    customersName: 'Lucas Nguyen',
    productName: 'Leather Wallet',
    payment: 'COD',
    price: 35.5,
    total: 35.5,
    qty: 1,
    status: 'Pending',
    image: '/assets/images/products/img-02.png'
  },
  {
    ordersDate: '18 Jun, 2022',
    deliveredDate: '26 Jun, 2022',
    customersName: 'Isabella Thomas',
    productName: 'Summer Dress',
    payment: 'Unpaid',
    price: 28.75,
    total: 28.75,
    qty: 2,
    status: 'New',
    image: '/assets/images/products/img-03.png'
  },
  {
    ordersDate: '30 Jul, 2022',
    deliveredDate: '07 Aug, 2022',
    customersName: 'Mason Wilson',
    productName: 'Wireless Headphones',
    payment: 'Paid',
    price: 79.99,
    total: 79.99,
    qty: 1,
    status: 'Delivered',
    image: '/assets/images/products/img-04.png'
  },
  {
    ordersDate: '12 Sep, 2022',
    deliveredDate: '19 Sep, 2022',
    customersName: 'Olivia Brown',
    productName: 'Sunglasses',
    payment: 'COD',
    price: 19.95,
    total: 19.95,
    qty: 1,
    status: 'Shipping',
    image: '/assets/images/products/img-05.png'
  },
  {
    ordersDate: '24 Oct, 2022',
    deliveredDate: '31 Oct, 2022',
    customersName: 'William Garcia',
    productName: 'Sports Watch',
    payment: 'Paid',
    price: 55.0,
    total: 55.0,
    qty: 1,
    status: 'Delivered',
    image: '/assets/images/products/img-06.png'
  },
  {
    ordersDate: '05 Nov, 2022',
    deliveredDate: '12 Nov, 2022',
    customersName: 'Ava Martinez',
    productName: 'Backpack',
    payment: 'COD',
    price: 42.75,
    total: 42.75,
    qty: 1,
    status: 'Shipping',
    image: '/assets/images/products/img-07.png'
  },
  {
    ordersDate: '14 Dec, 2022',
    deliveredDate: '22 Dec, 2022',
    customersName: 'Liam Clark',
    productName: 'Winter Coat',
    payment: 'Unpaid',
    price: 89.99,
    total: 89.99,
    qty: 1,
    status: 'New',
    image: '/assets/images/products/img-08.png'
  },
  {
    ordersDate: '01 Jan, 2023',
    deliveredDate: '09 Jan, 2023',
    customersName: 'Charlotte Lewis',
    productName: 'Scarf',
    payment: 'Paid',
    price: 12.5,
    total: 12.5,
    qty: 2,
    status: 'Pending',
    image: '/assets/images/products/img-09.png'
  },
  {
    ordersDate: '10 Feb, 2023',
    deliveredDate: '18 Feb, 2023',
    customersName: 'James Taylor',
    productName: 'Smartphone Case',
    payment: 'COD',
    price: 15.99,
    total: 15.99,
    qty: 1,
    status: 'Shipping',
    image: '/assets/images/products/img-10.png'
  },
  {
    ordersDate: '20 Mar, 2023',
    deliveredDate: '27 Mar, 2023',
    customersName: 'Emma Hernandez',
    productName: 'Fitness Tracker',
    payment: 'Paid',
    price: 69.0,
    total: 69.0,
    qty: 1,
    status: 'Delivered',
    image: '/assets/images/products/img-11.png'
  },
  {
    ordersDate: '05 Apr, 2023',
    deliveredDate: '12 Apr, 2023',
    customersName: 'Noah Young',
    productName: 'Sneakers',
    payment: 'COD',
    price: 49.95,
    total: 49.95,
    qty: 1,
    status: 'Shipping',
    image: '/assets/images/products/img-12.png'
  },
  {
    ordersDate: '15 May, 2023',
    deliveredDate: '22 May, 2023',
    customersName: 'Sophia Martinez',
    productName: 'Handbag',
    payment: 'Unpaid',
    price: 39.99,
    total: 39.99,
    qty: 1,
    status: 'New',
    image: '/assets/images/products/img-13.png'
  },
  {
    ordersDate: '25 Jun, 2023',
    deliveredDate: '02 Jul, 2023',
    customersName: 'Alexander Perez',
    productName: 'Tie',
    payment: 'Paid',
    price: 9.5,
    total: 9.5,
    qty: 1,
    status: 'Delivered',
    image: '/assets/images/products/img-14.png'
  },
  {
    ordersDate: '04 Aug, 2023',
    deliveredDate: '11 Aug, 2023',
    customersName: 'Avery Scott',
    productName: 'Earrings',
    payment: 'COD',
    price: 29.75,
    total: 29.75,
    qty: 1,
    status: 'Shipping',
    image: '/assets/images/products/img-15.png'
  },
  {
    ordersDate: '16 Sep, 2023',
    deliveredDate: '23 Sep, 2023',
    customersName: 'Harper Green',
    productName: 'Sweater',
    payment: 'Paid',
    price: 35.99,
    total: 35.99,
    qty: 1,
    status: 'Delivered',
    image: '/assets/images/products/img-16.png'
  },
  {
    ordersDate: '27 Oct, 2023',
    deliveredDate: '03 Nov, 2023',
    customersName: 'Benjamin Adams',
    productName: 'Cufflinks',
    payment: 'COD',
    price: 19.5,
    total: 19.5,
    qty: 1,
    status: 'Shipping',
    image: '/assets/images/products/img-17.png'
  },
  {
    ordersDate: '07 Dec, 2023',
    deliveredDate: '15 Dec, 2023',
    customersName: 'Evelyn Baker',
    productName: 'Winter Boots',
    payment: 'Unpaid',
    price: 79.95,
    total: 79.95,
    qty: 1,
    status: 'New',
    image: '/assets/images/products/img-18.png'
  },
  {
    ordersDate: '20 Jan, 2024',
    deliveredDate: '27 Jan, 2024',
    customersName: 'Logan Hall',
    productName: 'Beanie',
    payment: 'Paid',
    price: 8.99,
    total: 8.99,
    qty: 1,
    status: 'Delivered',
    image: '/assets/images/products/img-19.png'
  },
  {
    ordersDate: '03 Mar, 2024',
    deliveredDate: '10 Mar, 2024',
    customersName: 'Mia Morris',
    productName: 'Necklace',
    payment: 'COD',
    price: 39.5,
    total: 39.5,
    qty: 1,
    status: 'Shipping',
    image: '/assets/images/products/img-20.png'
  },
  {
    ordersDate: '15 Apr, 2024',
    deliveredDate: '22 Apr, 2024',
    customersName: 'Ethan Walker',
    productName: 'Baseball Cap',
    payment: 'Paid',
    price: 14.99,
    total: 14.99,
    qty: 1,
    status: 'Delivered',
    image: '/assets/images/products/img-21.png'
  },
  {
    ordersDate: '25 May, 2024',
    deliveredDate: '01 Jun, 2024',
    customersName: 'Amelia King',
    productName: 'Belt',
    payment: 'COD',
    price: 22.5,
    total: 22.5,
    qty: 1,
    status: 'Shipping',
    image: '/assets/images/products/img-22.png'
  },
  {
    ordersDate: '05 Jul, 2024',
    deliveredDate: '12 Jul, 2024',
    customersName: 'Jack Harris',
    productName: 'Wallet',
    payment: 'Paid',
    price: 24.75,
    total: 24.75,
    qty: 1,
    status: 'Delivered',
    image: '/assets/images/products/img-23.png'
  },
  {
    ordersDate: '15 Aug, 2024',
    deliveredDate: '22 Aug, 2024',
    customersName: 'Avery Rodriguez',
    productName: 'Watch',
    payment: 'COD',
    price: 59.95,
    total: 59.95,
    qty: 1,
    status: 'Shipping',
    image: '/assets/images/products/img-24.png'
  },
  {
    ordersDate: '25 Sep, 2024',
    deliveredDate: '02 Oct, 2024',
    customersName: 'Sofia Wilson',
    productName: 'Handkerchief',
    payment: 'Unpaid',
    price: 7.99,
    total: 7.99,
    qty: 1,
    status: 'New',
    image: '/assets/images/products/img-25.png'
  },
  {
    ordersDate: '10 Oct, 2024',
    deliveredDate: '17 Oct, 2024',
    customersName: 'Henry Thompson',
    productName: 'Jacket',
    payment: 'Paid',
    price: 79.99,
    total: 79.99,
    qty: 1,
    status: 'Delivered',
    image: '/assets/images/products/img-01.png'
  },
  {
    ordersDate: '20 Nov, 2024',
    deliveredDate: '27 Nov, 2024',
    customersName: 'Scarlett Lee',
    productName: 'Shoes',
    payment: 'COD',
    price: 49.95,
    total: 49.95,
    qty: 1,
    status: 'Shipping',
    image: '/assets/images/products/img-02.png'
  },
  {
    ordersDate: '30 Dec, 2024',
    deliveredDate: '06 Jan, 2025',
    customersName: 'David White',
    productName: 'Gloves',
    payment: 'Paid',
    price: 29.99,
    total: 29.99,
    qty: 1,
    status: 'Delivered',
    image: '/assets/images/products/img-03.png'
  },
  {
    ordersDate: '10 Feb, 2025',
    deliveredDate: '17 Feb, 2025',
    customersName: 'Grace Harris',
    productName: 'Socks',
    payment: 'COD',
    price: 12.5,
    total: 12.5,
    qty: 1,
    status: 'Shipping',
    image: '/assets/images/products/img-04.png'
  },
  {
    ordersDate: '20 Mar, 2025',
    deliveredDate: '27 Mar, 2025',
    customersName: 'Daniel Martin',
    productName: 'Hat',
    payment: 'Paid',
    price: 19.99,
    total: 19.99,
    qty: 1,
    status: 'Delivered',
    image: '/assets/images/products/img-05.png'
  }
];
