/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: file manager init Js File
*/

//Files List table
function filesTable() {
  return {
    files: [],
    selectedFile: [],
    folders: [],
    foldername: '',
    folderError: false,
    selectAll: false,
    newFileName: '',
    selectedItems: [],
    filterFiles: [],
    CreateFolderModal: false,
    openRenameModal: false,
    searchTerm: '',
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    currentPage: 1,
    itemsPerPage: 5,
    deleteItem: '',
    toggleAll() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.selectedItems = [...this.filterFiles];
      } else {
        this.selectedItems = [];
      }
    },
    toggleItem(files) {
      if (this.selectedItems.includes(files)) {
        this.selectedItems = this.selectedItems.filter((item) => item !== files);
      } else {
        this.selectedItems.push(files);
      }
      this.selectAll = this.selectedItems.length === this.filterFiles.length;
    },
    deleteSelectedItems() {
      this.selectedItems.forEach((item) => {
        this.deleteItem = item;
        this.deleteFiles();
      });
      this.selectedItems = [];
      this.selectAll = false;
    },
    renameFiles(name) {
      this.fileName = name;
    },
    openRename(file) {
      this.openRenameModal = true;
      this.selectedFile = file;
      this.newFileName = file.documentName;
    },
    renameFile() {
      if (this.newFileName.trim() === '') {
        this.newFileName = this.selectedFile.documentName;
        return;
      }

      this.filterFiles = this.filterFiles.map((file) => {
        if (file.filesID === this.selectedFile.filesID) {
          return { ...file, documentName: this.newFileName };
        }
        return file;
      });

      this.selectedFile = null;
      this.newFileName = '';
      this.openRenameModal = false;
      document.body.classList.toggle('overflow-hidden', false);
    },
    deleteFiles() {
      this.filterFiles = this.filterFiles.filter(
        (files) => files.filesID !== this.deleteItem.filesID
      );
    },
    get totalPages() {
      return Math.ceil(this.filterFiles.length / this.itemsPerPage);
    },
    deleteFolder(folder) {
      this.folders = this.folders.filter((f) => f !== folder);
    },
    filteredFiles() {
      this.filterFiles = this.files;
      const searchTerm = this.searchTerm.trim().toLowerCase();
      if (searchTerm) {
        this.filterFiles = this.filterFiles.filter((contact) => {
          return Object.values(contact).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
    },
    get displayedFiles() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.filterFiles.slice(start, end).map((student) => ({
        ...student
      }));
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filterFiles.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filterFiles.length);
    },
    init() {
      let startID = 1595; // Starting ID
      files.forEach((file, index) => {
        file.filesID = 'PEF-' + (startID + index).toString();
      });
      this.files = files;
      this.folders = folders;
      this.filterFiles = files;
      this.folders;
    },

    validateFoldername() {
      this.folderError = this.foldername.trim() === '';
    },
    addFolder() {
      this.validateFoldername();
      if (!this.folderError) {
        this.folders.unshift({ name: this.foldername, description: '0 items' });
        this.foldername = '';
        this.CreateFolderModal = false;
      }
      document.body.classList.toggle('overflow-hidden', false);
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
  Alpine.data('filesTable', filesTable);
});

import * as echarts from 'echarts';
import { files, folders } from '../../../json/apps/file-manager/file-list';

document.addEventListener('alpine:init', () => {
  Alpine.data('basicBarData1', () => ({
    init() {
      let basicBarChart = echarts.init(this.$refs.basicBarChart, 'light');
      basicBarChart.setOption(this.options);
    },
    get options() {
      return {
        series: [
          {
            type: 'gauge',
            axisLine: {
              lineStyle: {
                width: 20,
                color: [
                  [0.3, '#67e0e3'],
                  [0.7, '#37a2da'],
                  [1, '#fd666d']
                ]
              }
            },
            pointer: {
              itemStyle: {
                color: 'auto'
              }
            },
            grid: {
              top: '0%',
              left: '0%',
              right: '0%',
              bottom: '0%',
              containLabel: true
            },
            axisTick: {
              distance: -20,
              length: 8,
              lineStyle: {
                color: '#fff',
                width: 2
              }
            },
            splitLine: {
              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 4
              }
            },
            axisLabel: {
              color: 'inherit',
              distance: 25,
              fontSize: 12
            },
            detail: {
              valueAnimation: true,
              formatter: '{value} GB',
              fontSize: 16,
              color: 'inherit'
            },
            data: [
              {
                value: 80
              }
            ]
          }
        ]
      };
    }
  }));
});
