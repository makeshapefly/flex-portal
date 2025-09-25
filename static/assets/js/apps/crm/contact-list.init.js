/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: contact list init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
//contact table
import contactData from '/assets/json/contact-list.js';
function contactTable() {
  return {
    contacts: [],
    selectedContact: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    selectAll: false,
    selectedItems: [],
    filterContacts: [],
    currentPage: 1,
    searchTerm: '',
    itemsPerPage: 10,
    deleteItem: '',
    imageUrl: '',
    showAddContactForm: false,
    showEditContactForm: false,
    errors: {},
    contactForm: {
      contactID: '',
      image: '',
      phoneNumber: '',
      contactName: '',
      company: '',
      role: '',
      email: '',
      website: '',
      status: ''
    },

    validateForm() {
      this.errors = {};
      this.validateField('contactName', this.contactForm.contactName, 'Full name is required.');
      this.validateField('company', this.contactForm.company, 'Company name is required.');
      this.validateField('role', this.contactForm.role, 'Role is required.');
      this.validateEmailField();
      this.formatPhoneNumber();
      this.validateField('phoneNumber', this.contactForm.phoneNumber, 'Phone number is required.');
      this.validateField('image', this.contactForm.image, 'Image is required.');
      this.validateField(
        'status',
        document.querySelector('#statusSelect').value,
        'Status is required.'
      );
      this.validateURLField();
      return Object.keys(this.errors).length === 0;
    },
    formatPhoneNumber() {
      let rawNumber = this.contactForm.phoneNumber.replace(/[^\d+]/g, '');
      if (rawNumber.startsWith('+')) {
        rawNumber = rawNumber.substring(1);
      }
      const formattedNumber = rawNumber.replace(/^(\d{3})(\d{0,4})(\d{0,5})$/, '+$1 $2 $3').trim();
      const phonePattern = /^\+\d{3} \d{4} \d{5}$/;
      if (!phonePattern.test(formattedNumber)) {
        this.errors.phoneNumber = 'Phone number must be in the format +XXX XXXX XXXXX';
      } else {
        this.errors.phoneNumber = '';
      }
      this.contactForm.phoneNumber = formattedNumber;
    },
    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue) {
        this.errors[fieldName] = errorMessage;
      } else {
        delete this.errors[fieldName];
      }
    },

    validateEmailField() {
      if (!this.contactForm.email) {
        this.errors.email = 'Email is required.';
      } else if (!this.validateEmail(this.contactForm.email)) {
        this.errors.email = 'Invalid email format.';
      } else {
        delete this.errors.email;
      }
    },

    validateURLField() {
      if (!this.contactForm.website) {
        this.errors.website = 'Website is required.';
      } else if (!this.validateURL(this.contactForm.website)) {
        this.errors.website = 'Invalid URL format.';
      } else {
        delete this.errors.website;
      }
    },

    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    },

    validateURL(url) {
      const re = /^(?!.*http:\/\/|https:\/\/).*\.((com)|(in))$/;
      return re.test(url);
    },

    handleModal(modal) {
      if (modal === 'showAddContactForm') {
        this.showAddContactForm = true;
        this.showEditContactForm = false;
        this.resetForm();
      } else {
        this.showEditContactForm = true;
        this.showAddContactForm = false;
        this.resetForm();
      }
    },

    submitForm() {
      if (this.validateForm()) {
        if (this.showAddContactForm) {
          this.errors = {};
          this.addOrder();
        } else {
          this.updateOrder();
        }
        document.body.classList.toggle('overflow-hidden', false);
        this.resetForm();
        this.errors = {};
        this.showEditContactForm = false;
        this.showAddContactForm = false;
      }
    },

    addOrder() {
      this.contactForm.contactID = 'PEC-' + (24151 + this.contacts.length).toString();
      var statusSelect = document.querySelector('#statusSelect').value;
      this.filterContacts.unshift({ ...this.contactForm, status: statusSelect });
    },
    editContact(index) {
      this.handleModal('showEditContactForm');
      this.contactForm = { ...this.filterContacts.find((contact) => contact.contactID === index) };
      var statusSelect = document.querySelector('#statusSelect');
      statusSelect?.setValue(this.contactForm.status);
    },
    updateOrder() {
      const index = this.filterContacts.findIndex(
        (product) => product.contactID === this.contactForm.contactID
      );
      var statusSelect = document.querySelector('#statusSelect').value;
      this.filterContacts[index] = { ...this.contactForm, status: statusSelect };
      this.resetForm();
    },
    resetForm() {
      this.errors = {};
      var statusSelect = document.querySelector('#statusSelect');
      this.contactForm = {
        contactID: '',
        image: '',
        phoneNumber: '',
        contactName: '',
        company: '',
        role: '',
        email: '',
        website: '',
        status: statusSelect?.setValue('')
      };
    },
    reviewContact(contactid) {
      this.selectedContact = this.contacts.find((contact) => contact.contactID === contactid);
    },
    deleteProduct() {
      this.filterContacts.forEach((contact, index) => {
        if (contact.contactID == this.deleteItem) {
          this.filterContacts.splice(index, 1);
        }
      });
    },
    toggleAll() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.selectedItems = [...this.filterContacts];
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
      this.selectAll = this.selectedItems.length === this.filterContacts.length;
    },
    deleteSelectedItems() {
      this.selectedItems.forEach((item) => {
        this.deleteItem = item.contactID;
        this.deleteProduct();
      });
      this.selectedItems = [];
      this.selectAll = false;
    },
    get totalPages() {
      return Math.ceil(this.filterContacts.length / this.itemsPerPage);
    },
    get displayedContacts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.filterContacts.slice(start, end);
    },
    filterContact() {
      this.filterContacts = this.contacts;
      const searchTerm = this.searchTerm.trim().toLowerCase();
      if (searchTerm) {
        this.filterContacts = this.filterContacts.filter((contact) => {
          return Object.values(contact).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filterContacts.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filterContacts.length);
    },
    init() {
      let startID = 24151; // Starting ID
      contactData.forEach((contact, index) => {
        contact.contactID = 'PEC-' + (startID + index).toString();
      });
      this.contacts = contactData;
      this.filterContact();
    },
    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.contacts.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        let comparison = 0;
        if (valueA > valueB) {
          comparison = 1;
        } else if (valueA < valueB) {
          comparison = -1;
        }
        this.open = false;
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
    fileChosen(event) {
      this.fileToDataUrl(event, (src) => {
        this.imageUrl = src;
        this.contactForm.image = src; // Update contact form image
        this.validateField('image', this.contactForm.image, 'Image is required.');
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

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('contactTable', contactTable);
});

// Status Select
VirtualSelect.init({
  ele: '#statusSelect',
  options: [
    { label: 'Customer', value: 'Customer' },
    { label: 'Personal', value: 'Personal' },
    { label: 'Employee', value: 'Employee' },
    { label: 'Marketing', value: 'Marketing' }
  ]
});
