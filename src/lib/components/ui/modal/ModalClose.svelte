<script lang="ts">
    import { closeModal } from "$lib/stores/modal";
    import LucideIcon from "$lib/components/common/LucideIcon.svelte";
    export let modalId: string;
</script>

<button on:click={()=>closeModal(modalId)} {...$$props}>
    <slot>
        <LucideIcon name="X" class="size-5" />
    </slot>
</button>