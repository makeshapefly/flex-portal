<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import StudentsOverview from './StudentsOverview.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Overview" sub_title="Students" />
<Grid cols={12} gapX="space">
	<StudentsOverview />
</Grid>
