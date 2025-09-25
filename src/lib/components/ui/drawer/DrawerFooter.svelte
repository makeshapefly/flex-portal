<script lang="ts">
    import { getContext } from 'svelte';

    let state: UI.IDrawerState= getContext('drawer-state');
    let props: any = '';
    $: {
        const { class: _class, ...rest } = $$props;
        props = rest;
    }
</script>

<div class={`drawer-footer ${$$props.class}`} {...props}>
    <slot></slot>
</div>