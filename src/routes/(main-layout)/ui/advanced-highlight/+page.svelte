<script>
	import Highlight from '$lib/components/ui/advanced-highlight/Highlight.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Highlight Code" sub_title="UI Advanced" />
<Grid col={12} gapX="space">
	<Col col={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>HTML Highlight Code</CardTitle>
		</CardHeader>
		<CardBody>
			<Highlight />
		</CardBody>
	</Col>
</Grid>
