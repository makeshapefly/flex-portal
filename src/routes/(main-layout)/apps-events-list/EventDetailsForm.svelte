<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import ModalClose from '$lib/components/ui/modal/ModalClose.svelte';
  import { eventsListData } from './event-list';

  export let addForm: boolean;
  export let editMode = false;
  export let selectedCustomer: any | null = null;
  export let filterEvents;
  export let updatePagination = () => {};
  export let modalId;

  let eventForm: any = {
    eventName: '',
    eventDate: '',
    time: '',
    peopleSize: '',
    price: '',
    location: '',
    eventType: '',
    status: '',
    image: ''
  };
  let errors: any = {};

  // If in edit mode, prefill the form
  $: if (editMode && selectedCustomer) {
    eventForm = {
      ...(selectedCustomer as any)
    };
  }
  $: if (addForm && !editMode) {
    resetForm();
  }

  const fileChosen = (event: { target: any }) => {
    const fileInput = event.target;
    if (fileInput && fileInput.files) {
      const file = fileInput.files[0];
      if (file) {
        eventForm.image = URL.createObjectURL(file);
      }
    }
  };

  // Validation function
  const validateField = (fieldName: string, fieldValue: any, errorMessage: string) => {
    if (!fieldValue || String(fieldValue).trim() === '') {
      errors[fieldName] = errorMessage;
    } else {
      delete errors[fieldName];
    }
  };

  // Full form validation
  const validateForm = () => {
    errors = {};
    validateField('eventName', eventForm.eventName, 'Event name is required.');
    validateField('eventDate', eventForm.eventDate, 'Date is required.');
    validateField('location', eventForm.location, 'Location is required.');
    validateField('peopleSize', eventForm.peopleSize, 'People size is required.');
    validateField('price', eventForm.price, 'Price is required.');
    validateField('time', eventForm.time, 'Time is required.');
    validateField('status', eventForm.status, 'Status is required.');
    validateField('eventType', eventForm.eventType, 'Event type is required.');
    validateField('image', eventForm.image, 'Image is required.');
    return Object.keys(errors).length === 0;
  };

  const submitForm = () => {
    if (validateForm()) {
      const formattedEventDate = new Date(eventForm.eventDate).toISOString().split('T')[0];

      const newEvent = {
        ...eventForm,
        id: eventsListData.length + 1,
        eventDate: formattedEventDate
      };

      eventsListData.unshift(newEvent);
      filterEvents = [...eventsListData];

      // Reset the form
      eventForm = {
        eventName: '',
        eventDate: '',
        time: '',
        peopleSize: '',
        price: '',
        location: '',
        eventType: '',
        status: '',
        image: ''
      };
      errors = {};
      updatePagination();
    }
  };

  const resetForm = (): void => {
    Object.keys(eventForm).forEach((key) => {
      const typedKey = key as keyof any; // Type assertion
      if (typeof eventForm[typedKey] === 'number') {
        eventForm[typedKey] = 0 as any; // Assigning number
      } else {
        eventForm[typedKey] = '' as any; // Assigning string
      }
    });
  };
</script>

