<script lang="ts">
	import Button from '$lib/components/ui/buttons/Button.svelte';
	import TippyTooltip from '$lib/components/ui/tooltip/TippyTooltip.svelte';
	import Tooltip from '$lib/components/ui/tooltip/Tooltip.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
	import { writable } from 'svelte/store';

	let message = writable('Hello, world!');
	interface TooltipPositions {
		content: string;
		btnValue: string;
		position:
			| 'top'
			| 'top-start'
			| 'top-end'
			| 'right'
			| 'right-start'
			| 'right-end'
			| 'bottom'
			| 'bottom-start'
			| 'bottom-end'
			| 'left'
			| 'left-start'
			| 'left-end';
	}
	const tooltipsPosition: Array<TooltipPositions> = [
		{ content: 'I am a tooltip', btnValue: 'Top', position: 'top' },
		{ content: 'I am a tooltip', btnValue: 'Top Start', position: 'top-start' },
		{ content: 'I am a tooltip', btnValue: 'Top End', position: 'top-end' },
		{ content: 'I am a tooltip', btnValue: 'Right', position: 'right' },
		{ content: 'I am a tooltip', btnValue: 'Right Start', position: 'right-start' },
		{ content: 'I am a tooltip', btnValue: 'Right End', position: 'right-end' },
		{ content: 'I am a tooltip', btnValue: 'Bottom', position: 'bottom' },
		{ content: 'I am a tooltip', btnValue: 'Bottom Start', position: 'bottom-start' },
		{ content: 'I am a tooltip', btnValue: 'Bottom End', position: 'bottom-end' },
		{ content: 'I am a tooltip', btnValue: 'Left', position: 'left' },
		{ content: 'I am a tooltip', btnValue: 'Left Start', position: 'left-start' },
		{ content: 'I am a tooltip', btnValue: 'Left End', position: 'left-end' }
	];
</script>

<PageHeading title="UI Tooltip" sub_title="UI" />
<div class="gap-x-space grid grid-cols-12">
	<div class="card col-span-12 md:col-span-6">
		<div class="card-header">
			<h6 class="card-title">Default Behaviour Tooltip</h6>
		</div>
		<div class="card-body">
			<div class="flex flex-wrap items-center gap-2">
				<TippyTooltip content="Hover Tooltip" color="" btnValue="Hover for Button!"></TippyTooltip>
				<TippyTooltip trigger="click" content="Click Tooltip" color="" btnValue="Click Me"
				></TippyTooltip>
				<TippyTooltip content="Mouseenter Tooltip" color="" btnValue="Mouseenter"></TippyTooltip>
			</div>
		</div>
	</div>
	<!--Behaviour-->
	<div class="card col-span-12 md:col-span-6">
		<div class="card-header">
			<h6 class="card-title">Follow Cursor</h6>
		</div>
		<div class="card-body">
			<div class="flex flex-wrap items-center gap-2">
				<TippyTooltip
					content="Hover Tooltip"
					color=""
					btnValue="Default"
					btnStyle="btn-green"
					additionalFunc={{ followCursor: true }}
				></TippyTooltip>
				<TippyTooltip
					content="Click Tooltip"
					additionalFunc={{ followCursor: 'horizontal' }}
					color=""
					btnValue="Horizontal"
					btnStyle="btn-green"
				></TippyTooltip>
				<TippyTooltip
					content="Mouseenter Tooltip"
					color=""
					btnValue="Initial"
					btnStyle="btn-green"
					additionalFunc={{ followCursor: 'initial' }}
				></TippyTooltip>
			</div>
		</div>
	</div>

	<div class="card col-span-12 md:col-span-6">
		<div class="card-header">
			<h6 class="card-title">Arrowless Tooltip</h6>
		</div>
		<div class="card-body">
			<div class="flex flex-wrap items-center gap-2">
				<TippyTooltip
					content="i am a tooltip"
					color=""
					btnValue="Arrowless"
					btnStyle="btn-purple"
					additionalFunc={{ arrow: false }}
				></TippyTooltip>
			</div>
		</div>
	</div>
	<!--Arrow-->

	<div class="card col-span-12 md:col-span-6">
		<div class="card-header">
			<h6 class="card-title">No Flip Tooltip</h6>
		</div>
		<div class="card-body">
			<div class="flex flex-wrap items-center gap-2">
				<TippyTooltip content="i am a tooltip" color="" btnValue="No Flip" position="left"
				></TippyTooltip>
			</div>
		</div>
	</div>
	<!--No Flip-->

	<div class="card col-span-12 md:col-span-6">
		<div class="card-header">
			<h6 class="card-title">Custom HTML Input with Tooltip</h6>
		</div>
		<div class="card-body">
			<div>
				<input type="text" class="form-input mb-3" bind:value={$message} />
				<TippyTooltip content={$message} btnValue="Dynamic HTML Content"></TippyTooltip>
			</div>
		</div>
	</div>
	<!--No Flip-->

	<div class="card col-span-12 md:col-span-6">
		<div class="card-header">
			<h6 class="card-title">Animation Tooltip</h6>
		</div>
		<div class="card-body">
			<div class="flex flex-wrap items-center gap-2">
				<TippyTooltip
					content="i am a tooltip"
					btnValue="Scale"
					btnStyle="btn-purple"
					additionalFunc={{ animation: 'scale' }}
				></TippyTooltip>
				<TippyTooltip
					content="i am a tooltip"
					btnValue="Scale-subtle"
					btnStyle="btn-purple"
					additionalFunc={{ animation: 'scale-subtle' }}
				></TippyTooltip>
				<TippyTooltip
					content="i am a tooltip"
					btnValue="Scale-extreme"
					btnStyle="btn-purple"
					additionalFunc={{ animation: 'scale-extreme' }}
				></TippyTooltip>
			</div>
		</div>
	</div>
	<!--Animation-->

	<div class="card col-span-12">
		<div class="card-header">
			<h6 class="card-title">Placement Tooltip</h6>
		</div>
		<div class="card-body">
			<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
				{#each tooltipsPosition as tooltip}
					<TippyTooltip
						content={tooltip.content}
						btnValue={tooltip.btnValue}
						position={tooltip.position}
						btnStyle="w-full btn btn-purple"
					/>
				{/each}
			</div>
		</div>
	</div>
	<!--Animation-->
</div>
