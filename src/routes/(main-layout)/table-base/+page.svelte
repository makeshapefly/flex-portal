<script lang="ts">
	import BasicTable from '$lib/components/tables/table-base/BasicTable.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	// Store for loading state and rows data
	const loading = writable(true);
	const rows = writable<any[]>([]);

	onMount(() => {
		// Simulate loading and fetch data
		setTimeout(() => {
			loading.set(false);
			rows.set([
				{
					id: 1,
					name: 'Jeremy McMullen',
					age: 37,
					date: '21 Jan, 2024',
					address: 'United States',
					salary: '$15,236'
				},
				{
					id: 2,
					name: 'Charles Fischer',
					age: 29,
					date: '28 Jan, 2024',
					address: 'Romania',
					salary: '$8,563'
				},
				{
					id: 3,
					name: 'Louise Harms',
					age: 32,
					date: '02 Feb, 2024',
					address: 'Canada',
					salary: '$7,986'
				},
				{
					id: 4,
					name: 'Henry Boyle',
					age: 34,
					date: '11 Feb, 2024',
					address: 'Germany',
					salary: '$36,322'
				},
				{
					id: 5,
					name: 'John Brown',
					age: 26,
					date: '20 Feb, 2024',
					address: 'Mexico',
					salary: '$11,741'
				}
			]);
		}, 2000);
	});

	const deleteRow = (rowName: string) => {
		rows.update((currentRows) => currentRows.filter((row) => row.name !== rowName));
	};

	const basicTableData = [
		{
			id: 'SRB-871021506-01',
			name: 'Alexandrine Grant',
			date: '28 Jan, 2025',
			status: 'Pending',
			amount: '$8,563'
		},
		{
			id: 'SRB-871021506-02',
			name: 'Victor Edwards',
			date: '02 Feb, 2025',
			status: 'Completed',
			amount: '$17,201'
		},
		{
			id: 'SRB-871021506-03',
			name: 'Maria Rodriguez',
			date: '15 Feb, 2025',
			status: 'Pending',
			amount: '$3,245'
		},
		{
			id: 'SRB-871021506-04',
			name: 'James Wilson',
			date: '20 Feb, 2025',
			status: 'Completed',
			amount: '$12,890'
		},
		{
			id: 'SRB-871021506-05',
			name: 'Sarah Johnson',
			date: '25 Feb, 2025',
			status: 'Completed',
			amount: '$5,670'
		}
	];

	let sortKey = '';
	let sortDirection = 1;

	function sortBy(key) {
		if (sortKey === key) {
			sortDirection = -sortDirection;
		} else {
			sortKey = key;
			sortDirection = 1;
		}
	}

	let data = [
		{
			name: 'Jeremy McMullen',
			age: 37,
			date: '21 Jan, 2024',
			address: 'United States',
			salary: '$15,236',
			action: 'Delete'
		},
		{
			name: 'Charles Fischer',
			age: 29,
			date: '28 Jan, 2024',
			address: 'Romania',
			salary: '$8,563',
			action: 'Delete'
		},
		{
			name: 'Louise Harms',
			age: 32,
			date: '02 Feb, 2024',
			address: 'Canada',
			salary: '$7,986',
			action: 'Delete'
		},
		{
			name: 'Henry Boyle',
			age: 34,
			date: '11 Feb, 2024',
			address: 'Germany',
			salary: '$36,322',
			action: 'Delete'
		},
		{
			name: 'John Brown',
			age: 26,
			date: '20 Feb, 2024',
			address: 'Mexico',
			salary: '$11,741',
			action: 'Delete'
		}
	];

	function sortIcon(key) {
		if (sortKey !== key) return 'arrow-up-down';
		return sortDirection === 1 ? 'arrow-down' : 'arrow-up';
	}

	function toggleEdit(index) {
		data = data.map((item, i) => {
			if (i === index) item.editable = !item.editable;
			return item;
		});
	}

	function updateValue(value, key, index) {
		data[index][key] = value;
	}

	function removeItem(index) {
		data.splice(index, 1);
	}

	$: sortedData = [...data].sort((a, b) => {
		if (!sortKey) return 0;
		const valA = a[sortKey];
		const valB = b[sortKey];

		if (typeof valA === 'string') return valA.localeCompare(valB) * sortDirection;
		if (typeof valA === 'number') return (valA - valB) * sortDirection;
		return 0;
	});
