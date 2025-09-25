export const options = {
  series: [44, 55, 41, 17, 15],
  chart: {
    height: 300,
    type: 'donut'
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 10
    }
  },
  grid: {
    padding: {
      bottom: -80
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: '100%'
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ]
};
