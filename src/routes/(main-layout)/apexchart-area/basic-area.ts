export const options = {
	series: [
		{
			name: 'series1',
			data: [31, 40, 28, 51, 42, 109, 100]
		}
	],
	chart: {
		defaultLocale: 'en',
		height: 300,
		type: 'area',
		zoom: {
			enabled: false
		}
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		width: [5, 7, 5],
		curve: 'straight',
		dashArray: [0, 8, 5]
	},
	title: {
		text: 'Page Statistics',
		align: 'left'
	},
	legend: {
		tooltipHoverFormatter: function (val: string, opts: any) {
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
	grid: {
		padding: {
			top: -20,
			right: 0,
			bottom: 0
		}
	},
	tooltip: {
		y: [
			{
				title: {
					formatter: function (val: any) {
						return val + ' (mins)';
					}
				}
			},
			{
				title: {
					formatter: function (val: any) {
						return val + ' per session';
					}
				}
			},
			{
				title: {
					formatter: function (val: any) {
						return val;
					}
				}
			}
		]
	}
};

