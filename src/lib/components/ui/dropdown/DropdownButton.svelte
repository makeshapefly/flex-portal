<script lang="ts">
  import { getContext } from 'svelte';

  // Dropdown open state
  export let isChevron: boolean = false;
  let props = {};
  let state = getContext<UI.IDropdownState>('dropdown-state');
  let isOpen: boolean = false;

  $: state.isOpen.subscribe((value) => {
    isOpen = value;
  });

  $: {
    const { state: _, isChevron: __, ...rest } = $$props;
    props = rest;
  }
</script>

<button
  on:click|stopPropagation={state.toggle}
  bind:this={state.buttonElement}
  {...props}
  aria-expanded={isOpen}
>
  <slot {isOpen}></slot>
  {#if isChevron}
    <svg
      class={`${isOpen ? 'transform rotate-180' : ''} transition-transform duration-300 ltr:ml-1 rtl:mr-1 size-4`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  {/if}
</button>

{#if isOpen}
  <div class="absolute z-50 p-2 rounded-md">
    <slot name="menu"></slot>
  </div>
{/if}
