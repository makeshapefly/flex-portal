export const options = {
	series: [33, 57],
	labels: ['Open Rate', 'Click Rate'],
	chart: {
		height: 167,
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
		},
		position: 'bottom'
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
