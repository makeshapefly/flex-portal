

export const options = {
  series: [
    {
      name: 'Marine Sprite',
      data: [44, 55, 41, 37, 22, 43, 21]
    },
    {
      name: 'Striking Calf',
      data: [53, 32, 33, 52, 13, 43, 32]
    },
    {
      name: 'Tank Picture',
      data: [12, 17, 11, 9, 15, 11, 20]
    },
    {
      name: 'Bucket Slope',
      data: [9, 7, 5, 8, 6, 9, 4]
    },
    {
      name: 'Reborn Kid',
      data: [25, 12, 19, 32, 25, 24, 10]
    }
  ],

  chart: {
    height: 300,
    type: 'bar',
    stacked: true
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        total: {
          enabled: true,
          offsetX: 0,
          style: {
            fontSize: '13px',
            fontWeight: 900
          }
        }
      }
    }
  },
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  title: {
    text: 'Fiction Books Sales'
  },
  xaxis: {
    categories: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    labels: {
      formatter: function (val: string) {
        return val + 'K';
      }
    }
  },
  yaxis: {
    title: {
      text: undefined
    }
  },
  tooltip: {
    y: {
      formatter: function (val: string) {
        return val + 'K';
      }
    }
  },
  fill: {
    opacity: 1
  },

  legend: {
    position: 'top',
    horizontalAlign: 'left',
    offsetX: 40
  },
  grid: {
    padding: {
      right: 0,
      bottom: -10
    }
  }
};
