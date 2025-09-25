export const options = {
  series: [76, 67, 61, 90],
  chart: {
    height: 300,
    type: 'radialBar'
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: '30%',
        background: 'transparent',
        image: undefined
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          show: false
        }
      }
    }
  },
  legend: {
    show: true,
    floating: true,
    fontSize: '16px',
    position: 'left',
    offsetX: 160,
    offsetY: 15,
    labels: {
      useSeriesColors: true
    },
    markers: {
      size: 0
    },
    formatter: function (
      seriesName: string,
      opts: { w: { globals: { series: { [x: string]: string } } }; seriesIndex: string | number }
    ) {
      return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
    },
    itemMargin: {
      vertical: 3
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          show: false
        }
      }
    }
  ],
  labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn']
};
