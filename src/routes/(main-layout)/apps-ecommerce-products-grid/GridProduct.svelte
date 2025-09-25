<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Drawer from '$lib/components/ui/drawer/Drawer.svelte';
	import DrawerBody from '$lib/components/ui/drawer/DrawerBody.svelte';
	import DrawerContent from '$lib/components/ui/drawer/DrawerContent.svelte';
	import DrawerHeader from '$lib/components/ui/drawer/DrawerHeader.svelte';
	import DrawerTrigger from '$lib/components/ui/drawer/DrawerTrigger.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import TableRowNogFound from '$lib/components/tables/TableRowNotFound.svelte';
	import { productGrid } from './product-grid';

	let selectedFilters = ['Fashion', 'M', 'Green', '$200 - $600'];
	let showAll = true;
	let selectedColors: string[] = [];
	let selectedSort: string = 'bestSeller';

	function toggleFilterVisibility() {
		showAll = !showAll;
	}

	function removeFilter(filter: string) {
		selectedFilters = selectedFilters.filter((f) => f !== filter);
	}

	// Component's state variables
	let displayedProducts = productGrid;
	let currentPage = 1;
	const productsPerPage = 8;

	// Calculate total pages based on the number of products and products per page
	let totalPages = Math.ceil(displayedProducts.length / productsPerPage);
	let showingStart = (currentPage - 1) * productsPerPage + 1;
	let showingEnd = Math.min(showingStart + productsPerPage - 1, displayedProducts.length);

	// Handle pagination
	function gotoPage(page: number) {
		currentPage = page;
		updatePagination();
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
			updatePagination();
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
			updatePagination();
		}
	}

	// Update pagination details
	function updatePagination() {
		showingStart = (currentPage - 1) * productsPerPage + 1;
		showingEnd = Math.min(showingStart + productsPerPage - 1, displayedProducts.length);
	}
	let buttonRef: any;
	let dropdownRef: any;
	let dropdownPosition = { top: 0, left: 0 };

	$: if (openDropdownIndex !== null && buttonRef && dropdownRef) {
		dropdownPosition = calculatePosition(buttonRef, dropdownRef);
	}
	let openDropdownIndex: null = null;

	function toggleDropdown(index: any) {
		if (openDropdownIndex === index) {
			openDropdownIndex = null; // Close if already open
		} else {
			openDropdownIndex = index; // Open new dropdown
		}
	}

	// Dropdown positioning logic
	function calculatePosition(buttonRef: { getBoundingClientRect: () => any }, dropdownRef: any) {
		const buttonRect = buttonRef.getBoundingClientRect();
		const dropdown = dropdownRef;
		let left = 0;
		let top = buttonRect.bottom;

		// Ensure dropdown stays within screen boundaries
		if (window.innerWidth < buttonRect.right + dropdown.offsetWidth) {
			left = buttonRect.left - dropdown.clientWidth;
		} else {
			left = buttonRect.left;
		}

		if (window.innerHeight < buttonRect.top + dropdown.offsetHeight) {
			top = buttonRect.top - dropdown.clientHeight;
		}

		return { top, left };
	}
	let selectedCategories: string[] = [];
	let showMore = false;

	// Function to handle checkbox changes
	function updateCountCategory(event: Event) {
		const input = event.target as HTMLInputElement;
		const category = input.value;

		if (input.checked) {
			selectedCategories = [...selectedCategories, category];
		} else {
			selectedCategories = selectedCategories.filter((item) => item !== category);
		}
	}
	// Function to handle color checkbox changes
	function updateCountColor(event: Event) {
		const input = event.target as HTMLInputElement;
		const color = input.value;

		if (input.checked) {
			selectedColors = [...selectedColors, color];
		} else {
			selectedColors = selectedColors.filter((item) => item !== color);
		}
	}

	// Toggle function for showing more categories
	function toggleShowMore() {
		showMore = !showMore;
	}

	// Count of selected categories
	$: selectedCount = selectedCategories.length;
	$: selectedCount2 = selectedColors.length;
</script>

