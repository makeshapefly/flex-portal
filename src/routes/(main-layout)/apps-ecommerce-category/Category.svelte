<script lang="ts">
	import { writable, derived } from 'svelte/store';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import { categoryStore, type Category } from './category';
	import { onMount } from 'svelte';

	// Define type for the form data and errors
	type FormFields = {
		categoryName: string;
		description: string;
		status: string;
	};
	// Reactive stores

	const currentPage = writable<number>(1);
	const rowsPerPage = 10;
	const sortBy = writable<string>('categoryId');
	const sortDirection = writable<string>('desc');
	const selectAll = writable<boolean>(false);
	let selectedItems: any[] = [];
	const searchQuery = writable<string>(''); // Store for search query
	const productForm = writable({
		categoryId: '',
		image: '',
		category: '',
		description: '',
		status: '',
		products: 0
	});

	const errors = writable<FormFields>({
		categoryName: '',
		description: '',
		status: ''
	});

	const showAddProductForm = writable(true); // Toggle for add/edit form view

	// Derived store for total pages
	const totalPages = derived(categoryStore, ($categoryStore) =>
		Math.ceil($categoryStore.length / rowsPerPage)
	);

	// Derived store for filtered and sorted paginated products
	const filteredProducts = derived(
		[categoryStore, searchQuery],
		([$categoryStore, $searchQuery]) => {
			const filtered = $categoryStore.filter((category) =>
				category.category.toLowerCase().includes($searchQuery.toLowerCase())
			);
			return filtered;
		}
	);

	const paginatedProducts = derived(
		[filteredProducts, currentPage, sortBy, sortDirection],
		([$filteredProducts, $currentPage, $sortBy, $sortDirection]) => {
			// Sort the filtered products
			const sorted = [...$filteredProducts].sort((a: any, b: any) => {
				const valA = a[$sortBy];
				const valB = b[$sortBy];

				if ($sortDirection === 'asc') {
					return valA < valB ? -1 : valA > valB ? 1 : 0;
				} else {
					return valA > valB ? -1 : valA < valB ? 1 : 0;
				}
			});

			// Paginate the sorted list
			return sorted.slice(($currentPage - 1) * rowsPerPage, $currentPage * rowsPerPage);
		}
	);

	let isAllSelected = false;
	// Toggle all checkboxes
	const toggleAll = () => {
		if (isAllSelected) {
			selectedItems = [];
		} else {
			selectedItems = [...$paginatedProducts];
		}
		isAllSelected = !isAllSelected;
		selectAll.set(isAllSelected);
	};

	// Toggle individual checkbox
	const toggleItem = (item: Category) => {
		const index = selectedItems.indexOf(item);
		if (index > -1) {
			selectedItems = selectedItems.filter((i) => i !== item);
		} else {
			selectedItems = [...selectedItems, item];
		}
		isAllSelected = selectedItems.length === $paginatedProducts.length;
		selectAll.set(isAllSelected);
	};

	// Delete selected categories from categoryStore
	// Delete selected categories from categoryStore
	const deleteSelected = () => {
		const filteredItems = $categoryStore.filter(
			(category: Category) => !selectedItems.includes(category)
		);

		// Update the store with the filtered items
		categoryStore.set(filteredItems);

		// Reset selected items and selection state
		selectedItems = [];
		isAllSelected = false;
		selectAll.set(false);
	};

	// Sorting logic
	const handleSort = (column: keyof Category) => {
		if ($sortBy === column) {
			sortDirection.set($sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			sortBy.set(column);
			sortDirection.set('asc');
		}
	};
	// Pagination logic
	const nextPage = () => {
		if ($currentPage < $totalPages) currentPage.set($currentPage + 1);
	};

	const prevPage = () => {
		if ($currentPage > 1) currentPage.set($currentPage - 1);
	};

	const gotoPage = (page: number) => {
		currentPage.set(page);
	};

	const validateField = (field: keyof FormFields, value: string, message: string) => {
		errors.update((prevErrors) => {
			prevErrors[field] = value.trim() === '' ? message : '';
			return prevErrors;
		});
	};

	const fileChosen = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const reader = new FileReader();
			reader.onload = () => {
				productForm.update((form) => {
					form.image = reader.result as string;
					return form;
				});
			};
			reader.readAsDataURL(input.files[0]);
		}
	};

	// Reset form
	const resetForm = () => {
		productForm.set({
			image: '',
			category: '',
			description: '',
			status: '',
			categoryId: '',
			products: 0
		});
		errors.set({
			categoryName: '',
			description: '',
			status: ''
		});
	};

	// Submit form (add category logic)
	const submitForm = () => {
		// Perform validation before submitting
		const formData = $productForm;
		let isValid = true;

		// Validate fields
		if (formData.category === '') {
			validateField('categoryName', formData.category, 'Category Name is required');
			isValid = false;
		}
		if (formData.description === '') {
			validateField('description', formData.description, 'Description is required');
			isValid = false;
		}
		if (formData.status === '') {
			validateField('status', formData.status, 'Status is required.');
			isValid = false;
		}
		if (isValid) {
			if ($showAddProductForm) {
				addCategoryForm();
			} else {
				// Edit category logic
				updateCategoryForm();
			}
			resetForm();
		}
	};

	const addCategoryForm = () => {
		const categoryId = `PEC-${19115 + $categoryStore.length}`;
		categoryStore.update((store) => {
			store.unshift({
				...$productForm,
				price: '$10',
				revenue: '0',
				products: 10,
				categoryId
			});
			return store;
		});
	};

	const getCategoryForUpdate = (category: Category) => {
		productForm.update(() => ({
			categoryId: String(category.categoryId),
			image: category.image,
			category: category.category, // Set category name
			description: category.description!,
			status: category.status,
			products: category.products
		}));
		showAddProductForm.set(false);
	};

	const updateCategoryForm = () => {
		categoryStore.update((categories) => {
			// Find the index of the category to update
			const index = categories.findIndex((c) => c.categoryId === $productForm.categoryId);

			if (index !== -1) {
				// Replace the old category with updated data using splice()
				categories.splice(index, 1, { ...($productForm as Category) });
			}

			return [...categories]; // Return a new array to trigger reactivity
		});
	};

	onMount(() => {
		categoryStore.update((store) => {
			store.forEach((category: Category, index: number) => {
				category.categoryId = `PEC-${19115 + index}`;
			});
			return store;
		});
	});
