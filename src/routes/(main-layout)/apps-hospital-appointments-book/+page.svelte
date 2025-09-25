<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import BookAppointments from './BookAppointments.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Book" sub_title="Appointments" />
<Grid cols={12} gapX="space">
	<BookAppointments />
</Grid>
