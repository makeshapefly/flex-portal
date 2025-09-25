/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: form file input init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';

//invoice status select
VirtualSelect.init({
  ele: '#invoiceStatus',
  options: [
    { label: 'Paid', value: 'Paid' },
    { label: 'Unpaid', value: 'Unpaid' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Overdue', value: 'Overdue' }
  ]
});

function productTable() {
  return {
    products: [
      {
        name: '',
        category: '',
        quantity: 1,
        unitPrice: '',
        discountPercentage: '',
        totalAmount: '',
        discountError: '',
        nameError: '',
        categoryError: '',
        unitPriceError: ''
      }
    ],
    subtotal: '0.00',
    vatAmount: '0.00',
    additionalDiscount: '0', // Percentage
    grandTotal: '0.00',
    shippingCharge: '0.00',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    invoiceDate: '',
    dueDate: '',
    status: '',
    companyNameError: '',
    emailError: '',
    phoneError: '',
    invoiceDateError: '',
    dueDateError: '',
    statusError: '',
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderNameError: '',
    cardNumberError: '',
    expiryDateError: '',
    cvvError: '',
    validateCardHolderName() {
      this.cardHolderNameError =
        this.cardHolderName.trim() === '' ? 'Card holder name is required' : '';
    },
    formatCardNumber() {
      const { formattedCardNumber, cardNumberError } = this.formatCardNumberUtil(this.cardNumber);
      this.cardNumber = formattedCardNumber;
      this.cardNumberError = cardNumberError;
    },
    formatCardNumberUtil(cardNumber) {
      const formattedCardNumber =
        cardNumber
          .replace(/\D/g, '')
          .match(/.{1,4}/g)
          ?.join(' ') ?? '';
      const cardNumberError = !/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formattedCardNumber)
        ? 'Card number must be in the format 0000 0000 0000 0000'
        : '';
      return { formattedCardNumber, cardNumberError };
    },
    formatExpiryDate() {
      this.expiryDate = this.expiryDate
        .replace(/\s+/g, '')
        .replace(/[^0-9/]/gi, '')
        .replace(/^(\d{2})(\d{0,4})$/, '$1/$2');
      const expiryPattern = /^(0[1-9]|1[0-2])\/\d{4}$/;
      this.expiryDateError = !expiryPattern.test(this.expiryDate)
        ? 'Expiry date must be in the format MM/YYYY'
        : '';
    },
    validateCVV() {
      this.cvv = this.cvv.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const cvvPattern = /^\d{3,4}$/;
      this.cvvError = !cvvPattern.test(this.cvv) ? 'CVV must be a 3 or 4 digit number' : '';
    },
    validateCompanyName() {
      this.companyNameError = this.companyName.trim() === '' ? 'Company name is required' : '';
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailPattern.test(this.companyEmail) ? 'Invalid email format' : '';
    },
    validatePhone() {
      const phonePattern = /^[0-9]*$/;
      this.phoneError = !phonePattern.test(this.companyPhone) ? 'Phone number must be numeric' : '';
    },
    validateInvoiceDate() {
      this.invoiceDateError = this.invoiceDate === '' ? 'Invoice date is required' : '';
    },
    validateDueDate() {
      this.dueDateError = this.dueDate === '' ? 'Due date is required' : '';
    },
    validateStatus() {
      const status = document.querySelector('#invoiceStatus').value;
      this.statusError = status === '' ? 'Status is required' : '';
    },
    validateProductName(index) {
      this.products[index].nameError =
        this.products[index].name.trim() === '' ? 'Product name is required' : '';
    },
    validateCategory(index) {
      this.products[index].categoryError =
        this.products[index].category.trim() === '' ? 'Category is required' : '';
    },
    validateUnitPrice(index) {
      const unitPricePattern = /^\d+(\.\d{1,2})?$/;
      this.products[index].unitPriceError = !unitPricePattern.test(this.products[index].unitPrice)
        ? 'Invalid price format'
        : '';
    },
    validateDiscountPercentage(index) {
      const discountPattern = /^(100|[1-9]?[0-9])$/;
      this.products[index].discountError = !discountPattern.test(
        this.products[index].discountPercentage
      )
        ? 'Discount must be between 0 and 100%'
        : '';
    },
    validateProducts() {
      let valid = true;
      this.products.forEach((product, index) => {
        this.validateProductName(index);
        this.validateCategory(index);
        this.validateUnitPrice(index);
        this.validateDiscountPercentage(index);
        if (
          product.nameError ||
          product.categoryError ||
          product.unitPriceError ||
          product.discountError
        ) {
          valid = false;
        }
      });
      return valid;
    },
    createInvoice() {
      this.validateCompanyName();
      this.validateEmail();
      this.validatePhone();
      this.validateInvoiceDate();
      this.validateDueDate();
      this.validateStatus();
      this.validateCardHolderName();
      this.formatCardNumber();
      this.formatExpiryDate();
      this.validateCVV();
      this.validateProducts();
      if (
        this.companyNameError ||
        this.emailError ||
        this.phoneError ||
        this.invoiceDateError ||
        this.dueDateError ||
        this.statusError ||
        !this.validateProducts()
      ) {
        return;
      }
      // Submit form or perform other actions
    },
    resetForm() {
      // Reset all properties to their initial values
      this.products = [
        {
          name: '',
          category: '',
          quantity: 1,
          unitPrice: '',
          discountPercentage: '',
          totalAmount: '',
          discountError: '',
          nameError: '',
          categoryError: '',
          unitPriceError: ''
        }
      ];
      this.subtotal = '0.00';
      this.vatAmount = '0.00';
      this.additionalDiscount = '0';
      this.shippingCharge = '0.00';
      this.grandTotal = '0.00';
      this.companyName = '';
      this.companyEmail = '';
      this.companyPhone = '';
      this.invoiceDate = '';
      this.dueDate = '';
      this.status = '';
      this.companyNameError = '';
      this.emailError = '';
      this.phoneError = '';
      this.invoiceDateError = '';
      this.dueDateError = '';
      this.statusError = '';
      this.cardHolderName = '';
      this.cardNumber = '';
      this.expiryDate = '';
      this.cvv = '';
      this.cardHolderNameError = '';
      this.cardNumberError = '';
      this.expiryDateError = '';
      this.cvvError = '';
      this.imageUrl = '';
      location.reload();
    },
    // preview image
    imageUrl: '',
    fileChosen(event) {
      this.fileToDataUrl(event, (src) => (this.imageUrl = src));
    },
    fileToDataUrl(event, callback) {
      if (!event.target.files.length) return;

      let file = event.target.files[0],
        reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (e) => callback(e.target.result);
    },
    addItem() {
      this.products.unshift({
        name: '',
        category: '',
        quantity: 1,
        unitPrice: '',
        discountPercentage: '',
        totalAmount: '',
        discountError: '',
        nameError: '',
        categoryError: '',
        unitPriceError: ''
      });
      this.calculateGrandTotal();
    },
    deleteItem(index) {
      this.products.splice(index, 1);
      this.calculateGrandTotal();
    },
    calculateTotal(product) {
      const unitPrice = parseFloat(product.unitPrice) || 0;
      const quantity = parseInt(product.quantity) || 0;
      let discountPercentage = parseFloat(product.discountPercentage) || 0;
      // Validate discount percentage
      if (discountPercentage < 0 || discountPercentage > 100) {
        product.discountError = 'Discount must be between 0% and 100%';
        product.totalAmount = '';
        this.calculateGrandTotal();
        return;
      } else {
        product.discountError = '';
      }
      // Calculate the discount amount from the percentage
      const discountAmount = unitPrice * quantity * (discountPercentage / 100);
      // Calculate the total amount
      const totalAmount = unitPrice * quantity - discountAmount;
      product.totalAmount = totalAmount.toFixed(2);
      // Update the grand total
      this.calculateGrandTotal();
    },
    validateAdditionalDiscount() {
      const discount = parseFloat(this.additionalDiscount);
      if (isNaN(discount) || discount < 0 || discount > 100) {
        this.discountError = 'Discount must be between 0% and 100%';
      } else {
        this.discountError = '';
        this.calculateGrandTotal();
      }
    },
    calculateGrandTotal() {
      let subtotal = 0;
      this.products.forEach((product) => {
        subtotal += parseFloat(product.totalAmount) || 0;
      });
      this.subtotal = subtotal.toFixed(2);
      const vatAmount = subtotal * 0.06;
      this.vatAmount = vatAmount.toFixed(2);
      const additionalDiscountAmount = (subtotal * parseFloat(this.additionalDiscount)) / 100;
      const shippingCharge = parseFloat(this.shippingCharge) || 0;
      const grandTotal = subtotal + vatAmount - additionalDiscountAmount + shippingCharge;
      this.grandTotal = grandTotal.toFixed(2);
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('productTable', productTable);
});
