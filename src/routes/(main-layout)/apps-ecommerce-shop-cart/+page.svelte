<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import ShopCart from './ShopCart.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Shop Cart" sub_title="Ecommerce" />
<Grid cols={12} gap={5}>
	<ShopCart />
</Grid>
