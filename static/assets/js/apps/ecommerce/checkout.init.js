import { addresses, products } from '../../../json/apps/ecommerce/checkout.init';

/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: Checkout init file
*/
function addressSelection() {
  return {
    addresses: [],
    init() {
      this.addresses = addresses;
    },
    get addressescount() {
      return this.addresses;
    },
    showAddAddressForm: false,
    showEditAddressForm: false,
    errors: {},
    addressForm: {
      type: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      zip: ''
    },
    handleModal(modal) {
      if (modal == 'showAddAddressForm') {
        this.showAddAddressForm = true;
        this.showEditAddressForm = false;
        this.selected = null;
        this.resetForm();
      } else {
        this.showEditAddressForm = true;
        this.showAddAddressForm = false;
      }
    },
    editAddress(item) {
      this.handleModal('showEditAddressForm');
      this.addressForm = item;
    },
    updateAddress() {
      const index = this.addresses.findIndex(
        (product) => product.firstName === this.addressForm.firstName
      );
      this.selectAddress(this.addresses[index]);
      this.addresses[index] = { ...this.addressForm };
    },
    addAddress() {
      this.addresses.unshift({ ...this.addressForm });
      this.selectAddress(this.addresses[0]);
      this.showAddAddressForm = false;
    },
    resetForm() {
      this.errors = {};
      this.addressForm = {
        type: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        zip: ''
      };
    },
    deleteAddress(address) {
      this.addresses.splice(this.addresses.indexOf(address), 1);
      this.showEditAddressForm = false;
    },
    validateForm() {
      this.errors = {};
      this.validateField('firstName', this.addressForm.firstName, 'First name is required.');
      this.validateField('lastName', this.addressForm.lastName, 'Last name is required.');
      this.validatePhone();
      this.validateField('address', this.addressForm.address, 'Address is required.');
      this.validateField('city', this.addressForm.city, 'City is required.');
      this.validateField('country', this.addressForm.country, 'Country date is required.');
      this.validateField('zip', this.addressForm.zip, 'Zip code is required.');
      this.validateField('type', this.addressForm.type, 'Type is required.');

      return Object.keys(this.errors).length === 0;
    },
    validatePhone() {
      const phonePattern = /^[0-9]+$/;
      if (!this.addressForm.phone) {
        this.errors.phone = 'Phone number is required.';
      } else if (!phonePattern.test(this.addressForm.phone)) {
        this.errors.phone = 'Phone number must be numeric.';
      } else {
        delete this.errors.phone;
      }
    },
    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue) this.errors[fieldName] = errorMessage;
      else delete this.errors[fieldName];
    },
    submitForm() {
      if (this.validateForm()) {
        if (this.showAddAddressForm) this.addAddress();
        else this.updateAddress();
        document.body.classList.toggle('overflow-hidden', false);
        this.resetForm();
        this.showEditAddressForm = false;
        this.showAddAddressForm = false;
        setTimeout(() => {
          lucide.createIcons();
        }, 0);
      }
    },
    selected: null,
    selectAddress(address) {
      this.selected = address;
    }
  };
}

function orderSummary() {
  return {
    products: [],
    shippingCharge: 35.0,
    discountCode: '',
    vatRate: 0.06,
    discountRate: 0.1,
    init() {
      this.products = products;
    },
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

document.addEventListener('alpine:init', () => {
  Alpine.data('addressSelection', addressSelection);
  Alpine.data('orderSummary', orderSummary);
});
