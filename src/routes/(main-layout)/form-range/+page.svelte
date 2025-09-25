<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import noUiSlider from 'nouislider';
	import wNumb from 'wnumb';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	let defaultSlider;
	let valuesSlider;
	let arbitraryValuesSlider;
	let sliderColor;
	let toggleSlider;
	let softSlider;
	let mergingTooltipSlider;
	let colorSliders;

	onMount(() => {
		// Default Example Slider
		noUiSlider.create(defaultSlider, {
			start: [20, 80],
			connect: true,
			range: {
				min: 0,
				max: 100
			}
		});

		// Using an array of values Slider
		const valuesForSlider = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32];
		const format = {
			to: function (value) {
				return valuesForSlider[Math.round(value)];
			},
			from: function (value) {
				return valuesForSlider.indexOf(Number(value));
			}
		};

		noUiSlider.create(valuesSlider, {
			start: [8, 24],
			range: { min: 0, max: valuesForSlider.length - 1 },
			step: 1,
			tooltips: true,
			format: format,
			pips: { mode: 'steps', format: format }
		});

		// Arbitrary string values Slider
		const arbitraryValuesForSlider = ['128MB', '256MB', '1GB', '8GB', '16GB', '32GB'];
		const arbitraryFormat = {
			to: function (value) {
				return arbitraryValuesForSlider[Math.round(value)];
			},
			from: function (value) {
				return arbitraryValuesForSlider.indexOf(value);
			}
		};

		noUiSlider.create(arbitraryValuesSlider, {
			start: ['1GB', '16GB'],
			range: { min: 0, max: arbitraryValuesForSlider.length - 1 },
			step: 1,
			tooltips: true,
			format: arbitraryFormat,
			pips: { mode: 'steps', format: arbitraryFormat, density: 50 }
		});

		// Slider Color Example
		noUiSlider.create(sliderColor, {
			start: [4000, 8000, 12000, 16000],
			connect: [false, true, true, true, true],
			range: {
				min: [2000],
				max: [20000]
			}
		});

		const connect = sliderColor.querySelectorAll('.noUi-connect');
		const classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];
		connect.forEach((el, i) => el.classList.add(classes[i]));

		// Toggle Slider
		noUiSlider.create(toggleSlider, {
			orientation: 'vertical',
			start: 0,
			range: {
				min: [0, 1],
				max: 1
			},
			format: wNumb({ decimals: 0 })
		});

		toggleSlider.noUiSlider.on('update', (values, handle) => {
			if (values[handle] === '1') {
				toggleSlider.classList.add('off');
			} else {
				toggleSlider.classList.remove('off');
			}
		});

		// Soft Limit Slider
		noUiSlider.create(softSlider, {
			start: 50,
			range: {
				min: 0,
				max: 100
			},
			pips: {
				mode: 'values',
				values: [20, 80],
				density: 4
			}
		});

		softSlider.noUiSlider.on('change', (values, handle) => {
			if (values[handle] < 20) {
				softSlider.noUiSlider.set(20);
			} else if (values[handle] > 80) {
				softSlider.noUiSlider.set(80);
			}
		});

		// Overlapping Tooltip Slider
		noUiSlider.create(mergingTooltipSlider, {
			start: [20, 32, 50, 70, 80, 90],
			connect: true,
			tooltips: [false, true, true, true, true, true],
			range: {
				min: 0,
				max: 100
			}
		});

		const resultElement = document.getElementById('result');
		const colorSliders = document.querySelectorAll('.sliders');
		const colors = [0, 0, 0];

		colorSliders.forEach((slider, index) => {
			// Create noUiSlider for each color channel (red, green, blue)
			noUiSlider.create(slider, {
				start: 127,
				connect: [true, false],
				orientation: 'vertical',
				range: { min: 0, max: 255 },
				format: wNumb({ decimals: 0 })
			});

			// Update the RGB color when the slider is changed
			slider.noUiSlider.on('update', () => {
				colors[index] = slider.noUiSlider.get();
				const color = `rgb(${colors.join(',')})`;
				resultElement.style.background = color;
				resultElement.style.color = color;
			});
		});
	});
</script>

<PageHeading title="Range Slider" sub_title="Templates" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Default Example</CardTitle>
		</CardHeader>
		<CardBody class="flex flex-col gap-5">
			<input type="range" min="0" max="10" step="1" value="1" class="input-range" />
			<input type="range" min="0" max="10" step="1" value="2" class="input-range range-purple" />
			<input type="range" min="0" max="10" step="1" value="3" class="input-range range-green" />
			<input type="range" min="0" max="10" step="1" value="4" class="input-range range-red" />
			<input type="range" min="0" max="10" step="1" value="5" class="input-range range-yellow" />
			<input type="range" min="0" max="10" step="1" value="6" class="input-range range-sky" />
			<input type="range" min="0" max="10" step="1" value="7" class="input-range range-orange" />
			<input type="range" min="0" max="10" step="1" value="8" class="input-range range-pink" />
			<input type="range" min="0" max="10" step="1" value="9" class="input-range range-indigo" />
			<input type="range" min="0" max="10" step="1" value="10" class="input-range range-dark" />
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<div id="defaultSlider" bind:this={defaultSlider}></div>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Using arbitrary values</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex h-20 items-center justify-center">
				<div id="arrayValuesSlider" bind:this={valuesSlider} class="w-full"></div>
			</div>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Using arbitrary (string) values</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex h-20 items-center justify-center">
				<div id="arbitrary-values-slider" bind:this={arbitraryValuesSlider} class="w-full"></div>
			</div>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Slider Color</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex h-20 items-center justify-center">
				<div id="slider-color" bind:this={sliderColor} class="w-full"></div>
			</div>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Slider Toggle</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex h-20 items-center justify-center">
				<div bind:this={toggleSlider} id="slider-toggle"></div>
			</div>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Soft Limit</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex h-20 items-center justify-center">
				<div id="soft-limit" bind:this={softSlider} class="w-full"></div>
			</div></CardBody
		>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Overlapping Tooltip</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex h-20 items-center justify-center">
				<div bind:this={mergingTooltipSlider} id="overlapping-tooltip" class="w-full"></div>
			</div>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Colorpicker</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex items-center justify-center">
				<div bind:this={colorSliders} id="colorpicker">
					<div class="sliders" id="red"></div>
					<div class="sliders" id="green"></div>
					<div class="sliders" id="blue"></div>
					<div id="result"></div>
				</div>
			</div>
		</CardBody>
	</Col>
</Grid>
