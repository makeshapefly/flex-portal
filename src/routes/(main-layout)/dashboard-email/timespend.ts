export const options = {
	series: [
		{
			name: 'Total Spend',
			data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
		},
		{
			name: 'Sales',
			data: [62, 69, 91, 54, 10, 41, 35, 51, 49]
		}
	],
	chart: {
		defaultLocale: 'en',
		height: 120,
		type: 'line',
		zoom: {
			enabled: true
		},
		sparkline: { enabled: !0 }
	},
	stroke: {
		curve: 'straight',
		width: 1
	},
	xaxis: {
		title: {
			text: 'Xaxis'
		},
		categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	},
	yaxis: {
		tickAmount: 15
	},
	tooltip: {
		x: {
			show: true
		},
		y: {
			formatter: (x: any) => {
				return '$' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + 'k';
			}
		}
	},
	legend: {
		show: true,
		position: 'bottom',
		horizontalAlign: 'center',
		offsetY: 8
	},

	grid: {
		padding: {
			top: 0,
			right: 5,
			bottom: 20
		}
	}
};
