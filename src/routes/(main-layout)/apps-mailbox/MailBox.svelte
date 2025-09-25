<script lang="ts">
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import CardBody from '$lib/components/ui/card/CardBody.svelte';
  import Modal from '$lib/components/ui/modal/Modal.svelte';
  import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
  import Simplebar from '$lib/components/common/Simplebar.svelte';
  import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
  import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
  import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
  import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
  import { emailData, userMailsData } from './email';
  import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';

  let open = false;
  let selectedItems = [];
  let selectedEmails: any[] = [];
  let isChecked = false;
  let filteredEmails: any = [];

  type Email = {
    id: string | number;
    avatarImage?: string;
    avatarColor?: string;
    avatarText?: string;
    sender: string;
    email: string;
    date: Date | string;
    subject: string;
    message: string;
    replies: Reply[];
  };

  type Reply = {
    sender: string;
    email: string;
    date: Date | string;
    message: string;
    avatarImage?: string;
    subject: string;
  };
  let activeEmail: Email | null = null;

  let dropdown: HTMLElement;
  let button: { getBoundingClientRect: () => any; contains: (arg0: any) => any };
  let activeUserEmail = {
    image: '/assets/images/brands/img-05.png',
    name: 'Domiex',
    email: 'shopia@domiex.com'
  };
  let sendAvatar = '';
  let activeName = '';
  let activeEmailId = null;
  let showMailModal = false;
  let openMails: any[] = [];
  let mailForm = {
    email: '',
    message: '',
    subject: '',
    name: '',
    avatarImage: sendAvatar
  };
  let searchTerms = writable('');

  let recentSearches = writable([
    { term: 'Chat Management', visible: true },
    { term: 'Projects Discuss', visible: true },
    { term: 'Subscriber', visible: true },
    { term: 'Reports', visible: true }
  ]);

  function toggleItem(email: { id: any }) {
    if (selectedEmails.includes(email.id)) {
      selectedEmails = selectedEmails.filter((id) => id !== email.id);
    } else {
      selectedEmails.push(email.id);
    }
  }

  //Delete email
  function deleteEmails() {
    if (selectedEmails.includes(activeEmail?.id)) {
      //@ts-ignore
      activeEmail = null;
    }
    //@ts-ignore
    filteredEmails = filteredEmails.filter(
      (email: { id: number }) => !selectedEmails.includes(email.id)
    );
    selectedEmails = [];
    isChecked = false;
  }

  // Toggle the checkbox state for the entire list
  function toggleAll() {
    if (isChecked) {
      //@ts-ignore
      selectedEmails = filteredEmails.map((email: { id: any }) => email.id);
    } else {
      selectedEmails = [];
    }
  }
  const hideSearch = (index: number) => {
    recentSearches.update((searches) => {
      searches[index].visible = false;
      return [...searches];
    });
  };

  const setActiveMail = (
    mail: {
      email: any;
      avatarImage: string;
      sender: any;
      id: number;
      subject: string;
      message: string;
      replies: any[];
    } | null
  ) => {
    if (mail && mail.id !== undefined) {
      //@ts-ignore
      const mailIndex = filteredEmails.findIndex((email: { id: number }) => email.id === mail.id);

      if (mailIndex !== -1) {
        // Now mailIndex can be used safely
        activeEmail = filteredEmails[mailIndex];
        activeEmailId = mailIndex + 1;
      } else {
        activeEmailId = null;
      }

      openMails = [mail];
      mailForm.email = mail.email;
      sendAvatar = mail.avatarImage;
      activeName = mail.sender;

      showMailModal = true;
    }
  };

  let selectedFilter = 'Inbox';
  const filters = [
    { type: 'inbox', label: 'Inbox', icon: 'Inbox' },
    { type: 'starred', label: 'Starred', icon: 'Star' },
    { type: 'sent', label: 'Sent', icon: 'SendHorizontal' },
    { type: 'drafts', label: 'Drafts', icon: 'SquarePen' },
    { type: 'spam', label: 'Spam', icon: 'CircleAlert' },
    { type: 'trash', label: 'Trash', icon: 'Trash2' },
    { type: 'important', label: 'Important', icon: 'StepForward' },
    { type: 'scheduled', label: 'Scheduled', icon: 'Calendar' }
  ];

  const labels = [
    { type: 'team', label: 'Team Meetings', color: 'text-red-500' },
    { type: 'application', label: 'Application', color: 'text-green-500' },
    { type: 'developers', label: 'Developers', color: 'text-yellow-500' },
    { type: 'photographer', label: 'Photographer', color: 'text-primary-500' }
  ];

  function filterEmails() {
    filteredEmails = emailData.filter((email) => {
      if (selectedFilter.toLowerCase() == 'inbox') {
        return email;
      }
      return (
        email.type.toLowerCase() === selectedFilter.toLowerCase() ||
        email.badges.includes(selectedFilter)
      );
    });
  }

  function close() {
    open = false;
  }

  function setActiveUserEmail(email: { image: string; name: string; email: string }) {
    activeUserEmail = email;
    close();
  }

  function clickOutside(event: MouseEvent) {
    //@ts-ignore
    if (dropdown && !dropdown.contains(event.target as Node)) {
      open = false;
    }
  }

  onMount(() => {
    window.addEventListener('click', clickOutside);
    return () => {
      window.removeEventListener('click', clickOutside);
    };
  });

  function sendEmailReply(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
    throw new Error('Function not implemented.');
  }

  const removeActiveEmail = () => {
    activeEmail = null;
  };

  let indexNumber = 1;
  const activeEmailIndex = () => {
    const findIndex = filteredEmails.findIndex((email: any) => email.id === activeEmail?.id);
    indexNumber = findIndex + 1;
  };

  $: selectedFilter && filterEmails();
  $: activeEmail && activeEmailIndex();
