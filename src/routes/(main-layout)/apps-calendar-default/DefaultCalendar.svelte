<script lang="ts">
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalClose from '$lib/components/ui/modal/ModalClose.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import { Draggable } from '@fullcalendar/interaction';
	import interactionPlugin from '@fullcalendar/interaction';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';

	let calendar: Calendar | null = null;
	let calendarContainer: HTMLElement | null = null;
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth();

	// Function to initialize the calendar
	function initCalendar() {
		if (calendarContainer) {
			const calendarEl = calendarContainer;
			calendar = new Calendar(calendarEl, {
				timeZone: 'local',
				plugins: [interactionPlugin, dayGridPlugin],
				editable: true,
				droppable: true,
				initialView: 'dayGridMonth',
				events: [
					{
						id: 1,
						title: 'Meeting',
						start: new Date(currentYear, currentMonth, 1),
						end: new Date(currentYear, currentMonth, 1),
						allDay: true,
						extendedProps: { guests: [], location: 'surat' },
						classNames: ['bg-green-500 hover:bg-green-500 text-green-50 !p-2 !border-none']
					},
					{
						id: 2,
						title: 'Update Weekly',
						start: new Date(currentYear, currentMonth, 7),
						end: new Date(currentYear, currentMonth, 7),
						allDay: true,
						extendedProps: { location: 'surat' },
						classNames: ['bg-primary-500 hover:bg-primary-500 text-primary-50 !p-2 !border-none']
					},
					{
						id: 3,
						title: 'Family Dinner',
						start: new Date(currentYear, currentMonth, 14),
						end: new Date(currentYear, currentMonth, 14),
						allDay: true,
						extendedProps: { location: 'surat' },
						classNames: ['bg-purple-500 hover:bg-purple-500 text-purple-50 !p-2 !border-none']
					},
					{
						id: 4,
						title: 'School Reunion',
						start: new Date(currentYear, currentMonth, 10),
						end: new Date(currentYear, currentMonth, 10),
						allDay: true,
						extendedProps: { location: 'surat' },
						classNames: ['bg-sky-500 hover:bg-sky-500 text-sky-50 !p-2 !border-none']
					},
					{
						id: 5,
						title: 'Holiday Tour',
						start: new Date(currentYear, currentMonth, 14),
						end: new Date(currentYear, currentMonth, 14),
						allDay: true,
						extendedProps: { location: 'surat' },
						classNames: ['bg-green-500 hover:bg-green-500 text-green-50 !p-2 !border-none']
					},
					{
						id: 6,
						title: 'Meeting',
						start: new Date(currentYear, currentMonth, 23),
						end: new Date(currentYear, currentMonth, 23),
						allDay: true,
						extendedProps: { location: 'surat' },
						classNames: ['bg-green-500 hover:bg-green-500 text-green-50 !p-2 !border-none']
					},
					{
						id: 7,
						title: 'Marriage Function',
						start: new Date(currentYear, currentMonth, 18),
						end: new Date(currentYear, currentMonth, 18),
						allDay: true,
						extendedProps: { location: 'surat' },
						classNames: ['bg-purple-500 hover:bg-purple text-purple-50 !p-2 !border-none']
					}
				],
				eventClick: (info) => {},
				dateClick: (info) => {},
				drop: (info) => {
					const eventData = {
						title: info.draggedEl.innerText,
						className: info.draggedEl.getAttribute('class')
					};
					//@ts-ignore
					calendar.addEvent({
						title: eventData.title,
						start: info.date,
						allDay: true,
						//@ts-ignore
						className: eventData.className
					});
				}
			});

			const containerEl = document.getElementById('external-events');
			if (containerEl) {
				new Draggable(containerEl, {
					itemSelector: '.fc-event'
				});
			}

			calendar.render();
		}
	}
	interface Form {
		eventName: string;
		eventDate: string;
		endEventDate: string;
		eventTime: string;
		color: string;
		location: string;
		guestEmail: string;
		guests: { email: string; image: string }[];
	}
	let form: Form = {
		eventName: '',
		eventDate: '',
		endEventDate: '',
		eventTime: '',
		color: '',
		location: '',
		guestEmail: '',
		guests: [] as { email: string; image: string }[] // Guest data
	};
	let errors: { [key: string]: string } = {};

	// Function to validate individual fields
	const validateField = (field: string, value: string) => {
		let isValid = true;
		switch (field) {
			case 'eventName':
				if (!value) {
					errors[field] = 'Event name is required.';
					isValid = false;
				} else {
					delete errors[field];
				}
				break;
			case 'eventDate':
			case 'endEventDate':
				if (!value) {
					errors[field] = `${field === 'eventDate' ? 'Event date' : 'End event date'} is required.`;
					isValid = false;
				} else {
					delete errors[field];
				}
				break;
			case 'eventTime':
				if (!value) {
					errors[field] = 'Event time is required.';
					isValid = false;
				} else {
					delete errors[field];
				}
				break;
			case 'color':
				if (!value) {
					errors[field] = 'Color is required.';
					isValid = false;
				} else {
					delete errors[field];
				}
				break;
			case 'location':
				if (!value) {
					errors[field] = 'Location is required.';
					isValid = false;
				} else {
					delete errors[field];
				}
				break;
			case 'guestEmail':
				const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!value || !emailPattern.test(value)) {
					errors[field] = 'Valid email is required.';
					isValid = false;
				} else {
					delete errors[field];
				}
				break;
			default:
				break;
		}
		return isValid;
	};

	const userImages = [
		'/assets/images/avatar/user-1.png',
		'/assets/images/avatar/user-2.png',
		'/assets/images/avatar/user-3.png',
		'/assets/images/avatar/user-4.png',
		'/assets/images/avatar/user-5.png',
		'/assets/images/avatar/user-6.png',
		'/assets/images/avatar/user-7.png',
		'/assets/images/avatar/user-8.png',
		'/assets/images/avatar/user-9.png',
		'/assets/images/avatar/user-10.png'
	];

	// Function to add a guest
	function addGuest() {
		if (validateField('guestEmail', form.guestEmail)) {
			const randomImage = userImages[Math.floor(Math.random() * userImages.length)];
			form.guests.push({ email: form.guestEmail, image: randomImage });
			form.guestEmail = ''; // Clear the email input field
		}
	}

	// Function to remove a guest
	function removeGuest(index: number) {
		form.guests.splice(index, 1);
	}

	// Function to save the event
	function saveEvent() {
		if (form.eventName && form.eventDate && form.location) {
			const newEvent = {
				title: form.eventName,
				start: form.eventDate,
				end: form.endEventDate,
				extendedProps: { location: form.location, guests: form.guests },
				classNames: [form.color, form.color, 'text-primary-50 !border-none !p-2']
			};
			if (calendar) {
				calendar.addEvent(newEvent); // ✅ Correct way to add an event dynamically
				clearForm();
			} // Save the event to the events array
		}
	}

	const clearForm = () => {
		Object.keys(form).forEach((key) => {
			(form as any)[key] = '';
		});
	};
	// Initialize calendar when component mounts
	onMount(() => {
		initCalendar();
	});

	// Cleanup when component is destroyed
	onDestroy(() => {
		if (calendar) {
			calendar.destroy();
		}
	});
	const eventTypes = [
		{ title: 'Events', color: '!btn-purple' },
		{ title: 'Personal', color: '!btn-primary' },
		{ title: 'Meeting', color: '!btn-green' },
		{ title: 'Festival Function', color: '!btn-sky' }
	];
