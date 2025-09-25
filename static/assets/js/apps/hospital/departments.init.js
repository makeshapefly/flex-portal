/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: Departments init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import ApexCharts from 'apexcharts';
import { getColorCodes } from '../../helpers/helper';
import departmentData from '../../../json/apps/hospital/department';

//Distributed Columns Chart
dayjs.extend(window.dayjs_plugin_quarterOfYear);
document.addEventListener('alpine:init', () => {
  Alpine.data('distributedColumnApp', () => ({
    series: [
      {
        name: 'Employee',
        data: [21, 22, 19, 10, 10, 28, 16]
      }
    ],
    labels: [
      ['Radiology'],
      ['Orthopedics'],
      ['Neurology'],
      ['Cardiology'],
      ['Pediatrics'],
      ['Nurse'],
      ['Others']
    ],
    init() {
      let distributedColumnChart = new ApexCharts(this.$refs.distributedColumnChart, this.options);
      distributedColumnChart.render();
    },
    get options() {
      return {
        series: this.series,
        chart: {
          height: 300,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            columnWidth: '25%',
            distributed: true
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.2,
            // gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 30],
            colorStops: []
          }
        },
        states: {
          normal: {
            filter: {
              type: 'none',
              value: 0
            }
          },
          hover: {
            filter: {
              type: 'none',
              value: 0
            }
          },
          active: {
            filter: {
              type: 'none',
              value: 0
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: this.labels
        },
        colors: getColorCodes(this.$refs.distributedColumnChart.dataset)
      };
    }
  }));
});

//department table
function departmentTable() {
  return {
    departments: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    currentPage: 1,
    itemsPerPage: 5,
    deleteItem: '',
    imageUrl: '',
    showAddDepartmentForm: false,
    showEditDepartmentForm: false,
    departmentForm: {
      departmentID: '',
      departmentName: '',
      doctor: '',
      headOfDepartment: '',
      totalEmployee: '',
      status: '',
      avatarText: ''
    },
    errors: {},
    validateForm() {
      this.errors = {};
      this.validateField(
        'departmentName',
        this.departmentForm.departmentName,
        'department name is required.'
      );
      this.validateField('doctor', this.departmentForm.doctor, 'Company name is required.');
      this.validateField(
        'headOfDepartment',
        this.departmentForm.headOfDepartment,
        'Role is required.'
      );
      this.validateField(
        'totalEmployee',
        this.departmentForm.totalEmployee,
        'Phone number is required.'
      );
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
    handleModal(modal) {
      if (modal === 'showAddDepartmentForm') {
        this.showAddDepartmentForm = true;
        this.showEditDepartmentForm = false;
        this.resetForm();
      } else {
        this.showEditDepartmentForm = true;
        this.showAddDepartmentForm = false;
        this.resetForm();
      }
    },
    submitForm() {
      if (this.validateForm()) {
        if (this.showAddDepartmentForm) {
          this.errors = {};
          this.addDepartment();
        } else this.updateDepartment();
        document.body.classList.toggle('overflow-hidden', false);
        this.resetForm();
        this.errors = {};
        this.showEditDepartmentForm = false;
        this.showAddDepartmentForm = false;
      }
    },
    addDepartment() {
      this.departmentForm.departmentID = 'PED-' + (1 + this.departments.length).toString();
      var statusSelect = document.querySelector('#statusSelect').value;
      this.departments.unshift({ ...this.departmentForm, status: statusSelect });
    },
    editDepartment(index) {
      this.handleModal('showEditDepartmentForm');
      this.departmentForm = {
        ...this.departments.find((Department) => Department.departmentID === index),
        avatarText: this.generateAvatarText(
          this.departments.find((Department) => Department.departmentID === index).doctor
        )
      };
      var statusSelect = document.querySelector('#statusSelect');
      statusSelect?.setValue(this.departmentForm.status);
    },
    updateDepartment() {
      const index = this.departments.findIndex(
        (product) => product.departmentID === this.departmentForm.departmentID
      );
      var statusSelect = document.querySelector('#statusSelect').value;
      this.departments[index] = { ...this.departmentForm, status: statusSelect };
      this.resetForm();
    },
    resetForm() {
      this.errors = {};
      var statusSelect = document.querySelector('#statusSelect');
      this.departmentForm = {
        departmentID: '',
        departmentName: '',
        doctor: '',
        image: '',
        headOfDepartment: '',
        totalEmployee: '',
        status: statusSelect?.setValue(''),
        avatarText: ''
      };
    },
    deleteDepartment() {
      this.departments.forEach((Department, index) => {
        if (Department.departmentID == this.deleteItem) {
          this.departments.splice(index, 1);
          Z;
        }
      });
    },
    // end changes
    get totalPages() {
      return Math.ceil(this.departments.length / this.itemsPerPage);
    },
    get displayedDepartment() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.departments.slice(start, end).map((department) => ({
        ...department,
        avatarText: this.generateAvatarText(department.doctor)
      }));
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.departments.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.departments.length);
    },
    init() {
      let startID = 1; // Starting ID
      departmentData.forEach((department, index) => {
        department.departmentID = 'PED-' + (startID + index).toString();
      });
      setTimeout(() => {
        drawerSetting();
      }, 0);
      this.departments = departmentData;
      this.$nextTick(() => {
        lucide.createIcons();
      });
    },
    sort(column) {
      if (column === this.sortBy)
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.departments.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        let comparison = 0;
        if (valueA > valueB) comparison = 1;
        else if (valueA < valueB) comparison = -1;
        return this.sortDirection === 'desc' ? comparison * -1 : comparison;
      });
    },
    generateAvatarText(doctor) {
      const nameWithoutPrefix = doctor.replace('Dr. ', ''); // Remove 'Dr. ' prefix
      const nameParts = nameWithoutPrefix.split(' ');
      if (nameParts.length > 1) return nameParts[0][0] + nameParts[1][0];
      return nameParts[0][0];
    },
    removeImage(event) {
      const image = event.target;
      const container = image.parentNode;
      image.style.display = 'none';
      container.querySelector('span').style.display = 'flex';
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
    fileChosen(event) {
      this.fileToDataUrl(event, (src) => {
        this.imageUrl = src;
        this.departmentForm.image = src; // Update contact form image
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
  Alpine.data('departmentTable', departmentTable);
});

//Status Select
VirtualSelect.init({
  ele: '#statusSelect',
  options: [
    { label: 'Active', value: 'Active' },
    { label: 'Un Active', value: 'Unactive' }
  ]
});
