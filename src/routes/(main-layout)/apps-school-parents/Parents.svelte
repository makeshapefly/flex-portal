<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import { parentsData } from './parents';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import { Delete } from 'lucide-svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
	import ParentDetailsForm from './ParentDetailsForm.svelte';

	// Initial data

	let parentsDataCopy = [...parentsData];
	let displayedParents = writable(parentsDataCopy);
	let currentPage = 1;
	let perPage = 10;
	let sortBy: string = '';
	let sortDirection: 'asc' | 'desc' = 'asc';
	let showingStart = 1;
	let showingEnd = perPage;
	let searchQuery = writable('');
	let totalPages = Math.ceil(parentsData.length / perPage);
	let parentToDelete = writable(null);

	// Generate Avatar Text
	function generateAvatarText(name: string) {
		const nameParts = name.split(' ');
		if (nameParts.length > 1) return nameParts[0][0] + nameParts[1][0];
		return name[0];
	}

	// Sorting function
	function sort(field: string) {
		if (sortBy === field) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = field;
			sortDirection = 'asc';
		}

		parentsDataCopy.sort((a: any, b: any) => {
			if (sortDirection === 'asc') {
				return a[field] > b[field] ? 1 : -1;
			} else {
				return a[field] < b[field] ? 1 : -1;
			}
		});

		updatePagination();
	}

	// Pagination functions
	function updatePagination() {
		let filteredParents = parentsDataCopy.filter((parents) => {
			const query = $searchQuery.toLowerCase();
			return (
				parents.studentName.toLowerCase().includes(query) ||
				parents.parentsName.toLowerCase().includes(query)
			);
		});

		showingStart = (currentPage - 1) * perPage + 1;
		showingEnd = Math.min(currentPage * perPage, filteredParents.length);
		totalPages = Math.ceil(filteredParents.length / perPage);

		displayedParents.set(filteredParents.slice((currentPage - 1) * perPage, currentPage * perPage));
	}

	function deleteParent(index: number) {
		parentsDataCopy = parentsDataCopy.filter((_, i) => i !== index);
		updatePagination();
		parentToDelete.set(null);
	}

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

	// Initialize pagination
	onMount(() => {
		updatePagination();
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
	<CardHeader>
		<div class="grid grid-cols-12 items-center">
			<div class="col-span-3">
				<div class="group/form relative grow">
					<input
						type="email"
						bind:value={$searchQuery}
						on:input={updatePagination}
						class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
						placeholder="Search student, class etc. ..."
					/>
					<button
						class="absolute inset-y-0 flex items-center focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
					>
						<LucideIcon
							name="Search"
							class="dark:text-dark-500 dark:fill-dark-850 size-4 fill-gray-100 text-gray-500"
						/>
					</button>
				</div>
			</div>
			<!--end col-->
			<div class="col-span-2 col-start-11">
				<ModalTrigger
					modalId="add-parents"
					text="Add Parents"
					icon="CirclePlus"
					class="btn btn-primary float-end shrink-0"
					onClick={() => openAddForm()}
				/>
			</div>
		</div>
	</CardHeader>
	<CardBody class="pt-0">
		<div>
			<div class="table-box overflow-x-auto whitespace-nowrap">
				<table class="flush table">
					<tbody>
						<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
							<th class="cursor-pointer !font-medium" on:click={() => sort('parentsName')}>
								Parents Name <span
									>{sortBy === 'parentsName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('studentName')}>
								Student Name <span
									>{sortBy === 'studentName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('relation')}>
								Relation <span
									>{sortBy === 'relation' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('occupation')}>
								Occupation <span
									>{sortBy === 'occupation' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('gender')}>
								Gender <span
									>{sortBy === 'gender' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('email')}>
								Email <span>{sortBy === 'email' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('phone')}>
								Phone <span>{sortBy === 'phone' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('address')}>
								Address <span
									>{sortBy === 'address' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="!font-medium">Action</th>
						</tr>
						{#each $displayedParents as student, index}
							<tr class="*:px-3 *:py-2.5">
								<td>{student.parentsName}</td>
								<td>
									<div class="flex items-center gap-3">
										<div
											class="dark:bg-dark-850 dark:text-dark-500 relative size-8 rounded-full bg-gray-100 text-gray-500"
										>
											<img src={student.image} alt="" class="rounded-full" />
											{#if !student.image}
												<span
													class="dark:bg-dark-850 dark:text-dark-500 absolute inset-0 flex items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500"
												>
													{generateAvatarText(student.studentName)}
												</span>
											{/if}
										</div>
										<div>
											<h6><a href="#!">{student.studentName}</a></h6>
										</div>
									</div>
								</td>
								<td>{student.relation}</td>
								<td>{student.occupation}</td>
								<td>{student.gender}</td>
								<td>{student.email}</td>
								<td>{`+ ${student.phone}`}</td>
								<td>{student.address}</td>
								<td>
									<div class="flex items-center gap-2">
										<ModalTrigger
											modalId="add-parents"
											color=""
											icon="Pencil"
											iconCss="!size-3"
											class=" btn-sub-gray btn-icon !size-8 place-items-center rounded-md"
											onClick={() => openEditForm(student)}
										/>
										<ModalTrigger
											modalId="delete-file-modal"
											icon="Trash2"
											color=""
											iconCss="!size-3.5"
											class=" btn-sub-red btn-icon !size-8 place-items-center rounded-md"
										></ModalTrigger>
									</div>
								</td>
							</tr>
						{/each}
						{#if $displayedParents.length === 0}
							<tr>
								<td colspan="10" class="!p-8">
									<TableRowNotFound />
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>

			<!-- Pagination -->
			{#if $displayedParents.length > 0}
				<div class="mt-5 grid grid-cols-12 items-center gap-5">
					<div class="col-span-12 text-center md:col-span-6 ltr:md:text-left rtl:md:text-right">
						<p class="dark:text-dark-500 text-gray-500">
							Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{parentsData.length}</b> Results
						</p>
					</div>
					<div class="col-span-12 md:col-span-6">
						<div class="pagination pagination-primary flex justify-center md:justify-end">
							<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
								<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
								<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
								Prev
							</button>
							{#each Array(totalPages) as _, page}
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
			{/if}
		</div>
	</CardBody>
</Col>

<Modal modalId="add-parents" let:modalId>
	<ModalBody class="p-2 ">
		<ParentDetailsForm {addForm} {editMode} selectedCustomer={selectedCustomerDetails} />
	</ModalBody>
</Modal>

<DeleteComponent />
