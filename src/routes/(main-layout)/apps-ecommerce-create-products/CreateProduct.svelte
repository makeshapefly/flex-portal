<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Swiper from 'swiper';
	import { Pagination } from 'swiper/modules';
	import 'swiper/css';
	import 'swiper/css/pagination';

	import { onMount } from 'svelte';

	let activeLink = 'primary';
	let selectedSize = 'S';

	// Options for the select dropdown
	const options = [
		{ label: 'Fashion', value: 'Fashion' },
		{ label: 'Fruits', value: 'fruits' },
		{ label: 'Footwear', value: 'Footwear' },
		{ label: 'Bags', value: 'Bags' },
		{ label: 'Watch', value: 'Watch' }
	];

	// Define separate reactive variables for stock and quantity
	let stock: number = 0;
	let quantity: number = 0;

	// Functions to handle increment and decrement for stock
	const decrementStock = () => {
		if (stock > 0) stock--;
	};

	const incrementStock = () => {
		stock++;
	};

	// Functions to handle increment and decrement for quantity
	const decrementQuantity = () => {
		if (quantity > 0) quantity--;
	};

	const incrementQuantity = () => {
		quantity++;
	};

	// Define type for the image URL
	let image1Url: string | null = null;
	let image2Url: string | null = null;
	let image3Url: string | null = null;

	// Define the function to handle file change events
	const handleFileChange = (e: Event, imageNumber: number): void => {
		const input = e.target as HTMLInputElement;
		if (input && input.files && input.files[0]) {
			const file = input.files[0];
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) {
					if (imageNumber === 1) {
						image1Url = reader.result as string;
					} else if (imageNumber === 2) {
						image2Url = reader.result as string;
					} else if (imageNumber === 3) {
						image3Url = reader.result as string;
					}
				}
			};
			reader.readAsDataURL(file);
		}
	};

	// Declare reactive variables for price, discount, and sellingPrice
	let price: string = '';
	let discount: string = '';
	let sellingPrice: string = '$00.00';

	// Function to validate the price and discount inputs
	const validateNumber = (event: Event) => {
		const input = event.target as HTMLInputElement;
		const regex = /^[0-9]*\.?[0-9]*$/; // Allows decimal numbers
		if (!regex.test(input.value)) {
			input.value = input.value.slice(0, -1); // Remove the last character if it's not a valid number
		}
	};

	// Function to calculate the selling price based on price and discount
	const calculateSellingPrice = () => {
		const priceValue = parseFloat(price);
		const discountValue = parseFloat(discount);

		if (isNaN(priceValue) || isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
			sellingPrice = '$00.00';
		} else {
			const calculatedPrice = priceValue * (1 - discountValue / 100);
			sellingPrice = `$${calculatedPrice.toFixed(2)}`;
		}
	};

	let swiper: Swiper | null = null;

	// For selecting color and size
	let activeColor = 'primary';
	let activeSize = 'S';

	onMount(() => {
		swiper = new Swiper('.productSlider', {
			modules: [Pagination],
			pagination: {
				clickable: true,
				el: '.swiper-pagination'
			}
		});
	});

	// Function to handle color selection
	const selectColor = (color: string) => {
		activeColor = color;
	};

	// Function to handle size selection
	const selectSize = (size: string) => {
		activeSize = size;
	};
</script>

<div class="mb-5 flex flex-wrap items-center gap-5">
	<div class="grow">
		<h6 class="card-title mb-1">Add New Products</h6>
		<p class="dark:text-dark-500 text-gray-500">
			Please fill the below form to create a new product.
		</p>
	</div>
	<div class="flex shrink-0 gap-2">
		<button class="btn btn-sub-gray"
			><LucideIcon name="Trash2" class="align-center inline-block size-4 ltr:mr-1 rtl:ml-1" /><span
				class="align-middle">Delete</span
			></button
		>
		<button class="btn btn-primary"
			><LucideIcon name="Plus" class="align-center inline-block size-4 ltr:mr-1 rtl:ml-1" /><span
				class="align-middle">Add Products</span
			></button
		>
	</div>
</div>

