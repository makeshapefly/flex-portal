/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: echarts bar init Js File
*/

import { getColorCodes } from '../helpers/helper.js';

document.addEventListener('alpine:init', () => {
  Alpine.data('basicBarApp', () => ({
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ],
    init() {
      this.colorCodes = getColorCodes(this.$refs.basicBarChart.dataset);
      let basicBarChart = echarts.init(this.$refs.basicBarChart, 'light');
      basicBarChart.setOption(this.options);
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
          left: '5%',
          right: '0%',
          bottom: '6%'
        }
      };
    }
  }));
});

// });

//Axis Align with Tick
document.addEventListener('alpine:init', () => {
  Alpine.data('axisAlignBarApp', () => ({
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ],
    init() {
      this.colorCodes = getColorCodes(this.$refs.axisAlignBarChart.dataset);
      let axisAlignBarChart = echarts.init(this.$refs.axisAlignBarChart, 'light');
      axisAlignBarChart.setOption(this.options);
    },
    get options() {
      return {
        series: this.series,
        color: this.colorCodes,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '3%',
          left: '2%',
          right: '0%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
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
        yAxis: [
          {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: this.colorCodes[1] // Change this to the color you want for the horizontal lines
              }
            }
          }
        ]
      };
    }
  }));
});

//Bar with Background
document.addEventListener('alpine:init', () => {
  Alpine.data('backgroundBarApp', () => ({
    init() {
      this.colorCodes = getColorCodes(this.$refs.backgroundBarChart.dataset);
      let backgroundBarChart = echarts.init(this.$refs.backgroundBarChart, 'light');
      backgroundBarChart.setOption(this.options);
    },
    get options() {
      return {
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
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: this.colorCodes[3]
            }
          }
        ],
        color: this.colorCodes,
        grid: {
          top: '3%',
          left: '2%',
          right: '0%',
          bottom: '2%',
          containLabel: true
        }
      };
    }
  }));
});

//Set Style of Single Bar
document.addEventListener('alpine:init', () => {
  Alpine.data('singleBarApp', () => ({
    init() {
      this.colorCodes = getColorCodes(this.$refs.singleBarChart.dataset);
      let singleBarChart = echarts.init(this.$refs.singleBarChart, 'light');
      singleBarChart.setOption(this.options);
    },
    get options() {
      return {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          top: '3%',
          left: '2%',
          right: '0%',
          bottom: '2%',
          containLabel: true
        },
        series: [
          {
            data: [
              120,
              {
                value: 200,
                itemStyle: {
                  color: this.colorCodes[1]
                }
              },
              150,
              80,
              70,
              110,
              130
            ],
            type: 'bar'
          }
        ],
        legend: {
          textStyle: {
            color: this.colorCodes[3]
          }
        },
        axisLine: {
          lineStyle: {
            color: this.colorCodes[2]
          }
        },
        yAxis: [
          {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: this.colorCodes[2] // Change this to the color you want for the horizontal lines
              }
            }
          }
        ],
        color: this.colorCodes
      };
    }
  }));
});

//World Population
document.addEventListener('alpine:init', () => {
  Alpine.data('worldPopulationBarApp', () => ({
    series: [
      {
        name: '2011',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 630230]
      },
      {
        name: '2012',
        type: 'bar',
        data: [19325, 23438, 31000, 121594, 134141, 681807]
      }
    ],
    init() {
      this.colorCodes = getColorCodes(this.$refs.worldPopulationBarChart.dataset);
      let worldPopulationBarChart = echarts.init(this.$refs.worldPopulationBarChart, 'light');
      worldPopulationBarChart.setOption(this.options);
    },
    get options() {
      return {
        series: this.series,
        color: this.colorCodes,
        title: {
          text: 'World Population',
          textStyle: {
            color: this.colorCodes[3]
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          textStyle: {
            color: this.colorCodes[3]
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: {
            lineStyle: {
              color: this.colorCodes[2] // Change this to the color you want for the horizontal lines
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
        }
      };
    }
  }));
});

//Stacked Bar with borderRadius
document.addEventListener('alpine:init', () => {
  Alpine.data('stackedBorderRadiusBarApp', () => ({
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        stack: 'a',
        name: 'a'
      },
      {
        data: [10, 46, 64, '-', 0, '-', 0],
        type: 'bar',
        stack: 'a',
        name: 'b'
      },
      {
        data: [30, '-', 0, 20, 10, '-', 0],
        type: 'bar',
        stack: 'a',
        name: 'c'
      },
      {
        data: [30, '-', 0, 20, 10, '-', 0],
        type: 'bar',
        stack: 'b',
        name: 'd'
      },
      {
        data: [10, 20, 150, 0, '-', 50, 10],
        type: 'bar',
        stack: 'b',
        name: 'e'
      }
    ],
    init() {
      this.colorCodes = getColorCodes(this.$refs.stackedBorderRadiusBarChart.dataset);
      let stackedBorderRadiusBarChart = echarts.init(
        this.$refs.stackedBorderRadiusBarChart,
        'light'
      );
      stackedBorderRadiusBarChart.setOption(this.options);
    },
    get options() {
      return {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        grid: {
          top: '3%',
          left: '3%',
          right: '0%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value'
        },
        yAxis: [
          {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: this.colorCodes[3] // Change this to the color you want for the horizontal lines
              }
            }
          }
        ],
        series: this.series,
        color: this.colorCodes
      };
    }
  }));
});
