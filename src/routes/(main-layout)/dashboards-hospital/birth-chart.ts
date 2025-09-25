export const options = {
	series: [
		{
			name: 'Birth Case',
			data: [80, 50, 30, 70, 99, 36]
		},
		{
			name: 'Death Case',
			data: [10, 14, 28, 16, 34, 87]
		},
		{
			name: 'Accident Case',
			data: [44, 98, 54, 46, 34, 22]
		}
	],
	chart: {
		height: 340,
		type: 'radar'
	},

	stroke: {
		width: 1
	},
	fill: {
		opacity: 0.1
	},
	xaxis: {
		categories: ['2019', '2020', '2021', '2022', '2023', '2024']
	},
	yaxis: {
		tickAmount: 10
	}
};
