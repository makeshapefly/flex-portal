/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: orders track init Js File
*/

//card form
function paymentForm() {
  return {
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    errors: {},
    resetForm() {
      this.cardName = '';
      this.cardNumber = '';
      this.expiryDate = '';
      this.cvv = '';
      this.errors = {};
    },
    validateForm() {
      this.errors = {};

      this.validateInput('cardName');
      this.validateInput('cardNumber');
      this.validateInput('expiryDate');
      this.validateInput('cvv');

      if (Object.keys(this.errors).length === 0) {
        this.resetForm();
        // Here you can add the actual form submission logic
      }
    },

    validateInput(field) {
      if (field === 'cardName') {
        if (!this.cardName) {
          this.errors.cardName = 'Card Holder Name is required.';
        } else {
          delete this.errors.cardName;
        }
      }

      if (field === 'cardNumber') {
        const cardNumberPattern = /^\d{4}(?: \d{4}){3}$/;
        if (!this.cardNumber) {
          this.errors.cardNumber = 'Card Number is required.';
        } else if (!cardNumberPattern.test(this.cardNumber)) {
          this.errors.cardNumber = 'Card Number format is invalid.';
        } else {
          delete this.errors.cardNumber;
        }
        this.restrictToNumbers('cardNumber');
      }

      if (field === 'expiryDate') {
        if (!this.expiryDate) {
          this.errors.expiryDate = 'Expiry Date is required.';
        } else if (!/^\d{2}-\d{2}$/.test(this.expiryDate)) {
          this.errors.expiryDate = 'Expiry Date format is invalid (MM-YY).';
        } else {
          const [month, year] = this.expiryDate.split('-').map(Number);
          if (month < 1 || month > 12) {
            this.errors.expiryDate = 'Expiry Date format is invalid (1-12 months only).';
          } else {
            delete this.errors.expiryDate;
          }
        }
        this.restrictToNumbers('expiryDate');
      }

      if (field === 'cvv') {
        const cvvPattern = /^\d{3}$/;
        if (!this.cvv) {
          this.errors.cvv = 'CVV is required.';
        } else if (!cvvPattern.test(this.cvv)) {
          this.errors.cvv = 'CVV format is invalid.';
        } else {
          delete this.errors.cvv;
        }
        this.restrictToNumbers('cvv');
      }
    },

    restrictToNumbers(field) {
      if (field === 'expiryDate') {
        this.expiryDate = this.expiryDate.replace(/\D/g, '');
        if (this.expiryDate.length > 4) {
          this.expiryDate = this.expiryDate.slice(0, 4);
        }
        if (this.expiryDate.length > 2) {
          this.expiryDate = this.expiryDate.slice(0, 2) + '-' + this.expiryDate.slice(2);
        }
      }

      if (field === 'cvv') {
        this.cvv = this.cvv.replace(/\D/g, '');
        if (this.cvv.length > 3) {
          this.cvv = this.cvv.slice(0, 3);
        }
      }

      if (field === 'cardNumber') {
        this.cardNumber = this.cardNumber.replace(/\D/g, '').slice(0, 16);

        // Format the card number as user types
        this.cardNumber = this.cardNumber.match(/.{1,4}/g)?.join(' ') ?? '';
      }
    }
  };
}

//bank transfer
function bankForm() {
  return {
    bankHolderName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    bankName: '',
    errors: {},

    validateForm() {
      this.errors = {};

      this.validateInput('bankHolderName');
      this.validateInput('accountNumber');
      this.validateInput('confirmAccountNumber');
      this.validateInput('ifscCode');
      this.validateInput('bankName');

      if (Object.keys(this.errors).length === 0) {
        // Reset form fields and errors
        this.resetForm();
        // Add your form submission logic here
      }
    },

    validateInput(field) {
      if (field === 'bankHolderName') {
        if (!this.bankHolderName) {
          this.errors.bankHolderName = 'Bank Holder Name is required.';
        } else {
          delete this.errors.bankHolderName;
        }
      }

      if (field === 'accountNumber') {
        if (!this.accountNumber) {
          this.errors.accountNumber = 'Account Number is required.';
        } else if (!/^\d+$/.test(this.accountNumber)) {
          this.errors.accountNumber = 'Account Number must be numeric.';
        } else {
          delete this.errors.accountNumber;
        }
      }

      if (field === 'confirmAccountNumber') {
        if (!this.confirmAccountNumber) {
          this.errors.confirmAccountNumber = 'Confirm Account Number is required.';
        } else if (this.accountNumber !== this.confirmAccountNumber) {
          this.errors.confirmAccountNumber = 'Account Numbers do not match.';
        } else {
          delete this.errors.confirmAccountNumber;
        }
      }

      if (field === 'ifscCode') {
        if (!this.ifscCode) {
          this.errors.ifscCode = 'IFSC Code is required.';
        } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(this.ifscCode)) {
          this.errors.ifscCode = 'IFSC Code format is invalid.';
        } else {
          delete this.errors.ifscCode;
        }
      }

      if (field === 'bankName') {
        if (!this.bankName) {
          this.errors.bankName = 'Bank Name is required.';
        } else {
          delete this.errors.bankName;
        }
      }
    },

    resetForm() {
      this.bankHolderName = '';
      this.accountNumber = '';
      this.confirmAccountNumber = '';
      this.ifscCode = '';
      this.bankName = '';
      this.errors = {};
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('paymentForm', paymentForm);
  Alpine.data('bankForm', bankForm);
});
