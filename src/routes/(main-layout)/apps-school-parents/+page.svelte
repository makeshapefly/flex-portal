<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Parents from './Parents.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="List View" sub_title="Parents" />
<Grid cols={12} gapX="space">
	<Parents />
</Grid>
