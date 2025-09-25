export const options = {
  series: [
    {
      name: 'Sent',
      data: [28, 29, 33, 36, 32, 32, 33]
    },
    {
      name: 'Opened',
      data: [12, 11, 14, 18, 17, 13, 13]
    }
  ],
  chart: {
    defaultLocale: 'en',
    height: 280,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  stroke: {
    curve: 'smooth'
  },
  grid: {
    xaxis: {
      lines: {
        show: true
      }
    },
    padding: {
      right: 0,
      top: -20
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 90, 100]
    }
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  }
};
