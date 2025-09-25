<script lang="ts">
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { invoicesData } from './invoice';

	// Calculate the totals
	const calculateTotals = () => {
		let subtotal = 0;
		let vatAmount = 0;
		let discount = 0;
		let shippingCharge = 35.0; // Example shipping charge
		invoicesData.forEach((item) => {
			subtotal += parseFloat(item.subTotal.replace('$', ''));
		});

		vatAmount = subtotal * 0.06; // 6% VAT
		discount = subtotal * 0.1; // 10% discount

		const totalAmount = subtotal + vatAmount - discount + shippingCharge;

		return {
			subtotal: subtotal.toFixed(2),
			vatAmount: vatAmount.toFixed(2),
			discount: discount.toFixed(2),
			shippingCharge: shippingCharge.toFixed(2),
			totalAmount: totalAmount.toFixed(2)
		};
	};

	// Bind the totals
	let totals = calculateTotals();
</script>

<div class="mx-auto mb-5 sm:max-w-6xl print:max-w-full" id="invoice-content">
	<div class="card print:border-0 print:shadow-none">
		<div class="card-body md:p-10 print:p-0">
			<div class="mb-5 md:flex">
				<div class="mb-4 grow md:mb-0">
					<a href="#!">
						<img src="/assets/images/main-logo.png" alt="" class="inline-block h-8 dark:hidden" />
						<img src="/assets/images/logo-white.png" alt="" class="hidden h-8 dark:inline-block" />
					</a>
					<h6 class="text-16 mt-3">Invoice #PEI-15485</h6>
				</div>
				<div class="space-y-2 ltr:text-right rtl:text-left">
					<p class="dark:text-dark-500 text-gray-500">
						Support Email: <a
							href="mailto:support@example.com"
							class="dark:text-dark-50 font-semibold text-gray-800">support@example.com</a
						>
					</p>
					<p class="dark:text-dark-500 text-gray-500">
						Invoice Date: <span class="dark:text-dark-50 font-semibold text-gray-800"
							>28 May, 2024</span
						>
					</p>
					<p class="dark:text-dark-500 text-gray-500">
						Due Date: <span class="dark:text-dark-50 font-semibold text-gray-800"
							>02 June, 2024</span
						>
					</p>
				</div>
			</div>

			<Grid cols={12} gap={5}>
				<Col cols={{ span: 12 }} md={{ span: 6 }}>
					<p class="dark:text-dark-500 mb-1 text-gray-500">From Address</p>
					<h6 class="mb-2">Martin Riedel</h6>
					<pre
						class="dark:text-dark-500 font-body font-base text-gray-500">Emma-Köhler-Allee 4c, Germering,
Nordrhein-Westfalen, Germany - 13907</pre>
					<p class="dark:text-dark-500 mt-1 text-gray-500">Phone No.: 0068829546</p>
					<p class="dark:text-dark-500 mt-1 text-gray-500">Email: thiele.hanspeter@web.de</p>
				</Col>
				<Col cols={{ span: 12 }} md={{ span: 6 }}>
					<p class="dark:text-dark-500 mb-1 text-gray-500">Billing Address</p>
					<h6 class="mb-2">Jana Timmermans</h6>
					<pre class="dark:text-dark-500 font-body font-base text-gray-500">place Denis 11, Chimay,
Fosses-la-Ville, Belgium - 4823</pre>
					<p class="dark:text-dark-500 mt-1 text-gray-500">Phone No.: 03 7327843</p>
					<p class="dark:text-dark-500 mt-1 text-gray-500">Email: axelle.dewinter@willems.net</p>
				</Col>
			</Grid>

			<div class="overflow-x-auto">
				<table class="flush table">
					<thead>
						<tr class="whitespace-nowrap">
							<th>#</th>
							<th>Product Name</th>
							<th>Price</th>
							<th>Qty</th>
							<th>Subtotal</th>
						</tr>
					</thead>
					<tbody>
						{#each invoicesData as item, index}
							<tr class="whitespace-nowrap *:px-3 *:py-2.5">
								<td>{item.productNumber}</td>
								<td>
									<div class="flex items-center gap-2">
										<div
											class="dark:border-dark-800 flex size-12 items-center justify-center rounded border border-gray-200 p-1"
										>
											<img src={item.image} alt="" class="rounded" />
										</div>
										<div>
											<h6 class="mb-1">
												<a href="/apps-ecommerce-product-overview">{item.name}</a>
											</h6>
											<p
												class="dark:text-dark-500 dark:divide-dark-800 flex items-center gap-2 divide-x divide-gray-200 text-gray-500"
											>
												<span class="px-2 ltr:first:!pl-0 rtl:first:!pr-0">{item.color}</span>
												<span>{item.size}</span>
											</p>
										</div>
									</div>
								</td>
								<td>{item.price}</td>
								<td>{item.qty}</td>
								<td>{item.subTotal}</td>
							</tr>
						{/each}
						<tr class="whitespace-nowrap">
							<td colspan="3"></td>
							<td>Subtotal:</td>
							<th class="!border-0">${totals.subtotal}</th>
						</tr>
						<tr class="whitespace-nowrap">
							<td colspan="3"></td>
							<td>Vat Amount (6%)</td>
							<th class="!border-0">${totals.vatAmount}</th>
						</tr>
						<tr class="whitespace-nowrap">
							<td colspan="3"></td>
							<td>Discount (10%)</td>
							<th class="!border-0">-${totals.discount}</th>
						</tr>
						<tr class="whitespace-nowrap">
							<td colspan="3"></td>
							<td>Shipping Charge</td>
							<th class="!border-0">${totals.shippingCharge}</th>
						</tr>
						<tr class="whitespace-nowrap">
							<td colspan="3"></td>
							<td>Total Amount</td>
							<th class="text-primary-600 !border-0">${totals.totalAmount}</th>
						</tr>
					</tbody>
				</table>
			</div>
			<Grid cols={12} class="mt-5">
				<Col cols={{ span: 6 }}>
					<h6 class="mb-2">
						Payment Method <span class="badge badge-green align-middle ltr:ml-1 rtl:mr-1">Paid</span
						>
					</h6>
					<p class="dark:text-dark-500 mt-1 text-gray-500">Card Holder Name: Karen Reich</p>
					<p class="dark:text-dark-500 mt-1 text-gray-500">Debit Card: XXXX XXXX XXXX 8741</p>
					<p class="dark:text-dark-500 mt-1 text-gray-500">Expiry Date: 08/2035</p>
					<p class="dark:text-dark-500 mt-1 text-gray-500">Total Amount: $339.10</p>
				</Col>
			</Grid>
		</div>
		<div
			class="card-footer dark:bg-dark-850 dark:print:bg-dark-850 print:mt-space flex flex-wrap items-center bg-gray-100 print:border-0 print:bg-gray-100"
		>
			<h6 class="grow">Thank you for purchasing Domiex Admin & Dashboards</h6>
			<a href="#!" class="shrink-0">+(021) 1452 023 021</a>
		</div>
	</div>

	<div class="flex items-center justify-end gap-2 print:hidden">
		<button class="btn btn-sub-red">Download</button>
		<button class="btn btn-primary" on:click={() => window.print()}>Print Now</button>
	</div>
</div>
