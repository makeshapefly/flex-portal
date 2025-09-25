export const options = {
	series: [
		{
			name: 'Inject Patients',
			data: [24, 32, 28, 62, 67, 80, 96, 106]
		},
		{
			name: 'Surgery Patients',
			data: [5, 14, 19, 27, 35, 44, 22, 49]
		}
	],
	chart: {
		defaultLocale: 'en',
		height: 195,
		type: 'line',
		toolbar: {
			show: false
		}
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth',
		width: 3,
		lineCap: 'butt'
	},
	xaxis: {
		categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	},
	yaxis: {
		tickAmount: 6
	},
	tooltip: {
		x: {
			show: true
		}
	},

	grid: {
		strokeDashArray: 4,
		position: 'back',
		padding: {
			top: -20,
			right: 0,
			bottom: 0
		}
	}
};
