<script lang="ts">
	import { writable } from 'svelte/store';

	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	// Chart options data
	import { options as basicArea } from './basic-area';
	import { options as splineArea } from './spline-area';
	import { options as negativeArea } from './negative-area';
	import { options as stackedArea } from './stacked-area';
	import { options as missingValueArea } from './missing-value';

	$: basicArea;
</script>

<PageHeading title="Area Charts" sub_title="Apexcharts" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" colors={['bg-primary-500']} options={basicArea} />
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Spline Area</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" colors={['bg-sky-500', 'bg-green-500']} options={splineArea} />
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Negative</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-gray-300']}
				darkColors={['bg-primary-500', 'bg-dark-700']}
				options={negativeArea}
			/>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Negative</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-gray-200']}
				darkColors={['bg-primary-500', 'bg-green-500', 'bg-dark-700']}
				options={stackedArea}
			/>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Missing / Null values</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" colors={['bg-primary-500']} options={missingValueArea} />
		</CardBody>
	</Col>
</Grid>
