<script>
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="UI Links" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Col span={12} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Basic Links</CardTitle>
		</CardHeader>
		<CardBody class="flex flex-wrap items-center gap-3">
			<a href="#!" class="link link-primary">Basic Links</a>
			<a
				href="#!"
				class="link dark:text-dark-50 hover:text-primary-500 dark:hover:text-primary-500 text-gray-800"
				>Basic Links</a
			>
		</CardBody>
	</Col><!--end col-->
	<Col span={12} md={{ span: 6 }} class="card">
		<CardHeader>
			<h6 class="card-title">Underline Links</h6>
		</CardHeader>
		<CardBody class="flex flex-wrap items-center gap-3">
			<a href="#!" class="link link-primary underline">Basic Underline Links</a>
			<a
				href="#!"
				class="link dark:text-dark-50 hover:text-primary-500 dark:hover:text-primary-500 text-gray-800 underline"
				>Basic Underline Links</a
			>
		</CardBody>
	</Col><!--end col-->
	<Col span={12} md={{ span: 6 }} class="card">
		<CardHeader>
			<h6 class="card-title">Underline Hover Links</h6>
		</CardHeader>
		<CardBody class="flex flex-wrap items-center gap-3">
			<a href="#!" class="link link-primary no-underline hover:underline">hover Underline Links</a>
			<a
				href="#!"
				class="link dark:text-dark-50 hover:text-primary-500 dark:hover:text-primary-500 text-gray-800 no-underline hover:underline"
				>Hover Underline Links</a
			>
		</CardBody>
	</Col><!--end col-->
	<Col span={12} md={{ span: 6 }} class="card">
		<CardHeader>
			<h6 class="card-title">Hover Links</h6>
		</CardHeader>
		<CardBody class="flex flex-wrap items-center gap-3">
			<a href="#!" class="link link-primary underline hover:no-underline"
				>hover No Underline Links</a
			>
			<a
				href="#!"
				class="link dark:text-dark-50 hover:text-primary-500 text-gray-800 underline hover:no-underline"
				>hover No Underline Links</a
			>
		</CardBody>
	</Col><!--end col-->
	<div class="card col-span-12 md:col-span-4">
		<CardHeader>
			<h6 class="card-title">Colored Links</h6>
		</CardHeader>
		<CardBody class="flex flex-col gap-3">
			<a href="#!" class="link link-primary">Primary Basic Links</a>
			<a href="#!" class="link link-purple">Purple Basic Links</a>
			<a href="#!" class="link link-green">Green Basic Links</a>
			<a href="#!" class="link link-red">Red Basic Links</a>
			<a href="#!" class="link link-yellow">Yellow Basic Links</a>
			<a href="#!" class="link link-sky">Sky Basic Links</a>
			<a href="#!" class="link link-pink">Pink Basic Links</a>
			<a href="#!" class="link link-indigo">Indigo Basic Links</a>
			<a href="#!" class="link link-orange">Orange Basic Links</a>
		</CardBody>
	</div>
	<!--end col-->
	<div class="card col-span-12 md:col-span-4">
		<CardHeader>
			<h6 class="card-title">Underline Colored Links</h6>
		</CardHeader>
		<CardBody class="flex flex-col gap-3">
			<a href="#!" class="link link-primary underline">Primary Basic Links</a>
			<a href="#!" class="link link-purple underline">Purple Basic Links</a>
			<a href="#!" class="link link-green underline">Green Basic Links</a>
			<a href="#!" class="link link-red underline">Red Basic Links</a>
			<a href="#!" class="link link-yellow underline">Yellow Basic Links</a>
			<a href="#!" class="link link-sky underline">Sky Basic Links</a>
			<a href="#!" class="link link-pink underline">Pink Basic Links</a>
			<a href="#!" class="link link-indigo underline">Indigo Basic Links</a>
			<a href="#!" class="link link-orange underline">Orange Basic Links</a>
		</CardBody>
	</div>
	<!--end col-->
	<div class="card col-span-12 md:col-span-4">
		<CardHeader>
			<h6 class="card-title">Underline Hover Colored Links</h6>
		</CardHeader>
		<CardBody class="flex flex-col gap-3">
			<a href="#!" class="link link-line-primary">Primary Basic Links</a>
			<a href="#!" class="link link-line-purple">Purple Basic Links</a>
			<a href="#!" class="link link-line-green">Green Basic Links</a>
			<a href="#!" class="link link-line-red">Red Basic Links</a>
			<a href="#!" class="link link-line-yellow">Yellow Basic Links</a>
			<a href="#!" class="link link-line-sky">Sky Basic Links</a>
			<a href="#!" class="link link-line-pink">Pink Basic Links</a>
			<a href="#!" class="link link-line-indigo">Indigo Basic Links</a>
			<a href="#!" class="link link-line-orange">Orange Basic Links</a>
		</CardBody>
	</div>
	<!--end col-->
	<div class="card col-span-12 md:col-span-12">
		<CardHeader>
			<h6 class="card-title">Icon with Links</h6>
		</CardHeader>
		<CardBody class="flex items-center gap-4">
			<a href="#!" class="link link-primary group/item">
				Read More
				<LucideIcon
					name="MoveRight"
					class="inline-block size-4 transition duration-200 ease-linear group-hover/item:translate-x-0.5 rtl:hidden"
				/>
				<LucideIcon
					name="MoveLeft"
					class="size-4 transition duration-200 ease-linear group-hover/item:-translate-x-0.5 ltr:hidden rtl:inline-block"
				/>
			</a>
			<a href="#!" class="link link-red group/item"
				><LucideIcon
					name="Trash2"
					class="inline-block size-4 transition duration-200 ease-linear group-hover/item:animate-bounce"
				/> Delete</a
			>
			<a href="#!" class="link link-primary group/item"
				><LucideIcon
					name="Clipboard"
					class="inline-block size-4 transition duration-200 ease-linear group-hover/item:-translate-y-0.5"
				/> Copy Content</a
			>
		</CardBody>
	</div>
	<!--end col-->
</Grid>
