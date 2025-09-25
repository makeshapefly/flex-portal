<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { eventGridData } from './event-grid'; // Import the event data from your data.ts
	import EventGridDetailsForm from './EventGridDetailsForm.svelte';

	let displayedEvents = [...eventGridData]; // Initial displayed events are the full event data
	let currentPage = 1;
	let eventsPerPage = 6;
	let totalPages = Math.ceil(displayedEvents.length / eventsPerPage);
	let showingStart = 1;
	let showingEnd = eventsPerPage;
	let showAddEventForm = true;
	let sortBy = '';
	let sortDirection = 'asc';
	let selectedEvent: any = null;
	let totalTickets = 0;
	let pricePerTicket = 500.0;
	let totalAmount: any = 0;

	function calculatePrice() {
		totalAmount = (totalTickets * pricePerTicket).toFixed(2);
	}

	// Function to close the modal
	function closeModal() {
		selectedEvent = null;
	}

	function sort(column: string) {
		if (column === sortBy) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortDirection = 'asc';
			sortBy = column;
		}

		displayedEvents = [...displayedEvents].sort((a: any, b: any) => {
			const valueA = a[column];
			const valueB = b[column];
			let comparison = 0;

			// Compare values
			if (valueA > valueB) {
				comparison = 1;
			} else if (valueA < valueB) {
				comparison = -1;
			}

			return sortDirection === 'desc' ? comparison * -1 : comparison;
		});
		updatePagination();
	}

	// Function to update pagination
	function updatePagination() {
		totalPages = Math.ceil(displayedEvents.length / eventsPerPage);
		showingStart = (currentPage - 1) * eventsPerPage + 1;
		showingEnd = Math.min(currentPage * eventsPerPage, displayedEvents.length);
	}

	// Pagination helpers
	function prevPage() {
		if (currentPage > 1) {
			currentPage -= 1;
			updatePagination();
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage += 1;
			updatePagination();
		}
	}

	function gotoPage(page: number) {
		currentPage = page;
		updatePagination();
	}

	// Format date for display
	function formatDateTime(dateStr: string, timeStr: string) {
		if (!dateStr || !timeStr) return '';

		const dateTimeStr = `${dateStr}T${timeStr}`;
		const date = new Date(dateTimeStr);
		//@ts-ignore
		if (isNaN(date)) return 'Invalid date or time';
		const options: any = {
			weekday: 'short',
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		};
		return date.toLocaleDateString('en-GB', options);
	}

	function getWeekday(dateStr: string) {
		if (!dateStr) return '';
		const date = new Date(dateStr);
		const options: any = { weekday: 'short' };
		return date.toLocaleDateString('en-GB', options);
	}

	function formatDate(dateStr: string) {
		if (!dateStr) return '';
		const date = new Date(dateStr);
		const options: any = { day: '2-digit', month: 'short', year: 'numeric' };
		return date.toLocaleDateString('en-GB', options);
	}

	function deleteEvent(index: number) {
		displayedEvents = [...displayedEvents.slice(0, index), ...displayedEvents.slice(index + 1)];
		updatePagination();
	}

	// Call updatePagination initially to set showingStart, showingEnd, and totalPages
	updatePagination();

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

	function bookTicket(ticket: any) {
		console.log(ticket);
		selectedCustomerDetails = ticket;
	}
</script>

<div class="flex flex-wrap items-center gap-5">
	<h6 class="grow">Event Listings (<span>{displayedEvents.length}</span>)</h6>
	<div class="flex shrink-0 items-center gap-2">
		<div>
			<Dropdown class="dropdown shrink-0">
				<DropdownButton class="btn btn-sub-gray btn-icon btn-icon-text">
					<LucideIcon name="SlidersHorizontal" class="size-4" />
				</DropdownButton>
				<DropdownMenu class="dropdown-menu !fixed !w-64 p-2">
					<a href="#!" class="dropdown-item" on:click={() => sort('')}> No Sorting </a>
					<a href="#!" class="dropdown-item" on:click={() => sort('name')}>
						Alphabetical (A -> Z)
					</a>
					<a href="#!" class="dropdown-item" on:click={() => sort('name')}>
						Reverse Alphabetical (Z -> A)
					</a>
					<a href="#!" class="dropdown-item" on:click={() => sort('status')}> Status </a>
				</DropdownMenu>
			</Dropdown>
		</div>
		<ModalTrigger
			modalId="add-event-modal"
			icon="Plus"
			color="primary"
			text="Add New Event"
			class="btn !gap-0"
			onClick={() => openAddForm()}
		/>
	</div>