</script>

<div>
	<div class="mb-space flex flex-wrap items-center gap-2" id="external-events">
		<div id="external-events" class="flex grow items-center gap-2">
			{#each eventTypes as event}
				<div
					class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event !btn !btn-md {event.color}"
					draggable="true"
				>
					<div class="fc-event-main">{event.title}</div>
				</div>
			{/each}
		</div>
		<ModalTrigger
			modalId="add-event-modal"
			class="btn"
			icon="CirclePlus"
			color="primary"
			text="Add Event"
		></ModalTrigger>
		<Modal modalId="add-event-modal" let:modalId>
			<ModalHeader {modalId}>
				<h6>Add Event</h6>
			</ModalHeader>
			<ModalBody>
				<form id="eventForm" on:submit|preventDefault={saveEvent}>
					<div class="gap-space grid grid-cols-12">
						<div class="col-span-12">
							<label for="eventNameInput" class="form-label">Event Name</label>
							<input
								type="text"
								id="eventNameInput"
								bind:value={form.eventName}
								class="form-input"
								placeholder="Enter event name"
							/>
							{#if errors.eventName}
								<span class="text-red-500">{errors.eventName}</span>
							{/if}
						</div>
						<div class="col-span-4">
							<label for="eventDateInput" class="form-label">Event Date</label>
							<input
								type="date"
								id="eventDateInput"
								bind:value={form.eventDate}
								class="form-input"
								placeholder="Select date"
							/>
							{#if errors.eventDate}
								<span class="text-red-500">{errors.eventDate}</span>
							{/if}
						</div>
						<div class="col-span-4">
							<label for="endEventDateInput" class="form-label">End Date</label>
							<input
								type="date"
								id="endEventDateInput"
								bind:value={form.endEventDate}
								class="form-input"
								placeholder="Select end date"
							/>
							{#if errors.endEventDate}
								<span class="text-red-500">{errors.endEventDate}</span>
							{/if}
						</div>
						<div class="col-span-4">
							<label for="eventTimeInput" class="form-label">Event Time</label>
							<input
								type="time"
								id="eventTimeInput"
								bind:value={form.eventTime}
								class="form-input"
								placeholder="Select time"
							/>
							{#if errors.eventTime}
								<span class="text-red-500">{errors.eventTime}</span>
							{/if}
						</div>
						<div class="col-span-12">
							<label for="colorInput" class="form-label">Color</label>
							<select id="colorInput" class="form-input" bind:value={form.color}>
								<option value="" disabled selected>Select color</option>
								<option value="bg-primary-500">Primary</option>
								<option value="bg-green-500">Green</option>
								<option value="bg-purple-500">Purple</option>
							</select>
							{#if errors.color}
								<span class="text-red-500">{errors.color}</span>
							{/if}
						</div>
						<div class="col-span-12">
							<label for="locationInput" class="form-label">Location</label>
							<input
								type="text"
								id="locationInput"
								bind:value={form.location}
								class="form-input"
								placeholder="Enter location"
							/>
							{#if errors.location}
								<span class="text-red-500">{errors.location}</span>
							{/if}
						</div>
						<div class="col-span-12">
							<label for="guestInput" class="form-label">Add Guests</label>
							<div class="relative">
								<input
									type="email"
									id="guestInput"
									bind:value={form.guestEmail}
									class="form-input ltr:pr-14 rtl:pl-14"
									placeholder="example@SRBThemes.com"
								/>
								<button
									type="button"
									on:click={addGuest}
									class="btn btn-sub-primary btn-sm absolute top-1.5 ltr:right-1.5 rtl:left-1.5"
								>
									Add
								</button>
							</div>
							<div class="mt-2 flex gap-2">
								{#each form.guests as guest, index}
									<div class="relative size-9 rounded-full">
										<img src={guest.image} alt="Guest Avatar" class="h-8 w-8 rounded-full" />
										<a
											href="#!"
											aria-label="Close"
											on:click={() => removeGuest(index)}
											class="dark:bg-dark-500 dark:border-dark-900 absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full border-2 border-white bg-gray-500 text-white"
										>
											<i class="ri-close-line text-xs"></i>
										</a>
									</div>
								{/each}
							</div>
							{#if errors.guestEmail}
								<span class="text-red-500">{errors.guestEmail}</span>
							{/if}
						</div>
						<div class="col-span-12">
							<div class="flex items-center justify-end gap-2">
								<ModalClose {modalId}><button class="btn btn-active-red">Cancel</button></ModalClose
								>
								<button type="submit" class="btn btn-primary">Save</button>
							</div>
						</div>
					</div>
				</form>
			</ModalBody>
		</Modal>
	</div>

	<Card>
		<CardBody>
			<div bind:this={calendarContainer}></div>
		</CardBody>
	</Card>
</div>
