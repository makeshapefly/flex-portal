<script lang="ts">
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Badge from '$lib/components/ui/badge/Badge.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	const badges: Array<{ text: string; color: UI.Colors }> = [
		{ text: 'Primary', color: 'primary' },
		{ text: 'Purple', color: 'purple' },
		{ text: 'Green', color: 'green' },
		{ text: 'Red', color: 'red' },
		{ text: 'Yellow', color: 'yellow' },
		{ text: 'Sky', color: 'sky' },
		{ text: 'Pink', color: 'pink' },
		{ text: 'Indigo', color: 'indigo' },
		{ text: 'Orange', color: 'orange' },
		{ text: 'Light', color: 'gray' }
	];

	let removableBadges: Array<{ text: string; color: UI.Colors }> = [
		{ text: 'Primary', color: 'primary' },
		{ text: 'Purple', color: 'purple' },
		{ text: 'Green', color: 'green' },
		{ text: 'Red', color: 'red' },
		{ text: 'Yellow', color: 'yellow' },
		{ text: 'Sky', color: 'sky' },
		{ text: 'Pink', color: 'pink' },
		{ text: 'Indigo', color: 'indigo' },
		{ text: 'Orange', color: 'orange' },
		{ text: 'Light', color: 'gray' }
	];
</script>

<PageHeading title="Badge" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>Base Badge</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<div class="flex flex-wrap gap-4">
					{#each badges as badge}
						<Badge text={badge.text} color={badge.color} />
					{/each}
				</div>
			</div>
		</CardBody>
	</Card><!--end-->

	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>Outline Badge</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<div class="flex flex-wrap gap-4">
					{#each badges as badge}
						<Badge text={badge.text} color={badge.color} varient="outline" />
					{/each}
				</div>
			</div>
		</CardBody>
	</Card><!--end-->

	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>Soft Badge</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<div class="flex flex-wrap gap-4">
					{#each badges as badge}
						<Badge text={badge.text} color={badge.color} varient="soft" />
					{/each}
				</div>
			</div>
		</CardBody>
	</Card><!--end-->

	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>Solid Badge</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<div class="flex flex-wrap gap-4">
					{#each badges as badge}
						<Badge text={badge.text} color={badge.color} varient="solid" />
					{/each}
				</div>
			</div>
		</CardBody>
	</Card><!--end-->

	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>Close Badge</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<div class="flex flex-wrap gap-4">
					{#each removableBadges as badge, index (index)}
						<Badge
							text={badge.text}
							color={badge.color}
							varient="soft"
							removeCb={() => {
								removableBadges = removableBadges.filter((_, i) => i !== index);
							}}
						/>
					{/each}
				</div>
			</div>
		</CardBody>
	</Card><!--end Link-->

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Square Badge</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<div class="flex flex-wrap gap-4">
					<Badge text="1" color="primary" varient="soft" class="badge-square" />
					<Badge text="2" color="purple" varient="soft" class="badge-square" />
					<Badge text="3" color="green" varient="outline" class="badge-square" />
					<Badge text="4" color="red" varient="soft" class="badge-square" />
					<Badge text="4" color="primary" varient="solid" class="badge-square" />
					<Badge text="4" color="primary" varient="default" class="badge-square" />
					<Badge text="4" color="pink" varient="soft" class="badge-square" />
					<Badge
						text="4"
						color="pink"
						varient="soft"
						class="dark:bg-dark-850 dark:border-dark-800 dark:text-dark-50 border-gray-200 bg-gray-200 text-gray-800"
					/>
					<Badge text="4" color="gray" varient="soft" class="badge-square" />
				</div>
			</div>
		</CardBody>
	</Col><!--end-->

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<h6 class="card-title">Rounded Badge</h6>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<div class="flex flex-wrap gap-4">
					<Badge
						text="Primary"
						color="primary"
						class="badge-solid-primary"
						varient="rounded-solid"
					/>
					<Badge text="Soft" color="purple" varient="rounded-soft" />
					<Badge text="Outline" color="green" varient="rounded-outline" />
					<Badge text="Red" color="red" varient="rounded-soft" />
				</div>
			</div>
		</CardBody>
	</Col><!--end-->

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Button Badge</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-6">
				<div class="relative">
					<button type="button" class="btn btn-primary">Notification</button>
					<Badge
						text="2"
						color="red"
						varient="rounded-solid"
						class="dark:!border-dark-900 badge badge-square badge-solid-red absolute -top-2 -right-2 flex items-center justify-center rounded-full !border-2 !border-white p-0"
					/>
				</div>
				<div class="relative">
					<button type="button" class="btn btn-primary">Notification</button>
					<Badge
						text="2"
						color="green"
						varient="rounded-solid"
						class="dark:!border-dark-900 badge badge-square badge-solid-green absolute -right-2 -bottom-2 flex items-center justify-center rounded-full !border-2 !border-white p-0"
					/>
				</div>

				<div class="relative">
					<button type="button" class="btn btn-primary">Notification</button>
					<Badge
						text="2"
						color="yellow"
						varient="rounded-solid"
						class="dark:!border-dark-900 badge badge-square badge-solid-yellow absolute -top-2 -left-2 flex items-center justify-center rounded-full !border-2 !border-white p-0"
					/>
				</div>

				<div class="relative">
					<button type="button" class="btn btn-primary">Notification</button>
					<Badge
						text="2"
						color="sky"
						varient="rounded-solid"
						class="dark:!border-dark-900 badge badge-square badge-solid-sky absolute -bottom-2 -left-2 flex items-center justify-center rounded-full !border-2 !border-white p-0"
					/>
				</div>
			</div>
		</CardBody>
	</Col><!--end-->

	<Col cols={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Inside Button Badge</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-4">
				<button type="button" class="btn btn-primary"
					>Notification
					<Badge text="2" color="red" varient="rounded-solid" class="badge-square" />
				</button>

				<button type="button" class="btn btn-primary"
					>Notification
					<Badge text="2" color="green" varient="rounded-solid" class="badge-square" />
				</button>
			</div>
		</CardBody>
	</Col><!--end-->
</Grid>
