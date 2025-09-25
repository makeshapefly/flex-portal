/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: CRM dashboards init Js File
*/

import leadsListData from '../../json/dashboards/leads-list';
import { getColorCodes } from '../helpers/helper';
import ApexCharts from 'apexcharts';

//Sales Analytics Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('salesAnalyticsApp', () => ({
    series: [
      {
        name: 'Visitor',
        data: [154, 137, 41, 67, 43, 20, 41, 67, 20, 41, 32, 98]
      },
      {
        name: 'Add Cart',
        data: [13, 23, 20, 35, 27, 16, 8, 13, 20, 41, 44, 67]
      },
      {
        name: 'Check Out',
        data: [11, 54, 15, 21, 14, 24, 15, 21, 20, 41, 54, 35]
      },
      {
        name: 'Favorite',
        data: [21, 19, 25, 22, 8, 19, 13, 22, 20, 41, 49, 33]
      }
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    init() {
      // Initial chart render
      this.renderChart();

      // Reload chart on window resize
      window.addEventListener('resize', this.reloadChart.bind(this));
    },
    renderChart() {
      // Destroy previous instance if exists
      if (this.salesAnalyticsChart) this.salesAnalyticsChart.destroy();

      // Initialize new chart
      this.salesAnalyticsChart = new ApexCharts(this.$refs.salesAnalyticsChart, this.options);
      this.salesAnalyticsChart.render();
    },
    reloadChart() {
      // Handle the logic for resizing
      this.renderChart(); // Re-render chart on resize
    },
    get options() {
      return {
        series: this.series,
        chart: {
          height: 300,
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: getColorCodes(this.$refs.salesAnalyticsChart.dataset),
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '35%'
          }
        },

        xaxis: {
          categories: this.labels,
          axisBorder: {
            show: false
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          offsetY: -5
        },
        grid: {
          show: true,
          borderColor: '#90A4AE',
          strokeDashArray: 2,
          position: 'back',
          padding: {
            top: 10,
            right: 0
          },
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        fill: {
          opacity: 1
        }
      };
    }
  }));
});

//Basic
document.addEventListener('alpine:init', () => {
  Alpine.data('basicRadialbarApp', () => ({
    series: [87.6],
    labels: ['This Month'],
    init() {
      // Fetch color codes first
      this.colorCodes = getColorCodes(this.$refs.basicRadialbarChart.dataset);

      // Initialize the chart with options
      let basicRadialbarChart = new ApexCharts(this.$refs.basicRadialbarChart, this.options);
      basicRadialbarChart.render();
    },
    get options() {
      return {
        series: this.series,
        chart: {
          height: 300,
          type: 'radialBar'
        },
        colors: getColorCodes(this.$refs.basicRadialbarChart.dataset),
        plotOptions: {
          radialBar: {
            hollow: {
              size: '60%'
            },
            track: {
              background: [this.colorCodes[1]],
              dropShadow: {
                enabled: true,
                top: 0,
                left: 0,
                blur: 10,
                opacity: 0.02
              }
            },
            dataLabels: {
              name: {
                fontSize: '15px'
              },
              value: {
                show: true,
                fontSize: '14px',
                fontWeight: 700,
                offsetY: 10,
                formatter: function (val) {
                  return '$' + val + 'k';
                }
              }
            }
          }
        },
        labels: this.labels
      };
    }
  }));
});

//Leads tables
function leadsTable() {
  return {
    leads: [],
    filterLeads: [],
    sortBy: '',
    searchTerm: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    selectAll: false,
    selectedItems: [],
    currentPage: 1, // Ensure currentPage is initialized
    itemsPerPage: 8,
    toggleAll() {
      this.selectedItems = this.selectAll ? [...this.filterLeads] : [];
    },
    get totalPages() {
      return Math.ceil(this.filterLeads.length / this.itemsPerPage);
    },
    get displayedLeads() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filterLeads.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filterLeads.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filterLeads.length);
    },
    init() {
      let startID = 1478; // Starting ID
      leadsListData.forEach((product, index) => {
        // Generate leadsID starting from "PEL-1478"
        product.leadsID = 'PEE-' + (startID + index).toString();
      });
      this.leads = leadsListData;
      this.filteredLeads();
    },
    filteredLeads() {
      this.filterLeads = this.leads;
      const searchTerm = this.searchTerm.trim().toLowerCase();
      if (searchTerm) {
        this.filterLeads = this.filterLeads.filter((lead) => {
          return Object.values(lead).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
    },
    sort(column) {
      if (column === this.sortBy)
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }

      this.leads.sort((a, b) => {
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
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('leadsTable', leadsTable);
});
