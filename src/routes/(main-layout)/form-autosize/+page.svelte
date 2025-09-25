<script>
	import AutoSize from '$lib/components/forms/form-autosize/AutoSize.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Autosize" sub_title="Forms" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Autosize Textarea</CardTitle>
		</CardHeader>
		<CardBody>
			<AutoSize />
		</CardBody>
	</Col>
</Grid>
