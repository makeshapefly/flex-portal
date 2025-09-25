<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Pagination from '$lib/components/ui/pagination/Pagination.svelte';
	import CardSvgFile from './CardSvgFile.svelte';
	import { tableData } from './table';

	const pricingGrowthRate = [
		{
			title: 'Active Plan',
			growth: 35.9,
			user: 9725,
			svgColor: 'fill-green-500/20'
		},
		{
			title: 'UnActive Plan',
			growth: -6.4,
			user: 1020,
			svgColor: 'fill-red-500/20'
		},
		{
			title: 'Regular Plan',
			growth: 6.3,
			user: 9725,
			svgColor: 'fill-primary-500/20'
		},
		{
			title: 'Professional Plan',
			growth: 10.7,
			user: 4784,
			svgColor: 'fill-purple-500/20'
		},
		{
			title: 'Enterprise Plan',
			growth: 9.6,
			user: 2647,
			svgColor: 'fill-purple-500/20'
		}
	];
</script>

<Grid cols={1} gapX="space" class="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
	{#each pricingGrowthRate as growth}
		<Card class="relative overflow-hidden">
			<div class="absolute inset-0 opacity-90">
				<CardSvgFile fillColor={growth.svgColor} />
			</div>
			<CardBody class="relative">
				<h6 class="text-14 uppercase">{growth.title}</h6>
				<div class="flex h-32 items-center justify-center">
					<div>
						<LucideIcon
							name={growth.growth > 0 ? 'TrendingUp' : 'TrendingDown'}
							class={`mx-auto mb-2  size-7 ${growth.growth > 0 ? 'text-green-500' : 'text-red-500 '}`}
						/>
						<h3>{growth.growth > 0 ? '+' : ''}{growth.growth}%</h3>
					</div>
				</div>
				<h6>
					<LucideIcon name="UserRound" class="mb-0.5 inline-block size-4 ltr:mr-1 rtl:ml-1" />
					{growth.user}
				</h6>
			</CardBody>
		</Card>
	{/each}
</Grid>

<h6 class="mt-2 mb-5">All Users</h6>
<div class="overflow-x-auto">
	<table class="bordered table">
		<thead>
			<tr>
				<th class="whitespace-nowrap">User ID</th>
				<th class="whitespace-nowrap">Name</th>
				<th class="whitespace-nowrap">Start Date</th>
				<th class="whitespace-nowrap">End Date</th>
				<th class="whitespace-nowrap">Plan Type</th>
				<th class="whitespace-nowrap">Total Payment</th>
				<th class="whitespace-nowrap">Status</th>
				<th class="whitespace-nowrap">Action</th>
			</tr>
		</thead>
		<tbody>
			{#each tableData as row}
				<tr>
					<td class="whitespace-nowrap"><a href="#!">{row.userId}</a></td>
					<td class="whitespace-nowrap">{row.name}</td>
					<td class="whitespace-nowrap">{row.startDate}</td>
					<td class="whitespace-nowrap">{row.endDate}</td>
					<td class="whitespace-nowrap">{row.planType}</td>
					<td class="whitespace-nowrap">{row.totalPayment}</td>
					<td class="whitespace-nowrap">
						<span
							class={`badge ${row.status === 'Successfully' ? 'badge-green' : row.status === 'Failed' ? 'badge-red' : 'badge-yellow'}`}
							>{row.status}</span
						>
					</td>
					<td class="whitespace-nowrap">
						<Dropdown class="dropdown" alignTo="right-bottom">
							<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
								<LucideIcon name="Ellipsis" class="size-5" />
							</DropdownButton>
							<DropdownMenu class="dropdown-menu !fixed p-2">
								<a href="#!" class="dropdown-item">
									<LucideIcon name="Eye" class="inline-block size-4 ltr:mr-2 rtl:ml-2" />
									<span>Overview</span>
								</a>
								<a href="#!" class="dropdown-item">
									<LucideIcon name="Pencil" class="inline-block size-4 ltr:mr-2 rtl:ml-2" />
									<span>Edit</span>
								</a>
								<a href="#!" class="dropdown-item">
									<LucideIcon name="Trash2" class="inline-block size-4 ltr:mr-2 rtl:ml-2" />
									<span>Delete</span>
								</a>
							</DropdownMenu>
						</Dropdown>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="my-5">
	<Grid cols={12} gap={5} class="mb-5">
		<Col cols={{ span: 12 }} lg={{ span: 5 }} class="items-center md:flex">
			<p class="dark:text-dark-500 grow text-gray-500">Showing <b>8</b> of <b>76</b> Results</p>
		</Col>
		<div class="col-span-12 lg:col-span-7">
			<div class="pagination pagination-primary flex lg:justify-end">
				<Pagination
					paginationConfig={{
						currentPage: 1,
						itemsPerPage: 5,
						totalItems: 50
					}}
				/>
			</div>
		</div>
	</Grid>
</div>
