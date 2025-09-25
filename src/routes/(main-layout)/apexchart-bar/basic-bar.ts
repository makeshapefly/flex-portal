import { getColorCodes } from '$lib/utils/chart-color';

export const options = {
  series: [
    {
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }
  ],

  chart: {
    height: 300,
    type: 'bar'
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: [
      'South Korea',
      'Canada',
      'United Kingdom',
      'Netherlands',
      'Italy',
      'France',
      'Japan',
      'United States',
      'China',
      'Germany'
    ]
  },

  grid: {
    padding: {
      right: 0,
      bottom: -10
    }
  }
};
