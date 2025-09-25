<script>
	// @ts-nocheck
	import { onMount } from 'svelte';

	let editorContainer;
	let quill;

	onMount(async () => {
		if (typeof window !== 'undefined') {
			// Dynamically import Quill on the client-side only
			const { default: Quill } = await import('quill');

			// Initialize Quill editor only on the client-side
			quill = new Quill(editorContainer, {
				theme: 'snow'
			});
		}
	});
</script>

<!-- Quill Editor Container -->
<div bind:this={editorContainer} class="!h-52">
	<h2>Hello World!</h2>
	<p>Some initial <strong>bold</strong> text</p>
	<p><br /></p>
</div>
