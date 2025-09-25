export const options = {
  series: [
    {
      name: '',
      data: [200, 330, 548, 740, 880, 990, 1100, 1380]
    }
  ],
  chart: {
    height: 300,
    type: 'bar',
    animations: {
      speed: 500
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 0,
      horizontal: true,
      distributed: true,
      barHeight: '80%',
      isFunnel: true
    }
  },
  colors: ['#F44F5E', '#E55A89', '#D863B1', '#CA6CD8', '#B57BED', '#8D95EB', '#62ACEA', '#4BC3E6'],
  dataLabels: {
    enabled: true,
    formatter: function (
      val: any,
      opt: { w: { globals: { labels: { [x: string]: any } } }; dataPointIndex: string | number }
    ) {
      return opt.w.globals.labels[opt.dataPointIndex];
    },
    dropShadow: {
      enabled: true
    }
  },
  title: {
    text: 'Pyramid Chart',
    align: 'middle'
  },
  xaxis: {
    categories: [
      'Sweets',
      'Processed Foods',
      'Healthy Fats',
      'Meat',
      'Beans & Legumes',
      'Dairy',
      'Fruits & Vegetables',
      'Grains'
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
