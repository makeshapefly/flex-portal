<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { onMount } from 'svelte';
	import { attendanceData } from './attendance';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { writable } from 'svelte/store';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';

	// Type declaration for Attendance data
	type Attendance = {
		date: string;
		checkInTime: string;
		checkOutTime: string;
		status: string;
		attendanceIDs?: string;
		workedTime?: string;
		differenceTime?: string;
	};

	let sortBy = '';
	let sortDirection = 'asc';
	let currentPage = 1;
	let itemsPerPage = 5;
	let attendances: Attendance[] = [...attendanceData];
	let startID = 22697; // Starting ID
	let attendanceToDelete = writable(null);

	// Function to format the date
	function formatDate(dateString: string | number | Date) {
		const options = { day: 'numeric', month: 'short', year: 'numeric' } as const;
		const date = new Date(dateString);
		const formattedDate = date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
		return formattedDate.replace(/(?<=\d) (?=\d{4})/, ', ');
	}

	// Function to parse the time
	function parseTime(timeStr: string) {
		const [time, modifier] = timeStr.split(' ');
		let [hours, minutes] = time.split(':').map(Number);

		if (modifier === 'pm' && hours !== 12) {
			hours += 12;
		} else if (modifier === 'am' && hours === 12) {
			hours = 0;
		}

		return { hours, minutes };
	}

	// Function to calculate worked time
	function calculateWorkedTime(
		checkIn: { hours: number; minutes: number },
		checkOut: { hours: number; minutes: number }
	) {
		let hours = checkOut.hours - checkIn.hours;
		let minutes = checkOut.minutes - checkIn.minutes;
		if (minutes < 0) {
			minutes += 60;
			hours--;
		}
		if (hours < 0) hours += 24;
		return { hours, minutes };
	}

	// Function to calculate the difference in time (workedTime - shiftTime)
	function calculateDifferenceTime(
		workedTime: { hours: number; minutes: number },
		shiftTime: { hours: number; minutes: number }
	) {
		let hours = workedTime.hours - shiftTime.hours;
		let minutes = workedTime.minutes - shiftTime.minutes;
		if (minutes < 0) {
			minutes += 60;
			hours--;
		}
		return { hours, minutes };
	}

	// Function to format time (e.g., 1 hr 15 min)
	function formatTime(time: { hours: number; minutes: number }) {
		const hours = Math.abs(time.hours);
		const minutes = Math.abs(time.minutes);
		const sign = time.hours < 0 || time.minutes < 0 ? '-' : '';
		return `${sign}${hours} hrs ${minutes} min`;
	}

	// Process attendance data
	function processAttendanceData() {
		attendances.forEach((report, index) => {
			// Generate attendanceID starting from "PER-22697"
			report.attendanceIDs = 'PER-' + (startID + index).toString();

			// Calculate workedTime and differenceTime
			const checkIn = parseTime(report.checkInTime);
			const checkOut = parseTime(report.checkOutTime);
			const workedTime = calculateWorkedTime(checkIn, checkOut);
			const shiftTime = { hours: 9, minutes: 0 }; // 9 hrs shift
			report.workedTime = formatTime(workedTime);
			const difference = calculateDifferenceTime(workedTime, shiftTime);
			report.differenceTime = formatTime(difference);
		});
	}

	onMount(() => {
		processAttendanceData(); // Process the data when the component is mounted
	});

	let totalPages = Math.ceil(attendances.length / itemsPerPage);
	let displayedAttendances = attendances.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	let showingStart = (currentPage - 1) * itemsPerPage + 1;
	let showingEnd = Math.min(currentPage * itemsPerPage, attendances.length);

	function updatePagination() {
		showingStart = (currentPage - 1) * itemsPerPage + 1;
		showingEnd = Math.min(currentPage * itemsPerPage, attendances.length);
		totalPages = Math.ceil(attendances.length / itemsPerPage);
	}

	function updateDisplayedAttendances() {
		// Update the displayed attendances based on the new currentPage
		displayedAttendances = attendances.slice(
			(currentPage - 1) * itemsPerPage,
			currentPage * itemsPerPage
		);

		updatePagination();
	}

	function sort(field: string) {
		if (sortBy === field) {
			// Toggle the sorting direction
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			// If sorting by a new field, set the direction to 'asc'
			sortBy = field;
			sortDirection = 'asc';
		}

		// Sort the attendances array based on the selected field
		attendances.sort((a: any, b: any) => {
			let comparison = 0;
			if (a[field] < b[field]) {
				comparison = -1;
			} else if (a[field] > b[field]) {
				comparison = 1;
			}
			return sortDirection === 'asc' ? comparison : -comparison;
		});
		updatePagination();
		processAttendanceData();
		// After sorting, update the displayedAttendances based on current page
		updateDisplayedAttendances();
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
			updatePagination();
			updateDisplayedAttendances();
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
			updatePagination();
			updateDisplayedAttendances();
		}
	}

	function gotoPage(page: number) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
			updatePagination();
			updateDisplayedAttendances();
		}
	}

	function deleteAttendance(index: number) {
		// Remove the attendance at the specified index
		attendances = attendances.filter((_, i) => i !== index);

		updatePagination();
		// Update the displayed attendances
		updateDisplayedAttendances();
		attendanceToDelete.set(null); // Close the modal
	}

	onMount(() => {
		updatePagination();
	});
	processAttendanceData();
