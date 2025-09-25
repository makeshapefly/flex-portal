export const options = {
  series: [44, 55, 41, 17, 15],
  chart: {
    height: 300,
    type: 'donut'
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 270
    }
  },
  dataLabels: {
    enabled: false
  },

  fill: {
    type: 'gradient'
  },
  legend: {
    formatter: function (
      val: string,
      opts: { w: { globals: { series: { [x: string]: string } } }; seriesIndex: string | number }
    ) {
      return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
    }
  },
  title: {
    text: 'Gradient Donut with custom Start-angle'
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: '100%'
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ]
};
