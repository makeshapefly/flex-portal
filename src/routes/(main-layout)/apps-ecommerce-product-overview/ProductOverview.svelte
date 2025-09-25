<script lang="ts">
	import { onMount } from 'svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { reviews } from './review';
	import Swiper from 'swiper';
	import { Pagination, Navigation, Autoplay } from 'swiper/modules';
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';
	import 'remixicon/fonts/remixicon.css';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';

	// Reactive variables
	let open = false;
	let basePrice = 49.99;
	let count = 2;
	let discount = 0.5;
	let activeColor = 'gray'; // Default color
	let showMore = false;
	let currentPage = 1;
	const itemsPerPage = 8;
	const totalPages = Math.ceil(reviews.length / itemsPerPage);
	let swiper: Swiper | null = null;
	let activeLink = 'primary';
	let activeSize = 'm';
	const sizes = ['s', 'm', 'l', 'xl', '2xl'];

	// Initialize form data
	let reviewForm = {
		star: 0,
		userName: '',
		date: '',
		location: '',
		title: '',
		content: ''
	};

	// Initialize errors
	let errors = {
		star: '',
		userName: '',
		date: '',
		location: '',
		title: '',
		content: ''
	};

	// Track hovering and rating state
	let hovering = 0;

	// Submit form
	const submitForm = () => {
		// Add form submission logic here
		console.log('Form submitted', reviewForm);
	};

	// Validate fields
	const validateField = (
		/** @type {string} */ field: string,
		/** @type {string | number} */ value: string | number,
		/** @type {string} */ message: string
	) => {
		if (!value) {
			// @ts-ignore
			errors[field] = message;
		} else {
			// @ts-ignore
			errors[field] = '';
		}
	};
	const getDisplayedReviews = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return reviews.slice(startIndex, startIndex + itemsPerPage);
	};

	let displayedReviews = getDisplayedReviews();

	// Show range of reviews (start-end)
	let showingStart = (currentPage - 1) * itemsPerPage + 1;
	let showingEnd = Math.min(currentPage * itemsPerPage, reviews.length);

	// Functions for pagination
	const prevPage = () => {
		if (currentPage > 1) {
			currentPage--;
			updatePagination();
		}
	};

	const nextPage = () => {
		if (currentPage < totalPages) {
			currentPage++;
			updatePagination();
		}
	};

	const gotoPage = (page: number) => {
		currentPage = page;
		updatePagination();
	};

	const updatePagination = () => {
		displayedReviews = getDisplayedReviews();
		showingStart = (currentPage - 1) * itemsPerPage + 1;
		showingEnd = Math.min(currentPage * itemsPerPage, reviews.length);
	};

	const getStarClass = (star: number, index: number) => {
		const fullStar = 'ri-star-fill text-yellow-500';
		const halfStar = 'ri-star-half-fill text-yellow-500';
		const emptyStar = 'ri-star-line text-yellow-500';
		if (star >= index) return fullStar;
		if (star >= index - 0.5) return halfStar;
		return emptyStar;
	};

	const updateDisplayedReviews = () => {
		displayedReviews = reviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
	};

	const addReview = () => {
		Object.keys(errors).forEach((field) => {
			//@ts-ignore
			validateField(field, reviewForm[field], `${field} is required.`);
		});

		if (!Object.values(errors).some((error) => error)) {
			const newReview = {
				userName: reviewForm.userName,
				date: reviewForm.date,
				location: reviewForm.location,
				title: reviewForm.title,
				content: reviewForm.content,
				star: reviewForm.star,
				image: '/assets/images/avatar/user-1.png'
			};
			//@ts-ignore
			reviews.unshift(newReview);
			// totalReviewsCount = reviewsData.length;

			reviewForm = {
				star: 0,
				userName: '',
				date: '',
				location: '',
				title: '',
				content: ''
			};
			updateDisplayedReviews();
		}
	};

	let swiperContainer: HTMLDivElement | null = null;
	let sliderEl: HTMLDivElement | null = null;
	onMount(() => {
		if (swiperContainer) {
			new Swiper(swiperContainer, {
				modules: [Navigation, Pagination, Autoplay],
				loop: true,
				pagination: {
					el: '.swiper-pagination',
					type: 'fraction'
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				}
			});
		}
		if (sliderEl) {
			new Swiper(sliderEl, {
				modules: [Pagination, Autoplay],
				loop: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				}
			});
		}
	});
