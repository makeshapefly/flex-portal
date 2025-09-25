<script lang="ts">
	import { onMount } from 'svelte';
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import Impressions from './Impressions.svelte';
	import { campaignListData } from './campaign';
	import { boardingCampaign, TransactionsData } from './analytics-data';

	//charts
	import { options as adsRevenue } from '../widgets-charts/ads-revenue';
	import { options as salesRevenue } from '../widgets-charts/sales-revenue';
	import { options as averageOnline } from './average-online';
	import { options as averageSales } from './average-sales';
	import { options as webChart } from './web-chart';
	import { options as followerChart } from './follower-chart';
	import { options as browserChart } from './browser-chart';
	import { options as trafficChart } from './traffic-chart';

	let openTab = 1;

	const activeClasses = 'bg-white text-gray-800 dark:bg-dark-900 dark:text-dark-50';
	const inactiveClasses = 'hover:text-gray-800 dark:hover:text-dark-50';

	let counter1: number = 0; // Sales Revenue
	let counter2: number = 0; // Ads Revenue
	let counter3: number = 0; // New Users
	let counter4: number = 0; // Landing Products (Tab 1)
	let counter5: number = 0; // Admin Products (Tab 1)
	let counter6: number = 0; // Average Online Sales
	let counter7: number = 0; // Landing Products (Tab 3)
	let counter8: number = 0; // Admin Products (Tab 3)
	let counter9: number = 0; // Average Weekly Sales
	let pageViews1: number = 0; // Page Views (first counter)
	let pageViews2: number = 0; // Page Views (second counter)
	let pageViews3: number = 0; // Page Views (second counter)
	let visitBrowser: number = 0; // Visit Browser
	let visit: number = 0; // Visit

	// Data and pagination state
	let searchQuery: string = '';
	let displayedCampaigns = campaignListData;
	let sortBy = '';
	let sortDirection = '';
	let currentPage = 1;
	const itemsPerPage = 8;

	// Computed variables
	$: filteredCampaigns = campaignListData.filter((campaign) => {
		const lowerQuery = searchQuery.toLowerCase();
		return (
			campaign.campaignTitle.toLowerCase().includes(lowerQuery) ||
			campaign.clickRate.toLowerCase().includes(lowerQuery) ||
			campaign.revenue.toLowerCase().includes(lowerQuery) ||
			campaign.impressions.toString().includes(lowerQuery)
		);
	});

	// Displayed campaigns after filtering and pagination
	$: displayedCampaigns = filteredCampaigns.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	$: totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
	$: showingStart = (currentPage - 1) * itemsPerPage + 1;
	$: showingEnd = Math.min(currentPage * itemsPerPage, filteredCampaigns.length);

	// Sorting function
	function sort(property: string) {
		if (sortBy === property) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = property;
			sortDirection = 'asc';
		}

		displayedCampaigns = [...filteredCampaigns].sort((a: any, b: any) => {
			const valueA = a[property];
			const valueB = b[property];

			if (sortDirection === 'asc') {
				return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
			} else {
				return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
			}
		});
	}

	// Pagination functions
	function prevPage() {
		if (currentPage > 1) currentPage -= 1;
	}

	function nextPage() {
		if (currentPage < totalPages) currentPage += 1;
	}

	function gotoPage(page: number) {
		currentPage = page;
	}

	const exportTable = () => {
		let csvContent = 'data:text/csv;charset=utf-8,';

		// Add table headers
		const headers = Object.keys(displayedCampaigns[0]).join(',');
		csvContent += headers + '\n';

		// Add table rows
		displayedCampaigns.forEach((campaign) => {
			const values = Object.values(campaign).join(',');
			csvContent += values + '\n';
		});

		// Encode CSV content and create a download link
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', 'campaigns.csv');
		document.body.appendChild(link);

		// Trigger the download
		link.click();
		document.body.removeChild(link);
	};

	// Function to animate the counter
	function animateCounter(
		target: number,
		stepTime: number = 500,
		updateFn: (value: number) => void
	): void {
		let current = 0;
		const step = target / (stepTime / 50);

		// This function updates the counter value and calls the update function
		const interval = setInterval(() => {
			current += step;
			updateFn(Math.round(current));

			if (current >= target) {
				clearInterval(interval);
				updateFn(target);
			}
		}, 50);
	}

	onMount(() => {
		animateCounter(145, 500, (value: number) => (counter1 = value)); // Sales Revenue
		animateCounter(145, 500, (value: number) => (counter2 = value)); // Ads Revenue
		animateCounter(54, 500, (value: number) => (counter3 = value)); // New Users
		animateCounter(1154, 500, (value: number) => (counter4 = value)); // Landing Products (Tab 1)
		animateCounter(2387, 500, (value: number) => (counter5 = value)); // Admin Products (Tab 1)
		animateCounter(4321, 500, (value: number) => (counter6 = value)); // Average Online Sales
		animateCounter(46, 500, (value: number) => (counter7 = value)); // Landing Products (Tab 3)
		animateCounter(78, 500, (value: number) => (counter8 = value)); // Admin Products (Tab 3)
		animateCounter(1173, 500, (value: number) => (counter9 = value)); // Average Weekly Sales
		animateCounter(17415, 500, (value: number) => (pageViews1 = value)); // First page views counter
		animateCounter(2, 500, (value: number) => (pageViews2 = value)); // First page views minutes counter
		animateCounter(18, 500, (value: number) => (pageViews3 = value)); // First page views seconds counter
		animateCounter(4510, 500, (value: number) => (visitBrowser = value)); // First page views seconds counter
		animateCounter(3145, 500, (value: number) => (visit = value)); // First page views seconds counter
	});
