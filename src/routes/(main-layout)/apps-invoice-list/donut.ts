export const options = {
	series: [16, 8, 12, 9],
	labels: ['Paid', 'Unpaid', 'Pending', 'Overdue'],
	chart: {
		height: 109,
		type: 'donut'
	},
	dataLabels: {
		enabled: false
	},
	plotOptions: {
		pie: {
			expandOnClick: true,
			donut: {
				size: '60%'
			}
		}
	},
	legend: {
		offsetY: -10
	},
	responsive: [
		{
			breakpoint: 480,
			options: {
				chart: {
					width: 200
				},
				legend: {
					position: 'bottom'
				}
			}
		}
	]
};
