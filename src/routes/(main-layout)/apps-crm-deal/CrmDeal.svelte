<script lang="ts">
	import { onMount } from 'svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalClose from '$lib/components/ui/modal/ModalClose.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { dealsData } from './deal-crm';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import { closeModal } from '$lib/stores/modal';

	let isCardView = false; // Toggle between card and list view
	let currentPage = 1;
	const itemsPerPage = 8;
	let searchQuery = '';
	let localDealsData = [...dealsData];
	let displayedDeals: string | any[] = [];
	let sortBy = '';
	let sortDirection = 'asc';
	let isCalling = false;
	let callDuration = 0;
	let isMuted = false;
	let timeoutId; // Store the timeout ID
	let intervalId: number | undefined; // Store the interval ID

	let newMessage = '';

	const totalPages = Math.ceil(localDealsData.length / itemsPerPage);

	// Function to get the filtered and paginated deals
	function getPagedDeals() {
		const filteredDeals = localDealsData.filter((deal) => {
			return (
				deal.projectName.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter by project name
				deal.company.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by company
			);
		});

		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		// const totalPages = Math.ceil(localDealsData.length / itemsPerPage);
		displayedDeals = filteredDeals.slice(start, end);
	}

	// Function to go to the previous page
	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
			getPagedDeals();
		}
	}

	// Function to go to the next page
	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
			getPagedDeals();
		}
	}

	// Function to go to a specific page
	function gotoPage(page: number) {
		currentPage = page;
		getPagedDeals();
	}

	// Function to sort deals based on column and direction
	function sort(column: string) {
		if (column === sortBy) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortDirection = 'asc';
			sortBy = column;
		}

		localDealsData.sort((a: any, b: any) => {
			const valueA = a[column];
			const valueB = b[column];
			let comparison = 0;
			if (valueA > valueB) {
				comparison = 1;
			} else if (valueA < valueB) {
				comparison = -1;
			}
			return sortDirection === 'desc' ? comparison * -1 : comparison;
		});

		getPagedDeals(); // Reapply pagination after sorting
	}

	// Variables to show the range of items being displayed
	$: showingStart = (currentPage - 1) * itemsPerPage + 1;
	$: showingEnd = Math.min(currentPage * itemsPerPage, localDealsData.length);

	// Formatting date
	const formatDate = (date: string | number | Date) => {
		const d = new Date(date);
		const fullDate = d.toLocaleDateString('default', {
			day: '2-digit',
			year: 'numeric',
			month: 'short'
		});
		const [month, day, year] = fullDate.replace(',', '').split(' ');
		return `${day} ${month} ${year}`;
	};

	function getDaysLeft(endDate: string | number | Date) {
		const currentDate: any = new Date();
		const targetDate: any = new Date(endDate);
		const difference = targetDate - currentDate;
		const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
		return daysLeft >= 0 ? daysLeft : 'Expired';
	}

	function startCall() {
		resetCall(); // Reset any previous state
		isCalling = true; // Start the call
		timeoutId = setTimeout(() => {
			if (isCalling) {
				isCalling = false; // End the call after 4 seconds
				startTimer(); // Start the timer
			}
		}, 4000);
	}

	// Function to reset call and duration state
	function resetCall() {
		isCalling = false;
		callDuration = 0;
		if (intervalId) {
			clearInterval(intervalId); // Clear any existing interval
		}
	}

	// Function to start the timer
	function startTimer() {
		//@ts-ignore
		intervalId = setInterval(() => {
			callDuration++; // Increment call duration every second
		}, 1000);
	}

	// Function to format the duration into minutes and seconds
	function formatDuration(seconds: number) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	function toggleMute() {
		isMuted = !isMuted;
	}

	// Delete deal function
	function deleteDeal(dealName: any) {
		localDealsData = localDealsData.filter(
			(deal: { projectName: any }) => deal.projectName !== dealName
		);
		getPagedDeals();
	}

	onMount(() => {
		getPagedDeals();
	});

	// -----------------------
	let selectedData: any = {};
	function messageComponent(data: any) {
		selectedData = data;
	}
	function callingTo(data: any) {
		selectedData = data;
		startCall();
	}