</script>

<Col cols={{ span: 12 }} class="card">
	<CardBody>
		<div class="flex flex-col gap-5 2xl:flex-row">
			<div class="flex-shrink-0">
				<img src="/assets/images/avatar/user-3.png" alt="" class="size-40 rounded-md" />
			</div>
			<div class="mt-5 grow 2xl:mt-0">
				<h6 class="text-16 mb-1">Linda Sharp</h6>
				<div class="item-center flex flex-wrap gap-3 *:flex *:items-center">
					<p>
						<i class="ri-user-3-line ltr:mr-1 rtl:ml-1"></i>
						<span class="dark:text-dark-500 text-gray-500">Female</span>
					</p>
					<p>
						<i class="ri-briefcase-line ltr:mr-1 rtl:ml-1"></i>
						<span class="dark:text-dark-500 text-gray-500">Merchandiser, retail</span>
					</p>
					<p>
						<i class="ri-map-pin-2-line ltr:mr-1 rtl:ml-1"></i>
						<span class="dark:text-dark-500 text-gray-500">California</span>
					</p>
				</div>
				<div class="md:gap-space mt-5 flex flex-wrap items-center gap-3 xl:mr-40">
					<div
						class="dark:border-dark-800 w-[110px] shrink-0 rounded-md border border-dashed border-gray-200 p-3 text-center md:w-36 md:p-4"
					>
						<h5 class="mb-1 text-base md:text-lg">
							1 <small class="dark:text-dark-500 text-sm font-normal text-gray-500">hr</small> 48
							<small class="dark:text-dark-500 text-sm font-normal text-gray-500">m</small>
							37 <small class="dark:text-dark-500 text-sm font-normal text-gray-500">s</small>
						</h5>
						<p class="dark:text-dark-500 text-gray-500">Today Timing</p>
					</div>
					<div
						class="dark:border-dark-800 w-[110px] shrink-0 rounded-md border border-dashed border-gray-200 p-3 text-center md:w-36 md:p-4"
					>
						<h4 class="mb-1 text-base md:text-lg">
							20 <small class="dark:text-dark-500 text-sm font-normal text-gray-500"
								>Feb, 2021</small
							>
						</h4>
						<p class="dark:text-dark-500 text-gray-500">Joining Date</p>
					</div>
					<div
						class="dark:border-dark-800 w-[110px] shrink-0 rounded-md border border-dashed border-gray-200 p-3 text-center md:w-36 md:p-4"
					>
						<h4 class="mb-1 text-base md:text-lg">
							13 <small class="dark:text-dark-500 text-sm font-normal text-gray-500"
								>Dec, 1998</small
							>
						</h4>
						<p class="dark:text-dark-500 text-gray-500">Birthday Date</p>
					</div>
					<div
						class="dark:border-dark-800 w-[110px] shrink-0 rounded-md border border-dashed border-gray-200 p-3 text-center md:w-36 md:p-4"
					>
						<h4 class="mb-1 text-base md:text-lg">
							25 <small class="dark:text-dark-500 text-sm font-normal text-gray-500">Years</small>
						</h4>
						<p class="dark:text-dark-500 text-gray-500">Age</p>
					</div>
					<div
						class="dark:border-dark-800 w-[110px] shrink-0 rounded-md border border-dashed border-gray-200 p-3 text-center md:w-36 md:p-4"
					>
						<h6 class="mb-1 text-base md:text-lg">Radiology</h6>
						<p class="dark:text-dark-500 text-gray-500">Department</p>
					</div>
				</div>
			</div>
			<div class="mt-4 shrink-0 lg:mt-0">
				<div class="flex items-center gap-2">
					<button class="btn btn-sub-green btn-icon" title="phone"
						><LucideIcon name="Phone" class="size-4" /></button
					>
					<button class="btn btn-sub-purple btn-icon" title="messages-square"
						><LucideIcon name="MessagesSquare" class="size-4" /></button
					>
					<button type="button" class="btn btn-primary" title="edit"
						><LucideIcon name="Pencil" class="mr-1 inline-block size-4" /> Edit</button
					>
				</div>
			</div>
		</div>

		<h6 class="mt-5">Summary Overview</h6>

		<Grid cols={12} gap="space" class="mt-4">
			<div class="card col-span-12 mb-0 border-dashed md:col-span-6 xl:col-span-4 2xl:col-span-3">
				<div class="card-body">
					<h6 class="mb-2">208 hr 30 min (292hr)</h6>
					<p class="dark:text-dark-500 text-gray-500">Total Working Time (Monthly)</p>
				</div>
			</div>
			<!--end col/card-->
			<div class="card col-span-12 mb-0 border-dashed md:col-span-6 xl:col-span-4 2xl:col-span-3">
				<div class="card-body">
					<h6 class="mb-2">5 hr 15 min</h6>
					<p class="dark:text-dark-500 text-gray-500">Total Delay (Monthly)</p>
				</div>
			</div>
			<!--end col/card-->
			<div class="card col-span-12 mb-0 border-dashed md:col-span-6 xl:col-span-4 2xl:col-span-3">
				<div class="card-body">
					<h6 class="mb-2 text-red-500">-5 hr 15 min</h6>
					<p class="dark:text-dark-500 text-gray-500">Total Delay (Monthly)</p>
				</div>
			</div>
			<!--end col/card-->
			<div class="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
				<div class="gap-space grid grid-cols-2">
					<div class="card mb-0 border-dashed">
						<div class="card-body">
							<h6 class="mb-2">3</h6>
							<p class="dark:text-dark-500 text-gray-500">Missed Shift</p>
						</div>
					</div>
					<div class="card mb-0 border-dashed">
						<div class="card-body">
							<h6 class="mb-2">2</h6>
							<p class="dark:text-dark-500 text-gray-500">Absence</p>
						</div>
					</div>
				</div>
			</div>
			<!--end col/card-->
		</Grid>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Attendance List</CardTitle>
		<button type="button" class="btn btn-primary shrink-0">Start Timing</button>
	</CardHeader>
	<CardBody class="pt-0">
		<div>
			<div class="table-box">
				<table class="flush table whitespace-nowrap">
					<tbody>
						<tr class="text-gray-500">
							<th class="cursor-pointer !font-medium" on:click={() => sort('date')}>
								Date <span>{sortBy === 'date' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
							</th>
							<th class="!font-medium">Shift Time</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('checkInTime')}>
								Check In <span
									>{sortBy === 'checkInTime' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('checkOutTime')}>
								Check Out <span
									>{sortBy === 'checkOutTime' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('workedTime')}>
								Worked Time <span
									>{sortBy === 'workedTime' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('differenceTime')}>
								Difference <span
									>{sortBy === 'differenceTime' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('status')}>
								Status <span
									>{sortBy === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="!font-medium">Action</th>
						</tr>
						{#each displayedAttendances as attendance, index (attendance.attendanceIDs || index)}
							<tr class="*:px-3 *:py-2.5">
								<td>{formatDate(attendance.date)}</td>
								<td><div class="badge badge-gray">9 hrs Shift</div></td>
								<td>{attendance.checkInTime}</td>
								<td>{attendance.checkOutTime}</td>
								<td>{attendance.workedTime}</td>
								<td>{attendance.differenceTime}</td>
								<td>
									<span
										class={`badge ${attendance.status === 'Present' ? 'badge-green' : attendance.status === 'Late' ? 'badge-yellow' : 'badge-red'}`}
									>
										{attendance.status}
									</span>
								</td>
								<td>
									<div class="flex items-center gap-2">
										<button
											class="btn btn-sub-primary btn-icon !size-8 rounded-md"
											title="edit"
											aria-label="edit"
										>
											<i class="ri-pencil-line"></i>
										</button>
										<ModalTrigger
											modalId="delete-file-modal"
											icon="Trash2"
											color=""
											iconCss="!size-3.5"
											class="btn-sub-red btn-icon !size-8 place-items-center rounded-md !p-1"
										></ModalTrigger>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="mt-5 grid grid-cols-12 items-center gap-5">
				<div class="col-span-12 lg:col-span-6">
					<p class="dark:text-dark-500 text-gray-500">
						Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{attendanceData.length}</b> Results
					</p>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<div class="pagination pagination-primary flex justify-start lg:justify-end">
						<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
							Prev
						</button>
						{#each Array(totalPages) as _, index}
							<button
								on:click={() => gotoPage(index + 1)}
								class="pagination-item {currentPage === index + 1 ? 'active' : ''}"
							>
								<span>{index + 1}</span>
							</button>
						{/each}
						<button
							on:click={nextPage}
							disabled={currentPage === totalPages}
							class="pagination-next"
						>
							Next
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</CardBody>
</Col>

<DeleteComponent />
