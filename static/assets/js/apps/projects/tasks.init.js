/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: tasks init Js File
*/

import tasksData from '../../../json/apps/projects/projects-task';
import todoTasksData from '../../../json/apps/projects/todo-tasks';

function todoApp() {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  return {
    tasks: [],
    newTask: '',
    init() {
      todoTasksData.forEach((task) => {
        if (task.date == 'today') {
          task.date = today;
        } else if (task.date == 'yesterday') {
          task.date = yesterday;
        }
      });
      this.tasks = todoTasksData;
    },
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.unshift({ text: this.newTask, completed: false, editing: false, date: today });
        this.newTask = '';
      }
    },
    deleteTask(task) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
    },
    enableEditing(task) {
      task.editing = true;
      this.$nextTick(() => this.$refs[`edit-${this.tasks.indexOf(task)}`].focus());
    },
    disableEditing(task) {
      task.editing = false;
    },
    get todayTasks() {
      return this.tasks.filter((task) => task.date === today);
    },
    get yesterdayTasks() {
      return this.tasks.filter((task) => task.date === yesterday);
    },
    get todayTasksCount() {
      return this.todayTasks.length;
    },
    get yesterdayTasksCount() {
      return this.yesterdayTasks.length;
    }
  };
}
function tasksTable() {
  return {
    projects: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    selectAll: false,
    selectedItems: [],
    currentPage: 1,
    itemsPerPage: 5,
    toggleAll() {
      this.selectedItems = this.selectAll ? [...this.projects] : [];
    },
    get totalPages() {
      return Math.ceil(this.projects.length / this.itemsPerPage);
    },
    get displayedProjects() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.projects.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.projects.length);
    },
    get newTask() {
      return this.projects.filter((project) => project.status === 'New');
    },
    get pendingTask() {
      return this.projects.filter((project) => project.status === 'Pending');
    },
    get completedTask() {
      return this.projects.filter((project) => project.status === 'Completed');
    },
    get totalTaskCount() {
      return this.projects.length;
    },
    get newTaskCount() {
      return this.newTask.length;
    },
    get pendingTaskCount() {
      return this.pendingTask.length;
    },
    get completedTaskCount() {
      return this.completedTask.length;
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.projects.length);
    },
    init() {
      let startID = 22697; // Starting ID
      tasksData.forEach((project, index) => {
        // Generate categoryID starting from "PEC-24151"
        project.projectID = 'PEP-' + (startID + index).toString();
      });
      this.projects = tasksData;
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
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('todoApp', todoApp);
  Alpine.data('tasksTable', tasksTable);
});
