<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Echart from '$lib/components/common/Echart.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
	import {
		basicBarChartConfig,
		barChartConfig,
		backgroundBarChartConfig,
		singleBarAppConfig,
		worldPopulationBarConfig,
		stackedBorderRadiusBarConfig
	} from './echart-bar-data';
</script>

<PageHeading title="Bar Charts" sub_title="Echarts" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={basicBarChartConfig} class="h-80 w-full" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Axis Align with Tick</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={barChartConfig} class="h-80 w-full" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Bar with Background</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={backgroundBarChartConfig} class="h-80 w-full" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Set Style of Single Bar</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={singleBarAppConfig} class="h-80 w-full" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>World Population</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={worldPopulationBarConfig} class="h-80 w-full" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Stacked Bar with borderRadius</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={stackedBorderRadiusBarConfig} class="h-80 w-full" />
		</CardBody>
	</Col>
</Grid>
<div class="mb-5 text-center">
	<a
		href="https://echarts.apache.org/examples/en/index.html#chart-type-bar"
		target="_blank"
		class="btn btn-primary"
		>More Example <LucideIcon name="MoveRight" class="ml-1 inline-block size-4" /></a
	>
</div>
