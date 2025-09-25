/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: event list init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import eventsListData from '../../../json/apps/events/events-list';

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
    itemsPerPage: 10,
    imageUrl: '',
    filterEvents: [],
    errors: {},
    showAddEventForm: false,
    showEditEventForm: false,
    eventForm: {
      ID: '',
      eventDate: '',
      time: '',
      eventName: '',
      eventType: '',
      image: '',
      location: '',
      peopleSize: '',
      price: '',
      status: ''
    },
    validateForm() {
      this.errors = {};
      this.validateField('eventName', this.eventForm.eventName, 'Event name is required.');
      this.validateField('eventDate', this.eventForm.eventDate, 'Date is required.');
      this.validateField('location', this.eventForm.location, 'Location is required.');
      this.validateField('peopleSize', this.eventForm.peopleSize, 'People size is required.');
      this.validateField('price', this.eventForm.price, 'Price is required.');
      this.validateField('time', this.eventForm.time, 'Time is required.');
      this.validateField(
        'status',
        document.querySelector('#StatusSelect').value,
        'Status is required.'
      );
      this.validateField(
        'eventType',
        document.querySelector('#eventTypeSelect').value,
        'Event type is required.'
      );
      this.validateField('image', this.eventForm.image, 'Image is required.');
      return Object.keys(this.errors).length === 0;
    },
    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue || fieldValue.trim() === '') {
        this.errors[fieldName] = errorMessage;
      } else {
        delete this.errors[fieldName];
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
      this.filterEvents.unshift({
        ...this.eventForm,
        status: statusSelect,
        eventType: eventTypeSelect,
        price: this.eventForm.price
      });
    },
    editEvent(index) {
      this.handleModal('showEditEventForm');
      this.eventForm = { ...this.events.find((contact) => contact.ID === index) };
      var statusSelect = document.querySelector('#StatusSelect');
      var eventTypeSelect = document.querySelector('#eventTypeSelect');
      statusSelect?.setValue(this.eventForm.status);
      eventTypeSelect?.setValue(this.eventForm.eventType);
    },
    updateEvent() {
      const index = this.events.findIndex((product) => product.ID == this.eventForm.ID);
      var statusSelect = document.querySelector('#StatusSelect').value;
      var eventTypeSelect = document.querySelector('#eventTypeSelect').value;
      this.filterEvents[index] = {
        ...this.eventForm,
        status: statusSelect,
        eventType: eventTypeSelect
      };
    },
    resetForm() {
      this.errors = {};
      var statusSelect = document.querySelector('#StatusSelect');
      var eventTypeSelect = document.querySelector('#eventTypeSelect');
      this.eventForm = {
        ID: '',
        eventDate: ' ',
        time: '',
        eventName: ' ',
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
        if (contact.eventName == deleteItem) {
          this.filterEvents.splice(index, 1);
        }
      });
    },
    filterEvent() {
      this.filterEvents = this.events;
    },
    toggleAll() {
      this.selectedItems = this.selectAll ? [...this.filterEvents] : [];
    },
    get totalPages() {
      return Math.ceil(this.filterEvents.length / this.itemsPerPage);
    },
    get displayedEvents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filterEvents.slice(start, end);
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
      eventsListData.forEach((event, index) => {
        event.ID = 'Event' + (startID + index).toString();
      });
      this.events = eventsListData;
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
      const date = new Date(dateStr);
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-GB', options);
    },
    fileChosen(event) {
      this.fileToDataUrl(event, (src) => {
        this.imageUrl = src;
        this.eventForm.image = src;
        this.validateField('image', this.eventForm.image, 'Image is required.');
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

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('eventsTable', eventsTable);
});
