<script lang="ts">
	import { onMount } from 'svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalClose from '$lib/components/ui/modal/ModalClose.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { orders } from './ecommerce';
	import { products, type Product } from './order-list';

	let activeTab = 'All';
	let dropdownRef: HTMLDivElement;
	let displayedProducts = [...products];
	let selectedProduct: Product = displayedProducts[0];
	let selectedItems: any[] = [];
	let currentPage = 1;
	let itemsPerPage = 10;
	let sortBy = '';
	let sortDirection = 'asc';
	let isDropdownOpen = false;
	let filteredProducts = [...products];

	const orderTabs = ['All', 'New', 'Pending', 'Delivered', 'Shipping', 'Cancelled'];

	// Function to filter products based on selected status
	const filterProducts = () => {
		if (activeTab === 'All') {
			filteredProducts = [...products];
		} else {
			filteredProducts = products.filter((product) => product.status === activeTab);
		}
		currentPage = 1;
	};

	// Method for handling order status change (called when a tab is clicked)
	const orderStatus = (status: string) => {
		activeTab = status;
		filterProducts();
	};

	// Sorting function to sort the filtered products
	const sort = (column: string) => {
		sortDirection = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
		sortBy = column;
		filteredProducts = [...filteredProducts].sort((a: any, b: any) => {
			if (a[column] < b[column]) return sortDirection === 'asc' ? -1 : 1;
			if (a[column] > b[column]) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
	};

	// Pagination helpers
	$: totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
	$: showingStart = (currentPage - 1) * itemsPerPage + 1;
	$: showingEnd = Math.min(currentPage * itemsPerPage, filteredProducts.length);
	const prevPage = () => (currentPage = Math.max(1, currentPage - 1));
	const nextPage = () => (currentPage = Math.min(totalPages, currentPage + 1));
	const gotoPage = (page: number) => (currentPage = page);

	// Toggle checkboxes
	const toggleItem = (product: any) => {
		if (selectedItems.includes(product)) {
			selectedItems = selectedItems.filter((item) => item !== product);
		} else {
			selectedItems = [...selectedItems, product];
		}
	};

	const toggleAll = () => {
		if (selectedItems.length === displayedProducts.length) {
			selectedItems = [];
		} else {
			selectedItems = [...displayedProducts];
		}
	};

	$: paginatedProducts = filteredProducts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	interface Form {
		ordersID: string;
		ordersDate: string;
		deliveredDate: string;
		customersName: string;
		qty: number;
		price: number;
		total: number;
		productName: string;
		payment: string;
		status: string;
	}

	interface Errors {
		[key: string]: string;
	}

	let form: Form = {
		ordersID: 'PEO-14565',
		ordersDate: '',
		deliveredDate: '',
		customersName: '',
		qty: 1,
		price: 0,
		total: 0,
		productName: '',
		payment: '',
		status: ''
	};

	let errors: Errors = {};

	const validateField = (field: keyof Form, value: string | number, errorMsg: string): void => {
		if (!value) {
			errors[field] = errorMsg;
		} else {
			delete errors[field];
		}
	};

	const increaseQty = (): void => {
		form.qty += 1;
		updateTotalPrice();
	};

	const decreaseQty = (): void => {
		if (form.qty > 1) {
			form.qty -= 1;
			updateTotalPrice();
		}
	};

	const updateTotalPrice = (): void => {
		form.total = form.qty * form.price;
	};

	const submitForm = (): void => {
		// Add form submission logic here
		console.log('Form submitted:', form);
	};

	function overviewData(orderData: Product) {
		selectedProduct = { ...orderData };
	}
	function getDataForDelete(orderData: Product) {
		selectedProduct = { ...orderData };
	}
	function deleteHandler() {
		const findIndex = products.findIndex(
			(product) => product.productId === selectedProduct.productId
		);
		if (findIndex !== -1) {
			products.splice(findIndex, 1);
		}
	}

	products.forEach((product, index) => {
		return (product.productId = `PEO-${14521 + index}`);
	});
</script>

<Grid class="grid-cols-1 gap-x-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each orders as order, index}
		<div class="{order.class} card">
			<CardBody>
				<h6 class="mb-3">{order.title}</h6>
				<div class="dark:divide-dark-800 flex items-center divide-x divide-gray-300 *:px-3">
					<h4 class="ltr:pl-0 rtl:pr-0">{order.count}</h4>
					<p class="text-gray-500">
						<span class="font-semibold">
							<i class={order.icon}></i><span>{order.percentage}</span>
						</span> this months
					</p>
				</div>
			</CardBody>
		</div>
	{/each}
</Grid>

<Card>
	<CardBody>
		<Grid cols={12}>
			<Col cols={{ span: 12 }} xl={{ span: 8 }}>
				<ul class="flex items-center gap-2 overflow-x-auto">
					{#each orderTabs as tab}
						<li>
							<a
								href="#!"
								on:click|preventDefault={() => orderStatus(tab)}
								class={`relative block whitespace-nowrap rounded-md px-4 py-2 text-center font-medium transition duration-200 ease-linear
							${activeTab === tab ? 'dark:bg-dark-850 bg-gray-100 text-black dark:text-white' : 'dark:text-dark-500 text-gray-500'}`}
							>
								<span class="align-middle">{tab === 'All' ? 'All Orders' : tab}</span>
							</a>
						</li>
					{/each}
				</ul>
			</Col>
			<div class="col-span-12 mt-4 flex gap-3 xl:col-span-4 xl:mt-0 xl:justify-end">
				{#if selectedItems.length !== 0}
					<button class="btn btn-red btn-icon">
						<LucideIcon name="Trash" class="size-4" />
					</button>
				{/if}
				<!-- Modal to be... -->
				<ModalTrigger
					modalId="addOrderModal"
					icon="Plus"
					color="primary"
					text="New Order"
					class="btn items-center"
				/>

				<button class="btn btn-sub-gray" on:click={() => sort('productName')}>
					<LucideIcon name="Filter" class="mr-1 inline-block size-4" /> Filters
				</button>
			</div>
		</Grid>
	</CardBody>
</Card>

<Card>
	<CardBody class="pt-0">
		<div>
			<div class="table-box overflow-x-auto">
				<table class="hovered table">
					<thead>
						<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
							<th>
								<div class="input-check-group">
									<label for="checkboxAll" class="input-check-label hidden"></label>
									<input
										id="checkboxAll"
										class="input-check input-check-primary"
										type="checkbox"
										on:click={toggleAll}
										checked={selectedItems.length === displayedProducts.length}
									/>
								</div>
							</th>
							<th on:click={() => sort('ordersID')} class="cursor-pointer">Order ID</th>
							<th on:click={() => sort('ordersDate')} class="cursor-pointer">Order Date</th>
							<th on:click={() => sort('deliveredDate')} class="cursor-pointer">Delivered Date</th>
							<th on:click={() => sort('customersName')} class="cursor-pointer">Customers</th>
							<th on:click={() => sort('productName')} class="cursor-pointer">Product</th>
							<th on:click={() => sort('payment')} class="cursor-pointer">Payment</th>
							<th on:click={() => sort('total')} class="cursor-pointer">Total</th>
							<th on:click={() => sort('qty')} class="cursor-pointer">QTY</th>
							<th on:click={() => sort('status')} class="cursor-pointer">status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{#each paginatedProducts as product, index}
							<tr>
								<td class="whitespace-nowrap">
									<div class="input-check-group">
										<label for={`category${index}`} class="input-check-label hidden"></label>
										<input
											id={`category${index}`}
											type="checkbox"
											class="input-check input-check-primary"
											on:click={() => toggleItem(product)}
											checked={selectedItems.includes(product)}
										/>
									</div>
								</td>
								<td class="whitespace-nowrap">
									<!-- Displaying Category ID -->
									<a href="#!" class="link link-primary">
										{product.productId}
									</a>
								</td>
								<td class="whitespace-nowrap">{product.ordersDate}</td>
								<td class="whitespace-nowrap">{product.deliveredDate}</td>
								<td class="whitespace-nowrap">{product.customersName}</td>
								<td class="whitespace-nowrap">{product.productName}</td>
								<td class="whitespace-nowrap">
									<span
										class={product.payment === 'Paid'
											? 'badge badge-green'
											: product.payment === 'COD'
												? 'badge badge-gray'
												: product.payment === 'Unpaid'
													? 'badge badge-red'
													: ''}
									>
										{product.payment}
									</span>
								</td>
								<td class="whitespace-nowrap">{product.total}</td>
								<td class="whitespace-nowrap">{product.qty}</td>
								<td class="whitespace-nowrap">
									<span
										class={product.status === 'Delivered'
											? 'badge badge-green'
											: product.status === 'New'
												? 'badge badge-primary'
												: product.status === 'Cancelled'
													? 'badge badge-red'
													: product.status === 'Shipping'
														? 'badge badge-purple'
														: product.status === 'Pending'
															? 'badge badge-yellow'
															: ''}
									>
										{product.status}
									</span>
								</td>
								<td class="whitespace-nowrap">
									<Dropdown class="dropdown" alignTo="right-bottom">
										<DropdownButton
											type="button"
											class="dark:text-dark-500 flex items-center text-gray-500"
										>
											<i class="ri-more-2-fill"></i>
										</DropdownButton>
										<DropdownMenu class="dropdown-menu !fixed p-2">
											<ModalTrigger
												modalId="overviewOrderModal"
												color=""
												icon="Eye"
												class="dropdown-item justify-start"
												text="Overview"
												onClick={() => overviewData(product)}
											/>
											<ModalTrigger
												modalId="addOrderModal"
												color=""
												icon="Pencil"
												class="dropdown-item justify-start"
												text="Edit"
											/>
											<ModalTrigger
												modalId="delete-file-modal"
												color=""
												icon="Trash2"
												class="dropdown-item justify-start"
												text="Delete"
												onClick={() => getDataForDelete(product)}
											/>
										</DropdownMenu>
									</Dropdown>
								</td>
							</tr>
						{/each}
						{#if displayedProducts.length === 0}
							<TableRowNotFound />
						{/if}
					</tbody>
				</table>
			</div>
			{#if displayedProducts.length > 0}
				<div class="gap-space mt-3 grid grid-cols-12 items-center">
					<div class="col-span-12 flex flex-wrap justify-center lg:col-span-6 lg:justify-start">
						<p class="dark:text-dark-500 text-gray-500 ltr:pr-1 rtl:pl-1">
							Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of
							<b>{displayedProducts.length}</b> Results
						</p>
						{#if selectedItems.length > 0}
							<span><b>{selectedItems.length}</b> Row Selected</span>
						{/if}
					</div>
					<div class="col-span-12 md:col-span-6">
						<div class="pagination pagination-primary flex justify-end">
							<!-- Prev Button -->
							<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
								<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
								Prev
							</button>

							<!-- Page Number Buttons -->
							{#each Array(totalPages) as _, index}
								<button
									on:click={() => gotoPage(index + 1)}
									class="pagination-item {currentPage === index + 1 ? 'active' : ''}"
								>
									<span>{index + 1}</span>
								</button>
							{/each}

							<!-- Next Button -->
							<button
								on:click={nextPage}
								disabled={currentPage === totalPages}
								class="pagination-next"
							>
								Next
								<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
							</button>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</CardBody>
</Card>

<!-- Add Form -->
<Modal modalId="addOrderModal" let:modalId>
	<ModalHeader {modalId}>
		<h6>Add Order</h6>
	</ModalHeader>
	<ModalBody>
		<form>
			<div class="grid grid-cols-12 gap-5">
				<div class="col-span-12">
					<label for="orderIDInput" class="form-label">Order ID</label>
					<input
						type="text"
						id="orderIDInput"
						class="form-input"
						placeholder="Order ID"
						bind:value={form.ordersID}
						disabled
					/>
				</div>

				<div class="col-span-6">
					<label for="orderDateInput" class="form-label">Order Date</label>
					<input
						type="text"
						placeholder="YYYY-MM-DD"
						id="orderDateInput"
						class="form-input"
						bind:value={form.ordersDate}
						on:input={() => validateField('ordersDate', form.ordersDate, 'Order date is required.')}
					/>
					{#if errors.ordersDate}
						<span class="text-red-500">{errors.ordersDate}</span>
					{/if}
				</div>

				<div class="col-span-6">
					<label for="deliveredDateInput" class="form-label">Delivered Date</label>
					<input
						type="text"
						placeholder="YYYY-MM-DD"
						id="deliveredDateInput"
						class="form-input"
						bind:value={form.deliveredDate}
						on:input={() =>
							validateField('deliveredDate', form.deliveredDate, 'Delivered date is required.')}
					/>
					{#if errors.deliveredDate}
						<span class="text-red-500">{errors.deliveredDate}</span>
					{/if}
				</div>

				<div class="col-span-12">
					<label for="customerNameInput" class="form-label">Customer Name</label>
					<input
						type="text"
						id="customerNameInput"
						class="form-input"
						placeholder="Customer name"
						bind:value={form.customersName}
						on:input={() =>
							validateField('customersName', form.customersName, 'Full name is required.')}
					/>
					{#if errors.customersName}
						<span class="text-red-500">{errors.customersName}</span>
					{/if}
				</div>

				<div class="col-span-6">
					<label for="quantityInput" class="form-label">Quantity</label>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="input-spin-group">
						<div class="input-spin-minus" on:click={decreaseQty}>
							<i class="size-4" data-lucide="minus"></i>
						</div>
						<input
							type="text"
							class="input-spin form-input"
							id="quantityInput"
							value={form.qty}
							readonly
						/>
						<div class="input-spin-plus" on:click={increaseQty}>
							<i class="size-4" data-lucide="plus"></i>
						</div>
					</div>
				</div>

				<div class="col-span-6">
					<label for="totalAmountInput" class="form-label">Product Amount</label>
					<input
						type="number"
						class="form-input"
						placeholder="Amount"
						bind:value={form.price}
						on:input={() => validateField('price', form.price, 'Price is required.')}
					/>
					{#if errors.price}
						<span class="text-red-500">{errors.price}</span>
					{/if}
				</div>

				<div class="col-span-12">
					<label for="productNameSelect" class="form-label">Total Price</label>
					<input
						type="number"
						class="form-input"
						placeholder="Total Amount"
						bind:value={form.total}
						readonly
					/>
				</div>

				<!-- Replacing <div> with <select> or <input> elements -->
				<div class="col-span-12">
					<label for="productNameSelect" class="form-label">Products Name</label>
					<select
						id="productNameSelect"
						class="form-input"
						bind:value={form.productName}
						on:change={() =>
							validateField('productName', form.productName, 'Product name is required.')}
					>
						<option value="">Select a product</option>
						<!-- Replace with your actual product options -->
						<option value="product1">Product 1</option>
						<option value="product2">Product 2</option>
					</select>
					{#if errors.productName}
						<span class="text-red-500">{errors.productName}</span>
					{/if}
				</div>

				<div class="col-span-6">
					<label for="paymentStatusSelect" class="form-label">Payment Status</label>
					<select
						id="paymentStatusSelect"
						class="form-input"
						bind:value={form.payment}
						on:change={() => validateField('payment', form.payment, 'Payment is required.')}
					>
						<option value="">Select Payment Status</option>
						<option value="paid">Paid</option>
						<option value="pending">Pending</option>
					</select>
					{#if errors.payment}
						<span class="text-red-500">{errors.payment}</span>
					{/if}
				</div>

				<div class="col-span-6">
					<label for="orderStatusSelect" class="form-label">Order Status</label>
					<select
						class="form-input"
						id="orderStatusSelect"
						bind:value={form.status}
						on:change={() => validateField('status', form.status, 'Status is required.')}
					>
						<option value="">Select Order Status</option>
						<option value="shipped">Shipped</option>
						<option value="processing">Processing</option>
					</select>
					{#if errors.status}
						<span class="text-red-500">{errors.status}</span>
					{/if}
				</div>
			</div>
		</form>

		<div class="mt-5 flex justify-end gap-2">
			<button type="button" class="btn btn-active-red">Cancel</button>
			<button class="btn btn-primary" on:click={submitForm}>
				{form.ordersID === 'PEO-14565' ? 'Add Order' : 'Update Order'}
			</button>
		</div>
	</ModalBody>
</Modal>

<!-- Overview Form -->
<Modal modalId="overviewOrderModal" let:modalId position="center" size=" ">
	<ModalBody>
		<ModalClose {modalId} class="link link-red float-end" />
		<div class="dark:border-dark-800 size-24 rounded-md border border-dashed border-gray-200 p-2">
			<img src={selectedProduct.image} alt="" />
		</div>
		<h6 class="mb-2 mt-4">Order<a href="#!">{selectedProduct?.productId}</a></h6>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<p class="dark:text-dark-500 mb-1 text-gray-500">Customers</p>
				<h6>{selectedProduct.customersName}</h6>
			</div>
			<div>
				<p class="dark:text-dark-500 mb-1 text-gray-500">Items</p>
				<h6>
					<a href="#!" class="link link-primary text-gray-800">{selectedProduct.productName}</a>
				</h6>
			</div>
			<div>
				<p class="dark:text-dark-500 mb-1 text-gray-500">Order Date</p>
				<h6>{selectedProduct.ordersDate}</h6>
			</div>
			<div>
				<p class="dark:text-dark-500 mb-1 text-gray-500">Delivered Date</p>
				<h6>{selectedProduct.deliveredDate}</h6>
			</div>
			<div>
				<p class="dark:text-dark-500 mb-1 text-gray-500">Payment</p>
				<span
					class={selectedProduct.payment === 'Paid'
						? 'badge badge-green'
						: selectedProduct.payment === 'COD'
							? 'badge badge-gray'
							: selectedProduct.payment === 'Unpaid'
								? 'badge badge-red'
								: ''}
				>
					{selectedProduct.payment}
				</span>
			</div>
			<div>
				<p class="dark:text-dark-500 mb-1 text-gray-500">Status</p>
				<span
					class="badge
    {selectedProduct.status === 'Delivered' ? 'badge-green' : ''}
    {selectedProduct.status === 'New' ? 'badge-primary' : ''}
    {selectedProduct.status === 'Cancelled' ? 'badge-red' : ''}
    {selectedProduct.status === 'Shipping' ? 'badge-purple' : ''}
    {selectedProduct.status === 'Pending' ? 'badge-yellow' : ''}"
				>
					{selectedProduct.status}
				</span>
			</div>
			<div>
				<p class="dark:text-dark-500 mb-1 text-gray-500">Product Quantity</p>
				<h6>{selectedProduct.qty}</h6>
			</div>
			<div>
				<p class="dark:text-dark-500 mb-1 text-gray-500">Total Amount</p>
				<h6>{selectedProduct.total}</h6>
			</div>
		</div>
		<div class="mt-5 flex justify-end gap-2">
			<button type="button" class="btn btn-active-red" data-modal-close="overviewOrderModal"
				>Cancel</button
			>
			<button
				type="submit"
				class="btn btn-primary"
				data-modal-close="overviewOrderModal"
				data-modal-target="addOrderModal">Edit Order</button
			>
		</div>
	</ModalBody>
</Modal>

<!-- Delete Conformation -->
<DeleteComponent {deleteHandler} />
