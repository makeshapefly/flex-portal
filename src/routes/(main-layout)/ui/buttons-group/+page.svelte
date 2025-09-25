<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Button from '$lib/components/ui/buttons/Button.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import LoadingButton from '$lib/components/ui/buttons/LoadingButton.svelte';
	import ButtonGroup from '$lib/components/ui/buttons/ButtonGroup.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Buttons Group" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>Horizontal Group</CardTitle>
		</CardHeader>
		<CardBody>
			<Grid cols={1} gap="space" sm={2}>
				<ButtonGroup>
					<Button color="primary" text="Left" />
					<Button color="primary" text="Middle" />
					<Button color="primary" text="Right" />
				</ButtonGroup>

				<ButtonGroup>
					<Button color="primary" varient="outline" text="Left" />
					<Button color="primary" varient="outline" text="Middle" />
					<Button color="primary" varient="outline" text="Right" />
				</ButtonGroup>

				<ButtonGroup>
					<Button color="purple" varient="soft" text="Left" />
					<Button color="purple" varient="soft" text="Middle" />
					<Button color="purple" varient="soft" text="Right" />
				</ButtonGroup>

				<ButtonGroup>
					<Button color="purple" text="Left" />
					<Button color="green" text="Middle" />
					<Button color="primary" text="Right" />
				</ButtonGroup>
			</Grid>
		</CardBody>
	</Card><!--end col-->

	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>Vertical Group</CardTitle>
		</CardHeader>
		<CardBody>
			<Grid cols={2} gap={5}>
				<ButtonGroup varient="vertical">
					<Button color="primary" text="Button" />
					<Button color="primary" text="Button" />
					<Button color="primary" text="Button" />
				</ButtonGroup>
				<ButtonGroup varient="vertical">
					<Button color="primary" varient="outline" text="Button" />
					<Button color="primary" varient="outline" text="Button" />
					<Button color="primary" varient="outline" text="Button" />
				</ButtonGroup>
			</Grid>
		</CardBody>
	</Card><!--end col-->
</Grid><!--end grid-->
