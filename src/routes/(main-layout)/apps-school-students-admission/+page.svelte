<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Admission from './Admission.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Admission Form" sub_title="Templates" />
<Grid cols={12} gapX="space">
	<Admission />
</Grid>
