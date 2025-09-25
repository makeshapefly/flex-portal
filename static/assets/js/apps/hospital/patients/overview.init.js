/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: overview init Js File
*/

import '../../../../../../node_modules/virtual-select-plugin/dist/virtual-select';

import appointmentsData from '../../../../json/apps/hospital/patients/appointments';
import medicineData from '../../../../json/apps/hospital/patients/medicine';
import ReportData from '../../../../json/apps/hospital/patients/report';

//reports table
function reportsTable() {
  return {
    reports: [],
    sortBy: '',
    deleteReport: '',
    sortDirection: 'asc',
    deleteReportModal: false,
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    reportForm: {
      reportType: '',
      date: '',
      doctor: '',
      clientDetails: '',
      impressions: '',
      recommendations: '',
      status: ''
    },
    errors: {},
    showAddReportForm: true,
    currentPage: 1,
    itemsPerPage: 5,
    openModel(index) {
      this.deleteReport = index;
      this.deleteReportModal = true;
    },
    validateForm() {
      this.errors = {};
      this.validateField('date', this.reportForm.date, 'Date is required.');
      this.validateField(
        'reportType',
        document.getElementById('reportTypeSelect').value,
        'Report type is required.'
      );
      this.validateField(
        'recommendations',
        document.getElementById('recommendationsSelect').value,
        'Recommendations is required.'
      );
      this.validateField('doctor', this.reportForm.doctor, 'Doctor name is required.');
      this.validateField(
        'clientDetails',
        this.reportForm.clientDetails,
        'Client details is required.'
      );
      this.validateField(
        'status',
        document.getElementById('statusSelect').value,
        'Status is required.'
      );
      this.validateField('impressions', this.reportForm.impressions, 'Impressions is required.');

      return Object.keys(this.errors).length === 0;
    },

    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue) this.errors[fieldName] = errorMessage;
      else delete this.errors[fieldName];
    },
    addReport() {
      let reportTypes = document.querySelector('#reportTypeSelect').value;
      let recommendation = document.querySelector('#recommendationsSelect').value;
      let status = document.querySelector('#statusSelect').value;
      this.reports.unshift({
        ...this.reportForm,
        name: reportTypes,
        recommendations: recommendation,
        status: status
      });
      this.showAddReportForm = false;
    },
    submitReport() {
      if (this.validateForm()) {
        this.addReport();
        this.reportForm = {
          reportType: '',
          date: '',
          doctor: '',
          clientDetails: '',
          impressions: '',
          recommendations: '',
          status: ''
        };
        document.body.classList.toggle('overflow-hidden', false);
      }
    },
    get totalPages() {
      return Math.ceil(this.reports.length / this.itemsPerPage);
    },
    get displayedReports() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.reports.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.reports.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.reports.length);
    },
    init() {
      let startID = 22697; // Starting ID
      ReportData.forEach((report, index) => {
        report.reportsID = 'PER-' + (startID + index).toString();
      });
      this.reports = ReportData;
    },
    deleteReports() {
      this.reports.splice(this.deleteReport, 1);
      this.deleteReport = '';
      this.deleteReportModal = false;
    },
    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.reports.sort((a, b) => {
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
    }
  };
}

