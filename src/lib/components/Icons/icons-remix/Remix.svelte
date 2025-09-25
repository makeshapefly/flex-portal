<script lang="ts">
	import { createHighlighter } from 'shiki';
	import { onMount } from 'svelte';

	// Variable to hold the highlighted code
	let highlightedCode: string = '';
	let highlightedCDNCode: string = '';
	let highlightedUSECode: string = '';
	let highlightedCSSCode: string = '';

	// Code to be highlighted
	let code = `npm install remixicon --save`;
	let cssCode = `@import 'remixicon/fonts/remixicon.css';`;
	let cdnCode = `<link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />`;
	let useCode = `<i class="ri-admin-line"></i>
<i class="ri-admin-fill"></i>
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
	Open-source neutral-style system symbols elaborately crafted for designers and developers. All of
	the icons are free for both personal and commercial use.
</p>

<h6 class="text-16 mb-2">Installation</h6>
<p class="dark:text-dark-500 text-gray-500">
	If you'd like to use Remix Icon with a CDN, you can skip this installation step.
</p>
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
<p class="dark:text-dark-500 text-gray-500">
	Copy the following code and add it to the head tag of your HTML document.
</p>
<div class="mt-3 mb-4 rounded-md p-4" style="background-color:#1e1e2e;color:#cdd6f4;">
	<div class="flex items-start pb-3">
		<div class="me-1 h-3 w-3 rounded-full bg-red-500"></div>
		<div class="me-1 h-3 w-3 rounded-full bg-yellow-500"></div>
		<div class="me-1 h-3 w-3 rounded-full bg-green-500"></div>
	</div>

	<div>{@html highlightedCDNCode}</div>
</div>

<h6 class="mb-1">Usage</h6>
<p class="dark:text-dark-500 text-gray-500">Add icon with class name, class name rule</p>
<div class="mt-3 mb-4 rounded-md p-4" style="background-color:#1e1e2e;color:#cdd6f4;">
	<div class="flex items-start pb-3">
		<div class="me-1 h-3 w-3 rounded-full bg-red-500"></div>
		<div class="me-1 h-3 w-3 rounded-full bg-yellow-500"></div>
		<div class="me-1 h-3 w-3 rounded-full bg-green-500"></div>
	</div>
	<div>{@html highlightedUSECode}</div>
</div>

<p class="dark:text-dark-500 mb-0 text-gray-500">
	For more details, see the <a href="#!" class="link hover:text-primary-600 text-primary-500"
		>documentation</a
	>.
</p>
