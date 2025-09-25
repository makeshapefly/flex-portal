<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import ProjectHead from '$lib/components/common/ProjectHead.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { tasksData } from './project-task';
	import { todoTasksData } from './todo-task';

	let displayedProjects = [...tasksData];
	let sortBy = '';
	let sortDirection = 'asc';
	let currentPage = 1;
	const itemsPerPage = 5;

	const totalPages = Math.ceil(tasksData.length / itemsPerPage);
	const showingStart = (currentPage - 1) * itemsPerPage + 1;
	const showingEnd = Math.min(currentPage * itemsPerPage, tasksData.length);
	let todayTasks = todoTasksData.filter((task) => task.date === 'today');
	let yesterdayTasks = todoTasksData.filter((task) => task.date === 'yesterday');

	// To count tasks
	let todayTasksCount = todayTasks.length;
	let yesterdayTasksCount = yesterdayTasks.length;

	let newTask = '';

	// Add new task
	function addTask() {
		if (newTask.trim()) {
			const newTaskObj = { text: newTask, completed: false, editing: false, date: 'today' };
			todayTasks = [...todayTasks, newTaskObj];
			todayTasksCount = todayTasks.length;
			newTask = '';
		}
	}

	function enableEditing(task: any) {
		task.editing = true;
		todayTasks = [...todayTasks]; // Ensure reactivity
	}

	function saveTask(task: any) {
		task.editing = false;
		todayTasks = [...todayTasks]; // Trigger reactivity
	}

	function handleTaskKeyDown(event: KeyboardEvent, task: any) {
		if (event.key === 'Enter') {
			saveTask(task); // Save the task when Enter is pressed
		}
	}

	function disableEditing(task: any) {
		task.editing = false;
		todayTasks = [...todayTasks]; // Ensure reactivity
	}

	// Delete task
	function deleteTask(task: any) {
		if (task.date === 'today') {
			todayTasks = todayTasks.filter((t) => t !== task);
			todayTasksCount = todayTasks.length;
		} else {
			yesterdayTasks = yesterdayTasks.filter((t) => t !== task);
			yesterdayTasksCount = yesterdayTasks.length;
		}
	}

	// Sorting function
	function sort(column: string) {
		sortDirection = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
		sortBy = column;
		displayedProjects = [...tasksData].sort((a: any, b: any) => {
			if (a[column] < b[column]) return sortDirection === 'asc' ? -1 : 1;
			if (a[column] > b[column]) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	function gotoPage(page: number) {
		currentPage = page;
	}

	// Count Total Tasks
	const totalTasks = tasksData.length;

	// Count New Tasks
	const newTasks = tasksData.filter((task) => task.status === 'New').length;

	// Count Pending Tasks
	const pendingTasks = tasksData.filter((task) => task.status === 'Pending').length;

	// Count Completed Tasks
	const completedTasks = tasksData.filter((task) => task.status === 'Completed').length;
</script>

<ProjectHead variant="task" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 8 }}>
		<div class="gap-x-space grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
			<Card>
				<CardBody>
					<div class="relative">
						<div class="bg-primary-500/20 absolute top-0 z-0 size-11 blur-md"></div>
						<LucideIcon
							name="Dessert"
							class="fill-primary-500/10 text-primary-500 relative size-10 stroke-1"
						/>
					</div>
					<h6 class="mt-6">{totalTasks}</h6>
					<p class="dark:text-dark-500 text-gray-500">Total Task</p>
				</CardBody>
			</Card>

			<Card>
				<CardBody>
					<div class="relative">
						<div class="bg-purple-500/20 absolute top-0 z-0 size-11 blur-md"></div>
						<LucideIcon
							name="Cross"
							class="relative text-purple-500 stroke-1 size-10 fill-purple-500/10"
						/>
					</div>
					<h6 class="mt-6">{newTasks}</h6>
					<p class="dark:text-dark-500 text-gray-500">New Task</p>
				</CardBody>
			</Card>

			<Card>
				<CardBody>
					<div class="relative">
						<div class="bg-yellow-500/20 absolute top-0 z-0 size-11 blur-md"></div>
						<LucideIcon
							name="Hourglass"
							class="relative text-yellow-500 stroke-1 size-10 fill-yellow-500/10"
						/>
					</div>
					<h6 class="mt-6">{pendingTasks}</h6>
					<p class="dark:text-dark-500 text-gray-500">Pending Task</p>
				</CardBody>
			</Card>

			<Card>
				<CardBody>
					<div class="relative">
						<div class="bg-green-500/20 absolute top-0 z-0 size-11 blur-md"></div>
						<LucideIcon
							name="CircleCheckBig"
							class="relative text-green-500 stroke-1 size-10 fill-green-500/10"
						/>
					</div>
					<h6 class="mt-6">{completedTasks}</h6>
					<p class="dark:text-dark-500 text-gray-500">Completed Task</p>
				</CardBody>
			</Card>
		</div>
		<div class="gap-space flex items-center">
			<h6 class="grow">Project Tasks</h6>
			<button type="button" class="btn btn-primary shrink-0">Add Task</button>
		</div>

		<div class="my-5">
			<div class="overflow-x-auto">
				<table class="flush table whitespace-nowrap">
					<tbody>
						<tr class="dark:text-dark-500 text-gray-500">
							<th on:click={() => sort('taskName')} class="cursor-pointer !font-medium">
								Task Name <span
									>{sortBy === 'taskName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th on:click={() => sort('createDate')} class="cursor-pointer !font-medium">
								Create Date <span
									>{sortBy === 'createDate' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium">Assigned To</th>
							<th on:click={() => sort('status')} class="cursor-pointer !font-medium">
								Status <span
									>{sortBy === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th on:click={() => sort('priority')} class="cursor-pointer !font-medium">
								Priority <span
									>{sortBy === 'priority' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium">Action</th>
						</tr>
						{#each displayedProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as project}
							<tr>
								<td>{project.taskName}</td>
								<td>{project.createDate}</td>
								<td>
									<div class="ml-3 flex grow -space-x-3">
										{#each project.assignees as assignee}
											<a
												href="#!"
												class="transition duration-300 ease-linear hover:z-10"
												title="avatar link"
											>
												<img
													class="dark:border-dark-900 size-8 rounded-full border-2 border-white"
													src={assignee}
													alt=""
												/>
											</a>
										{/each}
									</div>
								</td>
								<td>
									<span
										class="badge"
										class:badge-purple={project.status === 'New'}
										class:badge-yellow={project.status === 'Pending'}
										class:badge-green={project.status === 'Completed'}
									>
										{project.status}
									</span>
								</td><td>
									<span
										class="badge"
										class:badge-red={project.priority === 'High'}
										class:badge-green={project.priority === 'Low'}
									>
										{project.priority}
									</span>
								</td>
								<td>
									<Dropdown class="dropdown">
										<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
											<i class="ri-more-2-fill"></i>
										</DropdownButton>
										<DropdownMenu class="dropdown-menu !fixed hidden p-2">
											<a href="#!" class="dropdown-item">
												<i class="ri-eye-line align-middle ltr:mr-2 rtl:ml-2"></i>
												<span>Overview</span>
											</a>
											<a href="#!" class="dropdown-item">
												<i class="ri-pencil-line align-middle ltr:mr-2 rtl:ml-2"></i>
												<span>Edit</span>
											</a>
											<ModalTrigger
												modalId="delete-file-modal"
												icon="Trash2"
												text="Delete"
												color=""
												class="dropdown-item justify-start"
											></ModalTrigger>
										</DropdownMenu>
									</Dropdown>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<div class="gap-space mt-5 grid grid-cols-12 items-center">
				<div class="col-span-12 text-center md:col-span-6 ltr:md:text-left rtl:md:text-right">
					<p class="dark:text-dark-500 text-gray-500">
						Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{tasksData.length}</b> Results
					</p>
				</div>

				<div class="col-span-12 md:col-span-6">
					<div class="pagination pagination-primary flex justify-center md:justify-end">
						<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
							Prev
						</button>
						{#each Array(totalPages) as _, i}
							<button
								on:click={() => gotoPage(i + 1)}
								class="pagination-item"
								class:active={currentPage === i + 1}
							>
								{i + 1}
							</button>
						{/each}
						<button
							on:click={nextPage}
							disabled={currentPage === totalPages}
							class="pagination-next"
						>
							Next
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</Col>

	<Col
		cols={{ span: 12 }}
		lg={{ span: 6 }}
		xl={{ span: 4 }}
		class="col-span-12 lg:col-span-6 xl:col-span-4"
	>
		<Card>
			<CardHeader>
				<CardTitle>To Do Lists</CardTitle>
			</CardHeader>
			<CardBody>
				<div class="space-y-3">
					<fieldset class="space-y-3">
						<h6>Today (<span>{todayTasksCount}</span>)</h6>
						{#each todayTasks as task, index}
							<div class="grid grid-cols-[1fr_36px] items-center gap-6">
								<div class="input-check-group">
									<input
										type="checkbox"
										class="input-check input-check-primary"
										bind:checked={task.completed}
									/>
									{#if !task.editing}
										<span
											class="dark:text-dark-50 select-none text-gray-800 ltr:ml-3 rtl:mr-3 {task.completed
												? 'dark:text-dark-500 text-gray-500 line-through'
												: ''}"
										>
											{task.text}
										</span>
									{:else}
										<input
											bind:value={task.text}
											class="form-input ml-3"
											on:blur={() => disableEditing(task)}
											on:keydown={(event) => handleTaskKeyDown(event, task)}
										/>
									{/if}
								</div>
								<div class="flex items-center gap-2">
									<!-- Edit Button -->
									<a
										href="#!"
										on:click={() => enableEditing(task)}
										class="dark:text-dark-500 flex size-5 items-center justify-center rounded-md text-gray-500 transition duration-300 ease-linear hover:text-yellow-500 dark:hover:text-yellow-500"
										aria-label="edit"
									>
										<i class="ri-pencil-line"></i>
									</a>
									<!-- Delete Button -->
									<a
										href="#!"
										on:click={() => deleteTask(task)}
										class="dark:text-dark-500 flex size-5 items-center justify-center rounded-md text-gray-500 transition duration-300 ease-linear hover:text-red-500 dark:hover:text-red-500"
										aria-label="delete"
									>
										<i class="ri-close-line"></i>
									</a>
								</div>
							</div>
						{/each}

						<h6 class="mt-4">Yesterday (<span>{yesterdayTasksCount}</span>)</h6>
						{#each yesterdayTasks as task, index}
							<div class="grid grid-cols-[1fr_36px] items-center gap-6">
								<div class="input-check-group">
									<input
										type="checkbox"
										class="input-check input-check-primary"
										bind:checked={task.completed}
									/>
									{#if !task.editing}
										<span
											class="dark:text-dark-50 select-none text-gray-800 ltr:ml-3 rtl:mr-3 {task.completed
												? 'dark:text-dark-500 text-gray-500 line-through'
												: ''}"
										>
											{task.text}
										</span>
									{:else}
										<input
											bind:value={task.text}
											on:blur={() => disableEditing(task)}
											class="form-input ml-3"
										/>
									{/if}
								</div>
								<div class="flex items-center gap-2">
									<a
										href="#!"
										on:click={() => enableEditing(task)}
										class="dark:text-dark-500 flex size-5 items-center justify-center rounded-md text-gray-500 transition duration-300 ease-linear hover:text-yellow-500 dark:hover:text-yellow-500"
										aria-label="edit"
									>
										<i class="ri-pencil-line"></i>
									</a>
									<a
										href="#!"
										on:click={() => deleteTask(task)}
										class="dark:text-dark-500 flex size-5 items-center justify-center rounded-md text-gray-500 transition duration-300 ease-linear hover:text-red-500 dark:hover:text-red-500"
										aria-label="delete"
									>
										<i class="ri-close-line"></i>
									</a>
								</div>
							</div>
						{/each}
					</fieldset>
					<div class="mt-4">
						<input
							type="text"
							placeholder="Add new task..."
							bind:value={newTask}
							on:keydown={(event) => {
								if (event.key === 'Enter') addTask();
							}}
							class="form-input"
						/>
					</div>
				</div>
			</CardBody>
		</Card>
	</Col>
</Grid>

<DeleteComponent />
