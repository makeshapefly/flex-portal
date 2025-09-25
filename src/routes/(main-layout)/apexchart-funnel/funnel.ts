export const options = {
  series: [
    {
      name: 'Funnel Series',
      data: [1380, 1100, 990, 880, 740, 548, 330, 200]
    }
  ],
  chart: {
    height: 300,
    type: 'bar'
  },
  plotOptions: {
    bar: {
      borderRadius: 0,
      horizontal: true,
      barHeight: '80%',
      isFunnel: true
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (
      val: string,
      opt: { w: { globals: { labels: { [x: string]: string } } }; dataPointIndex: string | number }
    ) {
      return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
    },
    dropShadow: {
      enabled: true
    }
  },
  title: {
    text: 'Recruitment Funnel',
    align: 'middle'
  },
  xaxis: {
    categories: [
      'Sourced',
      'Screened',
      'Assessed',
      'HR Interview',
      'Technical',
      'Verify',
      'Offered',
      'Hired'
    ]
  },
  legend: {
    show: false
  },
  grid: {
    padding: {
      top: 0,
      right: 0,
      bottom: 0
    }
  }
};
