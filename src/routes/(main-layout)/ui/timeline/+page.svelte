<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import TimeLine from '$lib/components/ui/timeline/TimeLine.svelte';
	import TimeLineItem from '$lib/components/ui/timeline/TimeLineItem.svelte';
	import { LucidePlus } from 'lucide-svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Timeline" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Basic Timeline</CardTitle>
		</CardHeader>
		<CardBody>
			<TimeLine>
				<TimeLineItem color="primary">Dark, Light with RTL Supported</TimeLineItem>
				<TimeLineItem color="primary">Multiple Layouts with Responsive</TimeLineItem>
				<TimeLineItem color="primary">Fully Responsive Design</TimeLineItem>
				<TimeLineItem>Easy to Customize with Tailwind.config & SCSS</TimeLineItem>
				<TimeLineItem>Multiple Layouts with Responsive</TimeLineItem>
				<TimeLineItem>Unlimited Template Possibilities</TimeLineItem>
			</TimeLine>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Square Timeline</CardTitle>
		</CardHeader>
		<CardBody>
			<TimeLine variant="square">
				<TimeLineItem color="purple">Dark, Light with RTL Supported</TimeLineItem>
				<TimeLineItem color="purple">Multiple Layouts with Responsive</TimeLineItem>
				<TimeLineItem color="purple">Fully Responsive Design</TimeLineItem>
				<TimeLineItem>Easy to Customize with Tailwind.config & SCSS</TimeLineItem>
				<TimeLineItem>Multiple Layouts with Responsive</TimeLineItem>
				<TimeLineItem>Unlimited Template Possibilities</TimeLineItem>
			</TimeLine>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Colored Timeline</CardTitle>
		</CardHeader>
		<CardBody>
			<TimeLine variant="square">
				<TimeLineItem color="red">Dark, Light with RTL Supported</TimeLineItem>
				<TimeLineItem color="red">Multiple Layouts with Responsive</TimeLineItem>
				<TimeLineItem color="red">Fully Responsive Design</TimeLineItem>
				<TimeLineItem>Easy to Customize with Tailwind.config & SCSS</TimeLineItem>
				<TimeLineItem>Multiple Layouts with Responsive</TimeLineItem>
				<TimeLineItem>Unlimited Template Possibilities</TimeLineItem>
			</TimeLine>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>ChangLog Timeline</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="mx-auto max-w-xl">
				<TimeLine variant="icon">
					<TimeLineItem color="primary">
						<div class="relative">
							<div class="relative flex items-start space-x-3 rtl:space-x-reverse">
								<div class="relative shrink-0">
									<div
										class="bg-primary-500 dark:ring-dark-900 flex size-8 items-center justify-center rounded-full text-white ring-8 ring-white"
									>
										<LucidePlus class="size-4" />
									</div>
								</div>
								<div class="mt-1 grow">
									<div class="mb-2 flex items-center gap-2">
										<!-- svelte-ignore a11y-invalid-attribute -->
										<a href="#" class="font-medium">v1.3.0</a>
										<!-- svelte-ignore a11y-invalid-attribute -->
										<a
											href="#"
											class="dark:border-dark-800 relative flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs"
										>
											<div class="absolute flex shrink-0 items-center justify-center">
												<span class="size-1.5 rounded-full bg-green-500" aria-hidden="true"></span>
											</div>
											<h6 class="dark:text-dark-500 text-xs text-gray-500 ltr:ml-3.5 rtl:mr-3.5">
												Feature
											</h6>
										</a>
									</div>
									<h6 class="dark:text-dark-500 mb-3 text-sm whitespace-nowrap text-gray-500">
										15 May, 2024
									</h6>
									<ul class="list-inside list-disc">
										<TimeLineItem>Added Chat Application</TimeLineItem>
										<TimeLineItem>Added Modern Layout</TimeLineItem>
										<TimeLineItem>Added Email Application</TimeLineItem>
									</ul>
								</div>
							</div>
						</div>
					</TimeLineItem>

					<TimeLineItem color="primary">
						<div class="relative">
							<div class="relative flex items-start space-x-3 rtl:space-x-reverse">
								<div class="relative shrink-0">
									<div
										class="bg-primary-500 dark:ring-dark-900 flex size-8 items-center justify-center rounded-full text-white ring-8 ring-white"
									>
										<LucidePlus class="size-4" />
									</div>
								</div>
								<div class="mt-1 grow">
									<div class="mb-2 flex items-center gap-2">
										<!-- svelte-ignore a11y-invalid-attribute -->
										<a href="#" class="font-medium">v1.2.0</a>
										<!-- svelte-ignore a11y-invalid-attribute -->
										<a
											href="#"
											class="dark:border-dark-800 relative flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs"
										>
											<div class="absolute flex shrink-0 items-center justify-center">
												<span class="size-1.5 rounded-full bg-green-500" aria-hidden="true"></span>
											</div>
											<h6 class="dark:text-dark-500 text-xs text-gray-500 ltr:ml-3.5 rtl:mr-3.5">
												Feature & Bag
											</h6>
										</a>
									</div>
									<h6 class="dark:text-dark-500 mb-3 text-sm whitespace-nowrap text-gray-500">
										05 May, 2024
									</h6>
									<ul class="list-inside list-disc">
										<TimeLineItem>Added Chat Application</TimeLineItem>
										<TimeLineItem>Added Modern Layout</TimeLineItem>
										<TimeLineItem>Added Email Application</TimeLineItem>
									</ul>
								</div>
							</div>
						</div>
					</TimeLineItem>

					<TimeLineItem>
						<div class="relative">
							<div class="relative flex items-start space-x-3 rtl:space-x-reverse">
								<div class="relative shrink-0">
									<div
										class="bg-primary-500 dark:ring-dark-900 flex size-8 items-center justify-center rounded-full text-white ring-8 ring-white"
									>
										<LucidePlus class="size-4" />
									</div>
								</div>
								<div class="mt-1 grow">
									<div class="mb-2 flex items-center gap-2">
										<!-- svelte-ignore a11y-invalid-attribute -->
										<a href="#" class="font-medium">v1.0.0</a>
									</div>
									<h6 class="dark:text-dark-500 mb-3 text-sm whitespace-nowrap text-gray-500">
										29 April, 2024
									</h6>
									<ul class="list-inside list-disc">
										<TimeLineItem>Initial Released</TimeLineItem>
									</ul>
								</div>
							</div>
						</div>
					</TimeLineItem>
				</TimeLine>
			</div>
		</CardBody>
	</Col>
</Grid>
