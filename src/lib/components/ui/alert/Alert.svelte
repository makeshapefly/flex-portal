<script lang="ts">
	import AlertState from './alert';
    import { getContext, setContext } from 'svelte';

    export let isOpen = false;
    export let closing:UI.AlertClosing = 'auto';

    setContext<UI.IAlertState>('alert-state', new AlertState(isOpen, closing));

    let state = getContext<UI.IAlertState>('alert-state');
</script>


<slot {state}/>