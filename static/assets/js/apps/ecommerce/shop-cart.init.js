/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: shop cart init Js File
*/

import Alpine from 'alpinejs';
import shopCartData from '../../../json/apps/ecommerce/shop-cart';

//timer counting
function countdownTimer(duration) {
  return {
    time: duration,
    minutes: Math.floor(duration / 60),
    seconds: duration % 60,
    startTimer() {
      const interval = setInterval(() => {
        if (this.time > 0) {
          this.time--;
          this.minutes = Math.floor(this.time / 60);
          this.seconds = this.time % 60;
        } else {
          clearInterval(interval);
          history.back();
        }
      }, 1000);
    }
  };
}

function counter() {
  return {
    products: [],
    shippingCharge: 35.0,
    discountCode: '',
    vatRate: 0.06,
    discountRate: 0.1,
    init() {
      this.products = shopCartData;
    },
    get subtotal() {
      return this.products.reduce(
        (sum, item) => sum + item.price * item.count * (1 - item.discount),
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

document.addEventListener('alpine:init', () => {
  Alpine.data('counter', counter);
  Alpine.data('countdownTimer', countdownTimer);
});
