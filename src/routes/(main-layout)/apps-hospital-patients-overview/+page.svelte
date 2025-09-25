<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PatientsOverview from './PatientsOverview.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Overview" sub_title="Patients" />
<Grid cols={12} gapX="space">
	<PatientsOverview />
</Grid>
