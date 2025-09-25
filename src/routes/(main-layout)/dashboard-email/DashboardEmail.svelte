<script lang="ts">
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { emailListData, monthlyCampaign } from './dash-email';

	//charts
	import { options as labelApp } from './label-app';
	import { options as gradientDonut } from './gradient-donut';
	import { options as labelColumn } from './label-column';
	import { options as mailChart } from './mail-chart';
	import { options as timespend } from './timespend';

	// Declare reactive variables
	let searchTerm = '';
	let selectedItems: any[] = [];
	let sortBy = '';
	let sortDirection: 'asc' | 'desc' = 'asc';
	let currentPage = 1;
	let itemsPerPage = 8;
	let allSelected = false;
	let displayedEmails = [...emailListData];
	const totalPages = () => Math.ceil(displayedEmails.length / itemsPerPage);

	// Sorting function for each column
	const sort = (column: string) => {
		sortDirection = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
		sortBy = column;

		// Sort the emails based on the selected column
		displayedEmails = [...emailListData].sort((a: any, b: any) => {
			const valueA = a[column];
			const valueB = b[column];

			if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
			if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
		currentPage = 1;
	};

	// Filter emails based on the search term
	const filteredEmails = () => {
		displayedEmails = emailListData.filter((email) =>
			email.emailName.toLowerCase().includes(searchTerm.toLowerCase())
		);
		currentPage = 1;
	};

	// Pagination functions
	const prevPage = () => {
		if (currentPage > 1) currentPage--;
	};

	const nextPage = () => {
		if (currentPage < totalPages()) currentPage++;
	};

	const gotoPage = (page: number) => {
		currentPage = page;
	};

	// Showing start and end page numbers based on filtered and sorted emails
	const showingStart = () => (currentPage - 1) * itemsPerPage + 1;
	const showingEnd = () => Math.min(currentPage * itemsPerPage, displayedEmails.length);

	// Toggle email selection
	const toggleItem = (email: any) => {
		if (selectedItems.includes(email)) {
			selectedItems = selectedItems.filter((item) => item !== email);
		} else {
			selectedItems.push(email);
		}
	};

	// Select/Deselect all items
	const toggleAll = () => {
		if (allSelected) {
			selectedItems = [];
		} else {
			selectedItems = [...displayedEmails];
		}
		allSelected = !allSelected;
	};

	$: allSelected = selectedItems.length === displayedEmails.length;
	const isSelected = (email: any) => selectedItems.includes(email);

	// Delete selected items from the displayed list only
	const deleteSelectedItems = () => {
		if (selectedItems.length === 0) return;
		displayedEmails = displayedEmails.filter((email) => !selectedItems.includes(email));
		selectedItems = [];
		allSelected = false;
	};

	const exportTable = () => {
		let csvContent = 'data:text/csv;charset=utf-8,';

		// Add table headers
		const headers = Object.keys(displayedEmails[0]).join(',');
		csvContent += headers + '\n';

		// Add table rows
		displayedEmails.forEach((campaign) => {
			const values = Object.values(campaign).join(',');
			csvContent += values + '\n';
		});

		// Encode CSV content and create a download link
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', 'email.csv');
		document.body.appendChild(link);

		// Trigger the download
		link.click();
		document.body.removeChild(link);
	};

	// Create a writable store for animated counters
	function animatedCounter(target: number, duration: number) {
		const { subscribe, set } = writable(0);

		onMount(() => {
			let start = 0;
			const increment = (target - start) / duration;

			const interval = setInterval(() => {
				start += increment;
				if (start >= target) {
					clearInterval(interval);
					set(target);
				} else {
					set(Math.round(start));
				}
			}, 1);
		});

		return { subscribe };
	}

	// Define the animated counters
	let emailsSent = animatedCounter(48, 500);
	let avgClickRate = animatedCounter(32, 500);
	let openRate = animatedCounter(84, 500);
	let unsubscribeRate = animatedCounter(26, 500);
	let conversionRate = animatedCounter(1097, 500);
	let totalRevenue = animatedCounter(145, 500);
</script>

<!-- Emails Sent Card -->
<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 2 }} class="card">
	<CardBody>
		<p class="mb-2 text-gray-500">Emails Sent</p>
		<h5>
			<span>{$emailsSent}k</span>
			<LucideIcon name="TrendingUp" class="inline-block size-4 text-green-500 ltr:ml-1 rtl:mr-1" />
			<small class="dark:text-dark-500 text-sm font-normal text-gray-500">This year</small>
		</h5>
	</CardBody>
