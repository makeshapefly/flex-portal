export const options = {
    series: [
        {
            name: 'Blue',
            data: [
                {
                    x: 'Jan',
                    y: 43,
                },
                {
                    x: 'Feb',
                    y: 58,
                },
            ],
        },
        {
            name: 'Green',
            data: [
                {
                    x: 'Jan',
                    y: 33,
                },
                {
                    x: 'Feb',
                    y: 38,
                },
            ],
        },
        {
            name: 'Red',
            data: [
                {
                    x: 'Jan',
                    y: 55,
                },
                {
                    x: 'Feb',
                    y: 21,
                },
            ],
        },
    ],
    chart: {
        height: 300,
        type: "line",
    },
    plotOptions: {
        line: {
            isSlopeChart: true,
        },
    },
    grid: {
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
        },
    }
  };
  