<div class="grid grid-cols-12 gap-5">
  <!-- Event Logo -->
  <div class="col-span-12">
    <h6 class="form-label">Event Logo</h6>
    <div>
      <label for="logo">
        <span
          class="inline-flex items-center justify-center w-full h-32 overflow-hidden bg-gray-100 border border-gray-200 rounded-md cursor-pointer dark:bg-dark-850 dark:border-dark-800"
        >
          {#if eventForm.image}
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src={eventForm.image} class="object-cover h-24" />
          {:else}
            <span class="flex flex-col items-center text-gray-500">
              <LucideIcon name="Upload" />
              <span class="block mt-3">Upload Your Event Logo</span>
            </span>
          {/if}
        </span>
      </label>
      <div class="hidden">
        <label class="block">
          <span class="sr-only">Choose profile photo</span>
          <input
            type="file"
            name="logo"
            id="logo"
            on:change={fileChosen}
            class="block w-full text-sm file:rounded-md focus:outline-0 text-slate-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </label>
      </div>
    </div>
    {#if errors.image}
      <span class="text-red-500">{errors.image}</span>
    {/if}
  </div>

  <!-- Event Name -->
  <div class="col-span-12">
    <label for="eventNameInput" class="form-label">Event Name</label>
    <input
      type="text"
      id="eventNameInput"
      class="form-input"
      placeholder="Event name"
      bind:value={eventForm.eventName}
      on:input={() => validateField('eventName', eventForm.eventName, 'Event name is required.')}
    />
    {#if errors.eventName}
      <span class="text-red-500">{errors.eventName}</span>
    {/if}
  </div>

  <!-- Event Date -->
  <div class="col-span-6">
    <label for="eventDateInput" class="form-label">Event Date</label>
    <input
      type="text"
      placeholder="YYYY-MM-DD"
      id="eventDateInput"
      class="form-input"
      bind:value={eventForm.eventDate}
      on:input={() => validateField('eventDate', eventForm.eventDate, 'Date is required.')}
    />
    {#if errors.eventDate}
      <span class="text-red-500">{errors.eventDate}</span>
    {/if}
  </div>

  <!-- Event Duration -->
  <div class="col-span-6">
    <label for="eventDurationInput" class="form-label">Event Duration</label>
    <input
      type="text"
      placeholder="00:00"
      id="eventDurationInput"
      class="form-input"
      bind:value={eventForm.time}
      on:input={() => validateField('time', eventForm.time, 'Time is required.')}
    />
    {#if errors.time}
      <span class="text-red-500">{errors.time}</span>
    {/if}
  </div>

  <!-- Total People -->
  <div class="col-span-6">
    <label for="peopleInput" class="form-label">Total People</label>
    <input
      type="number"
      placeholder="0"
      id="peopleInput"
      class="form-input"
      bind:value={eventForm.peopleSize}
      on:input={() => validateField('peopleSize', eventForm.peopleSize, 'People size is required.')}
    />
    {#if errors.peopleSize}
      <span class="text-red-500">{errors.peopleSize}</span>
    {/if}
  </div>

  <!-- Price -->
  <div class="col-span-6">
    <label for="priceInput" class="form-label">Price</label>
    <input
      type="number"
      placeholder="$00.00"
      id="priceInput"
      class="form-input"
      bind:value={eventForm.price}
      on:input={() => validateField('price', eventForm.price, 'Price is required.')}
    />
    {#if errors.price}
      <span class="text-red-500">{errors.price}</span>
    {/if}
  </div>

  <!-- Location -->
  <div class="col-span-12">
    <label for="locationInput" class="form-label">Location</label>
    <input
      type="text"
      placeholder="Enter event location"
      id="locationInput"
      class="form-input"
      bind:value={eventForm.location}
      on:input={() => validateField('location', eventForm.location, 'Location is required.')}
    />
    {#if errors.location}
      <span class="text-red-500">{errors.location}</span>
    {/if}
  </div>

  <!-- Event Type -->
  <div class="col-span-6">
    <label for="eventTypeSelect" class="form-label">Event Type</label>
    <select
      id="eventTypeSelect"
      class="form-input"
      bind:value={eventForm.eventType}
      on:change={() => validateField('eventType', eventForm.eventType, 'Event type is required.')}
    >
      <option value="">Select Event Type</option>
      <option>offline</option>
      <!-- Add options here -->
    </select>
    {#if errors.eventType}
      <span class="text-red-500">{errors.eventType}</span>
    {/if}
  </div>

  <!-- Status -->
  <div class="col-span-6">
    <label for="StatusSelect" class="form-label">Status</label>
    <select
      id="StatusSelect"
      class="form-input"
      bind:value={eventForm.status}
      on:change={() => validateField('status', eventForm.status, 'Status is required.')}
    >
      <option value="">Select Status</option>
      <option>Coming soon</option>
    </select>
    {#if errors.status}
      <span class="text-red-500">{errors.status}</span>
    {/if}
  </div>
</div>

<div class="flex justify-end gap-2 mt-5">
  <ModalClose {modalId} class="btn btn-active-red">Cancel</ModalClose>
  <!-- <button type="button" >Cancel</button> -->
  <button class="btn btn-primary" on:click={submitForm}
    >{eventForm.eventName ? 'Add Event' : 'Edit Event'}</button
  >
</div>
