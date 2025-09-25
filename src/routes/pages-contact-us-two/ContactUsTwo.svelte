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
			class="dark:border-dark-800 flex h-screen items-center border-gray-200 lg:ltr:border-r lg:rtl:border-l"
		>
			<div class="flex h-full items-center overflow-y-auto py-10">
				<div class="px-8 md:px-20">
					<h1 class="mb-3 leading-normal xl:w-2/3">
						Before we start, we'd like to get to know you better
					</h1>
					<form action="#!" class="mb-5 xl:w-2/3">
						<Grid cols={12} gap={5}>
							<Col cols={{ span: 12 }}>
								<label for="nameInput" class="form-label">Your Name</label>
								<input
									type="text"
									id="nameInput"
									class="form-input bg-transparent dark:bg-transparent"
									placeholder="Enter your name"
								/>
							</Col>
							<Col cols={{ span: 6 }}>
								<label for="yourPlaceInput" class="form-label">Your Place</label>
								<input
									type="text"
									id="yourPlaceInput"
									class="form-input bg-transparent dark:bg-transparent"
									placeholder="Your Place"
								/>
							</Col>
							<Col cols={{ span: 6 }}>
								<label for="emailAddressInput" class="form-label">Email Address</label>
								<input
									type="email"
									id="emailAddressInput"
									class="form-input bg-transparent dark:bg-transparent"
									placeholder="support@example.com"
								/>
							</Col>
							<Col cols={{ span: 12 }}>
								<label for="productCompanyInput" class="form-label">Product Or Company</label>
								<input
									type="text"
									id="productCompanyInput"
									class="form-input bg-transparent dark:bg-transparent"
									placeholder="What is the name of your product or comapny ?"
								/>
							</Col>
							<div class="col-span-12">
								<label for="textareaInput2" class="form-label">Your Reply</label>
								<textarea
									name="textareaInput2"
									id="textareaInput2"
									rows="3"
									class="form-input h-auto bg-transparent dark:bg-transparent"
									placeholder="Enter your description"
								></textarea>
							</div>
						</Grid>
					</form>
					<div class="flex flex-wrap gap-2">
						<a href="/pages-contact-us" class="btn btn-outline-gray">
							<LucideIcon name="MoveLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
							Back
						</a>
						<a href="/pages-contact-us-three" class="btn btn-primary">
							Start Your Own
							<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</Col>
	<Col cols={{ span: 12 }} lg={{ span: 5 }}>
		<div class="flex w-full flex-col justify-center px-8 pb-10 md:px-20 lg:h-screen lg:pb-0">
			<div class="mx-auto xl:w-2/3">
				<img
					src="/assets/images/avatar/user-16.png"
					alt=""
					class="mx-auto size-32 shrink-0 rounded-md shadow-lg"
				/>
				<div class="mt-5 grow text-center">
					<h5 class="mb-1">SRBThemes</h5>
					<p class="dark:text-dark-500 mb-3 text-gray-500">IT Company</p>
					<p class="mb-6">
						But most of all, I have been a Product Designer & Development for nearly 8+ years.
					</p>
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
	</Col>
</Grid>
