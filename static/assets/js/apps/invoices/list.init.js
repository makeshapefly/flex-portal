/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: invoices list init Js File
*/

import invoicesListData from '../../../json/apps/invoice/invoices-list';
import ApexCharts from 'apexcharts';
import { getColorCodes } from '../../helpers/helper';

//Simple Donut Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('simpleDonutApp', () => ({
    series: [16, 8, 12, 9],
    labels: ['Paid', 'Unpaid', 'Pending', 'Overdue'],
    init() {
      let simpleDonutChart = new ApexCharts(this.$refs.simpleDonutChart, this.options);
      simpleDonutChart.render();
    },
    get options() {
      return {
        series: this.series,
        labels: this.labels,
        chart: {
          height: 110,
          type: 'donut'
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          pie: {
            expandOnClick: true,
            donut: {
              size: '60%'
            }
          }
        },
        legend: {
          offsetY: -10
        },
        colors: getColorCodes(this.$refs.simpleDonutChart.dataset),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      };
    }
  }));
});

//invoices table
function invoicesTable() {
  return {
    invoices: [],
    filteredInvoices: [],
    sortBy: '',
    deleteItem: '',
    searchTerm: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    selectAll: false,
    selectedItems: [],
    currentPage: 1, // Ensure currentPage is initialized
    itemsPerPage: 10,
    toggleAll() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.selectedItems = [...this.filteredInvoices];
      } else {
        this.selectedItems = [];
      }
    },
    toggleItem(product) {
      if (this.selectedItems.includes(product)) {
        this.selectedItems = this.selectedItems.filter((item) => item !== product);
      } else {
        this.selectedItems.push(product);
      }
      this.selectAll = this.selectedItems.length === this.filteredInvoices.length;
    },
    deleteSelectedItems() {
      this.selectedItems.forEach((item) => {
        this.deleteItem = item.invoicesID;
        this.deleteInvoice();
      });
      this.selectedItems = [];
      this.selectAll = false;
    },
    deleteInvoice() {
      const index = this.filteredInvoices.findIndex((item) => item.invoicesID === this.deleteItem);
      this.filteredInvoices.splice(index, 1);
    },
    get totalPages() {
      return Math.ceil(this.invoices.length / this.itemsPerPage);
    },
    get displayedInvoices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.filteredInvoices.slice(start, end);
    },
    filterInvoices() {
      this.filteredInvoices = this.invoices;
      const seachTerm = this.searchTerm;
      if (seachTerm) {
        this.filteredInvoices = this.filteredInvoices.filter((invoice) => {
          return Object.values(invoice).some((value) =>
            value.toString().toLowerCase().includes(seachTerm)
          );
        });
      }
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.invoices.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.invoices.length);
    },
    get paidInvoices() {
      return this.invoices.filter((invoice) => invoice.status === 'Paid');
    },
    get pendingInvoices() {
      return this.invoices.filter((invoice) => invoice.status === 'Pending');
    },
    get unpaidInvoices() {
      return this.invoices.filter((invoice) => invoice.status === 'Unpaid');
    },
    get overdueInvoices() {
      return this.invoices.filter((invoice) => invoice.status === 'Overdue');
    },
    get paidCount() {
      return this.paidInvoices.length;
    },
    get pendingCount() {
      return this.pendingInvoices.length;
    },
    get unpaidCount() {
      return this.unpaidInvoices.length;
    },
    get overdueCount() {
      return this.overdueInvoices.length;
    },
    get paidPercentage() {
      return (this.paidCount / this.invoices.length) * 100;
    },
    get pendingPercentage() {
      return (this.pendingCount / this.invoices.length) * 100;
    },
    get unpaidPercentage() {
      return (this.unpaidCount / this.invoices.length) * 100;
    },
    get overduePercentage() {
      return (this.overdueCount / this.invoices.length) * 100;
    },
    init() {
      let startID = 15475; // Starting ID
      invoicesListData.forEach((user, index) => {
        user.invoicesID = 'PEI-' + (startID + index).toString();
      });
      this.invoices = invoicesListData;
      this.filterInvoices();
    },
    sort(column) {
      if (column === this.sortBy)
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.invoices.sort((a, b) => {
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
    exportTable() {
      // Prepare table data for export
      let csvContent = 'data:text/csv;charset=utf-8,';

      // Add table headers
      const headers = Object.keys(this.invoices[0]).join(',');
      csvContent += headers + '\n';

      // Add table rows
      this.invoices.forEach((product) => {
        const values = Object.values(product).join(',');
        csvContent += values + '\n';
      });

      // Encode CSV content and create a download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'invoices.csv');
      document.body.appendChild(link);

      // Trigger the download
      link.click();
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('invoicesTable', invoicesTable);
});
