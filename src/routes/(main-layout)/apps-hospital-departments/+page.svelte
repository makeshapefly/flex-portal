<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Department from './Department.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Departments" sub_title="Hospital" />
<Grid cols={12} gapX="space">
	<Department />
</Grid>
