/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: account statements init Js File
*/

import noUiSlider from 'nouislider';
import accountStatement from '../../json/account-statement';

// soft limit
var softSlider = document.getElementById('soft-limit');

noUiSlider.create(softSlider, {
  start: 50,
  range: {
    min: 0,
    max: 100
  },
  pips: {
    mode: 'values',
    values: [20, 80],
    density: 4
  }
});

softSlider.noUiSlider.on('change', function (values, handle) {
  if (values[handle] < 20) {
    softSlider.noUiSlider.set(20);
  } else if (values[handle] > 80) {
    softSlider.noUiSlider.set(80);
  }
});

//statements table
function statementsTable() {
  return {
    products: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    currentPage: 1,
    itemsPerPage: 10,
    get totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    get displayedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.products.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.products.length);
    },
    init() {
      this.products = accountStatement;
    },
    sort(column) {
      if (column === this.sortBy)
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.products.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        let comparison = 0;
        if (valueA > valueB) comparison = 1;
        else if (valueA < valueB) comparison = -1;
        return this.sortDirection === 'desc' ? comparison * -1 : comparison;
      });
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    gotoPage(page) {
      this.currentPage = page;
    }
  };
}

document.addEventListener('alpine:init', () => {
  Alpine.data('statementsTable', statementsTable);
});
