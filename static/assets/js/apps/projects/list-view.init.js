/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: list view init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import projectListData from '../../../json/apps/projects/projects-list';
import user14 from '/assets/images/avatar/user-14.png';
import user17 from '/assets/images/avatar/user-17.png';
import user16 from '/assets/images/avatar/user-16.png';
import user12 from '/assets/images/avatar/user-12.png';
import user18 from '/assets/images/avatar/user-18.png';
import user15 from '/assets/images/avatar/user-15.png';

//filter client Select
VirtualSelect.init({
  ele: '#filterClientSelect',
  options: [
    { label: 'New', value: 'New' },
    { label: 'Old', value: 'Old' }
  ]
});

//filter Select
VirtualSelect.init({
  ele: '#filterSelect',
  options: [
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Yearly', value: 'Yearly' }
  ]
});

//filter Status Select
VirtualSelect.init({
  ele: '#filterStatusSelect',
  options: [
    { label: 'Active', value: 'Active' },
    { label: 'Pending', value: 'Pending' },
    { label: 'On Hold', value: 'On Hold' },
    { label: 'Completed', value: 'Completed' }
  ]
});

function projectsTable() {
  return {
    projects: [],
    progressPercentage: 0,
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    selectAll: false,
    selectedItems: [],
    filteredProjects: [],
    currentPage: 1,
    itemsPerPage: 10,
    searchTerm: '',
    filterClient: '',
    filterStatus: '',
    filterAssignees: [],
    assigneeNames: [],
    filterDateSelect: '',
    deleteItem: '',
    showViewProjectForm: false,
    showAddProjectForm: false,
    showEditProjectForm: false,
    errors: {},
    projectForm: {
      projectID: '',
      clientName: '',
      dueDate: '',
      image: '',
      progress: '',
      projectID: '',
      projectImage: '',
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
      assignee.map((element) => {
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
        assignees: assigneesImages
      });
    },
    editProject(index) {
      this.handleModal('showEditProjectForm');
      this.projectForm = {
        ...this.projects.find((project) => project.projectID === index),
        totalAmount: this.projects
          .find((project) => project.projectID === index)
          .totalAmount.replace(/,/g, '')
      };
      var statusSelect = document.querySelector('#statusSelect2');
      var assignee = document.querySelector('#assignedSelect');

      this.projectForm.assignees.forEach((element) => {
        this.assigneeNames.push(element.name);
      });
      assignee?.setValue(this.assigneeNames);
      statusSelect?.setValue(this.projectForm.status);
      this.showEditProjectForm = true;
    },
    updateProject() {
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
      this.resetForm();
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
      if (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0))
        this.errors[fieldName] = errorMessage;
      else {
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
        document.body.classList.toggle('overflow-hidden', false);
        this.resetForm();
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
    toggleAll() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.selectedItems = [...this.filteredProjects];
      } else {
        this.selectedItems = [];
      }
    },
    toggleItem(product) {
      if (this.selectedItems.includes(product))
        this.selectedItems = this.selectedItems.filter((item) => item !== product);
      else this.selectedItems.push(product);
      this.selectAll = this.selectedItems.length === this.filteredProjects.length;
    },
    deleteSelectedItems() {
      this.selectedItems.forEach((item) => {
        this.deleteItem = item.projectID;
        this.deleteProject();
      });
      this.selectedItems = [];
      this.selectAll = false;
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
    init() {
      let startID = 22697; // Starting ID
      projectListData.forEach((project, index) => {
        project.projectID = 'PEP-' + (startID + index).toString();
      });
      this.projects = projectListData;
      this.filterProjects();
    },
    filterProjects() {
      this.filteredProjects = this.projects;
      const searchTerm = this.searchTerm.trim().toLowerCase();
      if (searchTerm) {
        this.filteredProjects = this.filteredProjects.filter((project) => {
          return Object.values(project).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
      if (this.filterClient)
        this.filteredProjects = this.filteredProjects.filter(
          (project) => project.clientStatus === this.filterClient
        );
      if (this.filterStatus)
        this.filteredProjects = this.filteredProjects.filter(
          (project) => project.status === this.filterStatus
        );

      if (this.filterAssignees.length > 0)
        this.filteredProjects = this.projects.filter((project) => {
          return this.filterAssignees.every((filterAssignee) =>
            project.assignees.some((assignee) => assignee['name'] === filterAssignee)
          );
        });

      if (this.filterDateSelect) {
        const currentDate = new Date();
        switch (this.filterDateSelect) {
          case 'Weekly':
            this.filteredProjects = this.filteredProjects.filter((project) => {
              const projectDueDate = new Date(project.dueDate);
              const startOfWeek = new Date(currentDate);
              startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
              const endOfWeek = new Date(startOfWeek);
              endOfWeek.setDate(startOfWeek.getDate() + 6);
              return projectDueDate >= startOfWeek && projectDueDate <= endOfWeek;
            });
            break;
          case 'Monthly':
            this.filteredProjects = this.filteredProjects.filter((project) => {
              const projectDueDate = new Date(project.dueDate);
              const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
              const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
              return projectDueDate >= startOfMonth && projectDueDate <= endOfMonth;
            });
            break;
          case 'Yearly':
            this.filteredProjects = this.filteredProjects.filter((project) => {
              const projectDueDate = new Date(project.dueDate);
              const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
              const endOfYear = new Date(currentDate.getFullYear(), 11, 31);
              return projectDueDate >= startOfYear && projectDueDate <= endOfYear;
            });
            break;
          default:
            break;
        }
      }
    },
    sort(column) {
      if (column === this.sortBy)
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }

      this.projects.sort((a, b) => {
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
    updateFilterClient(event) {
      this.filterClient = event.target.value;
    },
    updateFilterStatus(event) {
      this.filterStatus = event.target.value;
      this.filterProjects();
    },
    updateFilterAssignees(event) {
      const assignee = event.target.value;
      if (event.target.checked) this.filterAssignees.push(assignee);
      else this.filterAssignees = this.filterAssignees.filter((a) => a !== assignee);
      this.filterProjects();
    },
    updateFilterDateSelect(event) {
      this.filterDateSelect = event.target.value;
      this.filterProjects();
    },
    deleteProject() {
      this.filteredProjects.forEach((contact, index) => {
        if (contact.projectID == this.deleteItem) this.filteredProjects.splice(index, 1);
      });
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
