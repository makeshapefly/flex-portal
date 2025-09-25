<script lang="ts">
	import { onMount } from 'svelte';
	import { scheduleData } from './schedule';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';

	interface Appointment {
		date: string;
		name: string;
		specialty: string;
		notes: string;
		time: string;
		color: string;
		formattedDate?: string;
	}

	interface DateInfo {
		day: number;
		name: string;
		formattedDate: string;
		isToday: boolean;
	}

	let months: string[] = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	let days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	let selectedMonth: number = new Date().getMonth();
	let selectedYear: number = new Date().getFullYear();
	let todayDay: number = new Date().getDate();
	let todayMonth: number = new Date().getMonth();
	let todayYear: number = new Date().getFullYear();

	let dates: DateInfo[] = [];
	let appointments: Appointment[] = [...scheduleData]; // Schedule data imported here
	let selectedAppointments = scheduleData;

	// Format date to month/year
	const formatDate = (date: Date): string => {
		const monthIndex = date.getMonth();
		const year = date.getFullYear();
		return `${months[monthIndex]}, ${year}`;
	};

	// Generate dates for the selected month
	const generateDates = () => {
		const year = selectedYear;
		const month = selectedMonth;
		const date = new Date(year, month, 1);
		dates = [];

		while (date.getMonth() === month) {
			dates.push({
				day: date.getDate(),
				name: days[date.getDay()],
				formattedDate: formatDate(date),
				isToday: date.getDate() === todayDay && month === todayMonth && year === todayYear
			});
			date.setDate(date.getDate() + 1);
		}
	};

	const selectMonth = (index: number) => {
		selectedMonth = index;
		generateDates();
	};

	const selectDate = (date: DateInfo) => {
		selectedYear = date.isToday ? todayYear : selectedYear;
		selectedMonth = date.isToday ? todayMonth : selectedMonth;
	};

	onMount(() => {
		generateDates();
	});
</script>

<div id="scrollTodayDate">
	<!-- Month Dropdown -->
	<Dropdown class="dropdown shrink-0" alignTo="auto">
		<DropdownButton class="btn-primary btn flex items-center gap-2">
			<span>{months[selectedMonth]} {selectedYear}</span>
		</DropdownButton>

		<DropdownMenu class="dropdown-menu !fixed hidden p-2">
			{#each months as month, index}
				<a href="#!" class="dropdown-item" on:click={() => selectMonth(index)}>
					<span>{month}</span>
				</a>
			{/each}
		</DropdownMenu>
	</Dropdown>

	<!-- Calendar View -->
	<Simplebar class="mt-5">
		<div class="flex gap-5">
			{#each dates as date, index}
				<a
					href="#!"
					class="dark:border-dark-800 flex size-16 shrink-0 items-center justify-center rounded-md border border-gray-200 text-center"
					on:click={() => selectDate(date)}
					class:active-date={date.isToday}
				>
					<div>
						<h5>{date.day}</h5>
						<p>{date.name}</p>
					</div>
				</a>
			{/each}
		</div>
	</Simplebar>

	<!-- Display Appointments -->
	<div
		class="gap-x-space mt-space grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
	>
		{#each selectedAppointments as appointment, index (appointment.date + index)}
			<div
				class="card relative before:absolute before:top-5 before:h-12 before:w-[2px] before:rounded-full ltr:before:-left-0.5 rtl:before:-right-0.5 {appointment.color}"
			>
				<div class="card-body">
					<!-- Appointment Date -->
					<div class="mb-5 flex items-center gap-2">
						<h3
							class="dark:border-dark-800 flex size-12 items-center justify-center rounded-md border border-gray-200"
						>
							{new Date(appointment.date).getDate()}
						</h3>
						<div>
							<h6 class="mb-0.5">{formatDate(new Date(appointment.date))}</h6>
						</div>
					</div>
					<!-- Appointment Info -->
					<h6>{appointment.name}</h6>
					<p class="dark:text-dark-500 mb-2 text-gray-500">{appointment.specialty}</p>
					<small class="dark:text-dark-500 text-gray-500">Notes:</small>
					<p class="mb-2">{appointment.notes}</p>
					<div class="flex items-center gap-1 font-semibold">
						<i class="ri-time-line align-baseline text-lg font-normal text-gray-500"></i>
						<span>{appointment.time}</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
