<script lang="ts">
	import { onMount } from 'svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import { data } from './contact-crm';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
	import ContactDetailsForm from './ContactDetailsForm.svelte';
	import OverviewContactDetails from './OverviewContactDetails.svelte';

	let contacts = [...data];
	let displayedContacts = contacts;
	let sortBy = '';
	let sortDirection = 'asc';
	let selectedItems: any[] = [];
	let currentPage = 1;
	const itemsPerPage = 10;
	let startID = 24151;
	let searchQuery = '';
	// Pagination logic
	const totalPages = Math.ceil(displayedContacts.length / itemsPerPage);
	const showingStart = (currentPage - 1) * itemsPerPage + 1;
	const showingEnd = Math.min(currentPage * itemsPerPage, displayedContacts.length);

	const prevPage = () => {
		if (currentPage > 1) {
			currentPage--;
			updateDisplayedContacts();
		}
	};

	const nextPage = () => {
		if (currentPage < totalPages) {
			currentPage++;
			updateDisplayedContacts();
		}
	};

	const gotoPage = (page: number) => {
		currentPage = page;
		updateDisplayedContacts();
	};

	const updateDisplayedContacts = () => {
		let filteredContacts = contacts;

		// Filter contacts based on the search query
		if (searchQuery) {
			filteredContacts = contacts.filter((contact) => {
				return (
					contact.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
					contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
					contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
					contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
					contact.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
					contact.status.toLowerCase().includes(searchQuery.toLowerCase())
				);
			});
		}

		// Update the displayed contacts based on the filtered list and pagination
		displayedContacts = filteredContacts.slice(
			(currentPage - 1) * itemsPerPage,
			currentPage * itemsPerPage
		);
	};

	// Sorting function
	const sort = (column: string) => {
		if (sortBy === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = column;
			sortDirection = 'asc';
		}

		displayedContacts = [...contacts].sort((a: any, b: any) => {
			if (sortDirection === 'asc') {
				return a[column] > b[column] ? 1 : -1;
			} else {
				return a[column] < b[column] ? 1 : -1;
			}
		});
	};

	// Checkbox selection logic
	const toggleItem = (contact: {
		image: string;
		contactName: string;
		phoneNumber: string;
		company: string;
		role: string;
		email: string;
		website: string;
		status: string;
	}) => {
		if (selectedItems.includes(contact)) {
			selectedItems = selectedItems.filter((item) => item !== contact);
		} else {
			selectedItems = [...selectedItems, contact];
		}
	};

	const toggleAll = () => {
		if (selectedItems.length === displayedContacts.length) {
			selectedItems = [];
		} else {
			selectedItems = [...displayedContacts];
		}
	};

	// Delete selected contacts
	const deleteSelectedItems = () => {
		contacts = contacts.filter((contact) => !selectedItems.includes(contact));
		selectedItems = [];
		updateDisplayedContacts();
	};

	// Function to export contacts as CSV
	const exportData = () => {
		const headers = [
			'Contact Name',
			'Phone Number',
			'Company',
			'Role',
			'Email',
			'Website',
			'Status'
		];
		const rows = contacts.map((contact) => [
			contact.contactName,
			contact.phoneNumber,
			contact.company,
			contact.role,
			contact.email,
			contact.website,
			contact.status
		]);

		// Create CSV content
		let csvContent = 'data:text/csv;charset=utf-8,' + headers.join(',') + '\n';
		rows.forEach((row) => {
			csvContent += row.join(',') + '\n';
		});

		// Create a downloadable link for CSV file
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', 'contacts.csv');
		link.click(); // Trigger download
	};

	onMount(() => {
		updateDisplayedContacts();
	});
	// Watch the search query to trigger filtering
	$: searchQuery, updateDisplayedContacts();

	// ---- table activity --------------
	let addForm = false;
	let editMode = false;
	let selectedCustomerDetails: any | null = null;
	function openAddForm() {
		addForm = true;
		editMode = false;
		selectedCustomerDetails = null;
	}

	function overviewDetails(contact: any) {
		selectedCustomerDetails = contact;
	}
	function openEditForm(contact: any) {
		addForm = false;
		editMode = true;
		selectedCustomerDetails = contact;
	}
	function getDataForDelete(contact: any) {
		console.log(contact);
	}
	function deleteHandler() {}
