<script lang="ts">
	import { onMount } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import interactionPlugin from '@fullcalendar/interaction';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import allLocales from '@fullcalendar/core/locales-all';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
	// import * as VirtualSelect from 'virtual-select-plugin/dist/virtual-select';

	let calendar: Calendar | null = null;

	onMount(() => {
		// Initialize FullCalendar
		const calendarEl = document.getElementById('localizeCalendar');
		if (calendarEl) {
			calendar = new Calendar(calendarEl, {
				timeZone: 'America/New_York',
				plugins: [interactionPlugin, dayGridPlugin],
				locales: allLocales,
				locale: 'en' // initial locale
			});
			calendar.render();
		}

		// Event listener for the locale selection change
		const localizeSelect = document.getElementById('localizeSelect');
		localizeSelect?.addEventListener('change', (event) => {
			const selectedValue = (event.target as HTMLSelectElement).value;
			if (calendar) {
				calendar.setOption('locale', selectedValue); // Set the new locale
				calendar.render(); // Re-render the calendar
			}
		});

		// Example of locale change after 1 second for testing
		setTimeout(() => {
			if (calendar) {
				calendar.setOption('locale', 'en-au');
				calendar.render();
			}
		}, 1000);
	});
</script>

<PageHeading title="Localize" sub_title="Calendar" />
<Card>
	<CardHeader>
		<!-- VirtualSelect dropdown for locale selection -->
		<div id="localizeSelect"></div>
	</CardHeader>
	<CardBody>
		<!-- FullCalendar container -->
		<div id="localizeCalendar"></div>
	</CardBody>
</Card>
