<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { examListData, type Schedule } from './exam-list';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import ExamScheduleForm from './ExamScheduleForm.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
	// Data and state
	let schedules: Schedule[] = examListData;
	let displayedSchedules: Schedule[] = [];
	let currentPage = 1;
	let itemsPerPage = 10;
	let sortBy = '';
	let sortDirection: 'asc' | 'desc' = 'asc';
	let isOpen = true;
	let percent = 34;
	const radius = 16;
	const circumference = 2 * Math.PI * radius;
	let startID = 498;
	let examToDelete = writable(null);

	// Update schedule IDs
	schedules.forEach((schedule, index) => {
		schedule.scheduleID = 'PEE-' + (startID + index).toString();
	});

	// Sorting logic
	const sort = (column: keyof Schedule) => {
		if (sortBy === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = column;
			sortDirection = 'asc';
		}
		schedules.sort((a: any, b: any) => {
			const valA = a[column];
			const valB = b[column];
			if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
			if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
		updateDisplayedSchedules();
	};

	// Pagination methods
	const totalPages = () => Math.ceil(schedules.length / itemsPerPage);

	const gotoPage = (page: number) => {
		currentPage = page;
		updateDisplayedSchedules();
	};

	const prevPage = () => {
		if (currentPage > 1) {
			currentPage--;
			updateDisplayedSchedules();
		}
	};

	const nextPage = () => {
		if (currentPage < totalPages()) {
			currentPage++;
			updateDisplayedSchedules();
		}
	};

	// Update displayed schedules based on the current page
	const updateDisplayedSchedules = () => {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;

		displayedSchedules = schedules.slice(start, end);
	};

	function deleteExam(index: number) {
		schedules = schedules.filter((_, i) => i !== index);
		updateDisplayedSchedules();
		examToDelete.set(null);
	}

	const progress = () => {
		return circumference - (percent / 100) * circumference;
	};
	const countExamsByCategory = (type: string) => {
		return examListData.filter((exam) => exam.testType === type).length;
	};

	let categories = {
		total: 0,
		general: 0,
		formative: 0,
		summative: 0,
		online: 0,
		rejoining: 0
	};

	// Initialize component
	onMount(() => {
		categories.total = examListData.length;
		categories.general = countExamsByCategory('General');
		categories.formative = countExamsByCategory('Formative');
		categories.summative = countExamsByCategory('Summative');
		categories.online = countExamsByCategory('Online');
		categories.rejoining = countExamsByCategory('Rejoining');
		setTimeout(() => {
			percent = percent;
		}, 100);
		updateDisplayedSchedules();
	});

	// ---- table activity --------------
	let addForm = false;
	let editMode = false;
	let selectedCustomerDetails: any | null = null;
	function openAddForm() {
		addForm = true;
		editMode = false;
		selectedCustomerDetails = null;
	}

	function openEditForm(event: any) {
		addForm = false;
		editMode = true;
		selectedCustomerDetails = event;
	}
	function getDataForDelete(event: any) {
		console.log(event);
	}
	function deleteHandler() {
		console.log('deleted');
	}
</script>

{#if isOpen}
	<div class="alert alert-primary mb-space text-center font-medium ltr:pr-10 rtl:pl-10">
		<span>Today Test: 2 Test and online 1 Test</span>
		<a
			href="#!"
			on:click={() => (isOpen = false)}
			class="text-primary-400 hover:text-primary-500 absolute top-2 text-lg transition duration-200 ease-linear ltr:right-5 rtl:left-5"
			aria-label="clone"
		>
			<i class="ri-close-fill"></i>
		</a>
	</div>
{/if}

<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }} class="card row-span-2">
		<CardBody>
			<h6 class="mb-5">Total Exam (This month)</h6>
			<div class="relative mx-auto size-36" dir="ltr">
				<svg
					class="size-full"
					width="36"
					height="36"
					viewBox="0 0 36 36"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						cx="18"
						cy="18"
						r="16"
						fill="none"
						class="stroke-current text-sky-500/10"
						stroke-width="3"
					>
					</circle>
					<g class="origin-center -rotate-90 transform">
						<circle
							cx="18"
							cy="18"
							r="16"
							fill="none"
							class="stroke-current text-sky-500"
							stroke-width="3"
							stroke-dasharray="100"
							stroke-dashoffset={progress()}
							style="transition: stroke-dashoffset 1s ease-out;"
						></circle>
					</g>
				</svg>
				<!-- Percentage Text -->
				<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
					<span class="dark:text-dark-50 text-center text-lg font-bold text-gray-800"
						>{percent}%</span
					>
				</div>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }} class="card relative">
		<CardBody>
			<LucideIcon
				name="BookOpenText"
				class="text-primary-500 fill-primary-500/10 absolute top-5 size-6 ltr:right-5 rtl:left-5"
			/>
			<p class="dark:text-dark-500 mb-3 text-gray-500">Total Test</p>
			<h5><span>{categories.total}</span></h5>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }} class="card relative">
		<CardBody>
			<LucideIcon
				name="LibraryBig"
				class="absolute top-5 size-6 fill-purple-500/10 text-purple-500 ltr:right-5 rtl:left-5"
			/>
			<p class="dark:text-dark-500 mb-3 text-gray-500">General Test</p>
			<h5><span>{categories.general}</span></h5>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }} class="card relative">
		<CardBody>
			<LucideIcon
				name="NotepadTextDashed"
				class="absolute top-5 size-6 fill-sky-500/10 text-sky-500 ltr:right-5 rtl:left-5"
			/>
			<p class="dark:text-dark-500 mb-3 text-gray-500">Formative Test</p>
			<h5><span>{categories.formative}</span></h5>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }} class="card relative">
		<CardBody>
			<LucideIcon
				name="NotebookText"
				class="absolute top-5 size-6 fill-green-500/10 text-green-500 ltr:right-5 rtl:left-5"
			/>
			<p class="dark:text-dark-500 mb-3 text-gray-500">Summative Test</p>
			<h5><span>{categories.summative}</span></h5>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }} class="card relative">
		<CardBody>
			<LucideIcon
				name="Video"
				class="absolute top-5 size-6 fill-red-500/10 text-red-500 ltr:right-5 rtl:left-5"
			/>
			<p class="dark:text-dark-500 mb-3 text-gray-500">Online Test (MCQ)</p>
			<h5><span>{categories.online}</span></h5>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }} class="card relative">
		<CardBody>
			<LucideIcon
				name="Blend"
				class="absolute top-5 size-6 fill-yellow-500/10 text-yellow-500 ltr:right-5 rtl:left-5"
			/>
			<p class="dark:text-dark-500 mb-3 text-gray-500">Rejoining Test</p>
			<h5><span>{categories.rejoining}</span></h5>
		</CardBody>
	</Col>
