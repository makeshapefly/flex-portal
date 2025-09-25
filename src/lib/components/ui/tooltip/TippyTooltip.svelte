<script lang="ts">
	import { onMount } from 'svelte';
	import tippy, { followCursor } from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/animations/scale.css';
	import 'tippy.js/animations/scale-subtle.css';
	import 'tippy.js/animations/scale-extreme.css';

	export let content: string;
	export let img: string = '';
	export let position:
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
		| 'left-end'
		| 'auto'
		| 'auto-start'
		| 'auto-end' = 'top';
	export let color: string = '';
	export let btnValue: string = 'Button';
	export let btnStyle: string = 'btn-primary';
	export let trigger: 'mouseenter focus' | 'click' | 'focusin' | 'mouseenter click' | 'manual' =
		'mouseenter focus'; // Default trigger

	export let additionalFunc = {};
	let tooltipElement: HTMLAnchorElement;

	onMount(() => {
		tippy(tooltipElement, {
			content,
			placement: position,
			trigger,
			...additionalFunc,
			plugins: [followCursor]
		});
	});
</script>

<a href="#!" bind:this={tooltipElement} class="transition duration-300 ease-linear hover:z-10">
	{#if img}
		<img
			class={`dark:border-dark-900 rounded-full border-2 border-white ${color}`}
			src={img}
			alt={content}
		/>
	{:else}
		<button class={`btn ` + btnStyle}>{btnValue}</button>
	{/if}
</a>
