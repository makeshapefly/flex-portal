<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import ModalClose from '$lib/components/ui/modal/ModalClose.svelte';
	import { teachersData, type Teacher } from './teacher';
	import { formatDate } from '$lib/components/ui/timeline/timeline';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import TeacherDetailsForm from './TeacherDetailsForm.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';

	let teachers = [...teachersData];
	let displayedTeachers: Teacher[] = [...teachers];
	let filteredTeachers: Teacher[] = [...teachersData];
	let currentPage = 1;
	let itemsPerPage = 10;
	let searchQuery = writable('');
	let sortBy = '';
	let sortDirection: 'asc' | 'desc' = 'asc';
	let teacherToDelete = writable(null);

	// Add teacher IDs and handle image fallbacks
	let showingStart = 1;
	let showingEnd = itemsPerPage;
	let totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

	// Generate Avatar text from student's name
	function generateAvatarText(name: string): string {
		const nameParts = name.split(' ');
		if (nameParts.length > 1) {
			return nameParts[0][0] + nameParts[1][0];
		}
		return name[0];
	}

	// Sorting function
	const sort = (field: string) => {
		if (sortBy === field) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = field;
			sortDirection = 'asc';
		}

		teachers.sort((a: any, b: any) => {
			const aValue = a[field];
			const bValue = b[field];
			if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
			if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
		paginate();
	};

	// Pagination logic
	const paginate = () => {
		filteredTeachers = teachers.filter((teacher) => {
			const query = $searchQuery.toLowerCase();
			return (
				teacher.teacherName.toLowerCase().includes(query) ||
				teacher.email.toLowerCase().includes(query)
			);
		});
		totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
		showingStart = (currentPage - 1) * itemsPerPage + 1;
		showingEnd = Math.min(currentPage * itemsPerPage, filteredTeachers.length);
		displayedTeachers = filteredTeachers.slice((currentPage - 1) * itemsPerPage, showingEnd);
	};

	// Handle next and previous page navigation
	const prevPage = () => {
		if (currentPage > 1) {
			currentPage--;
			paginate();
		}
	};

	const nextPage = () => {
		if (currentPage < totalPages) {
			currentPage++;
			paginate();
		}
	};

	const gotoPage = (page: number) => {
		currentPage = page;
		paginate();
	};

	function deleteTeacher(index: number) {
		teachers = teachers.filter((_, i) => i !== index); // Remove holiday by index
		paginate();
		teacherToDelete.set(null);
	}

	let teacherForm = writable({
		title: '',
		teacherName: '',
		email: '',
		phone: '',
		salary: '',
		experience: '',
		lastSchool: '',
		date: ''
	});

	// Error messages
	let errors: any = writable({
		title: '',
		teacherName: '',
		email: '',
		phone: '',
		salary: '',
		experience: '',
		lastSchool: '',
		date: ''
	});

	// Form state
	let showAddTeacherForm = writable(true); // Controls whether we are adding or editing
	let teacherToEdit = writable<any | null>(null); // This will store the teacher to edit if necessary

	// Initialize pagination on mount
	onMount(() => {
		let startID = 1595; // Starting ID
		teachersData.forEach((teacher, index) => {
			teacher.teacherID = 'PET-' + (startID + index).toString();
			teacher.avatarText = generateAvatarText(teacher.teacherName);
			teachers.push(teacher);
		});
		paginate();
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

<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} md={{ span: 3 }} class="card">
		<CardBody>
			<div
				class="flex size-12 items-center justify-center rounded-full border border-yellow-500/20 bg-yellow-500/10"
			>
				<LucideIcon name="Archive" class="size-5 fill-yellow-500/20 text-yellow-500" />
			</div>
			<div class="mt-4">
				<h6 class="mb-2">English teacher of the month</h6>
				<div class="flex items-center gap-2">
					<img src="/assets/images/avatar/user-11.png" alt="" class="size-6 rounded-full" />
					<p class="dark:text-dark-500 text-gray-500">Ronnie Gunderson</p>
				</div>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 3 }} class="card">
		<CardBody>
			<div
				class="flex size-12 items-center justify-center rounded-full border border-sky-500/20 bg-sky-500/10"
			>
				<LucideIcon name="Blend" class="size-5 fill-sky-500/20 text-sky-500" />
			</div>
			<div class="mt-4">
				<h6 class="mb-2">Physics teacher of the month</h6>
				<div class="flex items-center gap-2">
					<img src="/assets/images/avatar/user-15.png" alt="" class="size-6 rounded-full" />
					<p class="dark:text-dark-500 text-gray-500">April Lovell</p>
				</div>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 3 }} class="card">
		<CardBody>
			<div
				class="flex size-12 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10"
			>
				<LucideIcon name="Container" class="size-5 fill-green-500/20 text-green-500" />
			</div>
			<div class="mt-4">
				<h6 class="mb-2">History teacher of the month</h6>
				<div class="flex items-center gap-2">
					<img src="/assets/images/avatar/user-16.png" alt="" class="size-6 rounded-full" />
					<p class="dark:text-dark-500 text-gray-500">Elisa Harris</p>
				</div>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 3 }} class="card">
		<CardBody>
			<div
				class="flex size-12 items-center justify-center rounded-full border border-red-500/20 bg-red-500/20"
			>
				<LucideIcon name="Cross" class="size-5 fill-red-500/20 text-red-500" />
			</div>
			<div class="mt-4">
				<h6 class="mb-2">Biology teacher of the month</h6>
				<div class="flex items-center gap-2">
					<img src="/assets/images/avatar/user-17.png" alt="" class="size-6 rounded-full" />
					<p class="dark:text-dark-500 text-gray-500">Jeanne Lane</p>
				</div>
			</div>
		</CardBody>
	</Col>
