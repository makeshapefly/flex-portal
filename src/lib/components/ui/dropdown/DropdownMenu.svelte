<script lang="ts">
  import { animate } from '../../../utils/hooks';
  import { getContext, onMount } from 'svelte';

  // Dropdown open state
  export let transition: UI.Transitions = 'slide-y';
  export let isLoading = true;
  let props = {};
  let state = getContext<UI.IDropdownState>('dropdown-state');
  let isOpen: boolean = false;

  $: state.isOpen.subscribe((value) => {
    isOpen = value;
  });

  $: {
    const { state: _, class: __, ...rest } = $$props;
    props = rest;
  }

  onMount(() => {
    if (state.dropdownElement) {
      state.setWidthHeight(state.dropdownElement.offsetWidth, state.dropdownElement.offsetHeight);
      isLoading = false;
    }
  });
</script>

{#if isOpen || isLoading}
  <div
    class={`dropdown-menu${isLoading ? ' opacity-0' : ''} ${$$props.class ? $$props.class : ''}`}
    bind:this={state.dropdownElement}
    {...props}
    transition:animate={{ transition }}
  >
    <slot></slot>
  </div>
{/if}
