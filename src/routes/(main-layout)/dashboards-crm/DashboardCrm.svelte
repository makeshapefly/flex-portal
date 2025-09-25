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
	import AnalyticsCard from './AnalyticsCard.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import { options as salesChart } from './sales-chart';
	import { options as radial } from './radial';
	import { leadsListData, analyticsCartData, contracts } from './crm-dash';

	let leads = [...leadsListData];
	let displayedLeads = [...leadsListData];
	let currentPage = 1;
	let itemsPerPage = 8;
	let totalPages = Math.ceil(leads.length / itemsPerPage);
	let sortBy = '';
	let sortDirection = 'asc';
	let searchQuery = '';

	// Function to update the displayed leads based on the search query
	function searchLeads() {
		searchQuery = searchQuery.toLowerCase();
		getFilteredLeads();
	}

	// Function to filter leads based on search query
	function getFilteredLeads() {
		const filteredLeads = leads.filter((lead) => {
			return Object.values(lead).some((value) => String(value).toLowerCase().includes(searchQuery));
		});

		// Calculate total pages after filtering
		totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

		// Paginate the filtered leads
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		displayedLeads = filteredLeads.slice(start, end);
	}

	// Sorting function
	function sort(column: string) {
		if (sortBy === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = column;
			sortDirection = 'asc';
		}

		leads.sort((a: any, b: any) => {
			const valueA = a[column];
			const valueB = b[column];

			if (typeof valueA === 'string' && typeof valueB === 'string') {
				return sortDirection === 'asc'
					? valueA.localeCompare(valueB)
					: valueB.localeCompare(valueA);
			}

			if (typeof valueA === 'number' && typeof valueB === 'number') {
				return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
			}

			return 0;
		});

		getFilteredLeads();
	}

	// Pagination controls
	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
			getFilteredLeads();
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
			getFilteredLeads();
		}
	}

	function gotoPage(page: number) {
		currentPage = page;
		getFilteredLeads();
	}

	// Initialize the table display
	getFilteredLeads();

	// Function to animate the counter
	function animatedCounter(target: number) {
		const start = writable(0);
		let current = 0;

		// Determine the step size based on the magnitude of the number
		const stepSize = target > 10000 ? 1000 : 1;
		const duration = Math.max(500, Math.floor(2000 / Math.log10(target)));

		const stepInterval = duration / (target / stepSize);

		const interval = setInterval(() => {
			if (current < target) {
				// Ensure we don't overshoot the target by only incrementing in valid steps
				current = Math.min(current + stepSize, target);
				start.set(current);
			} else {
				clearInterval(interval);
			}
		}, stepInterval);

		return start;
	}

	// Create writable stores for each counter with dynamic speed
	let counter1 = animatedCounter(345121);
	let counter2 = animatedCounter(516871);
	let counter3 = animatedCounter(14596);
	let counter4 = animatedCounter(102450);
	let counter5 = animatedCounter(316);
	let counter6 = animatedCounter(287);
	let counter7 = animatedCounter(53629);
	let counter8 = animatedCounter(70);
</script>

<Col cols={{ span: 12 }}>
	<div class="mb-space" dir="ltr">
		<div>
			<h6 class="mb-1">Sales Analytics</h6>
			<p class="dark:text-dark-500 text-gray-500">
				Unlocking Insights and Driving Growth Through Data-Driven Sales Strategies
			</p>
		</div>
		<div class="mt-5 lg:-mt-8" dir="ltr">
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-pink-300', 'bg-sky-300', 'bg-slate-600']}
				options={salesChart}
			/>
		</div>
	</div>
</Col>

<Col
	cols={{ span: 12 }}
	class=" card bg-[url('/assets/images/dashboards/dashboard-patterm.png')] dark:bg-none"
