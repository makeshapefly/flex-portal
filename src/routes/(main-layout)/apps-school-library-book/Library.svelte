<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { books as importedBooks } from './book';

	type Book = {
		title: string;
		author: string;
		image: string;
		rating: number;
		reviewCount: number;
		price: number;
		type: string;
	};

	let books = [...importedBooks];
	let inViewBook: Book | null = null;
	let searchQuery = '';

	// Pagination state
	const itemsPerPage = 12;
	let currentPage = 1;

	// Computed filtered books based on the search query
	$: filteredBooks = books.filter((book) => {
		return (
			book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			book.author.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	// Computed pagination values based on filtered books
	$: totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
	$: displayedBooks = filteredBooks.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	// Pagination functions
	const prevPage = () => (currentPage = Math.max(1, currentPage - 1));
	const nextPage = () => (currentPage = Math.min(totalPages, currentPage + 1));
	const gotoPage = (page: number) => (currentPage = page);

	// Star rating helper functions
	const fullStars = (rating: number) => Math.floor(rating);
	const halfStars = (rating: number) => (rating % 1 >= 0.5 ? 1 : 0);
	const emptyStars = (rating: number) => 5 - fullStars(rating) - halfStars(rating);

	interface BookForm {
		image: string;
		title: string;
		author: string;
		price: number;
	}

	let bookForm: BookForm = {
		image: '',
		title: '',
		author: '',
		price: 0
	};

	let errors: { [key: string]: string } = {};
	let imageUrl: string = '';

	// Validate Form Fields
	const validateField = (
		fieldName: keyof BookForm,
		fieldValue: string | number,
		errorMessage: string
	) => {
		if (!fieldValue) {
			errors[fieldName] = errorMessage;
		} else {
			delete errors[fieldName];
		}
	};

	// Validate entire form
	const validateForm = (): boolean => {
		errors = {};
		validateField('image', bookForm.image, 'Image is required.');
		validateField('title', bookForm.title, 'Title is required.');
		validateField('author', bookForm.author, 'Author is required.');
		validateField('price', bookForm.price, 'Price is required.');

		return Object.keys(errors).length === 0;
	};

	// Add Book to List
	const addBook = () => {
		if (validateForm()) {
			// Add the book to the books array
			books = [...books, { ...bookForm, rating: 0, reviewCount: 0, type: 'Newest' }];

			// Reset form values
			bookForm = { image: '', title: '', author: '', price: 0 };
			imageUrl = '';
		}
	};

	// Handle file selection
	const fileChosen = (event: Event) => {
		const input = event.target as HTMLInputElement;
		const file = input?.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const img = new Image();
			img.src = e.target?.result as string;
			img.onload = () => {
				const width = img.width;
				const height = img.height;

				// Validate image size
				if (width <= 300 && height <= 460) {
					imageUrl = img.src;
					bookForm.image = img.src;
					validateField('image', bookForm.image, 'Image is required.');
				} else {
					imageUrl = '';
					bookForm.image = '';
					validateField(
						'image',
						'',
						`Image must be 300x460. Uploaded image size is ${width}x${height}.`
					);
				}
			};
		};
		reader.readAsDataURL(file);
	};
</script>

<Grid cols={12} gap="space" class="mb-space">
	<Col cols={{ span: 12 }} md={{ span: 4 }} xl={{ span: 3 }}>
		<div class="relative flex items-center">
			<input
				type="text"
				bind:value={searchQuery}
				class="form-input grow ltr:rounded-r-none ltr:border-r-0 rtl:rounded-l-none rtl:border-l-0"
				placeholder="Search for books by title or author..."
			/>
			<button
				type="button"
				title="search-button"
				class="btn btn-sub-gray btn-icon shrink-0 border-gray-200 ltr:rounded-l-none rtl:rounded-r-none"
			>
				<LucideIcon name="Search" class="size-5" />
			</button>
		</div>
	</Col>
	<!-- end col -->
	<div class="col-span-12 md:col-span-3 2xl:col-span-2 2xl:col-start-9">
		<div id="sortBySelect" placeholder="Sort By"></div>
	</div>
	<!-- end col -->
	<div class="col-span-12 md:col-span-3 2xl:col-span-2">
		<ModalTrigger modalId="add-book-modal" icon="CirclePlus" class="btn w-full" text="Add Book" />
		<Modal modalId="add-book-modal" let:modalId size="md">
			<ModalHeader {modalId}>
				<h6>Add Book</h6>
			</ModalHeader>
			<ModalBody>
				<form on:submit|preventDefault={addBook}>
					<div class="gap-space grid grid-cols-12">
						<div class="col-span-12">
							<div class="text-center">
								<label for="logo">
									<div
										class="dark:bg-dark-850 dark:border-dark-800 mx-auto inline-flex h-44 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gray-100"
									>
										{#if imageUrl}
											<!-- svelte-ignore a11y-missing-attribute -->
											<img src={imageUrl} class="h-full w-full object-cover" />
										{:else}
											<div class="dark:text-dark-500 mx-8 flex flex-col items-center text-gray-500">
												<LucideIcon name="Upload"></LucideIcon>
												<div class="mt-2">Book Poster</div>
											</div>
										{/if}
									</div>
								</label>
								<input
									type="file"
									id="logo"
									class="hidden"
									accept="image/*"
									on:change={fileChosen}
								/>
							</div>
							{#if errors.image}
								<div class="text-center">
									<span class="text-red-500">{errors.image}</span>
								</div>
							{/if}
						</div>

						<div class="col-span-12">
							<label for="bookTitleInput" class="form-label">Book Title</label>
							<input
								type="text"
								id="bookTitleInput"
								class="form-input"
								placeholder="Enter book title"
								bind:value={bookForm.title}
								on:input={() => validateField('title', bookForm.title, 'Title is required.')}
							/>
							{#if errors.title}
								<span class="text-red-500">{errors.title}</span>
							{/if}
						</div>

						<div class="col-span-12">
							<label for="writerNameInput" class="form-label">Writer Name</label>
							<input
								type="text"
								id="writerNameInput"
								class="form-input"
								placeholder="Enter writer name"
								bind:value={bookForm.author}
								on:input={() => validateField('author', bookForm.author, 'Author is required.')}
							/>
							{#if errors.author}
								<span class="text-red-500">{errors.author}</span>
							{/if}
						</div>

						<div class="col-span-12">
							<label for="priceInput" class="form-label">Price</label>
							<input
								type="number"
								id="priceInput"
								class="form-input"
								placeholder="$00.00"
								bind:value={bookForm.price}
								on:input={() => validateField('price', bookForm.price, 'Price is required.')}
							/>
							{#if errors.price}
								<span class="text-red-500">{errors.price}</span>
							{/if}
						</div>

						<div class="col-span-12">
							<div class="flex justify-end gap-2">
								<button type="button" class="btn btn-active-red">
									<i data-lucide="x" class="inline-block size-4"></i>
									<span>Close</span>
								</button>
								<button type="button" class="btn btn-primary" on:click={addBook}>
									<span>Add Book</span>
								</button>
							</div>
						</div>
					</div>
				</form>
			</ModalBody>
		</Modal>
	</div>
</Grid>

<div class="gap-x-space grid grid-cols-12">
	{#each displayedBooks as book, index (index)}
		<div class="card col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<div class="card-body flex items-center gap-3">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img
					src={book.image}
					alt={book.title}
					class="h-40 shrink-0 cursor-pointer rounded-md"
					on:click={() => (inViewBook = book)}
				/>
				<div class="grow overflow-hidden">
					<h6 class="mb-1 truncate">
						<a href="#!" on:click={() => (inViewBook = book)} class="link link-primary !text-current"
							>{book.title}</a
						>
					</h6>
					<p class="dark:text-dark-500 mb-2 text-gray-500">
						By <a href="#!" class="link link-green underline">{book.author}</a>
					</p>
					<div class="mb-2 flex gap-1.5 text-yellow-500">
						{#each Array(fullStars(book.rating)) as _}
							<i class="ri-star-fill"></i>
						{/each}
						{#if halfStars(book.rating)}
							<i class="ri-star-half-fill"></i>
						{/if}
						{#each Array(emptyStars(book.rating)) as _}
							<i class="ri-star-line"></i>
						{/each}
						<span class="dark:text-dark-50 text-gray-800">({book.reviewCount})</span>
					</div>
					<h5 class="mb-2">${book.price.toFixed(2)}</h5>
					<button type="button" class="btn btn-sub-red w-full">Buy Now</button>
				</div>
			</div>
		</div>
	{/each}
</div>

{#if displayedBooks.length == 0}
	<div class="!p-8">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			class="mx-auto size-12"
			viewBox="0 0 48 48"
		>
			<linearGradient
				id="SVGID_1__h35ynqzIJzH4_gr1"
				x1="34.598"
				x2="15.982"
				y1="15.982"
				y2="34.598"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset="0" stop-color="#60e8fe"></stop>
				<stop offset=".033" stop-color="#6ae9fe"></stop>
				<stop offset=".197" stop-color="#97f0fe"></stop>
				<stop offset=".362" stop-color="#bdf5ff"></stop>
				<stop offset=".525" stop-color="#dafaff"></stop>
				<stop offset=".687" stop-color="#eefdff"></stop>
				<stop offset=".846" stop-color="#fbfeff"></stop>
				<stop offset="1" stop-color="#fff"></stop>
			</linearGradient>
			<path
				fill="url(#SVGID_1__h35ynqzIJzH4_gr1)"
				d="M40.036,33.826L31.68,25.6c0.847-1.739,1.335-3.684,1.335-5.748c0-7.27-5.894-13.164-13.164-13.164	S6.688,12.582,6.688,19.852c0,7.27,5.894,13.164,13.164,13.164c2.056,0,3.995-0.485,5.728-1.326l3.914,4.015l4.331,4.331	c1.715,1.715,4.496,1.715,6.211,0C41.751,38.321,41.751,35.541,40.036,33.826z"
			></path>
			<path
				fill="none"
				stroke="#10cfe3"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				stroke-width="3"
				d="M31.95,25.739l8.086,8.086c1.715,1.715,1.715,4.496,0,6.211l0,0c-1.715,1.715-4.496,1.715-6.211,0	l-4.331-4.331"
			></path>
			<path
				fill="none"
				stroke="#10cfe3"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				stroke-width="3"
				d="M7.525,24.511c-1.771-4.694-0.767-10.196,3.011-13.975c3.847-3.847,9.48-4.817,14.228-2.912"
			></path>
			<path
				fill="none"
				stroke="#10cfe3"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				stroke-width="3"
				d="M30.856,12.603c3.376,5.114,2.814,12.063-1.688,16.565c-4.858,4.858-12.565,5.129-17.741,0.814"
			></path>
		</svg>
		<p class="dark:text-dark-500 mt-2 text-center text-gray-500">No matching records found</p>
	</div>
{/if}

<!-- Pagination -->
{#if displayedBooks.length > 0}
	<div class="mb-5 grid grid-cols-12 items-center gap-5">
		<div class="col-span-12 text-center md:col-span-6 ltr:md:text-left rtl:md:text-right">
			<p class="dark:text-dark-500 text-gray-500">
				Showing <b>{(currentPage - 1) * itemsPerPage + 1}</b> -
				<b>{Math.min(currentPage * itemsPerPage, filteredBooks.length)}</b>
				of <b>{filteredBooks.length}</b> Results
			</p>
		</div>
		<div class="col-span-12 md:col-span-6">
			<div class="pagination pagination-primary flex justify-center md:justify-end">
				<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
					<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
					<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
					Prev
				</button>
				{#each Array(totalPages) as _, page (page)}
					<button
						on:click={() => gotoPage(page + 1)}
						class="pagination-item {currentPage === page + 1 ? 'active' : ''}"
					>
						<span>{page + 1}</span>
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
