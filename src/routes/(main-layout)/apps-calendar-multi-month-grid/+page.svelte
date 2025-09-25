<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import { Calendar } from '@fullcalendar/core';
	import multiMonthPlugin from '@fullcalendar/multimonth';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	let calendar: Calendar | null = null;
	let calendarContainer: HTMLElement | null = null;

	// Function to initialize the calendar
	function initCalendar() {
		if (calendarContainer) {
			calendar = new Calendar(calendarContainer, {
				plugins: [multiMonthPlugin],
				themeSystem: 'sketchy',
				initialView: 'multiMonthYear'
			});
			calendar.render();
		}
	}

	// Initialize calendar when component mounts
	onMount(() => {
		initCalendar();
	});

	// Cleanup when component is destroyed
	onDestroy(() => {
		if (calendar) {
			calendar.destroy();
		}
	});
</script>

<PageHeading title="Multi-Month grid" sub_title="Calendar" />
<Card>
	<CardBody>
		<div bind:this={calendarContainer}></div>
	</CardBody>
</Card>
