<script lang="ts">
	import Button from './Button.svelte';

    export let text:string = '';
    export let color:UI.ThemeColors = 'primary';
    export let size:UI.ButtonSize = 'default';
    export let varient:UI.ButtonVariant = 'default';
	let isActive: boolean =false;
	let container: HTMLElement;
	let props = {};

	$: {
		const { isActive:_isActive, ...rest } = $$props;
		props = rest;
	}
	$: maxHeight = isActive ? `${container.scrollHeight}px` : '0';
	$: icon = isActive ? 'ChevronUp' : 'ChevronDown';
</script>

<div class="relative">
	<Button
		type="button"
		icon={icon}
		iconPosition="right"
		actionCb={() => isActive = !isActive}
		text={text}
		color={color}
		size={size}
		varient={varient}
		{...props}
	/>
	<div
		bind:this={container}
		style:max-height={maxHeight}
		style:overflow="hidden"
		style:transition="max-height 0.3s ease"
	>
		<div class="pt-3">
			<slot/>
		</div>
	</div>
</div>
