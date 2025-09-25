/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: customer list init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import { customers } from '../../../json/apps/ecommerce/customers-list';

//Customers table
function customerTable() {
  return {
    products: [],
    selectedProduct: {
      customersName: '',
      image: '',
      phoneNumber: '',
      location: '',
      email: '',
      status: ''
    },
    filterCustomer: [],
    deleteItem: '',
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    imageUrl: '',
    selectAll: false,
    selectedItems: [],
    currentPage: 1,
    itemsPerPage: 10,
    searchTerm: '',
    errors: {},
    showAddCustomerForm: false,
    showEditCustomerForm: false,
    customerForm: {
      customersID: '',
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      image: '',
      location: '',
      phoneNumber: '',
      status: '',
      subscriber: ''
    },
    validateForm() {
      this.errors = {};
      this.validateField('firstName', this.customerForm.firstName, 'First name is required.');
      this.validateField('lastName', this.customerForm.lastName, 'Last name is required.');
      this.validateEmailField();
      this.validateField('gender', this.customerForm.gender, ' Gender is required.');
      this.validateField('image', this.customerForm.image, 'image is required.');
      this.validateField('location', this.customerForm.location, 'Location is required.');
      this.validatePhone();
      const statusSelect = document.querySelector('#statusSelect');
      const subscribe = document.querySelector('#subscriberSelect');
      if (statusSelect) {
        const statusValue = statusSelect.value; // Use value property directly
        this.validateField('status', statusValue, 'Status is required.');
      } else this.errors.status = 'Status field is not available.';
      if (subscribe) {
        const subscribeValue = subscribe.value; // Use value property directly
        this.validateField('subscriber', subscribeValue, 'Subscriber is required.');
      } else this.errors.subscriber = 'Subscriber field is not available.';
      return Object.keys(this.errors).length === 0;
    },

    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue) this.errors[fieldName] = errorMessage;
      else delete this.errors[fieldName];
    },
    validateEmailField() {
      if (!this.customerForm.email) this.errors.email = 'Email is required.';
      else if (!this.validateEmail(this.customerForm.email))
        this.errors.email = 'Invalid email format.';
      else delete this.errors.email;
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    },
    validatePhone() {
      const phoneWithoutPlus = this.customerForm.phoneNumber.replace('+', ''); // Remove '+' if present
      const phoneLength = phoneWithoutPlus.length;
      if (this.customerForm.phoneNumber === '') this.errors.phone = 'Phone number is required.';
      else if (phoneLength !== 10) this.errors.phone = 'Phone number must be digits';
      else if (!/^\+?\d{10}$/.test(this.customerForm.phoneNumber))
        // Allow 10 digits with optional '+' at the start
        this.errors.phone = 'Invalid phone number format.';
      else delete this.errors.phone;
    },
    handleModal(modal) {
      if (modal === 'showAddCustomerForm') {
        this.showAddCustomerForm = true;
        this.showEditCustomerForm = false;
        this.resetForm();
      } else {
        this.showEditCustomerForm = true;
        this.showAddCustomerForm = false;
        this.resetForm();
      }
    },

    submitForm() {
      if (this.validateForm()) {
        if (this.showAddCustomerForm) {
          this.errors = {};
          this.addCustomer();
        } else this.updateCustomer();
        document.body.classList.toggle('overflow-hidden', false);
        this.resetForm();
        this.errors = {};
        this.showEditCustomerForm = false;
        this.showAddCustomerForm = false;
      }
    },

    addCustomer() {
      this.customerForm.customersID = 'PEC-' + (24151 + this.filterCustomer.length).toString();
      var statusSelect = document.querySelector('#statusSelect').value;
      const subscribe = document.querySelector('#subscriberSelect')?.value;
      this.filterCustomer.unshift({
        ...this.customerForm,
        status: statusSelect,
        subscriber: subscribe,
        customersName: this.customerForm.firstName + ' ' + this.customerForm.lastName
      });
    },
    editCustomer(index) {
      this.handleModal('showEditCustomerForm');
      const customer = this.filterCustomer.find((customer) => customer.customersID == index);
      const [firstName, ...lastNameParts] = customer.customersName.split(' ');
      const lastName = lastNameParts.join(' ');
      this.customerForm = { ...customer, firstName, lastName };

      var statusSelect = document.querySelector('#statusSelect');
      statusSelect?.setValue(this.customerForm.status);
      var subscribe = document.querySelector('#subscriberSelect');
      subscribe?.setValue(this.customerForm.subscriber);
    },
    updateCustomer() {
      const index = this.filterCustomer?.findIndex(
        (product) => product.customersID == this.customerForm?.customersID
      );
      const statusSelect = document.querySelector('#statusSelect')?.value;
      const subscribe = document.querySelector('#subscriberSelect')?.value;
      if (index !== undefined && index !== -1 && statusSelect) {
        this.filterCustomer[index] = {
          ...this.customerForm,
          status: statusSelect,
          subscriber: subscribe,
          customersName: this.customerForm.firstName + ' ' + this.customerForm.lastName
        };
        this.resetForm();
      } else
        console.error(
          'Failed to update customer. Check customerForm, filterCustomer, and #statusSelect element.'
        );
    },
    resetForm() {
      var statusSelect = document.querySelector('#statusSelect');
      this.errors = {};
      this.customerForm = {
        customersID: '',
        image: '',
        phoneNumber: '',
        customerName: '',
        company: '',
        role: '',
        email: '',
        website: '',
        status: statusSelect?.setValue('')
      };
    },
    reviewCustomer(customerId) {
      this.selectedProduct = this.products.find((customer) => customer.customersID === customerId);
      this.initCustomerData();
    },
    customerData: [],
    initCustomerData() {
      this.customerData = [
        { title: 'Name', subTitle: this.selectedProduct.customersName },
        { title: 'Email', subTitle: this.selectedProduct.email },
        { title: 'Phone Number', subTitle: this.selectedProduct.phoneNumber },
        { title: 'Subscriber', subTitle: this.selectedProduct.subscriber ? 'Yes' : 'No' },
        { title: 'Location', subTitle: this.selectedProduct.location }
      ];
    },
    filterCustomers() {
      this.filterCustomer = this.products;
      const searchTerm = this.searchTerm.trim().toLowerCase();
      if (searchTerm) {
        this.filterCustomer = this.filterCustomer.filter((customer) => {
          return Object.values(customer).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
    },
    toggleAll() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.selectedItems = [...this.filterCustomer];
      } else {
        this.selectedItems = [];
      }
    },
    toggleItem(product) {
      if (this.selectedItems.includes(product)) {
        this.selectedItems = this.selectedItems.filter((item) => item !== product);
      } else {
        this.selectedItems.push(product);
      }
      this.selectAll = this.selectedItems.length === this.filterCustomer.length;
    },
    deleteSelectedItems() {
      this.selectedItems.forEach((item) => {
        this.deleteItem = item.customersID;
        this.deleteCustomer();
      });
      this.selectedItems = [];
      this.selectAll = false;
    },
    deleteCustomer() {
      this.filterCustomer.forEach((customer, index) => {
        if (customer.customersID == this.deleteItem) {
          this.filterCustomer.splice(index, 1);
        }
      });
    },
    get totalPages() {
      return Math.ceil(this.filterCustomer.length / this.itemsPerPage);
    },
    get displayedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.filterCustomer.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filterCustomer.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filterCustomer.length);
    },
    init() {
      let startID = 24151; // Starting ID
      customers.forEach((product, index) => {
        product.customersID = 'PEC-' + (startID + index).toString();
      });
      this.products = customers;
      this.filterCustomer = customers;
    },
    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.products.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        let comparison = 0;
        if (valueA > valueB) {
          comparison = 1;
        } else if (valueA < valueB) {
          comparison = -1;
        }
        return this.sortDirection === 'desc' ? comparison * -1 : comparison;
      });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    gotoPage(page) {
      this.currentPage = page;
    },
    exportTable() {
      // Prepare table data for export
      let csvContent = 'data:text/csv;charset=utf-8,';

      // Add table headers
      const headers = Object.keys(this.products[0]).join(',');
      csvContent += headers + '\n';

      // Add table rows
      this.products.forEach((product) => {
        const values = Object.values(product).join(',');
        csvContent += values + '\n';
      });
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'products.csv');
      document.body.appendChild(link);
      link.click();
    },
    fileChosen(event) {
      this.fileToDataUrl(event, (src) => {
        this.imageUrl = src;
        this.customerForm.image = src; // Update contact form image
        this.validateField('image', this.customerForm.image, 'Image is required.');
      });
    },
    fileToDataUrl(event, callback) {
      if (!event.target.files.length) return;
      let file = event.target.files[0],
        reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => callback(e.target.result);
    }
  };
}

document.addEventListener('alpine:init', () => {
  Alpine.data('customerTable', customerTable);
});

//Subscriber Select
VirtualSelect.init({
  ele: '#subscriberSelect',
  options: [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ]
});

//status Select
VirtualSelect.init({
  ele: '#statusSelect',
  options: [
    { label: 'Active', value: 'Active' },
    { label: 'In Active', value: 'Inactive' }
  ]
});
