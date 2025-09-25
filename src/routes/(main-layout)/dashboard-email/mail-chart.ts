export const options = {
  series: [
    {
      name: 'Sent',
      data: [
        {
          x: 'Jan',
          y: 43
        },
        {
          x: 'Feb',
          y: 58
        }
      ]
    },
    {
      name: 'Pending',
      data: [
        {
          x: 'Jan',
          y: 33
        },
        {
          x: 'Feb',
          y: 38
        }
      ]
    },
    {
      name: 'Cancel',
      data: [
        {
          x: 'Jan',
          y: 55
        },
        {
          x: 'Feb',
          y: 21
        }
      ]
    }
  ],
  chart: {
    height: 335,
    type: 'line'
  },
  stroke: {
    curve: 'smooth'
  },
  plotOptions: {
    line: {
      isSlopeChart: true
    }
  },
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center'
  },
  xaxis: {
    axisBorder: {
      show: false
    }
  }
};
