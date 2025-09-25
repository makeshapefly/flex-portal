<script lang="ts">
	// @ts-nocheck
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { onMount } from 'svelte';
	import AOS from 'aos';
	import 'aos/dist/aos.css';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import DarkMode from '$lib/components/common/DarkMode.svelte';

	let isSticky = false;
	let isMenuOpen = false;
	let activeTab = 0;
	let selected: number | null = null;
	let year = new Date().getFullYear();

	// This will hold all the questions and their respective content
	const faqItems = [
		{
			id: 1,
			question: 'What are the features of email?',
			answer:
				'Emails are automatically date and time stamped. signatures can be attached. files, graphics or sound can be sent as attachments, often in compressed formats. webmail and mobile email.'
		},
		{
			id: 2,
			question: 'How do you use email features?',
			answer:
				"Change smart features & personalization settings:\n\n- On your Android phone or tablet, open Gmail.\n- Tap Menu. Settings. the account you want to change.\n- Scroll to the 'General' section."
		},
		{
			id: 3,
			question: 'What is the main use of email?',
			answer:
				'Email is a beneficial way to communicate with individuals or small groups of friends or colleagues. It enables users to easily send and receive documents, images, links, and other files. It also gives users the flexibility to communicate with others on their own schedule. Notifications, reminders, and follow-ups.'
		},
		{
			id: 4,
			question: 'How email really works?',
			answer:
				"The email client (web/ mobile/ desktop) connects to the Outgoing SMTP server based on the email account you used. The email client hands over the email in MIME format to the Outgoing SMTP server. The Outgoing SMTP validates the sender's details and processes the message for sending."
		},
		{
			id: 5,
			question: 'What are emails used for?',
			answer:
				'Email is used for many different purposes, including contacting friends, communicating with professors and supervisors, requesting information, and applying for jobs, internships, and scholarships.'
		}
	];

	// Toggle selected state
	const toggleSelected = (id: number) => {
		selected = selected === id ? null : id;
	};
	const handleScroll = () => {
		isSticky = window.scrollY > 0;
	};

	onMount(() => {
		AOS.init();
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
		<div class="container mx-auto flex w-full items-center justify-between gap-5 px-4">
			<a href="/index" title="Logo">
				<img src="/assets/images/main-logo.png" alt="" class="inline-block h-7 dark:hidden" />
				<img src="/assets/images/logo-white.png" alt="" class="hidden h-7 dark:inline-block" />
			</a>
			<div
				class={`navbar-collapase ltr:mr-auto rtl:ml-auto ${!isMenuOpen ? 'hidden xl:flex' : ''}`}
			>
				<div
					class="*:text-16 flex flex-col *:inline-block *:py-3 *:font-medium *:tracking-wide xl:flex-row xl:items-center xl:py-0 xl:*:px-3"
				>
					<a
						href="#services"
						title="services"
						on:click={() => (activeTab = 1)}
						class:active={activeTab === 1}
						class="[&.active]:text-primary-500 hover:text-primary-500 leading-normal transition duration-300 ease-linear"
						>Service</a
					>
					<a
						href="#pricing"
						title="pricing"
						on:click={() => (activeTab = 2)}
						class:active={activeTab === 2}
						class="[&.active]:text-primary-500 hover:text-primary-500 leading-normal transition duration-300 ease-linear"
						>Pricing</a
					>
					<a
						href="#features"
						title="features"
						on:click={() => (activeTab = 3)}
						class:active={activeTab === 3}
						class="[&.active]:text-primary-500 hover:text-primary-500 leading-normal transition duration-300 ease-linear"
						>Features</a
					>
					<a
						href="#templates"
						title="templates"
						on:click={() => (activeTab = 4)}
						class:active={activeTab === 4}
						class="[&.active]:text-primary-500 hover:text-primary-500 leading-normal transition duration-300 ease-linear"
						>Templates</a
					>
					<a
						href="#faq"
						title="faq"
						on:click={() => (activeTab = 5)}
						class:active={activeTab === 5}
						class="[&.active]:text-primary-500 hover:text-primary-500 leading-normal transition duration-300 ease-linear"
						>FAQ's</a
					>
					<a
						href="#updates"
						title="updates"
						on:click={() => (activeTab = 6)}
						class:active={activeTab === 6}
						class="[&.active]:text-primary-500 hover:text-primary-500 leading-normal transition duration-300 ease-linear"
						>Updates</a
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
			<div>
				<a href="/auth-signin-basic" class="btn btn-active-gray">Sign In</a>
				<button type="button" class="btn btn-sub-primary hidden md:inline-block"
					>Get for free</button
				>
			</div>
		</div>
	</header>
</div>
<!----------End Menu------------>

<section class="relative overflow-hidden pt-28 pb-20 lg:pt-40 xl:pb-48 2xl:pt-80">
	<div class="container mx-auto px-4">
		<Grid cols={12} class="lg:gap-x-16">
			<Col cols={{ span: 12 }} xl={{ span: 5 }} data-aos="fade-up" data-aos-duration="2000">
				<h2 class="mb-2 leading-normal capitalize xl:text-5xl xl:leading-normal">
					Customers with the <span class="text-primary-500">#1</span> email marketing and automation.
				</h2>
				<p class="dark:text-dark-500 mb-5 text-lg text-gray-500">
					With AI-powered threat defenses, enterprise-grade security and privacy controls, and
					Google's security-by-design cloud infrastructure, Gmail helps keep your data protected,
					confidential, and compliant.
				</p>
				<div class="flex flex-wrap items-center gap-3">
					<a href="/apps-mailbox" class="btn btn-primary"
						>Request Demo <LucideIcon name="MoveRight" class="ml-1 inline-block size-4" /></a
					>
					<button type="button" class="dark:border-dark-800 btn btn-outline-gray border-gray-200"
						>Open in you browser</button
					>
				</div>
			</Col>
			<Col cols={{ span: 12 }} xl={{ span: 6 }} class="mt-8 md:mt-10 xl:col-start-7 xl:mt-0">
				<div>
					<img
						src="assets/images/email/main.png"
						alt=""
						class="dark:border-dark-800 relative rounded-lg border border-gray-200 object-cover xl:top-16 xl:scale-[1.8] 2xl:top-auto ltr:xl:-right-44 rtl:xl:-left-44 dark:hidden"
					/>
					<img
						src="assets/images/email/email-dark.png"
						alt=""
						class="dark:border-dark-800 relative hidden rounded-lg border border-gray-200 object-cover xl:top-16 xl:scale-[1.8] 2xl:top-auto ltr:xl:-right-44 rtl:xl:-left-44 dark:block"
					/>
				</div>
			</Col>
		</Grid>
	</div>
</section>

<!-- Services -->
<section class="dark:bg-dark-900/50 relative bg-gray-50 py-12 md:py-24" id="services">
	<div class="container mx-auto px-4">
		<Grid cols={1} class="gap-space md:grid-cols-2 lg:grid-cols-3">
			<div data-aos="fade-up" data-aos-duration="2000">
				<div class="text-primary-500 dark:bg-dark-900 mb-4 size-14 rounded-lg bg-white p-4">
					<LucideIcon name="Fan" class="fill-primary-100" />
				</div>
				<h5 class="mb-1">Stay Professional</h5>
				<p class="dark:text-dark-500 text-16 mb-4 text-gray-500">
					To most people, acting like a professional means working and behaving in such a way that
					others think of them as competent, reliable and respectful.
				</p>
				<a href="#!" class="link link-primary text-16"
					>Read More <LucideIcon name="MoveRight" class="ml-1 inline-block size-4" /></a
				>
			</div>
			<div data-aos="fade-up" data-aos-duration="2000">
				<div class="text-primary-500 dark:bg-dark-900 mb-4 size-14 rounded-lg bg-white p-4">
					<LucideIcon name="GalleryVerticalEnd" class="fill-primary-100" />
				</div>
				<h5 class="mb-1">Notes & Documents</h5>
				<p class="dark:text-dark-500 text-16 mb-4 text-gray-500">
					A mortgage note document is a legally binding instrument that outlines the terms of a loan
					agreement between a borrower and a lender, specifying.
				</p>
				<a href="#!" class="link link-primary text-16"
					>Read More <LucideIcon name="MoveRight" class="ml-1 inline-block size-4" /></a
				>
			</div>
			<div data-aos="fade-up" data-aos-duration="2000">
				<div class="text-primary-500 dark:bg-dark-900 mb-4 size-14 rounded-lg bg-white p-4">
					<LucideIcon name="Gem" class="fill-primary-100" />
				</div>
				<h5 class="mb-1">Automation</h5>
				<p class="dark:text-dark-500 text-16 mb-4 text-gray-500">
					Automation is the application of technology, programs, robotics or processes to achieve
					outcomes with minimal human input.
				</p>
				<a href="#!" class="link link-primary text-16"
					>Read More <LucideIcon name="MoveRight" class="ml-1 inline-block size-4" /></a
				>
			</div>
		</Grid>
	</div>
</section>

<!-- Pricing -->
<section class="relative py-12 md:py-24" id="pricing">
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-12 max-w-3xl text-center">
			<h2 class="mb-3 leading-normal capitalize">Choose the plan that suits you best</h2>
			<p class="dark:text-dark-500 text-16 text-gray-500">
				A pricing strategy is a model or method used to establish the best price for a product or
				service. It helps you choose prices to maximize profits and shareholder value while
				considering.
			</p>
		</div>

		<Grid cols={1} gap={6} class="md:grid-cols-2 lg:grid-cols-3">
			<div class="card relative overflow-hidden" data-aos="fade-up" data-aos-duration="2000">
				<div
					class="dark:border-dark-850 rounded-creative absolute -right-16 -bottom-16 size-64 border-[40px] border-gray-100"
				></div>
				<div class="card-body relative lg:p-8">
					<div class="mb-8 text-center">
						<h5 class="mb-1">Free</h5>
						<p class="dark:text-dark-500 mb-6 text-gray-500">
							Explore domiex mail together, for the
						</p>
						<h1>$0<sub class="dark:text-dark-500 text-sm text-gray-500">/month</sub></h1>
					</div>
					<a href="/pages-pricing" class="btn btn-sub-gray w-full">Get Started for free</a>
					<ul class="mt-7 space-y-4 *:flex *:items-center *:gap-2">
						<li>
							<LucideIcon
								name="CornerDownRight"
								class="inline-block size-4 fill-green-500/10 text-green-500"
							/> 500 Emails
						</li>
						<li>
							<LucideIcon
								name="CornerDownRight"
								class="inline-block size-4 fill-green-500/10 text-green-500"
							/> 5 Automation Action
						</li>
						<li>
							<LucideIcon
								name="CornerDownRight"
								class="inline-block size-4 fill-green-500/10 text-green-500"
							/> 1 Products & Projects
						</li>
						<li>
							<LucideIcon
								name="X"
								class="dark:text-dark-500 dark:fill-dark-850 inline-block size-4 fill-gray-100 text-gray-500"
							/> Custom Permissions
						</li>
						<li>
							<LucideIcon
								name="X"
								class="dark:text-dark-500 dark:fill-dark-850 inline-block size-4 fill-gray-100 text-gray-500"
							/> Some Basic Integration
						</li>
						<li>
							<LucideIcon
								name="X"
								class="dark:text-dark-500 dark:fill-dark-850 inline-block size-4 fill-gray-100 text-gray-500"
							/> Up to 5 Team Members
						</li>
						<li>
							<LucideIcon
								name="X"
								class="dark:text-dark-500 dark:fill-dark-850 inline-block size-4 fill-gray-100 text-gray-500"
							/> 24/7 Support
						</li>
					</ul>
				</div>
			</div>
			<div
				class="card active group relative overflow-hidden"
				data-aos="fade-up"
				data-aos-duration="2000"
			>
				<div
					class="dark:border-dark-850 rounded-creative absolute -right-16 -bottom-16 size-64 border-[40px] border-gray-100"
				></div>
				<div class="card-body relative lg:p-8">
					<div class="badge badge-pink absolute top-5 right-5">Popular Plan</div>
					<div class="mb-8 text-center">
						<h5 class="mb-1">Professional</h5>
						<p class="mb-6 text-gray-500">For professionals & small teams</p>
						<h1>$29.99<sub class="text-sm text-gray-500">/month</sub></h1>
					</div>
					<a href="/pages-pricing" class="btn btn-primary w-full">Get Started</a>
					<ul class="mt-7 space-y-4 *:flex *:items-center *:gap-2">
						<li>
							<LucideIcon
								name="CornerDownRight"
								class="inline-block size-4 fill-green-500/10 text-green-500"
							/> 2000 Emails
						</li>
						<li>
							<LucideIcon
								name="CornerDownRight"
								class="inline-block size-4 fill-green-500/10 text-green-500"
							/> 20 Automation Action
						</li>
						<li>
							<LucideIcon
								name="CornerDownRight"
								class="inline-block size-4 fill-green-500/10 text-green-500"
							/> 1 Products & Projects
						</li>
						<li>
							<LucideIcon
								name="CornerDownRight"
								class="inline-block size-4 fill-green-500/10 text-green-500"
							/> Custom Permissions
						</li>
						<li>
							<LucideIcon
								name="X"
								class="dark:text-dark-500 dark:fill-dark-850 inline-block size-4 fill-gray-100 text-gray-500"
							/> Some Basic Integration
						</li>
						<li>
							<LucideIcon
								name="X"
								class="dark:text-dark-500 dark:fill-dark-850 inline-block size-4 fill-gray-100 text-gray-500"
							/> Up to 5 Team Members
						</li>
						<li>
							<LucideIcon
								name="X"
								class="dark:text-dark-500 dark:fill-dark-850 inline-block size-4 fill-gray-100 text-gray-500"
							/> 24/7 Support
						</li>
					</ul>
				</div>
			</div>
			<div class="card relative overflow-hidden" data-aos="fade-up" data-aos-duration="2000">
				<div
					class="dark:border-dark-850 rounded-creative absolute -right-16 -bottom-16 size-64 border-[40px] border-gray-100"
				></div>
				<div class="card-body relative lg:p-8">
					<div class="mb-8 text-center">
						<h5 class="mb-1">Organization</h5>
						<p class="dark:text-dark-500 mb-6 text-gray-500">
							Ideal for fastest growing businesses
						</p>
						<h1>Lat's Chat</h1>
					</div>
					<a href="/pages-contact-us" class="btn btn-sub-gray w-full">Contact Us</a>
					<ul class="mt-7 space-y-4 *:flex *:items-center *:gap-2">
						<li>
							<LucideIcon
								name="CornerDownRight"
								class="inline-block size-4 fill-green-500/10 text-green-500"
							/> Unlimited Emails
						</li>
						<li>
							<LucideIcon
								name="CornerDownRight"
								class="inline-block size-4 fill-green-500/10 text-green-500"
							/> Unlimited automation
						</li>
						<li>
							<LucideIcon
								name="CornerDownRight"
								class="inline-block size-4 fill-green-500/10 text-green-500"
							/> 1 Products & Projects
						</li>
						<li>
							<LucideIcon
								name="CornerDownRight"
								class="inline-block size-4 fill-green-500/10 text-green-500"
							/> Access All Features
						</li>
						<li>
							<LucideIcon
								name="CornerDownRight"
								class="inline-block size-4 fill-green-500/10 text-green-500"
							/> Flexible Contract
						</li>
						<li>
							<LucideIcon
								name="CornerDownRight"
								class="inline-block size-4 fill-green-500/10 text-green-500"
							/> Advanced Integration
						</li>
						<li>
							<LucideIcon
								name="CornerDownRight"
								class="inline-block size-4 fill-green-500/10 text-green-500"
							/> 24/7 Support
						</li>
					</ul>
				</div>
			</div>
		</Grid>
	</div>
</section>

<!-- Features -->
<section class="relative md:pb-28" id="features">
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-12 max-w-3xl text-center">
			<h2 class="mb-3 leading-normal capitalize">Domiex Email Features</h2>
			<p class="dark:text-dark-500 text-16 text-gray-500">
				Collaborate with your teammates using our real-time editor to compose professional emails.
			</p>
		</div>
		<Grid cols={12} gapX="space">
			<Col
				cols={{ span: 12 }}
				md={{ span: 3 }}
				class="dark:bg-dark-900/40 card row-span-2 bg-gray-100 text-center"
			>
				<CardBody>
					<img
						src="assets/images/email/features-1.png"
						alt=""
						class="w-full rounded-md dark:hidden"
					/>
					<img
						src="assets/images/email/features-1-dark.png"
						alt=""
						class="hidden w-full rounded-md dark:block"
					/>
					<h6 class="mt-4">Easy to change Email Accounts</h6>
				</CardBody>
			</Col>
			<Col
				cols={{ span: 12 }}
				md={{ span: 5 }}
				class="dark:bg-dark-900/40 card row-span-2 bg-gray-100 text-center"
			>
				<CardBody>
					<img
						src="assets/images/email/features-2.png"
						alt=""
						class="w-full rounded-md dark:hidden"
					/>
					<img
						src="assets/images/email/features-2-dark.png"
						alt=""
						class="hidden w-full rounded-md dark:block"
					/>
					<h6 class="mt-4">Filter wise Email Lists</h6>
				</CardBody>
			</Col>
			<Col
				cols={{ span: 12 }}
				md={{ span: 4 }}
				class="dark:bg-dark-900/40 card bg-gray-100 text-center"
			>
				<CardBody class="space-y-8">
					<div>
						<img
							src="assets/images/email/features-3.png"
							alt=""
							class="w-full rounded-md dark:hidden"
						/>
						<img
							src="assets/images/email/features-3-dark.png"
							alt=""
							class="hidden w-full rounded-md dark:block"
						/>
						<h6 class="mt-4">Reply & New Added</h6>
					</div>

					<div>
						<img
							src="assets/images/email/features-4.png"
							alt=""
							class="w-full rounded-md dark:hidden"
						/>
						<img
							src="assets/images/email/features-4-dark.png"
							alt=""
							class="hidden w-full rounded-md dark:block"
						/>
						<h6 class="mt-4">Email Reads</h6>
					</div>
				</CardBody>
			</Col>
		</Grid>
	</div>
</section>

<!-- Templates -->
<section class="bg-primary-900 relative lg:py-24" id="templates">
	<div class="container mx-auto px-4">
		<div class="gap-x-16 lg:flex">
			<div class="w-full py-12 text-white lg:w-3/5 lg:py-0">
				<h2 class="mb-2 leading-normal capitalize xl:text-5xl">
					Customers with the <span class="text-primary-500">#1</span> email marketing and automation.
				</h2>
				<p class="mb-5 text-lg text-white">
					Email automation helps you find your audience and engage your customers. Unlike manual
					campaigns, automations run in the background while you tend to other valuable tasks. With
					automation, you can send personalized individual.
				</p>
				<div class="flex flex-wrap items-center gap-3">
					<a href="/dashboard-email" class="btn btn-primary"
						>Request Demo <LucideIcon name="MoveRight" class="ml-1 inline-block size-4" /></a
					>
					<button type="button" class="btn"
						>Open in you browser <LucideIcon
							name="MoveRight"
							class="ml-1 inline-block size-4"
						/></button
					>
				</div>
			</div>
			<div class="lg:w-2/5">
				<img
					src="/assets/images/email/cta.png"
					alt=""
					class="relative mx-auto w-[300px] rounded-lg object-cover xl:-mt-16 xl:scale-150"
				/>
			</div>
		</div>
	</div>
</section>

<!-- faq -->
<section class="relative py-12 md:py-24" id="faq">
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-12 max-w-3xl text-center">
			<h2 class="mb-3 leading-normal capitalize">Don't Just Take Our Word For It</h2>
			<p class="dark:text-dark-500 text-16 text-gray-500">
				Frequently asked questions. <a href="#!" class="font-medium text-gray-800 underline"
					>View All FAQs</a
				>
			</p>
		</div>
		<div class="grid grid-cols-12">
			<div class="col-span-12 lg:col-span-8 lg:col-start-3">
				<div>
					{#each faqItems as { id, question, answer }}
						<div class="dark:border-dark-800 relative border-b border-gray-200 last:border-0">
							<button
								type="button"
								class="block w-full px-4 py-4 font-medium transition duration-200 ease-linear md:px-5"
								on:click={() => toggleSelected(id)}
								class:bg-gray-50={selected === id}
								class:text-gray-500={selected === id}
								class:dark:text-dark-500={selected === id}
								class:dark:bg-dark-900={selected === id}
							>
								<div class="flex items-center justify-between">
									<span>{question}</span>
									<span
										class="dark:text-dark-500 ico-down text-gray-500"
										class:hidden={selected === id}
									>
										<LucideIcon name="ChevronDown" class="size-5" />
									</span>
									<span
										class="dark:text-dark-500 ico-up text-gray-500"
										class:hidden={selected !== id}
									>
										<LucideIcon name="ChevronUp" class="size-5" />
									</span>
								</div>
							</button>
							{#if selected === id}
								<div
									class="relative overflow-hidden transition-all duration-700"
									style="max-height: 1000px;"
								>
									<div class="dark:text-dark-500 p-5 text-gray-500">
										<p>{answer}</p>
									</div>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<section
	class="dark:bg-dark-900/50 relative overflow-hidden bg-gray-50 pt-12 md:pt-24"
	id="updates"
>
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-10 max-w-3xl text-center">
			<h2 class="mb-3 leading-normal capitalize">Customers can easily receive new updates</h2>
			<p class="dark:text-dark-500 text-16 mb-7 text-gray-500">
				Domiex enables seamless collaboration with clients and team members.
			</p>
			<div class="flex flex-wrap items-center justify-center gap-2">
				<button type="button" class="btn btn-primary"
					><LucideIcon name="Apple" class="mr-1 mb-0.5 inline-block size-4" /> Download For Mac</button
				>
				<button type="button" class="btn btn-sub-gray"
					>Open Live Demos <LucideIcon
						name="MoveRight"
						class="mb-0.5 ml-1 inline-block size-4"
					/></button
				>
			</div>
		</div>
		<div class="grid grid-cols-12">
			<div class="col-span-12 lg:col-span-10 lg:col-start-2">
				<img
					src="assets/images/email/email.png"
					alt=""
					class="dark:border-dark-800 relative -bottom-5 rounded-lg border-2 border-gray-200 dark:hidden"
					data-aos="fade-up"
					data-aos-duration="2000"
					data-aos-offset="300"
				/>
				<img
					src="assets/images/email/email-dark.png"
					alt=""
					class="dark:border-dark-800 relative -bottom-5 hidden rounded-lg border-2 border-gray-200 dark:block"
					data-aos="fade-up"
					data-aos-duration="2000"
					data-aos-offset="300"
				/>
			</div>
		</div>
	</div>
</section>

<footer class="dark:bg-dark-900 relative bg-gray-900">
	<div class="py-12 lg:py-20">
		<div class="container mx-auto px-4">
			<Grid cols={12} gap={6}>
				<Col cols={{ span: 12 }} xl={{ span: 6 }}>
					<div class="max-w-lg">
						<a href="/index" title="logo"
							><img src="assets/images/logo-white.png" alt="" class="h-7" /></a
						>
						<p class="dark:text-dark-500 text-16 mt-4 mb-6 text-gray-500">
							This email and any attachments may contain confidential information. If you are not
							the intended recipient, please notify the sender immediately and delete this email.
							Unauthorized use, disclosure, or copying of the contents is strictly prohibited.
						</p>
						<div class="flex items-center gap-5">
							<a
								href="#!"
								title="facebook"
								class="dark:after:bg-dark-800/50 text-primary-500 relative flex size-10 items-center justify-center transition duration-300 ease-linear after:absolute after:inset-0 after:-rotate-45 after:rounded-lg after:bg-gray-800/50 hover:-translate-y-1"
								><LucideIcon name="Facebook" class="relative z-10 size-5" /></a
							>
							<a
								href="#!"
								title="dribbble"
								class="dark:after:bg-dark-800/50 relative flex size-10 items-center justify-center text-pink-500 transition duration-300 ease-linear after:absolute after:inset-0 after:-rotate-45 after:rounded-lg after:bg-gray-800/50 hover:-translate-y-1"
								><LucideIcon name="Dribbble" class="relative z-10 size-5" /></a
							>
							<a
								href="#!"
								title="twitter"
								class="dark:after:bg-dark-800/50 relative flex size-10 items-center justify-center text-sky-500 transition duration-300 ease-linear after:absolute after:inset-0 after:-rotate-45 after:rounded-lg after:bg-gray-800/50 hover:-translate-y-1"
								><LucideIcon name="Twitter" class="relative z-10 size-5" /></a
							>
							<a
								href="#!"
								title="youtube"
								class="dark:after:bg-dark-800/50 relative flex size-10 items-center justify-center text-red-500 transition duration-300 ease-linear after:absolute after:inset-0 after:-rotate-45 after:rounded-lg after:bg-gray-800/50 hover:-translate-y-1"
								><LucideIcon name="Youtube" class="relative z-10 size-5" /></a
							>
						</div>
					</div>
				</Col><!--end col-->
				<Col cols={{ span: 12 }} md={{ span: 4 }} xl={{ span: 2 }}>
					<h6 class="dark:text-dark-200 text-17 mb-4 text-gray-200">Features</h6>
					<ul class="text-16 space-y-5">
						<li><a href="#!" class="link link-primary">Modern Inbox</a></li>
						<li><a href="#!" class="link link-primary">Search</a></li>
						<li><a href="#!" class="link link-primary">Send Later</a></li>
						<li><a href="#!" class="link link-primary">All Features</a></li>
						<li><a href="#!" class="link link-primary">Dashboards</a></li>
					</ul>
				</Col>
				<Col cols={{ span: 12 }} md={{ span: 4 }} xl={{ span: 2 }}>
					<h6 class="text-17 mb-4 text-gray-200">Resource</h6>
					<ul class="text-16 space-y-5">
						<li><a href="#!" class="link link-primary">Blog</a></li>
						<li><a href="#!" class="link link-primary">Help Center</a></li>
						<li><a href="#!" class="link link-primary">Community</a></li>
						<li><a href="#!" class="link link-primary">Video</a></li>
						<li><a href="#!" class="link link-primary">FAQ's</a></li>
						<li><a href="#!" class="link link-primary">Systems Status</a></li>
						<li><a href="#!" class="link link-primary">API</a></li>
					</ul>
				</Col>
				<Col cols={{ span: 12 }} md={{ span: 4 }} xl={{ span: 2 }}>
					<h6 class="text-17 mb-4 text-gray-200">Company</h6>
					<ul class="text-16 space-y-5">
						<li><a href="#!" class="link link-primary">About</a></li>
						<li><a href="#!" class="link link-primary">Careers</a></li>
						<li><a href="#!" class="link link-primary">Feedback</a></li>
						<li><a href="#!" class="link link-primary">Contact Us</a></li>
						<li><a href="#!" class="link link-primary">News</a></li>
						<li><a href="#!" class="link link-primary">Privacy Policy</a></li>
					</ul>
				</Col>
			</Grid>
		</div>
	</div>
	<div class="container mx-auto px-4">
		<div class="dark:text-dark-500 text-16 py-6 text-gray-500">
			<p>
				&copy; <span>{year}</span> Domiex. Crafted & Design by
				<a href="#!" class="dark:text-dark-200 link font-medium text-gray-200">SRBThemes</a>
			</p>
		</div>
	</div>
</footer>

<DarkMode />
