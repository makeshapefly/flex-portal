<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import { closeModal } from '$lib/stores/modal';
	import { projectListData } from './project-list';

	export let addForm: boolean;
	export let editMode = false;
	export let selectedCustomer: any | null = null;
	export let updateTable: () => void = () => {};

	interface ProjectForm {
		projectName: string;
		clientName: string;
		dueDate: string;
		totalAmount: string | number;
		progress: number|null;
		assignee: string;
		status: string;
	}

	interface FormErrors {
		[key: string]: string;
	}

	let projectForm: ProjectForm = {
		projectName: '',
		clientName: '',
		dueDate: '',
		totalAmount: '',
		progress: null,
		assignee: '',
		status: ''
	};

	// If in edit mode, prefill the form
	$: if (editMode && selectedCustomer) {
		projectForm = {
			...(selectedCustomer as any)
		};
	}
	$: if (addForm && !editMode) {
		resetForm();
	}

	let errors: FormErrors = {};
	function validateField(
		fieldName: string,
		fieldValue: string | number,
		errorMessage: string
	): void {
		if (
			!fieldValue ||
			(typeof fieldValue === 'string' && fieldValue.trim() === '') ||
			(typeof fieldValue === 'number' && isNaN(fieldValue))
		) {
			errors[fieldName] = errorMessage;
		} else {
			if (fieldName === 'progress') {
				if (typeof fieldValue === 'number' && (fieldValue < 0 || fieldValue > 100)) {
					errors[fieldName] = 'Progress must be between 0 and 100.';
					projectForm.progress = Math.max(0, Math.min(fieldValue, 100)); // Clamp the progress value
				} else {
					delete errors[fieldName];
				}
			} else {
				delete errors[fieldName];
			}
		}
	}

	function validateForm(): boolean {
		errors = {}; // Reset errors at the start
		// Validate each field
		validateField('projectName', projectForm.projectName, 'Project name is required.');
		validateField('clientName', projectForm.clientName, 'Client name is required.');
		validateField('dueDate', projectForm.dueDate, 'Due date is required.');
		validateField('totalAmount', projectForm.totalAmount, 'Total amount is required.');
		validateField('progress', projectForm.progress, 'Progress is required.');

		// Manually handle select fields (status and assignee)
		const statusSelect = document.querySelector('#statusSelect2') as HTMLSelectElement;
		const assignedSelect = document.querySelector('#assignedSelect') as HTMLSelectElement;

		if (statusSelect) {
			const statusValue = statusSelect.value;
			validateField('status', statusValue, 'Status is required.');
		} else {
			errors['status'] = 'Status field is not available.';
		}

		if (assignedSelect) {
			const assignedValue = assignedSelect.value;
			validateField('assignee', assignedValue, 'Assignee is required.');
		} else {
			errors['assignee'] = 'Assignee field is not available.';
		}

		// Return whether there are no errors
		return Object.keys(errors).length === 0;
	}

	function submitForm(): void {
		if (validateForm()) {
			// Create a new project object using the form data
			if (addForm) {
				addProject();
			} else {
				updateProject();
			}
			updateTable();
			closeModal();
		}
	}
	function addProject() {
		const newProject = {
			projectImage: '',
			image: '/assets/images/avatar/user-12.png',
			projectName: projectForm.projectName,
			clientName: projectForm.clientName,
			dueDate: projectForm.dueDate,
			totalAmount: projectForm.totalAmount.toString(),
			assignees: [
				{
					image: '/assets/images/avatar/user-14.png',
					name: projectForm.assignee
				}
			],
			progress: projectForm.progress.toString(),
			status: projectForm.status
		};

		projectListData.unshift(newProject);

		resetForm();
	}
	function updateProject() {
		console.log('updating ');
	}
	function resetForm(): void {
		projectForm = {
			projectName: '',
			clientName: '',
			dueDate: '',
			totalAmount: '',
			progress: 0,
			assignee: '',
			status: ''
		};
		errors = {};
		closeModal();
	}
</script>

