<script>
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Lucid from '$lib/components/Icons/Icons-lucide/Lucid.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Lucide" sub_title="Icons" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader class="flex items-center">
			<h6 class="text-15 grow">Lucide Icons</h6>
			<a
				href="https://lucide.dev/icons"
				target="_blank"
				class="shrink-0 font-medium text-red-500 underline transition duration-200 ease-linear hover:text-red-600"
				>View All Icons</a
			>
		</CardHeader>
		<CardBody>
			<Lucid />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Color Icons</CardTitle>
		</CardHeader>
		<CardBody>
			<div
				class="dark:*:border-dark-800 flex flex-wrap items-center gap-2 *:flex *:size-10 *:items-center *:justify-center *:rounded-md *:border *:border-gray-200"
			>
				<div><LucideIcon name="Award" class="dark:text-dark-500 size-5 text-gray-500" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-5" /></div>
				<div><LucideIcon name="Bot" class="size-5 text-green-500" /></div>
				<div><LucideIcon name="ChefHat" class="size-5 text-yellow-500" /></div>
				<div><LucideIcon name="Camera" class="size-5 text-purple-500" /></div>
				<div><LucideIcon name="FileText" class="size-5 text-red-500" /></div>
				<div><LucideIcon name="Globe" class="size-5 text-sky-500" /></div>
			</div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Stroke Width</CardTitle>
		</CardHeader>
		<CardBody>
			<div
				class="dark:*:border-dark-800 flex items-center gap-2 *:flex *:size-10 *:items-center *:justify-center *:rounded-md *:border *:border-gray-200"
			>
				<div><LucideIcon name="Box" class="text-primary-500 size-5 stroke-1" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-5 stroke-2" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-5 stroke-3" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-5 stroke-4" /></div>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Sizes Icons</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<div><LucideIcon name="Box" class="text-primary-500 size-2" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-2.5" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-3" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-3.5" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-4" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-5" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-6" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-7" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-8" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-9" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-10" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-11" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-12" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-14" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-16" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-20" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-24" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-28" /></div>
				<div><LucideIcon name="Box" class="text-primary-500 size-32" /></div>
			</div>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Duotune Icons</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-5">
				<div><LucideIcon name="Apple" class="text-primary-500 fill-primary-500/20 size-6" /></div>
				<div><LucideIcon name="Heart" class="size-6 fill-red-500/20 text-red-500" /></div>
				<div>
					<LucideIcon name="ShoppingCart" class="size-6 fill-green-500/20 text-green-500" />
				</div>
				<div><LucideIcon name="Bell" class="size-6 fill-sky-500/20 text-sky-500" /></div>
				<div>
					<LucideIcon name="ShoppingBag" class="size-6 fill-purple-500/20 text-purple-500" />
				</div>
				<div>
					<LucideIcon name="CalendarDays" class="size-6 fill-yellow-500/20 text-yellow-500" />
				</div>
				<div><LucideIcon name="Building2" class="size-6 fill-pink-500/20 text-pink-500" /></div>
			</div>
		</CardBody>
	</Col>
	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Hover Duotune Icons</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-5">
				<a href="#!"
					><LucideIcon
						name="Apple"
						class="text-primary-500 hover:fill-primary-500/20 size-6 transition duration-300 ease-linear"
					/></a
				>
				<a href="#!"
					><LucideIcon
						name="Heart"
						class="size-6 text-red-500 transition duration-300 ease-linear hover:fill-red-500/20"
					/></a
				>
				<a href="#!"
					><LucideIcon
						name="ShoppingCart"
						class="size-6 text-green-500 transition duration-300 ease-linear hover:fill-green-500/20"
					/></a
				>
				<a href="#!"
					><LucideIcon
						name="Bell"
						class="size-6 text-sky-500 transition duration-300 ease-linear hover:fill-sky-500/20"
					/></a
				>
				<a href="#!"
					><LucideIcon
						name="ShoppingBag"
						class="size-6 text-purple-500 transition duration-300 ease-linear hover:fill-purple-500/20"
					/></a
				>
				<a href="#!"
					><LucideIcon
						name="CalendarDays"
						class="size-6 text-yellow-500 transition duration-300 ease-linear hover:fill-yellow-500/20"
					/></a
				>
				<a href="#!"
					><LucideIcon
						name="Building2"
						class="size-6 text-pink-500 transition duration-300 ease-linear hover:fill-pink-500/20"
					/></a
				>
			</div>
		</CardBody>
	</Col>
</Grid>
