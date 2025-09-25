<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import { videoChat as msgs } from './video';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Reactive state for volume control and captions visibility
	let volume = 50;
	let showCaptions = false;
	let currentTime = 0;
	let formattedTime = '00:00:00';
	let newPinText = '';
	let pins = [
		{ time: '00:01:48', text: 'Weekly Update' },
		{ time: '00:02:48', text: 'Design Issue' },
		{ time: '00:03:01', text: 'Deadline Discuses' }
	];

	const formatTime = (seconds: number) => {
		const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
		const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
		const s = String(seconds % 60).padStart(2, '0');
		return `${h}:${m}:${s}`;
	};

	// Function to start the timer
	const startTimer = () => {
		setInterval(() => {
			currentTime++;
			formattedTime = formatTime(currentTime);
		}, 1000);
	};

	const addPin = () => {
		if (newPinText.trim() === '') return;
		pins = [...pins, { time: formattedTime, text: newPinText }];
		newPinText = '';
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			addPin();
		}
	};
	let messages = writable([...msgs]);
	let messageText = '';

	// Function to send a message
	function sendMessage() {
		if (messageText.trim() === '') return;

		const newMessage: any = {
			id: Date.now(),
			avatar: '/assets/images/avatar/user-4.png',
			name: 'You',
			message: messageText,
			time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Current time
		};
		messages.update((currentMessages) => [...currentMessages, newMessage]);
		messageText = '';
		scrollToBottom();
	}
	function scrollToBottom() {
		setTimeout(function () {
			const chat = document.getElementById('chat-messages')?.lastElementChild;
			if (chat) {
				chat.scrollIntoView({ behavior: 'smooth', block: 'end' });
			}
		}, 200); // Adding a delay to ensure the DOM updates first
	}

	onMount(() => {
		startTimer();
		const chatContainer = document.getElementById('chat-messages');
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
		}
	});
</script>

<Col cols={{ span: 12 }} xl={{ span: 8 }} class="card overflow-hidden">
	<div class="relative">
		<!-- Button and User Info -->
		<div class="absolute top-5 left-4 flex items-center gap-3">
			<button
				title="mic btn"
				class="btn btn-icon rounded-full bg-gray-900/30 text-white [&.active]:bg-red-500"
				on:click={() => (volume = volume === 0 ? 50 : 0)}
			>
				<LucideIcon name="Mic" class="size-4" />
			</button>
			<div class="rounded-full bg-gray-900/30 px-4 py-3 leading-none text-white">John Powers</div>
		</div>

		<img src="assets/images/chat/video-1.png" alt="" class="w-full object-cover" />

		<!-- Captions -->
		{#if showCaptions}
			<div
				class="absolute bottom-5 left-1/2 mx-auto max-w-2xl -translate-x-1/2 transform rounded-full bg-gray-900/15 px-4 py-2.5 leading-none font-medium"
			>
				Hello, Shopia Mia
			</div>
		{/if}
	</div>

	<CardBody>
		<div class="flex flex-wrap items-center justify-between gap-5">
			<!-- Volume Control -->
			<div class="dark:bg-dark-850 btn inline-flex shrink-0 items-center gap-2 bg-gray-100 px-3">
				<button
					title="volume - btn"
					on:click={() => (volume = Math.max(0, volume - 10))}
					class="dark:bg-dark-900 rounded bg-white p-1"
				>
					<LucideIcon name="Volume1" class="dark:text-dark-500 size-4 text-gray-500" />
				</button>

				<div class="dark:bg-dark-900 progress-bar progress-1 w-24 bg-white">
					<div
						class="progress-bar-wrap bg-primary-500 h-2 rounded text-white"
						style="width: {volume}%"
					></div>
				</div>

				<button
					title="volume + btn"
					on:click={() => (volume = Math.min(100, volume + 10))}
					class="dark:bg-dark-900 rounded bg-white p-1"
				>
					<LucideIcon name="Volume2" class="dark:text-dark-500 size-4 text-gray-500" />
				</button>
			</div>

			<!-- Control Buttons (Mic, Video, Captions) -->
			<div class="flex items-center gap-2">
				<button title="mic btn" class="btn btn-sub-gray btn-icon rounded-full">
					<LucideIcon name="Mic" class="size-4" />
				</button>
				<button title="video btn" class="btn btn-sub-gray btn-icon rounded-full">
					<LucideIcon name="Video" class="size-4" />
				</button>
				<button
					title="captions btn"
					class="btn btn-sub-gray btn-icon rounded-full"
					on:click={() => (showCaptions = !showCaptions)}
				>
					{#if showCaptions}
						<LucideIcon name="Captions" class="size-4" />
					{:else}
						<LucideIcon name="CaptionsOff" class="size-4" />
					{/if}
				</button>
				<button title="added btn" class="btn btn-sub-gray btn-icon rounded-full">
					<LucideIcon name="CirclePlus" class="size-4" />
				</button>
			</div>

			<!-- Leave Call Button -->
			<button title="leave call" class="btn btn-red">
				<LucideIcon name="PhoneMissed" class="mr-1 inline-block size-4" />
				Leave Call
			</button>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 4 }}>
	<div class="card">
		<div class="card-header">
			<h6 class="card-title">Key Moments</h6>
		</div>
		<div class="card-body">
			<Simplebar class="-mx-space px-space max-h-28">
				<div class="space-y-2">
					{#each pins as pin (pin.time)}
						<a
							href="#!"
							title="text pin"
							class="dark:text-dark-500 flex items-center gap-3 text-gray-500"
						>
							<p class="w-28">{pin.time}</p>
							<p>{pin.text}</p>
						</a>
					{/each}
				</div>
			</Simplebar>
			<div class="mt-5 flex items-center gap-2">
				<p class="shrink-0 font-medium text-green-500">{formattedTime}</p>
				<label for="newPinText" class="hidden">newPinText</label>
				<input
					type="text"
					class="form-input"
					id="newPinText"
					bind:value={newPinText}
					on:keydown={handleKeydown}
				/>
				<button on:click={addPin} title="add pin btn" class="btn btn-sub-red btn-icon shrink-0">
					<LucideIcon name="Pin" class="size-4" />
				</button>
			</div>
		</div>
	</div>

	<div class="card">
		<div class="card-header">
			<h6 class="card-title">Group Chat</h6>
		</div>
		<div class="card-body">
			<Simplebar class="-mx-space px-space max-h-64">
				<div class="space-y-2" id="chat-messages">
					{#each $messages as message (message.id)}
						<div class="flex gap-2">
							<div
								class="dark:bg-dark-850 relative flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 font-semibold transition duration-200 ease-linear"
							>
								<img src={message.avatar} alt={message.name} class="rounded-full" />
							</div>
							<div class="grow">
								<h6 class="mb-1">{message.name}</h6>
								<p class="dark:text-dark-500 text-gray-500">{message.message}</p>
							</div>
							<div class="dark:text-dark-500 ml-3 shrink-0 self-end text-gray-500">
								{message.time}
							</div>
						</div>
					{/each}
				</div>
			</Simplebar>
		</div>
		<div class="card-body flex items-center gap-2 pt-0">
			<label for="sendMessage" class="hidden">sendMessage</label>
			<input
				type="text"
				id="sendMessage"
				class="form-input"
				placeholder="Type something ..."
				bind:value={messageText}
				on:keydown={(e) => e.key === 'Enter' && sendMessage()}
			/>
			<button title="send btn" class="btn btn-primary btn-icon shrink-0" on:click={sendMessage}>
				<LucideIcon name="SendHorizontal" class="size-4" />
			</button>
		</div>
	</div>
</Col>
