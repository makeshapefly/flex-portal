<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Swiper from 'swiper';
	import 'swiper/css';
	import { Navigation } from 'swiper/modules';
	import 'swiper/css/navigation';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import { options as lectureChart } from './lecture-chart';

	let swiper: any;

	let exams = [
		{ subject: 'Vector Algebra (Mathematics)', date: '15 July, 2024' },
		{ subject: 'Biomolecules (Chemistry)', date: '20 August, 2024' },
		{ subject: 'Human Reproduction (Biology)', date: '10 September, 2024' }
	];

	let currentExamIndex = 0;
	let show = true;

	// Get the current exam based on the currentExamIndex
	$: currentExam = exams[currentExamIndex];

	// Function to switch to the next exam
	function nextExam() {
		show = false; // Hide content
		setTimeout(() => {
			currentExamIndex = (currentExamIndex + 1) % exams.length; // Loop through exams
			show = true; // Show content
		}, 500); // Match the timeout with transition duration
	}

	function circleProgress(initialPercent: any) {
		return {
			percent: initialPercent,
			circumference: 2 * Math.PI * 16,
			get progress() {
				return this.circumference - (this.percent / 100) * this.circumference;
			},
			animateProgress() {
				setTimeout(() => {
					this.percent = this.percent;
				}, 100);
			}
		};
	}

	let progress1 = circleProgress(32);
	let progress2 = circleProgress(52);
	let progress3 = circleProgress(10);
	let progress4 = circleProgress(95);

	onMount(() => {
		swiper = new Swiper('.mySwiper', {
			modules: [Navigation],
			loop: true,
			autoplay: {
				delay: 1500,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		});

		const interval = setInterval(() => {
			nextExam();
		}, 5000); // Change exam every 5 seconds

		// Clean up interval when the component is destroyed
		return () => clearInterval(interval);
	});
</script>

<Col cols={{ span: 12 }} class="xl:row-span-3 2xl:col-span-9">
	<Card>
		<CardBody>
			<div class="mb-5 gap-4 md:flex">
				<img src="/assets/images/avatar/user-4.png" alt="" class="size-32 shrink-0 rounded-md" />
				<div class="mt-5 grow md:mt-0">
					<h6 class="mb-1">Emily Davis</h6>
					<div class="item-center mb-4 flex flex-wrap gap-3">
						<p class="dark:text-dark-500 text-gray-500">
							<i class="ri-building-line"></i> <span class="align-bottom">Lecturer</span>
						</p>
						<p class="dark:text-dark-500 text-gray-500">
							<i class="ri-map-pin-line"></i> <span class="align-bottom">Argentina</span>
						</p>
						<p class="dark:text-dark-500 text-gray-500">
							<i class="ri-calendar-event-line"></i> <span class="align-bottom">12 Jul, 2024</span>
						</p>
					</div>
					<p class="dark:text-dark-500 mb-2 text-gray-500">
						<LucideIcon name="Phone" class="dark:fill-dark-850 inline-block size-4 fill-gray-100" />
						<span class="align-bottom">+1 712 25 1525</span>
					</p>
					<p class="dark:text-dark-500 mb-3 text-gray-500">
						<LucideIcon name="Mail" class="dark:fill-dark-850 inline-block size-4 fill-gray-100" />
						<span class="align-bottom">michael@gmail.com</span>
					</p>
				</div>
				<div class="absolute top-0 shrink-0 ltr:right-0 rtl:left-0">
					<a href="/apps-school-teachers-list" class="btn btn-sub-gray btn-icon"
						><LucideIcon name="Pencil" class="size-4" /></a
					>
				</div>
			</div>
			<div class="my-5 space-y-5">
				<Grid cols={12} gap={6}>
					<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 3 }}>
						<p class="dark:text-dark-500 mb-1 text-gray-500">Title</p>
						<h6><span class="badge badge-red">Lecturer</span></h6>
					</Col>
					<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 3 }}>
						<p class="dark:text-dark-500 mb-1 text-gray-500">Gender</p>
						<h6>Female</h6>
					</Col>
					<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 3 }}>
						<p class="dark:text-dark-500 mb-1 text-gray-500">Religion</p>
						<h6>Islam</h6>
					</Col>
					<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 3 }}>
						<p class="dark:text-dark-500 mb-1 text-gray-500">Father Occupation</p>
						<h6>Web Developer</h6>
					</Col>
					<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 3 }}>
						<p class="dark:text-dark-500 mb-1 text-gray-500">Joining Date</p>
						<h6>12 Jul 2024</h6>
					</Col>
					<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 3 }}>
						<p class="dark:text-dark-500 mb-1 text-gray-500">Salary</p>
						<h6>$52,000</h6>
					</Col>
					<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 3 }}>
						<p class="dark:text-dark-500 mb-1 text-gray-500">Experience</p>
						<h6>9 years</h6>
					</Col>
					<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 3 }}>
						<p class="dark:text-dark-500 mb-1 text-gray-500">Email</p>
						<h6>davis@example.com</h6>
					</Col>
					<Col cols={{ span: 12 }} xl={{ span: 6 }}>
						<div class="whitespace-normal">
							<p class="dark:text-dark-500 mb-1 text-gray-500">Address</p>
							<h6>1816 Angus Ave, Simi Valley, Argentina</h6>
						</div>
					</Col>
				</Grid>
			</div>
			<p class="dark:text-dark-500 mb-3 text-gray-500">
				As a dedicated and passionate lecturer, my objective is to create a dynamic and engaging
				learning environment that fosters intellectual growth and critical thinking. I aim to:
			</p>
			<ul class="list-circle list-inside space-y-2">
				<li class="dark:text-dark-500 text-gray-500">
					<strong>Deliver High-Quality Education:</strong> Provide students with comprehensive, up-to-date
					knowledge in my field of expertise through well-structured lectures, interactive discussions,
					and practical applications.
				</li>
				<li class="dark:text-dark-500 text-gray-500">
					<strong>Encourage Critical Thinking:</strong> Inspire students to think critically and independently,
					encouraging them to challenge ideas and explore diverse perspectives.
				</li>
			</ul>
		</CardBody>
	</Card>
