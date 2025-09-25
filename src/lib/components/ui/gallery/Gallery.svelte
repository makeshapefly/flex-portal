<script lang="ts">
	import { X } from 'lucide-svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	let isOpen = false;
	let imageSrc = '';

	const openModal = (src: string) => {
		imageSrc = src;
		isOpen = true;
	};

	const closeModal = () => {
		isOpen = false;
	};

	let images = [
		{
			src: '/assets/images/gallery/img-01.jpg',
			alt: 'Image 1',
			class: 'h-64'
		},
		{
			src: '/assets/images/gallery/img-02.jpg',
			alt: 'Image 2',
			class: 'h-[25rem]'
		},
		{
			src: '/assets/images/gallery/img-04.jpg',
			alt: 'Image 3',
			class: 'h-72'
		},
		{
			src: '/assets/images/gallery/img-05.jpg',
			alt: 'Image 4',
			class: 'h-48 -mt-[144px]'
		},
		{
			src: '/assets/images/gallery/img-06.jpg',
			alt: 'Image 5',
			class: 'h-80'
		},
		{
			src: '/assets/images/gallery/img-03.jpg',
			alt: 'Image 6',
			class: 'h-80 -mt-[112px]'
		},
		{
			src: '/assets/images/gallery/long/img-01.jpg',
			alt: 'Image 7',
			class: 'h-96 -mt-[272px]'
		}
	];
</script>

<!-- Modal -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if isOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="z-drawer fixed inset-0 flex items-center justify-center bg-gray-900/60"
		on:click={closeModal}
	>
		<div class="relative mx-auto max-w-3xl overflow-y-auto">
			<!-- Close Button -->
			<button
				on:click={closeModal}
				class="absolute top-0 right-0 m-4 rounded-full bg-gray-900 p-1.5 text-white transition duration-200 ease-linear hover:text-red-500"
			>
				<LucideIcon name="X" />
			</button>
			<!-- Image -->
			<img src={imageSrc} alt="" class="rounded object-contain" />
		</div>
	</div>
{/if}

<!-- Image Gallery -->
<ul class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
	{#each images as image}
		<li class={image.class}>
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img
				src={image.src}
				alt={image.alt}
				class="h-full w-full cursor-pointer rounded-sm object-cover object-center"
				on:click={() => openModal(image.src)}
			/>
		</li>
	{/each}
</ul>
