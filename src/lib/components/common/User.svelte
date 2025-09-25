<script lang="ts">
	import { onMount } from 'svelte';
	import LucideIcon from './LucideIcon.svelte';

	export let variant = 'overview'; // Accept the variant prop

	// Initialize the tabs array directly in the script
	const tabs = [
		{ name: 'overview', label: 'Overview', icon: 'Eye', href: '/pages-user' },
		{ name: 'activity', label: 'Activity', icon: 'Sparkles', href: '/pages-user-activity' },
		{ name: 'followers', label: 'Followers', icon: 'UserRound', href: '/pages-user-followers' },
		{ name: 'documents', label: 'Documents', icon: 'FileText', href: '/pages-user-documents' },
		{ name: 'notes', label: 'Notes', icon: 'List', href: '/pages-user-notes' },
		{ name: 'projects', label: 'Projects', icon: 'Monitor', href: '/pages-user-projects' }
	];

	// Set active tab initially based on the variant
	let activeTab = variant;

	// Define a function to check the active tab based on the current URL
	const setActiveTab = () => {
		const currentPath = window.location.pathname;

		// Check if the current URL contains a specific part of the href for each tab
		if (
			currentPath.includes('/pages-user') &&
			!currentPath.includes('/pages-user-activity') &&
			!currentPath.includes('/pages-user-followers') &&
			!currentPath.includes('/pages-user-documents') &&
			!currentPath.includes('/pages-user-notes') &&
			!currentPath.includes('/pages-user-projects')
		) {
			activeTab = 'overview'; // If it's exactly "/pages-user", make 'overview' active
		}
	};

	// Use onMount to ensure this runs only on the client-side
	onMount(() => {
		setActiveTab(); // Set the active tab after the component mounts
	});
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
					src="assets/images/avatar/user-17.png"
					alt="User Avatar"
					class="dark:border-dark-900 mx-auto size-28 rounded-full border-4 border-white"
				/>
			</div>
			<div
				class="dark:border-dark-900 absolute bottom-2.5 size-4 rounded-full border-2 border-white bg-green-500 ltr:right-2.5 rtl:left-2.5"
			></div>
		</div>
		<h5 class="mb-1 mt-2">
			Sophia Mia
			<LucideIcon
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

<!-- Tabs rendered dynamically based on the activeTab -->
<ul class="tabs-pills overflow-x-auto pb-2 lg:pb-0">
	{#each tabs as tab}
		<li>
			<a
				href={tab.href}
				class="nav-item [&.active]:bg-primary-500 [&.active]:!text-primary-50 {activeTab ===
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
