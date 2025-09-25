<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Notification from '$lib/components/ui/notification/Notification.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	const notifications = [
		{
			message: '🔥 Your success message - make it short',
			btnColor: 'btn-green',
			btnTitle: 'Success',
			type: 'success'
		},
		{
			message: 'Your Info message - make it short',
			btnColor: 'btn-sky',
			btnTitle: 'Info',
			type: 'info'
		},
		{
			message: '🪄 Your Warning message - make it short',
			btnColor: 'btn-yellow',
			btnTitle: 'Warning',
			type: 'warning'
		},
		{
			message: '😵 Your critical message - make it short!',
			btnColor: 'btn-red',
			btnTitle: 'Error',
			type: 'error'
		}
	];

	type AlertItem = {
		text: string;
		label: string;
		location:
			| 'top-left'
			| 'top-right'
			| 'bottom-left'
			| 'bottom-right'
			| 'top-center'
			| 'bottom-center';
	};

	const alertList: Array<AlertItem> = [
		{
			text: 'You have successfully completed this thing!',
			label: 'Top Left',
			location: 'top-left'
		},
		{
			text: 'You have successfully completed this thing!',
			label: 'Top Center',
			location: 'top-center'
		},
		{
			text: 'You have successfully completed this thing!',
			label: 'Top Right',
			location: 'top-right'
		},
		{
			text: 'You have successfully completed this thing!',
			label: 'Bottom Left',
			location: 'bottom-left'
		},
		{
			text: 'You have successfully completed this thing!',
			label: 'Bottom Center',
			location: 'bottom-center'
		},
		{
			text: 'You have successfully completed this thing!',
			label: 'Bottom Right',
			location: 'bottom-right'
		}
	];
</script>

<PageHeading title="Notification" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Basic Notification</CardTitle>
		</CardHeader>

		<CardBody>
			{#each notifications as { message, btnColor, btnTitle, type }}
				<Notification
					{message}
					btnColor={btnColor + ' me-2'}
					{btnTitle}
					{type}
					position="bottom-right"
				/>
			{/each}
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Position Notification</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-2">
				{#each alertList as { text, label, location }}
					<Notification message={text} btnTitle={label} position={location} />
				{/each}
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Content Toast</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-2">
				<Notification
					message="Those who successfully complete the programme will be awarded a certificate of achievement. You can concentrate and successfully complete a project that just days ago would have looked too difficult. "
					btnColor="btn-purple"
					position="top-right"
					btnTitle="Content Toast"
				/>
			</div>
		</CardBody>
	</Col>
</Grid>
