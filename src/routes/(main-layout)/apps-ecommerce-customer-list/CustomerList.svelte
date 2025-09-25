<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import { customers, type CustomerList } from './customer-list';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
	import CustomerForm from './CustomerForm.svelte';

	// State for sorting, pagination, and selection
	let sortBy = '';
	let sortDirection = 'asc';
	let selectedItems: any[] = [];
	let currentPage = 1;
	let itemsPerPage = 10;
	let searchQuery = '';

	// Computed property for filtered customers
	$: filteredCustomers = customers.filter((customer: any) => {
		const query = searchQuery.toLowerCase();
		return (
			customer.customersName.toLowerCase().includes(query) ||
			customer.email.toLowerCase().includes(query) ||
			customer.phoneNumber.toLowerCase().includes(query) ||
			customer.gender.toLowerCase().includes(query) ||
			customer.location.toLowerCase().includes(query)
		);
	});

	// Computed property for sorted customers
	$: sortedCustomers = [...customers].sort((a: any, b: any) => {
		if (!sortBy) return 0;

		const aValue = a[sortBy];
		const bValue = b[sortBy];

		if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
		if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
		return 0;
	});

	// Paginated customers
	$: displayedCustomers = sortedCustomers.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);
	$: totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

	// Helper to toggle selection of all items
	function toggleAll() {
		if (selectedItems.length === displayedCustomers.length) {
			selectedItems = [];
		} else {
			selectedItems = [...displayedCustomers];
		}
	}

	// Helper to toggle selection of individual items
	function toggleItem(customer: any) {
		if (selectedItems.includes(customer)) {
			selectedItems = selectedItems.filter((item) => item !== customer);
		} else {
			selectedItems.push(customer);
		}
	}

	// Helper to handle page navigation
	function nextPage() {
		if (currentPage < totalPages) {
			currentPage += 1;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage -= 1;
		}
	}

	function gotoPage(page: number) {
		currentPage = page;
	}

	// Sorting logic
	function sort(column: string) {
		if (sortBy === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = column;
			sortDirection = 'asc';
		}
	}

	let addForm = false;
	let editMode = false;
	let selectedCustomerDetails: CustomerList | null = null;

	function openAddForm() {
		addForm = true;
		editMode = false;
		selectedCustomerDetails = null;
	}

	function openEditForm(customer: CustomerList) {
		addForm = false;
		editMode = true;
		selectedCustomerDetails = customer;
	}

	function overviewData(orderData: CustomerList) {
		selectedCustomerDetails = { ...orderData };
	}
	function getDataForDelete(customer: CustomerList) {
		selectedCustomerDetails = { ...customer };
	}

	function deleteHandler() {
		const index = customers.findIndex(
			(customer) => customer.customerId === selectedCustomerDetails?.customerId
		);
		customers.splice(index, 1);
	}

	customers.forEach((customer: CustomerList, index: number) => {
		customer.customerId = `PEC-${24151 + index}`;
	});
</script>

