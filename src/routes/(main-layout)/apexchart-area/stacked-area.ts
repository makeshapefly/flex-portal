//Stacked Area Chart
var generateDayWiseTimeSeries = function (baseVal:number, count:number, yRange:{min:number, max:number}) {
	var i = 0;
	var series = [];
	while (i < count) {
		var x = baseVal;
		var y = Math.floor(Math.random() * (yRange.max - yRange.min + 1)) + yRange.min;

		series.push([x, y]);
		baseVal += 86400000;
		i++;
	}
	return series;
};

export const options = {
	series: [
		{
			name: 'South',
			data: generateDayWiseTimeSeries(new Date('11 Feb 2024 GMT').getTime(), 20, {
				min: 10,
				max: 60
			})
		},
		{
			name: 'North',
			data: generateDayWiseTimeSeries(new Date('11 Feb 2024 GMT').getTime(), 20, {
				min: 10,
				max: 20
			})
		},
		{
			name: 'Central',
			data: generateDayWiseTimeSeries(new Date('11 Feb 2024 GMT').getTime(), 20, {
				min: 10,
				max: 15
			})
		}
	],
	chart: {
		height: 300,
		type: 'area',
		stacked: true,
        events: {
            // @ts-ignore
			selection: function (chart, e) {
				console.log(new Date(e.xaxis.min));
			}
		}
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth'
	},
	fill: {
		type: 'gradient',
		gradient: {
			opacityFrom: 0.6,
			opacityTo: 0.8
		}
	},
	legend: {
		position: 'top',
		horizontalAlign: 'left'
	},
	xaxis: {
		type: 'datetime'
	}
};
