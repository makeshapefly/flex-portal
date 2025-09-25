<script lang="ts">
	import { goto } from '$app/navigation';
    export let img='';
    export let text;
    export let callback: (() => void) | null = null;
    export let link = "#!";
    import { getContext } from 'svelte';

    const state = getContext<UI.IDropdownState>('dropdown-state');
    
    function handleClick() {
        state.close();
        if(callback) {
            callback();
        }
        goto(link);
    }


</script>

<a href={link} class="dropdown-item" on:click|preventDefault={handleClick}>
    {#if img}
        <img src={img} class="object-cover rounded-md size-5" alt="img">
    {/if}
    {#if text}
        <span>{text}</span>
    {/if}
</a>