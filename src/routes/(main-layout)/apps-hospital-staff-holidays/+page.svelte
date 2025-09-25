<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import StaffHolidays from './StaffHolidays.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Holidays" sub_title="Staff" />
<Grid cols={12} gapX="space">
	<StaffHolidays />
</Grid>
