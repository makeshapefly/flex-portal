<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import DashboardProject from './DashboardProject.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Projects" sub_title="Dashboards" />
<Grid cols={12} gapX="space">
	<DashboardProject />
</Grid>
