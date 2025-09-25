<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import StudentList from './StudentList.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="List View" sub_title="Students" />
<Grid cols={12} gapX="space">
	<StudentList />
</Grid>
