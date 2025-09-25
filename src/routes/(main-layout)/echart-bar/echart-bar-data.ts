const colorCodes = ['#0ea5e9', '#e5e7eb', '#1f2937'];
const basicBarChartConfig = {
	series: [
		{
			data: [120, 200, 150, 80, 70, 110, 130],
			type: 'bar'
		}
	],
	color: colorCodes,
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	yAxis: {
		type: 'value',
		splitLine: {
			lineStyle: {
				color: colorCodes[1] // Change this to the color you want for the horizontal lines
			}
		}
	},
	legend: {
		textStyle: {
			color: colorCodes[2]
		}
	},
	axisLine: {
		lineStyle: {
			color: colorCodes[1]
		}
	},
	grid: {
		top: '5%',
		left: '5%',
		right: '0%',
		bottom: '6%'
	}
};

const barChartConfig = {
	color: ['#0ea5e9', '#e5e7eb', '#1f2937'],
	tooltip: {
		trigger: 'axis',
		axisPointer: { type: 'shadow' }
	},
	legend: {
		textStyle: { color: '#1f2937' }
	},
	grid: {
		top: '3%',
		left: '2%',
		right: '0%',
		bottom: '2%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		axisTick: { alignWithLabel: true }
	},
	yAxis: {
		type: 'value',
		splitLine: { lineStyle: { color: '#e5e7eb' } }
	},
	series: [
		{
			name: 'Direct',
			type: 'bar',
			barWidth: '60%',
			data: [10, 52, 200, 334, 390, 330, 220]
		}
	]
};

const backgroundBarChartColors = ['#4CAF50', '#d1d5db', '#1f2937', 'rgba(0,0,0,0.05)'];
const backgroundBarChartConfig = {
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	legend: {
		textStyle: {
			color: backgroundBarChartColors[2] // text color
		}
	},
	yAxis: {
		type: 'value',
		splitLine: {
			lineStyle: {
				color: backgroundBarChartColors[1] // horizontal lines
			}
		}
	},
	axisLine: {
		lineStyle: {
			color: backgroundBarChartColors[1] // axis line color
		}
	},
	series: [
		{
			data: [120, 200, 150, 80, 70, 110, 130],
			type: 'bar',
			showBackground: true,
			backgroundStyle: {
				color: backgroundBarChartColors[3] // bar background fill
			}
		}
	],
	color: backgroundBarChartColors,
	grid: {
		top: '3%',
		left: '2%',
		right: '0%',
		bottom: '2%',
		containLabel: true
	}
};

const singleBarColorCodes = ['#3b82f6', '#8b5cf6', '#e5e7eb', '#1f2937', '#f3f4f6'];
const singleBarAppConfig = {
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	yAxis: [
		{
			type: 'value',
			splitLine: {
				lineStyle: {
					color: singleBarColorCodes[2] // horizontal line color
				}
			}
		}
	],
	grid: {
		top: '3%',
		left: '2%',
		right: '0%',
		bottom: '2%',
		containLabel: true
	},
	series: [
		{
			type: 'bar',
			data: [
				120,
				{
					value: 200,
					itemStyle: {
						color: singleBarColorCodes[1] // custom color for this data point
					}
				},
				150,
				80,
				70,
				110,
				130
			]
		}
	],
	legend: {
		textStyle: {
			color: singleBarColorCodes[3] // legend text
		}
	},
	axisLine: {
		lineStyle: {
			color: singleBarColorCodes[2] // axis line
		}
	},
	color: singleBarColorCodes
};

const worldPopulationBarColorCodes = ['#3b82f6', '#8b5cf6', '#e5e7eb', '#1f2937', '#f3f4f6'];
const worldPopulationBarConfig = {
	title: {
		text: 'World Population',
		textStyle: {
			color: worldPopulationBarColorCodes[3]
		}
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		textStyle: {
			color: worldPopulationBarColorCodes[3]
		}
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'value',
		boundaryGap: [0, 0.01],
		splitLine: {
			lineStyle: {
				color: worldPopulationBarColorCodes[2] // Horizontal grid lines
			}
		}
	},
	yAxis: {
		type: 'category',
		data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
	},
	series: [
		{
			name: '2011',
			type: 'bar',
			data: [18203, 23489, 29034, 104970, 131744, 630230]
		},
		{
			name: '2012',
			type: 'bar',
			data: [19325, 23438, 31000, 121594, 134141, 681807]
		}
	],
	color: worldPopulationBarColorCodes
};

const stackedBorderRadiusBarColorCodes = ['#3b82f6', '#8b5cf6', '#facc15', '#e5e7eb', '#1f2937', '#f3f4f6'];
const stackedBorderRadiusBarConfig = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: [
      {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: stackedBorderRadiusBarColorCodes[3] // Horizontal grid lines
          }
        }
      }
    ],
    grid: {
      top: '3%',
      left: '3%',
      right: '0%',
      bottom: '3%',
      containLabel: true
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        stack: 'a',
        name: 'a'
      },
      {
        data: [10, 46, 64, '-', 0, '-', 0],
        type: 'bar',
        stack: 'a',
        name: 'b'
      },
      {
        data: [30, '-', 0, 20, 10, '-', 0],
        type: 'bar',
        stack: 'a',
        name: 'c'
      },
      {
        data: [30, '-', 0, 20, 10, '-', 0],
        type: 'bar',
        stack: 'b',
        name: 'd'
      },
      {
        data: [10, 20, 150, 0, '-', 50, 10],
        type: 'bar',
        stack: 'b',
        name: 'e'
      }
    ],
    color: stackedBorderRadiusBarColorCodes
  };
export {
	worldPopulationBarConfig,
	singleBarAppConfig,
	backgroundBarChartConfig,
	barChartConfig,
	basicBarChartConfig,
	stackedBorderRadiusBarConfig
};
