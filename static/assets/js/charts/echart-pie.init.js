/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: echarts pie init Js File
*/

import { getColorCodes } from '../helpers/helper';

//Basic Pie
document.addEventListener('alpine:init', () => {
  Alpine.data('basicPieApp', () => ({
    init() {
      this.colorCodes = getColorCodes(this.$refs.basicPieChart.dataset);
      let basicPieChart = echarts.init(this.$refs.basicPieChart, 'light');
      basicPieChart.setOption(this.options);
    },
    get options() {
      return {
        color: this.colorCodes,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: this.colorCodes[6]
          }
        },
        grid: {
          bottom: '0%',
          containLabel: true
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            label: {
              color: this.colorCodes[6]
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    }
  }));
});

//Doughnut Chart with Rounded Corner
document.addEventListener('alpine:init', () => {
  Alpine.data('doughnutRoundedPieApp', () => ({
    init() {
      this.colorCodes = getColorCodes(this.$refs.doughnutRoundedPieChart.dataset);
      let doughnutRoundedPieChart = echarts.init(this.$refs.doughnutRoundedPieChart, 'light');
      doughnutRoundedPieChart.setOption(this.options);
    },
    get options() {
      return {
        color: this.colorCodes,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '0%',
          left: 'center',
          textStyle: {
            color: this.colorCodes[6]
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: this.colorCodes[7],
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 15,
                fontWeight: 'bold'
              }
            },
            label: {
              color: this.colorCodes[6]
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      };
    }
  }));
});

//Doughnut Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('doughnutPieApp', () => ({
    init() {
      this.colorCodes = getColorCodes(this.$refs.doughnutPieChart.dataset);
      let doughnutPieChart = echarts.init(this.$refs.doughnutPieChart, 'light');
      doughnutPieChart.setOption(this.options);
    },
    get options() {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          textStyle: {
            color: this.colorCodes[6]
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              color: this.colorCodes[6]
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 15,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      };
    }
  }));
});

//Half Doughnut Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('halfDouglasnutApp', () => ({
    init() {
      this.colorCodes = getColorCodes(this.$refs.halfDouglasnutChart.dataset);
      let halfDouglasnutChart = echarts.init(this.$refs.halfDouglasnutChart, 'light');
      halfDouglasnutChart.setOption(this.options);
    },
    get options() {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          textStyle: {
            color: this.colorCodes[6]
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '70%'],
            // adjust the start and end angle
            startAngle: 180,
            endAngle: 360,
            label: {
              color: this.colorCodes[6]
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      };
    }
  }));
});
