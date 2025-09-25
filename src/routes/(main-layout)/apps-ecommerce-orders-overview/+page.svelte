<script>
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Overview" sub_title="Orders" />
<Card>
	<CardBody>
		<div class="flex flex-wrap items-center gap-5">
			<div class="grow">
				<h6 class="mb-1">Order ID: PEO-14521</h6>
				<p class="dark:text-dark-500 mb-3 text-gray-500">Order Date: 01 Sep, 2024</p>
				<span class="badge badge-red align-middle">Payment Pending</span>
			</div>
			<div class="shrink-0 items-center gap-2 sm:flex">
				<button class="btn btn-primary btn-icon-overlay">
					<span class="icon"><LucideIcon name="CircleArrowDown" class="size-4" /></span> Download Invoice
				</button>
				<button class="btn btn-sub-gray mt-3 sm:mt-0"
					><LucideIcon name="Pencil" class="inline-block size-4 ltr:mr-2 rtl:ml-2" /><span
						class="align-center">Edit</span
					></button
				>
			</div>
		</div>
	</CardBody>
</Card>

<Card>
	<CardBody>
		<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
			<div class="space-y-2">
				<p class="dark:text-dark-500 text-gray-500">
					Customer Name: <span class="dark:text-dark-50 font-medium text-gray-800"
						>Isabella Thomas</span
					>
				</p>
				<p class="dark:text-dark-500 text-gray-500">
					Email: <span class="dark:text-dark-50 font-medium text-gray-800"
						>isabella@example.com</span
					>
				</p>
				<p class="dark:text-dark-500 text-gray-500">
					Phone No: <span class="dark:text-dark-50 font-medium text-gray-800"
						>+(245) 012 345 678</span
					>
				</p>
				<p class="dark:text-dark-500 text-gray-500">
					Delivery Place: <span class="dark:text-dark-50 font-medium text-gray-800">Home</span>
				</p>
				<p class="dark:text-dark-500 text-gray-500">
					Payment Method: <span class="dark:text-dark-50 font-medium text-gray-800"
						>Online Payment</span
					>
				</p>
			</div>
			<div class="space-y-2">
				<p class="dark:text-dark-500 text-gray-500">
					Address Line: <span class="dark:text-dark-50 font-medium text-gray-800"
						>0588 Macey Ranch</span
					>
				</p>
				<p class="dark:text-dark-500 text-gray-500">
					City: <span class="dark:text-dark-50 font-medium text-gray-800">Port Blake</span>
				</p>
				<p class="dark:text-dark-500 text-gray-500">
					Country: <span class="dark:text-dark-50 font-medium text-gray-800">New Mexico</span>
				</p>
				<p class="dark:text-dark-500 text-gray-500">
					Pin Code: <span class="dark:text-dark-50 font-medium text-gray-800">96153-1460</span>
				</p>
				<p class="dark:text-dark-500 text-gray-500">
					Delivery Status: <span class="badge badge-purple">Shipping</span>
				</p>
			</div>
		</div>
	</CardBody>
</Card>

