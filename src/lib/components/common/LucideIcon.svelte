<script>
  // @ts-nocheck
  import * as icons from 'lucide-svelte';
  import { onMount } from 'svelte';
  export let name = 'Home';
  let icon = null;
</script>

<svelte:component this={icons[name]} {...$$props} />
