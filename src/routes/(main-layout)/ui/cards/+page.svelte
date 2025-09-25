<script>
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardFooter from '$lib/components/ui/card/CardFooter.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import ColorCard from '$lib/components/ui/card/ColorCard.svelte';
	import EditCard from '$lib/components/ui/card/EditCard.svelte';
	import FollowButton from '$lib/components/ui/card/FollowButton.svelte';
	import HoverCard from '$lib/components/ui/card/HoverCard.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
	import {
		cards,
		profiles,
		hoverCards,
		colors,
		galleryItems,
		galleryOverlayItems
	} from './cards-data';
</script>

<PageHeading title="Cards" sub_title="UI" />
<Grid cols={12} gapX="space">
	{#each cards as card}
		<Col cols={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }}>
			<Card>
				{#if card.header}
					<CardHeader>
						<CardTitle>{card.header}</CardTitle>
					</CardHeader>
				{/if}

				<CardBody>
					<p class="dark:text-dark-500 text-gray-500">{card.body}</p>
				</CardBody>

				{#if card.footer}
					<CardFooter>
						<CardTitle>{card.footer}</CardTitle>
					</CardFooter>
				{/if}
			</Card>
		</Col>
	{/each}
</Grid>

<Grid cols={12} gapX="space">
	{#each profiles as profile}
		<Col cols={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }}>
			<Card>
				<div class="h-32 overflow-hidden rounded-t-md">
					<img class="w-full object-cover object-center" src={profile.cover} alt="Gallery" />
				</div>
				<div
					class="dark:border-dark-900 relative mx-auto -mt-16 size-32 overflow-hidden rounded-full border-4 border-white"
				>
					<img class="size-32 object-cover object-center" src={profile.avatar} alt={profile.name} />
				</div>
				<div class="mt-2 text-center">
					<h5 class="text-16">{profile.name}</h5>
					<p class="dark:text-dark-500 text-sm text-gray-500">{profile.role}</p>
				</div>
				<ul class="mt-2 flex items-center justify-around py-4">
					<li class="flex flex-col items-center justify-around">
						<LucideIcon name="Star" class="mb-2 block size-5 text-yellow-500" />
						<h6>{profile.stars}</h6>
					</li>
					<li class="flex flex-col items-center justify-between">
						<LucideIcon name="Users" class="text-primary-500 mb-2 block size-5" />
						<h6>{profile.followers}</h6>
					</li>
					<li class="flex flex-col items-center justify-around">
						<LucideIcon name="BriefcaseBusiness" class="mb-2 block size-5 text-green-500" />
						<div>{profile.projects}</div>
					</li>
				</ul>
				<CardFooter class="mx-8 mt-2">
					<FollowButton />
				</CardFooter>
			</Card>
		</Col>
	{/each}
</Grid>

<h5 class="mt-2 mb-5 underline">Card Hover Effect:</h5>
<Grid cols={12} gapX="space">
	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }}>
		<div
			class="card group/item relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
		>
			<CardBody>
				<HoverCard />
			</CardBody>
		</div>
	</Col>
	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }}>
		<div
			class="card group/item relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
		>
			<CardBody>
				<HoverCard color="purple" />
			</CardBody>
		</div>
	</Col>
	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }}>
		<div
			class="card group/item relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
		>
			<CardBody class="bg-opacity-10">
				<HoverCard color="green" />
			</CardBody>
		</div>
	</Col>
	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }}>
		<div
			class="card group/item relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
		>
			<CardBody class="bg-opacity-10">
				<HoverCard color="yellow" />
			</CardBody>
		</div>
	</Col>
	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }}>
		<div
			class="card group/item relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
		>
			<CardBody>
				<div class="relative z-10 mx-auto max-w-md">
					<div
						class="text-primary-500 bg-primary-500/15 grid size-20 place-items-center rounded-full transition-all duration-500"
					>
						<LucideIcon name="Airplay" class="size-8" />
					</div>
					<div
						class="dark:text-dark-500 space-y-6 pt-5 text-base leading-7 text-gray-500 transition-all duration-500"
					>
						<p>
							Perfect for learning how the framework works, prototyping a new idea, or creating a
							demo to share online.
						</p>
					</div>
					<div class="pt-5">
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a href="#" class="text-primary-500 font-medium transition-all duration-500"
							>Read the docs <LucideIcon name="MoveRight" class="ml-1 inline-block size-4" /></a
						>
					</div>
				</div>
			</CardBody>
		</div>
	</Col>
	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }}>
		<div
			class="card group/item relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
		>
			<CardBody>
				<div class="relative z-10 mx-auto max-w-md">
					<div
						class="grid size-20 place-items-center rounded-full bg-purple-500/15 text-purple-500 transition-all duration-500"
					>
						<LucideIcon name="Airplay" class="size-8" />
					</div>
					<div
						class="dark:text-dark-500 space-y-6 pt-5 text-base leading-7 text-gray-500 transition-all duration-500"
					>
						<p>
							Perfect for learning how the framework works, prototyping a new idea, or creating a
							demo to share online.
						</p>
					</div>
					<div class="pt-5">
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a href="#" class="font-medium text-purple-500 transition-all duration-500"
							>Read the docs <LucideIcon name="MoveRight" class="ml-1 inline-block size-4" /></a
						>
					</div>
				</div>
			</CardBody>
		</div>
	</Col>
	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }}>
		<div
			class="card group/item relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
		>
			<CardBody>
				<div class="relative z-10 mx-auto max-w-md">
					<div
						class="grid size-20 place-items-center rounded-full bg-orange-500/15 text-orange-500 transition-all duration-500"
					>
						<LucideIcon name="Airplay" class="size-8" />
					</div>
					<div
						class="dark:text-dark-500 space-y-6 pt-5 text-base leading-7 text-gray-500 transition-all duration-500"
					>
						<p>
							Perfect for learning how the framework works, prototyping a new idea, or creating a
							demo to share online.
						</p>
					</div>
					<div class="pt-5">
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a href="#" class="font-medium text-orange-500 transition-all duration-500"
							>Read the docs <LucideIcon name="MoveRight" class="ml-1 inline-block size-4" /></a
						>
					</div>
				</div>
			</CardBody>
		</div>
	</Col>
	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 3 }}>
		<div
			class="card group/item relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
		>
			<CardBody>
				<div class="relative z-10 mx-auto max-w-md">
					<div
						class="grid size-20 place-items-center rounded-full bg-green-500/15 text-green-500 transition-all duration-500"
					>
						<LucideIcon name="Airplay" class="size-8" />
					</div>
					<div
						class="dark:text-dark-500 space-y-6 pt-5 text-base leading-7 text-gray-500 transition-all duration-500"
					>
						<p>
							Perfect for learning how the framework works, prototyping a new idea, or creating a
							demo to share online.
						</p>
					</div>
					<div class="pt-5">
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a href="#" class="font-medium text-green-500 transition-all duration-500"
							>Read the docs <LucideIcon name="MoveRight" class="ml-1 inline-block size-4" /></a
						>
					</div>
				</div>
			</CardBody>
		</div>
	</Col>
