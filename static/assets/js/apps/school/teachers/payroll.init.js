/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: payroll init Js File
*/

import '../../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import payrollData from '../../../../json/apps/school/teachers/payroll';

//payroll table
function payrollTable() {
  return {
    payrolls: [],
    filterPayrolls: [],
    sortBy: '',
    searchTerm: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    currentPage: 1,
    itemsPerPage: 10,
    get totalPages() {
      return Math.ceil(this.filterPayrolls.length / this.itemsPerPage);
    },
    get displayedPayrolls() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filterPayrolls.slice(start, end).map((teacher) => ({
        ...teacher,
        formattedDate: this.formatDate(teacher.date),
        avatarText: this.generateAvatarText(teacher.teacherName)
      }));
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filterPayrolls.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filterPayrolls.length);
    },
    init() {
      let startID = 1098; // Starting ID
      payrollData.forEach((payroll, index) => {
        // Generate payrollID starting from "PEP-1595"
        payroll.payrollID = 'PEP-' + (startID + index).toString();
        payroll.image = payroll.image || '';
      });
      this.payrolls = payrollData;
      this.filteredPayrolls();
    },
    filteredPayrolls() {
      this.filterPayrolls = this.payrolls;
      const searchTerm = this.searchTerm.toLowerCase();

      if (searchTerm) {
        this.filterPayrolls = this.filterPayrolls.filter((project) => {
          return Object.values(project).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
      const sorting = document.querySelector('#sorting').value;
      if (sorting) {
        if (sorting == 'all') return this.sort(null);
        else return this.sort(sorting);
      } else return this.sort(null);
    },
    formatDate(dateString) {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
      return formattedDate.replace(/(?<=\d) (?=\d{4})/, ', ');
    },
    generateAvatarText(name) {
      const nameParts = name.split(' ');
      if (nameParts.length > 1) {
        return nameParts[0][0] + nameParts[1][0];
      }
      return name[0];
    },
    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }

      this.payrolls.sort((a, b) => {
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
    removeImage(event) {
      const image = event.target;
      const container = image.parentNode;
      image.style.display = 'none';
      container.querySelector('span').style.display = 'flex';
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('payrollTable', payrollTable);
});

//sorting Select
VirtualSelect.init({
  ele: '#sorting',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Status', value: 'status' },
    { label: 'Taxes', value: 'taxes' },
    { label: 'Teachers', value: 'teacherName' }
  ]
});
