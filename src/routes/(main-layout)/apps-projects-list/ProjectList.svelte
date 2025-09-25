<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { projectListData } from './project-list';
	import ProjectForm from './ProjectForm.svelte';
	import Select from '$lib/components/forms/form-select/Select.svelte';
	import { selectConfig } from '$lib/stores/selectstore';

	let displayedProjects = [...projectListData];
	let selectedItems: any[] = [];
	let currentPage = 1;
	let itemsPerPage = 10;
	let startID = 22697;
	let totalPages = Math.ceil(displayedProjects.length / itemsPerPage);
	let sortBy = '';
	let sortDirection = 'asc';
	let searchQuery = '';
	let assigneeFilters: string[] = [];

	// Filter projects based on search query
	function filterProjects() {
		let filteredProjects = projectListData.filter((project) => {
			const matchesSearchQuery =
				project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
				project.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
				project.assignees.some((assignee: any) =>
					assignee.name.toLowerCase().includes(searchQuery.toLowerCase())
				);

			const matchesAssigneeFilter =
				assigneeFilters.length === 0 ||
				project.assignees.some((assignee: any) => assigneeFilters.includes(assignee.name));

			return matchesSearchQuery && matchesAssigneeFilter;
		});
		return filteredProjects;
	}

	// Sort function
	function sort(column: string) {
		if (sortBy === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = column;
			sortDirection = 'asc';
		}
		displayedProjects.sort((a: any, b: any) => {
			const valA = a[column];
			const valB = b[column];
			if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
			if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
	}
	function updateDisplayedProjects() {
		const filteredProjects = filterProjects();
		displayedProjects = filteredProjects.slice(
			(currentPage - 1) * itemsPerPage,
			currentPage * itemsPerPage
		);
	}
	// Pagination logic
	function prevPage() {
		if (currentPage > 1) {
			currentPage -= 1;
			updateDisplayedProjects();
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage += 1;
			updateDisplayedProjects();
		}
	}

	function gotoPage(page: number) {
		currentPage = page;
		updateDisplayedProjects();
	}

	let isAllSelected = false;
	function toggleSelectAll() {
		if (selectedItems.length === displayedProjects.length) {
			selectedItems = []; // Deselect all
		} else {
			selectedItems = [...displayedProjects]; // Select all
		}
	}
	// Toggle item selection
	function toggleItem(project: any) {
		const index = selectedItems.findIndex((item) => item === project);
		if (index > -1) {
			selectedItems.splice(index, 1);
		} else {
			selectedItems.push(project);
		}
		isAllSelected = displayedProjects.length === selectedItems.length;
	}

	// Recalculate pagination and filtering on any reactive change
	$: {
		const filteredProjects = filterProjects();
		if (sortBy) {
			filteredProjects.sort((a: any, b: any) => {
				const valA = a[sortBy];
				const valB = b[sortBy];
				if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
				if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
				return 0;
			});
		}

		// Paginate the filtered and sorted projects
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		displayedProjects = filteredProjects.slice(start, end);
		totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
	}

	const assignees = [
		{ name: 'Max Boucaut', avatar: '/assets/images/avatar/user-14.png' },
		{ name: 'Natasha Tegg', avatar: '/assets/images/avatar/user-15.png' },
		{ name: 'Ethan Zahel', avatar: '/assets/images/avatar/user-16.png' },
		{ name: 'Poppy Dalley', avatar: '/assets/images/avatar/user-17.png' },
		{ name: 'Ryan Frazer', avatar: '/assets/images/avatar/user-18.png' },
		{ name: 'Julian Marconi', avatar: '/assets/images/avatar/user-12.png' }
	];

	// ---- table activity --------------
	let addForm = false;
	let editMode = false;
	let selectedCustomerDetails: any | null = null;
	function openAddForm() {
		addForm = true;
		editMode = false;
		selectedCustomerDetails = null;
	}

	function openEditForm(customer: any) {
		addForm = false;
		editMode = true;
		selectedCustomerDetails = customer;
	}
	function getDataForDelete(customer: any) {
		console.log(customer);
	}
	function deleteHandler() {
		displayedProjects = displayedProjects.filter((project) => !selectedItems.includes(project));
		selectedItems = []; // Clear selected items
		updateDisplayedProjects();
		isAllSelected = false;
	}

	const selectStatus = {
		options: [
			{ label: 'Active', value: 'active', alias: 'Orange, Red' },
			{ label: 'Pending', value: 'pending', alias: ['Orange', 'Apple'] },
			{ label: 'On Hold', value: 'onHold', alias: 'January' },
			{ label: 'Completed', value: 'completed', alias: 'January' }
		]
	};

	selectConfig.update((config) => ({
		...config,
		selectStatus
	}));
</script>

<Card>
	<div class="card-header flex flex-wrap items-center gap-5">
		<div class="grow">
			<h6 class="card-title mb-1">All Projects (264)</h6>
			<p class="text-gray-500">
				Manage your construction projects from start to finish with complete control.
			</p>
		</div>
		<ModalTrigger
			modalId="add-project-modal"
			icon="CirclePlus"
			text="Add Project"
			color="primary"
			class="btn"
			onClick={() => openAddForm()}
		/>
	</div>
	<CardHeader>
		<Grid cols={12} gap={5}>
			<Col cols={{ span: 12 }} xl={{ span: 4 }}>
				<div class="group/form relative">
					<input
						type="text"
						bind:value={searchQuery}
						on:input={updateDisplayedProjects}
						class="form-input group-[&.right]/form:pr-9 group-[&.right]/form:pl-4 ltr:pl-9 rtl:pr-9"
						placeholder="Search for projects..."
					/>
					<div
						class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 group-[&.right]/form:right-3 group-[&.right]/form:left-auto focus:outline-none ltr:left-3 rtl:right-3"
					>
						<LucideIcon name="Search" class="size-4" />
					</div>
				</div>
			</Col>
			<div class="col-span-12 flex flex-wrap gap-2 xl:col-span-8 xl:justify-end">
				{#if selectedItems.length > 0}
					<button class="btn btn-red btn-icon" on:click={deleteHandler}>
						<LucideIcon name="Trash" class="inline-block size-4" />
					</button>
				{/if}
				<div>
					<div id="filterSelect" placeholder="Filter Date Select"></div>
					<select name="" id="" class="form-input">
						<option value="" disabled selected hidden>Filter Date Select</option>
						<option value="weekly">Weekly</option>
						<option value="monthly">Monthly</option>
						<option value="yearly">Yearly</option>
					</select>
				</div>
				<div>
					<select name="" id="" class="form-input">
						<option value="" disabled selected hidden>Status Select</option>
						<option value="active">Active</option>
						<option value="pending">Pending</option>
						<option value="onHold">On Hold</option>
						<option value="completed">Completed</option>
					</select>
				</div>

				<div>
					<Dropdown alignTo="left" class="dropdown shrink-0">
						<DropdownButton class="btn btn-sub-gray w-full whitespace-nowrap">
							Filter By Assignee
						</DropdownButton>
						<DropdownMenu class="dropdown-menu !fixed hidden !w-52 p-2">
							<p class="dark:text-dark-500 mb-1 text-gray-500">Filter by Assignee</p>
							{#each assignees as assignee}
								<div class="input-check-group py-2">
									<input
										id={`assigneeTo${assignee.name.replace(/\s+/g, '')}`}
										class="input-check input-check-primary shrink-0"
										type="checkbox"
										value={assignee.name}
									/>
									<label
										for={`assigneeTo${assignee.name.replace(/\s+/g, '')}`}
										class="input-check-label flex grow items-center gap-2 font-medium"
									>
										<img src={assignee.avatar} alt={assignee.name} class="size-6 rounded-full" />
										{assignee.name}
									</label>
								</div>
							{/each}
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
		</Grid>
	</CardHeader>

	<CardBody class="pt-0">
		<div>
			<div class="table-box overflow-x-auto">
				<table class="table whitespace-nowrap">
					<tbody>
						<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
							<th class="w-14">
								<div class="flex items-center">
									<label for="checkboxAll" class="input-check-label hidden"></label>
									<input
										id="checkboxAll"
										class="input-check input-check-primary"
										type="checkbox"
										bind:checked={isAllSelected}
										on:change={toggleSelectAll}
									/>
								</div>
							</th>
							<th on:click={() => sort('projectID')} class="cursor-pointer !font-medium">ID</th>
							<th on:click={() => sort('projectName')} class="cursor-pointer !font-medium">
								Project and Client Name <span
									>{sortBy === 'projectName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th on:click={() => sort('assignee')} class="cursor-pointer !font-medium"
								>Assigned To</th
							>
							<th on:click={() => sort('dueDate')} class="cursor-pointer !font-medium">
								Due Date <span
									>{sortBy === 'dueDate' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th on:click={() => sort('totalAmount')} class="cursor-pointer !font-medium">
								Total Amount ($) <span
									>{sortBy === 'totalAmount' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th on:click={() => sort('progress')} class="cursor-pointer !font-medium">
								% Complete <span
									>{sortBy === 'progress' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th on:click={() => sort('status')} class="cursor-pointer !font-medium">
								Status <span
									>{sortBy === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="!font-medium">Action</th>
						</tr>

						{#each displayedProjects as project, index}
							<tr>
								<td>
									<div class="flex items-center">
										<label for={`project${index}`} class="input-check-label hidden"></label>
										<input
											id={`project${index}`}
											class="input-check input-check-primary"
											type="checkbox"
											checked={selectedItems.includes(project)}
											on:click={() => toggleItem(project)}
										/>
									</div>
								</td>

								<td>{'PEP-' + (startID + index).toString()}</td>
								<td>
									<h6 class="mb-1">
										<a href="/apps-projects-overview" class="link link-primary grow text-current"
											>{project.projectName}</a
										>
									</h6>
									<p class="dark:text-dark-500 text-sm text-gray-500">{project.clientName}</p>
								</td>
								<td>
									<div class="ml-3 flex grow -space-x-3">
										{#each project.assignees as assignee}
											<a href="#!" title="avatar link">
												<img
													class="dark:border-dark-900 size-8 rounded-full border-2 border-white"
													src={assignee.image}
													alt={assignee.name}
												/>
											</a>
										{/each}
									</div>
								</td>
								<td>{project.dueDate}</td>
								<td>${project.totalAmount}</td>
								<td>
									<div class="flex items-center gap-2">
										<p>{project.progress}%</p>
										<div class="progress-bar progress-1">
											<div
												class="progress-bar-wrap bg-primary-500 text-white"
												style="width: {project.progress}%"
											></div>
										</div>
									</div>
								</td>
								<td>
									<span
										class="badge"
										class:badge-purple={project.status === 'Active'}
										class:badge-orange={project.status === 'On Hold'}
										class:badge-yellow={project.status === 'Pending'}
										class:badge-green={project.status === 'Completed'}
									>
										{project.status}
									</span>
								</td>
								<td>
									<Dropdown class="dropdown" alignTo="right-bottom">
										<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
											<i class="ri-more-2-fill"></i>
										</DropdownButton>
										<DropdownMenu class="dropdown-menu !fixed hidden p-2">
											<a
												href="/apps-projects-overview"
												data-modal-target="contactOverviewModal"
												class="dropdown-item"
											>
												<i class="ri-eye-line align-middle ltr:mr-2 rtl:ml-2"></i>
												<span>Overview</span>
											</a>
											<ModalTrigger
												modalId="add-project-modal"
												color=""
												icon="Pencil"
												class="dropdown-item justify-start"
												text="Edit"
												onClick={() => openEditForm(project)}
											/>
											<ModalTrigger
												modalId="delete-file-modal"
												color=""
												icon="Trash2"
												class="dropdown-item justify-start"
												text="Delete"
												onClick={() => getDataForDelete(project)}
											/>
										</DropdownMenu>
									</Dropdown>
								</td>
							</tr>
						{/each}

						{#if displayedProjects.length === 0}
							<tr>
								<td colspan="10">
									<TableRowNotFound />
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>

			{#if displayedProjects.length !== 0}
				<div class="mt-5 grid grid-cols-12 items-center gap-5">
					<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
						<p class="dark:text-dark-500 text-gray-500 ltr:pr-1 rtl:pl-1">
							Showing <b>{currentPage * itemsPerPage - itemsPerPage + 1}</b> -
							<b> {Math.min(currentPage * itemsPerPage, projectListData.length)}</b>
							of <b>{projectListData.length}</b> Results
						</p>
						{#if selectedItems.length > 0}
							<span>{selectedItems.length} Row Selected</span>
						{/if}
					</div>

					<div class="col-span-12 md:col-span-6">
						<div class="pagination pagination-primary flex justify-center md:justify-end">
							<button class="pagination-pre" on:click={prevPage} disabled={currentPage === 1}>
								<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
								<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
								Prev
							</button>
							{#each Array(totalPages).fill(0) as _, pageIndex}
								<button
									class="pagination-item"
									on:click={() => gotoPage(pageIndex + 1)}
									class:active={currentPage === pageIndex + 1}>{pageIndex + 1}</button
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
			{/if}
		</div>
	</CardBody>
</Card>

<Modal modalId="add-project-modal" let:modalId>
	<ModalHeader {modalId}>
		<h6>Add Project</h6>
	</ModalHeader>
	<ProjectForm
		{addForm}
		{editMode}
		selectedCustomer={selectedCustomerDetails}
		updateTable={updateDisplayedProjects}
		on:click={openAddForm}
	/>
</Modal>

<DeleteComponent {deleteHandler} />
