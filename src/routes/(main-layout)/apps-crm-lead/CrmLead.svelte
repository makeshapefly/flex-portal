<script lang="ts">
	import { onMount } from 'svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import ModalClose from '$lib/components/ui/modal/ModalClose.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import Sortable from 'sortablejs';
	import { leadsData } from './lead-list';

	interface Lead {
		id: number; // Changing id to number
		image: string;
		name: string;
		date: string;
		time: string;
		email: string;
		phoneNumber: string;
		status: 'New' | 'Hot' | 'Pending' | 'Lost'; // Fixed status types
	}

	// Define lead arrays with type annotation
	let newLeads: Lead[] = leadsData.filter((lead) => lead.status === 'New');
	let hotLeads: Lead[] = leadsData.filter((lead) => lead.status === 'Hot');
	let pendingLeads: Lead[] = leadsData.filter((lead) => lead.status === 'Pending');
	let lostLeads: Lead[] = leadsData.filter((lead) => lead.status === 'Lost');
	let selectedLeads: Lead[] = [];
	let filteredNewLeads: Lead[] = newLeads;
	let filteredHotLeads: Lead[] = hotLeads;
	let filteredPendingLeads: Lead[] = pendingLeads;
	let filteredLostLeads: Lead[] = lostLeads;
	let searchTerm: string = '';

	// Filter leads based on search term
	$: {
		filteredNewLeads = newLeads.filter(
			(lead) =>
				lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				lead.email.toLowerCase().includes(searchTerm.toLowerCase())
		);

		filteredHotLeads = hotLeads.filter(
			(lead) =>
				lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				lead.email.toLowerCase().includes(searchTerm.toLowerCase())
		);

		filteredPendingLeads = pendingLeads.filter(
			(lead) =>
				lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				lead.email.toLowerCase().includes(searchTerm.toLowerCase())
		);

		filteredLostLeads = lostLeads.filter(
			(lead) =>
				lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				lead.email.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}

	interface ContactForm {
		name: string;
		email: string;
		phoneNumber: string;
		image: string | null;
		status: string;
	}

	// Define the structure of the errors object
	interface Errors {
		name?: string;
		email?: string;
		phoneNumber?: string;
		image?: string;
		status?: string;
	}

	// Reactive state for form and errors
	let contactForm: ContactForm = {
		name: '',
		email: '',
		phoneNumber: '',
		image: '',
		status: ''
	};

	let errors: Errors = {};

	// Validation function to check each field
	const validateField = (
		fieldName: keyof ContactForm,
		fieldValue: string | null,
		errorMessage: string,
		validationFunction?: (value: string) => boolean
	) => {
		if (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
			errors[fieldName] = errorMessage;
		} else if (validationFunction && !validationFunction(fieldValue)) {
			errors[fieldName] = `Invalid ${fieldName} format.`;
		} else {
			delete errors[fieldName];
		}
	};

	// Email validation
	const validateEmail = (email: string): boolean => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email.toLowerCase());
	};

	// Phone number formatting and validation
	const formatPhone = (): void => {
		let rawNumber = contactForm.phoneNumber.replace(/[^\d]/g, '');
		let formattedNumber = rawNumber.replace(/^(\d{1,3})(\d{0,4})(\d{0,4})$/, '+($1) $2 $3').trim();
		const phonePattern = /^\+\(\d{3}\) \d{4} \d{4}$/;
		if (!phonePattern.test(formattedNumber)) {
			errors.phoneNumber = 'Phone number must be in the format +(XXX) YYYY ZZZZ';
		} else {
			errors.phoneNumber = '';
		}
		contactForm.phoneNumber = formattedNumber;
	};

	// Validate all fields
	const validateForm = (): boolean => {
		errors = {}; // Reset errors
		validateField('name', contactForm.name, 'Full name is required.');
		validateField('email', contactForm.email, 'Email is required.', validateEmail);
		formatPhone();
		validateField('phoneNumber', contactForm.phoneNumber, 'Phone number is required.');
		validateField('image', contactForm.image, 'Image is required.');
		validateField('status', contactForm.status, 'Status is required.');
		return Object.keys(errors).length === 0;
	};

	// Add a new contact (lead)
	const addContact = (): void => {
		if (validateForm()) {
			const newLead: Lead = {
				id: leadsData.length + 1,
				image: contactForm.image || '',
				name: contactForm.name,
				date: new Date().toLocaleDateString(),
				time: new Date().toLocaleTimeString(),
				email: contactForm.email,
				phoneNumber: contactForm.phoneNumber,
				status: contactForm.status as 'New' | 'Hot' | 'Pending' | 'Lost'
			};

			// Add the new lead to leadsData
			leadsData.unshift(newLead);
			categorizeLeads();
			resetForm();
		}
	};

	// Submit the form
	const submitForm = (): void => {
		addContact();
	};

	// Reset the form
	const resetForm = (): void => {
		contactForm = {
			name: '',
			email: '',
			phoneNumber: '',
			image: '',
			status: ''
		};
		errors = {};
	};

	const toggleSelection = (lead: Lead) => {
		if (selectedLeads.includes(lead)) {
			selectedLeads = selectedLeads.filter((l) => l !== lead);
		} else {
			selectedLeads = [...selectedLeads, lead];
		}
	};

	// Initialize Sortable for drag-and-drop functionality
	const initSortable = (): void => {
		// Select all containers where leads can be dropped
		const containers: HTMLElement[] = [
			document.querySelector('#leads-container')!,
			document.querySelector('#hotLead-container')!,
			document.querySelector('#pendingLead-container')!,
			document.querySelector('#lostLead-container')!
		];

		containers.forEach((container) => {
			new Sortable(container, {
				group: 'leads', // Shared group between all containers
				onEnd(evt) {
					const leadId = Number(evt.item.dataset.id!);
					const status =
						evt.to.dataset.status!.charAt(0).toUpperCase() + evt.to.dataset.status!.slice(1);

					// Find the lead in the appropriate array and update its status
					let leadIndex: number;
					let leadToUpdate: Lead | undefined;

					switch (status) {
						case 'New':
							leadIndex = newLeads.findIndex((lead) => lead.id == leadId);
							leadToUpdate = newLeads[leadIndex];
							break;
						case 'Hot':
							leadIndex = hotLeads.findIndex((lead) => lead.id == leadId);
							leadToUpdate = hotLeads[leadIndex];
							break;
						case 'Pending':
							leadIndex = pendingLeads.findIndex((lead) => lead.id == leadId);
							leadToUpdate = pendingLeads[leadIndex];
							break;
						case 'Lost':
							leadIndex = lostLeads.findIndex((lead) => lead.id == leadId);
							leadToUpdate = lostLeads[leadIndex];
							break;
						default:
							console.warn(`Unknown status: ${status}`);
							return;
					}

					if (leadToUpdate) {
						leadToUpdate.status = status; // Update the lead's status
						categorizeLeads(); // Re-categorize the leads after the change
					}
				}
			});
		});
	};

	// Categorize leads after a status update
	const categorizeLeads = (): void => {
		newLeads = leadsData.filter((lead) => lead.status === 'New');
		hotLeads = leadsData.filter((lead) => lead.status === 'Hot');
		pendingLeads = leadsData.filter((lead) => lead.status === 'Pending');
		lostLeads = leadsData.filter((lead) => lead.status === 'Lost');
	};

	onMount(() => {
		initSortable();
	});
