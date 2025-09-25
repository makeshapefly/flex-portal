<script>
    import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import { ChevronDown } from 'lucide-svelte';

</script>

<Dropdown class="block">
	<DropdownButton
		class="flex items-center w-full gap-2 p-4 text-left group-data-[sidebar=small]:px-0"
	>
		<img
			src="/assets/images/avatar/user-17.png"
			alt=""
			class="h-10 rounded-md shrink-0 group-data-[sidebar=small]:mx-auto"
		/>
		<div
			class="grow group-data-[sidebar=icon]:hidden group-data-[sidebar=small]:hidden overflow-hidden text-new-500"
		>
			<h6 class="font-medium truncate text-sidebar-text-active">Sophia Mia</h6>
			<p class="text-menu-title text-14">ID: 150001</p>
		</div>
		<div
			class="shrink-0 text-sidebar-text group-data-[sidebar=icon]:hidden group-data-[sidebar=small]:hidden group-data-[sidebar=medium]:hidden"
		>
			<ChevronDown class="size-4"/>
		</div>
	</DropdownButton>
	<DropdownMenu
		transition="scale"
		class="!fixed z-50 p-5 bg-white dark:bg-dark-900 rounded-md shadow-lg !w-64 !left-3 hidden"
	>
		<div class="flex items-center gap-2">
			<img src="/assets/images/avatar/user-17.png" alt="" class="rounded-full size-10" />
			<div>
				<h6>Sophia Mia</h6>
				<p><a href="#!" class="link link-primary">sophia@SRBThemes.com</a></p>
			</div>
		</div>
		<div class="pt-2 mt-3 border-t border-gray-200 dark:border-dark-800">
			<ul>
				<li>
					<a
						href="/pages-user-activity"
						class="inline-block py-2 text-gray-500 before:hidden ltr:text-left rtl:text-right link hover:text-primary-500"
						><LucideIcon name="BellDot" class="inline-block mr-2 size-4"/> Profile Activity</a
					>
				</li>
				<li>
					<a
						href="/pages-user-projects"
						class="inline-block py-2 text-gray-500 before:hidden ltr:text-left rtl:text-right link hover:text-primary-500"
						><LucideIcon name="Presentation" class="inline-block mr-2 size-4"/> Manage Projects</a
					>
				</li>
				<li>
					<a
						href="/pages-account-settings"
						class="inline-block py-2 text-gray-500 before:hidden ltr:text-left rtl:text-right link hover:text-primary-500"
						><LucideIcon name="Settings" class="inline-block mr-2 size-4"/> Account Settings</a
					>
				</li>
				<li>
					<a
						href="/pages-help-center"
						class="inline-block py-2 text-gray-500 before:hidden ltr:text-left rtl:text-right link hover:text-primary-500"
						><LucideIcon name="Headset" class="inline-block mr-2 size-4"/> Help Center</a
					>
				</li>
				<li>
					<a
						href="/pages-pricing"
						class="inline-block py-2 text-gray-500 before:hidden ltr:text-left rtl:text-right link hover:text-primary-500"
						><LucideIcon name="Gem" class="inline-block mr-2 size-4"/> Upgrade Plan</a
					>
				</li>
			</ul>
		</div>
		<div class="pt-3 mt-2 border-t border-gray-200 dark:border-dark-800">
			<a href="/auth-signin-basic" class="!px-0 !py-1.5 before:hidden link link-primary"
				><LucideIcon name="LogOut" class="inline-block mr-2 size-4"/> Log Out</a
			>
		</div>
	</DropdownMenu>
</Dropdown>
