<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import { options as donut } from './donut';
	import { invoicesListData, type Invoice } from './invoice-list';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';

	let invoices: Invoice[] = invoicesListData;
	let displayedInvoices: Invoice[] = [];
	let currentPage = 1;
	const itemsPerPage = 10;
	let sortBy: string = '';
	let sortDirection: 'asc' | 'desc' = 'asc';
	let selectedItems: Invoice[] = [];
	let allSelected: boolean = false;
	let startID = 15475;
	let searchTerm: string = '';
	let filteredInvoices: Invoice[] = invoices;
	let invoiceToDelete = writable(null);

	// Assign unique IDs to each invoice
	invoices.forEach((invoice, index) => {
		invoice.invoicesID = 'PEI-' + (startID + index).toString();
	});

	// delete invice
	function deleteInvoice(index: number) {
		invoices = invoices.filter((_, i) => i !== index);
		updateDisplayedInvoices();
		invoiceToDelete.set(null);
	}

	function deleteSelectedInvoices() {
		invoices = invoices.filter((invoice) => !selectedItems.includes(invoice));
		selectedItems = [];
		updateDisplayedInvoices();
	}

	// Function to filter invoices based on search term
	const filterInvoices = () => {
		filteredInvoices = invoices.filter((invoice) => {
			const searchString = searchTerm.toLowerCase();
			return (
				invoice.clientName.toLowerCase().includes(searchString) ||
				invoice.status.toLowerCase().includes(searchString)
			);
		});
		currentPage = 1;
		updateDisplayedInvoices();
	};

	// Function to sort invoices based on column
	const sort = (column: string) => {
		if (sortBy === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = column;
			sortDirection = 'asc';
		}

		filteredInvoices = [...filteredInvoices].sort((a: any, b: any) => {
			const aVal = a[column];
			const bVal = b[column];

			if (typeof aVal === 'string' && typeof bVal === 'string') {
				return aVal.localeCompare(bVal) * (sortDirection === 'asc' ? 1 : -1);
			}

			if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
			if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});

		updateDisplayedInvoices();
	};

	// Update displayed invoices for the current page
	const updateDisplayedInvoices = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		displayedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);
	};

	// Pagination functions
	const nextPage = () => {
		if (currentPage < totalPages) {
			currentPage++;
			updateDisplayedInvoices();
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			currentPage--;
			updateDisplayedInvoices();
		}
	};

	const gotoPage = (page: number) => {
		currentPage = page;
		updateDisplayedInvoices();
	};

	// Calculate total pages
	const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

	// Toggle item selection
	const toggleItem = (invoice: Invoice) => {
		if (selectedItems.includes(invoice)) {
			selectedItems = selectedItems.filter((item) => item !== invoice);
		} else {
			selectedItems = [...selectedItems, invoice];
		}
		allSelected = selectedItems.length === filteredInvoices.length;
	};

	// Toggle "Select All" functionality
	const toggleAll = () => {
		if (allSelected) {
			selectedItems = [];
		} else {
			selectedItems = [...filteredInvoices];
		}
		allSelected = !allSelected;
	};

	onMount(() => {
		updateDisplayedInvoices();
	});
</script>

