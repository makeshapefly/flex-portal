<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalClose from '$lib/components/ui/modal/ModalClose.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { onMount } from 'svelte';
	import { members, groups, messages as msgs } from './group';
	import { writable } from 'svelte/store';

	let searchQuery = '';
	let filteredGroup = groups;
	let filteredMembers = members;
	let avatar: any = '/assets/images/avatar/user-17.png';
	let messageText = '';
	let messages = writable(msgs);
	const activeGroup = writable(groups.find((group) => group.active) || groups[0]);

	function sendMessage() {
		if (messageText.trim() === '') return;

		// Construct the new message object
		const newMessage = {
			user: {
				name: 'You',
				avatar,
				status: 'online'
			},
			timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
			message: messageText,
			type: 'sent',
			id: Date.now()
		};

		messages.update((currentMessages) => [...currentMessages, newMessage]);
		messageText = '';
		scrollToBottom();
	}

	// Function to scroll to the bottom of the chat container
	function scrollToBottom() {
		setTimeout(() => {
			const chat = document.getElementById('groupchat-messages')?.lastElementChild;
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

	// Function to handle the search
	function handleSearch() {
		filteredGroup = groups.filter((group) =>
			group.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}

	function setActiveChat(index: number) {
		// Reset the active status of all groups
		groups.forEach((group, i) => {
			group.active = i === index;
		});

		// Update the activeGroup store
		activeGroup.set(groups[index]);
	}

	let showChatWrapper = false;
	let windowWidth = 0;

	function updateWindowWidth() {
		windowWidth = window.innerWidth;
	}
	onMount(() => {
		updateWindowWidth();
		window.addEventListener('resize', updateWindowWidth);
	});

	const openChat = () => {
		if (windowWidth < 1200) showChatWrapper = true;
	};
	const closeChat = () => {
		if (windowWidth < 1200) showChatWrapper = false;
	};
</script>

<Col cols={{ span: 12 }} class="card 2xl:col-span-3" id="chat-list">
	<CardBody>
		<ModalTrigger
			modalId="new-group-modal"
			color="primary"
			class="btn w-full"
			text="Create New Group"
		/>
		<Modal modalId="new-group-modal" let:modalId size="md">
			<ModalHeader {modalId}>
				<h6>New Group</h6>
			</ModalHeader>
			<ModalBody>
				<form>
					<div class="mb-5">
						<label for="basicInput1" class="form-label">Group Name</label>
						<input
							type="text"
							id="basicInput1"
							class="form-input"
							placeholder="Enter group title"
						/>
					</div>
					<div class="mb-5">
						<label for="addMemberSelect" class="form-label">Add Contacts</label>
						<div id="addMemberSelect" placeholder="Select Contact"></div>
					</div>
					<div class="flex items-center justify-end gap-2">
						<ModalClose {modalId}
							><button type="button" class="btn btn-sub-gray">Cancel</button></ModalClose
						>
						<button type="submit" class="btn btn-primary">Create Group</button>
					</div>
				</form>
			</ModalBody>
		</Modal>
		<div class="group/form relative my-4">
			<input
				type="text"
				class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
				placeholder="Search for ..."
				bind:value={searchQuery}
				on:input={handleSearch}
			/>
			<button
				title="search btn"
				class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
			>
				<LucideIcon name="Search" class="size-4" />
			</button>
		</div>
		{#if !showChatWrapper || windowWidth >= 1200}
			<Simplebar class="-mx-space max-h-[calc(100vh_-_22.5rem)]">
				<ul class="space-y-3">
					{#each groups as group, index}
						<li on:click={() => openChat()} role="presentation">
							<a
								href="#!"
								class="px-space [&.active]:bg-primary-500/10 dark:hover:bg-dark-850 group/item flex items-center gap-2 py-2.5 transition duration-300 ease-linear hover:bg-gray-50"
								on:click={() => setActiveChat(index)}
								class:active={group.image == $activeGroup.image}
							>
								<div
									class="relative flex items-center justify-center bg-green-500/10 p-2 font-semibold transition duration-200 ease-linear {group.active
										? 'bg-primary-500/10'
										: ''} dark:[&.active]:bg-dark-900 dark:group-[&.unread]/item:bg-dark-900 size-11 shrink-0 rounded-full group-[&.unread]/item:bg-white [&.active]:bg-white"
								>
									<img src={group.image} alt="" class="rounded-full" />
								</div>
								<div class="grow overflow-hidden">
									<h6 class="mb-0.5 truncate">{group.name}</h6>
									<p
										class="dark:group-[&.unread]/item:text-dark-50 dark:text-dark-500 truncate text-sm text-gray-500 group-[&.unread]/item:font-medium group-[&.unread]/item:text-gray-950"
									>
										{group.message}
									</p>
								</div>
								<div class="shrink-0 ltr:text-right rtl:text-left">
									<p class="dark:text-dark-500 mb-1 text-xs text-gray-500">{group.time}</p>
									{#if group.badge}
										<span class="badge-sub-red badge-square size-5">{group.badge}</span>
									{/if}
								</div>
							</a>
						</li>
					{/each}
					{#if groups.length === 0}
						<p class="text-center">No groups found</p>
					{/if}
				</ul>
			</Simplebar>
		{/if}
	</CardBody>
</Col>

<!-- Messages -->
{#if showChatWrapper || windowWidth >= 1200}
	<Col cols={{ span: 12 }} class="card overflow-hidden 2xl:col-span-6" id="chat-wrapper">
		<Simplebar class="relative max-h-[calc(100vh_-_19rem)] min-h-[calc(100vh_-_19rem)]">
			<div
				class="card-body dark:bg-dark-900/60 dark:border-dark-800 sticky inset-x-0 top-0 z-50 flex items-center gap-3 border-b border-gray-200 bg-white/30 backdrop-blur-lg"
			>
				<div class="shrink-0 xl:hidden">
					<button class="btn btn-sub-gray btn-icon" on:click={() => closeChat()}>
						<LucideIcon name="ChevronsLeft" class="size-5" />
					</button>
				</div>
				<div
					class="dark:bg-dark-850 relative flex size-11 shrink-0 items-center justify-center rounded-full bg-gray-100 p-2 font-semibold transition duration-200 ease-linear"
				>
					<img src={$activeGroup.image} alt="" class="rounded-full" />
				</div>
				<div class="grow">
					<h6><a href="#!">{$activeGroup.name}</a></h6>
					<p class="dark:text-dark-500 text-gray-500">Active</p>
				</div>
				<button title="phone call btn" class="btn btn-active-gray btn-icon shrink-0">
					<LucideIcon name="Phone" class="size-5" />
				</button>
				<button title="video call btn" class="btn btn-active-gray btn-icon shrink-0">
					<LucideIcon name="Video" class="size-5" />
				</button>
			</div>
			<div class="card-body pb-0">
				<div
					class="flex min-h-[calc(100vh_-_24rem)] flex-col justify-end gap-5"
					id="groupchat-messages"
				>
					{#each $messages as message (message.id)}
						<div
							class="flex max-w-xl items-end gap-3 ltr:[&.right]:ml-auto rtl:[&.right]:mr-auto {message.type ===
							'sent'
								? 'right'
								: ''} group/chat"
						>
							<div
								class="dark:bg-dark-850 relative flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 font-semibold transition duration-200 ease-linear group-[&.right]/chat:order-2"
							>
								<img src={message.user.avatar} alt="" class="rounded-full" />
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
											{message.timestamp}
										</p>
										<div
											class="dark:bg-dark-850 rounded-xl bg-gray-100 px-4 py-2.5 group-[&.right]/chat:order-1 last:mb-0 ltr:rounded-bl-none ltr:group-[&.right]/chat:rounded-br-none ltr:group-[&.right]/chat:rounded-bl-lg rtl:rounded-br-none rtl:group-[&.right]/chat:rounded-br-lg rtl:group-[&.right]/chat:rounded-bl-none"
										>
											{message.message}
										</div>
									</div>

									<Dropdown class="dropdown shrink-0" alignTo="right">
										<DropdownButton class="flex items-center text-gray-500" title="dropdown btn">
											<i class="ri-more-2-fill"></i>
										</DropdownButton>
										<DropdownMenu class="dropdown-menu !fixed p-2">
											<a
												href="#!"
												class="hover:text-primary-500 text-14 flex items-center px-4 py-1.5 text-gray-500 transition duration-300 ease-linear"
											>
												<i class="ri-reply-line align-middle ltr:mr-2 rtl:ml-2"></i>
												<span>Reply</span>
											</a>

											<a
												href="#!"
												class="text-14 flex items-center px-4 py-1.5 text-gray-500 transition duration-300 ease-linear hover:text-red-500"
												data-modal-target="deleteModal"
											>
												<i class="ri-delete-bin-line align-middle ltr:mr-2 rtl:ml-2"></i>
												<span>Delete</span>
											</a>
										</DropdownMenu>
									</Dropdown>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</Simplebar>

		<!-- send messsge div -->
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
				<div class="dropdown">
					<button type="button" class="btn btn-active-gray btn-icon shrink-0 text-lg">
						<LucideIcon name="Ellipsis" class="size-5" />
					</button>
					<div class="dropdown-menu !fixed hidden p-2">
						<ul>
							<li>
								<a href="#!" class="dropdown-item">
									<i class="ri-chat-4-line align-middle ltr:mr-2 rtl:ml-2"></i>
									<span>Clear Chat</span>
								</a>
							</li>
							<li>
								<a href="#!" class="dropdown-item">
									<i class="ri-delete-bin-line align-middle ltr:mr-2 rtl:ml-2"></i>
									<span>Delete</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</CardBody>
	</Col>
{/if}

<Col cols={{ span: 12 }} class="card 2xl:col-span-3">
	<CardBody>
		<div class="text-center">
			<div
				class="dark:group-[&.unread]/item:bg-dark-900 relative mx-auto flex size-24 shrink-0 items-center justify-center rounded-full bg-green-500/10 p-4 font-semibold transition duration-200 ease-linear group-[&.unread]/item:bg-white"
			>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img src={$activeGroup.image} alt="Active Group Image" class="rounded-full" />
			</div>
			<h6 class="mt-3">{$activeGroup.name}</h6>
			<p class="dark:text-dark-500 text-gray-500">Create by admin</p>
		</div>
		<div>
			<div class="mt-5 mb-1 flex items-center">
				<h6 class="grow">Member (<span>{filteredMembers.length}</span>)</h6>
				<a href="#!" class="link link-primary"
					><LucideIcon name="Plus" class="inline-block size-4" />Add</a
				>
			</div>

			<Simplebar class="-mx-5 max-h-72 px-5">
				<div class="space-y-4">
					{#each filteredMembers as member (member.id)}
						<a href="#!" class="flex items-center gap-2">
							<div
								class="dark:bg-dark-850 flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-100 font-semibold transition duration-200 ease-linear"
							>
								<img src={member.avatar} alt="" class="rounded-full" />
							</div>
							<h6 class="grow">{member.name}</h6>
							<p class="dark:text-dark-500 text-gray-500">{member.role}</p>
						</a>
					{/each}
				</div>
			</Simplebar>

			<div class="mt-5">
				<h6 class="mb-2">Attachments</h6>
				<div class="-mx-5 max-h-36 px-5" data-simplebar>
					<div class="space-y-3">
						<a
							href="#!"
							class="dark:border-dark-800 dark:hover:border-dark-700 dark:hover:shadow-dark-850 flex items-center gap-2 rounded-md border border-dashed border-gray-200 p-2 transition duration-300 ease-linear hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200"
						>
							<div
								class="dark:bg-dark-850 flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-500 transition duration-200 ease-linear"
							>
								<LucideIcon name="FileText" class="size-4" />
							</div>
							<div class="grow">
								<h6>shopify-docs.txt</h6>
								<p class="dark:text-dark-500 text-sm text-gray-500">154 kb</p>
							</div>
							<div class="shrink-0">
								<LucideIcon
									name="Download"
									class="dark:text-dark-500 dark:fill-dark-850 size-5 fill-gray-200 text-gray-500"
								/>
							</div>
						</a>
						<a
							href="#!"
							class="dark:border-dark-800 dark:hover:border-dark-700 dark:hover:shadow-dark-850 flex items-center gap-2 rounded-md border border-dashed border-gray-200 p-2 transition duration-300 ease-linear hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200"
						>
							<div
								class="dark:bg-dark-850 flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 font-semibold transition duration-200 ease-linear"
							>
								<LucideIcon name="Image" class="size-4" />
							</div>
							<div class="grow">
								<h6>main-logo.png</h6>
								<p class="dark:text-dark-500 text-sm text-gray-500">467 kb</p>
							</div>
							<div class="shrink-0">
								<LucideIcon
									name="Download"
									class="dark:text-dark-500 dark:fill-dark-850 size-5 fill-gray-200 text-gray-500"
								/>
							</div>
						</a>
						<a
							href="#!"
							class="dark:border-dark-800 dark:hover:border-dark-700 dark:hover:shadow-dark-850 flex items-center gap-2 rounded-md border border-dashed border-gray-200 p-2 transition duration-300 ease-linear hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200"
						>
							<div
								class="dark:text-dark-500 dark:bg-dark-850 flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-500 transition duration-200 ease-linear"
							>
								<LucideIcon name="FileArchive" class="size-4" />
							</div>
							<div class="grow">
								<h6>chat.zip</h6>
								<p class="dark:text-dark-500 text-sm text-gray-500">48 mb</p>
							</div>
							<div class="shrink-0">
								<LucideIcon
									name="Download"
									class="dark:text-dark-500 dark:fill-dark-850 size-5 fill-gray-200 text-gray-500"
								/>
							</div></a
						>
					</div>
				</div>
			</div>
		</div>
	</CardBody>
</Col>
