<script lang="ts">
	import LucideIcon from "$lib/components/common/LucideIcon.svelte";

	// Local state for each counter
	let count1: number = 10; // Initial value for the first counter
	let count2: number = 20; // Initial value for the second counter
</script>

<div class="flex flex-wrap gap-3">
	<!-- Counter 1 -->
	<div
		class="flex items-center w-20 p-1 text-center border border-gray-200 rounded-md dark:border-dark-800"
	>
		<div class="flex flex-col">
			<!-- Increment Button -->
			<button
				on:click={() => count1++}
				class="flex items-center justify-center text-gray-500 transition duration-200 ease-linear dark:text-dark-500 plus hover:text-primary-500 dark:hover:text-primary-500"
			>
            <LucideIcon name="ChevronUp" class="size-4"/>
			</button>

			<!-- Decrement Button -->
			<button
				on:click={() => count1--}
				class="flex items-center justify-center text-gray-500 transition duration-200 ease-linear dark:text-dark-500 minus hover:text-primary-500 dark:hover:text-primary-500"
			>
            <LucideIcon name="ChevronDown" class="size-4"/>
			</button>
		</div>

		<!-- Display Input Field with the current count -->
		<input
			type="text"
			value={count1}
			class="h-8 p-0 text-center border-0 rounded-none form-input"
			readonly
		/>
	</div>

	<!-- Counter 2 -->
	<div
		class="flex items-center w-20 p-1 text-center border border-gray-200 rounded-md dark:border-dark-800"
	>
		<!-- Display Input Field with the current count -->
		<input
			type="text"
			value={count2}
			class="h-8 p-0 text-center border-0 rounded-none form-input"
			readonly
		/>
		<div class="flex flex-col">
			<!-- Increment Button -->
			<button
				on:click={() => count2++}
				class="flex items-center justify-center text-gray-500 transition duration-200 ease-linear dark:text-dark-500 plus hover:text-primary-500 dark:hover:text-primary-500"
			>
            <LucideIcon name="ChevronUp" class="size-4"/>
			</button>

			<!-- Decrement Button -->
			<button
				on:click={() => count2--}
				class="flex items-center justify-center text-gray-500 transition duration-200 ease-linear dark:text-dark-500 minus hover:text-primary-500 dark:hover:text-primary-500"
			>
            <LucideIcon name="ChevronDown" class="size-4"/>
			</button>
		</div>
	</div>
</div>
