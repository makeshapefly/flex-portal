<script>
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import FontWeight from '$lib/components/ui/typography/FontWeight.svelte';
	import HeadingTitle from '$lib/components/ui/typography/HeadingTitle.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Typography" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Font Family</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="gap-space grid lg:grid-cols-6">
				<div>
					<h6 class="font-body mb-2">Base Font Family</h6>
					<code class="text-pink-500">.font-body</code>
				</div>
				<div>
					<h6 class="font-heading mb-2">Heading Font Family</h6>
					<code class="text-pink-500">.font-heading</code>
				</div>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Heading Title</CardTitle>
		</CardHeader>
		<CardBody class="space-y-4">
			<HeadingTitle variant="h1" />
			<HeadingTitle variant="h2" />
			<HeadingTitle variant="h3" />
			<HeadingTitle variant="h4" />
			<HeadingTitle variant="h5" />
			<HeadingTitle variant="h6" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Font Weight</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="gap-space grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				<FontWeight variant="font-thin" />
				<FontWeight variant="font-extralight" />
				<FontWeight variant="font-light" />
				<FontWeight variant="font-normal" />
				<FontWeight variant="font-medium" />
				<FontWeight variant="font-semibold" />
				<FontWeight variant="font-bold" />
				<FontWeight variant="font-extrabold" />
				<FontWeight variant="font-black" />
			</div>
		</CardBody>
	</Col>
</Grid>
