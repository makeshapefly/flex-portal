<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import contacts from './contact-data';
	import { chats, messages as msgs, type Chats } from './chat-data';
	import { onMount } from 'svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import { writable } from 'svelte/store';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import { openModal } from '$lib/stores/modal';
	import { closeModal } from '$lib/stores/modal';

	interface Contact {
		id: number;
		name: string;
		avatar: string;
	}

	let displayChatList = chats; // Displayed chat list
	let searchQuery = '';
	let searchQueryModal = '';
	let filteredContactsModal = contacts;
	let messageText = '';
	let isCalling = false;
	let callDuration = 0;
	let isMuted = false;
	let timeoutId; // Store the timeout ID
	let intervalId: number | undefined; // Store the interval ID

	const userProfile = {
		avatar: '/assets/images/avatar/user-17.png',
		name: 'David Johnson'
	};
	let senderProfile = {
		id: 0,
		name: displayChatList[0].name,
		avatar: displayChatList[0].avatar,
		status: displayChatList[0].status
	};
	let messages = writable(msgs);

	// Function to send the message
	function sendMessage() {
		if (messageText.trim() === '') return;
		const newMessage: any = {
			type: 'sent',
			time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
			text: messageText,
			avatar: userProfile.avatar,
			id: Date.now().toString() // Using timestamp as unique ID
		};

		console.log('newMessage', newMessage);
		messages.update((currentMessages) => [...currentMessages, newMessage]);
		messageText = '';
		scrollToBottom();
	}

	// Scroll to the bottom of the chat container
	function scrollToBottom() {
		setTimeout(function () {
			const chat = document.getElementById('chat-messages')?.lastElementChild;
			if (chat) {
				chat.scrollIntoView({ behavior: 'smooth', block: 'end' });
			}
		}, 200); // Adding a delay to ensure the DOM updates first
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}

	// Filter chats based on the search query
	function handleSearch() {
		displayChatList = chats.filter(
			(chat) =>
				chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}

	function handleSearchModal() {
		filteredContactsModal = contacts.filter((contact) =>
			contact.name.toLowerCase().includes(searchQueryModal.toLowerCase())
		);
	}

	function setImage(data: Chats) {
		senderProfile = { ...data };
	}

	onMount(() => {
		displayChatList = chats;
	});

	let showChatWrapper = false;
	let windowWidth = 0;

	// Detect screen size on mount
	const updateWindowWidth = () => {
		windowWidth = window.innerWidth;
	};
	onMount(() => {
		windowWidth = window.innerWidth;
		window.addEventListener('resize', updateWindowWidth);
		return () => window.removeEventListener('resize', updateWindowWidth);
	});
	// Function to show chat (triggered by clicking <li>)
	const openChat = (data: Chats) => {
		if (windowWidth < 1280) showChatWrapper = true;
	};

	// Function to hide chat (triggered by clicking the back button)
	const closeChat = () => {
		if (windowWidth < 1280) showChatWrapper = false;
	};

	function startCall() {
		resetCall(); // Reset any previous state
		isCalling = true; // Start the call
		timeoutId = setTimeout(() => {
			if (isCalling) {
				isCalling = false; // End the call after 4 seconds
				startTimer(); // Start the timer
			}
		}, 4000);
	}

	// Function to reset call and duration state
	function resetCall() {
		isCalling = false;
		callDuration = 0;
		if (intervalId) {
			clearInterval(intervalId); // Clear any existing interval
		}
	}

	// Function to start the timer
	function startTimer() {
		//@ts-ignore
		intervalId = setInterval(() => {
			callDuration++; // Increment call duration every second
		}, 1000);
	}

	function formatDuration(seconds: number) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	function toggleMute() {
		isMuted = !isMuted;
	}

	// -----------------------
	let selectedData: any = {};
	function messageComponent(data: any) {
		selectedData = data;
	}
	function callingTo(data: any) {
		selectedData = data;
		startCall();
	}

	chats.forEach((chat, index) => (chat.id = index));

	const avatarText = (name: string) => {
		const initials = name
			.split(' ')
			.map((word) => word[0])
			.join('');
		return initials.toUpperCase();
	};
</script>

<Col cols={{ span: 12 }} xl={{ span: 4 }} class="card 2xl:col-span-3" id="chat-list">
	<CardBody>
		<div class="group/form relative">
			<input
				type="text"
				class="form-input ltr:pl-9 ltr:group-[&.right]/form:pl-4 ltr:group-[&.right]/form:pr-9 rtl:pr-9 rtl:group-[&.right]/form:pl-9 rtl:group-[&.right]/form:pr-4"
				placeholder="Search for ..."
				bind:value={searchQuery}
				on:input={handleSearch}
			/>
			<button
				title="search btn"
				class="absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:left-auto ltr:group-[&.right]/form:right-3 rtl:right-3 rtl:group-[&.right]/form:left-3 rtl:group-[&.right]/form:right-auto"
			>
				<LucideIcon name="Search" class="size-4" />
			</button>
		</div>

		<div class="py-4">
			<ModalTrigger
				modalId="add-new-chat-modal"
				color="primary"
				class="btn w-full"
				text="Start New Chat"
			/>
			<Modal modalId="add-new-chat-modal" let:modalId size="md">
				<ModalHeader {modalId}>
					<h6>Add New Chat</h6>
				</ModalHeader>
				<ModalBody>
					<div class="group/form relative mb-4">
						<input
							type="text"
							bind:value={searchQueryModal}
							on:input={handleSearchModal}
							class="form-input ltr:pl-9 ltr:group-[&.right]/form:pl-4 ltr:group-[&.right]/form:pr-9 rtl:pr-9 rtl:group-[&.right]/form:pl-9 rtl:group-[&.right]/form:pr-4"
							placeholder="Search for ..."
						/>
						<button
							class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:left-auto ltr:group-[&.right]/form:right-3 rtl:right-3 rtl:group-[&.right]/form:left-3 rtl:group-[&.right]/form:right-auto"
						>
							<LucideIcon name="Search" class="size-4" />
						</button>
					</div>
					<Simplebar class="max-h-72">
						<div class="space-y-4">
							{#each filteredContactsModal as contact (contact.id)}
								<div class="flex items-center gap-2">
									<div
										class="dark:bg-dark-850 flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-100 font-semibold transition duration-200 ease-linear"
									>
										<img src={contact.avatar} alt={contact.name} class="rounded-full" />
									</div>
									<h6 class="grow">{contact.name}</h6>
									<a href="#!" class="btn-xs btn btn-sub-gray shrink-0">
										Send
										<i class="ri-send-plane-2-line align-middle ltr:ml-1 rtl:mr-1"></i>
									</a>
								</div>
							{/each}
							{#if filteredContactsModal.length === 0}
								<div class="dark:text-dark-500 text-center text-gray-500">
									<i class="ri-search-2-line text-lg"></i>
									<p class="mt-2">No contact available</p>
								</div>
							{/if}
						</div>
					</Simplebar>
				</ModalBody>
			</Modal>
		</div>
		{#if windowWidth >= 1280 || !showChatWrapper}
			<Simplebar class="-mx-space max-h-[calc(100vh_-_22.5rem)]">
				<ul class="space-y-3">
					{#each displayChatList as item, index (item.name)}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
						<li on:click={() => setImage(item)} on:click={() => openChat(item)}>
							<a
								href="#!"
								class="px-space dark:hover:bg-dark-850 [&.active]:bg-primary-500/10 group/item unread flex items-center gap-2 py-2.5 transition duration-300 ease-linear hover:bg-gray-50"
								class:active={index === senderProfile.id}
							>
								<div
									class="dark:bg-dark-850 relative flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 font-semibold transition duration-200 ease-linear"
								>
									{#if item.avatar}
										<img src={item.avatar} alt="" class="rounded-full" />
									{:else}
										<span>{item.avatarText}</span>
									{/if}
									<span
										class="dark:border-dark-900 absolute bottom-0 size-2.5 rounded-full border-2 border-white bg-green-500 ltr:right-0.5 rtl:left-0.5"
									></span>
								</div>
								<div class="grow overflow-hidden">
									<h6 class="mb-0.5">{item.name}</h6>
									<p
										class="dark:text-dark-500 !unread truncate text-sm text-gray-500 group-[&.unread]/item:font-medium group-[&.unread]/item:!text-gray-950 dark:group-[&.unread]/item:!text-gray-50"
									>
										{item.lastMessage}
									</p>
								</div>
								<div class="shrink-0 ltr:text-right rtl:text-left">
									{#if item.unread > 0}
										<span class="badge-sub-red badge-square size-5">{item.unread}</span>
									{/if}
								</div>
							</a>
						</li>
					{/each}
					{#if displayChatList.length === 0}
						<TableRowNotFound />
					{/if}
				</ul>
			</Simplebar>
		{/if}
	</CardBody>
</Col>

{#if windowWidth >= 1280 || showChatWrapper}
	<Col cols={{ span: 12 }} xl={{ span: 8 }} class="card overflow-hidden" id="chat-wrapper">
		<Simplebar class="chat-body relative max-h-[calc(100vh_-_19rem)] min-h-[calc(100vh_-_19rem)]">
			<div
				class="card-body dark:bg-dark-900/90 dark:border-dark-800 sticky inset-x-0 top-0 z-50 flex items-center gap-3 border-b border-gray-200 bg-white/30 backdrop-blur-lg"
			>
				<div class="shrink-0 xl:hidden">
					<button class="btn btn-sub-gray btn-icon" title="back btn" on:click={closeChat}>
						<LucideIcon name="ChevronsLeft" class="size-5" />
					</button>
				</div>
				<div
					class="dark:bg-dark-850 relative flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 font-semibold transition duration-200 ease-linear"
				>
					<img src={senderProfile.avatar} alt="" class="rounded-full" />
					{#if !senderProfile.avatar}
						<span>{avatarText(senderProfile.name)}</span>
					{/if}
				</div>
				<div class="grow">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<h6 class="mb-0.5"><a href="#!" class="">{senderProfile.name}</a></h6>
					<p class="dark:text-dark-500 text-gray-500">Last seen 2 hr</p>
				</div>

				<ModalTrigger
					modalId="phone-modal"
					icon="Phone"
					color="gray"
					iconCss="size-5"
					class="btn btn-active-gray btn-icon shrink-0"
				/>
				<button
					title="call btn"
					class="btn btn-active-gray btn-icon shrink-0"
					on:click={() => openModal('call-modal')}
				>
					<LucideIcon name="Video" class="size-5" />
				</button>
			</div>
			<CardBody class="pb-0">
				<div class="flex min-h-[calc(100vh_-_24rem)] flex-col justify-end gap-5" id="chat-messages">
					{#each $messages as msg, index (msg.id)}
						<div
							class="messages group/chat flex max-w-xl items-end gap-3 ltr:[&.right]:ml-auto rtl:[&.right]:mr-auto
              {msg.type === 'sent' ? 'right' : ''}"
						>
							<div
								class="dark:bg-dark-850 relative flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 font-semibold transition duration-200 ease-linear group-[&.right]/chat:order-2"
							>
								{#if !senderProfile.avatar && msg.type !== 'sent'}
									<span>{avatarText(senderProfile.name)}</span>
								{:else}
									<img
										src={msg.type === 'sent' ? msg.avatar : senderProfile.avatar}
										alt={msg.sender}
										class="rounded-full"
									/>
								{/if}
								<span
									class="dark:border-dark-900 absolute bottom-0 size-2.5 rounded-full border-2 border-white bg-green-500 ltr:right-0 rtl:left-0"
								></span>
							</div>

							<div class="grow *:mb-3">
								<div class="flex items-end gap-2 last:mb-0">
									<div class="grow">
										<p
											class="dark:text-dark-500 mb-1 text-xs text-gray-500 ltr:group-[&.right]/chat:text-right rtl:group-[&.right]/chat:text-left"
										>
											{msg.time}
										</p>
										<div
											class="dark:bg-dark-850 rounded-xl bg-gray-100 px-4 py-2.5 last:mb-0 group-[&.right]/chat:order-1 ltr:rounded-bl-none ltr:group-[&.right]/chat:rounded-bl-lg ltr:group-[&.right]/chat:rounded-br-none rtl:rounded-br-none rtl:group-[&.right]/chat:rounded-bl-none rtl:group-[&.right]/chat:rounded-br-lg"
										>
											{@html msg.text}
										</div>
									</div>
									<Dropdown class="dropdown shrink-0">
										<DropdownButton
											type="button"
											class="dark:text-dark-500 flex items-center text-gray-500"
										>
											<LucideIcon name="Ellipsis" class="size-4 rotate-90" />
										</DropdownButton>
										<DropdownMenu class="dropdown-menu !fixed hidden p-2">
											<a href="#!" class="dropdown-item">
												<i class="ri-chat-4-line align-middle ltr:mr-2 rtl:ml-2"></i>
												<span>Clear Chat</span>
											</a>

											<a href="#!" class="dropdown-item">
												<i class="ri-delete-bin-line align-middle ltr:mr-2 rtl:ml-2"></i>
												<span>Delete</span>
											</a>
										</DropdownMenu>
									</Dropdown>
								</div>

								{#if msg.images}
									<div class="last:mb-0">
										<div class="grid grid-cols-12 gap-4">
											{#each msg.images as img}
												<div class="col-span-3">
													<a href="#!" title="Gallery Images">
														<!-- svelte-ignore a11y-img-redundant-alt -->
														<img src={img} alt="Gallery image" class="rounded-md" />
													</a>
												</div>
											{/each}
											<a
												href="#!"
												class="dark:bg-dark-850 col-span-3 flex items-center justify-center rounded-md bg-gray-100 p-3"
											>
												<h6>{msg.extraImagesCount}</h6>
											</a>
										</div>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</CardBody>
		</Simplebar>

		<CardBody>
			<div
				class="dark:border-dark-800 flex items-center gap-2 rounded-md border border-gray-200 p-2"
			>
				<button class="btn btn-active-gray btn-icon shrink-0">
					<LucideIcon name="AudioLines" class="size-5" />
				</button>
				<input
					type="text"
					class="form-input grow border-0"
					placeholder="Type something ..."
					bind:value={messageText}
					on:keydown={handleKeyPress}
				/>
				<button
					type="submit"
					class="btn btn-active-primary btn-icon shrink-0"
					on:click={sendMessage}
				>
					<LucideIcon name="Send" class="size-5" />
				</button>
				<div class="shrink-0">
					<label for="sendImages" class="btn btn-active-gray btn-icon">
						<LucideIcon name="Image" class="size-5" />
					</label>
					<input type="file" id="sendImages" class="hidden" />
				</div>
				<button class="btn btn-active-gray btn-icon shrink-0 text-lg"> 😊 </button>
				<Dropdown class="dropdown">
					<DropdownButton type="button" class="btn btn-active-gray btn-icon shrink-0 text-lg">
						<LucideIcon name="Ellipsis" class="size-5" />
					</DropdownButton>
					<DropdownMenu class="dropdown-menu !fixed hidden p-2">
						<a href="#!" class="dropdown-item">
							<i class="ri-chat-4-line align-middle ltr:mr-2 rtl:ml-2"></i>
							<span>Clear Chat</span>
						</a>

						<a href="#!" class="dropdown-item">
							<i class="ri-delete-bin-line align-middle ltr:mr-2 rtl:ml-2"></i>
							<span>Delete</span>
						</a>
					</DropdownMenu>
				</Dropdown>
			</div>
		</CardBody>
	</Col>
{/if}

<Modal modalId="phone-modal" let:modalId position="bottom-right" size="xs">
	<ModalBody>
		<div class="flex items-center gap-2">
			<div class="size-10 shrink-0 rounded-full">
				<img src="/assets/images/avatar/user-5.png" alt="" class="rounded-full" />
			</div>
			<div>
				<h6>{senderProfile.name}</h6>
				<p class="dark:text-dark-500 text-sm text-gray-500">
					{isCalling ? 'Calling ...' : formatDuration(callDuration)}
				</p>
			</div>
		</div>
		<div class="mt-5 flex items-center gap-3">
			<button
				type="button"
				on:click={toggleMute}
				class="btn btn-active-gray btn-icon-text btn-icon shrink-0"
			>
				{#if isMuted}
					<LucideIcon name="MicOff" class="size-5" />
				{:else}
					<LucideIcon name="Mic" class="size-5" />
				{/if}
			</button>
			<button type="button" class="btn btn-active-gray btn-icon-text btn-icon shrink-0">
				<LucideIcon name="Pause" class="size-5" />
			</button>
			<button type="button" class="btn btn-active-gray btn-icon-text btn-icon shrink-0">
				<LucideIcon name="Disc" class="size-5" />
			</button>
			<button
				on:click={() => closeModal()}
				type="button"
				data-modal-close="callModal"
				class="btn btn-active-red btn-icon-text btn-icon shrink-0"
			>
				<LucideIcon name="Phone" class="size-5" />
			</button>
			<button type="button" class="btn btn-active-gray btn-icon-text btn-icon shrink-0">
				<LucideIcon name="Settings" class="size-5"></LucideIcon>
			</button>
		</div>
	</ModalBody>
</Modal>

<Modal modalId="call-modal" let:modalId>
	<ModalBody>
		<div class="relative overflow-hidden rounded-md">
			<img src="/assets/images/chat/video-1.png" alt="" class="main-image" />
			<a href="#!" class="absolute bottom-5 right-5 inline-block">
				<img src="/assets/images/chat/video-2.png" alt="" class="h-24 rounded-md" />
			</a>
		</div>
		<div class="flex items-center justify-center gap-2 pt-5">
			<button class="btn btn-sub-gray btn-icon"><LucideIcon name="MicOff" class="size-5" /></button>
			<button class="btn btn-red btn-icon"><LucideIcon name="PhoneMissed" class="size-5" /></button>
			<button class="btn btn-sub-gray btn-icon"
				><LucideIcon name="VideoOff" class="size-5" /></button
			>
		</div>
	</ModalBody>
</Modal>
