<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import FlatePicker from '$lib/components/forms/form-picker/FlatePicker.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import { onMount } from 'svelte';
	import flatpickr from 'flatpickr';
	import 'flatpickr/dist/flatpickr.min.css';
	import { leavesData } from './leave';

	let leaves = [...leavesData];
	let displayedLeaves = leaves.slice(0, 10);
	let currentPage = 1;
	let sortBy = '';
	let sortDirection = 'asc';
	let startID = 15015;
	let startDate: string | number | Date | null = null;
	let endDate: string | number | Date | null = null;
	let searchQuery = '';
	let statusFilter = '';
	let availableLeaves = leaves.filter((leave) => leave.status === 'Available').length;
	let usedLeaves = leaves.filter((leave) => leave.status === 'Approved').length;
	let pendingLeaves = leaves.filter((leave) => leave.status === 'Pending').length;
	let rejectedLeaves = leaves.filter((leave) => leave.status === 'Rejected').length;
	let totalLeaves = leaves.length;

	// Filtered data based on search query
	let filteredLeaves = leaves;

	// Pagination helpers
	let totalPages = Math.ceil(leaves.length / 10);
	let showingStart = 1;
	let showingEnd = Math.min(10, leaves.length);

	function updateLeaveCounts() {
		availableLeaves = leaves.filter((leave) => leave.status === 'Available').length;
		usedLeaves = leaves.filter((leave) => leave.status === 'Approved').length;
		pendingLeaves = leaves.filter((leave) => leave.status === 'Pending').length;
		rejectedLeaves = leaves.filter((leave) => leave.status === 'Rejected').length;
		totalLeaves = leaves.length;
	}

	// Date format helper function
	function formatDate(inputDate: string | number | Date) {
		const months = [
			'Jan',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		const date = new Date(inputDate);
		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();
		return `${day} ${month}, ${year}`;
	}

	// Filter leaves based on the date range
	$: {
		if (startDate && endDate) {
			const changeStartDate = new Date(startDate);
			const changeEndDate = new Date(endDate);

			leaves = leavesData.filter((leave) => {
				const leaveDate = new Date(leave.startDate);
				return leaveDate >= changeStartDate && leaveDate <= changeEndDate;
			});
		} else {
			leaves = [...leavesData]; // Reset to original data if no range
		}

		// After filtering by date range, apply search
		filterLeavesBySearch();
		filterLeavesByStatus();
		updatePagination();
	}

	// Filter leaves by status
	function filterLeavesByStatus() {
		if (statusFilter) {
			filteredLeaves = filteredLeaves.filter((leave) => leave.status === statusFilter);
		}
	}

	// Filter leaves by search query
	function filterLeavesBySearch() {
		filteredLeaves = leaves.filter((leave) => {
			// Check if any field contains the search query (case-insensitive)
			return (
				leave.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
				leave.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
				leave.leaveType.toLowerCase().includes(searchQuery.toLowerCase())
			);
		});
	}

	// Sorting logic
	const sort = (field: string) => {
		if (sortBy === field) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = field;
			sortDirection = 'asc';
		}

		filteredLeaves.sort((a: any, b: any) => {
			const valueA = a[field] || '';
			const valueB = b[field] || '';
			if (sortDirection === 'asc') {
				return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
			} else {
				return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
			}
		});
		updatePagination();
	};

	// Calculate total days between startDate and endDate
	function calculateTotalDays(startDate: string | number | Date, endDate: string | number | Date) {
		const start: any = new Date(startDate);
		const end: any = new Date(endDate);
		const diffTime = Math.abs(end - start);
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Adding 1 to include both start and end date
	}

	// Update pagination based on the filtered leaves array after sorting and searching
	const updatePagination = () => {
		totalPages = Math.ceil(filteredLeaves.length / 10);
		displayedLeaves = filteredLeaves.slice((currentPage - 1) * 10, currentPage * 10);
		showingStart = (currentPage - 1) * 10 + 1;
		showingEnd = Math.min(currentPage * 10, filteredLeaves.length);
	};

	// Pagination helpers
	const prevPage = () => {
		if (currentPage > 1) {
			currentPage--;
			updatePagination();
		}
	};

	const nextPage = () => {
		if (currentPage < totalPages) {
			currentPage++;
			updatePagination();
		}
	};

	const gotoPage = (page: number) => {
		currentPage = page;
		updatePagination();
	};

	const approveLeave = (leave: { status: string }) => {
		leave.status = 'Approved';
		updateLeaveCounts();
		updatePagination();
	};

	const rejectedLeave = (leave: { status: string }) => {
		leave.status = 'Rejected';
		updateLeaveCounts();
		updatePagination();
	};

	onMount(() => {
		flatpickr('#dateRangePicker', {
			mode: 'range',
			onChange: (selectedDates) => {
				if (selectedDates.length === 2) {
					startDate = selectedDates[0];
					endDate = selectedDates[1];
				} else {
					startDate = null;
					endDate = null;
				}
			}
		});
	});
