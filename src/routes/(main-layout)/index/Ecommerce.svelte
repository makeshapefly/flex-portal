<script lang="ts">
	import { onMount } from 'svelte';
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Tooltip from '$lib/components/ui/tooltip/Tooltip.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import VectorMap from '$lib/components/common/vectorMap.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import { productStockList } from './product-stock';

	import { options as expenseDonut } from './expense-donut';
	import { options as basicColumnapp } from './basic-columnapp';
	import { options as netProfitChart } from './net-profit-chart';
	import { options as markerMap } from './marker-map';
	import { options as traffic } from './traffic';
	import TippyTooltip from '$lib/components/ui/tooltip/TippyTooltip.svelte';

	let salesAmount = 4878;
	let performancePercentage = 49;

	let salesCounter = 0;
	let performanceCounter = 0;

	let expenseAmount = 18725;
	let expenseCounter = 0;

	let salesProfit = 25874;
	let salesProfitCounter = 0;

	let netProfit = 245;
	let netProfitCounter = 0;

	interface Product {
		productName: string;
		stock: number;
		price: string;
		status: string;
		productsID?: string;
	}

	let displayedProducts: Product[] = [];
	let currentPage = 1;
	const itemsPerPage = 8;
	let totalPages = Math.ceil(productStockList.length / itemsPerPage);
	let sortBy: string = '';
	let sortDirection: 'asc' | 'desc' = 'asc';
	let openTab = 1;

	// Initialize products with ID
	let startID = 1478;
	displayedProducts = productStockList.map((product, index) => {
		return {
			...product,
			productsID: `PEP-${startID + index}`
		};
	});

	function sort(field: string) {
		if (sortBy === field) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = field;
			sortDirection = 'asc';
		}

		displayedProducts = displayedProducts.sort((a: any, b: any) => {
			if (a[field] < b[field]) return sortDirection === 'asc' ? -1 : 1;
			if (a[field] > b[field]) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	function gotoPage(page: number) {
		currentPage = page;
	}

	// Calculate the products to display based on the current page
	$: displayedProductsOnPage = displayedProducts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	$: showingStart = (currentPage - 1) * itemsPerPage + 1;
	$: showingEnd = Math.min(currentPage * itemsPerPage, displayedProducts.length);

	// Function to animate the counter
	const animateCounter = (targetValue: number, setCounter: (value: number) => void) => {
		const increment = Math.ceil(targetValue / 100); // Increment step
		let currentValue = 0;

		const interval = setInterval(() => {
			if (currentValue < targetValue) {
				currentValue += increment;
				if (currentValue > targetValue) currentValue = targetValue;
				setCounter(currentValue);
			} else {
				clearInterval(interval);
			}
		}, 10);
	};

	// Start the counter animation when the component mounts
	onMount(() => {
		animateCounter(salesAmount, (value: number) => (salesCounter = value));
		animateCounter(performancePercentage, (value: number) => (performanceCounter = value));
		animateCounter(expenseAmount, (value: number) => (expenseCounter = value));
		animateCounter(salesProfit, (value: number) => (salesProfitCounter = value));
		animateCounter(netProfit, (value: number) => (netProfitCounter = value));
	});

	const users = [
		{ name: 'Leal Bureau', img: '/assets/images/avatar/user-20.png' },
		{ name: 'Julie Seltzer', img: '/assets/images/avatar/user-18.png' },
		{ name: 'Julie Seltzer', img: '/assets/images/avatar/user-8.png' },
		{ name: 'Alex Smith', img: '/assets/images/avatar/user-5.png' },
		{ name: 'John Doe', img: '/assets/images/avatar/user-6.png' }
	];

	const products = [
		{
			id: 1,
			image: '/assets/images/products/img-05.png',
			title: 'Sleeve Clothing Leggings',
			link: '/apps-ecommerce-product-overview',
			price: 22.0,
			stars: 4.5
		},
		{
			id: 2,
			image: 'assets/images/products/img-06.png',
			title: 'Bra Lace Crop top',
			link: '/apps-ecommerce-product-overview',
			price: 29.99,
			stars: 5
		},
		{
			id: 3,
			image: '/assets/images/products/img-08.png',
			title: 'Tote bag Leather Handbag Dolce',
			link: '/apps-ecommerce-product-overview',
			price: 79.99,
			stars: 5
		},
		{
			id: 4,
			image: '/assets/images/products/img-11.png',
			title: 'Sneakers Shoe Nike Basketball',
			link: '/apps-ecommerce-product-overview',
			price: 32.0,
			stars: 4.5
		}
	];

	function renderStars(stars) {
		const full = Math.floor(stars);
		const half = stars % 1 !== 0;
		return { full, half };
	}

	const markers = [
		{ name: 'Brazil', coords: [-14.235, -51.9253] },
		{ name: 'Russia', coords: [61.524, 105.3188] },
		{ name: 'China', coords: [35.8617, 104.1954] }
	];
	const selectedMarkers = [1];
	const mapOptions = {
		markers: [
			{
				name: 'Brazil',
				coords: [-14.235, -51.9253]
			},
			{
				name: 'Russia',
				coords: [61.524, 105.3188]
			},
			{
				name: 'China',
				coords: [35.8617, 104.1954]
			}
		],
		labels: {
			markers: {
				render: (marker) => marker.name
			}
		},
		selectedMarkers: [1]
	};
</script>

<Col cols={{ span: 12 }} class="card relative order-1 2xl:col-span-8">
	<CardBody>
		<h6 class="card-title mb-2">Welcome Back Shopia Mia</h6>
		<p class="dark:text-dark-500 text-gray-500">
			You have earned 49% more than last month which is great thing.
		</p>

		<Grid cols={12} class="mt-12 mb-5 md:mb-0">
			<div
				class="dark:border-dark-800 col-span-6 border-gray-200 md:col-span-4 lg:col-span-2 ltr:border-r rtl:border-l"
			>
				<h6 class="mb-1.5">
					$<span>{Math.round(salesCounter)}</span>
					<LucideIcon name="TrendingUp" class="ml-1 inline-block size-4 text-green-500" />
				</h6>
				<p class="dark:text-dark-500 text-gray-500">Today's Sales</p>
			</div>

			<div class="col-span-6 md:col-span-4 lg:col-span-3 ltr:pl-5 rtl:pr-5">
				<h6 class="mb-1.5">
					<span>{Math.round(performanceCounter)}</span>%
					<LucideIcon name="TrendingUp" class="ml-1 inline-block size-4 text-green-500" />
				</h6>
				<p class="dark:text-dark-500 text-gray-500">Overall Performance</p>
			</div>
		</Grid>
		<div class="absolute bottom-0 hidden lg:block ltr:right-0 rtl:left-0">
			<div
				class="dark:from-dark-900 absolute inset-0 from-white ltr:bg-gradient-to-r rtl:bg-gradient-to-l"
			></div>
			<img
				src="/assets/images/dashboards/ecommerce/pattern.png"
				alt=""
				loading="lazy"
				class="h-32"
			/>
		</div>
		<img
			src="/assets/images/dashboards/ecommerce/img-01.png"
			alt=""
			loading="lazy"
			class="bottom-2 mx-auto md:absolute ltr:right-5 rtl:left-5"
		/>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 3 }} class="card order-2 2xl:col-span-2">
	<CardBody>
		<p class="dark:text-dark-500 mb-1 text-gray-500">Expense</p>
		<h6 class="text-16">$<span>{expenseCounter}</span></h6>
		<p class="dark:text-dark-500 mb-4 text-sm text-gray-500">
			<span class="font-medium text-green-500">2.87</span> This month
		</p>
		<div dir="ltr">
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500']}
				options={expenseDonut}
			/>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 3 }} class="card order-3 2xl:col-span-2">
	<CardBody>
		<div
			class="mb-4 flex size-12 items-center justify-center rounded-md bg-orange-500/10 text-orange-500"
		>
			<LucideIcon name="ShoppingCart" class="size-5" />
		</div>
		<p class="dark:text-dark-500 mb-3 text-gray-500">Sales Profit</p>
		<h6 class="text-16 mb-1">$<span>{salesProfitCounter}</span></h6>
		<p class="dark:text-dark-500 text-sm text-gray-500">
			<span class="font-medium text-green-500">2.87</span> This month
		</p>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card order-6 2xl:order-4 2xl:col-span-8 2xl:row-span-2">
	<CardHeader class="gap-space flex flex-col md:flex-row md:items-center">
		<CardTitle class="grow">Product Sales</CardTitle>
		<div class="flex shrink-0 flex-wrap items-center gap-2">
			<button type="button" class="btn btn-primary px-3 py-1.5">All</button>
			<button
				type="button"
				class="btn btn-outline-gray dark:border-dark-800 border-gray-200 px-3 py-1.5">Weekly</button
			>
			<button
				type="button"
				class="btn btn-outline-gray dark:border-dark-800 border-gray-200 px-3 py-1.5"
				>Monthly</button
			>
			<button
				type="button"
				class="btn btn-outline-gray dark:border-dark-800 border-gray-200 px-3 py-1.5">Yearly</button
			>
		</div>
	</CardHeader>
	<CardBody>
		<div dir="ltr">
			<ApexChart class="h-full" options={basicColumnapp} colors={['bg-red-200', 'bg-sky-500']} />
		</div>
	</CardBody>
