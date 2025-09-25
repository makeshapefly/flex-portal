/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: invoice init Js File
*/

import { getColorCodes } from '../helpers/helper';
import ApexCharts from 'apexcharts';

//Basic Charts
document.addEventListener('alpine:init', () => {
  Alpine.data('basicLineApp', () => ({
    values: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    init() {
      let basicLineChart = new ApexCharts(this.$refs.basicLineChart, this.options);
      basicLineChart.render();
    },
    formatCurrency: (x) => {
      return '$' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
    get options() {
      return {
        series: [
          {
            name: 'Series name',
            data: this.values
          }
        ],
        chart: {
          defaultLocale: 'en',
          height: 350,
          type: 'line',
          zoom: {
            enabled: true
          },
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
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
        colors: getColorCodes(this.$refs.basicLineChart.dataset), // Utilize the function to get hash color codes
        grid: {
          strokeDashArray: 2,
          padding: {
            top: 0,
            right: 0,
            bottom: 0
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
        }
      };
    }
  }));
});

// ES6 import
import simpleParallax from 'simple-parallax-js';

var image = document.getElementsByClassName('thumbnail');
new simpleParallax(image, {
  delay: 0.8,
  spaceBetween: 30,
  transition: 'cubic-bezier(0,0,0,1)',
  overflow: true
});
