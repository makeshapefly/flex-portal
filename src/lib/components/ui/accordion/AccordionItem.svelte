<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import { getContext, onMount } from 'svelte';

	export let index: number;
    export let title:string;
	let isActive: boolean;
	let isChevron: boolean;
	let container: HTMLElement;
    let color:string;
    let varient:UI.AccordionVarient;
	const state = getContext<UI.IAccordionState>('accordion-state');
	$: {
		state.selected.subscribe((value) => {
			isActive = value === index;
		});
		const { index: _, state: __, ...rest } = $$props;
	}
	$: maxHeight = isActive ? `${container.scrollHeight}px` : '0';

    onMount(()=>{
        isChevron = state.isChevron;
        color = state.color;
        varient = state.varient;
    })
</script>

<div class="{varient === 'boxed' || varient === 'solid-boxed' ? 'accordion-boxed':'accordion'}">
	<button
		type="button"
		class="accordion-button{color}"
        class:active={isActive}
		on:click={() => {
			state.changeSelected(index);
		}}
	>
		<span class="flex items-center justify-between">
			<span>{title}</span>
			{#if isChevron}
				<span class="arrow-icon">
					{#if isActive}
                    <LucideIcon name="ChevronUp" />
					{:else}
                    <LucideIcon name="ChevronDown" />
					{/if}
				</span>
			{/if}
		</span>
	</button>
	<div
		bind:this={container}
		class="accordion-main-content"
		style:max-height={maxHeight}
		style:overflow="hidden"
		style:transition="max-height 0.3s ease"
	>
		<div class="content">
			<slot {state}/>
		</div>
	</div>
</div>
