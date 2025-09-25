export const options = {
	series: [44, 55, 41, 17, 15],
	chart: {
		height: 260,
		type: 'donut'
	},
	plotOptions: {
		pie: {
			startAngle: -90,
			endAngle: 90,
			offsetY: 5 // this is for set padding in chart from top side
		}
	},
	grid: {
		padding: {
			bottom: -80 // this is for set padding in chart from bottom side
		}
	},
	stroke: {
		width: 0
	},
	fill: {
		type: 'gradient'
	},
	labels: ['Docs', 'Images', 'Video', 'Audio', 'Others'],
	legend: {
		position: 'bottom',
		offsetY: 10 // this is for label position from top side
	}
};
