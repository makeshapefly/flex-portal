<script lang="ts">
    import { getContext } from 'svelte';
	import DrawerClose from './DrawerClose.svelte';

    let state: UI.IDrawerState= getContext('drawer-state');
    let props: any = {};
    $: {
        const { class: _class, ...rest } = $$props;
        props = rest;
    }
</script>

<div class={`drawer-header ${$$props.class ? $$props.class : ''}`} {...props}>
    <slot></slot>
    <DrawerClose class="link link-red"/>
</div>