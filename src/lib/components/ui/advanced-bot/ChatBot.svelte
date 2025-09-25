<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import { createChatStore } from '$lib/stores/chatbot'; // Import the store and method

	let botImg = '/assets/images/others/bot.png'; // Replace with your bot image URL
	let userImg = '/assets/images/avatar/user-2.png'; // Replace with your user image URL

	// Declare inputRef to bind the input element
	let inputRef: HTMLInputElement;

	// Create a unique chat store for this chatbot
	const chatId = `chat-${Math.random().toString(36).substr(2, 9)}`;
	const { subscribe, handleUserInput } = createChatStore(chatId);

	// Variables to hold the messages and botTyping status
	let messages: { from: string; text: string }[] = [];
	let botTyping: boolean = false;

	// Subscribe to the chat store to get messages and botTyping status
	$: {
		subscribe((state) => {
			messages = state.messages;
			botTyping = state.botTyping;
		});
	}

	// Function to handle input on enter key press or button click
	function updateChat(inputElement: HTMLInputElement) {
		const userInput = inputElement.value;
		if (userInput.trim()) {
			handleUserInput(userInput); // Send the user input to the store
			inputElement.value = ''; // Clear the input field
		}
	}

	// Handle the Enter key press event
	function handleKeydown(event: KeyboardEvent, inputElement: HTMLInputElement) {
		if (event.key === 'Enter') {
			updateChat(inputElement);
		}
	}
</script>

<div class="p-4 h-80" data-simplebar>
	<div id="messages" class="flex flex-col gap-y-4">
		{#each messages as message, key}
			<div>
				<div class="flex items-end" class:justify-end={message.from !== 'bot'}>
					<div
						class="flex flex-col max-w-sm space-y-2 text-sm"
						class:order-2={message.from === 'bot'}
						class:items-start={message.from === 'bot'}
						class:rtl:mr-2={message.from === 'bot'}
						class:ltr:ml-2={message.from === 'bot'}
					>
						<div>
							<span
								class="inline-block px-3 py-2 rounded-md"
								class:bg-gray-100={message.from === 'bot'}
								class:dark:bg-dark-850={message.from === 'bot'}
								class:bg-primary-500={message.from !== 'bot'}
								class:text-white={message.from !== 'bot'}>{message.text}</span
							>
						</div>
					</div>
					<img src={message.from === 'bot' ? botImg : userImg} alt="" class="rounded-full size-6" />
				</div>
			</div>
		{/each}
		{#if botTyping}
			<div class="flex items-end">
				<div class="flex flex-col items-start order-2 mx-2 space-y-2 text-sm">
					<div class="flex items-end">
						<img src={botImg} alt="" class="rounded-full size-6" />
						<div class="flex items-center justify-center space-x-1">
							<span class="sr-only">Loading...</span>
							<div
								class="size-2 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]"
							></div>
							<div
								class="size-2 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]"
							></div>
							<div class="rounded-full bg-primary-500 size-2 animate-bounce"></div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<div class="p-4">
	<div class="relative flex">
		<input
			type="text"
			placeholder="Say something..."
			autocomplete="off"
			class="rounded-full ltr:pr-10 rtl:pl-10 form-input"
			bind:this={inputRef}
			on:keydown={(event) => handleKeydown(event, inputRef)}
		/>
		<div class="absolute inset-y-0 items-center hidden ltr:right-1 rtl:left-1 sm:flex">
			<button
				type="button"
				class="inline-flex items-center justify-center text-white transition duration-200 ease-in-out rounded-full size-8 bg-primary-500 hover:bg-primary-600 focus:outline-none"
				on:click={() => updateChat(inputRef)}
			>
				<LucideIcon name="SendHorizontal" class="size-4" />
			</button>
		</div>
	</div>
</div>
