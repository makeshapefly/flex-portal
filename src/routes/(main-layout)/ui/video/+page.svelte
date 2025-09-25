<script>
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Video" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} md={{ span: 6 }}>
		<Card>
			<CardHeader>
				<CardTitle>Aspect Auto</CardTitle>
			</CardHeader>
			<CardBody>
				<iframe
					class="aspect-video w-full rounded-xl"
					src="https://www.youtube.com/embed/DxcJbrs6rKk?si=r9xt6eHRj0kayf8d"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			</CardBody>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Aspect Video (16 / 9)</CardTitle>
			</CardHeader>
			<CardBody>
				<iframe
					class="aspect-video w-full rounded-xl"
					src="https://www.youtube.com/embed/Tmkr2kKUEgU?si=g6q_jn3gzqxK_CMj"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			</CardBody>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Aspect Video (21 / 9)</CardTitle>
			</CardHeader>
			<CardBody>
				<iframe
					class="aspect-21/9 w-full rounded-xl"
					src="https://www.youtube.com/embed/eSzNNYk7nVU?si=EHJjJ8BjAsp6yMgx"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			</CardBody>
		</Card>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }}>
		<Card>
			<CardHeader>
				<CardTitle>Aspect Square (1 / 1)</CardTitle>
			</CardHeader>
			<CardBody>
				<iframe
					class="aspect-square w-full rounded-xl"
					src="https://www.youtube.com/embed/MAtaT8BZEAo?si=iyOi2lREUWB35ct6"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			</CardBody>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Aspect Square 4 / 3</CardTitle>
			</CardHeader>
			<CardBody>
				<iframe
					class="aspect-4/3 w-full rounded-xl"
					src="https://www.youtube.com/embed/WJDw1J7FZnE?si=K3rzRikfvdzhJjI_"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			</CardBody>
		</Card>
	</Col>
</Grid>
