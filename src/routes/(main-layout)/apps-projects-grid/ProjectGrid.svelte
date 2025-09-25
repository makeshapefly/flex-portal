<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import ProjectForm from '../apps-projects-list/ProjectForm.svelte';
	import { projectListData as importedProjectListData } from './project-grid';
	import { writable } from 'svelte/store';

	let searchQuery = writable('');
	let selectedSort = writable('name');
	let currentPage = writable(1);
	let activeTab = writable(''); // Active tab state
	let filterStatus = writable('');
	let pageSize = 12;

	// Filter projects based on status
	$: filteredProjects = importedProjectListData.filter((project) => {
		if (!$filterStatus) return true;
		return project.status === $filterStatus;
	});

	// Sort projects based on selected sort option
	$: sortedProjects = [...filteredProjects].sort((a, b) => {
		if ($selectedSort === 'name') {
			return a.projectName.localeCompare(b.projectName);
		}
		if ($selectedSort === 'dueDate') {
			//@ts-ignore
			return new Date(a.dueDate) - new Date(b.dueDate);
		}
		return 0;
	});

	// Calculate total number of pages
	$: totalPages = Math.ceil(sortedProjects.length / pageSize);

	// Update displayed projects based on current page
	$: displayedProjects = sortedProjects.slice(
		($currentPage - 1) * pageSize,
		$currentPage * pageSize
	);

	// Go to previous page
	function prevPage() {
		if ($currentPage > 1) {
			currentPage.update((n) => n - 1);
		}
	}

	// Go to next page
	function nextPage() {
		if ($currentPage < totalPages) {
			currentPage.update((n) => n + 1);
		}
	}

	// Go to specific page
	function gotoPage(page: number) {
		currentPage.set(page);
	}
	function setFilterStatus(status: string) {
		filterStatus.set(status);
	}
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
	function deleteHandler() {}
	const tabs = ['All Projects', 'Active', 'Pending', 'On Hold', 'Completed'];
</script>

<div class="mb-5 flex flex-wrap items-center gap-5">
	<div class="shrink-0">
		<h6 class="card-title">My Projects ({sortedProjects.length})</h6>
	</div>
	<div class="md:mx-auto">
		<div class="group/form relative w-full md:w-80">
			<input
				type="text"
				class="form-input ltr:pl-9 rtl:pr-9"
				placeholder="Search for projects..."
				bind:value={$searchQuery}
			/>
			<div
				class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 ltr:left-3 rtl:right-3"
			>
				<LucideIcon name="Search" class="size-4" />
			</div>
		</div>
	</div>
	<div class="shrink-0">
		<ModalTrigger
			modalId="add-project-modal"
			icon="CirclePlus"
			text="Add Project"
			color="primary"
			class="btn"
			onClick={() => openAddForm()}
		/>
	</div>
</div>

<ul class="tabs overflow-x-auto">
	{#each tabs as tab}
		<li>
			<a
				href="#!"
				on:click={() => {
					setFilterStatus(tab === 'All Projects' ? '' : tab);
					activeTab.set(tab === 'All Projects' ? '' : tab);
				}}
				class="nav-item [&.active]:text-primary-500 [&.active]:after:w-full [&.active]:after:opacity-100"
				class:active={$activeTab === (tab === 'All Projects' ? '' : tab)}
			>
				{tab}
			</a>
		</li>
	{/each}
</ul>

<Grid class="mt-5 grid grid-cols-1 gap-x-5 md:grid-cols-2 2xl:grid-cols-4">
	{#if displayedProjects.length > 0}
		{#each displayedProjects as project}
			<Card class="card">
				<CardBody>
					<Dropdown class="dropdown float-end" alignTo="right-bottom">
						<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
							<i class="ri-more-fill"></i>
						</DropdownButton>
						<DropdownMenu class="dropdown-menu !fixed hidden p-2">
							<a href="/apps-projects-overview" class="dropdown-item">
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
					<div class="dark:border-dark-800 mb-3 size-12 rounded-md border border-gray-200 p-2">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img src={project.projectImage} alt="Project image" />
					</div>
					<h6 class="mb-1">{project.projectName}</h6>
					<p class="dark:text-dark-500 text-gray-500">{project.clientName}</p>

					<div
						class="dark:divide-dark-800 mt-3 grid grid-cols-2 divide-x divide-gray-200 rtl:divide-x-reverse"
					>
						<div class="p-2 text-center">
							<h6 class="mb-1">{project.dueDate}</h6>
							<p class="dark:text-dark-500 text-gray-500">Due Date</p>
						</div>
						<div class="p-2 text-center">
							<h6 class="mb-1">${project.totalAmount}</h6>
							<p class="dark:text-dark-500 text-gray-500">Total Amount</p>
						</div>
					</div>

					<div class="mt-5">
						<p class="dark:text-dark-500 mb-2 text-gray-500">
							Project {project.progress}% completed
						</p>
						<div class="progress-bar progress-1">
							<div
								class="progress-bar-wrap from-primary-500 bg-gradient-to-r via-purple-500 to-pink-500 text-white"
								style="width: {project.progress}%"
							></div>
						</div>
					</div>

					<div class="mt-5 flex items-center gap-2">
						<p class="dark:text-dark-500 text-gray-500">Assigned To:</p>
						<div class="flex grow -space-x-3">
							{#each project.assignees as assignee}
								<a href="#!" class="transition duration-300 ease-linear hover:z-10">
									<img
										class="dark:border-dark-900 size-8 rounded-full border-2 border-white"
										src={assignee.image}
										alt="Assignee avatar"
									/>
								</a>
							{/each}
						</div>
						<div class="shrink-0">
							<span
								class="badge"
								class:badge-purple={project.status === 'Active'}
								class:badge-orange={project.status === 'On Hold'}
								class:badge-yellow={project.status === 'Pending'}
								class:badge-green={project.status === 'Completed'}
							>
								{project.status}
							</span>
						</div>
					</div>
				</CardBody>
			</Card>
		{/each}
	{/if}
</Grid>

{#if displayedProjects.length === 0}
	<TableRowNotFound />
{/if}

{#if displayedProjects.length !== 0}
	<div class="mb-5 grid grid-cols-12 items-center gap-5">
		<div class="col-span-12 md:col-span-6">
			<p class="dark:text-dark-500 text-gray-500">
				Showing <b>{$currentPage * pageSize - pageSize + 1}</b> - <b>{$currentPage * pageSize}</b>
				of <b>{filteredProjects.length}</b> Results
			</p>
		</div>
		<div class="col-span-12 md:col-span-6">
			<div class="pagination pagination-primary flex justify-start md:justify-end">
				<button on:click={prevPage} disabled={$currentPage === 1} class="pagination-pre">
					<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
					<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
					Prev
				</button>
				{#each Array(totalPages) as _, index}
					<button
						on:click={() => gotoPage(index + 1)}
						class="pagination-item {$currentPage === index + 1 ? 'active' : ''}"
					>
						<span>{index + 1}</span>
					</button>
				{/each}
				<button on:click={nextPage} disabled={$currentPage === totalPages} class="pagination-next">
					Next
					<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
					<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- form module -->
<Modal modalId="add-project-modal" let:modalId>
	<ModalHeader {modalId}>
		<h6>Add Project</h6>
	</ModalHeader>
	<ProjectForm
		{addForm}
		{editMode}
		selectedCustomer={selectedCustomerDetails}
		on:click={openAddForm}
	/>
</Modal>

<!-- Delete module -->
<DeleteComponent {deleteHandler} />
