<script lang="ts">
	import SidebarItem from './SidebarItem.svelte';
	import menus from '$lib/data/menu'; // Import your menu data
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import { page } from '$app/stores';

	let activeDropdown: string | null = null;
	let activeParentDropdown: string | null = null;

	// Handle active dropdown state
	const setActiveDropdown = (event: CustomEvent<string | null>) => {
		activeDropdown = event.detail; // Access the payload using event.detail
	};

	const setActiveDropdowns = (menus: any, currentPath: string) => {
		for (const item of menus) {
			if ('children' in item && item.children) {
				for (const child of item.children) {
					if ('link' in child && child.link === currentPath) {
						activeParentDropdown = item.title; // Open Parent (Email)
						activeDropdown = item.title; // Step 1: Open "Email"

						setTimeout(() => {
							activeDropdown = `${item.title}/${child.title}`; // Step 2: Open "Email/Templates"
						}, 0);
						return;
					}

					// Handle nested children
					if ('children' in child && child.children) {
						for (const subChild of child.children) {
							if ('link' in subChild && subChild.link === currentPath) {
								activeParentDropdown = item.title; // Open Parent (Email)
								activeDropdown = item.title; // Step 1: Open "Email"

								setTimeout(() => {
									activeDropdown = `${item.title}/${child.title}`; // Step 2: Open "Email/Templates"
								}, 0);
								return;
							}
						}
					}
				}
			}
		}
	};

	// Extract the last segment of the pathname
	let current_url = $page.url.pathname.split('/').filter(Boolean).pop() || '/';

	// Update current_url and active dropdowns whenever the route changes
	$: {
		current_url = $page.url.pathname.split('/').filter(Boolean).pop() || '/';
		setActiveDropdowns(menus, '/' + current_url); // Call setActiveDropdowns whenever current_url changes
	}
</script>

<Simplebar class="navbar-menu" id="navbar-menu-list">
	<ul
		class="group-data-[layout=horizontal]:*:shrink-0 group-data-[layout=horizontal]:md:flex"
		id="sidebar"
	>
		{#each menus as item}
			<SidebarItem
				{item}
				bind:activeDropdown
				on:setActiveDropdown={setActiveDropdown}
				{current_url}
			/>
		{/each}
	</ul>
</Simplebar>
