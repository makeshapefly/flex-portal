<script lang="ts">
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import { onMount } from 'svelte';
	import { options as invoiceChart } from './invoice-chart';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import DarkMode from '$lib/components/common/DarkMode.svelte';

	let isSticky = false;
	let isMenuOpen = false;
	let activeTab = 0;
	let fullName = '';
	let email = '';
	let interest = '';
	let budget = '';
	let message = '';
	let year = new Date().getFullYear();

	const handleScroll = () => {
		isSticky = window.scrollY > 0;
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<!----------Start Menu------------>
<div>
	<header
		class="landing-navbar z-sidebar dark:[&.scroll-sticky]:bg-body-invoice top-0 h-20 [&.scroll-sticky]:bg-white [&.scroll-sticky]:shadow-lg [&.scroll-sticky]:shadow-gray-200/50 dark:[&.scroll-sticky]:shadow-purple-100/5"
		class:scroll-sticky={isSticky}
	>
		<div class="container mx-auto flex max-w-[1350px] items-center justify-between px-4">
			<a href="/index" title="Logo">
				<img src="/assets/images/main-logo.png" alt="" class="inline-block h-7 dark:hidden" />
				<img src="/assets/images/logo-white.png" alt="" class="hidden h-7 dark:inline-block" />
			</a>
			<div
				class={`navbar-collapase dark:bg-body-invoice mx-auto dark:shadow-purple-100/5 dark:xl:bg-transparent ${!isMenuOpen ? 'hidden xl:flex' : ''}`}
			>
				<ul
					class="*:text-16 flex flex-col *:inline-block *:tracking-wide xl:flex-row xl:items-center"
				>
					<li>
						<a
							href="#home"
							title="home"
							on:click={() => (activeTab = 1)}
							class:active={activeTab === 1}
							class="dark:text-muted-invoice active inline-block px-5 py-2 font-normal tracking-wide whitespace-nowrap text-gray-500 transition-all duration-300 ease-linear hover:text-purple-500 dark:hover:text-purple-500 [&.active]:text-purple-500"
							>Home</a
						>
					</li>
					<li>
						<a
							href="#About"
							title="About"
							on:click={() => (activeTab = 1)}
							class:active={activeTab === 1}
							class="dark:text-muted-invoice active inline-block px-5 py-2 font-normal tracking-wide whitespace-nowrap text-gray-500 transition-all duration-300 ease-linear hover:text-purple-500 dark:hover:text-purple-500 [&.active]:text-purple-500"
							>About</a
						>
					</li>
					<li>
						<a
							href="#case"
							title="case"
							on:click={() => (activeTab = 1)}
							class:active={activeTab === 1}
							class="dark:text-muted-invoice active inline-block px-5 py-2 font-normal tracking-wide whitespace-nowrap text-gray-500 transition-all duration-300 ease-linear hover:text-purple-500 dark:hover:text-purple-500 [&.active]:text-purple-500"
							>Use Cases</a
						>
					</li>
					<li>
						<a
							href="#community"
							title="community"
							on:click={() => (activeTab = 1)}
							class:active={activeTab === 1}
							class="dark:text-muted-invoice active inline-block px-5 py-2 font-normal tracking-wide whitespace-nowrap text-gray-500 transition-all duration-300 ease-linear hover:text-purple-500 dark:hover:text-purple-500 [&.active]:text-purple-500"
							>Community</a
						>
					</li>
					<li>
						<a
							href="#contact-us"
							title="contact-us"
							on:click={() => (activeTab = 1)}
							class:active={activeTab === 1}
							class="dark:text-muted-invoice active inline-block px-5 py-2 font-normal tracking-wide whitespace-nowrap text-gray-500 transition-all duration-300 ease-linear hover:text-purple-500 dark:hover:text-purple-500 [&.active]:text-purple-500"
							>Contact</a
						>
					</li>
				</ul>
			</div>
			<div class="flex shrink-0 items-center gap-2">
				<button
					title="menu toggle"
					on:click={() => (isMenuOpen = !isMenuOpen)}
					type="button"
					class="navbar-toggle btn btn-sub-sky btn-icon rounded-full xl:!hidden ltr:ml-auto xl:ltr:ml-0 rtl:mr-auto xl:rtl:mr-0"
					aria-label="menu toggle"
				>
					<i class={isMenuOpen ? 'ri-close-line' : 'ri-menu-2-line'}></i>
				</button>
				<button class="btn btn-outline-purple">Get Started</button>
			</div>
		</div>
	</header>
</div>
<!----------End Menu------------>

<!----------Start Home------------->
<section class="relative overflow-hidden bg-gradient-to-b pt-36 dark:from-purple-500/10" id="home">
	<div class="absolute top-0 opacity-30">
		<svg width="1900" viewBox="0 0 1201 401" fill="none" xmlns="http://www.w3.org/2000/svg">
			<mask
				id="mask0_505_112"
				style="mask-type:alpha"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="1201"
				height="401"
			>
				<rect x="0.90625" y="0.380859" width="1200" height="400" fill="#FCFCFE" />
			</mask>
			<g mask="url(#mask0_505_112)">
				<g opacity="0.07">
					<path
						d="M1773.97 365.498H-9.78516V367.808H1773.97V365.498Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M1773.97 300.102H-9.78516V302.412H1773.97V300.102Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M1773.97 234.707H-9.78516V237.017H1773.97V234.707Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M1773.97 169.311H-9.78516V171.621H1773.97V169.311Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M1773.97 103.914H-9.78516V106.224H1773.97V103.914Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M1773.97 38.5176H-9.78516V40.8278H1773.97V38.5176Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M1157.13 -343.123H1154.82V773.194H1157.13V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M1091.73 -343.123H1089.42V773.194H1091.73V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M1026.34 -343.123H1024.03V773.194H1026.34V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M960.943 -343.123H958.633V773.194H960.943V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M895.549 -343.123H893.238V773.194H895.549V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M830.154 -343.123H827.844V773.194H830.154V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M764.763 -343.123H762.453V773.194H764.763V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M699.369 -343.123H697.059V773.194H699.369V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M633.974 -343.123H631.664V773.194H633.974V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M568.58 -343.123H566.27V773.194H568.58V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M503.185 -343.123H500.875V773.194H503.185V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M437.791 -343.123H435.48V773.194H437.791V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M372.396 -343.123H370.086V773.194H372.396V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M307.002 -343.123H304.691V773.194H307.002V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M241.607 -343.123H239.297V773.194H241.607V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M176.213 -343.123H173.902V773.194H176.213V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M110.818 -343.123H108.508V773.194H110.818V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
					<path
						d="M45.4235 -343.123H43.1133V773.194H45.4235V-343.123Z"
						class="dark:fill-muted-invoice fill-purple-400"
					/>
				</g>
			</g>
			<g opacity="0.15">
				<path
					d="M174.776 89.0488C174.075 103.496 173.498 104.073 159.051 104.774C173.498 105.475 174.075 106.052 174.776 120.499C175.477 106.052 176.054 105.475 190.501 104.774C176.054 104.073 175.477 103.496 174.776 89.0488Z"
					fill="#5911D6"
				/>
			</g>
			<g opacity="0.15">
				<path
					d="M109.776 220.049C109.075 234.496 108.498 235.073 94.0508 235.774C108.498 236.475 109.075 237.052 109.776 251.499C110.477 237.052 111.054 236.475 125.501 235.774C111.054 235.073 110.477 234.496 109.776 220.049Z"
					fill="#5911D6"
				/>
			</g>
			<g opacity="0.15" clip-path="url(#clip0_505_112)">
				<path
					d="M959.776 351.049C959.075 365.496 958.498 366.073 944.051 366.774C958.498 367.475 959.075 368.052 959.776 382.499C960.477 368.052 961.054 367.475 975.501 366.774C961.054 366.073 960.477 365.496 959.776 351.049Z"
					fill="#5911D6"
				/>
			</g>
			<g opacity="0.15">
				<path
					d="M1088.78 220.049C1088.07 234.496 1087.5 235.073 1073.05 235.774C1087.5 236.475 1088.07 237.052 1088.78 251.499C1089.48 237.052 1090.05 236.475 1104.5 235.774C1090.05 235.073 1089.48 234.496 1088.78 220.049Z"
					fill="#5911D6"
				/>
			</g>
			<g opacity="0.15">
				<path
					d="M959.772 90.3281C959.071 104.776 958.494 105.352 944.047 106.053C958.494 106.754 959.071 107.331 959.772 121.778C960.473 107.331 961.05 106.754 975.497 106.053C961.05 105.352 960.473 104.776 959.772 90.3281Z"
					fill="#5911D6"
				/>
			</g>
			<g opacity="0.15">
				<path
					d="M173.776 351.049C173.075 365.496 172.498 366.073 158.051 366.774C172.498 367.475 173.075 368.052 173.776 382.499C174.477 368.052 175.054 367.475 189.501 366.774C175.054 366.073 174.477 365.496 173.776 351.049Z"
					fill="#5911D6"
				/>
			</g>
			<g opacity="0.2">
				<path
					d="M1091.08 105.935C1091.62 105.935 1092.05 105.502 1092.05 104.968C1092.05 104.433 1091.62 104 1091.08 104C1090.55 104 1090.11 104.433 1090.11 104.968C1090.11 105.502 1090.55 105.935 1091.08 105.935Z"
					fill="#5911D6"
				/>
				<path
					d="M1081.08 94.9668L1091.08 104.511L1101.08 94.9668L1091.54 104.967L1101.08 114.967L1091.08 105.423L1081.08 114.967L1090.63 104.967L1081.08 94.9668Z"
					fill="#5911D6"
				/>
			</g>
			<g opacity="0.2">
				<path
					d="M1155.77 301.754C1156.31 301.754 1156.74 301.321 1156.74 300.786C1156.74 300.252 1156.31 299.818 1155.77 299.818C1155.24 299.818 1154.8 300.252 1154.8 300.786C1154.8 301.321 1155.24 301.754 1155.77 301.754Z"
					fill="#5911D6"
				/>
				<path
					d="M1145.77 290.785L1155.77 300.329L1165.77 290.785L1156.23 300.785L1165.77 310.785L1155.77 301.241L1145.77 310.785L1155.32 300.785L1145.77 290.785Z"
					fill="#5911D6"
				/>
			</g>
			<g opacity="0.2">
				<path
					d="M43.8818 302.648C44.4163 302.648 44.8495 302.215 44.8495 301.681C44.8495 301.146 44.4163 300.713 43.8818 300.713C43.3473 300.713 42.9141 301.146 42.9141 301.681C42.9141 302.215 43.3473 302.648 43.8818 302.648Z"
					fill="#5911D6"
				/>
				<path
					d="M33.8828 291.68L43.8828 301.224L53.8828 291.68L44.3389 301.68L53.8828 311.68L43.8828 302.136L33.8828 311.68L43.4267 301.68L33.8828 291.68Z"
					fill="#5911D6"
				/>
			</g>
			<g opacity="0.2">
				<path
					d="M240.558 171.07C241.092 171.07 241.525 170.637 241.525 170.103C241.525 169.568 241.092 169.135 240.558 169.135C240.023 169.135 239.59 169.568 239.59 170.103C239.59 170.637 240.023 171.07 240.558 171.07Z"
					fill="#5911D6"
				/>
				<path
					d="M230.559 160.102L240.559 169.645L250.559 160.102L241.015 170.102L250.559 180.102L240.559 170.558L230.559 180.102L240.102 170.102L230.559 160.102Z"
					fill="#5911D6"
				/>
			</g>
			<g opacity="0.2">
				<path
					d="M44.5498 39.287C45.0842 39.287 45.5175 38.8538 45.5175 38.3193C45.5175 37.7848 45.0842 37.3516 44.5498 37.3516C44.0153 37.3516 43.582 37.7848 43.582 38.3193C43.582 38.8538 44.0153 39.287 44.5498 39.287Z"
					fill="#5911D6"
				/>
				<path
					d="M34.5508 28.3184L44.5508 37.8622L54.5508 28.3184L45.0069 38.3184L54.5508 48.3184L44.5508 38.7745L34.5508 48.3184L44.0947 38.3184L34.5508 28.3184Z"
					fill="#5911D6"
				/>
			</g>
			<defs>
				<clipPath id="clip0_505_112">
					<rect width="33.5469" height="33.5469" fill="white" transform="translate(938 345)" />
				</clipPath>
			</defs>
		</svg>
	</div>

	<div class="relative container mx-auto max-w-[1350px] px-4">
		<Grid cols={12}>
			<Col cols={{ span: 12 }} md={{ span: 8 }} class="text-center md:col-start-3">
				<!-- <p class="mb-3 text-lg text-purple-500">Streamline Billing and Save Time</p> -->
				<h1 class="my-6 leading-normal xl:text-4xl xl:leading-normal xl:tracking-wide">
					Get started now
				</h1>
				<!-- <p class="dark:text-muted-invoice mb-6 text-lg">
					Effortlessly manage payroll for full-time and contract employees with our intuitive HR
					dashboards.
				</p> -->
				<div class="py-4">
					<h6 class="mb-1 text-xs text-gray-500 uppercase">Step: {1} of 3</h6>
					<div class="flex flex-col md:flex-row md:items-center md:justify-between">
						<div class="flex-1">
							<h5>Tell me about yourself</h5>
						</div>
						<div class="flex items-center md:w-64">
							<div class="w-full rounded-full bg-gray-200">
								<div class="h-2 rounded-full bg-green-500" style="width: {(1 / 3) * 100}%"></div>
							</div>
							<h6 class="w-10 text-xs text-gray-500">{Math.floor((1 / 3) * 100)}%</h6>
						</div>
					</div>
				</div>
			</Col>
		</Grid>
	</div>
</section>
<!----------End Home------------->

<!-- Contact-us -->
<section class="relative py-12 md:py-20" id="contact-us">
	<div class="container mx-auto max-w-[1350px] px-4">
		<Grid cols={12} class="mb-10 items-center">
			<!-- <Col cols={{ span: 12 }} md={{ span: 8 }} class="text-center md:col-start-3">
				<h2 class="mb-2 text-2xl leading-normal capitalize sm:text-3xl md:text-4xl">
					Love for hear from you <span class="text-purple-500">Get in Touch</span>
				</h2>
				<p class="text-gray-500">
					If you get in touch with someone, you contact them by writing to them or phoning them.
				</p>
			</Col> -->
		</Grid>
		<form>
			<Grid cols={12} gap={5}>
				<!-- Full Name Input -->
				<div class="relative col-span-12 pr-4 sm:pr-0 md:col-span-6">
					<div class="group">
						<input
							type="text"
							id="fullNameInput"
							bind:value={fullName}
							class="form-input peer dark:placeholder:!text-muted-invoice dark:bg-body-invoice h-14 px-6 pt-4 focus:!border-purple-500 dark:!border-slate-300/10"
							required
						/>
						<label
							for="fullNameInput"
							class="text-15 dark:text-dark-400 dark:bg-body-invoice absolute top-1/2 z-10 origin-[0] -translate-y-1/2 scale-100 transform bg-white px-4 text-gray-500 duration-300 group-[&.show]:top-2 group-[&.show]:-translate-y-4 group-[&.show]:scale-[0.85] group-[&.show]:px-2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-[0.85] peer-focus:px-2 ltr:left-4 rtl:right-4"
							>Your Full Name</label
						>
					</div>
				</div>

				<!-- Email Input -->
				<div class="relative col-span-12 pr-4 sm:pr-0 md:col-span-6">
					<div class="group">
						<input
							type="email"
							id="emailInput"
							bind:value={email}
							class="form-input peer dark:placeholder:!text-muted-invoice dark:bg-body-invoice h-14 px-6 pt-4 focus:!border-purple-500 dark:!border-slate-300/10"
							required
						/>
						<label
							for="emailInput"
							class="text-15 dark:text-dark-400 dark:bg-body-invoice absolute top-1/2 z-10 origin-[0] -translate-y-1/2 scale-100 transform bg-white px-4 text-gray-500 duration-300 group-[&.show]:top-2 group-[&.show]:-translate-y-4 group-[&.show]:scale-[0.85] group-[&.show]:px-2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-[0.85] peer-focus:px-2 ltr:left-4 rtl:right-4"
							>Your Email Address</label
						>
					</div>
				</div>

				<!-- What you're Interested Input -->
				<div class="relative col-span-12 pr-4 sm:pr-0 md:col-span-6">
					<div class="group">
						<input
							type="text"
							id="interestedInput"
							bind:value={interest}
							class="form-input peer dark:placeholder:!text-muted-invoice dark:bg-body-invoice h-14 px-6 pt-4 focus:!border-purple-500 dark:!border-slate-300/10"
							required
						/>
						<label
							for="interestedInput"
							class="text-15 dark:text-dark-400 dark:bg-body-invoice absolute top-1/2 z-10 origin-[0] -translate-y-1/2 scale-100 transform bg-white px-4 text-gray-500 duration-300 group-[&.show]:top-2 group-[&.show]:-translate-y-4 group-[&.show]:scale-[0.85] group-[&.show]:px-2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-[0.85] peer-focus:px-2 ltr:left-4 rtl:right-4"
							>What you are Interested</label
						>
					</div>
				</div>

				<!-- Project Budget Input -->
				<div class="relative col-span-12 pr-4 sm:pr-0 md:col-span-6">
					<div class="group">
						<input
							type="text"
							id="projectBudgetInput"
							bind:value={budget}
							class="form-input peer dark:placeholder:!text-muted-invoice dark:bg-body-invoice h-14 px-6 pt-4 focus:!border-purple-500 dark:!border-slate-300/10"
							required
						/>
						<label
							for="projectBudgetInput"
							class="text-15 dark:text-dark-400 dark:bg-body-invoice absolute top-1/2 z-10 origin-[0] -translate-y-1/2 scale-100 transform bg-white px-4 text-gray-500 duration-300 group-[&.show]:top-2 group-[&.show]:-translate-y-4 group-[&.show]:scale-[0.85] group-[&.show]:px-2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-[0.85] peer-focus:px-2 ltr:left-4 rtl:right-4"
							>Project Budget</label
						>
					</div>
				</div>

				<!-- Message Input -->
				<div class="col-span-12 pr-4 sm:pr-0">
					<div class="group relative">
						<textarea
							id="MessageInput"
							bind:value={message}
							class="form-input peer dark:placeholder:!text-muted-invoice dark:bg-body-invoice h-auto px-6 pt-4 focus:!border-purple-500 dark:!border-slate-300/10"
							rows="4"
							required
						></textarea>
						<label
							for="MessageInput"
							class="text-15 dark:text-dark-400 dark:bg-body-invoice absolute top-7 z-10 origin-[0] -translate-y-1/2 scale-100 transform bg-white px-4 text-gray-500 duration-300 group-[&.show]:top-2 group-[&.show]:-translate-y-4 group-[&.show]:scale-[0.85] group-[&.show]:px-2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-[0.85] peer-focus:px-2 ltr:left-4 rtl:right-4"
							>Message</label
						>
					</div>
				</div>

				<!-- Submit Button -->
				<div class="col-span-12 flex justify-end pr-4 sm:pr-0">
					<button type="submit" class="btn btn-purple w-full max-w-[200px]">Next</button>
				</div>
			</Grid>
		</form>
	</div>
</section>

<!-- Footer -->
<footer
	class="relative border-t border-dashed border-purple-200 bg-purple-50 py-5 dark:border-purple-500/20 dark:bg-purple-500/10"
>
	<div class="container mx-auto max-w-[1350px] px-4">
		<div class="flex flex-wrap justify-between gap-5">
			<div>
				<p class="text-gray-500">
					&copy; <span>{year}</span> Domiex. Crafted by
					<a href="#!" class="font-semibold">SRBThemes</a>
				</p>
			</div>
			<div>
				<div class="flex justify-end gap-6 text-lg">
					<a href="#!" title="twitter" class="link link-sky" aria-label="social links"
						><i class="ri-twitter-x-line"></i></a
					>
					<a href="#!" title="instagram" class="link link-pink" aria-label="social links"
						><i class="ri-instagram-line"></i></a
					>
					<a href="#!" title="amazon" class="link link-green" aria-label="social links"
						><i class="ri-amazon-line"></i></a
					>
					<a href="#!" title="chrome" class="link link-red" aria-label="social links"
						><i class="ri-chrome-line"></i></a
					>
				</div>
			</div>
			<!--end col-->
		</div>
		<!--end grid-->
	</div>
</footer>

<DarkMode />
