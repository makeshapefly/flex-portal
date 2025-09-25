<script lang="ts">
	import { createHighlighter } from 'shiki';
	import { onMount } from 'svelte';

	// Variable to hold the highlighted code
	let highlightedCode: string = '';
	let highlightedCDNCode: string = '';
	let highlightedUSECode: string = '';
	let highlightedCSSCode: string = '';

	// Code to be highlighted
	let code = `npm install line-awesome`;
	let cssCode = `@import 'line-awesome/dist/line-awesome/css/line-awesome.css';`;
	let cdnCode = `<link href="https://maxst.icons8.com/vue-static/landings/line-awesome/font-awesome-line-awesome/css/all.min.css" rel="stylesheet" />`;
	let useCode = `<i class="las la-battery-three-quarters"></i>`;

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

<p class="mb-3 text-gray-500 dark:text-dark-500">
	Line Awesome can be loaded via CDN or downloaded as zip archive. You can read more about this
	options on Line Awesome how-to page.
</p>

<h6 class="mb-2 text-16">Installation</h6>
<p class="text-gray-500 dark:text-dark-500">
	Alternatively, Line Awesome can be installed as npm package:
</p>
<div class="p-4 mt-3 mb-4 rounded-md" style="background-color:#1e1e2e;color:#cdd6f4;">
	<div class="flex items-start pb-3">
		<div class="bg-red-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-yellow-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-green-500 w-3 h-3 me-1 rounded-full"></div>
	</div>

	<div>{@html highlightedCode}</div>
</div>

<p class="text-gray-500 dark:text-dark-500">
	import CSS to your <code class="text-pink-500">icons.scss</code>
</p>
<div class="p-4 mt-3 mb-4 rounded-md" style="background-color:#1e1e2e;color:#cdd6f4;">
	<div class="flex items-start pb-3">
		<div class="bg-red-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-yellow-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-green-500 w-3 h-3 me-1 rounded-full"></div>
	</div>

	<div>{@html highlightedCSSCode}</div>
</div>

<h6 class="mb-1">CDN</h6>
<p class="text-gray-500 dark:text-dark-500">
	If you already have Font Awesome installed, simply switch out the link to start using Line
	Awesome:
</p>
<div class="p-4 mt-3 mb-4 rounded-md" style="background-color:#1e1e2e;color:#cdd6f4;">
	<div class="flex items-start pb-3">
		<div class="bg-red-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-yellow-500 w-3 h-3 me-1 rounded-full"></div>
		<div class="bg-green-500 w-3 h-3 me-1 rounded-full"></div>
	</div>

	<div>{@html highlightedCDNCode}</div>
</div>

<h6 class="mb-1">Usage</h6>
<p class="text-gray-500 dark:text-dark-500">
	Use the preview page to quickly find the name of the icon you want to use.
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
		href="https://icons8.com/line-awesome/howto"
		target="_blank"
		class="transition duration-200 ease-linear hover:text-primary-600 text-primary-500"
		>documentation</a
	>.
</p>
