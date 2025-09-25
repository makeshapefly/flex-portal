<script lang="ts">
	import { writable, get } from 'svelte/store';
	import { onMount } from 'svelte';

	let search = writable("let's try this");
	let wordCount = writable(0);
	let charCount = writable(0);

	// Function to count words and characters (without spaces)
	function countWordsAndChars() {
		const text = get(search).trim();
		const words = text.split(/\s+/).filter(Boolean); // Split by spaces and filter out empty words
		wordCount.set(words.length);
		charCount.set(text.replace(/\s/g, '').length); // Remove spaces before counting characters
	}

	// Update counts on every input change
	function handleInput(event: Event) {
		search.set((event.target as HTMLTextAreaElement).value); // Update search store
		countWordsAndChars(); // Update word and character counts
	}

	// Call countWordsAndChars when the component is mounted
	onMount(() => {
		countWordsAndChars(); // Initial count based on the default value
	});
</script>

<div>
	<textarea
		name="search"
		id="words"
		rows="10"
		bind:value={$search}
		on:input={handleInput}
		class="form-input h-auto"
	></textarea>

	<p class="mt-4">
		Word count:
		<span style="font-weight: 600; color: #3b82f6;">{$wordCount}</span>
	</p>
	<p>
		Character count:
		<span style="font-weight: 600; color: #3b82f6;">{$charCount}</span> (without spaces)
	</p>
</div>