</script>

<PageHeading title="Base Table" sub_title="Tables" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Basic Styling</CardTitle>
		</CardHeader>
		<CardBody>
			<table class="flush table">
				<tbody>
					<tr>
						<th>Transition ID</th>
						<th>Customer Name</th>
						<th>Date</th>
						<th>Amount</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
					{#each basicTableData as row}
						<tr class="*:px-3 *:py-2.5">
							<td>{row.id}</td>
							<td>{row.name}</td>
							<td>{row.date}</td>
							<td>{row.amount}</td>
							<td>
								<span
									class={`inline-flex items-center gap-1 ${
										row.status === 'Completed' ? 'badge badge-green' : 'badge badge-yellow'
									}`}
								>
									{#if row.status === 'Pending'}
										<LucideIcon name="TriangleAlert" class="size-3.5"></LucideIcon>
									{:else if row.status === 'Completed'}
										<LucideIcon name="CheckCircle" class="size-3.5"></LucideIcon>
									{/if}
									<span>{row.status}</span>
								</span>
							</td>
							<td>
								<div class="flex items-center gap-2">
									<a href="#!" class="btn btn-icon btn-sub-primary !size-8" aria-label="Edit"
										><LucideIcon name="Eye" class="size-3.5"></LucideIcon></a
									>
									<a href="#!" class="btn btn-icon btn-sub-red !size-8" aria-label="Delete"
										><LucideIcon name="Trash2" class="size-3.5"></LucideIcon></a
									>
								</div></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Border Styling</CardTitle>
		</CardHeader>
		<CardBody>
			<BasicTable
				variant="table"
				sortingColumn="name"
				sortingOrder="asc"
				actionRowCss="btn btn-sm btn-sub-red"
				rows={[
					{
						name: 'Joana Morar',
						age: 37,
						date: '21 Jan, 2024',
						address: 'United States',
						salary: '$15,236',
						action: 'Delete'
					},
					{
						name: 'Fabian Gorczany',
						age: 29,
						date: '28 Jan, 2024',
						address: 'Romania',
						salary: '$8,563',
						action: 'Delete'
					},
					{
						name: 'Dale Willms',
						age: 32,
						date: '02 Feb, 2024',
						address: 'Canada',
						salary: '$7,986',
						action: 'Delete'
					},
					{
						name: 'Lea Steuber',
						age: 34,
						date: '11 Feb, 2024',
						address: 'Germany',
						salary: '$36,322',
						action: 'Delete'
					},
					{
						name: 'Freda Renner',
						age: 26,
						date: '20 Feb, 2024',
						address: 'Mexico',
						salary: '$11,741',
						action: 'Delete'
					}
				]}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Bordered Table</CardTitle>
		</CardHeader>
		<CardBody>
			<BasicTable
				variant="table bordered"
				sortingColumn="name"
				sortingOrder="asc"
				rows={[
					{
						name: 'Jeremy McMullen',
						age: 37,
						date: '21 Jan, 2024',
						address: 'United States',
						salary: '$15,236',
						action: 'Delete'
					},
					{
						name: 'Charles Fischer',
						age: 29,
						date: '28 Jan, 2024',
						address: 'Romania',
						salary: '$8,563',
						action: 'Delete'
					},
					{
						name: 'Louise Harms',
						age: 32,
						date: '02 Feb, 2024',
						address: 'Canada',
						salary: '$7,986',
						action: 'Delete'
					},
					{
						name: 'Henry Boyle',
						age: 34,
						date: '11 Feb, 2024',
						address: 'Germany',
						salary: '$36,322',
						action: 'Delete'
					},
					{
						name: 'John Brown',
						age: 26,
						date: '20 Feb, 2024',
						address: 'Mexico',
						salary: '$11,741',
						action: 'Delete'
					}
				]}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Seperate Table</CardTitle>
		</CardHeader>
		<CardBody>
			<p class="mb-2 text-gray-500">
				Use border-separate to force each cell to display its own separate borders.
			</p>
			<BasicTable
				variant="table border-separate bordered"
				sortingColumn="name"
				sortingOrder="asc"
				rows={[
					{
						name: 'Tatyana Weissnat',
						age: 37,
						date: '21 Jan, 2024',
						address: 'United States',
						salary: '$15,236',
						action: 'Delete'
					},
					{
						name: 'Milford Nitzsche',
						age: 29,
						date: '28 Jan, 2024',
						address: 'Romania',
						salary: '$8,563',
						action: 'Delete'
					},
					{
						name: 'Carmela Marks',
						age: 32,
						date: '02 Feb, 2024',
						address: 'Canada',
						salary: '$7,986',
						action: 'Delete'
					},
					{
						name: 'Julianne Ruecker',
						age: 34,
						date: '11 Feb, 2024',
						address: 'Germany',
						salary: '$36,322',
						action: 'Delete'
					},
					{
						name: 'Rosario Kertzmann',
						age: 26,
						date: '20 Feb, 2024',
						address: 'Mexico',
						salary: '$11,741',
						action: 'Delete'
					}
				]}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Border Spacing Table</CardTitle>
		</CardHeader>
		<CardBody>
			<BasicTable
				variant="table border-separate border-spacing-2 whitespace-nowrap bordered"
				sortingColumn="name"
				sortingOrder="asc"
				rows={[
					{
						name: 'Jeremy McMullen',
						age: 37,
						date: '21 Jan, 2024',
						address: 'United States',
						salary: '$15,236',
						action: 'Delete'
					},
					{
						name: 'Charles Fischer',
						age: 29,
						date: '28 Jan, 2024',
						address: 'Romania',
						salary: '$8,563',
						action: 'Delete'
					},
					{
						name: 'Louise Harms',
						age: 32,
						date: '02 Feb, 2024',
						address: 'Canada',
						salary: '$7,986',
						action: 'Delete'
					},
					{
						name: 'Henry Boyle',
						age: 34,
						date: '11 Feb, 2024',
						address: 'Germany',
						salary: '$36,322',
						action: 'Delete'
					},
					{
						name: 'John Brown',
						age: 26,
						date: '20 Feb, 2024',
						address: 'Mexico',
						salary: '$11,741',
						action: 'Delete'
					}
				]}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Caption Side</CardTitle>
		</CardHeader>
		<CardBody>
			<table class="bordered table table-auto">
				<caption class="caption-top pb-3 text-xs text-gray-500 dark:text-gray-400">
					Table 3.1: Professional wrestlers and their signature moves.
				</caption>
				<thead>
					<tr>
						<th>Wrestler</th>
						<th>Signature Move(s)</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>"Stone Cold" Steve Austin</td>
						<td>Stone Cold Stunner, Lou Thesz Press</td>
					</tr>
					<tr>
						<td>Bret "The Hitman" Hart</td>
						<td>The Sharpshooter</td>
					</tr>
					<tr>
						<td>Razor Ramon</td>
						<td>Razor's Edge, Fallaway Slam</td>
					</tr>
				</tbody>
			</table>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Heading Light</CardTitle>
		</CardHeader>
		<CardBody>
			<BasicTable
				tableHeaderStyle="bg-gray-100 dark:bg-dark-850"
				variant="table flush"
				sortingColumn="name"
				sortingOrder="asc"
				rows={[
					{
						name: 'Jeremy McMullen',
						age: 37,
						date: '21 Jan, 2024',
						address: 'United States',
						salary: '$15,236',
						action: 'Delete'
					},
					{
						name: 'Charles Fischer',
						age: 29,
						date: '28 Jan, 2024',
						address: 'Romania',
						salary: '$8,563',
						action: 'Delete'
					},
					{
						name: 'Louise Harms',
						age: 32,
						date: '02 Feb, 2024',
						address: 'Canada',
						salary: '$7,986',
						action: 'Delete'
					},
					{
						name: 'Henry Boyle',
						age: 34,
						date: '11 Feb, 2024',
						address: 'Germany',
						salary: '$36,322',
						action: 'Delete'
					},
					{
						name: 'John Brown',
						age: 26,
						date: '20 Feb, 2024',
						address: 'Mexico',
						salary: '$11,741',
						action: 'Delete'
					}
				]}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Hovered Table</CardTitle>
		</CardHeader>
		<CardBody>
			<BasicTable
				variant="table hovered"
				tableHeaderStyle="bg-gray-100 dark:bg-dark-850"
				sortingColumn="name"
				sortingOrder="asc"
				rows={[
					{
						name: 'Jeremy McMullen',
						age: 37,
						date: '21 Jan, 2024',
						address: 'United States',
						salary: '$15,236',
						action: 'Delete'
					},
					{
						name: 'Charles Fischer',
						age: 29,
						date: '28 Jan, 2024',
						address: 'Romania',
						salary: '$8,563',
						action: 'Delete'
					},
					{
						name: 'Louise Harms',
						age: 32,
						date: '02 Feb, 2024',
						address: 'Canada',
						salary: '$7,986',
						action: 'Delete'
					},
					{
						name: 'Henry Boyle',
						age: 34,
						date: '11 Feb, 2024',
						address: 'Germany',
						salary: '$36,322',
						action: 'Delete'
					},
					{
						name: 'John Brown',
						age: 26,
						date: '20 Feb, 2024',
						address: 'Mexico',
						salary: '$11,741',
						action: 'Delete'
					}
				]}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Striped Even Table</CardTitle>
		</CardHeader>
		<CardBody>
			<BasicTable
				variant="table odd-striped"
				tableHeaderStyle="!bg-white dark:!bg-dark-900"
				sortingColumn="name"
				sortingOrder="asc"
				rows={[
					{
						name: 'Jeremy McMullen',
						age: 37,
						date: '21 Jan, 2024',
						address: 'United States',
						salary: '$15,236',
						action: 'Delete'
					},
					{
						name: 'Charles Fischer',
						age: 29,
						date: '28 Jan, 2024',
						address: 'Romania',
						salary: '$8,563',
						action: 'Delete'
					},
					{
						name: 'Louise Harms',
						age: 32,
						date: '02 Feb, 2024',
						address: 'Canada',
						salary: '$7,986',
						action: 'Delete'
					},
					{
						name: 'Henry Boyle',
						age: 34,
						date: '11 Feb, 2024',
						address: 'Germany',
						salary: '$36,322',
						action: 'Delete'
					},
					{
						name: 'John Brown',
						age: 26,
						date: '20 Feb, 2024',
						address: 'Mexico',
						salary: '$11,741',
						action: 'Delete'
					}
				]}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Striped Odd Table</CardTitle>
		</CardHeader>
		<CardBody>
			<BasicTable
				variant="table even-striped"
				sortingColumn="name"
				sortingOrder="asc"
				rows={[
					{
						name: 'Jeremy McMullen',
						age: 37,
						date: '21 Jan, 2024',
						address: 'United States',
						salary: '$15,236',
						action: 'Delete'
					},
					{
						name: 'Charles Fischer',
						age: 29,
						date: '28 Jan, 2024',
						address: 'Romania',
						salary: '$8,563',
						action: 'Delete'
					},
					{
						name: 'Louise Harms',
						age: 32,
						date: '02 Feb, 2024',
						address: 'Canada',
						salary: '$7,986',
						action: 'Delete'
					},
					{
						name: 'Henry Boyle',
						age: 34,
						date: '11 Feb, 2024',
						address: 'Germany',
						salary: '$36,322',
						action: 'Delete'
					},
					{
						name: 'John Brown',
						age: 26,
						date: '20 Feb, 2024',
						address: 'Mexico',
						salary: '$11,741',
						action: 'Delete'
					}
				]}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Colored Border Table</CardTitle>
		</CardHeader>
		<CardBody>
			<BasicTable
				variant="table bordered"
				tableHeaderStyle="*:!border-primary-200 dark:*:!border-primary-900"
				tableRowStyle="*:border-primary-200 dark:*:!border-primary-900"
				sortingColumn="name"
				sortingOrder="asc"
				rows={[
					{
						name: 'Jeremy McMullen',
						age: 37,
						date: '21 Jan, 2024',
						address: 'United States',
						salary: '$15,236',
						action: 'Delete'
					},
					{
						name: 'Charles Fischer',
						age: 29,
						date: '28 Jan, 2024',
						address: 'Romania',
						salary: '$8,563',
						action: 'Delete'
					},
					{
						name: 'Louise Harms',
						age: 32,
						date: '02 Feb, 2024',
						address: 'Canada',
						salary: '$7,986',
						action: 'Delete'
					},
					{
						name: 'Henry Boyle',
						age: 34,
						date: '11 Feb, 2024',
						address: 'Germany',
						salary: '$36,322',
						action: 'Delete'
					},
					{
						name: 'John Brown',
						age: 26,
						date: '20 Feb, 2024',
						address: 'Mexico',
						salary: '$11,741',
						action: 'Delete'
					}
				]}
			/>
			<BasicTable
				variant="table border-green mt-5"
				tableHeaderStyle="*:!border-green-200 *:dark:!border-green-900"
				tableRowStyle="*:!border-green-200 *:dark:!border-green-900"
				sortingColumn="name"
				sortingOrder="asc"
				rows={[
					{
						name: 'Jeremy McMullen',
						age: 37,
						date: '21 Jan, 2024',
						address: 'United States',
						salary: '$15,236',
						action: 'Delete'
					},
					{
						name: 'Charles Fischer',
						age: 29,
						date: '28 Jan, 2024',
						address: 'Romania',
						salary: '$8,563',
						action: 'Delete'
					},
					{
						name: 'Louise Harms',
						age: 32,
						date: '02 Feb, 2024',
						address: 'Canada',
						salary: '$7,986',
						action: 'Delete'
					},
					{
						name: 'Henry Boyle',
						age: 34,
						date: '11 Feb, 2024',
						address: 'Germany',
						salary: '$36,322',
						action: 'Delete'
					},
					{
						name: 'John Brown',
						age: 26,
						date: '20 Feb, 2024',
						address: 'Mexico',
						salary: '$11,741',
						action: 'Delete'
					}
				]}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Striped Colored Table</CardTitle>
		</CardHeader>
		<CardBody>
			<BasicTable
				variant="table"
				tableRowStyle="even:!bg-purple-50 dark:even:!bg-purple-500/10"
				sortingColumn="name"
				sortingOrder="asc"
				rows={[
					{
						name: 'Jeremy McMullen',
						age: 37,
						date: '21 Jan, 2024',
						address: 'United States',
						salary: '$15,236',
						action: 'Delete'
					},
					{
						name: 'Charles Fischer',
						age: 29,
						date: '28 Jan, 2024',
						address: 'Romania',
						salary: '$8,563',
						action: 'Delete'
					},
					{
						name: 'Louise Harms',
						age: 32,
						date: '02 Feb, 2024',
						address: 'Canada',
						salary: '$7,986',
						action: 'Delete'
					},
					{
						name: 'Henry Boyle',
						age: 34,
						date: '11 Feb, 2024',
						address: 'Germany',
						salary: '$36,322',
						action: 'Delete'
					},
					{
						name: 'John Brown',
						age: 26,
						date: '20 Feb, 2024',
						address: 'Mexico',
						salary: '$11,741',
						action: 'Delete'
					}
				]}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Loading Table</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="overflow-x-auto">
				{#if $loading}
					<!-- Loader -->
					<div class="flex h-64 w-full items-center justify-center">
						<div class="relative">
							<div
								class="dark:border-dark-800 size-8 rounded-full border-t-4 border-b-4 border-gray-200"
							></div>
							<div
								class="border-primary-500 absolute top-0 left-0 size-8 animate-spin rounded-full border-t-4 border-b-4"
							></div>
						</div>
					</div>
				{:else}
					<!-- Table -->
					<table class="even-striped table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Age</th>
								<th>Date</th>
								<th>Address</th>
								<th>Salary</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{#each $rows as row (row.name)}
								<tr>
									<td>{row.name}</td>
									<td>{row.age}</td>
									<td>{row.date}</td>
									<td>{row.address}</td>
									<td>{row.salary}</td>
									<td>
										<a
											href="#!"
											class="text-red-500"
											on:click|preventDefault={() => deleteRow(row.name)}
										>
											Delete
										</a>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Sorting Tables</CardTitle>
		</CardHeader>
		<CardBody>
			<!-- <BasicTable
				variant="table"
				sortingColumn="name"
				sortingOrder="asc"
				rows={[
					{
						name: 'Stroman Bosco',
						age: 37,
						date: '21 Jan, 2024',
						address: 'Netherlands',
						salary: '$15,236',
						action: 'Delete'
					},
					{
						name: 'Alexandrine Grant',
						age: 29,
						date: '28 Jan, 2024',
						address: 'Romania',
						salary: '$8,563',
						action: 'Delete'
					},
					{
						name: 'Molly Pollich',
						age: 32,
						date: '02 Feb, 2024',
						address: 'Canada',
						salary: '$7,986',
						action: 'Delete'
					},
					{
						name: 'Mohamed Becker',
						age: 34,
						date: '11 Feb, 2024',
						address: 'Germany',
						salary: '$36,322',
						action: 'Delete'
					},
					{
						name: 'Maudie Hilll',
						age: 26,
						date: '20 Feb, 2024',
						address: 'Mexico',
						salary: '$11,741',
						action: 'Delete'
					}
				]}
			/> -->
			<div class="overflow-x-auto">
				<table class="table">
					<tbody>
						<tr class="[&>*]:cursor-pointer">
							<th on:click={() => sortBy('name')}>
								<span class="align-middle">Name</span>
								<LucideIcon
									name="ArrowDownUp"
									data-lucide={sortIcon('name')}
									class="dark:text-dark-500 inline-block size-4 text-gray-500"
								></LucideIcon>
							</th>
							<th on:click={() => sortBy('age')}>
								<span class="align-middle">Age</span>
								<LucideIcon
									name="ArrowDownUp"
									data-lucide={sortIcon('age')}
									class="dark:text-dark-500 inline-block size-4 text-gray-500"
								></LucideIcon>
							</th>
							<th on:click={() => sortBy('date')}>
								<span class="align-middle">Date</span>
								<LucideIcon
									name="ArrowDownUp"
									data-lucide={sortIcon('date')}
									class="dark:text-dark-500 inline-block size-4 text-gray-500"
								></LucideIcon>
							</th>
							<th on:click={() => sortBy('address')}>
								<span class="align-middle">Address</span>
								<LucideIcon
									name="ArrowDownUp"
									data-lucide={sortIcon('address')}
									class="dark:text-dark-500 inline-block size-4 text-gray-500"
								></LucideIcon>
							</th>
							<th on:click={() => sortBy('salary')}>
								<span class="align-middle">Salary</span>
								<LucideIcon
									name="ArrowDownUp"
									data-lucide={sortIcon('salary')}
									class="dark:text-dark-500 inline-block size-4 text-gray-500"
								></LucideIcon>
							</th>
							<th>Action</th>
						</tr>

						{#each sortedData as item, index}
							<tr>
								<td
									contenteditable={item.editable}
									on:input={(e) => updateValue(e.target.innerText, 'name', index)}>{item.name}</td
								>
								<td
									contenteditable={item.editable}
									on:input={(e) => updateValue(e.target.innerText, 'age', index)}>{item.age}</td
								>
								<td
									contenteditable={item.editable}
									on:input={(e) => updateValue(e.target.innerText, 'date', index)}>{item.date}</td
								>
								<td
									contenteditable={item.editable}
									on:input={(e) => updateValue(e.target.innerText, 'address', index)}
									>{item.address}</td
								>
								<td
									contenteditable={item.editable}
									on:input={(e) => updateValue(e.target.innerText, 'salary', index)}
									>{item.salary}</td
								>
								<td>
									<div class="flex items-center gap-2">
										<button on:click={() => toggleEdit(index)} class="text-primary-500"
											>{item.editable ? 'Save' : 'Edit'}</button
										>
										<button on:click={() => removeItem(index)} class="text-red-500">Remove</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</CardBody>
	</Col>
</Grid>
