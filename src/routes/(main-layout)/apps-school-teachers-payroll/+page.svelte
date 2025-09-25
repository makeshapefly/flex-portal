<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import TeacherPayroll from './TeacherPayroll.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Payroll" sub_title="Teachers" />
<Grid cols={12} gapX="space">
	<TeacherPayroll />
</Grid>
