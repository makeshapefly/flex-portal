<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
	import { staffData } from './staff';
	import HospitalStaffForm from './HospitalStaffForm.svelte';

	interface Staff {
		name: string;
		image?: string;
		role: string;
		department: string;
		email: string;
		phone: string;
		date: string;
		staffID: string;
	}

	let startID = 1595;
	let staff: Staff[] = staffData.map((s, index) => ({
		...s,
		staffID: 'PES-' + (startID + index).toString() // Generate staffID dynamically
	}));

	let currentPage = 1;
	const itemsPerPage = 10;
	let deleteItem: string | null = null;

	let sortBy: string = '';
	let sortDirection: 'asc' | 'desc' = 'asc';

	// Function to handle sorting
	function sort(column: string) {
		sortDirection = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
		sortBy = column;

		staff = [...staff].sort((a: Staff, b: Staff) => {
			let valA: any = a[column as keyof Staff];
			let valB: any = b[column as keyof Staff];

			if (typeof valA === 'string' && typeof valB === 'string') {
				if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
				if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
			} else if (typeof valA === 'number' && typeof valB === 'number') {
				return sortDirection === 'asc' ? valA - valB : valB - valA;
			} else if (valA instanceof Date && valB instanceof Date) {
				return sortDirection === 'asc'
					? valA.getTime() - valB.getTime()
					: valB.getTime() - valA.getTime();
			}

			return 0;
		});

		// After sorting, reset to page 1
		currentPage = 1;
		updateDisplayedStaff();
	}

	// Function to handle pagination
	const totalPages = Math.ceil(staff.length / itemsPerPage);
	let displayedStaff = staff.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
			updateDisplayedStaff();
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
			updateDisplayedStaff();
		}
	}

	function gotoPage(page: number) {
		currentPage = page;
		updateDisplayedStaff();
	}

	// Update displayed staff based on the current page
	function updateDisplayedStaff() {
		displayedStaff = staff.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
	}

	// Function to format dates
	function formatDate(date: string) {
		const d = new Date(date);
		const fullDate = d.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: '2-digit'
		});
		const [month, day, year] = fullDate.replace(',', '').split(' ');
		return `${day} ${month} ${year}`;
	}

	function setDeleteItem(staffID: string) {
		deleteItem = staffID;
	}

	function deleteStaff() {
		if (deleteItem) {
			staff = staff.filter((s) => s.staffID !== deleteItem);
			updateDisplayedStaff();
			deleteItem = null;
		}
	}

	function generateAvatarText(name: string) {
		const nameParts = name.split(' ');
		if (nameParts.length > 1) {
			return nameParts[0][0] + nameParts[1][0]; // First letter of first and last name
		}
		return name[0]; // If there is only one name, return the first letter
	}

	staffData.forEach((staff, index) => {
		return (staff.staffID = 1595 + index);
	});

	// ---- table activity --------------
	let addForm = false;
	let editMode = false;
	let selectedCustomerDetails: any | null = null;
	function openAddForm() {
		addForm = true;
		editMode = false;
		selectedCustomerDetails = null;
	}

	function openEditForm(event: any) {
		addForm = false;
		editMode = true;
		selectedCustomerDetails = event;
	}
	function getDataForDelete(event: any) {
		console.log(event);
	}
	function deleteHandler() {
		console.log('deleted');
	}
</script>

