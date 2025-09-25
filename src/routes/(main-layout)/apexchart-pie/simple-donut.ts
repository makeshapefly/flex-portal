export const options = {
  series: [44, 55, 41, 17, 15],
  chart: {
    height: 300,
    type: 'donut'
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
