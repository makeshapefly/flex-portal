<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import { Calendar } from '@fullcalendar/core';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	let calendar: Calendar | null = null;

	// Function to initialize the calendar
	function initCalendar() {
		const calendarEl = document.getElementById('listViewCalendar');
		if (calendarEl) {
			calendar = new Calendar(calendarEl, {
				timeZone: 'America/New_York',
				plugins: [timeGridPlugin],
				initialView: 'timeGridWeek',
				headerToolbar: {
					left: 'prev,next',
					center: 'title',
					right: 'timeGridWeek,timeGridDay' // user can switch between the two
				}
			});
			calendar.render();
		}
	}

	// Initialize calendar when component mounts
	onMount(() => {
		initCalendar();
	});
</script>

<PageHeading title="Time Grid View" sub_title="Calendar" />
<Card>
	<CardBody>
		<div id="listViewCalendar"></div>
	</CardBody>
</Card>