<ModalBody>
	<div class="grid grid-cols-12 gap-4">
		<div class="col-span-12">
			<label for="projectTitleInput" class="form-label">Project Title</label>
			<input
				type="text"
				id="projectTitleInput"
				class="form-input"
				placeholder="Project title"
				bind:value={projectForm.projectName}
				on:input={() =>
					validateField('projectName', projectForm.projectName, 'Project name is required.')}
			/>
			{#if errors.projectName}
				<span class="text-red-500">{errors.projectName}</span>
			{/if}
		</div>

		<div class="col-span-12">
			<label for="clientName" class="form-label">Client Name</label>
			<input
				type="text"
				id="clientName"
				class="form-input"
				placeholder="Enter name"
				bind:value={projectForm.clientName}
				on:input={() =>
					validateField('clientName', projectForm.clientName, 'Client name is required.')}
			/>
			{#if errors.clientName}
				<span class="text-red-500">{errors.clientName}</span>
			{/if}
		</div>

		<div class="col-span-6">
			<label for="dueDateInput" class="form-label">Due Date</label>
			<input
				type="date"
				id="dueDateInput"
				class="form-input"
				placeholder="Select due date"
				bind:value={projectForm.dueDate}
				on:input={() => validateField('dueDate', projectForm.dueDate, 'Due date is required.')}
			/>
			{#if errors.dueDate}
				<span class="text-red-500">{errors.dueDate}</span>
			{/if}
		</div>

		<div class="col-span-6">
			<label for="totalAmountInput" class="form-label">Total Amount ($)</label>
			<input
				type="number"
				id="totalAmountInput"
				class="form-input"
				placeholder="$00.00"
				bind:value={projectForm.totalAmount}
				on:input={() =>
					validateField('totalAmount', projectForm.totalAmount, 'Total amount is required.')}
			/>
			{#if errors.totalAmount}
				<span class="text-red-500">{errors.totalAmount}</span>
			{/if}
		</div>

		<div class="col-span-12">
			<label for="progressInput" class="form-label">% Complete</label>
			<input
				type="text"
				id="progressInput"
				class="form-input"
				placeholder="0"
				bind:value={projectForm.progress}
				on:input={() => validateField('progress', projectForm.progress, 'Progress is required.')}
			/>
			{#if errors.progress}
				<span class="text-red-500">{errors.progress}</span>
			{/if}
			<div class="progress-bar progress-1 mt-3">
				<div
					class="progress-bar-wrap from-primary-500 bg-gradient-to-r via-purple-500 to-pink-500 text-white"
					style="width: {projectForm.progress}%"
				></div>
			</div>
		</div>

		<div class="col-span-12">
			<label for="assignedSelect" class="form-label">Assignee To</label>
			<select
				id="assignedSelect"
				class="form-input"
				bind:value={projectForm.assignee}
				on:change={() => validateField('assignee', projectForm.assignee, 'Assignee is required.')}
			>
				<!-- Populate this select with options as needed -->
				<option value="">Select Assignee</option>
				<option value="assignee1">Assignee 1</option>
				<option value="assignee2">Assignee 2</option>
			</select>
			{#if errors.assignee}
				<span class="text-red-500">{errors.assignee}</span>
			{/if}
		</div>

		<div class="col-span-12">
			<label for="statusSelect2" class="form-label">Status</label>
			<select
				class="form-input"
				id="statusSelect2"
				bind:value={projectForm.status}
				on:change={() => validateField('status', projectForm.status, 'Status is required.')}
			>
				<option value="">Select Status</option>
				<option value="in-progress">In Progress</option>
				<option value="completed">Completed</option>
			</select>
			{#if errors.status}
				<span class="text-red-500">{errors.status}</span>
			{/if}
		</div>
	</div>

	<div class="mt-5 flex items-center justify-end gap-2">
		<button type="button" class="btn btn-active-red" on:click={resetForm}>
			<LucideIcon name="X" class="inline-block size-4" />
			<span class="align-baseline">Close</span>
		</button>
		<button type="button" class="btn btn-primary" on:click={submitForm}
			>{editMode ? 'Update Customer' : 'Add Customer'}</button
		>
	</div>
</ModalBody>
