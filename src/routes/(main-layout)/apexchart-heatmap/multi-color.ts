function generateData(count: number, yrange: { max: number; min: number }) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = (i + 1).toString();
      var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  
      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }
  
  export const options = {
    series: [{
        name: 'PE1',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'PE2',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'PE3',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'PE4',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'PE5',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'PE6',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'PE7',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'PE8',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'PE9',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'PE10',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'PE11',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'PE12',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'PE13',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'PE14',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'PE15',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    }
    ],
    chart: {
        height: 300,
        type: "heatmap",
    },
    dataLabels: {
        enabled: false
    },
   
    xaxis: {
        type: 'category',
        categories: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30'],
    },
    title: {
        text: 'HeatMap Chart (Different color shades for each series)'
    },
    grid: {
        padding: {
            right: 20
        }
    }
  };
  