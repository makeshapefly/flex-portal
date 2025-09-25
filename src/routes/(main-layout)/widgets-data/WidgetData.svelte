<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { commanProducts } from './data-product';
	import { invoiceData } from './data';

	let invoices = invoiceData;
	let sortBy: string = '';
	let sortDirection: 'asc' | 'desc' = 'asc';
	let products = commanProducts;

	// Function to sort the table based on column
	function sort(column: string) {
		sortDirection = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
		sortBy = column;

		invoices = [...invoices].sort((a: any, b: any) => {
			if (a[column] < b[column]) return sortDirection === 'asc' ? -1 : 1;
			if (a[column] > b[column]) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
	}
</script>

<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card">
		<CardHeader class="flex items-center">
			<CardTitle class="grow">Top Products</CardTitle>
			<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
				<DropdownButton
					isChevron={true}
					class="dark:border-dark-800 link link-primary btn flex border-gray-200 px-3 py-1.5 text-xs"
				>
					Filters
				</DropdownButton>

				<DropdownMenu class="dropdown-menu !fixed hidden p-2">
					<a href="#!" class="dropdown-item"> Amount </a>
					<a href="#!" class="dropdown-item"> Revenue </a>
					<a href="#!" class="dropdown-item"> Rating </a>
				</DropdownMenu>
			</Dropdown>
		</CardHeader>

		<CardBody>
			<div class="overflow-x-auto">
				<table class="flush table">
					<thead>
						<tr class="dark:bg-dark-850 bg-gray-100">
							<th class="dark:text-dark-500 !font-medium whitespace-nowrap text-gray-500"
								>Product</th
							>
							<th class="dark:text-dark-500 !font-medium whitespace-nowrap text-gray-500">Sales</th>
							<th class="dark:text-dark-500 !font-medium whitespace-nowrap text-gray-500"
								>Price Unit</th
							>
							<th class="dark:text-dark-500 !font-medium whitespace-nowrap text-gray-500">Stock</th>
							<th class="dark:text-dark-500 !font-medium whitespace-nowrap text-gray-500"
								>Revenue</th
							>
							<th class="dark:text-dark-500 !font-medium whitespace-nowrap text-gray-500">Rating</th
							>
						</tr>
					</thead>
					<tbody>
						{#each products as product}
							<tr class="*:px-3 *:py-2.5">
								<td class="whitespace-nowrap">
									<div class="flex items-center gap-2">
										<div
											class="dark:border-dark-800 flex size-9 items-center justify-center rounded border border-gray-200 p-1"
										>
											<img src={product.image} alt={product.productName} class="rounded" />
										</div>
										<h6>{product.productName}</h6>
									</div>
								</td>
								<td class="whitespace-nowrap">{product.salesUnit}</td>
								<td class="whitespace-nowrap">{product.price}</td>
								<td class="whitespace-nowrap">{product.stock}</td>
								<td class="whitespace-nowrap">{product.revenue}</td>
								<td class="whitespace-nowrap">
									<i class="ri-star-line text-yellow-500"></i>
									<span class="dark:text-dark-500 align-middle text-gray-500">{product.rating}</span
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card">
		<CardHeader class="flex items-center">
			<CardTitle class="grow">Recent Invoice</CardTitle>
			<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
				<DropdownButton
					isChevron={true}
					class="dark:border-dark-800 link link-primary btn flex border-gray-200 px-3 py-1.5 text-xs"
				>
					Filters
				</DropdownButton>

				<DropdownMenu class="dropdown-menu !fixed hidden p-2">
					<a href="#!" class="dropdown-item"> Amount </a>
					<a href="#!" class="dropdown-item"> Revenue </a>
					<a href="#!" class="dropdown-item"> Rating </a>
				</DropdownMenu>
			</Dropdown>
		</CardHeader>

		<CardBody>
			<div>
				<div class="overflow-x-auto">
					<table class="flush table">
						<thead>
							<tr class="dark:bg-dark-850 bg-gray-100">
								<th
									class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
									on:click={() => sort('invoiceID')}
								>
									Invoice ID <span
										>{sortBy === 'invoiceID' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th
									class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
									on:click={() => sort('client')}
								>
									Client <span
										>{sortBy === 'client' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th
									class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
									on:click={() => sort('dateDue')}
								>
									Due Date <span
										>{sortBy === 'dateDue' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th
									class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
									on:click={() => sort('totalAmount')}
								>
									Total <span
										>{sortBy === 'totalAmount' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th
									class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
									on:click={() => sort('status')}
								>
									Status <span
										>{sortBy === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
							</tr>
						</thead>
						<tbody>
							{#each invoices as product, index}
								<tr class="*:px-3 *:py-2.5">
									<td class="whitespace-nowrap">
										<a href="#!">{product.invoiceID}</a>
									</td>
									<td class="whitespace-nowrap">{product.client}</td>
									<td class="whitespace-nowrap">{product.dateDue}</td>
									<td class="whitespace-nowrap">{product.totalAmount}</td>
									<td class="whitespace-nowrap">
										<span
											class={product.status === 'Pending'
												? 'badge badge-yellow'
												: product.status === 'Successful'
													? 'badge badge-green'
													: 'badge badge-blue'}
										>
											{product.status}
										</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</CardBody>
	</Col>
</Grid>
