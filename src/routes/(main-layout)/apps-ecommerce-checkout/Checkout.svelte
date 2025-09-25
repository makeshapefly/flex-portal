<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { addresses as importedAddresses, products, orderSummary } from './checkout';

	// Initialize reactive variables
	let addresses = [...importedAddresses];
	let selected: any = null;
	let showAddAddressForm = false;
	let showEditAddressForm = false;

	let addressForm = {
		addressId: 0,
		firstName: '',
		lastName: '',
		phone: '',
		alternatePhone: '',
		address: '',
		city: '',
		country: '',
		zip: '',
		type: 'Home'
	};

	let errors = {
		firstName: '',
		lastName: '',
		phone: '',
		address: '',
		city: '',
		country: '',
		zip: ''
	};
	let order = orderSummary();

	// Function to remove a product from the cart
	function removeProduct(product: { id: number }) {
		order.products = order.products.filter((p) => p.id !== product.id);
	}

	// Add Address
	function addAddress() {
		if (validateForm()) {
			const addressId = addresses.length + 1;
			addresses.unshift({ ...addressForm, addressId });
			selectAddress(addresses[0]); // Select the newly added address
			showAddAddressForm = false; // Hide the add address form after adding
			resetForm();
		}
	}

	// Edit Address
	function editAddress(address: any) {
		showEditAddressForm = true;
		showAddAddressForm = false;
		addressForm = { ...address }; // Populate form with the address details
	}

	// Update Address
	function updateAddress() {
		const index = addresses.findIndex(
			(address: any) => address.addressId === addressForm.addressId
		);
		if (index !== -1) {
			addresses[index] = { ...addressForm };
			selectAddress(addresses[index]);
			resetForm();
			showEditAddressForm = false;
		}
	}

	// Delete Address
	function deleteAddress(address: any) {
		addresses = addresses.filter((addr: any) => addr !== address);
		showEditAddressForm = false;
	}

	// Select Address
	function selectAddress(address: any) {
		selected = selected === address ? null : address;
	}

	// Reset Form
	function resetForm() {
		addressForm = {
			addressId: 0,
			firstName: '',
			lastName: '',
			phone: '',
			alternatePhone: '',
			address: '',
			city: '',
			country: '',
			zip: '',
			type: 'Home'
		};
		//@ts-ignore
		errors = {};
	}

	// Validate Form
	function validateForm() {
		//@ts-ignore
		errors = {};
		validateField('firstName', addressForm.firstName, 'First name is required.');
		validateField('lastName', addressForm.lastName, 'Last name is required.');
		validatePhone();
		validateField('address', addressForm.address, 'Address is required.');
		validateField('city', addressForm.city, 'City is required.');
		validateField('country', addressForm.country, 'Country is required.');
		validateField('zip', addressForm.zip, 'Zip code is required.');
		validateField('type', addressForm.type, 'Type is required.');

		return Object.keys(errors).length === 0;
	}

	// Validate individual field
	function validateField(fieldName: string, fieldValue: string, errorMessage: string) {
		if (!fieldValue) {
			//@ts-ignore
			errors[fieldName] = errorMessage;
		} else {
			//@ts-ignore
			delete errors[fieldName];
		}
	}

	// Validate Phone
	function validatePhone() {
		const phonePattern = /^[0-9]+$/;
		if (!addressForm.phone) {
			errors.phone = 'Phone number is required.';
		} else if (!phonePattern.test(addressForm.phone)) {
			errors.phone = 'Phone number must be numeric.';
		} else {
			//@ts-ignore
			delete errors.phone;
		}
	}

	// Submit Form
	function submitForm() {
		if (validateForm()) {
			if (showAddAddressForm) {
				addAddress();
			} else {
				updateAddress();
			}
		}
	}

	// Show Add Address Form
	function showAddForm() {
		showAddAddressForm = true;
		showEditAddressForm = false;
		resetForm(); // Reset the form each time the Add Address button is clicked
	}
</script>

