<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import { data } from './contact-crm';
	export let addForm: boolean;
	export let editMode = false;
	export let selectedCustomer: any | null = null;
	export let updateDisplayedContacts = () => {};

	let showAddContactForm = true;
	let startID = 24151;
	let contactForm = {
		image: '',
		contactName: '',
		company: '',
		role: '',
		email: '',
		phoneNumber: '',
		website: '',
		status: ''
	};
	let errors: Record<string, string> = {};

	$: if (editMode && selectedCustomer) {
		contactForm = {
			...(selectedCustomer as any)
		};
	}
	$: if (addForm && !editMode) {
		resetForm();
	}

	// Handle file input change (for image)
	const fileChosen = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			contactForm.image = URL.createObjectURL(input.files[0]);
		}
	};

	const validateField = (fieldName: string, fieldValue: string, errorMessage: string) => {
		if (!fieldValue) {
			errors[fieldName] = errorMessage;
		} else {
			delete errors[fieldName];
		}
	};

	// Validate email format
	const validateEmailField = () => {
		if (!contactForm.email) {
			errors.email = 'Email is required.';
		} else if (!validateEmail(contactForm.email)) {
			errors.email = 'Invalid email format.';
		} else {
			delete errors.email;
		}
	};

	// Validate URL format
	const validateURLField = () => {
		if (!contactForm.website) {
			errors.website = 'Website is required.';
		} else if (!validateURL(contactForm.website)) {
			errors.website = 'Invalid URL format.';
		} else {
			delete errors.website;
		}
	};

	// Simple email regex validation
	const validateEmail = (email: string) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(email).toLowerCase());
	};

	// Simple URL regex validation
	const validateURL = (url: string) => {
		const re = /^(?!.*http:\/\/|https:\/\/).*\.((com)|(in))$/;
		return re.test(url);
	};

	// Format the phone number
	const formatPhoneNumber = () => {
		let rawNumber = contactForm.phoneNumber.replace(/[^\d+]/g, '');
		if (rawNumber.startsWith('+')) {
			rawNumber = rawNumber.substring(1);
		}
		const formattedNumber = rawNumber.replace(/^(\d{3})(\d{0,4})(\d{0,5})$/, '+$1 $2 $3').trim();
		const phonePattern = /^\+\d{3} \d{4} \d{5}$/;

		if (!phonePattern.test(formattedNumber)) {
			errors.phoneNumber = 'Phone number must be in the format +XXX XXXX XXXXX';
		} else {
			errors.phoneNumber = '';
		}
		contactForm.phoneNumber = formattedNumber;
	};

	// Function to validate the entire form
	const validateForm = (): boolean => {
		errors = {};
		// Validate each field
		validateField('contactName', contactForm.contactName, 'Full name is required.');
		validateField('company', contactForm.company, 'Company name is required.');
		validateField('role', contactForm.role, 'Role is required.');
		validateEmailField();
		formatPhoneNumber();
		validateField('phoneNumber', contactForm.phoneNumber, 'Phone number is required.');
		validateField('image', contactForm.image, 'Image is required.');
		validateField('status', contactForm.status, 'Status is required.');
		validateURLField();

		return Object.keys(errors).length === 0;
	};
	const submitForm = () => {
		if (validateForm()) {
			const contactID = 'PEC-' + (startID + data.length).toString();

			if (showAddContactForm) {
				const newContact = { ...contactForm, id: contactID };
				data.unshift(newContact);
			} else {
				// @ts-ignore
				const index = contacts.findIndex((contact) => contact.id === contactForm.id);
				if (index !== -1) {
					data[index] = { ...contactForm };
				}
			}
			updateDisplayedContacts();
			resetForm();
		}
	};

	// Reset form to initial state
	const resetForm = () => {
		contactForm = {
			image: '',
			contactName: '',
			company: '',
			role: '',
			email: '',
			phoneNumber: '',
			website: '',
			status: ''
		};
		errors = {};
	};
</script>

<div
	class="from-primary-500/20 h-24 rounded-t bg-gradient-to-r via-pink-500/20 to-green-500/20 p-5"
