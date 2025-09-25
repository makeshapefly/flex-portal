import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

dayjs.extend(quarterOfYear);

export const options = {
  series: [
    {
      name: 'Sales',
      data: [
        { x: '2023/01/01', y: 400 },
        { x: '2023/04/01', y: 430 },
        { x: '2023/07/01', y: 448 },
        { x: '2023/10/01', y: 470 },
        { x: '2024/01/01', y: 540 },
        { x: '2024/04/01', y: 580 },
        { x: '2024/07/01', y: 690 },
        { x: '2024/10/01', y: 690 }
      ]
    }
  ],
  chart: {
    height: 300,
    type: 'bar'
  },
  xaxis: {
    type: 'category',
    labels: {
      formatter: (val: string) => `Q${dayjs(val).quarter()}`
    }
  },
  title: {
    text: 'Sales by Quarter'
  },
  tooltip: {
    x: {
      formatter: (val: string) => `Q${dayjs(val).quarter()} ${dayjs(val).format('YYYY')}`
    }
  }
};
