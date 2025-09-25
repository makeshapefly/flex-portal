/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: hospital dashboards init Js File
*/

import hospitalAppointmentData from '../../json/dashboards/hospital-appointment';
import patientListData from '../../json/dashboards/patient-list';
import { getColorCodes } from '../helpers/helper';
import ApexCharts from 'apexcharts';

//Patient visit Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('patientVisitApp', () => ({
    series: [
      {
        name: 'Net Profit',
        data: [32, 39, 43, 49, 52, 58, 63, 60, 66]
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
      if (this.patientVisitChart) this.patientVisitChart.destroy();

      // Initialize new chart
      this.patientVisitChart = new ApexCharts(this.$refs.patientVisitChart, this.options);
      this.patientVisitChart.render();
    },
    reloadChart() {
      // Handle the logic for resizing
      this.renderChart(); // Re-render chart on resize
    },
    get options() {
      return {
        series: this.series,
        chart: {
          height: 320,
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        colors: getColorCodes(this.$refs.patientVisitChart.dataset),
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
        },
        fill: {
          opacity: 1
        },
        yaxis: {
          show: false
        },
        grid: {
          show: false,
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          },
          padding: {
            top: -30,
            right: 0,
            bottom: -12,
            left: 0
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '$ ' + val + 'k';
            }
          }
        }
      };
    }
  }));
});

//Patient Visit by Department Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('patientDepartmentApp', () => ({
    series: [44, 55, 41, 18],
    labels: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'],
    init() {
      // Initial chart render
      this.renderChart();

      // Reload chart on window resize
      window.addEventListener('resize', this.reloadChart.bind(this));
    },
    renderChart() {
      // Destroy previous instance if exists
      if (this.patientDepartmentChart) this.patientDepartmentChart.destroy();

      // Initialize new chart
      this.patientDepartmentChart = new ApexCharts(this.$refs.patientDepartmentChart, this.options);
      this.patientDepartmentChart.render();
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
          height: 250,
          width: '350',
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
        colors: getColorCodes(this.$refs.patientDepartmentChart.dataset),
        fill: {
          type: 'gradient'
        },
        legend: {
          formatter: function (val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
                height: 150
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

//Basic Charts
document.addEventListener('alpine:init', () => {
  Alpine.data('patientsHistoryApp', () => ({
    series: [
      {
        name: 'Inject Patients',
        data: [24, 32, 28, 62, 67, 80, 96, 106]
      },
      {
        name: 'Surgery Patients',
        data: [5, 14, 19, 27, 35, 44, 22, 49]
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
      if (this.patientsHistoryChart) this.patientsHistoryChart.destroy();

      // Initialize new chart
      this.patientsHistoryChart = new ApexCharts(this.$refs.patientsHistoryChart, this.options);
      this.patientsHistoryChart.render();
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
          height: 195,
          type: 'line',
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3,
          lineCap: 'butt'
        },
        xaxis: {
          categories: this.labels
        },
        tooltip: {
          x: {
            show: true
          }
        },
        colors: getColorCodes(this.$refs.patientsHistoryChart.dataset), // Utilize the function to get hash color codes
        grid: {
          strokeDashArray: 4,
          position: 'back',
          padding: {
            top: -20,
            right: 0,
            bottom: 0
          }
        }
      };
    }
  }));
});

//appointment Request lists
function appointmentRequest() {
  return {
    appointmentItems: [],
    init() {
      this.appointmentItems = hospitalAppointmentData;
    },
    setStatus(index, newStatus) {
      this.appointmentItems[index].status = newStatus;
    }
  };
}

//email tables
function patientTable() {
  return {
    patient: [],
    filterPatient: [],
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
      if (this.selectAll) {
        this.selectedItems = [...this.filterPatient];
      } else {
        this.selectedItems = [];
      }
    },
    toggleItem(product) {
      if (this.selectedItems.includes(product))
        this.selectedItems = this.selectedItems.filter((item) => item !== product);
      else this.selectedItems.push(product);
      this.selectAll = this.selectedItems.length === this.filterPatient.length;
    },
    deleteSelectedItems() {
      this.filterPatient = this.filterPatient.filter(
        (patient) => !this.selectedItems.includes(patient)
      );
      this.selectedItems = [];
      this.selectAll = false;
    },
    get totalPages() {
      return Math.ceil(this.filterPatient.length / this.itemsPerPage);
    },
    get displayedPatient() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filterPatient.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filterPatient.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filterPatient.length);
    },
    init() {
      let startID = 1478; // Starting ID
      patientListData.forEach((product, index) => {
        // Generate categoryID starting from "PEE-1478"
        product.patientID = 'PEE-' + (startID + index).toString();
      });
      this.patient = patientListData;
      this.filteredPatients();
    },
    filteredPatients() {
      this.filterPatient = this.patient;
      const searchTerm = this.searchTerm.trim().toLowerCase();
      if (searchTerm) {
        this.filterPatient = this.filterPatient.filter((patient) => {
          return Object.values(patient).some((value) =>
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

      this.patient.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        let comparison = 0;
        if (valueA > valueB) comparison = 1;
        else if (valueA < valueB) comparison = -1;
        return this.sortDirection === 'desc' ? comparison * -1 : comparison;
      });
    },
    deleteItem(patient) {
      this.filterPatient = this.filterPatient.filter((p) => p !== patient);
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
  Alpine.data('patientTable', patientTable);
  Alpine.data('appointmentRequest', appointmentRequest);
});

//Hospital Birth & Death Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('hospitalBirthDeathApp', () => ({
    series: [
      {
        name: 'Birth Case',
        data: [80, 50, 30, 70, 99, 36]
      },
      {
        name: 'Death Case',
        data: [10, 14, 28, 16, 34, 87]
      },
      {
        name: 'Accident Case',
        data: [44, 98, 54, 46, 34, 22]
      }
    ],
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    init() {
      // Initial chart render
      this.renderChart();

      // Reload chart on window resize
      window.addEventListener('resize', this.reloadChart.bind(this));
    },
    renderChart() {
      // Destroy previous instance if exists
      if (this.hospitalBirthDeathChart) this.hospitalBirthDeathChart.destroy();

      // Initialize new chart
      this.hospitalBirthDeathChart = new ApexCharts(
        this.$refs.hospitalBirthDeathChart,
        this.options
      );
      this.hospitalBirthDeathChart.render();
    },
    reloadChart() {
      // Handle the logic for resizing
      this.renderChart(); // Re-render chart on resize
    },
    get options() {
      return {
        series: this.series,
        chart: {
          height: 340,
          type: 'radar'
        },
        colors: getColorCodes(this.$refs.hospitalBirthDeathChart.dataset),
        stroke: {
          width: 1
        },
        fill: {
          opacity: 0.1
        },
        xaxis: {
          categories: this.labels
        }
      };
    }
  }));
});
