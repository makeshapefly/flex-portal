interface Payroll {
	teacherName: string;
	image?: string;
	email: string;
	gross: string;
	taxes: string;
	netSalary: string;
	performance: string;
	status: string;
	payrollID?: string;
	avatarText?: string;
}

export const payrollData: Payroll[] = [
	{
		teacherName: 'John Doe',
		image: '/assets/images/avatar/user-1.png',
		email: 'john@example.com',
		gross: '$70,000',
		taxes: '$20,000',
		netSalary: '$50,000',
		performance: 'Excellent',
		status: 'Active'
	},
	{
		teacherName: 'Jane Smith',
		image: '/assets/images/avatar/user-2.png',
		email: 'jane@example.com',
		gross: '$75,000',
		taxes: '$22,000',
		netSalary: '$53,000',
		performance: 'Good',
		status: 'Active'
	},
	{
		teacherName: 'Michael Johnson',
		email: 'michael@example.com',
		gross: '$80,000',
		taxes: '$25,000',
		netSalary: '$55,000',
		performance: 'Excellent',
		status: 'Active'
	},
	{
		teacherName: 'Emily Davis',
		image: '/assets/images/avatar/user-4.png',
		email: 'davis@example.com',
		gross: '$65,000',
		taxes: '$18,000',
		netSalary: '$47,000',
		performance: 'Good',
		status: 'Inactive'
	},
	{
		teacherName: 'James Brown',
		image: '/assets/images/avatar/user-5.png',
		email: 'james@example.com',
		gross: '$68,000',
		taxes: '$19,000',
		netSalary: '$49,000',
		performance: 'Satisfactory',
		status: 'Active'
	},
	{
		teacherName: 'Patricia Wilson',
		image: '/assets/images/avatar/user-6.png',
		email: 'patricia@example.com',
		gross: '$73,000',
		taxes: '$21,000',
		netSalary: '$52,000',
		performance: 'Excellent',
		status: 'Active'
	},
	{
		teacherName: 'Robert Martinez',
		email: 'martinez@example.com',
		gross: '$78,000',
		taxes: '$23,000',
		netSalary: '$55,000',
		performance: 'Good',
		status: 'Active'
	},
	{
		teacherName: 'Linda Anderson',
		email: 'anderson@example.com',
		gross: '$72,000',
		taxes: '$20,000',
		netSalary: '$52,000',
		performance: 'Satisfactory',
		status: 'Inactive'
	},
	{
		teacherName: 'Thomas Lee',
		image: '/assets/images/avatar/user-9.png',
		email: 'thomas@example.com',
		gross: '$76,000',
		taxes: '$22,000',
		netSalary: '$54,000',
		performance: 'Excellent',
		status: 'Active'
	},
	{
		teacherName: 'Barbara Hernandez',
		image: '/assets/images/avatar/user-10.png',
		email: 'barbara@example.com',
		gross: '$70,000',
		taxes: '$20,000',
		netSalary: '$50,000',
		performance: 'Good',
		status: 'Active'
	},
	{
		teacherName: 'Christopher White',
		image: '/assets/images/avatar/user-11.png',
		email: 'white@example.com',
		gross: '$69,000',
		taxes: '$19,000',
		netSalary: '$50,000',
		performance: 'Satisfactory',
		status: 'Inactive'
	},
	{
		teacherName: 'Nancy Harris',
		image: '/assets/images/avatar/user-12.png',
		email: 'nancy@example.com',
		gross: '$74,000',
		taxes: '$21,000',
		netSalary: '$53,000',
		performance: 'Excellent',
		status: 'Active'
	},
	{
		teacherName: 'Kevin Clark',
		email: 'kevin@example.com',
		gross: '$79,000',
		taxes: '$24,000',
		netSalary: '$55,000',
		performance: 'Good',
		status: 'Active'
	},
	{
		teacherName: 'Sarah Lewis',
		image: '/assets/images/avatar/user-14.png',
		email: 'lewis@example.com',
		gross: '$71,000',
		taxes: '$20,000',
		netSalary: '$51,000',
		performance: 'Satisfactory',
		status: 'Inactive'
	}
];
