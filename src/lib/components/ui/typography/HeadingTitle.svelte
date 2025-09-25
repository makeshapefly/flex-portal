<script lang="ts">
    export let variant: UI.HeadingVariant="h1"
     export let text: string = "The quick brown fox jumps over the lazy dog.";
</script>


    {#if variant === 'h1'}
        <h1>{text} (h1)</h1>
    {:else if variant === 'h2'}
        <h2>{text} (h2)</h2>
    {:else if variant === 'h3'}
        <h3>{text} (h3)</h3>
    {:else if variant === 'h4'}
        <h4>{text} (h4)</h4>
    {:else if variant === 'h5'}
        <h5>{text} (h5)</h5>
    {:else if variant === 'h6'}
        <h6>{text} (h6)</h6>
    {/if}
