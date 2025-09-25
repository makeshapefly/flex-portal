<script>
	// @ts-nocheck
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { selectConfig } from '$lib/stores/selectstore';

	export let configKey = '';
	let selectElement;
	let virtualSelect;
	const dispatch = createEventDispatcher();

	$: config = $selectConfig[configKey] || {};

	onMount(async () => {
		// Dynamically import the VirtualSelect library if it's not already loaded
		if (typeof VirtualSelect === 'undefined') {
			try {
				await import(
					'https://cdn.jsdelivr.net/npm/virtual-select-plugin/dist/virtual-select.min.js'
				);
			} catch (e) {
				console.error('Failed to load VirtualSelect:', e);
				return;
			}
		}

		// Now that VirtualSelect is loaded, initialize it
		initializeSelect();
	});

	onDestroy(() => {
		if (virtualSelect) {
			virtualSelect.destroy();
		}
	});

	function initializeSelect() {
		const options = {
			ele: selectElement,
			options: config.options || [],
			multiple: config.multiple || false,
			search: config.search || false,
			placeholder: config.placeholder || 'Select',
			selectedValue: config.preselect || null,
			disabledOptions: config.disabledOptions || [],

			// Additional virtual-select specific options
			noOptionsText: 'No options found',
			searchPlaceholderText: 'Search...',
			optionsCount: 8,
			hasOptionDescription: config.hasOptionDescription || false,
			// Event handlers
			onSelect: (params) => {
				dispatch('select', {
					value: params.value,
					selectedOptions: params.selectedOptions
				});
			},
			onSearch: (params) => {
				dispatch('search', {
					value: params.value
				});
			},
			onDropdownClose: () => {
				dispatch('close');
			},
			onDropdownOpen: () => {
				dispatch('open');
			}
		};

		virtualSelect = new VirtualSelect(options);

		// If there's a preselected value, set it
		if (config.preselect) {
			virtualSelect.setValue(config.preselect);
		}
	}

	export function reset() {
		if (virtualSelect) {
			virtualSelect.reset();
		}
	}

	export function setDisabled(disabled) {
		if (virtualSelect) {
			disabled ? virtualSelect.disable() : virtualSelect.enable();
		}
	}

	export function updateOptions(newOptions) {
		if (virtualSelect) {
			virtualSelect.setOptions(newOptions);
		}
	}
</script>

<!-- The element that will be transformed into virtual-select -->
<div bind:this={selectElement}>
	<slot></slot>
</div>
