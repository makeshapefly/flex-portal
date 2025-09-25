<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import { onMount } from 'svelte';

	let companyName: string = '';
	let companyEmail: string = '';
	let companyPhone: string = '';
	let invoiceDate: string = '';
	let dueDate: string = '';
	let status: string = '';
	let companyNameError: string = '';
	let emailError: string = '';
	let phoneError: string = '';
	let invoiceDateError: string = '';
	let dueDateError: string = '';
	let statusError: string = '';
	let cardHolderName: string = '';
	let cardNumber: string = '';
	let expiryDate: string = '';
	let cvv: string = '';
	let cardHolderNameError: string = '';
	let cardNumberError: string = '';
	let expiryDateError: string = '';
	let cvvError: string = '';
	let imageUrl: string = '';
	let products: Array<{
		name: string;
		category: string;
		quantity: number;
		unitPrice: string;
		discountPercentage: string;
		totalAmount: string;
		discountError: string;
		nameError: string;
		categoryError: string;
		unitPriceError: string;
	}> = [
		{
			name: '',
			category: '',
			quantity: 1,
			unitPrice: '',
			discountPercentage: '',
			totalAmount: '',
			discountError: '',
			nameError: '',
			categoryError: '',
			unitPriceError: ''
		}
	];
	let subtotal: string = '0.00';
	let vatAmount: string = '0.00';
	let additionalDiscount: string = '0'; // Percentage
	let grandTotal: string = '0.00';
	let shippingCharge: string = '0.00';

	// Add or delete product
	function addItem() {
		products = [
			...products,
			{
				name: '',
				category: '',
				quantity: 1,
				unitPrice: '',
				discountPercentage: '',
				totalAmount: '',
				discountError: '',
				nameError: '',
				categoryError: '',
				unitPriceError: ''
			}
		];
		calculateGrandTotal();
	}

	function deleteItem(index: number) {
		products.splice(index, 1);
		// Triggering state change for reactivity
		products = [...products];
		calculateGrandTotal();
	}

	// Recalculate totals
	function calculateGrandTotal() {
		let subtotalValue = 0;
		products.forEach((product) => {
			subtotalValue += parseFloat(product.totalAmount || '0');
		});
		subtotal = subtotalValue.toFixed(2);
		vatAmount = (parseFloat(subtotal) * 0.15).toFixed(2); // 15% VAT
		let discountValue = (parseFloat(subtotal) * (parseFloat(additionalDiscount) / 100)).toFixed(2);
		grandTotal = (
			parseFloat(subtotal) +
			parseFloat(vatAmount) +
			parseFloat(shippingCharge) -
			parseFloat(discountValue)
		).toFixed(2);
	}

	// Calculate each product's total
	function calculateTotal(
		product: {
			unitPrice: string;
			quantity: number;
			discountPercentage: string;
			totalAmount: string;
			discountError: string;
		},
		index: number
	) {
		const unitPrice = parseFloat(product.unitPrice) || 0;
		const quantity = parseInt(product.quantity.toString()) || 0;
		let discountPercentage = parseFloat(product.discountPercentage) || 0;
		if (discountPercentage < 0 || discountPercentage > 100) {
			product.discountError = 'Discount must be between 0 and 100';
			return;
		}
		const totalAmount = unitPrice * quantity * (1 - discountPercentage / 100);
		product.totalAmount = totalAmount.toFixed(2);
		// Triggering recalculation of grand total after each product calculation
		calculateGrandTotal();
	}

	// Example of validation functions
	function validateProductName(index: number) {
		products[index].nameError =
			products[index].name.trim() === '' ? 'Product name is required' : '';
	}

	function validateCardHolderName() {
		cardHolderNameError = cardHolderName.trim() === '' ? 'Card holder name is required' : '';
	}

	function formatCardNumber() {
		// Get the formatted card number and error message from the utility function
		const { formattedCardNumber, error } = formatCardNumberUtil(cardNumber);
		cardNumber = formattedCardNumber; // Update the card number with the formatted version
		cardNumberError = error; // Set the error message if there's any
	}

	function formatCardNumberUtil(cardNumber: string) {
		// Format the card number into groups of 4 digits
		const formattedCardNumber =
			cardNumber
				.replace(/\D/g, '')
				.match(/.{1,4}/g)
				?.join(' ') ?? '';

		// Check if the card number matches the required format
		const error = !/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formattedCardNumber)
			? 'Card number must be in the format 0000 0000 0000 0000'
			: ''; // If valid, no error message

		return { formattedCardNumber, error }; // Return both formatted card number and error
	}

	function formatExpiryDate() {
		expiryDate = expiryDate
			.replace(/\s+/g, '')
			.replace(/[^0-9/]/gi, '')
			.replace(/^(\d{2})(\d{0,4})$/, '$1/$2');
		const expiryPattern = /^(0[1-9]|1[0-2])\/\d{4}$/;
		expiryDateError = !expiryPattern.test(expiryDate)
			? 'Expiry date must be in the format MM/YYYY'
			: '';
	}

	function validateCVV() {
		cvv = cvv.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
		const cvvPattern = /^\d{3,4}$/;
		cvvError = !cvvPattern.test(cvv) ? 'CVV must be a 3 or 4 digit number' : '';
	}

	function validateCompanyName() {
		companyNameError = companyName.trim() === '' ? 'Company name is required' : '';
	}

	function validateEmail() {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		emailError = !emailPattern.test(companyEmail) ? 'Invalid email format' : '';
	}

	function validatePhone() {
		const phonePattern = /^[0-9]*$/;
		phoneError = !phonePattern.test(companyPhone) ? 'Phone number must be numeric' : '';
	}

	function validateInvoiceDate() {
		invoiceDateError = invoiceDate === '' ? 'Invoice date is required' : '';
	}

	function validateDueDate() {
		dueDateError = dueDate === '' ? 'Due date is required' : '';
	}

	function validateStatus() {
		const statusElement = document.querySelector('#invoiceStatus') as HTMLSelectElement;
		statusError = statusElement.value === '' ? 'Status is required' : '';
	}

	function validateCategory(index: number) {
		products[index].categoryError =
			products[index].category.trim() === '' ? 'Category is required' : '';
	}

	function validateUnitPrice(index: number) {
		const unitPricePattern = /^\d+(\.\d{1,2})?$/;
		products[index].unitPriceError = !unitPricePattern.test(products[index].unitPrice)
			? 'Invalid price format'
			: '';
	}

	function validateDiscountPercentage(index: number) {
		const discountPattern = /^(100|[1-9]?[0-9])$/;
		products[index].discountError = !discountPattern.test(products[index].discountPercentage)
			? 'Discount must be between 0 and 100%'
			: '';
	}

	function validateProducts() {
		let valid = true;
		products.forEach((product, index) => {
			validateProductName(index);
			validateCategory(index);
			validateUnitPrice(index);
			validateDiscountPercentage(index);
			if (
				product.nameError ||
				product.categoryError ||
				product.unitPriceError ||
				product.discountError
			) {
				valid = false;
			}
		});
		return valid;
	}

	function createInvoice() {
		validateCompanyName();
		validateEmail();
		validatePhone();
		validateInvoiceDate();
		validateDueDate();
		validateStatus();
		validateCardHolderName();
		formatCardNumber();
		formatExpiryDate();
		validateCVV();
		if (!validateProducts()) return;
		// Submit form or perform other actions
	}

	function resetForm() {
		products = [
			{
				name: '',
				category: '',
				quantity: 1,
				unitPrice: '',
				discountPercentage: '',
				totalAmount: '',
				discountError: '',
				nameError: '',
				categoryError: '',
				unitPriceError: ''
			}
		];
		subtotal = '0.00';
		vatAmount = '0.00';
		additionalDiscount = '0';
		shippingCharge = '0.00';
		grandTotal = '0.00';
		companyName = '';
		companyEmail = '';
		companyPhone = '';
		invoiceDate = '';
		dueDate = '';
		status = '';
		companyNameError = '';
		emailError = '';
		phoneError = '';
		invoiceDateError = '';
		dueDateError = '';
		statusError = '';
		cardHolderName = '';
		cardNumber = '';
		expiryDate = '';
		cvv = '';
		cardHolderNameError = '';
		cardNumberError = '';
		expiryDateError = '';
		cvvError = '';
		imageUrl = '';
	}
	// File handling (if needed)
	function fileChosen(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			fileToDataUrl(input, (src: string) => (imageUrl = src));
		}
	}

	function fileToDataUrl(input: HTMLInputElement, callback: (src: string) => void) {
		if (!input.files?.length) return;
		let file = input.files[0],
			reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => callback(e.target?.result as string);
	}

	// Example: When the component mounts, you can trigger the grand total calculation
	onMount(() => {
		calculateGrandTotal();
	});
