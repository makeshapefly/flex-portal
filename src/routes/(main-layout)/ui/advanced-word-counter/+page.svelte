<script>
	import Counter from '$lib/components/ui/advanced-word-counter/Counter.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Word Counter" sub_title="UI Advanced" />
<Grid col={12} gapx="space">
	<Col col={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Simple word counter</CardTitle>
		</CardHeader>
		<CardBody>
			<Counter />
		</CardBody>
	</Col>
</Grid>
