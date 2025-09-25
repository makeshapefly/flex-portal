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
<section
	class="relative overflow-hidden bg-gradient-to-b pt-36 pb-20 dark:from-purple-500/10"
	id="home"
>
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
				<p class="mb-3 text-lg text-purple-500">Streamline Billing and Save Time</p>
				<h1 class="my-6 leading-normal xl:text-6xl xl:leading-normal xl:tracking-wide">
					Enhance Your Invoicing with Our Powerful Platform
				</h1>
				<p class="dark:text-muted-invoice mb-6 text-lg">
					Effortlessly manage payroll for full-time and contract employees with our intuitive HR
					dashboards.
				</p>

				<div class="relative mx-auto max-w-xl">
					<input
						type="email"
						class="form-input dark:placeholder:text-muted-invoice h-14 rounded-full bg-transparent focus:border-purple-500 ltr:pr-36 ltr:pl-6 rtl:pr-6 rtl:pl-36 dark:border-slate-300/10 dark:bg-transparent"
						placeholder="Enter your email"
						required
					/>
					<button
						type="reset"
						class="btn btn-purple absolute top-2 rounded-full ltr:right-2 rtl:left-2"
						>SubScribe</button
					>
				</div>
			</Col>
		</Grid><!--end grid-->
		<Grid cols={12} gap={5} class="mt-8">
			<Col cols={{ span: 12 }} lg={{ span: 3 }}>
				<div
					class="dark:to-body-invoice rounded-sm border border-gray-200 bg-gradient-to-br p-8 dark:border-slate-300/10 dark:from-purple-500/5 dark:shadow-purple-100/5"
				>
					<h6 class="mb-3 font-normal tracking-wide">Recurring Invoice</h6>
					<div class="input-radio-group mb-2">
						<input
							id="radioBasic1"
							name="invoiceList"
							class="input-radio peer checked:!border-purple-500 checked:!bg-purple-500 checked:!ring-0 dark:border-slate-300/15"
							type="radio"
						/>
						<label for="radioBasic1" class="dark:text-muted-invoice shrink-0">Send Invoice</label>
					</div>
					<div class="input-radio-group">
						<input
							id="radioBasic2"
							name="invoiceList"
							class="input-radio peer checked:!border-purple-500 checked:!bg-purple-500 checked:!ring-0 dark:border-slate-300/15"
							type="radio"
						/>
						<label for="radioBasic2" class="dark:text-muted-invoice shrink-0"
							>Send on specific date</label
						>
					</div>
					<div class="mt-4">
						<label for="invoiceSend" class="form-label">What is the send Invoices?</label>
						<select
							id="invoiceSend"
							class="dark:bg-body-invoice form-input focus:border-purple-500 dark:border-slate-300/10"
						>
							<option value="1">Weekly</option>
							<option value="2">Monthly</option>
							<option value="3">Yearly</option>
						</select>
					</div>
					<div class="mt-3">
						<label for="timesSend" class="form-label">How to many times should we send?</label>
						<select
							id="timesSend"
							class="dark:bg-body-invoice form-input focus:border-purple-500 dark:border-slate-300/10"
						>
							<option value="1">1 Times</option>
							<option value="2">2 Times</option>
							<option value="3">3 Times</option>
							<option value="4">4 Times</option>
						</select>
					</div>
				</div>
				<div
					class="dark:to-body-invoice mt-5 rounded border border-gray-200 bg-gradient-to-br p-5 dark:border-slate-300/10 dark:from-purple-500/5"
				>
					<div class="flex items-center gap-3">
						<img src="assets/images/avatar/user-11.png" alt="" class="size-12 rounded-full" />
						<div>
							<h6 class="mb-1 font-medium">Invoice sent & delivered</h6>
							<p class="dark:text-muted-invoice text-sm">Yesterday on 06:48PM</p>
						</div>
					</div>
				</div>
			</Col><!--end col-->
			<Col cols={{ span: 12 }} lg={{ span: 6 }}>
				<div
					class="dark:to-body-invoice rounded border border-gray-200 bg-gradient-to-br p-8 lg:mt-10 dark:border-slate-300/10 dark:from-purple-500/5"
				>
					<h6 class="mb-3">Invoiced</h6>
					<div dir="ltr">
						<ApexChart
							class="invoice-landing-chart !min-h-full"
							colors={['bg-purple-500']}
							darkColors={['bg-purple-500']}
							options={invoiceChart}
						/>
					</div>
				</div>
			</Col><!--end col-->
			<Col cols={{ span: 12 }} lg={{ span: 3 }}>
				<div
					class="dark:to-body-invoice rounded border border-gray-200 bg-gradient-to-br p-8 dark:border-slate-300/10 dark:from-purple-500/5"
				>
					<h6 class="mb-3 font-normal tracking-wide">Recurring Invoice</h6>
					<div class="input-radio-group mb-2">
						<input
							id="radioBasic3"
							name="invoiceList"
							class="input-radio peer checked:!border-purple-500 checked:!bg-purple-500 checked:!ring-0 dark:border-slate-300/15"
							type="radio"
						/>
						<label for="radioBasic3" class="dark:text-muted-invoice shrink-0">Send Invoice</label>
					</div>
					<div class="input-radio-group">
						<input
							id="radioBasic4"
							name="invoiceList"
							class="input-radio peer checked:!border-purple-500 checked:!bg-purple-500 checked:!ring-0 dark:border-slate-300/15"
							type="radio"
						/>
						<label for="radioBasic4" class="dark:text-muted-invoice shrink-0"
							>Send on specific date</label
						>
					</div>
					<div class="mt-4">
						<label for="invoiceSend" class="form-label">What is the send Invoices?</label>
						<select
							id="invoiceSend"
							class="dark:bg-body-invoice form-input focus:border-purple-500 dark:border-slate-300/10"
						>
							<option value="1">Weekly</option>
							<option value="2">Monthly</option>
							<option value="3">Yearly</option>
						</select>
					</div>
					<div class="mt-3">
						<label for="timesSend" class="form-label">How to many times should we send?</label>
						<select
							id="timesSend"
							class="dark:bg-body-invoice form-input focus:border-purple-500 dark:border-slate-300/10"
						>
							<option value="1">1 Times</option>
							<option value="2">2 Times</option>
							<option value="3">3 Times</option>
							<option value="4">4 Times</option>
						</select>
					</div>
				</div>
				<div
					class="dark:to-body-invoice mt-5 rounded border border-gray-200 bg-gradient-to-br p-5 dark:border-slate-300/10 dark:from-purple-500/5"
				>
					<div class="flex items-center gap-3">
						<img src="assets/images/avatar/user-11.png" alt="" class="size-12 rounded-full" />
						<div>
							<h6 class="mb-1 font-medium">Invoice sent & delivered</h6>
							<p class="dark:text-muted-invoice text-sm">Yesterday on 06:48PM</p>
						</div>
					</div>
				</div>
			</Col>
		</Grid>
	</div>
