/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: List View init Js File
*/

import '../../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import studentsListData from '../../../../json/apps/school/students/students-list';

//Students List table
function studentsTable() {
  return {
    students: [],
    filteredStudents: [],
    searchStudent: '',
    sortBy: '',
    deleteStudent: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    currentPage: 1,
    itemsPerPage: 10,
    get totalPages() {
      return Math.ceil(this.filteredStudents.length / this.itemsPerPage);
    },
    get displayedStudents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.filteredStudents.slice(start, end).map((student) => ({
        ...student,
        formattedDate: this.formatDate(student.date),
        avatarText: this.generateAvatarText(student.studentName)
      }));
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filteredStudents.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredStudents.length);
    },
    init() {
      let startID = 1595; // Starting ID
      studentsListData.forEach((student, index) => {
        student.studentID = 'PES-' + (startID + index).toString();
      });
      this.students = studentsListData;
      this.filterStudents();
    },
    filterStudents() {
      this.filteredStudents = this.students;
      const searchTerm = this.searchStudent.toLowerCase();
      if (searchTerm) {
        this.filteredStudents = this.filteredStudents.filter((project) => {
          return Object.values(project).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
      const studentClass = document.querySelector('#sortingByClass').value;

      if (studentClass) {
        this.filteredStudents = this.students.filter((project) => {
          return project.class == studentClass;
        });
      }
    },
    deletedStudent() {
      const index = this.filteredStudents.findIndex(
        (student) => student.studentID == this.deleteStudent
      );
      this.filteredStudents.splice(index, 1);
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

      this.students.sort((a, b) => {
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
  Alpine.data('studentsTable', studentsTable);
});

//sorting Select
VirtualSelect.init({
  ele: '#sortingByClass',
  options: [
    { label: '12 (A)', value: '12 (A)' },
    { label: '12 (B)', value: '12 (B)' },
    { label: '11 (A)', value: '11 (A)' },
    { label: '11 (B)', value: '11 (B)' },
    { label: '10 (A)', value: '10 (A)' },
    { label: '10 (B)', value: '10 (B)' },
    { label: '9', value: '9' },
    { label: '8', value: '8' }
  ]
});
