<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Breadcrumb from '$lib/components/ui/bredcrumb/Breadcrumb.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Breadcrumb" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<h6 class="card-title">Base Example</h6>
		</CardHeader>
		<CardBody>
			<Breadcrumb />
			<Breadcrumb varient="icon" />
		</CardBody>
	</Col><!--end col-->

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Arrow Example</CardTitle>
		</CardHeader>
		<CardBody>
			<Breadcrumb varient="arrow" />
			<Breadcrumb varient="arrow-icon" />
		</CardBody>
	</Col><!--end col-->

	<div class="card col-span-12 md:col-span-6">
		<div class="card-header">
			<h6 class="card-title">Line Example</h6>
		</div>
		<div class="card-body">
			<Breadcrumb varient="line" />
			<Breadcrumb varient="line-icon" />
		</div>
	</div>
	<!--end col-->
</Grid>
