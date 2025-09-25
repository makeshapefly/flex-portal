<script>
	import FormEditor from '$lib/components/forms/form-editors/FormEditor.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Editors" sub_title="Forms & Tables" />
<Grid cols={12}>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Snow Theme Editors</CardTitle>
		</CardHeader>
		<CardBody>
			<FormEditor />
		</CardBody>
	</Col>
</Grid>
