<script lang="ts">
	import { onMount } from 'svelte';
	import flatpickr from 'flatpickr';
	import 'flatpickr/dist/flatpickr.min.css';

	type LeaveType = 'casual' | 'sick' | 'maternity' | 'emergency' | 'vacation';

	// Leave Form Data
	let leaveForm = {
		leaveType: '' as LeaveType | '',
		contactNumber: '',
		emergencyNumber: '',
		startDate: '',
		endDate: '',
		reason: '',
		totalDays: 0
	};

	// Error handling
	let errors: { [key: string]: string } = {};

	// Leave Types
	let leaves = {
		casual: 11,
		sick: 1,
		maternity: 1,
		emergency: 2,
		vacation: 3
	};

	// Total leaves calculation
	$: totalLeave =
		leaves.casual + leaves.sick + leaves.maternity + leaves.emergency + leaves.vacation;

	// Calculate total days between start and end date
	const calculateTotalDays = () => {
		if (leaveForm.startDate && leaveForm.endDate) {
			const startDate = new Date(leaveForm.startDate);
			const endDate = new Date(leaveForm.endDate);
			if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
				const differenceInTime = endDate.getTime() - startDate.getTime();
				leaveForm.totalDays =
					differenceInTime >= 0 ? Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1 : 0;
			} else {
				leaveForm.totalDays = 0;
			}
		}
	};

	// Validate form fields
	const validateForm = () => {
		errors = {};
		validateField('leaveType', leaveForm.leaveType, 'Leave type is required.');
		validateField('contactNumber', leaveForm.contactNumber, 'Contact number is required.');
		validateField('emergencyNumber', leaveForm.emergencyNumber, 'Emergency number is required.');
		validateField('startDate', leaveForm.startDate, 'Start date is required.');
		validateField('endDate', leaveForm.endDate, 'End date is required.');
		validateField('reason', leaveForm.reason, 'Reason is required.');
		return Object.keys(errors).length === 0;
	};

	const validateField = (fieldName: string, fieldValue: string, errorMessage: string) => {
		if (!fieldValue) {
			errors[fieldName] = errorMessage;
		} else {
			delete errors[fieldName];
		}
	};

	// Reset form data
	const resetForm = () => {
		errors = {};
		leaveForm = {
			leaveType: '',
			contactNumber: '',
			emergencyNumber: '',
			startDate: '',
			endDate: '',
			reason: '',
			totalDays: 0
		};
	};

	// Submit form handler
	const submitForm = (event: Event) => {
		event.preventDefault();
		if (validateForm()) {
			// Increment the corresponding leave type count
			if (leaveForm.leaveType) {
				leaves[leaveForm.leaveType as LeaveType] += 1; // This triggers reactivity
			}
			resetForm();
		}
	};
	// Initialize the form on mount
	onMount(() => {
		flatpickr('.start-date', {
			dateFormat: 'Y-m-d',
			onChange: (selectedDates) => {
				leaveForm.startDate = selectedDates[0] ? selectedDates[0].toISOString().split('T')[0] : '';
				validateField('startDate', leaveForm.startDate, 'Start date is required.');
				calculateTotalDays();
			}
		});

		flatpickr('.end-date', {
			dateFormat: 'Y-m-d',
			onChange: (selectedDates) => {
				leaveForm.endDate = selectedDates[0] ? selectedDates[0].toISOString().split('T')[0] : '';
				validateField('endDate', leaveForm.endDate, 'End date is required.');
				calculateTotalDays();
			}
		});
		resetForm();
	});
</script>

