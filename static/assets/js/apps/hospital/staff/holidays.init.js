/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: holiday init Js File
*/

import holidayData from '../../../../json/apps/hospital/staff/holiday';

//Holiday table
function holidaysTable() {
  return {
    holidays: [],
    filterHolidays: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    currentPage: 1,
    itemsPerPage: 10,
    errors: {},
    showViewHolidayForm: false,
    showAddHolidayForm: false,
    showEditHolidayForm: false,
    deleteHolidayList: '',
    holidayForm: {
      name: '',
      date: '',
      day: ''
    },
    addHoliday() {
      this.holidayForm.holidayID = 'PEH-' + (14521 + (this.holidays.length + 1)).toString();
      this.holidays.push({
        ...this.holidayForm,
        holidayID: this.holidayForm.holidayID,
        date: this.formatDate(this.holidayForm.date)
      });
      this.showAddHolidayForm = false;
    },
    editHoliday(data) {
      this.handleModal('showEditHolidayForm');
      this.holidayForm = { ...this.holidays.find((product, index) => index === data) };
    },
    updateHoliday() {
      const index = this.holidays.findIndex(
        (product) => product.holidayID === this.holidayForm.holidayID
      );
      this.holidays[index] = this.holidayForm;
      this.showEditHolidayForm = false;
      this.showAddHolidayForm = false;
    },
    validateForm() {
      this.errors = {};
      this.validateField('name', this.holidayForm.name, 'Holiday name is required.');
      this.validateField('date', this.holidayForm.date, 'Date is required.');
      this.validateField('day', this.holidayForm.day, 'Day is required.');

      return Object.keys(this.errors).length === 0;
    },
    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue) this.errors[fieldName] = errorMessage;
      else delete this.errors[fieldName];
    },
    handleModal(modal) {
      if (modal === 'showAddHolidayForm') {
        this.showAddHolidayForm = true;
        this.showEditHolidayForm = false;
        this.resetForm();
      } else if (modal === 'showEditHolidayForm') {
        this.showEditHolidayForm = true;
        this.showAddHolidayForm = false;
        this.resetForm();
      } else {
        this.showEditHolidayForm = false;
        this.showAddHolidayForm = false;
      }
    },
    submitForm() {
      if (this.validateForm()) {
        if (this.showAddHolidayForm) this.addHoliday();
        else this.updateHoliday();
        this.resetForm();
        document.body.classList.toggle('overflow-hidden', false);
        this.showEditHolidayForm = false;
        this.showAddHolidayForm = false;
      }
    },
    resetForm() {
      this.errors = {};
      this.holidayForm = {
        name: '',
        date: '',
        day: ''
      };
    },
    deleteHoliday() {
      this.holidays.forEach((product, index) => {
        if (product.holidayID == this.deleteHolidayList) this.holidays.splice(index, 1);
      });
    },
    // end of changes
    get totalPages() {
      return Math.ceil(this.holidays.length / this.itemsPerPage);
    },
    get displayedHolidays() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.holidays.slice(start, end).map((holiday) => ({
        ...holiday,
        formattedDate: this.formatDate(holiday.date)
      }));
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.holidays.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.holidays.length);
    },
    init() {
      let startID = 1595; // Starting ID
      holidayData.forEach((holiday, index) => {
        // Generate holidayID starting from "PEH-24151"
        holiday.holidayID = 'PEH-' + (startID + index).toString();
      });
      setTimeout(() => {
        drawerSetting();
      }, 0);
      this.holidays = holidayData;
    },
    formatDate(dateString) {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
      return formattedDate.replace(/(?<=\d) (?=\d{4})/, ', ');
    },
    sort(column) {
      if (column === this.sortBy)
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.holidays.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        let comparison = 0;
        if (valueA > valueB) comparison = 1;
        else if (valueA < valueB) comparison = -1;
        return this.sortDirection === 'desc' ? comparison * -1 : comparison;
      });
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    gotoPage(page) {
      this.currentPage = page;
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('holidaysTable', holidaysTable);
});
