<script lang="ts">
	import { getContext, onMount } from 'svelte';

	let state: UI.INotificationState = getContext('notification-state');
	let topRightNts: UI.INotification[] = [];
	let topLeftNts: UI.INotification[] = [];
	let bottomRightNts: UI.INotification[] = [];
	let bottomLeftNts: UI.INotification[] = [];
	let topCenterNts: UI.INotification[] = [];
	let bottomCenterNts: UI.INotification[] = [];

	// Subscribe to notification state
	onMount(() => {
		state.topRightNts.subscribe((value) => {
			topRightNts = value;
		});
		state.topLeftNts.subscribe((value) => {
			topLeftNts = value;
		});
		state.bottomRightNts.subscribe((value) => {
			bottomRightNts = value;
		});
		state.bottomLeftNts.subscribe((value) => {
			bottomLeftNts = value;
		});
		state.topCenterNts.subscribe((value) => {
			topCenterNts = value;
		});
		state.bottomCenterNts.subscribe((value) => {
			bottomCenterNts = value;
		});
	});
</script>

{#if topLeftNts.length > 0}
	<div
		class="z-drawer fixed top-10 z-[9999] flex h-screen w-screen flex-col items-start justify-start gap-3 ltr:left-10 rtl:right-10"
		style="pointer-events:none"
	>
		{#each topLeftNts as notification (notification)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->

			{#if notification.message}
				<div
					on:click={() => state.removeNotification(notification)}
					class="alert w-82 cursor-pointer"
					class:alert-solid-green={notification.type === 'success'}
					class:alert-solid-sky={notification.type === 'info'}
					class:alert-solid-yellow={notification.type === 'warning'}
					class:alert-solid-red={notification.type === 'error'}
					style="pointer-events: all"
				>
					{notification.message}
				</div>
			{/if}
		{/each}
	</div>
{/if}

{#if topCenterNts.length > 0}
	<div
		class="z-drawer fixed top-10 z-[9999] flex h-screen w-screen flex-col items-center justify-start gap-3"
		style="pointer-events:none"
	>
		{#each topCenterNts as notification (notification)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->

			{#if notification.message}
				<div
					on:click={() => state.removeNotification(notification)}
					class="alert w-82 cursor-pointer"
					class:alert-solid-green={notification.type === 'success'}
					class:alert-solid-sky={notification.type === 'info'}
					class:alert-solid-yellow={notification.type === 'warning'}
					class:alert-solid-red={notification.type === 'error'}
					style="pointer-events: all"
				>
					{notification.message}
				</div>
			{/if}
		{/each}
	</div>
{/if}

{#if topRightNts.length > 0}
	<div
		class="z-drawer fixed top-10 z-[9999] flex h-screen w-screen flex-col items-end justify-start gap-3 ltr:right-10 rtl:left-10"
		style="pointer-events:none"
	>
		{#each topRightNts as notification (notification)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->

			{#if notification.message}
				<div
					on:click={() => state.removeNotification(notification)}
					class="alert w-82 cursor-pointer"
					class:alert-solid-green={notification.type === 'success'}
					class:alert-solid-sky={notification.type === 'info'}
					class:alert-solid-yellow={notification.type === 'warning'}
					class:alert-solid-red={notification.type === 'error'}
					style="pointer-events: all"
				>
					{notification.message}
				</div>
			{/if}
		{/each}
	</div>
{/if}

{#if bottomLeftNts.length > 0}
	<div
		class="z-drawer fixed bottom-10 z-[9999] flex h-screen w-screen flex-col-reverse items-start justify-start gap-3 ltr:left-10 rtl:right-10"
		style="pointer-events:none"
	>
		{#each bottomLeftNts as notification (notification)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->

			{#if notification.message}
				<div
					on:click={() => state.removeNotification(notification)}
					class="alert w-82 cursor-pointer"
					class:alert-solid-green={notification.type === 'success'}
					class:alert-solid-sky={notification.type === 'info'}
					class:alert-solid-yellow={notification.type === 'warning'}
					class:alert-solid-red={notification.type === 'error'}
					style="pointer-events: all"
				>
					{notification.message}
				</div>
			{/if}
		{/each}
	</div>
{/if}

{#if bottomRightNts.length > 0}
	<div
		class="z-drawer fixed bottom-10 z-[9999] flex h-screen w-screen flex-col-reverse items-end justify-start gap-3 ltr:right-10 rtl:left-10"
		style="pointer-events:none"
	>
		{#each bottomRightNts as notification (notification)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->

			{#if notification.message}
				<div
					on:click={() => state.removeNotification(notification)}
					class="alert w-82 cursor-pointer"
					class:alert-solid-green={notification.type === 'success'}
					class:alert-solid-sky={notification.type === 'info'}
					class:alert-solid-yellow={notification.type === 'warning'}
					class:alert-solid-red={notification.type === 'error'}
					style="pointer-events: all"
				>
					{notification.message}
				</div>
			{/if}
		{/each}
	</div>
{/if}

{#if bottomCenterNts.length > 0}
	<div
		class="z-drawer fixed bottom-10 z-[9999] flex h-screen w-screen flex-col-reverse items-center justify-start gap-3"
		style="pointer-events:none"
	>
		{#each bottomCenterNts as notification (notification)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->

			{#if notification.message}
				<div
					on:click={() => state.removeNotification(notification)}
					class="alert w-82 cursor-pointer"
					class:alert-solid-green={notification.type === 'success'}
					class:alert-solid-sky={notification.type === 'info'}
					class:alert-solid-yellow={notification.type === 'warning'}
					class:alert-solid-red={notification.type === 'error'}
					style="pointer-events: all"
				>
					{notification.message}
				</div>
			{/if}
		{/each}
	</div>
{/if}
