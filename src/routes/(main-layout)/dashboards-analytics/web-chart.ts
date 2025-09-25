export const options = {
  series: [
    {
      name: 'Referral',
      data: [
        {
          x: 'Aug',
          y: 43
        },
        {
          x: 'Sep',
          y: 58
        },
        {
          x: 'Oct',
          y: 66
        },
        {
          x: 'Nov',
          y: 44
        }
      ]
    },
    {
      name: 'Direct',
      data: [
        {
          x: 'Aug',
          y: 33
        },
        {
          x: 'Sep',
          y: 43
        },
        {
          x: 'Oct',
          y: 34
        },
        {
          x: 'Nov',
          y: 53
        }
      ]
    },
    {
      name: 'Ads',
      data: [
        {
          x: 'Jan',
          y: 55
        },
        {
          x: 'Feb',
          y: 33
        },
        {
          x: 'Oct',
          y: 54
        },
        {
          x: 'Nov',
          y: 65
        }
      ]
    }
  ],
  chart: {
    height: 315,
    type: 'line'
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  plotOptions: {
    line: {
      isSlopeChart: true
    }
  },
  dataLabels: {
    background: {
      enabled: true
    },
    formatter(
      val: null,
      opts: {
        w: { config: { series: { [x: string]: { name: any } } } };
        seriesIndex: string | number;
      }
    ) {
      const seriesName = opts.w.config.series[opts.seriesIndex].name;
      return val !== null ? seriesName : '';
    }
  },
  legend: {
    show: false,
    position: 'bottom',
    horizontalAlign: 'center'
  },
  grid: {
    padding: {
      bottom: -15,
      right: 0
    }
  },
  xaxis: {
    axisBorder: {
      show: false
    }
  }
};
