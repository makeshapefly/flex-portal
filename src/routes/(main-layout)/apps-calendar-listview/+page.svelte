<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import { Calendar } from '@fullcalendar/core';
	import listPlugin from '@fullcalendar/list';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	let calendar: Calendar | null = null;
	let calendarContainer: HTMLElement | null = null;

	// Function to initialize the calendar
	function initCalendar() {
		if (calendarContainer) {
			calendar = new Calendar(calendarContainer, {
				plugins: [listPlugin],
				editable: true,
				initialView: 'listWeek',
				events: [
					{ title: 'Meeting', start: new Date() },
					{ title: 'Update Weekly', start: new Date() }
				]
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

<PageHeading title="List View" sub_title="Calendar" />
<Card>
	<CardBody>
		<div bind:this={calendarContainer}></div>
	</CardBody>
</Card>