</Col>

<!-- Average Click Rate Card -->
<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 2 }} class="card">
	<CardBody>
		<p class="dark:text-dark-500 mb-2 text-gray-500">Average Click Rate</p>
		<h5>
			<span>{$avgClickRate}k</span>
			<LucideIcon name="TrendingUp" class="inline-block size-4 text-green-500 ltr:ml-1 rtl:mr-1" />
			<small class="dark:text-dark-500 text-sm font-normal text-gray-500">This year</small>
		</h5>
	</CardBody>
</Col>

<!-- Open Rate Card -->
<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 2 }} class="card">
	<CardBody>
		<p class="dark:text-dark-500 mb-2 text-gray-500">Open Rate</p>
		<h5>
			<span>{$openRate}%</span>
			<LucideIcon name="TrendingDown" class="inline-block size-4 text-red-500 ltr:ml-1 rtl:mr-1" />
			<small class="dark:text-dark-500 text-sm font-normal text-gray-500">This year</small>
		</h5>
	</CardBody>
</Col>

<!-- Unsubscribe Rate Card -->
<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 2 }} class="card">
	<CardBody>
		<p class="dark:text-dark-500 mb-2 text-gray-500">Unsubscribe</p>
		<h5>
			<span>{$unsubscribeRate}%</span>
			<LucideIcon name="TrendingDown" class="inline-block size-4 text-red-500 ltr:ml-1 rtl:mr-1" />
			<small class="dark:text-dark-500 text-sm font-normal text-gray-500">This year</small>
		</h5>
	</CardBody>
</Col>

<!-- Top Campaign Card -->
<Col
	cols={{ span: 12 }}
	xl={{ span: 4 }}
	class="card to-primary-500/15 relative overflow-hidden border-0 from-green-500/15 xl:row-span-2 ltr:bg-gradient-to-bl rtl:bg-gradient-to-br"
