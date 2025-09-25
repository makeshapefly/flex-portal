import { offset } from '$lib/libs/@popperjs/core/esm';

export const options = {
	series: [44, 55],
	chart: {
		height: 175,
		type: 'donut'
	},
	legend: {
		show: true,
		position: 'bottom',
		offsetY: 7
	},
	labels: ['Process', 'In Process'],
	plotOptions: {
		pie: {
			startAngle: -90,
			endAngle: 270
		}
	},
	dataLabels: {
		enabled: false
	},
	fill: {
		type: 'gradient'
	}
};
