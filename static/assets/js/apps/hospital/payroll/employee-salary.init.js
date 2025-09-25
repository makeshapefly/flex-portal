/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: employee salary init Js File
*/

import employeeSalaryData from '../../../../json/apps/hospital/payroll/employee-salary';

//Holiday table
function employeesTable() {
  return {
    employees: [],
    deleteEmployee: '',
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    currentPage: 1,
    itemsPerPage: 10,
    get totalPages() {
      return Math.ceil(this.employees.length / this.itemsPerPage);
    },
    get displayedEmployees() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.employees.slice(start, end).map((holiday) => ({
        ...holiday,
        formattedDate: this.formatDate(holiday.date)
      }));
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.employees.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.employees.length);
    },
    init() {
      let startID = 1595; // Starting ID
      employeeSalaryData.forEach((holiday, index) => {
        // Generate holidayID starting from "PEH-24151"
        holiday.holidayID = 'PEH-' + (startID + index).toString();
      });
      setTimeout(() => {
        drawerSetting();
      }, 0);
      this.employees = employeeSalaryData;
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

      this.employees.sort((a, b) => {
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

    deleteSalary() {
      this.employees.forEach((employee) => {
        if (employee.employeeName === this.deleteEmployee) {
          this.employees.splice(this.employees.indexOf(employee), 1);
        }
      });
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('employeesTable', employeesTable);
});
