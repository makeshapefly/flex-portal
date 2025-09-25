/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: overview init Js File
*/

import usersData from '../../../json/apps/projects/users';
import { getColorCodes } from '../../helpers/helper';
import ApexCharts from 'apexcharts';
import user5 from '../../../images/avatar/user-5.png';

document.addEventListener('alpine:init', () => {
  Alpine.data('dropdown', () => ({
    open: false,
    currentUser: {
      name: 'Ina Payne',
      role: 'Project Manager',
      image: user5
    },
    users: [],
    init() {
      this.users = usersData;
    },
    toggle() {
      if (this.open) return this.close();
      this.$refs.button.focus();
      this.open = true;
    },
    close(focusAfter) {
      if (!this.open) return;
      this.open = false;
      focusAfter && focusAfter.focus();
    },
    selectUser(user) {
      this.currentUser = user;
      this.close(this.$refs.button);
    },
    isActive(user) {
      return this.currentUser.name === user.name;
    }
  }));
});

//Working Hours Charts
document.addEventListener('alpine:init', () => {
  Alpine.data('workingHoursApp', () => ({
    values: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 16, 2, 7, 8],
    categories: [
      '1/11/2024',
      '2/11/2024',
      '3/11/2024',
      '4/11/2024',
      '5/11/2024',
      '6/11/2024',
      '7/11/2024',
      '8/11/2024',
      '9/11/2024',
      '10/11/2024',
      '11/11/2024',
      '12/11/2024',
      '1/11/2025',
      '2/11/2025',
      '3/11/2025',
      '4/11/2025',
      '5/11/2025',
      '6/11/2025'
    ],
    init() {
      // Fetch color codes first
      this.colorCodes = getColorCodes(this.$refs.workingHoursChart.dataset);
      // Initialize the chart with options
      let workingHoursChart = new ApexCharts(this.$refs.workingHoursChart, this.options);
      workingHoursChart.render();
    },
    formatCurrency: (x) => {
      return '$' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
    get options() {
      return {
        series: [
          {
            name: 'Hours',
            data: this.values
          }
        ],
        chart: {
          defaultLocale: 'en',
          height: 300,
          type: 'line',
          zoom: {
            enabled: true
          },
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 0,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.15
          }
        },
        stroke: {
          width: 5,
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: this.categories,
          tickAmount: 10,
          labels: {
            formatter: function (value, timestamp, opts) {
              return opts.dateFormatter(new Date(timestamp), 'dd MMM');
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: [this.colorCodes[1]],
            // shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        colors: [this.colorCodes[0]],
        grid: {
          padding: {
            top: 0,
            right: 5,
            bottom: 0
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        }
      };
    }
  }));
});

//Column with Data Labels Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('taskActivitiesApp', () => ({
    series: [
      {
        name: 'Total Task',
        data: [3, 4, 8, 2, 6, 10, 8]
      }
    ],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    init() {
      let taskActivitiesChart = new ApexCharts(this.$refs.taskActivitiesChart, this.options);
      taskActivitiesChart.render();
    },
    get options() {
      return {
        series: this.series,
        chart: {
          height: 300,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top' // top, center, bottom
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758']
          }
        },

        xaxis: {
          categories: this.labels,
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: true
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: true
          }
        },
        colors: getColorCodes(this.$refs.taskActivitiesChart.dataset),
        title: {
          text: 'Monthly Inflation in Argentina, 2002',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      };
    }
  }));
});
