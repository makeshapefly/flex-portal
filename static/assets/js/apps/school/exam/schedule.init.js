/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: schedule init Js File
*/

import '../../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import examListData from '../../../../json/apps/school/exam/exam-list';

//STD Filter select
document.addEventListener('DOMContentLoaded', function () {
  VirtualSelect.init({
    ele: '#stdFilterSelect',
    options: [
      { label: 'All', value: 'All' },
      { label: 'STD 12', value: '12' },
      { label: 'STD 11', value: '11' },
      { label: 'STD 10', value: '10' },
      { label: 'STD 9', value: '9' },
      { label: 'STD 8', value: '8' },
      { label: 'STD 7', value: '7' },
      { label: 'STD 6', value: '6' }
    ]
  });
  //Date Filter select
  VirtualSelect.init({
    ele: '#dateFilterSelect',
    options: [
      { label: 'All', value: 'All' },
      { label: 'Today', value: 'Today' },
      { label: 'Tomorrow', value: 'Tomorrow' },
      { label: 'Weekly', value: 'Weekly' },
      { label: 'Monthly', value: 'Monthly' },
      { label: 'Yearly', value: 'Yearly' }
    ]
  });
  //Test Category select
  VirtualSelect.init({
    ele: '#testCategorySelect',
    options: [
      { label: 'Final Test', value: 'Final Test' },
      { label: 'Practice Test', value: 'Practice Test' },
      { label: 'Midterm Test', value: 'Midterm Test' },
      { label: 'Quarterly Test', value: 'Quarterly Test' }
    ]
  });
  //Test Type select
  VirtualSelect.init({
    ele: '#testTypeSelect',
    options: [
      { label: 'General', value: 'General' },
      { label: 'Formative', value: 'Formative' },
      { label: 'Summative', value: 'Summative' },
      { label: 'Online', value: 'Online' },
      { label: 'Rejoining', value: 'Rejoining' }
    ]
  });
  //Class select
  VirtualSelect.init({
    ele: '#classSelect',
    options: [
      { label: 'STD 6', value: '6' },
      { label: 'STD 7', value: '7' },
      { label: 'STD 8', value: '8' },
      { label: 'STD 9', value: '9' },
      { label: 'STD 10', value: '10' },
      { label: 'STD 11', value: '11' },
      { label: 'STD 12', value: '12' }
    ]
  });
  //Status select
  VirtualSelect.init({
    ele: '#statusSelect',
    options: [
      { label: 'New', value: 'New' },
      { label: 'Scheduled', value: 'Scheduled' },
      { label: 'Completed', value: 'Completed' }
    ]
  });
});
function circleProgress(initialPercent) {
  return {
    percent: initialPercent,
    circumference: 2 * Math.PI * 16,
    get progress() {
      return this.circumference - (this.percent / 100) * this.circumference;
    },
    animateProgress() {
      setTimeout(() => {
        this.percent = this.percent;
      }, 100);
    }
  };
}
//schedules List table
function scheduleTable() {
  return {
    schedules: [],
    filterSchedules: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    deleteItem: '',
    // change
    showAddScheduleForm: false,
    showEditScheduleForm: false,
    errors: {},
    scheduleForm: {
      scheduleID: '',
      testName: '',
      testCategory: '',
      testType: '',
      class: '',
      startDate: '',
      endDate: '',
      status: ''
    },
    handleModal(modal) {
      if (modal === 'showAddScheduleForm') {
        this.showAddScheduleForm = true;
        this.showEditScheduleForm = false;
      } else {
        this.showEditScheduleForm = true;
        this.showAddScheduleForm = false;
      }
    },
    addSchedule() {
      this.scheduleForm.scheduleID = 'PEE-' + (498 + this.schedules.length).toString();
      var Category = document.querySelector('#testCategorySelect').value;
      var Type = document.querySelector('#testTypeSelect').value;
      var Class = document.querySelector('#classSelect').value;
      var status = document.querySelector('#statusSelect').value;
      this.filterSchedules.unshift({
        ...this.scheduleForm,
        testCategory: Category,
        testType: Type,
        class: Class,
        status: status
      });
    },
    editSchedule(index) {
      this.handleModal('showEditScheduleForm');
      this.scheduleForm = {
        ...this.filterSchedules.find((schedule) => schedule.scheduleID === index)
      };
      document.querySelector('#testTypeSelect').setValue(this.scheduleForm.testType);
      document.querySelector('#classSelect').setValue(this.scheduleForm.class);
      document.querySelector('#testCategorySelect').setValue(this.scheduleForm.testCategory);
      document.querySelector('#statusSelect').setValue(this.scheduleForm.status);
    },
    updateSchedule() {
      const index = this.filterSchedules.findIndex(
        (schedule) => schedule.scheduleID === this.scheduleForm.scheduleID
      );
      var Category = document.querySelector('#testCategorySelect').value;
      var Type = document.querySelector('#testTypeSelect').value;
      var Class = document.querySelector('#classSelect').value;
      var status = document.querySelector('#statusSelect').value;
      this.filterSchedules[index] = {
        ...this.scheduleForm,
        testCategory: Category,
        testType: Type,
        class: Class,
        status: status
      };
      this.resetForm();
    },
    validateForm() {
      this.errors = {};
      this.validateField('testName', this.scheduleForm.testName, 'Test name is required.');
      this.validateField(
        'testCategory',
        document.querySelector('#testCategorySelect').value,
        'Test Category is required.'
      );
      this.validateField(
        'testType',
        document.querySelector('#testTypeSelect').value,
        'Test Type is required.'
      );
      this.validateField(
        'class',
        document.querySelector('#classSelect').value,
        'Class is required.'
      );
      this.validateField('startDate', this.scheduleForm.startDate, 'Start Date is required.');
      this.validateField('endDate', this.scheduleForm.endDate, 'End Date is required.');
      this.validateField(
        'status',
        document.querySelector('#statusSelect').value,
        'Status is required.'
      );
      return Object.keys(this.errors).length === 0;
    },
    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue) this.errors[fieldName] = errorMessage;
      else delete this.errors[fieldName];
    },
    submitForm() {
      if (this.validateForm()) {
        if (this.showAddScheduleForm) this.addSchedule();
        else this.updateSchedule();
        document.body.classList.toggle('overflow-hidden', false);
        this.resetForm();
        this.showEditScheduleForm = false;
        this.showAddScheduleForm = false;
      }
    },
    resetForm() {
      this.errors = {};
      var Category = document.querySelector('#testCategorySelect');
      var Type = document.querySelector('#testTypeSelect');
      var Class = document.querySelector('#classSelect');
      var status = document.querySelector('#statusSelect');
      this.scheduleForm = {
        scheduleID: '',
        testName: '',
        testCategory: Category?.setValue(''),
        testType: Type?.setValue(''),
        class: Class?.setValue(''),
        startDate: '',
        endDate: '',
        status: status?.setValue('')
      };
    },
    // end of change
    deleteSchedule() {
      const index = this.schedules.findIndex((schedule) => schedule.scheduleID === this.deleteItem);
      this.filterSchedules.splice(index, 1);
    },
    currentPage: 1,
    itemsPerPage: 10,
    get totalPages() {
      return Math.ceil(this.filterSchedules.length / this.itemsPerPage);
    },
    get displayedSchedules() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();

      return this.filterSchedules.slice(start, end).map((student) => ({
        ...student,
        formattedDate: this.formatDate(student.date)
      }));
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filterSchedules.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filterSchedules.length);
    },
    init() {
      let startID = 498; // Starting ID
      examListData.forEach((student, index) => {
        // Generate studentID starting from "PEE-498"
        student.scheduleID = 'PEE-' + (startID + index).toString();
        student.image = student.image || '';
      });
      this.schedules = examListData;
      this.filterSchedules = examListData;
      this.filteredSchedules();
    },
    examTypeFilter(type) {
      var counts;
      if (type == 'All') {
        counts = this.filterSchedules;
      } else {
        counts = this.filterSchedules.filter((schedule) => schedule.testType === type);
      }
      return counts.length;
    },
    filteredSchedules() {
      this.filterSchedules = this.schedules;

      // Filter by class
      const sortByClass = document.querySelector('#stdFilterSelect').value;
      if (sortByClass !== 'All' && sortByClass !== '') {
        this.filterSchedules = this.filterSchedules.filter(
          (schedule) => schedule.class === sortByClass
        );
      }

      // Filter by date
      const filterByDate = document.querySelector('#dateFilterSelect').value;
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Ensure the time part is set to midnight
      if (filterByDate !== 'All' && filterByDate !== '') {
        this.filterSchedules = this.filterSchedules.filter((schedule) => {
          const scheduleDate = new Date(schedule.startDate);
          scheduleDate.setHours(0, 0, 0, 0); // Ensure the time part is set to midnight

          switch (filterByDate) {
            case 'Today':
              return scheduleDate.getTime() === currentDate.getTime();
            case 'Tomorrow':
              const tomorrow = new Date(currentDate);
              tomorrow.setDate(currentDate.getDate() + 1);
              return scheduleDate.getTime() === tomorrow.getTime();
            case 'Weekly':
              const startOfWeek = new Date(currentDate);
              startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
              const endOfWeek = new Date(startOfWeek);
              endOfWeek.setDate(startOfWeek.getDate() + 6);
              return scheduleDate >= startOfWeek && scheduleDate <= endOfWeek;
            case 'Monthly':
              const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
              const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
              return scheduleDate >= startOfMonth && scheduleDate <= endOfMonth;
            case 'Yearly':
              const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
              const endOfYear = new Date(currentDate.getFullYear(), 11, 31);
              return scheduleDate >= startOfYear && scheduleDate <= endOfYear;
            default:
              return true;
          }
        });
      }

      // Sort the filtered schedules by date
      this.filterSchedules.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

      return this.filterSchedules;
    },
    formatDate(dateString) {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
      return formattedDate.replace(/(?<=\d) (?=\d{4})/, ', ');
    },
    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.schedules.sort((a, b) => {
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
  Alpine.data('circleProgress', circleProgress);
  Alpine.data('scheduleTable', scheduleTable);
});
