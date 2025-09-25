/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: invoices list init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import ApexCharts from 'apexcharts';
import { getColorCodes } from '../../helpers/helper';
import invoicesListData from '../../../json/apps/invoice/invoices-list';

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

//Orders table
function invoicesTable() {
  return {
    invoices: [],
    selectAll: false,
    selectedItems: [],
    deleteItem: '',
    filteredInvoices: [],
    currentPage: 1, // Ensure currentPage is initialized
    itemsPerPage: 8,
    toggleAll() {
      this.selectedItems = this.selectAll ? [...this.filteredInvoices] : [];
    },
    get totalPages() {
      return Math.ceil(this.filteredInvoices.length / this.itemsPerPage);
    },
    get displayedInvoices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.filteredInvoices.slice(start, end);
    },
    filterInvoices() {
      this.filteredInvoices = this.invoices;
      const type = document.querySelector('#sampleSelect').value;
      if (type !== '') {
        this.filteredInvoices = this.filteredInvoices.filter((invoice) => {
          return invoice.status === type;
        });
      }
    },
    deleteInvoice() {
      const index = this.filteredInvoices.findIndex((item) => item.invoicesID === this.deleteItem);
      this.filteredInvoices.splice(index, 1);
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
  Alpine.data('invoicesTable', invoicesTable);
});

//Default select
VirtualSelect.init({
  ele: '#sampleSelect',
  options: [
    { label: 'Paid', value: 'Paid' },
    { label: 'Unpaid', value: 'Unpaid' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Overdue', value: 'Overdue' }
  ]
});
