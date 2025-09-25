<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import ModalClose from '$lib/components/ui/modal/ModalClose.svelte';

	export let modalId = '';
	export let addForm: boolean;
	export let editMode = false;
	export let selectedCustomer: any | null = null;

	let eventForm: any = {
		ID: '',
		username: '',
		date: '',
		time: '',
		eventType: '',
		name: '',
		location: '',
		peopleSize: '',
		image: '',
		price: '',
		status: '',
		contributors: []
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

	const validateField = (fieldName: string, fieldValue: any, errorMessage: string) => {
		// Ensure fieldValue is a string and call .trim() safely
		if (!fieldValue || String(fieldValue).trim() === '') {
			errors[fieldName] = errorMessage;
		} else {
			delete errors[fieldName];
		}
	};

	function validateForm() {
		errors = {};
		validateField('name', eventForm.name, 'Event name is required.');
		validateField('date', eventForm.date, 'Date is required.');
		validateField('time', eventForm.time, 'Time is required.');
		validateField('location', eventForm.location, 'Location is required.');
		validateField('peopleSize', eventForm.peopleSize, 'People size is required.');
		validateField('price', eventForm.price, 'Price is required.');
		validateField('eventType', eventForm.eventType, 'Event type is required.');
		validateField('status', eventForm.status, 'Status is required.');
		validateField('contributors', eventForm.contributors, 'Contributor is required.');
		validateField('image', eventForm.image, 'Image is required.');

		return Object.keys(errors).length === 0;
	}

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
					class="dark:bg-dark-850 dark:border-dark-800 inline-flex h-32 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gray-100"
				>
					{#if eventForm.image}
						<!-- svelte-ignore a11y-missing-attribute -->
						<img src={eventForm.image} class="h-24 object-cover" />
					{:else}
						<span class="dark:text-dark-500 flex flex-col items-center text-gray-500">
							<LucideIcon name="Upload" />
							<span class="mt-3 block">Upload Your Event Logo</span>
						</span>
					{/if}
				</span>
			</label>
			<input type="file" id="logo" class="hidden" on:change={fileChosen} />
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
			bind:value={eventForm.name}
			on:input={() => validateField('name', eventForm.name, 'Event name is required.')}
		/>
		{#if errors.name}
			<span class="text-red-500">{errors.name}</span>
		{/if}
	</div>

	<!-- Event Date -->
	<div class="col-span-6">
		<label for="eventDateInput" class="form-label">Event Date</label>
		<input
			type="date"
			id="eventDateInput"
			class="form-input"
			bind:value={eventForm.date}
			on:input={() => validateField('date', eventForm.date, 'Date is required.')}
		/>
		{#if errors.date}
			<span class="text-red-500">{errors.date}</span>
		{/if}
	</div>

	<!-- Event Time -->
	<div class="col-span-6">
		<label for="eventDurationInput" class="form-label">Event Duration</label>
		<input
			type="time"
			id="eventDurationInput"
			class="form-input"
			bind:value={eventForm.time}
			on:input={() => validateField('time', eventForm.time, 'Time is required.')}
		/>
		{#if errors.time}
			<span class="text-red-500">{errors.time}</span>
		{/if}
	</div>

	<!-- People Size -->
	<div class="col-span-6">
		<label for="peopleSizeInput" class="form-label">Total People</label>
		<input
			type="number"
			id="peopleSizeInput"
			class="form-input"
			placeholder="0"
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
			id="priceInput"
			class="form-input"
			placeholder="$00.00"
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
			id="locationInput"
			class="form-input"
			placeholder="Enter event location"
			bind:value={eventForm.location}
			on:input={() => validateField('location', eventForm.location, 'Location is required.')}
		/>
		{#if errors.location}
			<span class="text-red-500">{errors.location}</span>
		{/if}
	</div>

	<div class="col-span-12">
		<label for="contributorsSelect" class="form-label">Contributors</label>
		<select
			id="contributorsSelect"
			class="form-input"
			bind:value={eventForm.contributors}
			on:change={() => validateField('status', eventForm.contributors, 'contributors is required.')}
		>
			<option value="">Select contributors</option>
			<option>Coming soon</option>
		</select>
		{#if errors.contributors}
			<span class="text-red-500">{errors.contributors}</span>
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

<div class="mt-5 flex justify-end gap-2">
	<ModalClose {modalId} class="btn btn-active-red">Cancel</ModalClose>
	<button class="btn btn-primary" on:click={() => validateForm()}>
		{!editMode ? 'Add Event' : 'Edit Event'}
	</button>
</div>
