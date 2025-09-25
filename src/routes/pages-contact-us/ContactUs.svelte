<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
</script>

<Grid
	cols={12}
	gap={0}
	class="from-sky-500/10 via-green-500/5 to-pink-500/5 ltr:bg-gradient-to-l rtl:bg-gradient-to-r"
>
	<Col cols={{ span: 12 }} lg={{ span: 7 }}>
		<div
			class="dark:border-dark-800 my-10 flex items-center border-gray-200 lg:my-0 lg:h-screen lg:ltr:border-r lg:rtl:border-l"
		>
			<div class="grow px-10 xl:px-20">
				<h1 class="mb-3 text-2xl md:text-4xl">Challenge us together Get estimate</h1>
				<p class="dark:text-dark-500 mb-8 text-gray-500">
					In three short steps we will establish the most important details of our joint journey.
				</p>
				<ul class="list-square marker:text-primary-500 mb-9 list-inside space-y-2">
					<li>Customize Your Projects</li>
					<li>Create Your Own website</li>
					<li>Determining the skills of specialists</li>
					<li>Details about the project</li>
					<li>Customize your layouts</li>
				</ul>
				<a href="/pages-contact-us-two" class="btn btn-primary">
					Start Your Own
					<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
					<!-- <i data-lucide="move-left" class="mr-1 ltr:hidden rtl:inline-block size-4"></i> -->
				</a>
			</div>
		</div>
	</Col>
	<Col cols={{ span: 12 }} lg={{ span: 5 }}>
		<div class="flex w-full flex-col justify-center px-10 lg:h-screen xl:px-20">
			<h4 class="mb-4">Check what will help you with the estimation of your project.</h4>
			<ul class="mb-7 space-y-2 text-green-500">
				<li>
					<LucideIcon
						name="CornerUpRight"
						class="mr-1 size-4 text-green-500 ltr:inline-block rtl:hidden"
					/>
					What knowledge do we need for the estimate
				</li>
				<li>
					<LucideIcon
						name="CornerUpRight"
						class="mr-1 size-4 text-green-500 ltr:inline-block rtl:hidden"
					/>
					Sample estimation and cost calculation
				</li>
			</ul>
			<div class="my-10 lg:mt-20 lg:mb-0">
				<h5 class="mb-4">You can also contact us directly.</h5>
				<div class="flex gap-3">
					<img src="assets/images/avatar/user-16.png" alt="" class="size-14 shrink-0 rounded-md" />
					<div class="grow">
						<h6>SRBThemes</h6>
						<p class="dark:text-dark-500 mb-3 text-gray-500">IT Company</p>
						<ul class="space-y-2">
							<li>
								<LucideIcon
									name="Mail"
									class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-1 rtl:ml-1"
								/>
								<a
									href="mailto:support@example.com"
									class="hover:text-primary-500 transition duration-200 ease-linear"
									>support@example.com</a
								>
							</li>
							<li>
								<LucideIcon
									name="Phone"
									class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-1 rtl:ml-1"
								/> +(231) 12345 67890
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</Col>
</Grid>
