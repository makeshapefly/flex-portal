export const options = {
	series: [
		{
			name: 'Performance',
			data: [69, 78, 49, 63, 54, 87]
		}
	],
	chart: {
		height: 260,
		type: 'bar',
		toolbar: {
			show: false
		}
	},
	plotOptions: {
		bar: {
			columnWidth: '20%',
			distributed: true
		}
	},
	fill: {
		type: 'gradient',
		gradient: {
			shade: 'dark',
			type: 'horizontal',
			shadeIntensity: 0.2,
			inverseColors: true,
			opacityFrom: 1,
			opacityTo: 1,
			stops: [0, 50, 30],
			colorStops: []
		}
	},
	states: {
		normal: {
			filter: {
				type: 'none',
				value: 0
			}
		},
		hover: {
			filter: {
				type: 'none',
				value: 0
			}
		},
		active: {
			filter: {
				type: 'none',
				value: 0
			}
		}
	},
	dataLabels: {
		enabled: false,
		formatter: function (val: string) {
			return val + '%';
		}
	},
	legend: {
		show: false
	},
	xaxis: {
		categories: [['Mathematics'], ['Physics'], ['Chemistry'], ['Biology'], ['CS'], ['English']]
	},
	grid: {
		padding: {
			top: -20,
			right: 0,
			bottom: 0
		}
	},
	yaxis: {
		tickAmount: 10,
		labels: {
			formatter: function (val: string) {
				return val + '%';
			}
		}
	}
};
