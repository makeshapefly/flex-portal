export const options = {
  series: [
    {
      name: 'High - 2013',
      data: [28, 29, 33, 36, 32, 32, 33]
    },
    {
      name: 'Low - 2013',
      data: [12, 11, 14, 18, 17, 13, 13]
    }
  ],
  chart: {
    defaultLocale: 'en',
    height: 300,
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: true
  },
  stroke: {
    curve: 'smooth'
  },
  grid: {
    padding: {
      top: -20,
      right: 0,
      bottom: 0
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5
  },
  xaxis: {
    title: {
      text: 'Month'
    },
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  },
  yaxis: {
    title: {
      text: 'Temperature'
    },
    min: 5,
    max: 40
  }
};
