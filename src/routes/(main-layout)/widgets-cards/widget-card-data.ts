const cardData = [
	{
		title: 'Superfast Delivery',
		icon: 'Truck',
		stats: { pending: 2477, success: 6013 }
	},
	{
		title: 'Flexible Payment',
		icon: 'GalleryVerticalEnd',
		stats: { pending: 392, success: 5789 }
	},
	{
		title: 'Premium Support',
		icon: 'Headset',
		stats: { pending: 1356, success: 3264 }
	},
	{
		title: '14 Day Returns',
		icon: 'Shuffle',
		stats: { pending: 144, success: 231 }
	}
];

const cards = [
	{
		title: 'Revenue',
		value: 301,
		prefix: '$',
		suffix: 'M',
		color: 'primary',
		extraCss: 'group-hover/item:text-primary-100 group-hover/item:!border-primary-400/50 dark:group-hover/item:!border-primary-400/50'
	},
	{
		title: 'Orders',
		value: 7000,
		suffix: '+',
		color: 'green',
		extraCss: 'group-hover/item:text-green-100 group-hover/item:!border-green-400/50 dark:group-hover/item:!border-green-400/50'
	},
	{
		title: 'Total Visitors',
		value: 12496,
		suffix: '',
		color: 'purple',
		extraCss: 'group-hover/item:text-purple-100 group-hover/item:!border-purple-400/50 dark:group-hover/item:!border-purple-400/50'
	},
	{
		title: 'Total Customers',
		value: 9831,
		suffix: '',
		color: 'yellow',
		extraCss: 'group-hover/item:text-yellow-100 group-hover/item:!border-yellow-400/50 dark:group-hover/item:!border-yellow-400/50'
	},
	{
		title: 'Average Sales',
		value: 3140,
		suffix: '',
		color: 'sky',
		extraCss: 'group-hover/item:text-sky-100 group-hover/item:!border-sky-400/50 dark:group-hover/item:!border-sky-400/50'
	},
	{
		title: 'Transaction',
		value: 138,
		prefix: '$',
		suffix: 'k',
		color: 'red',
		extraCss: 'group-hover/item:text-red-100 group-hover/item:!border-red-400/50 dark:group-hover/item:!border-red-400/50'
	}
];

const teamMembers = [
	{ name: 'Jennifer Kingston', role: 'Content Writer', img: '/assets/images/avatar/user-8.png' },
	{ name: 'James Fallon', role: 'Marketing Lead', img: '/assets/images/avatar/user-10.png' },
	{ name: 'Thurman Northup', role: 'Sr. React Dev.', img: '/assets/images/avatar/user-11.png' },
	{ name: 'Marshall Oliver', role: 'Sr. PHP Dev.', img: '/assets/images/avatar/user-12.png' },
	{ name: 'Brenda Gibson', role: 'Product Manager', img: '/assets/images/avatar/user-13.png' },
	{ name: 'David Turner', role: 'Sr. Laravel Dev.', img: '/assets/images/avatar/user-14.png' }
];
const appointments = [
	{
		name: 'Colette R. Mejias',
		time: '20 May | 9 AM - 10 AM',
		img: '/assets/images/avatar/user-14.png'
	},
	{
		name: 'Danny S. Lacroix',
		time: '20 May | 10 AM - 11 AM',
		img: '/assets/images/avatar/user-16.png'
	},
	{
		name: 'Louis K. Jacks',
		time: '21 May | 2 PM - 3 PM',
		img: '/assets/images/avatar/user-18.png'
	}
];

const interns = [
	'/assets/images/avatar/user-15.png',
	'/assets/images/avatar/user-16.png',
	'/assets/images/avatar/user-21.png',
	'/assets/images/avatar/user-17.png',
	'/assets/images/avatar/user-18.png',
	'/assets/images/avatar/user-22.png',
	'/assets/images/avatar/user-20.png'
];

const stats = [
	{
		title: 'Website Visitors',
		icon: 'TrendingUp',
		trendColor: 'text-green-500',
		trendText: 'Increased by 30% compared to the previous period.',
		badgeColors: 'badge-sub-red',
		totalOrders: 9736
	},
	{
		title: 'SEO Unique Users',
		icon: 'TrendingDown',
		trendColor: 'text-red-500',
		trendText: 'Decreased by 2.8% compared to the previous period.',
		badgeColors: 'badge-sub-purple',
		totalOrders: 419
	}
];

const users = [
	{
		name: 'Martha Kingery',
		role: 'Web Designer',
		image: '/assets/images/avatar/user-15.png',
		price: '$469.99',
		status: { text: 'Pending', class: 'badge-sub-yellow' }
	},
	{
		name: 'Corina Rouse',
		role: 'ASP.Net Developer',
		image: '/assets/images/avatar/user-18.png',
		price: '$342.87',
		status: { text: 'Successfully', class: 'badge-sub-green' }
	}
];

const customerDetails = [
	{
		title: 'Today Orders',
		value: '9736',
		icon: 'ShoppingBag',
		bgColor: 'bg-primary-500',
		outlineColor: 'outline-primary-500',
		iconCss: 'text-primary-50',
		textColor: ''
	},
	{
		title: 'Total Customers',
		value: '9831',
		icon: 'UserRound',
		bgColor: 'bg-green-500',
		outlineColor: 'outline-green-500',
		iconCss: 'text-green-50'
	},
	{
		title: 'Products',
		value: '297',
		icon: 'Box',
		bgColor: 'bg-indigo-500',
		outlineColor: 'outline-indigo-500',
		iconCss: 'text-indigo-50',
		cardClass: 'bg-indigo-100 border-indigo-200 dark:bg-indigo-500/10 dark:border-indigo-500/20',
		textColor: 'text-indigo-500'
	},
	{
		title: 'Total Revenue',
		value: '9831',
		icon: 'Coins',
		bgColor: 'bg-yellow-500',
		outlineColor: 'outline-yellow-500',
		iconCss: 'text-green-50'
	}
];
export { cardData, cards, teamMembers, appointments, interns, stats, users, customerDetails };
