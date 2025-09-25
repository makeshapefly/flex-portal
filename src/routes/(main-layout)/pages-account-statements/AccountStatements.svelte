<script lang="ts">
	import Account from '$lib/components/common/Account.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { accountStatement } from './statement';

	// Define types for the statement object
	let statements = accountStatement;
	let currentPage = 1;
	let itemsPerPage = 10;
	let sortBy = 'statementsID';
	let sortDirection = 'asc';

	// Function to handle sorting
	function sort(column: string) {
		if (sortBy === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = column;
			sortDirection = 'asc';
		}
		sortData();
	}

	// Sort data based on the selected column
	function sortData() {
		statements = [...accountStatement].sort((a: any, b: any) => {
			if (a[sortBy] < b[sortBy]) return sortDirection === 'asc' ? -1 : 1;
			if (a[sortBy] > b[sortBy]) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
	}

	// Pagination methods
	const totalPages = Math.ceil(statements.length / itemsPerPage);

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	function gotoPage(page: number) {
		currentPage = page;
	}

	// Pagination data
	$: showingStart = (currentPage - 1) * itemsPerPage + 1;
	$: showingEnd = Math.min(currentPage * itemsPerPage, statements.length);

	// Paginated data
	$: displayedProducts = statements.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);
</script>

<Account variant="statements" />

<Card class="mt-5">
	<CardHeader>
		<div class="flex flex-wrap items-center gap-3">
			<CardTitle class="grow">Earnings</CardTitle>
			<button data-modal-target="withdraw1Modal" class="btn btn-primary shrink-0"
				>Withdraw $5,879</button
			>
		</div>
	</CardHeader>
	<CardBody>
		<p class="dark:text-dark-500 mb-3 text-gray-500">
			Earnings calculated for the last <span class="text-primary-500 font-medium">30</span> days.
		</p>

		<Grid cols={1} gapX={3} class="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
			<Card>
				<CardBody class="text-center">
					<LucideIcon name="HandCoins" class="text-primary-500 fill-primary-100 mx-auto size-6" />
					<h6 class="mt-3 mb-1">$5,487</h6>
					<p class="dark:text-dark-500 text-gray-500">Net Earnings</p>
				</CardBody>
			</Card>
			<Card>
				<CardBody class="text-center">
					<LucideIcon name="Activity" class="mx-auto size-6 fill-red-100 text-red-500" />
					<h6 class="mt-3 mb-1">$296.81</h6>
					<p class="dark:text-dark-500 text-gray-500">Fees & Charges</p>
				</CardBody>
			</Card>
		</Grid>

		<div class="mb-5 flex items-center gap-3">
			<CardTitle class="grow">Statements</CardTitle>
			<Dropdown class="dropdown shrink-0">
				<DropdownButton
					class="dark:border-dark-800 link link-primary btn flex border-gray-200 px-3 py-1.5 text-xs"
					isChevron={true}
				>
					Filters
				</DropdownButton>
				<DropdownMenu class="dropdown-menu !fixed hidden p-2">
					<a href="#!" class="dropdown-item"> Date </a>
					<a href="#!" class="dropdown-item"> Amount </a>
				</DropdownMenu>
			</Dropdown>
		</div>

		<div>
			<div class="table-box overflow-x-auto">
				<table class="table">
					<thead>
						<tr class="dark:bg-dark-850 bg-gray-100">
							<th
								on:click={() => sort('statementsID')}
								class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
							>
								ID <span
									>{sortBy === 'statementsID' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th
								on:click={() => sort('date')}
								class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
							>
								Date <span>{sortBy === 'date' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
							</th>
							<th
								on:click={() => sort('name')}
								class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
							>
								Name <span>{sortBy === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
							</th>
							<th
								on:click={() => sort('details')}
								class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
							>
								Details <span
									>{sortBy === 'details' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th
								on:click={() => sort('totalAmount')}
								class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
							>
								Amount <span
									>{sortBy === 'totalAmount' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th
								class="dark:text-dark-500 !font-medium text-gray-500 ltr:!text-right rtl:!text-left"
								>Download Invoice</th
							>
						</tr>
					</thead>
					<tbody>
						{#each displayedProducts as product}
							<tr>
								<td><a href="#!">{product.statementsID}</a></td>
								<td>{product.date}</td>
								<td>{product.name}</td>
								<td>{product.details}</td>
								<td>{product.totalAmount}</td>
								<td class="ltr:text-right rtl:text-left">
									<a href="#!" class="btn btn-md btn-primary"
										><i class="ri-download-2-line align-bottom"></i> Download</a
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<div class="mt-5 grid grid-cols-12 items-center gap-5">
				<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
					<p class="dark:text-dark-500 text-gray-500">
						Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{statements.length}</b> Results
					</p>
				</div>
				<div class="col-span-12 md:col-span-6">
					<div class="pagination pagination-primary flex justify-center md:justify-end">
						<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
							<LucideIcon name="ChevronLeft" class="mr-1 size-5 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronRight" class="ml-1 size-5 ltr:hidden rtl:inline-block" />
							Prev
						</button>

						{#each Array(totalPages) as _, i}
							<button
								on:click={() => gotoPage(i + 1)}
								class:active={currentPage === i + 1}
								class="pagination-item"
							>
								<span>{i + 1}</span>
							</button>
						{/each}

						<button
							on:click={nextPage}
							disabled={currentPage === totalPages}
							class="pagination-next"
						>
							Next
							<LucideIcon name="ChevronRight" class="ml-1 size-5 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronLeft" class="mr-1 size-5 ltr:hidden rtl:inline-block" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</CardBody>
</Card>
