const basicPieChartColorCodes = [
	'#3b82f6', // primary-500
	'#10b981', // green-500
	'#fbbf24', // yellow-400
	'#9333ea', // purple-400
	'#fb923c', // orange-400
	'#e5e7eb', // gray-200
	'#1f2937' // gray-800
];
const basicPieChartConfig = {
	color: basicPieChartColorCodes,
	tooltip: {
		trigger: 'item'
	},
	legend: {
		orient: 'vertical',
		left: 'left',
		textStyle: {
			color: basicPieChartColorCodes[6]
		}
	},
	grid: {
		bottom: '0%',
		containLabel: true
	},
	series: [
		{
			name: 'Access From',
			type: 'pie',
			radius: '50%',
			data: [
				{ value: 1048, name: 'Search Engine' },
				{ value: 735, name: 'Direct' },
				{ value: 580, name: 'Email' },
				{ value: 484, name: 'Union Ads' },
				{ value: 300, name: 'Video Ads' }
			],
			label: {
				color: basicPieChartColorCodes[6]
			},
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}
	]
};

const doughnutRoundedPieChartColorCodes = [
	'#93c5fd', // primary-300
	'#86efac', // green-300
	'#f9a8d4', // pink-300
	'#c4b5fd', // purple-300
	'#fb923c', // orange-300
	'#e5e7eb', // gray-200
	'#1f2937', // gray-800
	'#ffffff' // white
];
const doughnutRoundedPieChartConfig = {
	color: doughnutRoundedPieChartColorCodes,
	tooltip: {
		trigger: 'item'
	},
	legend: {
		top: '0%',
		left: 'center',
		textStyle: {
			color: doughnutRoundedPieChartColorCodes[6]
		}
	},
	series: [
		{
			name: 'Access From',
			type: 'pie',
			radius: ['40%', '70%'],
			avoidLabelOverlap: false,
			itemStyle: {
				borderRadius: 10,
				borderColor: doughnutRoundedPieChartColorCodes[7],
				borderWidth: 2
			},
			label: {
				show: false,
				position: 'center',
				color: doughnutRoundedPieChartColorCodes[6]
			},
			emphasis: {
				label: {
					show: true,
					fontSize: 15,
					fontWeight: 'bold'
				}
			},
			labelLine: {
				show: false
			},
			data: [
				{ value: 1048, name: 'Search Engine' },
				{ value: 735, name: 'Direct' },
				{ value: 580, name: 'Email' },
				{ value: 484, name: 'Union Ads' },
				{ value: 300, name: 'Video Ads' }
			]
		}
	]
};

const doughnutPieChartColorCodes = [
	'#93c5fd', // primary-300
	'#86efac', // green-300
	'#f9a8d4', // pink-300
	'#c4b5fd', // purple-300
	'#fb923c', // orange-300
	'#e5e7eb', // gray-200
	'#1f2937', // gray-800
	'#ffffff' // white
];
const doughnutPieChartConfig = {
	tooltip: {
		trigger: 'item'
	},
	legend: {
		top: '5%',
		left: 'center',
		textStyle: {
			color: doughnutPieChartColorCodes[6]
		}
	},
	series: [
		{
			name: 'Access From',
			type: 'pie',
			radius: ['40%', '70%'],
			avoidLabelOverlap: false,
			label: {
				show: false,
				position: 'center',
				color: doughnutPieChartColorCodes[6]
			},
			emphasis: {
				label: {
					show: true,
					fontSize: 15,
					fontWeight: 'bold'
				}
			},
			labelLine: {
				show: false
			},
			data: [
				{ value: 1048, name: 'Search Engine' },
				{ value: 735, name: 'Direct' },
				{ value: 580, name: 'Email' },
				{ value: 484, name: 'Union Ads' },
				{ value: 300, name: 'Video Ads' }
			]
		}
	]
};

const halfDouglasNutChartColorCodes = [
	'#93c5fd', // primary-300
	'#86efac', // green-300
	'#f9a8d4', // pink-300
	'#c4b5fd', // purple-300
	'#fb923c', // orange-300
	'#e5e7eb', // gray-200
	'#1f2937', // gray-800
	'#ffffff' // white
];
const halfDouglasNutChartConfig = {
	tooltip: {
		trigger: 'item'
	},
	legend: {
		top: '5%',
		left: 'center',
		textStyle: {
			color: halfDouglasNutChartColorCodes[6]
		}
	},
	series: [
		{
			name: 'Access From',
			type: 'pie',
			radius: ['40%', '70%'],
			center: ['50%', '70%'],
			startAngle: 180,
			endAngle: 360,
			label: {
				color: halfDouglasNutChartColorCodes[6]
			},
			data: [
				{ value: 1048, name: 'Search Engine' },
				{ value: 735, name: 'Direct' },
				{ value: 580, name: 'Email' },
				{ value: 484, name: 'Union Ads' },
				{ value: 300, name: 'Video Ads' }
			]
		}
	]
};
export { basicPieChartConfig, doughnutRoundedPieChartConfig, doughnutPieChartConfig,halfDouglasNutChartConfig };
