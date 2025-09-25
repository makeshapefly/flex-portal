<script lang="ts">
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	//chart
	import { options as statusChart } from './status-chart';
	import { options as patternChart } from './pattern-chart';
	import { options as taskChart, tasks, users } from './task-chart';

	let activeTab = 0;

	// Function to animate the counter
	function animatedCounter(target: number, duration: number, delay: number) {
		const current = writable(0);

		onMount(() => {
			setTimeout(() => {
				const increment = target / duration;
				let value = 0;
				const interval = setInterval(() => {
					if (value >= target) {
						clearInterval(interval);
						value = target;
					} else {
						value += increment;
					}
					current.set(Math.round(value)); // Update the value reactively
				}, 1);
			}, delay);
		});

		return current;
	}

	// Set up the counters with targets, durations, and delays
	const earnings = animatedCounter(21589, 500, 0);
	const tasksCompleted = animatedCounter(311, 500, 0);
	const assigned = animatedCounter(594, 500, 0);
</script>

<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card order-2 2xl:order-1 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Project Status</CardTitle>
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
		<div class="mb-2 flex gap-3">
			<div class="bg-primary-500/15 flex size-10 items-center justify-center rounded-md">
				<LucideIcon name="Coins" class="text-primary-500 fill-primary-500/20 size-6" />
			</div>
			<div class="grow">
				<h6 class="counter">$<span>{$earnings}</span></h6>
				<p class="dark:text-dark-500 text-gray-500">Total Earnings</p>
			</div>
			<div class="shrink-0">
				<span class="font-medium text-green-500"
					><i class="ri-arrow-up-line align-baseline"></i> 4.5%</span
				>
			</div>
		</div>
		<div>
			<ApexChart class="!min-h-full" colors={['bg-primary-500']} options={statusChart} />
		</div>
		<div class="mt-3 flex items-center gap-3">
			<p class="dark:text-dark-500 grow text-gray-500">Expense</p>
			<h6>$748.99</h6>
			<span class="badge badge-red font-medium"
				><i class="ri-arrow-down-line align-baseline"></i> 4.5%</span
			>
		</div>
		<div class="mt-3 flex items-center gap-3">
			<p class="dark:text-dark-500 grow text-gray-500">Profit</p>
			<h6>$8721.74</h6>
			<span class="badge badge-green font-medium"
				><i class="ri-arrow-up-line align-baseline"></i> 11.41%</span
			>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} lg={{ span: 6 }} class="order-2 2xl:order-2 2xl:col-span-4">
	<div class="gap-x-space grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-2">
		<Card>
			<CardBody>
				<div
					class="flex size-12 items-center justify-center rounded-md bg-purple-500/10 text-purple-500"
				>
					<LucideIcon name="PackageOpen" />
				</div>

				<h6 class="mt-6 mb-1.5">6 Opened Tasks</h6>
				<p class="font-medium text-red-500">
					<i class="ri-arrow-down-line align-baseline"></i> 4.32%
				</p>
			</CardBody>
		</Card>
		<Card>
			<CardBody>
				<div class="flex size-12 items-center justify-center rounded-md bg-sky-500/10 text-sky-500">
					<LucideIcon name="CircleCheckBig" />
				</div>

				<h6 class="mt-6 mb-1.5">15 Completed Tasks</h6>
				<p class="font-medium text-green-500">
					<i class="ri-arrow-up-line align-baseline"></i> 47.73%
				</p>
			</CardBody>
		</Card>
		<Card>
			<CardBody>
				<div
					class="flex size-12 items-center justify-center rounded-md bg-orange-500/10 text-orange-500"
				>
					<LucideIcon name="LayoutList" />
				</div>

				<h6 class="mt-6 mb-1.5">148 Total Tasks</h6>
				<p class="font-medium text-green-500">
					<i class="ri-arrow-up-line align-baseline"></i> 21.57%
				</p>
			</CardBody>
		</Card><!--end col-->
		<Card>
			<CardBody>
				<div
					class="flex size-12 items-center justify-center rounded-md bg-yellow-500/10 text-yellow-500"
				>
					<LucideIcon name="PanelsTopLeft" />
				</div>

				<h6 class="mt-6 mb-1.5">10 Projects</h6>
				<p class="font-medium text-green-500">
					<i class="ri-arrow-up-line align-baseline"></i> 3.91%
				</p>
			</CardBody>
		</Card><!--end col-->
	</div>
