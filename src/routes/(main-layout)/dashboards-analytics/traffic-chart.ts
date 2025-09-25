export const options = {
	series: [
		{
			name: 'Direct Traffic',
			data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
		},
		{
			name: 'Search Engine Traffic',
			data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
		}
	],
	chart: {
		height: 145,
		type: 'bar',
		sparkline: { enabled: !0 }
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
	legend: {
		show: true,
		position: 'top',
		horizontalAlign: 'start',
		offsetY: -3
	},
	stroke: {
		show: true,
		width: 2,
		colors: ['transparent']
	},

	xaxis: {
		categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
	},
	yaxis: {
		tickAmount: 10
	},
	grid: {
		padding: {
			top: 4,
			right: 0,
			left: 0
		}
	},
	tooltip: {
		y: {
			formatter: function (val: string) {
				return '$' + val + 'k';
			}
		}
	}
};
