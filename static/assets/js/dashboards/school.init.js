/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: school dashboards init Js File
*/

import resultData from '../../json/dashboards/result-list';
import { getColorCodes } from '../helpers/helper';
import ApexCharts from 'apexcharts';

//Gradient Donut Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('gradientDonutApp', () => ({
    series: [44, 55],
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
        chart: {
          height: 210,
          type: 'donut'
        },
        legend: {
          show: true,
          position: 'bottom'
        },
        labels: ['Process', 'In Process'],
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
        }
      };
    }
  }));
});

//Students charts
document.addEventListener('alpine:init', () => {
  Alpine.data('dumbbellColumnApp', () => ({
    series: [
      {
        data: [
          {
            x: '2018',
            y: [241, 100]
          },
          {
            x: '2019',
            y: [150, 41]
          },
          {
            x: '2020',
            y: [210, 100]
          },
          {
            x: '2021',
            y: [200, 10]
          },
          {
            x: '2022',
            y: [100, 10]
          },
          {
            x: '2023',
            y: [190, 120]
          },
          {
            x: '2024',
            y: [154, 241]
          }
        ]
      }
    ],
    init() {
      // Fetch color codes first
      this.colorCodes = getColorCodes(this.$refs.dumbbellColumnChart.dataset);

      // Initialize the chart with options
      let dumbbellColumnChart = new ApexCharts(this.$refs.dumbbellColumnChart, this.options);
      dumbbellColumnChart.render();
    },
    get options() {
      return {
        series: this.series,
        chart: {
          height: 290,
          type: 'rangeBar',
          zoom: {
            enabled: false
          }
        },
        plotOptions: {
          bar: {
            isDumbbell: true,
            columnWidth: 3,
            dumbbellColors: [['#008FFB', '#00E396']]
          }
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          position: 'top',
          horizontalAlign: 'center',
          customLegendItems: ['New Students', 'Leave Students']
        },
        fill: {
          type: 'gradient',
          gradient: {
            type: 'vertical',
            gradientToColors: ['#00E396'],
            inverseColors: true,
            stops: [0, 100]
          }
        },
        colors: getColorCodes(this.$refs.dumbbellColumnChart.dataset),
        grid: {
          padding: {
            bottom: -10,
            right: 0
          },
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        xaxis: {
          tickPlacement: 'on'
        }
      };
    }
  }));
});

//Top score
const avatatImages = import.meta.globEager('/assets/images/avatar/*.{png,jpg,jpeg,svg}');
function emailsTable() {
  return {
    emails: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    selectAll: false,
    selectedItems: [],
    currentPage: 1, // Ensure currentPage is initialized
    itemsPerPage: 5,
    toggleAll() {
      this.selectedItems = this.selectAll ? [...this.emails] : [];
    },
    get totalPages() {
      return Math.ceil(this.emails.length / this.itemsPerPage);
    },
    get displayedEmails() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.emails.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.emails.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.emails.length);
    },
    init() {
      let startID = 1478; // Starting ID
      resultData.forEach((product, index) => {
        // Generate categoryID starting from "PEE-1478"
        product.emailsID = 'PEE-' + (startID + index).toString();
      });
      this.emails = resultData;
    },
    sort(column) {
      if (column === this.sortBy)
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      else {
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

function calendar() {
  const date = new Date();
  const today = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const scrollableDiv = document
    .getElementById('horizontalScroll')
    ?.querySelector('.simplebar-content-wrapper');
  setTimeout(() => {
    const activeDiv = scrollableDiv.querySelector('a.active');
    const leftPos = scrollableDiv.clientWidth / 2 - 32;
    if (activeDiv && activeDiv.offsetLeft > leftPos) {
      scrollableDiv.scrollBy({
        left: activeDiv.offsetLeft - leftPos, // Use the vertical scroll delta to scroll vertically
        behavior: 'smooth' // Apply smooth scrolling
      });
    }
  }, 0);

  // Add an event listener for the mouse wheel event
  scrollableDiv?.addEventListener('wheel', function (event) {
    event.preventDefault(); // Prevent default vertical scrolling

    // Scroll the div horizontally by the delta of the mouse wheel
    scrollableDiv.scrollLeft += event.deltaY;
  });

  return {
    today: today,
    monthName: monthNames[month],
    year: year,
    daysInMonth: new Date(year, month + 1, 0).getDate()
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('emailsTable', emailsTable);
  Alpine.data('calendar', calendar);
});

//holiday swiper
var swiper = new Swiper('.mySwiper', {
  spaceBetween: 24,
  grabCursor: true,
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});