</script>

<Col cols={{ span: 12 }} lg={{ span: 8 }}>
	<Card>
		<CardBody>
			<div class="mb-5 flex items-center">
				<p class="grow">
					<span class="badge badge-sub-gray"
						><LucideIcon
							name="Heart"
							class="mr-1 inline-block size-4 fill-red-500 text-red-500"
						/>Wishlist</span
					>
				</p>
				<div
					class="dark:divide-dark-800 flex shrink-0 items-center divide-x divide-gray-200 rtl:divide-x-reverse"
				>
					<a
						href="/apps-ecommerce-create-products"
						class="link link-primary flex items-center gap-1 ltr:pr-1 rtl:pl-1"
						><LucideIcon name="Pencil" class="inline-block size-4" /><span class="align-middle"
							>Edit</span
						></a
					>
					<a href="#!" class="link link-red flex items-center gap-1 ltr:pl-2 rtl:pr-2"
						><LucideIcon name="Trash2" class="inline-block size-4" /><span class="align-middle"
							>Delete</span
						></a
					>
				</div>
			</div>

			<h5 class="mb-3">Collection Ruffled Cotton Top</h5>
			<div
				class="dark:divide-dark-800 mb-5 flex items-center divide-x divide-gray-200 *:px-3 rtl:divide-x-reverse"
			>
				<p class="ltr:first:pl-0 rtl:first:pr-0">
					<i class="ri-star-half-line align-bottom text-yellow-500"></i> 4.8
				</p>
				<p class="ltr:first:pl-0 rtl:first:pr-0">149 Reviews</p>
				<p class="ltr:first:pl-0 rtl:first:pr-0">4789 Sales</p>
			</div>

			<h4 class="mt-3 flex items-center gap-2">
				$<span>{(basePrice * count * (1 - discount)).toFixed(2)}</span>
				<small class="dark:text-dark-500 font-normal text-gray-500 line-through">
					$<span>{(basePrice * count).toFixed(2)}</span>
				</small>
				<span class="badge badge-red shrink-0 text-xs">50%</span>
			</h4>

			<Grid cols={1} class="sm:grid-cols-2">
				<div>
					<h6 class="mt-5">Select Colors</h6>
					<div class="mt-2 flex grow items-center gap-2">
						<!-- Blue Color -->
						<a
							href="#!"
							class="dark:border-dark-900 dark:outline-dark-800 group/item flex size-6 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white outline outline-1 outline-gray-200"
							class:active={activeColor === 'blue'}
							on:click={(e) => {
								e.preventDefault();
								activeColor = 'blue';
							}}
						>
							<LucideIcon name="Check" class="hidden size-4 group-[&.active]/item:block" />
						</a>
						<!-- Gray Color -->
						<a
							href="#!"
							class="dark:border-dark-900 dark:outline-dark-800 group/item flex size-6 items-center justify-center rounded-full border-2 border-white bg-gray-300 text-white outline outline-1 outline-gray-200"
							class:active={activeColor === 'gray'}
							on:click={(e) => {
								e.preventDefault();
								activeColor = 'gray';
							}}
						>
							<LucideIcon name="Check" class="hidden size-4 group-[&.active]/item:block" />
						</a>
						<!-- Pink Color -->
						<a
							href="#!"
							class="dark:border-dark-900 dark:outline-dark-800 group/item flex size-6 items-center justify-center rounded-full border-2 border-white bg-pink-500 text-white outline outline-1 outline-gray-200"
							class:active={activeColor === 'pink'}
							on:click={(e) => {
								e.preventDefault();
								activeColor = 'pink';
							}}
						>
							<LucideIcon name="Check" class="hidden size-4 group-[&.active]/item:block" />
						</a>
						<!-- Green Color -->
						<a
							href="#!"
							class="dark:border-dark-900 dark:outline-dark-800 group/item flex size-6 items-center justify-center rounded-full border-2 border-white bg-green-500 text-white outline outline-1 outline-gray-200"
							class:active={activeColor === 'green'}
							on:click={(e) => {
								e.preventDefault();
								activeColor = 'green';
							}}
						>
							<LucideIcon name="Check" class="hidden size-4 group-[&.active]/item:block" />
						</a>
						<!-- Red Color -->
						<a
							href="#!"
							class="dark:border-dark-900 dark:outline-dark-800 group/item flex size-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-white outline outline-1 outline-gray-200"
							class:active={activeColor === 'red'}
							on:click={(e) => {
								e.preventDefault();
								activeColor = 'red';
							}}
						>
							<LucideIcon name="Check" class="hidden size-4 group-[&.active]/item:block" />
						</a>
					</div>
				</div>

				<div>
					<h6 class="mt-5">Select Size</h6>
					<div class="mt-3 flex shrink-0 items-center gap-2 font-medium">
						{#each sizes as size}
							<a
								href="#!"
								class={`[&.active]:text-green-500 ${activeSize === size ? 'active' : 'dark:text-dark-500 text-gray-500'}`}
								on:click|preventDefault={() => (activeSize = size)}
							>
								{size.toUpperCase()}
							</a>
						{/each}
					</div>
				</div>
			</Grid>

			<div class="my-5">
				<div
					class="dark:border-dark-800 flex w-32 items-center rounded-md border border-gray-200 p-1 text-center"
				>
					<button
						on:click={() => {
							if (count > 1) count--;
						}}
						class="text-primary-500 minus bg-primary-500/20 hover:text-primary-700 flex size-8 shrink-0 items-center justify-center rounded-md transition duration-200 ease-linear"
					>
						<LucideIcon name="Minus" class="size-4" />
					</button>
					<input
						type="text"
						bind:value={count}
						class="form-input h-8 rounded-none border-0 p-0 text-center"
						readonly
					/>
					<button
						on:click={() => count++}
						class="text-primary-500 plus bg-primary-500/20 hover:text-primary-700 flex size-8 shrink-0 items-center justify-center rounded-md transition duration-200 ease-linear"
					>
						<LucideIcon name="Plus" class="size-4" />
					</button>
				</div>
			</div>

			<div class="mb-5 flex flex-wrap items-center gap-2">
				<button type="button" class="btn btn-red w-36">Buy Now</button>
				<button type="button" class="btn btn-sub-gray w-36">Add to Cart</button>
			</div>

			<h6 class="mb-2">Available offers</h6>
			<div class="mb-5">
				<ul class="dark:text-dark-500 list-circle list-inside space-y-2 text-gray-500">
					<li>
						<span class="font-semibold">Bank Offer</span> Get ₹50 instant discount on first Domiex
						UPI txn on order of ₹200 and above <a href="#!" class="link link-red underline">T&C</a>
					</li>
					<li>
						<span class="font-semibold">Bank Offer</span> 5% Cashback on Domiex Axis Bank Card
						<a href="#!" class="link link-red underline">T&C</a>
					</li>
					<li>
						<span class="font-semibold">Special Price</span> Get extra ₹7000 off (price inclusive of
						cashback/coupon) <a href="#!" class="link link-red underline">T&C</a>
					</li>
					<li>
						<span class="font-semibold">Freebie</span> Flat ₹1000 off on Cleartrip hotels booking
						along with 300 coins on booking <a href="#!" class="link link-red underline">T&C</a>
					</li>

					<!-- Additional items that are conditionally shown based on the showMore variable -->
					{#if showMore}
						<li>
							<span class="font-semibold">Bank Offer</span> Additional Bank Offer details
							<a href="#!" class="link link-red underline">T&C</a>
						</li>
						<li>
							<span class="font-semibold">Special Price</span> Additional Special Price details
							<a href="#!" class="link link-red underline">T&C</a>
						</li>
						<li>
							<span class="font-semibold">Freebie</span> Additional Freebie details
							<a href="#!" class="link link-red underline">T&C</a>
						</li>
					{/if}
				</ul>

				<!-- Show More/Show Less link -->
				<a
					href="#!"
					class="link link-red mt-3 inline-block"
					on:click={() => (showMore = !showMore)}
				>
					<span>{showMore ? 'Show Less' : 'Show More'}</span>
					<i
						class={`ri inline-block size-4 ${showMore ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}
					></i>
				</a>
			</div>

			<h6 class="mb-1">Product Overview</h6>
			<p class="dark:text-dark-500 mb-4 text-gray-500">
				We work with monitoring programmes to ensure compliance with our social, environmental and
				health and safety standards for our products. To assess compliance, we have developed a
				programme of audits and continuous improvement plans.
			</p>

			<div>
				<table class="table-sm flush table">
					<tbody>
						<tr>
							<th class="!border-0">Neck</th>
							<td>U Neck</td>
						</tr>
						<tr>
							<th class="!border-0">Sleeve Style</th>
							<td>Sleeveless</td>
						</tr>
						<tr>
							<th class="!border-0">Sleeve Length</th>
							<td>Sleeveless</td>
						</tr>
						<tr>
							<th class="!border-0">Fit</th>
							<td>Regular</td>
						</tr>
						<tr>
							<th class="!border-0">Fabric</th>
							<td>Cotton Blend</td>
						</tr>
						<tr>
							<th class="!border-0">Type</th>
							<td>Cami Top</td>
						</tr>
						<tr>
							<th class="!border-0">Pattern</th>
							<td>Self Design</td>
						</tr>

						{#if showMore}
							<tr>
								<th class="!border-0">Color</th>
								<td>White</td>
							</tr>
							<tr>
								<th class="!border-0">Pack of</th>
								<td>1</td>
							</tr>
							<tr>
								<th class="!border-0">Fabric Care</th>
								<td>hand wash only</td>
							</tr>
							<tr>
								<th class="!border-0">Length</th>
								<td>Crop</td>
							</tr>
							<tr>
								<th class="!border-0">Net Quantity</th>
								<td>1</td>
							</tr>
						{/if}
					</tbody>
				</table>

				<!-- Show More/Show Less link -->
				<a
					href="#!"
					class="link link-red mt-3 inline-block"
					on:click={() => (showMore = !showMore)}
				>
					<span>{showMore ? 'Show Less' : 'Show More'}</span>
					<i
						class={`ri inline-block size-4 ${showMore ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}
					></i>
				</a>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<div class="flex flex-wrap items-center gap-5">
				<CardTitle class="grow">Ratings & Reviews</CardTitle>
				<div class="shrink-0">
					<ModalTrigger
						modalId="addReviewModal"
						color="primary"
						icon="Plus"
						text="New Review"
						class="btn"
					/>
				</div>
			</div>
		</CardHeader>
		<CardBody>
			<div class="overflow-x-auto">
				<table class="flush table whitespace-nowrap">
					<tbody>
						{#each displayedReviews as review, index}
							<tr>
								<td class="align-top">
									<div class="flex items-center gap-3">
										<img src={review.image} alt="" class="size-16 shrink-0 rounded-md" />
										<div class="grow overflow-hidden">
											<h6 class="mb-1 truncate">
												<a href="#!" class="link link-primary text-current">{review.userName}</a>
											</h6>
											<p class="mb-1 truncate text-sm">{review.date}</p>
											<p class="dark:text-dark-500 truncate text-sm text-gray-500">
												Location: {review.location}
											</p>
										</div>
									</div>
								</td>
								<td>
									<div class="max-w-[550px]">
										<div class="mb-3 flex items-center gap-2">
											<div class="text-yellow-500">
												{#each Array(5) as _, i}
													<i class={getStarClass(Number(review.star), i + 1)}></i>
												{/each}
											</div>
											<h6>({review.star})</h6>
										</div>
										<h6>{review.title}</h6>
										<p class="dark:text-dark-500 whitespace-normal text-gray-500">
											{review.content}
										</p>
									</div>
								</td>
								<td class="align-top">
									<Dropdown class="dropdown">
										<DropdownButton
											type="button"
											class="dark:text-dark-500 flex items-center text-gray-500"
										>
											<i class="ri-more-2-fill"></i>
										</DropdownButton>
										<DropdownMenu class="dropdown-menu !fixed hidden p-2">
											<a href="#!" class="dropdown-item">
												<i class="ri-pencil-line align-middle ltr:mr-2 rtl:ml-2"></i> Edit
											</a>
											<!-- <a href="#!" class="dropdown-item">
                        <i class="align-middle ltr:mr-2 rtl:ml-2 ri-delete-bin-line"></i> Delete
                      </a> -->
											<ModalTrigger
												modalId="delete-file-modal"
												color=""
												icon="Trash2"
												text="Delete"
												class="dropdown-item justify-start"
											/>
										</DropdownMenu>
									</Dropdown>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<div class="my-5 grid grid-cols-12 gap-5">
				<div class="col-span-12 sm:col-span-6">
					<p class="dark:text-dark-500 text-gray-500">
						Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{reviews.length}</b> Results
					</p>
				</div>
				<div class="col-span-12 sm:col-span-6">
					<div class="pagination pagination-primary flex sm:!justify-end">
						<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
							<LucideIcon name="ChevronLeft" class="mr-1 size-5 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronRight" class="ml-1 size-5 ltr:hidden rtl:inline-block" />
							Prev
						</button>

						{#each Array(totalPages) as _, i}
							<button
								on:click={() => gotoPage(i + 1)}
								class="pagination-item"
								class:active={currentPage === i + 1}
							>
								<span>{i + 1}</span>
							</button>
						{/each}

						<button
							on:click={nextPage}
							disabled={currentPage === totalPages}
							class="pagination-next"
						>
							Next
							<LucideIcon name="ChevronRight" class="ml-1 size-5 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronLeft" class="mr-1 size-5 ltr:hidden rtl:inline-block" />
						</button>
					</div>
				</div>
			</div>
		</CardBody>
	</Card>
</Col>

<Col cols={{ span: 12 }} lg={{ span: 4 }}>
	<div class="sticky top-24 mb-5">
		<Card>
			<CardBody>
				<!-- Swiper -->
				<div class="dark:bg-dark-850 bg-gray-100">
					<div class="swiper previewImages" bind:this={swiperContainer} dir="ltr">
						<div class="swiper-wrapper">
							<div class="swiper-slide">
								<img src="assets/images/products/img-25.png" alt="" />
							</div>
							<div class="swiper-slide">
								<img src="assets/images/products/img-26.png" alt="" />
							</div>
							<div class="swiper-slide">
								<img src="assets/images/products/img-27.png" alt="" />
							</div>
							<div class="swiper-slide">
								<img src="assets/images/products/img-28.png" alt="" />
							</div>
							<div class="swiper-slide">
								<img src="assets/images/products/img-29.png" alt="" />
							</div>
							<div class="swiper-slide">
								<img src="assets/images/products/img-30.png" alt="" />
							</div>
						</div>
						<div
							class="swiper-button-next dark:after:bg-dark-900 after:align-center size-10 after:flex after:size-10 after:justify-center after:rounded-full after:bg-white after:!font-['remixicon'] after:text-4xl after:!content-['\ea6e']"
						></div>
						<div
							class="swiper-button-prev dark:after:bg-dark-900 after:align-center size-10 after:flex after:size-10 after:justify-center after:rounded-full after:bg-white after:!font-['remixicon'] after:text-4xl after:!content-['\ea64']"
						></div>
						<div class="swiper-pagination"></div>
					</div>
				</div>
			</CardBody>
		</Card>

		<Card>
			<div class="card-body flex flex-wrap items-center gap-3">
				<div
					class="dark:border-dark-800 flex size-14 shrink-0 items-center justify-center rounded-full border border-gray-200"
				>
					<LucideIcon name="Store" class="fill-sky-500/10 text-sky-500" />
				</div>
				<div class="grow">
					<h6 class="mb-1">
						<a href="#!"
							><span class="align-middle">SRBThemes Infotech LLP</span>
							<LucideIcon
								name="BadgeCheck"
								class="ml-1 inline-block size-4 fill-sky-500/10 text-sky-500"
							/>
						</a>
					</h6>
					<p><i class="ri-star-half-line align-bottom text-yellow-500"></i> 4.8</p>
				</div>
				<button class="btn btn-purple shrink-0">View Store</button>
			</div>
		</Card>
		<div class="mb-5 flex items-center gap-3">
			<h6 class="grow">Recent Product</h6>
			<a href="/apps-ecommerce-products-list" class="link link-primary">View All</a>
		</div>

		<Card>
			<CardBody>
				<div class="dark:bg-dark-850 relative bg-gray-100 p-5">
					<a
						href="#!"
						aria-label="Wishlist"
						class="link link-red absolute top-5 z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-white ltr:right-5 rtl:left-5"
						><i class="ri-heart-line text-lg"></i></a
					>
					<div class="swiper productSlider" bind:this={sliderEl} dir="ltr">
						<div class="swiper-wrapper">
							<div class="swiper-slide">
								<img src="assets/images/products/img-06.png" alt="" class="mx-auto w-3/4" />
							</div>
							<div class="swiper-slide">
								<img src="assets/images/products/img-04.png" alt="" class="mx-auto w-3/4" />
							</div>
							<div class="swiper-slide">
								<img src="assets/images/products/img-05.png" alt="" class="mx-auto w-3/4" />
							</div>
						</div>
						<div class="swiper-pagination"></div>
					</div>
				</div>
				<div class="mt-5">
					<h5 class="mb-2">$36.87</h5>
					<h6 class="mb-1">
						<a href="#!" class="link link-primary !text-current">Bra Lace Crop top</a>
					</h6>
					<p class="dark:text-dark-500 text-gray-500">Fashion</p>

					<div class="flex flex-wrap items-center gap-2">
						<!-- Color Options -->
						<div class="mt-3 flex grow items-center gap-2">
							<a
								href="#!"
								class="bg-primary-500 group/item flex size-5 items-center justify-center rounded text-white"
								class:active={activeLink === 'primary'}
								on:click={(e) => {
									e.preventDefault();
									activeLink = 'primary';
								}}
							>
								<LucideIcon name="Check" class="hidden size-4 group-[&.active]/item:block" />
							</a>
							<a
								href="#!"
								class="group/item flex size-5 items-center justify-center rounded bg-pink-500 text-white"
								class:active={activeLink === 'pink'}
								on:click={(e) => {
									e.preventDefault();
									activeLink = 'pink';
								}}
							>
								<LucideIcon name="Check" class="hidden size-4 group-[&.active]/item:block" />
							</a>
							<a
								href="#!"
								class="group/item flex size-5 items-center justify-center rounded bg-green-500 text-white"
								class:active={activeLink === 'green'}
								on:click={(e) => {
									e.preventDefault();
									activeLink = 'green';
								}}
							>
								<LucideIcon name="Check" class="hidden size-4 group-[&.active]/item:block" />
							</a>
							<a
								href="#!"
								class="group/item flex size-5 items-center justify-center rounded bg-red-500 text-white"
								class:active={activeLink === 'red'}
								on:click={(e) => {
									e.preventDefault();
									activeLink = 'red';
								}}
							>
								<LucideIcon name="Check" class="hidden size-4 group-[&.active]/item:block" />
							</a>
						</div>

						<!-- Size Options -->
						<div class="mt-3 flex shrink-0 items-center gap-2 font-medium">
							{#each [...sizes].reverse() as size}
								<a
									href="#!"
									class={activeSize === size
										? 'text-green-500'
										: 'dark:text-dark-500 text-gray-500'}
									on:click|preventDefault={() => (activeSize = size)}
								>
									{size.toUpperCase()}
								</a>
							{/each}
						</div>
					</div>

					<div class="mt-4 flex gap-2">
						<a href="/apps-ecommerce-shop-cart" class="btn btn-primary w-full">Buy Now</a>
						<a href="#!" class="btn btn-sub-gray btn-icon shrink-0">
							<LucideIcon name="ShoppingBasket" class="size-5" />
						</a>
					</div>
				</div>
			</CardBody>
		</Card>
	</div>
</Col>

<Modal modalId="addReviewModal" let:modalId>
	<ModalHeader {modalId}>
		<h6>Add Review</h6>
	</ModalHeader>
	<ModalBody>
		<form>
			<div class="grid grid-cols-12 gap-5">
				<div class="col-span-12">
					<div class="flex flex-col justify-center gap-5">
						<h6 class="text-center">Your Rating?</h6>
						<div class="relative flex justify-center gap-3">
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-mouse-events-have-key-events -->
							{#each [1, 2, 3, 4, 5] as i}
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<div
									class="flex h-2 w-10 cursor-pointer justify-center rounded-md transition-all duration-200"
									class:bg-yellow-500={reviewForm.star >= i}
									class:bg-gray-200={reviewForm.star < i}
									class:dark:bg-dark-800={reviewForm.star < i}
									on:click={() => (reviewForm.star = i)}
									on:mouseover={() => (hovering = i)}
									on:mouseleave={() => (hovering = 0)}
								>
									<p
										class="pointer-events-none mt-4 text-2xl select-none"
										class:invisible={reviewForm.star !== i && hovering !== i}
									>
										{i === 1 ? '😒' : i === 2 ? '🤨' : i === 3 ? '🫡' : i === 4 ? '😚' : '🥰'}
									</p>
								</div>
							{/each}
						</div>
						<div class="mt-5">
							<label for="rating" class="form-label">Rating Input:</label>
							<input
								id="rating"
								type="number"
								min="1"
								max="5"
								bind:value={reviewForm.star}
								class="form-input"
								readonly
								on:input={() =>
									validateField('star', reviewForm.star, 'Rating must be between 1 and 5.')}
							/>
							{#if errors.star}
								<span class="text-sm text-red-500">{errors.star}</span>
							{/if}
						</div>
					</div>
				</div>

				<div class="col-span-6">
					<label for="userNameInput" class="form-label">User Name</label>
					<input
						type="text"
						id="userNameInput"
						class="form-input"
						placeholder="User name"
						bind:value={reviewForm.userName}
						on:input={() =>
							validateField('userName', reviewForm.userName, 'User name is required.')}
					/>
					{#if errors.userName}
						<span class="text-sm text-red-500">{errors.userName}</span>
					{/if}
				</div>

				<div class="col-span-6">
					<label for="createDateInput" class="form-label">Create Date</label>
					<input
						type="text"
						id="createDateInput"
						class="form-input"
						placeholder="DD-MM-YYYY"
						bind:value={reviewForm.date}
						on:input={() => validateField('date', reviewForm.date, 'Date is required.')}
					/>
					{#if errors.date}
						<span class="text-sm text-red-500">{errors.date}</span>
					{/if}
				</div>

				<div class="col-span-12">
					<label for="locationInput" class="form-label">Location</label>
					<input
						type="text"
						id="locationInput"
						class="form-input"
						placeholder="Location"
						bind:value={reviewForm.location}
						on:input={() => validateField('location', reviewForm.location, 'Location is required.')}
					/>
					{#if errors.location}
						<span class="text-sm text-red-500">{errors.location}</span>
					{/if}
				</div>

				<div class="col-span-12">
					<label for="titleInput" class="form-label">Title</label>
					<input
						type="text"
						id="titleInput"
						class="form-input"
						placeholder="Review title"
						bind:value={reviewForm.title}
						on:input={() => validateField('title', reviewForm.title, 'Title is required.')}
					/>
					{#if errors.title}
						<span class="text-sm text-red-500">{errors.title}</span>
					{/if}
				</div>

				<div class="col-span-12">
					<label for="writeReviewInput" class="form-label">Write your Content</label>
					<textarea
						id="writeReviewInput"
						rows="3"
						class="form-input h-auto"
						bind:value={reviewForm.content}
						placeholder="Enter your description"
						on:change={() => validateField('content', reviewForm.content, 'Content is required.')}
					></textarea>
					{#if errors.content}
						<span class="text-sm text-red-500">{errors.content}</span>
					{/if}
				</div>
			</div>

			<div class="mt-5 flex justify-end gap-2">
				<button type="button" class="btn btn-active-red" on:click={() => console.log('Cancel')}>
					Cancel
				</button>
				<button type="button" class="btn btn-primary" on:click={addReview}>
					{reviewForm.star ? 'Add review' : 'Update review'}
				</button>
			</div>
		</form>
	</ModalBody>
</Modal>

<DeleteComponent />
