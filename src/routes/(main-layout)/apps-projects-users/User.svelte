<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import ProjectHead from '$lib/components/common/ProjectHead.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { usersData } from './user';

	// Pagination states
	let currentPage = 1;
	const itemsPerPage = 8;

	// Calculate the number of users to display on the current page
	$: displayedUsers = usersData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	// Total number of pages
	$: totalPages = Math.ceil(usersData.length / itemsPerPage);

	// Methods to navigate through pages
	const prevPage = () => {
		if (currentPage > 1) currentPage -= 1;
	};

	const nextPage = () => {
		if (currentPage < totalPages) currentPage += 1;
	};

	const gotoPage = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
		}
	};
</script>

<ProjectHead variant="users" />

<div class="flex flex-wrap items-center justify-between gap-3">
	<h6>Users ({usersData.length})</h6>
	<div class="max-w-36">
		<select name="" id="" class="form-input text-gray-400">
			<option value="all" hidden selected disabled>Select</option>
			<option value="all">All</option>
			<option value="last-month">Last Month</option>
			<option value="this-month">This Month</option>
			<option value="last-year">Last Year</option>
			<option value="this-year">This Year</option>
		</select>
	</div>
</div>

<!-- Display users in a grid -->
<Grid cols={1} gapX="space" class="mt-space md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each displayedUsers as user, index}
		<Card>
			<CardBody class="text-center">
				<img src={user.image} alt={user.name} class="mx-auto mb-4 size-14 rounded-full" />
				<h6><a href="/pages-user">{user.name}</a></h6>
				<p class="dark:text-dark-500 mt-1 text-gray-500">{user.role}</p>
				<div class="mt-4 grid grid-cols-2 gap-4">
					<div class="dark:border-dark-800 rounded-md border border-dashed border-gray-200 p-3">
						<h6>{user.task}</h6>
						<p class="dark:text-dark-500 text-gray-500">Tasks</p>
					</div>
					<div class="dark:border-dark-800 rounded-md border border-dashed border-gray-200 p-3">
						<h6>{user.earning}</h6>
						<p class="dark:text-dark-500 text-gray-500">Earning</p>
					</div>
				</div>
			</CardBody>
		</Card>
	{/each}
</Grid>

<!-- Pagination Controls -->
<Grid cols={12} gap={5} class="mb-5 items-center">
	<Col cols={{ span: 12 }} md={{ span: 6 }} class="text-center ltr:md:text-left rtl:md:text-right">
		<p class="dark:text-dark-500 text-gray-500">
			Showing <b>{(currentPage - 1) * itemsPerPage + 1}</b> -
			<b>{Math.min(currentPage * itemsPerPage, usersData.length)}</b> of
			<b>{usersData.length}</b> Results
		</p>
	</Col>
	<Col cols={{ span: 12 }} md={{ span: 6 }}>
		<div class="pagination pagination-primary flex justify-center md:justify-end">
			<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
				<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
				<LucideIcon name="ChevronRight" class="ml-1 ltr:hidden rtl:inline-block size-4" />
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
				<LucideIcon name="ChevronLeft" class="mr-1 ltr:hidden rtl:inline-block size-4" />
			</button>
		</div>
	</Col>
</Grid>
