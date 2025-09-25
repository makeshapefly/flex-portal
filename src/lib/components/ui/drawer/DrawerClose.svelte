<script lang="ts">
    import { getContext } from 'svelte';
    import LucideIcon from "$lib/components/common/LucideIcon.svelte";

    let state: UI.IDrawerState= getContext('drawer-state');
</script>

<button on:click={state.close} {...$$props}>
    <slot>
        <LucideIcon name="X" class="size-5" />
    </slot>
</button>