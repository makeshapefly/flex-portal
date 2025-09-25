export const options = {
	series: [
		{
			name: 'Profit',
			data: [5, 4, 7, 2, 8, 6, 3]
		}
	],
	chart: {
		height: 130,
		type: 'bar',
		toolbar: {
			show: false
		},
		sparkline: { enabled: !0 }
	},
	yaxis: {
		tickAmount: 10
	},
	plotOptions: {
		bar: {
			horizontal: false,
			endingShape: 'rounded'
		}
	},
	grid: {
		padding: {
			top: 0,
			right: -10,
			bottom: 0,
			left: -10
		}
	},
	stroke: {
		show: true,
		width: 2,
		colors: ['transparent']
	}
};