<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class=" card 2xl:col-span-2">
		<CardBody>
			<div
				class="rounded-modern mx-auto mb-4 flex size-16 items-center justify-center bg-gradient-to-t from-green-500/10"
			>
				<LucideIcon
					name="CircleCheckBig"
					class="relative size-9 fill-green-500/10 stroke-1 text-green-500"
				/>
			</div>
			<h5 class="mb-1">{filteredInvoices.filter((invoice) => invoice.status === 'Paid').length}</h5>
			<p class="mb-4">Paid Invoice</p>
			<p class="dark:text-dark-500 text-gray-500">
				<span class="badge badge-green align-bottom">
					{(
						(filteredInvoices.filter((invoice) => invoice.status === 'Paid').length /
							filteredInvoices.length) *
						100
					).toFixed(2)}%
				</span> This month
			</p>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class=" card 2xl:col-span-2">
		<CardBody>
			<div
				class="rounded-modern mx-auto mb-4 flex size-16 items-center justify-center bg-gradient-to-t from-pink-500/10"
			>
				<LucideIcon
					name="CircleAlert"
					class="relative size-9 fill-pink-500/10 stroke-1 text-pink-500"
				/>
			</div>
			<h5 class="mb-1">
				{filteredInvoices.filter((invoice) => invoice.status === 'Unpaid').length}
			</h5>
			<p class="mb-4">Unpaid Invoice</p>
			<p class="dark:text-dark-500 text-gray-500">
				<span class="badge badge-green align-bottom">
					{(
						(filteredInvoices.filter((invoice) => invoice.status === 'Unpaid').length /
							filteredInvoices.length) *
						100
					).toFixed(2)}%
				</span> This month
			</p>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class=" card 2xl:col-span-2">
		<CardBody>
			<div
				class="rounded-modern mx-auto mb-4 flex size-16 items-center justify-center bg-gradient-to-t from-yellow-500/10"
			>
				<LucideIcon
					name="Hourglass"
					class="relative size-9 fill-yellow-500/10 stroke-1 text-yellow-500"
				/>
			</div>
			<h5 class="mb-1">
				{filteredInvoices.filter((invoice) => invoice.status === 'Pending').length}
			</h5>
			<p class="mb-4">Pending Invoice</p>
			<p class="dark:text-dark-500 text-gray-500">
				<span class="badge badge-green align-bottom">
					{(
						(filteredInvoices.filter((invoice) => invoice.status === 'Pending').length /
							filteredInvoices.length) *
						100
					).toFixed(2)}%
				</span> This month
			</p>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class=" card 2xl:col-span-2">
		<CardBody>
			<div
				class="rounded-modern mx-auto mb-4 flex size-16 items-center justify-center bg-gradient-to-t from-red-500/10"
			>
				<LucideIcon name="X" class="relative size-9 fill-red-500/10 stroke-1 text-red-500" />
			</div>
			<h5 class="mb-1">
				{filteredInvoices.filter((invoice) => invoice.status === 'Overdue').length}
			</h5>
			<p class="mb-4">Overdue Invoice</p>
			<p class="dark:text-dark-500 text-gray-500">
				<span class="badge badge-green align-bottom">
					{(
						(filteredInvoices.filter((invoice) => invoice.status === 'Overdue').length /
							filteredInvoices.length) *
						100
					).toFixed(2)}%
				</span> This month
			</p>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class=" card 2xl:col-span-4">
		<CardHeader class="flex items-center gap-3">
			<CardTitle class="grow">Invoice Status</CardTitle>
			<Dropdown class="dropdown" alignTo="right-bottom">
				<DropdownButton
					isChevron={true}
					class="dark:border-dark-800 link link-red btn flex border-gray-200 px-2 py-1 text-xs"
				>
					Last Week
				</DropdownButton>
				<DropdownMenu class="dropdown-menu !fixed hidden p-2">
					<a href="#!" class="dropdown-item"> Last Week </a>
					<a href="#!" class="dropdown-item"> Last Month </a>
					<a href="#!" class="dropdown-item"> Last Years </a>
				</DropdownMenu>
			</Dropdown>
		</CardHeader>
		<CardBody>
			<div>
				<ApexChart
					class="!min-h-full"
					options={donut}
					colors={['bg-green-500', 'bg-sky-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500']}
				/>
			</div>
		</CardBody>
	</Col>
</Grid>

