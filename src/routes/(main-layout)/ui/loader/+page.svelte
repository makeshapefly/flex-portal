<script>
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Loader from '$lib/components/ui/loader/Loader.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Loader" sub_title="UI" />
<Grid cols={1} md={2} gapX="space">
	<Card>
		<CardHeader>
			<CardTitle>Spin Loader</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-4">
				<Loader animation="spin" color="primary" />
				<Loader animation="spin" color="purple" />
				<Loader animation="spin" color="green" />
				<Loader animation="spin" color="red" />
				<Loader animation="spin" color="yellow" />
				<Loader animation="spin" color="sky" />
				<Loader animation="spin" color="pink" />
				<Loader animation="spin" color="dark" />
				<Loader animation="spin" color="light" />
			</div>
		</CardBody>
	</Card><!--spin-->

	<Card>
		<CardHeader>
			<CardTitle>Modern Spin Loader</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-4">
				<Loader animation="spin-2" color="primary" />
				<Loader animation="spin-2" color="purple" />
				<Loader animation="spin-2" color="green" />
				<Loader animation="spin-2" color="red" />
				<Loader animation="spin-2" color="yellow" />
				<Loader animation="spin-2" color="sky" />
				<Loader animation="spin-2" color="pink" />
				<Loader animation="spin-2" color="dark" />
				<Loader animation="spin-2" color="light" />
			</div>
		</CardBody>
	</Card><!--modern spin-->

	<Card>
		<CardHeader>
			<CardTitle>Bounce Loader</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-4">
				<Loader animation="bounce" color="primary" />
				<Loader animation="bounce" color="purple" />
				<Loader animation="bounce" color="green" />
				<Loader animation="bounce" color="red" />
				<Loader animation="bounce" color="yellow" />
				<Loader animation="bounce" color="sky" />
				<Loader animation="bounce" color="pink" />
				<Loader animation="bounce" color="dark" />
				<Loader animation="bounce" color="light" />
			</div>
		</CardBody>
	</Card><!--modern spin-->

	<Card>
		<CardHeader>
			<CardTitle>Ping Loader</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-6">
				<Loader animation="ping" size="size-5" color="primary" />
				<Loader animation="ping" size="size-5" color="purple" />
				<Loader animation="ping" size="size-5" color="green" />
				<Loader animation="ping" size="size-5" color="red" />
				<Loader animation="ping" size="size-5" color="yellow" />
				<Loader animation="ping" size="size-5" color="sky" />
				<Loader animation="ping" size="size-5" color="pink" />
				<Loader animation="ping" size="size-5" color="dark" />
				<Loader animation="ping" size="size-5" color="light" />
			</div>
		</CardBody>
	</Card><!--ping-->

	<Card>
		<CardHeader>
			<CardTitle>Pulse Loader</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-4">
				<Loader animation="pulse" color="primary" />
				<Loader animation="pulse" color="purple" />
				<Loader animation="pulse" color="green" />
				<Loader animation="pulse" color="red" />
				<Loader animation="pulse" color="yellow" />
				<Loader animation="pulse" color="sky" />
				<Loader animation="pulse" color="pink" />
				<Loader animation="pulse" color="dark" />
				<Loader animation="pulse" color="light" />
			</div>
		</CardBody>
	</Card><!--pulse-->

	<Card>
		<CardHeader>
			<CardTitle>Gradient Loader</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-4">
				<span
					class="border-primary-500 inline-block size-8 animate-spin rounded-full border-4 border-r-red-500 border-b-yellow-500 border-l-green-500"
				></span>
				<span
					class="border-primary-500 inline-block size-8 animate-spin rounded-full border-4 border-r-sky-500 border-b-purple-500 border-l-pink-500"
				></span>
				<span
					class="border-primary-200 inline-block size-8 animate-spin rounded-full border-4 border-r-red-200 border-b-yellow-200 border-l-green-200"
				></span>
			</div>
		</CardBody>
	</Card><!--gradient-->

	<Card>
		<CardHeader>
			<CardTitle>Button</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				<div class="relative">
					<button
						class="bg-primary-500 border-primary-500 btn hover:bg-primary-600 hover:border-primary-600 focus:bg-primary-600 focus:border-primary-600 flex items-center gap-2 text-white hover:text-white focus:text-white"
					>
						<i data-lucide="facebook" class="size-4"></i> Facebook
					</button>
					<div
						class="absolute top-0 right-0 -mt-1 -mr-1 h-3 w-3 animate-ping rounded-full bg-red-500"
					></div>
					<div class="absolute top-0 right-0 -mt-1 -mr-1 h-3 w-3 rounded-full bg-red-500"></div>
				</div>
				<div class="relative">
					<button
						class="btn flex items-center gap-2 border-purple-500 bg-purple-500 text-white hover:border-purple-600 hover:bg-purple-600 hover:text-white focus:border-purple-600 focus:bg-purple-600 focus:text-white"
					>
						<i data-lucide="bell-ring" class="size-4"></i> Notification
					</button>
					<div
						class="absolute top-0 right-0 -mt-1 -mr-1 h-3 w-3 animate-ping rounded-full bg-green-500"
					></div>
					<div class="absolute top-0 right-0 -mt-1 -mr-1 h-3 w-3 rounded-full bg-green-500"></div>
				</div>
			</div>
		</CardBody>
	</Card><!--button-->

	<Card>
		<CardHeader>
			<CardTitle>Ovel Shaped Spinner</CardTitle>
		</CardHeader>
		<div class="card-body flex flex-wrap items-center gap-3">
			<div class="relative">
				<div
					class="dark:border-dark-800 size-8 rounded-full border-t-4 border-b-4 border-gray-200"
				></div>
				<div
					class="border-primary-500 absolute top-0 left-0 size-8 animate-spin rounded-full border-t-4 border-b-4"
				></div>
			</div>
			<div class="relative">
				<div
					class="dark:border-dark-800 size-8 rounded-full border-t-4 border-b-4 border-gray-200"
				></div>
				<div
					class="absolute top-0 left-0 size-8 animate-spin rounded-full border-t-4 border-b-4 border-purple-500"
				></div>
			</div>
			<div class="relative">
				<div
					class="dark:border-dark-800 size-8 rounded-full border-t-4 border-b-4 border-gray-200"
				></div>
				<div
					class="absolute top-0 left-0 size-8 animate-spin rounded-full border-t-4 border-b-4 border-green-500"
				></div>
			</div>
			<div class="relative">
				<div
					class="dark:border-dark-800 size-8 rounded-full border-t-4 border-b-4 border-gray-200"
				></div>
				<div
					class="absolute top-0 left-0 size-8 animate-spin rounded-full border-t-4 border-b-4 border-red-500"
				></div>
			</div>
		</div>
	</Card><!--button-->

	<Card>
		<CardHeader>
			<CardTitle>Loading dots</CardTitle>
		</CardHeader>
		<div class="card-body flex flex-wrap items-center gap-3">
			<div class="flex items-center justify-center space-x-1">
				<span class="sr-only">Loading...</span>
				<div
					class="dark:bg-dark-300 size-3 animate-bounce rounded-full bg-gray-900 [animation-delay:-0.3s]"
				></div>
				<div
					class="dark:bg-dark-300 size-3 animate-bounce rounded-full bg-gray-900 [animation-delay:-0.15s]"
				></div>
				<div class="dark:bg-dark-300 size-3 animate-bounce rounded-full bg-gray-900"></div>
			</div>
			<div class="flex items-center justify-center space-x-1">
				<span class="sr-only">Loading...</span>
				<div
					class="bg-primary-500 size-3 animate-bounce rounded-full [animation-delay:-0.3s]"
				></div>
				<div
					class="bg-primary-500 size-3 animate-bounce rounded-full [animation-delay:-0.15s]"
				></div>
				<div class="bg-primary-500 size-3 animate-bounce rounded-full"></div>
			</div>

			<div class="flex items-center justify-center space-x-1">
				<span class="sr-only">Loading...</span>
				<div class="size-3 animate-bounce rounded-full bg-green-500 [animation-delay:-0.3s]"></div>
				<div
					class="bg-primary-500 size-3 animate-bounce rounded-full [animation-delay:-0.15s]"
				></div>
				<div class="size-3 animate-bounce rounded-full bg-purple-500"></div>
			</div>
		</div>
	</Card><!--button-->
</Grid>
