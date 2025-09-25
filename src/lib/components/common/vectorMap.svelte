<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	if (browser) {
		import('jsvectormap').then(() => {
			import('jsvectormap/dist/maps/world.js')
		});
	}

	export let mapId = 'map';
	export let options = {};
	export let height = '200';
	export let extraCss = '';

	let map;
	let container;
	let observer;

	onMount(async () => {
		if (!browser) return;
		const jsVectorMap = (await import('jsvectormap')).default;
		await import('jsvectormap/dist/maps/world.js');

		map = new jsVectorMap({
			selector: `#${mapId}`,
			...options
		});

		// ✅ ResizeObserver to make map responsive
		observer = new ResizeObserver(() => {
			if (map) {
				map.updateSize();
			}
		});
		if (container) observer.observe(container);
	});
	
	onDestroy(() => {
		if (observer && container) observer.unobserve(container);
	});
</script>

<div bind:this={container} class={`w-full ${extraCss}`} style={`height: ${height}px`}>
	<!-- 💡 The actual map container -->
	<div id={mapId} class="h-full w-full"></div>
</div>

