/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: grid view init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import projectListData from '../../../json/apps/projects/projects-list';
import user14 from '/assets/images/avatar/user-14.png';
import user17 from '/assets/images/avatar/user-17.png';
import user16 from '/assets/images/avatar/user-16.png';
import user12 from '/assets/images/avatar/user-12.png';
import user18 from '/assets/images/avatar/user-18.png';
import user15 from '/assets/images/avatar/user-15.png';
import brand1 from '/assets/images/brands/img-01.png';
function projectsTable() {
  return {
    projects: [],
    filteredProjects: [],
    activeTab: '',
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    selectAll: false,
    selectedItems: [],
    currentPage: 1,
    errors: {},
    itemsPerPage: 12,
    filterStatus: '',
    searchQuery: '',
    deleteItem: '',
    showViewProjectForm: false,
    showAddProjectForm: false,
    showEditProjectForm: false,
    projectForm: {
      projectID: '',
      clientName: '',
      dueDate: '',
      image: '',
      progress: '',
      projectID: '',
      projectImage: brand1,
      projectName: '',
      status: '',
      totalAmount: ''
    },
    handleModal(modal) {
      if (modal === 'showAddProjectForm') {
        this.showAddProjectForm = true;
        this.showEditProjectForm = false;
        this.resetForm();
      } else {
        this.showEditProjectForm = true;
        this.showAddProjectForm = false;
        this.resetForm();
      }
    },
    addProject() {
      this.projectForm.projectID = 'PEP-' + (22697 + this.projects.length).toString();
      var statusSelect = document.querySelector('#statusSelect2').value;
      var assignee = document.querySelector('#assignedSelect').value;
      var assigneesImages = [];
      assignee.forEach((element) => {
        if (element == 'Max Boucaut') {
          assigneesImages.push({ image: user14, name: element });
        } else if (element == 'Poppy Dalley') {
          assigneesImages.push({ image: user17, name: element });
        } else if (element == 'Ethan Zahel') {
          assigneesImages.push({ image: user16, name: element });
        } else if (element == 'Lucas Griffin') {
          assigneesImages.push({ image: user12, name: element });
        } else if (element == 'Ryan Frazer') {
          assigneesImages.push({ image: user18, name: element });
        } else if (element == 'Natasha Tegg') {
          assigneesImages.push({ image: user15, name: element });
        }
      });
      this.filteredProjects.unshift({
        ...this.projectForm,
        status: statusSelect,
        assignees: assigneesImages,
        projectImage: brand1
      });
    },
    editProject(index) {
      this.handleModal('showEditProjectForm');
      this.projectForm = {
        ...this.projects.find((project) => project.projectName === index),
        totalAmount: this.projects
          .find((project) => project.projectName === index)
          .totalAmount.replace(/,/g, '')
      };
      var statusSelect = document.querySelector('#statusSelect2');
      var assignee = document.querySelector('#assignedSelect');

      var assigneeNames = [];
      this.projectForm.assignees.forEach((element) => {
        assigneeNames.push(element.name);
      });
      assignee?.setValue(assigneeNames);
      statusSelect?.setValue(this.projectForm.status);
      this.showEditProjectForm = true;
    },
    updateProject() {
      this.setFilterStatus('');
      const index = this.projects.findIndex(
        (project) => project.projectID === this.projectForm.projectID
      );
      var assignee = document.querySelector('#assignedSelect').value;
      var assigneesImages = [];
      if (assignee == []) {
        assigneesImages = this.projectForm.assignees;
      } else {
        assignee.map((element) => {
          if (element == 'Max Boucaut') {
            assigneesImages.push({ image: user14, name: element });
          } else if (element == 'Poppy Dalley') {
            assigneesImages.push({ image: user17, name: element });
          } else if (element == 'Ethan Zahel') {
            assigneesImages.push({ image: user16, name: element });
          } else if (element == 'Julian Marconi') {
            assigneesImages.push({ image: user12, name: element });
          } else if (element == 'Ryan Frazer') {
            assigneesImages.push({ image: user18, name: element });
          } else if (element == 'Natasha Tegg') {
            assigneesImages.push({ image: user15, name: element });
          }
        });
      }
      var statusSelect = document.querySelector('#statusSelect2').value;

      this.filteredProjects[index] = {
        ...this.projectForm,
        status: statusSelect,
        assignees: assigneesImages
      };
      this.setFilterStatus(this.activeTab);
    },

    validateForm() {
      this.errors = {};
      this.validateField('projectName', this.projectForm.projectName, 'Project name is required.');
      this.validateField('clientName', this.projectForm.clientName, 'Client name is required.');
      this.validateField('dueDate', this.projectForm.dueDate, 'Due date is required.');
      this.validateField('totalAmount', this.projectForm.totalAmount, 'Total amount is required.');
      this.validateField('progress', this.projectForm.progress, 'Progress is required.');
      const statusSelect = document.querySelector('#statusSelect2');
      const assignedSelect = document.querySelector('#assignedSelect');
      if (statusSelect) {
        const statusValue = statusSelect.value; // Use value property directly
        this.validateField('status', statusValue, 'Status is required.');
      } else this.errors['status'] = 'Status field is not available.';
      if (assignedSelect) {
        const assignedValue = assignedSelect.value; // Use value property directly
        this.validateField('assignee', assignedValue, 'Assignee is required.');
      } else this.errors['assignee'] = 'Assignee field is not available.';
      return Object.keys(this.errors).length === 0;
    },

    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
        this.errors[fieldName] = errorMessage;
      } else {
        if (fieldName === 'progress') {
          if (fieldValue < 0 || fieldValue > 100) {
            this.errors[fieldName] = 'Progress must be between 0 and 100.';
            this.projectForm.progress = Math.max(0, Math.min(fieldValue, 100));
          } else delete this.errors[fieldName];
        } else delete this.errors[fieldName];
      }
    },
    submitForm() {
      if (this.validateForm()) {
        if (this.showAddProjectForm) this.addProject();
        else this.updateProject();
        this.resetForm();
        document.body.classList.toggle('overflow-hidden', false);
        this.showEditProjectForm = false;
        this.showAddProjectForm = false;
      }
    },
    resetForm() {
      this.errors = {};
      var statusSelect = document.querySelector('#statusSelect2');
      var assignee = document.querySelector('#assignedSelect');
      this.projectForm = {
        projectID: '',
        clientName: '',
        dueDate: '',
        image: '',
        progress: '',
        projectID: '',
        projectImage: '',
        projectName: '',
        status: statusSelect?.setValue(''),
        totalAmount: '',
        assignee: assignee?.setValue('')
      };
    },
    deleteProject() {
      this.filteredProjects.forEach((contact, index) => {
        if (contact.projectName == this.deleteItem) this.filteredProjects.splice(index, 1);
      });
    },
    toggleAll() {
      this.selectedItems = this.selectAll ? [...this.filteredProjects] : [];
    },
    get totalPages() {
      return Math.ceil(this.filteredProjects.length / this.itemsPerPage);
    },
    get displayedProjects() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.filteredProjects.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filteredProjects.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredProjects.length);
    },
    get totalProjects() {
      return this.filteredProjects.length;
    },
    init() {
      let startID = 22697; // Starting ID
      projectListData.forEach((project, index) => {
        // Generate projectID starting from "PEP-24151"
        project.projectID = 'PEP-' + (startID + index).toString();
      });
      this.projects = projectListData;
      this.filterProjects(
        setTimeout(() => {
          drawerSetting();
        }, 0)
      );
    },

    sort(column) {
      if (column === this.sortBy)
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.filteredProjects.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        let comparison = 0;
        if (valueA > valueB) comparison = 1;
        else if (valueA < valueB) comparison = -1;
        return this.sortDirection === 'desc' ? comparison * -1 : comparison;
      });
    },
    setFilterStatus(status) {
      this.filterStatus = status;
      this.filterProjects();
    },
    filterProjects() {
      this.filteredProjects = this.projects;
      const queryWords = this.searchQuery.trim().toLowerCase();
      if (queryWords) {
        this.filteredProjects = this.filteredProjects.filter((project) => {
          return Object.values(project).some((value) =>
            value.toString().toLowerCase().includes(queryWords)
          );
        });
      }
      const status = this.filterStatus;
      if (status)
        return (this.filteredProjects = this.filteredProjects.filter(
          (project) => project.status === status
        ));
      this.currentPage = 1;
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

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('projectsTable', projectsTable);
});

// Status Select
VirtualSelect.init({
  ele: '#statusSelect2',
  options: [
    { label: 'Active', value: 'Active' },
    { label: 'On Hold', value: 'On Hold' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Completed', value: 'Completed' }
  ]
});

// assigned Select
VirtualSelect.init({
  ele: '#assignedSelect',
  options: [
    { label: 'Max Boucaut', value: 'Max Boucaut' },
    { label: 'Natasha Tegg', value: 'Natasha Tegg' },
    { label: 'Ethan Zahel', value: 'Ethan Zahel' },
    { label: 'Ryan Frazer', value: 'Ryan Frazer' },
    { label: 'Julian Marconi', value: 'Julian Marconi' },
    { label: 'Poppy Dalley', value: 'Poppy Dalley' }
  ],
  multiple: true,
  showValueAsTags: true
});
