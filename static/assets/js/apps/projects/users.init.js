/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: user list init Js File
*/

import usersData from '../../../json/apps/projects/users-list';
import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';

function userListGrid() {
  return {
    users: [],
    currentPage: 1,
    itemsPerPage: 8,
    filter: '',
    loaded: false,
    init() {
      this.users = usersData;
      this.loaded = true;
    },
    get filteredUsers() {
      if (this.filter === '') return this.users;
      const now = new Date();
      const filterOptions = {
        'Last Month': () => {
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          return this.users.filter((user) => new Date(user.date) >= lastMonth);
        },
        'This Month': () => {
          const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          return this.users.filter((user) => new Date(user.date) >= thisMonth);
        },
        'Last Week': () => {
          const lastWeek = new Date();
          lastWeek.setDate(now.getDate() - 7);
          return this.users.filter((user) => new Date(user.date) >= lastWeek);
        },
        'Last Year': () => {
          const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
          return this.users.filter((user) => new Date(user.date) >= lastYear);
        },
        'This Year': () => {
          const thisYear = new Date(now.getFullYear(), 0, 1);
          return this.users.filter((user) => new Date(user.date) >= thisYear);
        }
      };

      return filterOptions[this.filter]();
    },
    get totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    },
    get displayedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredUsers.slice(start, end);
    },
    get showingStart() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredUsers.length);
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
    updateFilter(value) {
      this.filter = value;
      this.currentPage = 1; // Reset to first page on filter change
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('userListGrid', userListGrid);
  // Initialize VirtualSelect and bind it to Alpine.js
  VirtualSelect.init({
    ele: '#filterSelect',
    options: [
      { label: 'All', value: '' },
      { label: 'Last Month', value: 'Last Month' },
      { label: 'This Month', value: 'This Month' },
      { label: 'Last Week', value: 'Last Week' },
      { label: 'Last Year', value: 'Last Year' },
      { label: 'This Year', value: 'This Year' }
    ],
    onChange: function (event) {
      const filterValue = event.currentTarget.value;
      document.querySelector('[x-data]').__x.$data.updateFilter(filterValue);
    }
  });
});
