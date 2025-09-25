<script lang="ts">
	import { employeesData } from '../table-datatables-basic/basic';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';

	let searchQuery = '';

	// Reactive filtered data based on the search query
	$: filteredData = employeesData.filter(
		(employee) =>
			employee.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			employee.Position.toLowerCase().includes(searchQuery.toLowerCase()) ||
			employee.Office.toLowerCase().includes(searchQuery.toLowerCase()) ||
			String(employee.Age).includes(searchQuery) ||
			employee['Start date'].toLowerCase().includes(searchQuery.toLowerCase()) ||
			String(employee.Salary).includes(searchQuery)
	);
</script>

<div class="grid gap-5">
	<!-- Search input -->
	<div class="flex justify-end">
		<div class="flex items-center gap-2">
			<span>Search:</span>
			<input type="text" bind:value={searchQuery} class="form-input" />
		</div>
	</div>

	<!-- Table -->
	<div class="overflow-x-auto">
		<table class="display group table" style="width:100%">
			<thead>
				<tr class="dark:bg-dark-850 bg-gray-100">
					<th class="ltr:text-left rtl:text-right">Name</th>
					<th class="ltr:text-left rtl:text-right">Position</th>
					<th class="ltr:text-left rtl:text-right">Office</th>
					<th class="ltr:text-left rtl:text-right">Age</th>
					<th class="ltr:text-left rtl:text-right">Start date</th>
					<th class="ltr:text-left rtl:text-right">Salary</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredData as employee}
					<tr class="">
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
						<td colspan="10" class="!p-8">
							<TableRowNotFound />
						</td>
					</tr>
				{/if}
			</tbody>
			<tfoot>
				<tr class="">
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
</div>
