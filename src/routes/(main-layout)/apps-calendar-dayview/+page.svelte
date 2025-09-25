<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';

	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	let calendar: Calendar | null = null;
	let calendarContainer: HTMLElement | null = null;

	// Function to initialize the calendar
	function initCalendar() {
		// Destroy the existing calendar instance if it exists

		if (calendarContainer) {
			calendar = new Calendar(calendarContainer, {
				timeZone: 'America/New_York',
				plugins: [dayGridPlugin],
				initialView: 'dayGridWeek',
				headerToolbar: {
					left: 'prev,next',
					center: 'title',
					right: 'dayGridWeek,dayGridDay' // user can switch between the two
				}
			});
			calendar.render();
		}
	}

	// Initialize the calendar when the component mounts
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

<PageHeading title="Day Grid View" sub_title="Calendar" />
<Card>
	<CardBody class="card-body">
		<div bind:this={calendarContainer}></div>
	</CardBody>
</Card>
