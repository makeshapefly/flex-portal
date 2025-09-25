<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import TeacherOverView from './TeacherOverView.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Overview" sub_title="Teachers" />
<Grid cols={12} gapX="space">
	<TeacherOverView />
</Grid>
