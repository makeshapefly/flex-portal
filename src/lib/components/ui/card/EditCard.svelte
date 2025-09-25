<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';

	let showSettings = false;
	let bgColor = 'bg-primary-500';
	let photoUrl = '/assets/images/avatar/user-18.png';
	let fullName = 'John Doe';
	let username = 'johndoe';

	const bgColors = [
		'bg-yellow-500',
		'bg-pink-500',
		'bg-purple-500',
		'bg-primary-800',
		'bg-sky-500'
	];

	function selectColor(color: string) {
		bgColor = color;
	}

	function toggleSetting(event: Event) {
		event.stopPropagation(); // Prevent event bubbling
		showSettings = !showSettings;
		tick(); // Ensures UI updates
	}

	function handleClickOutside(event: MouseEvent) {
		if (
			typeof document !== 'undefined' &&
			!(event.target as HTMLElement).closest('.settings-container')
		) {
			showSettings = false;
		}
	}

	onMount(() => {
		if (typeof document !== 'undefined') {
			document.addEventListener('click', handleClickOutside);
		}
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('click', handleClickOutside);
		}
	});
</script>

<div class="settings-container relative mb-5 flex w-full flex-col items-center justify-center">
	<div
		class={`flex w-full flex-col rounded-lg p-4 shadow-md transition-colors ease-in ${bgColor}`}
		on:click|stopPropagation
		role="presentation"
	>
		{#if showSettings}
			<div
				class="z-10 h-70 w-70 max-w-full origin-top-left transform flex-col p-5 text-center transition-all"
			>
				<span class="text-2xl font-bold text-white">Settings</span>
				<div class="mt-3 flex flex-grow flex-col space-y-2">
					<span class="text-md mb-2 font-bold text-white">Background color:</span>
					<div class="flex w-full justify-center space-x-2">
						{#each bgColors as color}
							<button
								aria-label="Select color"
								class={`flex-inline h-8 w-8 cursor-pointer rounded-full border-4 border-white ${color}`}
								on:click={() => selectColor(color)}
								disabled={bgColor === color}
							>
							</button>
						{/each}
					</div>
				</div>
				<div class="mt-4 flex flex-shrink justify-center">
					<button
						class="rounded bg-transparent text-lg font-bold text-white"
						on:click={toggleSetting}
					>
						Close
					</button>
				</div>
			</div>
		{/if}

		{#if !showSettings}
			<div class="flex w-full justify-between p-2">
				<button
					class="flex cursor-pointer items-center space-x-1 bg-transparent fill-current font-semibold text-white"
					on:click={toggleSetting}
				>
					<LucideIcon name="Settings" />
					<span class="sr-only">Settings</span>
				</button>
				<button
					class="flex cursor-pointer items-center space-x-1 bg-transparent fill-current font-semibold text-white"
				>
					<LucideIcon name="LogOut" />
					<span class="sr-only">Logout</span>
				</button>
			</div>
			<div class="flex h-full w-full flex-col text-center">
				<div class="mb-3 flex flex-col items-center">
					<img src={photoUrl} alt="" class="size-28 rounded-full select-none" />
					<span class="m-0 p-0 px-2 font-sans text-xl font-semibold text-white">{fullName}</span>
					<span class="m-0 p-0 font-sans text-sm font-semibold text-white/75">{username}</span>
				</div>
				<div class="flex flex-row justify-evenly">
					<div class="flex cursor-pointer flex-col hover:opacity-80">
						<span class="text-lg font-bold text-white">11</span>
						<span class="text-sm text-white/75">Followers</span>
					</div>
					<div class="flex cursor-pointer flex-col hover:opacity-80">
						<span class="text-lg font-bold text-white">52</span>
						<span class="text-sm text-white/75">Following</span>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
