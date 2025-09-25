export const options = {
	series: [
		{
			name: 'Followers',
			data: [44, 55, 41, 67, 22, 43]
		},
		{
			name: 'Unfollow',
			data: [13, 23, 20, 8, 13, 27]
		}
	],
	chart: {
		height: 360,
		type: 'bar',
		stacked: true,
		toolbar: {
			show: false
		},
		zoom: {
			enabled: true
		}
	},
	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: '40%',
			borderRadius: 13,
			borderRadiusApplication: 'end', // Ensure this is set
			borderRadiusWhenStacked: 'last' // Important for stacked bars
		}
	},
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
	legend: {
		position: 'bottom'
	},
	grid: {
		xaxis: {
			lines: {
				show: true
			}
		},
		yaxis: {
			lines: {
				show: true
			},
			tickAmount: 10
		},
		padding: {
			top: -20,
			right: 0,
			bottom: 0
		}
	}
};
