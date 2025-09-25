<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Button from '$lib/components/ui/buttons/Button.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import LoadingButton from '$lib/components/ui/buttons/LoadingButton.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	const baseButtons: Array<{ text: string; color: UI.ButtonColors }> = [
		{ text: 'Primary', color: 'primary' },
		{ text: 'Purple', color: 'purple' },
		{ text: 'Green', color: 'green' },
		{ text: 'Red', color: 'red' },
		{ text: 'Yellow', color: 'yellow' },
		{ text: 'Sky', color: 'sky' },
		{ text: 'Pink', color: 'pink' },
		{ text: 'Indigo', color: 'indigo' },
		{ text: 'Orange', color: 'orange' },
		{ text: 'Dark', color: 'dark' },
		{ text: 'Light', color: 'light' }
	];
</script>

<PageHeading title="Buttons" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>Base Buttons</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				{#each baseButtons as button, index}
					<Button text={button.text} color={button.color} />
				{/each}
			</div>
		</CardBody>
	</Card><!--Base Buttons-->

	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>Outline Buttons</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				{#each baseButtons as button, index}
					<Button text={button.text} color={button.color} varient="outline" />
				{/each}
			</div>
		</CardBody>
	</Card><!--Outline Buttons-->

	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>Soft Buttons</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				{#each baseButtons as button, index}
					<Button text={button.text} color={button.color} varient="soft" />
				{/each}
			</div>
		</CardBody>
	</Card><!--Soft Buttons-->

	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>3D Buttons</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				{#each baseButtons as button, index}
					<Button text={button.text} color={button.color} varient="3d" />
				{/each}
			</div>
		</CardBody>
	</Card><!--3D Buttons-->

	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>Outline Dashed Style</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				{#each baseButtons as button, index}
					<Button text={button.text} color={button.color} varient="dashed" />
				{/each}
			</div>
		</CardBody>
	</Card><!--Outline Dashed Style-->

	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>Active Style</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				{#each baseButtons as button, index}
					<Button text={button.text} color={button.color} varient="active" />
				{/each}
			</div>
		</CardBody>
	</Card><!--Active Style-->

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Icon with Text</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				<Button text="Facebook" color="primary" icon="Facebook" />
				<Button text="Instagram" color="pink" icon="Instagram" />
			</div>
		</CardBody>
	</Col><!--Icon with Text-->

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Icon Overlay with Text</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				<Button text="Twitch" color="purple" icon="Twitch" iconPosition="left" />
				<Button text="Twitter" color="sky" icon="Twitter" iconPosition="left" />
				<Button text="Twitter" color="red" icon="Twitter" iconPosition="right" />
			</div>
		</CardBody>
	</Col><!--Icon overlay with Text-->

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Button Size</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-4">
				<Button text="Extra Small" color="primary" size="mini" />
				<Button text="Small" color="primary" size="small" />
				<Button text="Medium" color="primary" size="medium" />
				<Button text="Default" color="primary" />
				<Button text="Large" color="primary" size="large" />
			</div>
		</CardBody>
	</Col><!--Icon with Text-->

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Loading Buttons</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				<div>
					<LoadingButton
						text="Active"
						textOnLoad="Unactive"
						actionCb={async () => {
							return new Promise((_, reject) => {
								setTimeout(() => reject(new Error('Action failed')), 2000);
							});
						}}
					/>
				</div>
				<div>
					<LoadingButton
						text="Launching"
						textOnLoad="Welcome to Domiex 😍"
						actionCb={async () => {
							await new Promise((resolve) => setTimeout(resolve, 2000));
						}}
					/>
				</div>

				<div>
					<LoadingButton
						color="pink"
						icon="UserPlus"
						text="Follow"
						textOnLoad="UnFollow"
						actionCb={async () => {
							await new Promise((resolve) => setTimeout(resolve, 2000));
						}}
					/>
				</div>
			</div></CardBody
		>
	</Col><!--Loading Buttons-->

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Rounded Buttons</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				<Button text="Primary" varient="soft" class="rounded-full"></Button>
				<Button text="Primary" varient="outline" class="rounded-full"></Button>
				<Button text="Primary" varient="dashed" class="rounded-full"></Button>
			</div>
		</CardBody>
	</Col><!--Rounded Buttons-->

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Hover Effect</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				<Button text="Button Up" class="hover:-translate-y-0.5"></Button>
				<Button text="Button Down" class="hover:translate-y-0.5" color="green"></Button>
				<Button text="Scale" class="hover:scale-105" color="purple"></Button>
			</div>
		</CardBody>
	</Col><!--Hover Effect-->

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Icon Buttons</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				<Button color="red" icon="Trash" />
				<Button color="green" varient="outline" icon="Wrench" />
				<Button color="sky" varient="soft" icon="User" class="rounded-full" />
			</div>
		</CardBody>
	</Col><!--Icon Buttons-->

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Disabled Buttons</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				<Button color="primary" text="Disabled" disabled={true} />
				<Button color="primary" text="Disabled" varient="soft" disabled={true} />
				<Button color="primary" text="Disabled" varient="outline" disabled={true} />
				<Button color="primary" text="Disabled" varient="dashed" disabled={true} />
			</div>
		</CardBody>
	</Col><!--Disabled Buttons-->
</Grid>