<Col cols={{ span: 12 }} class="2xl:col-span-8">
	<Card>
		<CardHeader>
			<CardTitle>Personal Details</CardTitle>
		</CardHeader>
		<CardBody>
			{#each addresses as address, index (address)}
				<div class="card">
					<div class="card-body">
						<div class="float-end flex items-center gap-2">
							<a
								href="#!"
								class="link link-primary font-medium"
								on:click={() => editAddress(address)}
							>
								<LucideIcon name="Pencil" class="inline-block size-4" />
								<span class="align-center">Edit</span>
							</a>
							<a
								href="#!"
								class="link link-primary font-medium"
								on:click={() => deleteAddress(address)}
							>
								<LucideIcon name="Trash2" class="inline-block size-4" />
								<span class="align-center">Delete</span>
							</a>
						</div>
						<span class="badge badge-purple">{address.type}</span>
						<h6 class="mt-2 mb-1">{address.firstName} {address.lastName} - {address.phone}</h6>
						<p class="dark:text-dark-500 mb-3 text-gray-500">
							{address.address}, {address.city}, {address.country} - {address.zip}
						</p>
						<button
							on:click={() => selectAddress(address)}
							class={selected === address ? 'btn btn-primary' : 'btn btn-sub-gray'}
						>
							{selected === address ? 'Selected Address' : 'Select Here'}
						</button>
					</div>
				</div>
			{/each}

			<div>
				<div class="text-right">
					<button class="btn btn-green" on:click={showAddForm}> Add a New Address </button>
				</div>

				<!-- Add or Edit Address Form -->
				{#if showAddAddressForm || showEditAddressForm}
					<div class="mt-3">
						<h6 class="mb-2">{showAddAddressForm ? 'Add a New Address' : 'Edit Address'}</h6>

						<Grid cols={12} gap={5}>
							<!-- Form Fields -->
							<Col cols={{ span: 12 }} md={{ span: 6 }}>
								<label for="firstName" class="form-label">First Name</label>
								<input
									type="text"
									id="firstName"
									class="form-input"
									placeholder="Enter first name"
									bind:value={addressForm.firstName}
								/>
								{#if errors.firstName}<span class="text-red-500">{errors.firstName}</span>{/if}
							</Col>

							<Col cols={{ span: 12 }} md={{ span: 6 }}>
								<label for="lastName" class="form-label">Last Name</label>
								<input
									type="text"
									id="lastName"
									class="form-input"
									placeholder="Enter last name"
									bind:value={addressForm.lastName}
								/>
								{#if errors.lastName}<span class="text-red-500">{errors.lastName}</span>{/if}
							</Col>

							<Col cols={{ span: 12 }} md={{ span: 6 }}>
								<label for="phoneNumber" class="form-label">Phone Number</label>
								<input
									type="text"
									id="phoneNumber"
									class="form-input"
									placeholder="000 000 0000"
									bind:value={addressForm.phone}
									on:input={validatePhone}
								/>
								{#if errors.phone}<span class="text-red-500">{errors.phone}</span>{/if}
							</Col>

							<Col cols={{ span: 12 }} md={{ span: 6 }}>
								<label for="alternatePhoneNumber" class="form-label"
									>Alternate Phone Number (Optional)</label
								>
								<input
									type="text"
									id="alternatePhoneNumber"
									class="form-input"
									placeholder="000 000 0000"
									bind:value={addressForm.alternatePhone}
								/>
							</Col>

							<Col cols={{ span: 12 }}>
								<label for="textareaInput2" class="form-label">Address (Area and Street)</label>
								<textarea
									id="textareaInput2"
									rows="3"
									class="form-input h-auto"
									placeholder="Enter area and street"
									bind:value={addressForm.address}
								></textarea>
								{#if errors.address}<span class="text-red-500">{errors.address}</span>{/if}
							</Col>

							<Col cols={{ span: 12 }} md={{ span: 4 }}>
								<label for="city" class="form-label">City</label>
								<input
									type="text"
									id="city"
									class="form-input"
									placeholder="Enter city"
									bind:value={addressForm.city}
								/>
								{#if errors.city}<span class="text-red-500">{errors.city}</span>{/if}
							</Col>

							<Col cols={{ span: 12 }} md={{ span: 4 }}>
								<label for="country" class="form-label">Country</label>
								<input
									type="text"
									id="country"
									class="form-input"
									placeholder="Enter country"
									bind:value={addressForm.country}
								/>
								{#if errors.country}<span class="text-red-500">{errors.country}</span>{/if}
							</Col>

							<Col cols={{ span: 12 }} md={{ span: 4 }}>
								<label for="zip" class="form-label">Zip Code</label>
								<input
									type="text"
									id="zip"
									class="form-input"
									placeholder="Enter zip code"
									bind:value={addressForm.zip}
								/>
								{#if errors.zip}<span class="text-red-500">{errors.zip}</span>{/if}
							</Col>

							<Col cols={{ span: 12 }}>
								<h6 class="mb-2">Address Type</h6>
								<div class="gap-space grid grid-cols-1 md:grid-cols-2">
									<div>
										<div class="input-radio-group">
											<input
												id="homeRadio"
												class="input-radio input-radio-primary"
												name="addressType"
												type="radio"
												value="Home"
												bind:group={addressForm.type}
											/>
											<label for="homeRadio" class="input-radio-label"
												>Home (All day delivery)</label
											>
										</div>
									</div>
									<div>
										<div class="input-radio-group">
											<input
												id="workRadio"
												class="input-radio input-radio-primary"
												name="addressType"
												type="radio"
												value="Work"
												bind:group={addressForm.type}
											/>
											<label for="workRadio" class="input-radio-label"
												>Work (Delivery between 10 AM - 5 PM)</label
											>
										</div>
									</div>
								</div>
							</Col>

							<Col cols={{ span: 12 }} class="text-right">
								<div class="flex flex-wrap justify-end gap-2">
									<button
										type="button"
										class="btn btn-active-red"
										on:click={() => {
											showAddAddressForm = false;
											showEditAddressForm = false;
										}}
									>
										Cancel
									</button>
									<button class="btn btn-primary" on:click={submitForm}>
										{showAddAddressForm ? 'Save and Deliver Here' : 'Update Address'}
									</button>
								</div>
							</Col>
						</Grid>
					</div>
				{/if}
			</div>
		</CardBody>
	</Card>
</Col>

<Col cols={{ span: 12 }} class="2xl:col-span-4">
	<div class="sticky top-24 mb-5">
		<Card>
			<CardHeader>
				<CardTitle>Order Summary</CardTitle>
			</CardHeader>
			<CardBody>
				<div class="checkout-summary">
					<!-- Display the products in the cart -->
					{#each order.products as product (product.id)}
						<div class="mb-3">
							<button class="float-end" aria-label="close" on:click={() => removeProduct(product)}>
								<i class="link link-red ri-close-line size-4"></i>
							</button>
							<div class="flex flex-col gap-3 md:flex-row">
								<div
									class="dark:bg-dark-850 flex w-16 items-center justify-center rounded-md bg-gray-100"
								>
									<img src={product.image} alt={product.name} />
								</div>
								<div>
									<h6 class="mb-1">{product.name}</h6>
									<p
										class="dark:text-dark-500 dark:divide-dark-800 mb-2 flex items-center gap-2 divide-x divide-gray-200 text-gray-500"
									>
										<span class="px-2 ltr:first:!pl-0 rtl:first:!pr-0">{product.qty} Qty</span>
										<span class="px-2 ltr:first:!pl-0 rtl:first:!pr-0">{product.color}</span>
										<span>{product.size}</span>
									</p>
									<h5>{product.price.toFixed(2)}</h5>
								</div>
							</div>
						</div>
					{/each}

					<!-- Discount Code Input -->
					<div class="mb-4">
						<label for="discountCode" class="form-label">Discount Code</label>
						<input
							type="text"
							id="discountCode"
							class="form-input"
							placeholder="Enter coupon code"
							bind:value={order.discountCode}
						/>
					</div>

					<!-- Order Summary Table -->
					<table class="flush table">
						<tbody>
							<tr>
								<th class="!border-0">Sub Amount</th>
								<td>${order.subtotal.toFixed(2)}</td>
							</tr>
							<tr>
								<th class="!border-0">Vat Amount (6%)</th>
								<td>${order.vat.toFixed(2)}</td>
							</tr>
							<tr>
								<th class="!border-0">Discount (10%)</th>
								<td>-${order.discount.toFixed(2)}</td>
							</tr>
							<tr>
								<th class="!border-0">Shipping Charge</th>
								<td>${order.shippingCharge.toFixed(2)}</td>
							</tr>
							<tr class="dark:border-dark-800 border-t border-gray-200">
								<th class="!border-0">Total Amount</th>
								<td>${order.total.toFixed(2)}</td>
							</tr>
						</tbody>
					</table>

					<!-- Checkout Button -->
					<div class="my-4">
						<a href="/apps-ecommerce-payment" class="btn btn-primary w-full">Checkout Now</a>
					</div>

					<!-- Terms Message -->
					<p class="dark:text-dark-500 text-center text-gray-500">
						By clicking the "checkout order" button, you agree to the terms of the public offers.
					</p>
				</div>
			</CardBody>
		</Card>
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
				<h6 class="mb-1">Safe and Secure</h6>
				<p class="dark:text-dark-500 text-gray-500">
					Safe and Secure Payments. Easy returns. 100% Authentic products.
				</p>
			</div>
		</div>
	</div>
</Col>