</script>

<div class="mb-5 flex flex-wrap justify-between gap-5">
	<div>
		<div class="group/form relative">
			<input
				type="email"
				bind:value={searchQuery}
				on:input={getPagedDeals}
				class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
				placeholder="Search for ..."
			/>
			<div
				class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
			>
				<LucideIcon name="Search" class="size-4" />
			</div>
		</div>
	</div>

	<div class="flex flex-wrap gap-2">
		<button
			class="btn btn-icon btn-icon-text {isCardView ? 'btn-primary' : 'btn-sub-gray'}"
			on:click={() => (isCardView = true)}
			title="card"
		>
			<LucideIcon name="GalleryVerticalEnd" class="size-5" />
		</button>

		<!-- List View Button -->
		<button
			class="btn btn-icon btn-icon-text {!isCardView ? 'btn-primary' : 'btn-sub-gray'}"
			on:click={() => (isCardView = false)}
			title="list"
		>
			<LucideIcon name="List" class="size-5" />
		</button>
		<Dropdown class="dropdown shrink-0">
			<DropdownButton class="btn btn-sub-gray">
				<LucideIcon name="Filter" class="align-center inline-block size-4 ltr:mr-1 rtl:ml-1" /> Sort
				By
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden !w-64 p-2">
				<a href="#!" class="dropdown-item" on:click={() => sort('')}> No Sorting </a>
				<a href="#!" class="dropdown-item" on:click={() => sort('projectName')}>
					Alphabetical (A -> Z)
				</a>
				<a href="#!" class="dropdown-item" on:click={() => sort('projectName')}>
					Reverse Alphabetical (Z -> A)
				</a>
				<a href="#!" class="dropdown-item" on:click={() => sort('status')}> Status </a>
			</DropdownMenu>
		</Dropdown>
	</div>
