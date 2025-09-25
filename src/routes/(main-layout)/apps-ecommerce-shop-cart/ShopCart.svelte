<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import { shopCartData } from './shop-cart';
	import { onMount } from 'svelte';

	let timeLeft = 300; // Total time in seconds (5 minutes)
	let minutes = Math.floor(timeLeft / 60);
	let seconds = timeLeft % 60;
	let discountCode = '';
	let shippingCharge = 20;

	let products = $shopCartData.map((product) => ({
		...product,
		activeColor: product.colors[0],
		activeSize: product.sizes[0]
	}));

	// Function to remove a product from the cart
	function removeProduct(index: number) {
		products = products.filter((_, i) => i !== index);
	}

	// Function to change size of a product
	function changeSize(product: any, size: string) {
		product.activeSize = size;
		products = [...products];
	}

	// Function to change color of a product
	function changeColor(product: any, color: string) {
		product.activeColor = color;
		products = [...products];
	}

	// Recalculate the totals based on the products in the cart
	function calculateTotals() {
		let subtotal = 0;
		let vat = 0;
		let discount = 0;
		products.forEach((product) => {
			subtotal += product.price * product.count * (1 - product.discount);
		});
		vat = subtotal * 0.06;
		discount = subtotal * 0.1;
		const total = subtotal + vat - discount + shippingCharge;
		return { subtotal, vat, discount, total };
	}

	let { subtotal, vat, discount, total } = calculateTotals();

	// Start the timer
	const startTimer = () => {
		const interval = setInterval(() => {
			timeLeft -= 1;
			minutes = Math.floor(timeLeft / 60);
			seconds = timeLeft % 60;

			// Stop the timer when it reaches 0
			if (timeLeft <= 0) {
				clearInterval(interval);
			}
		}, 1000);
	};

	// Update totals whenever a product's count changes
	function updateCart() {
		let totals = calculateTotals();
		subtotal = totals.subtotal;
		vat = totals.vat;
		discount = totals.discount;
		total = totals.total;
	}

	onMount(() => {
		startTimer();
	});

	const outlineMap = {
		blue: 'outline-blue-500/20',
		gray: 'outline-gray-200 dark:outline-gray-800',
		pink: 'outline-pink-500/20',
		green: 'outline-green-500/20',
		red: 'outline-red-500/20'
	};

	const getOutlineClass = (color) => outlineMap[color] || '';
</script>

