<script lang="ts">
	import { writable } from 'svelte/store';
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
	import Card from '$lib/components/ui/card/Card.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { options as donut } from './donut-grid';
	import { invoicesListData, type Invoice } from './invoice';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';

	let invoices: Invoice[] = invoicesListData;
	let displayedInvoices: Invoice[] = [];
	let currentPage = 1;
	const itemsPerPage = 8;
	let sortBy: string = '';
	let sortDirection: 'asc' | 'desc' = 'asc';
	let selectedItems: Invoice[] = [];
	let startID = 15475;
	let searchTerm: string = '';
	let filteredInvoices: Invoice[] = invoices;
	let invoiceToDelete = writable(null);

	// Assign unique IDs to each invoice
	invoices.forEach((invoice, index) => {
		invoice.invoicesID = 'PEI-' + (startID + index).toString();
	});

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

			// Handle different data types properly (e.g., string, number)
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

	// Initialize the displayed invoices on page load
	updateDisplayedInvoices();
</script>

<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class=" card 2xl:col-span-2">
		<CardBody>
			<div
				class="rounded-modern mb-4 flex size-16 items-center justify-center bg-gradient-to-t from-green-500/10"
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
				class="rounded-modern mb-4 flex size-16 items-center justify-center bg-gradient-to-t from-pink-500/10"
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
				class="rounded-modern mb-4 flex size-16 items-center justify-center bg-gradient-to-t from-yellow-500/10"
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
				class="rounded-modern mb-4 flex size-16 items-center justify-center bg-gradient-to-t from-red-500/10"
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

<div class="mb-4 items-center gap-3 space-y-3 md:flex md:space-y-0">
	<div class="grow">
		<h6 class="mb-1">All Invoices</h6>
		<p class="dark:text-dark-500 text-gray-500">Manage your invoice</p>
	</div>
	<div class="w-44 shrink-0">
		<select name="status" id="" class="form-input">
			<option value="" disabled selected hidden>Invoice Type</option>
			<option value="all">All</option>
			<option value="paid">Paid</option>
			<option value="unpaid">Unpaid</option>
			<option value="pending">Pending</option>
			<option value="overdue">Overdue</option>
		</select>
	</div>
	<button class="btn btn-sub-gray shrink-0">Filters</button>
	<a href="/apps-invoice-create" class="btn btn-primary shrink-0">Create Invoice</a>
</div>

<Grid cols={1} gapX={5} class="md:grid-cols-2 2xl:grid-cols-4">
	{#each displayedInvoices as invoice, index}
		<Card>
			<CardBody>
				<div class="mb-4 flex items-center">
					<h6 class="grow">Invoice {invoice.invoicesID}</h6>
					<Dropdown class="dropdown" alignTo="right-bottom">
						<DropdownButton class="link link-red">
							<i class="ri-more-fill"></i>
						</DropdownButton>

						<DropdownMenu class="dropdown-menu !fixed hidden p-2">
							<a href="/apps-invoice-overview-2" class="dropdown-item">Overview</a>
							<a href="#!" class="dropdown-item">Edit</a>

							<ModalTrigger
								modalId="delete-file-modal"
								text="Delete"
								color=""
								class="dropdown-item"
							/>
						</DropdownMenu>
					</Dropdown>
				</div>
				<div class="dark:border-dark-800 rounded-md border border-gray-200 p-3">
					<p class="dark:text-dark-500 mb-2 text-gray-500">{invoice.content}</p>
					<div class="grid grid-cols-2">
						<div class="dark:border-dark-800 border-r border-gray-200 p-2 text-center">
							<h6 class="mb-1">{invoice.amount}</h6>
							<p class="dark:text-dark-500 text-gray-500">Total Amount</p>
						</div>
						<div class="p-2 text-center">
							<h6 class="mb-1">{invoice.dueDate}</h6>
							<p class="dark:text-dark-500 text-gray-500">Due Date</p>
						</div>
					</div>
				</div>
				<div class="mt-4">
					<div class="flex items-center gap-2">
						<img src={invoice.image} alt="" class="size-8 shrink-0 rounded-full" />
						<a href="#!" class="link link-primary grow font-medium !text-current"
							>{invoice.clientName}</a
						>
						<span
							class={`badge ${invoice.status === 'Paid' ? 'badge-green' : invoice.status === 'Unpaid' ? 'badge-pink' : invoice.status === 'Pending' ? 'badge-yellow' : 'badge-red'}`}
						>
							{invoice.status}
						</span>
					</div>
				</div>
			</CardBody>
		</Card>
	{/each}
</Grid>

{#if displayedInvoices.length === 0}
	<div class="!p-8 text-center">
		<TableRowNotFound />
	</div>
{/if}

{#if displayedInvoices.length > 0}
	<div class="mb-5 grid grid-cols-12 items-center gap-5">
		<div class="col-span-12 text-center lg:col-span-5 ltr:lg:text-left rtl:lg:text-right">
			<p class="dark:text-dark-500 text-gray-500">
				Showing <b>{(currentPage - 1) * itemsPerPage + 1}</b> -
				<b>{Math.min(currentPage * itemsPerPage, filteredInvoices.length)}</b>
				of <b>{invoices.length}</b> Results
			</p>
		</div>
		<div class="col-span-12 lg:col-span-7">
			<div class="pagination pagination-primary flex justify-center lg:justify-end">
				<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
					<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
					<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
					Prev
				</button>
				{#each Array(totalPages).fill(0) as _, page (page)}
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
		</div>
	</div>
{/if}

<DeleteComponent />