</div>

<div class="gap-x-space mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
	{#each displayedEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage) as event, index}
		<Card>
			<CardBody>
				<div class="flex items-center gap-3">
					<img src={event.image} alt="" class="size-12 shrink-0 rounded-full" />
					<div class="grow">
						<h6 class="mb-1">
							<a href="#!">{event.username}</a>
						</h6>
						<p class="dark:text-dark-500 text-sm text-gray-500">
							{formatDateTime(event.date, event.time)}
						</p>
					</div>
					<Dropdown class="dropdown shrink-0">
						<DropdownButton
							type="button"
							title="dropdown-button"
							class="dark:text-dark-500 flex items-center text-gray-500"
						>
							<i class="ri-more-fill"></i>
						</DropdownButton>
						<DropdownMenu class="dropdown-menu !fixed hidden p-2">
							<a
								href="/apps-projects-overview"
								data-modal-target="contactOverviewModal"
								class="dropdown-item"
							>
								<i class="ri-eye-line align-middle ltr:mr-2 rtl:ml-2"></i>
								<span>Overview</span>
							</a>
							<ModalTrigger
								modalId="add-event-modal"
								color=""
								icon="Pencil"
								class="dropdown-item justify-start"
								text="Edit"
								onClick={() => openEditForm(event)}
							/>
							<ModalTrigger
								modalId="delete-file-modal"
								color=""
								icon="Trash2"
								class="dropdown-item justify-start"
								text="Delete"
								onClick={() => getDataForDelete(event)}
							/>
						</DropdownMenu>
					</Dropdown>
				</div>
				<div class="mt-5">
					<img src={event.mainImage} alt="" class="h-48 w-full rounded-md object-cover" />
				</div>
				<div class="mt-5 flex gap-3">
					<div>
						<div
							class="mx-auto mb-2.5 flex size-16 flex-col items-center justify-center rounded-md border border-red-500/20 bg-red-500/20 text-red-500"
						>
							<p class="mb-0.5">{getWeekday(event.date)}</p>
							<h3 class="leading-none">{new Date(event.date).getDate()}</h3>
						</div>

						<ModalTrigger
							modalId="book-ticket"
							color="primary"
							text="Book"
							class="btn"
							onClick={() => bookTicket(event)}
						/>
					</div>
					<div>
						<h6 class="mb-1">
							<a href="#!" class="link link-primary !text-current">{event.name}</a>
						</h6>
						<p class="dark:text-dark-500 mb-2 text-gray-500">
							<span>{formatDate(event.date)}</span>
							<span
								class="dark:border-dark-800 border-gray-200 ltr:ml-1.5 ltr:border-l ltr:pl-2 rtl:mr-1.5 rtl:border-r rtl:pr-2"
								>{event.location}</span
							>
						</p>
						<p class="dark:text-dark-500 mb-1 text-gray-500">Contributors</p>
						<div class="mx-3 flex grow -space-x-3 rtl:space-x-reverse">
							{#each event.contributors as contributor}
								<a
									href="#!"
									class="transition duration-300 ease-linear hover:z-10"
									title="avatar link"
								>
									<img
										class="dark:border-dark-900 size-8 rounded-full border-2 border-white"
										src={contributor.image}
										alt=""
									/>
								</a>
							{/each}
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	{/each}
</div>

<Grid cols={12} gap={5} class="mb-5 items-center gap-5">
	<Col cols={{ span: 12 }} md={{ span: 6 }} class="flex flex-wrap justify-center md:justify-start">
		<p class="dark:text-dark-500 text-gray-500">
			Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{displayedEvents.length}</b> Results
		</p>
	</Col>
	<Col cols={{ span: 12 }} md={{ span: 6 }}>
		<div class="pagination pagination-primary flex justify-center md:justify-end">
			<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
				<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
				<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
				Prev
			</button>
			{#each Array(totalPages) as _, page (page)}
				<button
					on:click={() => gotoPage(page + 1)}
					class="pagination-item {currentPage === page + 1 ? 'active' : ''}"
				>
					<span>{page + 1}</span>
				</button>
			{/each}
			<button on:click={nextPage} disabled={currentPage === totalPages} class="pagination-next">
				Next
				<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
				<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
			</button>
		</div>
	</Col>
</Grid>

<!-- Ticket Book Module -->
{#if selectedCustomerDetails}
	<Modal modalId="book-ticket" let:modalId>
		<ModalHeader {modalId}>
			<h6>{selectedCustomerDetails.name}</h6>
		</ModalHeader>
		<ModalBody>
			<div class="mb-4 flex items-center gap-3">
				<img
					src={selectedCustomerDetails.image}
					alt={selectedCustomerDetails.username}
					class="size-12 shrink-0 rounded-full"
				/>
				<div class="grow">
					<h6 class="mb-1">{selectedCustomerDetails.username}</h6>
					<p class="text-sm text-gray-500">
						{selectedCustomerDetails.date}
						{selectedCustomerDetails.time}
					</p>
				</div>
			</div>

			<div class="mt-5">
				<img
					src={selectedCustomerDetails.mainImage}
					alt={selectedCustomerDetails.name}
					class="h-48 w-full rounded-md object-cover"
				/>
			</div>

			<div class="mt-5 flex gap-3">
				<div>
					<div
						class="mx-auto flex size-16 flex-col items-center justify-center rounded-md border border-red-500/20 bg-red-500/15 text-red-500"
					>
						<p class="mb-0.5">
							{new Date(selectedCustomerDetails.date).toLocaleString('en-GB', {
								weekday: 'short'
							})}
						</p>
						<h3 class="leading-none">{new Date(selectedCustomerDetails.date).getDate()}</h3>
					</div>
				</div>
				<div>
					<h6 class="mb-1">{selectedCustomerDetails.name}</h6>
					<p class="dark:text-dark-500 mb-2 text-gray-500">
						<span>{selectedCustomerDetails.date}</span>
						<span
							class="dark:border-dark-800 border-gray-200 ltr:ml-1.5 ltr:border-l ltr:pl-2 rtl:mr-1.5 rtl:border-r rtl:pr-2"
						>
							{selectedCustomerDetails.location}
						</span>
					</p>
					<p class="dark:text-dark-500 mb-1 text-gray-500">Contributors</p>
					<div class="flex grow -space-x-3 rtl:space-x-reverse">
						{#each selectedCustomerDetails.contributors as contributor}
							<a href="#!" class="transition duration-300 ease-linear">
								<img
									class="size-8 rounded-full border-2 border-white"
									src={contributor.image}
									alt={contributor.name}
								/>
							</a>
						{/each}
					</div>
				</div>
			</div>

			<!-- Ticket Booking Form -->
			<form>
				<div class="grid grid-cols-12 gap-5">
					<div class="col-span-12">
						<label for="fullNameInput" class="form-label">Full Name</label>
						<input
							type="text"
							id="fullNameInput"
							class="form-input"
							placeholder="Enter full name"
						/>
					</div>
					<div class="col-span-6">
						<label for="totalTicketInput" class="form-label">Total Tickets</label>
						<input
							type="number"
							id="totalTicketInput"
							class="form-input"
							placeholder="0"
							bind:value={totalTickets}
							on:input={calculatePrice}
						/>
					</div>
					<div class="col-span-6">
						<label for="pricePerTicketInput" class="form-label">Price per Ticket</label>
						<input
							type="number"
							id="pricePerTicketInput"
							class="form-input"
							placeholder="$0.00"
							value={pricePerTicket}
							disabled
						/>
					</div>
					<div class="col-span-6">
						<label for="totalAmountInput" class="form-label">Total Amount</label>
						<input
							type="text"
							id="totalAmountInput"
							class="form-input"
							value={totalAmount}
							disabled
						/>
					</div>
					<div class="col-span-12 text-right">
						<button type="button" class="btn btn-primary" on:click={closeModal}>Book Now</button>
					</div>
				</div>
			</form>
		</ModalBody>
	</Modal>
{/if}

<!-- Event form module -->
<Modal modalId="add-event-modal" let:modalId>
	<ModalHeader {modalId}>
		<h6>{!editMode ? 'Add New Event' : 'Edit Event'}</h6>
	</ModalHeader>
	<ModalBody>
		<EventGridDetailsForm
			{modalId}
			{addForm}
			{editMode}
			selectedCustomer={selectedCustomerDetails}
		/>
	</ModalBody>
</Modal>

<!-- Delete Module -->
<DeleteComponent />
