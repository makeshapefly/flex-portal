export const options = {
  series: [
    {
      name: 'Employee',
      data: [21, 22, 19, 10, 10, 28, 16]
    }
  ],
  chart: {
    height: 300,
    type: 'bar'
  },
  plotOptions: {
    bar: {
      columnWidth: '25%',
      distributed: true
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.2,
      // gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 30],
      colorStops: []
    }
  },
  states: {
    normal: {
      filter: {
        type: 'none',
        value: 0
      }
    },
    hover: {
      filter: {
        type: 'none',
        value: 0
      }
    },
    active: {
      filter: {
        type: 'none',
        value: 0
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  xaxis: {
    categories: [
      ['Radiology'],
      ['Orthopedics'],
      ['Neurology'],
      ['Cardiology'],
      ['Pediatrics'],
      ['Nurse'],
      ['Others']
    ]
  }
};
