<script>
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	// Chart options data
	import { options as basicRange } from './basic-range';
	import { options as comboRange } from './combo-range';
</script>

<PageHeading title="Range Area Charts" sub_title="Apexcharts" />
<Grid cols={12} gapX="space">
	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" colors={['bg-primary-500']} options={basicRange} />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Combo</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" colors={['bg-sky-500', 'bg-red-500']} options={comboRange} />
		</CardBody>
	</Col>
</Grid>
