<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import User from '$lib/components/common/User.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
</script>

<User variant="activity" />

<Grid cols={12} gapX={5} class="mt-5">
	<Col cols={{ span: 12 }} md={{ span: 4 }} xl={{ span: 3 }}>
		<Card>
			<CardHeader>
				<CardTitle>Filter Activity</CardTitle>
			</CardHeader>
			<CardBody>
				<p class="dark:text-dark-500 mb-3 text-sm font-medium text-gray-500 uppercase">Type</p>

				<div class="space-y-3">
					<div class="input-check-group">
						<input id="typeCheckboxAll" class="input-check input-check-primary" type="checkbox" />
						<label for="typeCheckboxAll" class="input-check-label">All Select</label>
					</div>
					<div class="input-check-group">
						<input id="typeCheckbox1" class="input-check input-check-primary" type="checkbox" />
						<label for="typeCheckbox1" class="input-check-label">Comments</label>
					</div>
					<div class="input-check-group">
						<input id="typeCheckbox2" class="input-check input-check-primary" type="checkbox" />
						<label for="typeCheckbox2" class="input-check-label">Uploaded Files</label>
					</div>
					<div class="input-check-group">
						<input id="typeCheckbox3" class="input-check input-check-primary" type="checkbox" />
						<label for="typeCheckbox3" class="input-check-label">Queries</label>
					</div>
					<div class="input-check-group">
						<input id="typeCheckbox4" class="input-check input-check-primary" type="checkbox" />
						<label for="typeCheckbox4" class="input-check-label">Sales & Products</label>
					</div>
					<div class="input-check-group">
						<input id="typeCheckbox5" class="input-check input-check-primary" type="checkbox" />
						<label for="typeCheckbox5" class="input-check-label">Projects</label>
					</div>
					<div class="input-check-group">
						<input id="typeCheckbox6" class="input-check input-check-primary" type="checkbox" />
						<label for="typeCheckbox6" class="input-check-label">Flags</label>
					</div>
				</div>

				<p class="dark:text-dark-500 mt-5 mb-3 text-sm font-medium text-gray-500 uppercase">
					Contributor
				</p>

				<div class="space-y-3">
					<div class="input-check-group">
						<input
							id="contributorCheckboxAll"
							class="input-check input-check-primary"
							type="checkbox"
						/>
						<label for="contributorCheckboxAll" class="input-check-label">All Select</label>
					</div>
					<div class="input-check-group">
						<input
							id="contributorCheckbox1"
							class="input-check input-check-primary"
							type="checkbox"
						/>
						<label for="contributorCheckbox1" class="input-check-label">SRBThemes</label>
					</div>
					<div class="input-check-group">
						<input
							id="contributorCheckbox2"
							class="input-check input-check-primary"
							type="checkbox"
						/>
						<label for="contributorCheckbox2" class="input-check-label">Thomas Hayes</label>
					</div>
				</div>
			</CardBody>
		</Card>
	</Col><!--end col-->
	<Col cols={{ span: 12 }} md={{ span: 8 }} xl={{ span: 9 }}>
		<div class="dark:border-dark-800 flex items-center border-b border-gray-200 pb-1">
			<h6 class="grow">Today</h6>
			<p class="dark:text-dark-500 text-sm text-gray-500">Monday, May 20, 2024</p>
		</div>

		<ul
			class="mt-5 flex flex-col *:relative *:before:absolute *:before:-inset-y-5 *:before:w-[1px] *:before:bg-gray-200 ltr:*:before:left-4 rtl:*:before:right-4 dark:*:before:bg-gray-800"
		>
			<li class="last:pb-0 last:before:hidden">
				<div class="relative">
					<div class="relative flex items-start space-x-3 rtl:space-x-reverse">
						<div class="relative shrink-0">
							<div
								class="dark:ring-dark-900 flex size-8 items-center justify-center rounded-full bg-green-500/10 text-green-500 ring-4 ring-white"
							>
								<LucideIcon name="ShoppingBag" class="size-4" />
							</div>
						</div>
						<div class="card card-body grow">
							<span class="dark:text-dark-500 text-sm text-gray-500 ltr:float-end rtl:float-start"
								>02:35 PM</span
							>
							<h6>New Sale</h6>
							<p class="dark:text-dark-500 text-gray-500">
								A returning visitor from thomas, Italy just bought a new <a
									href="#!"
									class="text-primary-500">Mackbook Pro</a
								>
								for <span class="font-medium">$1999.99</span>
							</p>
						</div>
					</div>
				</div>
			</li>
			<li class="last:pb-0 last:before:hidden">
				<div class="relative">
					<div class="relative flex items-start space-x-3 rtl:space-x-reverse">
						<div class="relative shrink-0">
							<img
								src="/assets/images/avatar/user-12.png"
								alt=""
								class="dark:ring-dark-900 size-8 rounded-full ring-4 ring-white"
							/>
						</div>
						<div class="card card-body grow">
							<span class="dark:text-dark-500 text-sm text-gray-500 ltr:float-end rtl:float-start"
								>12:59 PM</span
							>
							<h6>Jerome send message</h6>
							<p class="dark:text-dark-500 mb-3 text-gray-500">
								<span class="font-medium">@jerome</span> send message to thread in channel
								<span class="font-medium">#show-tell</span>
							</p>

							<div class="mb-2 space-x-1">
								<span
									class="dark:border-dark-800 dark:text-dark-500 badge border-gray-200 bg-transparent text-gray-500"
									>#marketing</span
								>
								<span
									class="dark:border-dark-800 dark:text-dark-500 badge border-gray-200 bg-transparent text-gray-500"
									>#promotion</span
								>
							</div>
							<p>Hello Everyone</p>
							<p>
								I have a question regarding email marketing. What are some strategies or techniques
								to prevent automated marketing emails from being flagged as promotions, spam, or
								junk?
							</p>

							<div class="mt-3 flex flex-wrap items-center gap-2">
								<p class="dark:text-dark-500 text-gray-500">
									<LucideIcon name="Smile" class="inline-block size-4" />
									<span class="align-middle whitespace-nowrap"><b>2</b> reactions</span>
								</p>
								<p class="dark:text-dark-500 text-gray-500">
									<LucideIcon name="MessageSquareText" class="inline-block size-4" />
									<span class="align-middle whitespace-nowrap"><b>6</b> replies</span>
								</p>
								<p class="dark:text-dark-500 text-gray-500">Last Today at 07:30 PM</p>
							</div>
						</div>
					</div>
				</div>
			</li>
			<li class="last:pb-0 last:before:hidden">
				<div class="relative">
					<div class="relative flex items-start space-x-3 rtl:space-x-reverse">
						<div class="relative shrink-0">
							<div
								class="bg-primary-500/10 text-primary-500 dark:ring-dark-900 flex size-8 items-center justify-center rounded-full ring-4 ring-white"
							>
								<LucideIcon name="MonitorDot" class="size-4" />
							</div>
						</div>
						<div class="card card-body grow">
							<span class="dark:text-dark-500 text-sm text-gray-500 ltr:float-end rtl:float-start"
								>10:27 AM</span
							>
							<h6>Project status updated</h6>
							<p class="dark:text-dark-500 text-gray-500">
								<span class="align-middle whitespace-nowrap">Marked</span>
								<a href="#!" class="link link-primary"
									><LucideIcon name="Github" class="inline-block size-4" />
									<span class="align-middle whitespace-nowrap">#25 Marge</span></a
								>
								as <span class="badge badge-sub-green">Completed</span>
							</p>
						</div>
					</div>
				</div>
			</li>
		</ul>

		<div class="dark:border-dark-800 flex items-center border-b border-gray-200 pb-1">
			<h6 class="grow">Yesterday</h6>
			<p class="dark:text-dark-500 text-sm text-gray-500">Sunday, May 19, 2024</p>
		</div>

		<ul
			class="dark:*:before:bg-dark-800 mt-5 flex flex-col *:relative *:before:absolute *:before:-inset-y-5 *:before:w-[1px] *:before:bg-gray-200 ltr:*:before:left-4 rtl:*:before:right-4"
		>
			<li class="last:pb-0 last:before:hidden">
				<div class="relative">
					<div class="relative flex items-start space-x-3 rtl:space-x-reverse">
						<div class="relative shrink-0">
							<img
								src="/assets/images/avatar/user-18.png"
								alt=""
								class="dark:ring-dark-900 size-8 rounded-full ring-4 ring-white"
							/>
						</div>
						<div class="card card-body grow">
							<span class="dark:text-dark-500 text-sm text-gray-500 ltr:float-end rtl:float-start"
								>03:41 AM</span
							>
							<h6>Paul Stirling commented on @domiex</h6>
							<div class="dark:bg-dark-850 mt-3 rounded-md bg-gray-100 p-3">
								<p class="dark:text-dark-500 text-gray-500">
									Paul, I believe we should seriously consider removing this column altogether. It
									seems redundant as it duplicates content we already have. Additionally,
									consolidating information into a single source ensures accuracy and avoids having
									disparate information spread across multiple sources. What do you think about
									this?
								</p>
							</div>
						</div>
					</div>
				</div>
			</li>
			<li class="last:pb-0 last:before:hidden">
				<div class="relative">
					<div class="relative flex items-start space-x-3 rtl:space-x-reverse">
						<div class="relative shrink-0">
							<div
								class="dark:ring-dark-900 flex size-8 items-center justify-center rounded-full bg-sky-500/10 text-sky-500 ring-4 ring-white"
							>
								<LucideIcon name="File" class="size-4" />
							</div>
						</div>
						<div class="card card-body grow">
							<span class="dark:text-dark-500 text-sm text-gray-500 ltr:float-end rtl:float-start"
								>11:59 AM</span
							>
							<h6>Task Report - uploaded weekly reports</h6>
							<p class="dark:text-dark-500 text-gray-500">
								Added <b>2</b> files to task report by
								<a href="#!" class="text-primary-500 font-medium">domiex</a>
							</p>

							<div class="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
								<a
									href="#!"
									class="dark:border-dark-800 flex items-center gap-3 rounded-md border border-dashed border-gray-200 p-4"
								>
									<div>
										<LucideIcon
											name="FileText"
											class="size-8 fill-red-500/10 stroke-1 text-red-500"
										/>
									</div>
									<div>
										<h6 class="mb-1">task-reports.pdf</h6>
										<p class="dark:text-dark-500 text-xs text-gray-500">45 KB</p>
									</div>
								</a>
								<a
									href="#!"
									class="dark:border-dark-800 flex items-center gap-3 rounded-md border border-dashed border-gray-200 p-4"
								>
									<div>
										<LucideIcon
											name="ScrollText"
											class="size-8 fill-yellow-500/10 stroke-1 text-yellow-500"
										/>
									</div>
									<div>
										<h6 class="mb-1">requirement-research.txt</h6>
										<p class="dark:text-dark-500 text-xs text-gray-500">1.5 MB</p>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</li>
			<li class="last:pb-0 last:before:hidden">
				<div class="relative">
					<div class="relative flex items-start space-x-3 rtl:space-x-reverse">
						<div class="relative shrink-0">
							<img
								src="/assets/images/avatar/user-9.png"
								alt=""
								class="dark:ring-dark-900 size-8 rounded-full ring-4 ring-white"
							/>
						</div>
						<div class="card card-body grow">
							<span class="dark:text-dark-500 text-sm text-gray-500 ltr:float-end rtl:float-start"
								>04:21 PM</span
							>
							<h6>
								John Brown request joined <a href="#!" class="text-primary-500">#domiex-project</a> channel
							</h6>
							<div class="mt-3 flex items-center gap-2">
								<button type="button" class="btn btn-primary">Accept</button>
								<button type="button" class="btn btn-sub-gray">Reject</button>
							</div>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</Col><!--end col-->
</Grid>
