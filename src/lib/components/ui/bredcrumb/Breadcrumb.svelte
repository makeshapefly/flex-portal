<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	type BreaCrumbVarient = 'arrow' | 'arrow-icon' | 'line' | 'line-icon' | 'icon' | '';
	export let varient: BreaCrumbVarient = '';

	let containerClass: string = '';

	// Derive breadcrumb items from the current route
	const items = derived(page, ($page) => {
		const segments = $page.url.pathname.split('/').filter(Boolean);
		const breadcrumbItems = segments.map((segment, index) => {
			try {
				const href = '/' + segments.slice(0, index + 1).join('/');
				return {
					name: segment
						.split('-')
						.map((str) => str.charAt(0).toUpperCase() + str.slice(1))
						.join(' '),
					href
				};
			} catch (error) {}
		});

		let root = { name: 'Domiex', href: '/' };
		let tailwindScan = '';
		// Add 'Domiex' for the root route
		switch (varient) {
			case 'arrow':
				root = { name: 'Domiex', href: '/' };
				tailwindScan = "*:before:content-['\EA6E']";
				containerClass = `*:before:content-['\\EA6E']`;
				break;

			case 'arrow-icon':
				root = { name: `<i class="align-middle ri-home-4-line"></i>`, href: '/' };
				tailwindScan = "*:before:content-['\EA6E']";
				containerClass = `*:before:content-['\\EA6E']`;
				break;

			case 'line':
				root = { name: 'Domiex', href: '/' };
				tailwindScan = "*:before:content-['\F1AF']";
				containerClass = `*:before:content-['\\F1AF']`;
				break;

			case 'line-icon':
				root = { name: `<i class="align-middle ri-home-4-line"></i>`, href: '/' };
				tailwindScan = "*:before:content-['\F1AF']";
				containerClass = `*:before:content-['\\F1AF']`;
				break;

			case 'icon':
				root = { name: `<i class="align-middle ri-home-4-line"></i>`, href: '/' };
				containerClass = `*:before:content-['\\f2e5']`;
				break;

			default:
				root = { name: 'Domiex', href: '/' };
				tailwindScan = "*:before:content-['\f2e5']";
				containerClass = `*:before:content-['\\f2e5']`;
				break;
		}
		breadcrumbItems.unshift(root);
		return breadcrumbItems;
	});
</script>

<ul class={`breadcrumb ${containerClass}`}>
	{#each $items as item, index}
		<li class="breadcrumb-item">
			{#if item?.href === $page.url.pathname}
				<span class="active">{@html item.name}</span>
			{:else}
				<a href={item?.href}>{@html item?.name}</a>
			{/if}
		</li>
	{/each}
</ul>
