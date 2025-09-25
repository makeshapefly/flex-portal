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
	<Col cols={{ span: 12 }} xl={{ span: 7 }}>
		<div
			class="dark:border-dark-800 flex items-center border-gray-200 py-14 xl:h-screen xl:py-0 ltr:border-r rtl:border-l"
		>
			<div class="grow px-10 lg:px-20">
				<h1 class="mb-10 leading-normal xl:w-2/3">
					What expertise should specialists possess to develop your project?
				</h1>
				<div
					class="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4"
				>
					<div class="input-check-group relative">
						<input
							id="brandingInput"
							class="input-check input-check-primary peer absolute top-4 z-10 ltr:right-4 rtl:left-4"
							type="checkbox"
						/>
						<label
							for="brandingInput"
							class="dark:border-dark-800 dark:bg-dark-900 peer-checked:bg-primary-100 dark:peer-checked:bg-primary-500/10 peer-checked:border-primary-300 dark:peer-checked:border-primary-500/30 dark:shadow-dark-850 relative block cursor-pointer rounded-md border border-gray-200 bg-white p-4 shadow-lg shadow-gray-100"
						>
							<span
								class="text-primary-50 bg-primary-500 flex size-10 items-center justify-center rounded-md"
							>
								<LucideIcon name="Gem" class="size-5" />
							</span>
							<span class="mt-4 mb-1 block text-base font-medium">Branding</span>
							<span class="dark:text-dark-500 block text-sm text-gray-500"
								>We will create the image of your product from scratch.</span
							>
						</label>
					</div>
					<!--end col-->
					<div class="input-check-group relative">
						<input
							id="productCheckbox"
							class="input-check input-check-green peer absolute top-4 z-10 ltr:right-4 rtl:left-4"
							type="checkbox"
						/>
						<label
							for="productCheckbox"
							class="dark:border-dark-800 dark:bg-dark-900 dark:shadow-dark-850 relative block cursor-pointer rounded-md border border-gray-200 bg-white p-4 shadow-lg shadow-gray-100 peer-checked:border-green-300 peer-checked:bg-green-100 dark:peer-checked:border-green-500/30 dark:peer-checked:bg-green-500/10"
						>
							<span
								class="flex size-10 items-center justify-center rounded-md bg-green-500 text-green-50"
							>
								<LucideIcon name="Layers3" class="size-5" />
							</span>
							<span class="mt-4 mb-1 block text-base font-medium">Product Design</span>
							<span class="dark:text-dark-500 block text-sm text-gray-500"
								>We will create the image of your product from scratch.</span
							>
						</label>
					</div>
					<!--end col-->
					<div class="input-check-group relative">
						<input
							id="developmentCheckbox"
							class="input-check input-check-yellow peer absolute top-4 z-10 ltr:right-4 rtl:left-4"
							type="checkbox"
						/>
						<label
							for="developmentCheckbox"
							class="dark:border-dark-800 dark:bg-dark-900 dark:shadow-dark-850 relative block cursor-pointer rounded-md border border-gray-200 bg-white p-4 shadow-lg shadow-gray-100 peer-checked:border-yellow-300 peer-checked:bg-yellow-100 dark:peer-checked:border-yellow-500/30 dark:peer-checked:bg-yellow-500/10"
						>
							<span
								class="flex size-10 items-center justify-center rounded-md bg-yellow-500 text-yellow-50"
							>
								<LucideIcon name="MonitorStop" class="size-5" />
							</span>
							<span class="mt-4 mb-1 block text-base font-medium">Web Development</span>
							<span class="dark:text-dark-500 block text-sm text-gray-500"
								>We will create the image of your product from scratch.</span
							>
						</label>
					</div>
					<!--end col-->
					<div class="input-check-group relative">
						<input
							id="customizeCheckbox"
							class="input-check input-check-purple peer absolute top-4 z-10 ltr:right-4 rtl:left-4"
							type="checkbox"
						/>
						<label
							for="customizeCheckbox"
							class="dark:border-dark-800 dark:bg-dark-900 dark:shadow-dark-850 relative block cursor-pointer rounded-md border border-gray-200 bg-white p-4 shadow-lg shadow-gray-100 peer-checked:border-purple-300 peer-checked:bg-purple-100 dark:peer-checked:border-purple-500/30 dark:peer-checked:bg-purple-500/10"
						>
							<span
								class="flex size-10 items-center justify-center rounded-md bg-purple-500 text-purple-50"
							>
								<LucideIcon name="PencilRuler" class="size-5" />
							</span>
							<span class="mt-4 mb-1 block text-base font-medium">Customize Projects</span>
							<span class="dark:text-dark-500 block text-sm text-gray-500"
								>We will create the image of your product from scratch.</span
							>
						</label>
					</div>
					<!--end col-->
				</div>
				<!--end grid-->
				<div class="flex flex-wrap gap-2">
					<a href="/pages-contact-us-two" class="btn btn-outline-gray">
						<LucideIcon name="MoveLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
						Back
					</a>
					<a href="/pages-contact-us-four" class="btn btn-primary">
						Go Forward
						<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
					</a>
				</div>
			</div>
		</div>
	</Col>
	<div class="col-span-12 xl:col-span-5">
		<div class="flex w-full flex-col justify-center px-10 py-14 lg:px-20 xl:h-screen xl:py-0">
			<div>
				<h5 class="mb-3">
					At each stage of the project timeline, we ensure quality through the dedicated oversight
					of our Head of Design, who leads our quality assurance efforts.
				</h5>
				<p class="dark:text-dark-500 mb-5 text-gray-500">
					Our Head of Design is entrusted with ensuring the utmost quality of the final digital
					product.
				</p>
				<ul class="mb-7 space-y-2">
					<li>
						<LucideIcon
							name="CornerUpRight"
							class="mr-1 size-4 text-green-500 ltr:inline-block rtl:hidden"
						/>
						Basic support at the start of the project
					</li>
					<li>
						<LucideIcon
							name="CornerUpRight"
							class="mr-1 size-4 text-green-500 ltr:inline-block rtl:hidden"
						/>
						Taking care of the best design quality
					</li>
					<li>
						<LucideIcon
							name="CornerUpRight"
							class="mr-1 size-4 text-green-500 ltr:inline-block rtl:hidden"
						/>
						Perfect pixel at every stage of building your project
					</li>
					<li>
						<LucideIcon
							name="CornerUpRight"
							class="mr-1 size-4 text-green-500 ltr:inline-block rtl:hidden"
						/>
						Support: Design, Creative & Development
					</li>
				</ul>
			</div>
		</div>
	</div>
</Grid>
