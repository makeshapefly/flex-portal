<script lang="ts">
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Ecommerce from './Ecommerce.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Ecommerce" sub_title="Dashboards" />
<Grid cols={12} gapX="space">
	<Ecommerce />
</Grid>
