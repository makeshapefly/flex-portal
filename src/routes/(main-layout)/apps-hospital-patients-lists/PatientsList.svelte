<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { patientsData } from './patients';

	let searchTerm = '';
	let displayedPatients = patientsData;
	let currentPage = 1;
	let perPage = 16;
	let showingStart = 1;
	let showingEnd = Math.min(perPage, displayedPatients.length);
	let totalPages = Math.ceil(displayedPatients.length / perPage);

	// Filter the patients based on the search term
	function filterPatients() {
		displayedPatients = patientsData.filter((patient) => {
			return (
				patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
				patient.phoneNumber.includes(searchTerm)
			);
		});
		// Update pagination when filtering
		totalPages = Math.ceil(displayedPatients.length / perPage);
		currentPage = 1; // Reset to first page after filtering
		updatePagination();
	}

	// Calculate pagination
	let currentPatients = displayedPatients.slice((currentPage - 1) * perPage, currentPage * perPage);

	// Pagination functions
	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
			updatePagination();
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
			updatePagination();
		}
	}

	function gotoPage(page: number) {
		currentPage = page;
		updatePagination();
	}

	function updatePagination() {
		showingStart = (currentPage - 1) * perPage + 1;
		showingEnd = Math.min(currentPage * perPage, displayedPatients.length);
		currentPatients = displayedPatients.slice((currentPage - 1) * perPage, currentPage * perPage);
	}

	function getDataForDelete(data: any) {
		console.log(data);
	}
</script>

<div class="justify-between sm:flex">
	<div>
		<div class="group/form relative">
			<input
				type="email"
				bind:value={searchTerm}
				on:input={filterPatients}
				class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
				placeholder="Search for patients..."
			/>
			<div
				class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
			>
				<LucideIcon name="Search" class="size-4" />
			</div>
		</div>
	</div>
	<div>
		<div class="mt-2 flex flex-wrap items-center justify-end gap-2 sm:mt-0">
			<button type="button" class="btn btn-sub-gray" data-drawer-target="filterSidebar">
				<LucideIcon name="SlidersHorizontal" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Filters
			</button>
			<a href="/apps-hospital-patients-create" class="btn btn-primary">
				<LucideIcon name="CirclePlus" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Add Patient
			</a>
		</div>
	</div>
</div>

<div>
	<div class="gap-x-space mt-space grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4">
		{#each currentPatients as patient, index (patient.name)}
			<Card class="relative">
				<CardBody>
					<Dropdown class="dropdown dropdown-right ltr:float-right rtl:float-left" alignTo="auto">
						<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
							<i class="ri-more-fill"></i>
						</DropdownButton>
						<DropdownMenu class="dropdown-menu !fixed p-2">
							<a href="#!" class="dropdown-item">
								<i class="ri-eye-line align-middle ltr:mr-2 rtl:ml-2"></i> <span>Overview</span>
							</a>

							<a href="/apps-hospital-patients-create" class="dropdown-item">
								<i class="ri-pencil-line align-middle ltr:mr-2 rtl:ml-2"></i> <span>Edit</span>
							</a>
							<ModalTrigger
								modalId="delete-file-modal"
								color=""
								icon="Trash2"
								class="dropdown-item justify-start"
								text="Delete"
								onClick={() => getDataForDelete(event)}
							/>
						</DropdownMenu>
					</Dropdown>
					<div class="flex items-center gap-3">
						<img src={patient.image} alt="" class="size-20 shrink-0 rounded-md" />
						<div class="grow">
							<h6 class="mb-1.5">
								<a href="#!">
									{patient.name}
								</a>
							</h6>
							<p class="dark:text-dark-500 mb-1 text-gray-500">
								<i class="ri-mail-line ltr:mr-1 rtl:ml-1"></i>
								<span class="align-middle">{patient.email}</span>
							</p>
							<p class="dark:text-dark-500 text-gray-500">
								<i class="ri-phone-line ltr:mr-1 rtl:ml-1"></i>
								<span class="align-middle">{patient.phoneNumber}</span>
							</p>
						</div>
					</div>
				</CardBody>
			</Card>
		{/each}

		{#if currentPatients.length === 0}
			<Col cols={{ span: 12 }} class="p-8">
				<TableRowNotFound />
			</Col>
		{/if}
	</div>

	{#if currentPatients.length !== 0}
		<Grid cols={12} gap={5} class="mb-5 items-center">
			<Col
				cols={{ span: 12 }}
				md={{ span: 6 }}
				class="flex flex-wrap justify-center md:justify-start"
			>
				<p class="dark:text-dark-500 text-gray-500">
					Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{displayedPatients.length}</b> Results
				</p>
			</Col>
			<Col cols={{ span: 12 }} md={{ span: 6 }}>
				<div class="pagination pagination-primary flex justify-center md:justify-end">
					<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
						<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
						Prev
					</button>
					{#each Array(totalPages)
						.fill(0)
						.map((_, i) => i + 1) as page}
						<button
							on:click={() => gotoPage(page)}
							class="pagination-item {currentPage === page ? 'active' : ''}"
						>
							<span>{page}</span>
						</button>
					{/each}
					<button on:click={nextPage} disabled={currentPage === totalPages} class="pagination-next">
						Next
						<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
					</button>
				</div>
			</Col>
		</Grid>
	{/if}
</div>

<DeleteComponent />
