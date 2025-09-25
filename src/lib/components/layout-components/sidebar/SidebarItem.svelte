<script lang="ts">
	import { _ } from 'svelte-i18n';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { layoutStore } from '$lib/stores/layout';

	export let item: any;
	export let activeDropdown: string | null = null;
	export let parentDropdown: string | null = null;
	export let current_url: string; // Accept current_url as a prop

	const dispatch = createEventDispatcher();

	let isOpen = false;
	let SidebarItemComponent: typeof import('./SidebarItem.svelte').default;

	onMount(async () => {
		SidebarItemComponent = (await import('./SidebarItem.svelte')).default;
	});

	const getDropdownPath = () => {
		return parentDropdown ? `${parentDropdown}/${item.title}` : item.title;
	};

	$: {
		const dropdownPath = getDropdownPath();
		if (activeDropdown === dropdownPath) {
			isOpen = true;
		} else if (activeDropdown && !activeDropdown.startsWith(dropdownPath)) {
			isOpen = false;
		}
	}

	let dropdownRef: HTMLElement | null = null;
	$: subMenuPositionTop = 120;
	let subMenuPositionLeft = 70;

	const toggleDropdown = (event?: MouseEvent) => {
		const button = event?.currentTarget as HTMLElement;
		if (!button) return;
		const rect = button.getBoundingClientRect();
		subMenuPositionTop = $layoutStore.layoutMode == 'horizontal' ? rect.top + 57 : rect.top;
		if ($layoutStore.layoutMode === 'boxed') {
			subMenuPositionLeft = parentDropdown ? rect.width + 105 : rect.width + 55;
		} else if ($layoutStore.layoutMode === 'horizontal') {
			subMenuPositionLeft = parentDropdown ? rect.left + rect.width : rect.left;
			subMenuPositionTop = parentDropdown ? rect.top : rect.top + 56;
		} else {
			subMenuPositionLeft = parentDropdown ? rect.width + 75 : rect.width + 25;
		}

		if (item.children) {
			isOpen = !isOpen;
			dispatch('setActiveDropdown', isOpen ? getDropdownPath() : null);
		}
	};

	function close() {
		isOpen = false;
		dispatch('setActiveDropdown', null);
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (
			($layoutStore.sidebarSize == 'small' ||
				$layoutStore.layoutMode == 'horizontal' ||
				$layoutStore.sidebarSize == 'medium') &&
			dropdownRef &&
			!dropdownRef.contains(event.target as Node)
		) {
			close();
		}
	};

	onMount(() => {
		if ($layoutStore.layoutMode == 'horizontal' || $layoutStore.sidebarSize === 'small') {
			close();
		}
		if (browser) {
			window.addEventListener('click', handleClickOutside);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('click', handleClickOutside);
		}
	});

	$: sidebarStyles =
		$layoutStore.sidebarSize === 'small' &&
		$layoutStore.layoutMode !== 'horizontal' &&
		(!parentDropdown || !parentDropdown.includes('/'))
			? `${$layoutStore.layoutDir === 'rtl' ? `right: ${subMenuPositionLeft}px;` : `left: ${subMenuPositionLeft}px;`} top: ${subMenuPositionTop}px;`
			: $layoutStore.layoutMode == 'horizontal' &&
				  (!parentDropdown || !parentDropdown.includes('/'))
				? `left: ${subMenuPositionLeft}px;top: ${subMenuPositionTop}px;`
				: `top: ${subMenuPositionTop}px;`;

	$: dropdownMenuClass = ` group-data-[layout=horizontal]:*:shrink-0 dropdown-menu dropdown-wrapper ${
		parentDropdown && parentDropdown.includes('/') ? '!left-96' : ''
	}`;

	// Function to check if an item or any of its children is active
	$: isActive = (item: any) => {
		if (item.link === '/' + current_url) {
			return true; // Direct match
		}
		if (item.children) {
			return item.children.some((child: any) => isActive(child)); // Check children recursively
		}
		return false;
	};

	// Reactive variable to track active state
	$: isItemActive = isActive(item);
	$: isActive(item);
</script>

{#if item.separator}
	<li class={$layoutStore.sidebarSize !== 'small' ? 'menu-title' : 'hidden'}>
		<span class="group-data-[sidebar=small]:hidden">
			{$_(`${item.lang}`)}
		</span>
		<i data-lucide="ellipsis" class="mx-auto hidden size-4 group-data-[sidebar=small]:block"></i>
	</li>
{:else}
	<li
		class={`relative ${$layoutStore.sidebarColor == 'light' ? 'dark:!bg-dark-900' : ''}`}
		bind:this={dropdownRef}
	>
		<div
			class={`flex  cursor-pointer ${item.icon ? 'nav-link' : 'order'} ${isItemActive ? 'active' : ''}`}
			on:click={toggleDropdown}
			role="presentation"
		>
			<span
				class={`shrink-0 group-data-[sidebar=small]:mx-auto ${item.icon || ($layoutStore.layoutMode !== 'horizontal' && $layoutStore.sidebarSize !== 'medium') ? 'w-6 ' : ''}`}
			>
				{#if item.icon}
					<LucideIcon
						name={item.icon}
						class="size-4 group-data-[sidebar=medium]:size-5 group-data-[sidebar=small]:size-5"
					></LucideIcon>
				{/if}
			</span>
			<a
				href={item.link}
				on:click={() => isActive(item)}
				class={`flex w-full group-data-[sidebar=small]:hidden ${isItemActive ? 'active' : ''}`}
			>
				<span class={`grow ${parentDropdown && parentDropdown.includes('/') ? 'ml-0' : ''}`}>
					{$_(`${item.lang}`)}
				</span>
				{#if item.children && $layoutStore.sidebarSize !== 'medium'}
					<svg
						class={`size-5 transform ${isOpen ? 'rotate-180' : ''}`}
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
			</a>
		</div>

		{#if item.children && isOpen && SidebarItemComponent}
			<!-- `${$layoutStore.sidebarColor=='dark'? 'dark:!bg-dark-900':''}` -->
			<ul
				class="{dropdownMenuClass} {`${$layoutStore.sidebarColor == 'light' ? 'dark:!bg-dark-900' : ''}`}"
				style={sidebarStyles}
			>
				{#each item.children as child}
					<svelte:component
						this={SidebarItemComponent}
						item={child}
						bind:activeDropdown
						parentDropdown={getDropdownPath()}
						on:setActiveDropdown
						{current_url}
					/>
				{/each}
			</ul>
		{/if}
	</li>
{/if}
