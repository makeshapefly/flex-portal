<script>
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	// Chart options data
	import { options as basicLine } from './basic-line';
	import { options as lineLabel } from './line-label';
	import { options as zoomable } from './zoomable';
	import { options as stepline } from './stepline';
	import { options as gradient } from './gradient';
	import { options as dashLine } from './dash-line';
</script>

<PageHeading title="Line Charts" sub_title="Apexcharts" />
<Grid cols={12} gapX="space">
	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" colors={['bg-primary-500']} options={basicLine} />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Line with Data Labels</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-gray-300']}
				options={lineLabel}
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Zoomable Timeseries</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" colors={['bg-sky-500']} options={zoomable} />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Stepline</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" colors={['bg-green-500']} options={stepline} />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Gradient</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-orange-500', 'bg-primary-500']}
				options={gradient}
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Dashed</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-gray-200']}
				options={dashLine}
			/>
		</CardBody>
	</Col>
</Grid>
