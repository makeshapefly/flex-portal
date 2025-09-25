<script lang="ts">
  import { closeModal } from '$lib/stores/modal';
  import { onMount } from 'svelte';
  import Modal from '../ui/modal/Modal.svelte';
  import ModalBody from '../ui/modal/ModalBody.svelte';
  import ModalHeader from '../ui/modal/ModalHeader.svelte';
  import LucideIcon from './LucideIcon.svelte';

  export let selectedData: any = {};
  export let startCall: () => void;

  let isCalling = false;
  let isMuted = false;
  let callDuration = 0;
  let intervalId: number | any;

  function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  function toggleMute() {
    isMuted = !isMuted;
  }

  function startTimer() {
    stopTimer(); // Ensure no previous timer is running
    intervalId = setInterval(() => {
      callDuration += 1;
    }, 1000);
  }
  function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  }
  // Function to reset call and duration state
  function resetCall() {
    isCalling = false;
    callDuration = 0;
    if (intervalId) {
      clearInterval(intervalId); // Clear any existing interval
    }
  }

  function handleStartCall() {
    resetCall();
    isCalling = true;

    setTimeout(() => {
      if (isCalling) {
        isCalling = false; // Simulate call connection
        startTimer();
      }
    }, 4000);
  }

  onMount(() => {
    startCall();
  });
</script>

<Modal modalId="callModal" let:modalId size="xs" position="bottom-right">
  <ModalHeader {modalId}>
    <h6>Call</h6>
  </ModalHeader>
  <ModalBody>
    {#if selectedData}
      <div class="flex items-center gap-2">
        <div class="p-2 border border-gray-200 rounded-md dark:border-dark-800 size-12 shrink-0">
          <img alt="" src={selectedData.userImage} />
        </div>
        <div>
          <h6>{selectedData.projectName}</h6>
          <p class="text-sm text-gray-500 dark:text-dark-500">
            {isCalling ? 'Calling ...' : formatDuration(callDuration)}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-3 mt-5">
        <button
          type="button"
          on:click={toggleMute}
          class="btn btn-active-gray shrink-0 btn-icon-text btn-icon"
        >
          {#if isMuted}
            <LucideIcon name="MicOff" class="size-5" />
          {:else}
            <LucideIcon name="Mic" class="size-5" />
          {/if}
        </button>
        <button type="button" class="btn btn-active-gray shrink-0 btn-icon-text btn-icon">
          <LucideIcon name="Pause" class="size-5" />
        </button>
        <button type="button" class="btn btn-active-gray shrink-0 btn-icon-text btn-icon">
          <LucideIcon name="Disc" class="size-5" />
        </button>
        <button
          type="button"
          class="btn btn-active-red shrink-0 btn-icon-text btn-icon"
          on:click={() => closeModal()}
        >
          <LucideIcon name="Phone" class="size-5" />
        </button>

        <button type="button" class="btn btn-active-gray shrink-0 btn-icon-text btn-icon">
          <LucideIcon name="Settings" class="size-5" />
        </button>
      </div>
    {/if}
  </ModalBody>
</Modal>
