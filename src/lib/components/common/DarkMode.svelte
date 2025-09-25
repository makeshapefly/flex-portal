<script lang="ts">
	import LucideIcon from './LucideIcon.svelte';
	import { layoutStore, setLayoutTheme } from '$lib/stores/layout';

	export let buttonColor = 'bg-primary-500';
</script>

<button
	class="fixed flex items-center justify-center text-white ltr:right-0 rtl:left-0 {buttonColor} top-1/2 size-12 ltr:rounded-l-md rtl:rounded-r-md"
	on:click={() => setLayoutTheme($layoutStore.layoutTheme === 'light' ? 'dark' : 'light')}
>
	{#if $layoutStore.layoutTheme === 'light'}
		<LucideIcon name="Moon" class="inline-block size-5" />
	{:else}
		<LucideIcon name="Sun" class="hidden size-5 dark:inline-block" />
	{/if}
</button>
