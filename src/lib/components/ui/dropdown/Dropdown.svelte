<script lang="ts">
	import { setContext, getContext } from 'svelte';
	import { clickOutside, handleFocusLeave } from '$lib/utils/hooks';
	import { DropdownState } from '$lib/stores/dropdown';
	
	export let containerTag: 'li' | 'div' = 'div';
	export let alignTo: UI.DropdownAlignTo = 'left';
	// Dropdown state
	setContext<UI.IDropdownState>('dropdown-state', new DropdownState(false, alignTo));
	let state = getContext<UI.IDropdownState>('dropdown-state');
	let props = {};

	$:{
		const { containerTag: _, state: __, ...rest } = $$props;
		props = rest;
	}
    
	
</script>

{#if containerTag === 'li'}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<li 
		on:keydown|preventDefault={state.close}
		use:clickOutside={state.close}
		{...props} 
		>
		
		<slot></slot>
	</li>
{:else}
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
    on:keydown|preventDefault={state.close}
    use:clickOutside={state.close}
    {...props}
    >
    
	<slot></slot>
</div>
{/if}