</Grid>

<h5 class="mt-2 mb-5 underline">Card Colored:</h5>

<Grid cols={12} gapX="space">
	{#each colors as color}
		<ColorCard {color} />
	{/each}
</Grid>

<h5 class="mt-2 mb-5 underline">Fancy Card:</h5>

<Grid cols={12} gapX="space">
	{#each galleryItems as item}
		<Col
			col={{ span: 12 }}
			class="card border-0 !bg-transparent shadow-none sm:col-span-6 xl:col-span-4"
		>
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="javascript:void(0)">
				<img class="rounded-md" src={item.img} alt="Gallery" />
			</a>
			<div class="card-body dark:bg-dark-950 relative mx-10 -mt-16 rounded-md bg-white">
				<h5 class="mb-3">
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a href="#" class="hover:text-primary-500 transition duration-500 ease-in-out">
						{item.title}
					</a>
				</h5>
				<p class="dark:text-dark-500 text-gray-500">
					{item.description}
				</p>
				<p class="dark:text-dark-500 mt-4 text-sm text-gray-500">
					By
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a href="#" class="text-primary-500 transition duration-500 ease-in-out">
						{item.author}
					</a>
					| in {#each item.categories as category, index}
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a href="#" class="text-primary-500 transition duration-500 ease-in-out">
							{category}{index !== item.categories.length - 1 ? ',' : ''}
						</a>
					{/each}
				</p>
			</div>
		</Col>
	{/each}
</Grid>

<h5 class="mt-2 mb-5 underline">Overlay Card:</h5>

<div class="gap-x-space grid grid-cols-12">
	{#each galleryOverlayItems as item}
		<div class="card relative col-span-12 overflow-hidden border-0 sm:col-span-6 xl:col-span-4">
			<img src={item.img} alt="Gallery" />
			<div class="absolute inset-0 bg-gradient-to-t {item.gradient}"></div>
			<div class="card-body absolute inset-0 z-10 flex items-end">
				<div>
					<h3 class="mt-3 text-white">{item.title}</h3>
					{#if item.description}
						<p class="text-white/75">{item.description}</p>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>

<h5 class="mt-2 mb-5 underline">Edit Cards:</h5>
<Grid cols={12} gapx="space">
	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }}>
		<EditCard />
	</Col>
</Grid>
