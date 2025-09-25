<script>
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import LineIcons from '$lib/components/Icons/icons-line-awesome/LineIcons.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import 'line-awesome/dist/line-awesome/css/line-awesome.css';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Line Awesome" sub_title="Icons" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader class="flex flex-col gap-2 md:flex-row md:items-center">
			<h6 class="text-15 grow">Line Awesome Icons</h6>
			<a
				href="https://icons8.com/line-awesome"
				target="_blank"
				class="shrink-0 font-medium text-red-500 underline transition duration-200 ease-linear hover:text-red-600"
				>View All Icons <LucideIcon name="MoveRight" class="ml-1 inline-block size-4" /></a
			>
		</CardHeader>
		<CardBody>
			<LineIcons />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Color Icons</CardTitle>
		</CardHeader>
		<CardBody>
			<div
				class="dark:*:border-dark-800 flex flex-wrap items-center gap-2 text-xl *:flex *:size-10 *:items-center *:justify-center *:rounded-md *:border *:border-gray-200"
			>
				<div><i class="las la-battery-three-quarters text-primary-500"></i></div>
				<div><i class="dark:text-dark-500 las la-radiation text-gray-500"></i></div>
				<div><i class="las la-angle-double-right text-green-500"></i></div>
				<div><i class="las la-photo-video text-purple-500"></i></div>
				<div><i class="las la-campground text-yellow-500"></i></div>
				<div><i class="lab la-modx text-sky-500"></i></div>
			</div>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Sizes Icons</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<div><i class="las la-battery-three-quarters text-primary-500 text-xs"></i></div>
				<div><i class="las la-battery-three-quarters text-primary-500 text-14"></i></div>
				<div><i class="las la-battery-three-quarters text-primary-500"></i></div>
				<div><i class="las la-battery-three-quarters text-primary-500 text-16"></i></div>
				<div><i class="las la-battery-three-quarters text-primary-500 text-lg"></i></div>
				<div><i class="las la-battery-three-quarters text-primary-500 text-xl"></i></div>
				<div><i class="las la-battery-three-quarters text-primary-500 text-2xl"></i></div>
				<div><i class="las la-battery-three-quarters text-primary-500 text-3xl"></i></div>
				<div><i class="las la-battery-three-quarters text-primary-500 text-4xl"></i></div>
				<div><i class="las la-battery-three-quarters text-primary-500 text-5xl"></i></div>
				<div><i class="las la-battery-three-quarters text-primary-500 text-6xl"></i></div>
				<div><i class="las la-battery-three-quarters text-primary-500 text-8xl"></i></div>
			</div>
		</CardBody>
	</Col>
</Grid>
