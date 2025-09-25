<script lang="ts">
	import { wishlistProducts } from './wishlist'; // Import the wishlist data
	import LucideIcon from '$lib/components/common/LucideIcon.svelte'; // Import icon component

	let data = [...wishlistProducts]; // Create a copy to ensure reactivity when updated
	let cartImage = '/assets/images/others/shopping-cart.png'; // Image for the cart

	// Remove item from wishlist
	const removeItem = (index: number) => {
		// Create a new array without the removed item to trigger reactivity
		data = data.filter((_, i) => i !== index); // Filter out the item at the given index
	};

	// Update item quantity (increment or decrement)
	const updateQuantity = (index: number, amount: number) => {
		// Create a new array where the item qty is updated
		data = data.map((item, i) => {
			if (i === index) {
				// Make sure qty doesn't go below 1
				return { ...item, qty: Math.max(1, item.qty + amount) };
			}
			return item;
		});
	};
</script>

<div>
	<div class="table-box overflow-x-auto">
		<table class="flush table">
			<thead>
				<tr>
					<th>Product</th>
					<th>Price</th>
					<th>Quantity</th>
					<th>Subtotal</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#if data.length === 0}
					<tr>
						<td colspan="5" class="whitespace-nowrap">
							<div class="p-4 text-center">
								<img src={cartImage} alt="" class="mx-auto block size-16" />
								<h6 class="mt-4 mb-1">Your wishlist is waiting for you.</h6>
								<p class="dark:text-dark-500 mb-3 text-gray-500">
									Add items to your wishlist as you browse, and they will magically appear here.
								</p>
								<div class="flex items-center justify-center gap-2">
									<button class="btn btn-primary">Browse our catalog</button>
									<button class="btn btn-outline-purple">Go to your cart</button>
								</div>
							</div>
						</td>
					</tr>
				{:else}
					{#each data as item, index (item.productName)}
						<tr class="*:px-3 *:py-2.5">
							<td class="whitespace-nowrap">
								<div class="flex items-center gap-4">
									<div
										class="dark:bg-dark-850 relative flex size-16 items-center justify-center bg-gray-100 p-2"
									>
										<button
											class="dark:bg-dark-900 dark:shadow-dark-800 absolute -top-1.5 flex size-4 items-center justify-center rounded-full bg-white shadow-lg shadow-gray-200 ltr:-right-1.5 rtl:-left-1.5"
											on:click={() => removeItem(index)}
											aria-label="remove btn"
										>
											<i class="ri-close-line"></i>
										</button>
										<img src={item.image} alt={item.productName} />
									</div>
									<div class="grow">
										<h6 class="mb-1">{item.productName}</h6>
										<p
											class="dark:text-dark-500 dark:divide-dark-800 mb-2 flex items-center gap-2 divide-x divide-gray-200 text-gray-500"
										>
											<span class="px-2 ltr:first:!pl-0 rtl:first:!pr-0">
												{item.color}
											</span>
											<span>{item.size}</span>
										</p>
									</div>
								</div>
							</td>
							<td>{item.price.toFixed(2)}</td>
							<td>
								<div class="input-spin-group input-spin-primary">
									<button
										on:click={() => updateQuantity(index, -1)}
										class="input-spin-minus text-lg"
										aria-label="subtract btn"
									>
										<i class="ri-subtract-line"></i>
									</button>
									<input
										type="text"
										value={item.qty}
										class="input-spin form-input text-center"
										readonly
									/>
									<button
										on:click={() => updateQuantity(index, 1)}
										class="input-spin-plus text-lg"
										aria-label="add btn"
									>
										<i class="ri-add-line"></i>
									</button>
								</div>
							</td>
							<td>{(item.price * item.qty).toFixed(2)}</td>
							<td>
								<a href="/apps-ecommerce-shop-cart" class="btn btn-sub-gray whitespace-nowrap">
									<i class="ri-shopping-cart-line align-bottom"></i> Add to Cart
								</a>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>

	<div class="mt-3 flex flex-wrap items-center justify-between gap-2">
		<a href="/apps-ecommerce-products-grid" class="btn btn-sub-purple">
			<LucideIcon name="MoveLeft" class="inline-block size-5 ltr:mr-1 rtl:ml-1" /> Continue Shopping
		</a>
		<a href="/apps-ecommerce-shop-cart" class="btn btn-primary">Update to Cart</a>
	</div>
</div>