</section>
<!----------End Home------------->

<!-- About -->
<section class="relative lg:py-20" id="About">
	<div class="container mx-auto max-w-[1350px] px-4">
		<Grid cols={12} class="mb-10 items-center">
			<Col cols={{ span: 12 }} md={{ span: 8 }} class="text-center md:col-start-3">
				<h2 class="mb-2 text-3xl capitalize md:text-4xl md:leading-normal">
					Modern <span class="font-bold text-purple-500">Invoicing</span> for small businesses & Freelancers
				</h2>
				<p class="dark:text-muted-invoice text-gray-500">
					All the company's terms and conditions, including due dates and penalties for non-payment
					or partial payments, must be clearly included in the invoice.
				</p>
			</Col><!--end col-->
		</Grid><!--end grid-->
		<Grid cols={12} gap="space">
			<Col
				cols={{ span: 12 }}
				md={{ span: 6 }}
				class="dark:to-body-invoice rounded border border-gray-200 bg-gradient-to-br p-6 lg:p-8 dark:border-slate-300/10 dark:from-purple-500/5 dark:shadow-purple-100/5"
			>
				<div class="gap-4 md:flex">
					<div class="flex size-10 shrink-0 items-center justify-center">
						<LucideIcon name="PencilRuler" class="size-7 stroke-1 text-purple-500" />
					</div>
					<div class="grow">
						<h6 class="text-16 mb-1">Customized invoicing</h6>
						<p class="text-gray-500">
							Invoicing is the basic thing without which a business cannot work. Every business
							needs to issue an invoice according to their requirements.
						</p>
					</div>
				</div>
			</Col><!--end col-->
			<Col
				cols={{ span: 12 }}
				md={{ span: 6 }}
				class="dark:to-body-invoice rounded border border-gray-200 bg-gradient-to-br p-6 lg:p-8 dark:border-slate-300/10 dark:from-purple-500/5 dark:shadow-purple-100/5"
			>
				<div class="gap-4 md:flex">
					<div class="flex size-10 shrink-0 items-center justify-center">
						<LucideIcon name="PanelBottomDashed" class="size-7 stroke-1 text-purple-500" />
					</div>
					<div class="grow">
						<h6 class="text-16 mb-1">Recurring invoices</h6>
						<p class="text-gray-500">
							Invoices record the essential data to preparing tax filings. When the company records
							all its invoices meticulously, that data can be extracted to make tax filings.
						</p>
					</div>
				</div>
			</Col><!--end col-->
			<Col
				cols={{ span: 12 }}
				md={{ span: 6 }}
				class="dark:to-body-invoice rounded border border-gray-200 bg-gradient-to-br p-6 lg:p-8 dark:border-slate-300/10 dark:from-purple-500/5 dark:shadow-purple-100/5"
			>
				<div class="gap-4 md:flex">
					<div class="flex size-10 shrink-0 items-center justify-center">
						<LucideIcon name="Route" class="size-7 stroke-1 text-purple-500" />
					</div>
					<div class="grow">
						<h6 class="text-16 mb-1">Automatic payment reminders</h6>
						<p class="text-gray-500">
							Send digital invoices in seconds via email, SMS, or a shareable link. Your customers
							can pay instantly with just one click using their preferred method.
						</p>
					</div>
				</div>
			</Col><!--end col-->
			<Col
				cols={{ span: 12 }}
				md={{ span: 6 }}
				class="dark:to-body-invoice rounded border border-gray-200 bg-gradient-to-br p-6 lg:p-8 dark:border-slate-300/10 dark:from-purple-500/5 dark:shadow-purple-100/5"
			>
				<div class="gap-4 md:flex">
					<div class="flex size-10 shrink-0 items-center justify-center">
						<LucideIcon name="CalendarDays" class="size-7 stroke-1 text-purple-500" />
					</div>
					<div class="grow">
						<h6 class="text-16 mb-1">Invoice date</h6>
						<p class="text-gray-500">
							What should an invoice include? If you want to issue an invoice, then the word
							“invoice” must appear on it. This tells you that it is an official document that
							confirms.
						</p>
					</div>
				</div>
			</Col><!--end col-->
		</Grid><!--end grid-->
	</div>
	<!--end container-->
