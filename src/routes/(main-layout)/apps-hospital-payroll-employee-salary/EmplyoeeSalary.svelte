<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import { onMount } from 'svelte';
	import { employeeSalaryData } from './salary';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';

	let employees = [...employeeSalaryData]; // Initial employee data
	let currentPage = 1;
	let itemsPerPage = 10; // Number of items per page for pagination
	let sortBy: string | null = null;
	let sortDirection = 'asc';
	let displayedEmployees: any[] = [];
	let totalPages = 0;
	let showingStart = 1;
	let showingEnd = 0;
	let deleteEmployee: any | null = null; // Store the employee object to delete

	// Sorting logic
	function sort(column: string) {
		if (sortBy === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = column;
			sortDirection = 'asc';
		}

		employees = [...employees].sort((a: any, b: any) => {
			if (a[column] < b[column]) return sortDirection === 'asc' ? -1 : 1;
			if (a[column] > b[column]) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
		updatePagination();
	}

	// Pagination logic
	function updatePagination() {
		totalPages = Math.ceil(employees.length / itemsPerPage);
		displayedEmployees = employees.slice(
			(currentPage - 1) * itemsPerPage,
			currentPage * itemsPerPage
		);
		showingStart = (currentPage - 1) * itemsPerPage + 1;
		showingEnd = Math.min(currentPage * itemsPerPage, employees.length);
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
			updatePagination();
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
			updatePagination();
		}
	}

	function gotoPage(page: number) {
		currentPage = page;
		updatePagination();
	}

	// Delete employee from the list
	function deleteEmployeeAction() {
		if (deleteEmployee) {
			employees = employees.filter(
				(employee) => employee.employeeName !== deleteEmployee.employeeName
			);
			updatePagination();
			deleteEmployee = null;
		}
	}

	// Initialize the table on mount
	onMount(() => {
		updatePagination();
	});
</script>

<div class="card-header flex items-center gap-3">
	<h6 class="card-title grow">Employee</h6>
	<button type="button" class="btn btn-primary shrink-0">Download</button>
</div>

<CardBody class="pt-0">
	<div>
		<!-- Employee Table -->
		<div class="table-box overflow-x-auto">
			<table class="flush table">
				<tbody>
					<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
						<th on:click={() => sort('employeeName')} class="cursor-pointer !font-medium"
							>Employee Name <span
								>{sortBy === 'employeeName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							></th
						>
						<th on:click={() => sort('email')} class="cursor-pointer !font-medium"
							>Email <span>{sortBy === 'email' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							></th
						>
						<th on:click={() => sort('phoneNumber')} class="cursor-pointer !font-medium"
							>Phone Number <span
								>{sortBy === 'phoneNumber' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							></th
						>
						<th on:click={() => sort('department')} class="cursor-pointer !font-medium"
							>Department <span
								>{sortBy === 'department' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							></th
						>
						<th on:click={() => sort('monthlySalary')} class="cursor-pointer !font-medium"
							>Monthly Salary <span
								>{sortBy === 'monthlySalary' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							></th
						>
						<th on:click={() => sort('status')} class="cursor-pointer !font-medium"
							>Status <span>{sortBy === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							></th
						>
						<th class="!font-medium">Action</th>
					</tr>
					{#each displayedEmployees as employee}
						<tr class="*:px-3 *:py-2.5">
							<td>{employee.employeeName}</td>
							<td>{employee.email}</td>
							<td>{employee.phoneNumber}</td>
							<td>{employee.department}</td>
							<td>{employee.monthlySalary}</td>
							<td>
								<span
									class={`badge ${employee.status === 'Successful' ? 'badge-green' : ''} ${employee.status === 'Pending' ? 'badge-yellow' : ''} ${employee.status === 'Failed' ? 'badge-red' : ''}`}
								>
									{employee.status}
								</span>
							</td>
							<td>
								<div class="flex items-center gap-2">
									<button
										class="btn btn-sub-primary btn-icon !size-8"
										title="edit"
										aria-label="edit"><i class="ri-pencil-line"></i></button
									>
									<ModalTrigger
										modalId="trash-modal"
										icon="Trash2"
										color=""
										iconCss="!size-3.5"
										class="btn-sub-red !size-8 place-items-center rounded-md"
									></ModalTrigger>
								
								</div></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Pagination Controls -->
		<div class="mt-5 grid grid-cols-12 items-center gap-5">
			<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
				<p class="dark:text-dark-500 text-gray-500">
					Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{employees.length}</b> Results
				</p>
			</div>
			<div class="col-span-6">
				<div class="pagination pagination-primary flex justify-center md:justify-end">
					<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
						<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
						Prev
					</button>
					{#each Array(totalPages)
						.fill(null)
						.map((_, i) => i + 1) as page}
						<button
							on:click={() => gotoPage(page)}
							class={currentPage === page ? 'pagination-item active' : 'pagination-item'}
							>{page}</button
						>
					{/each}
					<button on:click={nextPage} disabled={currentPage === totalPages} class="pagination-next">
						Next
						<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
					</button>
				</div>
			</div>
		</div>
	</div>
</CardBody>

<Modal modalId="trash-modal" let:modalId size="xs">
	<ModalBody class="p-7">
		<div class="text-center">
			<div
				class="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-red-500/10 text-red-500 backdrop-blur-xl"
			>
				<LucideIcon name="Trash2" class="size-6"></LucideIcon>
			</div>
			<h5 class="mb-4">Are you sure you want to delete this employee?</h5>
			<div class="flex items-center justify-center gap-2">
				<button
					class="btn btn-red"
					on:click={() => (deleteEmployee = employee)}
					on:click={deleteEmployeeAction}
				>
					Delete
				</button>
				<button
					class="btn link link-primary"
					on:click={() => (deleteEmployee = null)}
				>
					Cancel
				</button>
			</div>
		</div>
	</ModalBody>
</Modal>