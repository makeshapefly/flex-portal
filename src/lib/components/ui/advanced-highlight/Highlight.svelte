<script lang="ts">
	import { createHighlighter } from 'shiki';
	import { onMount } from 'svelte';

	// Variable to hold the highlighted code
	let highlightedCode: string = '';

	// Code to be highlighted
	let code = `<div x-data="{ 
      baseButtons: [
          { text: 'Primary', color: 'btn-primary'}, 
          { text: 'Purple', color: 'btn-purple'}, 
          { text: 'Green', color: 'btn-green'}, 
          { text: 'Red', color: 'btn-red'}, 
          { text: 'Yellow', color: 'btn-yellow'}, 
          { text: 'Sky', color: 'btn-sky'}, 
          { text: 'Pink', color: 'btn-pink'}, 
          { text: 'Indigo', color: 'btn-indigo'}, 
          { text: 'Orange', color: 'btn-orange'}, 
          { text: 'Dark', color: 'btn-gray'}, 
          { text: 'Light', color: 'bg-gray-200 text-gray-800 border-gray-200 hover:bg-gray-300 hover:text-gray-800 hover:border-gray-300 focus:bg-gray-300 focus:text-gray-800 
        focus:border-gray-300'}, 
      ] 
  }" class="flex flex-wrap gap-4">
      <template x-for="(button, index) in baseButtons" :key="index">
          <button :class="button.color + ' btn'" x-text="button.text"></button>
      </template>
  </div>`;

	// Initialize code highlighting on mount
	onMount(async () => {
		try {
			const highlighter = await createHighlighter({
				themes: ['andromeeda', 'catppuccin-mocha'],
				langs: ['javascript', 'svelte']
			});
			// Highlight the code and store it in highlightedCode
			highlightedCode = highlighter.codeToHtml(code, { lang: 'svelte', theme: 'catppuccin-mocha' });
		} catch (error) {
			console.error('Error initializing highlighter:', error);
		}
	});
</script>

<div class="p-4 mb-4 rounded-md" style="background-color:#1e1e2e;color:#cdd6f4;">
	<div class="flex items-start pb-3">
		<div class="bg-red-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-yellow-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-green-500 w-3 h-3 me-1 rounded-full"></div>
	</div>
	<div>{@html highlightedCode}</div>
</div>
