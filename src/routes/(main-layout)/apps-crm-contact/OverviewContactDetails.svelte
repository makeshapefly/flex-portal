<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import { createEventDispatcher } from 'svelte';
  import OverviewDataComponent from './OverviewDataComponent.svelte';
  interface Contact {
    image: string;
    contactName: string;
    role: string;
    company: string;
    email: string;
    phoneNumber: string;
    website: string;
    status: string;
  }
  export let selectedContact: Contact;

  let loadingButton = false;
  let isActive = false;
  const dispatch = createEventDispatcher();

  const toggleFollow = () => {
    loadingButton = true;
    setTimeout(() => {
      loadingButton = false;
      isActive = !isActive;
    }, 2000);
  };

  const closeModal = () => {
    dispatch('close');
  };

  const editContact = () => {
    dispatch('edit');
  };
</script>

<div class="p-2 modal-content">
  <div
    class="h-24 p-5 rounded-t bg-gradient-to-r from-primary-500/20 via-pink-500/20 to-green-500/20"
  ></div>

  <div class="p-4">
    <div class="flex">
      <div class="relative inline-block -mt-16 rounded-full ltr:mr-auto rtl:ml-auto shrink-0">
        <img src={selectedContact.image} alt="" class="rounded-full size-24" />
        <div
          class="absolute bg-green-500 border-2 border-white dark:border-dark-900 rounded-full bottom-2.5 size-4 ltr:right-2.5 rtl:left-2.5"
        ></div>
      </div>

      <div class="shrink-0">
        <button on:click={toggleFollow} class="btn btn-pink btn-icon-text">
          <span class="flex items-center gap-2" class:hidden={isActive}>
            <i class="ri-user-add-line"></i> Follow
          </span>
          <span class="flex items-center gap-2" class:hidden={!isActive}>
            <i class="ri-user-unfollow-line"></i> UnFollow
          </span>
          {#if loadingButton}
            <svg
              class="text-white size-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-0"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          {/if}
        </button>
      </div>
    </div>

    <h6 class="mt-3">{selectedContact.contactName}</h6>
    <span class="mb-3 text-gray-500 dark:text-dark-500">{selectedContact.role}</span> at
    <span class="text-primary-500">{selectedContact.company}</span>

    <p class="mb-3 text-gray-500 dark:text-dark-500">Overview</p>

    <div class="space-y-3">
      <OverviewDataComponent
        title="Company Name"
        description={selectedContact.company}
        icon="Briefcase"
      />
      <OverviewDataComponent title="Role" description={selectedContact.role} icon="Briefcase" />
      <OverviewDataComponent title="Email" description={selectedContact.email} icon="Mail" />
      <OverviewDataComponent
        title="Phone Number"
        description={selectedContact.phoneNumber}
        icon="Phone"
      />
      <OverviewDataComponent title="Website" description={selectedContact.website} icon="Globe" />
      <div class="flex items-center gap-2">
        <div class="w-48 font-medium shrink-0">
          <LucideIcon
            name="Gem"
            class="inline-block text-gray-500 dark:text-dark-500 ltr:mr-1 rtl:ml-1 size-4"
          />
          <span class="align-baseline">Status</span>
        </div>
        <p class="badge badge-pink">{selectedContact.status}</p>
      </div>
    </div>

    <div class="flex items-center justify-end gap-2 mt-5">
      <button type="button" class="btn btn-active-red" on:click={closeModal}>
        <LucideIcon name="X" class="inline-block ltr:mr-1 rtl:ml-1 size-4" />
        <span class="align-baseline">Close</span>
      </button>
      <button type="button" class="btn btn-primary" on:click={editContact}>
        <LucideIcon name="Pencil" class="inline-block ltr:mr-1 rtl:ml-1 size-4" />
        Edit Contact
      </button>
    </div>
  </div>
</div>
