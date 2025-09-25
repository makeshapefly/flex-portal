<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Gallery from '$lib/components/ui/gallery/Gallery.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Gallery" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Basic Gallery</CardTitle>
		</CardHeader>
		<CardBody>
			<Grid cols={12} gap={5}>
				<Col cols={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }}>
					<div class="group/item relative h-80 overflow-hidden rounded-md">
						<img
							src="/assets/images/gallery/img-01.jpg"
							alt=""
							class="duration-800s ease-effect h-full w-full object-cover transition group-hover/item:scale-125"
						/>
						<div
							class="absolute inset-0 flex items-end bg-gradient-to-t from-gray-900/50 p-5 text-white"
						>
							<div>
								<h5 class="mb-1">Gallery Title</h5>
								<p class="text-white/75">Subtitle</p>
							</div>
						</div>
					</div>
				</Col><!--end col-->
				<Col cols={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 8 }}>
					<div class="group/item relative h-80 overflow-hidden rounded-md">
						<img
							src="/assets/images/gallery/long/img-02.jpg"
							alt=""
							class="duration-800s ease-effect h-full w-full object-cover transition group-hover/item:scale-125"
						/>
						<div
							class="absolute inset-0 flex items-end bg-gradient-to-t from-gray-900/50 p-5 text-white"
						>
							<div>
								<h5 class="mb-1">Gallery Title</h5>
								<p class="text-white/75">Subtitle</p>
							</div>
						</div>
					</div>
				</Col><!--end col-->
				<Col cols={{ span: 12 }} sm={{ span: 6 }} lg={{ span: 4 }} xl={{ span: 6 }}>
					<div class="group/item relative h-80 overflow-hidden rounded-md">
						<img
							src="/assets/images/gallery/long/img-03.jpg"
							alt=""
							class="duration-800s ease-effect h-full w-full object-cover transition group-hover/item:scale-125"
						/>
						<div
							class="absolute inset-0 flex items-end bg-gradient-to-t from-gray-900/50 p-5 text-white"
						>
							<div>
								<h5 class="mb-1">Gallery Title</h5>
								<p class="text-white/75">Subtitle</p>
							</div>
						</div>
					</div>
				</Col><!--end col-->
				<Col cols={{ span: 12 }} sm={{ span: 6 }} lg={{ span: 4 }} xl={{ span: 3 }}>
					<div class="group/item relative h-80 overflow-hidden rounded-md">
						<img
							src="/assets/images/gallery/img-05.jpg"
							alt=""
							class="duration-800s ease-effect h-full w-full object-cover transition group-hover/item:scale-125"
						/>
						<div
							class="absolute inset-0 flex items-end bg-gradient-to-t from-gray-900/50 p-5 text-white"
						>
							<div>
								<h5 class="mb-1">Gallery Title</h5>
								<p class="text-white/75">Subtitle</p>
							</div>
						</div>
					</div>
				</Col><!--end col-->
				<Col cols={{ span: 12 }} sm={{ span: 6 }} lg={{ span: 4 }} xl={{ span: 3 }}>
					<div class="group/item relative h-80 overflow-hidden rounded-md">
						<img
							src="/assets/images/gallery/img-06.jpg"
							alt=""
							class="duration-800s ease-effect h-full w-full object-cover transition group-hover/item:scale-125"
						/>
						<div
							class="absolute inset-0 flex items-end bg-gradient-to-t from-gray-900/50 p-5 text-white"
						>
							<div>
								<h5 class="mb-1">Gallery Title</h5>
								<p class="text-white/75">Subtitle</p>
							</div>
						</div>
					</div>
				</Col><!--end col-->
			</Grid>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Masonry With Lightbox Gallery</CardTitle>
		</CardHeader>
		<CardBody>
			<Gallery />
		</CardBody>
	</Col>
</Grid>