>
	<Grid cols={12} gap={0}>
		{#each analyticsCartData as data}
			<AnalyticsCard analyticData={data} />
		{/each}
	</Grid>
</Col>

<Col cols={{ span: 12 }} class="card 2xl:col-span-5">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Deal Revenue Forecast</CardTitle>
		<a href="#!" class="link link-primary shrink-0"
			>View All <i class="ri-arrow-right-line align-baseline"></i></a
		>
	</CardHeader>
	<CardBody>
		<Grid cols={12} gapX="space">
			<Col cols={{ span: 12 }} md={{ span: 5 }}>
				<div dir="ltr">
					<ApexChart
						class="!min-h-full"
						options={radial}
						colors={['bg-slate-600', 'bg-slate-100']}
					/>
				</div>
			</Col>
			<Col cols={{ span: 12 }} md={{ span: 7 }}>
				<h6 class="mb-2">Team Goal</h6>
				<div class="space-y-4">
					<div>
						<div class="mb-2 flex items-center gap-3">
							<h6 class="grow text-xs">Marketing</h6>
							<h6 class="dark:text-dark-500 text-xs text-gray-500">$15,498/$80,000</h6>
						</div>
						<div class="progress-bar progress-1">
							<div class="progress-bar-wrap w-[26%] bg-sky-400 text-white"></div>
						</div>
					</div>
					<div>
						<div class="mb-2 flex items-center gap-3">
							<h6 class="grow text-xs">Sales Revenue</h6>
							<h6 class="dark:text-dark-500 text-xs text-gray-500">$44,000/$1,00,000</h6>
						</div>
						<div class="progress-bar progress-1">
							<div class="progress-bar-wrap w-[44%] bg-sky-400 text-white"></div>
						</div>
					</div>
					<div>
						<div class="mb-2 flex items-center gap-3">
							<h6 class="grow text-xs">Ads Revenue</h6>
							<h6 class="dark:text-dark-500 text-xs text-gray-500">$82,578/$1,50,000</h6>
						</div>
						<div class="progress-bar progress-1">
							<div class="progress-bar-wrap w-[67%] bg-sky-400 text-white"></div>
						</div>
					</div>
					<div>
						<div class="mb-2 flex items-center gap-3">
							<h6 class="grow text-xs">Digital Marketing</h6>
							<h6 class="dark:text-dark-500 text-xs text-gray-500">$1,57,000/$2,00,000</h6>
						</div>
						<div class="progress-bar progress-1">
							<div class="progress-bar-wrap w-[79%] bg-sky-400 text-white"></div>
						</div>
					</div>
				</div>
			</Col>
		</Grid>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Deals Open</CardTitle>
		<a href="#!" class="link link-primary shrink-0"
			>View More
			<LucideIcon name="ChevronRight" class="inline-block size-4 ltr:ml-0.5 rtl:mr-0.5"
			></LucideIcon>
		</a>
	</CardHeader>
	<CardBody>
		<Simplebar class="-mx-space px-space xl:h-52">
			<div class="flex flex-col gap-3">
				{#each contracts as contract}
					<div class="card mb-0">
						<div class="card-body">
							<div class="flex flex-col gap-3 md:flex-row">
								<div class="grow">
									<p class="dark:text-dark-500 mb-1 text-gray-500">Closing Date: {contract.date}</p>
									<h6><a href="#!">{contract.title}</a></h6>
									<div class="mt-3 flex items-center gap-2">
										<img
											src={contract.userImg}
											loading="lazy"
											alt="User Image {contract.userImg}"
											class="size-6 rounded-full"
										/>
										<p>{contract.userName}</p>
									</div>
								</div>
								<div class="shrink-0 md:ltr:text-right md:rtl:text-left">
									<h6 class="mb-1">{contract.amount}</h6>
									<span class="badge badge-sub-primary">{contract.status}</span>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</Simplebar>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card 2xl:col-span-3">
	<CardBody>
		<p class="text-primary-500 mb-3 font-medium">Upgrade to Premium</p>
		<h3 class="mb-2 capitalize">Make the best with the premium</h3>

		<div class="flex grow -space-x-2 rtl:space-x-reverse">
			<a href="#!" class="transition duration-300 ease-linear hover:z-10">
				<img
					class="dark:border-dark-900 size-7 rounded-full border-2 border-white"
					alt="User Images"
					loading="lazy"
					src="/assets/images/avatar/user-17.png"
				/>
			</a>
			<a href="#!" class="transition duration-300 ease-linear hover:z-10">
				<img
					class="dark:border-dark-900 size-7 rounded-full border-2 border-white"
					alt="User Images"
					loading="lazy"
					src="/assets/images/avatar/user-18.png"
				/>
			</a>
			<a href="#!" class="transition duration-300 ease-linear hover:z-10">
				<img
					class="dark:border-dark-900 size-7 rounded-full border-2 border-white"
					alt="User Images"
					loading="lazy"
					src="/assets/images/avatar/user-14.png"
				/>
			</a>
		</div>

		<div class="mt-16 mb-3 flex">
			<p class="dark:text-dark-500 text-13 grow text-gray-500">Pay Monthly</p>
			<h6 class="shrink-0">$19.99</h6>
		</div>
		<a
			href="/pages-pricing"
			class="dark:border-dark-800 btn btn-outline-gray w-full border-gray-200">Upgrade Now</a
		>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card">
	<Grid cols={12} gap="space" class="card-header lg:items-center">
		<div class="col-span-12 lg:col-span-3">
			<CardTitle>Leads (154)</CardTitle>
		</div>
		<div class="col-span-12 lg:col-span-6 lg:col-start-7 2xl:col-span-4 2xl:col-start-9">
			<div class="gap-space flex items-center">
				<div class="group/form relative grow">
					<input
						type="text"
						bind:value={searchQuery}
						on:input={searchLeads}
						class="form-input pl-9 group-[&.right]/form:pr-9 group-[&.right]/form:pl-4"
						placeholder="Search for ..."
					/>
					<button
						title="search-button"
						class="dark:text-dark-500 absolute inset-y-0 left-3 flex items-center text-gray-500 group-[&.right]/form:right-3 group-[&.right]/form:left-auto focus:outline-none"
					>
						<LucideIcon name="Search" class="size-4" />
					</button>
				</div>
				<button type="button" class="btn btn-primary shrink-0"
					><LucideIcon name="CirclePlus" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Add Lead</button
				>
			</div>
		</div>
		<!--end col-->
	</Grid>

	<div class="card-body pt-0">
		<div class="table-box overflow-x-auto">
			<table class="table whitespace-nowrap">
				<thead>
					<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
						<th on:click={() => sort('leadName')} class="cursor-pointer">
							Lead Name
							<span>{sortBy === 'leadName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th on:click={() => sort('rating')} class="cursor-pointer">
							Rating
							<span>{sortBy === 'rating' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th on:click={() => sort('date')} class="cursor-pointer">
							Date
							<span>{sortBy === 'date' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th on:click={() => sort('contact')} class="cursor-pointer">
							Contact
							<span>{sortBy === 'contact' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th on:click={() => sort('leadSource')} class="cursor-pointer">
							Lead Source
							<span>{sortBy === 'leadSource' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th on:click={() => sort('leadStatus')} class="cursor-pointer">
							Lead Status
							<span>{sortBy === 'leadStatus' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th on:click={() => sort('totalBalance')} class="cursor-pointer">
							Total Balance
							<span>{sortBy === 'totalBalance' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{#if displayedLeads.length > 0}
						{#each displayedLeads as lead}
							<tr>
								<td>{lead.leadName}</td>
								<td><i class="ri-star-fill align-baseline text-yellow-500"></i> ({lead.rating})</td>
								<td>{lead.date}</td>
								<td>{lead.contact}</td>
								<td><span class="badge badge-gray">{lead.leadSource}</span></td>
								<td>
									<span
										class="badge"
										class:badge-sky={lead.leadStatus === 'New'}
										class:badge-green={lead.leadStatus === 'Contacted'}
										class:badge-yellow={lead.leadStatus === 'Interested'}
										class:badge-red={lead.leadStatus === 'Closed'}
										class:badge-purple={lead.leadStatus === 'Negotiation'}
									>
										{lead.leadStatus}
									</span>
								</td>
								<td>{lead.totalBalance}</td>
							</tr>
						{/each}
					{:else}
						<tr>
							<td colspan="7" class="!p-8e">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									class="mx-auto size-12"
									viewBox="0 0 48 48"
								>
									<linearGradient
										id="SVGID_1__h35ynqzIJzH4_gr1"
										x1="34.598"
										x2="15.982"
										y1="15.982"
										y2="34.598"
										gradientUnits="userSpaceOnUse"
									>
										<stop offset="0" stop-color="#60e8fe"></stop>
										<stop offset=".033" stop-color="#6ae9fe"></stop>
										<stop offset=".197" stop-color="#97f0fe"></stop>
										<stop offset=".362" stop-color="#bdf5ff"></stop>
										<stop offset=".525" stop-color="#dafaff"></stop>
										<stop offset=".687" stop-color="#eefdff"></stop>
										<stop offset=".846" stop-color="#fbfeff"></stop>
										<stop offset="1" stop-color="#fff"></stop>
									</linearGradient>
									<path
										fill="url(#SVGID_1__h35ynqzIJzH4_gr1)"
										d="M40.036,33.826L31.68,25.6c0.847-1.739,1.335-3.684,1.335-5.748c0-7.27-5.894-13.164-13.164-13.164	S6.688,12.582,6.688,19.852c0,7.27,5.894,13.164,13.164,13.164c2.056,0,3.995-0.485,5.728-1.326l3.914,4.015l4.331,4.331	c1.715,1.715,4.496,1.715,6.211,0C41.751,38.321,41.751,35.541,40.036,33.826z"
									></path>
									<path
										fill="none"
										stroke="#10cfe3"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-miterlimit="10"
										stroke-width="3"
										d="M31.95,25.739l8.086,8.086c1.715,1.715,1.715,4.496,0,6.211l0,0c-1.715,1.715-4.496,1.715-6.211,0	l-4.331-4.331"
									></path>
									<path
										fill="none"
										stroke="#10cfe3"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-miterlimit="10"
										stroke-width="3"
										d="M7.525,24.511c-1.771-4.694-0.767-10.196,3.011-13.975c3.847-3.847,9.48-4.817,14.228-2.912"
									></path>
									<path
										fill="none"
										stroke="#10cfe3"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-miterlimit="10"
										stroke-width="3"
										d="M30.856,12.603c3.376,5.114,2.814,12.063-1.688,16.565c-4.858,4.858-12.565,5.129-17.741,0.814"
									></path>
								</svg>
								<p class="dark:text-dark-500 mt-2 text-center text-gray-500">
									No matching records found
								</p>
							</td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>

		<div
			class="gap-space mt-space grid grid-cols-12 items-center"
			class:hidden={displayedLeads.length === 0}
		>
			<div class="col-span-12 text-center lg:col-span-6 lg:ltr:text-left lg:rtl:text-right">
				<p class="dark:text-dark-500 text-gray-500">
					Showing <b>{(currentPage - 1) * itemsPerPage + 1}</b> -
					<b>{Math.min(currentPage * itemsPerPage, leads.length)}</b>
					of <b>{leads.length}</b> Results
				</p>
			</div>
			<div class="col-span-12 lg:col-span-6">
				<div class="pagination pagination-primary flex justify-center gap-2 lg:justify-end">
					<button on:click={prevPage} class="pagination-pre" disabled={currentPage === 1}
						><LucideIcon
							name="ChevronLeft"
							class="mr-1 size-4 ltr:inline-block rtl:hidden"
						/>Prev</button
					>
					{#each Array(totalPages).fill(0) as _, i}
						<button
							on:click={() => gotoPage(i + 1)}
							class="pagination-item {currentPage === i + 1 ? 'active' : ''}">{i + 1}</button
						>
					{/each}
					<button on:click={nextPage} class="pagination-next" disabled={currentPage === totalPages}
						>Next<LucideIcon
							name="ChevronRight"
							class="ml-1 size-4 ltr:inline-block rtl:hidden"
						/></button
					>
				</div>
			</div>
		</div>
	</div>
</Col>