</div>
<div>
	<div class={`group ${isCardView ? 'card-view grid grid-cols-12 gap-x-5' : 'list-view '}`}>
		{#if displayedDeals.length > 0}
			{#each displayedDeals as deal, index}
				<div
					class="group-[&.card-view]:col-span-12 group-[&.card-view]:md:col-span-6 group-[&.card-view]:2xl:col-span-3"
				>
					<Card>
						<CardBody>
							<div
								class="gap-4 group-[&.card-view]:grid group-[&.card-view]:grid-cols-12 group-[&.list-view]:flex group-[&.list-view]:justify-between group-[&.list-view]:overflow-x-auto group-[&.list-view]:whitespace-nowrap"
							>
								<div class="flex items-center gap-3 group-[&.card-view]:col-span-12">
									<div
										class="dark:border-dark-800 size-12 shrink-0 rounded-md border border-gray-200 p-2"
									>
										<img src={deal.image} alt="" />
									</div>
									<div class="grow overflow-hidden">
										<h6 class="mb-1 truncate"><a href="#!">{deal.projectName}</a></h6>
										<p class="dark:text-dark-500 text-gray-500">
											<span>{deal.amount}</span>
											<span class="hidden group-[&.card-view]:inline-block"
												>- <span>{formatDate(deal.createDate)}</span></span
											>
										</p>
									</div>
								</div>
								<div class="group-[&.card-view]:hidden group-[&.list-view]:w-28">
									<p class="dark:text-dark-500 text-gray-500">{formatDate(deal.createDate)}</p>
								</div>
								<div class="group-[&.card-view]:col-span-12 group-[&.list-view]:w-28">
									<p
										class="dark:text-dark-500 dark:group-[&.card-view]:text-dark-50 truncate text-gray-500 group-[&.card-view]:font-medium group-[&.card-view]:text-gray-800"
									>
										{deal.company}
									</p>
									<p
										class="dark:text-dark-500 mt-1 line-clamp-2 hidden text-gray-500 group-[&.card-view]:block"
									>
										{deal.content}
									</p>
								</div>
								<div class="w-28 group-[&.card-view]:col-span-12">
									<div class="flex items-center gap-2">
										<p class="badge badge-pink">
											{typeof getDaysLeft(deal.endDate) === 'number'
												? `${getDaysLeft(deal.endDate)} Days left`
												: getDaysLeft(deal.endDate)}
										</p>
										<span
											class="badge"
											class:badge-green={deal.status === 'Active'}
											class:badge-gray={deal.status === 'Unactive'}>{deal.status}</span
										>
									</div>
								</div>
								<div class="group-[&.card-view]:col-span-12">
									<div class="flex flex-wrap items-center gap-2 group-[&.list-view]:justify-end">
										<ModalTrigger
											modalId="messageModal"
											icon="MessageSquareMore"
											text="Message"
											iconCss="!size-3.5"
											class="btn btn-dashed-yellow border-dashed"
											color=""
											onClick={() => messageComponent(deal)}
										/>

										<ModalTrigger
											modalId="callModal"
											icon="Phone"
											text="Call"
											iconCss="!size-3.5"
											color=""
											class="btn btn-dashed-primary shrink-0 border-dashed"
											onClick={() => callingTo(deal)}
										/>

										<button
											type="button"
											class="btn btn-sub-gray btn-icon-text btn-icon shrink-0"
											title="delete"
											on:click={() => deleteDeal(deal.projectName)}
										>
											<LucideIcon name="Trash" class="inline-block size-4" />
										</button>
									</div>
								</div>
							</div>
						</CardBody>
					</Card>
				</div>
			{/each}
		{/if}
	</div>

	{#if displayedDeals.length !== 0}
		<div class="mb-5 grid grid-cols-12 items-center gap-5">
			<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
				<p class="dark:text-dark-500 text-gray-500">
					Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{dealsData.length}</b>
					Results
				</p>
			</div>
			<div class="col-span-12 md:col-span-6">
				<div class="pagination pagination-primary flex justify-center md:justify-end">
					<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
						<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />Prev
					</button>
					{#each Array(totalPages) as _, pageIndex}
						<button
							on:click={() => gotoPage(pageIndex + 1)}
							class="pagination-item {currentPage === pageIndex + 1 ? 'active' : ''}"
						>
							{pageIndex + 1}
						</button>
					{/each}
					<button on:click={nextPage} disabled={currentPage === totalPages} class="pagination-next">
						Next
						<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>

{#if displayedDeals.length === 0}
	<div class="mt-10 flex justify-center">
		<TableRowNotFound />
	</div>
{/if}

<!-- Message component  -->
<Modal modalId="messageModal" let:modalId size="sm" position="bottom-right">
	<ModalBody>
		{#if selectedData}
			<div class="dark:bg-dark-850 flex items-center gap-2 rounded-md bg-gray-100 p-2">
				<ModalClose
					{modalId}
					data-modal-close="messageModal"
					class="dark:text-dark-500 btn btn-icon-text dark:hover:text-dark-50 size-10 shrink-0 p-0 text-gray-500 hover:text-gray-800"
					><LucideIcon name="ChevronLeft" /></ModalClose
				>
				<img src={selectedData.userImage} alt="User" class="size-10 rounded-full" />
				<div class="grow">
					<h6>Sophia Mia</h6>
					<p class="dark:text-dark-500 text-xs text-gray-500">
						<span
							class="inline-block size-1.5 rounded-full bg-green-500 align-middle ltr:mr-0.5 rtl:ml-0.5"
						></span>
						{selectedData.status}
					</p>
				</div>
				<button type="button" class="btn btn-sub-red btn-icon-text size-10 shrink-0 p-0">
					<LucideIcon name="Phone" class="size-5" />
				</button>
			</div>

			<Simplebar class="-mx-5 mt-4 max-h-72 min-h-72 px-5">
				<div class="flex flex-col gap-3">
					{#if selectedData && Array.isArray(selectedData.messages)}
						{#each selectedData.messages as message (message.id)}
							<div>
								{#if message.sender === 'user'}
									<div class="group flex gap-2 [&.right]:justify-end">
										<div class="size-9 rounded-full group-[&.right]:order-2">
											<img src={selectedData.userImage} alt="User" class="rounded-full" />
										</div>
										<div
											class="dark:bg-dark-850 dark:text-dark-500 group-[&.right]:bg-primary-100 group-[&.right]:text-primary-500 max-w-64 rounded-md bg-gray-100 px-3 py-2 text-sm
            font-medium text-gray-500 group-[&.right]:order-1 ltr:rounded-bl-none
            ltr:group-[&.right]:rounded-br-none ltr:group-[&.right]:rounded-bl-md rtl:rounded-br-none rtl:group-[&.right]:rounded-br-md rtl:group-[&.right]:rounded-bl-none"
										>
											{message.text}
										</div>
									</div>
								{/if}

								{#if message.sender === 'agent'}
									<div class="right group flex gap-2 [&.right]:justify-end">
										<div class="size-9 rounded-full group-[&.right]:order-2">
											<img
												src="/assets/images/avatar/user-14.png"
												alt="Agent"
												class="rounded-full"
											/>
										</div>
										<div
											class="dark:bg-dark-850 dark:text-dark-500 group-[&.right]:bg-primary-100 group-[&.right]:text-primary-500 max-w-64 rounded-md bg-gray-100 px-3 py-2 text-sm
            font-medium text-gray-500 group-[&.right]:order-1 ltr:rounded-bl-none
            ltr:group-[&.right]:rounded-br-none ltr:group-[&.right]:rounded-bl-md rtl:rounded-br-none rtl:group-[&.right]:rounded-br-md rtl:group-[&.right]:rounded-bl-none"
										>
											{message.text}
										</div>
									</div>
								{/if}
							</div>
						{/each}
					{/if}
					<div class="relative mt-4 flex">
						<input
							type="text"
							placeholder="Say something..."
							bind:value={newMessage}
							class="form-input ltr:pr-12 rtl:pl-12"
						/>
						<div class="absolute inset-y-0 hidden items-center sm:flex ltr:right-1 rtl:left-1">
							<button
								type="button"
								class="bg-primary-500 hover:bg-primary-600 inline-flex size-8 items-center justify-center rounded-md text-white transition duration-200 ease-in-out focus:outline-none"
							>
								<LucideIcon name="SendHorizontal" class="size-4" />
							</button>
						</div>
					</div>
				</div>
			</Simplebar>
		{/if}
	</ModalBody>
</Modal>

<!-- Calling component  -->
<Modal modalId="callModal" let:modalId size="xs" position="bottom-right">
	<ModalBody>
		{#if selectedData}
			<div class="flex items-center gap-2">
				<div class="dark:border-dark-800 size-12 shrink-0 rounded-md border border-gray-200 p-2">
					<img alt="" src={selectedData.userImage} />
				</div>
				<div>
					<h6>{selectedData.projectName}</h6>
					<p class="dark:text-dark-500 text-sm text-gray-500">
						{isCalling ? 'Calling ...' : formatDuration(callDuration)}
					</p>
				</div>
			</div>
			<div class="mt-5 flex items-center gap-3">
				<button
					type="button"
					on:click={toggleMute}
					class="btn btn-active-gray btn-icon-text btn-icon shrink-0"
				>
					{#if isMuted}
						<LucideIcon name="MicOff" class="size-5" />
					{:else}
						<LucideIcon name="Mic" class="size-5" />
					{/if}
				</button>
				<button type="button" class="btn btn-active-gray btn-icon-text btn-icon shrink-0">
					<LucideIcon name="Pause" class="size-5" />
				</button>
				<button type="button" class="btn btn-active-gray btn-icon-text btn-icon shrink-0">
					<LucideIcon name="Disc" class="size-5" />
				</button>
				<button
					on:click={() => closeModal()}
					type="button"
					class="btn btn-active-red btn-icon-text btn-icon shrink-0"
				>
					<LucideIcon name="Phone" class="size-5" />
				</button>

				<button type="button" class="btn btn-active-gray btn-icon-text btn-icon shrink-0">
					<LucideIcon name="Settings" class="size-5" />
				</button>
			</div>
		{/if}
	</ModalBody>
</Modal>
