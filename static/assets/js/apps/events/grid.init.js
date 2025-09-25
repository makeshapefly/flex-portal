/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: event grid init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import eventGridData from '../../../json/apps/events/events-grid';

//event table

function eventsTable() {
  return {
    events: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    selectAll: false,
    selectedItems: [],
    currentPage: 1,
    itemsPerPage: 6,
    filterEvents: [],
    errors: {},
    contributorNames: [],
    showAddEventForm: false,
    showEditEventForm: false,
    imageUrl: '',
    eventForm: {
      ID: '',
      username: '',
      date: '',
      time: '',
      eventType: '',
      name: ' ',
      location: ' ',
      peopleSize: ' ',
      image: '',
      price: ' ',
      status: '',
      contributors: []
    },
    validateForm() {
      this.errors = {};
      this.validateField('name', this.eventForm.name, 'Event name is required.');
      this.validateField('date', this.eventForm.date, 'Date is required.');
      this.validateField('time', this.eventForm.time, 'Time is required.');
      this.validateField('location', this.eventForm.location, 'Location is required.');
      this.validateField('peopleSize', this.eventForm.peopleSize, 'People size is required.');
      this.validateField('price', this.eventForm.price, 'Price is required.');
      this.validateField(
        'eventType',
        document.querySelector('#eventTypeSelect').value,
        'Event type is required.'
      );
      this.validateField(
        'status',
        document.querySelector('#StatusSelect').value,
        'Status is required.'
      );
      this.validateField(
        'contributors',
        document.querySelector('#contributorsSelect').value,
        'Contributor is required.'
      );
      this.validateField('image', this.eventForm.mainImage, 'Image is required.');

      return Object.keys(this.errors).length === 0;
    },

    validateField(fieldName, fieldValue, errorMessage) {
      if (fieldName == 'contributors') {
        if (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
          this.errors[fieldName] = errorMessage;
        } else {
          delete this.errors[fieldName];
        }
      } else {
        if (
          !fieldValue ||
          fieldValue.trim() === '' ||
          (Array.isArray(fieldValue) && fieldValue.length === 0)
        ) {
          this.errors[fieldName] = errorMessage;
        } else {
          delete this.errors[fieldName];
        }
      }
    },

    handleModal(modal) {
      if (modal == 'showAddEventForm') {
        this.showAddEventForm = true;
        this.showEditEventForm = false;
        this.resetForm();
      } else {
        this.showEditEventForm = true;
        this.showAddEventForm = false;
        this.resetForm();
      }
    },
    submitForm() {
      if (this.validateForm()) {
        if (this.showAddEventForm) {
          this.addEvent();
        } else {
          this.updateEvent();
        }
        document.body.classList.toggle('overflow-hidden', false);
        this.resetForm();
        this.showEditEventForm = false;
        this.showAddEventForm = false;
      }
    },
    addEvent() {
      var statusSelect = document.querySelector('#StatusSelect').value;
      var eventTypeSelect = document.querySelector('#eventTypeSelect').value;
      var contributor = document.querySelector('#contributorsSelect').value;
      var contributorImages = [];
      if (contributor == []) {
        contributorImages = this.eventForm.contributors;
      } else {
        contributor.map((element) => {
          if (element == 'Declan Grieve') {
            contributorImages.push({ image: 'assets/images/avatar/user-5.png', name: element });
          } else if (element == 'Callum Burston') {
            contributorImages.push({ image: 'assets/images/avatar/user-20.png', name: element });
          } else if (element == 'Liam White') {
            contributorImages.push({ image: 'assets/images/avatar/user-13.png', name: element });
          } else if (element == 'Sophia Adams') {
            contributorImages.push({ image: 'assets/images/avatar/user-10.png', name: element });
          } else if (element == 'Ethan Thompson') {
            contributorImages.push({ image: 'assets/images/avatar/user-15.png', name: element });
          } else if (element == 'Ava Wilson') {
            contributorImages.push({ image: 'assets/images/avatar/user-25.png', name: element });
          }
        });
      }
      this.filterEvents.unshift({
        ...this.eventForm,
        status: statusSelect,
        eventType: eventTypeSelect,
        username: 'Sophia Mia',
        image: 'assets/images/avatar/user-17.png',
        contributors: contributorImages
      });
    },
    editEvent(index) {
      this.handleModal('showEditEventForm');
      this.eventForm = { ...this.events.find((contact) => contact.name === index) };
      var statusSelect = document.querySelector('#StatusSelect');
      var eventTypeSelect = document.querySelector('#eventTypeSelect');
      // contributor
      var contributor = document.querySelector('#contributorsSelect');
      this.eventForm.contributors.forEach((element) => {
        this.contributorNames.push(element.name);
      });
      contributor?.setValue(this.contributorNames);
      statusSelect?.setValue(this.eventForm.status);
      eventTypeSelect?.setValue(this.eventForm.eventType);
      this.showEditEventForm = true;
    },
    updateEvent() {
      const index = this.events.findIndex((product) => product.ID == this.eventForm.ID);
      var statusSelect = document.querySelector('#StatusSelect').value;
      var eventTypeSelect = document.querySelector('#eventTypeSelect').value;
      var contributor = document.querySelector('#contributorsSelect').value;
      var contributorImages = [];
      if (contributor == []) {
        contributorImages = this.eventForm.contributors;
      } else {
        contributor.map((element) => {
          if (element == 'Declan Grieve') {
            contributorImages.push({ image: 'assets/images/avatar/user-5.png', name: element });
          } else if (element == 'Callum Burston') {
            contributorImages.push({ image: 'assets/images/avatar/user-20.png', name: element });
          } else if (element == 'Liam White') {
            contributorImages.push({ image: 'assets/images/avatar/user-13.png', name: element });
          } else if (element == 'Sophia Adams') {
            contributorImages.push({ image: 'assets/images/avatar/user-10.png', name: element });
          } else if (element == 'Ethan Thompson') {
            contributorImages.push({ image: 'assets/images/avatar/user-15.png', name: element });
          } else if (element == 'Ava Wilson') {
            contributorImages.push({ image: 'assets/images/avatar/user-25.png', name: element });
          }
        });
      }
      this.filterEvents[index] = {
        ...this.eventForm,
        status: statusSelect,
        eventType: eventTypeSelect,
        contributors: contributorImages
      };
    },
    resetForm() {
      this.errors = {};
      var statusSelect = document.querySelector('#StatusSelect');
      var eventTypeSelect = document.querySelector('#eventTypeSelect');
      var contributor = document.querySelector('#contributorsSelect');
      contributor?.setValue([]);
      this.eventForm = {
        ID: '',
        date: '',
        time: '',
        name: ' ',
        eventType: eventTypeSelect?.setValue(''),
        location: ' ',
        peopleSize: ' ',
        price: ' ',
        status: statusSelect?.setValue('')
      };
    },

    reviewEvent(contactId) {
      this.selectedContact = this.contacts.find((contact) => contact.contactID === contactId);
    },

    deleteEvent(deleteItem) {
      this.filterEvents.forEach((contact, index) => {
        if (contact.name == deleteItem) {
          this.filterEvents.splice(index, 1);
        }
      });
    },

    filterEvent() {
      this.filterEvents = this.events;
    },
    get totalPages() {
      return Math.ceil(this.filterEvents.length / this.itemsPerPage);
    },
    get displayedEvents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      drawerSetting();
      return this.filterEvents.slice(start, start + this.itemsPerPage);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filterEvents.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filterEvents.length);
    },
    get totalEvents() {
      return this.filterEvents.length;
    },
    init() {
      let startID = 1; // Starting ID
      eventGridData.forEach((event, index) => {
        event.ID = 'Event' + (startID + index).toString();
      });
      this.events = eventGridData;
      this.filterEvent(
        setTimeout(() => {
          drawerSetting();
        }, 0)
      );
    },
    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }

      this.events.sort((a, b) => {
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
    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-GB', options);
    },
    // Output: "19 May 2024"
    getWeekday(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      const options = { weekday: 'short' };
      return date.toLocaleDateString('en-GB', options);
    },
    formatDateTime(dateStr, timeStr) {
      if (!dateStr || !timeStr) return '';

      // Combine date and time into a single Date object
      const dateTimeStr = `${dateStr}T${timeStr}`;
      const date = new Date(dateTimeStr);
      if (isNaN(date)) return 'Invalid date or time';
      const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
      return date.toLocaleDateString('en-GB', options);
    },
    formatTime(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      const options = { hour: '2-digit', minute: '2-digit', hour12: true };
      return date.toLocaleTimeString('en-GB', options);
    },
    // Output: "10:00 AM"
    deleteEvent(index) {
      this.events.splice(index, 1);
    },
    bookEvent(event) {
      this.selectedItems = event;
    },
    fileChosen(event) {
      this.fileToDataUrl(event, (src) => {
        this.imageUrl = src;
        this.eventForm.mainImage = src; // Update contact form image
        this.validateField('image', this.eventForm.mainImage, 'Image is required.');
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

function bookEventModal() {
  return {
    totalTickets: 0,
    pricePerTicket: 500.0,
    totalAmount: 0,
    calculatePrice() {
      // Calculate total amount
      this.totalAmount = (this.totalTickets * this.pricePerTicket).toFixed(2);
    }
  };
}

//Status Select
VirtualSelect.init({
  ele: '#StatusSelect',
  options: [
    { label: 'Published', value: 'Published' },
    { label: 'Coming Soon', value: 'Coming Soon' },
    { label: 'Expired', value: 'Expired' }
  ]
});

//Event Type Select
VirtualSelect.init({
  ele: '#eventTypeSelect',
  options: [
    { label: 'Offline', value: 'Offline' },
    { label: 'Online', value: 'Online' }
  ]
});

// contributor Select
VirtualSelect.init({
  ele: '#contributorsSelect',
  options: [
    { label: 'Declan Grieve', value: 'Declan Grieve' },
    { label: 'Callum Burston', value: 'Callum Burston' },
    { label: 'Liam White', value: 'Liam White' },
    { label: 'Sophia Adams', value: 'Sophia Adams' },
    { label: 'Ethan Thompson', value: 'Ethan Thompson' },
    { label: 'Ava Wilson', value: 'Ava Wilson' }
  ],
  multiple: true,
  showValueAsTags: true
});

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('eventsTable', eventsTable);
  Alpine.data('bookEventModal', bookEventModal);
});