<div class="justify-between md:flex">
	<div>
		<h6 class="mb-1">All Invoices</h6>
		<p class="dark:text-dark-500 text-gray-500">Manage your invoice</p>
	</div>
	<div>
		<div class="mt-3 flex flex-wrap items-center gap-5 md:mt-0">
			<div class="group/form relative grow">
				<input
					type="email"
					bind:value={searchTerm}
					on:input={filterInvoices}
					class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
					placeholder="Search invoice ..."
				/>
				<button
					class="absolute inset-y-0 flex items-center focus:outline-hidden ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
				>
					<LucideIcon
						name="Search"
						class="dark:text-dark-500 dark:fill-dark-850 size-4 fill-gray-100 text-gray-500"
					/>
				</button>
			</div>
			<a href="/apps-invoice-create" class="btn btn-primary shrink-0">Create Invoice</a>
			{#if selectedItems.length > 0}
				<button class="btn btn-red btn-icon">
					<LucideIcon name="Trash" class="inline-block size-4" />
				</button>
			{/if}
		</div>
	</div>
</div>

<Simplebar>
	<table class="hovered flush table !border-separate !border-spacing-y-2 whitespace-nowrap">
		<tbody>
			<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
				<th class="!font-medium">
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
				<th class="cursor-pointer !font-medium" on:click={() => sort('invoicesID')}>
					ID <span>{sortBy === 'invoicesID' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
				</th>
				<th class="cursor-pointer !font-medium" on:click={() => sort('clientName')}>
					Client <span>{sortBy === 'clientName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
				</th>
				<th class="cursor-pointer !font-medium" on:click={() => sort('country')}>
					Country <span>{sortBy === 'country' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
				</th>
				<th class="cursor-pointer !font-medium" on:click={() => sort('invoiceDate')}>
					Invoice Date <span
						>{sortBy === 'invoiceDate' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
					>
				</th>
				<th class="cursor-pointer !font-medium" on:click={() => sort('dueDate')}>
					Due Date <span>{sortBy === 'dueDate' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
				</th>
				<th class="cursor-pointer !font-medium" on:click={() => sort('amount')}>
					Amount <span>{sortBy === 'amount' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
				</th>
				<th class="cursor-pointer !font-medium" on:click={() => sort('status')}>
					status <span>{sortBy === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
				</th>

				<th class="!font-medium">Action</th>
			</tr>
			{#each displayedInvoices as invoice, index (invoice.invoicesID || index)}
				<tr>
					<td>
						<div class="input-check-group">
							<label for={'invoice' + index} class="input-check-label hidden"></label>
							<input
								id={'invoice' + index}
								class="input-check input-check-primary"
								type="checkbox"
								checked={selectedItems.includes(invoice)}
								on:click={() => toggleItem(invoice)}
							/>
						</div>
					</td>
					<td>{invoice.invoicesID}</td>
					<td>
						<div class="flex items-center gap-2">
							<img src={invoice.image} alt="" class="size-7 shrink-0 rounded-full" />
							<a href="#!" class="link link-primary grow !text-current">{invoice.clientName}</a>
						</div>
					</td>
					<td>{invoice.country}</td>
					<td>{invoice.invoiceDate}</td>
					<td>{invoice.dueDate}</td>
					<td>{invoice.amount}</td>
					<td>
						<span
							class={`badge ${invoice.status === 'Paid' ? 'badge-green' : invoice.status === 'Unpaid' ? 'badge-pink' : invoice.status === 'Pending' ? 'badge-yellow' : 'badge-red'}`}
						>
							{invoice.status}
						</span>
					</td>
					<td>
						<Dropdown class="dropdown">
							<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
								<i class="ri-more-2-fill"></i>
							</DropdownButton>
							<DropdownMenu class="dropdown-menu !fixed hidden p-2">
								<a href="/apps-invoice-overview-1" class="dropdown-item">
									<i class="ri-eye-line align-middle ltr:mr-2 rtl:ml-2"></i> <span>Overview</span>
								</a>
								<a href="#!" class="dropdown-item">
									<i class="ri-pencil-line align-middle ltr:mr-2 rtl:ml-2"></i> <span>Edit</span>
								</a>
								<ModalTrigger
									modalId="delete-file-modal"
									icon="Trash2"
									text="Delete"
									color=""
									class="dropdown-item justify-start align-middle ltr:mr-2 rtl:ml-2"
								></ModalTrigger>
							</DropdownMenu>
						</Dropdown>
					</td>
				</tr>
			{/each}
			{#if displayedInvoices.length === 0}
				<tr>
					<td colspan="10" class="!p-8">
						<TableRowNotFound />
					</td>
				</tr>
			{/if}
		</tbody>
	</table>
</Simplebar>

{#if displayedInvoices.length > 0}
	<div class="mt-3 mb-5 grid grid-cols-12 items-center gap-5">
		<!-- Showing results section -->
		<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
			<p class="dark:text-dark-500 text-gray-500 ltr:pr-1 rtl:pl-1">
				Showing <b>{(currentPage - 1) * itemsPerPage + 1}</b> -
				<b>{Math.min(currentPage * itemsPerPage, invoices.length)}</b>
				of <b>{invoices.length}</b> Results
			</p>
			{#if selectedItems.length > 0}
				<span><b>{selectedItems.length}</b> Row Selected</span>
			{/if}
		</div>

		<!-- Pagination Controls -->
		<div class="col-span-12 md:col-span-6">
			<div class="pagination pagination-primary flex justify-center md:justify-end">
				<!-- Previous Button -->
				<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
					<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
					<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
					Prev
				</button>

				<!-- Page Number Buttons -->
				{#each Array(totalPages) as _, index (index)}
					<button
						on:click={() => gotoPage(index + 1)}
						class="pagination-item {currentPage === index + 1 ? 'active' : ''}"
					>
						<span>{index + 1}</span>
					</button>
				{/each}

				<!-- Next Button -->
				<button on:click={nextPage} disabled={currentPage === totalPages} class="pagination-next">
					Next
					<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
					<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
				</button>
			</div>
		</div>
	</div>
{/if}

<DeleteComponent />
