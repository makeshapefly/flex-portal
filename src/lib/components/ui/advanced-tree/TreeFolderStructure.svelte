<script lang="ts">
	import { fileTreeStore, toggleNodeVisibility } from '$lib/stores/tree';
	import { derived } from 'svelte/store';

	// Derived store to map levels with their expanded/collapsed state
	const fileTreeData = derived(fileTreeStore, ($fileTreeStore) => {
		return $fileTreeStore.levels.map((node, index) => {
			const isAssetsFolder = node.title.toLowerCase() === 'assets';

			// Open the 'assets' folder and its children by default
			if (isAssetsFolder) {
				node.isOpen = true;
				if (node.children) {
					node.children.forEach((child) => {
						child.isOpen = true;
					});
				}
			}

			return {
				...node,
				isOpen: $fileTreeStore.openNodes.has(index) || node.isOpen,
				children: node.children?.map((child, childIndex) => ({
					...child,
					isOpen: $fileTreeStore.openNodes.has(childIndex) || child.isOpen
				}))
			};
		});
	});
</script>

<div class="-mx-5">
	<ul>
		{#each $fileTreeData as node, index}
			<li>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="block px-5 py-1 hover:text-gray-900 dark:text-dark-100 folder cursor-pointer"
					on:click={() => toggleNodeVisibility(index)}
				>
					<i
						class={node.isOpen
							? 'ri-folder-open-line icon text-yellow-500'
							: 'ri-folder-3-line icon text-yellow-500 dark:text-dark-500'}
					></i>
					{node.title}
				</div>

				{#if node.isOpen && node.children}
					<ul class="transition-all duration-300 ease-in-out pl-5">
						{#each node.children as child, childIndex}
							<li>
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<div
									class="block px-5 py-1 hover:text-gray-900 dark:text-dark-100 folder cursor-pointer"
									on:click={() => toggleNodeVisibility(childIndex)}
								>
									<i
										class={child.isOpen
											? 'ri-folder-open-line icon text-yellow-500'
											: 'ri-folder-3-line icon text-yellow-500 dark:text-dark-500'}
									></i>
									{child.title}
								</div>

								{#if child.isOpen && child.children}
									<ul class="transition-all duration-300 ease-in-out pl-5">
										{#each child.children as grandchild}
											<li>
												<div
													class="block px-5 py-1 hover:text-gray-900 dark:text-dark-100 folder cursor-pointer"
												>
													<i class="ri-file-line icon text-yellow-500 dark:text-dark-500"></i>
													{grandchild.title}
												</div>
											</li>
										{/each}
									</ul>
								{/if}
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
</div>