</Col>

<Col cols={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 4 }} class="2xl:col-span-3">
	<Card>
		<CardBody>
			<h6 class="mb-6">My Achievements and Milestones</h6>
			<div class="swiper mySwiper group/swiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<div class="py-3 text-center">
							<div
								class="dark:ring-offset-dark-900 mx-auto flex size-28 items-center justify-center rounded-full bg-gradient-to-t from-yellow-500/10 p-2 ring-2 ring-yellow-500/10 ring-offset-2"
							>
								<img src="/assets/images/school/trophy.png" alt="" class="size-20" />
							</div>
							<h6 class="mt-6">Academic Excellence Awards</h6>
						</div>
					</div>
					<div class="swiper-slide">
						<div class="py-3 text-center">
							<div
								class="dark:ring-offset-dark-900 mx-auto flex size-28 items-center justify-center rounded-full bg-gradient-to-t from-green-500/10 p-2 ring-2 ring-green-500/10 ring-offset-2"
							>
								<img src="/assets/images/school/medal.png" alt="" class="size-20" />
							</div>
							<h6 class="mt-6">Special Recognition Awards</h6>
						</div>
					</div>
					<div class="swiper-slide">
						<div class="py-3 text-center">
							<div
								class="dark:ring-offset-dark-900 mx-auto flex size-28 items-center justify-center rounded-full bg-gradient-to-t from-yellow-500/10 p-2 ring-2 ring-yellow-500/10 ring-offset-2"
							>
								<img src="/assets/images/school/winner.png" alt="" class="size-20" />
							</div>
							<h6 class="mt-6">Arts and Sports Awards</h6>
						</div>
					</div>
				</div>
				<div
					class="swiper-button-next after:font-remix dark:after:text-dark-100 opacity-0 transition duration-300 ease-linear group-hover/swiper:opacity-100 after:text-2xl after:text-gray-800 after:content-['\ea6e']"
				></div>
				<div
					class="swiper-button-prev after:font-remix dark:after:text-dark-100 opacity-0 transition duration-300 ease-linear group-hover/swiper:opacity-100 after:text-2xl after:text-gray-800 after:content-['\ea64']"
				></div>
			</div>
		</CardBody>
	</Card>
