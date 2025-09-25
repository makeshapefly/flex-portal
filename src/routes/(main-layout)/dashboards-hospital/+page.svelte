<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import DashboardHospital from './DashboardHospital.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Hospital" sub_title="Dashboards" />
<Grid cols={12} gapX="space">
	<DashboardHospital />
</Grid>
