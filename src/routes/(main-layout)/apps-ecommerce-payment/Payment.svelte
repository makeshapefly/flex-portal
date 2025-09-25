<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { closeModal } from '$lib/stores/modal';
	import { writable } from 'svelte/store';

	// Active tab store
	let activeTab = writable('card');
	let completedFill = false;
	const cardDetails = {
		cardName: '',
		cardNumber: '',
		expiryDate: '',
		cvv: ''
	};

	const bankDetails = {
		bankHolderName: '',
		accountNumber: '',
		confirmAccountNumber: '',
		ifscCode: '',
		bankName: ''
	};

	let errors: Record<string, string> = {};
	const validateFiled = (filed: string, value: number | string, errorMessage: string) => {
		if (!value) {
			errors[filed] = errorMessage;
		} else {
			delete errors[filed];
		}
	};

	const validateCardForm = () => {
		errors.cardName = !cardDetails.cardName ? 'Card Name is required.' : '';
		errors.cardNumber = !cardDetails.cardNumber ? 'Card Number is required.' : '';
		errors.expiryDate = !cardDetails.expiryDate ? 'expiryDate is required.' : '';
		errors.cvv = !cardDetails.cvv ? 'cvv is required.' : '';
		return Object.values(errors).every((error) => !error);
	};

	const validateBankForm = () => {
		errors.bankHolderName = !bankDetails.bankHolderName ? 'Holder Name is required.' : '';
		errors.accountNumber = !bankDetails.accountNumber ? 'Account Number is required.' : '';
		errors.confirmAccountNumber = !bankDetails.confirmAccountNumber
			? 'confirm Account Number is required.'
			: '';
		errors.ifscCode = !bankDetails.ifscCode ? 'IFSC Code is required.' : '';
		errors.bankName = !bankDetails.bankName ? 'Bank is required.' : '';
		return Object.values(errors).every((error) => !error);
	};

	const submitCardDetails = () => {
		if (validateCardForm()) {
			completedFill = true;
		}
	};
	const submitBankDetails = () => {
		if (validateBankForm()) {
			completedFill = true;
		}
	};
</script>

