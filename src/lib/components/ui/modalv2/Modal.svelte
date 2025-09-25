<script lang="ts">
  import { animate } from '$lib/utils/hooks';
  import { modals, closeModal } from "$lib/stores/modal";
 import { onDestroy } from "svelte";

  export let modalId:string;
  export let position: UI.ModalPosition = 'center';
  export let size: UI.ModalSize = 'lg';
  export let transition: UI.Transitions = 'none';
  let positions: Record<UI.ModalPosition, string> = {
    center: 'modal-center',
    top: 'modal-top',
    'top-left': 'modal-tl',
    'top-right': 'modal-tr',
    'bottom-left': 'modal-bl',
    'bottom-right': 'modal-br'
  };

  let sizes: Record<UI.ModalSize, string> = {
    xs: 'modal-xs',
    sm: 'modal-sm',
    lg: 'modal-lg',
    xl: 'modal-xl',
    '2xl': 'modal-2xl'
  };

  let modal: Element;
  let isOpen = false;
  const unsubscribe =  modals.subscribe((value) => {
    isOpen = value[modalId];
  });

  onDestroy(unsubscribe);
</script>

{#if isOpen}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
  <div bind:this={modal} class="modal" transition:animate={{ transition }} on:click={() => closeModal(modalId)}>
    <div class="modal-wrap {positions[position]} {sizes[size]}">
      <slot></slot>
    </div>
  </div>
{/if}
