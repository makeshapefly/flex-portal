<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';

	let isOpen = true;
</script>

<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }}>
		<div class="alert-solid-primary alert mb-5" class:!hidden={!isOpen}>
			<div class="flex items-center gap-3">
				<LucideIcon name="Headset" class="text-primary-100 fill-primary-400/50 size-8" />
				<div>
					<h6 class="text-primary-50 mb-1 font-medium">Hello! Need Help?</h6>
					<p class="text-primary-200">Feel free to ask me anything!</p>
				</div>
				<a
					href="#!"
					aria-label="Close"
					on:click={() => (isOpen = false)}
					class="text-primary-300 hover:text-primary-100 absolute top-2 text-lg transition duration-300 ease-linear ltr:right-5 rtl:left-5"
				>
					<i class="ri-close-fill"></i>
				</a>
			</div>
		</div>
	</Col>

	<Col
		cols={{ span: 12 }}
		xl={{ span: 6 }}
		class="card relative overflow-hidden border-sky-200 bg-sky-100 dark:border-sky-500/20 dark:bg-sky-500/10"
	>
		<CardBody class="py-6">
			<div class="relative z-10 grid grid-cols-12">
				<div class="col-span-9">
					<h6 class="text-15 mb-1">Welcome to Dr. Olivia Martina</h6>
					<p class="mb-4 text-gray-500">
						Welcome to the Admin Dashboard! This centralized platform is designed to streamline your
						administrative tasks and provide you with real-time insights.
					</p>
					<a href="#!" class="btn btn-sky">Get Started</a>
				</div>
			</div>
		</CardBody>
		<div
			class="absolute -bottom-12 size-56 rounded-full border-[20px] border-sky-500/15 ltr:-right-12 rtl:-left-12"
		></div>
		<img
			src="/assets/images/dashboards/img-1.png"
			alt=""
			class="absolute -bottom-6 ltr:right-3 rtl:left-3"
		/>
	</Col>

	<Col
		cols={{ span: 12 }}
		xl={{ span: 6 }}
		class="dark:bg-dark-850 dark:border-dark-800 card relative overflow-hidden border-gray-200 bg-gray-100"
	>
		<CardBody class="py-6">
			<div class="relative z-10 grid grid-cols-12">
				<div class="col-span-9">
					<h6 class="text-15 mb-1">Welcome to Dr. Olivia Martina</h6>
					<p class="mb-4 text-gray-500">
						Welcome to the Admin Dashboard! This centralized platform is designed to streamline your
						administrative tasks and provide you with real-time insights.
					</p>
					<a href="#!" class="btn btn-gray">Get Started</a>
				</div>
			</div>
		</CardBody>
		<div
			class="absolute -bottom-12 size-56 rounded-full border-[20px] border-sky-500/15 ltr:-right-12 rtl:-left-12"
		></div>
		<img
			src="/assets/images/dashboards/img-1.png"
			alt=""
			class="absolute -bottom-6 ltr:right-3 rtl:left-3"
		/>
	</Col>

	<Col
		cols={{ span: 12 }}
		xl={{ span: 6 }}
		class="card relative overflow-hidden border-indigo-500 bg-indigo-500 dark:border-indigo-500 dark:bg-indigo-500"
	>
		<div class="hidden md:absolute md:top-0 md:flex ltr:md:right-0 rtl:md:left-0">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				width="500"
				height="250"
				preserveAspectRatio="none"
				viewBox="0 0 500 250"
			>
				<g mask="url(&quot;#SvgjsMask1020&quot;)" fill="none">
					<path
						d="M231.51 280.18C274.64 267.68 249.28 152.18 351.03 146.08 452.77 139.98 528.45 86.54 590.06 86.08"
						class="stroke-primary-300/10"
						stroke-width="2"
					></path>
					<path
						d="M200.68 250.58C260.95 239.55 290.28 88.89 384.42 88.39 478.56 87.89 518.09 166.68 568.16 168.39"
						class="stroke-primary-300/10"
						stroke-width="2"
					></path>
					<path
						d="M33.11 268.48C95.57 246.25 104.46 66.02 197.7 60.55 290.93 55.08 279.99 91.8 362.28 91.8 444.58 91.8 484.99 60.69 526.87 60.55"
						class="stroke-primary-300/10"
						stroke-width="2"
					></path>
					<path
						d="M214.96 255.51C265.37 253.07 292.61 172.07 395.66 165.55 498.72 159.03 523.65 59.76 576.37 55.55"
						class="stroke-primary-300/10"
						stroke-width="2"
					></path>
					<path
						d="M129.54 298.93C172.49 296.37 204.22 217.32 280.98 217.15 357.75 216.98 356.71 248.4 432.43 248.4 508.15 248.4 545.21 217.31 583.87 217.15"
						class="stroke-primary-300/10"
						stroke-width="2"
					></path>
				</g>
				<defs>
					<mask id="SvgjsMask1020">
						<rect width="500" height="250" fill="#ffffff"></rect>
					</mask>
				</defs>
			</svg>
		</div>
		<CardBody class="relative py-6">
			<div class="grid grid-cols-12">
				<div class="col-span-12 md:col-span-6">
					<p class="mb-2 text-purple-50/75">Welcome Back! 👋, Olivia Martina</p>
					<h3 class="mb-5 font-medium text-purple-50 capitalize">
						Make sure to monitor your health regularly
					</h3>
					<a href="#!" class="btn bg-white font-medium text-gray-800 hover:bg-gray-100"
						><span class="align-middle">Book Appointment</span>
						<LucideIcon name="CalendarDays" class="ml-1 inline-block size-4" /></a
					>
				</div>
				<div class="col-span-12 mt-4 md:col-span-6 md:mt-0">
					<img
						src="/assets/images/dashboards/img-2.png"
						alt=""
						class="relative block ltr:md:ml-auto rtl:md:mr-auto"
					/>
				</div>
			</div>
		</CardBody>
	</Col>
</Grid>
