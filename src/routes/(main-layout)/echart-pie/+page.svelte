<script lang="ts">
	import Echart from '$lib/components/common/Echart.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
	import {
		basicPieChartConfig,
		doughnutRoundedPieChartConfig,
		doughnutPieChartConfig,
		halfDouglasNutChartConfig
	} from './pia-chart-data';
</script>

<PageHeading title="Pie Charts" sub_title="Echarts" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={basicPieChartConfig} class="h-80 w-full" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Doughnut Chart with Rounded Corner</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={doughnutRoundedPieChartConfig} class="h-80 w-full" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Doughnut Chart</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={doughnutPieChartConfig} class="h-80 w-full" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Doughnut Chart</CardTitle>
		</CardHeader>
		<CardBody>
			<Echart config={halfDouglasNutChartConfig} class="h-80 w-full" />
		</CardBody>
	</Col>
</Grid>
<div class="mb-5 text-center">
	<a
		href="https://echarts.apache.org/examples/en/index.html#chart-type-pie"
		target="_blank"
		class="btn btn-primary"
		>More Example <LucideIcon name="MoveRight" class="ml-1 inline-block size-4" /></a
	>
</div>
