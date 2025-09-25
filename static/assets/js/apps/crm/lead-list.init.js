/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: lead list init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import Sortable from 'sortablejs';
import leadsData from '../../../json/apps/crm/lead-list';
const avtarImages = import.meta.globEager('/assets/images/avatar/*.{png,jpg,jpeg,svg}');

function dragAndDrop() {
  return {
    allLeads: [],
    filterLeads: [],
    searchTerm: '',
    leads: [],
    hotLead: [],
    pendingLead: [],
    lostLead: [],
    selectedTasks: [],
    errors: {},
    deleteItem: '',
    showAddContactForm: false,
    showEditContactForm: false,
    contactForm: {
      id: '',
      image: '',
      name: '',
      email: '',
      phoneNumber: '',
      status: ''
    },

    init() {
      this.allLeads = leadsData;
      this.categorizeLeads(this.allLeads);
      this.updateCounts();
      // Initialize Sortable
      this.initSortable();
    },

    searchContact() {
      const searchTerm = this.searchTerm.trim().toLowerCase();
      this.filterLeads = searchTerm
        ? this.allLeads.filter((lead) =>
            Object.values(lead).some((value) => value.toString().toLowerCase().includes(searchTerm))
          )
        : this.allLeads;
      this.categorizeLeads(this.filterLeads);
      this.updateCounts();
    },

    validateForm() {
      this.errors = {};
      this.validateField('name', this.contactForm.name, 'Full name is required.');
      this.validateField('email', this.contactForm.email, 'Email is required.', this.validateEmail);
      this.formatPhone();
      this.validateField('phoneNumber', this.contactForm.phoneNumber, 'Phone number is required.');
      this.validateField('image', this.contactForm.image, 'Image is required.');
      this.validateField(
        'status',
        document.querySelector('#statusSelect2').value,
        'Status is required.'
      );
      return Object.keys(this.errors).length === 0;
    },

    formatPhone() {
      let rawNumber = this.contactForm.phoneNumber.replace(/[^\d]/g, '');
      let formattedNumber = rawNumber
        .replace(/^(\d{1,3})(\d{0,4})(\d{0,4})$/, '+($1) $2 $3')
        .trim();
      const phonePattern = /^\+\(\d{3}\) \d{4} \d{4}$/;
      if (!phonePattern.test(formattedNumber)) {
        this.errors.phoneNumber = 'Phone number must be in the format +(XXX) YYYY ZZZZ';
      } else {
        this.errors.phoneNumber = '';
      }
      this.contactForm.phoneNumber = formattedNumber;
    },
    validateField(fieldName, fieldValue, errorMessage, validationFunction) {
      if (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
        this.errors[fieldName] = errorMessage;
      } else if (validationFunction && !validationFunction(fieldValue)) {
        this.errors[fieldName] = `Invalid ${fieldName} format.`;
      } else {
        delete this.errors[fieldName];
      }
    },

    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    },
    handleModal(modal) {
      if (modal === 'showAddContactForm') {
        this.showAddContactForm = true;
        this.showEditContactForm = false;
        this.resetForm();
      } else {
        this.showEditContactForm = true;
        this.showAddContactForm = false;
      }
    },

    submitForm() {
      if (this.validateForm()) {
        if (this.showAddContactForm) {
          this.addContact();
        } else {
          this.updateContact();
        }
        this.resetForm();
        this.showEditContactForm = false;
        this.showAddContactForm = false;
      }
    },

    addContact() {
      const status = document.querySelector('#statusSelect2').value;
      this.allLeads.unshift({
        ...this.contactForm,
        id: this.allLeads.length + 1,
        status: status,
        time: '2:45 PM',
        date: '19 June, 2024'
      });
      this.categorizeLeads(this.allLeads);
      this.updateCounts();
    },

    updateContact() {
      const index = this.allLeads.findIndex((product) => product.id === this.contactForm.id);
      const statusGet = document.querySelector('#statusSelect2').value;
      this.allLeads[index] = { ...this.contactForm, status: statusGet };
      this.categorizeLeads(this.allLeads);
      this.updateCounts();
    },

    editContact(index) {
      this.handleModal('showEditContactForm');
      let found = false;
      let data = {};

      // Helper function to search an array
      const searchArray = (array) => {
        const obj = array.find((item) => item.name === index);
        if (obj) {
          found = true;
          data = obj;
          return true; // Exit the loop once the object is found
        }
        return false;
      };

      // Search each array until the object is found
      if (
        !searchArray(this.leads) &&
        !searchArray(this.hotLead) &&
        !searchArray(this.pendingLead) &&
        !searchArray(this.lostLead)
      ) {
      }
      const status = document.querySelector('#statusSelect2');
      this.contactForm = { ...data };
      status.setValue(data.status);
    },

    resetForm() {
      this.errors = {};
      this.showAddOrderForm = false;
      this.showEditOrderForm = false;
      const status = document.querySelector('#statusSelect2');
      this.contactForm = {
        id: '',
        image: '',
        name: '',
        email: '',
        phoneNumber: '',
        status: status.setValue([''])
      };
    },
    categorizeLeads(data) {
      setTimeout(() => {
        drawerSetting();
      }, 0);
      this.leads = data.filter((lead) => lead.status.toLowerCase() === 'new');
      this.hotLead = data.filter((lead) => lead.status.toLowerCase() === 'hot');
      this.pendingLead = data.filter((lead) => lead.status.toLowerCase() === 'pending');
      this.lostLead = data.filter((lead) => lead.status.toLowerCase() === 'lost');
    },

    toggleSelection(task) {
      if (this.selectedTasks.includes(task)) {
        this.selectedTasks = this.selectedTasks.filter((t) => t.id !== task.id);
      } else {
        this.selectedTasks.push(task);
      }
    },
    deleteProduct() {
      this.leads.forEach((lead, index) => {
        if (lead.name == this.deleteItem) {
          this.leads.splice(index, 1);
        }
      });

      this.hotLead.forEach((lead, index) => {
        if (lead.name == this.deleteItem) {
          this.hotLead.splice(index, 1);
        }
      });
      this.pendingLead.forEach((lead, index) => {
        if (lead.name == this.deleteItem) {
          this.pendingLead.splice(index, 1);
        }
      });

      this.lostLead.forEach((lead, index) => {
        if (lead.name == this.deleteItem) {
          this.lostLead.splice(index, 1);
        }
      });
      drawerSetting();
    },

    initSortable() {
      const containers = [
        document.querySelector('#leads-container'),
        document.querySelector('#hotLead-container'),
        document.querySelector('#pendingLead-container'),
        document.querySelector('#lostLead-container')
      ];

      containers.forEach((container) => {
        new Sortable(container, {
          group: 'leads',
          onEnd: (evt) => {
            const id = evt.item.dataset.id;
            const status = evt.to.dataset.status;

            const leadIndex = this.allLeads.findIndex((lead) => lead.id == id);
            if (leadIndex !== -1) {
              this.allLeads[leadIndex].status = status;
              this.categorizeLeads(this.allLeads);
              this.updateCounts();
            }
          }
        });
      });
    },

    updateCounts() {
      const newCountElement = document.querySelector('.new-count');
      const hotCountElement = document.querySelector('.hot-count');
      const pendingCountElement = document.querySelector('.pending-count');
      const lostCountElement = document.querySelector('.lost-count');

      if (newCountElement) {
        newCountElement.innerText = this.leads.length;
      }
      if (hotCountElement) {
        hotCountElement.innerText = this.hotLead.length;
      }
      if (pendingCountElement) {
        pendingCountElement.innerText = this.pendingLead.length;
      }
      if (lostCountElement) {
        lostCountElement.innerText = this.lostLead.length;
      }
    },

    removeTask(task) {
      this.leads = this.leads.filter((t) => t.id !== task.id);
      this.hotLead = this.hotLead.filter((t) => t.id !== task.id);
      this.pendingLead = this.pendingLead.filter((t) => t.id !== task.id);
      this.lostLead = this.lostLead.filter((t) => t.id !== task.id);
      this.categorizeLeads(this.allLeads);
      this.updateCounts();
    },
    // preview image

    imageUrl: '',
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
// Status Select
VirtualSelect.init({
  ele: '#statusSelect2',
  options: [
    { label: 'New', value: 'New' },
    { label: 'Hot', value: 'Hot' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Lost', value: 'Lost' }
  ]
});

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('dragAndDrop', dragAndDrop);
});
