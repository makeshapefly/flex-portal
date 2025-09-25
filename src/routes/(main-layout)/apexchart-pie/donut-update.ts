import type ApexCharts from 'apexcharts';

export const options = {
  series: [44, 55, 13, 33],
  chart: {
    height: 300,
    type: 'donut'
  },
  dataLabels: {
    enabled: false
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: '100%'
        },
        legend: {
          show: true
        }
      }
    }
  ],
  legend: {
    position: 'right',
    offsetY: 0,
    height: 230
  }
};
let chartInstance: ApexCharts;
let series = [...options.series];

const updateSeries = (newSeries: number[]) => {
  series = newSeries;
  if (chartInstance) {
    chartInstance.updateSeries(series);
  }
};

// Export helper functions for chart updates
export function add(series: number[], updateSeries: (s: number[]) => void) {
  const newSeries = [...series, Math.floor(Math.random() * 100) + 1];
  updateSeries(newSeries);
}

export function remove(series: number[], updateSeries: (s: number[]) => void) {
  const newSeries = series.slice(0, -1);
  updateSeries(newSeries);
}

export function randomize(series: number[], updateSeries: (s: number[]) => void) {
  const newSeries = series.map(() => Math.floor(Math.random() * 100) + 1);
  updateSeries(newSeries);
}

export function reset(updateSeries: (s: number[]) => void) {
  updateSeries([44, 55, 13, 33]);
}
