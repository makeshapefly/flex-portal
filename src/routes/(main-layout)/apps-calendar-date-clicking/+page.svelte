<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import { Calendar } from '@fullcalendar/core';
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
				plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
				selectable: true,
				headerToolbar: {
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay'
				},
				dateClick: function (info) {
					alert('clicked ' + info.dateStr);
				},
				select: function (info) {
					alert('selected ' + info.startStr + ' to ' + info.endStr);
				}
			});

			calendar.render();
		}
	}

	// Initialize calendar when the component mounts
	onMount(() => {
		initCalendar();
	});

	// Cleanup when the component is destroyed
	onDestroy(() => {
		if (calendar) {
			calendar.destroy();
		}
	});
</script>

<PageHeading title="Date Clicking & Selecting" sub_title="Calendar" />
<Card>
	<CardBody>
		<!-- Bind the div to the calendar container -->
		<div bind:this={calendarContainer}></div>
	</CardBody>
</Card>
