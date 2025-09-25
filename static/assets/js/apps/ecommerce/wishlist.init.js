import wishlistProducts from "../../../json/apps/ecommerce/wishlist-products";

function wishlist() {
    return {
        data: wishlistProducts,
    }
}
document.addEventListener('alpine:init', () => {
    Alpine.data('wishlist', wishlist);
})