<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { studentsListData } from './student';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';

	interface Student {
		studentID?: string;
		studentName: string;
		image?: string;
		gender: string;
		rollNo: string;
		class: string;
		email: string;
		phone: string;
		birthDate: string;
		date: string;
		avatarText?: string;
	}

	let students: Student[] = [];
	let sortBy: string = 'studentID';
	let sortDirection: 'asc' | 'desc' = 'asc';
	let displayedStudents: Student[] = [];
	let currentPage: number = 1;
	let pageSize: number = 10;
	let showingStart = 1;
	let showingEnd = pageSize;
	let totalPages = 0;
	let searchQuery = writable('');
	let studentToDelete = writable(null);

	// Generate Avatar text from student's name
	function generateAvatarText(name: string): string {
		const nameParts = name.split(' ');
		if (nameParts.length > 1) {
			return nameParts[0][0] + nameParts[1][0];
		}
		return name[0];
	}

	function deleteStudent(index: number) {
		students = students.filter((_, i) => i !== index);
		updatePagination();
		studentToDelete.set(null);
	}

	// Sort students based on the selected column
	function sort(column: string) {
		if (sortBy === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = column;
			sortDirection = 'asc';
		}

		students.sort((a: any, b: any) => {
			const aValue = a[column as keyof Student];
			const bValue = b[column as keyof Student];

			if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
			if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});

		updatePagination();
	}

	// Handle page navigation
	function prevPage() {
		if (currentPage > 1) currentPage--;
		updatePagination();
	}

	function nextPage() {
		if (currentPage < totalPages) currentPage++;
		updatePagination();
	}

	function gotoPage(page: number) {
		currentPage = page;
		updatePagination();
	}

	// Update displayed students based on pagination
	function updatePagination() {
		let filteredStudents = students.filter((student) => {
			const query = $searchQuery.toLowerCase();
			return (
				student.studentName.toLowerCase().includes(query) ||
				student.class.toLowerCase().includes(query) ||
				student.rollNo.toLowerCase().includes(query) ||
				student.email.toLowerCase().includes(query)
			);
		});

		// Update pagination based on filtered results
		showingStart = (currentPage - 1) * pageSize + 1;
		showingEnd = Math.min(currentPage * pageSize, filteredStudents.length);
		totalPages = Math.ceil(filteredStudents.length / pageSize);
		displayedStudents = filteredStudents.slice(
			(currentPage - 1) * pageSize,
			currentPage * pageSize
		);
	}

	// Add student ID and avatar text to the list
	onMount(() => {
		let startID = 1595; // Starting ID
		studentsListData.forEach((student, index) => {
			student.studentID = 'PES-' + (startID + index).toString();
			student.avatarText = generateAvatarText(student.studentName);
			students.push(student);
		});

		updatePagination();
	});
</script>

