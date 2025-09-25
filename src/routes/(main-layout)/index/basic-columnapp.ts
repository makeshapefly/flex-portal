export const options = {
  series: [
    {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    },
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }
  ],
  chart: {
    height: 280,
    type: 'bar',
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: [10]
    }
  },
  states: {
    hover: {
      filter: {
        type: 'none'
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    lineCap: 'round',
    colors: ['transparent']
  },

  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  tooltip: {
    y: {
      formatter: function (val: string) {
        return '$' + val + 'k';
      }
    }
  }
};