<Grid cols={12} gap={5}>
	<Col cols={{ span: 12 }} xl={{ span: 8 }}>
		<Card>
			<CardHeader>
				<CardTitle>Products Description</CardTitle>
			</CardHeader>
			<CardBody>
				<form action="#!">
					<div class="grid grid-cols-12 gap-5">
						<div class="col-span-12">
							<label for="productNameInput" class="form-label">Product Name</label>
							<input
								type="text"
								id="productNameInput"
								class="form-input"
								placeholder="Enter product name"
							/>
						</div>
						<div class="col-span-12">
							<label for="descriptionTextarea" class="form-label">Description</label>
							<textarea
								name="descriptionTextarea"
								id="descriptionTextarea"
								rows="3"
								class="form-input h-auto"
								placeholder="Enter your description"
							></textarea>
						</div>
						<div class="col-span-4">
							<label for="categorySelect" class="form-label">Category</label>
							<select class="form-input h-auto">
								<option class="text-gray-200">Select</option>
								<option value="fashion">Fashion</option>
								<option value="fruit">Fruit</option>
								<option value="footwear">Footwear</option>
								<option value="bags">Bags</option>
								<option value="watch">Watch</option>
							</select>
						</div>
						<div class="col-span-4">
							<label for="brandTypeSelect" class="form-label">Brand Type</label>
							<select class="form-input h-auto">
								<option class="text-gray-200">Select</option>
								<option value="Gucci">Gucci</option>
								<option value="Rolex">Rolex</option>
								<option value="Calvin Klein">Calvin Klein</option>
								<option value="Zara">Zara</option>
								<option value="Nike">Nike</option>
								<option value="Adidas">Adidas</option>
							</select>
						</div>
					</div>
				</form>
			</CardBody>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Product Images</CardTitle>
			</CardHeader>
			<CardBody>
				<Grid cols={12} gap={5}>
					<!-- First Image Section -->
					<Col cols={{ span: 12 }} md={{ span: 7 }} class="md:row-span-2">
						<div class="h-full">
							<label
								for="logo1"
								class="dark:border-dark-800 flex h-full cursor-pointer items-center justify-center border border-dashed border-gray-200 p-5 text-center"
							>
								{#if image1Url}
									<!-- svelte-ignore a11y-missing-attribute -->
									<img src={image1Url} class="mx-auto h-60" />
								{:else}
									<div class="dark:text-dark-500 text-gray-500">
										<LucideIcon name="ImagePlus" class="mx-auto" />
										<div class="mt-3">Product Image 1</div>
									</div>
								{/if}
							</label>
							<div class="mt-4 hidden">
								<input
									type="file"
									name="logo1"
									id="logo1"
									on:change={(e) => handleFileChange(e, 1)}
									class="dark:text-dark-500 block w-full text-sm text-slate-500 file:mr-4 file:rounded-md file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 focus:outline-0"
								/>
							</div>
						</div>
					</Col>

					<!-- Second Image Section -->
					<Col cols={{ span: 12 }} md={{ span: 5 }}>
						<div>
							<label
								for="logo2"
								class="dark:border-dark-800 flex h-56 cursor-pointer items-center justify-center border border-dashed border-gray-200 p-5 text-center"
							>
								{#if image2Url}
									<!-- svelte-ignore a11y-missing-attribute -->
									<img src={image2Url} class="mx-auto h-44" />
								{:else}
									<div class="dark:text-dark-500 text-gray-500">
										<LucideIcon name="ImagePlus" class="mx-auto" />
										<div class="mt-3">Product Image 2</div>
									</div>
								{/if}
							</label>
							<div class="mt-4 hidden">
								<input
									type="file"
									name="logo2"
									id="logo2"
									on:change={(e) => handleFileChange(e, 2)}
									class="dark:text-dark-500 block w-full text-sm text-slate-500 file:mr-4 file:rounded-md file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 focus:outline-0"
								/>
							</div>
						</div></Col
					>

					<!-- Third Image Section -->
					<Col cols={{ span: 12 }} md={{ span: 5 }}>
						<div>
							<label
								for="logo3"
								class="dark:border-dark-800 flex h-56 cursor-pointer items-center justify-center border border-dashed border-gray-200 p-5 text-center"
							>
								{#if image3Url}
									<!-- svelte-ignore a11y-missing-attribute -->
									<img src={image3Url} class="mx-auto h-44" />
								{:else}
									<div class="dark:text-dark-500 text-gray-500">
										<LucideIcon name="ImagePlus" class="mx-auto" />
										<div class="mt-3">Product Image 3</div>
									</div>
								{/if}
							</label>
							<div class="mt-4 hidden">
								<input
									type="file"
									name="logo3"
									id="logo3"
									on:change={(e) => handleFileChange(e, 3)}
									class="dark:text-dark-500 block w-full text-sm text-slate-500 file:mr-4 file:rounded-md file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 focus:outline-0"
								/>
							</div>
						</div>
					</Col>
				</Grid>
			</CardBody>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Advance Description</CardTitle>
			</CardHeader>
			<CardBody>
				<Grid cols={12} gap={5}>
					<Col cols={{ span: 12 }} md={{ span: 4 }}>
						<h6 class="form-label">Select Gender</h6>
						<div class="flex items-center gap-3">
							<div class="input-radio-group">
								<input
									id="maleRadio"
									name="selectGender"
									class="input-radio input-radio-primary"
									type="radio"
								/>
								<label for="maleRadio" class="input-radio-label">Male</label>
							</div>
							<div class="input-radio-group">
								<input
									id="femaleRadio"
									name="selectGender"
									class="input-radio input-radio-primary"
									type="radio"
								/>
								<label for="femaleRadio" class="input-radio-label">Female</label>
							</div>
							<div class="input-radio-group">
								<input
									id="unisexRadio"
									name="selectGender"
									class="input-radio input-radio-primary"
									type="radio"
								/>
								<label for="unisexRadio" class="input-radio-label">Unisex</label>
							</div>
						</div>
					</Col>
					<Col cols={{ span: 12 }} md={{ span: 4 }}>
						<label for="stockInput" class="form-label">Stock</label>
						<div class="input-spin-group input-spin-primary flex">
							<!-- Minus button to decrement stock -->
							<button type="button" on:click={decrementStock} class="input-spin-minus">
								<LucideIcon name="Minus" class="size-4" />
							</button>
							<!-- Stock input with two-way binding to stock -->
							<input
								type="text"
								bind:value={stock}
								class="input-spin form-input"
								readonly
								id="stockInput"
							/>
							<!-- Plus button to increment stock -->
							<button type="button" on:click={incrementStock} class="input-spin-plus">
								<LucideIcon name="Plus" class="size-4" />
							</button>
						</div>
					</Col>
					<Col cols={{ span: 12 }} md={{ span: 4 }}>
						<label for="quantityInput" class="form-label">Quantity</label>
						<div class="input-spin-group input-spin-primary flex">
							<!-- Minus button to decrement quantity -->
							<button type="button" on:click={decrementQuantity} class="input-spin-minus">
								<LucideIcon name="Minus" class="size-4" />
							</button>
							<!-- Quantity input with two-way binding to quantity -->
							<input
								type="text"
								bind:value={quantity}
								class="input-spin form-input"
								readonly
								id="quantityInput"
							/>
							<!-- Plus button to increment quantity -->
							<button type="button" on:click={incrementQuantity} class="input-spin-plus">
								<LucideIcon name="Plus" class="size-4" />
							</button>
						</div>
					</Col>
					<Col cols={{ span: 12 }} md={{ span: 6 }}>
						<label for="sizeSelect" class="form-label">Size</label>
						<div id="sizeSelect"></div>
					</Col>
					<Col cols={{ span: 12 }} md={{ span: 6 }}>
						<label for="colorsSelect" class="form-label">Colors</label>
						<div id="colorsSelect"></div>
					</Col>
				</Grid>
			</CardBody>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Pricing & Sale</CardTitle>
			</CardHeader>
			<CardBody>
				<Grid cols={12} gap={5}>
					<Col cols={{ span: 12 }} md={{ span: 3 }}>
						<label for="priceInput" class="form-label">Price</label>
						<input
							type="text"
							id="priceInput"
							class="form-input"
							placeholder="$00.00"
							bind:value={price}
							on:input={validateNumber}
							on:input={calculateSellingPrice}
						/>
					</Col>
					<Col cols={{ span: 12 }} md={{ span: 3 }}>
						<label for="discountInput" class="form-label">Discount</label>
						<input
							type="text"
							id="discountInput"
							class="form-input"
							placeholder="0%"
							bind:value={discount}
							on:input={validateNumber}
							on:input={calculateSellingPrice}
						/>
					</Col>
					<Col cols={{ span: 12 }} md={{ span: 3 }}>
						<label for="sellingPrice" class="form-label">Selling Price</label>
						<input
							type="text"
							id="sellingPrice"
							class="form-input"
							placeholder="$00.00"
							value={sellingPrice}
							readonly
						/>
					</Col>
				</Grid>
			</CardBody>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Payment Method</CardTitle>
			</CardHeader>
			<CardBody>
				<Grid cols={12} gap={5}>
					<Col cols={{ span: 12 }} md={{ span: 4 }}>
						<label for="cashOnDelivery" class="card relative mb-0 block cursor-pointer">
							<span class="card-body flex items-center gap-3">
								<img src="/assets/images/others/money.png" alt="" class="size-8 shrink-0" />
								<span class="block grow text-base font-semibold">Cash on Delivery</span>
								<input
									id="cashOnDelivery"
									class="input-check input-check-primary shrink-0"
									type="checkbox"
								/>
							</span>
						</label>
					</Col>
					<Col cols={{ span: 12 }} md={{ span: 4 }}>
						<label for="masterVisaCard" class="card relative mb-0 block cursor-pointer">
							<span class="card-body flex items-center gap-3">
								<img src="/assets/images/payment/mastercard.png" alt="" class="h-8 shrink-0" />
								<span class="block grow text-base font-semibold">Visa & Master Card</span>
								<input
									id="masterVisaCard"
									class="input-check input-check-primary shrink-0"
									type="checkbox"
								/>
							</span>
						</label>
					</Col>
					<Col cols={{ span: 12 }} md={{ span: 4 }}>
						<label for="bankCard" class="card relative mb-0 block cursor-pointer">
							<span class="card-body flex items-center gap-3">
								<img src="/assets/images/others/bank.png" alt="" class="h-8 shrink-0" />
								<span class="block grow text-base font-semibold">Bank Transfer</span>
								<input
									id="bankCard"
									class="input-check input-check-primary shrink-0"
									type="checkbox"
								/>
							</span>
						</label>
					</Col>
				</Grid>
			</CardBody>
		</Card>
	</Col>

	<Col cols={{ span: 12 }} xl={{ span: 4 }}>
		<Card class="sticky top-24">
			<CardHeader>
				<CardTitle
					><LucideIcon name="Eye" class="mr-1 inline-block size-4" /><span class="align-middle"
						>Product Card Preview</span
					></CardTitle
				>
			</CardHeader>
			<div class="card-body dark:bg-dark-850 bg-gray-100">
				<div class="card mb-0">
					<CardBody>
						<div class="dark:bg-dark-850 relative bg-gray-100 p-5">
							<!-- Heart Icon -->
							<a
								href="#!"
								aria-label="Add to Wishlist"
								class="absolute right-5 top-5 z-10 flex items-center justify-center rounded-full bg-white text-lg"
							>
								<i class="ri-heart-line"></i>
							</a>

							<!-- Swiper -->
							<div class="swiper productSlider" dir="ltr">
								<div class="swiper-wrapper">
									<div class="swiper-slide">
										<!-- svelte-ignore a11y-img-redundant-alt -->
										<img src="/assets/images/products/img-06.png" alt="Product Image 1" />
									</div>
									<div class="swiper-slide">
										<!-- svelte-ignore a11y-img-redundant-alt -->
										<img src="/assets/images/products/img-04.png" alt="Product Image 2" />
									</div>
									<!-- svelte-ignore a11y-img-redundant-alt -->
									<div class="swiper-slide">
										<img src="/assets/images/products/img-05.png" alt="Product Image 3" />
									</div>
								</div>
								<div class="swiper-pagination"></div>
							</div>
						</div>
						<div class="mt-5">
							<h5 class="mb-2">$36.87</h5>
							<h6 class="mb-1">
								<a href="#!" class="link link-primary text-current">Bra Lace Crop top</a>
							</h6>
							<p class="dark:text-dark-500 text-gray-500">Fashion</p>

							<div class="flex flex-wrap items-center gap-2">
								<!-- Color Options -->
								<div class="mt-3 flex grow items-center gap-2">
									<a
										href="#!"
										class="bg-primary-500 group/item flex size-5 items-center justify-center rounded text-white"
										class:active={activeLink === 'primary'}
										on:click={(e) => {
											e.preventDefault();
											activeLink = 'primary';
										}}
									>
										<LucideIcon name="Check" class="hidden size-4 group-[&.active]/item:block" />
									</a>
									<a
										href="#!"
										class="group/item flex size-5 items-center justify-center rounded bg-pink-500 text-white"
										class:active={activeLink === 'pink'}
										on:click={(e) => {
											e.preventDefault();
											activeLink = 'pink';
										}}
									>
										<LucideIcon name="Check" class="hidden size-4 group-[&.active]/item:block" />
									</a>
									<a
										href="#!"
										class="group/item flex size-5 items-center justify-center rounded bg-green-500 text-white"
										class:active={activeLink === 'green'}
										on:click={(e) => {
											e.preventDefault();
											activeLink = 'green';
										}}
									>
										<LucideIcon name="Check" class="hidden size-4 group-[&.active]/item:block" />
									</a>
									<a
										href="#!"
										class="group/item flex size-5 items-center justify-center rounded bg-red-500 text-white"
										class:active={activeLink === 'red'}
										on:click={(e) => {
											e.preventDefault();
											activeLink = 'red';
										}}
									>
										<LucideIcon name="Check" class="hidden size-4 group-[&.active]/item:block" />
									</a>
								</div>

								<!-- Size Options -->
								<div class="mt-3 flex shrink-0 items-center gap-2 font-medium">
									<!-- Size S -->
									<a
										href="#!"
										class="dark:text-dark-500 text-gray-500"
										class:active={activeSize === 's'}
										class:text-green-500={activeSize === 's'}
										on:click={(e) => {
											e.preventDefault();
											activeSize = 's';
										}}
									>
										S
									</a>
									<!-- Size M -->
									<a
										href="#!"
										class="dark:text-dark-500 text-gray-500"
										class:active={activeSize === 'm'}
										class:text-green-500={activeSize === 'm'}
										on:click={(e) => {
											e.preventDefault();
											activeSize = 'm';
										}}
									>
										M
									</a>
									<!-- Size L -->
									<a
										href="#!"
										class="dark:text-dark-500 text-gray-500"
										class:active={activeSize === 'l'}
										class:text-green-500={activeSize === 'l'}
										on:click={(e) => {
											e.preventDefault();
											activeSize = 'l';
										}}
									>
										L
									</a>
									<!-- Size XL -->
									<a
										href="#!"
										class="dark:text-dark-500 text-gray-500"
										class:active={activeSize === 'xl'}
										class:text-green-500={activeSize === 'xl'}
										on:click={(e) => {
											e.preventDefault();
											activeSize = 'xl';
										}}
									>
										XL
									</a>
									<!-- Size 2XL -->
									<a
										href="#!"
										class="dark:text-dark-500 text-gray-500"
										class:active={activeSize === '2xl'}
										class:text-green-500={activeSize === '2xl'}
										on:click={(e) => {
											e.preventDefault();
											activeSize = '2xl';
										}}
									>
										2XL
									</a>
								</div>
							</div>

							<div class="mt-4 flex gap-2">
								<a href="/apps-ecommerce-shop-cart" class="btn btn-primary w-full">Buy Now</a>
								<a href="#!" class="btn btn-sub-gray btn-icon shrink-0">
									<LucideIcon name="ShoppingBasket" class="size-5" />
								</a>
							</div>
						</div>
					</CardBody>
				</div>
			</div>
		</Card>
	</Col>
</Grid>