></div>
<div class="p-4">
	<div class="-mt-16">
		<label for="logo">
			<div
				class="dark:border-dark-900 dark:bg-dark-850 inline-flex size-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-solid border-white bg-gray-100"
			>
				{#if contactForm.image}
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img
						src={contactForm.image}
						alt="Profile Image"
						class="h-full w-full rounded-full object-cover"
					/>
				{:else}
					<div class="dark:text-dark-500 flex flex-col items-center text-gray-500">
						<LucideIcon name="Upload"></LucideIcon>
					</div>
				{/if}
			</div>
		</label>
		<div class="mt-4 hidden">
			<label class="block">
				<span class="sr-only">Choose profile photo</span>
				<input
					type="file"
					name="logo"
					id="logo"
					on:change={fileChosen}
					class="block w-full text-sm text-slate-500 file:mr-4 file:rounded-md file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 focus:outline-0"
				/>
			</label>
		</div>
	</div>
	{#if errors.image}
		<span class="text-red-500">{errors.image}</span>
	{/if}

	<div class="mt-5 grid grid-cols-12 gap-4">
		<div class="col-span-12">
			<label for="fullNameInput" class="form-label">Full Name</label>
			<input
				type="text"
				id="fullNameInput"
				class="form-input"
				placeholder="Full name"
				bind:value={contactForm.contactName}
				on:input={() =>
					validateField('contactName', contactForm.contactName, 'Full name is required.')}
			/>
			{#if errors.contactName}
				<span class="text-red-500">{errors.contactName}</span>
			{/if}
		</div>

		<div class="col-span-12">
			<label for="companyNameInput" class="form-label">Company Name</label>
			<input
				type="text"
				id="companyNameInput"
				class="form-input"
				placeholder="Company name"
				bind:value={contactForm.company}
				on:input={() => validateField('company', contactForm.company, 'Company name is required.')}
			/>
			{#if errors.company}
				<span class="text-red-500">{errors.company}</span>
			{/if}
		</div>

		<div class="col-span-12">
			<label for="roleInput" class="form-label">Role</label>
			<input
				type="text"
				id="roleInput"
				class="form-input"
				placeholder="Role"
				bind:value={contactForm.role}
				on:input={() => validateField('role', contactForm.role, 'Role is required.')}
			/>
			{#if errors.role}
				<span class="text-red-500">{errors.role}</span>
			{/if}
		</div>

		<div class="col-span-12">
			<label for="emailInput" class="form-label">Email</label>
			<input
				type="email"
				id="emailInput"
				class="form-input"
				placeholder="support@example.com"
				bind:value={contactForm.email}
				on:input={validateEmailField}
			/>
			{#if errors.email}
				<span class="text-red-500">{errors.email}</span>
			{/if}
		</div>

		<div class="col-span-12">
			<label for="phoneNumberInput" class="form-label">Phone Number</label>
			<input
				type="tel"
				id="phoneNumberInput"
				class="form-input"
				placeholder="+(00) 0000 000"
				bind:value={contactForm.phoneNumber}
				on:input={formatPhoneNumber}
			/>
			{#if errors.phoneNumber}
				<span class="text-red-500">{errors.phoneNumber}</span>
			{/if}
		</div>

		<div class="col-span-6">
			<label for="websiteInput" class="form-label">Website</label>
			<input
				type="url"
				id="websiteInput"
				class="form-input"
				placeholder="www.domiex.com"
				bind:value={contactForm.website}
				on:input={validateURLField}
			/>
			{#if errors.website}
				<span class="text-red-500">{errors.website}</span>
			{/if}
		</div>

		<div class="col-span-6">
			<label for="statusSelect" class="form-label">Status</label>
			<select
				id="statusSelect"
				class="form-input"
				bind:value={contactForm.status}
				on:change={() => validateField('status', contactForm.status, 'Status is required.')}
			>
				<option value="">Select Status</option>
				<option value="Active">Customer</option>
				<option value="Personal">Personal</option>
				<option value="Employee">Employee</option>
				<option value="Marketing">Marketing</option>
			</select>
			{#if errors.status}
				<span class="text-red-500">{errors.status}</span>
			{/if}
		</div>

		<div class="col-span-12 mt-5 flex items-center justify-end gap-2">
			<button type="button" class="btn btn-active-red" on:click={resetForm}>
				<LucideIcon name="X" class="inline-block size-4" /> <span>Close</span>
			</button>
			<button type="button" class="btn btn-primary" on:click={submitForm}>
				{editMode ? 'Update Customer' : 'Add Customer'}
			</button>
		</div>
	</div>
</div>
