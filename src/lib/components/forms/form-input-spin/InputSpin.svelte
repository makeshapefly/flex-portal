<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';

	// Props
	export let variant: 'basic' | 'solid' | 'box' = 'basic'; // Default variant
	export let color: string = 'primary'; 
	export let value: number = 1; 

	// Handlers for increment and decrement
	function increment() {
		value++;
	}

	function decrement() {
		value--;
	}
</script>

<!-- Component Markup -->
<div>
	<!-- Basic Variant -->
	{#if variant === 'basic'}
		<div class={`input-spin-group input-spin-${color}`}>
			<button on:click={decrement} class="input-spin-minus">
				<LucideIcon name="Minus" class="size-4" />
			</button>
			<input type="text" bind:value class="input-spin form-input" readonly />
			<button on:click={increment} class="input-spin-plus">
				<LucideIcon name="Plus" class="size-4" />
			</button>
		</div>
	{/if}

	<!-- Solid Variant -->
	{#if variant === 'solid'}
		<div class={`input-spin-group input-spin-solid-${color}`}>
			<button on:click={decrement} class="input-spin-minus">
				<LucideIcon name="Minus" class="size-4" />
			</button>
			<input type="text" bind:value class="input-spin form-input" readonly />
			<button on:click={increment} class="input-spin-plus">
				<LucideIcon name="Plus" class="size-4" />
			</button>
		</div>
	{/if}

	<!-- Box Variant -->
	{#if variant === 'box'}
    <div class="flex items-center w-32 p-1 text-center border border-gray-200 rounded-md dark:border-dark-800">
        <!-- Decrement Button -->
        <button
            on:click={decrement}
            class={`flex items-center justify-center ${
                color === 'primary'
                    ? 'text-primary-500 bg-primary-500/20 hover:text-primary-700'
                    : `text-${color}-200 bg-${color}-500 hover:text-white`
            } transition duration-200 ease-linear rounded-md minus size-8 shrink-0`}
        >
            <LucideIcon name="Minus" class="size-4" />
        </button>
    
        <!-- Value Input -->
        <input
            type="text"
            bind:value
            class="h-8 p-0 text-center border-0 rounded-none form-input"
            readonly
        />
    
        <!-- Increment Button -->
        <button
            on:click={increment}
            class={`flex items-center justify-center ${
                color === 'primary'
                    ? 'text-primary-500 bg-primary-500/20 hover:text-primary-700'
                    : `text-${color}-200 bg-${color}-500 hover:text-white`
            } transition duration-200 ease-linear rounded-md plus size-8 shrink-0`}
        >
            <LucideIcon name="Plus" class="size-4" />
        </button>
    </div>
	{/if}
</div>
