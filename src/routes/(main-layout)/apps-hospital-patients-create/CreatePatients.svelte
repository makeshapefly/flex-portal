<script lang="ts">
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import IMask, { InputMask } from 'imask';
	import { onMount } from 'svelte';
	import FlatePicker from '$lib/components/forms/form-picker/FlatePicker.svelte';

	// Type definitions
	interface CountryCode {
		name: string;
		code: string;
		dial_code: string;
		format: string;
	}

	let intCodes: CountryCode[] = [];
	let selectedDialCode: string = '';
	let selectedFormat: string = '';

	// Explicitly type the phone inputs to HTMLInputElement | null
	let phoneInput: HTMLInputElement | null = null;
	let emergencyPhoneInput: HTMLInputElement | null = null;

	// Initialize country codes and apply mask
	onMount(async () => {
		try {
			const response = await fetch('assets/json/country-code.js');
			const data = await response.json();
			intCodes = data;

			if (intCodes.length > 0) {
				selectedDialCode = intCodes[0].dial_code;
				selectedFormat = intCodes[0].format;
				applyMask();
			}
		} catch (error) {
			console.error('Error loading country codes:', error);
		}
	});

	let maskInstance: InputMask<{ mask: string }>;

	const applyMask = () => {
		if (maskInstance) {
			maskInstance.destroy();
		}
		if (phoneInput) {
			maskInstance = IMask(phoneInput, {
				mask: selectedFormat.replace(/0/g, '0').replace(/9/g, '0').replace(/A/g, 'A*')
			});
		}
	};

	// Handle dial code change event
	const onSelectChangeHandler = () => {
		const selectedCountry = intCodes.find((country) => country.dial_code === selectedDialCode);
		if (selectedCountry) {
			selectedFormat = selectedCountry.format;
			applyMask();
		}
	};

	let formData = {
		firstName: '',
		middleName: '',
		lastName: '',
		dateOfBirth: '',
		age: '',
		gender: '',
		weight: '',
		height: '',
		bloodPressure: '',
		email: '',
		occupation: '',
		city: '',
		state: '',
		country: '',
		zipCode: '',
		familyDoctorName: '',
		referringDoctorName: '',
		assignedDoctorName: '',
		pharmacyDoctorName: '',
		insuranceProvider: '',
		policyNumber: '',
		startDate: '',
		effectiveDate: ''
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		const form = e.target.closest('form');
		if (form.checkValidity()) {
			form.reset();
		} else {
			form.reportValidity();
		}
	};
</script>

