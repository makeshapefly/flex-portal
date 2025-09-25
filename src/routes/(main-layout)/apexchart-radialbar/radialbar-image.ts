export const options = {
  series: [67],
  chart: {
    height: 300,
    type: 'radialBar'
  },
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 15,
        size: '70%',
        image: '/assets/images/avatar/user-1.png',
        imageWidth: 64,
        imageHeight: 64,
        imageClipped: false
      },
      dataLabels: {
        name: {
          show: false,
          color: '#fff'
        },
        value: {
          show: true,
          color: '#333',
          offsetY: 70,
          fontSize: '22px'
        }
      }
    }
  },
  fill: {
    type: 'image',
    image: {
      src: ['/assets/images/gallery/img-01.jpg']
    }
  },
  stroke: {
    lineCap: 'round'
  },
  labels: ['Volatility']
};
