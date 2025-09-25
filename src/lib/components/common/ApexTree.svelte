<script lang="ts">
	import { getColorCodes } from '$lib/utils/chart-color';
	import { layoutStore } from '$lib/stores/layout';
	//@ts-ignore
	import ApexTree from 'apextree';
	import { onDestroy, onMount } from 'svelte';

	export let options: any;
	export let data: any;
	export let colors: string[] = [];
	export let darkColors: string[] | undefined = undefined;
	let apexTreeContainer: HTMLElement;
	let tree: ApexTree;
	let colorCodes: string[];

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
		const colorOption = getColorOption(index);
		data.options = colorOption;
		data.data.borderColor = colorOption.borderColor;
		// data.borderColor = getColorOption(index).borderColor;
		// If the node has children, recursively set options for each child
		if (data.children && data.children.length > 0) {
			data.children.forEach((child: any, childIndex: number) => {
				// Pass an incremented index for the children
				setColorOptions(child, index + 1);
			});
		}
	}

	function renderTree() {
		if (options && data && apexTreeContainer && ApexTree) {
			setColorOptions(data, 2);
			tree = new ApexTree(apexTreeContainer, options);
			tree.render(data);
		}
	}

	onMount(() => {
		colorCodes = getColorCodes({
			chartColors: colors,
			chartDarkColors: darkColors,
			themeMode: $layoutStore.layoutTheme
		});
		renderTree();
	});

	function resetChart() {
		if (apexTreeContainer) {
			apexTreeContainer.innerHTML = '';
		}
		renderTree();
	}

	$: if ($layoutStore.layoutTheme) {
		colorCodes = getColorCodes({
			chartColors: colors,
			chartDarkColors: darkColors,
			themeMode: $layoutStore.layoutTheme
		});
		resetChart();
	}
</script>

<div bind:this={apexTreeContainer} class={$$props.class}></div>
