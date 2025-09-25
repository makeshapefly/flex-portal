<script lang="ts">
    import { setContext } from 'svelte';
    import { ModalState } from '$lib/stores/modal';
	import { DrawerState } from './drawer';

    setContext('drawer-state', new DrawerState(false));

</script>

<slot></slot>