</script>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card 2xl:col-span-4">
	<CardBody>
		<div class="mb-3 flex gap-3">
			<div
				class="text-primary-500 border-primary-400 dark:ring-offset-dark-900 ring-primary-500/20 flex size-12 items-center justify-center rounded-full border-2 ring-1 ring-offset-2"
			>
				<LucideIcon name="CircleArrowUp" class="fill-primary-500/10" />
			</div>
			<div>
				<p class="dark:text-dark-500 mb-1 text-gray-500">Sales Revenue</p>
				<h5>$<span>{counter1}</span>M</h5>
			</div>
		</div>
		<div dir="ltr">
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-primary-100', 'bg-primary-50', 'bg-primary-300']}
				options={salesRevenue}
			/>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card 2xl:col-span-4">
	<CardBody>
		<div class="mb-3 flex gap-3">
			<div
				class="dark:ring-offset-dark-900 flex size-12 items-center justify-center rounded-full border-2 border-red-400 text-red-500 ring-1 ring-red-500/20 ring-offset-2"
			>
				<LucideIcon name="Activity" class="fill-red-500/10" />
			</div>
			<div>
				<p class="dark:text-dark-500 mb-1 text-gray-500">Ads Revenue</p>
				<h5>$<span>{counter2}</span>M</h5>
			</div>
		</div>
		<div dir="ltr">
			<ApexChart class="!min-h-full" colors={['bg-red-500']} options={adsRevenue} />
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} class="card relative overflow-hidden 2xl:col-span-2">
	<div class="absolute inset-0">
		<Impressions />
	</div>
	<div class="card-body relative flex h-full flex-col">
		<p class="dark:text-dark-500 uppercase text-gray-500">Impressions</p>

		<div class="my-auto text-green-500">
			<LucideIcon name="ArrowUpFromDot" class="mx-auto" />
			<h4 class="mt-2 text-center">+39.7%</h4>
		</div>
		<p class="text-green-500">
			<LucideIcon name="Eye" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> 47,859
		</p>
	</div>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} class="card relative overflow-hidden 2xl:col-span-2">
	<div class="absolute inset-0">
		<Impressions setColor="sky" />
	</div>
	<div class="card-body relative flex h-full flex-col">
		<p class="dark:text-dark-500 uppercase text-gray-500">Clicks</p>

		<div class="my-auto text-sky-500">
			<LucideIcon name="MousePointerClick" class="mx-auto" />
			<h4 class="mt-2 text-center">+4.8%</h4>
		</div>
		<p class="text-sky-500">
			<LucideIcon name="Mouse" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> 15,487
		</p>
	</div>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card 2xl:col-span-3">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Performance</CardTitle>
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
		<div>
			<div>
				<ul class="dark:bg-dark-850 flex rounded-full bg-gray-100 p-1.5 *:grow">
					{#each [1, 2, 3] as tab}
						<li>
							<button
								on:click={() => (openTab = tab)}
								class={`link text-13 relative block rounded-full px-2 py-1 text-center font-medium ${openTab === tab ? activeClasses : inactiveClasses}`}
							>
								{tab === 1 ? 'New Users' : tab === 2 ? 'Online Sales' : 'Daily Sales'}
							</button>
						</li>
					{/each}
				</ul>

				<div class="mt-4 w-full">
					{#if openTab === 1}
						<div class="card">
							<div class="card-body">
								<div class="flex items-center gap-3">
									<div class="size-24 rounded-full">
										<img src="/assets/images/avatar/user-13.png" alt="" class="rounded-full" />
									</div>
									<div>
										<p class="dark:text-dark-500 text-13 mb-1 text-gray-500">Top User</p>
										<h6 class="mb-2">Jabari Mayer</h6>
										<p class="dark:text-dark-500 text-13 mb-1 text-gray-500">Daily Visits</p>
										<h6>244 Clicks</h6>
									</div>
								</div>
								<div class="dark:border-dark-800 mt-4 border-t border-dashed border-gray-200 pt-4">
									<div class="flex items-center gap-3">
										<div class="grow">
											<p class="dark:text-dark-500 text-13 mb-1 text-gray-500">New Users</p>
											<h5>+<span>{counter3}</span>M</h5>
										</div>
										<div class="shrink-0">
											<span class="inline-block font-medium text-green-500"
												><LucideIcon name="MoveUp" class="inline-block size-3" /> 9.63%</span
											>
										</div>
									</div>
								</div>
							</div>
						</div>
						<p class="dark:text-dark-500 text-center text-gray-500">
							Increase your email marketing by <span class="text-primary-500">41%</span> to reach your
							user acquisition and monthly targets.
						</p>
					{/if}

					{#if openTab === 2}
						<div class="gap-space grid grid-cols-12">
							<div
								class="dark:border-dark-800 col-span-6 rounded-md border border-dashed border-gray-200 p-3 text-center"
							>
								<p class="dark:text-dark-500 text-13 mb-1 text-gray-500">Landing Products</p>
								<h6><span>{counter4}</span>+</h6>
							</div>
							<div
								class="dark:border-dark-800 col-span-6 rounded-md border border-dashed border-gray-200 p-3 text-center"
							>
								<p class="dark:text-dark-500 text-13 mb-1 text-gray-500">Admin Products</p>
								<h6><span>{counter5}</span>+</h6>
							</div>
						</div>
						<p class="dark:text-dark-500 mb-1 mt-3 text-gray-500">Average Online Sales</p>
						<h5 class="mb-2"><span>{counter6}</span>+</h5>
						<div dir="ltr">
							<ApexChart class="!min-h-full" colors={['bg-sky-500']} options={averageOnline} />
						</div>
					{/if}

					{#if openTab === 3}
						<div class="gap-space grid grid-cols-12">
							<div
								class="dark:border-dark-800 col-span-6 rounded-md border border-dashed border-gray-200 p-3 text-center"
							>
								<p class="dark:text-dark-500 text-13 mb-1 text-gray-500">Landing Products</p>
								<h6><span>{counter7}</span>+</h6>
							</div>
							<div
								class="dark:border-dark-800 col-span-6 rounded-md border border-dashed border-gray-200 p-3 text-center"
							>
								<p class="dark:text-dark-500 text-13 mb-1 text-gray-500">Admin Products</p>
								<h6><span>{counter8}</span>+</h6>
							</div>
						</div>
						<p class="dark:text-dark-500 mb-1 mt-3 text-gray-500">Average Weekly Sales</p>
						<h5 class="mb-2"><span>{counter9}</span>+</h5>
						<div dir="ltr">
							<ApexChart class="!min-h-full" colors={['bg-sky-500']} options={averageSales} />
						</div>
					{/if}
				</div>
			</div>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card 2xl:col-span-9">
	<CardHeader class="flex flex-col gap-3 md:flex-row md:items-center">
		<CardTitle class="grow">Web Analytics</CardTitle>
		<div class="flex items-center gap-2">
			<a href="#!" class="link link-primary"
				><LucideIcon name="CircleDotDashed" class="text-primary-500 inline-block size-4" />
				<span class="align-middle leading-none">Referral</span></a
			>
			<a href="#!" class="link link-green"
				><LucideIcon name="CircleDotDashed" class="inline-block size-4 text-green-500" />
				<span class="align-middle leading-none">Direct</span></a
			>
			<a href="#!" class="link link-purple"
				><LucideIcon name="CircleDotDashed" class="inline-block size-4 text-purple-500" />
				<span class="align-middle leading-none">Ads</span></a
			>
		</div>
	</CardHeader>
	<CardBody>
		<div class="grid grid-cols-12 gap-3">
			<div class="col-span-12 sm:col-span-6 lg:col-span-3">
				<p class="dark:text-dark-500 text-gray-500">Page Views</p>
				<h5>
					<span>{pageViews1}</span>+
					<span class="text-xs text-green-500"
						><i class="ri-arrow-up-line align-baseline"></i> 4.5%</span
					>
				</h5>
			</div>
			<div class="col-span-12 sm:col-span-6 lg:col-span-3">
				<p class="dark:text-dark-500 text-gray-500">Page Views</p>
				<h5>
					<span>{pageViews2}</span>m <span>{pageViews3}</span>s
					<span class="text-xs text-red-500"
						><i class="ri-arrow-down-line align-baseline"></i> 0.9%</span
					>
				</h5>
			</div>
		</div>
		<div dir="ltr">
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-purple-500']}
				options={webChart}
			/>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">On Boarding Campaign</CardTitle>
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
		<div class="alert alert-purple mb-5">
			Help new customers appreciate the value they'll receive from your admin.
		</div>
		<div class="gap-space grid grid-cols-12">
			{#each boardingCampaign as stat}
				<div class="card col-span-12 mb-0 md:col-span-6">
					<div class="card-body">
						<p class="badge {stat.colorClass}">
							<i class="text-11 ri-circle-fill align-baseline"></i>
							{stat.label}
						</p>
						<h5 class="mt-3">{stat.value}</h5>
						<p class="dark:text-dark-500 text-gray-500">Last week</p>
					</div>
				</div>
			{/each}
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Recent Transactions</CardTitle>
		<a href="#!" class="link link-primary shrink-0"
			>See all <i class="ri-arrow-right-line align-baseline"></i></a
		>
	</CardHeader>
	<CardBody>
		<div class="overflow-x-auto">
			<table class="flush table whitespace-nowrap">
				<thead>
					<tr>
						<th class="dark:text-dark-500 !font-medium text-gray-500">Order Date</th>
						<th class="dark:text-dark-500 !font-medium text-gray-500">Product</th>
						<th class="dark:text-dark-500 !font-medium text-gray-500">Price</th>
						<th class="dark:text-dark-500 !font-medium text-gray-500">Status</th>
					</tr>
				</thead>
				<tbody>
					<!-- Loop over the data and render each row -->
					{#each TransactionsData as item, index}
						<tr class="">
							<td>{item.date}</td>
							<td>{item.name}</td>
							<td>{item.price}</td>
							<td>
								<!-- Add conditional classes based on the status -->
								<span class={item.status === 'Cancel' ? 'badge badge-red' : 'badge badge-green'}>
									{item.status}
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Followers</CardTitle>
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
		<div dir="ltr">
			<ApexChart
				class="-ml-space !min-h-full"
				colors={['bg-primary-500', 'bg-primary-200']}
				options={followerChart}
			/>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} class="card 2xl:col-span-2">
	<CardBody>
		<p class="dark:text-dark-500 text-13 mb-1 text-gray-500">Visit Browsers</p>
		<h5>
			<span>{visitBrowser}</span>+
			<span class="text-xs text-green-500"
				><i class="ri-arrow-up-line align-baseline"></i> 1.9%</span
			>
		</h5>
		<div dir="ltr">
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-orange-500', 'bg-yellow-500']}
				options={browserChart}
			/>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} class="card 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Traffic Source</CardTitle>
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
		<div dir="ltr">
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-gray-200']}
				options={trafficChart}
			/>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} class="card 2xl:col-span-3">
	<CardHeader>
		<CardTitle>Top Users (Contributors)</CardTitle>
	</CardHeader>
	<CardBody>
		<Simplebar class="-mx-space px-space h-36">
			<div class="space-y-3">
				<div class="flex items-center gap-3">
					<img
						src="/assets/images/avatar/user-18.png"
						loading="lazy"
						alt=""
						class="size-10 shrink-0 rounded-full"
					/>
					<div class="grow">
						<h6 class="mb-0.5">Julian Glover</h6>
						<p class="dark:text-dark-500 text-13 text-gray-500">78.4M Followers</p>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<img
						src="/assets/images/avatar/user-11.png"
						loading="lazy"
						alt=""
						class="size-10 shrink-0 rounded-full"
					/>
					<div class="grow">
						<h6 class="mb-0.5">Steve Powlowski</h6>
						<p class="dark:text-dark-500 text-13 text-gray-500">64.9M Followers</p>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<img
						src="/assets/images/avatar/user-14.png"
						loading="lazy"
						alt=""
						class="size-10 shrink-0 rounded-full"
					/>
					<div class="grow">
						<h6 class="mb-0.5">Della Brekke</h6>
						<p class="dark:text-dark-500 text-13 text-gray-500">63.2M Followers</p>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<img
						src="/assets/images/avatar/user-15.png"
						loading="lazy"
						alt=""
						class="size-10 shrink-0 rounded-full"
					/>
					<div class="grow">
						<h6 class="mb-0.5">Jerod Bernhard</h6>
						<p class="dark:text-dark-500 text-13 text-gray-500">59.3M Followers</p>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<img
						src="/assets/images/avatar/user-17.png"
						loading="lazy"
						alt=""
						class="size-10 shrink-0 rounded-full"
					/>
					<div class="grow">
						<h6 class="mb-0.5">Dominic Larkin</h6>
						<p class="dark:text-dark-500 text-13 text-gray-500">47.2M Followers</p>
					</div>
				</div>
			</div>
		</Simplebar>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} class="card 2xl:col-span-3">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Top Countries</CardTitle>
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
		<p class="dark:text-dark-500 text-gray-500">visit</p>
		<h5 class="mb-2">
			<span>{visit}</span>+
			<span class="text-xs text-green-500"
				><i class="ri-arrow-up-line align-baseline"></i> 3.87%</span
			>
		</h5>
		<div class="space-y-2">
			<div class="flex items-center gap-2">
				<img
					src="assets/images/flag/us.svg"
					loading="lazy"
					alt=""
					class="size-5 shrink-0 rounded-full object-cover"
				/>
				<h6 class="grow">United States</h6>
				<p class="shrink-0">24%</p>
			</div>
			<div class="flex items-center gap-2">
				<img
					src="assets/images/flag/de.svg"
					loading="lazy"
					alt=""
					class="size-5 shrink-0 rounded-full object-cover"
				/>
				<h6 class="grow">Germany</h6>
				<p class="shrink-0">17%</p>
			</div>
			<div class="flex items-center gap-2">
				<img
					src="assets/images/flag/it.svg"
					loading="lazy"
					alt=""
					class="size-5 shrink-0 rounded-full object-cover"
				/>
				<h6 class="grow">Italy</h6>
				<p class="shrink-0">16%</p>
			</div>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card">
	<CardHeader class="gap-space grid grid-cols-12 items-center">
		<div class="col-span-12 xl:col-span-3">
			<CardTitle>Campaigns Performance</CardTitle>
		</div>
		<div class="col-span-12 xl:col-span-4 xl:col-start-9">
			<div class="gap-space flex items-center">
				<div class="group/form relative grow">
					<input
						type="text"
						bind:value={searchQuery}
						class="form-input ltr:pl-9 ltr:group-[&.right]/form:pl-4 ltr:group-[&.right]/form:pr-9 rtl:pr-9 rtl:group-[&.right]/form:pl-9 rtl:group-[&.right]/form:pr-4"
						placeholder="Search for campaign etc..."
					/>
					<button
						title="search-button"
						class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:left-auto ltr:group-[&.right]/form:right-3 rtl:right-3 rtl:group-[&.right]/form:left-3 rtl:group-[&.right]/form:right-auto"
					>
						<LucideIcon name="Search" class="size-4" />
					</button>
				</div>
				<button type="button" class="btn btn-primary shrink-0" on:click={exportTable}
					><LucideIcon name="Download" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Export</button
				>
			</div>
		</div>
		<!--end col-->
	</CardHeader>
	<div class="card-body">
		<div class="overflow-x-auto">
			<table class="table whitespace-nowrap">
				<thead>
					<tr>
						<th class="cursor-pointer" on:click={() => sort('campaignTitle')}>
							Campaigns <span
								>{sortBy === 'campaignTitle' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
						<th class="cursor-pointer" on:click={() => sort('clickRate')}>
							Clicks <span
								>{sortBy === 'clickRate' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
						<th class="cursor-pointer" on:click={() => sort('deliveredRate')}>
							Delivered Rate (%) <span
								>{sortBy === 'deliveredRate' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
						<th class="cursor-pointer" on:click={() => sort('impressions')}>
							Impressions <span
								>{sortBy === 'impressions' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
						<th class="cursor-pointer" on:click={() => sort('cpc')}>
							CPC <span>{sortBy === 'cpc' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th class="cursor-pointer" on:click={() => sort('cr')}>
							CR <span>{sortBy === 'cr' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th class="cursor-pointer" on:click={() => sort('revenue')}>
							Revenue <span
								>{sortBy === 'revenue' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
					</tr>
				</thead>
				<tbody>
					{#if displayedCampaigns.length > 0}
						{#each displayedCampaigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as campaign}
							<tr>
								<td>{campaign.campaignTitle}</td>
								<td>{campaign.clickRate}</td>
								<td>{campaign.deliveredRate}</td>
								<td>{campaign.impressions}</td>
								<td>{campaign.cpc}</td>
								<td>{campaign.cr}</td>
								<td>{campaign.revenue}</td>
							</tr>
						{/each}
					{:else}
						<tr>
							<td colspan="10" class="!p-8">
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

		{#if displayedCampaigns.length > 0}
			<div class="gap-space mt-3 grid grid-cols-12 items-center">
				<div class="col-span-12 text-center lg:col-span-6 ltr:lg:text-left rtl:lg:text-right">
					<p class="text-gray-500">
						Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{campaignListData.length}</b> Results
					</p>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<div class="pagination pagination-primary flex justify-center lg:justify-end">
						<button on:click={prevPage} class="pagination-pre" disabled={currentPage === 1}>
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
							Prev
						</button>
						{#each Array(totalPages) as _, index (index)}
							<button
								class="pagination-item"
								on:click={() => gotoPage(index + 1)}
								class:active={currentPage === index + 1}
							>
								{index + 1}
							</button>
						{/each}
						<button
							class="pagination-next"
							on:click={nextPage}
							disabled={currentPage === totalPages}
						>
							Next
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</Col>
