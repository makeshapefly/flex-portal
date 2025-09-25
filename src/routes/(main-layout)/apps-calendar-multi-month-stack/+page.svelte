<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import { Calendar } from '@fullcalendar/core';
	import multiMonthPlugin from '@fullcalendar/multimonth';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	let calendar: Calendar | null = null;

	// Function to initialize the calendar
	function initCalendar() {
		const calendarEl = document.getElementById('multiMonthStackCalendar');
		if (calendarEl) {
			calendar = new Calendar(calendarEl, {
				plugins: [multiMonthPlugin],
				initialView: 'multiMonthYear',
				multiMonthMaxColumns: 1
			});
			calendar.render();
		}
	}

	// Initialize calendar when component mounts
	onMount(() => {
		initCalendar();
	});
</script>

<PageHeading title="Multi-Month Stack" sub_title="Calendar" />
<Card>
	<CardBody>
		<div id="multiMonthStackCalendar"></div>
	</CardBody>
</Card>