</Col>

<Col cols={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 4 }} class="card 2xl:col-span-3">
	<CardBody>
		<div
			class="dark:text-dark-500 dark:bg-dark-850 mb-5 flex size-14 items-center justify-center rounded-md bg-gray-100 text-gray-500"
		>
			<LucideIcon name="GraduationCap" />
		</div>
		<h6 class="mb-1">Upcoming Test</h6>

		{#if show}
			<div transition:fade={{ duration: 500 }}>
				<p class="dark:text-dark-500 text-gray-500">
					Your <span class="font-semibold">{currentExam.subject}</span> Test will be on
					<span class="font-semibold">{currentExam.date}</span>
				</p>
			</div>
		{/if}

		<div class="mt-4 flex items-center gap-2">
			<button type="button" class="btn btn-sub-gray w-full">Learn More</button>
			<button type="button" class="btn btn-primary w-full" on:click={nextExam}>Next Exam</button>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 4 }} class="card 2xl:col-span-6">
	<CardHeader class="flex items-center gap-5">
		<CardTitle class="grow">Time Spend in Lecture</CardTitle>
		<Dropdown class="dropdown shrink-0">
			<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
				<LucideIcon name="Ellipsis" class="size-5" />
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed z-50 p-2">
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
		<ApexChart class="-ml-4 !min-h-full" colors={['bg-primary-400']} options={lectureChart} />
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card 2xl:col-span-3">
	<CardHeader>
		<CardTitle>Create Quiz</CardTitle>
	</CardHeader>
	<CardBody>
		<div class="flex flex-col gap-4">
			<!-- First Progress Circle -->
			<div class="flex items-center gap-3">
				<div class="relative size-12 shrink-0" dir="ltr">
					<svg
						class="size-full"
						width="36"
						height="36"
						viewBox="0 0 36 36"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="18"
							cy="18"
							r="16"
							fill="none"
							class="stroke-current text-sky-500/15"
							stroke-width="3"
						></circle>
						<g class="origin-center -rotate-90 transform">
							<circle
								cx="18"
								cy="18"
								r="16"
								fill="none"
								class="stroke-current text-sky-500"
								stroke-width="3"
								stroke-dasharray="100"
								style="stroke-dashoffset: {progress1.progress}px; transition: stroke-dashoffset 1s ease-out;"
							></circle>
						</g>
					</svg>
					<div class="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
						<span class="text-center text-xs font-bold text-gray-800 dark:text-white"
							>{progress1.percent}%</span
						>
					</div>
				</div>
				<div class="grow overflow-hidden">
					<h6 class="mb-1 truncate"><a href="#!">Trivia Time: Fun Facts and Figures</a></h6>
					<div class="flex items-center gap-3">
						<p class="dark:text-dark-500 grow text-gray-500">
							Expert: <i class="ri-star-s-fill text-yellow-500"></i>
							<i class="ri-star-s-fill text-yellow-500"></i>
							<i class="ri-star-s-fill text-yellow-500"></i>
						</p>
						<button type="button" class="btn btn-green text-11 px-2 py-1"
							><i class="ri-play-line"></i> Start</button
						>
					</div>
				</div>
			</div>

			<!-- Second Progress Circle -->
			<div class="flex items-center gap-3">
				<div class="relative size-12 shrink-0" dir="ltr">
					<svg
						class="size-full"
						width="36"
						height="36"
						viewBox="0 0 36 36"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="18"
							cy="18"
							r="16"
							fill="none"
							class="stroke-current text-sky-500/15"
							stroke-width="3"
						></circle>
						<g class="origin-center -rotate-90 transform">
							<circle
								cx="18"
								cy="18"
								r="16"
								fill="none"
								class="stroke-current text-sky-500"
								stroke-width="3"
								stroke-dasharray="100"
								style="stroke-dashoffset: {progress2.progress}px; transition: stroke-dashoffset 1s ease-out;"
							></circle>
						</g>
					</svg>
					<div class="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
						<span class="text-center text-xs font-bold text-gray-800 dark:text-white"
							>{progress2.percent}%</span
						>
					</div>
				</div>
				<div class="grow overflow-hidden">
					<h6 class="mb-1 truncate"><a href="#!">Chemistry Conundrums: Elemental Quiz</a></h6>
					<div class="flex items-center gap-3">
						<p class="dark:text-dark-500 grow text-gray-500">
							Expert: <i class="ri-star-s-fill text-yellow-500"></i> <i class="ri-star-s-fill"></i>
							<i class="ri-star-s-fill"></i>
						</p>
						<button type="button" class="btn btn-green text-11 px-2 py-1"
							><i class="ri-play-line"></i> Start</button
						>
					</div>
				</div>
			</div>

			<!-- Third Progress Circle -->
			<div class="flex items-center gap-3">
				<div class="relative size-12 shrink-0" dir="ltr">
					<svg
						class="size-full"
						width="36"
						height="36"
						viewBox="0 0 36 36"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="18"
							cy="18"
							r="16"
							fill="none"
							class="stroke-current text-sky-500/15"
							stroke-width="3"
						></circle>
						<g class="origin-center -rotate-90 transform">
							<circle
								cx="18"
								cy="18"
								r="16"
								fill="none"
								class="stroke-current text-sky-500"
								stroke-width="3"
								stroke-dasharray="100"
								style="stroke-dashoffset: {progress3.progress}px; transition: stroke-dashoffset 1s ease-out;"
							></circle>
						</g>
					</svg>
					<div class="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
						<span class="text-center text-xs font-bold text-gray-800 dark:text-white"
							>{progress3.percent}%</span
						>
					</div>
				</div>
				<div class="grow overflow-hidden">
					<h6 class="mb-1 truncate"><a href="#!">A Mathematics Challenge</a></h6>
					<div class="flex items-center gap-3">
						<p class="dark:text-dark-500 grow text-gray-500">
							Expert: <i class="ri-star-s-fill text-yellow-500"></i>
							<i class="ri-star-s-fill text-yellow-500"></i> <i class="ri-star-s-fill"></i>
						</p>
						<button type="button" class="btn btn-green text-11 px-2 py-1"
							><i class="ri-play-line"></i> Start</button
						>
					</div>
				</div>
			</div>

			<!-- Fourth Progress Circle -->
			<div class="flex items-center gap-3">
				<div class="relative size-12 shrink-0" dir="ltr">
					<svg
						class="size-full"
						width="36"
						height="36"
						viewBox="0 0 36 36"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="18"
							cy="18"
							r="16"
							fill="none"
							class="stroke-current text-sky-500/15"
							stroke-width="3"
						></circle>
						<g class="origin-center -rotate-90 transform">
							<circle
								cx="18"
								cy="18"
								r="16"
								fill="none"
								class="stroke-current text-sky-500"
								stroke-width="3"
								stroke-dasharray="100"
								style="stroke-dashoffset: {progress4.progress}px; transition: stroke-dashoffset 1s ease-out;"
							></circle>
						</g>
					</svg>
					<div class="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
						<span class="text-center text-xs font-bold text-gray-800 dark:text-white"
							>{progress4.percent}%</span
						>
					</div>
				</div>
				<div class="grow overflow-hidden">
					<h6 class="mb-1 truncate"><a href="#!">The Digital World Quiz</a></h6>
					<div class="flex items-center gap-3">
						<p class="dark:text-dark-500 grow text-gray-500">
							Expert: <i class="ri-star-s-fill text-yellow-500"></i>
							<i class="ri-star-s-fill text-yellow-500"></i>
							<i class="ri-star-s-fill text-yellow-500"></i>
						</p>
						<button type="button" class="btn btn-green text-11 px-2 py-1"
							><i class="ri-play-line"></i> Start</button
						>
					</div>
				</div>
			</div>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card 2xl:col-span-3">
	<CardHeader>
		<CardTitle>Upcoming Lecture</CardTitle>
	</CardHeader>
	<CardBody>
		<div class="space-y-3">
			<div class="item-center flex gap-3">
				<div
					class="flex size-10 shrink-0 items-center justify-center rounded-md bg-sky-500/15 text-sky-500"
				>
					<LucideIcon name="FlaskConical" class="size-5" />
				</div>
				<div class="grow">
					<h6>12 (A)</h6>
					<p class="dark:text-dark-500 text-sm text-gray-500">09:00AM - 10:15AM</p>
				</div>
				<div class="shrink-0">
					<a href="#!" class="btn btn-red btn-xs"><i class="ri-eye-line"></i> Live</a>
				</div>
			</div>
			<div class="item-center flex gap-3">
				<div
					class="flex size-10 shrink-0 items-center justify-center rounded-md bg-purple-500/10 text-purple-500"
				>
					<LucideIcon name="Scale" class="size-5" />
				</div>
				<div class="grow">
					<h6>11</h6>
					<p class="dark:text-dark-500 text-sm text-gray-500">10:15AM - 11:30AM</p>
				</div>
				<div class="shrink-0">
					<a href="#!" class="btn btn-sub-gray btn-xs"><i class="ri-eye-line"></i> Live</a>
				</div>
			</div>
			<div class="item-center flex gap-3">
				<div
					class="flex size-10 shrink-0 items-center justify-center rounded-md bg-orange-500/10 text-orange-500"
				>
					<LucideIcon name="Atom" class="size-5" />
				</div>
				<div class="grow">
					<h6>10 (B)</h6>
					<p class="dark:text-dark-500 text-sm text-gray-500">11:30AM - 12:45PM</p>
				</div>
				<div class="shrink-0">
					<a href="#!" class="btn btn-sub-gray btn-xs"><i class="ri-eye-line"></i> Live</a>
				</div>
			</div>
			<div class="item-center flex gap-3">
				<div
					class="flex size-10 shrink-0 items-center justify-center rounded-md bg-green-500/10 text-green-500"
				>
					<LucideIcon name="HeartPulse" class="size-5" />
				</div>
				<div class="grow">
					<h6>11 (A)</h6>
					<p class="dark:text-dark-500 text-sm text-gray-500">02:00PM - 03:15PM</p>
				</div>
				<div class="shrink-0">
					<a href="#!" class="btn btn-sub-gray btn-xs"><i class="ri-eye-line"></i> Live</a>
				</div>
			</div>
			<div class="item-center flex gap-3">
				<div
					class="text-primary-500 bg-primary-500/10 flex size-10 shrink-0 items-center justify-center rounded-md"
				>
					<LucideIcon name="JapaneseYen" class="size-5" />
				</div>
				<div class="grow">
					<h6>9 (B)</h6>
					<p class="dark:text-dark-500 text-sm text-gray-500">03:15PM - 05:00PM</p>
				</div>
				<div class="shrink-0">
					<a href="#!" class="btn btn-sub-gray btn-xs"><i class="ri-eye-line"></i> Live</a>
				</div>
			</div>
		</div>
	</CardBody>
</Col>
