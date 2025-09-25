export const data = {
  nodes: [
    { id: 'Berlin', title: 'Berlin' },
    { id: 'Job Applications', title: 'Job Applications' },
    { id: 'Barcelona', title: 'Barcelona' },
    { id: 'Madrid', title: 'Madrid' },
    { id: 'Amsterdam', title: 'Amsterdam' },
    { id: 'Paris', title: 'Paris' },
    { id: 'London', title: 'London' },
    { id: 'Munich', title: 'Munich' },
    { id: 'Brussels', title: 'Brussels' },
    { id: 'Dubai', title: 'Dubai' },
    { id: 'Dublin', title: 'Dublin' },
    { id: 'Other Cities', title: 'Other Cities' },
    { id: 'No Response', title: 'No Response' },
    { id: 'Responded', title: 'Responded' },
    { id: 'Rejected', title: 'Rejected' },
    { id: 'Interviewed', title: 'Interviewed' },
    { id: 'No Offer', title: 'No Offer' },
    { id: 'Declined Offer', title: 'Declined Offer' },
    { id: 'Accepted Offer', title: 'Accepted Offer' }
  ],
  edges: [
    {
      source: 'Berlin',
      target: 'Job Applications',
      value: 102,
      color: '#dddddd'
    },
    {
      source: 'Barcelona',
      target: 'Job Applications',
      value: 39,
      color: '#dddddd'
    },
    {
      source: 'Madrid',
      target: 'Job Applications',
      value: 35,
      color: '#dddddd'
    },
    {
      source: 'Amsterdam',
      target: 'Job Applications',
      value: 15,
      color: '#dddddd'
    },
    {
      source: 'Paris',
      target: 'Job Applications',
      value: 14,
      color: '#dddddd'
    },
    {
      source: 'London',
      target: 'Job Applications',
      value: 6,
      color: '#dddddd'
    },
    {
      source: 'Munich',
      target: 'Job Applications',
      value: 5,
      color: '#dddddd'
    },
    {
      source: 'Brussels',
      target: 'Job Applications',
      value: 4,
      color: '#dddddd'
    },
    {
      source: 'Dubai',
      target: 'Job Applications',
      value: 3,
      color: '#dddddd'
    },
    {
      source: 'Dublin',
      target: 'Job Applications',
      value: 3,
      color: '#dddddd'
    },
    {
      source: 'Other Cities',
      target: 'Job Applications',
      value: 12,
      color: '#dddddd'
    },
    {
      source: 'Job Applications',
      target: 'No Response',
      value: 189,
      color: '#dddddd'
    },
    {
      source: 'Job Applications',
      target: 'Responded',
      value: 49,
      color: 'orange'
    },
    {
      source: 'Responded',
      target: 'Rejected',
      value: 38,
      color: '#dddddd'
    },
    {
      source: 'Responded',
      target: 'Interviewed',
      value: 11,
      color: 'orange'
    },
    {
      source: 'Interviewed',
      target: 'No Offer',
      value: 8,
      color: '#dddddd'
    },
    {
      source: 'Interviewed',
      target: 'Declined Offer',
      value: 2,
      color: '#dddddd'
    },
    {
      source: 'Interviewed',
      target: 'Accepted Offer',
      value: 1,
      color: 'orange'
    }
  ],
  options: {
    order: [
      [
        ['Berlin', 'Barcelona', 'Madrid', 'Amsterdam', 'Paris', 'London'],
        ['Munich', 'Brussels', 'Dubai', 'Dublin', 'Other Cities']
      ],
      [['Job Applications']],
      [['Responded'], ['No Response']],
      [['Interviewed'], ['Rejected']],
      [['Accepted Offer', 'Declined Offer', 'No Offer'], []]
    ]
  }
};
export const options = {
  nodeWidth: 20,
  fontWeight: 500,
  fontSize: '10px',
  height: 300,
  canvasStyle: '',
  fontFamily: 'Satisfy, "cursive"',
  nodeTemplate: ({ source, target, value }: { source: any; target: any; value: number }) =>
    `<div class="flex items-center gap-2">
        <div class="size-3" style='background-color:${source.color}'></div>
        <h6 class="dark:text-dark-100">${source.title}</h6>
        <div>=></div>
        <div class="size-3" style='background-color:${target.color}'></div>
        <h6 class="dark:text-dark-100">${target.title}</h6>
        <div>: ${value}</div> 
    </div>`
};
