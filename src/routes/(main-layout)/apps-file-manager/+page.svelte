<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import FileManager from './FileManager.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="File Manager" sub_title="Apps" />
<Grid cols={12} gapX="space">
	<FileManager />
</Grid>
