export const options = {
	series: [
		{
			name: 'Series name',
			data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
		}
	],
	chart: {
		defaultLocale: 'en',
		height: 350,
		type: 'line',
		zoom: {
			enabled: true
		},
		toolbar: {
			show: false
		}
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth'
	},
	xaxis: {
		categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	},
	yaxis: {
		tickAmount: 8
	},
	tooltip: {
		x: {
			show: true
		},
		y: {
			formatter: (x: any) => {
				return '$' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
			}
		}
	},
	grid: {
		strokeDashArray: 2,
		padding: {
			top: 0,
			right: 0,
			bottom: 0
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
	}
};
