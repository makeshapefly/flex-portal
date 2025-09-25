<script lang="ts">
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import ProjectHead from '$lib/components/common/ProjectHead.svelte';
	import { options as working } from './working';
	import { options as task } from './task';
</script>

<ProjectHead variant="overview" />

<Grid cols-={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Project Overview</CardTitle>
		</CardHeader>
		<CardBody>
			<p class="dark:text-dark-500 mb-3 text-gray-500">
				The goal of this project is to develop an advanced AI model capable of predictive analytics
				within the e-commerce domain. This model will leverage machine learning techniques to
				analyze customer behavior, forecast sales trends, and optimize marketing strategies,
				ultimately enhancing the overall customer experience and boosting revenue for e-commerce
				platforms.
			</p>
			<h6 class="mb-2">Objectives:</h6>
			<ul class="list-circle mb-5 list-inside space-y-2">
				<li>Customer Behavior Analysis</li>
				<li>Sales Forecasting</li>
				<li>Marketing Optimization</li>
				<li>Personalized Recommendations</li>
				<li>Performance Monitoring and Evaluation</li>
			</ul>

			<h6 class="mb-2">Deliverables:</h6>
			<ul class="list-circle list-inside space-y-2">
				<li>Data Requirements Document</li>
				<li>Data Extraction Scripts</li>
				<li>Cleaned and Transformed Datasets</li>
				<li>Data Quality Report</li>
				<li>Data Storage Setup</li>
			</ul>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} md={{ span: 6 }} lg={{ span: 8 }} class="card">
		<CardHeader>
			<CardTitle>Working Hours</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="-ml-space" dir="ltr">
				<ApexChart
					class="!min-h-full"
					options={working}
					colors={['bg-purple-500', 'bg-primary-500']}
				/>
			</div>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Task Activities</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="-ml-space" dir="ltr">
				<ApexChart class="!min-h-full" options={task} colors={['bg-primary-500']} />
			</div>
		</CardBody>
	</Col>
</Grid>
