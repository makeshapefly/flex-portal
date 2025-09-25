<script lang="ts">
  import { onMount } from 'svelte';
  import flatpickr from 'flatpickr';
  import 'flatpickr/dist/flatpickr.min.css';

  export let value: string | undefined; 
  export let dateFormat: string = 'd M, Y';
  export let enableTime: boolean = false;
  export let minDate: string | undefined = '';
  export let maxDate: string | undefined = '';
  export let defaultDate: string | undefined = '';
  export let mode: 'single' | 'multiple' | 'range' = 'single';
  export let disableDates: string[] = [];
  export let inline: boolean = false;
  export let weekNumbers: boolean = false;

  let inputElement: HTMLInputElement;

  // Update value when the date is selected
  const updateValue = (selectedDates: Date[]) => {
    // Assuming single date selection, adjust for multiple or range if needed
    if (selectedDates.length > 0) {
      value = selectedDates[0].toISOString().split('T')[0]; 
    }
  };

  onMount(() => {
    const options = {
      dateFormat,
      enableTime,
      time_24hr: true, 
      minDate,
      maxDate,
      defaultDate,
      mode,
      disable: disableDates,
      inline,
      weekNumbers,
      onChange: updateValue 
    };

    // Initialize flatpickr with the provided options
    flatpickr(inputElement, options);

    // If there's an initial value, set it on mount
    if (value) {
      inputElement.value = value;
    }
  });

  let props = {};

	$:{
		const { class: _, ...rest } = $$props;
		props = rest;
	}
</script>

<input bind:this={inputElement} type="text" placeholder="Select date" class="form-input" {...props} />