<div>
	<Grid cols={12} gap={5} class="mb-3 items-center gap-3 ">
		<div class="col-span-12 xl:col-span-5 2xl:col-span-7">
			<h6 class="card-title mb-0">Customer List</h6>
		</div>
		<div
			class="col-span-12 flex flex-wrap gap-3 xl:col-span-7 xl:flex-nowrap xl:justify-end 2xl:col-span-5"
		>
			{#if selectedItems.length > 0}
				<button class="btn btn-red btn-icon">
					<LucideIcon name="Trash" class="inline-block size-4" />
				</button>
			{/if}
			<div class="group/form relative">
				<input
					type="text"
					bind:value={searchQuery}
					class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
					placeholder="Search name, email, gender, etc..."
				/>
				<span
					class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
				>
					<LucideIcon name="Search" class="size-4" />
				</span>
			</div>
			<ModalTrigger
				modalId="addCustomerModals"
				icon="Plus"
				color="primary"
				text="New Customer"
				class="btn"
				onClick={() => openAddForm()}
			/>
		</div>
	</Grid>
	<div>
		<div class="overflow-x-auto">
			<table class="hovered flush table border-separate border-spacing-y-2 whitespace-nowrap">
				<thead class="dark:*:bg-dark-900 *:rounded-md *:bg-gray-50">
					<tr class="dark:bg-dark-800 dark:text-dark-500 bg-gray-100 text-gray-500">
						<th class="!font-medium">
							<div class="input-check-group">
								<label for="checkboxAll" class="input-check-label hidden"></label>
								<input
									id="checkboxAll"
									class="input-check input-check-primary"
									type="checkbox"
									on:click={toggleAll}
								/>
							</div>
						</th>
						<th
							>ID
							{#if sortBy === 'customersID'}
								{sortDirection === 'asc' ? '↑' : '↓'}
							{/if}</th
						>
						<th on:click={() => sort('customersName')} class="cursor-pointer !font-medium">
							Name {#if sortBy === 'customersName'}
								{sortDirection === 'asc' ? '↑' : '↓'}
							{/if}</th
						>
						<th on:click={() => sort('email')} class="cursor-pointer !font-medium">
							Email {#if sortBy === 'email'}
								{sortDirection === 'asc' ? '↑' : '↓'}
							{/if}
						</th>
						<th on:click={() => sort('phoneNumber')} class="cursor-pointer !font-medium"
							>Phone Number{#if sortBy === 'phoneNumber'}
								{sortDirection === 'asc' ? '↑' : '↓'}
							{/if}</th
						>
						<th on:click={() => sort('subscriber')} class="cursor-pointer !font-medium"
							>Subscriber {#if sortBy === 'subscriber'}
								{sortDirection === 'asc' ? '↑' : '↓'}
							{/if}</th
						>
						<th on:click={() => sort('gender')} class="cursor-pointer !font-medium">
							Gender{#if sortBy === 'gender'}
								{sortDirection === 'asc' ? '↑' : '↓'}
							{/if}
						</th>
						<th on:click={() => sort('location')} class="cursor-pointer !font-medium"
							>Location {#if sortBy === 'location'}
								{sortDirection === 'asc' ? '↑' : '↓'}
							{/if}</th
						>
						<th on:click={() => sort('status')} class="cursor-pointer !font-medium"
							>status {#if sortBy === 'status'}
								{sortDirection === 'asc' ? '↑' : '↓'}
							{/if}</th
						>
						<th class="!font-medium">Action</th>
					</tr>
				</thead>
				<tbody class="dark:*:bg-dark-900 *:rounded-md *:bg-gray-50">
					{#each displayedCustomers as customer, index}
						<tr>
							<td class="">
								<div class="input-check-group">
									<label for={`customer${customer.customersName}`} class="input-check-label hidden"
									></label>
									<input
										id={`customer${customer.customersName}`}
										class="input-check input-check-primary"
										type="checkbox"
										checked={selectedItems.includes(customer)}
										on:click={() => toggleItem(customer)}
									/>
								</div>
							</td>
							<td class="">
								<!-- Displaying Category ID -->
								<a href="#!">
									{customer.customerId}
								</a>
							</td>
							<td class="">
								<!-- Display Image and Category Name -->
								<div class="flex items-center gap-2">
									<!-- Image -->
									<img
										src={customer.image}
										alt={customer.customersName}
										class="size-8 shrink-0 rounded-full"
									/>
									<a href="#!" class="link link-primary grow text-current"
										>{customer.customersName}</a
									>
								</div>
							</td>
							<td class="">{customer.email}</td>
							<td class="">{customer.phoneNumber}</td>
							<td class="">{customer.subscriber}</td>
							<td class="">{customer.gender}</td>
							<td class="">{customer.location}</td>
							<td class="">
								<span
									class={customer.status === 'Active' ? 'badge badge-green' : 'badge badge-red'}
								>
									{customer.status}
								</span>
							</td>
							<td>
								<Dropdown class="dropdown" alignTo="right-bottom">
									<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
										<i class="ri-more-2-fill"></i>
									</DropdownButton>
									<DropdownMenu class="dropdown-menu !fixed hidden p-2">
										<ModalTrigger
											modalId="overviewOrderModal"
											color=""
											icon="Eye"
											class="dropdown-item justify-start"
											text="Overview"
											onClick={() => overviewData(customer)}
										/>
										<ModalTrigger
											modalId="addCustomerModals"
											color=""
											icon="Pencil"
											class="dropdown-item justify-start"
											text="Edit"
											onClick={() => openEditForm(customer)}
										/>
										<ModalTrigger
											modalId="delete-file-modal"
											color=""
											icon="Trash2"
											class="dropdown-item justify-start"
											text="Delete"
											onClick={() => getDataForDelete(customer)}
										/>
									</DropdownMenu>
								</Dropdown>
							</td>
						</tr>
					{/each}
					{#if displayedCustomers.length === 0}
						<TableRowNotFound />
					{/if}
				</tbody>
			</table>
		</div>

		<div class="grid items-center grid-cols-12 gap-space mt-5" class:hidden={displayedCustomers.length === 0}>
			<div class="col-span-12 lg:col-span-6 justify-center lg:justify-start flex flex-wrap">
				<p class="dark:text-dark-500 text-gray-500">
					Showing {1 + (currentPage - 1) * itemsPerPage} - {Math.min(
						currentPage * itemsPerPage,
						displayedCustomers.length
					)} of {customers.length} Results
				</p>
				{#if selectedItems.length > 0}
					<span>{selectedItems.length > 0 ? selectedItems.length : ''} Row Selected</span>
				{/if}
			</div>

			<div class="col-span-12 md:col-span-6">
				<div class="pagination pagination-primary flex justify-end">
					<button on:click={prevPage} class="pagination-pre" disabled={currentPage === 1}>
						<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
						Prev
					</button>

					{#each Array(totalPages) as _, pageIndex}
						<button
							on:click={() => gotoPage(pageIndex + 1)}
							class="pagination-item"
							class:active={currentPage === pageIndex + 1}
						>
							{pageIndex + 1}
						</button>
					{/each}

					<button on:click={nextPage} class="pagination-next" disabled={currentPage === totalPages}>
						Next
						<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<Modal modalId="addCustomerModals">
	<ModalBody modalId="addCustomerModals">
		<CustomerForm
			{addForm}
			{editMode}
			selectedCustomer={selectedCustomerDetails}
			on:click={openAddForm}
		/>
	</ModalBody>
</Modal>

<!-- Overview Form -->
{#if selectedCustomerDetails}
	<Modal modalId="overviewOrderModal" let:modalId position="center" size=" ">
		<div class="dark:bg-dark-850 h-20 rounded-t-md bg-gray-100"></div>
		<div class="modal-content">
			<div class="relative -mt-16 inline-block rounded-full">
				<img src={selectedCustomerDetails?.image} alt="" class="size-24 rounded-full" />
				<div
					class="dark:border-dark-900 absolute bottom-1.5 size-4 rounded-full border-2 border-white bg-green-500 ltr:right-2 rtl:left-2"
				></div>
			</div>
			<div class="mt-5">
				<div class="overflow-x-auto">
					<table class="flush table">
						<tbody>
							<tr class="*:!py-1.5">
								<th class="w-40 !border-0">Name</th>
								<td>{selectedCustomerDetails.customersName}</td>
							</tr>
							<tr class="*:!py-1.5">
								<th class="w-40 !border-0">Email</th>
								<td>{selectedCustomerDetails.email}</td>
							</tr>
							<tr class="*:!py-1.5">
								<th class="w-40 !border-0">Phone Number</th>
								<td>{selectedCustomerDetails.phoneNumber}</td>
							</tr>
							<tr class="*:!py-1.5">
								<th class="w-40 !border-0">Subscriber</th>
								<td>{selectedCustomerDetails.customersName}</td>
							</tr>
							<tr class="*:!py-1.5">
								<th class="w-40 !border-0">Location</th>
								<td>{selectedCustomerDetails.location}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</Modal>
{/if}

<DeleteComponent {deleteHandler} />
