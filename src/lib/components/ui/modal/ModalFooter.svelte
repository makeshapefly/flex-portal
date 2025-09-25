<script lang="ts">
    let props: any = '';
    $: {
        const { class: _class, ...rest } = $$props;
        props = rest;
    }
</script>

<div class={`modal-footer ${$$props.class}`} {...props}>
    <slot></slot>
</div>