<script lang="ts">
    import { getContext } from 'svelte';

    let state = getContext<UI.IAlertState>('alert-state');
</script>


<button
    on:click={state.open}
    class="text-white bg-primary-500 border-primary-500 btn hover:bg-primary-600 hover:text-white hover:border-primary-600 focus:bg-primary-600 focus:text-white focus:border-primary-600"
><slot/>
</button>