<script lang="ts">
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { onMount } from 'svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';

	//charts
	import { options as adsRevenue } from './ads-revenue';
	import { options as salesRevenue } from './sales-revenue';
	import { options as labelChart } from './label-chart';
	import { options as semiApp } from './semi-app';

	let counter = 0; // Initialize the counter
	let target = 145; // Target number (in this case, 145M)
	let stepTime = 500; // Time in milliseconds for the animation

	// Function to animate the counter
	const animateCounter = (target: number, stepTime: number = 500) => {
		let current = 0;
		const step = target / (stepTime / 50); // Calculate step to increase the counter
		return new Promise<void>((resolve) => {
			const interval = setInterval(() => {
				current += step;
				counter = Math.round(current);
				if (current >= target) {
					current = target;
					clearInterval(interval);
					resolve();
				}
			}, 50);
		});
	};

	onMount(() => {
		animateCounter(target, stepTime); // Start animating on mount
	});
</script>

<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card 2xl:col-span-4">
		<CardBody>
			<div class="mb-3 flex gap-3">
				<div
					class="dark:ring-offset-dark-900 flex size-12 items-center justify-center rounded-full border-2 border-red-400 text-red-500 ring-1 ring-red-500/20 ring-offset-2"
				>
					<LucideIcon name="Activity" class="fill-red-500/10" />
				</div>
				<div>
					<p class="dark:text-dark-500 mb-1 text-gray-500">Ads Revenue</p>
					<h5>$<span>{counter}</span>M</h5>
				</div>
			</div>
			<div dir="ltr">
				<ApexChart class="!min-h-full" colors={['bg-red-500']} options={adsRevenue} />
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card 2xl:col-span-4">
		<CardBody>
			<div class="mb-3 flex gap-3">
				<div
					class="text-primary-500 border-primary-400 dark:ring-offset-dark-900 ring-primary-500/20 flex size-12 items-center justify-center rounded-full border-2 ring-1 ring-offset-2"
				>
					<LucideIcon name="CircleArrowUp" class="fill-primary-500/10" />
				</div>
				<div>
					<p class="dark:text-dark-500 mb-1 text-gray-500">Sales Revenue</p>
					<h5>$<span>{counter}</span>M</h5>
				</div>
			</div>
			<div dir="ltr">
				<ApexChart
					class="!min-h-full"
					colors={['bg-primary-500', 'bg-primary-100', 'bg-primary-50', 'bg-primary-300']}
					options={salesRevenue}
				/>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card 2xl:col-span-4">
		<CardBody>
			<div class="mb-3 flex gap-3">
				<div
					class="dark:ring-offset-dark-900 flex size-12 items-center justify-center rounded-full border-2 border-purple-400 text-purple-500 ring-1 ring-purple-500/20 ring-offset-2"
				>
					<LucideIcon name="Aperture" class="fill-purple-500/10" />
				</div>
				<div>
					<p class="dark:text-dark-500 mb-1 text-gray-500">Ads Revenue</p>
					<h5>$<span>{counter}</span>M</h5>
				</div>
			</div>
			<div dir="ltr">
				<ApexChart class="!min-h-full" colors={['bg-purple-500']} options={adsRevenue} />
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} xl={{ span: 6 }} class="2xl:col-span-4">
		<Card>
			<CardHeader class="flex items-center gap-3">
				<h6 class="card-title grow">Total Sales</h6>
				<Dropdown class="dropdown" alignTo="right-bottom">
					<DropdownButton
						isChevron={true}
						class="dark:border-dark-800 link link-red btn flex border-gray-200 px-2 py-1 text-xs"
					>
						Last Week
					</DropdownButton>

					<DropdownMenu class="dropdown-menu !fixed hidden p-2">
						<a href="#!" class="dropdown-item"> Last Week </a>
						<a href="#!" class="dropdown-item"> Last Month </a>
						<a href="#!" class="dropdown-item"> Last Years </a>
					</DropdownMenu>
				</Dropdown>
			</CardHeader>
			<CardBody>
				<div dir="ltr">
					<ApexChart class="-ml-3 !min-h-full" colors={['bg-primary-500']} options={labelChart} />
				</div>
			</CardBody>
		</Card>
	</Col>

	<Col cols={{ span: 12 }} xl={{ span: 6 }} class="2xl:col-span-3">
		<Card>
			<CardHeader class="flex items-center gap-3">
				<CardTitle class="grow">Total View Performance</CardTitle>
				<Dropdown class="dropdown" alignTo="right-bottom">
					<DropdownButton class="link link-primary flex">
						<LucideIcon name="Ellipsis" class="size-5" />
					</DropdownButton>

					<DropdownMenu class="dropdown-menu !fixed hidden p-2">
						<a href="#!" class="dropdown-item"> Last Week </a>
						<a href="#!" class="dropdown-item"> Last Month </a>
						<a href="#!" class="dropdown-item"> Last Years </a>
					</DropdownMenu>
				</Dropdown>
			</CardHeader>
			<CardBody>
				<div>
					<ApexChart
						class="!min-h-full"
						colors={['bg-primary-500', 'bg-pink-400']}
						options={semiApp}
					/>
				</div>
				<div class="mt-3 text-center">
					<p class="dark:text-dark-500 mb-3 text-gray-500">
						Ensure your information is kept updated to enhance performance.
					</p>
					<a href="#!" class="btn btn-primary"
						>Guide Views <i class="ri-arrow-right-s-line ml-1 align-bottom"></i></a
					>
				</div>
			</CardBody>
			<div class="card-footer flex items-center justify-center gap-3 text-sm">
				<a href="#!" class="dark:text-dark-500 text-gray-500"
					><i class="ri-circle-fill text-primary-500 align-bottom"></i> View Count:
					<span class="dark:text-dark-100 font-medium text-gray-800">148</span></a
				>
				<a href="#!" class="dark:text-dark-500 text-gray-500"
					><i class="ri-circle-fill align-bottom text-pink-400"></i> Percentage:
					<span class="dark:text-dark-100 font-medium text-gray-800">59%</span></a
				>
			</div>
		</Card>
	</Col>
</Grid>
