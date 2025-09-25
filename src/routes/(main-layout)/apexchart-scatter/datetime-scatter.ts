function generateDayWiseTimeSeries(
  baseVal: number,
  count: number,
  yRange: { max: number; min: number }
) {
  var i = 0;
  var series = [];
  while (i < count) {
    var y = Math.floor(Math.random() * (yRange.max - yRange.min + 1)) + yRange.min;

    series.push([baseVal, y]);
    baseVal += 86400000;
    i++;
  }
  return series;
}
export const options = {
  series: [
    {
      name: 'TEAM 1',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60
      })
    },
    {
      name: 'TEAM 2',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60
      })
    },
    {
      name: 'TEAM 3',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 30, {
        min: 10,
        max: 60
      })
    },
    {
      name: 'TEAM 4',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
        min: 10,
        max: 60
      })
    },
    {
      name: 'TEAM 5',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 30, {
        min: 10,
        max: 60
      })
    }
  ],
  chart: {
    height: 300,
    type: 'scatter',
    zoom: {
      type: 'xy'
    }
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: {
    max: 70
  }
};
