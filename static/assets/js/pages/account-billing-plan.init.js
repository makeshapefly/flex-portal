/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: account billing plan init Js File
*/

import '../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import '../../../../node_modules/@alpinejs/mask/dist/cdn';
import accountBilling from '../../json/account-billing';

//Default select
VirtualSelect.init({
  ele: '#sampleSelect',
  options: [
    // Replace the existing options array with the generated one
    // from the list of countries
    { label: 'Afghanistan', value: 'Afghanistan' },
    { label: 'Åland Islands', value: 'Åland Islands' },
    { label: 'Albania', value: 'Albania' },
    { label: 'Algeria', value: 'Algeria' },
    // Add the rest of the countries here...
    { label: 'Zambia', value: 'Zambia' },
    { label: 'Zimbabwe', value: 'Zimbabwe' }
  ]
});

//Billing History table
function billingHistoryTable() {
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
      this.products = accountBilling;
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
  Alpine.data('billingHistoryTable', billingHistoryTable);
});
