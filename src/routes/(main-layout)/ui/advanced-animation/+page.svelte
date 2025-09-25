<script>
	// @ts-nocheck
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import AOS from 'aos';
	import 'aos/dist/aos.css';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	// Initialize AOS
	import { onMount } from 'svelte';

	onMount(() => {
		AOS.init();
	});
</script>

<PageHeading title="Animation" sub_title="UI Advanced" />
<h5 class="mb-5 underline">Fade Animation:</h5>
<Grid class="gap-x-space md:grid-cols-2 2xl:grid-cols-3">
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-up"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="fade-up"</code>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-down"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="fade-down"</code>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-right"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="fade-right"</code>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-left"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="fade-left"</code>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-up-right"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="fade-up-right"</code>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-up-left"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="fade-up-left"</code>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-down-right"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="fade-down-right"</code>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-down-left"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="fade-down-left"</code>
			</div>
		</CardBody>
	</Card>
</Grid>

<h5 class="mb-5 underline">Flip Animation:</h5>
<Grid class="gap-x-space md:grid-cols-2 2xl:grid-cols-3">
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="flip-left"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="flip-left"</code>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="flip-up"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="flip-up"</code>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="flip-down"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="flip-down"</code>
			</div>
		</CardBody>
	</Card>
</Grid>

<h5 class="mb-5 underline">Zoom Animation:</h5>
<Grid class="gap-x-space md:grid-cols-2 2xl:grid-cols-3">
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="zoom-in"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="zoom-in"</code>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="zoom-in-up"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="zoom-in-up"</code>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="zoom-in-down"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="zoom-in-down"</code>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="zoom-in-left"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="zoom-in-left"</code>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="zoom-in-right"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="zoom-in-right"</code>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="zoom-out"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="zoom-out"</code>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="zoom-out-up"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="zoom-out-up"</code>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="zoom-out-down"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="zoom-out-down"</code>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="zoom-out-right"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="zoom-out-right"</code>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="zoom-out-left"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="zoom-out-left"</code>
			</div>
		</CardBody>
	</Card>
</Grid>

<h5 class="mb-5 underline">Different settings examples Animation:</h5>
<Grid class="gap-x-space md:grid-cols-2 2xl:grid-cols-3">
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-up"
				data-aos-duration="3000"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="fade-up" data-aos-duration="3000"</code>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-down"
				data-aos-easing="linear"
				data-aos-duration="1500"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500"
					>data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500"</code
				>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-right"
				data-aos-offset="300"
				data-aos-easing="ease-in-sine"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500"
					>data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine"</code
				>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-left"
				data-aos-anchor="#example-anchor"
				data-aos-offset="500"
				data-aos-duration="500"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500"
					>data-aos="fade-left" data-aos-anchor="#example-anchor" data-aos-offset="500"
					data-aos-duration="500"</code
				>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-zoom-in"
				data-aos-easing="ease-in-back"
				data-aos-delay="300"
				data-aos-offset="0"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500"
					>data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-delay="300"
					data-aos-offset="0"</code
				>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="flip-left"
				data-aos-easing="ease-out-cubic"
				data-aos-duration="2000"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500"
					>data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000"</code
				>
			</div>
		</CardBody>
	</Card>
</Grid>

<h5 class="mb-5 underline">Anchor placement:</h5>
<Grid class="gap-x-space md:grid-cols-2 2xl:grid-cols-3">
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-up"
				data-aos-anchor-placement="top-bottom"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="fade-up" data-aos-anchor-placement="top-bottom"</code>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-up"
				data-aos-anchor-placement="center-bottom"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500"
					>data-aos="fade-up" data-aos-anchor-placement="center-bottom"</code
				>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-up"
				data-aos-anchor-placement="center-center"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500"
					>data-aos="fade-up" data-aos-anchor-placement="center-center"</code
				>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-up"
				data-aos-anchor-placement="bottom-bottom"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500"
					>data-aos="fade-up" data-aos-anchor-placement="bottom-bottom"</code
				>
			</div>
		</CardBody>
	</Card>
	<Card>
		<CardBody>
			<div
				class="from-primary-500/20 mx-auto size-56 bg-gradient-to-br via-purple-500/20 to-sky-500/20 sm:size-64 md:size-80"
				data-aos="fade-up"
				data-aos-anchor-placement="top-center"
			></div>
			<div class="mt-3 text-center">
				<code class="text-pink-500">data-aos="fade-up" data-aos-anchor-placement="top-center"</code>
			</div>
		</CardBody>
	</Card>
</Grid>
