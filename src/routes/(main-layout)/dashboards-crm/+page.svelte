<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import DashboardCrm from './DashboardCrm.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="CRM" sub_title="Dashboards" />
<Grid cols={12} gapX="space">
	<DashboardCrm />
</Grid>
