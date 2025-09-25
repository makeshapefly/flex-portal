/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: overview init Js File
*/

import Swiper from 'swiper';

// init Swiper:
const swiper = new Swiper('.mySwiper', {
  loop: true,
  autoplay: {
    delay: 200,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});

document.addEventListener('alpine:init', () => {
  Alpine.data('upcomingExam', () => ({
    exams: [
      { subject: 'Vector Algebra (Mathematics)', date: '15 July, 2024' },
      { subject: 'Biomolecules (Chemistry)', date: '20 August, 2024' },
      { subject: 'Human Reproduction (Biology)', date: '10 September, 2024' }
    ],
    currentExamIndex: 0,
    show: true,
    get currentExam() {
      return this.exams[this.currentExamIndex];
    },
    nextExam() {
      this.show = false; // Hide content
      setTimeout(() => {
        this.currentExamIndex = (this.currentExamIndex + 1) % this.exams.length;
        this.show = true; // Show content
      }, 500); // Match the timeout with transition duration
    },
    init() {
      setInterval(() => {
        this.nextExam();
      }, 5000); // Change exam every 5 seconds
    }
  }));
});

import ApexCharts from 'apexcharts';
import { getColorCodes } from '../../../helpers/helper';

//Time Spend in Lecture Chart
dayjs.extend(window.dayjs_plugin_quarterOfYear);
document.addEventListener('alpine:init', () => {
  Alpine.data('timeSpendLectureApp', () => ({
    series: [
      {
        name: 'Total Hours',
        data: [142, 139, 159, 149, 162, 187, 160, 154, 122]
      }
    ],
    labels: [['Jan'], ['Feb'], ['Mar'], ['Apr'], ['May'], ['Jun'], ['Jul'], ['Aug'], ['Sep']],
    init() {
      let timeSpendLectureChart = new ApexCharts(this.$refs.timeSpendLectureChart, this.options);
      timeSpendLectureChart.render();
    },
    get options() {
      return {
        series: this.series,
        chart: {
          height: 260,
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '40%',
            distributed: true
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.2,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 30],
            colorStops: []
          }
        },
        states: {
          normal: {
            filter: {
              type: 'none',
              value: 0
            }
          },
          hover: {
            filter: {
              type: 'none',
              value: 0
            }
          },
          active: {
            filter: {
              type: 'none',
              value: 0
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: this.labels
        },
        grid: {
          padding: {
            top: -20,
            right: 0,
            bottom: 0
          }
        },
        colors: getColorCodes(this.$refs.timeSpendLectureChart.dataset)
      };
    }
  }));
});

//progress bar
function circleProgress(initialPercent) {
  return {
    percent: initialPercent,
    circumference: 2 * Math.PI * 16,
    get progress() {
      return this.circumference - (this.percent / 100) * this.circumference;
    },
    animateProgress() {
      setTimeout(() => {
        this.percent = this.percent;
      }, 100);
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('circleProgress', circleProgress);
});
