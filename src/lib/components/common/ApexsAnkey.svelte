<script lang="ts">
	import { getColorCodes } from '$lib/utils/chart-color';
	import { layoutStore } from '$lib/stores/layout';
	//@ts-ignore
	import ApexSankey from 'apexsankey?client';
	import { onDestroy, onMount } from 'svelte';

	export let options: any;
	export let data: any;
	export let colors: string[] = [];
	export let darkColors: string[] | undefined = undefined;
	let apexSankeyContainer: HTMLElement;
	let tree: ApexSankey;
	let colorCodes: string[];

	// Subscribe to layoutStore
	$: theme = $layoutStore.layoutTheme;

	function getColorOption(index: number) {
		if (index >= colorCodes.length) {
			return {
				borderColor: '',
				nodeBGColor: '',
				nodeBGColorHover: ''
			};
		}

		return {
			borderColor: colorCodes[index],
			nodeBGColor: colorCodes[index],
			nodeBGColorHover: colorCodes[index]
		};
	}

	// Recursive function to traverse the tree and set options
	function setColorOptions(data: any, index: number): void {
		// Set options on the current node
		data.options = getColorOption(index);

		// If the node has children, recursively set options for each child
		if (data.children && data.children.length > 0) {
			data.children.forEach((child: any, childIndex: number) => {
				// Pass an incremented index for the children
				setColorOptions(child, index + 1);
			});
		}
	}

	function renderSankey() {
		if (options && data && apexSankeyContainer && ApexSankey) {
			setColorOptions(data, 2);

			options.fontColor = theme === 'dark' ? '#ffffff' : '#212121';
			apexSankeyContainer.innerHTML = '';
			tree = new ApexSankey(apexSankeyContainer, options);
			tree.render(data);
		}
	}

	onMount(() => {
		colorCodes = getColorCodes({
			chartColors: colors,
			chartDarkColors: darkColors,
			themeMode: $layoutStore.layoutTheme
		});
		renderSankey();
	});

	$: if (theme) {
		renderSankey();
	}

	onDestroy(() => {
		if (tree && typeof tree.destroy === 'function') {
			tree.destroy();
		}
	});
</script>

<div bind:this={apexSankeyContainer} class={$$props.class}></div>
