<script>
	import ApexTree from '$lib/components/common/ApexTree.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	// Tree options data
	import { options as topBottomOption, data as topBottomData } from './top-bottom-tree';
</script>

<PageHeading title="Top to Bottom" sub_title="Apextree" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Top to Bottom</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="dark:border-dark-800 rounded-md border border-gray-200">
				<ApexTree
					colors={[
						'bg-gray-200',
						'bg-white',
						'bg-primary-500',
						'bg-purple-500',
						'bg-yellow-500',
						'bg-gray-800',
						'bg-orange-500',
						'bg-green-500',
						'bg-pink-500'
					]}
					darkColors={[
						'bg-dark-800',
						'bg-white',
						'bg-primary-500',
						'bg-purple-500',
						'bg-yellow-500',
						'bg-dark-800',
						'bg-orange-500',
						'bg-green-500',
						'bg-pink-500'
					]}
					options={topBottomOption}
					data={topBottomData}
				/>
			</div>
		</CardBody>
	</Col>
</Grid>
