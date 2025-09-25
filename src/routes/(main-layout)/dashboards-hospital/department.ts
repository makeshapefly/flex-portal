export const options = {
	series: [44, 55, 41, 18],
	labels: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'],
	chart: {
		height: 160,
		width: '350',
		type: 'donut'
	},
	plotOptions: {
		pie: {
			startAngle: -90,
			endAngle: 270
		}
	},
	dataLabels: {
		enabled: false
	},
	fill: {
		type: 'gradient'
	},
	legend: {
		formatter: function (
			val: string,
			opts: { w: { globals: { series: { [x: string]: string } } }; seriesIndex: string | number }
		) {
			return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
		}
	},
	responsive: [
		{
			breakpoint: 480,
			options: {
				chart: {
					width: 300,
					height: 150
				},
				legend: {
					position: 'bottom'
				}
			}
		}
	]
};