</Grid>

<Card>
	<div class="card-header items-center justify-between gap-5 md:flex">
		<h6 class="card-title">Exam Schedule List</h6>
		<!--end col-->
		<div class="mt-3 flex flex-wrap gap-2 md:mt-0">
			<div>
				<div id="stdFilterSelect" placeholder="Select STD"></div>
			</div>
			<!--end col-->
			<div>
				<div id="dateFilterSelect" placeholder="Select Filters"></div>
			</div>
			<!--end col-->
			<div>
				<ModalTrigger
					modalId="add-exam-modal"
					icon="CirclePlus"
					text="Add Exam Schedule"
					class="btn"
					onClick={() => openAddForm()}
				/>
			</div>
			<!--end col-->
		</div>
	</div>

	<CardBody class="pt-0">
		<div>
			<div class="table-box overflow-x-auto whitespace-nowrap">
				<table class="flush table">
					<thead>
						<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
							<th class="cursor-pointer !font-medium" on:click={() => sort('scheduleID')}
								>ID
								{#if sortBy === 'scheduleID'}
									<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
								{/if}
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('testName')}
								>Test Name
								{#if sortBy === 'testName'}
									<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
								{/if}
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('testCategory')}
								>Test Category
								{#if sortBy === 'testCategory'}
									<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
								{/if}
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('testType')}
								>Test Type
								{#if sortBy === 'testType'}
									<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
								{/if}
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('class')}
								>Class
								{#if sortBy === 'class'}
									<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
								{/if}
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('startDate')}
								>Start Date
								{#if sortBy === 'startDate'}
									<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
								{/if}
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('endDate')}
								>End Date
								{#if sortBy === 'endDate'}
									<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
								{/if}
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('status')}
								>Status
								{#if sortBy === 'status'}
									<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
								{/if}
							</th>
							<th class="!font-medium">Action</th>
						</tr>
					</thead>
					<tbody>
						{#each displayedSchedules as schedule, index (schedule.scheduleID)}
							<tr class="*:px-3 *:py-2.5">
								<td>{schedule.scheduleID}</td>
								<td>{schedule.testName}</td>
								<td>{schedule.testCategory}</td>
								<td>{schedule.testType}</td>
								<td>{schedule.class}</td>
								<td>{schedule.startDate}</td>
								<td>{schedule.endDate}</td>
								<td>
									<span
										class={schedule.status === 'New'
											? 'badge badge-sky'
											: schedule.status === 'Scheduled'
												? 'badge badge-yellow'
												: 'badge badge-green'}
									>
										{schedule.status}
									</span>
								</td>
								<td>
									<div class="flex items-center gap-2">
										<ModalTrigger
											modalId="add-exam-modal"
											color=""
											icon="Pencil"
											class="btn-sub-gray btn-icon !size-8 place-items-center rounded-md"
											iconCss="!size-3"
											onClick={() => openEditForm(schedule)}
										/>
										<ModalTrigger
											modalId="delete-file-modal"
											icon="Trash2"
											color=""
											iconCss="!size-3.5"
											class=" btn-sub-red btn-icon !size-8 place-items-center rounded-md"
										></ModalTrigger>
									</div>
								</td>
							</tr>
						{/each}
						{#if displayedSchedules.length === 0}
							<tr>
								<td colspan="9" class="!p-8">
									<TableRowNotFound />
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>

			{#if displayedSchedules.length > 0}
				<div class="mt-5 grid grid-cols-12 items-center gap-5">
					<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
						<p class="dark:text-dark-500 text-gray-500">
							Showing <b>{(currentPage - 1) * itemsPerPage + 1}</b> -
							<b>{Math.min(currentPage * itemsPerPage, schedules.length)}</b>
							of <b>{schedules.length}</b> Results
						</p>
					</div>
					<div class="col-span-12 md:col-span-6">
						<div class="pagination pagination-primary flex justify-center md:justify-end">
							<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
								<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
								<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
								Prev
							</button>

							<!-- Loop through the total pages and display buttons -->
							{#each Array(totalPages()) as _, index (index)}
								<button
									on:click={() => gotoPage(index + 1)}
									class="pagination-item"
									class:active={currentPage === index + 1}
								>
									<span>{index + 1}</span>
								</button>
							{/each}

							<button
								on:click={nextPage}
								disabled={currentPage === totalPages()}
								class="pagination-next"
							>
								Next
								<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
								<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
							</button>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</CardBody>
</Card>

<Modal modalId="add-exam-modal" let:modalId size=" ">
	<ModalHeader {modalId}>
		<h6>{addForm ? 'Add Exam' : 'Update Exam Schedule'}</h6>
	</ModalHeader>
	<ModalBody>
		<ExamScheduleForm
			{addForm}
			{editMode}
			selectedCustomer={selectedCustomerDetails}
			{updateDisplayedSchedules}
			{currentPage}
		/>
	</ModalBody>
</Modal>

<DeleteComponent />
