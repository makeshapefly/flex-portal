<script lang="ts">
	import { createHighlighter } from 'shiki';
	import { onMount } from 'svelte';

	export let code = '';
	let highlightedCode: string = '';

	onMount(async () => {
		try {
		const highlighter = await createHighlighter({
			themes: ['andromeeda', 'catppuccin-mocha'],
			langs: ['javascript', 'svelte']
		});
		highlightedCode = highlighter.codeToHtml(code, { lang: 'svelte', theme: 'catppuccin-mocha' });
	} catch (error) {
		console.error('Error initializing highlighter:', error);
	}

	});
</script>

<div class="p-4 mb-4 rounded-md" style="background-color:#1e1e2e;color:#cdd6f4">
    <div class="flex items-start pb-3">
        <div class="bg-red-500 w-3 h-3 me-1 rounded-full"></div>
        <div class="bg-yellow-500 w-3 h-3 me-1 rounded-full"></div>
        <div class="bg-green-500 w-3 h-3 me-1 rounded-full"></div>
    </div>
	{@html highlightedCode}
</div>