</section>

<!-- case -->
<section class="relative py-20" id="case">
	<div class="container mx-auto max-w-[1350px] px-4">
		<Grid cols={12} class="grid grid-cols-12 items-center">
			<Col cols={{ span: 12 }} lg={{ span: 5 }}>
				<h2 class="mb-2 text-2xl leading-normal capitalize sm:text-3xl md:text-4xl">
					Get paid quickly and easily with Domiex's online invoicing software and system.
				</h2>
				<p class="mb-5 text-gray-500">
					Invoicing software generates billing for services and products. It streamlines the process
					for getting paid, giving your business an accurate picture of its finances, ensuring
					liquidity.
				</p>
				<a href="/apps-invoice-overview-1" class="btn btn-purple">
					View Invoice
					<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
				</a>
			</Col>
			<Col cols={{ span: 12 }} lg={{ span: 5 }} class="mt-10 lg:col-start-8 lg:mt-0">
				<div class="relative">
					<svg viewBox="0 0 402 397" class="absolute right-0 -bottom-24 size-64 2xl:-right-24">
						<g id="&lt;Group&gt;">
							<g id="&lt;Group&gt;">
								<g id="&lt;Group&gt;">
									<path
										id="&lt;Compound Path&gt;"
										fill-rule="evenodd"
										class="dark:fill-muted-invoice/10 fill-gray-100/50"
										d="m28.9 275.3c-42.1-96.6 2.3-209.3 98.8-251.4 96.6-42.1 209.3 2.3 251.4 98.8 42 96.6-2.3 209.3-98.8 251.4-96.6 42-209.3-2.3-251.4-98.8zm346.5-151c-41.2-94.5-151.6-137.9-246.1-96.7-94.5 41.1-137.9 151.5-96.7 246.1 41.1 94.5 151.5 137.9 246.1 96.7 94.5-41.2 137.9-151.6 96.7-246.1z"
									/>
								</g>
							</g>
							<g id="&lt;Group&gt;">
								<g id="&lt;Group&gt;">
									<path
										id="&lt;Compound Path&gt;"
										fill-rule="evenodd"
										class="dark:fill-muted-invoice/10 fill-gray-100/50"
										d="m57.3 262.7c-33.3-76.4-1.4-166.6 72.5-205.4 78.1-40.9 174.9-10.6 215.8 67.5 1.8 3.4 3.5 6.9 5.1 10.5 33.2 76.4 1.4 166.6-72.5 205.3-37.9 19.8-81.1 23.7-121.9 11-40.8-12.7-74.1-40.6-94-78.4-1.7-3.4-3.4-7-5-10.5zm289.7-125.8c-1.5-3.5-3.2-6.9-4.9-10.2-39.9-76.2-134.3-105.7-210.4-65.8-72.1 37.7-103.2 125.7-70.7 200.2 1.5 3.4 3.1 6.9 4.9 10.2 19.3 36.9 51.8 64.1 91.6 76.5 39.7 12.4 81.9 8.6 118.8-10.7 72.1-37.8 103.1-125.7 70.7-200.2z"
									/>
								</g>
							</g>
							<g id="&lt;Group&gt;">
								<g id="&lt;Group&gt;">
									<path
										id="&lt;Compound Path&gt;"
										fill-rule="evenodd"
										class="dark:fill-muted-invoice/10 fill-gray-100/50"
										d="m84.7 250.8c-25.1-57.7-5.3-125 47.1-160 59.7-39.7 140.5-23.6 180.3 36 4.3 6.5 8.1 13.3 11.2 20.4 25.1 57.7 5.3 125-47.2 159.9-59.6 39.8-140.5 23.7-180.3-36-4.3-6.4-8-13.3-11.1-20.3zm234.9-102c-3-6.8-6.6-13.5-10.8-19.7-38.6-57.8-116.9-73.5-174.7-34.9-50.9 33.9-70.1 99.1-45.7 155 3 6.8 6.6 13.5 10.8 19.7 38.5 57.8 116.9 73.5 174.7 34.9 50.8-33.9 70-99.1 45.7-155z"
									/>
								</g>
							</g>
							<g id="&lt;Group&gt;">
								<g id="&lt;Group&gt;">
									<path
										id="&lt;Compound Path&gt;"
										fill-rule="evenodd"
										class="dark:fill-muted-invoice/10 fill-gray-100/50"
										d="m110.1 239.9c-17.2-39.5-7.7-85.9 23.7-115.5 19.9-18.7 45.9-28.6 73.3-27.8 27.3 0.9 52.7 12.3 71.4 32.2 8.2 8.6 14.7 18.5 19.4 29.3 17.2 39.5 7.7 85.9-23.7 115.4-41.1 38.7-106.1 36.8-144.8-4.3-8.1-8.7-14.6-18.5-19.3-29.3zm184.1-80.2c-4.5-10.4-10.8-19.9-18.6-28.2-18-19.1-42.4-30.1-68.7-30.9-26.2-0.8-51.2 8.7-70.4 26.8-30.1 28.4-39.3 72.9-22.7 110.9 4.5 10.4 10.7 19.8 18.6 28.1 37.1 39.5 99.5 41.4 139 4.2 30.2-28.4 39.4-73 22.8-110.9z"
									/>
								</g>
							</g>
						</g>
					</svg>
					<img
						src="/assets/images/invoice/img-01.jpg"
						alt=""
						class="thumbnail rounded-md shadow-lg shadow-gray-200"
					/>
				</div>
			</Col>
		</Grid>
	</div>