<Col cols={{ span: 12 }} xl={{ span: 8 }}>
	<div class="gap-space mb-space flex flex-col md:flex-row md:items-center">
		<h6 class="card-title grow">Shopping Cart</h6>
		<div class="shrink-0">
			<p class="dark:text-dark-500 shrink-0 text-gray-500">
				<span class="font-semibold text-red-500">
					{minutes}:{seconds < 10 ? '0' + seconds : seconds}
				</span>
				left until the end of the process
			</p>
		</div>
	</div>

	{#each products as product, index (product.id)}
		<Card>
			<CardBody>
				<button class="float-end" aria-label="Close" on:click={() => removeProduct(index)}>
					<i class="link link-red ri-close-line size-4"></i>
				</button>
				<div class="gap-5 sm:flex">
					<div class="dark:bg-dark-850 w-full flex-shrink-0 rounded-md bg-gray-100 sm:w-[300px]">
						<img src={product.image} alt={product.name} />
					</div>
					<div class="mt-5 sm:mt-0">
						<span class="badge badge-gray">{product.category}</span>
						<h6 class="mt-2 mb-3"><a href="#!">{product.name}</a></h6>
						<div class="gap-space grid grid-cols-2">
							<div>
								<h6>Select Colors</h6>
								<div class="mt-2 flex grow items-center gap-2">
									{#each product.colors as color}
										<a
											href="#!"
											class={`dark:border-dark-900 group/item flex size-6 items-center justify-center rounded-full border-2 border-white text-white outline outline-1 ${getOutlineClass(color)}`}
											class:bg-blue-500={color === 'blue'}
											class:bg-gray-500={color === 'gray'}
											class:bg-pink-500={color === 'pink'}
											class:bg-green-500={color === 'green'}
											class:bg-red-500={color === 'red'}
											class:active={product.activeColor === color}
											on:click={() => changeColor(product, color)}
										>
											<LucideIcon name="Check" class="hidden size-4 group-[&.active]/item:block" />
										</a>
									{/each}
								</div>
							</div>

							<!-- Sizes Section -->
							<div>
								<h6>Select Size</h6>
								<div class="mt-3 flex shrink-0 items-center gap-2 font-medium">
									{#each product.sizes as size}
										<a
											href="#!"
											class={`[&.active]:text-green-500 ${product.activeSize === size ? 'active' : 'text-gray-500 dark:text-dark-500'}`}
											on:click={() => changeSize(product, size)}
										>
											{size}
										</a>
									{/each}
								</div>
							</div>
						</div>

						<!-- Price and Discount Section -->
						<h5 class="mt-4 flex items-center gap-2">
							<span>${(product.price * product.count * (1 - product.discount)).toFixed(2)}</span>
							{#if product.discount > 0}
								<small class="dark:text-dark-500 font-normal text-gray-500 line-through">
									${(product.price * product.count).toFixed(2)}
								</small>
								<span class="badge badge-red shrink-0 text-xs">
									{(product.discount * 100).toFixed(0)}%
								</span>
							{/if}
						</h5>

						<!-- Quantity Controls -->
						<div class="mt-5">
							<div
								class="dark:border-dark-800 flex w-32 items-center rounded-md border border-gray-200 p-1 text-center"
							>
								<button
									aria-label="Minus"
									on:click={() => {
										if (product.count > 1) {
											product.count--;
											updateCart();
										}
									}}
									class="text-primary-500 minus bg-primary-500/20 hover:text-primary-700 flex size-8 shrink-0 items-center justify-center rounded-md transition duration-200 ease-linear"
								>
									<i class="ri-subtract-line size-4"></i>
								</button>
								<input
									type="text"
									bind:value={product.count}
									class="form-input h-8 rounded-none border-0 p-0 text-center"
									readonly
								/>
								<button
									aria-label="Plus"
									on:click={() => {
										if (product.count < 5) {
											product.count++;
											updateCart();
										}
									}}
									class="text-primary-500 plus bg-primary-500/20 hover:text-primary-700 flex size-8 shrink-0 items-center justify-center rounded-md transition duration-200 ease-linear"
								>
									<i class="ri-add-line size-4"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	{/each}
</Col>

<Col cols={{ span: 12 }} xl={{ span: 4 }}>
	<div class="sticky top-24 mb-5">
		<Card>
			<CardHeader>
				<CardTitle class="card-title">Order Summary</CardTitle>
			</CardHeader>
			<CardBody>
				<div class="mb-4">
					<label for="discountCode" class="form-label">Discount Code</label>
					<input
						type="text"
						id="discountCode"
						class="form-input"
						placeholder="Enter coupon code"
						bind:value={discountCode}
					/>
				</div>
				<table class="flush table">
					<tbody>
						<tr>
							<th class="!border-0">Sub Amount</th>
							<td>${subtotal.toFixed(2)}</td>
						</tr>
						<tr>
							<th class="!border-0">Vat Amount (6%)</th>
							<td>${vat.toFixed(2)}</td>
						</tr>
						<tr>
							<th class="!border-0">Discount (10%)</th>
							<td>-${discount.toFixed(2)}</td>
						</tr>
						<tr>
							<th class="!border-0">Shipping Charge</th>
							<td>${shippingCharge.toFixed(2)}</td>
						</tr>
						<tr class="dark:border-dark-800 border-t border-gray-200">
							<th class="!border-0">Total Amount</th>
							<td>${total.toFixed(2)}</td>
						</tr>
					</tbody>
				</table>
				<div class="my-4">
					<a href="/apps-ecommerce-checkout" class="btn btn-primary w-full">Checkout Now</a>
				</div>
				<p class="dark:text-dark-500 text-center text-gray-500">
					By clicking the "checkout order" button, you agree to the terms of the public offers.
				</p>
			</CardBody>
		</Card>
		<div class="mb-5 flex gap-4">
			<div
				class="dark:bg-dark-850 flex size-12 shrink-0 items-center justify-center rounded-md bg-gray-100"
			>
				<LucideIcon
					name="Truck"
					class="dark:text-dark-500 dark:fill-dark-850 fill-gray-200 text-gray-500"
				/>
			</div>
			<div>
				<h6 class="mb-1">Free delivery on May 24</h6>
				<p class="dark:text-dark-500 text-gray-500">
					To the address, by courier - with fitting, free of charge for purchases over $500.
				</p>
			</div>
		</div>
		<div class="mb-5 flex gap-4">
			<div
				class="dark:bg-dark-850 flex size-12 shrink-0 items-center justify-center rounded-md bg-gray-100"
			>
				<LucideIcon
					name="ShieldCheck"
					class="dark:text-dark-500 dark:fill-dark-850 fill-gray-200 text-gray-500"
				/>
			</div>
			<div>
				<h6 class="mb-1">Safety</h6>
				<p class="dark:text-dark-500 text-gray-500">
					The security of payments is guaranteed through the use of the SSL protocol. Your bank card
					details are securely protected during online transactions.
				</p>
			</div>
		</div>
		<div class="flex gap-4">
			<div
				class="dark:bg-dark-850 flex size-12 shrink-0 items-center justify-center rounded-md bg-gray-100"
			>
				<LucideIcon
					name="Percent"
					class="dark:text-dark-500 dark:fill-dark-850 fill-gray-200 text-gray-500"
				/>
			</div>
			<div>
				<h6 class="mb-1">5% discount</h6>
				<p class="dark:text-dark-500 text-gray-500">
					When paying online, you receive a 5% discount on your next purchase.
				</p>
			</div>
		</div>
	</div>
</Col>
