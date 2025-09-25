<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import StaffList from './StaffList.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="List View" sub_title="Staff" />
<Grid cols={12} gapX="space">
	<StaffList />
</Grid>