</section>

<section class="relative bg-[url('/assets/images/invoice/cta.jpg')] py-12 md:py-24">
	<div class="container mx-auto max-w-[1350px] px-4">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="absolute inset-0 top-24 text-7xl text-gray-100/5 uppercase">Invoice Demo</h2>
			<div class="relative">
				<h2 class="mb-2 leading-normal text-white capitalize xl:mt-10">Ready to give it a try?</h2>
				<p class="mb-5 text-slate-200/50">
					A standard invoice typically includes a header with the business name and contact details,
					a list of products or services provided with their prices, and the total amount due.
				</p>
				<div class="space-y-2 space-x-2">
					<button type="button" class="btn btn-purple">Try for free</button>
					<button
						type="button"
						class="btn bg-white font-medium hover:bg-gray-100 dark:text-gray-900"
						><LucideIcon name="CalendarFold" class="inline-block size-4 ltr:mr-1 rtl:ml-1"
						></LucideIcon> Schedule Demo</button
					>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Community -->
<section class="relative pt-12 md:py-20" id="community">
	<svg
		viewBox="0 0 156 54"
		width="156"
		height="54"
		class="top-56 hidden md:absolute ltr:left-48 ltr:-rotate-45 rtl:right-48 rtl:rotate-45"
	>
		<g id="&lt;Group&gt;">
			<path
				id="&lt;Path&gt;"
				class="fill-yellow-300"
				d="m36.7 49.8l-24.8-29.7 6.1-5.2 18.7 22.5 21.9-26.1 21.8 26.1 21.8-26.1 21.8 26.1 18.8-22.5 6.1 5.2-24.9 29.7-21.8-26.1-21.8 26.1-21.8-26.1z"
			/>
		</g>
	</svg>
	<div class="container mx-auto max-w-[1350px] px-4">
		<div class="mx-auto max-w-[800px] pb-10 text-center">
			<h2 class="mb-2 text-2xl leading-normal capitalize sm:text-3xl md:text-4xl">
				Ready to <span class="text-purple-500">get Started</span>
			</h2>
			<p class="dark:text-muted-invoice text-gray-500">
				The business name and address of the customer you're invoicing. a clear description of what
				you're charging for.
			</p>
		</div>
		<!--end col-->
		<div class="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
			<div>
				<div
					class="dark:to-body-invoice rounded-sm border border-gray-200 bg-gradient-to-br dark:border-slate-300/10 dark:from-purple-500/5 dark:shadow-purple-100/5"
				>
					<div class="p-8">
						<h6 class="text-16 mb-1 flex items-center gap-3">
							<LucideIcon name="Flower" class="inline-block size-5 text-green-500" /> Lite Plan
						</h6>
						<p class="mb-8 text-gray-500">Free account with limited features</p>

						<h2 class="mb-6">
							$9.99<sub class="text-14 fotn-normal text-gray-500">/monthly</sub>
						</h2>
						<button type="button" class="btn btn-sub-purple w-full">Get Started</button>
						<div class="mt-6">
							<ul class="space-y-3 *:flex *:items-center *:gap-2">
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> 30 Products
									& Projects
								</li>
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> Custom Permissions
								</li>
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> Some Basic Integration
								</li>
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> Up to 50 Team
									Members
								</li>
								<li class="text-gray-500">
									<LucideIcon name="X" class="inline-block size-4 text-red-500" /> Advanced Security
								</li>
								<li class="text-gray-500">
									<LucideIcon name="X" class="inline-block size-4 text-red-500" /> Permissions & Workflows
								</li>
								<li class="text-gray-500">
									<LucideIcon name="X" class="inline-block size-4 text-red-500" /> 24/7 Support
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!--end col-->
			<div>
				<div
					class="dark:to-body-invoice overflow-hidden rounded border border-purple-500 bg-gradient-to-br dark:from-purple-500/5 dark:shadow-purple-100/5"
				>
					<div class="bg-purple-500 p-3 text-center text-purple-50">Most Popular</div>
					<div class="p-8">
						<h6 class="text-16 mb-1 flex items-center gap-3">
							<LucideIcon name="Flower" class="inline-block size-5 text-green-500"></LucideIcon> Professional
							Plan
						</h6>
						<p class="mb-8 text-gray-500">Free account with limited features</p>

						<h2 class="mb-6">
							$19.99<sub class="text-14 fotn-normal text-gray-500">/monthly</sub>
						</h2>
						<button type="button" class="btn btn-purple w-full">Get Started</button>
						<div class="mt-6">
							<ul class="space-y-3 *:flex *:items-center *:gap-2">
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> 30 Products
									& Projects
								</li>
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> Custom Permissions
								</li>
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> Some Basic Integration
								</li>
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> Up to 50 Team
									Members
								</li>
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> Advanced Security
								</li>
								<li class="text-gray-500">
									<LucideIcon name="X" class="inline-block size-4 text-red-500" /> Permissions & Workflows
								</li>
								<li class="text-gray-500">
									<LucideIcon name="X" class="inline-block size-4 text-red-500" /> 24/7 Support
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!--end col-->
			<div>
				<div
					class="dark:to-body-invoice rounded-sm border border-gray-200 bg-gradient-to-br dark:border-slate-300/10 dark:from-purple-500/5 dark:shadow-purple-100/5"
				>
					<div class="p-8">
						<h6 class="text-16 mb-1 flex items-center gap-3">
							<LucideIcon name="Flower" class="inline-block size-5 text-green-500"></LucideIcon> Business
							Plan
						</h6>
						<p class="mb-8 text-gray-500">Free account with limited features</p>

						<h2 class="mb-6">
							$29.99<sub class="text-14 fotn-normal text-gray-500">/monthly</sub>
						</h2>
						<button type="button" class="btn btn-sub-purple w-full">Get Started</button>
						<div class="mt-6">
							<ul class="space-y-3 *:flex *:items-center *:gap-2">
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> 30 Products
									& Projects
								</li>
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> Custom Permissions
								</li>
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> Some Basic Integration
								</li>
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> Up to 50 Team
									Members
								</li>
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> Advanced Security
								</li>
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> Permissions
									& Workflows
								</li>
								<li>
									<LucideIcon name="Redo2" class="inline-block size-4 text-green-500" /> 24/7 Support
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!--end col-->
		</div>
		<!--end grid-->
	</div>
</section>

<!-- Contact-us -->
<section class="relative py-12 md:py-20" id="contact-us">
	<div class="container mx-auto max-w-[1350px] px-4">
		<Grid cols={12} class="mb-10 items-center">
			<Col cols={{ span: 12 }} md={{ span: 8 }} class="text-center md:col-start-3">
				<h2 class="mb-2 text-2xl leading-normal capitalize sm:text-3xl md:text-4xl">
					Love for hear from you <span class="text-purple-500">Get in Touch</span>
				</h2>
				<p class="text-gray-500">
					If you get in touch with someone, you contact them by writing to them or phoning them.
				</p>
			</Col>
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
					<button type="submit" class="btn btn-purple w-full max-w-[200px]">Send Inquiry</button>
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
