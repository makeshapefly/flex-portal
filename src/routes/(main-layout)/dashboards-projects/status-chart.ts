export const options = {
	series: [
		{
			name: 'Earnings',
			data: [67, 48, 85, 51, 93, 109, 116]
		}
	],
	chart: {
		defaultLocale: 'en',
		height: 125,
		type: 'area',
		sparkline: { enabled: !0 },
		zoom: {
			enabled: false
		}
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		width: 3,
		curve: 'smooth',
		dashArray: 2
	},
	legend: {
		tooltipHoverFormatter: function (
			val: string,
			opts: {
				w: { globals: { series: { [x: string]: { [x: string]: string } } } };
				seriesIndex: string | number;
				dataPointIndex: string | number;
			}
		) {
			return (
				val +
				' - <strong>' +
				opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
				'</strong>'
			);
		}
	},
	markers: {
		size: 0,
		hover: {
			sizeOffset: 6
		}
	},
	labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
	yaxis: {
		title: {
			text: 'Growth'
		},
		tickAmount: 10,
		labels: {
			formatter: function (y: number) {
				return '$' + y.toFixed(0) + 'k';
			}
		}
	},
	grid: {
		padding: {
			top: -20,
			right: 0,
			bottom: 0
		}
	}
};
