export const options = {
  series: [{ name: 'Ticket Sale', data: [10, 41, 35, 51, 49, 62, 69] }],
  chart: {
    defaultLocale: 'en',
    height: 180,
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
    show: true,
    curve: 'monotoneCubic',
    lineCap: 'butt',
    width: 3,
    dashArray: 0
  },
  xaxis: {
    categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  },
  yaxis: {
    show: false
  },
  tooltip: {
    x: {
      show: true
    }
  },
  grid: {
    padding: {
      top: -10,
      right: 0,
      bottom: 0
    },
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: false
      }
    }
  }
};
