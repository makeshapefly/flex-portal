<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import EventOverview from './EventOverview.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Overview" sub_title="Events" />
<Grid cols={12} gapX={5}>
	<EventOverview />
</Grid>
