<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import ReviewDetailsForm from './ReviewDetailsForm.svelte';
	import { reviewsData } from './reviews';

	let safeReviewsData = $reviewsData || [];

	let searchQuery = '';
	let averageRating = 0;
	let currentPage = 1;
	const reviewsPerPage = 10;

	// Pagination logic
	let totalReviewsCount = safeReviewsData.length;

	const totalPages = Math.ceil(totalReviewsCount / reviewsPerPage);
	const showingStart = (currentPage - 1) * reviewsPerPage + 1;
	const showingEnd = Math.min(currentPage * reviewsPerPage, totalReviewsCount);
	$: filteredReviews = safeReviewsData.filter(
		(review) =>
			review.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			review.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			review.content?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	$: displayedReviews = filteredReviews.slice(
		(currentPage - 1) * reviewsPerPage,
		currentPage * reviewsPerPage
	);

	const updateDisplayedReviews = () => {
		displayedReviews = safeReviewsData.slice(
			(currentPage - 1) * reviewsPerPage,
			currentPage * reviewsPerPage
		);
	};

	// Prevent error when calculating `averageRating`
	$: if (displayedReviews.length > 0) {
		averageRating =
			displayedReviews.reduce((sum, review) => sum + parseFloat(String(review.star) || '0'), 0) /
			displayedReviews.length;
	}

	const prevPage = () => {
		if (currentPage > 1) {
			currentPage--;
			updateDisplayedReviews();
		}
	};

	const nextPage = () => {
		if (currentPage < totalPages) {
			currentPage++;
			updateDisplayedReviews();
		}
	};

	const gotoPage = (page: number) => {
		currentPage = page;
		updateDisplayedReviews();
	};

	function getStarClass(star: number, index: number) {
		return star >= index ? 'ri-star-fill text-yellow-500' : 'ri-star-line text-yellow-500';
	}

	// ------------------------- table activity
	let addForm = false;
	let editMode = false;
	let selectedCustomerDetails: any | null = null;
	function openAddForm() {
		addForm = true;
		editMode = false;
		selectedCustomerDetails = null;
	}

	function openEditForm(customer: any) {
		addForm = false;
		editMode = true;
		selectedCustomerDetails = customer;
	}
</script>

<Grid cols={12} gap={5} class="mb-5 items-center">
	<Col cols={{ span: 12 }} class="2xl:col-span-8">
		<CardTitle>Reviews</CardTitle>
	</Col>
	<Col cols={{ span: 12 }} class="2xl:col-span-4">
		<div class="flex flex-wrap items-center gap-3 2xl:justify-end">
			<div class="group/form relative">
				<input
					type="email"
					class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
					placeholder="Search username, date, etc..."
					bind:value={searchQuery}
				/>
				<span
					class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
				>
					<LucideIcon name="Search" class="size-4" />
				</span>
			</div>
			<ModalTrigger
				modalId="addReviewModal"
				color="primary"
				icon="Plus"
				text="New Review"
				class="btn"
				onClick={() => openAddForm()}
			/>
		</div>
	</Col>
</Grid>

<div>
	<div
		class="dark:divide-dark-800 mb-4 grid grid-cols-1 items-center divide-y divide-gray-200 xl:grid-cols-3 xl:divide-x xl:divide-y-0 rtl:xl:divide-x-reverse"
	>
		<!-- Total Reviews -->
		<div class="p-5 last:border-0 ltr:last:pr-0 xl:ltr:first:pl-0 rtl:last:pl-0 xl:rtl:first:pr-0">
			<h6 class="mb-5">Total Reviews</h6>
			<h3>
				{totalReviewsCount}
				<span class="badge badge-green inline-block align-middle text-xs">100%</span>
			</h3>
			<p class="dark:text-dark-500 mt-2 text-gray-500">Growth in reviews on this year</p>
		</div>

		<!-- Average Rating -->
		<div class="p-5 last:border-0 ltr:first:pl-0 ltr:last:pr-0 rtl:first:pr-0 rtl:last:pl-0">
			<h6 class="mb-5">Average Rating</h6>
			<div class="flex items-center gap-3">
				<h3>{averageRating.toFixed(1)}</h3>
				<div class="text-yellow-500">
					{#each Array(5) as _, i}
						<i class={getStarClass(averageRating, i + 1)}></i>
					{/each}
				</div>
			</div>
			<p class="dark:text-dark-500 mt-2 text-gray-500">Average rating on this year</p>
		</div>

		<!-- Review Progress -->
		<div
			class="space-y-1 p-5 last:border-0 ltr:first:pl-0 ltr:last:pr-0 rtl:first:pr-0 rtl:last:pl-0"
		>
			<div class="flex items-center gap-2">
				<p class="shrink-0">
					<i class="ri-star-fill text-yellow-500"></i> 5
				</p>
				<div class="progress-bar progress-1 w-[80%]">
					<div class="progress-bar-wrap w-full bg-green-500 text-white"></div>
				</div>
				<h6>4751</h6>
			</div>
			<div class="flex items-center gap-2">
				<p class="shrink-0">
					<i class="ri-star-fill text-yellow-500"></i> 4
				</p>
				<div class="progress-bar progress-1 w-[64%]">
					<div class="progress-bar-wrap w-full bg-pink-500 text-white"></div>
				</div>
				<h6>3658</h6>
			</div>
			<div class="flex items-center gap-2">
				<p class="shrink-0">
					<i class="ri-star-fill text-yellow-500"></i> 3
				</p>
				<div class="progress-bar progress-1 w-[51%]">
					<div class="progress-bar-wrap w-full bg-yellow-500 text-white"></div>
				</div>
				<h6>2349</h6>
			</div>
			<div class="flex items-center gap-2">
				<p class="shrink-0">
					<i class="ri-star-fill text-yellow-500"></i> 2
				</p>
				<div class="progress-bar progress-1 w-[38%]">
					<div class="progress-bar-wrap w-full bg-sky-500 text-white"></div>
				</div>
				<h6>1472</h6>
			</div>
			<div class="flex items-center gap-2">
				<p class="shrink-0">
					<i class="ri-star-fill text-yellow-500"></i> 1
				</p>
				<div class="progress-bar progress-1 w-[15%]">
					<div class="progress-bar-wrap w-full bg-red-500 text-white"></div>
				</div>
				<h6>120</h6>
			</div>
		</div>
	</div>

	<div class="!overflow-x-auto">
		<table class="flush table !overflow-x-auto whitespace-nowrap">
			<tbody>
				{#if displayedReviews.length > 0}
					{#each displayedReviews as review, index (index)}
						<tr class="gap-2">
							<td class="align-top whitespace-nowrap">
								<div class="flex items-center gap-3">
									<img src={review.image} alt="" class="size-16 shrink-0 rounded-md" />
									<div class="grow overflow-hidden">
										<h6 class="mb-1 truncate">
											<a href="#!" class="link link-primary !text-current">{review.userName}</a>
										</h6>
										<p class="mb-1 truncate text-sm">{review.date}</p>
										<p class="dark:text-dark-500 truncate text-sm text-gray-500">
											Location: <span>{review.location}</span>
										</p>
									</div>
								</div>
							</td>
							<td class="whitespace-nowrap">
								<div class="max-w-[550px]">
									<div class="mb-3 flex items-center gap-2">
										<div class="text-yellow-500">
											{#each Array(5) as _, i}
												<i class={getStarClass(parseFloat(String(review.star)), i + 1)}></i>
											{/each}
										</div>
										<h6>({review.star})</h6>
									</div>
									<h6 class="mb-1">{review.title}</h6>
									<p class="dark:text-dark-500 whitespace-normal text-gray-500">{review.content}</p>
								</div>
							</td>
							<td class="align-top">
								<div class="flex items-center justify-end gap-3">
									<button class="btn btn-sub-gray">Direct Message</button>
									<Dropdown class="dropdown" alignTo="right-bottom">
										<DropdownButton class="btn btn-icon-text btn-primary btn-icon">
											<i class="ri-more-2-fill"></i>
										</DropdownButton>

										<DropdownMenu class="dropdown-menu !fixed hidden p-2">
											<ModalTrigger
												text="Edit"
												modalId="addReviewModal"
												icon="Pencil"
												color=""
												btnSizeClass=""
												iconClass=" "
												btnClass=""
												class="dropdown-item justify-start"
												onClick={() => openEditForm(review)}
											></ModalTrigger>
											<ModalTrigger
												text="Delete"
												modalId="delete-file-modal"
												icon="Trash2"
												color=""
												btnSizeClass=""
												iconClass=" "
												btnClass=""
												class="dropdown-item justify-start"
											></ModalTrigger>
										</DropdownMenu>
									</Dropdown>
								</div>
							</td>
						</tr>
					{/each}
				{:else}
					<TableRowNotFound />
				{/if}
			</tbody>
		</table>
	</div>

	{#if displayedReviews.length !== 0}
		<div class="my-5 grid grid-cols-12 items-center gap-5">
			<div class="col-span-12 md:col-span-6">
				<p class="dark:text-dark-500 text-gray-500">
					Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{totalReviewsCount}</b> Results
				</p>
			</div>
			<div class="col-span-12 md:col-span-6">
				<div class="pagination pagination-primary flex justify-start md:justify-end">
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
					<button on:click={nextPage} disabled={currentPage === totalPages} class="pagination-next">
						Next
						<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
						<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<Modal modalId="addReviewModal">
	<ModalHeader modalId="addReviewModal">
		<h6>{editMode ? 'Update review' : 'Add review'}</h6>
	</ModalHeader>
	<ModalBody>
		<ReviewDetailsForm
			{addForm}
			{editMode}
			selectedCustomer={selectedCustomerDetails}
			on:click={openAddForm}
		/>
	</ModalBody>
</Modal>

<DeleteComponent />
