<script lang="ts">
	import { fly } from 'svelte/transition';
	import { getContext } from 'svelte';
	import { animate } from '$lib/utils/hooks';
	import { slide } from 'svelte/transition';
	import { elasticInOut, quintInOut, quintOut } from 'svelte/easing';

	export let position: UI.DrawerPosition = 'right';
	export let size: UI.DrawerSize = 'medium';

	let positions: Record<UI.DrawerPosition, string> = {
		top: 'drawer-top',
		bottom: 'drawer-bottom',
		left: 'drawer-start',
		right: 'drawer-end'
	};

	let sizes: Record<UI.DrawerSize, string> = {
		small: 'drawer-sm',
		medium: 'drawer-lg',
		'half-screen': 'drawer-half'
	};

	let state: UI.IModalState = getContext('drawer-state');
	let drawer: Element;
	let isOpen = false;
	$: state.isOpen.subscribe((value) => {
		isOpen = value;
	});
	$: isOpen && drawer && drawer.setAttribute(positions[position], '');
	$: animation = {
		duration: 300,
		x: position === 'left' ? -300 : position === 'right' ? 300 : 0,
		y: position === 'top' ? -300 : position === 'bottom' ? 300 : 0,
		opacity: 0,
		easing: quintInOut
	};
</script>

{#if isOpen}
	<div bind:this={drawer} class={`drawer ${sizes[size]}`} transition:fly={animation}>
		<slot></slot>
	</div>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="backdrop-overlay asdf1 backdrop-blur-xs" on:click={state.close}></div>
{/if}
