<script>
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	// Chart options data
	import { options as basicBox } from './basic-box';
	import { options as scatterPlot } from './scatter-plot';
	import { options as horizontalBox } from './horizontal-box';
</script>

<PageHeading title="Box-whisker Charts" sub_title="Apexcharts" />
<Grid cols={12} gapX="space">
	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" options={basicBox} />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Boxplot-Scatter</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" options={scatterPlot} />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Horizontal BoxPlot</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" options={horizontalBox} />
		</CardBody>
	</Col>
</Grid>
