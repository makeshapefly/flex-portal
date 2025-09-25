<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { writable } from 'svelte/store';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Swiper from 'swiper';
	import 'swiper/css';
	import 'swiper/css/pagination';
	import { resultData, blogPosts } from './school-list';

	//chart
	import { options as gradiantChart } from './gradiant-chart';
	import { options as dumbbelChart } from './dumbbel-chart';
	import Grid from '$lib/components/ui/grid/Grid.svelte';

	let displayedEmails = resultData;
	let currentPage = 1;
	let itemsPerPage = 5;

	// Pagination helpers
	$: totalPages = Math.ceil(resultData.length / itemsPerPage);
	$: showingStart = (currentPage - 1) * itemsPerPage + 1;
	$: showingEnd = Math.min(currentPage * itemsPerPage, resultData.length);

	// Function to handle page change
	const prevPage = () => {
		if (currentPage > 1) currentPage--;
	};

	const nextPage = () => {
		if (currentPage < totalPages) currentPage++;
	};

	const gotoPage = (page: number) => {
		currentPage = page;
	};

	// Slicing the displayed emails based on the current page
	$: displayedEmails = resultData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	let today: number;
	let monthName: string;
	let year: number;
	let daysInMonth: number;
	let scrollableDiv: HTMLElement | null = null;
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const date = new Date();
	today = date.getDate();
	monthName = monthNames[date.getMonth()];
	year = date.getFullYear();
	daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();

	let swiper: Swiper;

	// Initialize Swiper once the component mounts
	onMount(() => {
		swiper = new Swiper('.mySwiper', {
			spaceBetween: 24,
			grabCursor: true,
			slidesPerView: 1,
			loop: true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			}
		});
	});

	let counter1 = 1478;
	let counter2 = 120;
	let counter3 = 65;
	let counter4 = 487;
	let counter5 = 30;
	let duration = 2000;

	const animated1 = tweened(0, { duration: duration, easing: cubicOut });
	const animated2 = tweened(0, { duration: duration, easing: cubicOut });
	const animated3 = tweened(0, { duration: duration, easing: cubicOut });
	const animated4 = tweened(0, { duration: duration, easing: cubicOut });
	const animated5 = tweened(0, { duration: duration, easing: cubicOut });
	onMount(() => {
		animated1.set(counter1);
		animated2.set(counter2);
		animated3.set(counter3);
		animated4.set(counter4);
		animated5.set(counter5);
	});
</script>

