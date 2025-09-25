<script lang="ts">
	import Col from '$lib/components/ui/grid/Col.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';

	export let analyticData = {
		title: '',
		growth: 0,
		totalNumber: 0,
		icon: '',
		preSign: '$',
		suffixSign: 'M'
	};

	const animatedNumber = tweened(0, {
		duration: 2000,
		easing: cubicOut
	});

	onMount(() => {
		animatedNumber.set(analyticData.totalNumber);
	});
</script>

<Col
	cols={{ span: 12 }}
	xl={{ span: 3 }}
	class="dark:border-dark-800 border-b border-gray-200 md:col-span-6 md:ltr:border-r md:rtl:border-l"
>
	<CardBody>
		<div class="mb-8 flex items-center gap-3">
			<p class="dark:text-dark-500 grow text-gray-500">
				<LucideIcon name={analyticData.icon} class="inline-block size-4" />
				{analyticData.title}
			</p>
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

		<div class="flex items-center gap-3">
			<h5 class="grow">
				<span
					>{analyticData.preSign}{#if $animatedNumber % 1 === 0}
						{$animatedNumber}
					{:else}
						{$animatedNumber.toFixed(1)}
					{/if}{analyticData.suffixSign}</span
				>
			</h5>
			<p class="dark:text-dark-500 shrink-0 text-gray-500">
				<span class={'badge ' + (analyticData.growth > 0 ? 'badge-green' : 'badge-red')}
					><LucideIcon
						name={analyticData.growth > 0 ? 'TrendingUp' : 'TrendingDown'}
						class="inline-block size-4"
					></LucideIcon>
					{Math.abs(analyticData.growth)}%</span
				>
			</p>
		</div>
	</CardBody>
</Col>
