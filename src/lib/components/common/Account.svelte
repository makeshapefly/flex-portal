<script lang="ts">
	import LucideIcon from './LucideIcon.svelte';

	export let variant = 'settings'; // Initial active tab, can be changed based on logic
	const tabs = [
		{ name: 'settings', label: 'Account', icon: 'UserRound', href: '/pages-account-settings' },
		{ name: 'security', label: 'Security', icon: 'ShieldCheck', href: '/pages-account-security' },
		{ name: 'billing', label: 'Billing & Plans', icon: 'Gem', href: '/pages-account-billing-plan' },
		{
			name: 'notification',
			label: 'Notification',
			icon: 'Bell',
			href: '/pages-account-notification'
		},
		{
			name: 'statements',
			label: 'Statements',
			icon: 'ListTree',
			href: '/pages-account-statements'
		},
		{ name: 'logs', label: 'Logs', icon: 'LogOut', href: '/pages-account-logs' }
	];
</script>

<div class="relative mb-6">
	<div class="bg-primary-500/10 relative h-44 overflow-hidden rounded-md">
		<div
			class="border-t-primary-500 border-l-primary-500 absolute -top-2 left-0 size-96 rotate-45 border-[60px] opacity-10"
		></div>
		<div
			class="absolute left-8 top-20 size-80 rotate-45 border-[60px] border-green-500 opacity-10"
		></div>
		<div
			class="absolute left-28 top-36 size-40 rotate-45 border-[60px] border-pink-500 opacity-10"
		></div>
	</div>
	<div class="text-center">
		<div class="relative mx-auto inline-block">
			<div
				class="from-primary-300 relative -mt-14 rounded-full bg-gradient-to-tr via-red-300 to-green-300 p-1"
			>
				<img
					src="/assets/images/avatar/user-17.png"
					alt=""
					class="dark:border-dark-900 mx-auto size-28 rounded-full border-4 border-white"
				/>
			</div>
			<div
				class="dark:border-dark-900 absolute bottom-2.5 size-4 rounded-full border-2 border-white bg-green-500 ltr:right-2.5 rtl:left-2.5"
			></div>
		</div>
		<h5 class="mb-1 mt-2">
			Sophia Mia <LucideIcon
				name="BadgeCheck"
				class="text-primary-500 fill-primary-500/20 inline-block size-5"
			/>
		</h5>
		<ul
			class="dark:text-dark-500 text-14 flex flex-wrap items-center justify-center gap-2 text-gray-500"
		>
			<li>
				<LucideIcon name="Building2" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
				<span class="align-middle">UI / UX Designer</span>
			</li>
			<li>
				<LucideIcon name="MapPin" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
				<span class="align-middle">Argentina</span>
			</li>
			<li>
				<LucideIcon name="CalendarDays" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
				<span class="align-middle">24 April, 2024</span>
			</li>
		</ul>
	</div>
</div>

<ul class="tabs-pills overflow-x-auto pb-2 lg:pb-0">
	{#each tabs as tab}
		<li>
			<a
				href={tab.href}
				class="nav-item dark:!text-dark-500 [&.active]:bg-primary-500 [&.active]:!text-primary-50 {variant ===
				tab.name
					? 'active'
					: 'text-gray-500'}"
			>
				<LucideIcon name={tab.icon} class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
				<span class="whitespace-nowrap align-middle">{tab.label}</span>
			</a>
		</li>
	{/each}
</ul>