</script>

<CardHeader>
	<div class="items-center gap-3 space-y-3 md:flex md:space-y-0">
		<h6 class="grow">Create Invoice</h6>
		<div class="flex shrink-0 flex-wrap items-center gap-2">
			<button on:click={resetForm} type="button" class="btn btn-sub-gray"
				><LucideIcon name="RotateCcw" class="inline-block size-4" /> Reset</button
			>
			<button class="btn btn-sub-green"
				><LucideIcon name="Printer" class="inline-block size-4" /> Print Invoice</button
			>
			<button on:click={createInvoice} class="btn btn-primary">Save Invoice</button>
		</div>
	</div>
</CardHeader>

<CardBody>
	<form on:submit|preventDefault>
		<h6 class="mb-3">Company Information</h6>
		<div class="grid grid-cols-12 gap-5">
			<div class="col-span-12">
				<h6 class="form-label">Company Logo</h6>
				<div>
					<label for="logo">
						<span
							class="dark:bg-dark-850 dark:border-dark-800 inline-flex h-32 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gray-100"
						>
							{#if imageUrl}
								<!-- svelte-ignore a11y-missing-attribute -->
								<img src={imageUrl} class="h-24 object-cover" />
							{:else}
								<span class="dark:text-dark-500 flex flex-col items-center text-gray-500">
									<LucideIcon name="Upload" />
									<span class="mt-3 block">Upload Your Company Logo</span>
								</span>
							{/if}
						</span>
					</label>
					<div class="hidden">
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

			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<label for="companyNameInput" class="form-label">Company Name</label>
				<input
					type="text"
					id="companyNameInput"
					bind:value={companyName}
					on:input={validateCompanyName}
					class="form-input"
				/>
				{#if companyNameError}<p class="text-red-500">{companyNameError}</p>{/if}
			</div>
			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<label for="companyEmailInput" class="form-label">Email</label>
				<input
					type="email"
					id="companyEmailInput"
					bind:value={companyEmail}
					on:input={validateEmail}
					class="form-input"
				/>
				{#if emailError}<p class="text-red-500">{emailError}</p>{/if}
			</div>
			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<label for="companyPhoneNumberInput" class="form-label">Phone Number</label>
				<input
					type="text"
					id="companyPhoneNumberInput"
					bind:value={companyPhone}
					on:input={validatePhone}
					class="form-input"
				/>
				{#if phoneError}<p class="text-red-500">{phoneError}</p>{/if}
			</div>

			<div class="col-span-12 md:col-span-6 lg:col-span-3">
				<label for="invoiceIDInput" class="form-label">Invoice ID</label>
				<input type="text" id="invoiceIDInput" class="form-input" disabled value="#PEI-15485" />
			</div>

			<div class="col-span-12 md:col-span-6 lg:col-span-3">
				<label for="invoiceDateInput" class="form-label">Invoice Date</label>
				<input
					type="date"
					id="invoiceDateInput"
					bind:value={invoiceDate}
					on:input={validateInvoiceDate}
					class="form-input"
				/>
				{#if invoiceDateError}<p class="text-red-500">{invoiceDateError}</p>{/if}
			</div>

			<div class="col-span-12 md:col-span-6 lg:col-span-3">
				<label for="dueDateInput" class="form-label">Payment Due Date</label>
				<input
					type="date"
					id="dueDateInput"
					bind:value={dueDate}
					on:input={validateDueDate}
					class="form-input"
				/>
				{#if dueDateError}<p class="text-red-500">{dueDateError}</p>{/if}
			</div>

			<div class="col-span-12 md:col-span-6 lg:col-span-3">
				<label for="invoiceStatus" class="form-label">Invoice Status</label>
				<input
					type="text"
					id="invoiceStatus"
					bind:value={status}
					on:change={validateStatus}
					class="form-input"
					placeholder="Invoice Type"
				/>
				{#if statusError}<p class="text-red-500">{statusError}</p>{/if}
			</div>
		</div>

		<h6 class="mt-5 mb-3">Products Info</h6>

		<div class="overflow-x-auto">
			<table class="flush table">
				<tbody>
					<tr>
						<th class="w-12 whitespace-nowrap">#</th>
						<th class="whitespace-nowrap">Product Name</th>
						<th class="w-52 whitespace-nowrap">Quantity</th>
						<th class="w-52 whitespace-nowrap">Unit Price</th>
						<th class="w-52 whitespace-nowrap">Discount (%)</th>
						<th class="w-52 whitespace-nowrap">Total Amount</th>
					</tr>
					{#each products as product, index (product)}
						<tr>
							<td>{index + 1}</td>
							<td>
								<input
									type="text"
									bind:value={product.name}
									on:input={() => validateProductName(index)}
									class="form-input"
									placeholder="Enter product name"
								/>
								{#if product.nameError}<p class="text-red-500">{product.nameError}</p>{/if}
								<input
									type="text"
									bind:value={product.category}
									on:input={() => validateCategory(index)}
									class="form-input mt-2 mb-3"
									placeholder="Category"
								/>
								{#if product.categoryError}<p class="text-red-500">{product.categoryError}</p>{/if}
								<a href="#!" on:click={() => deleteItem(index)} class="link link-red"
									><i class="ri-delete-bin-line align-baseline"></i> Delete Item</a
								>
							</td>
							<td>
								<div class="input-spin-group flex">
									<button
										on:click={(event) => {
											event.preventDefault();
											if (product.quantity > 0) product.quantity--;
											calculateTotal(product, index);
										}}
										aria-label="Decrease quantity"
										class="input-spin-minus"><i class="ri-subtract-line"></i></button
									>
									<input
										type="text"
										bind:value={product.quantity}
										class="input-spin form-input"
										readonly
									/>
									<button
										on:click={(event) => {
											event.preventDefault();
											product.quantity++;
											calculateTotal(product, index);
										}}
										aria-label="Increase quantity"
										class="input-spin-plus"><i class="ri-add-line"></i></button
									>
								</div>
							</td>
							<td>
								<input
									type="number"
									bind:value={product.unitPrice}
									on:input={() => calculateTotal(product, index)}
									class="form-input"
									placeholder="$0.00"
								/>
								{#if product.unitPriceError}<p class="text-red-500">
										{product.unitPriceError}
									</p>{/if}
							</td>
							<td>
								<input
									type="number"
									bind:value={product.discountPercentage}
									on:input={() => calculateTotal(product, index)}
									class="form-input"
									placeholder="0%"
								/>
								{#if product.discountError}<p class="text-red-500">{product.discountError}</p>{/if}
							</td>
							<td>
								<input
									type="text"
									bind:value={product.totalAmount}
									class="form-input"
									readonly
									placeholder="$0.00"
								/>
							</td>
						</tr>
					{/each}

					<tr>
						<td colspan="6">
							<button on:click={addItem} class="btn btn-primary"
								><i class="ri-add-line align-bottom"></i> Add Item</button
							>
						</td>
					</tr>
					<tr>
						<td colspan="5" class="text-right">Sub Total</td>
						<td>
							<input
								type="text"
								bind:value={subtotal}
								readonly
								class="form-input"
								placeholder="$0.00"
							/>
						</td>
					</tr>
					<tr>
						<td colspan="5" class="text-right">Vat Amount (6%)</td>
						<td>
							<input
								type="text"
								bind:value={vatAmount}
								readonly
								class="form-input"
								placeholder="$0.00"
							/>
						</td>
					</tr>
					<tr>
						<td colspan="5" class="text-right">Discount (10%)</td>
						<td>
							<input
								type="number"
								bind:value={additionalDiscount}
								on:input={calculateGrandTotal}
								class="form-input"
								placeholder="$0.00"
							/>
						</td>
					</tr>
					<tr>
						<td colspan="5" class="text-right">Shipping Charge</td>
						<td>
							<input
								type="number"
								bind:value={shippingCharge}
								on:input={calculateGrandTotal}
								class="form-input"
								placeholder="$0.00"
							/>
						</td>
					</tr>
					<tr>
						<td colspan="5" class="text-right">Total Amount</td>
						<td>
							<input
								type="text"
								bind:value={grandTotal}
								readonly
								class="form-input"
								placeholder="$0.00"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h6 class="mt-5 mb-3">Payment Method</h6>

		<div class="grid grid-cols-12 gap-5">
			<div class="col-span-12">
				<label for="cardHolderName" class="form-label">Card Holder Name</label>
				<input
					type="text"
					id="cardHolderName"
					bind:value={cardHolderName}
					on:input={validateCardHolderName}
					class="form-input"
					placeholder="Card holder name"
				/>
				{#if cardHolderNameError}<p class="text-red-500">{cardHolderNameError}</p>{/if}
			</div>
			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<label for="cardNumber" class="form-label">Card Number</label>
				<input
					type="text"
					id="cardNumber"
					bind:value={cardNumber}
					on:input={formatCardNumber}
					placeholder="0000 0000 0000 0000"
					class="form-input"
				/>
				{#if cardNumberError}<p class="text-red-500">{cardNumberError}</p>{/if}
			</div>
			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<label for="expiryDate" class="form-label">Expiry Date</label>
				<input
					type="text"
					id="expiryDate"
					bind:value={expiryDate}
					on:input={formatExpiryDate}
					placeholder="MM/YYYY"
					class="form-input"
				/>
				{#if expiryDateError}<p class="text-red-500">{expiryDateError}</p>{/if}
			</div>
			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<label for="cvv" class="form-label">CVV</label>
				<input
					type="text"
					id="cvv"
					bind:value={cvv}
					on:input={validateCVV}
					class="form-input"
					placeholder="000"
				/>
				{#if cvvError}<p class="text-red-500">{cvvError}</p>{/if}
			</div>
		</div>
		<div class="mt-5">
			<label for="textareaInput2" class="form-label">Terms & Conditions</label>
			<textarea
				name="textareaInput2"
				id="textareaInput2"
				rows="3"
				class="form-input h-auto"
				placeholder="Enter your terms"
			></textarea>
		</div>

		<div class="mt-5">
			<div class="flex flex-wrap items-center justify-end gap-2">
				<button on:click={resetForm} type="button" class="btn btn-sub-gray">
					<LucideIcon name="RotateCcw" class="inline-block size-4" /> Reset
				</button>
				<button on:click={createInvoice} type="button" class="btn btn-primary">Save Invoice</button>
			</div>
		</div>
	</form>
</CardBody>