</script>

<CardHeader>
	<div class="flex flex-wrap justify-between gap-5">
		<div>
			<div class="group/form relative">
				<input
					type="text"
					class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
					placeholder="Search for ..."
					bind:value={searchQuery}
				/>
				<div
					class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
				>
					<LucideIcon name="Search" class="size-4" />
				</div>
			</div>
		</div>
		<div>
			<div class="flex flex-wrap gap-2">
				{#if selectedItems.length > 0}
					<button class="btn btn-red btn-icon" on:click={deleteSelectedItems}>
						<LucideIcon name="Trash" class="inline-block size-4" />
					</button>
				{/if}
				<button type="button" class="btn btn-sub-gray" on:click={exportData}>
					<LucideIcon name="Download" class="inline-block size-4" />
					<span class="align-baseline">Export</span>
				</button>
				<ModalTrigger
					modalId="add-contact-modalId"
					icon="Plus"
					color="primary"
					text="Add Contact"
					class="btn !gap-1"
					onClick={() => openAddForm()}
				/>

				<Dropdown class="dropdown shrink-0">
					<DropdownButton class="btn btn-sub-gray">
						<LucideIcon
							name="Filter"
							class="align-center inline-block size-4 ltr:mr-2 rtl:ml-2"
						/>Sort By
					</DropdownButton>
					<DropdownMenu class="dropdown-menu !fixed !w-64 p-2">
						<a href="#!" class="dropdown-item"> No Sorting </a>
						<a href="#!" class="dropdown-item" on:click={() => sort('contactName')}>
							Alphabetical (A -> Z)
						</a>
						<a href="#!" class="dropdown-item" on:click={() => sort('contactName')}>
							Reverse Alphabetical (Z -> A)
						</a>
						<a href="#!" class="dropdown-item" on:click={() => sort('status')}> Status </a>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	</div>
</CardHeader>

<CardBody>
	<div>
		<div class="overflow-x-auto">
			<table class="table whitespace-nowrap">
				<thead>
					<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
						<th class="!font-medium">
							<label for="checkboxAll" class="input-check-label hidden"></label>
							<input
								id="checkboxAll"
								class="input-check input-check-primary"
								type="checkbox"
								on:click={toggleAll}
							/>
						</th>
						<th on:click={() => sort('contactID')} class="cursor-pointer !font-medium"
							>ID <span>{sortBy === 'contactID' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							></th
						>
						<th on:click={() => sort('contactName')} class="cursor-pointer !font-medium"
							>Name <span
								>{sortBy === 'contactName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							></th
						>
						<th on:click={() => sort('company')} class="cursor-pointer !font-medium"
							>Company <span
								>{sortBy === 'company' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							></th
						>
						<th on:click={() => sort('role')} class="cursor-pointer !font-medium"
							>Role <span>{sortBy === 'role' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							></th
						>
						<th on:click={() => sort('email')} class="cursor-pointer !font-medium"
							>Email <span>{sortBy === 'email' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							></th
						>
						<th on:click={() => sort('website')} class="cursor-pointer !font-medium"
							>Website <span
								>{sortBy === 'website' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							></th
						>
						<th on:click={() => sort('status')} class="cursor-pointer !font-medium"
							>Status <span>{sortBy === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							></th
						>
						<th class="!font-medium">Action</th>
					</tr>
				</thead>
				<tbody>
					{#if displayedContacts.length > 0}
						{#each displayedContacts as contact, index}
							<tr>
								<td>
									<div class="flex items-center">
										<!-- svelte-ignore a11y-label-has-associated-control -->
										<label class="input-check-label hidden"></label>
										<input
											type="checkbox"
											class="input-check input-check-primary"
											on:click={() => toggleItem(contact)}
											checked={selectedItems.includes(contact)}
										/>
									</div>
								</td>
								<td>{'PEC-' + (startID + index).toString()}</td>
								<td>
									<div class="flex items-center gap-2">
										<img src={contact.image} alt="" class="size-9 shrink-0 rounded-full" />
										<div class="grow overflow-hidden">
											<h6 class="truncate">{contact.contactName}</h6>
											<p class="dark:text-dark-500 truncate text-sm text-gray-500">
												{contact.phoneNumber}
											</p>
										</div>
									</div>
								</td>
								<td>{contact.company}</td>
								<td>{contact.role}</td>
								<td>{contact.email}</td>
								<td><a href="#!" class="badge badge-gray">{contact.website}</a></td>
								<td>
									<span
										class={contact.status === 'Customer'
											? 'badge badge-pink'
											: contact.status === 'Personal'
												? 'badge badge-yellow'
												: contact.status === 'Employee'
													? 'badge badge-sky'
													: 'badge badge-purple'}
									>
										{contact.status}
									</span>
								</td>
								<td>
									<Dropdown class="dropdown" alignTo="right-bottom">
										<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
											<i class="ri-more-2-fill"></i>
										</DropdownButton>
										<DropdownMenu class="dropdown-menu !fixed hidden p-2">
											<ModalTrigger
												modalId="overview-contact"
												color=""
												icon="Eye"
												class="dropdown-item justify-start"
												text="Overview"
												onClick={() => overviewDetails(contact)}
											/>
											<ModalTrigger
												modalId="add-contact-modalId"
												color=""
												icon="Pencil"
												class="dropdown-item justify-start"
												text="Edit"
												onClick={() => openEditForm(contact)}
											/>
											<ModalTrigger
												modalId="delete-file-modal"
												color=""
												icon="Trash2"
												class="dropdown-item justify-start"
												text="Delete"
												onClick={() => getDataForDelete(contact)}
											/>
										</DropdownMenu>
									</Dropdown>
								</td>
							</tr>
						{/each}
					{:else}
						<tr>
							<td colspan="10">
								<TableRowNotFound />
							</td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>

		{#if displayedContacts.length > 0}
			<Grid cols={12} gap="space" class="mt-space">
				<div class="col-span-12 lg:col-span-6 justify-center lg:justify-start flex flex-wrap">
					<p class="dark:text-dark-500 text-gray-500">
						Showing {showingStart} - {showingEnd} of {contacts.length} Results
					</p>
					<span>{selectedItems.length} Row Selected</span>
				</div>
				<Col cols={{ span: 12 }} md={{ span: 6 }}>
					<div class="pagination pagination-primary flex justify-end">
						<button class="pagination-pre" on:click={prevPage} disabled={currentPage === 1}
							><LucideIcon
								name="ChevronLeft"
								class="mr-1 size-4 ltr:inline-block rtl:hidden"
							/>Prev</button
						>
						{#each Array(totalPages) as _, i}
							<button
								class="pagination-item"
								on:click={() => gotoPage(i + 1)}
								class:selected={currentPage === i + 1}>{i + 1}</button
							>
						{/each}
						<button
							class="pagination-next"
							on:click={nextPage}
							disabled={currentPage === totalPages}
							>Next<LucideIcon
								name="ChevronRight"
								class="ml-1 size-4 ltr:inline-block rtl:hidden"
							/></button
						>
					</div>
				</Col>
			</Grid>
		{/if}
	</div>
</CardBody>

<!-- Overview Component -->
<Modal modalId="overview-contact" let:modalId size=" ">
	<ModalBody>
		{#if selectedCustomerDetails}
			<OverviewContactDetails selectedContact={selectedCustomerDetails} />
		{/if}
	</ModalBody>
</Modal>

<!-- Contact Form -->
<Modal modalId="add-contact-modalId" let:modalId size="md">
	<ModalBody class="!p-2">
		<ContactDetailsForm
			{addForm}
			{editMode}
			selectedCustomer={selectedCustomerDetails}
			{updateDisplayedContacts}
			on:click={openAddForm}
		/>
	</ModalBody>
</Modal>

<!-- Delete component -->
<DeleteComponent {deleteHandler} />
