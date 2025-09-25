<script>
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Drawer from '$lib/components/ui/drawer/Drawer.svelte';
	import DrawerBody from '$lib/components/ui/drawer/DrawerBody.svelte';
	import DrawerContent from '$lib/components/ui/drawer/DrawerContent.svelte';
	import DrawerFooter from '$lib/components/ui/drawer/DrawerFooter.svelte';
	import DrawerHeader from '$lib/components/ui/drawer/DrawerHeader.svelte';
	import DrawerTrigger from '$lib/components/ui/drawer/DrawerTrigger.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
	const users = [4, 5, 6, 11, 8, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 24, 25];
</script>

<PageHeading title="Drawer" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<Drawer>
				<DrawerTrigger text="Default Drawer" />
				<DrawerContent>
					<DrawerHeader>
						<h6>Drawer Heading</h6>
					</DrawerHeader>
					<DrawerBody>
						<h6 class="text-15 mb-4">Drawer Content</h6>
						<p class="dark:text-dark-500 text-slate-500">
							They all have something to say beyond the words on the page. They can come across as
							casual or neutral, exotic or graphic.
						</p>
					</DrawerBody>
					<DrawerFooter>
						<h6>Drawer Footer</h6>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</CardBody>
	</Col><!--end -->
	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Drawer Position</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-2">
				<Drawer>
					<DrawerTrigger text="End Drawer" class="btn btn-sub-gray" color="dark" varient="soft" />
					<DrawerContent position="right">
						<DrawerHeader>
							<h6>Drawer Heading</h6>
						</DrawerHeader>
						<DrawerBody>
							<h6 class="text-15 mb-4">Drawer Content</h6>
							<p class="dark:text-dark-500 text-slate-500">
								They all have something to say beyond the words on the page. They can come across as
								casual or neutral, exotic or graphic.
							</p>
						</DrawerBody>
						<DrawerFooter>
							<h6>Drawer Footer</h6>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>

				<Drawer>
					<DrawerTrigger text="Start Drawer" class="btn btn-sub-gray" color="dark" varient="soft" />
					<DrawerContent position="left">
						<DrawerHeader>
							<h6>Drawer Heading</h6>
						</DrawerHeader>
						<DrawerBody>
							<h6 class="text-15 mb-4">Drawer Content</h6>
							<p class="dark:text-dark-500 text-slate-500">
								They all have something to say beyond the words on the page. They can come across as
								casual or neutral, exotic or graphic.
							</p>
						</DrawerBody>
						<DrawerFooter>
							<h6>Drawer Footer</h6>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>

				<Drawer>
					<DrawerTrigger text="Top Drawer" class="btn btn-sub-gray" color="dark" varient="soft" />
					<DrawerContent position="top">
						<DrawerHeader>
							<h6>Drawer Heading</h6>
						</DrawerHeader>
						<DrawerBody>
							<h6 class="text-15 mb-4">Drawer Content</h6>
							<p class="dark:text-dark-500 text-slate-500">
								They all have something to say beyond the words on the page. They can come across as
								casual or neutral, exotic or graphic.
							</p>
						</DrawerBody>
						<DrawerFooter>
							<h6>Drawer Footer</h6>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>

				<Drawer>
					<DrawerTrigger
						text="Bottom Drawer"
						class="btn btn-sub-gray"
						color="dark"
						varient="soft"
					/>
					<DrawerContent position="bottom">
						<DrawerHeader>
							<h6>Drawer Heading</h6>
						</DrawerHeader>
						<DrawerBody>
							<h6 class="text-15 mb-4">Drawer Content</h6>
							<p class="dark:text-dark-500 text-slate-500">
								They all have something to say beyond the words on the page. They can come across as
								casual or neutral, exotic or graphic.
							</p>
						</DrawerBody>
						<DrawerFooter>
							<h6>Drawer Footer</h6>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} md={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Size Drawer</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-2">
				<Drawer>
					<DrawerTrigger text="Extra small" class="btn btn-sub-gray" color="dark" varient="soft" />
					<DrawerContent size="small">
						<DrawerBody>
							<div class="drawer-content p-0" data-simplebar>
								<div class="space-y-3 *:relative *:block *:rounded-full">
									{#each users as user}
										<a href="#!">
											<img
												src={`/assets/images/avatar/user-${user}.png`}
												alt="User ${user}"
												class="mx-auto size-14 rounded-full"
											/>
											<div
												class="dark:border-dark-900 absolute right-0.5 bottom-0 size-4 rounded-full border-2 border-white bg-green-500"
											></div>
										</a>
									{/each}
								</div>
							</div>
						</DrawerBody>
					</DrawerContent>
				</Drawer>

				<Drawer>
					<DrawerTrigger text="Medium" class="btn btn-sub-gray" color="dark" varient="soft" />
					<DrawerContent size="medium">
						<DrawerHeader>
							<h6>Drawer Heading</h6>
						</DrawerHeader>
						<DrawerBody>
							<h6 class="text-15 mb-4">Drawer Content</h6>
							<p class="dark:text-dark-500 text-slate-500">
								They all have something to say beyond the words on the page. They can come across as
								casual or neutral, exotic or graphic.
							</p>
						</DrawerBody>
						<DrawerFooter>
							<h6>Drawer Footer</h6>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>

				<Drawer>
					<DrawerTrigger text="Half Screen" class="btn btn-sub-gray" color="dark" varient="soft" />
					<DrawerContent size="half-screen">
						<DrawerHeader>
							<h6>Drawer Heading</h6>
						</DrawerHeader>
						<DrawerBody>
							<h6 class="text-15 mb-4">Drawer Content</h6>
							<p class="dark:text-dark-500 text-slate-500">
								They all have something to say beyond the words on the page. They can come across as
								casual or neutral, exotic or graphic.
							</p>
						</DrawerBody>
						<DrawerFooter>
							<h6>Drawer Footer</h6>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
		</CardBody>
	</Col>
</Grid><!--end grid-->
