export const options = {
	series: [87],
	chart: {
		height: 255,
		type: 'radialBar'
	},
	plotOptions: {
		radialBar: {
			hollow: {
				size: '60%'
			},
			dataLabels: {
				show: true,
				name: {
					fontWeight: '600'
				}
			}
		}
	},
	fill: {
		type: 'gradient',
		gradient: {
			shade: 'dark',
			type: 'horizontal',
			shadeIntensity: 0.5,
			inverseColors: true,
			opacityFrom: 1,
			opacityTo: 1,
			stops: [0, 100]
		}
	},
	stroke: {
		lineCap: 'round'
	},
	labels: ['Accept Invitation']
};
