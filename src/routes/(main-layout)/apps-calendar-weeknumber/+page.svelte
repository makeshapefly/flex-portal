<script lang="ts">
	import { onMount, onDestroy, afterUpdate } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import interactionPlugin from '@fullcalendar/interaction';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	let cal: Calendar | null = null;

	function initCalendar(calendar: Calendar | null = null) {
		if (calendar !== null) {
			calendar.destroy(); // Destroy the existing calendar instance if it exists
		}

		const calendarEl = document.getElementById('weekNumberCalendar');
		if (calendarEl) {
			calendar = new Calendar(calendarEl, {
				timeZone: 'America/New_York',
				plugins: [interactionPlugin, dayGridPlugin],
				weekNumbers: true
			});
			calendar.render();
		}
		return calendar;
	}

	// onMount to initialize the calendar and set up event listeners
	onMount(() => {
		cal = initCalendar(cal);
	});
</script>

<PageHeading title="Week Number" sub_title="Calendar" />
<Card>
	<CardBody>
		<div id="weekNumberCalendar"></div>
	</CardBody>
</Card>
