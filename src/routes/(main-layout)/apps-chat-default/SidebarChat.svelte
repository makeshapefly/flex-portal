<script>
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	const items = [
		{ type: 'image', src: '/assets/images/brands/img-02.png' },
		{ type: 'text', text: 'PE' },
		{ type: 'image', src: '/assets/images/brands/img-06.png' },
		{ type: 'image', src: '/assets/images/brands/img-05.png' },
		{ type: 'image', src: '/assets/images/brands/img-01.png' },
		{ type: 'image', src: '/assets/images/brands/img-07.png' },
		{ type: 'image', src: '/assets/images/brands/img-08.png' },
		{ type: 'text', text: 'AI' },
		{ type: 'image', src: '/assets/images/brands/img-09.png' },
		{ type: 'image', src: '/assets/images/brands/img-10.png' },
		{ type: 'image', src: '/assets/images/brands/img-12.png' }
	];
</script>

<Simplebar class="max-h-[calc(100vh_-_13rem)]">
	<CardBody class="flex gap-4 *:shrink-0 2xl:flex-col">
		{#each items as item}
			<a
				href="#!"
				title="link"
				class="dark:bg-dark-850 dark:hover:ring-offset-dark-900 dark:[&.active]:ring-offset-dark-900 hover:ring-opacity-100 [&.active]:ring-opacity-100 hover:ring-primary-500 [&.active]:ring-primary-500 relative flex size-14 items-center justify-center rounded-full bg-gray-100 font-semibold transition duration-200 ease-linear hover:ring-2 hover:ring-offset-2 [&.active]:ring-2 [&.active]:ring-offset-2"
			>
				{#if item.type === 'image'}
					<img src={item.src} alt="" class="size-9 rounded-full" />
				{:else if item.type === 'text'}
					<span>{item.text}</span>
				{/if}
				<span
					class="dark:border-dark-900 absolute right-1 bottom-0 size-3 rounded-full border-2 border-white bg-green-500"
				></span>
			</a>
		{/each}
	</CardBody>
</Simplebar>
