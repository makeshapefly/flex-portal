<script lang="ts">
  import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
  import Modal from '$lib/components/ui/modal/Modal.svelte';
  import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
  import ModalFooter from '$lib/components/ui/modal/ModalFooter.svelte';
  import ModalClose from '$lib/components/ui/modal/ModalClose.svelte';
  import LucideIcon from '../common/LucideIcon.svelte';
</script>

<Modal modalId="enhance-tech" let:modalId position="center" size="lg" transition="fly-top">
  <ModalHeader {modalId}>
    <h6 class="text-15">Enhance your tech stack with additional tools</h6>
  </ModalHeader>
  <ModalBody>
    <div class="relative w-full mb-5 group/form grow">
      <input
        type="email"
        class="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
        placeholder="Search for ..."
      />
      <button
        class="absolute inset-y-0 flex items-center text-gray-500 dark:text-dark-500 ltr:left-3 rtl:right-3 ltr:group-[&.right]/form:right-3 rtl:group-[&.right]/form:left-3 ltr:group-[&.right]/form:left-auto rtl:group-[&.right]/form:right-auto focus:outline-none"
      >
        <LucideIcon name="Search" class="size-4" />
      </button>
    </div>

    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div class="relative w-full input-check-group">
        <input
          id="toolsCheckbox1"
          name="toolsAppsCheckbox"
          class="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
          type="checkbox"
        />
        <label
          for="toolsCheckbox1"
          class="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500"
        >
          <img src="/assets/images/brands/img-30.png" alt="" class="h-7" />
          X Twitter
        </label>
      </div>
      <div class="relative w-full input-check-group">
        <input
          id="toolsCheckbox2"
          name="toolsAppsCheckbox"
          class="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
          type="checkbox"
        />
        <label
          for="toolsCheckbox2"
          class="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500"
        >
          <img src="/assets/images/brands/img-29.png" alt="" class="h-7" />
          Slack
        </label>
      </div>
      <div class="relative w-full input-check-group">
        <input
          id="toolsCheckbox3"
          name="toolsAppsCheckbox"
          class="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
          type="checkbox"
        />
        <label
          for="toolsCheckbox3"
          class="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500"
        >
          <img src="/assets/images/brands/img-26.png" alt="" class="h-7" />
          GitHub
        </label>
      </div>
      <div class="relative w-full input-check-group">
        <input
          id="toolsCheckbox4"
          name="toolsAppsCheckbox"
          class="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
          type="checkbox"
        />
        <label
          for="toolsCheckbox4"
          class="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500"
        >
          <img src="/assets/images/brands/img-15.png" alt="" class="h-7" />
          YouTube
        </label>
      </div>
      <div class="relative w-full input-check-group">
        <input
          id="toolsCheckbox5"
          name="toolsAppsCheckbox"
          class="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
          type="checkbox"
        />
        <label
          for="toolsCheckbox5"
          class="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500"
        >
          <img src="/assets/images/brands/img-06.png" alt="" class="h-7" />
          Windows 11
        </label>
      </div>
      <div class="relative w-full input-check-group">
        <input
          id="toolsCheckbox6"
          name="toolsAppsCheckbox"
          class="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
          type="checkbox"
        />
        <label
          for="toolsCheckbox6"
          class="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500"
        >
          <img src="/assets/images/brands/img-20.png" alt="" class="h-7" />
          PayPal
        </label>
      </div>
      <div class="relative w-full input-check-group">
        <input
          id="toolsCheckbox7"
          name="toolsAppsCheckbox"
          class="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
          type="checkbox"
        />
        <label
          for="toolsCheckbox7"
          class="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500"
        >
          <img src="/assets/images/brands/img-11.png" alt="" class="h-7" />
          Twitch
        </label>
      </div>
      <div class="relative w-full input-check-group">
        <input
          id="toolsCheckbox8"
          name="toolsAppsCheckbox"
          class="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
          type="checkbox"
        />
        <label
          for="toolsCheckbox8"
          class="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500"
        >
          <img src="/assets/images/brands/img-31.png" alt="" class="h-7" />
          Snapchat
        </label>
      </div>
      <div class="relative w-full input-check-group">
        <input
          id="toolsCheckbox9"
          name="toolsAppsCheckbox"
          class="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
          type="checkbox"
        />
        <label
          for="toolsCheckbox9"
          class="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500"
        >
          <img src="/assets/images/brands/img-04.png" alt="" class="h-7" />
          Linux
        </label>
      </div>
    </div>
  </ModalBody>
  <ModalFooter class="flex items-center justify-end gap-2">
    <ModalClose {modalId} type="button" class="btn btn-active-red">Close</ModalClose>
    <button type="button" class="btn btn-primary">Save Changes</button>
  </ModalFooter>
</Modal>
