<script lang="ts">
	import { onMount } from 'svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import { eventsListData } from './event-list';
	import EventDetailsForm from './EventDetailsForm.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';

	let events = eventsListData;
	let filterEvents = [...events];
	let sortBy = '';
	let sortDirection = 'asc';
	let currentPage = 1;
	let eventsPerPage = 10;
	let totalPages = Math.ceil(filterEvents.length / eventsPerPage);
	let showingStart = 1;
	let showingEnd = eventsPerPage;
	let showAddEventForm = true;

	// Function to format the date
	function formatDate(dateStr: string | number | Date) {
		const date = new Date(dateStr);
		const options: any = { day: '2-digit', month: 'short', year: 'numeric' };
		return date.toLocaleDateString('en-GB', options);
	}

	// Sorting function
	function sort(field: string) {
		sortDirection = sortBy === field && sortDirection === 'asc' ? 'desc' : 'asc';
		sortBy = field;
		filterEvents = [...events].sort((a: any, b: any) => {
			if (a[field] < b[field]) return sortDirection === 'asc' ? -1 : 1;
			if (a[field] > b[field]) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
		updatePagination();
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

	function updatePagination() {
		totalPages = Math.ceil(filterEvents.length / eventsPerPage);
		showingStart = (currentPage - 1) * eventsPerPage + 1;
		showingEnd = Math.min(currentPage * eventsPerPage, filterEvents.length);
	}

	onMount(() => {
		updatePagination();
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

<div class="flex flex-wrap items-center gap-5">
	<h6 class="grow">Event Listings (<span>{eventsListData.length}</span>)</h6>
	<div class="flex shrink-0 flex-wrap items-center gap-2">
		<Dropdown class="dropdown shrink-0" alignTo="left-top">
			<DropdownButton class="btn btn-sub-gray btn-icon btn-icon-text">
				<LucideIcon name="SlidersHorizontal" class="size-4" />
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed !w-64 p-2">
				<a href="#!" class="dropdown-item" on:click={() => sort('')}> No Sorting </a>
				<a href="#!" class="dropdown-item" on:click={() => sort('eventName')}>
					Alphabetical (A -> Z)
				</a>
				<a href="#!" class="dropdown-item" on:click={() => sort('eventName')}>
					Reverse Alphabetical (Z -> A)
				</a>
				<a href="#!" class="dropdown-item" on:click={() => sort('status')}> Status </a>
			</DropdownMenu>
		</Dropdown>
		<ModalTrigger
			modalId="add-event-modal"
			icon="Plus"
			color="primary"
			text="Add New Event"
			class="btn !gap-1"
			onClick={() => openAddForm()}
		/>
	</div>
</div>

<div class="mt-5 overflow-x-auto">
	<table class="table whitespace-nowrap">
		<tbody>
			<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
				<th on:click={() => sort('eventName')} class="cursor-pointer !font-medium"
					>Event Name <span
						>{sortBy === 'eventName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
					></th
				>
				<th on:click={() => sort('eventDate')} class="cursor-pointer !font-medium"
					>Event Date <span
						>{sortBy === 'eventDate' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
					></th
				>
				<th on:click={() => sort('peopleSize')} class="cursor-pointer !font-medium"
					>People Size <span
						>{sortBy === 'peopleSize' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
					></th
				>
				<th on:click={() => sort('location')} class="cursor-pointer !font-medium"
					>Location <span>{sortBy === 'location' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
					></th
				>
				<th on:click={() => sort('eventType')} class="cursor-pointer !font-medium"
					>Event Type <span
						>{sortBy === 'eventType' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
					></th
				>
				<th on:click={() => sort('price')} class="cursor-pointer !font-medium"
					>Price <span>{sortBy === 'price' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span></th
				>
				<th on:click={() => sort('status')} class="cursor-pointer !font-medium"
					>Status <span>{sortBy === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
					></th
				>
				<th class="!font-medium">Action</th>
			</tr>

			{#each filterEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage) as event (event.eventName)}
				<tr>
					<td>
						<div class="flex items-center gap-2">
							<div
								class="dark:border-dark-800 flex size-9 items-center justify-center rounded border border-gray-200 p-1"
							>
								<img src={event.image} alt="" class="rounded" />
							</div>
							<h6><a href="/apps-ecommerce-event-overview">{event.eventName}</a></h6>
						</div>
					</td>
					<td>{formatDate(event.eventDate)}</td>
					<td>{event.peopleSize}</td>
					<td>{event.location}</td>
					<td>{event.eventType}</td>
					<td>${event.price}</td>
					<td>
						<span
							class={event.status === 'Published'
								? 'badge badge-green'
								: event.status === 'Expired'
									? 'badge badge-red'
									: 'badge badge-yellow'}
						>
							{event.status}
						</span>
					</td>
					<td>
						<Dropdown class="dropdown" alignTo="right-bottom">
							<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
								<i class="ri-more-2-fill"></i>
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
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	{#if filterEvents.length === 0}
		<div class="p-4 text-center">No Events Available.</div>
	{/if}
</div>

<Grid cols={12} gap={5} class="my-5 items-center gap-5">
	<Col cols={{ span: 12 }} md={{ span: 6 }}>
		<p class="dark:text-dark-500 text-gray-500">
			Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{filterEvents.length}</b> Results
		</p>
	</Col>
	<Col cols={{ span: 12 }} md={{ span: 6 }}>
		<div class="pagination pagination-primary flex justify-center md:justify-end">
			<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
				<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
				<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
				Prev
			</button>
			{#each Array(totalPages) as _, index}
				<button
					on:click={() => gotoPage(index + 1)}
					class="pagination-item"
					class:active={currentPage === index + 1}
				>
					{index + 1}
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

<Modal modalId="add-event-modal" let:modalId>
	<ModalHeader {modalId}>
		<h6>{showAddEventForm ? 'Add New Event' : 'Edit Event'}</h6>
	</ModalHeader>
	<ModalBody>
		<EventDetailsForm
			{filterEvents}
			{modalId}
			{addForm}
			{editMode}
			selectedCustomer={selectedCustomerDetails}
		/>
	</ModalBody>
</Modal>

<DeleteComponent />
