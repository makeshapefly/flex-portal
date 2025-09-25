<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import ChatBot from '$lib/components/ui/advanced-bot/ChatBot.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	let showModal = false;

	function toggleModal() {
		showModal = !showModal;
	}

	// Close modal when clicking outside of it
	function closeModal(event: MouseEvent) {
		// Close the modal only if the click is on the modal background
		const modal = document.getElementById('modal-bot');
		if (modal && !modal.contains(event.target as Node)) {
			showModal = false;
		}
	}

	// Add event listener when the component is mounted (only in the browser)
	onMount(() => {
		if (typeof window !== 'undefined') {
			document.addEventListener('click', closeModal);
		}
	});

	// Clean up event listener when the component is destroyed (only in the browser)
	onDestroy(() => {
		if (typeof window !== 'undefined') {
			document.removeEventListener('click', closeModal);
		}
	});
</script>

<PageHeading title="Bot" sub_title="UI Advanced" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Default ChatBot</CardTitle>
		</CardHeader>
		<CardBody class="grid grid-cols-1 items-center gap-5 md:grid-cols-2 xl:grid-cols-3">
			<!-- First ChatBot -->
			<div>
				<div
					class="dark:shadow-dark-800 dark:bg-dark-900 flex flex-col rounded-md shadow-lg shadow-gray-200"
				>
					<div class="from-primary-500 rounded-t-md bg-gradient-to-tr to-purple-500 p-4 text-white">
						<div>
							<h6 class="text-16 mb-1">ChatBot</h6>
							<p class="text-xs text-white/75">Online</p>
						</div>
					</div>
					<ChatBot />
				</div>
			</div>

			<!-- Second ChatBot -->
			<div>
				<div
					class="dark:shadow-dark-800 dark:bg-dark-900 flex flex-col rounded-md shadow-lg shadow-gray-200"
				>
					<div class="rounded-t-md bg-gradient-to-tr from-green-500 to-sky-500 p-4 text-white">
						<div>
							<h6 class="text-16 mb-1">ChatBot</h6>
							<p class="text-xs text-white/75">Online</p>
						</div>
					</div>
					<ChatBot />
				</div>
			</div>

			<!-- Third ChatBot -->
			<div>
				<div
					class="dark:shadow-dark-800 dark:bg-dark-900 flex flex-col rounded-md shadow-lg shadow-gray-200"
				>
					<div
						class="from-primary-500/20 rounded-t-md bg-gradient-to-br via-green-500/20 to-purple-500/20 p-4"
					>
						<div>
							<h6 class="text-16 mb-1">ChatBot</h6>
							<p class="dark:text-dark-500 text-xs text-gray-500">Online</p>
						</div>
					</div>
					<ChatBot />
				</div>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Live ChatBot</CardTitle>
		</CardHeader>
		<CardBody class="flex items-center gap-5">
			<button
				type="button"
				id="modal-bot"
				class="btn bg-primary-500 border-primary-500 hover:bg-primary-600 hover:border-primary-600 focus:bg-primary-600 focus:border-primary-600 text-white hover:text-white focus:text-white"
				on:click={toggleModal}
			>
				Live Chatbox
			</button>

			<!-- Modal -->
			{#if showModal}
				<!-- Modal container -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="z-drawer fixed bottom-8 md:w-96 ltr:right-5 ltr:md:right-8 rtl:left-5 rtl:md:left-8"
					id="modal-bot"
				>
					<div
						class="dark:shadow-dark-800 dark:bg-dark-900 flex w-full max-w-md flex-col rounded-md bg-white shadow-lg shadow-gray-200"
						on:click|stopPropagation
					>
						<div
							class="from-primary-500 rounded-t-md bg-gradient-to-tr to-purple-500 p-4 text-white"
						>
							<div>
								<h6 class="text-16 mb-1">ChatBot</h6>
								<p class="text-xs text-white/75">Online</p>
							</div>
						</div>
						<ChatBot />
					</div>
				</div>
			{/if}
		</CardBody>
	</Col>
</Grid>