<div class="card col-span-12 lg:col-span-8 2xl:col-span-9">
	<div class="card-header">
		<h6 class="card-title">Create Leave Request</h6>
	</div>
	<div class="card-body">
		<div class="gap-space grid grid-cols-12">
			<div class="col-span-12">
				<label for="leaveTypeSelect" class="form-label"
					>Leave Type <span class="text-red-500">*</span></label
				>
				<select id="leaveTypeSelect" class="form-input" bind:value={leaveForm.leaveType}>
					<option value="">Select Leave Type</option>
					<option value="casual">Casual Leave</option>
					<option value="sick">Sick Leave</option>
					<option value="maternity">Maternity Leave</option>
					<option value="emergency">Emergency Leave</option>
					<option value="vacation">Vacation Leave</option>
				</select>
				{#if errors.leaveType}
					<span class="text-red-500">{errors.leaveType}</span>
				{/if}
			</div>
			<div class="col-span-12 md:col-span-6">
				<label for="contactNumber" class="form-label"
					>Contact Number <span class="text-red-500">*</span></label
				>
				<input
					type="number"
					id="contactNumber"
					class="form-input"
					placeholder="Enter your contact number"
					bind:value={leaveForm.contactNumber}
					on:input={() =>
						validateField('contactNumber', leaveForm.contactNumber, 'Contact number is required.')}
				/>
				{#if errors.contactNumber}
					<span class="text-red-500">{errors.contactNumber}</span>
				{/if}
			</div>
			<div class="col-span-12 md:col-span-6">
				<label for="emergencyNumber" class="form-label"
					>Emergency Number <span class="text-red-500">*</span></label
				>
				<input
					type="number"
					id="emergencyNumber"
					class="form-input"
					placeholder="Enter your emergency number"
					bind:value={leaveForm.emergencyNumber}
					on:input={() =>
						validateField(
							'emergencyNumber',
							leaveForm.emergencyNumber,
							'Emergency number is required.'
						)}
				/>
				{#if errors.emergencyNumber}
					<span class="text-red-500">{errors.emergencyNumber}</span>
				{/if}
			</div>
			<div class="col-span-12 md:col-span-4">
				<label for="startDateInput" class="form-label"
					>Start Date <span class="text-red-500">*</span></label
				>
				<input
					type="text"
					id="startDateInput"
					class="form-input start-date"
					placeholder="Select date"
					bind:value={leaveForm.startDate}
				/>
				{#if errors.startDate}
					<span class="text-red-500">{errors.startDate}</span>
				{/if}
			</div>
			<div class="col-span-12 md:col-span-4">
				<label for="endDateInput" class="form-label"
					>End Date <span class="text-red-500">*</span></label
				>
				<input
					type="text"
					id="endDateInput"
					class="form-input end-date"
					placeholder="Select date"
					bind:value={leaveForm.endDate}
				/>
				{#if errors.endDate}
					<span class="text-red-500">{errors.endDate}</span>
				{/if}
			</div>
			<div class="col-span-12 md:col-span-4">
				<label for="totalDays" class="form-label"
					>Total Days <span class="text-red-500">*</span></label
				>
				<input
					type="number"
					id="totalDays"
					class="form-input"
					placeholder="0"
					value={leaveForm.totalDays}
					readonly
				/>
			</div>
			<div class="col-span-12">
				<label for="reasonsInput" class="form-label"
					>Reason <span class="text-red-500">*</span></label
				>
				<textarea
					id="reasonsInput"
					rows="3"
					class="form-input h-auto"
					placeholder="Enter reasons"
					bind:value={leaveForm.reason}
					on:input={() => validateField('reason', leaveForm.reason, 'Reason is required.')}
				></textarea>
				{#if errors.reason}
					<span class="text-red-500">{errors.reason}</span>
				{/if}
			</div>
			<div class="col-span-12">
				<div class="flex items-center justify-end gap-2">
					<button type="reset" class="btn btn-sub-gray" on:click={resetForm}>Reset</button>
					<button class="btn btn-primary" on:click={submitForm}>Apply Leave Request</button>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="col-span-12 lg:col-span-4 2xl:col-span-3">
	<div class="card">
		<div class="card-header">
			<h6 class="card-title">Leave Summary</h6>
		</div>
		<div class="card-body">
			<table class="flush table-sm table">
				<tbody>
					<tr>
						<td class="text-gray-500">Casual Leave</td>
						<td class="font-medium">{leaves.casual}</td>
					</tr>
					<tr>
						<td class="text-gray-500">Sick Leave</td>
						<td class="font-medium">{leaves.sick}</td>
					</tr>
					<tr>
						<td class="text-gray-500">Maternity Leave</td>
						<td class="font-medium">{leaves.maternity}</td>
					</tr>
					<tr>
						<td class="text-gray-500">Emergency Leave</td>
						<td class="font-medium">{leaves.emergency}</td>
					</tr>
					<tr>
						<td class="text-gray-500">Vacation Leave</td>
						<td class="font-medium">{leaves.vacation}</td>
					</tr>
					<tr>
						<td class="text-gray-500">Total Leave</td>
						<td class="font-medium">{totalLeave}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
