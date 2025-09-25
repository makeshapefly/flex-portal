/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: create leave init Js File
*/

import '../../../../../../node_modules/virtual-select-plugin/dist/virtual-select';

//Status Select
function leaveForm() {
  return {
    leaveForm: {
      leaveType: '',
      contactNumber: '',
      emergencyNumber: '',
      startDate: '',
      endDate: '',
      reason: '',
      totalDays: 0
    },
    errors: {},
    leaves: {
      casual: 11,
      sick: 1,
      maternity: 1,
      emergency: 2,
      vacation: 3
    },
    totalLeave: function () {
      return (
        this.leaves.casual +
        this.leaves.sick +
        this.leaves.maternity +
        this.leaves.emergency +
        this.leaves.vacation
      );
    },
    init() {
      this.resetForm();
    },
    validateForm() {
      this.errors = {};
      this.validateField(
        'leaveType',
        document.querySelector('#leaveTypeSelect').value,
        'Leave type is required.'
      );
      this.validateField(
        'contactNumber',
        this.leaveForm.contactNumber,
        'Contact number is required.'
      );
      this.validateField(
        'emergencyNumber',
        this.leaveForm.emergencyNumber,
        'Emergency number is required.'
      );
      this.validateField('startDate', this.leaveForm.startDate, 'Start date is required.');
      this.validateField('endDate', this.leaveForm.endDate, 'End date is required.');
      this.validateField('reason', this.leaveForm.reason, 'Reason is required.');

      return Object.keys(this.errors).length === 0;
    },

    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue) this.errors[fieldName] = errorMessage;
      else delete this.errors[fieldName];
    },
    resetForm() {
      this.errors = {};
      const leaveType = document.querySelector('#leaveTypeSelect');
      this.leaveForm = {
        leaveType: leaveType.setValue(''),
        contactNumber: '',
        emergencyNumber: '',
        startDate: '',
        endDate: '',
        reason: ''
      };
    },
    calculateTotalDays() {
      const startDate = new Date(this.leaveForm.startDate);
      const endDate = new Date(this.leaveForm.endDate);
      if (!isNaN(startDate) && !isNaN(endDate)) {
        const differenceInTime = endDate - startDate;
        this.leaveForm.totalDays =
          differenceInTime >= 0 ? Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1 : 0;
      } else this.leaveForm.totalDays = 0;
    },
    submitForm(event) {
      event.preventDefault();
      if (this.validateForm()) {
        const leaveType = document.querySelector('#leaveTypeSelect').value;
        this.leaves[leaveType] = this.leaves[leaveType] + 1;
        this.totalLeave();
        this.resetForm();
      }
    }
  };
}

document.addEventListener('alpine:init', () => {
  Alpine.data('leaveForm', leaveForm);
});

VirtualSelect.init({
  ele: '#leaveTypeSelect',
  options: [
    { label: 'Casual Leave', value: 'casual' },
    { label: 'Sick Leave', value: 'sick' },
    { label: 'Maternity Leave', value: 'maternity' },
    { label: 'Emergency Leave', value: 'emergency' },
    { label: 'Vacation Leave', value: 'vacation' }
  ]
});
