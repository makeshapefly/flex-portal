<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Pagination, Navigation, Autoplay } from 'swiper/modules';
	import 'swiper/css';
	import 'swiper/css/pagination';
	import 'swiper/css/navigation';
	import Card from '$lib/components/ui/card/Card.svelte';
	import DarkMode from '$lib/components/common/DarkMode.svelte';

	let isSticky = false;
	let isMenuOpen = false;
	let activeTab = 0;
	let studentCount = 0;
	let teacherCount = 0;
	let classroomCount = 0;
	let tutorialCount = 0;
	let careerCount = 0;
	let year = new Date().getFullYear();

	const handleScroll = () => {
		isSticky = window.scrollY > 0;
	};

	function animatedCounter(
		start: number,
		end: number,
		duration: number,
		updateFn: {
			(value: any): void;
			(value: any): void;
			(value: any): void;
			(value: any): void;
			(value: any): void;
			(arg0: any): void;
		}
	) {
		let current = start;
		let increment = (end - start) / (duration / 10); // increment every 10 ms
		const interval = setInterval(() => {
			if (current < end) {
				current += increment;
				updateFn(current);
				if (current >= end) {
					current = end;
					updateFn(current); // Set to the final value
					clearInterval(interval);
				}
			}
		}, 10);
	}

	const testimonials = [
		{
			image: 'assets/images/avatar/user-14.png',
			title: 'A Truly Transformation Experience',
			description:
				'Attending this school has been a life-changing journey. The supportive teachers and enriching curriculum have helped me discover my passions and excel in ways I never imagined.'
		},
		{
			image: 'assets/images/avatar/user-15.png',
			title: 'A Nurturing Environment',
			description:
				'From the moment I joined, I felt welcomed and valued. The sense of community here is incredible, and the opportunities for growth are endless.'
		},
		{
			image: 'assets/images/avatar/user-17.png',
			title: 'Exceptional Learning and Growth',
			description:
				'The challenging academic programs, combined with the amazing extracurricular activities, have allowed me to grow both intellectually and personally. This school truly prepares you for the future.'
		},
		{
			image: 'assets/images/avatar/user-11.png',
			title: 'Incredible Support and Guidance',
			description:
				'The dedication of the teachers is unmatched. They go above and beyond to ensure every student succeeds, providing constant support and guidance.'
		}
	];

	let swiper: Swiper;
	onMount(() => {
		swiper = new Swiper('.mySwiper', {
			loop: true,
			modules: [Autoplay, Navigation],
			autoplay: {
				delay: 2000,
				disableOnInteraction: false
			},
			spaceBetween: 30,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			}
		});

		animatedCounter(0, 250, 500, (value: number) => {
			studentCount = Math.round(value);
		});
		animatedCounter(0, 300, 500, (value: number) => {
			teacherCount = Math.round(value);
		});
		animatedCounter(0, 170, 500, (value: number) => {
			classroomCount = Math.round(value);
		});
		animatedCounter(0, 7546, 500, (value: number) => {
			tutorialCount = Math.round(value);
		});
		animatedCounter(0, 65, 500, (value: number) => {
			careerCount = Math.round(value);
		});

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div
	class="flex h-10 items-center justify-center bg-pink-400 text-center text-pink-50 dark:bg-pink-700 dark:text-pink-200"
>
	<div class="container">
		<p>
			Join new friends and embark on a New Year learning experience. <a
				href="#!"
				class="underline transition duration-300 ease-linear hover:text-white"
				>Click on the student list!</a
			>
		</p>
	</div>
</div>

<!----------Start Menu------------>
<div>
	<header
		class="landing-navbar dark:[&.scroll-sticky]:shadow-dark-850 dark:[&.scroll-sticky]:bg-dark-900 top-10 h-20 [&.scroll-sticky]:top-0 [&.scroll-sticky]:bg-white [&.scroll-sticky]:shadow-lg [&.scroll-sticky]:shadow-gray-200/50"
		class:scroll-sticky={isSticky}
	>
		<div class="container mx-auto flex items-center px-4">
			<a href="/index" title="Logo">
				<img src="/assets/images/main-logo.png" alt="" class="inline-block h-7 dark:hidden" />
				<img src="/assets/images/logo-white.png" alt="" class="hidden h-7 dark:inline-block" />
			</a>
			<div class={`navbar-collapase mx-auto ${!isMenuOpen ? 'hidden xl:flex' : ''}`}>
				<div
					class="*:text-16 flex flex-col *:inline-block *:py-3 *:font-medium *:tracking-wide xl:flex-row xl:items-center xl:py-0 xl:*:px-3"
				>
					<a
						href="#home"
						title="home"
						on:click={() => (activeTab = 1)}
						class:active={activeTab === 1}
						class="active leading-normal transition duration-300 ease-linear hover:text-orange-500 [&.active]:text-orange-500"
						>Home</a
					>
					<a
						href="#about-us"
						title="about-us"
						on:click={() => (activeTab = 2)}
						class:active={activeTab === 2}
						class="active leading-normal transition duration-300 ease-linear hover:text-orange-500 [&.active]:text-orange-500"
						>About Us</a
					>
					<a
						href="#courses"
						title="courses"
						on:click={() => (activeTab = 3)}
						class:active={activeTab === 3}
						class="active leading-normal transition duration-300 ease-linear hover:text-orange-500 [&.active]:text-orange-500"
						>Courses</a
					>
					<a
						href="#mentors"
						title="mentors"
						on:click={() => (activeTab = 5)}
						class:active={activeTab === 5}
						class="active leading-normal transition duration-300 ease-linear hover:text-orange-500 [&.active]:text-orange-500"
						>Mentors</a
					>
					<a
						href="#blogs"
						title="blogs"
						on:click={() => (activeTab = 6)}
						class:active={activeTab === 6}
						class="active leading-normal transition duration-300 ease-linear hover:text-orange-500 [&.active]:text-orange-500"
						>Blogs</a
					>
					<a
						href="#contact-us"
						title="contact-us"
						on:click={() => (activeTab = 6)}
						class:active={activeTab === 6}
						class="active leading-normal transition duration-300 ease-linear hover:text-orange-500 [&.active]:text-orange-500"
						>Contact Us</a
					>
				</div>
			</div>
			<div class="flex items-center gap-2 ltr:ml-auto rtl:mr-auto">
				<button
					title="menu toggle"
					on:click={() => (isMenuOpen = !isMenuOpen)}
					type="button"
					class="navbar-toggle btn btn-sub-sky btn-icon rounded-full xl:!hidden ltr:ml-auto xl:ltr:ml-0 rtl:mr-auto xl:rtl:mr-0"
					aria-label="Toggle menu"
				>
					<i class={isMenuOpen ? 'ri-close-line' : 'ri-menu-2-line'}></i>
				</button>
				<button type="button" class="btn btn-orange min-w-40 py-3">Enroll Now</button>
			</div>
		</div>
	</header>
</div>
<!----------End Menu------------>

<!-- Home -->
<section class="bg-gradient-to-b from-orange-500/10 pb-14 pt-48 md:pb-24" id="home">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-5xl text-center">
			<h1 class="mb-5 text-5xl font-medium capitalize leading-normal">
				Ready to build meaningful connections
				<span class="relative inline-block">
					<svg
						version="1.2"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 334 80"
						class="absolute bottom-1.5 left-0 h-11"
					>
						<g id="Graphic Elements">
							<g id="&lt;Group&gt;">
								<path
									id="&lt;Compound Path&gt;"
									fill-rule="evenodd"
									class="fill-orange-500/20"
									d="m325.5 27.6c-0.2 0.1-0.5 0.1-0.7 0.2-2.4 0.1-4.7 0.1-7 0.2-0.6 0.1-1.3 0.2-1.6 0.5-0.8 0.9-1.7 1-2.8 1.1-1.5 0.1-1.7 0.3-2.5 1.9 1.8 1 3.8 0.3 5.7 0.7-0.2 0.2-0.5 0.4-1 0.8 0.9 0.4 1.7 0.8 2.4 0.9 2.1 0.1 4.2 0.1 6.2 0.2 0.6 0 1.2-0.1 1.8 0 1.5 0.3 2.8-0.2 4.3-0.6-0.3-0.4-0.5-0.6-0.8-1 1.3 0 2.4 0 3.5 0-0.5 1.8-0.7 1.9-2.4 2-1.4 0.1-2.9 0.1-4.3 0.2-0.5 0-1.1 0.1-1.6 0.3-1.7 0.9-3.5 1-5.4 0.8-0.3 0-0.6-0.2-0.8-0.1-1.7 0.9-3.5 0.3-5.2 0.5-1.2 0.2-2.3 0.7-3.5 1.1q0 0.2 0 0.4 0.9 0.2 1.9 0.4c2.4 0.5 4.7 1.3 7.3 1.1 2.4-0.2 4.9-0.1 7.6-0.1-0.5 0.3-0.7 0.5-0.9 0.5q-3.7 0.4-7.3 0.8c-0.7 0-1.5-0.1-2.3-0.1-0.8-0.1-1.7-0.2-2.6-0.1-3.4 0.4-6.9 0.9-10.3 1.3-1.1 0.2-2.2 0.1-3.3 0.2-1.1 0.1-2.2 0.2-3.3 0.4-0.8 0.2-1.5 0.7-1.4 1.9 3.7 0.1 7.3-0.2 11.2-0.5-0.9 1.2-2.1 1.2-3.1 1.3-5 0.7-10 1.2-15 1.8-0.2 0-0.5 0-0.7 0.1-0.2 0.1-0.4 0.3-0.4 0.5 0 0.2 0.1 0.6 0.3 0.7 0.4 0.1 0.8 0.2 1.2 0.2 1.6 0 3.2 0 5 0-0.3 0.6-0.6 1.2-0.9 1.8 1.4 0.7 2.8 0.3 4.2 0.4 1.3 0 2.6 0 3.9 0.2-3.1 0.8-6.5 0.1-9.6 1.2-0.2 1 0.3 1.3 1 1.3 1.3 0 2.6 0.1 3.9 0.1 3.4 0 6.7-0.1 10.1 0 0.9 0 1.8 0.2 2.8 0.3 1.2 0.2 2.5 0.4 3.8 0.4 4.4 0 8.8-0.1 13.2-0.1q1 0 2.1 0.3c-2.2 0.8-4.5 0.5-6.7 0.8-2.3 0.4-4.6 0.5-6.8 0.7q-0.1 0.3-0.1 0.5c0.4 0.1 0.8 0.2 1.2 0.2 2.9 0 5.8 0 8.7 0 1.4 0 2.9-0.2 4.6 0.5-3.6 0.2-6.8 0.4-10.2 0.7 0.2 1.6-0.8 2-2.1 2.2q-3.1 0.4-6.1 0.9c-0.8 0.1-1.7 0.3-2.5 0.5-0.5 0.2-0.9 0.6-1.3 1.1 1.7 0.6 3.3 0.4 5.1 0.4-0.3 0.9-1 0.8-1.6 0.9-1.9 0.2-3.8 0.3-5.7 0.5q-1.1 0.1-2.2 0.4c-0.2 0.1-0.5 0.5-0.4 0.7 0 0.2 0.3 0.5 0.5 0.5 0.7 0.1 1.4 0.1 2.4 0.2-2.1 1-4.2 0.8-6.1 1.3-1.8 0.5-3.6 1-5.5 1.6 1.4 0.6 2.7 0.3 4.1 0.1q2.1-0.2 4.4 0.1c-0.3 0.1-0.5 0.4-0.8 0.4-2 0.1-4 0-6 0.3-5.8 0.8-11.5 0.5-17.2 1.1-10.9 1.2-21.9 1.4-32.8 1.9-2.1 0.1-4.2 0-6.3 0-0.7 0.1-1.5 0.2-2.2 0.3-0.3 0-0.6 0.1-0.8 0.1-1.7-0.1-3.3-0.3-4.9-0.3-6.6 0-13.1 0-19.7 0-2.8 0-5.7-0.1-8.5-0.2-0.3 0-0.5 0-0.7 0.1-3.5 0.9-7.1 0.3-10.6 0.4-9.2 0.2-18.4 0.2-27.6 0.2q-9.4 0.1-18.8 0.2-6.3 0-12.6 0.1-13.1 0.1-26.2 0.1c-3.9 0-7.8 0-11.7 0-0.9 0-1.8 0.2-2.7 0.3-0.2 0.9 0.1 1.3 0.8 1.5 0.5 0.1 1.1 0.1 1.7 0.1q5.7 0.2 11.5 0.4c0.2 0 0.4 0.1 0.6 0.5-1.8 0.1-3.7 0.4-5.5 0.4-4.8 0-9.6-0.1-14.3-0.2-3.4 0-6.8 0-10.2-0.2-5.5-0.2-11.1-0.5-16.7-0.9-4.7-0.4-9.3-1-14-1.5-7.2-0.7-14.4-1.4-21.5-2.1-1.4-0.1-2.8-0.3-4.2-0.6-0.4 0-0.7-0.2-1.1-0.3q0-0.2 0-0.4c0.6 0 1.3-0.1 1.9-0.1 2.8 0.2 5.6 0.5 8.3 0.7 0.2 0 0.3 0.1 0.4 0.1q2.6-0.3 5.2-0.5c-0.8-0.7-2.9-1.1-6.7-1.3-2.5-0.2-4.9-0.6-7.3-0.8q-3.5-0.4-7-0.7 0-0.2 0-0.4c1.4-0.1 2.7-0.2 4.4-0.4-1.3-1.6-3-0.4-4.5-1.2 1.5-0.6 3.1 0.1 4.4-0.9-1.1-0.7-2.2-0.4-3.3-0.5q-1.6-0.1-3.3-0.3c-1-0.2-2.1 0.5-3.1-0.4 4.7 0 9.3-0.6 13.9-0.7q0-0.2 0.1-0.4c-0.3-0.2-0.5-0.4-0.8-0.5q-1.9-0.3-3.8-0.4c-2.5-0.2-5-0.8-7.6-0.8-1.8 0.1-3.6-0.3-5.4-0.4-1.3 0-2.4-0.6-3.2-1.8 0.4-0.2 0.7-0.5 1-0.5 2.4-0.2 4.7-0.3 7-0.4 1.7-0.2 3.3-0.2 4.7-1.4 0.6-0.5 1.6-0.5 2.4-0.6q6.8-0.5 13.7-1.1 4.8-0.3 9.7-0.6c1-0.1 2 0.1 3 0.1q1.6 0.1 3.3-0.1c0.6 0 1.2-0.3 1.2-1.4-2.7-0.2-5.3-0.3-8-0.5 0.8-1.2 2-1.7 3.4-1.9 2.9-0.3 5.7-0.9 8.6-0.8 0.5 0.1 1-0.1 1.5-0.1q0-0.2 0-0.4c-0.3-0.1-0.5-0.3-0.8-0.3-1.8 0.1-3.6 0.3-5.4 0.4q-5 0.4-10.1 0.7c-1.7 0.2-3.4 0.3-5.2 0.3-1.7 0-3.5-0.2-5-1.2-0.3-0.2-0.8-0.1-1.2-0.2q-5-0.9-10.1-1.8c-0.1-0.1-0.2-0.2-0.4-0.4 0.6-0.6 1.2-0.2 1.8-0.1 2.1 0.3 4.2 0.8 6.3 0 0.5-0.2 0.9-0.5 1.3-0.9-4.2-0.1-8.2-0.6-12.2-1.7 0.4-0.1 0.7-0.2 1.1-0.2 0.6-0.1 1.2-0.1 1.7-0.1 0.7-0.1 1.7 0.2 2-0.8 0.2-1-0.9-1-1.4-1.4q0 0-0.1-0.2c0.4-0.2 0.7-0.5 1.3-0.9-0.8-0.2-1.4-0.4-2.1-0.6 0.2-0.3 0.2-0.7 0.5-0.8 0.8-0.2 1.6-0.4 2.5-0.6 1.8-0.4 3.7-0.9 5.7-1.4-0.7-0.9-1.5-1-2.2-0.9-1 0.2-2.2-0.2-3.1 0.8-0.1 0.1-0.3 0.1-0.5 0.1-0.3-0.1-0.6-0.3-0.8-0.2-2.6 1.1-5.2 0.5-7.7 0.1-0.8-0.1-1.5-0.6-2.5-1.1 1.9-0.8 5.1-1.4 6.5-1.4 1 0.1 1.9-0.2 3.2-0.8-2.1-0.6-3.8 0.1-5.7-0.1 0.8-1.1 1.7-1.9 3-2.1 1.7-0.2 2.5-1.8 3.9-2.6q-0.1-0.2-0.1-0.4c-1 0-1.9 0.1-2.8-0.1-0.9-0.3-1.7-0.8-2.6-1.3 0.3-0.8 0.6-1.6 0.9-2.4-1.4-0.6-1.9 1.3-3.2 1-0.3-0.4-0.6-0.9-0.9-1.3 0.7-2.5 3.1-3.1 5-4.3q-0.1-0.1-0.1-0.3c-0.3 0-0.6-0.1-0.8 0-0.3 0-0.6 0.1-0.9 0.1-0.3-0.7-0.5-1.4-0.8-2.1q1.7-0.7 3.4-1.4c1-0.4 2.3 0.4 3.2-0.8-0.4-0.8-1.3-0.7-2-0.8-0.6-0.1-1.3 0-2-0.3 1.7-0.7 3.5-1.4 5.2-2.2 3.7-1.8 7.8-2.2 11.8-3q8.1-1.6 16.3-2.9c5.6-0.9 11.2-1.8 16.8-2.3 5.7-0.6 11.5-0.9 17.3-1.3 1.2-0.1 2.2 0.4 3.4 0.3 1.8-0.2 3.8 0.2 5.7 0.2 1 0.1 2.1 0 3.1-0.1 2.2-0.3 4.4-0.6 6.6-0.9 0.2 0 0.6-0.1 0.8 0 1.7 1 3.5 0.3 5.3 0.3q1 0 2 0 0 0.2 0.1 0.3-1 0.5-2 1 0 0.2 0 0.3c0.8 0.1 1.5 0.1 2.3 0.2 0.7 0.1 1.5 0.3 2.2 0.3 2.5 0.1 5 0.1 7.5 0.1 3.4-0.1 6.9-0.3 10.3-0.4 2.4 0 4.7 0.1 7.1 0.1q0.3 0 0.7 0c5.1-0.6 10.3-0.6 15.5-0.3 1.9 0.1 3.9-0.1 5.8-0.1q6.8 0 13.6-0.1c0.2 0 0.4 0 0.7 0.1 7.4 1.1 14.8 0.8 22.3 1 11.8 0.3 23.6 0.5 35.4 0.8 3.1 0 6.3 0 9.4 0 1.2 0 1.5 0.2 1.4 1.5 0 0.3 0.4 0.6 0.6 1-0.2 0.1-0.6 0.1-1 0.1q-2.4 0.2-4.8 0.4c-0.3 0.1-0.5 0.1-0.7 0.2-1.6 1.3-3.3 1-5.1 0.7-0.7-0.2-2.4 0.3-3.2 0.7-0.4 0.2-1 0.2-1.3 0-1.2-0.5-2.4-0.7-3.9-0.4-0.2 0.4-0.3 0.9-0.6 1.5 0.9 0.1 1.6 0.3 2.4 0.3 8.2 0.2 16.4 0.3 24.6 0.5 2.6 0.1 5.2 0.5 7.8 0.5 4.1 0.2 8.2 0.2 12.4 0.3 2 0.1 4.1 0.3 6.2 0.4q6.7 0.4 13.4 0.6 7.7 0.2 15.4 0.4c1.1 0 2.3 0 3.4 0q0.5 1.1-0.5 1.2c-0.5 0.1-0.9 0.1-1.4 0.1q-0.4 0.1-0.8 0.4c1.9 0.7 3.9 0.1 5.8 0.5q0 0.2 0 0.4c-0.7 0.1-1.4 0.3-2.2 0.3-2.3 0.2-4.7 0.3-7.1 0.4-0.4 0.1-0.8 0.1-1.2 0.3-2 0.8-4.1 0.8-6.1 0.7-3.9-0.1-7.7 0.3-11.5 0.6-1.4 0.2-2.9 0.1-4.4 0.1-0.5 0-1 0.2-1.5 0.3q0 0.2 0 0.4c0.3 0.1 0.5 0.3 0.8 0.3q8 0.3 16.1 0.5c0.7 0.1 1.5 0.2 2.2 0.2 1.1 0 1.9 0.4 2.4 1.2 0.3 0.6 0.8 0.7 1.4 0.7q1.6 0 3.3 0.1c0.8 0 1.7-0.2 2.3 0.8 0.2 0.2 0.8 0.2 1.2 0.3 1.3 0.2 2.7 0.5 4.1 0.4 1.7-0.1 2.9 0.9 4.2 1.6 0.6 0.4 1.2 0.6 1.9 0.6q5 0.2 10.1 0.4c0.2 0 0.4 0.1 0.6 0.1q0 0.2 0 0.3zm-246.6 3.9c-0.2-0.1-0.5-0.1-0.7-0.1-2.7 0.2-5.4 0.5-8.1 0.6-0.9 0.1-1.8 0.2-2.6-0.1-1.1-0.4-2 0-3 0.3 1 0.8 3 1 7.5 0.9 2.5 0 5 0 7.7-0.1-0.3-0.6-0.5-1.1-0.8-1.5zm4.2 2.4c1.8 1.1 6.2 1.1 7.5 0.1-2.1-0.6-4.2-1.1-6.2-1.5-0.9-0.2-1.4 0.4-1.3 1.4zm-77.8 25c1.8 0.6 5.2 0.4 6.1-0.2-2.1-0.1-4.1-0.4-6.1 0.2z"
								/>
								<path
									id="&lt;Path&gt;"
									class="fill-orange-500/20"
									d="m279.5 11.2c0.2-0.6 0.3-1 0.6-1.5-1.6-0.1-3-0.2-4.5-0.3q-5.3-0.2-10.6-0.3c-1.2 0-2.4 0.2-3.6 0.3q-0.2 0-0.3 0.1c-2.5 0.1-5 0.7-7.5 0.4-1.7-0.2-3.1 0.5-4.7 0.3-1.6-0.2-3.2-0.1-4.7-0.1-1 0-2.1-0.1-3.1-0.4 0.3-0.1 0.6-0.3 0.9-0.3 1.6-0.2 3.1-0.3 4.7-0.5 0.8-0.1 1.8 0 2.1-1.1 0-0.2 0.6-0.4 0.9-0.4 3.5 0.2 6.9 0.5 10.4 0.6q8.5 0.4 16.9 0.6c1 0 1.9-0.3 2.8-0.7-2.6-0.8-5.3-0.8-7.9-0.9-2.7 0-5.4-0.3-8-0.5q-4.1-0.3-8.1-0.6 0-0.2-0.1-0.4c0.5 0 0.9-0.1 1.3-0.1 4.6 0 9.3 0 13.9 0.2 3.8 0.1 7.7 0.4 11.5 0.5 1.9 0 3.8-0.2 5.7-0.2 3.3-0.2 6.7-0.3 10-0.4 2.5 0 5 0.1 7.4 0.1 0.6 0 1.2 0.1 1.7 0.2q0.1 0.2 0.1 0.4c-1.3 0.3-2.5 0.6-4 1 0.7 0.7 1.5 0.7 2.2 0.7q10.1 0.7 20.2 1.4c0 0 0.1 0.2 0.3 0.3-0.3 0.2-0.6 0.4-0.9 0.5-2.4 0.6-4.9 0.7-7.4 0.4q-1.5-0.1-3.1-0.1c-4.4 0.2-8.8 0.6-13.2 0.5-2.8-0.1-5.6-0.2-8.4-0.1-1.6 0-3.2 0.2-4.8 0.2-1.6 0-3.2 0.5-4.8-0.2-0.5-0.2-1.3 0.1-1.9 0.1-0.6 0.1-1.2 0.2-2 0.3z"
								/>
								<path
									id="&lt;Path&gt;"
									class="fill-orange-500/20"
									d="m243.4 76.7c-0.2 0.3-0.3 0.4-0.3 0.4-2.4 0.1-4.6 1-6.9 1.4-0.9 0.2-1.8 0.1-2.2-1-2.1 0.9-4.3 0.9-6.5 0.8q-6-0.1-11.9-0.2c-6.9-0.2-13.9-0.4-20.9-0.5-4.1 0-8.2 0.2-12.3 0.3-1.8 0-3.5-0.1-5.3-0.1-0.3 0-0.7-0.2-1-0.4 1.2-0.6 2.5-0.6 3.8-0.6q2 0 4 0.1c4.1 0.1 8.2-0.2 12.3-0.4 3.9-0.1 7.8-0.3 11.7-0.4q4.6-0.2 9.2-0.2c1.3 0 2.6 0.4 3.9 0.4 7.2 0.1 14.3 0.1 21.5 0.2 0.2 0 0.5 0.1 0.9 0.2z"
								/>
								<path
									id="&lt;Path&gt;"
									class="fill-orange-500/20"
									d="m307 72.2c-1.1 0.9-2.2 1.2-3.4 1.4-1.7 0.2-3.5 0.6-5.3 0.8-1.4 0.2-2.9 0.4-4.3 0.6-2.5 0.2-5.1 0.3-7.6 0.9-2 0.4-4.1 0.7-6.2 0.7-0.6 0-1.2-0.1-1.9-0.2-0.2 0-0.4-0.1-0.6-0.1-3 0.3-5.9 0.6-8.8 0.8-2.3 0.2-4.6 0.2-6.9 0 0.9-0.2 1.8-0.5 2.7-0.6 2.7-0.3 5.3-0.4 8-0.7 2.4-0.3 4.9-0.7 7.4-1 2-0.2 4-0.3 6.1-0.5q6.1-0.4 12.3-0.9c1.5-0.1 3.1-0.1 4.6-0.3 1.3-0.2 2.5-0.6 3.9-0.9z"
								/>
								<path
									id="&lt;Path&gt;"
									class="fill-orange-500/20"
									d="m135.8 75.2c-1.3-0.1-2.6-0.3-3.9-0.3-1.1-0.1-2.2-0.1-3.3-0.1-3.8 0-7.6 0-11.3 0.1-2.6 0-5.1 0.2-7.7 0.3-0.2 0-0.4-0.1-0.7-0.4 0.9-0.1 1.8-0.3 2.6-0.4 4.8-0.5 22.9-0.1 24.3 0.4q0 0.2 0 0.4z"
								/>
								<path
									id="&lt;Path&gt;"
									class="fill-orange-500/20"
									d="m244.7 78.9c0.3-0.4 0.3-0.6 0.4-0.6 3-0.5 6-1 8.8-1.5 0.6 0.7 1 1.1 1.6 1.8-3.6 0.1-7.1 0.2-10.8 0.3z"
								/>
								<path
									id="&lt;Path&gt;"
									class="fill-orange-500/20"
									d="m137.4 74.7c0.7-0.1 1.2-0.3 1.8-0.2 2.3 0 4.6 0 7.1 0.1-2.1 1-7.1 1.1-8.9 0.1z"
								/>
								<path
									id="&lt;Path&gt;"
									class="fill-orange-500/20"
									d="m166.2 74.8c-1.5 1-2.9 0.3-4.3 0.4 1.4-0.3 2.7-0.6 4.3-0.4z"
								/>
								<path
									id="&lt;Path&gt;"
									class="fill-orange-500/20"
									d="m315.7 25.5c0.8-0.8 1.7-0.4 2.5-0.3q0 0.2 0.1 0.5-1.3 0.1-2.5 0.2-0.1-0.2-0.1-0.4z"
								/>
								<path
									id="&lt;Path&gt;"
									class="fill-orange-500/20"
									d="m266.5 78.7q-1.4 0-2.9 0 0-0.1 0-0.2 1.4-0.1 2.9-0.1 0 0.1 0 0.3z"
								/>
								<path
									id="&lt;Path&gt;"
									class="fill-orange-500/20"
									d="m326.5 32.5q1-0.1 1.9-0.1 0 0.2 0 0.3-0.9 0.1-1.8 0.3 0-0.3-0.1-0.5z"
								/>
								<path
									id="&lt;Path&gt;"
									class="fill-orange-500/20"
									d="m328.9 27.6q-0.6 0-1.2 0-0.1-0.1-0.1-0.2 0.7-0.1 1.3-0.1 0 0.1 0 0.3z"
								/>
								<path
									id="&lt;Path&gt;"
									class="fill-orange-500/20"
									d="m329.5 53.8q0.5 0 1 0.1 0 0.1 0 0.3-0.5 0-1-0.1 0-0.1 0-0.3z"
								/>
								<path
									id="&lt;Path&gt;"
									class="fill-orange-500/20"
									d="m172.4 74.8q0.5 0 1.1-0.1 0 0.2 0 0.4-0.5 0.1-1.1 0.2 0-0.2 0-0.5z"
								/>
								<path
									id="&lt;Path&gt;"
									class="fill-orange-500/20"
									d="m319.2 29.7c0.2 0 0.5 0 1.1 0-0.4 0.3-0.6 0.4-0.7 0.4-0.2 0.1-0.3 0-0.4-0.1q0-0.1 0-0.3z"
								/>
							</g>
						</g>
					</svg>
					<span class="relative">Domiex</span>
				</span>
				education?
			</h1>
			<p class="dark:text-dark-500 mb-8 text-lg text-gray-500">
				Let's discover new knowledge, make new friends, and enjoy a learning experience with amazing
				teachers.
			</p>

			<div class="flex flex-wrap items-center justify-center gap-3">
				<button
					type="button"
					class="btn btn-primary min-w-40 rounded-full py-3 hover:-translate-y-0.5"
				>
					Get Started
					<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
				</button>
				<a href="#!" class="flex items-center gap-2 font-semibold">
					<div
						class="text-primary-50 flex size-9 items-center justify-center rounded-full bg-orange-500"
					>
						<LucideIcon name="CirclePlay" class="size-5" />
					</div>
					Watch Videos
				</a>
			</div>
		</div>
		<Grid cols={2} gap={8} class="mt-8 grid md:grid-cols-4 lg:gap-x-16">
			<div>
				<div
					class="dark:bg-dark-900/40 relative max-h-96 overflow-hidden rounded-t-full bg-white p-6 before:absolute before:inset-x-0 before:bottom-0 before:h-2/3 before:rounded-t-full before:bg-sky-500/10"
				>
					<img src="/assets/images/school/landing/img-01.png" alt="" class="relative" />
				</div>
			</div>
			<div>
				<div
					class="dark:bg-dark-900/40 relative max-h-96 overflow-hidden rounded-t-full bg-white p-6 before:absolute before:inset-x-0 before:bottom-0 before:h-2/3 before:rounded-t-full before:bg-purple-500/10"
				>
					<img src="/assets/images/school/landing/img-02.png" alt="" class="relative" />
				</div>
			</div>
			<div>
				<div
					class="dark:bg-dark-900/40 relative max-h-96 overflow-hidden rounded-t-full bg-white p-6 before:absolute before:inset-x-0 before:bottom-0 before:h-2/3 before:rounded-t-full before:bg-green-500/10"
				>
					<img src="/assets/images/school/landing/img-03.png" alt="" class="relative" />
				</div>
			</div>
			<div>
				<div
					class="dark:bg-dark-900/40 relative max-h-96 overflow-hidden rounded-t-full bg-white p-6 before:absolute before:inset-x-0 before:bottom-0 before:h-2/3 before:rounded-t-full before:bg-yellow-500/10"
				>
					<img src="/assets/images/school/landing/img-04.png" alt="" class="relative" />
				</div>
			</div>
		</Grid>
	</div>
	<div class="container mx-auto mt-12 px-4">
		<Grid cols={12} gap={5} class="sm:grid-cols-3 md:grid-cols-5">
			<div class="text-center">
				<h3 class="mb-1">{studentCount}k</h3>
				<p class="dark:text-dark-500 text-16 text-gray-500">Total Student</p>
			</div>

			<div class="text-center">
				<h3 class="mb-1">{teacherCount}+</h3>
				<p class="dark:text-dark-500 text-16 text-gray-500">Expert Teacher Teams</p>
			</div>

			<div class="text-center">
				<h3 class="mb-1">{classroomCount}+</h3>
				<p class="dark:text-dark-500 text-16 text-gray-500">Conducive Class Room</p>
			</div>

			<div class="text-center">
				<h3 class="mb-1">{tutorialCount}</h3>
				<p class="dark:text-dark-500 text-16 text-gray-500">Online Tutorial</p>
			</div>

			<div class="text-center">
				<h3 class="mb-1">{careerCount}+</h3>
				<p class="dark:text-dark-500 text-16 text-gray-500">Career Guide</p>
			</div>
		</Grid>
	</div>
</section>

<section class="relative pt-12 md:pb-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-12 max-w-3xl text-center">
			<span class="badge badge-sub-orange text-15 mb-4 rounded-full px-5 py-1.5">Our Featured</span>
			<h2 class="mb-3 capitalize leading-normal">Top Education Offered by Domiex School</h2>
			<p class="dark:text-dark-500 text-16 text-gray-500">
				Our dedicated team of educators and comprehensive curriculum are designed to foster academic
				excellence and personal growth in every student.
			</p>
		</div>
		<Grid gap="space" class="grid md:grid-cols-2 lg:grid-cols-4">
			<div>
				<div class="mb-3 size-20 rounded-lg bg-purple-500/10 p-4">
					<img src="/assets/images/school/landing/feature/online-education.png" alt="" />
				</div>
				<h5 class="mb-1">Online Classes</h5>
				<p class="dark:text-dark-500 text-16 mb-3 text-gray-500">
					An online class is a course conducted over the Internet. They are generally conducted
					through a learning management.
				</p>
				<a href="#!" class="link link-orange text-16">
					Read More
					<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
				</a>
			</div>
			<div>
				<div class="bg-10low-500/410 mb-3 size-20 rounded-lg p-4">
					<img src="/assets/images/school/landing/feature/self-improvement.png" alt="" />
				</div>
				<h5 class="mb-1">New Skills</h5>
				<p class="dark:text-dark-500 text-16 mb-3 text-gray-500">
					These life skills include problem solving, critical thinking, communication skills,
					decision-making, creative thinking.
				</p>
				<a href="#!" class="link link-orange text-16">
					Read More
					<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
				</a>
			</div>
			<div>
				<div class="mb-3 size-20 rounded-lg bg-sky-500/10 p-4">
					<img src="/assets/images/school/landing/feature/coach.png" alt="" />
				</div>
				<h5 class="mb-1">Best Trainer</h5>
				<p class="dark:text-dark-500 text-16 mb-3 text-gray-500">
					The Skills Trainer helps individuals develop the knowledge and abilities necessary to do
					their jobs effectively and efficiently.
				</p>
				<a href="#!" class="link link-orange text-16">
					Read More
					<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
				</a>
			</div>
			<div>
				<div class="mb-3 size-20 rounded-lg bg-emerald-500/10 p-4">
					<img src="/assets/images/school/landing/feature/learning.png" alt="" />
				</div>
				<h5 class="mb-1">Easy to Learn</h5>
				<p class="dark:text-dark-500 text-16 mb-3 text-gray-500">
					A fast learner is someone who embodies the skills of being a strategic a good listener and
					applies them to learning quickly.
				</p>
				<a href="#!" class="link link-orange text-16">
					Read More
					<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
				</a>
			</div>
		</Grid>
	</div>
</section>

<!-- About us -->
<section class="relative py-14 md:py-24" id="about-us">
	<div
		class="absolute hidden size-[400px] rounded-md border border-orange-500 blur-sm md:block lg:size-[480px] xl:size-[650px]"
	></div>
	<div class="container mx-auto px-4">
		<Grid cols={12} gap={5} class="grid grid-cols-12 items-center gap-5">
			<Col cols={{ span: 12 }} md={{ span: 6 }} class="2xl:col-span-4 2xl:col-start-2">
				<div
					class="thumbnail relative before:absolute before:inset-0 before:top-20 before:rounded-md before:bg-orange-500/10 before:backdrop-blur-lg"
				>
					<span
						class="absolute -left-3 bottom-14 -rotate-90 text-2xl font-bold uppercase tracking-wide text-orange-500/30"
						>Domiex</span
					>
					<img
						src="/assets/images/school/landing/img-05.png"
						alt=""
						class="relative mx-auto max-h-[36rem]"
					/>
				</div>
			</Col>
			<Col cols={{ span: 12 }} md={{ span: 6 }} class="2xl:col-span-4 2xl:col-start-8">
				<p class="text-16 mb-3 font-medium text-orange-500">About Us</p>
				<h2 class="mb-6 capitalize leading-normal">
					We are the best school and offer numerous advantages.
				</h2>

				<div class="space-y-4">
					<div
						class="dark:shadow-dark-800/50 flex items-center gap-4 rounded-lg p-3 shadow-2xl shadow-gray-100"
					>
						<div
							class="bg-primary-500/10 text-primary-500 flex size-12 items-center justify-center rounded-full"
						>
							<LucideIcon name="Gem" class="size-6" />
						</div>
						<h6>Highlight Unique Programs and Curriculum</h6>
					</div>
					<div
						class="dark:shadow-dark-800/50 flex items-center gap-4 rounded-lg p-3 shadow-2xl shadow-gray-100"
					>
						<div
							class="bg-primary-500/10 text-primary-500 flex size-12 items-center justify-center rounded-full"
						>
							<LucideIcon name="Feather" class="size-6" />
						</div>
						<h6>Qualified and Passionate Staff</h6>
					</div>
					<div
						class="dark:shadow-dark-800/50 flex items-center gap-4 rounded-lg p-3 shadow-2xl shadow-gray-100"
					>
						<div
							class="bg-primary-500/10 text-primary-500 flex size-12 items-center justify-center rounded-full"
						>
							<LucideIcon name="BriefcaseBusiness" class="size-6" />
						</div>
						<h6>Modern Facilities and Technology</h6>
					</div>
					<div
						class="dark:shadow-dark-800/50 flex items-center gap-4 rounded-lg p-3 shadow-2xl shadow-gray-100"
					>
						<div
							class="bg-primary-500/10 text-primary-500 flex size-12 items-center justify-center rounded-full"
						>
							<LucideIcon name="Handshake" class="size-6" />
						</div>
						<h6>Safe and Supportive Environment</h6>
					</div>
				</div>
			</Col>
		</Grid>
	</div>
</section>

<!-- Courses -->
<section class="relative py-14 md:py-24" id="courses">
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-12 max-w-3xl text-center">
			<h2 class="mb-3 capitalize leading-normal">How to get Started</h2>
			<p class="dark:text-dark-500 text-16 text-gray-500">
				Starting an e-learning process involves several steps to ensure a smooth transition and
				effective learning experience for students. Here's a comprehensive guide to get you started:
			</p>
		</div>

		<div
			class="dark:before:border-dark-800 dark:after:border-dark-800 relative mb-8 before:absolute before:top-1/2 before:w-2/3 before:border-b before:border-gray-200 after:absolute after:top-1/2 after:border-gray-200 last:before:w-[33.3%] last:after:hidden md:after:h-[calc(100%_+_2rem_)] ltr:after:left-2/3 ltr:after:border-l rtl:after:right-2/3 rtl:after:border-r dark:bg-transparent ltr:[&.right]:before:right-0 ltr:[&.right]:after:left-auto ltr:[&.right]:after:right-2/3 rtl:[&.right]:before:left-0 rtl:[&.right]:after:left-2/3 rtl:[&.right]:after:right-auto"
		>
			<div class="card relative max-w-md bg-gradient-to-b from-orange-500/10">
				<div class="absolute top-5 text-7xl text-orange-500 opacity-10 ltr:right-5 rtl:left-5">
					1
				</div>
				<CardBody>
					<LucideIcon name="UserRound" class="size-8 text-purple-500" />
					<h6 class="text-16 mb-2 mt-4">Create on Account</h6>
					<p class="dark:text-dark-500 text-gray-500">
						By creating an account, you can easily connect with others, whether it's through direct
						messaging on social media or email communication through a registered email account.
					</p>
				</CardBody>
			</div>
		</div>
		<div
			class="dark:before:border-dark-800 dark:after:border-dark-800 right relative mb-8 before:absolute before:top-1/2 before:w-2/3 before:border-b before:border-gray-200 after:absolute after:top-1/2 after:border-gray-200 last:before:w-[33.3%] last:after:hidden md:after:h-[calc(100%_+_2rem_)] ltr:after:left-2/3 ltr:after:border-l rtl:after:right-2/3 rtl:after:border-r dark:bg-transparent ltr:[&.right]:before:right-0 ltr:[&.right]:after:left-auto ltr:[&.right]:after:right-2/3 rtl:[&.right]:before:left-0 rtl:[&.right]:after:left-2/3 rtl:[&.right]:after:right-auto"
		>
			<div
				class="card relative max-w-md bg-gradient-to-b from-orange-500/10 ltr:ml-auto rtl:mr-auto"
			>
				<div class="absolute top-5 text-7xl text-orange-500 opacity-10 ltr:right-5 rtl:left-5">
					2
				</div>
				<CardBody>
					<LucideIcon name="HandMetal" class="size-8 text-red-500" />
					<h6 class="text-16 mb-2 mt-4">Select Class</h6>
					<p class="dark:text-dark-500 text-gray-500">
						The Select class in Selenium provides methods to interact with dropdown lists. Using
						these methods, you can easily automate interactions with dropdown lists on web pages
						using Selenium, making it easier to test.
					</p>
				</CardBody>
			</div>
		</div>
		<div
			class="dark:before:border-dark-800 dark:after:border-dark-800 relative mb-8 before:absolute before:top-1/2 before:w-2/3 before:border-b before:border-gray-200 after:absolute after:top-1/2 after:border-gray-200 last:before:w-[33.3%] last:after:hidden md:after:h-[calc(100%_+_2rem_)] ltr:after:left-2/3 ltr:after:border-l rtl:after:right-2/3 rtl:after:border-r dark:bg-transparent ltr:[&.right]:before:right-0 ltr:[&.right]:after:left-auto ltr:[&.right]:after:right-2/3 rtl:[&.right]:before:left-0 rtl:[&.right]:after:left-2/3 rtl:[&.right]:after:right-auto"
		>
			<div class="card relative max-w-md bg-gradient-to-b from-orange-500/10">
				<div class="absolute right-5 top-5 text-7xl text-orange-500 opacity-10">3</div>
				<CardBody>
					<LucideIcon name="Crown" class="size-8 text-green-500" />
					<h6 class="text-16 mb-2 mt-4">Select Your Courses</h6>
					<p class="dark:text-dark-500 text-gray-500">
						You can start by choosing a field that you are interested in, and from there, think of a
						course that will match your skills, values and personality type. you are in a better
						position to figure out what courses will suit you.
					</p>
				</CardBody>
			</div>
		</div>
		<div
			class="dark:before:border-dark-800 dark:after:border-dark-800 right relative mb-8 before:absolute before:top-1/2 before:w-2/3 before:border-b before:border-gray-200 after:absolute after:top-1/2 after:border-gray-200 last:before:w-[33.3%] last:after:hidden md:after:h-[calc(100%_+_2rem_)] ltr:after:left-2/3 ltr:after:border-l rtl:after:right-2/3 rtl:after:border-r dark:bg-transparent ltr:[&.right]:before:right-0 ltr:[&.right]:after:left-auto ltr:[&.right]:after:right-2/3 rtl:[&.right]:before:left-0 rtl:[&.right]:after:left-2/3 rtl:[&.right]:after:right-auto"
		>
			<div
				class="card relative max-w-md bg-gradient-to-b from-orange-500/10 ltr:ml-auto rtl:mr-auto"
			>
				<div class="absolute top-5 text-7xl text-orange-500 opacity-10 ltr:right-5 rtl:left-5">
					4
				</div>
				<CardBody>
					<LucideIcon name="Users" class="size-8 text-sky-500" />
					<h6 class="text-16 mb-2 mt-4">Select Your Teachers</h6>
					<p class="dark:text-dark-500 text-gray-500">
						Know your principles and priorities and compare them to the person/system you want to
						learn from. You will want to find a teacher who aligns with your principles and
						priorities.
					</p>
				</CardBody>
			</div>
		</div>
		<div
			class="dark:before:border-dark-800 dark:after:border-dark-800 relative mb-8 before:absolute before:top-1/2 before:w-2/3 before:border-b before:border-gray-200 after:absolute after:top-1/2 after:border-gray-200 last:before:w-[33.3%] last:after:hidden md:after:h-[calc(100%_+_2rem_)] ltr:after:left-2/3 ltr:after:border-l rtl:after:right-2/3 rtl:after:border-r dark:bg-transparent ltr:[&.right]:before:right-0 ltr:[&.right]:after:left-auto ltr:[&.right]:after:right-2/3 rtl:[&.right]:before:left-0 rtl:[&.right]:after:left-2/3 rtl:[&.right]:after:right-auto"
		>
			<div class="card relative max-w-md bg-gradient-to-b from-orange-500/10">
				<div class="absolute right-5 top-5 text-7xl text-orange-500 opacity-10">5</div>
				<CardBody>
					<LucideIcon name="CalendarClock" class="text-primary-500 size-8" />
					<h6 class="text-16 mb-2 mt-4">Set Class Time</h6>
					<p class="dark:text-dark-500 text-gray-500">
						By creating an account, you can easily connect with others, whether it's through direct
						messaging on social media or email communication through a registered email account.
					</p>
				</CardBody>
			</div>
		</div>
		<div
			class="dark:before:border-dark-800 dark:after:border-dark-800 right relative mb-8 before:absolute before:top-1/2 before:w-2/3 before:border-b before:border-gray-200 after:absolute after:top-1/2 after:border-gray-200 last:before:w-[33.3%] last:after:hidden md:after:h-[calc(100%_+_2rem_)] ltr:after:left-2/3 ltr:after:border-l rtl:after:right-2/3 rtl:after:border-r dark:bg-transparent ltr:[&.right]:before:right-0 ltr:[&.right]:after:left-auto ltr:[&.right]:after:right-2/3 rtl:[&.right]:before:left-0 rtl:[&.right]:after:left-2/3 rtl:[&.right]:after:right-auto"
		>
			<div
				class="card relative max-w-md bg-gradient-to-b from-orange-500/10 ltr:ml-auto rtl:mr-auto"
			>
				<div class="absolute top-5 text-7xl text-orange-500 opacity-10 ltr:right-5 rtl:left-5">
					6
				</div>
				<CardBody>
					<LucideIcon name="GraduationCap" class="size-8 text-pink-500" />
					<h6 class="text-16 mb-2 mt-4">Now You Can Start</h6>
					<p class="dark:text-dark-500 text-gray-500">
						By creating an account, you can easily connect with others, whether it's through direct
						messaging on social media or email communication through a registered email account.
					</p>
				</CardBody>
			</div>
		</div>
	</div>
</section>

<section class="relative bg-gradient-to-b from-orange-500/10 pt-14 md:py-24">
	<div class="container mx-auto px-4">
		<Grid cols={12} gap={5} class="items-center">
			<Col cols={{ span: 12 }} md={{ span: 6 }}>
				<h2 class="mb-4 capitalize leading-normal">What Our Beloved Students Say About</h2>
				<p class="dark:text-dark-500 text-16 mb-5 text-gray-500">
					These testimonials reflect the profound impact our school has on its students, fostering
					an environment and achieve their dreams. Our students' experiences speak volumes about the
					impact of our school. Here are some heartfelt testimonials from those who have thrived in
					our community:
				</p>
				<a href="#!" class="link text-orange-500 underline hover:text-orange-600">
					View All Reviews
					<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
				</a>
			</Col>
			<Col cols={{ span: 12 }} md={{ span: 6 }}>
				<div class="swiper mySwiper group p-3">
					<div class="swiper-wrapper">
						{#each testimonials as testimonial}
							<div class="swiper-slide">
								<div class="card">
									<div class="card-body p-8">
										<img src={testimonial.image} alt="" class="rounded-modern size-20" />
										<div class="dark:text-dark-500 mt-5 text-lg text-gray-500">
											{#each Array(5) as _, i}
												<i class="ri-star-fill text-yellow-500"></i>
											{/each}
										</div>
										<h6 class="mb-3 mt-3">{testimonial.title}</h6>
										<p class="text-16 dark:text-dark-500 text-gray-500">
											"{testimonial.description}"
										</p>
									</div>
								</div>
							</div>
						{/each}
					</div>
					<div
						class="swiper-button-next after:!font-remix opacity-0 transition duration-300 ease-linear after:!text-2xl after:text-orange-500 after:!content-['\ea6e'] group-hover:opacity-100"
					></div>
					<div
						class="swiper-button-prev after:!font-remix opacity-0 transition duration-300 ease-linear after:!text-2xl after:text-orange-500 after:!content-['\ea64'] group-hover:opacity-100"
					></div>
				</div>
			</Col>
		</Grid>
	</div>
</section>

<!-- Mentors -->
<section class="relative py-14 md:py-24" id="mentors">
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-12 max-w-3xl text-center">
			<h2 class="mb-3 capitalize leading-normal">Meet with our mentors</h2>
			<p class="dark:text-dark-500 text-16 text-gray-500">
				Ask your potential mentor if he or she can make time for an hour meeting with you. You don't
				want to be rushed, and you want for the ask you questions about your goals, etc.
			</p>
		</div>
		<div class="grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-5">
			<div class="card thumbnail relative border-0 bg-transparent shadow-none dark:bg-transparent">
				<div
					class="card-body relative pb-0 before:absolute before:inset-x-0 before:bottom-0 before:h-[80%] before:rounded-t-full before:bg-gray-100 dark:before:bg-gray-900/40"
				>
					<img
						src="assets/images/school/landing/img-06.png"
						alt=""
						class="relative mx-auto max-h-80"
					/>
				</div>
				<div class="card-body text-center">
					<h6 class="text-16 mb-1">John B. Gilliam</h6>
					<p class="dark:text-dark-500 text-gray-500">Senior Instructor</p>
				</div>
			</div>
			<div class="card thumbnail relative border-0 bg-transparent shadow-none dark:bg-transparent">
				<div
					class="card-body relative pb-0 before:absolute before:inset-x-0 before:bottom-0 before:h-[80%] before:rounded-t-full before:bg-gray-100 dark:before:bg-gray-900/40"
				>
					<img
						src="assets/images/school/landing/img-07.png"
						alt=""
						class="relative mx-auto max-h-80"
					/>
				</div>
				<div class="card-body text-center">
					<h6 class="text-16 mb-1">Patricia J. Dillon</h6>
					<p class="dark:text-dark-500 text-gray-500">Junior Instructor</p>
				</div>
			</div>
			<div class="card thumbnail relative border-0 bg-transparent shadow-none dark:bg-transparent">
				<div
					class="card-body relative pb-0 before:absolute before:inset-x-0 before:bottom-0 before:h-[80%] before:rounded-t-full before:bg-gray-100 dark:before:bg-gray-900/40"
				>
					<img
						src="assets/images/school/landing/img-08.png"
						alt=""
						class="relative mx-auto max-h-80"
					/>
				</div>
				<div class="card-body text-center">
					<h6 class="text-16 mb-1">Marian J. Martin</h6>
					<p class="dark:text-dark-500 text-gray-500">Senior Instructor</p>
				</div>
			</div>
			<div class="card thumbnail relative border-0 bg-transparent shadow-none dark:bg-transparent">
				<div
					class="card-body relative pb-0 before:absolute before:inset-x-0 before:bottom-0 before:h-[80%] before:rounded-t-full before:bg-gray-100 dark:before:bg-gray-900/40"
				>
					<img
						src="assets/images/school/landing/img-09.png"
						alt=""
						class="relative mx-auto max-h-80"
					/>
				</div>
				<div class="card-body text-center">
					<h6 class="text-16 mb-1">Theresa W. Berry</h6>
					<p class="dark:text-dark-500 text-gray-500">Senior Instructor</p>
				</div>
			</div>
			<div class="card thumbnail relative border-0 bg-transparent shadow-none dark:bg-transparent">
				<div
					class="card-body relative pb-0 before:absolute before:inset-x-0 before:bottom-0 before:h-[80%] before:rounded-t-full before:bg-gray-100 dark:before:bg-gray-900/40"
				>
					<img
						src="assets/images/school/landing/img-10.png"
						alt=""
						class="relative mx-auto max-h-80"
					/>
				</div>
				<div class="card-body text-center">
					<h6 class="text-16 mb-1">Jacklyn A. Keith</h6>
					<p class="dark:text-dark-500 text-gray-500">Junior Instructor</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Blog -->
<section class="relative py-12 md:pb-24" id="blogs">
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-12 max-w-3xl text-center">
			<h2 class="mb-3 capitalize leading-normal">Latest Blogs</h2>
			<p class="dark:text-dark-500 text-16 text-gray-500">
				The state of blogs now. Short answer: yes. A recent survey found that over 60% of all
				internet users read blogs, while another found that 77% of internet users read blogs daily.
			</p>
		</div>
		<Grid cols={1} class="space-y-6 md:gap-8 md:space-y-0 lg:grid-cols-2">
			<div class="grid grid-cols-12 items-center md:gap-8">
				<Col ols={{ span: 12 }} md={{ span: 4 }}>
					<img src="/assets/images/school/blog/img-01.jpg" alt="" class="rounded-md" />
				</Col>
				<Col cols={{ span: 12 }} md={{ span: 8 }} class="mt-5 md:mt-0">
					<p class="dark:text-dark-500 mb-2 text-gray-500">
						<LucideIcon
							name="Calendar"
							class="inline-block size-4 align-middle ltr:mr-1 rtl:ml-1"
						/> 28 May, 2024
					</p>
					<h5 class="mb-1">
						<a
							href="#!"
							class="link hover:text-primary-500 dark:hover:text-primary-500 text-current dark:text-current"
							>3 Lessons Learned From X</a
						>
					</h5>
					<p class="dark:text-dark-500 mb-3 line-clamp-2 text-gray-500">
						He boosted the self-esteem of Black Americans due to his advocacy for black empowerment
						and self-determination.
					</p>
					<a href="#!" class="link font-medium text-orange-500 hover:text-orange-600">
						Read More
						<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
					</a>
				</Col>
			</div>
			<div class="grid grid-cols-12 items-center md:gap-8">
				<div class="col-span-12 md:col-span-4">
					<img src="assets/images/school/blog/img-02.jpg" alt="" class="rounded-md" />
				</div>
				<Col cols={{ span: 12 }} md={{ span: 8 }} class="mt-5 md:mt-0">
					<p class="dark:text-dark-500 mb-2 text-gray-500">
						<LucideIcon
							name="Calendar"
							class="inline-block size-4 align-middle ltr:mr-1 rtl:ml-1"
						/> 29 May, 2024
					</p>
					<h5 class="mb-1">
						<a
							href="#!"
							class="link hover:text-primary-500 dark:hover:text-primary-500 text-current dark:text-current"
							>Edu-tainment: Fun and Engaging Lessons</a
						>
					</h5>
					<p class="dark:text-dark-500 mb-3 line-clamp-2 text-gray-500">
						He boosted the self-esteem of Black Americans due to his advocacy for black empowerment
						and self-determination.
					</p>
					<a href="#!" class="link font-medium text-orange-500 hover:text-orange-600">
						Read More
						<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
					</a>
				</Col>
			</div>
			<div class="grid grid-cols-12 items-center md:gap-8">
				<div class="col-span-12 md:col-span-4">
					<img src="assets/images/school/blog/img-03.jpg" alt="" class="rounded-md" />
				</div>
				<Col cols={{ span: 12 }} md={{ span: 8 }} class="mt-5 md:mt-0">
					<p class="dark:text-dark-500 mb-2 text-gray-500">
						<LucideIcon
							name="Calendar"
							class="inline-block size-4 align-middle ltr:mr-1 rtl:ml-1"
						/> 22 May, 2024
					</p>
					<h5 class="mb-1">
						<a
							href="#!"
							class="link hover:text-primary-500 dark:hover:text-primary-500 text-current dark:text-current"
							>The Power of Education: Changing Lives</a
						>
					</h5>
					<p class="dark:text-dark-500 mb-3 line-clamp-2 text-gray-500">
						He boosted the self-esteem of Black Americans due to his advocacy for black empowerment
						and self-determination.
					</p>
					<a href="#!" class="link font-medium text-orange-500 hover:text-orange-600">
						Read More
						<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
					</a>
				</Col>
			</div>
			<div class="grid grid-cols-12 items-center md:gap-8">
				<div class="col-span-12 md:col-span-4">
					<img src="assets/images/school/blog/img-04.jpg" alt="" class="rounded-md" />
				</div>
				<Col cols={{ span: 12 }} md={{ span: 8 }} class="mt-5 md:mt-0">
					<p class="dark:text-dark-500 mb-2 text-gray-500">
						<LucideIcon
							name="Calendar"
							class="inline-block size-4 align-middle ltr:mr-1 rtl:ml-1"
						/> 20 May, 2024
					</p>
					<h5 class="mb-1">
						<a
							href="#!"
							class="link hover:text-primary-500 dark:hover:text-primary-500 text-current dark:text-current"
							>Teaching with Purpose: Inspiring Lessons</a
						>
					</h5>
					<p class="dark:text-dark-500 mb-3 line-clamp-2 text-gray-500">
						He boosted the self-esteem of Black Americans due to his advocacy for black empowerment
						and self-determination.
					</p>
					<a href="#!" class="link font-medium text-orange-500 hover:text-orange-600">
						Read More
						<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
					</a>
				</Col>
			</div>
		</Grid>
	</div>
	<!--end container-->
</section>

<!-- Contact us -->
<section class="bg-primary-500 py-14 md:py-24" id="contact-us">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-3xl text-center">
			<h1 class="text-primary-50 mb-5 capitalize leading-normal">
				Come join Us and Achieve your dreams Here at the best School
			</h1>
			<a href="#!" class="btn btn-orange rounded-full">Get Started</a>
		</div>
	</div>
</section>

<!-- Footer -->
<footer>
	<div class="py-14">
		<div class="container mx-auto px-4">
			<div class="grid grid-cols-12 gap-5">
				<div class="col-span-12 md:col-span-6">
					<div class="max-w-lg">
						<a href="/index" title="logo">
							<img src="assets/images/main-logo.png" alt="" class="inline-block h-7 dark:hidden" />
							<img src="assets/images/logo-white.png" alt="" class="hidden h-7 dark:inline-block" />
						</a>
						<p class="dark:text-dark-500 text-16 mb-6 mt-4 text-gray-500">
							They constitute one of the fundamental components of learning, alongside objectives,
							methodology, and assessment. knowledge, procedures, skills, attitudes, abilities, and
							values necessary to achieve the curricular goals outlined in educational.
						</p>
						<div class="flex items-center gap-5">
							<a
								href="#!"
								title="facebook"
								class="after:bg-primary-500/10 text-primary-500 relative flex size-10 items-center justify-center transition duration-300 ease-linear after:absolute after:inset-0 after:-rotate-45 after:rounded-lg hover:-translate-y-1"
								><LucideIcon name="Facebook" class="relative z-10 size-5" /></a
							>
							<a
								href="#!"
								title="dribbble"
								class="relative flex size-10 items-center justify-center text-pink-500 transition duration-300 ease-linear after:absolute after:inset-0 after:-rotate-45 after:rounded-lg after:bg-pink-500/10 hover:-translate-y-1"
								><LucideIcon name="Dribbble" class="relative z-10 size-5" /></a
							>
							<a
								href="#!"
								title="twitter"
								class="relative flex size-10 items-center justify-center text-sky-500 transition duration-300 ease-linear after:absolute after:inset-0 after:-rotate-45 after:rounded-lg after:bg-sky-500/10 hover:-translate-y-1"
								><LucideIcon name="Twitter" class="relative z-10 size-5" /></a
							>
							<a
								href="#!"
								title="youtube"
								class="relative flex size-10 items-center justify-center text-red-500 transition duration-300 ease-linear after:absolute after:inset-0 after:-rotate-45 after:rounded-lg after:bg-red-500/10 hover:-translate-y-1"
								><LucideIcon name="Youtube" class="relative z-10 size-5" /></a
							>
						</div>
					</div>
				</div>
				<!--end col-->
				<div class="col-span-12 sm:col-span-4 md:col-span-2">
					<h6 class="text-17 mb-4">About Us</h6>
					<ul class="text-16 space-y-5">
						<li><a href="#!" class="link link-orange">Pricing</a></li>
						<li><a href="#!" class="link link-orange">NewsLatter</a></li>
						<li><a href="#!" class="link link-orange">About Us</a></li>
						<li><a href="#!" class="link link-orange">Help Center</a></li>
						<li><a href="#!" class="link link-orange">Dashboards</a></li>
					</ul>
				</div>
				<div class="col-span-12 sm:col-span-4 md:col-span-2">
					<h6 class="text-17 mb-4">Students</h6>
					<ul class="text-16 space-y-5">
						<li><a href="#!" class="link link-orange">List View</a></li>
						<li><a href="#!" class="link link-orange">Profile</a></li>
						<li><a href="#!" class="link link-orange">Attendance</a></li>
					</ul>
				</div>
				<div class="col-span-12 sm:col-span-4 md:col-span-2">
					<h6 class="text-17 mb-4">Our Support</h6>
					<ul class="text-16 space-y-5">
						<li><a href="#!" class="link link-orange">Contact Us</a></li>
						<li><a href="#!" class="link link-orange">Account</a></li>
						<li><a href="#!" class="link link-orange">Feedback</a></li>
						<li><a href="#!" class="link link-orange">Licenses</a></li>
						<li><a href="#!" class="link link-orange">FAQ's</a></li>
						<li><a href="#!" class="link link-orange">Privacy Policy</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="container mx-auto px-4">
		<div
			class="dark:text-dark-500 dark:border-dark-800 text-16 border-t border-dashed border-gray-200 py-6 text-center text-gray-500"
		>
			<p>
				&copy; <span>{year}</span> Domiex. Crafted & Design by
				<a href="#!" class="link link-orange font-semibold">SRBThemes</a>
			</p>
		</div>
	</div>
</footer>

<DarkMode buttonColor="bg-orange-500" />
