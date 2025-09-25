/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: List View init Js File
*/

import '../../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import staffData from '../../../../json/apps/hospital/staff/staff';
function staffListTable() {
  return {
    staffs: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    currentPage: 1,
    itemsPerPage: 10,
    imageUrl: '',
    // change
    errors: {},
    deleteItem: '',
    showAddStaffForm: false,
    showEditStaffForm: false,
    filterStaff: [],
    staffForm: {
      staffID: '',
      image: '',
      department: '',
      email: '',
      name: '',
      phone: '',
      role: '',
      date: ''
    },
    validateForm() {
      this.errors = {};
      this.validateField('name', this.staffForm.name, 'Full name is required.');
      this.formatPhoneNumber();
      this.validateField('phone', this.staffForm.phone, 'Phone number is required.');
      this.validateField('role', this.staffForm.role, 'Role is required.');
      this.validateEmailField();
      this.validateField('date', this.staffForm.date, 'Date is required.');
      this.validateField(
        'department',
        document.querySelector('#departmentSelect').value,
        'Department is required.'
      );
      return Object.keys(this.errors).length === 0;
    },

    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue) this.errors[fieldName] = errorMessage;
      else delete this.errors[fieldName];
    },
    validateEmailField() {
      if (!this.staffForm.email) this.errors.email = 'Email is required.';
      else if (!this.validateEmail(this.staffForm.email))
        this.errors.email = 'Invalid email format.';
      else delete this.errors.email;
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    },
    formatPhoneNumber() {
      let rawNumber = this.staffForm.phone.replace(/[^\d+]/g, '');
      if (rawNumber.startsWith('+')) {
        rawNumber = rawNumber.substring(1);
      }
      const formattedNumber = rawNumber.replace(/^(\d{3})(\d{0,4})(\d{0,5})$/, '+$1 $2 $3').trim();
      const phonePattern = /^\+\d{3} \d{4} \d{5}$/;
      if (!phonePattern.test(formattedNumber)) {
        this.errors.phone = 'Phone number must be in the format +XXX XXXX XXXXX';
      } else {
        this.errors.phone = '';
      }
      this.staffForm.phone = formattedNumber;
    },
    handleModal(modal) {
      if (modal == 'showAddStaffForm') {
        this.showAddStaffForm = true;
        this.showEditStaffForm = false;
        this.resetForm();
      } else if (modal == 'showEditStaffForm') {
        this.showEditStaffForm = true;
        this.showAddStaffForm = false;
        this.resetForm();
      }
    },
    submitForm() {
      if (this.validateForm()) {
        if (this.showAddStaffForm) this.addStaff();
        else this.updateStaff();
        document.body.classList.toggle('overflow-hidden', false);
        this.resetForm();
        this.showEditStaffForm = false;
        this.showAddStaffForm = false;
      }
    },
    addStaff() {
      this.staffForm.staffID = 'PES-' + (1595 + this.staffs.length).toString();
      var departmentSelect = document.querySelector('#departmentSelect').value;
      this.filterStaff.unshift({ ...this.staffForm, department: departmentSelect });
      this.showAddStaffForm = false;
    },
    editStaff(index) {
      this.handleModal('showEditStaffForm');
      this.staffForm = { ...this.staffs.find((contact) => contact.staffID === index) };
      var departmentSelect = document.querySelector('#departmentSelect');
      departmentSelect?.setValue(this.staffForm.department);
    },
    updateStaff() {
      const index = this.staffs.findIndex((product) => product.staffID == this.staffForm.staffID);
      var departmentSelect = document.querySelector('#departmentSelect').value;
      this.filterStaff[index] = { ...this.staffForm, department: departmentSelect };
      this.resetForm();
      this.showAddStaffForm = false;
    },
    resetForm() {
      this.errors = {};
      var departmentSelect = document.querySelector('#departmentSelect');
      this.staffForm = {
        staffID: '',
        image: '',
        department: departmentSelect?.setValue(''),
        email: '',
        name: '',
        phone: '',
        role: '',
        date: ''
      };
    },
    deleteStaff() {
      this.filterStaff.forEach((contact, index) => {
        if (contact.staffID == this.deleteItem) {
          this.filterStaff.splice(index, 1);
        }
      });
    },
    get totalPages() {
      return Math.ceil(this.staffs.length / this.itemsPerPage);
    },
    get displayedStaff() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.staffs.slice(start, end).map((staff) => ({
        ...staff,
        formattedDate: this.formatDate(staff.date),
        avatarText: this.generateAvatarText(staff.name)
      }));
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.staffs.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.staffs.length);
    },
    init() {
      let startID = 1595; // Starting ID
      staffData.forEach((staff, index) => {
        // Generate staffID starting from "PES-1595"
        staff.staffID = 'PES-' + (startID + index).toString();
      });
      this.staffs = staffData;
      setTimeout(() => {
        drawerSetting();
      }, 0);
      this.filterStaff = this.staffs;
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
      if (column === this.sortBy)
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.staffs.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        let comparison = 0;
        if (valueA > valueB) comparison = 1;
        else if (valueA < valueB) comparison = -1;
        return this.sortDirection === 'desc' ? comparison * -1 : comparison;
      });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
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
        this.staffForm.image = src; // Update contact form image
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
  Alpine.data('staffListTable', staffListTable);
  // Alpine.data('previewImage', previewImage);
});

//Department Select
VirtualSelect.init({
  ele: '#departmentSelect',
  options: [
    { label: 'Radiology', value: 'Radiology' },
    { label: 'Orthopedics', value: 'Orthopedics' },
    { label: 'Neurology', value: 'Neurology' },
    { label: 'Cardiology', value: 'Cardiology' },
    { label: 'Pediatrics', value: 'Pediatrics' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Nurse', value: 'Nurse' },
    { label: 'Security Officer', value: 'Security Officer' },
    { label: 'Others', value: 'Others' }
  ]
});
