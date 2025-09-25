<script>
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	// Chart options data
	import { options as simpleBubble } from './simple-bubble';
	import { options as threedBubble } from './threed-bubble';
</script>

<PageHeading title="Bubble Charts" sub_title="Apexcharts" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Simple</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500']}
				options={simpleBubble}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>3D Bubble</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500']}
				options={threedBubble}
			/>
		</CardBody>
	</Col>
</Grid>
