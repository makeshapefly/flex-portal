// Define the Colors type as a union of valid keys
export type Colors = 'red' | 'primary' | 'green' | 'yellow' | 'purple' | 'default';

// Define the timeLineColors object with the corresponding class names
export const timeLineColors = {
	default: '',
	red: 'timeline-red',
	primary: 'timeline-primary',
	green: 'timeline-green',
	yellow: 'timeline-yellow',
	purple: 'timeline-purple'
};

export const formatDate = (date: string | number | Date) => {
	const d = new Date(date);
	const fullDate = d.toLocaleDateString('en-US', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	});

	// Example output: "Apr 21, 2025" — so let's rearrange it
	const [month, day, year] = fullDate.replace(',', '').split(' ');
	return `${day} ${month} ${year}`; // ➝ "21 Apr 2025"
};
