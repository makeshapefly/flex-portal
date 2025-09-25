<script>
	import SimplebarItem from '$lib/components/ui/advanced-simplebar/SimplebarItem.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Simplebar" sub_title="UI Advanced" />
<Grid cols={12} gapX="space">
	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Default Simplebar</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="-mx-space px-space h-64" data-simplebar>
				<SimplebarItem />
			</div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Primary Simplebar</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="-mx-space px-space h-64" data-simplebar data-simplebar-scroll="primary">
				<SimplebarItem />
			</div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Green Simplebar</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="-mx-space px-space h-64" data-simplebar data-simplebar-scroll="green">
				<SimplebarItem />
			</div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Purple Simplebar</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="-mx-space px-space h-64" data-simplebar data-simplebar-scroll="purple">
				<SimplebarItem />
			</div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Yellow Simplebar</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="-mx-space px-space h-64" data-simplebar data-simplebar-scroll="yellow">
				<SimplebarItem />
			</div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Red Simplebar</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="-mx-space px-space h-64" data-simplebar data-simplebar-scroll="red">
				<SimplebarItem />
			</div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Sky Simplebar</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="-mx-space px-space h-64" data-simplebar data-simplebar-scroll="sky">
				<SimplebarItem />
			</div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Pink Simplebar</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="-mx-space px-space h-64" data-simplebar data-simplebar-scroll="pink">
				<SimplebarItem />
			</div>
		</CardBody>
	</Col>
</Grid>
