<script>
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import TimeLine from '$lib/components/ui/timeline/TimeLine.svelte';
	let loadingButton = false;
	let isActive = false;
</script>

<div class="relative mb-6">
	<div class="bg-primary-500/10 relative h-44 overflow-hidden rounded-md">
		<div
			class="border-t-primary-500 border-l-primary-500 absolute -top-2 left-0 size-96 rotate-45 border-[60px] opacity-10"
		></div>
		<div
			class="absolute top-20 left-8 size-80 rotate-45 border-[60px] border-green-500 opacity-10"
		></div>
		<div
			class="absolute top-36 left-28 size-40 rotate-45 border-[60px] border-pink-500 opacity-10"
		></div>
	</div>
	<div class="text-center">
		<div class="relative mx-auto inline-block">
			<div
				class="from-primary-300 relative -mt-14 rounded-full bg-gradient-to-tr via-red-300 to-green-300 p-1"
			>
				<img
					src="/assets/images/avatar/user-17.png"
					alt=""
					class="dark:border-dark-900 mx-auto size-28 rounded-full border-4 border-white"
				/>
			</div>
			<div
				class="dark:border-dark-900 absolute bottom-2.5 size-4 rounded-full border-2 border-white bg-green-500 ltr:right-2.5 rtl:left-2.5"
			></div>
		</div>
		<h5 class="mt-2 mb-1">
			Sophia Mia <LucideIcon
				name="BadgeCheck"
				class="text-primary-500 fill-primary-500/20 inline-block size-5"
			></LucideIcon>
		</h5>
		<ul
			class="dark:text-dark-500 text-14 flex flex-wrap items-center justify-center gap-2 text-gray-500"
		>
			<li>
				<LucideIcon name="Building2" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
				<span class="align-middle"> UI / UX Designer</span>
			</li>
			<li>
				<LucideIcon name="MapPin" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
				<span class="align-middle"> Argentina</span>
			</li>
			<li>
				<LucideIcon name="CalendarDays" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
				<span class="align-middle"> 24 April, 2024</span>
			</li>
		</ul>
	</div>
</div>

<ul class="tabs-pills overflow-x-auto pb-2 lg:pb-0">
	<li>
		<a
			href="/pages-user"
			class="nav-item [&.active]:bg-primary-500 [&.active]:text-primary-50 active"
		>
			<LucideIcon name="Eye" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
			<span class="align-middle whitespace-nowrap">Overview</span>
		</a>
	</li>
	<li>
		<a
			href="/pages-user-activity"
			class="nav-item dark:text-dark-500 [&.active]:bg-primary-500 [&.active]:text-primary-50 text-gray-500"
		>
			<LucideIcon name="Sparkles" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
			<span class="align-middle whitespace-nowrap">Activity</span>
		</a>
	</li>
	<li>
		<a
			href="/pages-user-followers"
			class="nav-item dark:text-dark-500 [&.active]:bg-primary-500 [&.active]:text-primary-50 text-gray-500"
		>
			<LucideIcon name="UserRound" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
			<span class="align-middle whitespace-nowrap">Followers</span>
		</a>
	</li>
	<li>
		<a
			href="/pages-user-documents"
			class="nav-item dark:text-dark-500 [&.active]:bg-primary-500 [&.active]:text-primary-50 text-gray-500"
		>
			<LucideIcon name="FileText" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
			<span class="align-middle whitespace-nowrap">Documents</span>
		</a>
	</li>
	<li>
		<a
			href="/pages-user-notes"
			class="nav-item dark:text-dark-500 [&.active]:bg-primary-500 [&.active]:text-primary-50 text-gray-500"
		>
			<LucideIcon name="List" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
			<span class="align-middle whitespace-nowrap">Notes</span>
		</a>
	</li>
	<li>
		<a
			href="/pages-user-projects"
			class="nav-item dark:text-dark-500 [&.active]:bg-primary-500 [&.active]:text-primary-50 text-gray-500"
		>
			<LucideIcon name="Monitor" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
			<span class="align-middle whitespace-nowrap">Projects</span>
		</a>
	</li>
</ul>

