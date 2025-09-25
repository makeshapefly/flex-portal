export const options = {
	series: [
		{
			name: 'Visitors',
			data: [154, 137, 41, 67, 43, 20, 41, 67, 20, 41, 32, 98]
		},
		{
			name: 'Add Cart',
			data: [13, 23, 20, 35, 27, 16, 8, 13, 20, 41, 44, 67]
		},
		{
			name: 'Check Out',
			data: [11, 54, 15, 21, 14, 24, 15, 21, 20, 41, 54, 35]
		},
		{
			name: 'Favorites',
			data: [21, 19, 25, 22, 8, 19, 13, 22, 20, 41, 49, 33]
		}
	],
	chart: {
		height: 300,
		type: 'bar',
		stacked: true,
		toolbar: {
			show: false
		},
		zoom: {
			enabled: true
		}
	},
	dataLabels: {
		enabled: false
	},

	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: '35%'
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
		axisBorder: {
			show: false
		}
	},
	legend: {
		position: 'top',
		horizontalAlign: 'right',
		offsetY: -5
	},
	grid: {
		show: true,
		borderColor: '#90A4AE',
		strokeDashArray: 2,
		position: 'back',
		padding: {
			top: 10,
			right: 0
		},
		xaxis: {
			lines: {
				show: true
			}
		},
		yaxis: {
			lines: {
				show: true
			}
		}
	},
	fill: {
		opacity: 1
	}
};
