/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: calendar init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';

import { Calendar } from '@fullcalendar/core';
import { Draggable } from '@fullcalendar/interaction';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import user1 from '../../../images/avatar/user-1.png';
import user2 from '../../../images/avatar/user-2.png';
import user3 from '../../../images/avatar/user-3.png';
import user4 from '../../../images/avatar/user-4.png';
import user5 from '../../../images/avatar/user-5.png';
import user6 from '../../../images/avatar/user-6.png';
import user7 from '../../../images/avatar/user-7.png';
import user8 from '../../../images/avatar/user-8.png';
import user9 from '../../../images/avatar/user-9.png';
import user10 from '../../../images/avatar/user-10.png';
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
function calendarApp() {
  return {
    eventId: 0,
    calendar: {},
    form: {
      eventName: '',
      eventDate: '',
      endEventDate: '',
      eventTime: '',
      location: '',
      guestEmail: '',
      class: '',
      guests: []
    },
    modalTitle: '',
    modalButton: '',
    errors: {},

    init() {
      const calendarEl = document.getElementById('calendar');
      this.calendar = new Calendar(calendarEl, {
        timeZone: 'America/New_York',
        plugins: [interactionPlugin, dayGridPlugin],
        editable: true,
        timeZone: 'local',
        droppable: true,
        events: [
          {
            id: 1,
            title: 'Meeting',
            end: new Date(currentYear, currentMonth, 1),
            start: new Date(currentYear, currentMonth, 1),
            extendedProps: { guests: [], location: 'surat' },
            classNames: ['bg-green-500', 'hover:bg-green-500', 'text-green-50', 'p-2']
          },
          {
            id: 2,
            title: 'Update Weekly',
            end: new Date(currentYear, currentMonth, 7),
            start: new Date(currentYear, currentMonth, 7),
            extendedProps: { location: 'surat' },
            classNames: ['bg-primary-500', 'hover:bg-primary-500', 'text-primary-50', 'p-2']
          },
          {
            id: 3,
            title: 'Family Dinner',
            end: new Date(currentYear, currentMonth, 14),
            start: new Date(currentYear, currentMonth, 14),
            extendedProps: { location: 'surat' },
            classNames: ['bg-purple-500', 'hover:bg-purple-500', 'text-purple-50', 'p-2']
          },
          {
            id: 4,
            title: 'School Reunion',
            end: new Date(currentYear, currentMonth, 10),
            start: new Date(currentYear, currentMonth, 10),
            extendedProps: { location: 'surat' },
            classNames: ['bg-sky-500', 'hover:bg-sky-500', 'text-sky-50', 'p-2']
          },
          {
            id: 5,
            title: 'Holiday Tour',
            end: new Date(currentYear, currentMonth, 14),
            start: new Date(currentYear, currentMonth, 14),
            extendedProps: { location: 'surat' },
            classNames: ['bg-green-500', 'hover:bg-green-500', 'text-green-50', 'p-2']
          },
          {
            id: 6,
            title: 'Meeting',
            end: new Date(currentYear, currentMonth, 23),
            start: new Date(currentYear, currentMonth, 23),
            extendedProps: { location: 'surat' },
            classNames: ['bg-green-500', 'hover:bg-green-500', 'text-green-50', 'p-2']
          },
          {
            id: 7,
            title: 'Marrige Function',
            start: new Date(currentYear, currentMonth, 18),
            end: new Date(currentYear, currentMonth, 18),
            extendedProps: { location: 'surat' },
            classNames: ['bg-purple-500', 'hover:bg-purple-500', 'text-purple-50', 'p-2']
          }
        ],
        drop: (info) => {
          const eventData = {
            title: info.draggedEl.innerText,
            className: info.draggedEl.getAttribute('class')
          };

          const existingEvents = this.calendar.getEvents();
          const eventExists = existingEvents.some(
            (event) =>
              event.title === eventData.title && event.start.getTime() === info.date.getTime()
          );

          if (!eventExists) {
            this.calendar.addEvent({
              className: eventData.className,
              title: eventData.title,
              start: info.date,
              allDay: true
            });
          }
        },
        eventClick: (info) => {
          this.editEvent(info.event);
        },
        eventContent: (info) => {
          return this.renderEventContent(info);
        },
        dateClick: (info) => {
          // this.addEvent();
          this.openModal('add');
        }
      });
      this.calendar.render();
      const containerEl = document.getElementById('external-events');
      new Draggable(containerEl, {
        itemSelector: '.fc-event'
      });
    },
    removeGuest(index) {
      this.form.guests.splice(index, 1);
      return this.guests;
    },
    editEvent(event) {
      this.form.eventName = event.title || 'default';
      this.form.eventDate = new Date(event.start).toLocaleDateString('en-CA');
      this.form.endEventDate = event.end
        ? new Date(event.end).toLocaleDateString('en-CA')
        : this.form.eventDate;
      this.form.eventTime = new Date(event.start).toTimeString().slice(0, 5);
      let color = '';
      event.classNames.forEach((className) => {
        const match = className.match(/bg-(\w+)-500/);
        if (match) {
          color = match[1];
        }
      });
      const colorName = document.querySelector('#ColorSelect');
      colorName.setValue(color);
      this.form.location = event.extendedProps.location || '';
      this.eventId = event.id;
      this.form.guests = event.extendedProps.guests || [];
      this.openModal('edit');
    },
    validateField(field, value) {
      let isValid = true;
      switch (field) {
        case 'eventName':
          if (!value) {
            this.errors[field] = 'Event name is required.';
            isValid = false;
          } else {
            delete this.errors[field];
          }
          break;
        case 'eventDate':
        case 'endEventDate':
          if (!value) {
            this.errors[field] =
              `${field === 'eventDate' ? 'Event date' : 'End event date'} is required.`;
            isValid = false;
          } else {
            delete this.errors[field];
          }
          break;
        case 'eventTime':
          if (!value) {
            this.errors[field] = 'Event time is required.';
            isValid = false;
          } else {
            delete this.errors[field];
          }
          break;
        case 'class':
          if (!value) {
            this.errors[field] = 'Color is required.';
            isValid = false;
          } else {
            delete this.errors[field];
          }
          break;
        case 'location':
          if (!value) {
            this.errors[field] = 'Location is required.';
            isValid = false;
          } else {
            delete this.errors[field];
          }
          break;
        case 'guestEmail':
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value || !emailPattern.test(value)) {
            this.errors[field] = 'Valid email is required.';
            isValid = false;
          } else {
            delete this.errors[field];
          }
          break;
        default:
          break;
      }
      return isValid;
    },

    validateForm() {
      let isValid = true;
      isValid = this.validateField('eventName', this.form.eventName) && isValid;
      isValid = this.validateField('eventDate', this.form.eventDate) && isValid;
      isValid = this.validateField('endEventDate', this.form.endEventDate) && isValid;
      isValid = this.validateField('eventTime', this.form.eventTime) && isValid;
      isValid = this.validateField('location', this.form.location) && isValid;
      isValid =
        this.validateField('class', document.querySelector('#ColorSelect').value) && isValid;
      return isValid;
    },

    handleSubmit() {
      const startDateTime = new Date(`${this.form.eventDate} ${this.form.eventTime}`);
      const endDateTime = new Date(`${this.form.endEventDate} ${this.form.eventTime}`);
      const color = document.querySelector('#ColorSelect').value;

      if (this.validateForm()) {
        if (this.modalTitle === 'Add Event') {
          const newEvent = {
            id: this.calendar.getEvents().length + 1,
            title: this.form.eventName,
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString(),
            extendedProps: {
              location: this.form.location,
              guests: [...this.form.guests]
            },
            className: [
              `bg-${color}-500`,
              `border-${color}-500`,
              `text-${color}-50`,
              `hover:bg-${color}-500`
            ]
          };
          this.calendar.addEvent(newEvent);
          this.closeModal();
        } else if (this.modalTitle === 'Edit Event') {
          const updatedEvent = {
            id: this.eventId, // Use the stored ID
            title: this.form.eventName,
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString(),
            className: [
              `bg-${color}-500`,
              `border-${color}-500`,
              `text-${color}-50`,
              `hover:bg-${color}-500`
            ],
            location: this.form.location,
            guests: [...this.form.guests]
          };
          const existingEvent = this.calendar.getEventById(this.eventId);
          if (existingEvent) {
            existingEvent.setProp('title', updatedEvent.title);
            existingEvent.setStart(updatedEvent.start);
            existingEvent.setEnd(updatedEvent.end);
            existingEvent.setExtendedProp('location', updatedEvent.location);
            existingEvent.setExtendedProp('guests', updatedEvent.guests);
            existingEvent.setProp('classNames', [...updatedEvent.className]);
          }
          this.closeModal();
        }
      }
    },
    addGuest() {
      if (this.validateField('guestEmail', this.form.guestEmail)) {
        const userImages = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10];
        const randomImage = userImages[Math.floor(Math.random() * userImages.length)];
        this.form.guests.push(randomImage);
        this.form.guestEmail = '';
      }
    },

    openModal(action) {
      if (action === 'add') {
        this.resetForm();
        this.modalTitle = 'Add Event';
        this.modalButton = 'Create Event';
        document.getElementById('newEvent').click();
      } else if (action === 'edit') {
        this.modalTitle = 'Edit Event';
        this.modalButton = 'Update Event';
        document.getElementById('editEvent').click();
      }
    },

    closeModal() {
      this.resetForm();
      document.querySelector('[data-modal-close="addEventModal"]').click();
      this.errors = {};
    },

    resetForm() {
      this.form.eventName = '';
      this.form.eventDate = '';
      this.form.endEventDate = '';
      this.form.eventTime = '';
      this.form.class = document.querySelector('#ColorSelect').setValue('');
      this.form.location = '';
      this.form.guestEmail = '';
      this.form.guests = [];
      this.errors = {};
    },

    handleDrop(info) {
      const eventData = {
        title: info.draggedEl.innerText,
        className: info.draggedEl.getAttribute('class')
      };
      this.calendar.addEvent({
        title: eventData.title,
        start: info.date,
        allDay: true
      });
    },

    renderEventContent(info) {
      const containerEl = document.createElement('div');
      const titleEl = document.createElement('div');
      titleEl.classList.add('fc-event-title', 'grow');
      titleEl.innerText = info.event.title;
      containerEl.appendChild(titleEl);
      if (info.event.extendedProps.guests) {
        const guestsEl = document.createElement('div');
        guestsEl.classList.add('fc-event-guests', '-space-x-3', 'flex');
        info.event.extendedProps.guests.forEach((guest) => {
          const imgEl = document.createElement('img');
          imgEl.src = guest;
          imgEl.alt = guest.name;
          imgEl.style.width = '20px';
          imgEl.style.height = '20px';
          imgEl.style.borderRadius = '50%';
          imgEl.style.marginRight = '5px';
          guestsEl.appendChild(imgEl);
        });
        containerEl.appendChild(guestsEl);
      }
      containerEl.classList.add('flex', 'cursor-pointer');
      return { domNodes: [containerEl] };
    }
  };
}
// Payment Status Select
VirtualSelect.init({
  ele: '#ColorSelect',
  options: [
    { label: 'Blue', value: 'primary' },
    { label: 'Green', value: 'green' },
    { label: 'Purple', value: 'purple' }
  ]
});

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('alpine:init', () => {
    Alpine.data('calendarApp', calendarApp);
  });
});