<Grid cols={12} gap="space" class="mt-space">
	<Col cols={{ span: 12 }} md={{ span: 5 }} lg={{ span: 4 }}>
		<Card>
			<CardBody>
				<Grid cols={2} class="mb-4 gap-0">
					<div class="dark:border-dark-800 border-gray-200 text-center ltr:border-r rtl:border-l">
						<h6 class="mb-1">2459</h6>
						<p class="dark:text-dark-500 text-gray-500">Followers</p>
					</div>
					<div class="text-center">
						<h6 class="mb-1">2459</h6>
						<p class="dark:text-dark-500 text-gray-500">Following</p>
					</div>
				</Grid>
				<div>
					<button
						on:click={() => {
							loadingButton = true;
							setTimeout(() => {
								loadingButton = false;
								isActive = !isActive;
							}, 2000);
						}}
						class="btn btn-sky btn-icon-text w-full"
					>
						{#if !isActive}
							<span class="flex items-center gap-2"><i class="ri-user-add-line"></i> Follow</span>
						{:else}
							<span class="flex items-center gap-2"
								><i class="ri-user-unfollow-line"></i> UnFollow</span
							>
						{/if}
						{#if loadingButton}
							<svg
								class="size-4 animate-spin text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-0"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						{/if}
					</button>
				</div>
			</CardBody>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>Introductions</CardTitle>
			</CardHeader>
			<CardBody class="card-body">
				<p class="dark:text-dark-500 mb-3 text-sm font-medium text-gray-500 uppercase">About</p>
				<div class="space-y-3">
					<h6 class="font-medium">
						<LucideIcon
							name="Monitor"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/>
						<span class="align-middle whitespace-nowrap">Sophia Mia</span>
					</h6>
					<h6 class="font-medium">
						<LucideIcon
							name="BriefcaseBusiness"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/>
						<span class="align-middle whitespace-nowrap">UI / UX Designer</span>
					</h6>
					<h6 class="font-medium">
						<LucideIcon
							name="MapPin"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/>
						<span class="align-middle whitespace-nowrap">Argentina</span>
					</h6>
					<h6 class="font-medium">
						<LucideIcon
							name="Cake"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/>
						<span class="align-middle whitespace-nowrap">24 Jun, 1998</span>
					</h6>
				</div>

				<div class="dark:border-dark-800 mt-4 space-y-3 border-t border-gray-200 pt-4">
					<h6 class="font-medium">
						<LucideIcon
							name="Globe"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/>
						<a href="#!" class="align-middle whitespace-nowrap">www.domiex.com</a>
					</h6>
					<h6 class="font-medium">
						<LucideIcon
							name="Mail"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/>
						<a href="mailto:support@example.com" class="align-middle whitespace-nowrap"
							>support@example.com</a
						>
					</h6>
					<h6 class="font-medium">
						<LucideIcon
							name="Phone"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/>
						<a href="tel:+1511555333222" class="align-middle whitespace-nowrap"
							>+(151) 1555 333 222</a
						>
					</h6>
					<h6 class="font-medium">
						<LucideIcon
							name="Twitter"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/>
						<span class="align-middle whitespace-nowrap">SRBThemes</span>
					</h6>
				</div>

				<p
					class="dark:border-dark-800 dark:text-dark-500 mt-4 mb-3 space-y-3 border-t border-gray-200 pt-4 text-sm font-medium text-gray-500 uppercase"
				>
					Fluent In
				</p>
				<div class="flex items-center gap-2">
					<span
						class="dark:border-dark-800 dark:text-dark-500 badge border-gray-200 bg-transparent text-gray-500"
						>English</span
					>
					<span
						class="dark:border-dark-800 dark:text-dark-500 badge border-gray-200 bg-transparent text-gray-500"
						>Madrian</span
					>
					<span
						class="dark:border-dark-800 dark:text-dark-500 badge border-gray-200 bg-transparent text-gray-500"
						>French</span
					>
				</div>
			</CardBody>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>Badges</CardTitle>
			</CardHeader>
			<CardBody class="flex items-center gap-2">
				<div>
					<img src="/assets/images/others/new.png" alt="" class="size-7" title="New Users" />
				</div>
				<div>
					<img
						src="/assets/images/others/quality.png"
						alt=""
						class="size-7"
						title="Verified Badge"
					/>
				</div>
				<div>
					<img
						src="/assets/images/others/high-quality.png"
						alt=""
						class="size-7"
						title="High Quality"
					/>
				</div>
				<div>
					<img src="/assets/images/others/reward.png" alt="" class="size-7" title="Reward" />
				</div>
			</CardBody>
		</Card>
	</Col>

	<div class="col-span-12 md:col-span-7 lg:col-span-8">
		<h6 class="mb-2">Overview</h6>
		<p class="dark:text-dark-500 mb-2 text-gray-500">
			Hello, I'm <span class="font-medium">Sophia Mia</span>, a passionate UI/UX designer dedicated
			to crafting seamless digital experiences that blend elegance with functionality. With a keen
			eye for detail and a deep understanding of user psychology, I strive to create interfaces that
			not only look stunning but also intuitively guide users towards their goals.
		</p>
		<p class="dark:text-dark-500 mb-3 text-gray-500">
			I believe in the power of collaboration and enjoy working closely with cross-functional teams,
			including developers, product managers, and stakeholders. By fostering open communication and
			incorporating diverse perspectives, I ensure that the final product exceeds expectations and
			delights users.
		</p>

		<h6 class="mb-2">Experience</h6>

		<TimeLine>
			<li class="timeline-primary active">
				<h6 class="mb-1">UI/UX Designer - March 2020 - Present</h6>
				<p class="dark:text-dark-500 mb-2 text-sm text-gray-500">
					XYZ Tech Solutions, San Francisco, CA
				</p>
				<ul class="dark:text-dark-500 list-inside list-disc space-y-2 text-gray-500">
					<li>
						Designed intuitive user interfaces for web and mobile applications, focusing on user
						experience optimization.
					</li>
					<li>
						Conducted user research, usability testing, and gathered feedback to iterate on designs
						and improve user satisfaction.
					</li>
					<li>
						Collaborated with cross-functional teams including product managers, developers, and
						stakeholders to translate business requirements into user-centric design solutions.
					</li>
					<li>
						Created wireframes, prototypes, and mockups using tools such as Sketch, Adobe XD, and
						Figma.
					</li>
					<li>
						Implemented responsive design principles to ensure seamless user experiences across
						various devices and screen sizes.
					</li>
					<li>
						Led design workshops and presentations to communicate design concepts and rationale to
						team members and stakeholders.
					</li>
					<li>
						Contributed to the development of design systems and style guides to maintain design
						consistency and scalability across products.
					</li>
				</ul>
			</li>
			<li class="timeline-primary active">
				<h6 class="mb-1">Junior UI/UX Designer</h6>
				<p class="dark:text-dark-500 mb-2 text-sm text-gray-500">ABC Design Studio, New York, NY</p>
				<ul class="dark:text-dark-500 list-inside list-disc space-y-2 text-gray-500">
					<li>
						Assisted in the design and development of user interfaces for web and mobile
						applications.
					</li>
					<li>
						Conducted competitive analysis and market research to identify design trends and best
						practices.
					</li>
					<li>
						Collaborated with senior designers to create wireframes, prototypes, and high-fidelity
						mockups.
					</li>
					<li>
						Participated in usability testing sessions and analyzed user feedback to refine design
						concepts.
					</li>
					<li>
						Supported the implementation of design solutions by providing assets and design
						specifications to development teams.
					</li>
					<li>Maintained and organized design files and assets using version control systems.</li>
				</ul>
			</li>
		</TimeLine>

		<h6 class="mt-3 mb-2">Portfolio Highlights</h6>

		<Grid cols={2} gap="space" class="mb-5 lg:grid-cols-3">
			<div class="group/item text-center">
				<div class="overflow-hidden rounded-md">
					<img
						src="assets/images/gallery/img-01.jpg"
						alt=""
						class="group-hover:item:scale-105 group-hover:item:skew-x-3 transition duration-200 ease-linear"
					/>
				</div>
				<h6 class="mt-2"><a href="#!">Chat Application</a></h6>
			</div>
			<div class="group/item text-center">
				<div class="overflow-hidden rounded-md">
					<img
						src="assets/images/gallery/img-02.jpg"
						alt=""
						class="group-hover:item:scale-105 group-hover:item:skew-x-3 transition duration-200 ease-linear"
					/>
				</div>
				<h6 class="mt-2"><a href="#!">CRM React Projects</a></h6>
			</div>
			<div class="group/item text-center">
				<div class="overflow-hidden rounded-md">
					<img
						src="assets/images/gallery/img-04.jpg"
						alt=""
						class="group-hover:item:scale-105 group-hover:item:skew-x-3 transition duration-200 ease-linear"
					/>
				</div>
				<h6 class="mt-2"><a href="#!">HR Management Team</a></h6>
			</div>
		</Grid>
	</div>
</Grid>
