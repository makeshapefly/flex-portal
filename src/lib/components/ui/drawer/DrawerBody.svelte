<script lang="ts">

    let props: any = {};
    $: {
        const { class: _class, ...rest } = $$props;
        props = rest;
    }
</script>

<div class={`drawer-content ${$$props.class ? $$props.class : ''}`} {...props}>
    <slot></slot>
</div>