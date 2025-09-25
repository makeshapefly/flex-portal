<script lang="ts">
	//@ts-nocheck
	import { onMount } from 'svelte';
	import { layoutStore, setLayoutTheme } from '$lib/stores/layout';
	import { Moon, Sun } from 'lucide-svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import DoctorCard from './DoctorCard.svelte';
	import AOS from 'aos';
	import 'aos/dist/aos.css';
	import Swiper from 'swiper';
	import 'swiper/css';
	import { Pagination } from 'swiper/modules';
	import 'swiper/css/pagination';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import { doctors, specialties, testimonials } from './doctor-layout-data';

	let isSticky = false;
	let isMenuOpen = false;
	let activeTab = 0;
	let year = new Date().getFullYear();
	let recoveredPatients = 263;
	let satisfactionRate = 92;
	let expertDoctors = 102;
	let awardWinners = 100;

	// Function to animate the counter
	function animatedCounter(start: number, end: number, duration: number) {
		let current = start;
		let increment = (end - start) / (duration / 10); // Increment every 10 ms
		const interval = setInterval(() => {
			if (current < end) {
				current += increment;
				if (current >= end) {
					current = end;
					clearInterval(interval);
				}
			}
		}, 10);
		return current;
	}

	const handleScroll = () => {
		isSticky = window.scrollY > 0;
	};

	onMount(() => {
		const swiper = new Swiper('.mySwiper', {
			modules: [Pagination],
			slidesPerView: 1,
			spaceBetween: 30,
			centeredSlides: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
					spaceBetween: 30
				},
				1199: {
					slidesPerView: 3,
					spaceBetween: 30
				},
				1400: {
					slidesPerView: 4,
					spaceBetween: 30
				}
			}
		});
		AOS.init();
		recoveredPatients = animatedCounter(263, 500, 1000);
		satisfactionRate = animatedCounter(92, 100, 1000);
		expertDoctors = animatedCounter(102, 500, 1000);
		awardWinners = animatedCounter(100, 500, 1000);

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<!----------Start Menu------------>
<div>
	<header
		class="landing-navbar dark:[&.scroll-sticky]:shadow-dark-850 dark:[&.scroll-sticky]:bg-dark-900 top-0 h-20 [&.scroll-sticky]:top-0 [&.scroll-sticky]:bg-white [&.scroll-sticky]:shadow-lg [&.scroll-sticky]:shadow-gray-200/50"
		class:scroll-sticky={isSticky}
	>
		<div class="container mx-auto flex items-center gap-5 px-4 xl:px-20">
			<a href="/index" title="Logo">
				<img src="/assets/images/main-logo.png" alt="" class="inline-block h-7 dark:hidden" />
				<img src="/assets/images/logo-white.png" alt="" class="hidden h-7 dark:inline-block" />
			</a>
			<div
				class={`navbar-collapase ltr:ml-auto rtl:mr-auto ${!isMenuOpen ? 'hidden xl:flex' : ''}`}
			>
				<div
					class="*:text-16 flex flex-col *:inline-block *:py-3 *:font-medium *:tracking-wide xl:flex-row xl:items-center xl:py-0 xl:*:px-3"
				>
					<a
						href="#home"
						title="home"
						on:click={() => (activeTab = 1)}
						class:active={activeTab === 1}
						class="leading-normal transition duration-300 ease-linear hover:text-sky-500 [&.active]:text-sky-500"
						>Home</a
					>
					<a
						href="#about-us"
						title="about-us"
						on:click={() => (activeTab = 2)}
						class:active={activeTab === 2}
						class="leading-normal transition duration-300 ease-linear hover:text-sky-500 [&.active]:text-sky-500"
						>About Us</a
					>
					<a
						href="#services"
						title="services"
						on:click={() => (activeTab = 3)}
						class:active={activeTab === 3}
						class="leading-normal transition duration-300 ease-linear hover:text-sky-500 [&.active]:text-sky-500"
						>Our Service</a
					>
					<a
						href="#doctors"
						title="doctors"
						on:click={() => (activeTab = 4)}
						class:active={activeTab === 4}
						class="leading-normal transition duration-300 ease-linear hover:text-sky-500 [&.active]:text-sky-500"
						>Our Doctors</a
					>

					<a
						href="#feedback"
						title="feedback"
						on:click={() => (activeTab = 5)}
						class:active={activeTab === 5}
						class="leading-normal transition duration-300 ease-linear hover:text-sky-500 [&.active]:text-sky-500"
						>Feedback</a
					>
				</div>
			</div>

			<button
				title="menu toggle"
				on:click={() => (isMenuOpen = !isMenuOpen)}
				type="button"
				class="navbar-toggle btn btn-sub-sky btn-icon rounded-full xl:!hidden ltr:ml-auto xl:ltr:ml-0 rtl:mr-auto xl:rtl:mr-0"
				aria-label="menu toggle"
			>
				<i class={isMenuOpen ? 'ri-close-line' : 'ri-menu-2-line'}></i>
			</button>
			<div class="flex gap-2">
				<button
					class="btn btn-sub-gray btn-icon rounded-full"
					title="light & dark btn"
					on:click={() => setLayoutTheme($layoutStore.layoutTheme === 'light' ? 'dark' : 'light')}
				>
					{#if $layoutStore.layoutTheme === 'light'}
						<Sun class="size-4" />
					{:else}
						<Moon class="size-4" />
					{/if}
				</button>
				<button type="button" class="btn btn-sky"
					><span class="hidden lg:inline-block ltr:mr-1 rtl:ml-1">Let's Talk</span>
					<LucideIcon name="Headset" class="inline-block size-4" /></button
				>
			</div>
		</div>
	</header>
</div>
<!----------End Menu------------>

<!-- Home -->
<section
	class="relative overflow-hidden bg-gradient-to-b from-sky-500/15 to-sky-500/10 pt-44 pb-0"
	id="home"
>
	<div class="absolute inset-0 opacity-75">
		<svg class="h-full w-full object-cover" preserveAspectRatio="none" viewBox="0 0 1440 560">
			<g mask="url(&quot;#SvgjsMask1012&quot;)" fill="none">
				<path
					class="stroke-sky-200/30 dark:stroke-sky-500/5"
					d="M111.42 308.12L176.38 345.62L176.38 420.62L111.42 458.12L46.47 420.62L46.47 345.62zM176.38 195.62L241.33 233.12L241.33 308.12L176.38 345.62L111.42 308.12L111.42 233.12zM241.33 308.12L306.28 345.62L306.28 420.62L241.33 458.12L176.38 420.62L176.38 345.62zM241.33 533.12L306.28 570.62L306.28 645.62L241.33 683.12L176.38 645.62L176.38 570.62zM306.28 195.62L371.24 233.12L371.24 308.12L306.28 345.62L241.33 308.12L241.33 233.12zM371.24 533.12L436.19 570.62L436.19 645.62L371.24 683.12L306.28 645.62L306.28 570.62zM501.15 308.12L566.1 345.62L566.1 420.62L501.15 458.12L436.19 420.62L436.19 345.62zM566.1 195.62L631.05 233.12L631.05 308.12L566.1 345.62L501.15 308.12L501.15 233.12zM631.05 533.12L696.01 570.62L696.01 645.62L631.05 683.12L566.1 645.62L566.1 570.62zM696.01 -29.38L760.96 8.12L760.96 83.12L696.01 120.62L631.05 83.12L631.05 8.12zM696.01 195.62L760.96 233.12L760.96 308.12L696.01 345.62L631.05 308.12L631.05 233.12zM696.01 420.62L760.96 458.12L760.96 533.12L696.01 570.62L631.05 533.12L631.05 458.12zM825.91 -29.38L890.87 8.12L890.87 83.12L825.91 120.62L760.96 83.12L760.96 8.12zM825.91 195.62L890.87 233.12L890.87 308.12L825.91 345.62L760.96 308.12L760.96 233.12zM955.82 195.62L1020.78 233.12L1020.78 308.12L955.82 345.62L890.87 308.12L890.87 233.12zM1085.73 -29.38L1150.68 8.12L1150.68 83.12L1085.73 120.62L1020.78 83.12L1020.78 8.12zM1150.68 533.12L1215.64 570.62L1215.64 645.62L1150.68 683.12L1085.73 645.62L1085.73 570.62zM1280.59 308.12L1345.54 345.62L1345.54 420.62L1280.59 458.12L1215.64 420.62L1215.64 345.62zM1345.55 -29.38L1410.5 8.12L1410.5 83.12L1345.55 120.62L1280.59 83.12L1280.59 8.12zM1410.5 83.12L1475.45 120.62L1475.45 195.62L1410.5 233.12L1345.55 195.62L1345.55 120.62zM1475.45 195.62L1540.41 233.12L1540.41 308.12L1475.45 345.62L1410.5 308.12L1410.5 233.12zM1475.45 420.62L1540.41 458.12L1540.41 533.12L1475.45 570.62L1410.5 533.12L1410.5 458.12z"
					stroke="rgba(224, 240, 252, 1)"
					stroke-width="2"
				></path>
				<path
					class="fill-sky-200/0"
					d="M103.92 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM168.88 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM168.88 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM103.92 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM38.97 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM38.97 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM168.88 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM233.83 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM233.83 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM103.92 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM298.78 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM298.78 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM233.83 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM233.83 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM298.78 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM298.78 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM233.83 683.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM168.88 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM168.88 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM298.78 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM363.74 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM363.74 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM363.74 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM428.69 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM428.69 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM363.74 683.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM493.65 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM558.6 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM558.6 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM493.65 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM428.69 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM428.69 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM558.6 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM493.65 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 683.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM558.6 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM558.6 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 -29.38 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 120.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.41 -29.38 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.37 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.37 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.41 120.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.41 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.37 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.37 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.41 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM948.32 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.28 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.28 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM948.32 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.23 -29.38 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.18 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.18 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.23 120.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.28 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.28 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.18 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.14 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.14 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.18 683.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.23 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.23 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.09 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.04 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.04 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.09 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.14 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.14 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.05 -29.38 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.05 120.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.09 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.09 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1467.95 120.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1467.95 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.05 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1532.91 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1532.91 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1467.95 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1467.95 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1532.91 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1532.91 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1467.95 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0z"
				></path>
				<path
					class="stroke-sky-200/20 dark:stroke-sky-500/5"
					d="M19.38 -45.28L62.68 -20.28L62.68 29.72L19.38 54.72L-23.92 29.72L-23.92 -20.28zM62.68 179.72L105.98 204.72L105.98 254.72L62.68 279.72L19.38 254.72L19.38 204.72zM19.38 254.72L62.68 279.72L62.68 329.72L19.38 354.72L-23.92 329.72L-23.92 279.72zM62.68 329.72L105.98 354.72L105.98 404.72L62.68 429.72L19.38 404.72L19.38 354.72zM19.38 404.72L62.68 429.72L62.68 479.72L19.38 504.72L-23.92 479.72L-23.92 429.72zM62.68 479.72L105.98 504.72L105.98 554.72L62.68 579.72L19.38 554.72L19.38 504.72zM149.29 479.72L192.59 504.72L192.59 554.72L149.29 579.72L105.98 554.72L105.98 504.72zM192.59 104.72L235.89 129.72L235.89 179.72L192.59 204.72L149.29 179.72L149.29 129.72zM235.89 179.72L279.19 204.72L279.19 254.72L235.89 279.72L192.59 254.72L192.59 204.72zM192.59 254.72L235.89 279.72L235.89 329.72L192.59 354.72L149.29 329.72L149.29 279.72zM409.1 179.72L452.41 204.72L452.41 254.72L409.1 279.72L365.8 254.72L365.8 204.72zM409.1 329.72L452.41 354.72L452.41 404.72L409.1 429.72L365.8 404.72L365.8 354.72zM539.01 -45.28L582.31 -20.28L582.31 29.72L539.01 54.72L495.71 29.72L495.71 -20.28zM582.31 179.72L625.62 204.72L625.62 254.72L582.31 279.72L539.01 254.72L539.01 204.72zM539.01 254.72L582.31 279.72L582.31 329.72L539.01 354.72L495.71 329.72L495.71 279.72zM539.01 404.72L582.31 429.72L582.31 479.72L539.01 504.72L495.71 479.72L495.71 429.72zM668.92 329.72L712.22 354.72L712.22 404.72L668.92 429.72L625.62 404.72L625.62 354.72zM755.52 179.72L798.83 204.72L798.83 254.72L755.52 279.72L712.22 254.72L712.22 204.72zM842.13 29.72L885.43 54.72L885.43 104.72L842.13 129.72L798.83 104.72L798.83 54.72zM798.83 104.72L842.13 129.72L842.13 179.72L798.83 204.72L755.52 179.72L755.52 129.72zM885.43 104.72L928.73 129.72L928.73 179.72L885.43 204.72L842.13 179.72L842.13 129.72zM885.43 404.72L928.73 429.72L928.73 479.72L885.43 504.72L842.13 479.72L842.13 429.72zM972.04 254.72L1015.34 279.72L1015.34 329.72L972.04 354.72L928.73 329.72L928.73 279.72zM972.04 404.72L1015.34 429.72L1015.34 479.72L972.04 504.72L928.73 479.72L928.73 429.72zM1101.94 29.72L1145.25 54.72L1145.25 104.72L1101.94 129.72L1058.64 104.72L1058.64 54.72zM1058.64 104.72L1101.94 129.72L1101.94 179.72L1058.64 204.72L1015.34 179.72L1015.34 129.72zM1145.25 -45.28L1188.55 -20.28L1188.55 29.72L1145.25 54.72L1101.94 29.72L1101.94 -20.28zM1145.25 104.72L1188.55 129.72L1188.55 179.72L1145.25 204.72L1101.94 179.72L1101.94 129.72zM1275.15 479.72L1318.46 504.72L1318.46 554.72L1275.15 579.72L1231.85 554.72L1231.85 504.72zM1318.46 404.72L1361.76 429.72L1361.76 479.72L1318.46 504.72L1275.15 479.72L1275.15 429.72zM1361.76 479.72L1405.06 504.72L1405.06 554.72L1361.76 579.72L1318.46 554.72L1318.46 504.72z"
					stroke="rgba(232, 244, 252, 1)"
					stroke-width="2"
				></path>
			</g>
			<defs>
				<mask id="SvgjsMask1012">
					<rect class="h-full w-full object-cover" fill="#ffffff"></rect>
				</mask>
			</defs>
		</svg>
	</div>
	<div
		class="clip-path-plus absolute top-64 hidden size-28 animate-pulse bg-sky-500/10 lg:inline-block ltr:right-64 rtl:left-64"
	></div>
	<div
		class="clip-path-plus absolute bottom-1/3 hidden size-28 rotate-45 bg-white/50 lg:inline-block ltr:left-1/2 rtl:right-1/2 dark:bg-white/10"
	></div>
	<div class="relative container mx-auto px-4 xl:px-20">
		<div class="grid grid-cols-12 items-center gap-4 lg:gap-x-16">
			<div class="col-span-12 xl:col-span-6" data-aos="fade-up" data-aos-duration="2000">
				<div class="mb-8">
					<p
						class="relative mb-2 text-lg font-medium text-sky-500 before:absolute before:top-1/2 before:h-[2px] before:w-8 before:-translate-y-1/2 before:bg-sky-300 ltr:pl-10 ltr:before:left-0 rtl:pr-10 rtl:before:right-0"
					>
						Simplifying health care of you
					</p>
					<h1
						class="mb-4 text-4xl capitalize md:text-5xl md:leading-normal xl:text-6xl xl:leading-normal"
					>
						Free Health <span
							class="font-roboto-slab text-sky-500 underline decoration-sky-300 decoration-dashed decoration-2 underline-offset-4"
							>Checkup</span
						> Ensure A Better Life
					</h1>
					<p class="dark:text-dark-500 mb-8 text-lg text-gray-500">
						Doing a regular body check-up can help doctors diagnose a disease before it poses high
						risk. Reduces the risk of complication during treatment – once you are diagnosed with a
						health condition at an early stage.
					</p>
					<div class="flex flex-wrap items-center gap-3">
						<button type="button" class="btn btn-sky py-3">
							Make An Appointment
							<LucideIcon name="MoveRight" class="ml-1 inline-block size-4" />
						</button>
						<button type="button" class="btn btn-outline-sky py-3"
							><LucideIcon name="Video" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Watch Intro</button
						>
					</div>
				</div>
			</div>
			<div class="col-span-12 xl:col-span-5 xl:col-start-8">
				<div class="relative">
					<div
						class="dark:bg-dark-850 absolute bottom-72 z-10 hidden items-center gap-3 rounded-md bg-white p-3 lg:flex ltr:right-0 xl:ltr:-right-32 rtl:left-0 xl:rtl:-left-32"
					>
						<div
							class="flex size-12 items-center justify-center rounded-full bg-sky-500 text-sky-100"
						>
							<LucideIcon name="Phone" class="size-5"></LucideIcon>
						</div>
						<div>
							<p class="dark:text-dark-500 mb-1 text-gray-500">24/7 Hours Service</p>
							<h6>+251 (01234 5678 98)</h6>
						</div>
					</div>
					<img
						src="assets/images/hospital/landing/main-home.png"
						alt=""
						class="relative -bottom-12 xl:scale-[1.3]"
					/>
				</div>
			</div>
		</div>
		<div
			class="card text-primary-50 relative bottom-2 border-none bg-sky-500 shadow-sky-200/50 2xl:bottom-10 dark:bg-sky-500"
		>
			<div class="p-8">
				<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
					<div class="text-center">
						<h4 class="mb-2">
							<span>{Math.round(recoveredPatients)}k+</span>
						</h4>
						<p class="text-primary-200 text-16">Recovered Patients</p>
					</div>

					<div class="text-center">
						<h4 class="mb-2">
							<span>{Math.round(satisfactionRate)}%</span>
						</h4>
						<p class="text-primary-200 text-16">Satisfaction Rate</p>
					</div>

					<div class="text-center">
						<h4 class="mb-2">
							<span>{Math.round(expertDoctors)}+</span>
						</h4>
						<p class="text-primary-200 text-16">Experts Doctors</p>
					</div>

					<div class="text-center">
						<h4 class="mb-2">
							<span>{Math.round(awardWinners)}+</span>
						</h4>
						<p class="text-primary-200 text-16">Award Winner</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="pt-14">
	<div class="container mx-auto px-4 xl:px-20">
		<div class="gap-x-space grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
			<a
				href="#!"
				class="card block border-sky-200 bg-sky-100 text-center dark:border-sky-500/20 dark:bg-sky-500/10"
			>
				<CardBody>
					<div
						class="dark:bg-dark-850 mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-white text-sky-500"
					>
						<LucideIcon name="Microscope" class="size-6 fill-sky-500/10" />
					</div>
					<h6>Health Test</h6>
				</CardBody>
			</a>
			<a
				href="#!"
				class="card block border-sky-200 bg-sky-100 text-center dark:border-sky-500/20 dark:bg-sky-500/10"
			>
				<div class="card-body">
					<div
						class="dark:bg-dark-850 mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-white text-sky-500"
					>
						<LucideIcon name="HeartPulse" class="size-6 fill-sky-500/10" />
					</div>
					<h6>Bone and Joint Health</h6>
				</div>
			</a>
			<a
				href="#!"
				class="card block border-sky-200 bg-sky-100 text-center dark:border-sky-500/20 dark:bg-sky-500/10"
			>
				<div class="card-body">
					<div
						class="dark:bg-dark-850 mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-white text-sky-500"
					>
						<LucideIcon name="Brain" class="size-6 fill-sky-500/10" />
					</div>
					<h6>Brain Surgery</h6>
				</div>
			</a>
			<a
				href="#!"
				class="card block border-sky-200 bg-sky-100 text-center dark:border-sky-500/20 dark:bg-sky-500/10"
			>
				<div class="card-body">
					<div
						class="dark:bg-dark-850 mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-white text-sky-500"
					>
						<LucideIcon name="Siren" class="size-6 fill-sky-500/10" />
					</div>
					<h6>Imaging Services</h6>
				</div>
			</a>
			<a
				href="#!"
				class="card block border-sky-200 bg-sky-100 text-center dark:border-sky-500/20 dark:bg-sky-500/10"
			>
				<div class="card-body">
					<div
						class="dark:bg-dark-850 mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-white text-sky-500"
					>
						<LucideIcon name="Fingerprint" class="size-6 fill-sky-500/10" />
					</div>
					<h6>Genetic Testing</h6>
				</div>
			</a>
			<a
				href="#!"
				class="card block border-sky-200 bg-sky-100 text-center dark:border-sky-500/20 dark:bg-sky-500/10"
			>
				<div class="card-body">
					<div
						class="dark:bg-dark-850 mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-white text-sky-500"
					>
						<LucideIcon name="Syringe" class="size-6 fill-sky-500/10" />
					</div>
					<h6>Laboratory Testing</h6>
				</div>
			</a>
		</div>
	</div>
</section>

<!-- About us -->
<section class="relative py-14 md:py-28" id="about-us">
	<div class="container mx-auto px-4 xl:px-20">
		<div class="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
			<div>
				<div
					class="thumbnail relative before:absolute before:-bottom-4 before:size-full before:border before:border-sky-300 after:absolute after:-bottom-5 after:size-full after:border after:border-sky-300 ltr:before:-right-4 ltr:after:-right-5 rtl:before:-left-4 rtl:after:-left-5"
				>
					<img
						src="/assets/images/hospital/landing/about.jpg"
						alt=""
						class="relative z-10 rounded-xl"
					/>
				</div>
			</div>
			<div data-aos="fade-up" data-aos-duration="2000">
				<h1 class="mb-2 text-4xl leading-normal capitalize md:text-5xl xl:text-4xl">
					Professional Doctors with <span
						class="font-roboto-slab text-sky-500 underline decoration-sky-300 decoration-dashed decoration-2 underline-offset-4"
						>15+ Years</span
					> of Experience
				</h1>
				<p class="dark:text-dark-500 text-16 mb-5 text-gray-500">
					Dr Shopia Mia net worth has grown 68% this year, from $2.2 billion (₹18,295 crore) in
					2024, making him the richest doctor in USA. Comparative data indicates Dr Shopia is also
					the fastest-growing non-resident on the list.
				</p>
				<div class="fs-16 mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
					<div class="relative flex gap-3">
						<LucideIcon name="CalendarPlus" class="mt-1 size-5 shrink-0 text-sky-500" />
						<div>
							<h6 class="mb-1">Make an Appointment</h6>
							<p class="dark:text-dark-500 text-gray-500">
								Schedule with your Favorite doctor anytime.
							</p>
						</div>
					</div>
					<div class="relative flex gap-3">
						<LucideIcon name="ShieldCheck" class="mt-1 size-5 shrink-0 text-sky-500" />
						<div>
							<h6 class="mb-1">Health Guarantee Forever</h6>
							<p class="dark:text-dark-500 text-gray-500">
								We stand behind our puppies with a two year genetic health guarantee.
							</p>
						</div>
					</div>
					<div class="relative flex gap-3">
						<LucideIcon name="Pill" class="mt-1 size-5 shrink-0 text-sky-500" />
						<div>
							<h6 class="mb-1">Pharmacy Marketplace</h6>
							<p class="dark:text-dark-500 text-gray-500">
								Online pharmacy laws in India are still in nascent stage.
							</p>
						</div>
					</div>
					<div class="relative flex gap-3">
						<LucideIcon name="Headset" class="mt-1 size-5 shrink-0 text-sky-500" />
						<div>
							<h6 class="mb-1">24/7 Emergency Service</h6>
							<p class="dark:text-dark-500 text-gray-500">
								Expert team of doctors can handle any medical emergency.
							</p>
						</div>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<button type="button" class="btn btn-sky py-3">
						Learn More
						<LucideIcon name="MoveRight" class="ml-1 inline-block size-4 rtl:hidden" />
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Service -->
<section class="dark:bg-dark-900/30 relative bg-gray-50 py-14 md:py-28" id="services">
	<div class="container mx-auto px-4 xl:px-20">
		<div class="mx-auto mb-12 max-w-2xl text-center">
			<h2 class="mb-2 text-4xl leading-normal capitalize md:text-5xl">
				Service for <span
					class="font-roboto-slab text-sky-500 underline decoration-sky-300 decoration-dashed decoration-2 underline-offset-4"
					>your Health</span
				>
			</h2>
			<p class="dark:text-dark-500 text-16 text-gray-500">
				Here is the complete slideshow for introducing our services. You can also use it for the
				value section.
			</p>
		</div>
		<div class="gap-space grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{#each specialties as item}
				<div
					class="dark:hover:bg-dark-950 dark:hover:shadow-dark-850 rounded-lg p-5 transition duration-300 ease-linear hover:-translate-y-2 hover:bg-white hover:shadow-lg hover:shadow-slate-200/75"
				>
					<div class={`flex size-12 items-center justify-center rounded-md ${item.bgColor}`}>
						<LucideIcon name={item.icon} class={item.iconColor} />
					</div>
					<h5 class="mt-4 mb-2">{item.title}</h5>
					<p class="dark:text-dark-500 text-16 mb-3 text-gray-500">{item.description}</p>
					<a href="#!" class="link link-sky font-medium">
						Read More
						<LucideIcon name="MoveRight" class="ml-1 inline-block size-4 rtl:hidden" />
						<LucideIcon name="MoveLeft" class="mr-1 hidden size-4 rtl:inline-block" />
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Doctors -->
<section class="relative py-14 md:py-28" id="doctors">
	<div class="container mx-auto px-4 xl:px-20">
		<div class="mx-auto mb-12 max-w-2xl text-center">
			<h2 class="mb-2 text-4xl leading-normal capitalize md:text-5xl">
				Meet our <span
					class="font-roboto-slab text-sky-500 underline decoration-sky-300 decoration-dashed decoration-2 underline-offset-4"
					>Doctors</span
				>
			</h2>
			<p class="dark:text-dark-500 text-16 text-gray-500">
				Discover the expertise and compassion of our dedicated doctors at Meet. Your health is in
				caring hands with us.
			</p>
		</div>
		<div class="gap-x-space grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each doctors as doctor}
				<DoctorCard {...doctor} />
			{/each}
		</div>
		<div class="mt-5 text-center">
			<button type="button" class="btn btn-sky">
				View All Doctors
				<LucideIcon name="MoveRight" class="ml-1 inline-block size-4" />
			</button>
		</div>
	</div>
</section>
<!--end doctors-->

<!-- FeedBack -->
<section class="dark:bg-dark-900/30 relative bg-slate-50 py-14 md:py-28" id="feedback">
	<div class="container mx-auto px-4 xl:px-20">
		<div class="mx-auto mb-12 max-w-4xl text-center">
			<h2 class="mb-2 text-4xl leading-normal capitalize md:text-5xl">
				Check what our <span
					class="font-roboto-slab text-sky-500 underline decoration-sky-300 decoration-dashed decoration-2 underline-offset-4"
					>Clients are saying</span
				>
			</h2>
			<p class="dark:text-dark-500 text-16 text-gray-500">
				Discover the expertise and compassion of our dedicated doctors at Meet. Your health is in
				caring hands with us.
			</p>
		</div>
	</div>
	<!-- Swiper -->
	<div class="swiper mySwiper py-2" dir="ltr">
		<div class="swiper-wrapper py-6">
			{#each testimonials as testimonial}
				<div class="swiper-slide card relative mb-0 border-0 p-6">
					<!-- Quote Icon (You can replace with lucide-svelte if needed) -->
					<LucideIcon
						name="Quote"
						class="absolute top-5 size-12 fill-sky-500/15 stroke-1 text-sky-400 ltr:right-5 rtl:left-5"
					/>

					<div class="flex gap-4">
						<div class="flex size-12 shrink-0 items-center gap-2 overflow-hidden rounded-md">
							<img src={testimonial.avatar} alt={testimonial.name} />
						</div>
						<div class="grow">
							<h6 class="mb-1">{testimonial.name}</h6>
							<p class="dark:text-dark-500 mb-4 text-gray-500">{testimonial.location}</p>
							<p class="text-17"><q>{testimonial.message}</q></p>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="swiper-pagination"></div>
	</div>
</section>

<section class="relative pt-14 md:pt-28">
	<div class="container mx-auto px-4 xl:px-20">
		<div class="mx-auto mb-12 max-w-2xl text-center">
			<h2 class="mb-2 text-4xl leading-normal capitalize md:text-5xl">
				Get Your <span
					class="font-roboto-slab text-sky-500 underline decoration-sky-300 decoration-dashed decoration-2 underline-offset-4"
					>Appointment</span
				>
			</h2>
			<p class="text-16 dark:text-dark-500 text-gray-500">
				Discover the expertise and compassion of our dedicated doctors at Meet. Your health is in
				caring hands with us.
			</p>
		</div>
		<div class="grid grid-cols-1 items-center gap-x-20 lg:grid-cols-2">
			<div>
				<form>
					<div class="gap-space grid grid-cols-12 items-center">
						<div class="col-span-12 md:col-span-6">
							<input
								type="text"
								class="form-input h-12 rounded-none border-x-0 border-t-0 focus:border-b-sky-500 dark:bg-transparent"
								placeholder="Your name"
								required
							/>
						</div>
						<div class="col-span-12 md:col-span-6">
							<input
								type="number"
								class="form-input h-12 rounded-none border-x-0 border-t-0 focus:border-b-sky-500 dark:bg-transparent"
								placeholder="Your phone number"
								required
							/>
						</div>
						<div class="col-span-12 md:col-span-6">
							<input
								type="email"
								class="form-input h-12 rounded-none border-x-0 border-t-0 focus:border-b-sky-500 dark:bg-transparent"
								placeholder="Your email address"
								required
							/>
						</div>
						<div class="col-span-12 md:col-span-6">
							<input
								type="date"
								class="form-input h-12 rounded-none border-x-0 border-t-0 focus:border-b-sky-500 dark:bg-transparent"
								placeholder="Select date"
								required
							/>
						</div>
						<div class="col-span-12">
							<input
								type="text"
								class="form-input h-12 rounded-none border-x-0 border-t-0 focus:border-b-sky-500 dark:bg-transparent"
								placeholder="Doctor name"
								required
							/>
						</div>
						<div class="col-span-12">
							<textarea
								type="text"
								class="form-input h-auto rounded-none border-x-0 border-t-0 focus:border-b-sky-500 dark:bg-transparent"
								rows="3"
								placeholder="Notes"
								required
							></textarea>
						</div>
						<div class="col-span-12 md:col-span-6">
							<p class="text-gray-500">
								Please Call Us: <a href="#!" class="font-medium text-sky-500">+241 01234 567 89</a>
							</p>
						</div>
						<div class="col-span-12 text-right md:col-span-6">
							<button type="submit" class="btn btn-sky">Book Appointment</button>
						</div>
					</div>
				</form>
			</div>
			<div>
				<div class="relative mt-8 lg:mt-0 lg:ml-12">
					<div
						class="absolute bottom-1/2 left-10 size-52 bg-sky-500/15 blur-3xl sm:left-40 md:size-96 lg:left-0 xl:left-42 2xl:left-48"
					></div>
					<img src="/assets/images/hospital/landing/contact.png" alt="" class="relative mx-auto" />
				</div>
			</div>
		</div>
		<div class="relative -mb-20 overflow-hidden rounded-md bg-sky-500 p-12 text-sky-50">
			<div class="absolute inset-0">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					xmlns:svgjs="http://svgjs.dev/svgjs"
					width="1440"
					height="560"
					preserveAspectRatio="none"
					viewBox="0 0 1440 560"
				>
					<g mask="url(&quot;#SvgjsMask1007&quot;)" fill="none">
						<path
							class="stroke-sky-300 opacity-10"
							d="M111.42 308.12L176.38 345.62L176.38 420.62L111.42 458.12L46.47 420.62L46.47 345.62zM176.38 195.62L241.33 233.12L241.33 308.12L176.38 345.62L111.42 308.12L111.42 233.12zM241.33 308.12L306.28 345.62L306.28 420.62L241.33 458.12L176.38 420.62L176.38 345.62zM241.33 533.12L306.28 570.62L306.28 645.62L241.33 683.12L176.38 645.62L176.38 570.62zM306.28 195.62L371.24 233.12L371.24 308.12L306.28 345.62L241.33 308.12L241.33 233.12zM371.24 533.12L436.19 570.62L436.19 645.62L371.24 683.12L306.28 645.62L306.28 570.62zM501.15 308.12L566.1 345.62L566.1 420.62L501.15 458.12L436.19 420.62L436.19 345.62zM566.1 195.62L631.05 233.12L631.05 308.12L566.1 345.62L501.15 308.12L501.15 233.12zM631.05 533.12L696.01 570.62L696.01 645.62L631.05 683.12L566.1 645.62L566.1 570.62zM696.01 -29.38L760.96 8.12L760.96 83.12L696.01 120.62L631.05 83.12L631.05 8.12zM696.01 195.62L760.96 233.12L760.96 308.12L696.01 345.62L631.05 308.12L631.05 233.12zM696.01 420.62L760.96 458.12L760.96 533.12L696.01 570.62L631.05 533.12L631.05 458.12zM825.91 -29.38L890.87 8.12L890.87 83.12L825.91 120.62L760.96 83.12L760.96 8.12zM825.91 195.62L890.87 233.12L890.87 308.12L825.91 345.62L760.96 308.12L760.96 233.12zM955.82 195.62L1020.78 233.12L1020.78 308.12L955.82 345.62L890.87 308.12L890.87 233.12zM1085.73 -29.38L1150.68 8.12L1150.68 83.12L1085.73 120.62L1020.78 83.12L1020.78 8.12zM1150.68 533.12L1215.64 570.62L1215.64 645.62L1150.68 683.12L1085.73 645.62L1085.73 570.62zM1280.59 308.12L1345.54 345.62L1345.54 420.62L1280.59 458.12L1215.64 420.62L1215.64 345.62zM1345.55 -29.38L1410.5 8.12L1410.5 83.12L1345.55 120.62L1280.59 83.12L1280.59 8.12zM1410.5 83.12L1475.45 120.62L1475.45 195.62L1410.5 233.12L1345.55 195.62L1345.55 120.62zM1475.45 195.62L1540.41 233.12L1540.41 308.12L1475.45 345.62L1410.5 308.12L1410.5 233.12zM1475.45 420.62L1540.41 458.12L1540.41 533.12L1475.45 570.62L1410.5 533.12L1410.5 458.12z"
							stroke-width="2"
						></path>
						<path
							class="opacity-0"
							d="M103.92 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM168.88 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM168.88 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM103.92 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM38.97 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM38.97 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM168.88 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM233.83 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM233.83 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM103.92 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM298.78 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM298.78 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM233.83 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM233.83 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM298.78 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM298.78 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM233.83 683.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM168.88 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM168.88 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM298.78 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM363.74 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM363.74 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM363.74 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM428.69 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM428.69 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM363.74 683.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM493.65 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM558.6 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM558.6 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM493.65 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM428.69 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM428.69 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM558.6 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM493.65 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 683.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM558.6 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM558.6 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 -29.38 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 120.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.41 -29.38 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.37 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.37 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.41 120.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.41 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.37 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.37 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.41 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM948.32 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.28 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.28 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM948.32 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.23 -29.38 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.18 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.18 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.23 120.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.28 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.28 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.18 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.14 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.14 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.18 683.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.23 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.23 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.09 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.04 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.04 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.09 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.14 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.14 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.05 -29.38 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.05 120.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.09 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.09 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1467.95 120.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1467.95 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.05 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1532.91 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1532.91 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1467.95 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1467.95 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1532.91 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1532.91 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1467.95 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0z"
						></path>
						<path
							class="stroke-sky-300 opacity-15"
							d="M19.38 -45.28L62.68 -20.28L62.68 29.72L19.38 54.72L-23.92 29.72L-23.92 -20.28zM62.68 179.72L105.98 204.72L105.98 254.72L62.68 279.72L19.38 254.72L19.38 204.72zM19.38 254.72L62.68 279.72L62.68 329.72L19.38 354.72L-23.92 329.72L-23.92 279.72zM62.68 329.72L105.98 354.72L105.98 404.72L62.68 429.72L19.38 404.72L19.38 354.72zM19.38 404.72L62.68 429.72L62.68 479.72L19.38 504.72L-23.92 479.72L-23.92 429.72zM62.68 479.72L105.98 504.72L105.98 554.72L62.68 579.72L19.38 554.72L19.38 504.72zM149.29 479.72L192.59 504.72L192.59 554.72L149.29 579.72L105.98 554.72L105.98 504.72zM192.59 104.72L235.89 129.72L235.89 179.72L192.59 204.72L149.29 179.72L149.29 129.72zM235.89 179.72L279.19 204.72L279.19 254.72L235.89 279.72L192.59 254.72L192.59 204.72zM192.59 254.72L235.89 279.72L235.89 329.72L192.59 354.72L149.29 329.72L149.29 279.72zM409.1 179.72L452.41 204.72L452.41 254.72L409.1 279.72L365.8 254.72L365.8 204.72zM409.1 329.72L452.41 354.72L452.41 404.72L409.1 429.72L365.8 404.72L365.8 354.72zM539.01 -45.28L582.31 -20.28L582.31 29.72L539.01 54.72L495.71 29.72L495.71 -20.28zM582.31 179.72L625.62 204.72L625.62 254.72L582.31 279.72L539.01 254.72L539.01 204.72zM539.01 254.72L582.31 279.72L582.31 329.72L539.01 354.72L495.71 329.72L495.71 279.72zM539.01 404.72L582.31 429.72L582.31 479.72L539.01 504.72L495.71 479.72L495.71 429.72zM668.92 329.72L712.22 354.72L712.22 404.72L668.92 429.72L625.62 404.72L625.62 354.72zM755.52 179.72L798.83 204.72L798.83 254.72L755.52 279.72L712.22 254.72L712.22 204.72zM842.13 29.72L885.43 54.72L885.43 104.72L842.13 129.72L798.83 104.72L798.83 54.72zM798.83 104.72L842.13 129.72L842.13 179.72L798.83 204.72L755.52 179.72L755.52 129.72zM885.43 104.72L928.73 129.72L928.73 179.72L885.43 204.72L842.13 179.72L842.13 129.72zM885.43 404.72L928.73 429.72L928.73 479.72L885.43 504.72L842.13 479.72L842.13 429.72zM972.04 254.72L1015.34 279.72L1015.34 329.72L972.04 354.72L928.73 329.72L928.73 279.72zM972.04 404.72L1015.34 429.72L1015.34 479.72L972.04 504.72L928.73 479.72L928.73 429.72zM1101.94 29.72L1145.25 54.72L1145.25 104.72L1101.94 129.72L1058.64 104.72L1058.64 54.72zM1058.64 104.72L1101.94 129.72L1101.94 179.72L1058.64 204.72L1015.34 179.72L1015.34 129.72zM1145.25 -45.28L1188.55 -20.28L1188.55 29.72L1145.25 54.72L1101.94 29.72L1101.94 -20.28zM1145.25 104.72L1188.55 129.72L1188.55 179.72L1145.25 204.72L1101.94 179.72L1101.94 129.72zM1275.15 479.72L1318.46 504.72L1318.46 554.72L1275.15 579.72L1231.85 554.72L1231.85 504.72zM1318.46 404.72L1361.76 429.72L1361.76 479.72L1318.46 504.72L1275.15 479.72L1275.15 429.72zM1361.76 479.72L1405.06 504.72L1405.06 554.72L1361.76 579.72L1318.46 554.72L1318.46 504.72z"
							stroke-width="2"
						></path>
					</g>
					<defs>
						<mask id="SvgjsMask1007">
							<rect width="1440" height="560" fill="#ffffff"></rect>
						</mask>
					</defs>
				</svg>
			</div>
			<div class="relative items-center justify-between md:gap-x-8 lg:flex">
				<div class="xl:max-w-[400px]">
					<h5 class="mb-3 text-3xl leading-normal capitalize">
						Don't delay care for you amd those you love
					</h5>
					<p class="text-16 text-sky-100">
						"Healthy living" to most people means both physical and mental health are in balance or
						functioning well together.
					</p>
				</div>
				<div class="mt-4 lg:mt-0">
					<button
						type="button"
						class="btn btn-active-sky bg-white py-2.5 font-medium hover:bg-white hover:text-sky-500 focus:bg-white focus:text-sky-500"
					>
						Stay Connect
						<LucideIcon name="MoveRight" class="ml-1 inline-block size-4" />
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<footer class="dark:bg-dark-900/30 bg-slate-50 pt-36 pb-8">
	<div class="container mx-auto px-4 xl:px-20">
		<div class="gap-space grid grid-cols-12">
			<div class="col-span-12 xl:col-span-4">
				<a href="/index" title="logo">
					<img src="assets/images/main-logo.png" alt="" class="inline-block h-8 dark:hidden" />
					<img src="assets/images/logo-white.png" alt="" class="hidden h-8 dark:inline-block" />
				</a>
				<p class="dark:text-dark-500 text-16 mt-7 mb-5 text-gray-500">
					Create a superior website for your medical and healthcare business today.
				</p>
				<div class="flex items-center gap-3">
					<a
						href="#!"
						title="facebook"
						class="dark:bg-dark-900 dark:shadow-dark-850 link link-primary inline-flex size-12 items-center justify-center rounded-lg bg-white shadow-lg shadow-slate-200"
						><LucideIcon name="Facebook" class="size-5" /></a
					>
					<a
						href="#!"
						title="twitch"
						class="dark:bg-dark-900 dark:shadow-dark-850 link link-purple inline-flex size-12 items-center justify-center rounded-lg bg-white shadow-lg shadow-slate-200"
						><LucideIcon name="Twitch" class="size-5" /></a
					>
					<a
						href="#!"
						title="twitter"
						class="dark:bg-dark-900 dark:shadow-dark-850 link link-sky inline-flex size-12 items-center justify-center rounded-lg bg-white shadow-lg shadow-slate-200"
						><LucideIcon name="Twitter" class="size-5" /></a
					>
					<a
						href="#!"
						title="instagram"
						class="dark:bg-dark-900 dark:shadow-dark-850 link link-pink inline-flex size-12 items-center justify-center rounded-lg bg-white shadow-lg shadow-slate-200"
						><LucideIcon name="Instagram" class="size-5" /></a
					>
				</div>
			</div>
			<div class="col-span-12 sm:col-span-4 xl:col-span-2 xl:col-start-7">
				<h6 class="text-16">Product Pages</h6>
				<ul class="text-16 mt-8 space-y-5">
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>About Us</a
						>
					</li>
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>Blog</a
						>
					</li>
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>Services</a
						>
					</li>
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>Careers</a
						>
					</li>
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>Help Center</a
						>
					</li>
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>Contacts Us</a
						>
					</li>
				</ul>
			</div>
			<div class="col-span-12 sm:col-span-4 xl:col-span-2">
				<h6 class="text-16">Links</h6>
				<ul class="text-16 mt-8 space-y-5">
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>Insta by Domiex</a
						>
					</li>
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>Domiex Profile</a
						>
					</li>
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>Domiex Reach</a
						>
					</li>
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>Domiex Drive</a
						>
					</li>
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>Domiex Bot</a
						>
					</li>
				</ul>
			</div>
			<div class="col-span-12 sm:col-span-4 xl:col-span-2">
				<h6 class="text-16">More Pages</h6>
				<ul class="text-16 mt-8 space-y-5">
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>Video Tutorial</a
						>
					</li>
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>Partnership</a
						>
					</li>
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>Cookie Setting</a
						>
					</li>
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>Privacy Policy</a
						>
					</li>
					<li>
						<a
							href="#!"
							class="link link-sky relative inline-block before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:before:w-full"
							>Healthcare Directory</a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="container mx-auto mt-12 px-4 text-center xl:px-20">
		<p class="dark:text-dark-500 text-16 text-gray-500">
			&copy; <span>{year}</span> Domiex. Crafted & Design by
			<a href="#!" class="link link-sky font-semibold">SRBThemes</a>
		</p>
	</div>
</footer>
