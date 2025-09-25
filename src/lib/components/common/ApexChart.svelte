<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { get } from 'svelte/store';
	import { layoutStore } from '$lib/stores/layout';
	import { getColorCodes } from '$lib/utils/chart-color'; // Optional, or use raw color arrays

	export let options: any;
	export let darkColors: string[] | undefined = undefined;
	export let colors: string[] = [];

	let chartContainer: HTMLElement;
	let chart: any = null;
	let resizeObserver: ResizeObserver | null = null;

	let ApexCharts: any = null;

	// Function to render chart
	async function renderChart() {
		if (!browser) return;

		const theme = 'transparent';

		if (!chartContainer || !ApexCharts || !options) return;

		const chartOptions = {
			...options,
			colors: getColorCodes
				? getColorCodes({
						chartDarkColors: darkColors,
						chartColors: colors,
						themeMode: $layoutStore.layoutTheme
					})
				: colors,
			theme: {
				mode: theme
			}
		};

		if (chart) {
			chart.destroy();
		}

		chart = new ApexCharts(chartContainer, chartOptions);
		await chart.render();
	}

	// Function to handle resize
	function resizeChart() {
		if (!browser || !chart || typeof chart.resize !== 'function') {
			return;
		}

		chart.resize();
	}

	// Mount lifecycle
	onMount(async () => {
		if (!browser) return;

		const module = await import('apexcharts');
		ApexCharts = module.default;

		await renderChart();

		window.addEventListener('resize', resizeChart);

		resizeObserver = new ResizeObserver(() => {
			resizeChart();
		});
		resizeObserver.observe(chartContainer);
	});

	// Cleanup
	onDestroy(() => {
		if (!browser) return;

		if (chart) {
			chart.destroy();
			chart = null;
		}

		window.removeEventListener('resize', resizeChart);

		if (resizeObserver) {
			resizeObserver.disconnect();
			resizeObserver = null;
		}
	});

	// Reactively re-render chart on theme changes
	$: if (browser && layoutStore) {
		const theme = get(layoutStore)?.layoutTheme;
		if (theme && chart) {
			renderChart();
		}
	}

	// 🔥 Reactively re-render chart on colors change
	$: if (browser && colors.length && chart) {
		renderChart();
	}

	$: $layoutStore.primaryColor && renderChart();
</script>

<!-- Chart container -->
<div bind:this={chartContainer} class={$$props.class}></div>
