<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { onMount } from 'svelte';
	import {
		cardData,
		cards,
		teamMembers,
		appointments,
		interns,
		stats,
		users,
		customerDetails
	} from './widget-card-data';

	let animatedValues = cards.map(() => 0);
	function animateNumbers(index: number, target: number, duration = 1500) {
		let start = 0;
		let startTime: number | null = null;

		function updateNumber(timestamp: number) {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;
			const progress = Math.min(elapsed / duration, 1); // Ensure it stops at 1

			animatedValues[index] = Math.round(progress * target);

			if (progress < 1) {
				requestAnimationFrame(updateNumber);
			} else {
				animatedValues[index] = target; // Ensure exact final value
			}
		}

		requestAnimationFrame(updateNumber);
	}

	onMount(() => {
		cards.forEach((card, index) => {
			animateNumbers(index, card.value);
		});
	});
</script>

<Grid cols={1} gapX="space" class="sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
	{#each cards as { title, suffix, color, prefix,extraCss }, index}
		<div
			class="group/item card relative overflow-hidden before:absolute before:bottom-0 before:h-0.5 before:w-full before:transition-all before:duration-500 before:ease-in-out before:bg-{color}-500 hover:before:top-0 hover:before:h-full"
		>
			<div class="relative p-6 text-center">
				<span
					class="badge transition-all duration-500 ease-linear badge-solid-{color} group-hover/item:bg-{color}-600 group-hover/item:border-{color}-600"
				>
					{title}
				</span>
				<div class="mt-10 mb-8">
					<h3 class="transition-all duration-500 ease-linear group-hover/item:text-white">
						{prefix}{animatedValues[index]}{suffix}
					</h3>
				</div>
				<a
					href="#!"
					 class="inline-block px-3 py-1.5 text-sm border rounded-full link transition-all duration-500 ease-linear border-gray-200 dark:border-dark-800 {extraCss} "
				>
					<span class="group-hover/item:text-{color}-100">
						View All
						<LucideIcon name="MoveRight" class="size-4 ltr:inline-block rtl:hidden" />
						<LucideIcon name="MoveLeft" class="rtl:inline-block ltr:hidden size-4" />
					</span>
				</a>
			</div>
		</div>
	{/each}
</Grid>

<Grid cols={1} gapX="space" class="sm:grid-cols-2 xl:grid-cols-4">
	{#each cardData as { title, icon, stats }}
		<Card>
			<CardBody>
				<div class="dark:bg-dark-850 mb-4 flex items-center gap-3 rounded-md bg-gray-100 p-3">
					<div class="flex size-10 items-center justify-center rounded-md text-xs">
						<LucideIcon name={icon} class="fill-primary-500/10 text-primary-500" />
					</div>
					<h6>{title}</h6>
				</div>
				<div
					class="dark:divide-dark-800 grid grid-cols-2 gap-0 divide-x divide-gray-200 text-center rtl:divide-x-reverse"
				>
					<div>
						<h5>{stats.pending}</h5>
						<p class="dark:text-dark-500 text-gray-500">Pending</p>
					</div>
					<div>
						<h5>{stats.success}</h5>
						<p class="dark:text-dark-500 text-gray-500">Success</p>
					</div>
				</div>
			</CardBody>
		</Card>
	{/each}
</Grid>

<Grid cols={1} gapX="space" class="sm:grid-cols-2">
	{#each users as { name, role, image, price, status }}
		<Card>
			<CardBody>
				<div class="flex flex-wrap items-center gap-2">
					<img src={image} alt="" class="size-10 shrink-0 rounded-md" />
					<div class="grow">
						<h6 class="mb-1">{name}</h6>
						<p class="dark:text-dark-500 text-sm text-gray-500">{role}</p>
					</div>
					<h6 class="grow">{price}</h6>
					<div class="grow">
						<span class={`badge ${status.class}`}>{status.text}</span>
					</div>
					<Dropdown class="dropdown" alignTo="right-bottom">
						<DropdownButton class="link link-primary">
							<LucideIcon name="Ellipsis" class="size-5" />
						</DropdownButton>

						<DropdownMenu class="dropdown-menu !fixed hidden p-2">
							<a href="#!" class="dropdown-item"> Overview </a>
							<a href="#!" class="dropdown-item"> Edit </a>
							<a href="#!" class="dropdown-item"> Delete </a>
						</DropdownMenu>
					</Dropdown>
				</div>
			</CardBody>
		</Card>
	{/each}
</Grid>

<Grid cols={1} gapX="space" class="sm:grid-cols-2 xl:grid-cols-4">
	{#each customerDetails as { title, value, icon, bgColor, outlineColor, textColor, iconCss, cardClass = "" }}
		<Card class={cardClass}>
			<CardBody>
				<div class="flex items-center gap-3">
					<div class="grow">
						<p class="dark:text-dark-500 mb-1 text-sm text-gray-500">{title}</p>
						<h6 class={textColor}>{value}</h6>
					</div>
					<div
						class={`dark:border-dark-900 flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white text-xs outline-1 outline-dashed ${bgColor} ${outlineColor}`}
					>
						<LucideIcon name={icon} class="fill-green-100/20 {iconCss}" />
					</div>
				</div>
			</CardBody>
		</Card>
	{/each}
</Grid>

<Grid cols={1} gapX="space" class="sm:grid-cols-2">
	{#each stats as { title, icon, trendColor, trendText, badgeColors, totalOrders }}
		<Card>
			<CardHeader class="flex items-center gap-3">
				<CardTitle class="grow">{title}</CardTitle>
				<a href="#!" class={'badge ' + badgeColors}>
					<LucideIcon name="Dot" class="inline-block size-4" /> Last 30 Days
				</a>
			</CardHeader>
			<CardBody>
				<p class="dark:text-dark-500 mb-2 text-sm text-gray-500">Today Orders</p>
				<div class="flex items-center gap-2">
					<h5>{totalOrders}</h5>
					<LucideIcon name={icon} class={`size-5 ${trendColor}`} />
					{trendText}
				</div>
			</CardBody>
		</Card>
	{/each}
</Grid>

<Grid cols={1} gapX="space" class="sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
	{#each teamMembers as { name, role, img }}
		<Card class="text-center">
			<CardBody>
				<img src={img} alt={name} class="mx-auto size-14 rounded-md" />
				<h6 class="mt-4">
					<a
						href="#!"
						class="link hover:text-primary-500 dark:hover:text-primary-500 text-current dark:text-current"
					>
						{name}
					</a>
				</h6>
				<p class="dark:text-dark-500 text-sm text-gray-500">{role}</p>
			</CardBody>
		</Card>
	{/each}
</Grid>

<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card row-span-2">
		<CardHeader class="flex items-center">
			<CardTitle class="grow">My Schedule</CardTitle>
			<div class="shrink-0">
				<div class="inline-flex gap-3 text-sm">
					<a
						href="#!"
						class="dark:text-dark-500 active relative inline-block grow text-gray-500 transition duration-200 ease-linear after:absolute after:inset-x-0 after:-bottom-3 after:mx-auto after:size-1 after:rounded-full after:bg-purple-500 after:opacity-0 after:transition-all after:duration-200 hover:text-purple-500 hover:after:-bottom-1.5 hover:after:opacity-100 dark:hover:text-purple-500 [&.active]:text-purple-500 [&.active]:after:-bottom-1.5 [&.active]:after:opacity-100"
						>Day</a
					>
					<a
						href="#!"
						class="dark:text-dark-500 relative inline-block grow text-gray-500 transition duration-200 ease-linear after:absolute after:inset-x-0 after:-bottom-3 after:mx-auto after:size-1 after:rounded-full after:bg-purple-500 after:opacity-0 after:transition-all after:duration-200 hover:text-purple-500 hover:after:-bottom-1.5 hover:after:opacity-100 dark:hover:text-purple-500 [&.active]:text-purple-500 [&.active]:after:-bottom-1.5 [&.active]:after:opacity-100"
						>Week</a
					>
				</div>
			</div>
		</CardHeader>
		<CardBody>
			<Grid cols={12} gap={5}>
				<Col cols={{ span: 5 }}>
					<div class="dark:bg-dark-850 rounded-md bg-gray-100 p-5 text-center">
						<div
							class="dark:bg-dark-900 mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-white font-medium"
						>
							14
						</div>
						<h6>June, 2024</h6>
					</div>
				</Col>
				<Col cols={{ span: 7 }}>
					<p class="dark:text-dark-500 mb-1 text-gray-500">Working Time</p>
					<h6 class="mb-7">10:30 AM - 9:30 PM</h6>

					<p class="dark:text-dark-500 mb-1 text-gray-500">Total Patient:</p>
					<h6>10</h6>
				</Col>
			</Grid>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardBody>
			<p class="dark:text-dark-500 mb-2 text-gray-500">Doctor In Charge</p>
			<div class="flex items-center gap-2">
				<img src="/assets/images/avatar/user-39.png" alt="" class="size-9 rounded-full" />
				<div class="grow">
					<h6>Dr. Jose Miller</h6>
					<p class="dark:text-dark-500 text-xs text-gray-500">Neurologist</p>
				</div>
				<a href="#!" class="inline-block text-red-500"
					><LucideIcon name="MessageCircleMore" class="fill-red-500/10" /></a
				>
			</div>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card row-span-2">
		<CardHeader class="flex items-center">
			<CardTitle class="grow">Today Patients</CardTitle>
			<div class="shrink-0">
				<div class="inline-flex gap-3 text-sm">
					<a
						href="#!"
						class="dark:text-dark-500 active relative inline-block grow text-gray-500 transition duration-200 ease-linear after:absolute after:inset-x-0 after:-bottom-3 after:mx-auto after:size-1 after:rounded-full after:bg-purple-500 after:opacity-0 after:transition-all after:duration-200 hover:text-purple-500 hover:after:-bottom-1.5 hover:after:opacity-100 dark:hover:text-purple-500 [&.active]:text-purple-500 [&.active]:after:-bottom-1.5 [&.active]:after:opacity-100"
						>Day</a
					>
					<a
						href="#!"
						class="dark:text-dark-500 relative inline-block grow text-gray-500 transition duration-200 ease-linear after:absolute after:inset-x-0 after:-bottom-3 after:mx-auto after:size-1 after:rounded-full after:bg-purple-500 after:opacity-0 after:transition-all after:duration-200 hover:text-purple-500 hover:after:-bottom-1.5 hover:after:opacity-100 dark:hover:text-purple-500 [&.active]:text-purple-500 [&.active]:after:-bottom-1.5 [&.active]:after:opacity-100"
						>Week</a
					>
				</div>
			</div>
		</CardHeader>
		<Simplebar class="card-body h-36">
			<div class="space-y-3">
				{#each appointments as { name, time, img }}
					<div class="flex items-center gap-3">
						<img src={img} alt={name} class="size-10 shrink-0 rounded-md" />
						<div class="grow">
							<h6>{name}</h6>
							<p class="dark:text-dark-500 text-sm text-gray-500">{time}</p>
						</div>
						<button class="btn btn-outline-green btn-icon">
							<LucideIcon name="Phone" class="size-5" />
						</button>
					</div>
				{/each}
			</div>
		</Simplebar>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardBody>
			<h6 class="mb-2">Interns Doctors</h6>
			<div class="flex grow -space-x-2 rtl:space-x-reverse">
				{#each interns as img}
					<a href="#!" class="transition duration-300 ease-linear hover:z-10">
						<img
							class="dark:border-dark-900 size-7 rounded-full border-2 border-white"
							src={img}
							alt=""
						/>
					</a>
				{/each}
				<a href="#!" class="transition duration-300 ease-linear hover:z-10">
					<div
						class="dark:border-dark-900 text-11 bg-primary-500 flex size-7 items-center justify-center rounded-full border-2 border-white text-white"
					>
						+14
					</div>
				</a>
			</div>
		</CardBody>
	</Col>
</Grid>