<Card>
	<CardHeader>
		<CardTitle>Product Items</CardTitle>
	</CardHeader>
	<CardBody>
		<div class="overflow-x-auto">
			<table class="flush table whitespace-nowrap">
				<tbody>
					<tr>
						<th>#</th>
						<th>Product Name</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
					</tr>
					<tr>
						<td>1</td>
						<td class="whitespace-nowrap">
							<div class="flex items-center gap-3">
								<div
									class="dark:border-dark-800 size-16 shrink-0 rounded-md border border-gray-200 p-2"
								>
									<img src="/assets/images/products/img-01.png" alt="" />
								</div>
								<div>
									<h6 class="mb-2">
										<a href="/apps-ecommerce-overview" class="link link-primary !text-current"
											>Blouse Ruffle Tube top</a
										>
									</h6>
									<div
										class="dark:divide-dark-800 divide-x divide-gray-200 text-sm *:px-2.5 rtl:divide-x-reverse"
									>
										<a
											href="/apps-ecommerce-category"
											class="underline ltr:first:pl-0 rtl:first:pr-0">Fashion</a
										>
										<span>XL</span>
										<span>Sky Blue</span>
									</div>
								</div>
							</div>
						</td>
						<td>$14.99</td>
						<td>04</td>
						<td>$59.96</td>
					</tr>
					<tr>
						<td>2</td>
						<td>
							<div class="flex items-center gap-3">
								<div
									class="dark:border-dark-800 size-16 shrink-0 rounded-md border border-gray-200 p-2"
								>
									<img src="/assets/images/products/img-04.png" alt="" />
								</div>
								<div>
									<h6 class="mb-2">
										<a href="/apps-ecommerce-overview" class="link link-primary !text-current"
											>Crop top Sweater Clothing</a
										>
									</h6>
									<div
										class="dark:divide-dark-800 divide-x divide-gray-200 text-sm *:px-2.5 rtl:divide-x-reverse"
									>
										<a
											href="/apps-ecommerce-category"
											class="underline ltr:first:pl-0 rtl:first:pr-0">Fashion</a
										>
										<span>M</span>
										<span>Pink</span>
									</div>
								</div>
							</div>
						</td>
						<td>$29.49</td>
						<td>06</td>
						<td>$176.94</td>
					</tr>
					<tr>
						<td>3</td>
						<td>
							<div class="flex items-center gap-3">
								<div
									class="dark:border-dark-800 size-16 shrink-0 rounded-md border border-gray-200 p-2"
								>
									<img src="assets/images/products/img-08.png" alt="" />
								</div>
								<div>
									<h6 class="mb-2">
										<a href="/apps-ecommerce-overview" class="link link-primary !text-current"
											>Tote bag Leather Handbag Dolce</a
										>
									</h6>
									<div
										class="dark:divide-dark-800 divide-x divide-gray-200 text-sm *:px-2.5 rtl:divide-x-reverse"
									>
										<a
											href="/apps-ecommerce-category"
											class="underline ltr:first:pl-0 rtl:first:pr-0">Bags</a
										>
										<span>Red</span>
									</div>
								</div>
							</div>
						</td>
						<td>$79.99</td>
						<td>01</td>
						<td>$79.99</td>
					</tr>
					<tr>
						<td colspan="3"></td>
						<td>Sub Amount</td>
						<td>$316.89</td>
					</tr>
					<tr>
						<td colspan="3"></td>
						<td>Vat Amount (6%)</td>
						<td>$19.19</td>
					</tr>
					<tr>
						<td colspan="3"></td>
						<td>Discount (10%)</td>
						<td>-$31.98</td>
					</tr>
					<tr>
						<td colspan="3"></td>
						<td>Shipping Charge</td>
						<td>$35.00</td>
					</tr>
					<tr>
						<td colspan="3"></td>
						<td>Total Amount</td>
						<td>$339.10</td>
					</tr>
				</tbody>
			</table>
		</div>
	</CardBody>
</Card>

