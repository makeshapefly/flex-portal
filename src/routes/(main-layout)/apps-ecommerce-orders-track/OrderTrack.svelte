<script>
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import VectorMap from '$lib/components/common/vectorMap.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import { options as vector } from './vector';
	import { orderData } from './order-track';

	let openTab = 2;
	let progress = 33;
	let currentPage = 1;
	const itemsPerPage = 4;

	// Paginated data
	let displayedProducts = orderData.slice(0, itemsPerPage);
	let totalPages = Math.ceil(orderData.length / itemsPerPage);

	const prevPage = () => {
		if (currentPage > 1) {
			currentPage--;
			updatePagination();
		}
	};

	const nextPage = () => {
		if (currentPage < totalPages) {
			currentPage++;
			updatePagination();
		}
	};

	const gotoPage = (/** @type {number} */ page) => {
		currentPage = page;
		updatePagination();
	};

	const updatePagination = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		displayedProducts = orderData.slice(startIndex, startIndex + itemsPerPage);
	};

	// Method to get the status badge class
	const getStatusBadgeClass = (/** @type {any} */ status) => {
		switch (status) {
			case 'Delivered':
				return 'badge badge-green';
			case 'New':
				return 'badge badge-primary';
			case 'Cancelled':
				return 'badge badge-red';
			case 'Shipping':
				return 'badge badge-purple';
			case 'Pending':
				return 'badge badge-yellow';
			default:
				return '';
		}
	};

	orderData.forEach((order, index) => {
		order.orderId = `PEO-${index + 14521}`;
	});

	const tabs = [
		{ id: 1, name: 'Overview' },
		{ id: 2, name: 'Map View' }
	];
</script>

