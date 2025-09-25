<script lang="ts">
	import { onMount } from 'svelte';
	import TableState from '../Table';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';

	export let rows: Data.TableRow[];
	export let sortingOrder: Data.SortDirection;
	export let sortingColumn: string;
	export let variant: string = 'table'; // Default class
	export let actionRowCss: string = '';
	export let tableHeaderStyle: string = '';
	export let tableRowStyle: string = '';

	let table: Data.TableData;
	let icon: string;

	// Helper function to capitalize the first letter of a string
	const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

	const store = new TableState({
		rows: rows,
		columns: Object.keys(rows[0]),
		sortCol: sortingColumn,
		sortDir: sortingOrder
	});

	onMount(() => {
		try {
			store.data.subscribe((data) => {
				table = data;
				icon =
					data.sortDir === 'asc'
						? 'ArrowUp'
						: data.sortDir === 'desc'
							? 'ArrowDown'
							: 'ArrowDownUp';
			});
		} catch (error) {
			console.log('Basic Table', error);
		}
	});

	const deleteRow = (rowId: number) => {
		store.deleteRow(rowId);
	};
</script>

<div class="overflow-x-auto">
	{#if table && table.rows.length > 0}
		<table class={variant}>
			<tbody>
				<tr class={tableHeaderStyle}>
					{#each table.columns as column}
						<th on:click={() => store.sortData(column)}>
							<span class="align-middle">{capitalize(column)}</span>
							{#if store.columnTable == column}
								<LucideIcon
									name={icon}
									class="dark:text-dark-500 inline-block size-4 text-gray-500"
								/>
							{/if}
						</th>
					{/each}
				</tr>
				{#each table.rows as row, index}
					<tr class={tableRowStyle}>
						<td>{row.name}</td>
						<td>{row.age}</td>
						<td>{row.date}</td>
						<td>{row.address}</td>
						<td>{row.salary}</td>
						<td>
							<a
								href="#!"
								class="text-red-500 {actionRowCss}"
								on:click|preventDefault={() => deleteRow(row.id)}
							>
								{row.action}
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<!-- Display when no rows are available -->
		<div class="dark:text-dark-500 p-5 text-center text-gray-500">
			<p>No data available.</p>
		</div>
	{/if}
</div>
