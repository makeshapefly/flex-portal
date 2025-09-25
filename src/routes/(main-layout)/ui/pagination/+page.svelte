<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Pagination from '$lib/components/ui/pagination/Pagination.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Pagination" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Basic Pagination</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<Pagination
					paginationConfig={{
						currentPage: 1,
						itemsPerPage: 5,
						totalItems: 50
					}}
				/>
			</div>
			<div class="mt-space">
				<Pagination
					paginationConfig={{
						currentPage: 1,
						itemsPerPage: 5,
						totalItems: 50
					}}
					color="green"
					variant="basic-rounded"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Modern Pagination</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-4">
				<div
					class="dark:border-dark-800 inline-flex items-center gap-3 overflow-hidden rounded-md border border-gray-200"
				>
					<button
						aria-label="previous"
						type="button"
						class="dark:border-dark-800 dark:bg-dark-850 hover:text-primary-500 [&.active]:text-primary-500 dark:disabled:text-dark-500 flex size-9 items-center justify-center border-gray-200 bg-gray-100 text-sm transition duration-200 ease-linear disabled:text-gray-500 ltr:border-r rtl:border-l"
					>
						<LucideIcon name="ChevronLeft" class="size-5 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronRight" class="size-5 ltr:hidden rtl:inline-block" />
					</button>
					<p class="dark:text-dark-500 text-gray-500">
						<b class="dark:text-dark-100 font-medium text-gray-800">04</b> / 24
					</p>
					<button
						aria-label="next"
						type="button"
						class="dark:border-dark-800 dark:bg-dark-850 hover:text-primary-500 [&.active]:text-primary-500 dark:disabled:text-dark-500 flex size-9 items-center justify-center border-gray-200 bg-gray-100 text-sm transition duration-200 ease-linear disabled:text-gray-500 ltr:border-l rtl:border-r"
					>
						<LucideIcon name="ChevronRight" class="size-5 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronLeft" class="size-5 ltr:hidden rtl:inline-block" />
					</button>
				</div>

				<div
					class="dark:border-dark-800 inline-flex items-center gap-3 overflow-hidden rounded-full border border-gray-200"
				>
					<button
						aria-label="previous"
						type="button"
						class="dark:border-dark-800 dark:bg-dark-850 hover:text-primary-500 [&.active]:text-primary-500 dark:disabled:text-dark-500 flex size-9 items-center justify-center border-gray-200 bg-gray-100 text-sm transition duration-200 ease-linear disabled:text-gray-500 ltr:border-r rtl:border-l"
					>
						<LucideIcon name="ChevronLeft" class="size-5 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronRight" class="size-5 ltr:hidden rtl:inline-block" />
					</button>
					<p class="dark:text-dark-500 text-gray-500">
						<b class="dark:text-dark-100 font-medium text-gray-800">04</b> / 24
					</p>
					<button
						aria-label="previous"
						type="button"
						class="dark:border-dark-800 dark:bg-dark-850 hover:text-primary-500 [&.active]:text-primary-500 dark:disabled:text-dark-500 flex size-9 items-center justify-center border-gray-200 bg-gray-100 text-sm transition duration-200 ease-linear disabled:text-gray-500 ltr:border-l rtl:border-r"
					>
						<LucideIcon name="ChevronRight" class="size-5 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronLeft" class="size-5 ltr:hidden rtl:inline-block" />
					</button>
				</div>
			</div>
			<div class="mt-5 flex flex-wrap items-center gap-4">
				<Pagination
					paginationConfig={{
						currentPage: 1,
						itemsPerPage: 5,
						totalItems: 50
					}}
					variant="modern"
				/>

				<Pagination
					paginationConfig={{
						currentPage: 1,
						itemsPerPage: 5,
						totalItems: 50
					}}
					color="green"
					variant="modern-rounded"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Flush Pagination</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<Pagination
					paginationConfig={{
						currentPage: 1,
						itemsPerPage: 5,
						totalItems: 50
					}}
					variant="flush"
				/>
			</div>
			<div class="mt-space">
				<Pagination
					paginationConfig={{
						currentPage: 2,
						itemsPerPage: 5,
						totalItems: 50
					}}
					color="purple"
					variant="flush-rounded"
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Size Pagination</CardTitle>
		</CardHeader>
		<CardBody>
			<!-- <SizePagination /> -->
			<div>
				<div class="pagination pagination-primary pagination-xs">
					<Pagination
						paginationConfig={{
							currentPage: 1,
							itemsPerPage: 5,
							totalItems: 50
						}}
					/>
				</div>
			</div>
			<div class="mt-space">
				<div class="pagination pagination-primary pagination-sm">
					<Pagination
						paginationConfig={{
							currentPage: 1,
							itemsPerPage: 5,
							totalItems: 50
						}}
					/>
				</div>
			</div>

			<div class="mt-space">
				<div class="pagination pagination-primary pagination-md">
					<Pagination
						paginationConfig={{
							currentPage: 1,
							itemsPerPage: 5,
							totalItems: 50
						}}
					/>
				</div>
			</div>
			<div class="mt-space">
				<div class="pagination pagination-primary">
					<Pagination
						paginationConfig={{
							currentPage: 1,
							itemsPerPage: 5,
							totalItems: 50
						}}
					/>
				</div>
			</div>
			<div class="mt-space">
				<div class="pagination pagination-primary">
					<Pagination
						paginationConfig={{
							currentPage: 1,
							itemsPerPage: 5,
							totalItems: 50
						}}
					/>
				</div>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Light Pagination</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="pagination pagination-flush dark:bg-dark-850 bg-gray-100 p-2">
				<Pagination
					paginationConfig={{
						currentPage: 1,
						itemsPerPage: 5,
						totalItems: 50
					}}
					variant="flush"
				/>
			</div>
			<div class="mt-space">
				<div class="pagination pagination-flush dark:bg-dark-850 rounded-full bg-gray-100 p-2">
					<Pagination
						paginationConfig={{
							currentPage: 1,
							itemsPerPage: 5,
							totalItems: 50
						}}
						variant="flush"
						color="green"
					/>
				</div>
			</div>
		</CardBody>
	</Col>
</Grid>
