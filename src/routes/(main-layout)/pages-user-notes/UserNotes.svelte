<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import User from '$lib/components/common/User.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Tooltip from '$lib/components/ui/tooltip/Tooltip.svelte';
</script>

<User variant="notes" />

<Grid cols={12} gapX={5} class="mt-5">
	<Col cols={{ span: 12 }} xl={{ span: 3 }}>
		<Card>
			<CardHeader>
				<CardTitle>Introductions</CardTitle>
			</CardHeader>
			<CardBody>
				<p class="dark:text-dark-500 mb-3 text-sm font-medium text-gray-500 uppercase">About</p>
				<div class="space-y-3">
					<h6 class="font-medium">
						<LucideIcon
							name="Monitor"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/> <span class="align-middle whitespace-nowrap">Sophia Mia</span>
					</h6>
					<h6 class="font-medium">
						<LucideIcon
							name="BriefcaseBusiness"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/> <span class="align-middle whitespace-nowrap">UI / UX Designer</span>
					</h6>
					<h6 class="font-medium">
						<LucideIcon
							name="MapPin"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/> <span class="align-middle whitespace-nowrap">Argentina</span>
					</h6>
					<h6 class="font-medium">
						<LucideIcon
							name="Cake"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/> <span class="align-middle whitespace-nowrap">24 Jun, 1998</span>
					</h6>
				</div>
				<div class="dark:border-dark-800 mt-4 space-y-3 border-t border-gray-200 pt-4">
					<h6 class="font-medium">
						<LucideIcon
							name="Globe"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/> <a href="#!" class="align-middle whitespace-nowrap">www.domiex.com</a>
					</h6>
					<h6 class="font-medium">
						<LucideIcon
							name="Mail"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/>
						<a href="mailto:support@example.com" class="align-middle whitespace-nowrap"
							>support@example.com</a
						>
					</h6>
					<h6 class="font-medium">
						<LucideIcon
							name="Phone"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/>
						<a href="tel:+1511555333222" class="align-middle whitespace-nowrap"
							>+(151) 1555 333 222</a
						>
					</h6>
					<h6 class="font-medium">
						<LucideIcon
							name="Twitter"
							class="dark:text-dark-500 inline-block size-4 text-gray-500 ltr:mr-2 rtl:ml-2"
						/> <span class="align-middle whitespace-nowrap">SRBThemes</span>
					</h6>
				</div>
				<p
					class="dark:border-dark-800 dark:text-dark-500 mt-4 mb-3 space-y-3 border-t border-gray-200 pt-4 text-sm font-medium text-gray-500 uppercase"
				>
					Fluent In
				</p>
				<div class="flex items-center gap-2">
					<span
						class="dark:border-dark-800 dark:text-dark-500 badge border-gray-200 bg-transparent text-gray-500"
						>English</span
					>
					<span
						class="dark:border-dark-800 dark:text-dark-500 badge border-gray-200 bg-transparent text-gray-500"
						>Madrian</span
					>
					<span
						class="dark:border-dark-800 dark:text-dark-500 badge border-gray-200 bg-transparent text-gray-500"
						>French</span
					>
				</div>
			</CardBody>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Badges</CardTitle>
			</CardHeader>
			<div class="card-body flex items-center gap-2">
				<Tooltip message="New user" position="top">
					<img src="/assets/images/others/new.png" alt="" class="size-7" />
				</Tooltip>
				<Tooltip message="Verified Badge" position="top">
					<img src="/assets/images/others/quality.png" alt="" class="size-7" />
				</Tooltip>
				<Tooltip message="High Quality" position="top">
					<img src="/assets/images/others/high-quality.png" alt="" class="size-7" />
				</Tooltip>
				<Tooltip message="Reward" position="top">
					<img src="/assets/images/others/reward.png" alt="" class="size-7" />
				</Tooltip>
			</div>
		</Card>
	</Col>

	<Col cols={{ span: 12 }} xl={{ span: 9 }}>
		<Card>
			<CardHeader>
				<CardTitle>Create Notes</CardTitle>
			</CardHeader>
			<CardBody>
				<form action="#!">
					<div class="mb-4">
						<label for="basicInput1" class="form-label">Notes Image</label>
						<input type="file" id="basicInput1" class="form-file form-file-light" />
					</div>
					<div class="mb-4">
						<label for="basicInput1" class="form-label hidden">Notes Title</label>
						<input type="text" id="basicInput1" class="form-input" placeholder="Note Title" />
					</div>
					<div class="mb-4">
						<label for="writeNotes" class="form-label hidden">Notes</label>
						<textarea
							name="writeNotes"
							id="writeNotes"
							rows="3"
							class="form-input h-auto"
							placeholder="Write your notes"
						></textarea>
					</div>
					<div class="ltr:text-right rtl:text-left">
						<button type="submit" class="btn btn-primary">Create Notes</button>
					</div>
				</form>
			</CardBody>
		</Card>
		<Card>
			<CardBody>
				<Grid cols={12} gap={5}>
					<Col cols={{ span: 12 }}>
						<div class="mb-3 flex items-center gap-3 lg:mb-0 lg:ltr:float-right lg:rtl:float-left">
							<a href="#!" class="link link-green" title="edit"
								><LucideIcon name="Pencil" class="size-4" /></a
							>
							<a href="#!" class="link link-red" title="delete"
								><LucideIcon name="Trash2" class="size-4" /></a
							>
						</div>
						<h6>Business Development Meeting</h6>
						<p class="dark:text-dark-500 mb-3 text-gray-500">
							By <a href="#!" class="link link-primary">Sophia Mia</a> - 2 May, 2024
						</p>
						<p class="dark:text-dark-500 text-gray-500">
							Share updates, discuss strategies, and address challenges or opportunities in a
							structured manner. Align goals and objectives to ensure everyone is working towards
							the same vision. Make informed decisions and outline actionable steps to drive growth
							and expansion.
						</p>
					</Col>
				</Grid>
			</CardBody>
		</Card>

		<Card>
			<CardBody>
				<div class="mb-3 flex items-center gap-3 lg:mb-0 lg:ltr:float-right lg:rtl:float-left">
					<a href="#!" class="link link-green" title="edit"
						><LucideIcon name="Pencil" class="size-4" /></a
					>
					<a href="#!" class="link link-red" title="delete"
						><LucideIcon name="Trash2" class="size-4" /></a
					>
				</div>
				<Grid cols={12} gap={5}>
					<Col cols={{ span: 12 }} lg={{ span: 3 }}>
						<img src="/assets/images/gallery/img-01.jpg" alt="" class="rounded-md" />
					</Col>
					<Col cols={{ span: 12 }} lg={{ span: 9 }}>
						<h6>The best time to visit a destination</h6>
						<p class="dark:text-dark-500 mb-3 text-gray-500">
							By <a href="#!" class="link link-primary">Sophia Mia</a> - 02:54 PM
						</p>

						<p class="dark:text-dark-500 text-gray-500">
							Trip travel notes content" likely refers to documentation or records created during a
							trip to capture experiences, observations, and useful information for future
							reference. These notes can include details such as itinerary, accommodation details,
							transportation arrangements, places visited, notable experiences, expenses, and
							personal reflections. They serve as a valuable resource for recalling memories,
							sharing experiences with others, and planning future trips.
						</p>
					</Col>
				</Grid>
			</CardBody>
		</Card>
		<Card>
			<CardBody>
				<div class="mb-3 flex items-center gap-3 lg:mb-0 lg:ltr:float-right lg:rtl:float-left">
					<a href="#!" class="link link-green" title="edit"
						><LucideIcon name="Pencil" class="size-4" /></a
					>
					<a href="#!" class="link link-red" title="delete"
						><LucideIcon name="Trash2" class="size-4" /></a
					>
				</div>
				<Grid cols={12} gap={5}>
					<Col cols={{ span: 12 }}>
						<h6>Business Strategy Meeting Notes</h6>
						<p class="dark:text-dark-500 mb-3 text-gray-500">
							By <a href="#!" class="link link-primary">Rudy Boring</a> - 06:33 PM
						</p>
						<p class="dark:text-dark-500 mb-2 text-gray-500">
							The meeting concluded with a clear understanding of the current business status, key
							challenges, and actionable steps to drive growth and success. Each attendee left with
							a sense of direction and accountability for their respective tasks.
						</p>
						<ol class="list-inside list-decimal space-y-2">
							<li>Review of Previous Meeting Minutes</li>
							<li>Financial Performance Analysis</li>
							<li>Marketing Strategy Updates</li>
							<li>Operational Efficiency Discussion</li>
							<li>New Business Opportunities</li>
							<li>Action Items and Next Steps</li>
						</ol>
					</Col>
				</Grid>
			</CardBody>
		</Card>
	</Col>
</Grid>
