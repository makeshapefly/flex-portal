<script lang="ts">
	import AlertDemo from '$lib/components/ui/alert/AlertDemo.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import CodeHighLighter from '$lib/components/common/CodeHighLighter.svelte';
	import Alert from '$lib/components/ui/alert/Alert.svelte';
	import AlertMessage from '$lib/components/ui/alert/AlertMessage.svelte';
	import AlertTrigger from '$lib/components/ui/alert/AlertTrigger.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	type Alert = {
		message: string;
		color: UI.Colors;
		isOpen: boolean;
	};
	const alerts: Array<Alert> = [
		{ message: 'Primary Alerts', color: 'primary', isOpen: true },
		{ message: 'Purple Alerts', color: 'purple', isOpen: true },
		{ message: 'Green Alerts', color: 'green', isOpen: true },
		{ message: 'Red Alerts', color: 'red', isOpen: true },
		{ message: 'Yellow Alerts', color: 'yellow', isOpen: true },
		{ message: 'Sky Alerts', color: 'sky', isOpen: true },
		{ message: 'Pink Alerts', color: 'pink', isOpen: true },
		{ message: 'Indigo Alerts', color: 'indigo', isOpen: true },
		{ message: 'Orange Alerts', color: 'orange', isOpen: true },
		{ message: 'Dark Alerts', color: 'gray', isOpen: true }
	];
</script>

