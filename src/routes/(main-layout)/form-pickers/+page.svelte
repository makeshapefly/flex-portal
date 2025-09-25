<script lang="ts">
	import { onMount } from 'svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import flatpickr from 'flatpickr';

	
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	let flatpickrExamples: NodeListOf<HTMLElement>; // Specify HTMLElement instead of Element for better type safety

	// Initialization function for flatpickr
	function initFlatpickr() {
		flatpickrExamples = document.querySelectorAll('[data-provider]') as NodeListOf<HTMLElement>; // Type assertion to HTMLElement
		flatpickrExamples.forEach((item) => {
			const provider = item.getAttribute('data-provider');

			if (provider === 'flatpickr') configureFlatpickr(item);
			else if (provider === 'timepickr') configureTimePicker(item);
			else return; // Early return if provider is not supported
		});
	}

	// Configuration for flatpickr
	function configureFlatpickr(item: HTMLElement) {
		const dateData = getDatePickerOptions(item);
		flatpickr(item, dateData);
	}

	// Configuration for timepickr
	function configureTimePicker(item: HTMLElement) {
		const timeData = getTimepickerOptions(item);
		setTimeout(() => {
			flatpickr(item, timeData);
		}, 750);
	}

	// Get the datepicker options from attributes
	function getDatePickerOptions(item: HTMLElement) {
		const attributes = item.attributes; // NamedNodeMap
		const dateData: Record<string, any> = {};

		dateData.dateFormat = attributes.getNamedItem('data-date-format')?.value || '';
		if (attributes.getNamedItem('data-enable-time')) {
			dateData.enableTime = true;
			dateData.dateFormat += ' H:i';
		}

		if (attributes.getNamedItem('data-altFormat')) {
			dateData.altInput = true;
			dateData.altFormat = attributes.getNamedItem('data-altFormat')?.value;
		}

		if (attributes.getNamedItem('data-minDate'))
			dateData.minDate = attributes.getNamedItem('data-minDate')?.value;

		if (attributes.getNamedItem('data-maxDate'))
			dateData.maxDate = attributes.getNamedItem('data-maxDate')?.value;

		if (attributes.getNamedItem('data-default-date'))
			dateData.defaultDate = attributes.getNamedItem('data-default-date')?.value;

		if (attributes.getNamedItem('data-multiple-date')) dateData.mode = 'multiple';

		if (attributes.getNamedItem('data-range-date')) dateData.mode = 'range';

		if (attributes.getNamedItem('data-inline-date')) {
			dateData.inline = true;
			dateData.defaultDate = attributes.getNamedItem('data-default-date')?.value;
		}

		if (attributes.getNamedItem('data-disable-date'))
			dateData.disable = attributes.getNamedItem('data-disable-date')?.value.split(',');

		if (attributes.getNamedItem('data-week-number')) dateData.weekNumbers = true;

		return dateData;
	}

	// Get the timepicker options from attributes
	function getTimepickerOptions(item: HTMLElement) {
		const attributes = item.attributes; // NamedNodeMap
		const timeData: Record<string, any> = {};
		timeData.enableTime = true;
		timeData.noCalendar = true;
		timeData.dateFormat = 'H:i';

		const timeHrsAttr = attributes.getNamedItem('data-time-hrs');
		if (timeHrsAttr) {
			timeData.time_24hr = true;
		}

		const minTimeAttr = attributes.getNamedItem('data-min-time');
		if (minTimeAttr) {
			timeData.minTime = minTimeAttr.value;
		}

		const maxTimeAttr = attributes.getNamedItem('data-max-time');
		if (maxTimeAttr) {
			timeData.maxTime = maxTimeAttr.value;
		}

		const defaultTimeAttr = attributes.getNamedItem('data-default-time');
		if (defaultTimeAttr) {
			timeData.defaultDate = defaultTimeAttr.value;
		}

		const timeInlineAttr = attributes.getNamedItem('data-time-inline');
		if (timeInlineAttr) {
			timeData.inline = true;
			timeData.defaultDate = timeInlineAttr.value;
		}

		return timeData;
	}

	// Initialize the component
	onMount(() => {
		initFlatpickr();
	});
</script>

<PageHeading title="Pickers" sub_title="Forms" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<input
					data-provider="flatpickr"
					data-date-format="d M, Y"
					type="text"
					placeholder="YYYY-MM-DD"
					class="form-input"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Human-friendly Dates</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<input
					data-provider="flatpickr"
					data-date-format="F j, Y"
					type="text"
					placeholder="YYYY-MM-DD"
					class="form-input"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Date Picker with Min and Max Date</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<input
					data-provider="flatpickr"
					data-min-date="2024-01-01"
					data-max-date="2024-02-13"
					type="text"
					placeholder="DD MMM, YYYY"
					class="form-input"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Default Date</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<input
					data-provider="flatpickr"
					data-date-format="d M, Y"
					data-default-date="today"
					type="text"
					placeholder="DD MMM, YYYY"
					class="form-input"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Disabling Date</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<input
					data-provider="flatpickr"
					data-date-format="Y-m-d"
					data-disable-date="2024-07-17"
					type="text"
					placeholder="DD MMM, YYYY"
					class="form-input"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Short Date</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<input
					data-provider="flatpickr"
					data-date-format="m/d/y"
					type="text"
					placeholder="MM/DD/YY"
					class="form-input"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Selecting multiple dates</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<input
					data-provider="flatpickr"
					data-date-format="d M, Y"
					data-multiple-date="true"
					type="text"
					placeholder="MM/DD/YY"
					class="form-input"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Full Date with Time</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<input
					data-provider="flatpickr"
					data-date-format="d M, Y H:i"
					data-enable-time
					type="text"
					placeholder="DD MMM, YYYY HH:MM"
					class="form-input"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Range Picker</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<input
					data-provider="flatpickr"
					data-date-format="d M, Y"
					data-range-date
					type="text"
					placeholder="Select Date Range"
					class="form-input"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Week Numbers</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<input
					data-provider="flatpickr"
					data-date-format="d M, Y"
					data-week-number="true"
					type="text"
					placeholder="Select a date"
					class="form-input"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Timepickr</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<input
					data-provider="timepickr"
					data-time-basic="true"
					type="text"
					placeholder="Select a time"
					class="form-input"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>24 Hours Timepickr</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<input
					data-provider="timepickr"
					data-time-hrs="true"
					type="text"
					placeholder="Select a time"
					class="form-input"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Time Picker w/ Limits</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<input
					data-provider="timepickr"
					data-min-time="10:30"
					data-max-time="12:30"
					type="text"
					placeholder="Select a time"
					class="form-input"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Preloading Time</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<input
					data-provider="timepickr"
					data-default-time="2024-08-28 12:20"
					placeholder="Select a time"
					class="form-input"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Inline</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<input
					data-provider="flatpickr"
					data-date-format="d M, Y"
					data-default-date="today"
					data-inline-date="true"
					type="text"
					placeholder="Select a date"
					class="form-input"
				/>
			</div>
		</CardBody>
	</Col>
</Grid>
