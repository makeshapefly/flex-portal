/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: list-view init Js File
*/

import '../../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import patientsData from '../../../../json/apps/hospital/patients/patients';

function patientsTable() {
  return {
    patients: [],
    filteredPatients: [],
    searchQuery: '',
    searchTerm: '',
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    deleteItem: '',
    overviewItem: {},
    selectAll: false,
    selectedItems: [],
    currentPage: 1,
    itemsPerPage: 16,
    toggleAll() {
      this.selectedItems = this.selectAll ? [...this.filteredPatients] : [];
    },
    get totalPages() {
      return Math.ceil(this.filteredPatients.length / this.itemsPerPage);
    },
    get displayedPatients() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPatients.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filteredPatients.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredPatients.length);
    },
    init() {
      let startID = 22697; // Starting ID
      patientsData.forEach((project, index) => {
        // Generate categoryID starting from "PEC-24151"
        project.projectID = 'PEP-' + (startID + index).toString();
      });
      this.patients = patientsData;
      this.filterPatients(
        setTimeout(() => {
          drawerSetting();
        }, 0)
      );
      this.addStatusToData(this.patients);
    },
    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }

      this.patients.sort((a, b) => {
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
    addStatusToData(filterPatients) {
      const dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };

      // Convert date string to Date object
      filterPatients.forEach((patient) => {
        patient.dateObj = new Date(Date.parse(patient.date));
      });

      // Find the most recent date
      const mostRecentDate = new Date(
        Math.max(...filterPatients.map((patient) => patient.dateObj))
      );

      // Define thresholds
      const newThreshold = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
      const followUpThreshold = 60 * 24 * 60 * 60 * 1000; // 60 days in milliseconds

      // Calculate status based on date difference
      filterPatients.forEach((patient) => {
        const dateDiff = mostRecentDate - patient.dateObj;
        if (dateDiff <= newThreshold) {
          patient.status = 'New';
        } else if (dateDiff <= followUpThreshold) {
          patient.status = 'Follow up';
        } else {
          patient.status = 'Old';
        }
        // Remove the temporary dateObj field
        delete patient.dateObj;
      });
      return filterPatients;
    },
    deletePatients() {
      const index = this.filteredPatients.findIndex(
        (patient) => patient.projectID === this.deleteItem.projectID
      );
      this.filteredPatients.splice(index, 1);
    },
    SearchPatients() {
      if (this.searchTerm.trim() !== '') {
        const query = this.searchTerm.toLowerCase().trim();
        this.filteredPatients = this.filteredPatients.filter((project) => {
          return Object.values(project).some((value) =>
            value.toString().toLowerCase().includes(query)
          );
        });
      } else {
        this.filterPatients();
      }
      return this.filteredPatients;
    },
    filterPatients() {
      this.filteredPatients = this.patients;
      let doctor = document.getElementById('doctorsSelect').value;
      let status = document.getElementById('patientStatusSelect').value;
      let insurance = document.getElementById('insuranceSelect').value;
      let city = document.getElementById('citySelect').value;
      let gender = document.getElementById('genderSelect').value;

      // Filter by search query
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase().trim();
        this.filteredPatients = this.filteredPatients.filter((project) => {
          return Object.values(project).some((value) =>
            value.toString().toLowerCase().includes(query)
          );
        });
      }
      // Apply filters
      if (doctor !== '')
        this.filteredPatients = this.filteredPatients.filter(
          (patient) => patient.doctorName == doctor
        );
      if (status !== '')
        this.filteredPatients = this.filteredPatients.filter((patient) => patient.status == status);
      if (insurance !== '')
        this.filteredPatients = this.filteredPatients.filter(
          (patient) => patient.insurance == insurance
        );
      if (city !== '')
        this.filteredPatients = this.filteredPatients.filter((patient) => patient.location == city);
      if (gender !== '')
        this.filteredPatients = this.filteredPatients.filter((patient) => patient.gender == gender);

      return this.filteredPatients;
    },
    // Method to clear all filters
    clearFilters() {
      this.searchQuery = '';

      // Retrieve the instances and clear the values
      const doctorsSelect = document.getElementById('doctorsSelect');
      const patientStatusSelect = document.getElementById('patientStatusSelect');
      const insuranceSelect = document.getElementById('insuranceSelect');
      const citySelect = document.getElementById('citySelect');
      const genderSelect = document.getElementById('genderSelect');

      if (doctorsSelect) doctorsSelect.setValue([]);
      if (patientStatusSelect) patientStatusSelect.setValue([]);
      if (insuranceSelect) insuranceSelect.setValue([]);
      if (citySelect) citySelect.setValue([]);
      if (genderSelect) genderSelect.setValue([]);
      this.filterPatients();
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('patientsTable', patientsTable);
});

//Insurance select
VirtualSelect.init({
  ele: '#insuranceSelect',
  options: [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ]
});

//City select
VirtualSelect.init({
  ele: '#citySelect',
  options: [
    { label: 'Algeria', value: 'Algeria' },
    { label: 'Argentina', value: 'Argentina' },
    { label: 'Belgium', value: 'Belgium' },
    { label: 'Mexico', value: 'Mexico' },
    { label: 'Russia', value: 'Russia' },
    { label: 'Denmark', value: 'Denmark' },
    { label: 'Sudan', value: 'Sudan' },
    { label: 'Spain', value: 'Spain' },
    { label: 'Germany', value: 'Germany' },
    { label: 'Israel', value: 'Israel' },
    { label: 'Namibia', value: 'Namibia' },
    { label: 'Brazil', value: 'Brazil' },
    { label: 'Poland', value: 'Poland' },
    { label: 'Serbia', value: 'Serbia' },
    { label: 'Malaysia', value: 'Malaysia' },
    { label: 'Norway', value: 'Norway' },
    { label: 'Romania', value: 'Romania' },
    { label: 'USA', value: 'USA' },
    { label: 'Canada', value: 'Canada' }
  ]
});

//Gender select
VirtualSelect.init({
  ele: '#genderSelect',
  options: [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Others', value: 'Others' }
  ]
});

//Doctors select
VirtualSelect.init({
  ele: '#doctorsSelect',
  options: [
    { label: 'Dr. Michael', value: 'Dr. Michael' },
    { label: 'Dr. Sarah', value: 'Dr. Sarah' },
    { label: 'Dr. Robert', value: 'Dr. Robert' },
    { label: 'Dr. Emily', value: 'Dr. Emily' },
    { label: 'Dr. James', value: 'Dr. James' },
    { label: 'Dr. Olivia', value: 'Dr. Olivia' },
    { label: 'Dr. David', value: 'Dr. David' },
    { label: 'Dr. Sophia', value: 'Dr. Sophia' },
    { label: 'Dr. William', value: 'Dr. William' },
    { label: 'Dr. Charlotte', value: 'Dr. Charlotte' }
  ]
});

//Patient Status select
VirtualSelect.init({
  ele: '#patientStatusSelect',
  options: [
    { label: 'New', value: 'New' },
    { label: 'Follow Up', value: 'Follow Up' },
    { label: 'Old', value: 'Old' }
  ]
});
