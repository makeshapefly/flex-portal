<script>
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	// Chart options data
	import { options as basicHeatmap } from './basic-heatmap';
	import { options as multiColor } from './multi-color';
	import { options as flipped } from './flipped';
	import { options as rounded } from './rounded';
</script>

<PageHeading title="Heatmap Charts" sub_title="Apexcharts" />
<Grid cols={12} gapX="space">
	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" colors={['bg-primary-500']} options={basicHeatmap} />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Multiple Colors</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				colors={[
					'bg-primary-500',
					'bg-green-500',
					'bg-pink-500',
					'bg-sky-500',
					'bg-indigo-500',
					'bg-purple-500',
					'bg-orange-500',
					'bg-yellow-500'
				]}
				class="!min-h-full"
				options={multiColor}
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Multiple Colors Flipped</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				colors={[
					'bg-primary-500',
					'bg-green-500',
					'bg-pink-500',
					'bg-sky-500',
					'bg-indigo-500',
					'bg-purple-500',
					'bg-orange-500',
					'bg-yellow-500'
				]}
				class="!min-h-full"
				options={flipped}
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Rounded</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				colors={['bg-primary-500', ' bg-green-500']}
				class="!min-h-full"
				options={rounded}
			/>
		</CardBody>
	</Col>
</Grid>
