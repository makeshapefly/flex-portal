<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Category from './Category.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Category List" sub_title="Ecommerce" />
<Grid cols={12} gap={5}>
	<Category />
</Grid>