<Card>
	<CardHeader>
		<CardTitle>Patient Personal Details</CardTitle>
	</CardHeader>
	<CardBody>
		<form on:submit={onSubmit} novalidate>
			<div class="gap-space grid grid-cols-12">
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="firstNameInput" class="form-label"
						>First Name <span class="text-red-500">*</span></label
					>
					<input
						bind:value={formData.firstName}
						type="text"
						id="firstNameInput"
						class="form-input"
						placeholder="Enter your first name"
						required
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="middleNameInput" class="form-label">Middle Name</label>
					<input
						bind:value={formData.middleName}
						type="text"
						id="middleNameInput"
						class="form-input"
						placeholder="Enter your middle name"
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="lastNameInput" class="form-label"
						>Last Name <span class="text-red-500">*</span></label
					>
					<input
						bind:value={formData.lastName}
						type="text"
						id="lastNameInput"
						class="form-input"
						placeholder="Enter your last name"
						required
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="dateOfBirthInput" class="form-label"
						>Date of Birth <span class="text-red-500">*</span></label
					>
					<FlatePicker bind:value={formData.dateOfBirth} dateFormat="Y-m-d" />
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="ageInput" class="form-label">Age <span class="text-red-500">*</span></label>
					<input
						bind:value={formData.age}
						type="number"
						id="ageInput"
						class="form-input"
						placeholder="0"
						required
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="genderSelect" class="form-label"
						>Gender <span class="text-red-500">*</span></label
					>
					<select
						bind:value={formData.gender}
						id="genderSelect"
						class={`form-input ${!formData.gender ? 'text-gray-400' : ''}`}
						required
					>
						<option value="" disabled selected hidden>Select</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="weightInput" class="form-label"
						>Weight (KG) <span class="text-red-500">*</span></label
					>
					<input
						bind:value={formData.weight}
						type="text"
						id="weightInput"
						class="form-input"
						placeholder="0 kg"
						required
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="heightInput" class="form-label"
						>Height <span class="text-red-500">*</span></label
					>
					<input
						bind:value={formData.height}
						type="text"
						id="heightInput"
						class="form-input"
						placeholder="0' 0'"
						required
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="bloodPressureInput" class="form-label"
						>Blood Pressure <span class="text-red-500">*</span></label
					>
					<input
						bind:value={formData.bloodPressure}
						type="text"
						id="bloodPressureInput"
						class="form-input"
						placeholder="Blood pressure"
						required
					/>
				</div>
				<div class="col-span-12 md:col-span-6">
					<label for="phoneNumber" class="form-label"
						>Phone Number <span class="text-red-500">*</span></label
					>
					<div class="form-input flex">
						<select
							bind:value={selectedDialCode}
							on:change={onSelectChangeHandler}
							class="dark:bg-dark-900 cursor-pointer bg-transparent outline-hidden ltr:pl-3 rtl:pr-3"
						>
							{#each intCodes as country (country.code)}
								<option value={country.dial_code}>{country.name}</option>
							{/each}
						</select>
						<input
							bind:this={phoneInput}
							type="text"
							class="dark:border-dark-800 w-full border-gray-200 bg-transparent p-3 outline-hidden ltr:ml-3 ltr:border-l-2 rtl:mr-3 rtl:border-r-2"
							placeholder="020 123 4567"
							required
						/>
					</div>
				</div>
				<div class="col-span-12 md:col-span-6">
					<label for="emergencyNumber" class="form-label"
						>Emergency Number <span class="text-red-500">*</span></label
					>
					<div class="form-input flex">
						<select
							bind:value={selectedDialCode}
							on:change={onSelectChangeHandler}
							class="dark:bg-dark-900 cursor-pointer bg-transparent outline-hidden ltr:pl-3 rtl:pr-3"
						>
							{#each intCodes as country (country.code)}
								<option value={country.dial_code}>{country.name}</option>
							{/each}
						</select>
						<input
							bind:this={phoneInput}
							type="text"
							class="dark:border-dark-800 w-full border-gray-200 bg-transparent p-3 outline-hidden ltr:ml-3 ltr:border-l-2 rtl:mr-3 rtl:border-r-2"
							placeholder="020 123 4567"
							required
						/>
					</div>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="emailInput" class="form-label">
						Email <span class="text-red-500">*</span>
					</label>
					<input
						bind:value={formData.email}
						type="email"
						id="emailInput"
						class="form-input"
						placeholder="example@example.com"
						required
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="occupationInput" class="form-label"
						>Occupation <span class="text-red-500">*</span></label
					>
					<input
						bind:value={formData.occupation}
						type="text"
						id="occupationInput"
						class="form-input"
						placeholder="Enter your occupation"
						required
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="cityInput" class="form-label">City <span class="text-red-500">*</span></label>
					<input
						bind:value={formData.city}
						type="text"
						id="cityInput"
						class="form-input"
						placeholder="Enter city name"
						required
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="stateInput" class="form-label"
						>State Name <span class="text-red-500">*</span></label
					>
					<input
						bind:value={formData.state}
						type="text"
						id="stateInput"
						class="form-input"
						placeholder="Enter state name"
						required
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="countryInput" class="form-label"
						>Country Name <span class="text-red-500">*</span></label
					>
					<input
						bind:value={formData.country}
						type="text"
						id="countryInput"
						class="form-input"
						placeholder="Enter country name"
						required
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="zipCodeInput" class="form-label"
						>Zip Code <span class="text-red-500">*</span></label
					>
					<input
						bind:value={formData.zipCode}
						type="number"
						id="zipCodeInput"
						class="form-input"
						placeholder="000 000"
						required
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-3">
					<label for="familyDoctorName" class="form-label"> Family Doctor </label>
					<input
						type="text"
						id="familyDoctorName"
						class="form-input"
						placeholder="Enter doctor name"
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-3">
					<label for="familyDoctorName" class="form-label"> Referring Doctor </label>
					<input
						type="text"
						id="familyDoctorName"
						class="form-input"
						placeholder="Referring doctor"
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-3">
					<label for="familyDoctorName" class="form-label"> Assigned Doctor </label>
					<input
						type="text"
						id="familyDoctorName"
						class="form-input"
						placeholder="Assigned doctor"
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-3">
					<label for="familyDoctorName" class="form-label"> Pharmacy Name</label>
					<input type="text" id="familyDoctorName" class="form-input" placeholder="Pharmacy Name" />
				</div>

				<div class="col-span-12">
					<div class="flex items-center justify-end gap-2">
						<button type="submit" class="btn btn-primary">Submit Now</button>
						<button type="reset" class="btn btn-sub-gray">Reset</button>
					</div>
				</div>
			</div>
		</form>
	</CardBody>
</Card>

<Card>
	<CardHeader>
		<CardTitle>Insurance Information</CardTitle>
	</CardHeader>
	<CardBody>
		<form on:submit={onSubmit}>
			<div class="gap-space grid grid-cols-12">
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="insuranceProviderInput" class="form-label"
						>Insurance Provider <span class="text-red-500">*</span></label
					>
					<input
						type="text"
						id="insuranceProviderInput"
						class="form-input"
						placeholder="Insurance provider"
						bind:value={formData.insuranceProvider}
						pattern="[A-Za-z ]+"
						title="Only letters and spaces allowed"
						required
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="policyNumberInput" class="form-label"
						>Policy Number <span class="text-red-500">*</span></label
					>
					<input
						type="text"
						id="policyNumberInput"
						class="form-input"
						placeholder="000 0000 0000 0000 000"
						bind:value={formData.policyNumber}
						pattern="^[A-Za-z0-9]+$"
						title="Policy number can only contain letters and numbers"
						required
					/>
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="startDateInput" class="form-label"
						>Start Date <span class="text-red-500">*</span></label
					>
					<FlatePicker bind:value={formData.startDate} dateFormat="Y-m-d" />
				</div>
				<div class="col-span-12 md:col-span-6 xl:col-span-4">
					<label for="effectiveDateInput" class="form-label"
						>Effective Date <span class="text-red-500">*</span></label
					>
					<FlatePicker bind:value={formData.effectiveDate} dateFormat="Y-m-d" />
				</div>
				<div class="col-span-12">
					<div class="flex items-center justify-end gap-2">
						<button type="submit" class="btn btn-primary">Save Now</button>
						<button type="reset" class="btn btn-sub-gray">Reset</button>
					</div>
				</div>
			</div>
		</form>
	</CardBody>
</Card>
