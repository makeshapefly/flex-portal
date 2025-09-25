<script lang="ts">
	import Account from '$lib/components/common/Account.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { onMount } from 'svelte';
	import { accountBilling } from './billing';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import IMask from 'imask';
	import ModalClose from '$lib/components/ui/modal/ModalClose.svelte';

	let defaultCard: number | null = 1;
	interface Billing {
		statementsID: string;
		paymentDate: string;
		plan: string;
		paymentType: string;
		amount: string;
		status: string;
	}

	let products: Billing[] = accountBilling;
	let displayedProducts: Billing[] = [];
	let currentPage = 1;
	const itemsPerPage = 10;
	let sortBy: string = '';
	let sortDirection: 'asc' | 'desc' = 'asc';
	let searchTerm: string = '';

	let cardNumber: string = '';
	let cvv: string = '';
	let expiryDate: string = '';
	let nameOnCard: string = '';
	let setAsDefault: boolean = false;

	// Refs for the input elements
	let cardNumberInput: HTMLInputElement | null = null;
	let cvvInput: HTMLInputElement | null = null;
	let expiryDateInput: HTMLInputElement | null = null;

	// Sorting logic
	function sort(field: string) {
		if (sortBy === field) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = field;
			sortDirection = 'asc';
		}
		sortProducts();
	}

	function sortProducts() {
		let filteredProducts = getFilteredProducts();

		if (sortBy) {
			filteredProducts = filteredProducts.sort((a: any, b: any) => {
				let fieldA = a[sortBy as keyof Billing];
				let fieldB = b[sortBy as keyof Billing];

				if (typeof fieldA === 'string' && typeof fieldB === 'string') {
					if (sortBy === 'paymentDate') {
						fieldA = new Date(fieldA).getTime();
						fieldB = new Date(fieldB).getTime();
					} else if (sortBy === 'amount') {
						fieldA = parseFloat(fieldA.replace('$', '').trim());
						fieldB = parseFloat(fieldB.replace('$', '').trim());
					}
				}

				if (sortDirection === 'asc') {
					return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
				} else {
					return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
				}
			});
		}

		displayedProducts = filteredProducts;
		updatePagination(filteredProducts);
	}

	// Filter products based on search term
	function getFilteredProducts(): Billing[] {
		if (!searchTerm) {
			return products;
		}

		return products.filter((product) => {
			return (
				product.statementsID.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.paymentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.paymentDate.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});
	}

	// Pagination logic
	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
			updatePagination(getFilteredProducts());
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
			updatePagination(getFilteredProducts());
		}
	}

	function gotoPage(page: number) {
		currentPage = page;
		updatePagination(getFilteredProducts());
	}

	function updatePagination(filteredProducts: Billing[]) {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		displayedProducts = filteredProducts.slice(start, end);

		showingStart = start + 1;
		showingEnd = Math.min(end, filteredProducts.length);
	}

	// Reactive variables for pagination display
	let showingStart = 1;
	let showingEnd = itemsPerPage;
	let totalPages = Math.ceil(products.length / itemsPerPage);

	function createCardNumberMask(value: string) {
		if (value.startsWith('34') || value.startsWith('37')) {
			return '9999 999999 99999'; // American Express
		} else {
			return '9999 9999 9999 9999'; // Standard
		}
	}

	// Initialize displayed products on page load
	onMount(() => {
		updatePagination(getFilteredProducts());
		if (cardNumberInput) {
			const cardMask = IMask(cardNumberInput, {
				mask: createCardNumberMask(cardNumber) // Initially apply the correct mask based on the card number
			});

			// Watch for changes to update the mask dynamically
			cardNumberInput.addEventListener('input', (event: Event) => {
				const inputValue = (event.target as HTMLInputElement).value;
				cardMask.updateOptions({ mask: createCardNumberMask(inputValue) });
			});
		}

		if (cvvInput) {
			IMask(cvvInput, {
				mask: '999'
			});
		}

		if (expiryDateInput) {
			IMask(expiryDateInput, {
				mask: 'MM/YYYY'
			});
		}
	});

	function handleSubmit(event: Event): void {
		event.preventDefault();
		// You can process the form data here
		console.log({ cardNumber, cvv, expiryDate, nameOnCard, setAsDefault });
	}
	// Handle search input changes
	function onSearchInput(event: Event) {
		const input = (event.target as HTMLInputElement).value;
		searchTerm = input;
		currentPage = 1; // Reset to first page on new search
		sortProducts();
	}

	// Array of cards
	let cards = [
		{
			id: 1,
			image: 'assets/images/payment/visa.png',
			number: 'xxxx xxxx xxx 1547',
			expiry: '01/2030'
		},
		{
			id: 2,
			image: 'assets/images/payment/american.png',
			number: 'xxxx xxxx xxx 8749',
			expiry: '24/2030'
		},
		{
			id: 3,
			image: 'assets/images/payment/mastercard.png',
			number: 'xxxx xxxx xxx 3641',
			expiry: '13/2028'
		}
	];

	// Function to toggle default card
	const setDefaultCard = (id: number) => {
		defaultCard = defaultCard === id ? null : id;
	};
