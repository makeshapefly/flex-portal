<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Echart from '$lib/components/common/Echart.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
	import {
		basicLineChartConfig,
		smoothLineChartConfig,
		stackedLineChartConfig,
		categoryLineChartConfig,
		stepLineChartConfig,
		styleLineChartConfig
	} from './echart-line-data';
</script>

<PageHeading title="Line Charts" sub_title="Echarts" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={basicLineChartConfig} class="h-80 w-full" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Smooth Line</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={smoothLineChartConfig} class="h-80 w-full" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Smooth Line</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={stackedLineChartConfig} class="h-80 w-full" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Line Y Category</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={categoryLineChartConfig} class="h-80 w-full" />
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Step Line</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={stepLineChartConfig} class="h-80 w-full" />
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Style Line</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={styleLineChartConfig} class="h-80 w-full" />
		</CardBody>
	</Col>
</Grid>
<div class="mb-5 text-center">
	<a
		href="https://echarts.apache.org/examples/en/index.html#chart-type-line"
		target="_blank"
		class="btn btn-primary"
		>More Example<LucideIcon name="MoveRight" class="ml-1 inline-block size-4" /></a
	>
</div>
