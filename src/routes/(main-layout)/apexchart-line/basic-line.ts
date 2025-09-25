
export const options = {
    series: [
        {
            name: "Series name",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        }
    ],
    chart: {
        defaultLocale: "en",
        height: 300,
        type: "line",
        zoom: {
            enabled: true
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    grid: {
        
        padding: {
            top: 0,
            right: 5,
            bottom: 0,
        },
    },
    xaxis: {
        title: {
            text: "Xaxis"
        },
        categories:[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
    },
    tooltip: {
        x: {
            show: true
        },
        y: {
            formatter: (x: { toString: () => string; }) => {
                return"$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
        }
    },
};
