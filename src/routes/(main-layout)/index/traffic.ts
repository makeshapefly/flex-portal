export const options = {
	series: [
		{
			name: 'Sales',
			data: [0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2, 4.5, 3.9, 3.5]
		},
		{
			name: 'Visit',
			data: [
				-0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3, -4.4, -4.1, -4,
				-4.1, -3.4, -3.1
			]
		}
	],
	chart: {
		height: 320,
		type: 'bar',
		stacked: true,
		toolbar: {
			show: false
		}
	},
	plotOptions: {
		bar: {
			horizontal: true,
			barHeight: '80%'
		}
	},
	dataLabels: {
		enabled: false
	},
	grid: {
		strokeDashArray: 2,
		xaxis: {
			lines: {
				show: false
			}
		},
		yaxis: {
			lines: {
				show: true
			},
			tickAmount: 15
		},
		padding: {
			top: -20,
			bottom: 0
		},
		row: {
			opacity: 0
		}
	},
	yaxis: {
		min: -5,
		max: 5
	},

	states: {
		hover: {
			filter: {
				type: 'none'
			}
		}
	},
	tooltip: {
		shared: false,
		x: {
			formatter: function (val: any) {
				return val;
			}
		},
		y: {
			formatter: function (val: number) {
				return Math.abs(val) + '%';
			}
		}
	},
	xaxis: {
		categories: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		],
		min: -5,
		max: 5,
		tickAmount: 10,
		labels: {
			formatter: function (val: number) {
				return Math.abs(Math.round(val)) + '%';
			}
		}
	}
};