</script>

<Grid cols={1} gapX="space" class="md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
	<Card>
		<div class="card-body flex items-center gap-4">
			<div
				class="flex size-14 items-center justify-center rounded-md bg-green-500/10 text-xl font-medium text-green-500"
			>
				{availableLeaves}
			</div>
			<p class="dark:text-dark-500 text-gray-500">Available Leaves</p>
		</div>
	</Card>
	<Card>
		<div class="card-body flex items-center gap-4">
			<div
				class="flex size-14 items-center justify-center rounded-md bg-purple-500/10 text-xl font-medium text-purple-500"
			>
				{usedLeaves}
			</div>
			<p class="dark:text-dark-500 text-gray-500">Used Leaves</p>
		</div>
	</Card>
	<Card>
		<div class="card-body flex items-center gap-4">
			<div
				class="flex size-14 items-center justify-center rounded-md bg-yellow-500/10 text-xl font-medium text-yellow-500"
			>
				{pendingLeaves}
			</div>
			<p class="dark:text-dark-500 text-gray-500">Pending Leaves Request</p>
		</div>
	</Card>
	<Card>
		<div class="card-body flex items-center gap-4">
			<div
				class="flex size-14 items-center justify-center rounded-md bg-red-500/10 text-xl font-medium text-red-500"
			>
				{rejectedLeaves}
			</div>
			<p class="dark:text-dark-500 text-gray-500">Rejected Leaves</p>
		</div>
	</Card>
	<Card>
		<div class="card-body flex items-center gap-4">
			<div
				class="flex size-14 items-center justify-center rounded-md bg-sky-500/10 text-xl font-medium text-sky-500"
			>
				{totalLeaves}
			</div>
			<p class="dark:text-dark-500 text-gray-500">Total Leaves</p>
		</div>
	</Card>
</Grid>