</Col>

<Col
	cols={{ span: 12 }}
	md={{ span: 6 }}
	xl={{ span: 3 }}
	class="card order-4 2xl:order-5 2xl:col-span-2"
>
	<CardBody>
		<div class="flex gap-2">
			<LucideIcon name="Video" class="fill-primary-500/10 text-primary-500 size-5" />
			<div>
				<h6 class="mb-1">Daily Meeting</h6>
				<p class="dark:text-dark-500 text-xs text-gray-500">10+ Person</p>
			</div>
		</div>
		<div class="mt-5 flex -space-x-3 rtl:space-x-reverse">
			{#each users.slice(0, 3) as user}
				<TippyTooltip content={user.name} img={user.img} color="size-7"></TippyTooltip>
			{/each}
			{#if users.length > 3}
				<a
					href="#!"
					class="dark:bg-dark-850 flex size-7 items-center justify-center rounded-full bg-gray-100 text-xs transition duration-300 ease-linear hover:z-10"
				>
					{users.length - 3}+
				</a>
			{/if}
		</div>
		<p class="dark:text-dark-500 mt-3 mb-2 text-gray-500">They will product the meeting</p>
		<button type="button" class="btn btn-primary w-full">Click to meeting</button>
	</CardBody>
</Col>

<Col
	cols={{ span: 12 }}
	md={{ span: 6 }}
	xl={{ span: 3 }}
	class="card order-5 2xl:order-6 2xl:col-span-2"
>
	<CardBody>
		<p class="dark:text-dark-500 mb-3 text-gray-500">Net Profit</p>
		<h6 class="text-16 mb-1">
			$<span>{netProfitCounter}</span>M
		</h6>
		<div>
			<ApexChart
				class="mb-0 h-full"
				colors={['bg-primary-500', 'bg-green-500']}
				options={netProfitChart}
			/>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card order-7 2xl:col-span-4">
	<CardBody>
		<Dropdown class="dropdown float-end">
			<DropdownButton
				isChevron={true}
				class="dark:border-dark-800 link link-primary btn flex border-gray-200 px-3 py-1.5 text-xs font-medium"
			>
				Recent
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden p-2">
				<a href="#!" class="dropdown-item">
					<span>Recent</span>
				</a>

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
		<h5 class="mb-1.5 flex items-center gap-2">
			8,956 <span class="badge badge-sub-green leading-4"
				><LucideIcon
					name="TrendingUp"
					class="inline-block size-4 text-green-500 ltr:mr-1 rtl:ml-1"
				/> 2.87</span
			>
		</h5>
		<p class="dark:text-dark-500 mb-8 text-gray-500">Orders this month</p>
		<div class="progress-bar progress-2">
			<div class="progress-bar-wrap w-1/2 bg-green-500 text-white"></div>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card order-8 2xl:col-span-8 2xl:row-span-2">
	<CardHeader class="flex items-center gap-3">
		<h6 class="card-title grow">Product Stock</h6>
		<Dropdown class="dropdown shrink-0">
			<DropdownButton
				isChevron={true}
				class="dark:border-dark-800 link link-primary btn flex border-gray-200 px-3 py-1.5 text-xs font-medium"
			>
				Recent
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden p-2">
				<a href="#!" class="dropdown-item">
					<span>Recent</span>
				</a>

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
	<CardBody class="pt-0">
		<div class="table-box overflow-x-auto">
			<table class="table whitespace-nowrap">
				<thead>
					<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
						<th on:click={() => sort('productsID')} class="cursor-pointer !font-medium"
							>Product Code
							<span>{sortBy === 'productsID' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th on:click={() => sort('productName')} class="cursor-pointer !font-medium"
							>Item
							<span>{sortBy === 'productName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th on:click={() => sort('stock')} class="cursor-pointer !font-medium"
							>Qty Left
							<span>{sortBy === 'stock' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th on:click={() => sort('status')} class="cursor-pointer !font-medium"
							>Status
							<span>{sortBy === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th on:click={() => sort('price')} class="cursor-pointer !font-medium"
							>Price
							<span>{sortBy === 'price' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{#if displayedProductsOnPage.length > 0}
						{#each displayedProductsOnPage as product}
							<tr>
								<td>{product.productsID}</td>
								<td><a href="/apps-ecommerce-product-overview">{product.productName}</a></td>
								<td>{product.stock}</td>
								<td>
									<span
										class={product.status === 'In Stock'
											? 'badge badge-purple'
											: product.status === 'Low Stock'
												? 'badge badge-yellow'
												: 'badge badge-red'}
									>
										{product.status}
									</span>
								</td>
								<td>{product.price}</td>
							</tr>
						{/each}
					{:else}
						<tr>
							<td colspan="10" class="!p-8">
								<TableRowNotFound />
							</td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>

		{#if displayedProductsOnPage.length > 0}
			<div class="gap-space mt-space grid grid-cols-12 items-center">
				<div class="col-span-12 text-center lg:col-span-6 lg:ltr:text-left lg:rtl:text-right">
					<p class="dark:text-dark-500 text-gray-500">
						Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of
						<b>{displayedProducts.length}</b>
						Results
					</p>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<div class="pagination pagination-primary flex justify-center gap-2 lg:justify-end">
						<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
							Prev
						</button>
						{#each Array(totalPages) as _, index (index)}
							<button
								class="pagination-item {currentPage === index + 1 ? 'active' : ''}"
								on:click={() => gotoPage(index + 1)}
							>
								{index + 1}
							</button>
						{/each}
						<button
							on:click={nextPage}
							disabled={currentPage === totalPages}
							class="pagination-next"
						>
							Next
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
						</button>
					</div>
				</div>
			</div>
		{/if}
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card order-9 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Top Location</CardTitle>
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
	<CardBody >
		<VectorMap options={mapOptions} height="208" />
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card order-10 2xl:col-span-4">
	<CardHeader class="flex items-center gap-5">
		<CardTitle class="grow">Top selling Products</CardTitle>
		<a href="#!" class="link link-primary underline">View All <i class="ri-arrow-right-line"></i></a
		>
	</CardHeader>
	<CardBody>
		<Simplebar class="-mx-space px-space h-[180px]">
			<div class="space-y-4">
				{#each products as product}
					<div class="flex flex-col gap-3 md:flex-row md:items-center">
						<div class="dark:bg-dark-850 size-16 shrink-0 rounded-md bg-gray-100">
							<img src={product.image} loading="lazy" alt={product.title} />
						</div>
						<div class="grow">
							<h6>
								<a href={product.link}>{product.title}</a>
							</h6>
							<div class="text-orange-400">
								{#each Array(renderStars(product.stars).full) as _}
									<i class="ri-star-fill"></i>
								{/each}
								{#if renderStars(product.stars).half}
									<i class="ri-star-half-fill"></i>
								{/if}
							</div>
							<h6>${product.price.toFixed(2)}</h6>
						</div>
						<div class="flex shrink-0 gap-1 md:flex-col md:items-end">
							<button type="button" class="btn btn-sm btn-sub-green">
								<i class="ri-pencil-line"></i> Edit
							</button>
							<button type="button" class="btn btn-sm btn-sub-red">
								<i class="ri-close-line"></i> Delete
							</button>
						</div>
					</div>
				{/each}
			</div>
		</Simplebar>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card order-11 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Top Countries</CardTitle>
		<Dropdown class="dropdown shrink-0">
			<DropdownButton
				isChevron={true}
				class="dark:border-dark-800 link link-primary btn flex border-gray-200 px-3 py-1.5 text-xs font-medium"
			>
				Recent
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden p-2">
				<a href="#!" class="dropdown-item">
					<span>Recent</span>
				</a>
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
		<div class="flex flex-col gap-4">
			<div>
				<div class="mb-2 flex items-center gap-3">
					<h6 class="grow text-xs">Brazil</h6>
					<h6 class="text-xs font-semibold text-red-500">91%</h6>
				</div>
				<div class="progress-bar progress-1">
					<div class="progress-bar-wrap bg-primary-500 w-[91%] text-white"></div>
				</div>
			</div>
			<div>
				<div class="mb-2 flex items-center gap-3">
					<h6 class="grow text-xs">Russia</h6>
					<h6 class="text-xs font-semibold text-red-500">77%</h6>
				</div>
				<div class="progress-bar progress-1">
					<div class="progress-bar-wrap w-[77%] bg-green-500 text-white"></div>
				</div>
			</div>
			<div>
				<div class="mb-2 flex items-center gap-3">
					<h6 class="grow text-xs">China</h6>
					<h6 class="text-xs font-semibold text-red-500">54%</h6>
				</div>
				<div class="progress-bar progress-1">
					<div class="progress-bar-wrap w-[54%] bg-purple-500 text-white"></div>
				</div>
			</div>
			<div>
				<div class="mb-2 flex items-center gap-3">
					<h6 class="grow text-xs">Turkey</h6>
					<h6 class="text-xs font-semibold text-red-500">26%</h6>
				</div>
				<div class="progress-bar progress-1">
					<div class="progress-bar-wrap w-[26%] bg-orange-500 text-white"></div>
				</div>
			</div>
			<div>
				<div class="mb-2 flex items-center gap-3">
					<h6 class="grow text-xs">Philippines</h6>
					<h6 class="text-xs font-semibold text-red-500">40%</h6>
				</div>
				<div class="progress-bar progress-1">
					<div class="progress-bar-wrap w-[40%] bg-yellow-500 text-white"></div>
				</div>
			</div>
			<div>
				<div class="mb-2 flex items-center gap-3">
					<h6 class="grow text-xs">Denmark</h6>
					<h6 class="text-xs font-semibold text-red-500">58%</h6>
				</div>
				<div class="progress-bar progress-1">
					<div class="progress-bar-wrap w-[58%] bg-sky-500 text-white"></div>
				</div>
			</div>
			<div>
				<div class="mb-2 flex items-center gap-3">
					<h6 class="grow text-xs">New Zealand</h6>
					<h6 class="text-xs font-semibold text-red-500">19%</h6>
				</div>
				<div class="progress-bar progress-1">
					<div class="progress-bar-wrap w-[19%] bg-red-500 text-white"></div>
				</div>
			</div>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card order-12 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Traffic</CardTitle>
		<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
			<DropdownButton
				isChevron={true}
				class="dark:border-dark-800 link link-primary btn flex border-gray-200 px-3 py-1.5 text-xs font-medium"
			>
				Recent
			</DropdownButton>
			<DropdownMenu transition="scale" class="dropdown-menu !fixed hidden p-2">
				<a href="#!" class="dropdown-item">
					<span>Recent</span>
				</a>
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
			<ApexChart class="!min-h-full" colors={['bg-sky-500', 'bg-indigo-500']} options={traffic} />
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card order-13 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">My Message</CardTitle>
		<a
			href="#!"
			class="dark:border-dark-800 link link-primary btn flex border-gray-200 px-3 py-1.5 text-xs font-medium"
		>
			<i class="ri-add-line ltr:mr-1 rtl:ml-1"></i> New Chat
		</a>
	</CardHeader>
	<CardBody>
		<div>
			<ul class="tabs-pills dark:bg-dark-850 rounded-md bg-gray-100 *:grow">
				<li>
					<a
						href="#!"
						class="nav-item [&.active]:bg-primary-500 [&.active]:text-primary-50 {openTab === 1
							? 'active'
							: 'text-gray-500'}"
						on:click={() => (openTab = 1)}
					>
						New Message
					</a>
				</li>
				<li>
					<a
						href="#!"
						class="nav-item [&.active]:bg-primary-500 [&.active]:text-primary-50 {openTab === 2
							? 'active'
							: 'text-gray-500'}"
						on:click={() => (openTab = 2)}
					>
						All Message
					</a>
				</li>
			</ul>
			<div class="mt-4">
				{#if openTab === 1}
					<div class="space-y-4">
						<a href="#!" class="flex gap-3">
							<div class="size-10 shrink-0 rounded-full">
								<img
									src="/assets/images/avatar/user-11.png"
									loading="lazy"
									alt=""
									class="rounded-full"
								/>
							</div>
							<div class="grow overflow-hidden">
								<h6 class="mb-0.5">John Davis</h6>
								<p class="dark:text-dark-500 truncate text-xs text-gray-500">Hello, How are you?</p>
							</div>
							<p class="shrink-0 text-xs">04:25 PM</p>
						</a>
						<a href="#!" class="flex gap-3">
							<div class="size-10 shrink-0 rounded-full">
								<img
									src="/assets/images/avatar/user-3.png"
									loading="lazy"
									alt=""
									class="rounded-full"
								/>
							</div>
							<div class="grow overflow-hidden">
								<h6 class="mb-0.5">Jordan Davis</h6>
								<p class="dark:text-dark-500 truncate text-xs text-gray-500">
									Here are some of very cute illustration.
								</p>
							</div>
							<p class="shrink-0 text-xs">11:20 AM</p>
						</a>
						<a href="#!" class="flex gap-3">
							<div class="size-10 shrink-0 rounded-full">
								<img
									src="/assets/images/avatar/user-4.png"
									loading="lazy"
									alt=""
									class="rounded-full"
								/>
							</div>
							<div class="grow overflow-hidden">
								<h6 class="mb-0.5">Taylor Wilson</h6>
								<p class="dark:text-dark-500 truncate text-xs text-gray-500">
									Use tools like Trello, Asana, or Jira for task management and progress tracking.
								</p>
							</div>
							<p class="shrink-0 text-xs">10:49 AM</p>
						</a>
						<a href="#!" class="flex gap-3">
							<div class="size-10 shrink-0 rounded-full">
								<img
									src="/assets/images/avatar/user-5.png"
									loading="lazy"
									alt=""
									class="rounded-full"
								/>
							</div>
							<div class="grow overflow-hidden">
								<h6 class="mb-0.5">Jane Brown</h6>
								<p class="dark:text-dark-500 truncate text-xs text-gray-500">
									Regularly review and improve communication practices based on team feedback and
									project needs.
								</p>
							</div>
							<p class="shrink-0 text-xs">03:32 AM</p>
						</a>
						<a href="#!" class="flex gap-3">
							<div class="size-10 shrink-0 rounded-full">
								<img
									src="/assets/images/avatar/user-6.png"
									loading="lazy"
									alt=""
									class="rounded-full"
								/>
							</div>
							<div class="grow overflow-hidden">
								<h6 class="mb-0.5">Cameron Wilson</h6>
								<p class="dark:text-dark-500 truncate text-xs text-gray-500">
									Schedule regular check-ins to address any roadblocks and keep everyone aligned.
								</p>
							</div>
							<p class="shrink-0 text-xs">11:05 PM</p>
						</a>
					</div>
				{/if}
				{#if openTab === 2}
					<div class="space-y-4">
						<a href="#!" class="flex gap-3">
							<div class="size-10 shrink-0 rounded-full">
								<img
									src="/assets/images/avatar/user-14.png"
									loading="lazy"
									alt=""
									class="rounded-full"
								/>
							</div>
							<div class="grow overflow-hidden">
								<h6 class="mb-0.5">Sirkka Hakola</h6>
								<p class="dark:text-dark-500 truncate text-xs text-gray-500">Hello, How are you?</p>
							</div>
							<p class="shrink-0 text-xs">04:25 PM</p>
						</a>
						<a href="#!" class="flex gap-3">
							<div class="size-10 shrink-0 rounded-full">
								<img
									src="/assets/images/avatar/user-15.png"
									loading="lazy"
									alt=""
									class="rounded-full"
								/>
							</div>
							<div class="grow overflow-hidden">
								<h6 class="mb-0.5">Jordan Davis</h6>
								<p class="dark:text-dark-500 truncate text-xs text-gray-500">
									Here are some of very cute illustration.
								</p>
							</div>
							<p class="shrink-0 text-xs">11:20 AM</p>
						</a>
						<a href="#!" class="flex gap-3">
							<div class="size-10 shrink-0 rounded-full">
								<img
									src="/assets/images/avatar/user-16.png"
									loading="lazy"
									alt=""
									class="rounded-full"
								/>
							</div>
							<div class="grow overflow-hidden">
								<h6 class="mb-0.5">Nicholas Hope</h6>
								<p class="dark:text-dark-500 truncate text-xs text-gray-500">
									Use tools like Trello, Asana, or Jira for task management and progress tracking.
								</p>
							</div>
							<p class="shrink-0 text-xs">10:49 AM</p>
						</a>
						<a href="#!" class="flex gap-3">
							<div class="size-10 shrink-0 rounded-full">
								<img
									src="/assets/images/avatar/user-17.png"
									loading="lazy"
									alt=""
									class="rounded-full"
								/>
							</div>
							<div class="grow overflow-hidden">
								<h6 class="mb-0.5">Susan Liles</h6>
								<p class="dark:text-dark-500 truncate text-xs text-gray-500">
									Regularly review and improve communication practices based on team feedback and
									project needs.
								</p>
							</div>
							<p class="shrink-0 text-xs">03:44 AM</p>
						</a>
						<a href="#!" class="flex gap-3">
							<div class="size-10 shrink-0 rounded-full">
								<img
									src="/assets/images/avatar/user-18.png"
									loading="lazy"
									alt=""
									class="rounded-full"
								/>
							</div>
							<div class="grow overflow-hidden">
								<h6 class="mb-0.5">David Johnson</h6>
								<p class="dark:text-dark-500 truncate text-xs text-gray-500">
									Schedule regular check-ins to address any roadblocks and keep everyone aligned.
								</p>
							</div>
							<p class="shrink-0 text-xs">09:57 PM</p>
						</a>
					</div>
				{/if}
			</div>
		</div>
	</CardBody>
</Col>