<Col cols={{ span: 12 }} xl={{ span: 8 }}>
	<div class="alert alert-green mb-5">
		<div class="flex flex-wrap items-center gap-3">
			<div
				class="dark:bg-dark-900 flex size-14 shrink-0 items-center justify-center rounded-full bg-white"
			>
				<LucideIcon name="UserRoundPlus" class="fill-green-500/10 text-green-500" />
			</div>
			<div class="grow">
				<h6 class="dark:text-dark-50 mb-2 text-gray-800">
					Invite your friend now by referral code!!
				</h6>
				<p class="dark:text-dark-500 text-gray-500">
					Maximize your rewards by sharing your unique referral code for exclusive benefits!
				</p>
			</div>
			<div class="shrink-0">
				<button class="btn btn-green">
					<LucideIcon name="UserRoundPlus" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
					<span class="align-center">Invite Now</span>
				</button>
			</div>
		</div>
	</div>

	<Card>
		<CardHeader>
			<div>
				<Grid cols={12} gap={5} class="mb-5">
					<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }}>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							on:click={() => activeTab.set('card')}
							class={`dark:border-dark-800 flex cursor-pointer items-center gap-3 rounded-md border border-gray-200 p-4 
              ${$activeTab === 'card' ? 'dark:bg-dark-850 bg-gray-100' : ''}`}
						>
							<img src="assets/images/payment/visa.png" alt="" class="h-6" />
							<h6>Debit / Credit Card</h6>
						</div>
					</Col>

					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }}>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							on:click={() => activeTab.set('bank')}
							class={`dark:border-dark-800 flex cursor-pointer items-center gap-3 rounded-md border border-gray-200 p-4 
								${$activeTab === 'bank' ? 'dark:bg-dark-850 bg-gray-100' : ''}`}
						>
							<img src="assets/images/payment/bank.png" alt="" class="h-6" />
							<h6>Bank Transfer</h6>
						</div>
					</Col>
				</Grid>

				{#if $activeTab === 'card'}
					<h6 class="mb-3">Debit / Credit Card</h6>
					<form>
						<Grid cols={12} gap={5}>
							<Col cols={{ span: 12 }}>
								<label for="cardName" class="form-label">Card Holder Name</label>
								<input
									type="text"
									id="cardName"
									bind:value={cardDetails.cardName}
									class="form-input"
									placeholder="Enter full name"
								/>
								{#if errors.cardName}
									<span class="text-sm text-red-500">{errors.cardName}</span>
								{/if}
							</Col>

							<Col cols={{ span: 12 }}>
								<label for="debitCreditNumber" class="form-label">Debit / Credit Card Number</label>
								<input
									type="text"
									id="debitCreditNumber"
									bind:value={cardDetails.cardNumber}
									class="form-input"
									placeholder="0000 0000 0000 0000"
									maxlength="19"
								/>
								{#if errors.cardNumber}
									<span class="text-sm text-red-500">{errors.cardNumber}</span>
								{/if}
							</Col>

							<Col cols={{ span: 12 }} md={{ span: 6 }}>
								<label for="expiryDate" class="form-label">Expiry Date</label>
								<input
									type="text"
									id="expiryDate"
									bind:value={cardDetails.expiryDate}
									class="form-input"
									placeholder="MM-YY"
									maxlength="5"
								/>
								{#if errors.expiryDate}
									<span class="text-sm text-red-500">{errors.expiryDate}</span>
								{/if}
							</Col>

							<Col cols={{ span: 12 }} md={{ span: 6 }}>
								<label for="cvv" class="form-label">CVV</label>
								<input
									type="text"
									id="cvv"
									bind:value={cardDetails.cvv}
									class="form-input"
									placeholder="000"
									maxlength="3"
								/>
								{#if errors.cvv}
									<span class="text-sm text-red-500">{errors.cvv}</span>
								{/if}
							</Col>

							<Col cols={{ span: 12 }}>
								<div class="input-check-group">
									<input
										id="checkboxBasic1"
										class="input-check input-check-primary"
										type="checkbox"
									/>
									<label for="checkboxBasic1" class="input-check-label"
										>Save my card for future</label
									>
								</div>
							</Col>

							<div class="col-span-12 ltr:text-right rtl:text-left">
								<button type="submit" class="btn btn-primary" on:click={() => submitCardDetails()}>
									Pay Now
									<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden"
									></LucideIcon>
									<LucideIcon name="MoveLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block"
									></LucideIcon>
								</button>

								<Modal modalId="" size="sm">
									<ModalBody>
										<div
											class="bg-[url('/assets/images/others/payment-modal.png')] bg-cover bg-center p-8 text-center"
										>
											<div
												class="mx-auto mb-4 mt-20 flex size-14 items-center justify-center rounded-full bg-green-500/10 text-green-500 backdrop-blur-xl"
											>
												<LucideIcon name="PartyPopper" class="size-6" />
											</div>
											<h5 class="mb-1">Thank you for your purchase.</h5>
											<p class="dark:text-dark-500 mb-4 text-gray-500">
												Your payment has been processed successfully!
											</p>
											<div class="flex items-center justify-center gap-2">
												<a
													href="/apps-ecommerce-products-list"
													class="btn btn-green"
													on:click={() => closeModal()}>Continue Shopping!</a
												>
											</div>
										</div>
									</ModalBody>
								</Modal>
							</div>
						</Grid>
					</form>
				{/if}

				{#if $activeTab === 'bank'}
					<h6 class="mb-3">Bank Transfer</h6>
					<form>
						<Grid cols={12} gap={5}>
							<Col cols={{ span: 12 }}>
								<label for="bankHolderName" class="form-label">Bank Holder Name</label>
								<input
									type="text"
									id="bankHolderName"
									bind:value={bankDetails.bankHolderName}
									class="form-input"
									placeholder="Enter full name"
								/>
								{#if errors.bankHolderName}
									<span class="text-sm text-red-500">{errors.bankHolderName}</span>
								{/if}
							</Col>

							<Col cols={{ span: 6 }}>
								<label for="accountNumber" class="form-label">Account Number</label>
								<input
									type="number"
									id="accountNumber"
									bind:value={bankDetails.accountNumber}
									class="form-input"
									placeholder="Enter account number"
									maxlength="12"
								/>
								{#if errors.accountNumber}
									<span class="text-sm text-red-500">{errors.accountNumber}</span>
								{/if}
							</Col>

							<Col cols={{ span: 6 }}>
								<label for="confirmAccountNumber" class="form-label">Confirm Account Number</label>
								<input
									type="number"
									id="confirmAccountNumber"
									bind:value={bankDetails.confirmAccountNumber}
									class="form-input"
									placeholder="Enter confirm account number"
									maxlength="12"
								/>
								{#if errors.confirmAccountNumber}
									<span class="text-sm text-red-500">{errors.confirmAccountNumber}</span>
								{/if}
							</Col>

							<Col cols={{ span: 6 }}>
								<label for="ifscCode" class="form-label">IFSC Code</label>
								<input
									type="text"
									id="ifscCode"
									bind:value={bankDetails.ifscCode}
									class="form-input"
									placeholder="IFSC Code"
									maxlength="11"
								/>
								{#if errors.ifscCode}
									<span class="text-sm text-red-500">{errors.ifscCode}</span>
								{/if}
							</Col>

							<Col cols={{ span: 6 }}>
								<label for="bankName" class="form-label">Bank Name</label>
								<input
									type="text"
									id="bankName"
									bind:value={bankDetails.bankName}
									class="form-input"
									placeholder="Bank name"
								/>
								{#if errors.bankName}
									<span class="text-sm text-red-500">{errors.bankName}</span>
								{/if}
							</Col>

							<div class="col-span-12 ltr:text-right rtl:text-left">
								<button type="submit" class="btn btn-primary" on:click={() => submitBankDetails()}>
									Pay Now
								</button>
								<Modal modalId="defaultModal">
									<ModalBody></ModalBody>
								</Modal>
							</div>
						</Grid>
					</form>
				{/if}
			</div>
		</CardHeader>
	</Card>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 4 }}>
	<Card>
		<CardHeader>
			<CardTitle>Order Summary</CardTitle>
		</CardHeader>
		<CardBody>
			<table class="table-sm flush table">
				<tbody>
					<tr>
						<th class="!border-0">Sub Amount</th>
						<td>$316.89</td>
					</tr>
					<tr>
						<th class="!border-0">Vat Amount (6%)</th>
						<td>$19.19</td>
					</tr>
					<tr>
						<th class="!border-0">Discount (10%)</th>
						<td>-$31.98</td>
					</tr>
					<tr>
						<th class="!border-0">Shipping Charge</th>
						<td>$35.00</td>
					</tr>
					<tr class="dark:border-dark-800 border-t border-gray-200">
						<th class="!border-0 font-semibold"><div class="py-1.5">Total Amount</div></th>
						<td><div class="py-1.5">$339.10</div></td>
					</tr>
				</tbody>
			</table>
			<div class="my-4">
				<button class="btn btn-primary w-full">Pay $339.10</button>
			</div>
			<p class="dark:text-dark-500 text-center text-gray-500">100% Money back guarantee</p>
		</CardBody>
	</Card>
</Col>

{#if completedFill}
	<div class="modal">
		<div class="modal-wrap modal-sm modal-center">
			<div
				class="bg-[url('/assets/images/others/payment-modal.png')] bg-cover bg-center p-8 text-center"
			>
				<div
					class="mx-auto mb-4 mt-20 flex size-14 items-center justify-center rounded-full bg-green-500/10 text-green-500 backdrop-blur-xl"
				>
					<LucideIcon name="PartyPopper" class="size-6" />
				</div>
				<h5 class="mb-1">Thank you for your purchase.</h5>
				<p class="dark:text-dark-500 mb-4 text-gray-500">
					Your payment has been processed successfully!
				</p>
				<div class="flex items-center justify-center gap-2">
					<a
						href="/apps-ecommerce-products-list"
						class="btn btn-green"
						on:click={() => closeModal()}>Continue Shopping!</a
					>
				</div>
			</div>
		</div>
	</div>
	<div
		class="backdrop-overlay backdrop-blur-xs"
		on:click={() => closeModal()}
		role="presentation"
	></div>
{/if}
