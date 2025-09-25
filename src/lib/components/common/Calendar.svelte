<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Calendar as FullCalendar } from '@fullcalendar/core';
  import listPlugin from '@fullcalendar/list';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';

  export let options: any = {}; // Options passed from the parent component
  let calendar: FullCalendar | null = null;
  let calendarContainer: HTMLElement | null = null;

  // Function to initialize the calendar
  function initCalendar() {
    if (calendarContainer) {
      // Default plugins for all calendars
      const plugins = [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin];

      calendar = new FullCalendar(calendarContainer, {
        plugins,
        ...options // Spread the passed options to the calendar initialization
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

<div bind:this={calendarContainer}></div>
