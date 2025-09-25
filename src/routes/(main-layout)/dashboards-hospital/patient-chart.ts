export const options = {
	series: [
		{
			name: 'Net Profit',
			data: [32, 39, 43, 49, 52, 58, 63, 60, 66]
		}
	],
	chart: {
		height: 320,
		type: 'bar',
		toolbar: {
			show: false
		}
	},
	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: '55%',
			endingShape: 'rounded'
		}
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		show: true,
		width: 2,
		colors: ['transparent']
	},

	xaxis: {
		categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
	},
	fill: {
		opacity: 1
	},
	yaxis: {
		show: false,
		tickAmount: 15
	},
	grid: {
		show: false,
		xaxis: {
			lines: {
				show: false
			}
		},
		yaxis: {
			lines: {
				show: false
			}
		},
		padding: {
			top: -30,
			right: 0,
			bottom: -12,
			left: 0
		}
	},
	tooltip: {
		y: {
			formatter: function (val: string) {
				return '$ ' + val + 'k';
			}
		}
	}
};