</script>

<Col cols={{ span: 12 }} lg={{ span: 7 }} xl={{ span: 8 }}>
	<Card>
		<CardHeader>
			<div class="grid grid-cols-12 items-center gap-3">
				<div class="col-span-3">
					<CardTitle>Category List</CardTitle>
				</div>

				<div class="col-span-4 col-start-9">
					<div class="flex gap-2">
						<div class="group/form relative grow">
							<input
								type="text"
								bind:value={$searchQuery}
								class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
								placeholder="Search for categories..."
							/>
							<button
								class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
							>
								<LucideIcon name="Search" class="size-4" />
							</button>
						</div>
						<!-- Delete Button: Only enabled if there are selected items -->
						{#if selectedItems.length > 0}
							<button class="btn btn-red btn-icon shrink-0" on:click={deleteSelected}>
								<LucideIcon name="Trash" class="size-4" />
							</button>
						{/if}
					</div>
				</div>
			</div>
		</CardHeader>
		<CardBody class="pt-0">
			<div class="table-box overflow-x-auto">
				<table class="hovered table">
					<thead>
						<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
							<th>
								<div class="input-check-group !font-medium">
									<label for="checkboxAll" class="input-check-label hidden"></label>
									<input
										id="checkboxAll"
										class="input-check input-check-primary whitespace-nowrap"
										type="checkbox"
										checked={isAllSelected}
										on:click={toggleAll}
									/>
								</div>
							</th>
							<th
								class="cursor-pointer !font-medium whitespace-nowrap"
								on:click={() => handleSort('categoryId')}
							>
								Category ID <span
									>{$sortBy === 'categoryId' ? ($sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th
								class="cursor-pointer !font-medium whitespace-nowrap"
								on:click={() => handleSort('category')}
							>
								Category Name <span
									>{$sortBy === 'category' ? ($sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th
								class="cursor-pointer !font-medium whitespace-nowrap"
								on:click={() => handleSort('products')}
							>
								Products <span
									>{$sortBy === 'products' ? ($sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th
								class="cursor-pointer !font-medium whitespace-nowrap"
								on:click={() => handleSort('status')}
							>
								status <span
									>{$sortBy === 'status' ? ($sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="!font-medium whitespace-nowrap">Action</th>
						</tr>
					</thead>
					<tbody>
						{#each $paginatedProducts as product, index}
							<tr>
								<td>
									<div class="input-check-group">
										<label for={`category${index}`} class="input-check-label hidden"></label>
										<input
											id={`category${index}`}
											class="input-check input-check-primary"
											type="checkbox"
											checked={selectedItems.includes(product)}
											on:click={() => toggleItem(product)}
										/>
									</div>
								</td>
								<td>
									<!-- Displaying Category ID -->
									<a href="#!" class="link link-primary">
										{product.categoryId}
									</a>
								</td>
								<td>
									<!-- Display Image and Category Name -->
									<div class="flex items-center gap-2">
										<!-- Image -->
										<div
											class="dark:border-dark-800 flex size-9 shrink-0 items-center justify-center rounded-sm border border-gray-200 p-1"
										>
											<img src={product.image} alt={product.category} class="rounded-sm" />
										</div>
										<!-- Category Name -->
										<h6><a href="#!" class="text-primary">{product.category}</a></h6>
									</div>
								</td>
								<td>{product.products}</td>
								<td>
									<span
										class={product.status === 'Active' ? 'badge badge-green' : 'badge badge-gray'}
									>
										{product.status}
									</span>
								</td>
								<td>
									<Dropdown class="dropdown">
										<DropdownButton
											type="button"
											class="dark:text-dark-500 flex items-center text-gray-500"
										>
											<i class="ri-more-2-fill"></i>
										</DropdownButton>
										<DropdownMenu class="dropdown-menu !fixed hidden p-2">
											<a href="#!" class="dropdown-item">
												<i class="ri-eye-line align-middle ltr:mr-2 rtl:ml-2"></i> Overview
											</a>
											<a
												href="#!"
												class="dropdown-item"
												on:click={() => getCategoryForUpdate(product)}
											>
												<i class="ri-pencil-line align-middle ltr:mr-2 rtl:ml-2"></i> Edit
											</a>
											<a href="#!" class="dropdown-item">
												<i class="ri-delete-bin-line align-middle ltr:mr-2 rtl:ml-2"></i> Delete
											</a>
										</DropdownMenu>
									</Dropdown>
								</td>
							</tr>
						{/each}
						{#if $paginatedProducts.length === 0}
							<tr>
								<td colspan="10" class="!p-8">
									<TableRowNotFound />
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>

			<!-- Pagination -->
			<div
				class="mt-space gap-space grid grid-cols-12 items-center"
				class:!hidden={$paginatedProducts.length === 0}
			>
				<div class="col-span-12 lg:col-span-6 justify-center lg:justify-start flex flex-wrap">
					<p class="dark:text-dark-500 text-gray-500">
						Showing <b>{($currentPage - 1) * rowsPerPage + 1}</b> -
						<b>{Math.min($currentPage * rowsPerPage, $categoryStore.length)}</b>
						of <b>{$categoryStore.length}</b> Results
					</p>
					{#if selectedItems.length > 0}
						<span><b>{selectedItems.length}</b> Row Selected</span>
					{/if}
				</div>
				<div class="col-span-12 md:col-span-6">
					<div class="pagination pagination-primary flex justify-end">
						<button on:click={prevPage} disabled={$currentPage === 1} class="pagination-pre">
							Prev
						</button>
						{#each Array($totalPages) as _, i}
							<button
								on:click={() => gotoPage(i + 1)}
								class="pagination-item"
								class:active={$currentPage === i + 1}
							>
								{i + 1}
							</button>
						{/each}
						<button
							on:click={nextPage}
							disabled={$currentPage === $totalPages}
							class="pagination-next"
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</CardBody>
	</Card>
</Col>

<Col cols={{ span: 12 }} lg={{ span: 5 }} xl={{ span: 4 }}>
	<div class="card sticky top-24">
		<CardHeader>
			<CardTitle>Add New Category</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="grid grid-cols-12 gap-5" style="display: {showAddProductForm ? 'grid' : 'none'};">
				<div class="col-span-12">
					<div>
						<label
							for="logo"
							class="dark:bg-dark-850 dark:border-dark-800 mx-auto flex size-32 cursor-pointer items-center justify-center overflow-hidden rounded border border-gray-200 bg-gray-100 p-2"
						>
							{#if $productForm.image}
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img
									src={$productForm.image}
									class="h-full w-full object-cover"
									alt="Category Image"
								/>
							{:else}
								<span class="dark:text-dark-500 flex flex-col items-center text-gray-500">
									<LucideIcon name="Upload" />
									<span class="mt-2 block">Upload Images</span>
								</span>
							{/if}
						</label>
						<div class="mt-4 hidden">
							<label class="block">
								<span class="sr-only">Choose profile photo</span>
								<input
									type="file"
									name="logo"
									id="logo"
									on:change={fileChosen}
									class="block w-full text-sm text-slate-500 file:mr-4 file:rounded-md file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 focus:outline-0"
								/>
							</label>
						</div>
					</div>
				</div>

				<div class="col-span-12">
					<label for="categoryNameInput" class="form-label">Category Name</label>
					<input
						type="text"
						id="categoryNameInput"
						class="form-input"
						placeholder="Category name"
						bind:value={$productForm.category}
						on:input={() =>
							validateField('categoryName', $productForm.category, 'Category Name is required')}
					/>
					{#if $errors.categoryName}
						<span class="text-red-500">{$errors.categoryName}</span>
					{/if}
				</div>

				<div class="col-span-12">
					<label for="descriptionTextarea" class="form-label">Description</label>
					<textarea
						name="descriptionTextarea"
						id="descriptionTextarea"
						rows="3"
						class="form-input h-auto"
						placeholder="Enter your description"
						bind:value={$productForm.description}
						on:input={() =>
							validateField('description', $productForm.description, 'Description is required')}
					></textarea>
					{#if $errors.description}
						<span class="text-red-500">{$errors.description}</span>
					{/if}
				</div>

				<div class="col-span-12">
					<label for="statusSelect" class="form-label">Status</label>
					<select
						id="statusSelect"
						class="form-input"
						bind:value={$productForm.status}
						on:change={() => validateField('status', $productForm.status, 'Status is required.')}
					>
						<option value="">Select Status</option>
						<option value="Active">Active</option>
						<option value="Inactive">Inactive</option>
					</select>
					{#if $errors.status}
						<span class="text-red-500">{$errors.status}</span>
					{/if}
				</div>

				<div class="col-span-12 flex items-center justify-end gap-2">
					<button class="btn btn-sub-gray" on:click={resetForm}>
						<LucideIcon
							name="RotateCcw"
							class="align-center inline-block size-4 ltr:mr-1 rtl:ml-1"
						/>
						<span class="align-middle">Reset</span>
					</button>
					<button class="btn btn-primary" on:click={submitForm}>
						<span class="align-middle">{showAddProductForm ? 'Add Category' : 'Edit Category'}</span
						>
					</button>
				</div>
			</div>
		</CardBody>
	</div>
</Col>
