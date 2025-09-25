export const options = {
	series: [32],
	chart: {
		height: 60,
		width: 50,
		type: 'radialBar',
		sparkline: { enabled: !0 }
	},
	plotOptions: {
		radialBar: {
			dataLabels: {
				show: false
			},
			hollow: {
				size: '20%'
			}
		}
	},
	labels: ['[Progress]']
};

export const tasks = [
	{
		icon: 'ShoppingBag',
		title: 'Ecommerce HTML Template',
		comments: 154,
		files: '2+ Files',
		bgColor: 'bg-primary-500/10',
		iconColor: 'text-primary-500 fill-primary-500/15',
		chartColor: 'bg-primary-500',
		series: [32]
	},
	{
		icon: 'Presentation',
		title: 'Project Management Admin',
		comments: 321,
		files: '16+ Files',
		bgColor: 'bg-purple-500/10',
		iconColor: 'text-purple-500 fill-purple-500/15',
		chartColor: 'bg-green-500',
		series: [45]
	},
	{
		icon: 'Droplets',
		title: 'Dropbox Development',
		comments: 29,
		files: '3+ Files',
		bgColor: 'bg-green-500/10',
		iconColor: 'text-green-500 fill-green-500/15',
		chartColor: 'bg-red-500',
		series: [79]
	},
	{
		icon: 'MessagesSquare',
		title: 'Real Chat Application with Socket',
		comments: 8,
		files: '1+ Files',
		bgColor: 'bg-sky-500/10',
		iconColor: 'text-sky-500 fill-sky-500/15',
		chartColor: 'bg-yellow-500',
		series: [100]
	}
];

export const users = [
	{
		name: 'Savion Bogan',
		role: 'Web Designer',
		tasks: 15,
		image: '/assets/images/avatar/user-20.png'
	},
	{
		name: 'Ella Legros',
		role: 'UI / UX Designer',
		tasks: 74,
		image: '/assets/images/avatar/user-2.png'
	},
	{
		name: 'Jayce Green',
		role: 'React Developer',
		tasks: 54,
		image: '/assets/images/avatar/user-3.png'
	},
	{
		name: 'Americo Donnelly',
		role: 'Asp .Net Developer',
		tasks: 98,
		image: '/assets/images/avatar/user-4.png'
	},
	{
		name: 'Sage Kohler',
		role: 'Laravel Developer',
		tasks: 119,
		image: '/assets/images/avatar/user-5.png'
	},
	{
		name: 'Alvina Powlowski',
		role: 'Web Designer',
		tasks: 32,
		image: '/assets/images/avatar/user-6.png'
	}
];
