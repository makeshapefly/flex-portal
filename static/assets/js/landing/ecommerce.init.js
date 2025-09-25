/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: ecommerce init Js File
*/

import '../../../../node_modules/slick-image-compare/dist/slick-image-compare.umd';
import productsData from '../../json/landing/products';

//Before After Images
const sic = new SlickImageCompare('#beforeAfterImages');

function products() {
  return {
    product: [],
    filteredProduct: [],
    activeTab: '',
    init() {
      this.product = productsData.products;
      this.filterProducts();
    },
    filterProducts() {
      this.filteredProduct = this.product;
      if (this.activeTab !== '') {
        if (this.activeTab === 'brand') {
          this.filteredProduct = this.product.slice().sort((a, b) => {
            if (a.brand < b.brand) return -1; // Sort in ascending order
            if (a.brand > b.brand) return 1;
            return 0;
          });
        }
        this.filteredProduct = this.product.filter(
          (product) => product.category === this.activeTab
        );
      }
    }
  };
}

document.addEventListener('alpine:init', function () {
  Alpine.data('products', products);
});
