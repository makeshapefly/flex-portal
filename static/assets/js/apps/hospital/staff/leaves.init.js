/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: leave init Js File
*/

import '../../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import leavesData from '../../../../json/apps/hospital/staff/leaves';

//Status Select
VirtualSelect.init({
  ele: '#statusSelect',
  options: [
    { label: 'All', value: 'All' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Rejected', value: 'Rejected' }
  ]
});

//Leaves table
function leavesTable() {
  return {
    leaves: [],
    sortBy: '',
    sortDirection: 'asc',
    filterLeaves: [],
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    searchTerm: '',
    dateRange: [],
    currentPage: 1,
    itemsPerPage: 10,

    get totalPages() {
      return Math.ceil(this.filterLeaves.length / this.itemsPerPage);
    },
    get displayedLeaves() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filterLeaves.slice(start, end);
    },
    filteredLeaves() {
      this.filterLeaves = this.leaves;

      const searchTerm = this.searchTerm.trim().toLowerCase();
      const status = document.querySelector('#statusSelect').value;
      const startDate = this.dateRange[0];
      const endDate = this.dateRange[1];
      function formatDate(inputDate) {
        const months = [
          'Jan',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ];
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month}, ${year}`;
      }
      // Filter by search term
      if (searchTerm) {
        this.filterLeaves = this.filterLeaves.filter((leave) => {
          return Object.values(leave).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
      // Filter by status
      if (status && status !== 'All')
        this.filterLeaves = this.filterLeaves.filter((leave) => leave.status === status);
      // Filter by date range
      if (startDate || endDate) {
        const changeStartDate = formatDate(startDate);
        const changeEndDate = formatDate(endDate);

        this.filterLeaves = this.filterLeaves.filter((leave) => {
          const leaveDate = new Date(leave.startDate);
          const startDateObj = new Date(changeStartDate);
          const endDateObj = new Date(changeEndDate);
          return leaveDate >= startDateObj && leaveDate <= endDateObj;
        });
      }
      return this.filterLeaves;
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filterLeaves.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filterLeaves.length);
    },
    get availableLeaveCount() {
      // Calculate the count of available leaves
      return this.leaves.filter((leave) => leave.status === 'Available').length;
    },
    get usedLeaveCount() {
      // Calculate the count of used leaves
      return this.leaves.filter((leave) => leave.status === 'Approved').length;
    },
    get pendingLeaveCount() {
      // Calculate the count of pending leaves
      return this.leaves.filter((leave) => leave.status === 'Pending').length;
    },
    get rejectedLeaveCount() {
      // Calculate the count of rejected leaves
      return this.leaves.filter((leave) => leave.status === 'Rejected').length;
    },
    get totalLeaveCount() {
      // Calculate the total count of leaves
      return this.leaves.length;
    },
    init() {
      let startID = 15015; // Starting ID
      leavesData.forEach((leave, index) => {
        leave.leaveID = 'PEA-' + (startID + index).toString();
        leave.totalDays = this.calculateTotalDays(leave.startDate, leave.endDate);
      });
      this.leaves = leavesData;
      this.filteredLeaves();
      this.initFlatpickr();
    },
    calculateTotalDays(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Adding 1 to include both start and end date
      return diffDays;
    },
    sort(column) {
      if (column === this.sortBy)
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.leaves.sort((a, b) => {
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
    },
    approveLeave(selectLeave) {
      const index = this.leaves.findIndex((leave) => leave == selectLeave);
      this.leaves[index].status = 'Approved';
    },
    rejectedLeave(selectLeave) {
      const index = this.leaves.findIndex((leave) => leave == selectLeave);
      this.leaves[index].status = 'Rejected';
    },
    initFlatpickr() {
      flatpickr(this.$refs.dateRangePicker, {
        mode: 'range',
        onChange: (selectedDates, dateStr, instance) => {
          this.dateRange = selectedDates.map((date) => date.toISOString().split('T')[0]);
          this.dateRange = selectedDates.map((date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          });
          this.filteredLeaves();
        }
      });
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('leavesTable', leavesTable);
});