</Col>

<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card order-3 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Daily Working Reports</CardTitle>
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
				colors={['bg-primary-500', 'bg-purple-500', 'bg-green-500']}
				options={patternChart}
			/>
		</div>
		<div class="grid grid-cols-12">
			<div class="col-span-4">
				<a href="#!" class="flex items-center gap-2">
					<i class="ri-circle-fill text-primary-500 shrink-0 align-baseline text-xs"></i>
					<div class="grow">
						<h6 class="font-normal">
							Afternoon <span class="dark:text-dark-500 text-gray-500">(54%)</span>
						</h6>
					</div>
				</a>
			</div>
			<!--end col-->
			<div class="col-span-4">
				<a href="#!" class="flex items-center gap-2">
					<i class="ri-circle-fill shrink-0 align-baseline text-xs text-purple-500"></i>
					<div class="grow">
						<h6 class="font-normal">
							Evening <span class="dark:text-dark-500 text-gray-500">(19%)</span>
						</h6>
					</div>
				</a>
			</div>
			<!--end col-->
			<div class="col-span-4">
				<a href="#!" class="flex items-center gap-2">
					<i class="ri-circle-fill shrink-0 align-baseline text-xs text-green-500"></i>
					<div class="grow">
						<h6 class="font-normal">
							Morning <span class="dark:text-dark-500 text-gray-500">(27%)</span>
						</h6>
					</div>
				</a>
			</div>
			<!--end col-->
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="order-4 2xl:col-span-9">
	<div class="mb-3 flex items-center gap-3">
		<h6 class="grow">Clients List</h6>
		<a href="#!" class="link link-primary">
			View All
			<i class="ri-arrow-right-line align-baseline ltr:inline-block rtl:hidden"></i>
			<i class="ri-arrow-left-line align-baseline ltr:hidden rtl:inline-block"></i>
		</a>
	</div>
	<Grid cols={12} gapX="space">
		<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
			<CardBody>
				<div class="dark:bg-dark-850 flex flex-wrap items-center gap-3 rounded-md bg-gray-100 p-2">
					<img
						src="/assets/images/avatar/user-5.png"
						alt=""
						class="size-10 shrink-0 rounded-full"
					/>
					<div class="grow">
						<h6>Imelda Dach</h6>
						<p class="dark:text-dark-500 text-gray-500">imelda@example.com</p>
					</div>
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
				</div>
				<div class="my-4 flex flex-wrap gap-2">
					<span class="badge badge-outline-green">Finance Web</span>
					<span class="badge badge-outline-purple">Business</span>
				</div>
				<p>Date Created: <span class="dark:text-dark-500 text-gray-500">20 July, 2024</span></p>
				<div class="dark:border-dark-800 mt-3 border-t border-gray-200 pt-3 text-center">
					<a href="#!" class="text-primary-500"
						><LucideIcon name="MessagesSquare" class="inline-block size-4 ltr:mr-1 rtl:ml-1"
						></LucideIcon> Get a Chat</a
					>
				</div>
			</CardBody>
		</Col>

		<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
			<CardBody>
				<div class="dark:bg-dark-850 flex flex-wrap items-center gap-3 rounded-md bg-gray-100 p-2">
					<img
						src="/assets/images/avatar/user-11.png"
						alt=""
						class="size-10 shrink-0 rounded-full"
					/>
					<div class="grow">
						<h6>Adella Hauck</h6>
						<p class="dark:text-dark-500 text-gray-500">adella@example.com</p>
					</div>
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
				</div>
				<div class="my-4 flex flex-wrap gap-2">
					<span class="badge badge-outline-sky">Web Site</span>
					<span class="badge badge-outline-orange">UI / UX</span>
				</div>
				<p>Date Created: <span class="dark:text-dark-500 text-gray-500">10 July, 2024</span></p>
				<div class="dark:border-dark-850 mt-3 border-t border-gray-200 pt-3 text-center">
					<a href="#!" class="text-primary-500"
						><LucideIcon name="MessagesSquare" class="inline-block size-4 ltr:mr-1 rtl:ml-1"
						></LucideIcon> Get a Chat</a
					>
				</div>
			</CardBody>
		</Col>

		<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
			<CardBody>
				<div class="dark:bg-dark-850 flex flex-wrap items-center gap-3 rounded-md bg-gray-100 p-2">
					<img
						src="/assets/images/avatar/user-17.png"
						alt=""
						class="size-10 shrink-0 rounded-full"
					/>
					<div class="grow">
						<h6>Shanny Kirlin</h6>
						<p class="dark:text-dark-500 text-gray-500">shanny@example.com</p>
					</div>
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
				</div>
				<div class="my-4 flex flex-wrap gap-2">
					<span class="badge badge-outline-primary">Development</span>
					<span class="badge badge-outline-gray">API</span>
				</div>
				<p>Date Created: <span class="dark:text-dark-500 text-gray-500">27 May, 2024</span></p>
				<div class="dark:border-dark-800 mt-3 border-t border-gray-200 pt-3 text-center">
					<a href="#!" class="text-primary-500"
						><LucideIcon name="MessagesSquare" class="inline-block size-4 ltr:mr-1 rtl:ml-1"
						></LucideIcon> Get a Chat</a
					>
				</div>
			</CardBody>
		</Col>
	</Grid>
