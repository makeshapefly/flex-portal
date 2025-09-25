<script>
	// @ts-nocheck

	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	// Chart options data
	import { options as simplePie } from './simple-pie';
	import { options as simpleDonut } from './simple-donut';
	import { options as donutUpdate } from './donut-update';
	import { options as monochromePie } from './monochrome-pie';
	import { options as gradientDonut } from './gradient-donut';
	import { options as semiDonut } from './semi-donut';
	import { options as donutPattern } from './donut-pattern';
</script>

<PageHeading title="Pie/Donuts Charts" sub_title="Apexcharts" />
<Grid cols={12} gapX="space">
	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Simple Pie</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500']}
				options={simplePie}
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Simple Donut</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500']}
				options={simpleDonut}
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Donut Update</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500']}
				options={donutUpdate}
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Monochrome Pie</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-primary-400', 'bg-primary-300', 'bg-primary-600']}
				options={monochromePie}
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Gradient Donut</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500']}
				options={gradientDonut}
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Semi Donut</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500']}
				options={semiDonut}
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Donut with Pattern</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500']}
				options={donutPattern}
			/>
		</CardBody>
	</Col>
</Grid>
