<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
  import { shopCartData } from '../../../routes/(main-layout)/apps-ecommerce-shop-cart/shop-cart';
  import { derived, writable } from 'svelte/store';
  import ModalFooter from '$lib/components/ui/modal/ModalFooter.svelte';
  import TopbarCartModal from '../ui/modal/TopbarCartModal.svelte';

  const incrementQuantity = (id: number) => {
    shopCartData.update((items) => {
      return items.map((item) => (item.id === id ? { ...item, count: item.count + 1 } : item));
    });
  };

  const decrementQuantity = (id: number) => {
    shopCartData.update((items) => {
      return items.map((item) =>
        item.id === id && item.count > 1 ? { ...item, count: item.count - 1 } : item
      );
    });
  };

  const removeItem = (id: number) => {
    shopCartData.update((items) => items.filter((item) => item.id !== id));
  };

  // Calculate subtotal
  const subTotal = derived(shopCartData, ($cartItems) => {
    return Number($cartItems.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2));
  });

  // Calculate VAT amount
  const vatAmount = derived(subTotal, ($subTotal) => {
    return Number(($subTotal * 0.06).toFixed(2)); // Ensures VAT is formatted correctly
  });

  // Discount (default to 0, change logic as needed)
  const discount = writable(0);

  // Fixed shipping charge
  const shippingCharge = writable(35);

  // Total amount calculation
  const totalAmount = derived(
    [subTotal, vatAmount, discount, shippingCharge],
    ([$subTotal, $vatAmount, $discount, $shippingCharge]) => {
      return Number(($subTotal + $vatAmount - $discount + $shippingCharge).toFixed(2));
    }
  );
</script>

<TopbarCartModal
  modalId="shopping-cart-list"
  let:modalId
  modalClass="drawer drawer-lg ltr:right-0 rtl:left-0 "
>
  <ModalHeader {modalId}>
    <h6>My Cart (3)</h6>
  </ModalHeader>

  <div class="drawer-content">
    {#each $shopCartData as product}
      <div class="py-3 border-b border-gray-200 dark:border-dark-800 last:border-none first:pt-0">
        <div class="flex gap-3">
          <div class="bg-gray-100 rounded-md dark:bg-dark-850 size-16 shrink-0">
            <img src={product.image} alt={product.name} />
          </div>
          <div class="grow">
            <h6 class="mb-2 text-14">
              <a href="#!">{product.name}</a>
            </h6>
            <p>
              <span
                class={`badge  ltr:mr-2 rtl:ml-2 ${product.inStock ? 'badge-green' : 'badge-red'}`}
                >{product.inStock ? 'In Stock' : 'Out of Stock'}</span
              >
              -
              <span
                class="inline-block size-3 ltr:ml-2 rtl:mr-2"
                style={`background-color: ${product.colors[0]}`}
              ></span>
              <span class="capitalize align-baseline">{product.colors[0]}</span>
            </p>
            <div class="flex gap-3 *:flex *:items-center items-center mt-5">
              <a
                href="#!"
                class="shrink-0 link link-red text-14"
                on:click={() => removeItem(product.id)}
              >
                <LucideIcon name="Trash2" class="inline-block size-4 me-1"></LucideIcon> Remove
              </a>
              <a href="#!" class="shrink-0 link link-primary text-14">
                <LucideIcon name="Heart" class="inline-block size-4 me-1"></LucideIcon> Wishlist
              </a>
            </div>
          </div>
          <div class="flex flex-col shrink-0">
            <h6>${product.price.toFixed(2)}</h6>
            <div class="mt-auto">
              <div
                class="flex items-center w-16 p-1 text-center border border-gray-200 rounded-md dark:border-dark-800"
              >
                <div class="flex flex-col">
                  <button
                    class="flex items-center justify-center text-gray-500 transition duration-200 ease-linear dark:text-dark-500 plus hover:text-primary-500 dark:hover:text-primary-500"
                    on:click={() => incrementQuantity(product.id)}
                  >
                    <LucideIcon class="size-3" name="ChevronUp"></LucideIcon>
                  </button>
                  <button
                    class="flex items-center justify-center text-gray-500 transition duration-200 ease-linear dark:text-dark-500 minus hover:text-primary-500 dark:hover:text-primary-500"
                    on:click={() => decrementQuantity(product.id)}
                  >
                    <LucideIcon class="size-3" name="ChevronDown"></LucideIcon>
                  </button>
                </div>
                <input
                  type="text"
                  class="h-5 p-0 text-center border-0 rounded-none form-input"
                  readonly
                  value={product.count}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
  <ModalFooter class="p-0">
    <div class="flex-col p-0 border-none drawer-footer">
      <div class="w-full p-5 pb-3 border-t border-gray-200 dark:border-dark-800">
        <div class="-mx-5">
          <table class="w-full flush text-start">
            <tbody>
              <tr class="*:py-2 *:px-5">
                <td>Sub Amount</td>
                <td>$<span>{$subTotal}</span></td>
              </tr>
              <tr class="*:py-2 *:px-5">
                <td>Vat Amount (6%)</td>
                <td>$<span>{$vatAmount}</span></td>
              </tr>
              <tr class="*:py-2 *:px-5">
                <td>Discount (10%)</td>
                <td>-$<span>{$discount}</span></td>
              </tr>
              <tr class="*:py-2 *:px-5">
                <td>Shipping Charge</td>
                <td>$<span>{$shippingCharge}</span></td>
              </tr>
              <tr class="border-t border-gray-200 dark:border-dark-800 *:pt-3 *:px-5">
                <th class="text-start">Total Amount</th>
                <td>$<span>{$totalAmount}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="flex items-center justify-end gap-2 p-5 border-t border-gray-200 dark:border-dark-800"
      >
        <a href="apps-ecommerce-products-list" class="btn btn-sub-indigo btn-icon-text">
          <LucideIcon name="ShoppingBag" class="size-4"></LucideIcon> Continue Shopping
        </a>
        <a href="apps-ecommerce-checkout" class="btn btn-primary btn-icon-text">
          <LucideIcon name="Rotate3D" class="size-4"></LucideIcon> Checkout
        </a>
      </div>
    </div>
  </ModalFooter>
</TopbarCartModal>
