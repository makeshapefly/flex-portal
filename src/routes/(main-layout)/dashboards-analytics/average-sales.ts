export const options = {
	series: [
		{
			name: 'Total Sales',
			data: [22, 43, 21, 44, 55, 33, 41]
		}
	],
	chart: {
		height: 160,
		type: 'bar',
		sparkline: { enabled: !0 }
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

	xaxis: {
		labels: {
			rotate: -45
		},
		categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		tickPlacement: 'on'
	},
	yaxis: {
		tickAmount: 5
	},
	fill: {
		type: 'gradient',
		gradient: {
			shade: 'light',
			type: 'horizontal',
			shadeIntensity: 0.25,
			gradientToColors: undefined,
			inverseColors: true,
			opacityFrom: 0.85,
			opacityTo: 0.85,
			stops: [50, 0, 100]
		}
	}
};
