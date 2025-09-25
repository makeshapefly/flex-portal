export const options = {
	series: [44, 55, 41],
	chart: {
		height: 150,
		type: 'donut'
	},
	dataLabels: {
		enabled: false
	},
	plotOptions: {
		pie: {
			startAngle: -90,
			endAngle: 90,
			offsetY: 10
		}
	},
	labels: ['Chrome', 'Safari', 'Edge'],

	fill: {
		type: 'gradient'
	},
	grid: {
		padding: {
			bottom: -60
		}
	},
	legend: {
		position: 'bottom'
	}
};