</Grid>

<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<div class="gap-space grid grid-cols-12 items-center">
				<div class="col-span-12 md:col-span-4 2xl:col-span-3">
					<div class="group/form relative grow">
						<input
							type="email"
							bind:value={$searchQuery}
							on:input={paginate}
							class="form-input ltr:pl-9 ltr:group-[&.right]/form:pl-4 ltr:group-[&.right]/form:pr-9 rtl:pr-9 rtl:group-[&.right]/form:pl-9 rtl:group-[&.right]/form:pr-4"
							placeholder="Search for ..."
						/>
						<button
							class="absolute inset-y-0 flex items-center focus:outline-none ltr:left-3 ltr:group-[&.right]/form:left-auto ltr:group-[&.right]/form:right-3 rtl:right-3 rtl:group-[&.right]/form:left-3 rtl:group-[&.right]/form:right-auto"
						>
							<LucideIcon
								name="Search"
								class="dark:text-dark-500 dark:fill-dark-850 size-4 fill-gray-100 text-gray-500"
							/>
						</button>
					</div>
				</div>
				<div
					class="col-span-12 md:col-span-4 md:col-start-9 2xl:col-span-2 2xl:col-start-11 md:ltr:text-right md:rtl:text-left"
				>
					<ModalTrigger
						modalId="add-teacher-modal"
						icon="CirclePlus"
						text="Add Teacher"
						class=" btn float-end shrink-0"
						onClick={() => openAddForm()}
					/>
				</div>
			</div>
		</CardHeader>
		<CardBody class="pt-0">
			<div>
				<div class="table-box overflow-x-auto whitespace-nowrap">
					<table class="flush table">
						<thead>
							<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
								<th class="cursor-pointer" on:click={() => sort('teacherID')}>
									ID <span
										>{sortBy === 'teacherID' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th class="cursor-pointer" on:click={() => sort('teacherName')}>
									Teacher Name <span
										>{sortBy === 'teacherName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th class="cursor-pointer" on:click={() => sort('email')}>
									Email <span
										>{sortBy === 'email' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th class="cursor-pointer" on:click={() => sort('phone')}>
									Phone <span
										>{sortBy === 'phone' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th class="cursor-pointer" on:click={() => sort('salary')}>
									Salary <span
										>{sortBy === 'salary' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th class="cursor-pointer" on:click={() => sort('experience')}>
									Experience <span
										>{sortBy === 'experience' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th class="cursor-pointer" on:click={() => sort('title')}>
									Title <span
										>{sortBy === 'title' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th class="cursor-pointer" on:click={() => sort('date')}>
									Joining Date <span
										>{sortBy === 'date' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
									>
								</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{#each displayedTeachers as teacher, index}
								<tr class="*:px-3 *:py-2.5">
									<td>{teacher.teacherID}</td>
									<td>
										<div class="flex items-center gap-3">
											<div
												class="dark:text-dark-500 dark:bg-dark-850 relative size-8 rounded-full bg-gray-100 text-gray-500"
											>
												{#if teacher.image}
													<img src={teacher.image} alt="" class="rounded-full" />
												{:else}
													<span
														class="dark:text-dark-500 dark:bg-dark-850 absolute inset-0 flex items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500"
														>{teacher.avatarText}</span
													>
												{/if}
											</div>
											<div>
												<h6><a href="/apps-school-teachers-overview">{teacher.teacherName}</a></h6>
											</div>
										</div>
									</td>
									<td>{teacher.email}</td>
									<td>+{teacher.phone}</td>
									<td>{teacher.salary}</td>
									<td>{teacher.experience}</td>
									<td>
										<span
											class={teacher.title === 'Teacher'
												? 'badge badge-primary'
												: teacher.title === 'Professor'
													? 'badge badge-purple'
													: teacher.title === 'Instructor'
														? 'badge badge-green'
														: teacher.title === 'Lecturer'
															? 'badge badge-red'
															: teacher.title === 'Senior Lecturer'
																? 'badge badge-orange'
																: teacher.title === 'Associate Professor'
																	? 'badge badge-gray'
																	: teacher.title === 'Assistant Professor'
																		? 'badge badge-indigo'
																		: teacher.title === 'Assistant'
																			? 'badge badge-yellow'
																			: ''}
										>
											{teacher.title}
										</span>
									</td>
									<td>{formatDate(teacher.date)}</td>
									<td>
										<div class="flex items-center gap-2">
											<ModalTrigger
												modalId="add-teacher-modal"
												color=""
												icon="Pencil"
												class="btn-sub-gray btn-icon !size-8 place-items-center rounded-md"
												iconCss="!size-3"
												onClick={() => openEditForm(teacher)}
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
							{#if displayedTeachers.length === 0}
								<tr>
									<td colspan="10" class="!p-8">
										<TableRowNotFound />
									</td>
								</tr>
							{/if}
						</tbody>
					</table>
				</div>

				<div class="mt-space gap-space grid grid-cols-12 items-center">
					<div class="col-span-12 text-center md:col-span-6 ltr:md:text-left rtl:md:text-right">
						<p class="dark:text-dark-500 text-gray-500">
							Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of
							<b>{filteredTeachers.length}</b> Results
						</p>
					</div>
					<div class="col-span-12 md:col-span-6">
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
									class="pagination-item"
									class:active={currentPage === page}
								>
									{page}
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
</Grid>

<!-- Teacher Component Form -->
<Modal modalId="add-teacher-modal" let:modalId>
	<ModalHeader {modalId}>
		<h6>{showAddTeacherForm ? 'Add Teacher' : 'Edit Teacher'}</h6>
	</ModalHeader>
	<ModalBody>
		<TeacherDetailsForm {addForm} {editMode} selectedCustomer={selectedCustomerDetails} />
	</ModalBody>
</Modal>

<DeleteComponent />
