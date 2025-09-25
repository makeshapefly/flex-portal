// Simulate getColorCodes() output from dataset
const colorCodes = ['#3b82f6', '#d1d5db', '#1f2937']; // You can replace these as needed
const basicLineChartConfig = {
	series: [
		{
			data: [150, 230, 224, 218, 135, 147, 260],
			type: 'line'
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
				color: colorCodes[1] // horizontal lines
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
		left: '6%',
		right: '0%',
		bottom: '8%'
	}
};

const smoothLineChartColorCodes = ['#8b5cf6', '#e5e7eb', '#1f2937']; // Replace with dynamic logic if needed
const smoothLineChartConfig = {
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	yAxis: {
		type: 'value',
		splitLine: {
			lineStyle: {
				color: smoothLineChartColorCodes[1] // Horizontal line color
			}
		}
	},
	axisLine: {
		lineStyle: {
			color: smoothLineChartColorCodes[1] // Axis line color
		}
	},
	legend: {
		textStyle: {
			color: smoothLineChartColorCodes[2]
		}
	},
	grid: {
		top: '5%',
		left: '6%',
		right: '0%',
		bottom: '8%'
	},
	series: [
		{
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: 'line',
			smooth: true
		}
	],
	color: smoothLineChartColorCodes
};

const stackedLineChartColorCodes = [
	'#8b5cf6', // purple-500
	'#facc15', // yellow-500
	'#0ea5e9', // sky-500
	'#22c55e', // green-500
	'#f97316', // orange-500
	'#e5e7eb', // gray-200
	'#1f2937' // gray-800
];
const stackedLineChartConfig = {
	color: stackedLineChartColorCodes,
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
		textStyle: {
			color: stackedLineChartColorCodes[6]
		}
	},
	grid: {
		top: '12%',
		left: '2%',
		right: '0%',
		bottom: '3%',
		containLabel: true
	},
	toolbox: {
		feature: {
			saveAsImage: {}
		}
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	yAxis: {
		type: 'value',
		splitLine: {
			lineStyle: {
				color: stackedLineChartColorCodes[5]
			}
		}
	},
	series: [
		{
			name: 'Email',
			type: 'line',
			stack: 'Total',
			data: [120, 132, 101, 134, 90, 230, 210]
		},
		{
			name: 'Union Ads',
			type: 'line',
			stack: 'Total',
			data: [220, 182, 191, 234, 290, 330, 310]
		},
		{
			name: 'Video Ads',
			type: 'line',
			stack: 'Total',
			data: [150, 232, 201, 154, 190, 330, 410]
		},
		{
			name: 'Direct',
			type: 'line',
			stack: 'Total',
			data: [320, 332, 301, 334, 390, 330, 320]
		},
		{
			name: 'Search Engine',
			type: 'line',
			stack: 'Total',
			data: [820, 932, 901, 934, 1290, 1330, 1320]
		}
	]
};

// Example color mapping based on your tailwind color tokens
const categoryLineChartColorCodes = [
	'#8b5cf6', // purple-500
	'#e5e7eb', // gray-200
	'#1f2937' // gray-800
];
const categoryLineChartConfig = {
	color: categoryLineChartColorCodes,
	tooltip: {
		trigger: 'axis',
		formatter: 'Temperature : <br/>{b}km : {c}°C'
	},
	legend: {
		data: ['Altitude (km) vs. temperature (°C)'],
		textStyle: {
			color: categoryLineChartColorCodes[2]
		}
	},
	grid: {
		left: '2%',
		right: '3%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'value',
		axisLabel: {
			formatter: '{value} °C'
		},
		splitLine: {
			lineStyle: {
				color: categoryLineChartColorCodes[1]
			}
		},
		axisLine: {
			lineStyle: {
				color: categoryLineChartColorCodes[1]
			}
		}
	},
	yAxis: {
		type: 'category',
		data: ['0', '10', '20', '30', '40', '50', '60', '70', '80'],
		boundaryGap: false,
		axisLabel: {
			formatter: '{value} km'
		},
		splitLine: {
			lineStyle: {
				color: categoryLineChartColorCodes[1]
			}
		},
		axisLine: {
			onZero: false
		}
	},
	series: [
		{
			name: 'Altitude (km) vs. temperature (°C)',
			type: 'line',
			smooth: true,
			symbol: 'circle',
			symbolSize: 10,
			lineStyle: {
				width: 3,
				shadowColor: 'rgba(0,0,0,0.3)',
				shadowBlur: 10,
				shadowOffsetY: 8
			},
			data: [15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5]
		}
	]
};

const stepLineChartColorCodes = [
	'#3b82f6', // primary-500
	'#8b5cf6', // purple-500
	'#10b981', // green-500
	'#e5e7eb', // gray-200
	'#1f2937' // gray-800
];
const stepLineChartConfig = {
	color: stepLineChartColorCodes,
	title: {
		text: 'Step Line',
		textStyle: {
			color: stepLineChartColorCodes[4]
		}
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['Step Start', 'Step Middle', 'Step End'],
		textStyle: {
			color: stepLineChartColorCodes[4]
		}
	},
	grid: {
		left: '2%',
		right: '1%',
		bottom: '1%',
		containLabel: true
	},
	toolbox: {
		feature: {
			saveAsImage: {}
		}
	},
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	yAxis: {
		type: 'value',
		splitLine: {
			lineStyle: {
				color: stepLineChartColorCodes[3]
			}
		}
	},
	axisLine: {
		lineStyle: {
			color: stepLineChartColorCodes[1]
		}
	},
	series: [
		{
			name: 'Step Start',
			type: 'line',
			step: 'start',
			data: [120, 132, 101, 134, 90, 230, 210]
		},
		{
			name: 'Step Middle',
			type: 'line',
			step: 'middle',
			data: [220, 282, 201, 234, 290, 430, 410]
		},
		{
			name: 'Step End',
			type: 'line',
			step: 'end',
			data: [450, 432, 401, 454, 590, 530, 510]
		}
	]
};

const styleLineChartColorCodes = [
	'#3b82f6', // primary-500
	'#e5e7eb', // gray-200
	'#1f2937', // gray-800
	'#ef4444' // red-500
];
const styleLineChartConfig = {
	color: styleLineChartColorCodes,
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	legend: {
		textStyle: {
			color: styleLineChartColorCodes[2]
		}
	},
	yAxis: {
		type: 'value',
		splitLine: {
			lineStyle: {
				color: styleLineChartColorCodes[1]
			}
		}
	},
	grid: {
		top: '4%',
		left: '2%',
		right: '1%',
		bottom: '1%',
		containLabel: true
	},
	series: [
		{
			data: [120, 200, 150, 80, 70, 110, 130],
			type: 'line',
			symbol: 'triangle',
			symbolSize: 20,
			lineStyle: {
				color: styleLineChartColorCodes[0],
				width: 4,
				type: 'dashed'
			},
			itemStyle: {
				borderWidth: 3,
				borderColor: '#EE6666',
				color: 'yellow'
			}
		}
	]
};

export {
	basicLineChartConfig,
	smoothLineChartConfig,
	stackedLineChartConfig,
	categoryLineChartConfig,
	stepLineChartConfig,
	styleLineChartConfig
};
