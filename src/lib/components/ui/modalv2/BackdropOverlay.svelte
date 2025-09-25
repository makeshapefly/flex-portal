<script lang="ts">
	// BackdropOverlay is singleton component that will be created
	// only once in the body tag. It will be used to create a backdrop overlay for the modal.
	import { modals, closeModal } from '$lib/stores/modal';

	let isOpen = false;
	$: modals.subscribe((value) => {
		isOpen = Object.values(value).some((v) => v);
	});
</script>

{#if isOpen}
	<div
		class="backdrop-overlay backdrop-blur-xs"
		on:click={() => closeModal()}
		role="presentation"
	></div>
{/if}
