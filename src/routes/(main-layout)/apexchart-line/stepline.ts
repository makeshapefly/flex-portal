export const options = {
  series: [
    {
      data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
    }
  ],
  chart: {
    defaultLocale: 'en',
    height: 300,
    type: 'line',
    zoom: {
      enabled: true
    }
  },
  stroke: {
    curve: 'stepline'
  },
  dataLabels: {
    enabled: false
  },
  title: {
    text: 'Stepline Chart',
    align: 'left'
  },
  markers: {
    hover: {
      sizeOffset: 4
    }
  },
  grid: {
    padding: {
      top: 0,
      right: 5,
      bottom: 0
    }
  }
};
