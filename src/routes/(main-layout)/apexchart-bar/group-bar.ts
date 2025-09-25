import { getColorCodes } from '$lib/utils/chart-color';

export const options = {
    series: [{
        data: [44, 55, 41, 64, 22, 43, 21]
    }, {
        data: [53, 32, 33, 52, 13, 44, 32]
    }],

  chart: {
    height: 300,
    type: 'bar'
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: 'top'
      }
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: {
      fontSize: '12px',
      colors: ['#fff']
    }
  },
  stroke: {
    show: true,
    width: 1,
    colors: ['#fff']
  },
  tooltip: {
    shared: true,
    intersect: false
  },
  xaxis: {
    categories:[2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },

  grid: {
    padding: {
      right: 0,
      bottom: -10
    }
  }
};
