/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: List View init Js File
*/

import '../../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import parentsData from '../../../../json/apps/school/parents/parents-list';

//parents List table

function parentsTable() {
  return {
    parents: [],
    filterParents: [],
    deleteParent: '',
    searchTerm: '',
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    currentPage: 1,
    itemsPerPage: 10,
    imageUrl: '',
    showAddParentsForm: false,
    showEditParentsForm: false,
    errors: {},
    parentsForm: {
      address: '',
      email: '',
      gender: '',
      image: '',
      occupation: '',
      parentsName: '',
      phone: '',
      relation: '',
      studentID: '',
      studentName: ''
    },

    validateForm() {
      this.errors = {};
      this.validateEmailField();
      this.validateField('studentName', this.parentsForm.studentName, 'Student name is required.');
      this.validateField('occupation', this.parentsForm.occupation, 'Occupation is required.');
      this.validateField('relation', this.parentsForm.relation, 'Relation is required.');
      this.validateField('parentsName', this.parentsForm.parentsName, 'Full name is required.');
      this.validatePhone();
      this.validateField('phone', this.parentsForm.phone, 'Phone number is required.');
      this.validateField(
        'gender',
        document.querySelector('#genderSelect').value,
        'Gender is required.'
      );
      return Object.keys(this.errors).length === 0;
    },
    validatePhone() {
      const phonePattern = /^[0-9]{10}$/;
      this.errors.phone = !phonePattern.test(this.parentsForm.phone)
        ? 'Phone number must be 10 digits and numeric'
        : '';
    },
    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue) this.errors[fieldName] = errorMessage;
      else delete this.errors[fieldName];
    },
    validateEmailField() {
      if (!this.parentsForm.email) this.errors.email = 'Email is required.';
      else if (!this.validateEmail(this.parentsForm.email))
        this.errors.email = 'Invalid email format.';
      else delete this.errors.email;
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    },
    handleModal(modal) {
      if (modal === 'showAddParentsForm') {
        this.showAddParentsForm = true;
        this.showEditParentsForm = false;
        this.resetForm();
      } else {
        this.showEditParentsForm = true;
        this.showAddParentsForm = false;
        this.resetForm();
      }
    },
    submitForm() {
      if (this.validateForm()) {
        if (this.showAddParentsForm) {
          this.errors = {};
          this.addParents();
        } else this.updateParents();
        document.body.classList.toggle('overflow-hidden', false);
        this.resetForm();
        this.errors = {};
        this.showEditParentsForm = false;
        this.showAddParentsForm = false;
      }
    },
    addParents() {
      this.parentsForm.studentID = 'PEC-' + (24151 + this.parents.length).toString();
      var gender = document.querySelector('#genderSelect').value;
      this.filterParents.unshift({ ...this.parentsForm, gender: gender, address: '-' });
    },
    editParents(index) {
      this.handleModal('showEditParentsForm');
      // this.showAddParentsForm = false;
      // this.showEditParentsForm = true;
      this.parentsForm = { ...this.parents.find((parents) => parents.studentID === index) };
      var gender = document.querySelector('#genderSelect');
      gender?.setValue(this.parentsForm.gender);
    },
    updateParents() {
      const index = this.parents.findIndex(
        (product) => product.studentID === this.parentsForm.studentID
      );
      var gender = document.querySelector('#genderSelect').value;
      this.filterParents[index] = { ...this.parentsForm, gender: gender };
      this.resetForm();
    },
    resetForm() {
      this.errors = {};
      var gender = document.querySelector('#genderSelect');
      this.parentsForm = {
        address: '',
        email: '',
        gender: '',
        image: '',
        occupation: '',
        parentsName: '',
        phone: '',
        relation: '',
        studentID: '',
        studentName: '',
        gender: gender?.setValue('')
      };
    },

    // change ends...
    get totalPages() {
      return Math.ceil(this.filterParents.length / this.itemsPerPage);
    },
    get displayedParents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.filterParents.slice(start, end).map((parent) => ({
        ...parent,
        formattedDate: this.formatDate(parent.date),
        avatarText: this.generateAvatarText(parent.parentsName)
      }));
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filterParents.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filterParents.length);
    },
    init() {
      let startID = 1595; // Starting ID
      parentsData.forEach((student, index) => {
        student.studentID = 'PES-' + (startID + index).toString();
      });
      this.parents = parentsData;
      this.filteredParents();
    },
    filteredParents() {
      this.filterParents = this.parents;
      const searchTerm = this.searchTerm.trim().toLowerCase();
      if (searchTerm) {
        this.filterParents = this.filterParents.filter((parent) => {
          return Object.values(parent).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
    },
    deleteParents() {
      if (this.deleteParent) {
        const index = this.filterParents.findIndex(
          (parent) => parent.parentsName == this.deleteParent
        );
        if (index !== -1) this.filterParents.splice(index, 1);
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
      if (nameParts.length > 1) return nameParts[0][0] + nameParts[1][0];
      return name[0];
    },
    sort(column) {
      if (column === this.sortBy)
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.parents.sort((a, b) => {
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
    },
    fileChosen(event) {
      this.fileToDataUrl(event, (src) => {
        this.imageUrl = src;
        this.parentsForm.image = src; // Update parents form image
      });
    },
    fileToDataUrl(event, callback) {
      if (!event.target.files.length) return;
      let file = event.target.files[0],
        reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => callback(e.target.result);
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('parentsTable', parentsTable);
});

//Gender select
VirtualSelect.init({
  ele: '#genderSelect',
  options: [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ]
});
