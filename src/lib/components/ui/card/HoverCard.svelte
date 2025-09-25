<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import { colorClasses } from './card';
  export let color: keyof typeof colorClasses = 'primary';

  // Retrieve the classes based on the color prop
  const { iconClass, textClass } = colorClasses[color];
</script>

<span
  class={`absolute z-0 size-20 transition-all duration-500 rounded-full top-5 ${iconClass} group-hover/item:scale-[10]`}
></span>
<div class="relative z-10 max-w-md mx-auto">
  <div
    class={`grid text-white transition-all duration-500 rounded-full size-20 place-items-center ${iconClass} group-hover/item:bg-primary-400/30`}
  >
    <LucideIcon name="MessageCircleMore" class="size-8" />
  </div>
  <div
    class={`pt-5 space-y-6 text-base leading-7 text-gray-500 transition-all duration-500 dark:text-dark-500 group-hover/item:text-white/90`}
  >
    <p>
      Perfect for learning how the framework works, prototyping a new idea, or creating a demo to
      share online.
    </p>
  </div>
  <div class="pt-5">
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a
      href="#"
      class={`font-medium transition-all duration-500 ${textClass} group-hover/item:text-white`}
    >
      Read the docs
      <LucideIcon name="MoveRight" class="inline-block ml-1 size-4" />
    </a>
  </div>
</div>
