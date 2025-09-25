<script lang="ts">
	import 'simplebar/dist/simplebar.css';
	import { onMount } from 'svelte';

	let simpleBarInstance: any;
	let element: HTMLElement;
	onMount(() => {
		// Dynamically import SimpleBar to ensure it's only loaded client-side
		import('simplebar').then(({ default: SimpleBar }) => {
			simpleBarInstance = new SimpleBar(element);
		});

		return {
			// If there are any updates needed, you can define an update method here
			update() {},
			destroy() {
				// Cleanup logic here
				simpleBarInstance?.unMount();
			}
		};
	});
</script>

<div bind:this={element} {...$$props}>
	<slot></slot>
</div>
