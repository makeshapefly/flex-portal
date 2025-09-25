<script lang="ts">
	// This Component is version of Button.svelte component with special functionality to open the modal
	// It must be used inside the Modal component

	import { buttonSizeClasses } from '../buttons/button';
	import { buttonColors } from '../buttons/button-css';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import { openModal } from '$lib/stores/modal';
	export let modalId: string;
	export let text: string = '';
	export let color: UI.ThemeColors = 'primary';
	export let size: UI.ButtonSize = 'default';
	export let varient: UI.ButtonVariant = 'default';
	export let icon: string = '';
	export let iconPosition: 'left' | 'right' | '' = '';
	export let onClick: () => void = () => {}; // Make it optional
	export let iconCss: string = '';
	export let textCss: string = '';

	let iconClass: string = '';
	$: btnClass = buttonColors[(varient + '-' + color) as UI.ButtonVariantColor];
	$: btnSizeClass = buttonSizeClasses[size];

	$: if (icon) {
		if (iconPosition) {
			iconClass = ` btn-icon-overlay ${iconPosition === 'right' ? 'right' : ''}`;
		} else if (text) {
			iconClass = ' btn-icon-text';
		} else {
			iconClass = ' btn-icon';
		}
	}
	// Handle click: first call onClick (if provided), then open modal
	const handleClick = () => {
		onClick?.(); // Only call onClick if it's defined
		openModal(modalId);
	};
</script>

<button
	class={`${btnClass}${btnSizeClass}${iconClass}${btnSizeClass} ${$$props.class ? $$props.class : ''}`}
	on:click={() => openModal(modalId)}
	on:click={handleClick}
	type="button"
>
	{#if icon && !iconPosition}
		<LucideIcon name={icon} class={`size-4 ${iconCss}`} />
	{/if}
	{#if icon && iconPosition}
		<span class="icon">
			<LucideIcon name={icon} class={`size-4 ${iconCss}`} />
		</span>
	{/if}
	<span class={textCss}>
		{text}
	</span>
</button>
