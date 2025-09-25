<script>
	import BoxIcon from '$lib/components/Icons/icons-boxicon/BoxIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import 'boxicons/css/boxicons.min.css';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Boxicon" sub_title="Icons" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader class="flex items-center">
			<h6 class="text-15 grow">Box Icons</h6>
			<a
				href="https://boxicons.com/"
				target="_blank"
				class="shrink-0 font-medium text-red-500 underline transition duration-200 ease-linear hover:text-red-600"
				>View All Icons</a
			>
		</CardHeader>
		<CardBody>
			<BoxIcon />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Color Icons</CardTitle>
		</CardHeader>
		<CardBody>
			<div
				class="dark:*:border-dark-800 flex flex-wrap items-center gap-2 text-xl *:flex *:size-10 *:items-center *:justify-center *:rounded-md *:border *:border-gray-200"
			>
				<div><i class="bx bxs-balloon"></i></div>
				<div><i class="bx bx-color"></i></div>
				<div><i class="bx bx-qr"></i></div>
				<div><i class="bx bxl-unity"></i></div>
				<div><i class="bx bx-chat"></i></div>
				<div><i class="bx bx-search-alt-2"></i></div>
				<div><i class="bx bx-receipt"></i></div>
			</div>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Using SVG Code</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex items-center gap-5">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						class="fill-primary-500 size-6"
					>
						<path
							d="M21 11h-3V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6a1 1 0 0 0-1-1zM5 19a1 1 0 0 1-1-1V5h12v13c0 .351.061.688.171 1H5zm15-1a1 1 0 0 1-2 0v-5h2v5z"
						></path>
						<path d="M6 7h8v2H6zm0 4h8v2H6zm5 4h3v2h-3z"></path>
					</svg>
				</div>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						class="size-6 fill-pink-500"
					>
						<path
							d="M19 8.001h-4V4.999a2.92 2.92 0 0 0-.874-2.108 2.943 2.943 0 0 0-2.39-.879C10.202 2.144 9 3.508 9 5.117V8H5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-9.999c0-1.103-.897-2-2-2zM5 10h6V5.117c0-.57.407-1.07 1.002-1.117.266 0 .512.103.712.307a.956.956 0 0 1 .286.692V10h.995l.005.001h5V12H5v-2zm0 10v-6h14l.002 6H5z"
						></path>
					</svg>
				</div>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						class="size-6 fill-sky-500"
					>
						<path
							d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
						></path>
						<path
							d="M14.829 14.828a4.055 4.055 0 0 1-1.272.858 4.002 4.002 0 0 1-4.875-1.45l-1.658 1.119a6.063 6.063 0 0 0 1.621 1.62 5.963 5.963 0 0 0 2.148.903 6.042 6.042 0 0 0 2.415 0 5.972 5.972 0 0 0 2.148-.903c.313-.212.612-.458.886-.731.272-.271.52-.571.734-.889l-1.658-1.119a4.017 4.017 0 0 1-.489.592z"
						></path>
						<circle cx="8.5" cy="10.5" r="1.5"></circle>
						<circle cx="15.493" cy="10.493" r="1.493"></circle>
					</svg>
				</div>
			</div>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Sizes Icons</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<div><i class="bx bx-qr text-xs"></i></div>
				<div><i class="bx bx-qr text-14"></i></div>
				<div><i class="bx bx-qr"></i></div>
				<div><i class="bx bx-qr text-16"></i></div>
				<div><i class="bx bx-qr text-lg"></i></div>
				<div><i class="bx bx-qr text-xl"></i></div>
				<div><i class="bx bx-qr text-2xl"></i></div>
				<div><i class="bx bx-qr text-3xl"></i></div>
				<div><i class="bx bx-qr text-4xl"></i></div>
				<div><i class="bx bx-qr text-5xl"></i></div>
				<div><i class="bx bx-qr text-6xl"></i></div>
			</div>
		</CardBody>
	</Col>
</Grid>
