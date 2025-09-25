<script lang="ts">
	// THIS COMPONENT IS DEMO VERSION OF AlertContainer TO SHOW DEMOS IN THE ADMIN TEMPLATE
	import { alertPositions, iconsNames } from './alert';
	import { alretColors } from './alert-css';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import { getContext } from 'svelte';

	export let message: string;
	export let varient: UI.AlertVariant = 'default';
	export let color: UI.Colors = 'primary';
	export let position: UI.AlertPosition = 'top-right';
	let props = {};
	let isOpen: boolean;
	const state = getContext<UI.IAlertState>('alert-state');

	function getIconName() {
		if (varient === 'icon-info' || varient === 'action-info' || varient === 'action-v2-info') {
			return iconsNames.info;
		}
		if (
			varient === 'icon-warning' ||
			varient === 'action-warning' ||
			varient === 'action-v2-warning'
		) {
			return iconsNames.warning;
		}
		if (varient === 'icon-error' || varient === 'action-error' || varient === 'action-v2-error') {
			return iconsNames.error;
		}
		if (
			varient === 'icon-success' ||
			varient === 'action-success' ||
			varient === 'action-v2-success'
		) {
			return iconsNames.success;
		}
		return '';
	}

	function close() {
		state.isOpen.set(false);
	}
	$: {
		const { class: _class, message: _message, color: _color, ...rest } = $$props;
		props = rest;
	}
	$: alertConfig = alretColors[`${varient}-${color}` as keyof typeof alretColors];
	$: alertPosition = alertPositions[position];
	$: iconName = getIconName();
	$: state.isOpen.subscribe((value) => {
		isOpen = value;
	});
</script>

{#if isOpen}
	<div
		class={`alert z-[9999] ${alertConfig.containerClass} ${$$props.class ? $$props.class : ''} ${alertPosition}`}
		{...props}
	>
		{#if varient === 'icon-info' || varient === 'icon-warning' || varient === 'icon-error' || varient === 'icon-success'}
			<div class="icon dark:border-opacity-30 {alertConfig.iconClass}">
				<LucideIcon name={iconName} class="size-4"></LucideIcon>
			</div>
		{/if}
		<span>{message}</span>
		<a href="#!" on:click={close} class="btn-close {alertConfig.closeBtnClass}" aria-label="Close"
			><i class="ri-close-fill"></i></a
		>
	</div>
{/if}
