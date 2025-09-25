export const options = {
	series: [
		{
			data: [
				{
					x: '2018',
					y: [241, 100]
				},
				{
					x: '2019',
					y: [150, 41]
				},
				{
					x: '2020',
					y: [210, 100]
				},
				{
					x: '2021',
					y: [200, 10]
				},
				{
					x: '2022',
					y: [100, 10]
				},
				{
					x: '2023',
					y: [190, 120]
				},
				{
					x: '2024',
					y: [154, 241]
				}
			]
		}
	],
	chart: {
		height: 290,
		type: 'rangeBar',
		zoom: {
			enabled: false
		}
	},
	plotOptions: {
		bar: {
			isDumbbell: true,
			columnWidth: 3
		}
	},
	legend: {
		show: true,
		showForSingleSeries: true,
		position: 'top',
		horizontalAlign: 'center',
		customLegendItems: ['New Students', 'Leave Students']
	},
	fill: {
		type: 'gradient',
		gradient: {
			type: 'vertical',
			inverseColors: true,
			stops: [0, 100]
		}
	},
	grid: {
		padding: {
			bottom: -10,
			right: 0
		},
		xaxis: {
			lines: {
				show: true
			}
		},
		yaxis: {
			lines: {
				show: false
			}
		}
	},
	xaxis: {
		tickPlacement: 'on'
	}
};