<Col cols={{ span: 12 }} class="card">
	<CardHeader>
		<div class="flex flex-wrap justify-between gap-5">
			<div>
				<div class="group/form relative grow">
					<input
						type="text"
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
			<div>
				<div class="items-center gap-5 sm:flex">
					<select name="" id="" class="form-input w-full">
						<option value="" disabled selected hidden>Sorting by class</option>
						<option value="">12 (A)</option>
						<option value="">12 (B)</option>
						<option value="">11 (B)</option>
						<option value="">11 (B)</option>
						<option value="">10 (B)</option>
						<option value="">9</option>
						<option value="">8</option>
					</select>
					<a href="/apps-school-students-admission" class="btn btn-primary mt-5 shrink-0 sm:mt-0">
						<LucideIcon name="CirclePlus" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
						Add Student
					</a>
				</div>
			</div>
		</div>
	</CardHeader>
	<CardBody class="pt-0">
		<div>
			<div class="table-box overflow-x-auto whitespace-nowrap">
				<table class="flush table">
					<thead>
						<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
							<th on:click={() => sort('studentID')} class="cursor-pointer !font-medium"
								>ID <span
									>{sortBy === 'studentID' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								></th
							>
							<th on:click={() => sort('studentName')} class="cursor-pointer !font-medium"
								>Student Name <span
									>{sortBy === 'studentName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								></th
							>
							<th on:click={() => sort('gender')} class="cursor-pointer !font-medium"
								>Gender <span
									>{sortBy === 'gender' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								></th
							>
							<th on:click={() => sort('rollNo')} class="cursor-pointer !font-medium"
								>Roll No <span
									>{sortBy === 'rollNo' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								></th
							>
							<th on:click={() => sort('class')} class="cursor-pointer !font-medium"
								>Class <span>{sortBy === 'class' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								></th
							>
							<th on:click={() => sort('email')} class="cursor-pointer !font-medium"
								>Email <span>{sortBy === 'email' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								></th
							>
							<th on:click={() => sort('phone')} class="cursor-pointer !font-medium"
								>Phone <span>{sortBy === 'phone' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								></th
							>
							<th on:click={() => sort('birthDate')} class="cursor-pointer !font-medium"
								>Birth Of Date <span
									>{sortBy === 'birthDate' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								></th
							>
							<th on:click={() => sort('date')} class="cursor-pointer !font-medium"
								>Joining Date <span
									>{sortBy === 'date' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								></th
							>
							<th class="!font-medium">Action</th>
						</tr>
					</thead>
					<tbody>
						{#if displayedStudents.length > 0}
							{#each displayedStudents as student, index}
								<tr class="*:px-3 *:py-2.5">
									<td>{student.studentID}</td>
									<td>
										<div class="flex items-center gap-3">
											<div
												class="dark:text-dark-500 dark:bg-dark-850 relative size-8 rounded-full bg-gray-100 text-gray-500"
											>
												{#if student.image}
													<img src={student.image} alt="" class="rounded-full" />
												{:else}
													<span
														class="dark:text-dark-500 dark:bg-dark-850 absolute inset-0 flex items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500"
														>{student.avatarText}</span
													>
												{/if}
											</div>
											<div>
												<h6><a href="/apps-school-students-overview">{student.studentName}</a></h6>
											</div>
										</div>
									</td>
									<td>{student.gender}</td>
									<td>{student.rollNo}</td>
									<td>{student.class}</td>
									<td>{student.email}</td>
									<td>{student.phone}</td>
									<td>{student.birthDate}</td>
									<td>{student.date}</td>
									<td>
										<div class="flex items-center gap-2">
											<button class="btn btn-sub-primary btn-icon !size-8" aria-label="edit"
												><i class="ri-pencil-line"></i></button
											>
											<ModalTrigger
												modalId="delete-file-modal"
												icon="Trash2"
												color=""
												iconCss="!size-3.5"
												class=" btn-sub-red btn-icon !size-8 place-items-center"
											></ModalTrigger>
										</div>
									</td>
								</tr>
							{/each}
						{:else}
							<tr>
								<td colspan="10" class="!p-8">
									<TableRowNotFound />
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>

			{#if displayedStudents.length > 0}
				<div class="mt-space gap-space grid grid-cols-12 items-center">
					<div class="col-span-12 flex flex-wrap justify-center xl:col-span-6 xl:justify-start">
						<p class="dark:text-dark-500 text-gray-500">
							Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b> {students.length}</b>
							Results
						</p>
					</div>
					<div class="col-span-12 md:col-span-6">
						<div class="pagination pagination-primary flex justify-end">
							<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
								<LucideIcon
									name="ChevronLeft"
									class="mr-1 size-4 ltr:inline-block rtl:hidden"
								/>Prev</button
							>
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
								>Next<LucideIcon
									name="ChevronRight"
									class="ml-1 size-4 ltr:inline-block rtl:hidden"
								/></button
							>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</CardBody>
</Col>

<DeleteComponent />
