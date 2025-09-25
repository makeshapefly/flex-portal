<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { writable } from 'svelte/store';
	import { holidayData } from './holidays';
	import { formatDate } from '$lib/components/ui/timeline/timeline';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
	import StaffHolidayForm from './StaffHolidayForm.svelte';

	let holidays = holidayData;
	let displayedHolidays = writable(holidayData); // Use writable store for reactivity
	let currentPage = 1;
	let perPage = 10;
	let sortBy: string = '';
	let sortDirection: 'asc' | 'desc' = 'asc';
	let holidayToDelete = writable(null);

	// Pagination variables
	let showingStart = 1;
	let showingEnd = perPage;
	let totalPages = Math.ceil(holidays.length / perPage);

	// Sorting function
	function sort(field: string) {
		if (sortBy === field) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = field;
			sortDirection = 'asc';
		}

		displayedHolidays.set(
			[...holidays].sort((a: any, b: any) => {
				if (sortDirection === 'asc') {
					return a[field] > b[field] ? 1 : -1;
				} else {
					return a[field] < b[field] ? 1 : -1;
				}
			})
		);
	}

	// Delete holiday function
	function deleteHoliday(index: number) {
		holidays = holidays.filter((_, i) => i !== index); // Remove holiday by index
		updatePagination();
		holidayToDelete.set(null); // Close the modal after deleting
	}

	// Pagination functions
	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
			updatePagination();
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
			updatePagination();
		}
	}

	function gotoPage(page: number) {
		currentPage = page;
		updatePagination();
	}

	function updatePagination() {
		showingStart = (currentPage - 1) * perPage + 1;
		showingEnd = Math.min(currentPage * perPage, holidays.length);
		totalPages = Math.ceil(holidays.length / perPage);
	}

	// Holiday Form and Validation
	let holidayForm: any = {
		name: '',
		date: '',
		day: ''
	};

	// ---- table activity --------------
	let addForm = false;
	let editMode = false;
	let selectedCustomerDetails: any | null = null;
	function openAddForm() {
		addForm = true;
		editMode = false;
		holidayForm = null;
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

<Col cols={{ span: 12 }} xl={{ span: 4 }} class="2xl:col-span-3">
	<Card class="dark:bg-dark-850 bg-gray-100">
		<CardBody class="card-body">
			<div class="mx-5 mb-4">
				<img src="/assets/images/hospital/img-01.png" alt="" />
			</div>
			<div class="space-y-4">
				<div
					class="before:bg-primary-500 relative pl-5 before:absolute before:left-0 before:top-1.5 before:size-2 before:rounded-full"
				>
					<p class="badge badge-gray mb-2">Today - 21 Jan, 2024</p>
					<h6>World Religion Day</h6>
				</div>
				<div
					class="relative pl-5 before:absolute before:left-0 before:top-1.5 before:size-2 before:rounded-full before:bg-yellow-500"
				>
					<p class="badge badge-gray mb-2">Upcoming - 04 Feb, 2024</p>
					<h6>World Cancer Day</h6>
				</div>
				<div
					class="relative pl-5 before:absolute before:left-0 before:top-1.5 before:size-2 before:rounded-full before:bg-red-500"
				>
					<p class="badge badge-gray mb-2">Upcoming - 25 May, 2024</p>
					<h6>African Liberation Day</h6>
				</div>
				<div
					class="relative pl-5 before:absolute before:left-0 before:top-1.5 before:size-2 before:rounded-full before:bg-red-500"
				>
					<p class="badge badge-gray mb-2">Upcoming - 29 Sep, 2024</p>
					<h6>World Heart Day</h6>
				</div>
			</div>
		</CardBody>
	</Card>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 8 }} class="card 2xl:col-span-9">
	<CardHeader class="card-header flex items-center gap-3">
		<h6 class="card-title grow">Holiday</h6>
		<ModalTrigger
			modalId="add-holidays"
			icon="CirclePlus"
			text="Add Holiday"
			class="btn"
			onClick={() => openAddForm()}
		/>
	</CardHeader>
	<CardBody class="pt-0">
		<div>
			<div class="table-box whitespace-nowrap">
				<table class="flush table">
					<tbody>
						<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
							<th class="cursor-pointer !font-medium" on:click={() => sort('name')}>
								Holiday Name <span
									>{sortBy === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('date')}>
								Date <span>{sortBy === 'date' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('day')}>
								Day <span>{sortBy === 'day' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
							</th>
							<th class="!font-medium">Action</th>
						</tr>
						{#each $displayedHolidays.slice((currentPage - 1) * perPage, currentPage * perPage) as holiday, index}
							<tr class="*:px-3 *:py-2.5">
								<td>{holiday.name}</td>
								<td>{formatDate(holiday.date)}</td>
								<td>{holiday.day}</td>
								<td>
									<div class="flex items-center gap-2">
										<ModalTrigger
											modalId="add-holidays"
											color=""
											icon="Pencil"
											class="btn-sub-gray btn-icon !size-8 place-items-center rounded-md"
											iconCss="!size-3"
											onClick={() => openEditForm(holiday)}
										/>
										<ModalTrigger
											modalId="delete-file-modal"
											icon="Trash2"
											color=""
											iconCss="!size-3.5"
											class="btn btn-sub-red btn-icon !size-8 rounded-md"
										></ModalTrigger>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="mt-5 grid grid-cols-12 items-center gap-5">
				<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
					<p class="dark:text-dark-500 text-gray-500">
						Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{holidays.length}</b> Results
					</p>
				</div>
				<div class="col-span-12 md:col-span-6">
					<div class="pagination pagination-primary flex justify-center md:justify-end">
						<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
							Prev
						</button>
						{#each Array(totalPages)
							.fill(0)
							.map((_, i) => i + 1) as page}
							<button
								on:click={() => gotoPage(page)}
								class="pagination-item"
								class:active={currentPage === page}
							>
								{page}
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

<Modal modalId="add-holidays" let:modalId>
	<ModalHeader {modalId}>
		<h6>Add Holiday</h6>
	</ModalHeader>
	<ModalBody>
		<StaffHolidayForm {addForm} {editMode} selectedCustomer={selectedCustomerDetails} />
	</ModalBody>
</Modal>

<DeleteComponent />
