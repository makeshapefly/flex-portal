<script lang="ts">
  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import { browser } from '$app/environment';
  // @ts-ignore
  import * as echarts from 'echarts';

  // Accept a single full config object from the parent
  export let config: any;

  let chartContainer: HTMLElement | null = null;
  let chart: echarts.ECharts | null = null;
  let resizeObserver: ResizeObserver | null = null;

  // Render the chart with the provided config
  function renderChart() {
    if (!browser || !chartContainer) return;

    if (!chart) {
      chart = echarts.init(chartContainer);
    }

    chart.setOption(config);
    chart.resize();
  }

  // Resize chart when container size changes
  function handleResize() {
    if (!browser || !chart) return;
    chart.resize();
  }

  onMount(() => {
    if (!browser) return;

    renderChart();

    resizeObserver = new ResizeObserver(() => handleResize());
    if (chartContainer) {
      resizeObserver.observe(chartContainer);
    }

    window.addEventListener('resize', handleResize);
  });

  afterUpdate(() => {
    if (!browser) return;
    renderChart();
  });

  onDestroy(() => {
    if (!browser) return;

    chart?.dispose();
    chart = null;

    resizeObserver?.disconnect();
    window.removeEventListener('resize', handleResize);
  });
</script>

<!-- 🧱 Your chart must have a height/width, either via class or styles -->
<div bind:this={chartContainer} class={$$props.class}></div>
