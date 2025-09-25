<script lang="ts">
	import { writable } from 'svelte/store';
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import PatientVisitCard from './PatientVisitCard.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import { hospitalAppointmentData, roomUsage } from './dash-appointment';
	import { patientListData } from './hospital-list';

	//charts
	import { options as patientChart } from './patient-chart';
	import { options as department } from './department';
	import { options as historyChart } from './history-chart';
	import { options as birthChart } from './birth-chart';

	// Create a writable store to manage appointment items
	let appointmentItems = writable([...hospitalAppointmentData]);
	let searchTerm = '';
	let selectedItems: any[] = [];
	let sortBy = '';
	let sortDirection: 'asc' | 'desc' = 'asc';
	let currentPage = 1;
	let itemsPerPage = 8;
	let allSelected = false;
	let displayedEmails = [...patientListData];
	const totalPages = () => Math.ceil(displayedEmails.length / itemsPerPage);

	// Sorting function for each column
	const sort = (column: string) => {
		sortDirection = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
		sortBy = column;

		// Sort the emails based on the selected column
		displayedEmails = [...patientListData].sort((a: any, b: any) => {
			const valueA = a[column];
			const valueB = b[column];

			if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
			if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
		currentPage = 1;
	};

	// Filter emails based on the search term
	const filteredEmails = () => {
		displayedEmails = patientListData.filter((email) =>
			email.patientName.toLowerCase().includes(searchTerm.toLowerCase())
		);
		currentPage = 1;
	};

	// Pagination functions
	const prevPage = () => {
		if (currentPage > 1) currentPage--;
	};

	const nextPage = () => {
		if (currentPage < totalPages()) currentPage++;
	};

	const gotoPage = (page: number) => {
		currentPage = page;
	};

	// Showing start and end page numbers based on filtered and sorted emails
	const showingStart = () => (currentPage - 1) * itemsPerPage + 1;
	const showingEnd = () => Math.min(currentPage * itemsPerPage, displayedEmails.length);

	// Toggle email selection
	const toggleItem = (email: any) => {
		if (selectedItems.includes(email)) {
			selectedItems = selectedItems.filter((item) => item !== email);
		} else {
			selectedItems.push(email);
		}
	};

	// Select/Deselect all items
	const toggleAll = () => {
		if (allSelected) {
			selectedItems = [];
		} else {
			selectedItems = [...displayedEmails];
		}
		allSelected = !allSelected;
	};

	$: allSelected = selectedItems.length === displayedEmails.length;
	const isSelected = (email: any) => selectedItems.includes(email);

	// Delete selected items from the displayed list only
	const deleteSelectedItems = () => {
		if (selectedItems.length === 0) return;
		displayedEmails = displayedEmails.filter((email) => !selectedItems.includes(email));
		selectedItems = [];
		allSelected = false;
	};

	// Function to update the status of an appointment
	function setStatus(index: number, status: string) {
		appointmentItems.update((items) => {
			items[index].status = status;
			return items;
		});
	}

	function animatedCounter(target: number) {
		const start = writable(0);
		let current = 0;

		// Determine the step size based on the magnitude of the number
		const stepSize = target > 10000 ? 1000 : 1;
		const duration = Math.max(500, Math.floor(2000 / Math.log10(target)));
		const stepInterval = duration / (target / stepSize);

		const interval = setInterval(() => {
			if (current < target) {
				// Ensure we don't overshoot the target by only incrementing in valid steps
				current = Math.min(current + stepSize, target);
				start.set(current);
			} else {
				clearInterval(interval);
			}
		}, stepInterval);

		return start;
	}

	// Create writable stores for each counter with dynamic speed
	let counter1 = animatedCounter(1540);
	let counter2 = animatedCounter(241);
	let counter3 = animatedCounter(574);
	let counter4 = animatedCounter(150);
</script>

<Col cols={{ span: 12 }} xl={{ span: 8 }} class="card xl:row-span-2">
	<CardBody>
		<Grid cols={12} gap="space">
			<Col cols={{ span: 12 }} xl={{ span: 6 }} class="row-span-2">
				<div class="mb-space flex items-center gap-3">
					<CardTitle class="grow">Patient Visits</CardTitle>
					<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
						<DropdownButton
							class="dark:border-dark-800 link link-red btn flex border-gray-200 px-2 py-1 text-xs"
							isChevron={true}
							>Last Week
						</DropdownButton>
						<DropdownMenu class="dropdown-menu !fixed hidden p-2">
							<a href="#!" class="dropdown-item">
								<span>Weekly</span>
							</a>

							<a href="#!" class="dropdown-item">
								<span>Monthly</span>
							</a>

							<a href="#!" class="dropdown-item">
								<span>Yearly</span>
							</a>
						</DropdownMenu>
					</Dropdown>
				</div>
				<div dir="ltr">
					<ApexChart
						class="!min-h-full"
						colors={['bg-primary-500', 'bg-green-500', 'bg-yellow-500']}
						options={patientChart}
					/>
				</div>
			</Col>
			<Col
				cols={{ span: 12 }}
				md={{ span: 6 }}
				xl={{ span: 3 }}
				class="relative overflow-hidden rounded-md bg-purple-500/15 p-5"
			>
				<PatientVisitCard />
				<div class="relative">
					<p class="dark:text-dark-500 mb-12 text-gray-500">Total Patients</p>
					<h5><span>{$counter1}</span>+</h5>
					<p class="dark:text-dark-500 mt-1 text-gray-500">Last 28 days</p>
				</div>
			</Col>
			<Col
				cols={{ span: 12 }}
				md={{ span: 6 }}
				xl={{ span: 3 }}
				class="relative overflow-hidden rounded-md bg-red-500/15 p-5"
			>
				<PatientVisitCard setColor="stroke-red-500/30" />
				<div class="relative">
					<p class="dark:text-dark-500 mb-12 text-gray-500">Surgeries</p>
					<h5><span>{$counter2}</span></h5>
					<p class="dark:text-dark-500 mt-1 text-gray-500">Last 28 days</p>
				</div>
			</Col>
			<Col
				cols={{ span: 12 }}
				md={{ span: 6 }}
				xl={{ span: 3 }}
				class="relative overflow-hidden rounded-md bg-sky-500/15 p-5"
			>
				<PatientVisitCard setColor="stroke-sky-500/30" />
				<div class="relative">
					<p class="dark:text-dark-500 mb-12 text-gray-500">Total Reports</p>
					<h5><span>{$counter3}</span></h5>
					<p class="dark:text-dark-500 mt-1 text-gray-500">Last 28 days</p>
				</div>
			</Col>
			<Col
				cols={{ span: 12 }}
				md={{ span: 6 }}
				xl={{ span: 3 }}
				class="relative overflow-hidden rounded-md bg-green-500/15 p-5"
			>
				<PatientVisitCard setColor="stroke-green-500/30" />
				<div class="relative">
					<p class="dark:text-dark-500 mb-12 text-gray-500">Total Staffs</p>
					<h5><span>{$counter4}</span></h5>
					<p class="dark:text-dark-500 mt-1 text-gray-500">Last 28 days</p>
				</div>
			</Col>
		</Grid>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Patient Visits by Department</CardTitle>
		<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
			<DropdownButton
				class="dark:border-dark-800 link link-red btn flex border-gray-200 px-2 py-1 text-xs"
				isChevron={true}
			>
				Last Week
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden p-2">
				<a href="#!" class="dropdown-item">
					<span>Weekly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Monthly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Yearly</span>
				</a>
			</DropdownMenu>
		</Dropdown>
	</CardHeader>
	<CardBody>
		<div dir="ltr">
			<ApexChart
				class="!min-h-full"
				options={department}
				colors={['bg-primary-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500']}
			/>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card xl:row-span-2">
	<CardHeader class="flex items-center gap-3 ">
		<CardTitle class="grow">Appointment Requests</CardTitle>
		<a href="#!" class="link link-primary shrink-0">
			Create
			<i class="ri-arrow-right-line ltr:inline-block rtl:hidden"></i>
			<i class="ri-arrow-right-line ltr:hidden rtl:inline-block"></i>
		</a>
	</CardHeader>
	<CardBody>
		<!-- Loop over appointmentItems to display each item -->
		{#each $appointmentItems as item, index (index)}
			<div class="mb-3 flex items-center gap-3 last:mb-0">
				<img src={item.image} loading="lazy" alt="" class="size-10 shrink-0 rounded-full" />
				<div class="grow">
					<h6 class="mb-1">{item.name}</h6>
					<p class="dark:text-dark-500 text-xs text-gray-500">
						<i class="ri-calendar-line align-baseline"></i>
						{item.time}
					</p>
				</div>

				{#if item.status === 'pending'}
					<div class="flex shrink-0 items-center gap-2">
						<button
							on:click={() => setStatus(index, 'accepted')}
							title="Accepted"
							class="btn btn-icon btn-sub-green !size-8"
							aria-label="Accepted"
						>
							<i class="ri-check-line"></i>
						</button>
						<button
							on:click={() => setStatus(index, 'rejected')}
							title="Rejected"
							class="btn btn-icon btn-sub-red !size-8"
							aria-label="Rejected"
						>
							<i class="ri-close-line"></i>
						</button>
					</div>
				{/if}

				{#if item.status === 'accepted'}
					<div class="flex shrink-0 items-center gap-2">
						<span class="badge badge-green">Accepted</span>
					</div>
				{/if}

				{#if item.status === 'rejected'}
					<div class="flex shrink-0 items-center gap-2">
						<span class="badge badge-red">Rejected</span>
					</div>
				{/if}
			</div>
		{/each}
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 8 }} class="card xl:row-span-2">
	<CardHeader class="flex flex-col gap-3 md:flex-row md:items-center">
		<CardTitle class="grow">Patients History</CardTitle>
		<div class="flex shrink-0 flex-wrap items-center gap-2">
			<button type="button" class="!text-13 btn btn-primary px-3 py-1">All</button>
			<button
				type="button"
				class="!text-13 dark:border-dark-800 btn btn-outline-gray border-gray-200 px-3 py-1"
				>Weekly</button
			>
			<button
				type="button"
				class="!text-13 dark:border-dark-800 btn btn-outline-gray border-gray-200 px-3 py-1"
				>Monthly</button
			>
			<button
				type="button"
				class="!text-13 dark:border-dark-800 btn btn-outline-gray border-gray-200 px-3 py-1"
				>Yearly</button
			>
		</div>
	</CardHeader>
	<CardBody>
		<div class="mb-3 grid grid-cols-12 gap-4">
			<div class="col-span-6 md:col-span-3">
				<h6>241</h6>
				<p class="dark:text-dark-500 text-gray-500">
					Assign Doctors <span class="align-baseline text-xs font-medium text-green-500"
						><LucideIcon name="TrendingUp" class="inline-block size-4 ltr:ml-1 rtl:mr-1" /> 3.5%</span
					>
				</p>
			</div>
			<!--end col-->
			<div class="col-span-6 md:col-span-3">
				<h6>241</h6>
				<p class="dark:text-dark-500 text-gray-500">
					Admit Patients <span class="align-baseline text-xs font-medium text-red-500"
						><LucideIcon name="TrendingDown" class="inline-block size-4 ltr:ml-1 rtl:mr-1" /> 0.4%</span
					>
				</p>
			</div>
			<!--end col-->
		</div>

		<div dir="ltr">
			<ApexChart
				class="!min-h-full"
				options={historyChart}
				colors={['bg-primary-500', 'bg-purple-500']}
			/>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 4 }}>
	<h6 class="mb-2">Upcoming Consultation</h6>
	<Card>
		<CardBody>
			<div class="flex gap-3">
				<img
					src="assets/images/avatar/user-25.png"
					loading="lazy"
					alt=""
					class="size-11 shrink-0 rounded-md"
				/>
				<div class="grow">
					<h6 class="mb-1">Dr. Waylon Modin</h6>
					<p class="dark:text-dark-500 text-gray-500">Dental Specialist</p>
				</div>
			</div>
			<div
				class="dark:text-dark-500 dark:bg-dark-850 text-13 my-4 rounded-md bg-gray-100 px-3 py-2 text-gray-500"
			>
				<p>
					<i class="ri-calendar-todo-line text-14 align-baseline ltr:mr-1 rtl:ml-1"></i> 24 Jul, 2024
					- 11:00 AM - 12:00 PM
				</p>
			</div>
			<div class="flex items-center gap-2">
				<button type="button" class="btn btn-outline-red w-full">Cancel</button>
				<button type="button" class="btn btn-primary w-full">Reschedule</button>
			</div>
		</CardBody>
	</Card>
</Col>

<Col col={{ span: 12 }} xl={{ span: 4 }} class="card">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Hospital Birth & Death Analytics</CardTitle>
		<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
			<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
				<LucideIcon name="Ellipsis" class="size-5" />
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden p-2">
				<a href="/apps-event-overview" class="dropdown-item">
					<span>Weekly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Monthly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Yearly</span>
				</a>
			</DropdownMenu>
		</Dropdown>
	</CardHeader>
	<CardBody>
		<div dir="ltr">
			<ApexChart
				class="!min-h-full"
				options={birthChart}
				colors={['bg-primary-500', 'bg-red-500', 'bg-green-500']}
			/>
		</div>
	</CardBody>
</Col>

<Col col={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 4 }} class="card">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Rooms Analytics Sessions</CardTitle>
		<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
			<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
				<LucideIcon name="Ellipsis" class="size-5" />
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden p-2">
				<a href="/apps-event-overview" class="dropdown-item">
					<span>Weekly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Monthly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Yearly</span>
				</a>
			</DropdownMenu>
		</Dropdown>
	</CardHeader>
	<CardBody>
		<div class="space-y-4">
			{#each roomUsage as room}
				<div class="flex flex-col gap-3 md:flex-row md:items-center">
					<img src={room.image} loading="lazy" alt={room.name} class="size-8 shrink-0" />
					<div class="grow">
						<h6>{room.name}</h6>
						<p class="dark:text-dark-500 text-gray-500">{room.description}</p>
					</div>
					<div class="shrink-0 md:ltr:text-right md:rtl:text-left">
						<h6>{room.usage}</h6>
						<span class="text-green-500">{room.period}</span>
					</div>
				</div>
			{/each}
		</div>
	</CardBody>
</Col>

<Col col={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 4 }} class="card">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Treatment Summaries</CardTitle>
		<a href="#!" class="text-primary-500 link hover:text-primary-600">
			See All
			<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
		</a>
	</CardHeader>
	<CardBody>
		<div class="grid grid-cols-12">
			<div
				class="dark:border-dark-800 col-span-6 border-r border-b border-dashed border-gray-200 p-4"
			>
				<div class="flex gap-2">
					<img
						src="/assets/images/avatar/user-25.png"
						loading="lazy"
						alt=""
						class="size-10 shrink-0 rounded-md"
					/>
					<div class="grow overflow-hidden">
						<h6 class="truncate">Dr. Mariana Grandon</h6>
						<p class="dark:text-dark-500 text-gray-500">Endocrinologist</p>
					</div>
				</div>
				<p class="dark:text-dark-500 mt-4 text-gray-500">2154 Treatment</p>
			</div>
			<div class="dark:border-dark-800 col-span-6 border-b border-dashed border-gray-200 p-4">
				<div class="flex gap-2">
					<img
						src="/assets/images/avatar/user-27.png"
						loading="lazy"
						alt=""
						class="size-10 shrink-0 rounded-md"
					/>
					<div class="grow overflow-hidden">
						<h6 class="truncate">Dr. Sydney Toor</h6>
						<p class="dark:text-dark-500 text-gray-500">Hematology</p>
					</div>
				</div>
				<p class="dark:text-dark-500 mt-4 text-gray-500">879 Treatment</p>
			</div>
			<div
				class="dark:border-dark-800 col-span-6 border-r border-b border-dashed border-gray-200 p-4"
			>
				<div class="flex gap-2">
					<img
						src="/assets/images/avatar/user-26.png"
						loading="lazy"
						alt=""
						class="size-10 shrink-0 rounded-md"
					/>
					<div class="grow overflow-hidden">
						<h6 class="truncate">Dr. Dante Ditto</h6>
						<p class="dark:text-dark-500 text-gray-500">Radiologist</p>
					</div>
				</div>
				<p class="dark:text-dark-500 mt-4 text-gray-500">643 Treatment</p>
			</div>
			<div class="dark:border-dark-800 col-span-6 border-b border-dashed border-gray-200 p-4">
				<div class="flex gap-2">
					<img
						src="/assets/images/avatar/user-28.png"
						loading="lazy"
						alt=""
						class="size-10 shrink-0 rounded-md"
					/>
					<div class="grow overflow-hidden">
						<h6 class="truncate">Dr. Marcus Welton</h6>
						<p class="text-gray-500">Nephrologist</p>
					</div>
				</div>
				<p class="mt-4 text-gray-500">5412 Treatment</p>
			</div>
			<div class="dark:border-dark-800 col-span-6 border-r border-dashed border-gray-200 p-4">
				<div class="flex gap-2">
					<img
						src="/assets/images/avatar/user-29.png"
						loading="lazy"
						alt=""
						class="size-10 shrink-0 rounded-md"
					/>
					<div class="grow overflow-hidden">
						<h6 class="truncate">Dr. Jennifer Maune</h6>
						<p class="dark:text-dark-500 text-gray-500">Cardiologist</p>
					</div>
				</div>
				<p class="dark:text-dark-500 mt-4 text-gray-500">1874 Treatment</p>
			</div>
			<div class="dark:border-dark-800 col-span-6 border-dashed border-gray-200 p-4">
				<div class="flex gap-2">
					<img
						src="/assets/images/avatar/user-30.png"
						loading="lazy"
						alt=""
						class="size-10 shrink-0 rounded-md"
					/>
					<div class="grow overflow-hidden">
						<h6 class="truncate">Dr. Antonio Ligler</h6>
						<p class="dark:text-dark-500 text-gray-500">Neurologists</p>
					</div>
				</div>
				<p class="dark:text-dark-500 mt-4 text-gray-500">1195 Treatment</p>
			</div>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card">
	<div class="card-header gap-space flex flex-wrap items-center justify-between">
		<h6 class="card-title grow">Patients List</h6>
		<div class="gap-space flex w-full flex-col md:w-auto md:flex-row md:items-center">
			{#if selectedItems.length > 0}
				<button class="btn btn-red btn-icon shrink-0" on:click={deleteSelectedItems}>
					<LucideIcon name="Trash" class="size-4" />
				</button>
			{/if}
			<div class="group/form relative w-full grow">
				<input
					type="text"
					bind:value={searchTerm}
					class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
					placeholder="Search for ..."
				/>
				<button
					title="search-button"
					class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
				>
					<LucideIcon name="Search" class="size-4" />
				</button>
			</div>
			<a href="/apps-hospital-patients-create" class="btn btn-primary shrink-0"
				><LucideIcon name="CirclePlus" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Add Patient</a
			>
		</div>
	</div>

	<CardBody class="">
		<div class="overflow-x-auto">
			<table class="table whitespace-nowrap">
				<thead>
					<tr class="">
						<th class="dark:text-dark-500 !font-medium text-gray-500">
							<div class="input-check-group">
								<label for="checkboxAll" class="input-check-label hidden"></label>
								<input
									id="checkboxAll"
									class="input-check input-check-primary"
									type="checkbox"
									bind:checked={allSelected}
									on:click={toggleAll}
								/>
							</div>
						</th>
						<th
							on:click={() => sort('patientName')}
							class="dark:text-dark-500 cursor-pointer !font-medium text-gray-500"
							>Patient Name
							{#if sortBy === 'patientName'}
								<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
							{/if}
						</th>
						<th
							on:click={() => sort('age')}
							class="dark:text-dark-500 cursor-pointer !font-medium text-gray-500"
							>Age
							{#if sortBy === 'age'}
								<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
							{/if}
						</th>
						<th
							on:click={() => sort('phone')}
							class="dark:text-dark-500 cursor-pointer !font-medium text-gray-500"
							>Phone
							{#if sortBy === 'phone'}
								<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
							{/if}
						</th>
						<th
							on:click={() => sort('email')}
							class="dark:text-dark-500 cursor-pointer !font-medium text-gray-500"
							>Email
							{#if sortBy === 'email'}
								<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
							{/if}
						</th>
						<th
							on:click={() => sort('condition')}
							class="dark:text-dark-500 cursor-pointer !font-medium text-gray-500"
							>Condition
							{#if sortBy === 'condition'}
								<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
							{/if}
						</th>
						<th
							on:click={() => sort('medications')}
							class="dark:text-dark-500 cursor-pointer !font-medium text-gray-500"
							>Medications
							{#if sortBy === 'medications'}
								<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
							{/if}
						</th>
						<th
							on:click={() => sort('lastVisit')}
							class="dark:text-dark-500 cursor-pointer !font-medium text-gray-500"
							>Last Visit
							{#if sortBy === 'lastVisit '}
								<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
							{/if}
						</th>
						<th class="dark:text-dark-500 cursor-pointer !font-medium text-gray-500">Action</th>
					</tr>
				</thead>
				<tbody>
					{#each displayedEmails.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as email, index}
						<tr>
							<td>
								<div class="input-check-group">
									<!-- svelte-ignore a11y-label-has-associated-control -->
									<label class="input-check-label hidden"></label>
									<input
										class="input-check input-check-primary"
										type="checkbox"
										checked={isSelected(email)}
										on:change={() => toggleItem(email)}
									/>
								</div>
							</td>
							<td>{email.patientName}</td>
							<td>{email.age}</td>
							<td>{email.phone}</td>
							<td>{email.email}</td>
							<td>{email.condition}</td>
							<td>{email.medications}</td>
							<td>{email.lastVisit}</td>
							<td class="w-16">
								<div class="flex gap-3">
									<a
										href="/apps-hospital-patients-lists"
										title="overview"
										class="link link-primary"
										aria-label="overview"><i class="ri-eye-line"></i></a
									>
									<a
										href="/apps-hospital-patients-lists"
										title="edit"
										class="link link-primary"
										aria-label="edit"><i class="ri-edit-2-line"></i></a
									>
									<a href="#!" class="link link-red" title="delete" aria-label="delete"
										><i class="ri-delete-bin-6-line"></i></a
									>
								</div>
							</td>
						</tr>
					{/each}
					{#if displayedEmails.length === 0}
						<tr>
							<td colspan="10" class="!p-8">
								<TableRowNotFound />
							</td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>

		{#if displayedEmails.length > 0}
			<div class="gap-space mt-3 grid grid-cols-12 items-center">
				<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
					<p class="dark:text-dark-500 text-gray-500 ltr:pr-1 rtl:pl-1">
						Showing <b>{showingStart()}</b> - <b>{showingEnd()}</b> of
						<b>{displayedEmails.length}</b> Results
					</p>
					{#if selectedItems.length > 0}
						<span>
							<b>{selectedItems.length}</b> Row Selected
						</span>
					{/if}
				</div>
				<div class="col-span-12 lg:col-span-6">
					<div class="pagination pagination-primary flex justify-center lg:justify-end">
						<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" /> Prev
						</button>
						{#each Array(totalPages()) as _, page (page)}
							<button
								on:click={() => gotoPage(page + 1)}
								class="pagination-item"
								class:active={currentPage === page + 1}
							>
								<span>{page + 1}</span>
							</button>
						{/each}
						<button
							on:click={nextPage}
							disabled={currentPage === totalPages()}
							class="pagination-next"
						>
							Next<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
						</button>
					</div>
				</div>
			</div>
		{/if}
	</CardBody>
</Col>
