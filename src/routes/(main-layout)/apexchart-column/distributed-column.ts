export const options = {
  series: [
    {
      data: [21, 22, 10, 28, 16, 21, 13, 30]
    }
  ],
  chart: {
    height: 300,
    type: 'bar'
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      distributed: true
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
      ['John', 'Doe'],
      ['Joe', 'Smith'],
      ['Jake', 'Williams'],
      'Amber',
      ['Peter', 'Brown'],
      ['Mary', 'Evans'],
      ['David', 'Wilson'],
      ['Lily', 'Roberts']
    ],
    labels: {
      style: {
        colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
        fontSize: '12px'
      }
    }
  }
};
