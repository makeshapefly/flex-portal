/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: teachers List init Js File
*/

import '../../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import teachersData from '../../../../json/apps/school/teachers/teachers-list';

//Teacher List table

function teachersTable() {
  return {
    teachers: [],
    filteredTeachers: [],
    sortBy: '',
    deleteTeacher: '',
    searchTerm: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    currentPage: 1,
    itemsPerPage: 10,
    showAddTeacherForm: false,
    showEditTeacherForm: false,
    errors: {},
    teacherForm: {
      teacherID: '',
      title: '',
      teacherName: '',
      email: '',
      phone: '',
      salary: '',
      experience: '',
      lastSchool: '',
      date: ''
    },
    handleModal(modal) {
      if (modal === 'showAddTeacherForm') {
        this.showAddTeacherForm = true;
        this.showEditTeacherForm = false;
        this.resetForm();
      } else {
        this.showEditTeacherForm = true;
        this.showAddTeacherForm = false;
        this.resetForm();
      }
    },
    addTeacher() {
      this.teacherForm.teacherID = 'PET-' + (2551 + this.teachers.length).toString();
      var title = document.querySelector('#titleSelect').value;
      this.filteredTeachers.unshift({ ...this.teacherForm, title: title });
    },
    editTeacher(index) {
      this.handleModal('showEditTeacherForm');
      this.teacherForm = { ...this.teachers.find((Teacher) => Teacher.teacherID === index) };
      var title = document.querySelector('#titleSelect');
      title?.setValue(this.teacherForm.title);
    },
    updateTeacher() {
      const index = this.teachers.findIndex(
        (Teacher) => Teacher.teacherID === this.teacherForm.teacherID
      );
      var title = document.querySelector('#titleSelect').value;
      this.filteredTeachers[index] = { ...this.teacherForm, title: title };
      this.resetForm();
    },

    validateForm() {
      this.errors = {};
      this.validateField('teacherName', this.teacherForm.teacherName, 'Teacher name is required.');
      this.validateField('email', this.teacherForm.email, 'Email is required.');
      this.validatePhone();
      this.validateField('phone', this.teacherForm.phone, 'Phone is required.');
      this.validateField('experience', this.teacherForm.experience, 'Experience is required.');
      this.validateField('lastSchool', this.teacherForm.lastSchool, 'Last school is required.');
      this.validateField('date', this.teacherForm.date, 'Date is required.');
      this.validateField('salary', this.teacherForm.salary, 'Salary is required.');
      this.validateField(
        'title',
        document.querySelector('#titleSelect').value,
        'Title is required.'
      );
      return Object.keys(this.errors).length === 0;
    },

    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue) {
        this.errors[fieldName] = errorMessage;
      } else {
        delete this.errors[fieldName];
      }
    },
    validatePhone() {
      const phonePattern = /^[0-9]{10}$/; // 10 digits only
      this.errors.phone = !phonePattern.test(this.teacherForm.phone)
        ? 'Phone number must be 10 digits and numeric'
        : '';
    },
    submitForm() {
      if (this.validateForm()) {
        if (this.showAddTeacherForm) this.addTeacher();
        else this.updateTeacher();
        document.body.classList.toggle('overflow-hidden', false);
        this.resetForm();
        this.showEditTeacherForm = false;
        this.showAddTeacherForm = false;
      }
    },

    resetForm() {
      this.errors = {};
      var title = document.querySelector('#titleSelect');
      this.teacherForm = {
        teacherID: '',
        title: title?.setValue(''),
        teacherName: '',
        email: '',
        phone: '',
        salary: '',
        experience: '',
        lastSchool: '',
        date: ''
      };
    },
    get totalPages() {
      return Math.ceil(this.filteredTeachers.length / this.itemsPerPage);
    },
    get displayedTeachers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.filteredTeachers.slice(start, end).map((teacher) => ({
        ...teacher,
        formattedDate: this.formatDate(teacher.date),
        avatarText: this.generateAvatarText(teacher.teacherName)
      }));
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filteredTeachers.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredTeachers.length);
    },
    init() {
      let startID = 2551; // Starting ID
      teachersData.forEach((teacher, index) => {
        // Generate teacherID starting from "PET-1595"
        teacher.teacherID = 'PET-' + (startID + index).toString();
        teacher.image = teacher.image || '';
      });
      this.teachers = teachersData;
      this.filterTeachers();
    },
    filterTeachers() {
      this.filteredTeachers = this.teachers;
      const searchTerm = this.searchTerm.toLowerCase();

      if (searchTerm) {
        this.filteredTeachers = this.filteredTeachers.filter((teacher) => {
          return Object.values(teacher).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
    },
    deleteTeacher() {
      if (this.deleteTeacher) {
        const index = this.teachers.findIndex((teacher) => teacher.email === this.deleteTeacher);
        if (index !== -1) this.teachers.splice(index, 1);
      }
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
      this.teachers.sort((a, b) => {
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
  Alpine.data('teachersTable', teachersTable);
});

//title Select
VirtualSelect.init({
  ele: '#titleSelect',
  options: [
    { label: 'Teacher', value: 'Teacher' },
    { label: 'Professor', value: 'Professor' },
    { label: 'Assistant', value: 'Assistant' },
    { label: 'Lecturer', value: 'Lecturer' },
    { label: 'Instructor', value: 'Instructor' },
    { label: 'Senior Lecturer', value: 'Senior Lecturer' },
    { label: 'Associate Professor', value: 'Associate Professor' },
    { label: 'Assistant Professor', value: 'Assistant Professor' }
  ]
});