</script>

<CardHeader>
	<Grid cols={12} gap={5}>
		<Col cols={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 9 }}>
			<div class="group/form relative w-full xl:max-w-[300px]">
				<input
					type="text"
					bind:value={searchTerm}
					class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
					placeholder="Search for leads..."
				/>
				<div
					class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
				>
					<LucideIcon name="Search" class="size-4" />
				</div>
			</div>
		</Col>
		<Col cols={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 3 }}>
			<div class="justify-end gap-2 sm:flex">
				<ModalTrigger modalId="add-lead" text="Add Lead" class="btn gap-1" color="primary" icon="Plus" />
			</div>
		</Col>
	</Grid>
</CardHeader>

<CardBody>
	<Simplebar>
		<div class="flex space-x-4">
			<div class="dark:bg-dark-850 w-[350px] shrink-0 rounded-md bg-gray-100 p-5">
				<h6 class="mb-4">
					New <span class="badge badge-sky ltr:ml-1 rtl:mr-1">{newLeads.length}</span>
				</h6>
				<Simplebar class="-mx-5 max-h-[calc(100vh_-_25.1rem)] px-5">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="space-y-2" id="leads-container" data-status="new">
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						{#each filteredNewLeads as lead (lead.id)}
							<div
								draggable="true"
								class="dark:bg-dark-900 dark:border-dark-900 rounded border border-white bg-white p-3 {selectedLeads.includes(
									lead
								)
									? 'selected'
									: ''}"
								on:click={() => toggleSelection(lead)}
							>
								<div class="mb-4 flex items-center gap-3">
									<div class="size-12 rounded-full">
										<img src={lead.image} alt={lead.name} class="rounded-full" />
									</div>
									<div class="grow">
										<h6 class="mb-1">{lead.name}</h6>
										<p class="dark:text-dark-500 text-sm text-gray-500">
											<i class="ri-time-line"></i> <span>{lead.date}</span> at
											<span>{lead.time}</span>
										</p>
									</div>
								</div>
								<p class="mb-2">
									<i class="ri-mail-line ltr:mr-1 rtl:ml-1"></i>
									<span class="dark:text-dark-500 text-gray-500">{lead.email}</span>
								</p>
								<p>
									<i class="ri-phone-line ltr:mr-1 rtl:ml-1"></i>
									<span class="dark:text-dark-500 text-gray-500">{lead.phoneNumber}</span>
								</p>
								<div class="mt-3 flex items-center gap-3">
									<a href="#!" data-modal-target="leadCreateModal" class="link link-primary">Edit</a
									>
									<!-- <ModalTrigger modalId="leadCreateModal" color="light" text="Edit" /> -->
									<a href="#!" data-modal-target="leadCreateModal" class="link link-primary"
										>Delete</a
									>
									<!-- <ModalTrigger class="link link-primary" modalId="delete-modal" text="Delete" color="light"></ModalTrigger> -->
								</div>
							</div>
						{/each}
						{#if filteredNewLeads.length === 0}
							<TableRowNotFound />
						{/if}
					</div>
				</Simplebar>
			</div>

			<div class="dark:bg-dark-850 w-[350px] shrink-0 rounded-md bg-gray-100 p-5">
				<h6 class="mb-4">
					Hot <span class="badge badge-red ltr:ml-1 rtl:mr-1">{hotLeads.length}</span>
				</h6>
				<Simplebar class="-mx-5 max-h-[calc(100vh_-_25.1rem)] px-5">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="space-y-2" id="hotLead-container" data-status="hot">
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						{#each filteredHotLeads as lead (lead.id)}
							<div
								draggable="true"
								class="dark:bg-dark-900 dark:border-dark-900 rounded border border-white bg-white p-3 {selectedLeads.includes(
									lead
								)
									? 'selected'
									: ''}"
								on:click={() => toggleSelection(lead)}
							>
								<div class="mb-4 flex items-center gap-3">
									<div class="size-12 rounded-full">
										<img src={lead.image} alt={lead.name} class="rounded-full" />
									</div>
									<div class="grow">
										<h6 class="mb-1">{lead.name}</h6>
										<p class="dark:text-dark-500 text-sm text-gray-500">
											<i class="ri-time-line"></i> <span>{lead.date}</span> at
											<span>{lead.time}</span>
										</p>
									</div>
								</div>
								<p class="mb-2">
									<i class="ri-mail-line ltr:mr-1 rtl:ml-1"></i>
									<span class="dark:text-dark-500 text-gray-500">{lead.email}</span>
								</p>
								<p>
									<i class="ri-phone-line ltr:mr-1 rtl:ml-1"></i>
									<span class="dark:text-dark-500 text-gray-500">{lead.phoneNumber}</span>
								</p>
								<div class="mt-3 flex items-center gap-3">
									<a href="#!" data-modal-target="leadCreateModal" class="link link-primary">Edit</a
									>
									<!-- <ModalTrigger modalId="leadCreateModal" color="light" text="Edit" /> -->
									<a href="#!" data-modal-target="leadCreateModal" class="link link-primary"
										>Delete</a
									>
									<!-- <ModalTrigger modalId="delete-modal" text="Delete" color="light"></ModalTrigger> -->
								</div>
							</div>
						{/each}
						{#if filteredHotLeads.length === 0}
							<TableRowNotFound />
						{/if}
					</div>
				</Simplebar>
			</div>

			<div class="dark:bg-dark-850 w-[350px] shrink-0 rounded-md bg-gray-100 p-5">
				<h6 class="mb-4">
					Pending <span class="badge badge-green ltr:ml-1 rtl:mr-1">{pendingLeads.length}</span>
				</h6>
				<Simplebar class="-mx-5 max-h-[calc(100vh_-_25.1rem)] px-5">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="space-y-2" id="pendingLead-container" data-status="hot">
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						{#each filteredPendingLeads as lead (lead.id)}
							<div
								draggable="true"
								class="dark:bg-dark-900 dark:border-dark-900 rounded border border-white bg-white p-3 {selectedLeads.includes(
									lead
								)
									? 'selected'
									: ''}"
								on:click={() => toggleSelection(lead)}
							>
								<div class="mb-4 flex items-center gap-3">
									<div class="size-12 rounded-full">
										<img src={lead.image} alt={lead.name} class="rounded-full" />
									</div>
									<div class="grow">
										<h6 class="mb-1">{lead.name}</h6>
										<p class="dark:text-dark-500 text-sm text-gray-500">
											<i class="ri-time-line"></i> <span>{lead.date}</span> at
											<span>{lead.time}</span>
										</p>
									</div>
								</div>
								<p class="mb-2">
									<i class="ri-mail-line ltr:mr-1 rtl:ml-1"></i>
									<span class="dark:text-dark-500 text-gray-500">{lead.email}</span>
								</p>
								<p>
									<i class="ri-phone-line ltr:mr-1 rtl:ml-1"></i>
									<span class="dark:text-dark-500 text-gray-500">{lead.phoneNumber}</span>
								</p>
								<div class="mt-3 flex items-center gap-3">
									<a href="#!" data-modal-target="leadCreateModal" class="link link-primary">Edit</a
									>
									<!-- <ModalTrigger modalId="leadCreateModal" color="light" text="Edit" /> -->
									<a href="#!" data-modal-target="leadCreateModal" class="link link-primary"
										>Delete</a
									>
									<!-- <ModalTrigger modalId="delete-modal" text="Delete" color="light"></ModalTrigger> -->
								</div>
							</div>
						{/each}
						{#if filteredPendingLeads.length === 0}
							<TableRowNotFound />
						{/if}
					</div>
				</Simplebar>
			</div>

			<div class="dark:bg-dark-850 w-[350px] shrink-0 rounded-md bg-gray-100 p-5">
				<h6 class="mb-4">
					Lost <span class="badge badge-purple ltr:ml-1 rtl:mr-1">{lostLeads.length}</span>
				</h6>
				<Simplebar class="-mx-5 max-h-[calc(100vh_-_25.1rem)] px-5">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="space-y-2" id="lostLead-container" data-status="hot">
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						{#each filteredLostLeads as lead (lead.id)}
							<div
								draggable="true"
								class="dark:bg-dark-900 dark:border-dark-900 cursor-pointer rounded-sm bg-white p-3 opacity-75 {selectedLeads.includes(
									lead
								)
									? 'selected'
									: ''}"
								on:click={() => toggleSelection(lead)}
							>
								<div class="mb-4 flex items-center gap-3">
									<div class="size-12 rounded-full">
										<img src={lead.image} alt={lead.name} class="rounded-full" />
									</div>
									<div class="grow">
										<h6 class="mb-1">{lead.name}</h6>
										<p class="dark:text-dark-500 text-sm text-gray-500">
											<i class="ri-time-line"></i> <span>{lead.date}</span> at
											<span>{lead.time}</span>
										</p>
									</div>
								</div>
								<p class="mb-2">
									<i class="ri-mail-line ltr:mr-1 rtl:ml-1"></i>
									<span class="dark:text-dark-500 text-gray-500">{lead.email}</span>
								</p>
								<p>
									<i class="ri-phone-line ltr:mr-1 rtl:ml-1"></i>
									<span class="dark:text-dark-500 text-gray-500">{lead.phoneNumber}</span>
								</p>
								<div class="mt-3 flex items-center gap-3">
									<a href="#!" data-modal-target="leadCreateModal" class="link link-primary">Edit</a
									>
									<!-- <ModalTrigger modalId="leadCreateModal" color="light" text="Edit" /> -->
									<a href="#!" data-modal-target="leadCreateModal" class="link link-primary"
										>Delete</a
									>
									<!-- <ModalTrigger modalId="delete-modal" text="Delete" color="light"></ModalTrigger> -->
								</div>
							</div>
						{/each}
						{#if filteredLostLeads.length === 0}
							<TableRowNotFound />
						{/if}
					</div>
				</Simplebar>
			</div>
		</div>
	</Simplebar>
</CardBody>

<!-- add -->
<Modal modalId="add-lead" let:modalId>
	<ModalBody class="p-2 ">
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
							<!-- svelte-ignore a11y-missing-attribute -->
							<img src={contactForm.image} class="h-full w-full rounded-full object-cover" />
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
							accept="image/*"
							on:change={(e) => {
								if (e.target instanceof HTMLInputElement && e.target.files) {
									const file = e.target.files[0];
									if (file) {
										contactForm.image = URL.createObjectURL(file);
									}
								}
							}}
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
						bind:value={contactForm.name}
						on:input={() => validateField('name', contactForm.name, 'Full name is required.')}
					/>
					{#if errors.name}
						<span class="text-red-500">{errors.name}</span>
					{/if}
				</div>

				<div class="col-span-12">
					<label for="emailInput" class="form-label">Email</label>
					<input
						type="email"
						id="emailInput"
						class="form-input"
						placeholder="support@SRBThemes.com"
						bind:value={contactForm.email}
						on:input={() =>
							validateField('email', contactForm.email, 'Email is required.', validateEmail)}
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
						on:input={formatPhone}
					/>
					{#if errors.phoneNumber}
						<span class="text-red-500">{errors.phoneNumber}</span>
					{/if}
				</div>

				<div class="col-span-6">
					<label for="statusSelect2" class="form-label">Status</label>
					<select
						id="statusSelect2"
						bind:value={contactForm.status}
						on:change={() => validateField('status', contactForm.status, 'Status is required.')}
					>
						<option value="">Select Status</option>
						<option value="New">New</option>
						<option value="Hot">Hot</option>
						<option value="Pending">Pending</option>
						<option value="Lost">Lost</option>
					</select>
					{#if errors.status}
						<span class="text-red-500">{errors.status}</span>
					{/if}
				</div>

				<div class="col-span-12 mt-5 flex items-center justify-end gap-2">
					<button type="button" class="btn btn-active-red" on:click={resetForm}>
						<LucideIcon name="X" class="inline-block size-4" />
						<span class="align-baseline">Close</span>
					</button>
					<button type="button" class="btn btn-primary" on:click={submitForm}>
						<LucideIcon name="Plus" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
						{contactForm.name ? 'Add Lead' : 'Update Lead'}
					</button>
				</div>
			</div>
		</div>
	</ModalBody>
</Modal>

<!-- delete -->
<Modal modalId="delete-modal" let:modalId>
	<ModalHeader {modalId}>
		<h6>Delete File</h6>
	</ModalHeader>
	<ModalBody>
		<div class="p-7 text-center">
			<div
				class="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-red-500/10 text-red-500 backdrop-blur-xl"
			>
				<LucideIcon name="Trash2" class="size-6"></LucideIcon>
			</div>
			<h5 class="mb-4">Are you sure you want to delete this file?</h5>
			<div class="flex items-center justify-center gap-2">
				<button class="btn btn-red">Delete</button>
				<ModalClose {modalId} class="btn link link-primary">Cancel</ModalClose>
			</div>
		</div>
	</ModalBody>
</Modal>
