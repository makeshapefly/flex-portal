<script lang="ts">
	import InputSpin from '$lib/components/forms/form-input-spin/InputSpin.svelte';
	import SkinCount from '$lib/components/forms/form-input-spin/SkinCount.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
	let count: number = 10;
</script>

<PageHeading title="Input Spin" sub_title="Form" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-3">
				<InputSpin variant="basic" color="primary" />
				<InputSpin variant="basic" color="green" />
				<InputSpin variant="basic" color="red" />
				<InputSpin variant="basic" color="purple" />
				<InputSpin variant="basic" color="orange" />
				<InputSpin variant="basic" color="yellow" />
				<InputSpin variant="basic" color="sky" />
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Solid example</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-3">
				<InputSpin variant="solid" />
				<InputSpin variant="solid" color="purple" />
				<InputSpin variant="solid" color="green" />
				<InputSpin variant="solid" color="orange" />
				<InputSpin variant="solid" color="red" />
				<InputSpin variant="solid" color="yellow" />
				<InputSpin variant="solid" color="sky" />
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Box example</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-3">
				<InputSpin variant="box" />
				<InputSpin variant="box" color="purple" />
				<InputSpin variant="box" color="green" />
				<InputSpin variant="box" color="orange" />
				<InputSpin variant="box" color="red" />
				<InputSpin variant="box" color="yellow" />
				<InputSpin variant="box" color="sky" />
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Box example</CardTitle>
		</CardHeader>
		<CardBody>
			<SkinCount />
		</CardBody>
	</Col>
</Grid>
