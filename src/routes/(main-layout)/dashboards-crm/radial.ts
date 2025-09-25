export const options = {
	series: [87.6],
	chart: {
		height: 174,
		type: 'radialBar'
	},

	plotOptions: {
		radialBar: {
			hollow: {
				size: '60%'
			},
			track: {
				dropShadow: {
					enabled: true,
					top: 0,
					left: 0,
					blur: 10,
					opacity: 0.02
				}
			},
			dataLabels: {
				name: {
					fontSize: '15px'
				},
				value: {
					show: true,
					fontSize: '14px',
					fontWeight: 700,
					offsetY: 10,
					formatter: function (val: string) {
						return '$' + val + 'k';
					}
				}
			}
		}
	},
	labels: ['This Month']
};
