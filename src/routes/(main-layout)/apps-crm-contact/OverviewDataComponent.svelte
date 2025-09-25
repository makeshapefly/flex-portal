<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';

  export let title = '';
  export let icon = '';
  export let description = '';
</script>

<div class="flex items-center gap-2">
  <div class="w-48 font-medium shrink-0">
    <LucideIcon name={icon} class="inline-block ltr:mr-1 rtl:ml-1 size-4" />
    <span class="align-baseline">{title}</span>
  </div>
  <p>{description}</p>
</div>
