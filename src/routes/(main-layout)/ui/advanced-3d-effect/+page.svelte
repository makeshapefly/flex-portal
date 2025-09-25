<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { onDestroy, onMount } from 'svelte';
	import VanillaTilt from 'vanilla-tilt';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	// Extend HTMLElement to include vanillaTilt
	interface TiltedHTMLElement extends HTMLElement {
		vanillaTilt?: {
			destroy: () => void;
		};
	}

	let element: TiltedHTMLElement;

	onMount(() => {
		// Find all elements with `data-tilt` on the page
		const elements = document.querySelectorAll<HTMLElement>('[data-tilt]');

		// Initialize VanillaTilt for each element
		elements.forEach((el) => {
			VanillaTilt.init(el, {
				max: 25,
				speed: 400,
				glare: el.hasAttribute('data-tilt-glare'),
				'max-glare': parseFloat(el.getAttribute('data-tilt-max-glare') || '0')
			});
		});
	});
</script>

<PageHeading title="3D Effect" sub_title="UI Advanced" />
<Grid cols={12} gapX="space">
	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<div
				class="dark:shadow-dark-800 from-primary-500 mx-auto size-56 bg-gradient-to-br via-purple-500 to-sky-500 shadow-lg shadow-gray-300 sm:size-64 md:size-80"
				data-tilt
			></div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Glare effect</CardTitle>
		</CardHeader>
		<CardBody>
			<p class="dark:text-dark-500 mb-4 text-gray-500">
				Setting this option will enable a glare effect. You can tweak the glare value with
			</p>
			<div
				class="dark:shadow-dark-800 mx-auto size-56 bg-gradient-to-br from-green-500 via-indigo-500 to-sky-500 shadow-lg shadow-gray-300 sm:size-64 md:size-80"
				data-tilt
				data-tilt-glare
				data-tilt-max-glare="0.8"
			></div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Reverse Tilt</CardTitle>
		</CardHeader>
		<CardBody>
			<p class="dark:text-dark-500 mb-4 text-gray-500">
				Setting this option will reverse the tilt.
			</p>
			<div
				class="dark:shadow-dark-800 mx-auto size-56 bg-gradient-to-br from-sky-600 to-sky-800 shadow-lg shadow-gray-300 sm:size-64 md:size-80"
				data-tilt
				data-tilt-reverse="true"
			></div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Keep Floating</CardTitle>
		</CardHeader>
		<CardBody>
			<p class="dark:text-dark-500 mb-4 text-gray-500">
				Setting this option will not reset the tilt element when the user mouse leaves the element.
			</p>
			<div
				class="dark:shadow-dark-800 from-primary-600 to-primary-800 mx-auto size-56 bg-gradient-to-br shadow-lg shadow-gray-300 sm:size-64 md:size-80"
				data-tilt
				data-tilt-reset="false"
			></div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Full page Listening</CardTitle>
		</CardHeader>
		<CardBody>
			<p class="dark:text-dark-500 mb-4 text-gray-500">
				Setting this option will make the element respond to any mouse movements on page.
			</p>
			<div
				class="dark:shadow-dark-800 from-primary-500 mx-auto size-56 bg-gradient-to-br via-purple-500 to-sky-500 shadow-lg shadow-gray-300 sm:size-64 md:size-80"
				data-tilt
				data-tilt-full-page-listening
			></div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Scale on Hover</CardTitle>
		</CardHeader>
		<CardBody>
			<p class="dark:text-dark-500 mb-4 text-gray-500">
				Setting this option will scale tilt element on hover.
			</p>
			<div
				class="dark:shadow-dark-800 from-primary-500 mx-auto size-56 bg-gradient-to-br via-purple-500 to-sky-500 shadow-lg shadow-gray-300 sm:size-64 md:size-80"
				data-tilt
				data-tilt-scale="1.1"
			></div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Start Tilt Position</CardTitle>
		</CardHeader>
		<CardBody>
			<p class="dark:text-dark-500 mb-4 text-gray-500">
				Setting this option will tilt the element at specific degrees at page load.
			</p>
			<div
				class="dark:shadow-dark-800 mx-auto size-56 bg-gradient-to-br from-sky-600 to-sky-800 shadow-lg shadow-gray-300 sm:size-64 md:size-80"
				data-tilt
				data-tilt-startX="20"
				data-tilt-startY="-20"
				data-tilt-reset-to-start="true"
			></div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Disable X axis</CardTitle>
		</CardHeader>
		<CardBody>
			<p class="dark:text-dark-500 mb-4 text-gray-500">
				Setting this option will disable the X-Axis on the tilt element.
			</p>
			<div
				class="dark:shadow-dark-800 mx-auto size-56 bg-gradient-to-br from-green-500 via-indigo-500 to-sky-500 shadow-lg shadow-gray-300 sm:size-64 md:size-80"
				data-tilt
				data-tilt-axis="y"
			></div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Disable Y axis</CardTitle>
		</CardHeader>
		<CardBody>
			<p class="dark:text-dark-500 mb-4 text-gray-500">
				Setting this option will disable the Y-Axis on the tilt element.
			</p>
			<div
				class="dark:shadow-dark-800 mx-auto size-56 bg-gradient-to-br from-green-500 via-indigo-500 to-sky-500 shadow-lg shadow-gray-300 sm:size-64 md:size-80"
				data-tilt
				data-tilt-axis="x"
			></div>
		</CardBody>
	</Col>
</Grid>