<Col cols={{ span: 12 }} md={{ span: 4 }} class="card relative order-1 2xl:col-span-2">
	<CardBody>
		<div class="mb-7 flex items-center gap-2">
			<div
				class="bg-primary-500 text-primary-50 flex size-7 items-center justify-center rounded-md"
			>
				<LucideIcon name="GraduationCap" class="size-5" />
			</div>
			<p class="dark:text-dark-500 text-gray-500">Total Students</p>
		</div>
		<h5
			class="before:border-primary-500 relative mb-2 inline-block before:absolute before:inset-x-0 before:-bottom-1 before:border-b-2"
		>
			<span>{Math.floor($animated1)}</span>
		</h5>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 4 }} class="card relative order-2 2xl:col-span-2">
	<CardBody>
		<div class="mb-7 flex items-center gap-2">
			<div class="flex size-7 items-center justify-center rounded-md bg-orange-500 text-orange-50">
				<LucideIcon name="UserRound" class="size-5" />
			</div>
			<p class="dark:text-dark-500 text-gray-500">Total Teachers</p>
		</div>
		<h5
			class="relative mb-2 inline-block before:absolute before:inset-x-0 before:-bottom-1 before:border-b-2 before:border-orange-500"
		>
			<span>{Math.floor($animated2)}</span>
		</h5>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 4 }} class="card relative order-3 2xl:col-span-2">
	<CardBody>
		<div class="mb-7 flex items-center gap-2">
			<div class="flex size-7 items-center justify-center rounded-md bg-sky-500 text-sky-50">
				<LucideIcon name="BookOpen" class="size-5" />
			</div>
			<p class="dark:text-dark-500 text-gray-500">Total Courses</p>
		</div>
		<h5
			class="relative mb-2 inline-block before:absolute before:inset-x-0 before:-bottom-1 before:border-b-2 before:border-sky-500"
		>
			<span>{Math.floor($animated2)}</span>
		</h5>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card relative order-7 2xl:order-4 2xl:col-span-3 2xl:row-span-2">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Course Activities</CardTitle>
		<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
			<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
				<LucideIcon name="Ellipsis" class="size-5" />
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden p-2">
				<a href="/apps-event-overview" class="dropdown-item">
					<span>Weekly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Monthly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Yearly</span>
				</a>
			</DropdownMenu>
		</Dropdown>
	</CardHeader>
	<CardBody>
		<div dir="ltr">
			<ApexChart
				class="!min-h-full"
				darkColors={['bg-dark-850', 'bg-primary-500']}
				colors={['bg-gray-200', 'bg-primary-500']}
				options={gradiantChart}
			/>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card order-8 2xl:order-5 2xl:col-span-3 2xl:row-span-4">
	<CardBody>
		<div class="mb-5">
			<div>
				<h6 class="mb-3">
					{monthName}, {year}
				</h6>
				<Simplebar id="horizontalScroll">
					<div class="flex items-center gap-2">
						{#each Array(daysInMonth) as _, day}
							<a
								href="#!"
								class="dark:bg-dark-850 flex size-12 shrink-0 items-center justify-center rounded-md bg-gray-100 text-lg font-medium
                      {day + 1 === today
									? 'bg-primary-500 text-primary-50 border-primary-500 active'
									: ''}"
							>
								{day + 1}
							</a>
						{/each}
					</div>
				</Simplebar>
			</div>
		</div>

		<div class="mb-4 flex items-center gap-3">
			<h6 class="grow">Holiday Lists</h6>
			<a href="#!" class="text-13 link link-primary text-primary-500 shrink-0"
				>View More <LucideIcon name="MoveRight" class="inline-block size-4" /></a
			>
		</div>

		<div class="swiper mySwiper" dir="ltr">
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<div class="card relative">
						<div class="card-body flex items-center gap-3">
							<div class="grow">
								<h6 class="mb-1">
									<LucideIcon
										name="CircleDot"
										class="inline-block size-4 fill-green-500/15 text-green-500 ltr:mr-1 rtl:ml-1"
									/> World Braille Day
								</h6>
								<p class="dark:text-dark-500 text-13 text-gray-500">04 Jan, 2024</p>
							</div>
							<img src="/assets/images/school/holiday.png" alt="" class="size-10 shrink-0" />
						</div>
					</div>
				</div>
				<div class="swiper-slide">
					<div class="card relative">
						<div class="card-body flex items-center gap-3">
							<div class="grow">
								<h6 class="mb-1">
									<LucideIcon
										name="CircleDot"
										class="inline-block size-4 fill-green-500/15 text-green-500 ltr:mr-1 rtl:ml-1"
									/> Earth Hour
								</h6>
								<p class="dark:text-dark-500 text-13 text-gray-500">23 March 2024</p>
							</div>
							<img src="/assets/images/school/holiday.png" alt="" class="size-10 shrink-0" />
						</div>
					</div>
				</div>
				<div class="swiper-slide">
					<div class="card relative">
						<div class="card-body flex items-center gap-3">
							<div class="grow">
								<h6 class="mb-1">
									<LucideIcon
										name="CircleDot"
										class="inline-block size-4 fill-green-500/15 text-green-500 ltr:mr-1 rtl:ml-1"
									/> Software Freedom Day
								</h6>
								<p class="dark:text-dark-500 text-13 text-gray-500">15 Sep 2024</p>
							</div>
							<img src="/assets/images/school/holiday.png" alt="" class="size-10 shrink-0" />
						</div>
					</div>
				</div>
				<div class="swiper-slide">
					<div class="card relative">
						<div class="card-body flex items-center gap-3">
							<div class="grow">
								<h6 class="mb-1">
									<LucideIcon
										name="CircleDot"
										class="inline-block size-4 fill-green-500/15 text-green-500 ltr:mr-1 rtl:ml-1"
									/> Inventors Day
								</h6>
								<p class="dark:text-dark-500 text-13 text-gray-500">29 Sep 2024</p>
							</div>
							<img src="/assets/images/school/holiday.png" alt="" class="size-10 shrink-0" />
						</div>
					</div>
				</div>
				<div class="swiper-slide">
					<div class="card relative">
						<div class="card-body flex items-center gap-3">
							<div class="grow">
								<h6 class="mb-1">
									<LucideIcon
										name="CircleDot"
										class="inline-block size-4 fill-green-500/15 text-green-500 ltr:mr-1 rtl:ml-1"
									/> World Teacher's Day
								</h6>
								<p class="dark:text-dark-500 text-13 text-gray-500">05 Oct 2024</p>
							</div>
							<img src="/assets/images/school/holiday.png" alt="" class="size-10 shrink-0" />
						</div>
					</div>
				</div>
				<div class="swiper-slide">
					<div class="card relative">
						<div class="card-body flex items-center gap-3">
							<div class="grow">
								<h6 class="mb-1">
									<LucideIcon
										name="CircleDot"
										class="inline-block size-4 fill-green-500/15 text-green-500 ltr:mr-1 rtl:ml-1"
									/> Human Rights Day
								</h6>
								<p class="dark:text-dark-500 text-13 text-gray-500">10 Dec 2024</p>
							</div>
							<img src="/assets/images/school/holiday.png" alt="" class="size-10 shrink-0" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="relative">
			<h6 class="mb-4">Notice Board</h6>
			<div class="flex flex-col gap-5">
				{#each blogPosts as blog}
					<div class="flex items-center gap-3">
						<img src={blog.img} alt="" class="h-20 w-16 rounded-md object-cover" />
						<div>
							<h6 class="mb-2 line-clamp-2">
								<a
									href="#!"
									class="dark:hover:text-primary-500 link link-primary !text-current dark:!text-current"
								>
									{blog.title}
								</a>
							</h6>
							<p class="dark:text-dark-500 text-gray-500">By {blog.author}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 4 }} class="card relative order-4 2xl:order-6 2xl:col-span-2">
	<CardBody>
		<div class="mb-7 flex items-center gap-2">
			<div class="flex size-7 items-center justify-center rounded-md bg-yellow-500 text-yellow-50">
				<LucideIcon name="Computer" class="size-5" />
			</div>
			<p class="dark:text-dark-500 text-gray-500">Class Rooms</p>
		</div>
		<h5
			class="relative mb-2 inline-block before:absolute before:inset-x-0 before:-bottom-1 before:border-b-2 before:border-yellow-500"
		>
			<span>{Math.floor($animated3)}</span>
		</h5>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 4 }} class="card relative order-5 2xl:order-7 2xl:col-span-2">
	<CardBody>
		<div class="mb-7 flex items-center gap-2">
			<div class="flex size-7 items-center justify-center rounded-md bg-pink-500 text-pink-50">
				<LucideIcon name="HandCoins" class="size-5" />
			</div>
			<p class="dark:text-dark-500 text-gray-500">Total Earnings</p>
		</div>
		<h5
			class="relative mb-2 inline-block before:absolute before:inset-x-0 before:-bottom-1 before:border-b-2 before:border-pink-500"
		>
			$<span>{Math.floor($animated4)}</span>M
		</h5>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 4 }} class="card relative order-5 2xl:order-7 2xl:col-span-2">
	<CardBody>
		<div class="mb-7 flex items-center gap-2">
			<div class="flex size-7 items-center justify-center rounded-md bg-purple-500 text-purple-50">
				<LucideIcon name="Medal" class="size-5" />
			</div>
			<p class="dark:text-dark-500 text-gray-500">Awards</p>
		</div>
		<h5
			class="relative mb-2 inline-block before:absolute before:inset-x-0 before:-bottom-1 before:border-b-2 before:border-purple-500"
		>
			<span>{Math.floor($animated5)}</span>+
		</h5>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} class="card order-9 md:col-span-6">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Total Students</CardTitle>
		<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
			<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
				<LucideIcon name="Ellipsis" class="size-5" />
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden p-2">
				<a href="#!" class="dropdown-item">
					<span>Weekly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Monthly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Yearly</span>
				</a>
			</DropdownMenu>
		</Dropdown>
	</CardHeader>
	<CardBody>
		<div dir="ltr">
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-red-500' ]}
				options={dumbbelChart}
			/>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} class="card order-10 2xl:col-span-3">
	<CardHeader>
		<CardTitle>Upcoming Test</CardTitle>
	</CardHeader>
	<CardBody class="space-y-3">
		<div class="flex items-center gap-3">
			<div class="flex size-12 items-center justify-center rounded-md bg-orange-500/15">
				<img src="/assets/images/school/computer.png" loading="lazy" alt="" class="h-6" />
			</div>
			<div class="grow">
				<h6 class="mb-1"><a href="#!">Basic Computer</a></h6>
				<p class="dark:text-dark-500 text-gray-500">Class 9</p>
			</div>
			<p class="shrink-0 text-red-500">26 Dec</p>
		</div>
		<div class="flex items-center gap-3">
			<div class="flex size-12 items-center justify-center rounded-md bg-red-500/15">
				<img src="/assets/images/school/chemical.png" loading="lazy" alt="" class="h-6" />
			</div>
			<div class="grow">
				<h6 class="mb-1"><a href="#!">Science Part 2 Test</a></h6>
				<p class="dark:text-dark-500 text-gray-500">Class 11</p>
			</div>
			<p class="shrink-0 text-red-500">21 Dec</p>
		</div>
		<div class="flex items-center gap-3">
			<div class="flex size-12 items-center justify-center rounded-md bg-red-500/15">
				<img src="/assets/images/school/dictionary.png" loading="lazy" alt="" class="h-6" />
			</div>
			<div class="grow">
				<h6 class="mb-1"><a href="#!">English Grammar</a></h6>
				<p class="dark:text-dark-500 text-gray-500">Class 12</p>
			</div>
			<p class="shrink-0 text-red-500">15 Dec</p>
		</div>
		<div class="flex items-center gap-3">
			<div class="bg-primary-500/15 flex size-12 items-center justify-center rounded-md">
				<img src="/assets/images/school/chemical.png" loading="lazy" alt="" class="h-6" />
			</div>
			<div class="grow">
				<h6 class="mb-1"><a href="#!">Science Part 1 Test</a></h6>
				<p class="dark:text-dark-500 text-gray-500">Class 11</p>
			</div>
			<p class="shrink-0 text-red-500">03 Dec</p>
		</div>
		<div class="flex items-center gap-3">
			<div class="flex size-12 items-center justify-center rounded-md bg-purple-500/15">
				<img src="/assets/images/school/change-management.png" loading="lazy" alt="" class="h-6" />
			</div>
			<div class="grow">
				<h6 class="mb-1"><a href="#!">Management</a></h6>
				<p class="dark:text-dark-500 text-gray-500">Class 12</p>
			</div>
			<p class="shrink-0 text-red-500">24 Nov</p>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card order-11 2xl:col-span-9">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Top Score</CardTitle>
		<div class="shrink-0">
			<a href="#!" class="btn btn-primary px-2.5 py-1">
				View All
				<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
			</a>
		</div>
	</CardHeader>
	<CardBody class="pt-0">
		<div class="table-box overflow-x-auto">
			<table class="flush table whitespace-nowrap">
				<tbody>
					{#each displayedEmails as email, index (email.studentsName)}
						<tr>
							<td>{email.studentsName}</td>
							<td>
								<span>{email.marks}</span>/600
							</td>
							<td>{email.resultDate}</td>
							<td>{email.grade}</td>
							<td>
								<span
									class={email.passFail === 'Pass' ? 'badge badge-green' : 'badge badge-orange'}
								>
									{email.passFail}
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="gap-space mt-space grid grid-cols-12 items-center">
			<div class="col-span-12 text-center md:col-span-6 ltr:md:text-left rtl:md:text-right">
				<p class="dark:text-dark-500 text-gray-500">
					Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{resultData.length}</b> Results
				</p>
			</div>
			<div class="col-span-12 md:col-span-6">
				<div class="pagination pagination-primary flex justify-center md:justify-end">
					<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
						<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />Prev
					</button>

					{#each Array(totalPages) as _, index}
						<button
							on:click={() => gotoPage(index + 1)}
							class="pagination-item {currentPage === index + 1 ? 'active' : ''}"
						>
							<span>{index + 1}</span>
						</button>
					{/each}

					<button on:click={nextPage} disabled={currentPage === totalPages} class="pagination-next">
						Next<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
					</button>
				</div>
			</div>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 8 }} class="card order-12 2xl:col-span-9">
	<CardHeader>
		<CardTitle
			>Continue Watching <LucideIcon
				name="MoveRight"
				class="ml-1 size-4 ltr:inline-block rtl:hidden"
			/></CardTitle
		>
	</CardHeader>
	<CardBody>
		<Grid cols={12} gap="space">
			<Col cols={{ span: 12 }} lg={{ span: 4 }}>
				<div class="aspect-video">
					<iframe
						class="aspect-video w-full rounded-md"
						src="https://www.youtube.com/embed/_x9lsSPW4rA?si=dldJWZYL7u6URBi5"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
					></iframe>
				</div>
				<div class="mt-3">
					<h6 class="mb-1 truncate">
						<a href="#!">Domiex - Admin & Dashboard Template Introduction</a>
					</h6>
					<p class="dark:text-dark-500 text-xs text-gray-500">Domiex Intro</p>
				</div>
			</Col>
			<Col cols={{ span: 12 }} lg={{ span: 4 }}>
				<div class="aspect-video">
					<iframe
						class="aspect-video w-full rounded-md"
						src="https://www.youtube.com/embed/mSC6GwizOag?si=Dqcl3RgGrfRyqmHo"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
					></iframe>
				</div>
				<div class="mt-3">
					<h6 class="mb-1 truncate"><a href="#!">What's new in Tailwind CSS v3.0?</a></h6>
					<p class="dark:text-dark-500 text-xs text-gray-500">TailwindCSS</p>
				</div>
			</Col>
			<Col cols={{ span: 12 }} lg={{ span: 4 }}>
				<div class="aspect-video">
					<iframe
						class="aspect-video w-full rounded-md"
						src="https://www.youtube.com/embed/RZ9cWr3tY9w?si=J6KavpQC6n9gaC64"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
					></iframe>
				</div>
				<div class="mt-3">
					<h6 class="mb-1 truncate">
						<a href="#!">Controlling Stacking Contexts with Isolation Utilities</a>
					</h6>
					<p class="dark:text-dark-500 text-xs text-gray-500">TailwindCSS</p>
				</div>
			</Col>
		</Grid>
	</CardBody>
</Col>

<Col
	cols={{ span: 12 }}
	xl={{ span: 4 }}
	class="dark:bg-dark-850 card order-13 bg-gray-100 text-center 2xl:col-span-3"
>
	<CardBody>
		<h5 class="mb-2">Join the community and find out more information</h5>
		<button type="button" class="btn btn-green">Explore Now</button>
		<div class="mt-5">
			<img src="/assets/images/dashboards/school.png" loading="lazy" alt="" class="mx-auto h-44" />
		</div>
	</CardBody>
</Col>
