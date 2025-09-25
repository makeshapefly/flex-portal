/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: email dashboards init Js File
*/

import emailListData from '../../json/dashboards/email-list';
import { getColorCodes } from '../helpers/helper';
import ApexCharts from 'apexcharts';

//Gradient Donut Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('gradientDonutApp', () => ({
    series: [33, 57],
    labels: ['Open Rate', 'Click Rate'],
    init() {
      // Initial chart render
      this.renderChart();

      // Reload chart on window resize
      window.addEventListener('resize', this.reloadChart.bind(this));
    },
    renderChart() {
      // Destroy previous instance if exists
      if (this.gradientDonutChart) this.gradientDonutChart.destroy();

      // Initialize new chart
      this.gradientDonutChart = new ApexCharts(this.$refs.gradientDonutChart, this.options);
      this.gradientDonutChart.render();
    },
    reloadChart() {
      // Handle the logic for resizing
      this.renderChart(); // Re-render chart on resize
    },
    get options() {
      return {
        series: this.series,
        labels: this.labels,
        chart: {
          height: 200,
          type: 'donut'
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: getColorCodes(this.$refs.gradientDonutChart.dataset),
        fill: {
          type: 'gradient'
        },
        legend: {
          formatter: function (val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
          },
          position: 'bottom'
        },
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

//Column with Data Labels Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('labelColumnApp', () => ({
    series: [
      {
        name: 'Inflation',
        data: [5, 4, 7, 9, 2, 6, 10, 6, 3, 7, 9, 5]
      }
    ],
    init() {
      // Initial chart render
      this.renderChart();

      // Reload chart on window resize
      window.addEventListener('resize', this.reloadChart.bind(this));
    },
    renderChart() {
      // Destroy previous instance if exists
      if (this.labelColumnChart) this.labelColumnChart.destroy();

      // Initialize new chart
      this.labelColumnChart = new ApexCharts(this.$refs.labelColumnChart, this.options);
      this.labelColumnChart.render();
    },
    reloadChart() {
      // Handle the logic for resizing
      this.renderChart(); // Re-render chart on resize
    },
    get options() {
      return {
        series: this.series,
        chart: {
          height: 100,
          type: 'bar',
          toolbar: {
            show: false
          },
          sparkline: { enabled: !0 }
        },
        colors: getColorCodes(this.$refs.labelColumnChart.dataset)
      };
    }
  }));
});

//Line with Data Labels Charts
document.addEventListener('alpine:init', () => {
  Alpine.data('labelLineApp', () => ({
    series: [
      {
        name: 'Sent',
        data: [28, 29, 33, 36, 32, 32, 33]
      },
      {
        name: 'Opened',
        data: [12, 11, 14, 18, 17, 13, 13]
      }
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    init() {
      // Initial chart render
      this.renderChart();

      // Reload chart on window resize
      window.addEventListener('resize', this.reloadChart.bind(this));
    },
    renderChart() {
      // Destroy previous instance if exists
      if (this.labelLineChart) this.labelLineChart.destroy();

      // Initialize new chart
      this.labelLineChart = new ApexCharts(this.$refs.labelLineChart, this.options);
      this.labelLineChart.render();
    },
    reloadChart() {
      // Handle the logic for resizing
      this.renderChart(); // Re-render chart on resize
    },
    get options() {
      return {
        series: this.series,
        chart: {
          defaultLocale: 'en',
          height: 280,
          type: 'area',
          toolbar: {
            show: false
          }
        },
        stroke: {
          curve: 'smooth'
        },
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          },
          padding: {
            right: 0,
            top: -20
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.4,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        xaxis: {
          categories: this.labels
        },
        colors: getColorCodes(this.$refs.labelLineChart.dataset) // Utilize the function to get hash color codes
      };
    }
  }));
});

//Mail Statistic Charts
document.addEventListener('alpine:init', () => {
  Alpine.data('mailStatisticApp', () => ({
    series: [
      {
        name: 'Sent',
        data: [
          {
            x: 'Jan',
            y: 43
          },
          {
            x: 'Feb',
            y: 58
          }
        ]
      },
      {
        name: 'Pending',
        data: [
          {
            x: 'Jan',
            y: 33
          },
          {
            x: 'Feb',
            y: 38
          }
        ]
      },
      {
        name: 'Cancel',
        data: [
          {
            x: 'Jan',
            y: 55
          },
          {
            x: 'Feb',
            y: 21
          }
        ]
      }
    ],
    init() {
      // Initial chart render
      this.renderChart();

      // Reload chart on window resize
      window.addEventListener('resize', this.reloadChart.bind(this));
    },
    renderChart() {
      // Destroy previous instance if exists
      if (this.mailStatisticChart) this.mailStatisticChart.destroy();

      // Initialize new chart
      this.mailStatisticChart = new ApexCharts(this.$refs.mailStatisticChart, this.options);
      this.mailStatisticChart.render();
    },
    reloadChart() {
      // Handle the logic for resizing
      this.renderChart(); // Re-render chart on resize
    },
    get options() {
      return {
        series: this.series,
        chart: {
          height: 335,
          type: 'line'
        },
        stroke: {
          curve: 'smooth'
        },
        plotOptions: {
          line: {
            isSlopeChart: true
          }
        },
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'center'
        },
        xaxis: {
          axisBorder: {
            show: false
          }
        },
        colors: getColorCodes(this.$refs.mailStatisticChart.dataset) // Utilize the function to get hash color codes
      };
    }
  }));
});

