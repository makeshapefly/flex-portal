<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import { Calendar } from '@fullcalendar/core';
	import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
	import eventsData from './event';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	let calendar: Calendar | null = null;
	let calendarContainer: HTMLElement | null = null;

	// Function to initialize the calendar
	function initCalendar() {
		if (calendarContainer) {
			calendar = new Calendar(calendarContainer, {
				plugins: [resourceTimelinePlugin],
				timeZone: 'UTC',
				headerToolbar: {
					left: 'today prev,next',
					center: 'title',
					right:
						'resourceTimelineDay,resourceTimelineTenDay,resourceTimelineMonth,resourceTimelineYear'
				},
				initialView: 'resourceTimelineDay',
				scrollTime: '08:00',
				aspectRatio: 1.5,
				views: {
					resourceTimelineDay: {
						buttonText: ':15 slots',
						slotDuration: '00:15'
					},
					resourceTimelineTenDay: {
						type: 'resourceTimeline',
						duration: { days: 10 },
						buttonText: '10 days'
					}
				},
				editable: true,
				resourceAreaHeaderContent: 'Rooms',
				resources: eventsData,
				events:
					'https://fullcalendar.io/api/demo-feeds/events.json?single-day&for-resource-timeline'
			});

			calendar.render();
		}
	}

	// Initialize the calendar when the component mounts
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

<PageHeading title="Timeline" sub_title="Calendar" />
<Card>
	<CardBody>
		<!-- Use bind:this to reference the DOM element for calendar initialization -->
		<div bind:this={calendarContainer}></div>
	</CardBody>
</Card>
