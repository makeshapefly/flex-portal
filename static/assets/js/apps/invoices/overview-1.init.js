import invoicesData from '../../../json/apps/hospital/invoice/invoice.data';

/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: invoices list init Js File
*/
function invoiceData() {
  return {
    data: [],
    init() {
      this.data = invoicesData;
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('invoiceData', invoiceData);
});
