export const options = {
	series: [
		{
			name: 'Total Revenue',
			data: [2, 55, 20, 0, 42, 87, 100]
		}
	],
	labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'],
	chart: {
		defaultLocale: 'en',
		height: 140,
		type: 'line',
		zoom: {
			enabled: false
		},
		toolbar: {
			show: false
		}
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		width: 3,
		curve: 'smooth',
		dashArray: [10]
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
			sizeOffset: 5
		}
	},
	grid: {
		padding: {
			top: -20,
			right: 0,
			bottom: 0,
			left: 7
		},
		xaxis: {
			lines: {
				show: true
			}
		},
		yaxis: {
			lines: {
				show: true
			}
		}
	},
	yaxis: {
		show: false,
		tickAmount: 1
	}
};
