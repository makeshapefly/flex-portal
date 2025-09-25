function generateData(count: number, yrange: { max: number; min: number }) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = (i + 1).toString();
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y
    });
    i++;
  }
  return series;
}

export const options = {
  series: [
    {
      name: 'Metric1',
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: 'Metric2',
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: 'Metric3',
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: 'Metric4',
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: 'Metric5',
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: 'Metric6',
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: 'Metric7',
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: 'Metric8',
      data: generateData(18, {
        min: 0,
        max: 90
      })
    },
    {
      name: 'Metric9',
      data: generateData(18, {
        min: 0,
        max: 90
      })
    }
  ],
  chart: {
    height: 300,
    type: 'heatmap'
  },
  dataLabels: {
    enabled: false
  },
  title: {
    text: 'HeatMap Chart (Single color)'
  },
  grid: {
    padding: {
      top: 0,
      right: 0,
      bottom: 0
    }
  }
};
