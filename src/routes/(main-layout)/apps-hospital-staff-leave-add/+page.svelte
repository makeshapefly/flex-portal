<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import AddLeave from './AddLeave.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Add Leave" sub_title="Staff" />
<Grid cols={12} gapX="space">
	<AddLeave />
</Grid>
