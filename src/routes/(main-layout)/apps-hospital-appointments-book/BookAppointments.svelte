<script lang="ts">
	import FlatePicker from '$lib/components/forms/form-picker/FlatePicker.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';

	let form = {
		name: '',
		email: '',
		phone: '',
		date: '',
		time: '',
		doctorName: '',
		treatment: '',
		startTime: ''
	};

	let errors: { [key: string]: string } = {};

	function validateField(fieldName: string, fieldValue: string, errorMessage: string): void {
		if (!fieldValue) {
			errors[fieldName] = errorMessage;
		} else {
			delete errors[fieldName];
		}
	}

	function validateRadioGroup(form: HTMLFormElement, groupName: string, errorKey: string): void {
		const radioButtons = form.querySelectorAll(
			`input[name="${groupName}"]`
		) as NodeListOf<HTMLInputElement>;
		const isChecked = Array.from(radioButtons).some((radio) => radio.checked);

		if (!isChecked) {
			errors[errorKey] = `${groupName.charAt(0).toUpperCase() + groupName.slice(1)} is required.`;
		} else {
			delete errors[errorKey];
		}

		// Add event listeners for real-time validation
		radioButtons.forEach((radio) => {
			radio.addEventListener('change', () => {
				validateRadioGroup(form, groupName, errorKey);
			});
		});
	}

	function validateForm(e: Event): boolean {
		e.preventDefault();

		// Initialize the errors object
		errors = {};

		// Validate fields
		validateField('name', form.name, 'Patient name is required.');
		validateField('email', form.email, 'Email is required.');
		validateField('phone', form.phone, 'Phone is required.');
		validateField('date', form.date, 'Date is required.');
		// validateField(
		//   'doctorName',
		//   (document.querySelector('#doctorSelect') as HTMLSelectElement).value,
		//   'Doctor name is required.'
		// );
		validateField('treatment', form.treatment, 'Treatment is required.');

		// Ensure e.target is a valid HTMLFormElement
		const formElement = (e.target as HTMLElement).closest('form') as HTMLFormElement | null;

		if (!formElement) {
			console.error('Form element not found!');
			return false; // If no form is found, return false or handle accordingly
		}

		// Validate radio groups
		validateRadioGroup(formElement, 'startTime', 'startTime');
		validateRadioGroup(formElement, 'endTime', 'endTime');

		// Return true if no errors
		return Object.keys(errors).length === 0;
	}

	function onSubmit(e: Event): void {
		e.preventDefault();
		const formElement = (e.target as HTMLFormElement).closest('form');

		if (validateForm(e)) {
			formElement?.reset();
		} else {
			formElement?.reportValidity();
		}
	}

	function reset(e: Event): void {
		errors = {};
		const formElement = (e.target as HTMLFormElement).closest('form');
		formElement?.reset();
	}
</script>

