<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import { onMount } from 'svelte';

	// Vanilla Tilt import
	import 'vanilla-tilt/dist/vanilla-tilt';

	// Function to calculate the remaining time
	function getTimeRemaining(endTime: Date) {
		const t = Date.parse(endTime.toString()) - Date.parse(new Date().toString());
		const seconds = Math.floor((t / 1000) % 60);
		const minutes = Math.floor((t / 1000 / 60) % 60);
		const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		const days = Math.floor(t / (1000 * 60 * 60 * 24));
		return {
			total: t,
			days,
			hours,
			minutes,
			seconds
		};
	}

	// Function to initialize the countdown timer
	function initializeClock(id: string, endTime: Date) {
		const clock = document.getElementById(id);
		if (!clock) return;

		const daysSpan = clock.querySelector('.days');
		const hoursSpan = clock.querySelector('.hours');
		const minutesSpan = clock.querySelector('.minutes');
		const secondsSpan = clock.querySelector('.seconds');

		function updateClock() {
			const t = getTimeRemaining(endTime);
			if (daysSpan && hoursSpan && minutesSpan && secondsSpan) {
				daysSpan.innerHTML = ('0' + t.days).slice(-2);
				hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
				minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
				secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
			}
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}

		updateClock();
		const timeInterval = setInterval(updateClock, 1000);
	}

	// Set the countdown date
	const deadline = new Date(Date.parse(new Date().toString()) + 94 * 24 * 60 * 60 * 1000);

	// Initialize the clock on mount
	onMount(() => {
		initializeClock('clockdiv', deadline);
	});
</script>

<div
	class="relative flex min-h-screen items-center justify-center from-sky-500/10 via-green-500/5 to-pink-500/5 py-20 ltr:bg-gradient-to-l rtl:bg-gradient-to-r"
>
	<div class="container">
		<div class="grid grid-cols-12">
			<div class="col-span-12 text-center lg:col-span-8 lg:col-start-3">
				<h1
					class="from-primary-500 vie-purple-500 to-pink-500 bg-clip-text pb-5 text-4xl font-bold text-transparent drop-shadow-lg md:text-6xl lg:text-7xl ltr:bg-gradient-to-r rtl:bg-gradient-to-l"
					data-tilt
					data-tilt-full-page-listening
				>
					We're Coming Soon
				</h1>
				<div id="clockdiv" class="mb-5 flex items-center justify-center gap-5">
					<div class="w-24 p-2">
						<!-- svelte-ignore a11y-missing-content -->
						<h3 class="days mb-1"></h3>
						<div class="dark:text-dark-500 smalltext text-gray-500">Days</div>
					</div>
					<div class="w-24 p-2">
						<!-- svelte-ignore a11y-missing-content -->
						<h3 class="hours mb-1"></h3>
						<div class="dark:text-dark-500 smalltext text-gray-500">Hours</div>
					</div>
					<!-- svelte-ignore a11y-missing-content -->
					<div class="w-24 p-2">
						<h3 class="minutes mb-1"></h3>
						<div class="dark:text-dark-500 smalltext text-gray-500">Minutes</div>
					</div>
					<div class="w-24 p-2">
						<!-- svelte-ignore a11y-missing-content -->
						<h3 class="seconds mb-1"></h3>
						<div class="dark:text-dark-500 smalltext text-gray-500">Seconds</div>
					</div>
				</div>
				<p class="dark:text-dark-500 text-16 mx-auto mb-5 max-w-2xl text-gray-500">
					Receive the latest articles and business updates you need to know, along with special
					weekly recommendations.
				</p>
				<form action="/index" class="mx-auto max-w-xl">
					<div class="relative">
						<input
							type="email"
							class="form-input h-12 bg-transparent ltr:pr-32 rtl:pl-32 dark:bg-transparent"
							placeholder="Enter your email"
							required
						/>
						<button type="submit" class="btn btn-primary absolute top-1 ltr:right-1 rtl:left-1"
							>Subscribe</button
						>
					</div>
					<p class="dark:text-dark-500 mt-4 text-gray-500">
						Sign up now to receive early notifications about our launch date!
					</p>
				</form>
				<div class="mt-5 flex items-center justify-center gap-2">
					<a
						href="#!"
						class="dark:shadow-dark-800 inline-flex size-10 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-gray-200"
						><LucideIcon name="Linkedin" class="size-5" /></a
					>
					<a
						href="#!"
						class="dark:shadow-dark-800 inline-flex size-10 items-center justify-center rounded-full bg-pink-500 text-white shadow-lg shadow-gray-200"
						><LucideIcon name="Dribbble" class="size-5" /></a
					>
					<a
						href="#!"
						class="bg-primary-500 dark:shadow-dark-800 inline-flex size-10 items-center justify-center rounded-full text-white shadow-lg shadow-gray-200"
						><LucideIcon name="Facebook" class="size-5" /></a
					>
					<a
						href="#!"
						class="dark:shadow-dark-800 inline-flex size-10 items-center justify-center rounded-full bg-purple-500 text-white shadow-lg shadow-gray-200"
						><LucideIcon name="Twitch" class="size-5" /></a
					>
					<a
						href="#!"
						class="dark:shadow-dark-800 inline-flex size-10 items-center justify-center rounded-full bg-pink-500 text-white shadow-lg shadow-gray-200"
						><LucideIcon name="Instagram" class="size-5" /></a
					>
					<a
						href="#!"
						class="dark:shadow-dark-800 inline-flex size-10 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-gray-200"
						><LucideIcon name="Gitlab" class="size-5" /></a
					>
				</div>
			</div>
		</div>
	</div>
</div>