//Time Spending Charts
document.addEventListener('alpine:init', () => {
  Alpine.data('timeSpendingApp', () => ({
    series: [
      {
        name: 'Total Spend',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      },
      {
        name: 'Sales',
        data: [62, 69, 91, 54, 10, 41, 35, 51, 49]
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
      if (this.timeSpendingChart) this.timeSpendingChart.destroy();

      // Initialize new chart
      this.timeSpendingChart = new ApexCharts(this.$refs.timeSpendingChart, this.options);
      this.timeSpendingChart.render();
    },
    reloadChart() {
      // Handle the logic for resizing
      this.renderChart(); // Re-render chart on resize
    },
    formatCurrency: (x) => {
      return '$' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + 'k';
    },
    get options() {
      return {
        series: this.series,
        chart: {
          defaultLocale: 'en',
          height: 120,
          type: 'line',
          zoom: {
            enabled: true
          },
          sparkline: { enabled: !0 }
        },
        stroke: {
          curve: 'straight'
        },
        xaxis: {
          title: {
            text: 'Xaxis'
          },
          categories: this.labels
        },
        tooltip: {
          x: {
            show: true
          },
          y: {
            formatter: (val) => {
              return this.formatCurrency(val);
            }
          }
        },
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'center',
          offsetY: 8
        },
        stroke: {
          width: 1
        },
        colors: getColorCodes(this.$refs.timeSpendingChart.dataset), // Utilize the function to get hash color codes
        grid: {
          padding: {
            top: 0,
            right: 5,
            bottom: 20
          }
        }
      };
    }
  }));
});

//email tables
function emailsTable() {
  return {
    emails: [],
    filterEmails: [],
    searchTerm: '',
    sortBy: '',
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
      this.selectAll = !this.selectAll;
      if (this.selectAll) this.selectedItems = [...this.filterEmails];
      else this.selectedItems = [];
    },
    toggleItem(product) {
      if (this.selectedItems.includes(product)) {
        this.selectedItems = this.selectedItems.filter((item) => item !== product);
      } else {
        this.selectedItems.push(product);
      }
      this.selectAll = this.selectedItems.length === this.filterEmails.length;
    },
    deleteSelectedItems() {
      this.filterEmails = this.filterEmails.filter((email) => !this.selectedItems.includes(email));
      this.selectedItems = [];
      this.selectAll = false;
    },
    get totalPages() {
      return Math.ceil(this.filterEmails.length / this.itemsPerPage);
    },
    get displayedEmails() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filterEmails.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filterEmails.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filterEmails.length);
    },
    init() {
      let startID = 1478; // Starting ID
      emailListData.forEach((product, index) => {
        // Generate categoryID starting from "PEE-1478"
        product.emailsID = 'PEE-' + (startID + index).toString();
      });
      this.emails = emailListData;
      this.filteredEmail();
    },
    filteredEmail() {
      this.filterEmails = this.emails;
      const searchTerm = this.searchTerm.trim().toLowerCase();
      if (searchTerm) {
        this.filterEmails = this.filterEmails.filter((email) => {
          return Object.values(email).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
    },
    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }

      this.emails.sort((a, b) => {
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
      const headers = Object.keys(this.emails[0]).join(',');
      csvContent += headers + '\n';

      // Add table rows
      this.emails.forEach((product) => {
        const values = Object.values(product).join(',');
        csvContent += values + '\n';
      });

      // Encode CSV content and create a download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'emails.csv');
      document.body.appendChild(link);

      // Trigger the download
      link.click();
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('emailsTable', emailsTable);
});
