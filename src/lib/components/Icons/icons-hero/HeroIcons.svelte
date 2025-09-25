<script lang="ts">
	import { createHighlighter } from 'shiki';
	import { onMount } from 'svelte';

	// Variable to hold the highlighted code
	let highlightedUSECode: string = '';

	// Code to be highlighted
	let useCode = `
<svg class="h-6 w-6 text-gray-500 dark:text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" >
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
`;

	// Initialize code highlighting on mount
	onMount(async () => {
		try {
			const highlighter = await createHighlighter({
				themes: ['andromeeda', 'catppuccin-mocha'],
				langs: ['javascript', 'html']
			});

			highlightedUSECode = highlighter.codeToHtml(useCode, {
				lang: 'html',
				theme: 'catppuccin-mocha'
			});
		} catch (error) {
			console.error('Error initializing highlighter:', error);
		}
	});
</script>

<h6 class="mb-1">Usage</h6>
<p class="text-gray-500 dark:text-dark-500">
	The quickest way to use these icons is to simply copy the source for the icon you need from
	heroicons.com and inline it directly into your HTML:
</p>
<div class="p-4 mt-3 mb-4 rounded-md" style="background-color:#1e1e2e;color:#cdd6f4;">
	<div class="flex items-start pb-3">
		<div class="bg-red-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-yellow-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-green-500 w-3 h-3 me-1 rounded-full"></div>
	</div>
	<div>{@html highlightedUSECode}</div>
</div>
<p class="mb-0 text-gray-500 dark:text-dark-500">
	For more details, see the <a
		href="https://github.com/tailwindlabs/heroicons"
		target="_blank"
		class="transition duration-200 ease-linear hover:text-primary-600 text-primary-500"
		>documentation</a
	>.
</p>
