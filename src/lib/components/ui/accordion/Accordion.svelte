<script lang="ts">
	import { getContext, setContext } from "svelte";
	import AccordionState from "./accordion";
    export let selected:number = -1;
    export let isChevron= true;
    export let color:UI.Colors;
    export let varient:UI.AccordionVarient = 'default';
    setContext<UI.IAccordionState>('accordion-state', new AccordionState(selected, isChevron, color,varient));

    const state = getContext<UI.IAccordionState>('accordion-state');
</script>

<div class="{$$props.class? $$props.class : ''}">
    {#if varient === 'default'}
        <slot {state} ></slot>
    {:else}
        <div class="flex flex-col gap-3">
            <slot {state} ></slot>
        </div>
    {/if}
</div>