<Col cols={{ span: 12 }} xl={{ span: 8 }} class="card 2xl:col-span-9">
	<CardHeader>
		<CardTitle>Appointment Book</CardTitle>
	</CardHeader>
	<CardBody>
		<form action="#!" on:submit={onSubmit}>
			<div class="gap-space grid grid-cols-12">
				<Col cols={{ span: 12 }}>
					<label for="patientNameInput" class="form-label">Patient Name</label>
					<input
						type="text"
						id="patientNameInput"
						class="form-input"
						bind:value={form.name}
						placeholder="Enter your patient name"
					/>
					{#if errors.name}
						<span class="text-red-500">{errors.name}</span>
					{/if}
				</Col>

				<Col cols={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }}>
					<label for="emailInput" class="form-label">Email</label>
					<input
						type="email"
						id="emailInput"
						class="form-input"
						bind:value={form.email}
						placeholder="Enter your email"
					/>
					{#if errors.email}
						<span class="text-red-500">{errors.email}</span>
					{/if}
				</Col>

				<Col cols={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }}>
					<label for="phoneNumberInput" class="form-label">Phone Number</label>
					<input
						type="number"
						id="phoneNumberInput"
						class="form-input"
						bind:value={form.phone}
						placeholder="(00) 000 00 0000"
					/>
					{#if errors.phone}
						<span class="text-red-500">{errors.phone}</span>
					{/if}
				</Col>

				<Col cols={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }}>
					<label for="selectDateInput" class="form-label">Select Date</label>
					<FlatePicker
						bind:value={form.date}
						dateFormat="Y-m-d"
						on:input={() => validateField('date', form.date, 'Date is required.')}
					/>
					{#if errors.date}
						<span class="text-red-500">{errors.date}</span>
					{/if}
				</Col>

				<div class="col-span-12">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="form-label">Start Time</label>
					<div class="flex flex-wrap gap-2 md:gap-5">
						<div class="input-radio-group">
							<input
								id="timeRadio1"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio1"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								09:00 AM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio2"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio2"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								09:30 AM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio3"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
								disabled
							/>
							<label
								for="timeRadio3"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								10:00 AM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio4"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio4"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								10:30 AM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio5"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio5"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								11:00 AM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio6"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio6"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								11:30 AM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio7"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio7"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								12:00 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio8"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio8"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								12:30 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio9"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio9"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								01:00 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio10"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio10"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								01:30 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio11"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio11"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								02:00 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio12"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio12"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								02:30 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio13"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
								disabled
							/>
							<label
								for="timeRadio13"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								03:00 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio14"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio14"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								03:30 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio15"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio15"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								04:00 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio16"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio16"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								04:30 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio17"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio17"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								05:00 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio18"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio18"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								05:30 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="timeRadio19"
								class="input-radio peer hidden"
								name="startTime"
								type="radio"
							/>
							<label
								for="timeRadio19"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								06:00 PM
							</label>
						</div>
					</div>
					{#if errors.startTime}
						<span class="text-red-500">{errors.startTime}</span>
					{/if}
				</div>
				<div class="col-span-12">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="form-label">End Time</label>
					<div class="flex flex-wrap gap-2 md:gap-5">
						<div class="input-radio-group">
							<input id="dateRadio1" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio1"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								09:00 AM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio2" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio2"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								09:30 AM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio3" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio3"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								10:00 AM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="dateRadio4"
								class="input-radio peer hidden"
								name="endTime"
								type="radio"
								disabled
							/>
							<label
								for="dateRadio4"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								10:30 AM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio5" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio5"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								11:00 AM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio6" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio6"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								11:30 AM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio7" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio7"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								12:00 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio8" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio8"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								12:30 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio9" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio9"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								01:00 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio10" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio10"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								01:30 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio11" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio11"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								02:00 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio12" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio12"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								02:30 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input
								id="dateRadio13"
								class="input-radio peer hidden"
								name="endTime"
								type="radio"
								disabled
							/>
							<label
								for="dateRadio13"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								03:00 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio14" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio14"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								03:30 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio15" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio15"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								04:00 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio16" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio16"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								04:30 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio17" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio17"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								05:00 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio18" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio18"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								05:30 PM
							</label>
						</div>
						<div class="input-radio-group">
							<input id="dateRadio19" class="input-radio peer hidden" name="endTime" type="radio" />
							<label
								for="dateRadio19"
								class="input-radio-label dark:border-dark-800 peer-checked:border-primary-500 dark:peer-checked:border-primary-500 dark:peer-disabled:bg-dark-850 dark:peer-disabled:text-dark-500 inline-block rounded-md border border-gray-200 px-3 py-1.5 peer-disabled:bg-gray-100 peer-disabled:text-gray-500"
							>
								06:00 PM
							</label>
						</div>
					</div>
					{#if errors.endTime}
						<span class="text-red-500">{errors.endTime}</span>
					{/if}
				</div>
				<div class="col-span-12">
					<label for="doctorSelect" class="form-label">Doctor Name</label>
					<select name="" id="" class="form-input">
						<option value="" selected hidden disabled>Select Doctor</option>
						<option value="dr.michael_johnson">Dr. Michael Johnson</option>
						<option value="dr.sarah_evans">Dr. Sarah Evans</option>
						<option value="dr.emily_carter">Dr. Emily Carter</option>
						<option value="dr.robert_harris">Dr. Robert Harris</option>
					</select>
					{#if errors.doctorName}
						<span class="text-red-500">{errors.doctorName}</span>
					{/if}
				</div>
				<div class="col-span-12">
					<label for="treatmentInput" class="form-label">Treatment</label>
					<textarea
						bind:value={form.treatment}
						name="treatmentInput"
						id="treatmentInput"
						class="form-input h-auto"
						rows="3"
					></textarea>
					{#if errors.treatment}
						<span class="text-red-500">{errors.treatment}</span>
					{/if}
				</div>
				<div class="col-span-12">
					<div class="flex flex-wrap items-center justify-end gap-2">
						<button type="reset" on:click={reset} class="btn btn-sub-gray">Reset</button>
						<button class="btn btn-primary" on:submit={onSubmit}>Book Appointment</button>
					</div>
				</div>
			</div>
		</form>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 4 }} class="2xl:col-span-3">
	<Card class="!border-green-500/20 bg-green-100 dark:bg-green-500/15">
		<CardBody>
			<h6 class="mb-3">Hospital Hours</h6>

			<p class="dark:!text-dark-400 mb-2 text-gray-500">Monday - Friday 09:00AM - 06:00PM</p>
			<p class="dark:!text-dark-400 mb-4 text-gray-500">Saturday 09:00AM - 03:00PM</p>

			<h6 class="mb-3">Sunday Closed</h6>
			<p class="text-red-500">* Every 2nd, 4th Saturday and all govt holidays are closed.</p>
		</CardBody>
	</Card>
</Col>