</script>

<Account variant="billing" />

<Card class="mt-4">
	<CardHeader>
		<CardTitle class="mb-1">Billing Settings</CardTitle>
		<p class="dark:text-dark-500 text-gray-500">
			Take control of your billing and plan details here.
		</p>
	</CardHeader>
	<CardBody>
		<Grid cols={1} gap={5} class="xl:grid-cols-2">
			<div>
				<h6 class="mb-3">Current Plan:</h6>
				<Card class="mb-0">
					<CardBody>
						<div class="flex items-center">
							<div class="grow">
								<h6 class="mb-2">
									Basic Plan <span
										class="badge badge-red align-middle whitespace-nowrap ltr:ml-1 rtl:mr-1"
										>Monthly</span
									>
								</h6>
								<p class="dark:text-dark-500 text-gray-500">
									Our most sought-after plan tailored for small teams.
								</p>
							</div>
							<h3>
								$20 <small class="dark:text-dark-500 text-sm font-normal text-gray-500"
									>Per month</small
								>
							</h3>
						</div>

						<div class="mt-4">
							<div class="mb-2 flex items-center gap-3">
								<h6 class="grow text-xs">16 of 30 Users</h6>
								<h6 class="text-xs font-semibold text-sky-500">55.47%</h6>
							</div>
							<div class="progress-bar progress-1">
								<div class="progress-bar-wrap bg-primary-500 w-1/2 text-white"></div>
							</div>
						</div>
						<div class="mt-5 text-right">
							<a href="/pages-pricing" class="btn btn-primary">
								<span class="align-middle whitespace-nowrap">Upgrade Plan</span>
								<LucideIcon name="ArrowUpRight" class="size-4 ltr:inline-block rtl:hidden" />
								<LucideIcon name="ArrowUpLeft" class="size-4 ltr:hidden rtl:inline-block" />
							</a>
						</div>
					</CardBody>
				</Card>
			</div>
			<!--end col-->
			<div>
				<h6 class="mb-3">Billing Information:</h6>
				<div class="card mb-0">
					<div class="card-body">
						<div class="flex items-center">
							<div class="grow">
								<h6 class="mb-2">Sophia Mia</h6>
								<p class="dark:text-dark-500 mb-1 text-gray-500">
									3011 E Semoran Blvd, Apopka, Florida,
								</p>
								<p class="dark:text-dark-500 mb-1 text-gray-500">United States - 32703.</p>
								<p class="dark:text-dark-500 text-gray-500">+(407) 774-3111</p>
							</div>
						</div>
						<div class="mt-5 flex justify-end ltr:text-right rtl:text-left">
							<ModalTrigger
								modalId="edit-modal"
								icon="Pencil"
								text="Edit Billing"
								color="gray"
								class="btn btn-sub-gray"
							/>
						</div>
					</div>
				</div>
			</div>
			<!--end col-->
		</Grid>
	</CardBody>
</Card>