>
	<img
		src="/assets/images/dashboards/ecommerce/pattern.png"
		loading="lazy"
		alt=""
		class="absolute bottom-0 opacity-20 ltr:right-0 rtl:left-0"
	/>
	<CardBody class="relative">
		<h6 class="mb-5">Top Campaign</h6>

		<h5 class="mb-2 capitalize">
			Feeling embarrassed by your design skills? Here’s what you can do.
		</h5>
		<p class="dark:text-dark-500 mb-8 text-gray-500">29 June, 2024</p>

		<p class="mb-1">Conversion Rate</p>
		<h5>
			<span>{$conversionRate}</span>
			<LucideIcon name="TrendingDown" class="inline-block size-4 text-red-500 ltr:ml-1 rtl:mr-1" />
			<small class="text-sm font-normal text-gray-500">12.9% This year</small>
		</h5>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 8 }} class="card xl:row-span-2">
	<CardHeader class="flex flex-col gap-5 lg:flex-row lg:items-center">
		<CardTitle class="grow">Email Campaign Performance</CardTitle>
		<div class="dark:bg-dark-850 flex shrink-0 items-center gap-1 rounded-md bg-gray-100 p-1">
			<button
				type="button"
				class="dark:[&.active]:bg-dark-900 btn active px-3 py-1 text-xs [&.active]:bg-white"
				>Monthly</button
			>
			<button
				type="button"
				class="dark:[&.active]:bg-dark-900 btn px-3 py-1 text-xs [&.active]:bg-white">Weekly</button
			>
			<button
				type="button"
				class="dark:[&.active]:bg-dark-900 btn px-3 py-1 text-xs [&.active]:bg-white">Yearly</button
			>
		</div>
	</CardHeader>
	<CardBody>
		<div>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-gray-300']}
				darkColors={['bg-primary-500', 'bg-dark-600']}
				options={labelApp}
			/>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 4 }} class="card overflow-hidden">
	<div class="grid grid-cols-12">
		<div class="col-span-12 lg:col-span-8">
			<CardBody dir="ltr">
				<ApexChart
					class="!min-h-full"
					colors={['bg-primary-500', 'bg-red-500']}
					options={gradientDonut}
				/>
			</CardBody>
		</div>
		<div class="bg-primary-500 card-body col-span-12 !-m-[1px] text-center lg:col-span-4">
			<div dir="ltr">
				<ApexChart class="!min-h-full" colors={['bg-primary-200']} options={labelColumn} />
			</div>
			<p class="text-primary-100 mt-4">Total Revenue</p>
			<h5 class="text-white">$<span>{$totalRevenue}</span>M</h5>
		</div>
	</div>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 4 }} class="card xl:row-span-2">
	<CardHeader class="flex items-center gap-5">
		<CardTitle class="grow">Mail Statistics</CardTitle>
		<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
			<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
				<LucideIcon name="Ellipsis" class="size-5" />
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden p-2">
				<a href="/apps-event-overview" class="dropdown-item">
					<span>Weekly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Monthly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Yearly</span>
				</a>
			</DropdownMenu>
		</Dropdown>
	</CardHeader>
	<CardBody>
		<div dir="ltr">
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-red-500']}
				options={mailChart}
			/>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 4 }} class="card">
	<CardHeader class="flex items-center gap-5">
		<CardTitle class="grow">All Time Spending</CardTitle>
		<a href="#!" class="badge badge-sub-gray">
			See All
			<LucideIcon name="MoveRight" class="ml-0.5 size-4 ltr:inline-block rtl:hidden"></LucideIcon>
		</a>
	</CardHeader>
	<CardBody>
		<div class="grid grid-cols-12">
			<div class="col-span-6">
				<h5>7.4%</h5>
				<p class="dark:text-dark-500 text-gray-500">Conversion Rate</p>
			</div>
			<div class="col-span-6">
				<h5>48,759</h5>
				<p class="dark:text-dark-500 text-gray-500">Users</p>
			</div>
			<div class="col-span-12">
				<div dir="ltr">
					<ApexChart
						class="!min-h-full"
						colors={['bg-primary-500', 'bg-green-500']}
						options={timespend}
					/>
				</div>
			</div>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 4 }} class="card xl:row-span-2">
	<CardHeader class="flex items-center gap-5">
		<CardTitle class="grow">Monthly Campaign Stats</CardTitle>
		<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
			<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
				<LucideIcon name="Ellipsis" class="size-5" />
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden p-2">
				<a href="#!" class="dropdown-item">
					<span>Weekly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Monthly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Yearly</span>
				</a>
			</DropdownMenu>
		</Dropdown>
	</CardHeader>
	<CardBody>
		<div class="table-box overflow-x-auto">
			<table class="flush table-sm table">
				<tbody>
					{#each monthlyCampaign as stat}
						<tr>
							<td class="w-12">
								<div
									class={`flex size-9 items-center justify-center rounded-md ${stat.iconColor} ${stat.bgColor}`}
								>
									<LucideIcon name={stat.icon} class="size-5"></LucideIcon>
								</div>
							</td>
							<td>{stat.label}</td>
							<td>{stat.value}</td>
							<td class={`${stat.changeColor} font-medium`}>{stat.change}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 2 }} class="card">
	<CardBody class="card-body">
		<Dropdown class="dropdown float-end shrink-0" alignTo="right-bottom">
			<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
				<LucideIcon name="Ellipsis" class="size-5" />
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden p-2">
				<a href="/apps-event-overview" class="dropdown-item">
					<span>Weekly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Monthly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Yearly</span>
				</a>
			</DropdownMenu>
		</Dropdown>
		<p class="dark:text-dark-500 text-gray-500">Total Customers</p>
		<h5 class="mt-6 mb-1">1,32,603</h5>
		<p class="dark:text-dark-500 text-gray-500">
			<span class="text-green-500">0.5%</span> From last week
		</p>
	</CardBody>
