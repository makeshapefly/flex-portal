<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Payment from './Payment.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Payment" sub_title="Ecommerce" />
<Grid cols={12} gapX={5}>
	<Payment />
</Grid>