//medicine table
function medicineTable() {
  return {
    medicines: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    deleteMedicine: '',
    deleteMedicineModel: false,
    showAddMedicineForm: false,
    showEditMedicineForm: false,
    errors: {},
    medicineForm: {
      medicineID: '',
      medicineName: '',
      dosage: '',
      frequency: '',
      startDate: '',
      endDate: '',
      prescribingDoctor: '',
      reasonCondition: '',
      notes: ''
    },
    currentPage: 1,
    itemsPerPage: 5,

    validateForm() {
      this.errors = {};
      this.validateField(
        'medicineName',
        this.medicineForm.medicineName,
        'Medicine name is required.'
      );
      this.validateField('dosage', this.medicineForm.dosage, 'Dosage is required.');
      this.validateField('frequency', this.medicineForm.frequency, 'Frequency is required.');
      this.validateField(
        'reasonCondition',
        this.medicineForm.reasonCondition,
        'Reason is required.'
      );
      this.validateField(
        'prescribingDoctor',
        this.medicineForm.prescribingDoctor,
        'Priscribed doctor is required.'
      );
      this.validateField('startDate', this.medicineForm.startDate, 'Start date is required.');
      this.validateField('endDate', this.medicineForm.endDate, 'End date is required.');
      this.validateField('notes', this.medicineForm.notes, 'Notes is required.');

      return Object.keys(this.errors).length === 0;
    },
    validateField(fieldName, fieldValue, errorMessage) {
      // Clear the existing error for the field
      delete this.errors[fieldName];

      // Check for the dosage field specifically
      if (fieldName === 'dosage') {
        const dosageRegex = /^(1000|[1-9][0-9]{0,2}|[1-9])mg$/;

        // Check if the field is empty
        if (!fieldValue)
          this.errors[fieldName] = errorMessage; // Required error
        else if (!dosageRegex.test(fieldValue))
          this.errors[fieldName] = 'Dosage must be a number (0-1000) followed by "mg".'; // Format error
      }
      // For other fields, check if the field is empty
      else if (!fieldValue) {
        this.errors[fieldName] = errorMessage; // Required error
      }
    },
    handleModal(modal) {
      if (modal === 'showAddMedicineForm') {
        this.showAddMedicineForm = true;
        this.showEditMedicineForm = false;
        this.resetForm();
      } else if (modal === 'showEditMedicineForm') {
        this.showEditMedicineForm = true;
        this.showAddMedicineForm = false;
        this.resetForm();
      } else {
        this.showEditMedicineForm = false;
        this.showAddMedicineForm = false;
      }
    },

    submitForm(event) {
      if (this.validateForm()) {
        if (this.showAddMedicineForm) this.addMedicine();
        else this.updateMedicine();
        document.body.classList.toggle('overflow-hidden', false);
        this.resetForm();
        this.showEditMedicineForm = false;
        this.showAddMedicineForm = false;
      }
    },
    resetForm() {
      this.errors = {};
      this.medicineForm = {
        medicineID: '',
        medicineName: '',
        dosage: '',
        frequency: '',
        startDate: '',
        endDate: '',
        prescribingDoctor: '',
        reasonCondition: '',
        notes: ''
      };
    },
    addMedicine() {
      let currentDate = new Date();
      // Get the current hour, minute, and second
      let currentHour = currentDate.getHours();
      let currentMinute = currentDate.getMinutes();
      let period = currentHour >= 12 ? 'PM' : 'AM';
      let year = currentDate.getFullYear();
      let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      let day = String(currentDate.getDate()).padStart(2, '0');
      let currentTime = `${currentHour}:${currentMinute} ${period}`;
      let formattedDate = `${year}-${month}-${day}`;
      this.medicineForm.medicineID = 'PEM-' + (22697 + (this.medicines.length + 1)).toString();
      this.medicines.unshift({ ...this.medicineForm, date: formattedDate, time: currentTime });
      this.showAddMedicineForm = false;
    },
    editMedicine(index) {
      this.handleModal('showEditMedicineForm');
      this.medicineForm = { ...this.medicines.find((medicine) => medicine.medicineID == index) };
    },
    updateMedicine() {
      const index = this.medicines.findIndex(
        (medicine) => medicine.medicineID === this.medicineForm.medicineID
      );
      this.medicines[index] = { ...this.medicineForm };
      this.showEditMedicineForm = false;
      this.showAddMedicineForm = false;
    },
    openMedicineDeleteModel(index) {
      (this.deleteMedicineModel = true), (this.deleteMedicine = index);
    },
    deleteMedicines() {
      this.medicines.splice(this.deleteMedicine, 1);
      this.deleteMedicineModel = false;
    },
    get totalPages() {
      return Math.ceil(this.medicines.length / this.itemsPerPage);
    },
    get displayedMedicine() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.medicines.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.medicines.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.medicines.length);
    },
    init() {
      let startID = 22697; // Starting ID
      medicineData.forEach((medicine, index) => {
        // Generate categoryID starting from "PEC-24151"
        medicine.medicineID = 'PEM-' + (startID + index).toString();
      });
      this.medicines = medicineData;
    },

    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }

      this.medicines.sort((a, b) => {
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
    }
  };
}

//Appointments table
function appointmentsTable() {
  return {
    appointments: [],
    sortBy: '',
    deleteAppointments: '',
    deleteAppointmentModel: false,
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    currentPage: 1,
    itemsPerPage: 5,
    openAppointmentDeleteModel(index) {
      this.deleteAppointmentModel = true;
      this.deleteAppointments = index;
    },
    deleteAppointment() {
      this.appointments.splice(this.deleteAppointments, 1);
      this.deleteAppointments = '';
      this.deleteAppointmentModel = false;
    },
    get totalPages() {
      return Math.ceil(this.appointments.length / this.itemsPerPage);
    },
    get displayedAppointments() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.appointments.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.appointments.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.appointments.length);
    },
    init() {
      let startID = 22697; // Starting ID
      appointmentsData.forEach((appointment, index) => {
        // Generate categoryID starting from "PEA-*"
        appointment.appointmentID = 'PEA-' + (startID + index).toString();
      });
      this.appointments = appointmentsData;
    },
    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }

      this.appointments.sort((a, b) => {
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
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('reportsTable', reportsTable);
  Alpine.data('medicineTable', medicineTable);
  Alpine.data('appointmentsTable', appointmentsTable);
});

//Report Type Select
VirtualSelect.init({
  ele: '#reportTypeSelect',
  options: [
    { label: 'X-Ray', value: 'X-Ray' },
    { label: 'Blood Test', value: 'Blood Test' },
    { label: 'MRI', value: 'MRI' },
    { label: 'CT Scan', value: 'CT Scan' },
    { label: 'Ultrasound', value: 'Ultrasound' }
  ],
  allowNewOption: true
});

//Recommendations Select
VirtualSelect.init({
  ele: '#recommendationsSelect',
  options: [
    { label: 'N/A', value: 'N/A' },
    { label: 'Follow-up required', value: 'Follow-up required' },
    { label: 'Consult with surgeon', value: 'Consult with surgeon' }
  ],
  allowNewOption: true
});

//Status Select
VirtualSelect.init({
  ele: '#statusSelect',
  options: [
    { label: 'Completed', value: 'Completed' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Pending', value: 'Pending' }
  ]
});
