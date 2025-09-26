<script>
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import { ChevronDown } from 'lucide-svelte';
	import { getContext, hasContext, onMount } from 'svelte';
	import SignOut from '$lib/components/SignOut.svelte';

	const { user } = getContext('user');
	const has = hasContext('user');
	console.log('hasContext user?', has);
	console.log(JSON.stringify(user))
</script>

<Dropdown class="block">
	<DropdownButton
		class="flex w-full items-center gap-2 p-4 text-left group-data-[sidebar=small]:px-0"
	>
		<img
			src="/assets/images/avatar/user-17.png"
			alt=""
			class="h-10 shrink-0 rounded-md group-data-[sidebar=small]:mx-auto"
		/>
		<div
			class="text-new-500 grow overflow-hidden group-data-[sidebar=icon]:hidden group-data-[sidebar=small]:hidden"
		>
			<h6 class="text-sidebar-text-active truncate font-medium">{user && user.name}</h6>
			<p class="text-menu-title text-14">ID: 150001</p>
		</div>
		<div
			class="text-sidebar-text shrink-0 group-data-[sidebar=icon]:hidden group-data-[sidebar=medium]:hidden group-data-[sidebar=small]:hidden"
		>
			<ChevronDown class="size-4" />
		</div>
	</DropdownButton>
	<DropdownMenu
		transition="scale"
		class="dark:bg-dark-900 !fixed !left-3 z-50 hidden !w-64 rounded-md bg-white p-5 shadow-lg"
	>
		<div class="flex items-center gap-2">
			<img src="/assets/images/avatar/user-17.png" alt="" class="size-10 rounded-full" />
			<div>
				<h6>{user && user.name}</h6>
				<p><a href="#!" class="link link-primary">{user && user.customer.name}</a></p>
			</div>
		</div>
		<div class="dark:border-dark-800 mt-3 border-t border-gray-200 pt-2">
			<ul>
				<li>
					<a
						href="/pages-account-settings"
						class="link hover:text-primary-500 inline-block py-2 text-gray-500 before:hidden ltr:text-left rtl:text-right"
						><LucideIcon name="Settings" class="mr-2 inline-block size-4" /> Account Settings</a
					>
				</li>
			</ul>
		</div>
		<div class="dark:border-dark-800 mt-2 border-t border-gray-200 pt-3">
			<a href="/auth-signin-basic" class="link link-primary !px-0 !py-1.5 before:hidden"
				><LucideIcon name="LogOut" class="mr-2 inline-block size-4" /> <SignOut /></a
			>
		</div>
	</DropdownMenu>
</Dropdown>
