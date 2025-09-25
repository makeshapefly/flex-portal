<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { writable } from 'svelte/store';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import { todayAppointmentData } from './today-appointment';
	import { appointmentsData } from './appointment';

	interface Appointment {
		date: string;
		time: string;
		patientName: string;
		doctor: string;
		treatmentType: string;
		status: string;
		image?: string; // Optional image property
	}

	let showAll = false;
	let displayedTodayAppointments = writable(todayAppointmentData.slice(0, 4));
	const itemsPerPage = 10;
	let sortBy = writable('');
	let sortDirection = writable('asc');
	let startIndex = writable(0);
	let currentPage = writable(1);
	let totalPages = writable(Math.ceil(appointmentsData.length / itemsPerPage));
	let displayedAppointments = writable(appointmentsData.slice(0, itemsPerPage));

	// Store to hold the selected appointment data
	const selectedAppointment = writable<Appointment | null>(null);

	// Function to set the selected appointment
	const selectAppointment = (appointment: Appointment) => {
		selectedAppointment.set(appointment);
	};
	// Function to handle page changes
	const gotoPage = (page: number) => {
		currentPage.set(page);
		const start = (page - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		displayedAppointments.set(appointmentsData.slice(start, end));
	};

	// Function to go to the next page
	const nextPage = () => {
		currentPage.update(($currentPage) => {
			const nextPage = $currentPage + 1;
			if (nextPage <= $totalPages) {
				gotoPage(nextPage);
				return nextPage;
			}
			return $currentPage;
		});
	};

	const sort = (column: string) => {
		sortBy.update((current) => {
			if (current === column) {
				sortDirection.update((dir) => (dir === 'asc' ? 'desc' : 'asc'));
			} else {
				sortDirection.set('asc');
				return column;
			}
			return current;
		});

		// Sorting appointments when the column is clicked
		displayedAppointments.update(($appointments) => {
			const direction = $sortDirection === 'asc' ? 1 : -1;
			return [...$appointments].sort((a: any, b: any) => {
				const valueA = a[column];
				const valueB = b[column];
				if (valueA > valueB) return direction;
				if (valueA < valueB) return -direction;
				return 0;
			});
		});
	};

	// Function to go to the previous page
	const prevPage = () => {
		currentPage.update(($currentPage) => {
			const prevPage = $currentPage - 1;
			if (prevPage >= 1) {
				gotoPage(prevPage);
				return prevPage;
			}
			return $currentPage;
		});
	};

	// Watch the current page to update the totalPages correctly
	$: {
		$totalPages = Math.ceil(appointmentsData.length / itemsPerPage);
	}

	$: {
		$startIndex = ($currentPage - 1) * itemsPerPage;
	}

	const generateAvatarText = (patientName: string) => {
		const nameParts = patientName.split(' ');
		if (nameParts.length > 1) {
			return nameParts[0][0] + nameParts[1][0];
		}
		return patientName[0];
	};

	// Toggle function to switch between showing 4 items or all items
	const toggleShowAll = () => {
		showAll = !showAll;
		if (showAll) {
			displayedTodayAppointments.set(todayAppointmentData);
		} else {
			displayedTodayAppointments.set(todayAppointmentData.slice(0, 4));
		}
	};
</script>

<Grid cols={1} gapX="space" class="md:grid-cols-2 2xl:grid-cols-4">
	<Card>
		<div class="card-body flex items-center gap-3">
			<div
				class="flex size-12 shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-yellow-500/15 to-green-500/15 text-green-500"
			>
				<LucideIcon name="CalendarPlus2" class="size-6" />
			</div>
			<div class="grow">
				<p class="dark:text-dark-500 mb-1 text-gray-500">Today Appointment</p>
				<h6>10</h6>
			</div>
		</div>
	</Card>
	<Card>
		<div class="card-body flex items-center gap-3">
			<div
				class="flex size-12 shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-sky-500/15 to-green-500/15 text-sky-500"
			>
				<LucideIcon name="CalendarPlus" class="size-6" />
			</div>
			<div class="grow">
				<p class="dark:text-dark-500 mb-1 text-gray-500">New Appointment</p>
				<h6>21</h6>
			</div>
		</div>
	</Card>
	<Card>
		<div class="card-body flex items-center gap-3">
			<div
				class="flex size-12 shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-red-500/15 to-pink-500/15 text-red-500"
			>
				<LucideIcon name="CalendarX2" class="size-6" />
			</div>
			<div class="grow">
				<p class="dark:text-dark-500 mb-1 text-gray-500">Cancel Appointment</p>
				<h6>09</h6>
			</div>
		</div>
	</Card>
	<Card>
		<div class="card-body flex items-center gap-3">
			<div
				class="flex size-12 shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-purple-500/15 to-pink-500/15 text-purple-500"
			>
				<LucideIcon name="CalendarDays" class="size-6" />
			</div>
			<div class="grow">
				<p class="dark:text-dark-500 mb-1 text-gray-500">Total Appointment</p>
				<h6>153</h6>
			</div>
		</div>
	</Card>
</Grid>

<div>
	<div class="mb-3 flex">
		<h6 class="grow">Today Appointments</h6>
		<a
			href="/apps-hospital-appointments-book"
			class="link link-primary shrink-0 underline"
			on:click|preventDefault={toggleShowAll}
		>
			{showAll ? 'Show Less' : 'Show All'}
		</a>
	</div>
	<Grid cols={1} gapX="space" class="md:grid-cols-2 2xl:grid-cols-4">
		{#each $displayedTodayAppointments as appointment, index (appointment.patientName + appointment.time)}
			<div class="card">
				<div class="card-body">
					<div class="flex">
						<div class="grow">
							{#if appointment.image}
								<img src={appointment.image} alt="" class="size-12 rounded-lg" />
							{/if}
						</div>

						<Dropdown class="dropdown" alignTo="auto">
							<DropdownButton class="link link-primary">
								<i class="ri-more-fill"></i>
							</DropdownButton>
							<DropdownMenu class="dropdown-menu !fixed hidden p-2">
								<a href="/apps-hospital-patients-overview" class="dropdown-item"> Overview </a>

								<a href="#!" class="dropdown-item"> Edit </a>
								<a href="#!" class="dropdown-item"> Delete </a>
							</DropdownMenu>
						</Dropdown>
					</div>

					<div class="mt-4">
						<h6 class="mb-1">{appointment.patientName}</h6>
						<p class="dark:text-dark-500 text-gray-500">{appointment.treatment}</p>
					</div>

					<div class="dark:text-dark-500 mt-5 flex text-gray-500">
						<p class="grow">
							<i class="ri-calendar-event-line align-baseline ltr:mr-1 rtl:ml-1"></i>
							<span>{appointment.date}</span>
						</p>
						<p>
							<i class="ri-time-line align-baseline ltr:mr-1 rtl:ml-1"></i>
							<span>{appointment.time}</span>
						</p>
					</div>
				</div>
			</div>
		{/each}
	</Grid>
</div>

<div>
	<Card>
		<div class="card-header flex items-center gap-5">
			<h6 class="card-title grow">Appointments (<span>{appointmentsData.length}</span>)</h6>
			<button type="button" class="btn btn-primary shrink-0"
				><a href="/apps-hospital-appointments-book">Book Appointment</a></button
			>
		</div>
		<div class="card-body pt-0">
			<div>
				<div class="table-box overflow-x-auto">
					<table class="table whitespace-nowrap">
						<thead>
							<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
								<th class="cursor-pointer !font-medium" on:click={() => sort('patientName')}>
									Patient Name <span
										>{$sortBy === 'patientName' ? ($sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th class="cursor-pointer !font-medium" on:click={() => sort('date')}>
									Date <span
										>{$sortBy === 'date' ? ($sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th class="cursor-pointer !font-medium" on:click={() => sort('time')}>
									Time <span
										>{$sortBy === 'time' ? ($sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th class="cursor-pointer !font-medium" on:click={() => sort('treatmentType')}>
									Treatment <span
										>{$sortBy === 'treatmentType'
											? $sortDirection === 'asc'
												? '↑'
												: '↓'
											: ''}</span
									>
								</th>
								<th class="cursor-pointer !font-medium" on:click={() => sort('doctor')}>
									Doctor <span
										>{$sortBy === 'doctor' ? ($sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th class="cursor-pointer !font-medium" on:click={() => sort('status')}>
									Status <span
										>{$sortBy === 'status' ? ($sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th class="!font-medium">Action</th>
							</tr>
						</thead>
						<tbody>
							{#each $displayedAppointments as appointment, index}
								<tr class="*:px-3 *:py-2.5">
									<td>
										<div class="flex items-center gap-3">
											<div
												class="dark:bg-dark-850 dark:text-dark-500 relative size-8 rounded-full bg-gray-100 text-gray-500"
											>
												{#if appointment.image}
													<img src={appointment.image} alt="Patient Avatar" class="rounded-full" />
												{:else}
													<span
														class="dark:bg-dark-850 dark:text-dark-500 absolute inset-0 flex items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500"
													>
														{generateAvatarText(appointment.patientName)}
													</span>
												{/if}
											</div>
											<div>
												<h6>
													<a href="/apps-hospital-patients-overview">{appointment.patientName}</a>
												</h6>
											</div>
										</div>
									</td>
									<td>{appointment.date}</td>
									<td>{appointment.time}</td>
									<td>{appointment.treatmentType}</td>
									<td>{appointment.doctor}</td>
									<td>
										<span
											class="badge {appointment.status === 'New'
												? 'badge-primary'
												: appointment.status === 'Cancel'
													? 'badge-red'
													: appointment.status === 'Confirmed'
														? 'badge-green'
														: appointment.status === 'Completed'
															? 'badge-purple'
															: 'badge-gray'}"
										>
											{appointment.status}
										</span>
									</td>
									<td>
										<div class="flex items-center gap-2">
											<ModalTrigger
												modalId="apointment-modal"
												icon="Eye"
												color=""
												class="btn-sub-gray !size-8 place-items-center rounded-md"
											/>
											<button
												class="btn btn-sub-gray btn-icon !size-8"
												title="edit"
												aria-label="edit"
											>
												<i class="ri-pencil-line"></i>
											</button>
											<button
												class="btn btn-sub-red btn-icon !size-8"
												title="delete"
												aria-label="delete"
											>
												<i class="ri-delete-bin-line"></i>
											</button>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<div class="mt-5 grid grid-cols-12 items-center gap-5">
					<div class="col-span-12 text-center lg:col-span-6 ltr:lg:text-left rtl:lg:text-right">
						<p class="dark:text-dark-500 text-gray-500">
							Showing <b>{$startIndex + 1}</b> -
							<b>{Math.min($startIndex + itemsPerPage, appointmentsData.length)}</b>
							of <b>{appointmentsData.length}</b> Results
						</p>
					</div>
					<div class="col-span-12 md:col-span-6">
						<div class="pagination pagination-primary flex justify-center lg:justify-end">
							<button on:click={prevPage} disabled={$currentPage === 1} class="pagination-pre">
								<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
								<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
								Prev
							</button>
							{#each Array($totalPages)
								.fill(null)
								.map((_, i) => i + 1) as page}
								<button
									on:click={() => gotoPage(page)}
									class="pagination-item {$currentPage === page ? 'active' : ''}"
								>
									<span>{page}</span>
								</button>
							{/each}
							<button
								on:click={nextPage}
								disabled={$currentPage === $totalPages}
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
		</div>
	</Card>
</div>

<Modal modalId="apointment-modal" let:modalId>
	<ModalHeader {modalId}>
		<h6>Appointment Overview</h6>
	</ModalHeader>
	<ModalBody>
		<!-- Patient Information Section -->
		<p class="dark:text-dark-500 mb-2 text-gray-500">Patient Info</p>
		<div class="mb-5 flex gap-3">
			<div
				class="dark:bg-dark-850 dark:text-dark-500 relative size-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-500"
			>
				<!-- Doctor Information Section -->
				<div class="flex gap-3">
					<p class="dark:text-dark-500 text-gray-500">Doctor Name:</p>
					<div>
						<h6>{$selectedAppointment.doctor}</h6>
					</div>
				</div>

				<!-- Appointment Status Section -->
				<div class="mt-4 flex gap-3">
					<p class="dark:text-dark-500 text-gray-500">Status:</p>
				</div>
			</div>
		</div>
	</ModalBody>
</Modal>
