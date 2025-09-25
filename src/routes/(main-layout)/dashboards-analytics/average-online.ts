export const options = {
	series: [
		{
			name: 'Total Sales',
			data: [44, 55, 41, 67, 22, 43, 21, 33]
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
		categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Pears'],
		tickPlacement: 'on'
	},
	yaxis: {
		tickAmount: 10
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
