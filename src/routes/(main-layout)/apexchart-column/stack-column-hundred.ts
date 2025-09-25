export const options = {
    series: [{
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43, 21, 49]
    }, {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27, 33, 12]
    }, {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14, 15, 13]
    }],
    chart: {
        height: 300,
        type: "bar",
        stacked: true,
        stackType: '100%'
    },
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
            }
        }
    }],
    xaxis: {
        categories: ['2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4'],
    },
    fill: {
        opacity: 1
    },
    legend: {
        position: 'right',
        offsetX: 0,
        offsetY: 50
    },
  };
  