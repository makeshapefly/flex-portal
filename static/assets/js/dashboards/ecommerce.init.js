/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: ecommerce dashboards init Js File
*/

import { getColorCodes } from '../helpers/helper';
import ApexCharts from 'apexcharts';

//Simple Donut Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('simpleDonutApp', () => ({
    series: [44, 55, 41, 17, 15],
    init() {
      // Initial chart render
      this.renderChart();
      // Reload chart on window resize
      window.addEventListener('resize', this.reloadChart.bind(this));
    },
    renderChart() {
      // Destroy previous instance if exists
      if (this.simpleDonutChart) this.simpleDonutChart.destroy();

      // Initialize new chart
      this.simpleDonutChart = new ApexCharts(this.$refs.simpleDonutChart, this.options);
      this.simpleDonutChart.render();
    },
    reloadChart() {
      // Handle the logic for resizing
      this.renderChart(); // Re-render chart on resize
    },
    get options() {
      return {
        series: this.series,
        chart: {
          height: 75,
          type: 'donut'
        },
        dataLabels: {
          enabled: false
        },
        colors: getColorCodes(this.$refs.simpleDonutChart.dataset),
        legend: {
          show: false,
          position: 'bottom'
        },
        grid: {
          padding: {
            top: -6,
            right: 0,
            bottom: -10,
            left: 0
          }
        }
      };
    }
  }));
});

//basic column Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('basicColumnApp', () => ({
    series: [
      {
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      },
      {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
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
      if (this.basicColumnChart) this.basicColumnChart.destroy();

      // Initialize new chart
      this.basicColumnChart = new ApexCharts(this.$refs.basicColumnChart, this.options);
      this.basicColumnChart.render();
    },
    reloadChart() {
      // Handle the logic for resizing
      this.renderChart(); // Re-render chart on resize
    },
    get options() {
      return {
        series: this.series,
        chart: {
          height: 280,
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadius: [10]
          }
        },
        states: {
          hover: {
            filter: {
              type: 'none'
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          lineCap: 'round',
          colors: ['transparent']
        },
        colors: getColorCodes(this.$refs.basicColumnChart.dataset),
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
        },
        yaxis: {
          title: {
            text: '$ (thousands)'
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '$' + val + 'k';
            }
          }
        }
      };
    }
  }));
});

//Net Profit Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('netProfitApp', () => ({
    series: [
      {
        name: 'Profit',
        data: [5, 4, 7, 2, 8, 6, 3]
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
      if (this.netProfitChart) this.netProfitChart.destroy();

      // Initialize new chart
      this.netProfitChart = new ApexCharts(this.$refs.netProfitChart, this.options);
      this.netProfitChart.render();
    },
    reloadChart() {
      // Handle the logic for resizing
      this.renderChart(); // Re-render chart on resize
    },
    get options() {
      return {
        series: this.series,
        chart: {
          height: 130,
          type: 'bar',
          toolbar: {
            show: false
          },
          sparkline: { enabled: !0 }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: 'rounded'
          }
        },
        grid: {
          padding: {
            top: 0,
            right: -10,
            bottom: 0,
            left: -10
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        colors: getColorCodes(this.$refs.netProfitChart.dataset)
      };
    }
  }));
});

//Products tables
function productsTable() {
  return {
    products: [],
    filterProducts: [],
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
      this.selectedItems = this.selectAll ? [...this.filterProducts] : [];
    },
    get totalPages() {
      return Math.ceil(this.filterProducts.length / this.itemsPerPage);
    },
    get displayedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filterProducts.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filterProducts.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filterProducts.length);
    },
    init() {
      let startID = 1478; // Starting ID
      productStockList.forEach((product, index) => {
        // Generate productsID starting from "PEP-1478"
        product.productsID = 'PEP-' + (startID + index).toString();
      });
      this.products = productStockList;
      this.filteredProducts();
    },
    filteredProducts() {
      this.filterProducts = this.products;
      const searchTerm = this.searchTerm.trim().toLowerCase();
      if (searchTerm) {
        this.filterProducts = this.filterProducts.filter((product) => {
          return Object.values(product).some((value) =>
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

      this.products.sort((a, b) => {
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
  Alpine.data('productsTable', productsTable);
});

import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';
import productStockList from '../../json/dashboards/product-stock-list';

//Markers
const markersMap = new jsVectorMap({
  selector: '#markersMap',
  map: 'world',
  markers: [
    {
      name: 'Brazil',
      coords: [-14.235, -51.9253]
    },
    {
      name: 'Russia',
      coords: [61.524, 105.3188]
    },
    {
      name: 'China',
      coords: [35.8617, 104.1954]
    }
  ],
  labels: {
    markers: {
      render: (marker) => marker.name
    }
  },
  selectedMarkers: [1]
});

//Traffic Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('trafficApp', () => ({
    series: [
      {
        name: 'Sales',
        data: [0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2, 4.5, 3.9, 3.5]
      },
      {
        name: 'Visit',
        data: [
          -0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3, -4.4, -4.1, -4,
          -4.1, -3.4, -3.1
        ]
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
      if (this.trafficChart) this.trafficChart.destroy();

      // Initialize new chart
      this.trafficChart = new ApexCharts(this.$refs.trafficChart, this.options);
      this.trafficChart.render();
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
          stacked: true,
          toolbar: {
            show: false
          }
        },
        colors: getColorCodes(this.$refs.trafficChart.dataset),
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '80%'
          }
        },
        dataLabels: {
          enabled: false
        },
        grid: {
          strokeDashArray: 2,
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          },
          padding: {
            top: -20,
            bottom: 0
          },
          row: {
            opacity: 0
          }
        },
        yaxis: {
          min: -5,
          max: 5
        },
        states: {
          hover: {
            filter: {
              type: 'none'
            }
          }
        },
        tooltip: {
          shared: false,
          x: {
            formatter: function (val) {
              return val;
            }
          },
          y: {
            formatter: function (val) {
              return Math.abs(val) + '%';
            }
          }
        },
        xaxis: {
          categories: this.labels,
          labels: {
            formatter: function (val) {
              return Math.abs(Math.round(val)) + '%';
            }
          }
        }
      };
    }
  }));
});
