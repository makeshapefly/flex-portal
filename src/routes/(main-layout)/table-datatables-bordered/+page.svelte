<script>
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import BorderdTable from './BorderdTable.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Bordered" sub_title="Datatables" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Bordered</CardTitle>
		</CardHeader>
		<CardBody>
			<BorderdTable />
		</CardBody>
	</Col>
</Grid>
