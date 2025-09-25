<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import ProductOverview from './ProductOverview.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Product Overview" sub_title="Ecommerce" />
<Grid cols={12} gap={5}>
	<ProductOverview />
</Grid>
