<script lang="ts">
    import ButtonState from "$lib/stores/button";

    // Initialize the ButtonState instance
    const buttonState = new ButtonState();

    // Subscribe to `isLoading` and `isActive` states
    let isLoading: boolean;
    let isActive: boolean;

    const unsubscribeLoading = buttonState.isLoading.subscribe(value => (isLoading = value));
    const unsubscribeActive = buttonState.isActive.subscribe(value => (isActive = value));

    // Clean up subscriptions on component destroy
    import { onDestroy } from "svelte";
    onDestroy(() => {
        unsubscribeLoading();
        unsubscribeActive();
    });
</script>

<div>
    <button
        on:click={() => buttonState.startLoading()}
        class="flex items-center gap-2 mx-auto text-white bg-pink-500 border-pink-500 btn hover:bg-pink-600 hover:text-white hover:border-pink-600 focus:bg-pink-600 focus:text-white focus:border-pink-600"
    >
        <!-- Show "Follow" or "Unfollow" text based on `isActive` -->
        <span class="flex items-center gap-2">
            <i class={isActive ? "ri-user-unfollow-line" : "ri-user-add-line"}></i>
            {isActive ? "Unfollow" : "Follow"}
        </span>

        <!-- Show loader to the right of the text while loading -->
        {#if isLoading}
            <svg class="text-white size-4 animate-spin ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-0" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        {/if}
    </button>
</div>
