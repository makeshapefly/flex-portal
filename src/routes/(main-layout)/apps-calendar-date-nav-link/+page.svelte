<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import { Calendar } from '@fullcalendar/core';
	import listPlugin from '@fullcalendar/list';
	import interactionPlugin from '@fullcalendar/interaction';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	let calendar: Calendar | null = null;
	let calendarContainer: HTMLElement | null = null;

	// Function to initialize the calendar
	function initCalendar() {
		if (calendarContainer) {
			calendar = new Calendar(calendarContainer, {
				plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
				editable: true,
				navLinks: true,
				headerToolbar: {
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay'
				},
				events:
					'https://fullcalendar.io/api/demo-feeds/events.json?single-day&for-resource-timeline'
			});

			calendar.render();
		}
	}

	// Initialize calendar when the component mounts
	onMount(() => {
		initCalendar();
	});

	onDestroy(() => {
		if (calendar) {
			calendar.destroy();
		}
	});
</script>

<PageHeading title="Date Nav Link" sub_title="Calendar" />
<Card>
	<CardBody>
		<!-- Use bind:this to reference the div for calendar -->
		<div bind:this={calendarContainer}></div>
	</CardBody>
</Card>
