<script lang="ts">
	// @ts-nocheck

	import UserDropdown from './UserDropdown.svelte';
	import menus, { Menu } from '$lib/data/menu';
	import MenuItem from './MenuItem.svelte';
	import { toggleSidebar } from '$lib/stores/layout';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import SidebarItem from './SidebarItem.svelte';
	import DemoSidebar from './SidebarNew.svelte';
	import Locale from '../locale.svelte';

	export let scrolled = false;
	export let searchTerm = '';
	let filteredMenus = menus;
	let backdrop: HTMLElement | null = null;
	let resizeTimeout: any;
	function handleSidebarOnResize() {
		const backdrop = document.getElementById('backdrop');
		if (backdrop) {
			window.addEventListener('resize', () => {
				if (resizeTimeout) clearTimeout(resizeTimeout);
				resizeTimeout = setTimeout(() => {
					toggleSidebar(true);
				}, 1);
			});
		}
	}

	function filterMenus() {
		if (searchTerm) {
			filteredMenus = menus.filter((menu) => {
				if (menu instanceof Menu) {
					const children = menu.children.filter((child) => {
						return child.title.toLowerCase().includes(searchTerm.toLowerCase());
					});
					return children.length > 0;
				}
				return menu.title.toLowerCase().includes(searchTerm.toLowerCase());
			});
		} else {
			filteredMenus = menus;
		}
	}

	const handleScroll = () => {
		scrolled = window.scrollY > -1;
	};

	$: filterMenus();

	let activeDropdown: string | null = 'Email';
	const setActiveDropdown = (dropdown: string) => {
		activeDropdown = dropdown === activeDropdown ? null : dropdown;
	};
</script>

<!-- on:scroll={handleScroll} -->
<svelte:window on:resize={handleSidebarOnResize} />
<div
	id="main-sidebar"
	class={`main-sidebar group-data-[layout=boxed]:top-[calc(theme('spacing.topbar')_+_theme('spacing.sidebar-boxed'))] navbar ${scrolled ? 'group-data-[layout=boxed]:!top-topbar group-data-[layout=boxed]:!bottom-8' : ''}`}
>
	<div class="sidebar-wrapper">
		<div>
			<div class="navbar-brand">
				<a href="/index" class="inline-flex w-full items-center justify-center">
					<div class="group-data-[sidebar=small]:hidden">
						<img
							src="/assets/images/main-logo.png"
							aria-label="logo"
							alt=""
							class="mx-auto h-6 group-data-[sidebar-colors=brand]:hidden group-data-[sidebar-colors=dark]:hidden group-data-[sidebar-colors=purple]:hidden group-data-[sidebar-colors=sky]:hidden group-data-[sidebar-colors=light]:dark:hidden"
						/>
						<img
							src="/assets/images/logo-white.png"
							aria-label="logo"
							alt=""
							class="mx-auto h-6 group-data-[sidebar-colors=light]:hidden group-data-[sidebar-colors=light]:dark:inline-block"
						/>
					</div>
					<div class="hidden group-data-[sidebar=small]:inline-block">
						<img
							src="/assets/images/logo-sm-dark.png"
							aria-label="logo"
							alt=""
							class="mx-auto h-6"
						/>
					</div>
				</a>
			</div>
			<div class="relative group-data-[layout=horizontal]:hidden group-data-[sidebar=small]:w-full">
				<UserDropdown />
			</div>
		</div>
		<div
			class="bg-light fixed top-0 bottom-0 left-0 hidden w-20 bg-white group-data-[layout=doulcolumn]:block"
		></div>
		<DemoSidebar />
	</div>
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	bind:this={backdrop}
	id="backdrop"
	class="backdrop-overlay z-[1004] backdrop-blur-xs lg:hidden print:hidden"
	on:click={() => toggleSidebar(true)}
></div>
