<script lang="ts">
	// THIS COMPONENT IS DEMO VERSION OF AlertContainer TO SHOW DEMOS IN THE ADMIN TEMPLATE
	import { alretColors } from './alert-css';
	import { iconsNames } from './alert';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';

	export let message: string = '';
	export let isOpen = true;
	export let varient: UI.AlertVariant = 'default';
	export let color: UI.Colors = 'primary';
	export let actionCB: Function = () => {};
	export let actionBtnText: string = 'Go Back';
	export let basicBtnClass: string = 'btn-sky';
	let props = {};

	function close() {
		isOpen = false;
	}

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
	$: {
		const { class: _class, message: _message, color: _color, ...rest } = $$props;
		props = rest;
	}
	$: alertConfig = alretColors[`${varient}-${color}`];
	$: isActionVarient =
		varient === 'action-info' ||
		varient === 'action-warning' ||
		varient === 'action-error' ||
		varient === 'action-success';
	$: isAction2Varient =
		varient === 'action-v2-info' ||
		varient === 'action-v2-warning' ||
		varient === 'action-v2-error' ||
		varient === 'action-v2-success';
	$: iconName = getIconName();
</script>

{#if isOpen && !(isActionVarient || isAction2Varient)}
	<div class="alert {alertConfig.containerClass}" {...props}>
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

{#if isOpen && isActionVarient}
	<div class="alert alert-border dark:border-dark-800 border-gray-200 {alertConfig.containerClass}">
		<button on:click={close} class="btn-close link {alertConfig.closeBtnClass}" aria-label="Close"
			><i class="ri-close-fill"></i></button
		>
		<div
			class={`border-opacity-20 flex size-11 shrink-0 items-center justify-center rounded-full border border-${color}-500/20`}
		>
			<LucideIcon name={iconName} class="size-5 {alertConfig.iconClass}"></LucideIcon>
		</div>
		<div class="mt-3 grow sm:mt-0">
			<slot></slot>
			<div class="mt-3 flex items-center justify-end gap-3">
				<button on:click={close} class="btn btn-active-gray"> Close </button>
				<button
					on:click={() => {
						actionCB();
					}}
					class="btn {alertConfig.actionClass}">{actionBtnText}</button
				>
			</div>
		</div>
	</div>
{/if}

{#if isOpen && isAction2Varient}
	<div
		class="dark:border-dark-800 relative overflow-hidden rounded-md border border-gray-200 text-sm"
	>
		<div class="h-9 {alertConfig.containerClass}"></div>
		<div class="relative p-5 text-center">
			<div
				class="dark:border-dark-900 absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white text-lg text-white {alertConfig.iconContainerClass}"
			>
				<LucideIcon name={iconName}></LucideIcon>
			</div>
			<slot></slot>
			<div class="flex items-center justify-center gap-3">
				<button on:click={close} class="btn btn-active-gray"> Close </button>
				<button
					on:click={() => {
						actionCB();
					}}
					class="btn {basicBtnClass}">{actionBtnText}</button
				>
			</div>
		</div>
	</div>
{/if}
