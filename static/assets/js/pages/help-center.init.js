/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: help center init Js File
*/

import '../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import ticketsData from '../../json/tickets';

function ticketApp() {
  return {
    tickets: [],
    replyMessages: [],
    newMessage: '',
    showTicketDetailsModal: false,
    activeFilter: 'All Tickets',
    activeTicket: 'Getting Started',
    showNewTicketsModal: false,
    tags: document.querySelector('#multipleSelect').value,
    assignedTo: document.querySelector('#assignedToSelect').value,
    searchQuery: '',
    filteredTickets: [],
    errors: {},
    ticketDetails: {
      id: '',
      title: '',
      description: '',
      author: '',
      avatar: '',
      status: ''
    },
    ticketForm: {
      id: '',
      title: '',
      description: '',
      author: 'Olivia Martina',
      avatar: 'assets/images/avatar/user-45.png',
      projectName: '',
      keywords: document.querySelector('#multipleSelect').value,
      assignedTo: document.querySelector('#assignedToSelect').value,
      phone: ''
    },
    validateForm() {
      this.errors = {};
      this.validateField('title', this.ticketForm.title, 'Title is required.');
      this.validateField('description', this.ticketForm.description, 'description is required.');
      this.validateField('projectName', this.ticketForm.projectName, 'Project Name is required.');
      this.validateField(
        'keywords',
        document.querySelector('#multipleSelect').value,
        'Keywords is required.'
      );
      this.validateField(
        'assignedTo',
        document.querySelector('#assignedToSelect').value,
        'Assignees is required.'
      );
      this.validateField('phone', this.ticketForm.phone, 'phone is required.');
      return Object.keys(this.errors).length === 0;
    },
    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0))
        this.errors[fieldName] = errorMessage;
      else delete this.errors[fieldName];
    },
    showTicket(ticket) {
      this.showTicketDetailsModal = true;
      const list = document.querySelector('.list');
      list.classList.add('hidden');
      this.ticketDetails = ticket;
      this.newMessage = '';
    },
    addMessage(msg) {
      if (msg.trim() === '') return;
      this.replyMessages.push(msg);
      this.newMessage = '';
    },
    submitForm() {
      if (this.validateForm()) {
        this.addTicket();
        this.resetForm();
        document.body.classList.toggle('overflow-hidden', false);
        this.showNewTicketsModal = false;
      }
    },
    resetForm() {
      this.ticketForm = {
        id: '',
        title: '',
        description: '',
        projectName: '',
        author: 'Mary Smith',
        avatar: 'assets/images/avatar/user-1.png',
        keywords: document.querySelector('#multipleSelect').setValue(['']),
        assignedTo: document.querySelector('#assignedToSelect').setValue(['']),
        phone: ''
      };
      this.errors = {};
    },
    addTicket() {
      let tags = document.getElementById('multipleSelect').value;
      this.filteredTickets.unshift({
        ...this.ticketForm,
        id: `2023-00${this.filteredTickets.length + 1}`,
        tags: [tags],
        time: '12:30 AM',
        comments: 0
      });
    },
    init() {
      this.tickets = ticketsData;
      this.filteredTickets = this.flattenTickets('Getting Started');
    },
    flattenTickets(tickets) {
      this.activeTicket = tickets;
      this.originalFilteredTickets = []; // Store the original flattened tickets
      this.tickets.forEach((ticket) => {
        if (ticket.category === tickets) this.originalFilteredTickets.push(...ticket.tickets);
      });
      this.filteredTickets = [...this.originalFilteredTickets]; // Initialize the filtered tickets
      return this.filteredTickets;
    },
    filterTickets(status) {
      this.activeFilter = status;
      let filteredTickets =
        status === 'All Tickets'
          ? this.originalFilteredTickets
          : this.originalFilteredTickets.filter((ticket) => ticket.status === status);
      this.filteredTickets = filteredTickets;
    },
    searchQuestions() {
      const searchTerm = this.searchQuery.trim().toLowerCase();
      let filteredTickets = this.originalFilteredTickets.filter((contact) => {
        return Object.values(contact).some((value) =>
          value.toString().toLowerCase().includes(searchTerm)
        );
      });
      this.filteredTickets = filteredTickets;
    }
  };
}

document.addEventListener('alpine:init', () => {
  Alpine.data('ticketApp', ticketApp);
});

//Multiple select
VirtualSelect.init({
  ele: '#multipleSelect',
  options: [
    { label: 'Help', value: 'Help' },
    { label: 'Design', value: 'Design' },
    { label: 'Customize', value: 'Customize' },
    { label: 'Development', value: 'Development' }
  ],
  multiple: true
});

//assigned To select
VirtualSelect.init({
  ele: '#assignedToSelect',
  options: [
    { label: 'Patrick Schulz', value: '1' },
    { label: 'Margaret Mann', value: '2' },
    { label: 'Joanne Murray', value: '3' },
    { label: 'Cynthia Justice', value: '4' },
    { label: 'John Jenson', value: '5' },
    { label: 'Mark Welch', value: '6' },
    { label: 'Virginia Dawson', value: '7' }
  ],
  multiple: true
});