<div class="mb-5 flex flex-wrap items-center gap-5">
	<div class="grow">
		<h6 class="card-title mb-1">Popular Products</h6>
		<p class="dark:text-dark-500 text-gray-500">Track your store's progress to boost your sales.</p>
	</div>
	<div class="flex shrink-0 gap-2">
		<Drawer class="fixed">
			<DrawerTrigger
				icon="SlidersHorizontal"
				text="Filters"
				color="gray"
				class="btn btn-sub-gray"
			/>
			<DrawerContent size="medium">
				<DrawerHeader>
					<h6 class="text-15">Filter & Sorting</h6>
				</DrawerHeader>
				<DrawerBody>
					<div class="group/form relative">
						<input
							type="email"
							class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
							placeholder="Search products, price etc..."
						/>
						<button
							class="dark:text-dark-500 rtl absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
						>
							<LucideIcon name="Search" class="size-4" />
						</button>
					</div>
					<div class="mt-5">
						<div class="mb-3 flex items-center gap-4">
							<h6 class="grow">Selected Filters</h6>
							<a href="#!" class="link link-primary text-sm" on:click={toggleFilterVisibility}>
								Clear All
								<LucideIcon name="X" class="inline-block size-4" />
							</a>
						</div>
						<div class="flex flex-wrap items-center gap-2">
							{#each selectedFilters as filter}
								<span class="badge badge-gray">
									<span>{filter}</span>
									<a href="#!" on:click={() => removeFilter(filter)} aria-label="Remove filter">
										<i class="ri-close-fill align-bottom ltr:ml-1 rtl:mr-1"></i>
									</a>
								</span>
							{/each}
						</div>
					</div>
					<div class="mt-5">
						<h6 class="mb-3">Product Category (<span>{selectedCount}</span>)</h6>

						<div class="space-y-2">
							<!-- Checkbox items -->
							<div class="input-check-group">
								<input
									id="productCategory1"
									class="input-check input-check-primary"
									type="checkbox"
									value="Fashion"
									on:change={updateCountCategory}
								/>
								<label for="productCategory1" class="input-check-label">Fashion</label>
							</div>
							<div class="input-check-group">
								<input
									id="productCategory2"
									class="input-check input-check-primary"
									type="checkbox"
									value="Footwear"
									on:change={updateCountCategory}
								/>
								<label for="productCategory2" class="input-check-label">Footwear</label>
							</div>
							<div class="input-check-group">
								<input
									id="productCategory3"
									class="input-check input-check-primary"
									type="checkbox"
									value="Bags"
									on:change={updateCountCategory}
								/>
								<label for="productCategory3" class="input-check-label">Bags</label>
							</div>
							<div class="input-check-group">
								<input
									id="productCategory4"
									class="input-check input-check-primary"
									type="checkbox"
									value="Watch"
									on:change={updateCountCategory}
								/>
								<label for="productCategory4" class="input-check-label">Watch</label>
							</div>
							<div class="input-check-group">
								<input
									id="productCategory5"
									class="input-check input-check-primary"
									type="checkbox"
									value="Accessories"
									on:change={updateCountCategory}
								/>
								<label for="productCategory5" class="input-check-label">Accessories</label>
							</div>

							<!-- Additional Categories -->
							{#if showMore}
								<div class="space-y-2">
									<div class="input-check-group">
										<input
											id="productCategory6"
											class="input-check input-check-primary"
											type="checkbox"
											value="Jewelry"
											on:change={updateCountCategory}
										/>
										<label for="productCategory6" class="input-check-label">Jewelry</label>
									</div>
									<div class="input-check-group">
										<input
											id="productCategory7"
											class="input-check input-check-primary"
											type="checkbox"
											value="Sunglasses"
											on:change={updateCountCategory}
										/>
										<label for="productCategory7" class="input-check-label">Sunglasses</label>
									</div>
									<div class="input-check-group">
										<input
											id="productCategory8"
											class="input-check input-check-primary"
											type="checkbox"
											value="Belts"
											on:change={updateCountCategory}
										/>
										<label for="productCategory8" class="input-check-label">Belts</label>
									</div>
								</div>
							{/if}

							<!-- Show more button -->
							<a href="#!" class="link link-primary mt-3 block" on:click={toggleShowMore}>
								{#if showMore}
									<span>Show Less<LucideIcon name="ChevronUp" class="inline-block size-4" /></span>
								{:else}
									<span>Show More<LucideIcon name="ChevronDown" class="inline-block size-4" /></span
									>
								{/if}
							</a>
						</div>
					</div>
					<div class="mt-5">
						<h6 class="mb-3">Colors (<span>{selectedCount2}</span>)</h6>

						<div class="space-y-2">
							<!-- Checkbox items -->
							<div class="input-check-group">
								<input
									id="productColor1"
									class="input-check input-check-primary"
									type="checkbox"
									value="bg-primary-50"
									on:change={updateCountColor}
								/>
								<label for="productColor1" class="input-check-label">Blue</label>
							</div>
							<div class="input-check-group">
								<input
									id="productColor2"
									class="input-check input-check-primary"
									type="checkbox"
									value="bg-green-50"
									on:change={updateCountColor}
								/>
								<label for="productColor2" class="input-check-label">Green</label>
							</div>
							<div class="input-check-group">
								<input
									id="productColor3"
									class="input-check input-check-primary"
									type="checkbox"
									value="bg-red-50"
									on:change={updateCountColor}
								/>
								<label for="productColor3" class="input-check-label">Red</label>
							</div>
							<div class="input-check-group">
								<input
									id="productColor4"
									class="input-check input-check-primary"
									type="checkbox"
									value="bg-yellow-50"
									on:change={updateCountColor}
								/>
								<label for="productColor4" class="input-check-label">Yellow</label>
							</div>
							<div class="input-check-group">
								<input
									id="productColor5"
									class="input-check input-check-primary"
									type="checkbox"
									value="bg-sky-50"
									on:change={updateCountColor}
								/>
								<label for="productColor5" class="input-check-label">Sky</label>
							</div>

							<!-- Additional Colors (only shown if `showMore` is true) -->
							{#if showMore}
								<div class="space-y-2">
									<div class="input-check-group">
										<input
											id="productColor6"
											class="input-check input-check-primary"
											type="checkbox"
											value="bg-pink-50"
											on:change={updateCountColor}
										/>
										<label for="productColor6" class="input-check-label">Pink</label>
									</div>
									<div class="input-check-group">
										<input
											id="productColor7"
											class="input-check input-check-primary"
											type="checkbox"
											value="bg-indigo-50"
											on:change={updateCountColor}
										/>
										<label for="productColor7" class="input-check-label">Black</label>
									</div>
									<div class="input-check-group">
										<input
											id="productColor8"
											class="input-check input-check-primary"
											type="checkbox"
											value="bg-gray-50"
											on:change={updateCountColor}
										/>
										<label for="productColor8" class="input-check-label">Gray</label>
									</div>
								</div>
							{/if}

							<!-- Show more button -->
							<a href="#!" class="link link-primary mt-3 block" on:click={toggleShowMore}>
								{#if showMore}
									<span>Show Less<LucideIcon name="ChevronUp" class="inline-block size-4" /></span>
								{:else}
									<span>Show More<LucideIcon name="ChevronDown" class="inline-block size-4" /></span
									>
								{/if}
							</a>
						</div>
					</div>
					<div class="mt-5">
						<h6 class="mb-3">Sort By</h6>

						<div class="space-y-2">
							<!-- Best Sellers Radio Button -->
							<div class="input-radio-group">
								<input
									id="bestSellerByRadio"
									class="input-radio input-radio-primary"
									type="radio"
									name="sortBy"
									value="bestSeller"
									bind:group={selectedSort}
								/>
								<label for="bestSellerByRadio" class="input-radio-label">Best Sellers</label>
							</div>

							<!-- New Arrivals Radio Button -->
							<div class="input-radio-group">
								<input
									id="newArrivalsSortBy"
									class="input-radio input-radio-primary"
									type="radio"
									name="sortBy"
									value="newArrivals"
									bind:group={selectedSort}
								/>
								<label for="newArrivalsSortBy" class="input-radio-label">New Arrivals</label>
							</div>

							<!-- Trading Radio Button -->
							<div class="input-radio-group">
								<input
									id="tradingSortBy"
									class="input-radio input-radio-primary"
									type="radio"
									name="sortBy"
									value="trading"
									bind:group={selectedSort}
								/>
								<label for="tradingSortBy" class="input-radio-label">Trading</label>
							</div>

							<!-- Price (Low to High) Radio Button -->
							<div class="input-radio-group">
								<input
									id="lowToHighSortBy"
									class="input-radio input-radio-primary"
									type="radio"
									name="sortBy"
									value="lowToHigh"
									bind:group={selectedSort}
								/>
								<label for="lowToHighSortBy" class="input-radio-label">Price (Low to High)</label>
							</div>

							<!-- Price (High to Low) Radio Button -->
							<div class="input-radio-group">
								<input
									id="highToLowSortBy"
									class="input-radio input-radio-primary"
									type="radio"
									name="sortBy"
									value="highToLow"
									bind:group={selectedSort}
								/>
								<label for="highToLowSortBy" class="input-radio-label">Price (High to Low)</label>
							</div>
						</div>
					</div>
				</DrawerBody>
				<div class="flex items-center justify-end gap-2 border-t border-slate-200 p-4">
					<button class="btn btn-sub-gray"
						><LucideIcon
							name="X"
							class="align-center inline-block size-4 ltr:mr-1 rtl:ml-1"
						/>Reset</button
					>
					<button class="btn btn-primary"
						><LucideIcon
							name="SlidersHorizontal"
							class="align-center inline-block size-4 ltr:mr-1 rtl:ml-1"
						/> <span class="align-middle">Filter</span></button
					>
				</div>
			</DrawerContent>
		</Drawer>

		<a href="/apps-ecommerce-create-products" class="btn btn-primary">
			<LucideIcon name="Plus" class="rt:ml-1 align-center inline-block size-4 ltr:mr-1" />
			Add Product
		</a>
	</div>
</div>

<div>
	<div class="grid grid-cols-1 gap-x-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each displayedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage) as product, index (product.productName)}
			<div class="card hovered">
				<CardBody class="p-2">
					<div class="relative p-5 {product.color}">
						<Dropdown
							class="dropdown absolute top-2 right-2"
							alignTo="none"
							transition="scale"
						>
							<DropdownButton
								class="link link-red dark:bg-dark-850 flex size-10 items-center justify-center rounded-full bg-white"
							>
								<i class="ri-more-2-fill"></i>
							</DropdownButton>

							<DropdownMenu class="dropdown-menu dropdown-right p-2 !bg-white">
								<a href="#!" class="dropdown-item">
									<i class="ri-eye-line align-middle ltr:mr-1 rtl:ml-1"></i> Overview
								</a>

								<a href="#!" class="dropdown-item">
									<i class="ri-pencil-line align-middle ltr:mr-1 rtl:ml-1"></i> Edit
								</a>

								<a href="#!" class="dropdown-item">
									<i class="ri-delete-bin-6-line align-middle ltr:mr-1 rtl:ml-1"></i> Delete
								</a>
							</DropdownMenu>
						</Dropdown>
						<img src={product.image} alt={product.productName} />
					</div>
					<div class="mt-2 p-1">
						<h5 class="mb-2">{product.price}</h5>
						<h6 class="mb-1">
							<a href="/apps-ecommerce-product-overview">{product.productName}</a>
						</h6>
						<p class="dark:text-dark-500 text-gray-500">{product.category}</p>
						<div class="mt-3 flex gap-2">
							<button type="button" class="btn btn-primary w-full">Add to Cart</button>
							<a href="#!" class="btn btn-sub-gray btn-icon shrink-0" aria-label="Favorite product"
								><i class="ri-heart-line text-lg"></i></a
							>
						</div>
					</div>
				</CardBody>
			</div>
		{/each}

		{#if displayedProducts.length === 0}
			<TableRowNogFound />
		{/if}
	</div>

	{#if displayedProducts.length > 0}
		<div class="mb-5 grid grid-cols-12 items-center gap-5">
			<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
				<p class="dark:text-dark-500 text-gray-500">
					Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{displayedProducts.length}</b> Results
				</p>
			</div>
			<div class="col-span-12 md:col-span-6">
				<div class="pagination pagination-primary flex justify-center md:justify-end">
					<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
						<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
						Prev
					</button>
					{#each Array(totalPages)
						.fill(0)
						.map((_, i) => i + 1) as page}
						<button
							on:click={() => gotoPage(page)}
							class="pagination-item {currentPage === page ? 'active' : ''}"
						>
							{page}
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
</div>
