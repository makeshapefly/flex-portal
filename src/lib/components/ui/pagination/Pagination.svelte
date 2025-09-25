<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import { paginationColors } from './pagination-css';
	export let variant: UI.PaginationVariant = 'basic';
	export let color: UI.Colors = 'primary';
	export let size: UI.PaginationSize = 'default';
	export let prevButtonClass: string = '';
	export let nextButtonClass: string = '';
	export let paginationConfig: {
		currentPage: number;
		totalItems: number;
		itemsPerPage: number;
	};
	let colorClass: UI.PaginationColorConfig;
	let pages: number = 0;

	const calcPages = (itemsPerPage: number, totalItems: number): number => {
		return Math.ceil(totalItems / itemsPerPage);
	};

	$: {
		pages = calcPages(paginationConfig.itemsPerPage, paginationConfig.totalItems);
		colorClass = paginationColors[`${variant}-${color}`];
	}

	// Function to generate the pages to display
	const getDisplayedPages = (currentPage: number, totalPages: number) => {
		const pageArray = [];
		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) {
				pageArray.push(i);
			}
		} else {
			if (currentPage == 1) {
				pageArray.push(1, 2, 3, -1, totalPages - 1);
			} else if (currentPage == totalPages - 1) {
				pageArray.push(1, -1, totalPages - 3, totalPages - 2, totalPages - 1);
			} else {
				pageArray.push(1);
				if (currentPage >= 3) pageArray.push(-1);
				const startPage = Math.max(2, currentPage - 1);
				const endPage = Math.min(totalPages - 1, currentPage + 1);
				for (let i = startPage; i <= endPage; i++) {
					pageArray.push(i);
				}
				if (currentPage < totalPages - 2) pageArray.push(-1);
				pageArray.push(totalPages);
			}
		}
		return pageArray;
	};

	// Function to handle page navigation
	const goToPrevPage = () => {
		if (paginationConfig.currentPage > 1) {
			paginationConfig.currentPage--;
		}
	};

	const goToNextPage = () => {
		if (paginationConfig.currentPage < pages) {
			paginationConfig.currentPage++;
		}
	};
</script>

{#if variant === 'modern' || variant === 'modern-rounded'}
	<div class={`inline-flex items-center gap-3 overflow-hidden ${colorClass.containerClass}`}>
		<button
			type="button"
			class={`flex size-9 items-center justify-center border-green-200/20 text-sm transition duration-200 ease-linear ltr:border-r rtl:border-l ${colorClass.containerClass} hover:text-white [&.active]:text-white ${colorClass.containerClass}  ${prevButtonClass}`}
			on:click={goToPrevPage}
			disabled={paginationConfig.currentPage === 1}
		>
			<LucideIcon name="ChevronLeft" class="size-5" />
		</button>
		<p class={`${colorClass.containerClass} cursor-default`}>
			<b class="font-medium text-white"
				>{paginationConfig.currentPage.toString().padStart(2, '0')}</b
			>
			/ {pages}
		</p>
		<button
			type="button"
			class={`flex size-9 items-center justify-center border-green-200/20 text-sm transition duration-200 ease-linear ltr:border-r rtl:border-l ${colorClass.containerClass} hover:text-white [&.active]:text-white ${colorClass.containerClass} ${nextButtonClass}`}
			on:click={goToNextPage}
			disabled={paginationConfig.currentPage === pages}
		>
			<LucideIcon name="ChevronRight" class="size-5" />
		</button>
	</div>
{:else}
	<div class={`pagination ${colorClass.containerClass} pagination-${size} `}>
		<button
			type="button"
			class={`${colorClass?.preBtnClass ? colorClass?.preBtnClass : ''} ${variant === 'basic-rounded' || variant === 'flush-rounded' ? '!rounded-full' : ''}`}
			on:click={goToPrevPage}
			disabled={paginationConfig.currentPage === 1}
		>
			<LucideIcon name="ChevronLeft" class="size-5" />
			{variant === 'flush' ? '' : 'Prev'}
		</button>
		{#each getDisplayedPages(paginationConfig.currentPage, pages) as page}
			{#if page === -1}
				<button
					class={`pagination-item ${variant === 'basic-rounded' || variant === 'flush-rounded' ? '!rounded-full' : ''}`}
				>
					...
				</button>
			{:else}
				<button
					class={`pagination-item ${page === paginationConfig.currentPage ? 'active' : ''} ${variant === 'basic-rounded' || variant === 'flush-rounded' ? '!rounded-full' : ''}`}
					on:click={() => (paginationConfig.currentPage = page)}
				>
					{page}
				</button>
			{/if}
		{/each}
		<button
			type="button"
			class={`pagination-next ${variant === 'basic-rounded' || variant === 'flush-rounded' ? '!rounded-full' : ''}`}
			on:click={goToNextPage}
			disabled={paginationConfig.currentPage === pages}
		>
			{variant === 'flush' ? '' : 'Next'}
			<LucideIcon name="ChevronRight" class="size-5" />
		</button>
	</div>
{/if}
