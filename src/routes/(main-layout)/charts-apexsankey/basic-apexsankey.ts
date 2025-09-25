export const data = {
	nodes: [
		{
			id: 'Oil',
			title: 'Oil'
		},
		{
			id: 'Natural Gas',
			title: 'Natural Gas'
		},
		{
			id: 'Coal',
			title: 'Coal'
		},
		{
			id: 'Fossil Fuels',
			title: 'Fossil Fuels'
		},
		{
			id: 'Electricity',
			title: 'Electricity'
		},
		{
			id: 'Energy',
			title: 'Energy'
		}
	],
	edges: [
		{
			source: 'Oil',
			target: 'Fossil Fuels',
			value: 15
		},
		{
			source: 'Natural Gas',
			target: 'Fossil Fuels',
			value: 20
		},
		{
			source: 'Coal',
			target: 'Fossil Fuels',
			value: 25
		},
		{
			source: 'Coal',
			target: 'Electricity',
			value: 25
		},
		{
			source: 'Fossil Fuels',
			target: 'Energy',
			value: 60
		},
		{
			source: 'Electricity',
			target: 'Energy',
			value: 25
		}
	]
};

export const options = {
	nodeWidth: 20,
	fontWeight: '500',
	fontSize: '10px',
	height: 300,
	enableToolbar: true,
	canvasStyle: '',
	nodeTemplate: ({ source, target, value }: { source: any; target: any; value: number }) => `
      <div class="flex items-center gap-2">
          <div class="size-3" style="background-color:${source.color}"></div>
          <h6 class="dark:text-dark-100">${source.title}</h6>
          <div>=></div>
          <div class="size-3" style="background-color:${target.color}"></div>
          <h6 class="!text-white">${target.title}</h6>
          <div class="dark:text-dark-100">: ${value}</div> 
      </div>
    `
};
