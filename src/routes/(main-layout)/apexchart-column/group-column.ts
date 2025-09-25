export const options = {
  series: [
    {
      name: 'Q1 Budget',
      group: 'budget',
      data: [44000, 55000, 41000, 67000, 22000, 43000]
    },
    {
      name: 'Q1 Actual',
      group: 'actual',
      data: [48000, 50000, 40000, 65000, 25000, 40000]
    },
    {
      name: 'Q2 Budget',
      group: 'budget',
      data: [13000, 36000, 20000, 8000, 13000, 27000]
    },
    {
      name: 'Q2 Actual',
      group: 'actual',
      data: [20000, 40000, 25000, 10000, 12000, 28000]
    }
  ],
  chart: {
    height: 300,
    type: 'bar',
    stacked: true
  },
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  dataLabels: {
    formatter: (val: number) => {
      return val / 1000 + 'K';
    }
  },
  plotOptions: {
    bar: {
      horizontal: false
    }
  },
  xaxis: {
    categories: [
      'Online advertising',
      'Sales Training',
      'Print advertising',
      'Catalogs',
      'Meetings',
      'Public relations'
    ]
  },
  fill: {
    opacity: 1
  },
  yaxis: {
    labels: {
      formatter: (val: number) => {
        return val / 1000 + 'K';
      }
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left'
  }
};