</Col>
<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 2 }} class="card">
	<CardBody class="card-body">
		<Dropdown class="dropdown float-end shrink-0" alignTo="right-bottom">
			<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
				<LucideIcon name="Ellipsis" class="size-5" />
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden p-2">
				<a href="/apps-event-overview" class="dropdown-item">
					<span>Weekly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Monthly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Yearly</span>
				</a>
			</DropdownMenu>
		</Dropdown>
		<p class="dark:text-dark-500 text-gray-500">Bounce Rate</p>
		<h5 class="mt-6 mb-1">48,314</h5>
		<p class="dark:text-dark-500 text-gray-500">
			<span class="text-green-500">1.8%</span> From last week
		</p>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card">
	<div class="card-header gap-space grid grid-cols-12 items-center">
		<div class="col-span-12 lg:col-span-3">
			<h6 class="card-title grow">All Email Performance</h6>
		</div>
		<div class="col-span-12 lg:col-span-4 xl:col-start-9">
			<div class="gap-space flex items-center">
				{#if selectedItems.length > 0}
					<button class="btn btn-red btn-icon" on:click={deleteSelectedItems}>
						<LucideIcon name="Trash" class="size-4" />
					</button>
				{/if}

				<div class="group/form relative grow">
					<input
						type="text"
						class="form-input ltr:pl-9 rtl:pr-9"
						placeholder="Search ..."
						bind:value={searchTerm}
						on:input={filteredEmails}
					/>
					<button
						title="search-button"
						class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
					>
						<LucideIcon name="Search" class="size-4" />
					</button>
				</div>
				<button type="button" on:click={exportTable} class="btn btn-primary shrink-0">
					<LucideIcon name="Download" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Export
				</button>
			</div>
		</div>
	</div>

	<CardBody class="pt-0">
		<div class="table-box overflow-x-auto">
			<table class="table whitespace-nowrap">
				<thead>
					<tr class="dark:text-dark-500 dark:bg-dark-850 bg-gray-100 text-gray-500">
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
						<th on:click={() => sort('emailName')} class="cursor-pointer !font-medium"
							>Title
							{#if sortBy === 'emailName'}
								<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
							{/if}
						</th>
						<th on:click={() => sort('publishDate')} class="cursor-pointer !font-medium"
							>Publish Date
							{#if sortBy === 'publishDate'}
								<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
							{/if}
						</th>
						<th on:click={() => sort('sent')} class="cursor-pointer !font-medium"
							>Sent
							{#if sortBy === 'sent'}
								<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
							{/if}
						</th>
						<th on:click={() => sort('clickRate')} class="cursor-pointer !font-medium"
							>Click Rate (%)
							{#if sortBy === 'clickRate'}
								<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
							{/if}
						</th>
						<th on:click={() => sort('deliveredRate')} class="cursor-pointer !font-medium"
							>Delivered Rate
							{#if sortBy === 'deliveredRate'}
								<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
							{/if}
						</th>
						<th on:click={() => sort('spamReport')} class="cursor-pointer !font-medium"
							>Span Report Rate
							{#if sortBy === 'spamReport'}
								<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
							{/if}
						</th>
					</tr>
				</thead>
				<tbody>
					{#each displayedEmails.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as email, index}
						<tr>
							<td>
								<div class="input-check-group">
									<!-- svelte-ignore a11y-label-has-associated-control -->
									<label class="input-check-label hidden"></label>
									<input
										class="input-check input-check-primary"
										type="checkbox"
										checked={isSelected(email)}
										on:change={() => toggleItem(email)}
									/>
								</div>
							</td>
							<td>{email.emailName}</td>
							<td>{email.publishDate}</td>
							<td>{email.sent}</td>
							<td>{email.clickRate}</td>
							<td>{email.deliveredRate}</td>
							<td>{email.spamReport}</td>
						</tr>
					{/each}
					{#if displayedEmails.length === 0}
						<tr>
							<td colspan="10" class="!p-8">
								<TableRowNotFound />
							</td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>

		{#if displayedEmails.length > 0}
			<div class="mt-3 grid grid-cols-12 items-center gap-5">
				<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
					<p class="dark:text-dark-500 text-gray-500 ltr:pr-1 rtl:pl-1">
						Showing <b>{showingStart()}</b> - <b>{showingEnd()}</b> of
						<b>{displayedEmails.length}</b> Results
					</p>
					{#if selectedItems.length > 0}
						<span><b>{selectedItems.length}</b> Row Selected</span>
					{/if}
				</div>
				<div class="col-span-12 lg:col-span-6">
					<div class="pagination pagination-primary flex justify-center lg:justify-end">
						<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" /> Prev
						</button>
						{#each Array(totalPages()) as _, page (page)}
							<button
								on:click={() => gotoPage(page + 1)}
								class="pagination-item"
								class:active={currentPage === page + 1}
							>
								<span>{page + 1}</span>
							</button>
						{/each}
						<button
							on:click={nextPage}
							disabled={currentPage === totalPages()}
							class="pagination-next"
						>
							Next<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
						</button>
					</div>
				</div>
			</div>
		{/if}
	</CardBody>
</Col>
