<script>
	import '$lib/css/plugins.css';
	import '$lib/css/icons.css';
	import '$lib/css/tailwind.css';
	import 'swiper/swiper-bundle.css';
	import '../i18n';
	import { onMount } from 'svelte';
	import { updateAttributes } from '$lib/stores/layout';
	import BackdropOverlay from '$lib/components/ui/modalv2/BackdropOverlay.svelte';

	let searchTerm = '';
	onMount(() => {
		updateAttributes();
	});
</script>

<slot />
<BackdropOverlay />
