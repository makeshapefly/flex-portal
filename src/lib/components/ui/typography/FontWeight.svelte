<script lang="ts">
    export let variant: string = "font-normal"; // Default value
    export let text: string = "The quick brown fox jumps over the lazy dog.";
  
    // Define the font variants as an array
    const fontVariants = [
      'font-thin',
      'font-extralight',
      'font-light',
      'font-normal',
      'font-medium',
      'font-semibold',
      'font-bold',
      'font-extrabold',
      'font-black'
    ];
  </script>
  
 
    {#each fontVariants as fontVariant}
      {#if variant === fontVariant}
        <div>
          <code class="text-pink-500">.{fontVariant}</code>
          <h6 class={`mt-2 ${fontVariant}`}>{text}</h6>
        </div>
      {/if}
    {/each}
  
  