<Card>
	<div class="tabs-pills card-header">
		<h6 class="card-title grow">Order Tracking</h6>
		<div class="shrink-0">
			<ul class="flex gap-2">
				{#each tabs as tab}
					<li>
						 <!-- svelte-ignore a11y-invalid-attribute --> 
						<a
							href="javascript:void(0)"
							on:click={() => (openTab = tab.id)}
							class={`nav-item rounded-md px-4 py-2 transition
						${
							openTab === tab.id
								? 'text-primary-500 dark:bg-dark-800 dark:text-dark-50 bg-gray-100'
								: 'text-gray-500'
						}`}
						>
							{tab.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<CardBody>
		<div class="mt-4 w-full">
			{#if openTab === 1}
				<div class="gap-space grid grid-cols-12">
					<div class="col-span-12 md:col-span-3 xl:col-span-2">
						<p class="mb-1 text-gray-500">Order ID</p>
						<h6><a href="#!" class="link link-primary text-current">PEO-14521</a></h6>
					</div>
					<div class="col-span-12 md:col-span-3 xl:col-span-2">
						<p class="mb-1 text-gray-500">Delivery Date</p>
						<h6>08 Sep, 2024</h6>
					</div>
					<div class="col-span-12 md:col-span-3 xl:col-span-2">
						<p class="mb-1 text-gray-500">Payment Method</p>
						<span class="badge badge-green">Paid</span>
					</div>
					<div class="col-span-12 md:col-span-3 xl:col-span-3">
						<p class="mb-1 text-gray-500">Courier Partner</p>
						<h6>SRBThemes Express</h6>
					</div>
					<div class="col-span-12 md:col-span-6 xl:col-span-3">
						<p class="mb-1 text-gray-500">Delivery Address</p>
						<h6>0588 Macey Ranch, Port Blake, China - 96153-1460</h6>
					</div>
				</div>

				<div class="mt-space dark:bg-dark-850 rounded-md bg-gray-100 p-5">
					<div class="relative h-32">
						<div
							class="dark:bg-dark-800 dark:before:border-dark-900 absolute inset-y-0 left-5 h-32 w-[2px] bg-gray-200 before:absolute before:-left-[5px] before:size-3 before:rounded-full before:border-4 before:border-white before:bg-green-500"
						></div>
						<div
							class="dark:bg-dark-800 dark:before:border-dark-900 dark:before:bg-dark-800 absolute inset-y-0 right-5 h-32 w-[2px] bg-gray-200 before:absolute before:-left-[5px] before:size-3 before:rounded-full before:border-4 before:border-white before:bg-gray-100"
						></div>
						<div class="relative mx-10">
							<img
								src="/assets/images/others/truck.png"
								alt=""
								class="absolute h-24 animate-pulse md:h-auto"
								style="left: {progress - 11}%;"
							/>
						</div>
						<div
							class="dark:bg-dark-800 progress-bar progress-2 absolute inset-x-0 bottom-0 bg-gray-200"
						>
							<div
								class="progress-bar-wrap bg-primary-500 rounded-full text-white"
								style="width: {progress}%;"
							></div>
						</div>
					</div>
				</div>
			{/if}

			{#if openTab === 2}
				<div class="gap-space grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
					<div>
						<p class="mb-1 text-gray-500">Order ID</p>
						<h6><a href="#!" class="link link-primary text-current">PEO-14521</a></h6>
					</div>
					<div>
						<p class="mb-1 text-gray-500">Order Status</p>
						<span class="badge badge-purple">Shipping</span>
					</div>
					<div>
						<p class="mb-1 text-gray-500">Delivery Date</p>
						<h6>08 Sep, 2024</h6>
					</div>
					<div>
						<p class="mb-1 text-gray-500">Courier Partner</p>
						<h6>SRBThemes Express</h6>
					</div>
					<div>
						<p class="mb-1 text-gray-500">Delivery Address</p>
						<h6>China</h6>
					</div>
				</div>

				<VectorMap options={vector} height="288" extraCss="mt-space"/>
			{/if}
		</div>
	</CardBody>
</Card>

<div class="mb-5 flex items-center">
	<h6 class="text-16 grow">Recent Orders</h6>
	<div class="shrink-0">
		<a href="/apps-ecommerce-orders-list" class="btn btn-green">
			<span class="align-center">View All Orders</span>
			<LucideIcon name="MoveRight" class="ml-1 size-5 ltr:inline-block rtl:hidden" />
			<!-- <i data-lucide="move-left" class="mr-1 rtl:inline-block ltr:hidden size-5"></i> -->
		</a>
	</div>
</div>

<div class="grid grid-cols-12 gap-x-5">
	{#each displayedProducts as product, index (product.ordersDate)}
		<div class="col-span-12 md:col-span-6 xl:col-span-3">
			<div class="card">
				<div class="card-body">
					<div class="flex items-center gap-2">
						<p class="dark:text-dark-500 grow text-gray-500">
							Orders ID: <a href="#!" class="link link-primary">{product.orderId}</a>
						</p>
						<div>
							<span class={getStatusBadgeClass(product.status)}>{product.status}</span>
						</div>
					</div>

					<div class="mt-4 flex items-center gap-3">
						<div
							class="dark:border-dark-800 size-16 shrink-0 rounded-md border border-gray-200 p-1"
						>
							<img src={product.image} alt={product.productName} />
						</div>
						<div class="grow overflow-hidden">
							<h6 class="mb-1 truncate">
								<a href="/apps-ecommerce-product-overview">{product.productName}</a>
							</h6>
							<a href="/apps-ecommerce-orders-overview" class="link link-red underline">
								Show Details<LucideIcon
									name="MoveRight"
									class="ml-1 size-4 ltr:inline-block rtl:hidden"
								/>
							</a>
						</div>
					</div>

					<p class="dark:text-dark-500 mt-3 text-gray-500">Order Expected Date</p>
					<h6>{product.deliveredDate}</h6>

					<div class="mt-4 flex flex-wrap items-center gap-2 2xl:flex-nowrap">
						<a href="/apps-ecommerce-orders-overview" class="btn btn-sub-gray w-full">
							<i class="ri-eye-line align-bottom ltr:mr-0.5 rtl:ml-0.5"></i> Overview
						</a>
						<button class="btn btn-primary w-full">Track Order</button>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<div class="mb-5 grid grid-cols-12 items-center gap-5">
	<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
		<p class="dark:text-dark-500 text-gray-500">
			Showing <b>{(currentPage - 1) * itemsPerPage + 1}</b> -
			<b>{Math.min(currentPage * itemsPerPage, orderData.length)}</b>
			of <b>{orderData.length}</b> Results
		</p>
	</div>
	<div class="col-span-12 md:col-span-6">
		<div class="pagination pagination-primary flex justify-center md:justify-end">
			<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
				<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
				<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
				Prev
			</button>
			{#each Array(totalPages) as _, page (page + 1)}
				<button
					on:click={() => gotoPage(page + 1)}
					class:active={currentPage === page + 1}
					class="pagination-item"
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
