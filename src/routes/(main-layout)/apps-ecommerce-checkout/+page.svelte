<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Checkout from './Checkout.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Checkout" sub_title="Ecommerce" />
<Grid cols={12} gap="space">
	<Checkout />
</Grid>