<PageHeading title="Alerts" sub_title="UI" />
<Grid cols={1} xl={2} gapX="space">
	<Card>
		<CardHeader>
			<CardTitle>Basic Alerts</CardTitle>
		</CardHeader>
		<CardBody>
			<p class="dark:text-dark-500 pb-3 text-gray-500">
				You can use <span class="font-semibold">Default</span> varient of
				<span class="font-semibold">AlertContainer</span> as demonstrated below.
			</p>
			<CodeHighLighter code={`<AlertContainer message="Primary Alerts" color="primary"/>`} />
			<div class="flex flex-col gap-2">
				{#each alerts as alert, index}
					<AlertDemo message={alert.message} color={alert.color} />
				{/each}
			</div>
		</CardBody>
	</Card><!--Basic alerts-->

	<Card>
		<CardHeader>
			<CardTitle>Soft Alerts</CardTitle>
		</CardHeader>
		<CardBody>
			<p class="dark:text-dark-500 pb-3 text-gray-500">
				You can use <span class="font-semibold">Soft</span> varient of
				<span class="font-semibold">AlertContainer</span> as demonstrated below.
			</p>
			<CodeHighLighter
				code={`<AlertContainer message="Primary Alerts" color="primary" varient="soft"/>`}
			/>
			<div class="flex flex-col gap-2">
				{#each alerts as alert, index}
					<AlertDemo message={alert.message} color={alert.color} varient="soft" />
				{/each}
			</div>
		</CardBody>
	</Card>
	<!--soft alerts-->

	<Card>
		<CardHeader>
			<CardTitle>Outline Alerts</CardTitle>
		</CardHeader>
		<CardBody>
			<p class="dark:text-dark-500 pb-3 text-gray-500">
				You can use <span class="font-semibold">Outline</span> varient of
				<span class="font-semibold">AlertContainer</span> as demonstrated below.
			</p>
			<CodeHighLighter
				code={`<AlertContainer message="Primary Alerts" color="primary" varient="outline"/>`}
			/>
			<div class="flex flex-col gap-2">
				{#each alerts as alert, index}
					<AlertDemo message={alert.message} color={alert.color} varient="outline" />
				{/each}
			</div>
		</CardBody>
	</Card>
	<!--outline alerts-->

	<Card>
		<CardHeader>
			<CardTitle>Solid Alerts</CardTitle>
		</CardHeader>
		<CardBody>
			<p class="dark:text-dark-500 pb-3 text-gray-500">
				You can use <span class="font-semibold">Solid</span> varient of
				<span class="font-semibold">AlertContainer</span> as demonstrated below.
			</p>
			<CodeHighLighter
				code={`<AlertContainer message="Primary Alerts" color="primary" varient="solid"/>`}
			/>
			<div class="flex flex-col gap-2">
				{#each alerts as alert, index}
					<AlertDemo message={alert.message} color={alert.color} varient="solid" />
				{/each}
			</div>
		</CardBody>
	</Card>
	<!--solid alerts-->
</Grid>

<Card>
	<CardHeader>
		<CardTitle>Icons with Alerts</CardTitle>
	</CardHeader>
	<CardBody>
		<Grid gap={2} xl={2}>
			<AlertDemo message="Info Message!" color="sky" varient="icon-info" />
			<AlertDemo message="Success Message!" color="green" varient="icon-success" />
			<AlertDemo message="Warning Message!" color="orange" varient="icon-warning" />
			<AlertDemo message="Error Message!" color="red" varient="icon-error" />
		</Grid>
	</CardBody>
</Card>
<!--end -->

<Card>
	<CardHeader>
		<CardTitle>Gradient Alerts</CardTitle>
	</CardHeader>
	<CardBody>
		<Grid cols={1} xl={2} gap={2}>
			{#each alerts as alert, index}
				<AlertDemo message={alert.message} color={alert.color} varient="gradient" />
			{/each}
		</Grid>
	</CardBody>
</Card>
<!--end -->

<Card>
	<CardHeader>
		<CardTitle>Live Alerts</CardTitle>
	</CardHeader>
	<CardBody>
		<div>
			<div>
				<Alert isOpen={false} closing="auto">
					<AlertTrigger>Auto Close Top Left</AlertTrigger>
					<AlertMessage message="Close after 5sec!" color="primary" position="top-left" />
				</Alert>
				<Alert isOpen={false} closing={1000}>
					<AlertTrigger>Auto Close Custom</AlertTrigger>
					<AlertMessage
						message="Close after entered time in miliseconds!"
						color="primary"
						position="top-center"
					/>
				</Alert>
				<Alert isOpen={false} closing="manual">
					<AlertTrigger>Manual Close</AlertTrigger>
					<AlertMessage message="Close on click!" color="primary" position="top-right" />
				</Alert>
				<Alert isOpen={false} closing="manual">
					<AlertTrigger>Bottom Left</AlertTrigger>
					<AlertMessage message="Postion Bottom Left" color="primary" position="bottom-left" />
				</Alert>
				<Alert isOpen={false} closing="manual">
					<AlertTrigger>Bottom Center</AlertTrigger>
					<AlertMessage message="Postion Bottom Center" color="primary" position="bottom-center" />
				</Alert>
				<Alert isOpen={false} closing="manual">
					<AlertTrigger>Bottom Right</AlertTrigger>
					<AlertMessage message="Postion Bottom Right" color="primary" position="bottom-right" />
				</Alert>
			</div>
		</div>
	</CardBody>
</Card>
<!--end -->

<Card>
	<CardHeader>
		<CardTitle>Icons Alerts</CardTitle>
	</CardHeader>
	<CardBody>
		<Grid cols={1} xl={2} gap={2}>
			<AlertDemo color="sky" varient="action-info">
				<h6 class="mb-1">New update available!</h6>
				<p class="dark:text-dark-500 text-gray-500">
					Some new updates are available. Refresh this page to get the new updates now. It is
					recommended to always have the latest version available.
				</p>
			</AlertDemo>
			<AlertDemo color="green" varient="action-success">
				<h6 class="mb-1">Ready to publish?</h6>
				<p class="dark:text-dark-500 text-gray-500">
					Publishing this project will make it publicy visible. you cam reverse this action anytime
					here.
				</p>
			</AlertDemo>
			<AlertDemo color="yellow" varient="action-warning">
				<h6 class="mb-1">Ready to publish?</h6>
				<p class="dark:text-dark-500 text-gray-500">
					Publishing this project will make it publicy visible. you cam reverse this action anytime
					here.
				</p>
			</AlertDemo>
			<AlertDemo color="red" varient="action-error">
				<h6 class="mb-1">Ready to publish?</h6>
				<p class="dark:text-dark-500 text-gray-500">
					Publishing this project will make it publicy visible. you cam reverse this action anytime
					here.
				</p>
			</AlertDemo>
		</Grid>
	</CardBody>
</Card>
<!--end -->

<Card>
	<CardHeader>
		<CardTitle>Basic Alerts</CardTitle>
	</CardHeader>
	<CardBody>
		<Grid md={2} xl={4} gap={2}>
			<AlertDemo message="" color="primary" varient="action-v2-info" actionBtnText="Great">
				<h6 class="mt-4 mb-1">Info</h6>
				<p class="dark:text-dark-500 mb-4 text-gray-500">
					The pdf is getting ready for you, just sit back and relax.
				</p>
			</AlertDemo>
			<AlertDemo
				message=""
				color="red"
				basicBtnClass="btn-red"
				varient="action-v2-error"
				actionBtnText="Delete Now"
			>
				<h6 class="mt-4 mb-1">Attention</h6>
				<p class="dark:text-dark-500 mb-4 text-gray-500">
					Your are about to delete 40 Posts are you sure ?
				</p>
			</AlertDemo>
			<AlertDemo
				message=""
				color="green"
				basicBtnClass="btn-green"
				varient="action-v2-success"
				actionBtnText="Successfull Login"
			>
				<h6 class="mt-4 mb-1">Success</h6>
				<p class="dark:text-dark-500 mb-4 text-gray-500">
					The action that you done was a success! great success.
				</p>
			</AlertDemo>
			<AlertDemo
				message=""
				color="yellow"
				basicBtnClass="btn-yellow"
				varient="action-v2-warning"
				actionBtnText="Warning"
			>
				<h6 class="mt-4 mb-1">Success</h6>
				<p class="dark:text-dark-500 mb-4 text-gray-500">
					The action that you done was a success! great success.
				</p>
			</AlertDemo>
		</Grid>
	</CardBody>
</Card>