</Col>

<Col
	cols={{ span: 12 }}
	lg={{ span: 12 }}
	class="card relative order-5 overflow-hidden 2xl:col-span-3"
>
	<div class="bg-primary-500/20 absolute top-0 size-32 blur-2xl ltr:right-0 rtl:left-0"></div>
	<img
		src="/assets/images/dashboards/projects/asssign.png"
		loading="lazy"
		alt=""
		class="absolute bottom-0 ltr:right-3 rtl:left-3"
	/>
	<CardBody class="relative">
		<CardTitle class="mb-3">Assign a Project</CardTitle>
		<div class="mb-3">
			<h6><span>{$tasksCompleted}</span>+</h6>
			<p class="dark:text-dark-500 text-gray-500">Completed Task</p>
		</div>
		<div class="mb-3">
			<h6><span>{$assigned}</span></h6>
			<p class="dark:text-dark-500 text-gray-500">Assigned</p>
		</div>
		<a href="#!" class="btn btn-primary">Start Now</a>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card order-6 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Active Projects</CardTitle>
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
		<p class="dark:text-dark-500 mb-3 text-gray-500">Average 64% completed</p>
		<div class="space-y-4">
			<div class="flex items-center gap-3">
				<img src="/assets/images/brands/img-02.png" loading="lazy" alt="" class="size-8 shrink-0" />
				<div class="grow overflow-hidden">
					<h6 class="truncate">Domiex Admin & Dashboards</h6>
					<p class="dark:text-dark-500 text-gray-500">Project Management</p>
				</div>
				<div class="flex shrink-0 items-center gap-2">
					<div class="progress-bar progress-1 w-20 grow">
						<div class="progress-bar-wrap w-[64%] bg-green-500 text-white"></div>
					</div>
					<h6 class="shrink-0">64%</h6>
				</div>
			</div>
			<!--end-->
			<div class="flex items-center gap-3">
				<img src="/assets/images/brands/img-08.png" loading="lazy" alt="" class="size-8 shrink-0" />
				<div class="grow overflow-hidden">
					<h6 class="truncate">Shopify Ecommerce</h6>
					<p class="dark:text-dark-500 text-gray-500">Website</p>
				</div>
				<div class="flex shrink-0 items-center gap-2">
					<div class="progress-bar progress-1 w-20 grow">
						<div class="progress-bar-wrap w-[27%] bg-red-500 text-white"></div>
					</div>
					<h6 class="shrink-0">27%</h6>
				</div>
			</div>
			<!--end-->
			<div class="flex items-center gap-3">
				<img src="/assets/images/brands/img-07.png" loading="lazy" alt="" class="size-8 shrink-0" />
				<div class="grow overflow-hidden">
					<h6 class="truncate">Email Management</h6>
					<p class="dark:text-dark-500 text-gray-500">Apps & Web</p>
				</div>
				<div class="flex shrink-0 items-center gap-2">
					<div class="progress-bar progress-1 w-20 grow">
						<div class="progress-bar-wrap w-[43%] bg-yellow-500 text-white"></div>
					</div>
					<h6 class="shrink-0">43%</h6>
				</div>
			</div>
			<!--end-->
			<div class="flex items-center gap-3">
				<img src="/assets/images/brands/img-06.png" loading="lazy" alt="" class="size-8 shrink-0" />
				<div class="grow overflow-hidden">
					<h6 class="truncate">Norton Mobile App</h6>
					<p class="dark:text-dark-500 text-gray-500">Application</p>
				</div>
				<div class="flex shrink-0 items-center gap-2">
					<div class="progress-bar progress-1 w-20 grow">
						<div class="progress-bar-wrap w-full bg-purple-500 text-white"></div>
					</div>
					<h6 class="shrink-0">100%</h6>
				</div>
			</div>
			<!--end-->
			<div class="flex items-center gap-3">
				<img src="/assets/images/brands/img-11.png" loading="lazy" alt="" class="size-8 shrink-0" />
				<div class="grow overflow-hidden">
					<h6 class="truncate">React</h6>
					<p class="dark:text-dark-500 text-gray-500">Calendar Apps</p>
				</div>
				<div class="flex shrink-0 items-center gap-2">
					<div class="progress-bar progress-1 w-20 grow">
						<div class="progress-bar-wrap w-[0%] bg-yellow-500 text-white"></div>
					</div>
					<h6 class="shrink-0">0%</h6>
				</div>
			</div>
			<!--end-->
			<div class="flex items-center gap-3">
				<img src="/assets/images/brands/img-13.png" loading="lazy" alt="" class="size-8 shrink-0" />
				<div class="grow overflow-hidden">
					<h6 class="truncate">Email Management</h6>
					<p class="dark:text-dark-500 text-gray-500">Apps & Web</p>
				</div>
				<div class="flex shrink-0 items-center gap-2">
					<div class="progress-bar progress-1 w-20 grow">
						<div class="progress-bar-wrap w-[72%] bg-green-500 text-white"></div>
					</div>
					<h6 class="shrink-0">72%</h6>
				</div>
			</div>
			<!--end-->
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card order-7 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Team Members</CardTitle>
		<a href="#!" class="link link-primary shrink-0">
			See All
			<i class="ri-arrow-right-line align-baseline ltr:inline-block rtl:hidden"></i>
			<i class="ri-arrow-left-line align-baseline ltr:hidden rtl:inline-block"></i>
		</a>
	</CardHeader>
	<CardBody>
		<Simplebar class="-mx-space px-space h-[375px]">
			<div class="flex flex-col gap-3">
				{#each users as user}
					<div class="card mb-0 p-3">
						<div class="flex items-center gap-2">
							<img src={user.image} loading="lazy" alt={user.name} class="size-10 rounded-md" />
							<div class="grow">
								<h6 class="mb-1"><a href="#!">{user.name}</a></h6>
								<p class="dark:text-dark-500 text-gray-500">{user.role}</p>
							</div>
							<p class="dark:text-dark-500 text-gray-500">{user.tasks} Task</p>
						</div>
					</div>
				{/each}
			</div>
		</Simplebar>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card order-8 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Task Activity</CardTitle>
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
		<div class="relative flex h-64 items-center justify-center space-x-4" dir="ltr">
			<!-- Left Circle -->
			<div class="absolute top-12 left-28">
				<svg class="size-40 drop-shadow-xl" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50" class="fill-green-500/80" />
					<text
						x="50%"
						y="45%"
						text-anchor="middle"
						class="fill-green-50 font-semibold"
						font-size="15px"
						dy=".3em">56.8%</text
					>
					<text
						x="50%"
						y="62%"
						text-anchor="middle"
						class="fill-green-50"
						font-size="10px"
						dy=".3em">UI Design</text
					>
				</svg>
			</div>

			<!-- Right Circle -->
			<div class="absolute top-5 left-0">
				<svg class="size-32 drop-shadow-xl" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50" class="fill-sky-500/80" />
					<text
						x="50%"
						y="45%"
						text-anchor="middle"
						class="fill-sky-50 font-semibold"
						font-size="15px"
						dy=".3em">29.3%</text
					>
					<text x="50%" y="62%" text-anchor="middle" class="fill-sky-50" font-size="10px" dy=".3em"
						>Development</text
					>
				</svg>
			</div>

			<!-- Right Circle -->
			<div class="absolute bottom-2 left-28">
				<svg class="size-24 drop-shadow-xl" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50" class="fill-yellow-500/80" />
					<text
						x="50%"
						y="45%"
						text-anchor="middle"
						class="fill-yellow-50 font-semibold"
						font-size="15px"
						dy=".3em">12%</text
					>
					<text
						x="50%"
						y="65%"
						text-anchor="middle"
						class="fill-yellow-50"
						font-size="10px"
						dy=".3em">Web Design</text
					>
				</svg>
			</div>
		</div>
		<Grid
			cols={12}
			class="dark:divide-dark-800 mt-4 grid divide-y divide-dashed divide-gray-200 md:divide-x md:divide-y-0 rtl:divide-x-reverse"
		>
			<Col cols={{ span: 12 }} md={{ span: 4 }} class="p-3 text-center">
				<h6 class="mb-1">56.8%</h6>
				<p class="dark:text-dark-500 text-gray-500">UI Design</p>
			</Col>
			<Col cols={{ span: 12 }} md={{ span: 4 }} class="p-3 text-center">
				<h6 class="mb-1">29.3%</h6>
				<p class="dark:text-dark-500 text-gray-500">Development</p>
			</Col>
			<Col cols={{ span: 12 }} md={{ span: 4 }} class="p-3 text-center">
				<h6 class="mb-1">12%</h6>
				<p class="dark:text-dark-500 text-gray-500">Web Design</p>
			</Col>
		</Grid>
		<p class="dark:text-dark-500 mt-3 text-center text-gray-500">
			This week task activity by department
		</p>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="order-9 col-span-12 xl:col-span-6 2xl:col-span-4">
	<h6 class="mb-3">My Tasks</h6>
	<div class="mb-space">
		<ul class="mb-space dark:border-dark-800 flex border-b border-gray-200">
			<li>
				<a
					href="#!"
					class="[&.active]:text-primary-500 after:bg-primary-500 relative block px-4 py-2 text-center font-medium transition duration-200 ease-linear after:absolute after:inset-x-0 after:-bottom-[1px] after:mx-auto after:h-[1px] after:w-0 after:rounded-full after:opacity-0 after:transition-all after:duration-200 hover:after:w-full hover:after:opacity-100 [&.active]:after:w-full [&.active]:after:opacity-100"
					class:active={activeTab === 0}
					on:click={() => (activeTab = 0)}
				>
					Active
				</a>
			</li>
			<li>
				<a
					href="#!"
					class="[&.active]:text-primary-500 after:bg-primary-500 relative block px-4 py-2 text-center font-medium transition duration-200 ease-linear after:absolute after:inset-x-0 after:-bottom-[1px] after:mx-auto after:h-[1px] after:w-0 after:rounded-full after:opacity-0 after:transition-all after:duration-200 hover:after:w-full hover:after:opacity-100 [&.active]:after:w-full [&.active]:after:opacity-100"
					class:active={activeTab === 1}
					on:click={() => (activeTab = 1)}
				>
					Completed
				</a>
			</li>
			<li class="ml-auto hidden md:inline-block">
				<a href="#!" class="btn btn-primary px-3.5 py-1.5">
					<i class="ri-add-line mr-1 align-baseline"></i> Create
				</a>
			</li>
		</ul>

		<div class="flex flex-col gap-3">
			{#each tasks as task}
				<Card class="mb-0">
					<CardBody class="flex flex-col gap-3 md:flex-row md:items-center">
						<div
							class={`flex size-12 shrink-0 items-center justify-center rounded-md ${task.bgColor}`}
						>
							<LucideIcon name={task.icon} class={task.iconColor} />
						</div>
						<div class="grow">
							<h6 class="mb-1"><a href="#!">{task.title}</a></h6>
							<div class="flex divide-x divide-dashed">
								<a href="#!" class="link link-primary pr-3">
									<i class="ri-message-3-line align-baseline ltr:mr-1 rtl:ml-1"></i>
									{task.comments} Comments
								</a>
								<a href="#!" class="link link-primary pl-3">
									<i class="ri-file-list-3-line align-baseline ltr:mr-1 rtl:ml-1"></i>
									{task.files}
								</a>
							</div>
						</div>
						<div class="shrink-0">
							<ApexChart
								class="!min-h-full"
								colors={[task.chartColor]}
								options={{ ...taskChart, series: task.series }}
							/>
						</div>
					</CardBody>
				</Card>
			{/each}
		</div>
	</div>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card order-10 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Task Lists</CardTitle>
		<div class="shrink-0">
			<a href="#!" class="link link-primary"
				><i class="ri-add-line align-baseline ltr:mr-1 rtl:ml-1"></i> Create Task</a
			>
		</div>
	</CardHeader>
	<CardBody>
		<div class="space-y-2">
			<div class="relative">
				<input
					id="projectTask1"
					class="input-check peer input-check-primary absolute top-2.5 ltr:left-2 rtl:right-2"
					type="checkbox"
				/>
				<label
					for="projectTask1"
					class="input-check-group dark:bg-dark-850 peer-checked:bg-primary-500/10 cursor-pointer rounded-md bg-gray-50 p-2 font-medium ltr:pl-8 rtl:pr-8"
				>
					Start work on Shot Dribble
				</label>
			</div>
			<div class="relative">
				<input
					id="projectTask2"
					class="input-check peer input-check-primary absolute top-2.5 ltr:left-2 rtl:right-2"
					type="checkbox"
				/>
				<label
					for="projectTask2"
					class="input-check-group dark:bg-dark-850 peer-checked:bg-primary-500/10 cursor-pointer rounded-md bg-gray-50 p-2 font-medium ltr:pl-8 rtl:pr-8"
				>
					Create wireframes for the new landing page
				</label>
			</div>
			<div class="relative">
				<input
					id="projectTask3"
					class="input-check peer input-check-primary absolute top-2.5 ltr:left-2 rtl:right-2"
					type="checkbox"
					checked
				/>
				<label
					for="projectTask3"
					class="input-check-group dark:bg-dark-850 peer-checked:bg-primary-500/10 cursor-pointer rounded-md bg-gray-50 p-2 font-medium ltr:pl-8 rtl:pr-8"
				>
					Run usability tests on the latest design iteration
				</label>
			</div>
			<div class="relative">
				<input
					id="projectTask4"
					class="input-check peer input-check-primary absolute top-2.5 ltr:left-2 rtl:right-2"
					type="checkbox"
				/>
				<label
					for="projectTask4"
					class="input-check-group dark:bg-dark-850 peer-checked:bg-primary-500/10 cursor-pointer rounded-md bg-gray-50 p-2 font-medium ltr:pl-8 rtl:pr-8"
				>
					Create more options for navbar
				</label>
			</div>
			<div class="relative">
				<input
					id="projectTask5"
					class="input-check peer input-check-primary absolute top-2.5 ltr:left-2 rtl:right-2"
					type="checkbox"
					checked
				/>
				<label
					for="projectTask5"
					class="input-check-group dark:bg-dark-850 peer-checked:bg-primary-500/10 cursor-pointer rounded-md bg-gray-50 p-2 font-medium ltr:pl-8 rtl:pr-8"
				>
					Create foundation color
				</label>
			</div>
			<div class="relative">
				<input
					id="projectTask6"
					class="input-check peer input-check-primary absolute top-2.5 ltr:left-2 rtl:right-2"
					type="checkbox"
				/>
				<label
					for="projectTask6"
					class="input-check-group dark:bg-dark-850 peer-checked:bg-primary-500/10 cursor-pointer rounded-md bg-gray-50 p-2 font-medium ltr:pl-8 rtl:pr-8"
				>
					Redesign Homepage + details product
				</label>
			</div>
			<div class="relative">
				<input
					id="projectTask7"
					class="input-check peer input-check-primary absolute top-2.5 ltr:left-2 rtl:right-2"
					type="checkbox"
				/>
				<label
					for="projectTask7"
					class="input-check-group dark:bg-dark-850 peer-checked:bg-primary-500/10 cursor-pointer rounded-md bg-gray-50 p-2 font-medium ltr:pl-8 rtl:pr-8"
				>
					Landing page animations
				</label>
			</div>
			<div class="relative">
				<input
					id="projectTask8"
					class="input-check peer input-check-primary absolute top-2.5 ltr:left-2 rtl:right-2"
					type="checkbox"
					checked
				/>
				<label
					for="projectTask8"
					class="input-check-group dark:bg-dark-850 peer-checked:bg-primary-500/10 cursor-pointer rounded-md bg-gray-50 p-2 font-medium ltr:pl-8 rtl:pr-8"
				>
					Update review for Client
				</label>
			</div>
			<div class="relative">
				<input
					id="projectTask9"
					class="input-check peer input-check-primary absolute top-2.5 ltr:left-2 rtl:right-2"
					type="checkbox"
				/>
				<label
					for="projectTask9"
					class="input-check-group dark:bg-dark-850 peer-checked:bg-primary-500/10 cursor-pointer rounded-md bg-gray-50 p-2 font-medium ltr:pl-8 rtl:pr-8"
				>
					Creating App design System
				</label>
			</div>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card order-11 2xl:col-span-4">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Activities</CardTitle>
		<Dropdown class="dropdown shrink-0">
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
		<Simplebar class="-mx-space px-space h-[25rem]">
			<ul
				class="dark:*:before:bg-dark-800 dark:*:after:bg-dark-900 dark:*:after:border-dark-700 flex flex-col *:relative *:pb-5 *:before:absolute *:before:top-5 *:before:-bottom-5 *:before:w-0.5 *:before:bg-gray-200 *:after:absolute *:after:top-5 *:after:size-2 *:after:rounded-sm *:after:border *:after:border-gray-300 *:after:bg-white ltr:*:pl-5 ltr:*:before:left-[3px] ltr:*:after:left-0 rtl:*:pr-5 rtl:*:before:right-[3px] rtl:*:after:right-0"
			>
				<li
					class="last:pb-0 last:before:hidden [&.active]:before:bg-purple-500 [&.active]:after:border-purple-500"
				>
					<div class="mb-3 flex items-center gap-3">
						<img
							src="/assets/images/avatar/user-14.png"
							loading="lazy"
							alt=""
							class="size-10 rounded-md"
						/>
						<div class="grow">
							<h6 class="mb-0.5">Josefina Dach</h6>
							<p class="dark:text-dark-500 text-13 text-gray-500">09:32 AM - Today</p>
						</div>
					</div>
					<h6 class="mb-1">Client Meeting</h6>
					<p class="dark:text-dark-500 text-gray-500">Project meeting with sophia @11:00AM</p>
				</li>
				<li
					class="last:pb-0 last:before:hidden [&.active]:before:bg-purple-500 [&.active]:after:border-purple-500"
				>
					<div class="mb-3 flex items-center gap-3">
						<img
							src="/assets/images/avatar/user-16.png"
							loading="lazy"
							alt=""
							class="size-10 rounded-md"
						/>
						<div class="grow">
							<h6 class="mb-0.5">Zara Russell</h6>
							<p class="dark:text-dark-500 text-13 text-gray-500">11:57 AM - Yesterday</p>
						</div>
					</div>
					<h6 class="mb-1">Commented on <a href="#!" class="text-primary-500">Chat App</a></h6>
					<p class="text-gray-500">
						"Great product but only if you end up using the exact examples in the demos provided."
					</p>
				</li>
				<li
					class="last:pb-0 last:before:hidden [&.active]:before:bg-purple-500 [&.active]:after:border-purple-500"
				>
					<div class="mb-3 flex items-center gap-3">
						<img
							src="/assets/images/avatar/user-11.png"
							loading="lazy"
							alt=""
							class="size-10 rounded-md"
						/>
						<div class="grow">
							<h6 class="mb-0.5">Matthew Warner</h6>
							<p class="dark:text-dark-500 text-13 text-gray-500">04:55 AM - 19 July, 2024</p>
						</div>
					</div>
					<h6 class="mb-1">Add a file to <a href="#!" class="text-red-500">domiex</a></h6>
					<div
						class="dark:border-dark-800 flex items-center gap-3 rounded-md border border-dashed border-gray-200 p-3"
					>
						<img
							src="/assets/images/brands/img-22.png"
							loading="lazy"
							alt=""
							class="size-9 shrink-0"
						/>
						<div class="grow">
							<h6 class="mb-1">Domiex Figma File</h6>
							<p class="dark:text-dark-500 text-xs text-gray-500">21 MB</p>
						</div>
					</div>
				</li>
				<li
					class="last:pb-0 last:before:hidden [&.active]:before:bg-purple-500 [&.active]:after:border-purple-500"
				>
					<div class="mb-3 flex items-center gap-3">
						<img
							src="/assets/images/avatar/user-13.png"
							loading="lazy"
							alt=""
							class="size-10 rounded-md"
						/>
						<div class="grow">
							<h6 class="mb-0.5">Nicole Bentley</h6>
							<p class="dark:text-dark-500 text-13 text-gray-500">04:11 PM - 16 July, 2024</p>
						</div>
					</div>
					<h6 class="mb-1">Create a new project for client</h6>
					<p class="dark:text-dark-500 text-gray-500">Add files to new design folder</p>
				</li>
			</ul>
		</Simplebar>
	</CardBody>
</Col>
