<script lang="ts">
	import ModalClose from './ModalClose.svelte';

    export let modalId: string;
    let props: any = {};
    $: {
        const { class: _class, ...rest } = $$props;
        props = rest;
    }
</script>

<div class={`modal-header ${$$props.class ? $$props.class : ''}`} {...props}>
    <slot></slot>
    <ModalClose modalId={modalId} class="link link-red"/>
</div>