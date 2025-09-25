<script lang="ts">
	import 'nouislider/dist/nouislider.css';
	import 'wnumb/wNumb.js';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Select from '$lib/components/forms/form-select/Select.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import { products, type Product } from './product';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';

	let displayedProducts = [...products];
	let currentPage = 1;
	let itemsPerPage = 10;
	let totalPages = Math.ceil(displayedProducts.length / itemsPerPage);
	let isAllSelected = false;
	let selectedItems: any[] = [];
	let sortBy: string = 'productId'; // Default sort field
	let sortDirection: 'asc' | 'desc' = 'asc'; // Default sort direction
	let minPrice: 0;
	let maxPrice: 100;
	let searchTerm = '';
	let filteredProducts = [...products];
	let startID = 19115;
	let isAnyItemSelected = false;

	function sort(field: string) {
		sortBy = field; // Set the sort field
		sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'; // Toggle sort direction

		filteredProducts.sort((a: any, b: any) => {
			const valueA = a[field as keyof Product];
			const valueB = b[field as keyof Product];

			let comparison = 0;

			// Compare numbers
			if (typeof valueA === 'number' && typeof valueB === 'number') {
				comparison = valueA - valueB;
			}
			// Compare strings
			else if (typeof valueA === 'string' && typeof valueB === 'string') {
				comparison = valueA.localeCompare(valueB);
			}

			// Reverse the comparison if sorting in descending order
			return sortDirection === 'desc' ? comparison * -1 : comparison;
		});
	}
	// Pagination logic
	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
			paginate();
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
			paginate();
		}
	}

	function gotoPage(pageNumber: number) {
		currentPage = pageNumber;
		paginate();
	}

	// Paginate products
	function paginate() {
		const start = (currentPage - 1) * itemsPerPage;
		const end = currentPage * itemsPerPage;
		displayedProducts = filteredProducts.slice(start, end);
	}

	// Calculate total pages
	$: totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	// Watch for filtered products and update pagination
	$: paginate();

	function toggleStatus(product: Product, isChecked: boolean) {
		product.status = isChecked ? 'Published' : 'Inactive';
	}

	// Function to handle item toggle (example placeholder)
	const toggleItem = (product: Product) => {
		if (selectedItems.includes(product)) {
			selectedItems = selectedItems.filter((item) => item !== product);
		} else {
			selectedItems = [...selectedItems, product];
		}
	};

	// Handle select all functionality
	const toggleAll = () => {
		if (selectedItems.length === displayedProducts.length) {
			selectedItems = [];
			isAllSelected = false;
		} else {
			selectedItems = [...displayedProducts];
			isAllSelected = true;
		}
	};
	const deleteSelected = () => {
		// Remove selected items only from `filteredProducts`
		filteredProducts = filteredProducts.filter((product) => !selectedItems.includes(product));

		// Clear selected items after deletion
		selectedItems = [];
		isAllSelected = false;
		// Reset pagination to avoid issues when deleting on later pages
		currentPage = 1;
		paginate();
	};

	// Function to filter products based on search term
	function filterProducts() {
		filteredProducts = products.filter((product) => {
			return (
				product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.category.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});
		// Reset pagination when filtering
		currentPage = 1;
		paginate();
	}
	let selectedProductId: number | null | string = null;
	const setProductToDelete = (id: number | string) => {
		selectedProductId = id;
	};
	const deleteItem = (id: any) => {
		console.log(`Deleting product with ID: ${id}`);
	};

	// Watch for changes in searchTerm to re-filter the products
	$: filterProducts();
	$: isAnyItemSelected = selectedItems.length > 0;
</script>

<CardHeader class="card-header">
	<div class="flex flex-wrap items-center gap-5">
		<div class="grow">
			<h6 class="card-title mb-1">Products List</h6>
			<p class="dark:text-dark-500 text-gray-500">
				Track your store's progress to boost your sales.
			</p>
		</div>
		<div class="flex shrink-0 flex-wrap gap-2">
			<button class="btn btn-sub-gray"
				><LucideIcon
					name="Download"
					class="align-center inline-block size-4 ltr:mr-1 rtl:ml-1"
				/>Export</button
			>
			<a href="/apps-ecommerce-create-products" class="btn btn-primary"
				><LucideIcon name="Plus" class="align-center inline-block size-4 ltr:mr-1 rtl:ml-1" /> Add Product</a
			>
		</div>
	</div>
</CardHeader>
<CardBody>
	<div class="flex flex-wrap justify-between gap-2">
		<div>
			<div class="group/form relative">
				<input
					type="text"
					bind:value={searchTerm}
					on:input={filterProducts}
					class="form-input ltr:pl-9 ltr:group-[&.right]/form:pl-4 ltr:group-[&.right]/form:pr-9 rtl:pr-9 rtl:group-[&.right]/form:pl-9 rtl:group-[&.right]/form:pr-4"
					placeholder="Search for ..."
				/>
				<div
					class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:left-auto ltr:group-[&.right]/form:right-3 rtl:right-3 rtl:group-[&.right]/form:left-3 rtl:group-[&.right]/form:right-auto"
				>
					<LucideIcon name="Search" class="size-4" />
				</div>
			</div>
		</div>
		<!--end col-->
		<div>
			<div class="flex items-center gap-3">
				{#if selectedItems.length > 0}
					<button class="btn btn-red btn-icon" on:click={deleteSelected}>
						<LucideIcon name="Trash" class="inline-block size-4" />
					</button>
				{/if}
				<Dropdown class="dropdown shrink-0">
					<DropdownButton type="button" title="dropdown-button" class="btn btn-sub-gray">
						<LucideIcon name="Filter" class="align-center inline-block size-4 ltr:mr-1 rtl:ml-1" /> Filters
					</DropdownButton>

					<DropdownMenu class="dropdown-right !w-64 p-3">
						<h6 class="mb-4">Filter Options</h6>

						<form on:submit|preventDefault={filterProducts}>
							<h6 class="mb-2 text-sm">Status</h6>
							<div class="grid grid-cols-2 gap-4">
								<div class="input-check-group">
									<input type="checkbox" id="publishedCheckbox" value="Published" />
									<label for="publishedCheckbox" class="input-check-label">Published</label>
								</div>
								<div class="input-check-group">
									<input type="checkbox" id="inactiveCheckbox" value="Inactive" />
									<label for="inactiveCheckbox" class="input-check-label">Inactive</label>
								</div>

								<div class="col-span-2">
									<!-- svelte-ignore a11y-label-has-associated-control -->
									<label class="form-label mb-3">Price Range</label>
									<input
										type="range"
										min="0"
										max="500"
										bind:value={minPrice}
										class="range-slider"
									/>
									<input
										type="range"
										min="0"
										max="500"
										bind:value={maxPrice}
										class="range-slider"
									/>
								</div>
							</div>

							<div class="mt-5 flex items-center justify-end gap-2 pt-1">
								<button
									type="reset"
									class="btn-sm btn btn-sub-gray"
									on:click={() => {
										filterProducts();
									}}
								>
									Reset
								</button>
								<button type="submit" class="btn-sm btn btn-primary"> Apply </button>
							</div>
						</form>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	</div>
	<!--end grid-->
</CardBody>

<CardBody class="pt-0">
	<div>
		<div class="table-box overflow-x-auto">
			<table class="hovered table">
				<tbody>
					<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
						<th class="!font-medium">
							<div class="input-check-group">
								<label for="checkboxAll" class="input-check-label hidden"></label>
								<input
									id="checkboxAll"
									class="input-check input-check-primary"
									type="checkbox"
									checked={isAllSelected}
									on:change={toggleAll}
								/>
							</div>
						</th>
						<th on:click={() => sort('productId')} class="cursor-pointer !font-medium">
							Product ID <span
								>{sortBy === 'productId' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
						<th on:click={() => sort('productName')} class="cursor-pointer !font-medium">
							Product <span
								>{sortBy === 'productName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
						<th on:click={() => sort('category')} class="cursor-pointer !font-medium">
							Category <span
								>{sortBy === 'category' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
						<th class="cursor-pointer !font-medium">Stock</th>
						<th on:click={() => sort('price')} class="cursor-pointer !font-medium">
							Price <span>{sortBy === 'price' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th on:click={() => sort('qty')} class="cursor-pointer !font-medium">
							QTY <span>{sortBy === 'qty' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th on:click={() => sort('revenue')} class="cursor-pointer !font-medium">
							Revenue <span
								>{sortBy === 'revenue' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
						<th on:click={() => sort('status')} class="cursor-pointer !font-medium">
							status <span>{sortBy === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th class="!font-medium">Action</th>
					</tr>

					{#each displayedProducts as product, index (product.productName)}
						<tr>
							<td class="whitespace-nowrap">
								<div class="input-check-group">
									<!-- svelte-ignore a11y-label-has-associated-control -->
									<label class="input-check-label hidden"></label>
									<input
										class="input-check input-check-primary"
										type="checkbox"
										on:click={() => toggleItem(product)}
										checked={selectedItems.includes(product)}
									/>
								</div>
							</td>
							<td class="whitespace-nowrap"
								><a href="#!" class="link link-primary"> PEP-{startID + index}</a></td
							>
							<td class="whitespace-nowrap">
								<div class="flex items-center gap-2">
									<div
										class="dark:border-dark-800 flex size-9 items-center justify-center rounded border border-gray-200 p-1"
									>
										<img src={product.image} alt="" class="rounded" />
									</div>
									<h6><a href="/apps-ecommerce-product-overview">{product.productName}</a></h6>
								</div>
							</td>
							<td>{product.category}</td>
							<td class="whitespace-nowrap">
								<label for={`toggleStatus_${index}`} class="switch-group switch-soft">
									<div class="relative">
										<input
											type="checkbox"
											id={`toggleStatus_${index}`}
											class="peer sr-only"
											checked={product.status === 'Published'}
											on:change={(e) => toggleStatus(product, e.target.checked)}
										/>
										<div class="switch-wrapper peer-checked:!bg-purple-500/15"></div>
										<div
											class="switch-dot peer-checked:translate-x-full peer-checked:!bg-purple-500 rtl:peer-checked:-translate-x-full"
										></div>
									</div>
								</label>
							</td>
							<td>{product.price}</td>
							<td>{product.qty}</td>
							<td>{product.revenue}</td>
							<td class="whitespace-nowrap">
								<span
									class={product.status === 'Published' ? 'badge badge-green' : 'badge badge-gray'}
								>
									{product.status}
								</span>
							</td>
							<td class="whitespace-nowrap">
								<Dropdown class="dropdown">
									<DropdownButton
										type="button"
										class="dark:text-dark-500 flex items-center text-gray-500"
									>
										<i class="ri-more-2-fill"></i>
									</DropdownButton>
									<DropdownMenu class="dropdown-menu !fixed hidden p-2">
										<a href="/apps-ecommerce-product-overview" class="dropdown-item">
											<i class="ri-eye-line"></i> Overview
										</a>

										<a href="/apps-ecommerce-create-products" class="dropdown-item">
											<i class="ri-pencil-line"></i> Edit
										</a>
										<!-- on:click={() => setProductToDelete(product.productId)} -->
										<ModalTrigger
											text="Delete"
											modalId="delete-file-modal"
											icon="Trash2"
											color=""
											btnSizeClass=""
											iconClass=" "
											btnClass=""
											class="dropdown-item justify-start"
										></ModalTrigger>
									</DropdownMenu>
								</Dropdown>
							</td>
						</tr>
					{/each}

					{#if filteredProducts.length === 0}
						<tr>
							<td colspan="10" class="!p-8">
								<TableRowNotFound />
							</td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>

		<div
			class="mt-5 grid grid-cols-12 items-center gap-5"
			class:hidden={displayedProducts.length === 0}
		>
			<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
				<p class="dark:text-dark-500 text-gray-500 ltr:pr-1 rtl:pl-1">
					Showing {1 + (currentPage - 1) * itemsPerPage} - {Math.min(
						currentPage * itemsPerPage,
						displayedProducts.length
					)} of {displayedProducts.length} Results
				</p>
				{#if selectedItems.length > 0}
					<span>{selectedItems.length > 0 ? selectedItems.length : ''} Row Selected</span>
				{/if}
			</div>

			<div class="col-span-12 md:col-span-6">
				<div class="pagination pagination-primary flex justify-end">
					<button on:click={prevPage} class="pagination-pre" disabled={currentPage === 1}>
						<LucideIcon name="ChevronLeft" class="mr-1 size-4" />Prev
					</button>

					{#each Array(totalPages) as _, pageIndex}
						<button
							on:click={() => gotoPage(pageIndex + 1)}
							class="pagination-item"
							class:active={currentPage === pageIndex + 1}
						>
							{pageIndex + 1}
						</button>
					{/each}

					<button on:click={nextPage} class="pagination-next" disabled={currentPage === totalPages}>
						Next<LucideIcon name="ChevronRight" class="ml-1 size-4" />
					</button>
				</div>
			</div>
		</div>
	</div>
</CardBody>
<DeleteComponent />
