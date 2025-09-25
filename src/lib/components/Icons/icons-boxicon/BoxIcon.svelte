<script lang="ts">
	import { createHighlighter } from 'shiki';
	import { onMount } from 'svelte';

	// Variable to hold the highlighted code
	let highlightedCode: string = '';
	let highlightedCDNCode: string = '';
	let highlightedUSECode: string = '';
	let highlightedCSSCode: string = '';

	// Code to be highlighted
	let code = `$ npm install boxicons --save`;
	let cssCode = `@import 'boxicons';`;
	let cdnCode = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">

<!-- or -->

<link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">`;
	let useCode = `<i class="bx bx-hot"></i>
<i class="bx bxs-hot"></i>
<i class="bx bxl-facebook-square"></i>`;

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
			highlightedCSSCode = highlighter.codeToHtml(cssCode, {
				lang: 'html',
				theme: 'catppuccin-mocha'
			});
		} catch (error) {
			console.error('Error initializing highlighter:', error);
		}
	});
</script>

<p class="dark:text-dark-500 mb-3 text-gray-500">
	'Boxicons' is a carefully designed open source iconset with <code class="text-pink-500"
		>1500+</code
	> icons. It's crafted to look enrich your website/app experience.
</p>

<h6 class="text-16 mb-2">Installation</h6>
<p class="dark:text-dark-500 text-gray-500">To install via npm, simply do the following:</p>
<div class="mt-3 mb-4 rounded-md p-4" style="background-color:#1e1e2e;color:#cdd6f4;">
	<div class="flex items-start pb-3">
		<div class="me-1 h-3 w-3 rounded-full bg-red-500"></div>
		<div class="me-1 h-3 w-3 rounded-full bg-yellow-500"></div>
		<div class="me-1 h-3 w-3 rounded-full bg-green-500"></div>
	</div>

	<div>{@html highlightedCode}</div>
</div>

<p class="dark:text-dark-500 text-gray-500">
	import CSS to your <code class="text-pink-500">icons.scss</code>
</p>
<div class="mt-3 mb-4 rounded-md p-4" style="background-color:#1e1e2e;color:#cdd6f4;">
	<div class="flex items-start pb-3">
		<div class="me-1 h-3 w-3 rounded-full bg-red-500"></div>
		<div class="me-1 h-3 w-3 rounded-full bg-yellow-500"></div>
		<div class="me-1 h-3 w-3 rounded-full bg-green-500"></div>
	</div>

	<div>{@html highlightedCSSCode}</div>
</div>

<h6 class="mb-1">CDN</h6>
<p class="dark:text-dark-500 text-gray-500">Instead of installing you may use the remote version</p>
<div class="mt-3 mb-4 rounded-md p-4" style="background-color:#1e1e2e;color:#cdd6f4;">
	<div class="flex items-start pb-3">
		<div class="me-1 h-3 w-3 rounded-full bg-red-500"></div>
		<div class="me-1 h-3 w-3 rounded-full bg-yellow-500"></div>
		<div class="me-1 h-3 w-3 rounded-full bg-green-500"></div>
	</div>

	<div>{@html highlightedCDNCode}</div>
</div>

<h6 class="mb-1">Usage</h6>
<p class="dark:text-dark-500 text-gray-500">
	To use an icon on your page, add a class '<code class="text-pink-500">bx</code>' and seperate
	class with the icons name with a prefix '<code class="text-pink-500">bx-</code>' for regular icons
	, '<code class="text-pink-500">bxs-</code>' for solid icons and '<code class="text-pink-500"
		>bxl-</code
	>' for logos:
</p>
<div class="mt-3 mb-4 rounded-md p-4" style="background-color:#1e1e2e;color:#cdd6f4;">
	<div class="flex items-start pb-3">
		<div class="me-1 h-3 w-3 rounded-full bg-red-500"></div>
		<div class="me-1 h-3 w-3 rounded-full bg-yellow-500"></div>
		<div class="me-1 h-3 w-3 rounded-full bg-green-500"></div>
	</div>

	<div>{@html highlightedUSECode}</div>
</div>

<p class="dark:text-dark-500 mb-0 text-gray-500">
	For more details, see the <a
		href="https://github.com/atisawd/boxicons"
		target="_blank"
		class="hover:text-primary-600 text-primary-500 transition duration-200 ease-linear"
		>documentation</a
	>.
</p>
