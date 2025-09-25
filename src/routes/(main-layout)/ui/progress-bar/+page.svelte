<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import ProgressBar from '$lib/components/ui/progress-bar/ProgressBar.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Progress Bar" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Basic Progress Bar</CardTitle>
		</CardHeader>
		<CardBody>
			<Grid cols={12} gap={5}>
				<Col cols={{ span: 12 }} md={{ span: 6 }}>
					<div class="flex flex-col gap-3">
						<ProgressBar color="primary" progressCss="text-white" text="Primary 50%" percent={50}
						></ProgressBar>
						<ProgressBar
							color="purple"
							progressCss="text-white"
							text="Purple 33.33%"
							percent={33.33}
						></ProgressBar>
						<ProgressBar color="green" progressCss="text-white" text="Green 66.66%" percent={66.66}
						></ProgressBar>
						<ProgressBar color="red" progressCss="text-white bg-red-500" text="Red 80%" percent={80}
						></ProgressBar>
						<ProgressBar color="yellow" progressCss="text-white" text="Yellow 75%" percent={75}
						></ProgressBar>
					</div>
					<!--end col-->
				</Col>
				<div class="col-span-12 md:col-span-6">
					<div class="flex flex-col gap-3">
						<ProgressBar color="sky" progressCss="text-white" text="Sky 50%" percent={50}
						></ProgressBar>
						<ProgressBar color="pink" progressCss="text-white" text="Pink 66.66%" percent={66.66}
						></ProgressBar>
						<ProgressBar
							color="light"
							progressCss="text-gray-500 !bg-gray-200 dark:!bg-dark-800 dark:text-dark-500"
							text="Light 60%"
							percent={60}
						></ProgressBar>
						<ProgressBar
							color="dark"
							progressCss="text-white !bg-gray-900 dark:!bg-dark-300 dark:text-dark-500"
							text="Dark 100%"
							percent={100}
						></ProgressBar>
					</div>
				</div>
				<!--end col-->
			</Grid>
		</CardBody><!--end grid-->
	</Col><!--end col-->
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Soft Progress Bar</CardTitle>
		</CardHeader>
		<CardBody>
			<Grid cols={12} gap={5}>
				<div class="col-span-12 md:col-span-6">
					<div class="flex flex-col gap-3">
						<div class="progress-bar">
							<div class="progress-bar-wrap text-primary-500 bg-primary-500/20 w-1/2"></div>
						</div>
						<div class="progress-bar">
							<div class="progress-bar-wrap w-1/3 bg-purple-500/20 text-purple-500"></div>
						</div>
						<div class="progress-bar">
							<div class="progress-bar-wrap w-2/3 bg-green-500/20 text-green-500"></div>
						</div>
						<div class="progress-bar">
							<div class="progress-bar-wrap w-4/5 bg-red-500/20 text-red-500"></div>
						</div>
						<div class="progress-bar">
							<div class="progress-bar-wrap w-3/4 bg-yellow-500/20 text-yellow-500"></div>
						</div>
					</div>
				</div>
				<!--end col-->
				<div class="col-span-12 md:col-span-6">
					<div class="flex flex-col gap-3">
						<div class="progress-bar">
							<div class="progress-bar-wrap w-1/2 bg-sky-500/20 text-sky-500"></div>
						</div>
						<div class="progress-bar">
							<div class="progress-bar-wrap w-2/3 bg-pink-500/20 text-pink-500"></div>
						</div>
						<div class="progress-bar">
							<div
								class="progress-bar-wrap dark:text-dark-500 w-3/5 bg-gray-500/20 text-gray-500"
							></div>
						</div>
					</div>
				</div>
				<!--end col-->
			</Grid><!--end grid-->
		</CardBody>
	</Col><!--end col-->
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Animation Progress Bar</CardTitle>
		</CardHeader>
		<CardBody>
			<Grid cols={12} gap={5}>
				<div class="col-span-12 md:col-span-6">
					<div class="flex flex-col gap-3">
						<div class="progress-bar overflow-hidden">
							<div class="progress-bar-wrap bg-primary-500 relative w-1/2 text-white">
								<div class="progress-animate"></div>
							</div>
						</div>
						<div class="progress-bar overflow-hidden">
							<div class="progress-bar-wrap w-1/3 bg-purple-500 text-white">
								<div class="progress-animate"></div>
							</div>
						</div>
						<div class="progress-bar overflow-hidden">
							<div class="progress-bar-wrap w-2/3 bg-green-500 text-white">
								<div class="progress-animate"></div>
							</div>
						</div>
						<div class="progress-bar overflow-hidden">
							<div class="progress-bar-wrap w-4/5 bg-red-500 text-white">
								<div class="progress-animate"></div>
							</div>
						</div>
						<div class="progress-bar overflow-hidden">
							<div class="progress-bar-wrap w-3/4 bg-yellow-500 text-white">
								<div class="progress-animate"></div>
							</div>
						</div>
					</div>
					<!--end col-->
				</div>
				<div class="col-span-12 md:col-span-6">
					<div class="flex flex-col gap-3">
						<div class="progress-bar overflow-hidden">
							<div class="progress-bar-wrap w-1/2 bg-sky-500 text-white">
								<div class="progress-animate"></div>
							</div>
						</div>
						<div class="progress-bar overflow-hidden">
							<div class="progress-bar-wrap w-2/3 bg-pink-500 text-white">
								<div class="progress-animate"></div>
							</div>
						</div>
						<div class="progress-bar overflow-hidden">
							<div class="progress-bar-wrap w-3/5 bg-gray-200 text-gray-500">
								<div class="progress-animate"></div>
							</div>
						</div>
						<div class="progress-bar overflow-hidden">
							<div class="progress-bar-wrap w-full bg-gray-900 text-white">
								<div class="progress-animate"></div>
							</div>
						</div>
					</div>
				</div>
				<!--end col-->
			</Grid>
		</CardBody><!--end grid-->
	</Col><!--end col-->
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Gradient Progress Bar</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-col gap-3">
				<div class="progress-bar">
					<div
						class="progress-bar-wrap from-primary-500 w-1/2 bg-gradient-to-r to-green-500 text-white"
					></div>
				</div>
				<div class="progress-bar">
					<div
						class="progress-bar-wrap from-primary-500 w-1/3 bg-gradient-to-r via-sky-600 to-sky-500 text-white"
					></div>
				</div>
				<div class="progress-bar">
					<div
						class="progress-bar-wrap w-2/5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
					></div>
				</div>
			</div>
			<!--end col-->
		</CardBody><!--end grid-->
	</Col><!--end col-->
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Sizes Progress Bar</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-col gap-3">
				<div>
					<div class="mb-2 flex items-center gap-3">
						<h6 class="grow text-xs">Project Workforce</h6>
						<h6 class="text-xs font-semibold text-red-500">32.21%</h6>
					</div>
					<div class="progress-bar progress-1">
						<div class="progress-bar-wrap bg-primary-500 w-1/2 text-white"></div>
					</div>
				</div>
				<div>
					<div class="mb-2 flex items-center gap-3">
						<h6 class="grow text-xs">Critical Hours</h6>
						<h6 class="text-xs font-semibold text-red-500">64%</h6>
					</div>
					<div class="progress-bar progress-1">
						<div class="progress-bar-wrap w-[64%] bg-green-500 text-white"></div>
					</div>
				</div>
			</div>
		</CardBody><!--end grid-->
	</Col><!--end col-->
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Content Progress Bar</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-col gap-3">
				<div>
					<div class="mb-2 flex items-center gap-3">
						<h6 class="grow text-xs">Project Workforce</h6>
						<h6 class="text-xs font-semibold text-red-500">32.21%</h6>
					</div>
					<div class="progress-bar progress-1">
						<div class="progress-bar-wrap bg-primary-500 w-1/2 text-white"></div>
					</div>
				</div>
				<div>
					<div class="mb-2 flex items-center gap-3">
						<h6 class="grow text-xs">Critical Hours</h6>
						<h6 class="text-xs font-semibold text-red-500">64%</h6>
					</div>
					<div class="progress-bar progress-1">
						<div class="progress-bar-wrap w-[64%] bg-green-500 text-white"></div>
					</div>
				</div>
			</div>
		</CardBody><!--end grid-->
	</Col><!--end col-->
</Grid><!--end grid-->
