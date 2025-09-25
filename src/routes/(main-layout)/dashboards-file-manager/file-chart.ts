export const options = {
	series: [
		{
			name: 'Total GB',
			data: [44, 55, 41, 67, 22]
		}
	],
	chart: {
		height: 315,
		type: 'bar',
		toolbar: {
			show: false
		}
	},
	plotOptions: {
		bar: {
			borderRadius: 10,
			columnWidth: '50%'
		}
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		width: 1
	},
	grid: {
		padding: {
			right: -12,
			top: -18,
			bottom: -8
		}
	},
	xaxis: {
		labels: {
			rotate: -45
		},
		categories: ['Dropbox', 'Cloud', 'Mega', 'Google', 'Drive'],
		tickPlacement: 'on'
	},
	yaxis: {
		tickAmount: 7
	},
	fill: {
		type: 'gradient',
		gradient: {
			shade: 'light',
			type: 'horizontal',
			shadeIntensity: 0.25,
			gradientToColors: undefined,
			opacityFrom: 0.85,
			opacityTo: 0.85,
			stops: [50, 0, 100]
		}
	}
};
