<script>
	// @ts-nocheck
	import Select from '$lib/components/forms/form-select/Select.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	let selectInstance;
	let options = Array.from({ length: 1000 }, (_, index) => ({
		label: `Option ${index + 1}`,
		value: index + 1
	}));

	let selectedValue = null;

	const handleChange = (value) => {
		selectedValue = value;
	};
</script>

<PageHeading title="Select" sub_title="Forms" />
<svelte:head>
	<script
		src="https://cdn.jsdelivr.net/npm/virtual-select-plugin/dist/virtual-select.min.js"
	></script>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/virtual-select-plugin/dist/virtual-select.min.css"
	/>
	<!-- <link rel="stylesheet" href="https://sa-si-dev.github.io/virtual-select/assets/external/flags.css">   -->
</svelte:head>

<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Default Select</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="sampleSelect" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>With search box</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="searchBoxSelect" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Multiple Select</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="multipleSelect" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Multiple Select without Search</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="multipleWithoutSearchSelect" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Disabled options</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="disabledOptionSelect" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Option Group</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="optionGroupSelect" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Preselect value</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="preselectValue" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Preselect multiple value</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="preselectMultipleValue" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Hide Clear Button</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="hideClearButton" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Custom width for dropbox</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="customWidthDropbox" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Allow to add new option</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="allowNewOption" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Mark matched term in label</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="markMatchedLabel" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Showing selected options first</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="showingSelectedOption" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Using alias for searching</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="aliasForSearching" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Maximum Values</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="maximumValues" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Label with description</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="labelDescription" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Show options only on search</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="showOptionOnlySearch" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Initialize from native select element (not recommended)</CardTitle>
		</CardHeader>
		<CardBody>
			<!-- <Select configKey="select"></Select> -->
			<select
				name="native-select"
				placeholder="Native Select"
				data-search="false"
				data-silent-initial-value-set="true"
			>
				<option value="1" disabled>Option 1</option>
				<option value="2">Option 2</option>
				<option value="3" selected>Option 3</option>
				<option value="4" selected>Option 4</option>
				<option value="5">Option 5</option>
				<option value="6">Option 6</option>
			</select>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Image/Icon</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="sampleImage" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Popup with Multi Select</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="popupMultiSelect" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Popup with Single Select</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="popupSingleSelect" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Show values as tags</CardTitle>
		</CardHeader>
		<CardBody>
			<Select bind:this={selectInstance} configKey="valueTag" />
		</CardBody>
	</Col>
</Grid>
