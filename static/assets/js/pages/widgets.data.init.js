/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: widgets data init Js File
*/

import commanProducts from '../../json/apps/ecommerce/products';
import invoiceData from '../../json/apps/invoice/invoice';

//invoice table
function invoiceTable() {
  return {
    products: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    init() {
      this.products = invoiceData;
    },
    sort(column) {
      if (column === this.sortBy)
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }

      this.products.sort((a, b) => {
        if (this.sortDirection === 'asc') return a[column] > b[column] ? 1 : -1;
        else return a[column] < b[column] ? 1 : -1;
      });
    }
  };
}
function productsTable() {
  return {
    products: [],
    init() {
      this.products = commanProducts;
    }
  };
}

document.addEventListener('alpine:init', function () {
  Alpine.data('invoiceTable', invoiceTable);
  Alpine.data('productsTable', productsTable);
});
