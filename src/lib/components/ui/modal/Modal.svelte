<script lang="ts">
  import { animate } from '$lib/utils/hooks';
  import { modals, closeModal } from '$lib/stores/modal';
  import { onDestroy } from 'svelte';

  export let modalId: string;
  export let position: UI.ModalPosition = 'center';
  export let size: UI.ModalSize = 'md';
  export let transition: UI.Transitions = 'none';
  export let modalClass = '';
  export let modalWrap = 'modal-wrap';
  let positions: Record<UI.ModalPosition, string> = {
    center: 'modal-center',
    top: 'modal-top',
    'top-left': 'modal-tl',
    'top-right': 'modal-tr',
    'bottom-left': 'modal-bl',
    'bottom-right': 'modal-br',
    ' ': ''
  };

  let sizes: Record<UI.ModalSize, string> = {
    xs: 'modal-xs',
    sm: 'modal-sm',
    lg: 'modal-lg',
    xl: 'modal-xl',
    ' ': '',
    '2xl': 'modal-2xl'
  };

  let isOpen = false;
  const unsubscribe = modals.subscribe((value) => {
    isOpen = value[modalId];
  });

  onDestroy(unsubscribe);

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal(modalId);
    }
  };
</script>

{#if isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class={`modal ${modalClass}`}
    transition:animate={{ transition }}
    on:click={handleBackdropClick}
  >
    <div class="{`${modalWrap}`} {positions[position]} {sizes[size]}">
      <slot {modalId}></slot>
    </div>
  </div>
{/if}
