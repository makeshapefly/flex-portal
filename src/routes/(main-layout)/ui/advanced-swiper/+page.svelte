<script>
	// @ts-nocheck
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Pagination } from 'swiper/modules';
	import 'swiper/css';
	import 'swiper/css/pagination';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	onMount(() => {
		// Initialize Swiper instances
		const basicSwiper = new Swiper('.mySwiper', {
			modules: [Pagination]
		});

		const paginationDynamicSlider = new Swiper('.paginationDynamicSlider', {
			modules: [Pagination],
			pagination: {
				el: '.paginationDynamicSlider .swiper-pagination',
				dynamicBullets: true
			}
		});

		const paginationSwiper = new Swiper('.pagination-swiper', {
			modules: [Pagination],
			pagination: {
				el: '.pagination-swiper .swiper-pagination',
				clickable: true
			}
		});

		const verticalSlider = new Swiper('.verticalSlider', {
			modules: [Pagination],
			direction: 'vertical',
			pagination: {
				el: '.verticalSlider .swiper-pagination',
				clickable: true
			}
		});

		const grabCursorSlider = new Swiper('.grabCursorSlider', {
			modules: [Pagination],
			slidesPerView: 1,
			centeredSlides: true,
			spaceBetween: 30,
			grabCursor: true,
			pagination: {
				el: '.grabCursorSlider .swiper-pagination',
				clickable: true
			},
			breakpoints: {
				375: { slidesPerView: 1.5, spaceBetween: 20 },
				557: { slidesPerView: 2, spaceBetween: 20 },
				1024: { slidesPerView: 3, spaceBetween: 20 },
				1200: { slidesPerView: 4, spaceBetween: 20 }
			}
		});

		const slidersPerView = new Swiper('.slidersPerView', {
			modules: [Pagination],
			slidesPerView: 1,
			spaceBetween: 30,
			pagination: {
				el: '.slidersPerView .swiper-pagination',
				clickable: true
			},
			breakpoints: {
				375: { slidesPerView: 1.5, spaceBetween: 20 },
				557: { slidesPerView: 2, spaceBetween: 20 },
				1024: { slidesPerView: 3, spaceBetween: 20 }
			}
		});
	});
</script>

<PageHeading title="Swiper" sub_title="UI Advanced" />
<Grid cols={12} gapX="space">
	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Basic Slider</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="swiper mySwiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-01.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-02.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-03.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-04.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
				</div>
			</div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Pagination Slider</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="swiper paginationDynamicSlider">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-05.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-06.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-03.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-02.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Pagination</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="swiper pagination-swiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-03.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-04.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-05.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-06.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Vertical</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="swiper verticalSlider h-[445px]">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-05.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-06.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-03.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-02.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Grab cursor</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="swiper grabCursorSlider">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-05.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-06.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-03.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-02.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Slides per view</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="swiper slidersPerView">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-05.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-06.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-03.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-02.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
					<div class="swiper-slide">
						<img
							src="/assets/images/gallery/img-04.jpg"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</CardBody>
	</Col>
</Grid>

<div class="mb-5 text-center">
	<a
		href="https://swiperjs.com/demos"
		target="_blank"
		class="btn bg-primary-500 border-primary-500 hover:bg-primary-600 hover:border-primary-600 focus:bg-primary-600 focus:border-primary-600 text-white hover:-translate-y-0.5 hover:text-white focus:text-white"
		>View All Demos <LucideIcon name="MoveRight" class="ml-1 inline-block size-4" /></a
	>
</div>
