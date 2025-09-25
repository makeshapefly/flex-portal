<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import { employeesData } from '../table-datatables-basic/basic';

	let itemsPerPage = 10;
	let currentPage = 1;
	let searchQuery = '';
	let sortColumn: string = 'Name';
	let sortOrder: 'asc' | 'desc' = 'asc';

	// Reactive calculation for total pages based on current data and items per page
	$: totalPages = Math.ceil(filteredData.length / itemsPerPage);

	// Reactive filtered data
	$: filteredData = employeesData.filter(
		(employee) =>
			employee.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			employee.Position.toLowerCase().includes(searchQuery.toLowerCase()) ||
			employee.Office.toLowerCase().includes(searchQuery.toLowerCase()) ||
			String(employee.Age).includes(searchQuery) ||
			employee['Start date'].toLowerCase().includes(searchQuery.toLowerCase()) ||
			String(employee.Salary).includes(searchQuery)
	);

	// Function to calculate start index dynamically based on current page
	$: startIndex = (currentPage - 1) * itemsPerPage;

	// Function to get the paginated data, with sorting and pagination applied
	$: paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

	$: sortedData = filteredData.sort((a, b) => {
		let valA = a[sortColumn as keyof typeof a];
		let valB = b[sortColumn as keyof typeof b];

		// Ensure case-insensitive string comparison for sorting
		if (typeof valA === 'string') valA = valA.toLowerCase();
		if (typeof valB === 'string') valB = valB.toLowerCase();

		if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
		if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
		return 0;
	});

	// Handle page navigation
	function prevPage() {
		currentPage = Math.max(currentPage - 1, 1);
	}

	function nextPage() {
		currentPage = Math.min(currentPage + 1, totalPages);
	}

	function gotoPage(page: number) {
		currentPage = page;
	}

	// Change items per page
	function changeItemsPerPage(event: Event) {
		const target = event.target as HTMLSelectElement;
		itemsPerPage = parseInt(target.value);
	}

	// Handle sorting by column
	function sortTable(column: string) {
		if (sortColumn === column) {
			sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn = column;
			sortOrder = 'asc';
		}
	}
</script>

<div class="grid gap-5">
	<!-- Entries per page selector -->
	<div class="flex justify-end">
		<div class="flex flex-1 items-center gap-3">
			<select
				name=""
				id=""
				on:change={changeItemsPerPage}
				class="h-full rounded border border-gray-200 p-2 pr-7 outline-none dark:border-[#2c2c2c] dark:bg-[#0F172A]"
			>
				<option value="10">10</option>
				<option value="25">25</option>
				<option value="50">50</option>
			</select>
			<span>entries per page</span>
		</div>
		<div class="flex items-center gap-2">
			<span>Search:</span>
			<input type="text" bind:value={searchQuery} class="form-input" placeholder="Search..." />
		</div>
	</div>

	<!-- Table -->
	<div class="overflow-x-auto">
		<table class="display group bordered table" style="width:100%">
			<thead>
				<tr class="dark:bg-dark-850 bg-gray-100">
					<th class="cursor-pointer ltr:text-left rtl:text-right" on:click={() => sortTable('Name')}
						>Name</th
					>
					<th
						class="cursor-pointer ltr:text-left rtl:text-right"
						on:click={() => sortTable('Position')}>Position</th
					>
					<th
						class="cursor-pointer ltr:text-left rtl:text-right"
						on:click={() => sortTable('Office')}>Office</th
					>
					<th class="cursor-pointer ltr:text-left rtl:text-right" on:click={() => sortTable('Age')}
						>Age</th
					>
					<th
						class="cursor-pointer ltr:text-left rtl:text-right"
						on:click={() => sortTable('Start date')}>Start date</th
					>
					<th
						class="cursor-pointer ltr:text-left rtl:text-right"
						on:click={() => sortTable('Salary')}>Salary</th
					>
				</tr>
			</thead>
			<tbody>
				{#each paginatedData as employee}
					<tr class="*:px-3 *:py-2.5">
						<td class="ltr:text-left rtl:text-right">{employee.Name}</td>
						<td class="ltr:text-left rtl:text-right">{employee.Position}</td>
						<td class="ltr:text-left rtl:text-right">{employee.Office}</td>
						<td class="ltr:text-left rtl:text-right">{employee.Age}</td>
						<td class="ltr:text-left rtl:text-right">{employee['Start date']}</td>
						<td class="ltr:text-left rtl:text-right">{employee.Salary}</td>
					</tr>
				{/each}
				{#if filteredData.length === 0}
					<tr>
						<td colspan="10">
							<TableRowNotFound />
						</td>
					</tr>
				{/if}
			</tbody>
			<tfoot>
				<tr class="*:px-3 *:py-2.5">
					<th class="ltr:text-left rtl:text-right">Name</th>
					<th class="ltr:text-left rtl:text-right">Position</th>
					<th class="ltr:text-left rtl:text-right">Office</th>
					<th class="ltr:text-left rtl:text-right">Age</th>
					<th class="ltr:text-left rtl:text-right">Start date</th>
					<th class="ltr:text-left rtl:text-right">Salary</th>
				</tr>
			</tfoot>
		</table>
	</div>

	<!-- Pagination -->
	<div class="grid items-center grid-cols-12 gap-space mt-3">
		<div class="col-span-12 md:col-span-6">
			<p class="dark:text-dark-500 text-gray-500">
				Showing <b>{startIndex + 1}</b> -
				<b>{Math.min(startIndex + itemsPerPage, filteredData.length)}</b>
				of <b>{filteredData.length}</b> Results
			</p>
		</div>
		<div class="col-span-12 md:col-span-6">
			<div class="pagination pagination-primary flex justify-end">
				<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
					<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
					Prev
				</button>
				{#each Array(totalPages)
					.fill(null)
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
				</button>
			</div>
		</div>
	</div>
</div>
