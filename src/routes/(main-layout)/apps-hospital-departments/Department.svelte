<script lang="ts">
	import { onMount } from 'svelte';
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import { options as distributedColumn } from './distributed-column';
	import { departmentData } from './department';

	let departments = [...departmentData];
	let currentPage = 1;
	let itemsPerPage = 5; // Number of items per page for pagination
	let sortBy: string | null = null;
	let sortDirection = 'asc';
	let departmentToDelete: any | null = null;
	let displayedDepartment: any[] = [];
	let totalPages = 0;
	let showingStart = 1;
	let showingEnd = 0;

	// Function to generate avatar text from doctor's name
	function generateAvatarText(doctor: string) {
		const nameWithoutPrefix = doctor.replace('Dr. ', ''); // Remove 'Dr. ' prefix
		const nameParts = nameWithoutPrefix.split(' ');
		if (nameParts.length > 1) {
			return nameParts[0][0] + nameParts[1][0];
		}
		return nameParts[0][0];
	}

	// Sorting logic
	function sort(column: string) {
		if (sortBy === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = column;
			sortDirection = 'asc';
		}

		departments = [...departments].sort((a: any, b: any) => {
			if (a[column] < b[column]) return sortDirection === 'asc' ? -1 : 1;
			if (a[column] > b[column]) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
		updatePagination();
	}

	// Pagination logic
	function updatePagination() {
		totalPages = Math.ceil(departments.length / itemsPerPage);
		displayedDepartment = departments.slice(
			(currentPage - 1) * itemsPerPage,
			currentPage * itemsPerPage
		);
		showingStart = (currentPage - 1) * itemsPerPage + 1;
		showingEnd = Math.min(currentPage * itemsPerPage, departments.length);
	}

	// Navigate to the next page
	function nextPage() {
		if (currentPage < totalPages) currentPage++;
		updatePagination();
	}

	// Navigate to the previous page
	function prevPage() {
		if (currentPage > 1) currentPage--;
		updatePagination();
	}

	// Go to specific page
	function gotoPage(page: number) {
		currentPage = page;
		updatePagination();
	}

	let departmentForm = {
		image: '',
		avatarText: '',
		departmentName: '',
		doctor: '',
		totalEmployee: '',
		headOfDepartment: '',
		status: ''
	};

	let errors: any = {};

	// Method to handle file input change with correct typing
	function fileChosen(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0]; // Safely access the files array
		if (file) {
			departmentForm.image = URL.createObjectURL(file);
			departmentForm.avatarText = file.name.split('.').slice(0, -1).join('.'); // Use file name as avatar text
		}
	}

	// Method to validate the form fields
	function validateField(fieldName: any, fieldValue: any, errorMessage: any) {
		if (!fieldValue) {
			errors[fieldName] = errorMessage;
		} else {
			delete errors[fieldName];
		}
	}

	// Validate form fields
	function validateForm() {
		errors = {};
		validateField('departmentName', departmentForm.departmentName, 'Department name is required.');
		validateField('doctor', departmentForm.doctor, 'Doctor name is required.');
		validateField(
			'headOfDepartment',
			departmentForm.headOfDepartment,
			'Head of department is required.'
		);
		validateField('totalEmployee', departmentForm.totalEmployee, 'Total employee is required.');
		validateField('status', departmentForm.status, 'Status is required.');
		return Object.keys(errors).length === 0;
	}

	// Submit the form
	function submitForm() {
		if (validateForm()) {
			// Add new department to the departments array
			departments = [
				...departments,
				{
					departmentName: departmentForm.departmentName,
					doctor: departmentForm.doctor,
					totalEmployee: departmentForm.totalEmployee,
					headOfDepartment: departmentForm.headOfDepartment,
					status: departmentForm.status,
					image: departmentForm.image
				}
			];

			// Clear the form
			departmentForm = {
				image: '',
				avatarText: '',
				departmentName: '',
				doctor: '',
				totalEmployee: '',
				headOfDepartment: '',
				status: ''
			};
		} else {
			console.log('Form has errors:', errors);
		}
	}

	function deleteDepartment() {
		if (departmentToDelete) {
			// Remove the department from the array
			departments = departments.filter((dept) => dept !== departmentToDelete);
			updatePagination();
			departmentToDelete = null;
		}
	}

	// Initialize avatar text if image is not provided
	onMount(() => {
		if (!departmentForm.image) {
			departmentForm.avatarText = departmentForm.doctor
				.split(' ')
				.map((name) => name[0])
				.join('');
		}
		updatePagination();
	});
</script>

<Col cols={{ span: 12 }} class="card">
	<div class="card-header flex items-center gap-3">
		<h6 class="card-title grow">Employee</h6>
		<p class="dark:text-dark-500 shrink-0 text-gray-500">Number of Staff according to department</p>
	</div>
	<CardBody>
		<div dir="ltr">
			<ApexChart
				class="!min-h-full"
				colors={[
					'bg-primary-500',
					'bg-pink-500',
					'bg-sky-500',
					'bg-green-300',
					'bg-yellow-200',
					'bg-orange-200',
					'bg-purple-500',
					'bg-red-500'
				]}
				options={distributedColumn}
			/>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card">
	<div class="card-header flex items-center gap-3">
		<h6 class="card-title grow">Department List</h6>
		<ModalTrigger
			modalId="add-department"
			icon="CirclePlus"
			text="Add Department"
			class="btn shrink-0"
		/>
		<Modal modalId="add-department" let:modalId>
			<ModalBody class="p-2">
				<div
					class="from-primary-500/20 h-24 rounded-t bg-gradient-to-r via-pink-500/20 to-green-500/20 p-5"
				></div>
				<div class="p-4">
					<div class="-mt-16">
						<label for="logo">
							<div
								class="dark:bg-dark-850 dark:border-dark-900 inline-flex size-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-solid border-white bg-gray-100"
							>
								{#if !departmentForm.image}
									<div>
										<span
											class="dark:text-dark-500 dark:bg-dark-850 flex items-center justify-center rounded-full bg-gray-100 text-lg font-semibold text-gray-500"
										>
											{departmentForm.avatarText}
										</span>
										<div class="dark:text-dark-500 flex flex-col items-center text-gray-500">
											<LucideIcon name="Upload" />
										</div>
									</div>
								{:else}
									<div>
										<!-- svelte-ignore a11y-missing-attribute -->
										<img
											src={departmentForm.image}
											class="h-full w-full rounded-full object-cover"
										/>
									</div>
								{/if}
							</div>
						</label>
						<div class="mt-4 hidden">
							<label class="block">
								<span class="sr-only">Choose profile photo</span>
								<input
									type="file"
									id="logo"
									class="block w-full text-sm text-slate-500 file:mr-4 file:rounded-md file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 focus:outline-0"
									on:change={fileChosen}
								/>
							</label>
						</div>
					</div>

					<div class="mt-4 grid grid-cols-12 gap-4">
						<div class="col-span-12">
							<label for="departmentNameInput" class="form-label">Department Name</label>
							<input
								type="text"
								id="departmentNameInput"
								class="form-input"
								placeholder="Department Name"
								bind:value={departmentForm.departmentName}
								on:input={() =>
									validateField(
										'departmentName',
										departmentForm.departmentName,
										'Department Name is required.'
									)}
							/>
							{#if errors.departmentName}
								<span class="text-red-500">{errors.departmentName}</span>
							{/if}
						</div>

						<div class="col-span-12">
							<label for="doctorInput" class="form-label">Doctor</label>
							<input
								type="text"
								id="doctorInput"
								class="form-input"
								placeholder="Enter doctor name"
								bind:value={departmentForm.doctor}
								on:input={() =>
									validateField('doctor', departmentForm.doctor, 'Doctor name is required.')}
							/>
							{#if errors.doctor}
								<span class="text-red-500">{errors.doctor}</span>
							{/if}
						</div>

						<div class="col-span-12">
							<label for="totalEmployeeInput" class="form-label">Total Employee</label>
							<input
								type="number"
								id="totalEmployeeInput"
								class="form-input"
								placeholder="0"
								bind:value={departmentForm.totalEmployee}
								on:input={() =>
									validateField(
										'totalEmployee',
										departmentForm.totalEmployee,
										'Total employee is required.'
									)}
							/>
							{#if errors.totalEmployee}
								<span class="text-red-500">{errors.totalEmployee}</span>
							{/if}
						</div>

						<div class="col-span-12">
							<label for="headOfDeptInput" class="form-label">Head of Dept.</label>
							<input
								type="text"
								id="headOfDeptInput"
								class="form-input"
								placeholder="Head of dept."
								bind:value={departmentForm.headOfDepartment}
								on:input={() =>
									validateField(
										'headOfDepartment',
										departmentForm.headOfDepartment,
										'Head of department is required.'
									)}
							/>
							{#if errors.headOfDepartment}
								<span class="text-red-500">{errors.headOfDepartment}</span>
							{/if}
						</div>

						<div class="col-span-12">
							<label for="statusSelect" class="form-label">Status</label>
							<select
								id="statusSelect"
								class="form-input"
								bind:value={departmentForm.status}
								on:change={() =>
									validateField('status', departmentForm.status, 'Status is required.')}
							>
								<option value="" disabled>Select Status</option>
								<option value="Active">Active</option>
								<option value="Inactive">Inactive</option>
							</select>
							{#if errors.status}
								<span class="text-red-500">{errors.status}</span>
							{/if}
						</div>
					</div>

					<div class="mt-5 flex items-center justify-end gap-2">
						<button type="button" class="btn btn-active-red">
							<LucideIcon name="X" class="inline-block size-4 me-1" /><span class="align-baseline"
								>Close</span
							>
						</button>
						<button type="button" class="btn btn-primary" on:click={submitForm}>
							{#if departmentForm.departmentName}
								Add Department
							{:else}
								Update Department
							{/if}
						</button>
					</div>
				</div>
			</ModalBody>
		</Modal>
	</div>
	<CardBody class="pt-0">
		<div>
			<div class="table-box overflow-x-auto whitespace-nowrap">
				<table class="flush table">
					<thead>
						<tr class="dark:text-dark-500 dark:bg-dark-850 bg-gray-100 text-gray-500">
							<th class="cursor-pointer !font-medium" on:click={() => sort('departmentID')}>
								ID
								<span>{sortBy === 'departmentID' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('departmentName')}>
								Department Name
								<span
									>{sortBy === 'departmentName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('doctor')}>
								Doctor
								<span>{sortBy === 'doctor' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('totalEmployee')}>
								Total Employee
								<span
									>{sortBy === 'totalEmployee' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('headOfDepartment')}>
								Head of Dept.
								<span
									>{sortBy === 'headOfDepartment'
										? sortDirection === 'asc'
											? '↑'
											: '↓'
										: ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('status')}>
								Status
								<span>{sortBy === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
							</th>
							<th class="!font-medium">Action</th>
						</tr>
					</thead>
					<tbody>
						{#each displayedDepartment as department, index}
							<tr class="*:px-3 *:py-2.5">
								<td>{'PED-' + (showingStart + index).toString()}</td>
								<td>{department.departmentName}</td>
								<td>
									<div class="flex">
										<div class="flex items-center gap-3">
											<div
												class="dark:text-dark-500 dark:bg-dark-850 relative size-10 rounded-full bg-gray-100 text-gray-500"
											>
												{#if department.image}
													<img src={department.image} alt="" class="rounded-full" />
												{:else}
													<span
														class="dark:text-dark-500 dark:bg-dark-850 absolute inset-0 flex items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-500"
													>
														{generateAvatarText(department.doctor)}
													</span>
												{/if}
											</div>
											<div>
												<h6><a href="#!">{department.doctor}</a></h6>
											</div>
										</div>
									</div>
								</td>
								<td>{department.totalEmployee}</td>
								<td><a href="#!" class="link link-primary">{department.headOfDepartment}</a></td>
								<td>
									<span
										class="badge"
										class:badge-green={department.status === 'Active'}
										class:badge-red={department.status === 'Unactive'}
									>
										{department.status}
									</span>
								</td>
								<td>
									<div class="flex items-center gap-2">
										<button class="btn btn-sub-gray btn-icon !size-8" title="Edit" aria-label="edit"
											><i class="ri-pencil-line"></i></button
										>
										<ModalTrigger
											modalId="delete-modal"
											icon="Trash2"
											color=""
											iconCss="!size-3.5"
											class="btn-sub-red !size-8 place-items-center rounded-md"
										></ModalTrigger>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Pagination -->
			<div class="mt-5 grid grid-cols-12 items-center gap-5">
				<div class="col-span-12 text-center lg:col-span-6 ltr:lg:text-left rtl:lg:text-right">
					<p class="dark:text-dark-500 text-gray-500">
						Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{departments.length}</b> Results
					</p>
				</div>
				<div class="col-span-12 md:col-span-6">
					<div class="pagination pagination-primary flex justify-center lg:justify-end">
						<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
							Prev
						</button>
						{#each Array(totalPages) as _, page (page)}
							<button
								on:click={() => gotoPage(page + 1)}
								class="pagination-item"
								class:active={currentPage === page + 1}
							>
								<span>{page + 1}</span>
							</button>
						{/each}
						<button
							on:click={nextPage}
							disabled={currentPage === totalPages}
							class="pagination-next"
						>
							Next
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</CardBody>
</Col>

<Modal modalId="delete-modal" let:modalId size="sm">
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
				<button
					class="btn btn-red"
					on:click={() => (departmentToDelete = department)}
					on:click={deleteDepartment}>Delete</button
				>
				<button class="btn link link-primary" on:click={() => (departmentToDelete = null)}
					>Cancel</button
				>
			</div>
		</div>
	</ModalBody>
</Modal>
