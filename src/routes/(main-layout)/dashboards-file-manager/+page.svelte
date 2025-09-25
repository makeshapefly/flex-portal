<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import DashboardFile from './DashboardFile.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="File Manager" sub_title="Dashboards" />
<Grid cols={12} gapX="space">
	<DashboardFile />
</Grid>
