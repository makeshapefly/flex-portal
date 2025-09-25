/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: echarts line init Js File
*/

import { getColorCodes } from '../helpers/helper';

//basic line
document.addEventListener('alpine:init', () => {
  Alpine.data('basicLineApp', () => ({
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ],
    init() {
      this.colorCodes = getColorCodes(this.$refs.basicLineChart.dataset);
      let basicLineChart = echarts.init(this.$refs.basicLineChart, 'light');
      basicLineChart.setOption(this.options);
    },
    get options() {
      return {
        series: this.series,
        color: this.colorCodes,
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        legend: {
          textStyle: {
            color: this.colorCodes[2]
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: this.colorCodes[1] // Change this to the color you want for the horizontal lines
            }
          }
        },
        axisLine: {
          lineStyle: {
            color: this.colorCodes[1]
          }
        },
        grid: {
          top: '5%',
          left: '6%',
          right: '0%',
          bottom: '8%'
        }
      };
    }
  }));
});

//smooth line
document.addEventListener('alpine:init', () => {
  Alpine.data('smoothLineApp', () => ({
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ],
    init() {
      this.colorCodes = getColorCodes(this.$refs.smoothLineChart.dataset);
      let smoothLineChart = echarts.init(this.$refs.smoothLineChart, 'light');
      smoothLineChart.setOption(this.options);
    },
    get options() {
      return {
        series: this.series,
        color: this.colorCodes,
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          textStyle: {
            color: this.colorCodes[2]
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: this.colorCodes[1] // Change this to the color you want for the horizontal lines
            }
          }
        },
        axisLine: {
          lineStyle: {
            color: this.colorCodes[1]
          }
        },
        grid: {
          top: '5%',
          left: '6%',
          right: '0%',
          bottom: '8%'
        }
      };
    }
  }));
});

//Stacked Line Chart
document.addEventListener('alpine:init', () => {
  Alpine.data('stackedLineApp', () => ({
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ],
    init() {
      this.colorCodes = getColorCodes(this.$refs.stackedLineChart.dataset);
      let stackedLineChart = echarts.init(this.$refs.stackedLineChart, 'light');
      stackedLineChart.setOption(this.options);
    },
    get options() {
      return {
        series: this.series,
        color: this.colorCodes,
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
          textStyle: {
            color: this.colorCodes[6]
          }
        },
        grid: {
          top: '12%',
          left: '2%',
          right: '0%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: this.colorCodes[5] // Change this to the color you want for the horizontal lines
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      };
    }
  }));
});

//Line Y Category
document.addEventListener('alpine:init', () => {
  Alpine.data('categoryLineApp', () => ({
    init() {
      this.colorCodes = getColorCodes(this.$refs.categoryLineChart.dataset);
      let categoryLineChart = echarts.init(this.$refs.categoryLineChart, 'light');
      categoryLineChart.setOption(this.options);
    },
    get options() {
      return {
        color: this.colorCodes,
        legend: {
          data: ['Altitude (km) vs. temperature (°C)']
        },
        tooltip: {
          trigger: 'axis',
          formatter: 'Temperature : <br/>{b}km : {c}°C'
        },
        grid: {
          left: '2%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} °C'
          },
          splitLine: {
            lineStyle: {
              color: this.colorCodes[1]
            }
          }
        },
        legend: {
          textStyle: {
            color: this.colorCodes[2]
          }
        },
        axisLine: {
          lineStyle: {
            color: this.colorCodes[1]
          }
        },
        yAxis: {
          type: 'category',
          splitLine: {
            lineStyle: {
              color: this.colorCodes[1]
            }
          },
          axisLine: { onZero: false },
          axisLabel: {
            formatter: '{value} km'
          },
          boundaryGap: false,
          data: ['0', '10', '20', '30', '40', '50', '60', '70', '80']
        },
        series: [
          {
            name: 'Altitude (km) vs. temperature (°C)',
            type: 'line',
            symbolSize: 10,
            symbol: 'circle',
            smooth: true,
            lineStyle: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.3)',
              shadowBlur: 10,
              shadowOffsetY: 8
            },
            data: [15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5]
          }
        ]
      };
    }
  }));
});

//Line Step
document.addEventListener('alpine:init', () => {
  Alpine.data('stepLineApp', () => ({
    series: [
      {
        name: 'Step Start',
        type: 'line',
        step: 'start',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Step Middle',
        type: 'line',
        step: 'middle',
        data: [220, 282, 201, 234, 290, 430, 410]
      },
      {
        name: 'Step End',
        type: 'line',
        step: 'end',
        data: [450, 432, 401, 454, 590, 530, 510]
      }
    ],
    init() {
      this.colorCodes = getColorCodes(this.$refs.stepLineChart.dataset);
      let stepLineChart = echarts.init(this.$refs.stepLineChart, 'light');
      stepLineChart.setOption(this.options);
    },
    get options() {
      return {
        series: this.series,
        color: this.colorCodes,
        title: {
          text: 'Step Line',
          textStyle: {
            color: this.colorCodes[4]
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Step Start', 'Step Middle', 'Step End']
        },
        grid: {
          left: '2%',
          right: '1%',
          bottom: '1%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        legend: {
          textStyle: {
            color: this.colorCodes[4]
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: this.colorCodes[3] // Change this to the color you want for the horizontal lines
            }
          }
        },
        axisLine: {
          lineStyle: {
            color: this.colorCodes[1]
          }
        }
      };
    }
  }));
});

//Line Style
document.addEventListener('alpine:init', () => {
  Alpine.data('styleLineApp', () => ({
    init() {
      this.colorCodes = getColorCodes(this.$refs.styleLineChart.dataset);
      let styleLineChart = echarts.init(this.$refs.styleLineChart, 'light');
      styleLineChart.setOption(this.options);
    },
    get options() {
      return {
        color: this.colorCodes,
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        legend: {
          textStyle: {
            color: this.colorCodes[2]
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: this.colorCodes[1] // Change this to the color you want for the horizontal lines
            }
          }
        },
        grid: {
          top: '4%',
          left: '2%',
          right: '1%',
          bottom: '1%',
          containLabel: true
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line',
            symbol: 'triangle',
            symbolSize: 20,
            lineStyle: {
              color: this.colorCodes[0],
              width: 4,
              type: 'dashed'
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: '#EE6666',
              color: 'yellow'
            }
          }
        ]
      };
    }
  }));
});
