export const options = {
  series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
  chart: {
    height: 300,
    type: 'polarArea'
  },
  stroke: {
    colors: ['#fff']
  },
  fill: {
    opacity: 0.8
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ]
};