<Card>
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Leaves</CardTitle>
		<div class="shrink-0">
			<a href="/apps-hospital-staff-leave-add" class="btn btn-primary">New Request</a>
		</div>
	</CardHeader>
	<CardHeader>
		<div class="gap-space grid grid-cols-12">
			<div class="col-span-12 md:col-span-6 xl:col-span-3 2xl:col-span-4">
				<div class="group/form relative">
					<input
						type="email"
						bind:value={searchQuery}
						class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
						placeholder="Leave Type reason"
						on:input={() => {
							filterLeavesBySearch();
							updatePagination();
						}}
					/>
					<div
						class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
					>
						<LucideIcon name="Search" class="size-4" />
					</div>
				</div>
			</div>
			<div class="col-span-12 md:col-span-6 xl:col-span-3 2xl:col-span-3">
				<input
					id="dateRangePicker"
					class="form-input"
					type="text"
					placeholder="Select Date Range"
				/>
			</div>
			<div class="col-span-12 md:col-span-6 xl:col-span-3 2xl:col-span-3">
				<select name="status" id="" class="form-input text-gray-400">
					<option value="" selected disabled hidden>Select Status</option>
					<option value="all">All</option>
					<option value="approved">Approved</option>
					<option value="Pending">Pending</option>
					<option value="Rejected">Rejected</option>
				</select>
			</div>
			<div class="col-span-12 md:col-span-6 xl:col-span-3 2xl:col-span-2">
				<button type="submit" class="btn btn-sub-gray w-full"
					><LucideIcon name="Filter" class="inline-block size-4 align-middle" /> Filter Now</button
				>
			</div>
		</div>
	</CardHeader>
	<div class="card-body pt-0">
		<div class="table-box">
			<table class="table whitespace-nowrap">
				<thead>
					<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
						<th on:click={() => sort('leaveID')} class="cursor-pointer !font-medium">
							ID <span>{sortBy === 'leaveID' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th on:click={() => sort('leaveType')} class="cursor-pointer !font-medium">
							Leave Type <span
								>{sortBy === 'leaveType' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
						<th on:click={() => sort('startDate')} class="cursor-pointer !font-medium">
							Start Date <span
								>{sortBy === 'startDate' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
						<th on:click={() => sort('endDate')} class="cursor-pointer !font-medium">
							End Date <span
								>{sortBy === 'endDate' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
						<th on:click={() => sort('totalDays')} class="cursor-pointer !font-medium">
							Days <span>{sortBy === 'totalDays' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
						<th on:click={() => sort('reason')} class="cursor-pointer !font-medium">
							Reason <span>{sortBy === 'reason' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th on:click={() => sort('approvedBy')} class="cursor-pointer !font-medium">
							Approved By <span
								>{sortBy === 'approvedBy' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
						<th on:click={() => sort('dateRequested')} class="cursor-pointer !font-medium">
							Request Date <span
								>{sortBy === 'dateRequested' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
						<th on:click={() => sort('dateApproved')} class="cursor-pointer !font-medium">
							Approved Date <span
								>{sortBy === 'dateApproved' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
							>
						</th>
						<th on:click={() => sort('status')} class="cursor-pointer !font-medium">
							Status <span>{sortBy === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
						</th>
						<th class="!font-medium">Action</th>
					</tr>
				</thead>
				<tbody>
					{#if displayedLeaves.length > 0}
						{#each displayedLeaves as leave, index}
							<tr class="*:px-3 *:py-2.5">
								<td>{'PEA-' + (startID + index).toString()}</td>
								<td>{leave.leaveType}</td>
								<td>{leave.startDate}</td>
								<td>{leave.endDate}</td>
								<td>{calculateTotalDays(leave.startDate, leave.endDate)}</td>
								<td>{leave.reason}</td>
								<td>{leave.approvedBy}</td>
								<td>{leave.dateRequested}</td>
								<td>{leave.dateApproved}</td>
								<td>
									<span
										class="badge"
										class:badge-green={leave.status === 'Approved'}
										class:badge-red={leave.status === 'Rejected'}
										class:badge-yellow={leave.status === 'Pending'}
									>
										{leave.status}
									</span>
								</td>
								<td>
									<div class="flex items-center gap-2">
										<button
											title="Approve"
											on:click={() => approveLeave(leave)}
											class="btn btn-sub-green btn-icon !size-8"
											aria-label="Approve"
										>
											<i class="ri-check-line"></i>
										</button>
										<button
											title="Edit"
											class="btn btn-sub-gray btn-icon !size-8"
											aria-label="Edit"
										>
											<i class="ri-pencil-line"></i>
										</button>
										<button
											title="Reject"
											on:click={() => rejectedLeave(leave)}
											class="btn btn-sub-red btn-icon !size-8"
											aria-label="Reject"
										>
											<i class="ri-close-line"></i>
										</button>
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

		{#if displayedLeaves.length > 0}
			<div class="mt-5 grid grid-cols-12 items-center gap-5">
				<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
					<p class="dark:text-dark-500 text-gray-500">
						Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{leaves.length}</b> Results
					</p>
				</div>
				<div class="col-span-12 md:col-span-6">
					<div class="pagination pagination-primary flex justify-center md:justify-end">
						<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
							Prev
						</button>
						{#each Array(totalPages) as _, i}
							<button
								on:click={() => gotoPage(i + 1)}
								class="pagination-item {currentPage === i + 1 ? 'active' : ''}"
							>
								<span>{i + 1}</span>
							</button>
						{/each}
						<button
							on:click={nextPage}
							disabled={currentPage === totalPages}
							class="pagination-next"
						>
							Next
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="chevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</Card>
