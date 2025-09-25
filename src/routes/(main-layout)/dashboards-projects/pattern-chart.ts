export const options = {
	series: [55, 33, 46],
	chart: {
		height: 200,
		type: 'donut',
		dropShadow: {
			enabled: true,
			color: '#111',
			top: -1,
			left: 3,
			blur: 3,
			opacity: 0.2
		}
	},
	stroke: {
		width: 0
	},
	plotOptions: {
		pie: {
			donut: {
				labels: {
					show: false
				}
			}
		}
	},
	labels: ['Afternoon', 'Evening', 'Morning'],
	dataLabels: {
		enabled: false
	},
	fill: {
		type: 'pattern',
		pattern: {
			style: 'squares'
		}
	},
	states: {
		hover: {
			filter: 'none'
		}
	},
	theme: {
		palette: 'palette2'
	},

	legend: {
		show: false
	}
};
