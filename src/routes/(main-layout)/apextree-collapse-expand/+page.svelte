<script>
	import ApexTree from '$lib/components/common/ApexTree.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	// Tree options data
	import {
		options as collapseExpandOption,
		data as collapseExpandData
	} from './collapse-expand-tree';
</script>

<PageHeading title="Collapse Expand" sub_title="Apextree" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Collapse Expand</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="dark:border-dark-800 rounded-md border border-gray-200">
				<ApexTree
					colors={[
						'bg-gray-200',
						'bg-gray-500',
						'bg-primary-100',
						'bg-purple-100',
						'bg-yellow-100',
						'bg-gray-100',
						'bg-orange-100',
						'bg-green-100',
						'bg-pink-100',
						'bg-indigo-100'
					]}
					darkColors={[
						'bg-dark-800',
						'bg-dark-500',
						'bg-primary-500',
						'bg-purple-500',
						'bg-yellow-500',
						'bg-dark-850',
						'bg-orange-500',
						'bg-green-500',
						'bg-pink-500',
						'bg-indigo-500'
					]}
					options={collapseExpandOption}
					data={collapseExpandData}
				/>
			</div>
		</CardBody>
	</Col>
</Grid>
