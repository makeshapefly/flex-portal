/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: list input init Js File
*/

import '../../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import appointmentsData from '../../../../json/apps/hospital/appointments/appointments';
import todayAppointmentData from '../../../../json/apps/hospital/appointments/today-appointment';

//appointment table
function todayAppointmentTable() {
  return {
    appointments: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    currentPage: 1,
    itemsPerPage: 4,
    showAll: false,
    get totalPages() {
      return Math.ceil(this.appointments.length / this.itemsPerPage);
    },
    get displayedAppointments() {
      if (this.showAll) {
        return this.appointments;
      }
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.appointments.slice(start, end);
    },
    init() {
      let startID = 15475;
      todayAppointmentData.forEach((appointment, index) => {
        appointment.appointmentID = 'PEI-' + (startID + index).toString();
      });
      setTimeout(() => {
        drawerSetting();
      }, 0);
      this.appointments = todayAppointmentData;
    },

    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.appointments.sort((a, b) => {
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
    toggleShowAll() {
      this.showAll = !this.showAll;
    },
    gotoPage(page) {
      this.currentPage = page;
    }
  };
}

//Appointments table
function appointmentsTable() {
  return {
    appointments: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    currentPage: 1,
    itemsPerPage: 10,
    selectedAppointment: {},
    deleteAppoint: {},
    get totalPages() {
      return Math.ceil(this.appointments.length / this.itemsPerPage);
    },
    get displayedAppointments() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.appointments.slice(start, end).map((appointment) => ({
        ...appointment,
        avatarText: this.generateAvatarText(appointment.patientName)
      }));
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.appointments.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.appointments.length);
    },
    get totalAppointments() {
      return this.appointments.length;
    },
    reviewAppointment(appointment) {
      this.selectedAppointment = appointment;
    },
    init() {
      let startID = 22697; // Starting ID
      appointmentsData.forEach((appointment, index) => {
        // Generate categoryID starting from "PEA-*"
        appointment.appointmentID = 'PEA-' + (startID + index).toString();
      });
      this.appointments = appointmentsData;
    },
    generateAvatarText(patientName) {
      const nameParts = patientName.split(' ');
      if (nameParts.length > 1) {
        return nameParts[0][0] + nameParts[1][0];
      }
      return patientName[0];
    },
    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }

      this.appointments.sort((a, b) => {
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
    removeImage(event) {
      const image = event.target;
      const container = image.parentNode;
      image.style.display = 'none';
      container.querySelector('span').style.display = 'flex';
    },
    cancelAppointment() {
      this.appointments.forEach((appointment) => {
        if (appointment.appointmentID === this.selectedAppointment.appointmentID) {
          this.appointments.splice(this.appointments.indexOf(appointment), 1);
        }
      });
    },
    deleteAppointment() {
      this.appointments.forEach((appointment) => {
        if (appointment.appointmentID === this.deleteAppoint.appointmentID) {
          this.appointments.splice(this.appointments.indexOf(appointment), 1);
        }
      });
    }
  };
}

function bookForm() {
  return {
    form: {
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      doctorName: '',
      treatment: ''
    },
    errors: {},
    validateForm(e) {
      this.errors = {};
      this.validateField('name', this.form.name, 'Patient name is required.');
      this.validateField('email', this.form.email, 'Email is required.');
      this.validateField('phone', this.form.phone, 'Phone is required.');
      this.validateField('date', this.form.date, 'Date is required.');
      this.validateField(
        'doctorName',
        document.querySelector('#doctorSelect').value,
        'Doctor name is required.'
      );
      this.validateField('treatment', this.form.treatment, 'Treatment is required.');

      const form = e.target.closest('form');
      this.validateRadioGroup(form, 'startTime', 'startTime');
      this.validateRadioGroup(form, 'endTime', 'endTime');

      return Object.keys(this.errors).length === 0;
    },

    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue) this.errors[fieldName] = errorMessage;
      else delete this.errors[fieldName];
    },

    validateRadioGroup(form, groupName, errorKey) {
      const radioButtons = form.querySelectorAll(`input[name="${groupName}"]`);
      const isChecked = Array.from(radioButtons).some((radio) => radio.checked);

      if (!isChecked)
        this.errors[errorKey] =
          `${groupName.charAt(0).toUpperCase() + groupName.slice(1)} is required.`;
      else delete this.errors[errorKey];

      // Add event listeners for real-time validation
      radioButtons.forEach((radio) => {
        radio.addEventListener('change', () => {
          this.validateRadioGroup(form, groupName, errorKey);
        });
      });
    },

    onSubmit(e) {
      e.preventDefault();
      const form = e.target.closest('form');
      this.validateForm(e) ? form.reset() : form.reportValidity();
    },
    reset(e) {
      this.errors = {};
      const form = e.target.closest('form');
      form.reset();
    }
  };
}

function callModal() {
  return {
    isMuted: false,
    isCalling: false,
    callDuration: 0,
    intervalId: null,
    timeoutId: null,
    callModalOpen: false,
    toggleMute() {
      this.isMuted = !this.isMuted;
    },
    startCall() {
      this.resetCall();
      this.isCalling = true;
      this.timeoutId = setTimeout(() => {
        if (this.isCalling) {
          this.isCalling = false;
          this.startTimer();
        }
      }, 4000);
    },
    startTimer() {
      this.intervalId = setInterval(() => {
        this.callDuration++;
      }, 1000);
    },
    stopCall() {
      this.callModalOpen = false;
      this.stopTimer();
      clearTimeout(this.timeoutId);
      this.callDuration = 0;
      this.resetCall();
    },
    resetCall() {
      this.callDuration = 0;
    },
    stopTimer() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },
    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    },
    // Ensure cleanup on modal close or component destruction
    beforeDestroy() {
      this.stopCall();
    }
  };
}
// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('todayAppointmentTable', todayAppointmentTable);
  Alpine.data('appointmentsTable', appointmentsTable);
  Alpine.data('callModal', callModal);
  Alpine.data('bookForm', bookForm);
});

//doctor select
VirtualSelect.init({
  ele: '#doctorSelect',
  options: [
    { label: 'Dr. Michael Johnson', value: 'Dr. Michael Johnson' },
    { label: 'Dr. Sarah Evans', value: 'Dr. Sarah Evans' },
    { label: 'Dr. Emily Carter', value: 'Dr. Emily Carter' },
    { label: 'Dr. Robert Harris', value: 'Dr. Robert Harris' }
  ]
});
