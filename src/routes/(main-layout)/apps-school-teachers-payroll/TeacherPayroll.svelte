<script lang="ts">
	import { onMount } from 'svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import { payrollData } from './payroll';
	import { writable } from 'svelte/store';

	interface Payroll {
		teacherName: string;
		image?: string;
		email: string;
		gross: string;
		taxes: string;
		netSalary: string;
		performance: string;
		status: string;
		payrollID?: string;
		avatarText?: string;
	}

	let searchQuery = writable('');
	let sortBy: string = '';
	let sortDirection: 'asc' | 'desc' = 'asc';
	let displayedPayrolls: Payroll[] = payrollData;
	let currentPage: number = 1;
	const itemsPerPage: number = 10;

	// Function to format dates (can be adjusted as needed)
	function formatDate(dateString: string): string {
		const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
		const date = new Date(dateString);
		const formattedDate = date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
		return formattedDate.replace(/(?<=\d) (?=\d{4})/, ', ');
	}

	// Function to generate avatar text from the teacher's name
	function generateAvatarText(name: string): string {
		const nameParts = name.split(' ');
		if (nameParts.length > 1) {
			return nameParts[0][0] + nameParts[1][0];
		}
		return name[0];
	}

	// Calculate the total number of pages
	const totalPages = Math.ceil(payrollData.length / itemsPerPage);

	// Update pagination for the displayed items
	function updatePagination() {
		let filteredStudents = payrollData.filter((payroll) => {
			const query = $searchQuery.toLowerCase();
			return payroll.teacherName.toLowerCase().includes(query);
		});
		const startIdx = (currentPage - 1) * itemsPerPage;
		const endIdx = startIdx + itemsPerPage;
		displayedPayrolls = filteredStudents.slice(startIdx, endIdx);
	}

	// Sort data based on the selected column and direction
	function sort(column: string) {
		if (sortBy === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = column;
			sortDirection = 'asc';
		}

		payrollData.sort((a: any, b: any) => {
			const aValue = a[column];
			const bValue = b[column];

			if (typeof aValue === 'string' && typeof bValue === 'string') {
				return sortDirection === 'asc'
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue);
			}
			return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
		});

		updatePagination();
	}

	// Navigate to the previous page
	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
			updatePagination();
		}
	}

	// Navigate to the next page
	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
			updatePagination();
		}
	}

	// Go to a specific page
	function gotoPage(page: number) {
		currentPage = page;
		updatePagination();
	}

	onMount(() => {
		let startID = 1098; // Starting ID
		payrollData.forEach((payroll, index) => {
			payroll.payrollID = 'PES-' + (startID + index).toString();
			payroll.avatarText = generateAvatarText(payroll.teacherName);
		});
		updatePagination();
	});
</script>

<Col cols={{ span: 12 }} class="card">
	<CardHeader>
		<div class="flex flex-wrap justify-between gap-4">
			<div>
				<div class="group/form relative grow">
					<input
						type="email"
						bind:value={$searchQuery}
						on:input={updatePagination}
						class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
						placeholder="Search for ..."
					/>
					<button
						class="lt:group-[&.right]/form:right-3 absolute inset-y-0 flex items-center focus:outline-none ltr:left-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
					>
						<LucideIcon
							name="Search"
							class="dark:text-dark-500 dark:fill-dark-850 size-4 fill-gray-100 text-gray-500"
						/>
					</button>
				</div>
			</div>
			<div>
				<div id="sorting" class="w-full" placeholder="Sorting By"></div>
			</div>
		</div>
	</CardHeader>
	<CardBody>
		<div>
			<div class="overflow-x-auto whitespace-nowrap">
				<table class="flush table">
					<tbody>
						<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
							<th class="cursor-pointer !font-medium" on:click={() => sort('teacherName')}>
								Teacher Name <span
									>{sortBy === 'teacherName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('email')}>
								Email <span>{sortBy === 'email' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('gross')}>
								Phone <span>{sortBy === 'gross' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('taxes')}>
								Taxes <span>{sortBy === 'taxes' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('netSalary')}>
								Salary <span
									>{sortBy === 'netSalary' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('performance')}>
								Performance <span
									>{sortBy === 'performance' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th class="cursor-pointer !font-medium" on:click={() => sort('status')}>
								Status <span
									>{sortBy === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
						</tr>

						{#each displayedPayrolls as payroll, index}
							<tr class="">
								<td>
									<div class="flex items-center gap-3">
										<div
											class="dark:bg-dark-850 dark:text-dark-500 relative size-6 rounded-full bg-gray-100 text-gray-500"
										>
											{#if payroll.image}
												<img src={payroll.image} alt="" class="rounded-full" />
											{:else}
												<span
													class="dark:bg-dark-850 dark:text-dark-500 text-11 absolute inset-0 flex items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-500"
												>
													{payroll.avatarText}
												</span>
											{/if}
										</div>
										<div>
											<h6>
												<a href="/apps-school-teachers-overview">{payroll.teacherName}</a>
											</h6>
										</div>
									</div>
								</td>
								<td>{payroll.email}</td>
								<td>{payroll.gross}</td>
								<td>{payroll.taxes}</td>
								<td>{payroll.netSalary}</td>
								<td>
									<span
										class={`badge ${payroll.performance === 'Excellent' ? 'badge-orange' : payroll.performance === 'Good' ? 'badge-purple' : 'badge-sky'}`}
									>
										{payroll.performance}
									</span>
								</td>
								<td>
									<span
										class={`badge ${payroll.status === 'Active' ? 'badge-green' : 'badge-yellow'}`}
									>
										{payroll.status}
									</span>
								</td>
							</tr>
						{/each}

						{#if displayedPayrolls.length === 0}
							<tr>
								<td colspan="10" class="!p-8">
									<TableRowNotFound />
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>

			<div
				class="mt-5 grid grid-cols-12 items-center gap-5"
				class:visible={displayedPayrolls.length > 0}
			>
				<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
					<p class="dark:text-dark-500 text-gray-500">
						Showing <b>{(currentPage - 1) * itemsPerPage + 1}</b> -
						<b>{Math.min(currentPage * itemsPerPage, payrollData.length)}</b>
						of <b>{payrollData.length}</b> Results
					</p>
				</div>
				<div class="col-span-12 md:col-span-6">
					<div class="pagination pagination-primary flex justify-center md:justify-end">
						<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />Prev
						</button>

						{#each Array(totalPages)
							.fill(0)
							.map((_, i) => i + 1) as page}
							<button
								on:click={() => gotoPage(page)}
								class:active={currentPage === page}
								class="pagination-item"
							>
								<span>{page}</span>
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
