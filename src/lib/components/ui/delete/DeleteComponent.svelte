<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import { closeModal } from '$lib/stores/modal';
  import Modal from '../modal/Modal.svelte';
  import ModalBody from '../modal/ModalBody.svelte';

  export let deleteHandler: (() => void) | null = null;
</script>

<Modal modalId="delete-file-modal" let:modalId size="xs">
  <ModalBody class="text-center p-7">
    <div
      class="flex items-center justify-center mx-auto mb-4 text-red-500 rounded-full bg-red-500/10 size-14 backdrop-blur-xl"
    >
      <LucideIcon name="Trash2" class="size-6"></LucideIcon>
    </div>
    <h5 class="mb-4">Are you sure you want to delete this file?</h5>
    <div class="flex items-center justify-center gap-2">
      <button
        class="btn btn-red"
        on:click={() => {
          if (deleteHandler) deleteHandler();
          closeModal(modalId);
        }}>Delete</button
      >
      <!-- on:click={() => deleteFile(file)} -->
      <button class="btn link link-primary" on:click={() => closeModal(modalId)}>Cancel</button>
    </div>
  </ModalBody>
</Modal>