</script>

<div class="flex flex-col xl:flex-row">
  <div class="mb-space xl:hidden">
    <button class="btn btn-primary"
      ><LucideIcon name="Menu" class="inline-block ltr:mr-1 rtl:ml-1 size-4" />Menu</button
    >
  </div>

  <div
    class="fixed inset-y-0 ltr:right-0 rtl:left-0 mb-0 xl:mb-space z-[1004] xl:z-0 xl:static ltr:xl:rounded-r-none rtl:xl:rounded-l-none w-80 card"
  >
    <Dropdown class="w-full dropdown">
      <DropdownButton class="flex items-center w-full gap-2 text-start card-header">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={activeUserEmail.image} alt="User image" class="size-9" />
        <div class="grow">
          <h6>{activeUserEmail.name}</h6>
          <p class="text-gray-500 dark:text-dark-500">{activeUserEmail.email}</p>
        </div>
        <LucideIcon name="ChevronDown" class="size-4 shrink-0" />
      </DropdownButton>
      <DropdownMenu class="!fixed p-2 !w-72 dropdown-menu">
        <ul class="space-y-2">
          {#each userMailsData as email}
            <li>
              <button
                type="button"
                on:click={() => setActiveUserEmail(email)}
                class="dropdown-item ltr:text-left rtl:text-right"
              >
                <img src={email.image} alt={email.name} class="size-9" />
                <div class="grow">
                  <h6>{email.name}</h6>
                  <p class="text-gray-500 dark:text-dark-500">{email.email}</p>
                </div>
              </button>
            </li>
          {/each}
        </ul>
      </DropdownMenu>
    </Dropdown>

    <CardBody>
      <a href="#!" class="float-end xl:hidden"><LucideIcon name="X" class="size-4" /></a>
      <h6 class="mb-1">Inbox Messages</h6>
      <p class="text-gray-500 dark:text-dark-500">1487 messages - 26 unread</p>
      <Simplebar class="max-h-[calc(100vh_-_14.5rem)] -mx-space px-space">
        <ul class="mt-5 space-y-3">
          {#each filters as filter}
            <li>
              <!-- on:click={() => setSelectedFilter(filter.label)} -->
              <a
                on:click={() => (selectedFilter = filter.label)}
                href="#!"
                class="flex items-center gap-2 link link-primary"
              >
                <LucideIcon name={filter.icon} class="size-4" />
                {filter.label}
              </a>
            </li>
          {/each}
        </ul>
        <div class="flex mt-4 mb-1">
          <h6 class="grow">Labels</h6>
          <a href="#!" class="inline-block shrink-0 link link-primary"
            ><LucideIcon name="Plus" class="size-4" /></a
          >
        </div>
        <ul class="mt-5 space-y-3">
          {#each labels as label}
            <li>
              <!-- on:click={() => setSelectedFilter(label.label) -->
              <a
                on:click={() => (selectedFilter = label.label)}
                href="#!"
                class="flex items-center gap-2 text-current link"
              >
                <LucideIcon name="Diamond" class="size-4 {label.color}" />
                {label.label}
              </a>
            </li>
          {/each}
        </ul>
      </Simplebar>

      <ModalTrigger modalId="add-compose" text="Compose" class="w-full mt-4 btn btn-primary" />
    </CardBody>
  </div>

  <!-- slider above -->
  <div
    class="xl:rounded-none xl:border-x-0 card grow {activeEmail ? 'w-full xl:max-w-md' : 'w-full'}"
  >
    <CardBody>
      <Simplebar>
        <div class="flex gap-4 *:shrink-0">
          <a
            href="#!"
            class="block w-24 p-2 text-center transition duration-300 ease-linear rounded-md hover:bg-gray-50 dark:hover:bg-dark-850"
          >
            <div
              class="relative flex items-center justify-center mx-auto mb-1 text-lg font-semibold text-gray-500 bg-white border border-gray-200 rounded-full dark:bg-dark-900 dark:text-dark-500 dark:border-dark-800 size-12"
            >
              S
              <span
                class="absolute flex items-center justify-center p-0 leading-none rounded-full text-11 -bottom-0.5 -right-0.5 border-2 border-white size-5 badge dark:border-dark-900 badge-solid-primary"
                >5</span
              >
            </div>
            <h6 class="font-medium truncate">Shopia Mia</h6>
          </a>
          <a
            href="#!"
            class="block w-24 p-2 text-center transition duration-300 ease-linear rounded-md hover:bg-gray-50 dark:hover:bg-dark-850"
          >
            <div
              class="relative flex items-center justify-center mx-auto mb-1 text-lg font-semibold text-gray-500 bg-white border border-gray-200 rounded-full dark:bg-dark-900 dark:text-dark-500 dark:border-dark-800 size-12"
            >
              <img src="/assets/images/brands/img-06.png" alt="" class="size-6" />
            </div>
            <h6 class="font-medium truncate">Windows Social Media</h6>
          </a>
          <a
            href="#!"
            class="block w-24 p-2 text-center transition duration-300 ease-linear rounded-md hover:bg-gray-50 dark:hover:bg-dark-850"
          >
            <div
              class="relative flex items-center justify-center mx-auto mb-1 text-lg font-semibold text-gray-500 bg-white border border-gray-200 rounded-full dark:bg-dark-900 dark:text-dark-500 dark:border-dark-800 size-12"
            >
              <img src="/assets/images/brands/img-08.png" alt="" class="size-6" />
              <span
                class="absolute flex items-center justify-center p-0 leading-none rounded-full text-11 -bottom-0.5 -right-0.5 border-2 border-white size-5 badge dark:border-dark-900 badge-solid-primary"
                >2</span
              >
            </div>
            <h6 class="font-medium truncate">Shopify</h6>
          </a>
          <a
            href="#!"
            class="block w-24 p-2 text-center transition duration-300 ease-linear rounded-md hover:bg-gray-50 dark:hover:bg-dark-850"
          >
            <div
              class="relative flex items-center justify-center mx-auto mb-1 text-lg font-semibold text-gray-500 bg-white border border-gray-200 rounded-full dark:bg-dark-900 dark:text-dark-500 dark:border-dark-800 size-12"
            >
              <img src="/assets/images/brands/img-20.png" alt="" class="size-6" />
            </div>
            <h6 class="font-medium truncate">Payment</h6>
          </a>
          <a
            href="#!"
            class="block w-24 p-2 text-center transition duration-300 ease-linear rounded-md hover:bg-gray-50 dark:hover:bg-dark-850"
          >
            <div
              class="relative flex items-center justify-center mx-auto mb-1 text-lg font-semibold text-gray-500 bg-white border border-gray-200 rounded-full dark:bg-dark-900 dark:text-dark-500 dark:border-dark-800 size-12"
            >
              <img src="/assets/images/brands/img-09.png" alt="" class="size-6" />
            </div>
            <h6 class="font-medium truncate">Social Media</h6>
          </a>
          <a
            href="#!"
            class="block w-24 p-2 text-center transition duration-300 ease-linear rounded-md hover:bg-gray-50 dark:hover:bg-dark-850"
          >
            <div
              class="relative flex items-center justify-center mx-auto mb-1 text-lg font-semibold text-gray-500 bg-white border border-gray-200 rounded-full dark:bg-dark-900 dark:text-dark-500 dark:border-dark-800 size-12"
            >
              <img src="/assets/images/brands/img-17.png" alt="" class="size-6" />
            </div>
            <h6 class="font-medium truncate">Romero</h6>
          </a>
          <a
            href="#!"
            class="block w-24 p-2 text-center transition duration-300 ease-linear rounded-md hover:bg-gray-50 dark:hover:bg-dark-850"
          >
            <div
              class="relative flex items-center justify-center mx-auto mb-1 text-lg font-semibold text-gray-500 bg-white border border-gray-200 rounded-full dark:bg-dark-900 dark:text-dark-500 dark:border-dark-800 size-12"
            >
              <img src="/assets/images/brands/img-16.png" alt="" class="size-6" />
            </div>
            <h6 class="font-medium truncate">Romero</h6>
          </a>
        </div>
      </Simplebar>

      <div class="mt-3">
        <div class="flex items-center gap-2 mb-4">
          <div class="input-check-group shrink-0">
            <!-- main checkbox -->
            <input
              id="checkboxBasic1"
              class="input-check input-check-primary"
              bind:checked={isChecked}
              on:click={toggleAll}
              type="checkbox"
            />
          </div>
          <h6 class="grow">
            Main Inbox
            <small class="font-normal text-gray-500 ltr:ml-1 rtl:mt-1 dark:text-dark-500 text-14">
              {filteredEmails.length} messages
            </small>
            {#if selectedItems.length > 0}
              <span class="text-gray-400 ltr:ml-2 rtl:mr-2 text-14">
                {selectedItems.length} Rows Selected
              </span>
            {/if}
          </h6>
          <div class="flex items-center gap-4 shrink-0">
            <!-- svelte-ignore a11y-missing-attribute -->
            {#if isChecked}
              <button class="text-gray-500 dark:text-dark-500" on:click={deleteEmails}>
                <LucideIcon name="Trash" class="size-4" />
              </button>
            {/if}
            <Dropdown class="dropdown">
              <DropdownButton
                type="button"
                class="flex items-center text-gray-500 dark:text-dark-500"
              >
                <LucideIcon name="Ellipsis" class="size-4" />
              </DropdownButton>
              <DropdownMenu class="!fixed max-w-md p-2 dropdown-menu">
                <a href="#!" class="dropdown-item">
                  <span>Show more messages</span>
                </a>

                <a href="#!" class="dropdown-item">
                  <span>Hide section when empty</span>
                </a>

                <a href="#!" class="dropdown-item">
                  <span>Manage Inbox settings</span>
                </a>

                <a href="#!" class="dropdown-item">
                  <span>Mark all as read</span>
                </a>
              </DropdownMenu>
            </Dropdown>
            <a href="#!" class="link link-primary"
              ><LucideIcon name="RotateCcw" class="size-4" />
            </a>
            <a href="#!" class="link link-primary"><LucideIcon name="Search" class="size-4" /> </a>
          </div>
        </div>
        <Simplebar class="-mx-5 h-[35rem]">
          <div
            class="border-t border-gray-200 divide-y divide-gray-200 dark:border-dark-800 dark:divide-dark-800"
          >
            {#each filteredEmails as email (email.id)}
              <div
                class="flex gap-3 p-5 hover:bg-gray-50 dark:hover:bg-dark-850"
                on:click={() => setActiveMail(email)}
                role="presentation"
              >
                <input
                  type="checkbox"
                  class="input-check input-check-primary"
                  bind:checked={isChecked}
                  on:click={() => toggleItem(email)}
                />
                <div
                  class="flex items-center justify-center text-red-500 rounded-full bg-red-500/10 shrink-0 size-10"
                >
                  {#if email.avatarImage}
                    <img src={email.avatarImage} alt="" class="rounded-full" />
                  {:else}
                    <span>{email.avatarText}</span>
                  {/if}
                </div>
                <div class="overflow-hidden grow">
                  <p class="float-end text-14">{email.date}</p>
                  <h6 class="mb-1">{email.sender}</h6>
                  <a href="#!" class="link link-primary">{email.email}</a>
                  <a href="#!" class="block mt-3">
                    <h6 class="mb-1">{email.subject}</h6>
                    <p class="truncate">{email.message}</p>
                  </a>
                  <div class="flex justify-end gap-2 mt-2">
                    {#each email.badges as label}
                      <a href="#!" class="badge badge-{label === 'Important' ? 'green' : 'gray'}"
                        >{label}</a
                      >
                    {/each}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </Simplebar>
      </div>
    </CardBody>
  </div>

  <!-- Active Mail Section -->
  {#if activeEmail}
    <div class="ltr:xl:rounded-l-none rtl:xl:rounded-r-none card grow">
      <div class="flex items-center gap-2 card-header">
        <a href="#!" on:click={() => removeActiveEmail()} class="btn btn-icon btn-active-gray">
          <LucideIcon name="ArrowLeft" class="size-4" />
        </a>
        <a href="#!" class="btn btn-icon btn-active-gray">
          <LucideIcon name="Archive" class="size-4" />
        </a>
        <a href="#!" class="btn btn-icon btn-active-gray">
          <LucideIcon name="OctagonAlert" class="size-4" />
        </a>
        <div class="flex items-center gap-1 mx-auto text-gray-500 dark:text-dark-500">
          <a href="#!"><LucideIcon name="ChevronLeft" class="size-4" /></a>
          <p><span>{indexNumber}</span> of <span>{filteredEmails.length}</span></p>
          <a href="#!"><LucideIcon name="ChevronRight" class="size-4" /></a>
        </div>
        <a href="#!" class="btn btn-icon btn-active-gray">
          <LucideIcon name="Reply" class="size-4" />
        </a>
        <a href="#!" class="btn btn-icon btn-active-gray">
          <LucideIcon name="Clock3" class="size-4" />
        </a>
        <ModalTrigger
          modalId="delete-file-modal"
          icon="Trash2"
          color="light"
          class="btn btn-icon btn-active-red"
          text=""
          varient=""
        ></ModalTrigger>
        <DeleteComponent />
      </div>
      <Simplebar class="h-[27rem]">
        <div class="card-body">
          <div>
            <div>
              <div class="flex items-center gap-2">
                <div
                  class="flex items-center justify-center text-red-500 rounded-full bg-red-500/10 shrink-0 size-10"
                >
                  {#if activeEmail.avatarImage}
                    <img src={activeEmail.avatarImage} alt="" class="rounded-full" />
                  {:else}
                    <span>
                      {activeEmail.avatarText}
                    </span>
                  {/if}
                </div>
                <div class="grow">
                  <h6>{activeEmail.sender}</h6>
                  <a href="#!" class="link link-primary">{activeEmail.email}</a>
                </div>
                <p class="text-xs text-gray-500 dark:text-dark-500">{activeEmail.date}</p>
              </div>
              <div class="mt-5">
                <h6 class="mb-3">{activeEmail.subject}</h6>
                <div class="space-y-2">
                  <p>{activeEmail.message}</p>
                </div>
                <div class="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2">
                  <a
                    href="#!"
                    class="flex items-center gap-2 p-2 transition duration-300 ease-linear border border-gray-200 border-dashed rounded-md dark:border-dark-800 hover:border-gray-300 dark:hover:border-dark-700 hover:shadow-lg hover:shadow-gray-200 dark:hover:shadow-dark-850"
                  >
                    <div
                      class="flex items-center justify-center font-semibold text-gray-500 transition duration-200 ease-linear bg-gray-100 rounded-full dark:text-dark-500 dark:bg-dark-850 shrink-0 size-10"
                    >
                      <LucideIcon name="FileText" class="size-4" />
                    </div>
                    <div class="grow">
                      <h6>shopify-docs.txt</h6>
                      <p class="text-sm text-gray-500 dark:text-dark-500">154 kb</p>
                    </div>
                    <div class="shrink-0">
                      <LucideIcon
                        name="Download"
                        class="text-gray-500 dark:text-dark-500 dark:fill-dark-850 size-5 fill-gray-200"
                      ></LucideIcon>
                    </div>
                  </a>
                  <a
                    href="#!"
                    class="flex items-center gap-2 p-2 transition duration-300 ease-linear border border-gray-200 border-dashed rounded-md dark:border-dark-800 hover:border-gray-300 dark:hover:border-dark-700 hover:shadow-lg hover:shadow-gray-200 dark:hover:shadow-dark-850"
                  >
                    <div
                      class="flex items-center justify-center font-semibold text-gray-500 transition duration-200 ease-linear bg-gray-100 rounded-full dark:text-dark-500 dark:bg-dark-850 shrink-0 size-10"
                    >
                      <LucideIcon name="Image" class="size-4"></LucideIcon>
                    </div>
                    <div class="grow">
                      <h6>main-logo.png</h6>
                      <p class="text-sm text-gray-500">467 kb</p>
                    </div>
                    <div class="shrink-0">
                      <LucideIcon
                        name="Download"
                        class="text-gray-500 size-5 fill-gray-200 dark:text-dark-500 dark:fill-dark-850"
                      ></LucideIcon>
                    </div>
                  </a>
                </div>
                <p class="mt-4">Best regards,</p>
                <p>{activeEmail.sender}</p>
              </div>
            </div>
            <div>
              {#each activeEmail.replies as reply}
                <div class="mt-4">
                  <div class="flex items-center gap-2">
                    <div
                      class="flex items-center justify-center text-green-500 bg-green-100 rounded-full shrink-0 size-10"
                    >
                      {#if reply.avatarImage}
                        <img src={reply.avatarImage} alt="" class="rounded-full" />
                      {:else}
                        <span>{reply.sender.slice(0, 1)}</span>
                      {/if}
                    </div>
                    <div class="grow">
                      <h6>{reply.sender}</h6>
                      <a href="#!" class="link link-primary">{reply.email}</a>
                    </div>
                    <p class="text-xs text-gray-500 shrink-0">{reply.date}</p>
                  </div>
                  <div class="mt-5">
                    <h6 class="mb-3">{reply.subject}</h6>
                    <div class="space-y-2">
                      <p>{reply.message}</p>
                    </div>
                    <p class="mt-4">Best regards,</p>
                    <p>{activeEmail.sender}</p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </Simplebar>

      <!-- Mail Reply Form -->
      <CardBody>
        <div class="mb-0 shadow-none card">
          <form on:submit|preventDefault={sendEmailReply}>
            <div class="p-4">
              <div class="flex items-center gap-2">
                <p class="text-gray-500 dark:text-dark-500">To:</p>
                <input
                  type="text"
                  class="h-auto p-0 border-0 form-input"
                  placeholder="Type email"
                  bind:value={mailForm.email}
                />
                <a href="#!" class="link link-primary">Cc</a>
                <a href="#!" class="link link-primary">Bcc</a>
              </div>
            </div>
            <div class="p-4 pt-1">
              <textarea
                class="h-auto p-0 border-0 resize-none form-input"
                rows="3"
                placeholder="Type something ..."
                bind:value={mailForm.message}
              ></textarea>
              <div class="flex items-center gap-3">
                <button type="submit" class="ml-auto btn btn-primary">Send Now</button>
              </div>
            </div>
          </form>
        </div>
      </CardBody>
    </div>
  {/if}
</div>

<Modal modalId="add-compose" position="top" size="lg">
  <ModalBody>
    <div>
      <div class="flex items-center gap-2">
        <p class="text-gray-500 dark:text-dark-500">To:</p>
        <input type="email" class="h-auto px-0 border-0 form-input" placeholder="Type email" />
        <a href="#!" class="link link-primary">Cc</a>
        <a href="#!" class="link link-primary">Bcc</a>
      </div>
    </div>
    <div class="py-2 border-gray-200 dark:border-dark-800 border-y">
      <input type="text" class="h-auto p-0 border-0 form-input" placeholder="Subject" />
    </div>
    <div>
      <textarea
        class="h-auto px-0 border-0 resize-none form-input"
        rows="3"
        placeholder="Type something ..."
      ></textarea>
      <div class="flex items-center gap-3 mt-2">
        <div class="shrink-0">
          <label for="sendImages" class="btn btn-active-gray btn-icon">
            <LucideIcon name="Image" class="size-5" />
          </label>
          <input type="file" id="sendImages" class="hidden" />
        </div>
        <button type="button" class="link link-primary shrink-0">
          <LucideIcon name="Link" class="size-5" /></button
        >
        <button type="button" class="link link-primary shrink-0">
          <LucideIcon name="Pencil" class="size-5" /></button
        >
        <button type="button" class="mr-auto link link-yellow shrink-0">
          <LucideIcon name="Smile" class="size-5" /></button
        >
        <button type="button" class="btn btn-sub-gray shrink-0">Draft</button>
        <button type="button" class="btn btn-primary shrink-0">Send Now</button>
      </div>
    </div>
  </ModalBody>
</Modal>