<Card>
	<div class="card-header flex items-center gap-5">
		<h6 class="card-title grow">Delivery Status</h6>
		<a href="/apps-ecommerce-orders-track" class="btn btn-sub-red">Track Order</a>
	</div>
	<CardBody>
		<div class="px-12 py-2">
			<div
				class="horizontal timeline dark:before:bg-dark-800 relative flex items-center justify-between before:absolute before:block before:h-[0.2em] before:w-full before:bg-gray-200 lg:w-full"
			>
				<div
					class="steps relative flex w-full items-center justify-between before:!hidden after:!hidden ltr:pl-0 rtl:pr-0"
				>
					<div
						class="dark:border-dark-900 [&.done]:bg-primary-500 [&.current]:before:bg-primary-500 done relative bottom-1.5 z-10 mx-1 block rounded-full border-2 border-white bg-gray-200 p-1.5 ltr:first:ml-0 ltr:last:mr-0 rtl:first:mr-0 rtl:last:ml-0 dark:bg-gray-800 [&.current]:before:absolute [&.current]:before:bottom-0 [&.current]:before:-mt-1 [&.current]:before:h-3 [&.current]:before:w-3 [&.current]:before:animate-ping [&.current]:before:rounded-full ltr:[&.current]:before:left-0 ltr:[&.current]:before:-mr-1 rtl:[&.current]:before:right-0 rtl:[&.current]:before:-ml-1"
					>
						<span
							class="dark:text-dark-500 absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-gray-500"
							>Order Place</span
						>
					</div>
					<div
						class="dark:border-dark-900 [&.done]:bg-primary-500 [&.current]:before:bg-primary-500 done relative bottom-1.5 z-10 mx-1 block rounded-full border-2 border-white bg-gray-200 p-1.5 ltr:first:ml-0 ltr:last:mr-0 rtl:first:mr-0 rtl:last:ml-0 dark:bg-gray-800 [&.current]:before:absolute [&.current]:before:bottom-0 [&.current]:before:-mt-1 [&.current]:before:h-3 [&.current]:before:w-3 [&.current]:before:animate-ping [&.current]:before:rounded-full ltr:[&.current]:before:left-0 ltr:[&.current]:before:-mr-1 rtl:[&.current]:before:right-0 rtl:[&.current]:before:-ml-1"
					>
						<span
							class="dark:text-dark-500 absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-gray-500"
							>Pickup</span
						>
					</div>
					<div
						class="dark:border-dark-900 [&.done]:bg-primary-500 [&.current]:before:bg-primary-500 done current relative bottom-1.5 z-10 mx-1 block rounded-full border-2 border-white bg-gray-200 p-1.5 ltr:first:ml-0 ltr:last:mr-0 rtl:first:mr-0 rtl:last:ml-0 dark:bg-gray-800 [&.current]:before:absolute [&.current]:before:bottom-0 [&.current]:before:-mt-1 [&.current]:before:h-3 [&.current]:before:w-3 [&.current]:before:animate-ping [&.current]:before:rounded-full ltr:[&.current]:before:left-0 ltr:[&.current]:before:-mr-1 rtl:[&.current]:before:right-0 rtl:[&.current]:before:-ml-1"
					>
						<span
							class="dark:text-dark-500 absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-gray-500"
							>Shipped</span
						>
					</div>
					<div
						class="dark:border-dark-900 [&.done]:bg-primary-500 [&.current]:before:bg-primary-500 relative bottom-1.5 z-10 mx-1 block rounded-full border-2 border-white bg-gray-200 p-1.5 ltr:first:ml-0 ltr:last:mr-0 rtl:first:mr-0 rtl:last:ml-0 dark:bg-gray-800 [&.current]:before:absolute [&.current]:before:bottom-0 [&.current]:before:-mt-1 [&.current]:before:h-3 [&.current]:before:w-3 [&.current]:before:animate-ping [&.current]:before:rounded-full ltr:[&.current]:before:left-0 ltr:[&.current]:before:-mr-1 rtl:[&.current]:before:right-0 rtl:[&.current]:before:-ml-1"
					>
						<span
							class="dark:text-dark-500 absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-gray-500"
							>Out of Delivery</span
						>
					</div>
					<div
						class="dark:border-dark-900 [&.current]:before:bg-primary-500 relative bottom-1.5 z-10 mx-1 block rounded-full border-2 border-white bg-gray-200 p-1.5 ltr:first:ml-0 ltr:last:mr-0 rtl:first:mr-0 rtl:last:ml-0 dark:bg-gray-800 [&.current]:before:absolute [&.current]:before:bottom-0 [&.current]:before:-mt-1 [&.current]:before:h-3 [&.current]:before:w-3 [&.current]:before:animate-ping [&.current]:before:rounded-full ltr:[&.current]:before:left-0 ltr:[&.current]:before:-mr-1 rtl:[&.current]:before:right-0 rtl:[&.current]:before:-ml-1 [&.done]:bg-green-500"
					>
						<span
							class="dark:text-dark-500 absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-gray-500"
							>Delivered</span
						>
					</div>
				</div>

				<div
					class="line bg-primary-500 absolute inset-x-0 block h-[0.2em] w-1/2 !pb-0 before:!hidden after:!hidden"
				></div>
			</div>
		</div>
	</CardBody>
</Card>