<Card>
	<CardHeader>
		<CardTitle>Payment Methods</CardTitle>
	</CardHeader>
	<CardBody>
		<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
			{#each cards as card}
				<div class="card mb-0">
					<div class="card-body from-primary-500/10 backdrop-lg bg-gradient-to-b via-red-500/5">
						<img src={card.image} alt="" class="h-10" />
					</div>
					<div class="card-body pt-0">
						<div class="flex items-center">
							<div class="grow">
								<h6 class="mb-1">{card.number}</h6>
								<p class="dark:text-dark-500 text-gray-500">Expiry on {card.expiry}</p>
							</div>
						</div>
						<div class="mt-5 flex items-center justify-between gap-3">
							<a
								href="#!"
								class="link link-green"
								class:text-green-500={defaultCard === card.id}
								on:click={() => setDefaultCard(card.id)}
							>
								<span>{defaultCard === card.id ? 'Default Set' : 'Set as Default'}</span>
							</a>
							<ModalTrigger modalId="edit" text="Edit" color="light" icon="Pencil" />
						</div>
					</div>
				</div>
			{/each}

			<CardBody class="card mb-0 flex items-center justify-center border-dashed ">
				<ModalTrigger
					modalId="add"
					icon="CirclePlus"
					color="light"
					class="size-44 h-full w-full place-items-center text-6xl"
					iconCss=" !size-10 text-green-500 stroke-1 fill-green-500/10"
				/>
			</CardBody>
		</div>
	</CardBody>
</Card>

<Card>
	<CardHeader>
		<Grid cols={12} gap={3} class="items-center">
			<Col
				cols={{ span: 12 }}
				md={{ span: 5 }}
				xl={{ span: 3 }}
				class="col-span-12 md:col-span-5 xl:col-span-3"
			>
				<CardTitle>Billing History</CardTitle>
			</Col>
			<Col cols={{ span: 12 }} md={{ span: 7 }} xl={{ span: 3 }} class="xl:col-start-10">
				<div class="group/form relative">
					<input
						type="email"
						on:input={onSearchInput}
						class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
						placeholder="Search for ..."
					/>
					<div
						class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
					>
						<LucideIcon name="Search" class="size-4" />
					</div>
				</div>
			</Col>
		</Grid>
	</CardHeader>
	<CardBody>
		<div class="overflow-x-auto">
			<table class="table">
				<thead>
					<tr class="dark:bg-dark-850 bg-gray-100">
						<th
							class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
							on:click={() => sort('statementsID')}
						>
							Billing ID
							<span>{sortBy === 'statementsID' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th
							class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
							on:click={() => sort('paymentDate')}
						>
							Payment Date
							<span>{sortBy === 'paymentDate' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th
							class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
							on:click={() => sort('plan')}
						>
							Plan
							<span>{sortBy === 'plan' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th
							class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
							on:click={() => sort('paymentType')}
						>
							Payment Type
							<span>{sortBy === 'paymentType' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th
							class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
							on:click={() => sort('amount')}
						>
							Amount
							<span>{sortBy === 'amount' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th
							class="dark:text-dark-500 cursor-pointer !font-medium whitespace-nowrap text-gray-500"
							on:click={() => sort('status')}
						>
							status
							<span>{sortBy === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th class="dark:text-dark-500 !font-medium text-gray-500 ltr:!text-right rtl:!text-left"
							>Invoice</th
						>
					</tr>
				</thead>
				<tbody>
					{#each displayedProducts as product}
						<tr>
							<td>
								<a href="#!" class="link link-primary">{product.statementsID}</a>
							</td>
							<td>{product.paymentDate}</td>
							<td>{product.plan}</td>
							<td>{product.paymentType}</td>
							<td>{product.amount}</td>
							<td>
								<span
									class={`badge ${
										product.status === 'Unpaid'
											? 'badge-red'
											: product.status === 'Pending'
												? 'badge-yellow'
												: 'badge-green'
									}`}>{product.status}</span
								>
							</td>
							<td class="ltr:text-right rtl:text-left">
								<a href="#!" title="Download" class="link link-primary" aria-label="Download">
									<i class="ri-download-2-line align-bottom"></i>
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="mt-5 grid grid-cols-12 items-center gap-5">
			<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
				<p class="dark:text-dark-500 text-gray-500">
					Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{products.length}</b> Results
				</p>
			</div>
			<div class="col-span-12 md:col-span-6">
				<div class="pagination pagination-primary flex justify-center md:justify-end">
					<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
						<LucideIcon name="ChevronLeft" class="mr-1 size-5 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronRight" class="ml-1 size-5 ltr:hidden rtl:inline-block" />
						Prev
					</button>
					{#each Array(totalPages) as _, i}
						<button
							on:click={() => gotoPage(i + 1)}
							class="pagination-item {currentPage === i + 1 ? 'active' : ''}"
						>
							{i + 1}
						</button>
					{/each}
					<button on:click={nextPage} disabled={currentPage === totalPages} class="pagination-next">
						Next
						<LucideIcon name="ChevronRight" class="ml-1 size-5 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronLeft" class="mr-1 size-5 ltr:hidden rtl:inline-block" />
					</button>
				</div>
			</div>
		</div>
	</CardBody>
</Card>

<!-- modal -->
<Modal modalId="edit-modal" let:modalId>
	<ModalHeader {modalId}>
		<h6>Billing Information</h6>
	</ModalHeader>
	<ModalBody>
		<form action="#!">
			<div class="grid grid-cols-12 gap-5">
				<div class="col-span-12">
					<label for="namePersonalInput" class="form-label">Personal / Company Name</label>
					<input
						type="text"
						id="namePersonalInput"
						class="form-input"
						placeholder="Enter your name"
						value="Sophia Mia"
						required
					/>
				</div>
				<div class="col-span-12">
					<label for="addressInput" class="form-label">Personal / Company Address</label>
					<input
						type="text"
						id="addressInput"
						class="form-input"
						placeholder="Your address"
						value="3011 E Semoran Blvd"
						required
					/>
				</div>
				<div class="col-span-6">
					<label for="sampleSelect" class="form-label">Country</label>
					<div id="sampleSelect"></div>
				</div>
				<div class="col-span-6">
					<label for="stateInput" class="form-label">State</label>
					<input
						type="text"
						id="stateInput"
						class="form-input"
						placeholder="Your state"
						value="Florida"
						required
					/>
				</div>
				<!--end col-->
				<div class="col-span-6">
					<label for="cityInput" class="form-label">City</label>
					<input
						type="text"
						id="cityInput"
						class="form-input"
						placeholder="Your city"
						value="Apopka"
						required
					/>
				</div>
				<!--end col-->
				<div class="col-span-6">
					<label for="zipCodeInput" class="form-label">Zip Code</label>
					<input
						type="number"
						id="zipCodeInput"
						class="form-input"
						placeholder="Zip code"
						value="32703"
						required
					/>
				</div>
				<!--end col-->
				<div class="col-span-6">
					<label for="phoneNumberInput" class="form-label">Phone Number</label>
					<input
						type="tel"
						id="phoneNumberInput"
						class="form-input"
						placeholder="Enter your phone number"
						value="+(407) 774-3111"
						required
					/>
				</div>
				<!--end col-->
				<div class="col-span-6">
					<label for="emailInput" class="form-label">Email Address</label>
					<input
						type="email"
						id="emailInput"
						class="form-input"
						placeholder="Enter your email"
						value="shopia@srbthemes.com"
						required
					/>
				</div>
				<!--end col-->
				<div class="col-span-12">
					<div class="flex items-center justify-end gap-2">
						<ModalClose {modalId} class="btn btn-active-red">Cancel</ModalClose>
						<!-- <button class="btn btn-active-red">Cancel</button> -->
						<button type="submit" class="btn btn-primary">Update</button>
					</div>
				</div>
			</div>
			<!--end grid-->
		</form>
	</ModalBody>
</Modal>

<!-- edit -->
<Modal modalId="edit" let:modalId>
	<ModalHeader {modalId}><h6>Add Card</h6></ModalHeader>
	<ModalBody>
		<form on:submit={handleSubmit}>
			<div class="grid grid-cols-12 gap-5">
				<!-- Card Number -->
				<div class="col-span-12">
					<label for="cardNumberInput" class="form-label">Card Number</label>
					<input
						type="text"
						id="cardNumberInput"
						bind:value={cardNumber}
						class="form-input"
						placeholder="0000 0000 0000 0000"
						required
						bind:this={cardNumberInput}
					/>
				</div>

				<!-- CVV -->
				<div class="col-span-12 lg:col-span-3">
					<label for="cvvInput" class="form-label">CVV</label>
					<input
						type="text"
						id="cvvInput"
						bind:value={cvv}
						class="form-input"
						placeholder="000"
						required
						bind:this={cvvInput}
					/>
				</div>

				<!-- Expiry Date -->
				<div class="col-span-12 lg:col-span-3">
					<label for="expiryDateInput" class="form-label">Expiry Date</label>
					<input
						type="text"
						id="expiryDateInput"
						bind:value={expiryDate}
						class="form-input"
						placeholder="MM/YYYY"
						required
						bind:this={expiryDateInput}
					/>
				</div>

				<!-- Name on the Card -->
				<div class="col-span-12 lg:col-span-6">
					<label for="nameOnTheCardInput" class="form-label">Name on the Card</label>
					<input
						type="text"
						id="nameOnTheCardInput"
						bind:value={nameOnCard}
						class="form-input"
						placeholder="Enter name"
						required
					/>
				</div>

				<!-- Set as Default -->
				<div class="col-span-12">
					<div class="input-check-group items-start">
						<input
							id="checkboxBasic1"
							class="input-check input-check-primary mt-0.5 shrink-0"
							type="checkbox"
							bind:checked={setAsDefault}
						/>
						<label for="checkboxBasic1" class="input-check-label grow">
							<span class="mb-1.5 block font-medium">Set as Default</span>
							<span class="dark:text-dark-500 block text-gray-500"
								>Scheduled payment will be automatically deducted from this card.</span
							>
						</label>
					</div>
				</div>

				<!-- Submit and Cancel Buttons -->
				<div class="col-span-12">
					<div class="flex items-center justify-end gap-2">
						<ModalClose {modalId} class="btn btn-active-red">Cancel</ModalClose>
						<!-- <button type="button" data-modal-close="addCardPaymentModal" class="btn btn-active-red">
              Cancel
            </button> -->
						<button type="submit" class="btn btn-primary">Add Card</button>
					</div>
				</div>
			</div>
		</form>
	</ModalBody>
</Modal>

<Modal modalId="add" let:modalId>
	<ModalHeader {modalId}><h6>Add Card</h6></ModalHeader>
	<ModalBody>
		<form on:submit={handleSubmit}>
			<div class="grid grid-cols-12 gap-5">
				<!-- Card Number -->
				<div class="col-span-12">
					<label for="cardNumberInput" class="form-label">Card Number</label>
					<input
						type="text"
						id="cardNumberInput"
						bind:value={cardNumber}
						class="form-input"
						placeholder="0000 0000 0000 0000"
						required
						bind:this={cardNumberInput}
					/>
				</div>

				<!-- CVV -->
				<div class="col-span-12 lg:col-span-3">
					<label for="cvvInput" class="form-label">CVV</label>
					<input
						type="text"
						id="cvvInput"
						bind:value={cvv}
						class="form-input"
						placeholder="000"
						required
						bind:this={cvvInput}
					/>
				</div>

				<!-- Expiry Date -->
				<div class="col-span-12 lg:col-span-3">
					<label for="expiryDateInput" class="form-label">Expiry Date</label>
					<input
						type="text"
						id="expiryDateInput"
						bind:value={expiryDate}
						class="form-input"
						placeholder="MM/YYYY"
						required
						bind:this={expiryDateInput}
					/>
				</div>

				<!-- Name on the Card -->
				<div class="col-span-12 lg:col-span-6">
					<label for="nameOnTheCardInput" class="form-label">Name on the Card</label>
					<input
						type="text"
						id="nameOnTheCardInput"
						bind:value={nameOnCard}
						class="form-input"
						placeholder="Enter name"
						required
					/>
				</div>

				<!-- Set as Default -->
				<div class="col-span-12">
					<div class="input-check-group items-start">
						<input
							id="checkboxBasic1"
							class="input-check input-check-primary mt-0.5 shrink-0"
							type="checkbox"
							bind:checked={setAsDefault}
						/>
						<label for="checkboxBasic1" class="input-check-label grow">
							<span class="mb-1.5 block font-medium">Set as Default</span>
							<span class="dark:text-dark-500 block text-gray-500"
								>Scheduled payment will be automatically deducted from this card.</span
							>
						</label>
					</div>
				</div>

				<!-- Submit and Cancel Buttons -->
				<div class="col-span-12">
					<div class="flex items-center justify-end gap-2">
						<ModalClose {modalId} class="btn btn-active-red">Cancel</ModalClose>
						<!-- <button
                      type="button"
                      data-modal-close="addCardPaymentModal"
                      
                    >
                      Cancel
                    </button> -->
						<button type="submit" class="btn btn-primary">Add Card</button>
					</div>
				</div>
			</div>
		</form>
	</ModalBody>
</Modal>
