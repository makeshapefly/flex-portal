<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import DashboardEmail from './DashboardEmail.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Email" sub_title="Dashboards" />
<Grid cols={12} gapX="space">
	<DashboardEmail />
</Grid>
