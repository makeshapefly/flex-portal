<script>
	import { layoutStore } from '$lib/stores/layout';
	import ApexsAnkey from '$lib/components/common/ApexsAnkey.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	// Tree options data
	import { options as basicApexankeyOption, data as basicApexankeyData } from './basic-apexsankey';
	import { options as nodeApexankeyOption, data as nodeApexankeyData } from './node-apexsankey';
	import { options as edgeApexankeyOption, data as edgeApexankeyData } from './edge-apexsankey';
	import { options as fontApexankeyOption, data as fontApexankeyData } from './font-apexsankey';

</script>

<PageHeading title="ApexSankey" sub_title="Charts" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexsAnkey
				colors={['bg-gray-800', 'bg-white', 'bg-gray-200']}
				darkColors={['bg-dark-100', 'bg-dark-900', 'bg-dark-800']}
				options={basicApexankeyOption}
				data={basicApexankeyData}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Node Customization</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexsAnkey
				colors={['bg-gray-800', 'bg-white', 'bg-gray-200']}
				darkColors={['bg-dark-100', 'bg-dark-900', 'bg-dark-800']}
				options={nodeApexankeyOption}
				data={nodeApexankeyData}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Edge Customization</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexsAnkey
				colors={['bg-gray-800', 'bg-white', 'bg-gray-200']}
				darkColors={['bg-dark-100', 'bg-dark-900', 'bg-dark-800']}
				options={edgeApexankeyOption}
				data={edgeApexankeyData}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Font Options</CardTitle>
		</CardHeader>
		<CardBody>
			<ApexsAnkey
				colors={['bg-gray-800', 'bg-white', 'bg-gray-200']}
				darkColors={['bg-dark-100', 'bg-dark-900', 'bg-dark-800']}
				options={fontApexankeyOption}
				data={fontApexankeyData}
			/>
		</CardBody>
	</Col>
</Grid>
