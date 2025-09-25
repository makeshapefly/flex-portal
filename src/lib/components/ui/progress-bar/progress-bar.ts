

export function getCompletedClass(percent: number): string {
	if (percent <= 0) return 'w-0';
	if (percent <= 8.33) return 'w-1/12'; // 1/12th
	if (percent <= 16.66) return 'w-2/12'; // 2/12th
	if (percent <= 25) return 'w-3/12'; // 3/12th or 1/4
	if (percent <= 33.33) return 'w-4/12'; // 1/3rd
	if (percent <= 41.66) return 'w-5/12';
	if (percent <= 50) return 'w-6/12'; // 1/2
	if (percent <= 58.33) return 'w-7/12';
	if (percent <= 66.66) return 'w-8/12'; // 2/3rd
	if (percent <= 75) return 'w-9/12';
	if (percent <= 83.33) return 'w-10/12';
	if (percent <= 91.66) return 'w-11/12';
	if (percent <= 100) return 'w-full'; // 100%
	return 'w-full'; // Default to full for anything above 100%
}