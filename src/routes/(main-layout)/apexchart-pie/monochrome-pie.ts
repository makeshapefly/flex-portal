export const options = {
  series: [25, 15, 44, 55, 41, 17],
  chart: {
    height: 340,
    type: 'pie'
  },
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  theme: {
    monochrome: {
      enabled: true
    }
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -5
      }
    }
  },
  title: {
    text: 'Monochrome Pie'
  },
  dataLabels: {
    formatter(
      val: number,
      opts: { w: { globals: { labels: { [x: string]: any } } }; seriesIndex: string | number }
    ) {
      const name = opts.w.globals.labels[opts.seriesIndex];
      return [name, val.toFixed(1) + '%'];
    }
  },
  legend: {
    show: false
  }
};
