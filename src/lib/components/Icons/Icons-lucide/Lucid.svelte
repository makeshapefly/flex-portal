<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import { createHighlighter } from 'shiki';
	import { onMount } from 'svelte';

	// Variable to hold the highlighted code
	let highlightedCode: string = '';
	let highlightedCDNCode: string = '';
	let highlightedUSECode: string = ''; // New variable for CDN code

	// Code to be highlighted
	let code = `npm install lucide`;
	let cdnCode = `<!-- Development version -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script">

<!-- Production version -->
<script src=<"https://unpkg.com/lucide@latest"></script">`;
	let useCode = `
    <i data-lucide="volume-2" class="my-class"></i>
    <i data-lucide="volume-2" class="my-class"></i>
    <i data-lucide="volume-2" class="my-class"></i>
    
    <script src="assets/libs/lucide/umd/lucide.min.js"></script">
    <script>
      lucide.createIcons();
    </script">
`;

	// Initialize code highlighting on mount
	onMount(async () => {
		try {
			const highlighter = await createHighlighter({
				themes: ['andromeeda', 'catppuccin-mocha'],
				langs: ['javascript', 'html']
			});
			// Highlight the code and store it in highlightedCode
			highlightedCode = highlighter.codeToHtml(code, {
				lang: 'javascript',
				theme: 'catppuccin-mocha'
			});
			// Highlight the CDN code
			highlightedCDNCode = highlighter.codeToHtml(cdnCode, {
				lang: 'html',
				theme: 'catppuccin-mocha'
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

<p class="mb-3 text-gray-500 dark:text-dark-500">
	Lucide is an open-source icon library that provides <code class="text-pink-500">1000+</code> vector
	(svg) files for displaying icons and symbols in digital and non-digital projects. The library aims
	to make it easier for designers and developers to incorporate icons into their projects by providing
	several official packages to make it easier to use these icons in your project.
</p>

<h6 class="mb-2 text-16">Installation</h6>

<h6 class="mb-1">Package Managers</h6>
<p class="text-gray-500 dark:text-dark-500">
	Implementation of the lucide icon library for web applications.
</p>
<div class="p-4 mt-3 mb-4 rounded-md" style="background-color:#1e1e2e;color:#cdd6f4;">
	<div class="flex items-start pb-3">
		<div class="bg-red-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-yellow-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-green-500 w-3 h-3 me-1 rounded-full"></div>
	</div>

	<div>{@html highlightedCode}</div>
</div>

<h6 class="mb-1">CDN</h6>
<p class="text-gray-500">Implementation of the lucide icon library for web applications.</p>
<div class="p-4 mt-3 mb-4 rounded-md" style="background-color:#1e1e2e;color:#cdd6f4;">
	<div class="flex items-start pb-3">
		<div class="bg-red-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-yellow-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-green-500 w-3 h-3 me-1 rounded-full"></div>
	</div>

	<div>{@html highlightedCDNCode}</div>
</div>

<h6 class="mb-1">Usage</h6>
<p class="text-gray-500 dark:text-dark-500">Here is a complete example with unpkg</p>
<div class="p-4 mt-3 mb-4 rounded-md" style="background-color:#1e1e2e;color:#cdd6f4;">
	<div class="flex items-start pb-3">
		<div class="bg-red-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-yellow-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-green-500 w-3 h-3 me-1 rounded-full"></div>
	</div>

	<div>{@html highlightedUSECode}</div>
</div>

<p class="mb-0 text-gray-500 dark:text-dark-500">
	For more details, see the <a href="#!" class="link hover:text-primary-600 text-primary-500"
		>documentation</a
	>.
</p>
