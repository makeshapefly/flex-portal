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
	import { options as lineData } from './line-data';
	import { options as stackColumn } from './stack-column';
	import { options as stackColumnHundred } from './stack-column-hundred';
	import { options as groupColumn } from './group-column';
	import { options as dumbbel } from './dumbbel';
	import { options as columnMarker } from './column-marker';
	import { options as columnGroupLabel } from './column-group-label';
	import { options as columnRotateLabel } from './column-rotate-label';
	import { options as columnNegativeValue } from './column-negative-value';
	import { options as distributedColumn } from './distributed-column';
</script>

<PageHeading title="Column Charts" sub_title="Apexcharts" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-yellow-500']}
				options={basicLine}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Column with Data Labels</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" colors={['bg-primary-500']} options={lineData} />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Stacked Columns</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500']}
				options={stackColumn}
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Stacked Columns 100</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500']}
				options={stackColumnHundred}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Grouped Stacked Columns</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-primary-800', 'bg-green-800']}
				darkColors={['bg-primary-500', 'bg-green-500', 'bg-primary-800', 'bg-green-800']}
				options={groupColumn}
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Dumbbell Chart</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" colors={['bg-primary-500', 'bg-pink-500']} options={dumbbel} />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Column with marker</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" colors={['bg-primary-500']} options={columnMarker} />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Column with Group Label</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" colors={['bg-primary-500']} options={columnGroupLabel} />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Column with Rotated Label</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart class="!min-h-full" colors={['bg-primary-500']} options={columnRotateLabel} />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Column with Negative value</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-yellow-500', 'bg-red-500']}
				options={columnNegativeValue}
			/>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Distributed Columns</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={[
					'bg-primary-500',
					'bg-pink-500',
					'bg-sky-500',
					'bg-green-300',
					'bg-yellow-500',
					'bg-purple-500',
					'bg-red-500',
					'bg-sky-500'
				]}
				options={distributedColumn}
			/>
		</CardBody>
	</Col>
</Grid>
