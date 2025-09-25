<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import DashboardSchool from './DashboardSchool.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="School" sub_title="Dashboards" />
<Grid cols={12} gapX="space">
	<DashboardSchool />
</Grid>
