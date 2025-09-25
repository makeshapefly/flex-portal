<script lang="ts">
	import { getContext } from 'svelte';
	let state: UI.INotificationState = getContext('notification-state');

	export let type: string = 'info'; // Default type
	export let message: string = 'You have successfully completed this thing!';
	export let position: UI.NotificationPoisition = 'top-right';
	export let btnColor: string = 'btn-primary'; // Default button color
	export let autoClose: false | number = 5000; // Default auto close time in milliseconds
	export let btnTitle: string = 'Notification';
	function showNotification() {
		state.pushNotification({ message, position, type, autoClose: autoClose });
	}
</script>

<button class={`btn ${btnColor}`} on:click={showNotification}>
	{btnTitle}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={() => {
			btnColor = btnColor; // Update button color
			type = type; // Update notification type based on button color
		}}
	></div>
</button>