<Col cols={{ span: 12 }} class="card">
	<div class="card-header flex items-center gap-3">
		<h6 class="card-title grow">Staff List</h6>
		<ModalTrigger
			modalId="add-staff-modal"
			icon="CirclePlus"
			text="Add Staff"
			class="btn"
			onClick={() => openAddForm()}
		/>
	</div>
	<CardBody class="pt-0">
		<div>
			<div class="table-box whitespace-nowrap">
				<table class="flush table">
					<thead>
						<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
							<th class="cursor-pointer !font-medium" on:click={() => sort('staffID')}
								>ID <span>{sortBy === 'staffID' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								></th
							>
							<th class="cursor-pointer !font-medium" on:click={() => sort('name')}
								>Staff Name <span
									>{sortBy === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								></th
							>
							<th class="cursor-pointer !font-medium" on:click={() => sort('department')}
								>Department <span
									>{sortBy === 'department' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								></th
							>
							<th class="cursor-pointer !font-medium" on:click={() => sort('email')}
								>Email <span>{sortBy === 'email' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								></th
							>
							<th class="cursor-pointer !font-medium" on:click={() => sort('phone')}
								>Phone <span>{sortBy === 'phone' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								></th
							>
							<th class="cursor-pointer !font-medium" on:click={() => sort('date')}
								>Joining Date <span
									>{sortBy === 'date' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								></th
							>
							<th class="!font-medium">Action</th>
						</tr>
					</thead>
					<tbody>
						{#each displayedStaff as staffItem}
							<tr class="*:px-3 *:py-2.5">
								<td>{staffItem.staffID}</td>
								<td>
									<div class="flex items-center gap-3">
										<div
											class="dark:text-dark-500 dark:bg-dark-850 relative size-10 rounded-full bg-gray-100 text-gray-500"
										>
											{#if staffItem.image}
												<img src={staffItem.image} alt={staffItem.name} class="rounded-full" />
											{:else}
												<span
													class="dark:text-dark-500 dark:bg-dark-850 absolute inset-0 flex items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-500"
												>
													{generateAvatarText(staffItem.name)}
												</span>
											{/if}
										</div>
										<div>
											<h6 class="mb-1">{staffItem.name}</h6>
											<p class="dark:text-dark-500 text-sm text-gray-500">{staffItem.role}</p>
										</div>
									</div>
								</td>
								<td>{staffItem.department}</td>
								<td>{staffItem.email}</td>
								<td>{staffItem.phone}</td>
								<td>{formatDate(staffItem.date)}</td>
								<td>
									<div class="flex items-center gap-2">
										<ModalTrigger
											modalId="add-staff-modal"
											icon="Pencil"
											color=""
											class="btn btn-sub-gray btn-icon !size-8 rounded-md"
											iconCss="!size-3"
											onClick={() => openEditForm(staffItem)}
										></ModalTrigger>
										<ModalTrigger
											modalId="delete-file-modal"
											icon="Trash2"
											color=""
											iconCss="!size-3.5"
											class="btn btn-sub-red btn-icon !size-8 rounded-md"
										></ModalTrigger>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<div class="mt-5 grid grid-cols-12 items-center gap-5">
				<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
					<p class="dark:text-dark-500 text-gray-500">
						Showing <b>{(currentPage - 1) * itemsPerPage + 1}</b> -
						<b>{Math.min(currentPage * itemsPerPage, staff.length)}</b>
						of <b>{staff.length}</b> Results
					</p>
				</div>
				<div class="col-span-12 md:col-span-6">
					<div class="pagination pagination-primary flex justify-center md:justify-end">
						<button class="pagination-pre" on:click={prevPage} disabled={currentPage === 1}>
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
							Prev
						</button>
						{#each Array(totalPages).fill(0) as _, index}
							<button
								class="pagination-item"
								on:click={() => gotoPage(index + 1)}
								class:active={currentPage === index + 1}>{index + 1}</button
							>
						{/each}
						<button
							class="pagination-next"
							on:click={nextPage}
							disabled={currentPage === totalPages}
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

<!-- add staff -->
<Modal modalId="add-staff-modal" let:modalId>
	<ModalBody class="p-2">
		<HospitalStaffForm
			{addForm}
			{editMode}
			selectedCustomer={selectedCustomerDetails}
			updatePagination={updateDisplayedStaff}
		/>
	</ModalBody>
</Modal>

<DeleteComponent />
