<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Attendance from './Attendance.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Attendance" sub_title="Staff" />
<Grid cols={12} gapX="space">
	<Attendance />
</Grid>
