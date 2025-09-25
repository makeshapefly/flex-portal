<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import User from '$lib/components/common/User.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardFooter from '$lib/components/ui/card/CardFooter.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
</script>

<User variant="documents" />

<div class="mt-4">
	<div class="flex items-center gap-5">
		<h5 class="text-16 grow">Documents</h5>
		<div class="shrink-0">
			<Dropdown class="dropdown">
				<DropdownButton class="btn btn-sub-gray">
					<LucideIcon name="SlidersHorizontal" class="mr-1 inline-block size-4" />
					<span class="align-middle whitespace-nowrap">Filter</span>
				</DropdownButton>
				<DropdownMenu class="dropdown-menu dropdown-right !w-80 p-4">
					<h6 class="mb-4">Filter Options</h6>
					<form action="#!">
						<p class="mb-2 text-sm font-medium">Member Type:</p>

						<div class="grid grid-cols-2 gap-4">
							<div class="input-check-group">
								<input id="memaberType1" class="input-check input-check-primary" type="checkbox" />
								<label for="memaberType1" class="input-check-label">Author</label>
							</div>
							<div class="input-check-group">
								<input id="memaberType2" class="input-check input-check-primary" type="checkbox" />
								<label for="memaberType2" class="input-check-label">Customer</label>
							</div>
							<div class="col-span-2">
								<p class="mb-2 text-sm font-medium">Files Type:</p>
								<div id="multipleSelect"></div>
							</div>
						</div>

						<div class="mt-4 flex items-center justify-end gap-2">
							<button type="reset" class="btn-xs btn btn-sub-gray"> Reset </button>
							<button type="submit" class="btn-xs btn btn-primary"> Apply </button>
						</div>
					</form>
				</DropdownMenu>
			</Dropdown>
		</div>
	</div>

	<Grid cols={1} gapX={5} class="mt-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5">
		<Card class="relative">
			<CardBody>
				<LucideIcon
					name="FolderClosed"
					class="size-8 fill-indigo-500/10 stroke-1 text-indigo-500"
				/>
				<h6 class="mt-4 mb-1">
					<a href="#!" class="before:absolute before:inset-0 before:content-['']">Projects 2024</a>
				</h6>
				<p class="dark:text-dark-500 text-gray-500">23 Files - 128 MB</p>
			</CardBody>
		</Card>
		<Card class="relative">
			<CardBody>
				<LucideIcon
					name="FolderClosed"
					class="size-8 fill-indigo-500/10 stroke-1 text-indigo-500"
				/>
				<h6 class="mt-4 mb-1">
					<a href="#!" class="before:absolute before:inset-0 before:content-['']">All Contact</a>
				</h6>
				<p class="dark:text-dark-500 text-gray-500">49 Files - 27 MB</p>
			</CardBody>
		</Card>
		<Card class="relative">
			<CardBody>
				<LucideIcon
					name="FolderClosed"
					class="size-8 fill-indigo-500/10 stroke-1 text-indigo-500"
				/>
				<h6 class="mt-4 mb-1">
					<a href="#!" class="before:absolute before:inset-0 before:content-['']"
						>Marketing Analysis</a
					>
				</h6>
				<p class="dark:text-dark-500 text-gray-500">3 Files - 5.65 MB</p>
			</CardBody>
		</Card>
		<Card class="relative">
			<CardBody>
				<LucideIcon
					name="FolderClosed"
					class="size-8 fill-indigo-500/10 stroke-1 text-indigo-500"
				/>
				<h6 class="mt-4 mb-1">
					<a href="#!" class="before:absolute before:inset-0 before:content-['']">Images & Video</a>
				</h6>
				<p class="dark:text-dark-500 text-gray-500">163 Files - 0.9 GB</p>
			</CardBody>
		</Card>
		<Card class="relative">
			<CardBody>
				<LucideIcon
					name="FolderClosed"
					class="size-8 fill-indigo-500/10 stroke-1 text-indigo-500"
				/>
				<h6 class="mt-4 mb-1">
					<a href="#!" class="before:absolute before:inset-0 before:content-['']">Application</a>
				</h6>
				<p class="dark:text-dark-500 text-gray-500">149 Files - 68.83 GB</p>
			</CardBody>
		</Card>
	</Grid>

	<h5 class="text-16">Files</h5>
	<Grid cols={1} gapX={5} class="mt-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5">
		<Card class="relative">
			<CardBody>
				<LucideIcon name="File" class="size-8 fill-sky-500/10 stroke-1 text-sky-500" />
				<h6 class="mt-4 mb-1">
					<a href="#!" class="before:absolute before:inset-0 before:content-['']"
						>tailwind.config.js</a
					>
				</h6>
				<p class="dark:text-dark-500 text-gray-500">4 KB</p>
			</CardBody>
		</Card>
		<Card class="relative">
			<CardBody>
				<LucideIcon name="File" class="size-8 fill-sky-500/10 stroke-1 text-sky-500" />
				<h6 class="mt-4 mb-1">
					<a href="#!" class="before:absolute before:inset-0 before:content-['']">package.json</a>
				</h6>
				<p class="dark:text-dark-500 text-gray-500">2 kb</p>
			</CardBody>
		</Card>
		<Card class="relative">
			<CardBody>
				<LucideIcon name="File" class="size-8 fill-sky-500/10 stroke-1 text-sky-500" />
				<h6 class="mt-4 mb-1">
					<a href="#!" class="before:absolute before:inset-0 before:content-['']">vite.config.js</a>
				</h6>
				<p class="dark:text-dark-500 text-gray-500">5 KB</p>
			</CardBody>
		</Card>
		<Card class="relative">
			<CardBody>
				<LucideIcon name="File" class="size-8 fill-sky-500/10 stroke-1 text-sky-500" />
				<h6 class="mt-4 mb-1">
					<a href="#!" class="before:absolute before:inset-0 before:content-['']">vite.config.js</a>
				</h6>
				<p class="dark:text-dark-500 text-gray-500">5 KB</p>
			</CardBody>
		</Card>
		<Card class="relative">
			<CardBody>
				<LucideIcon name="File" class="size-8 fill-sky-500/10 stroke-1 text-sky-500" />
				<h6 class="mt-4 mb-1">
					<a href="#!" class="before:absolute before:inset-0 before:content-['']">index.html</a>
				</h6>
				<p class="dark:text-dark-500 text-gray-500">129 kb</p>
			</CardBody>
		</Card>
	</Grid>

	<h5 class="text-16">Images & Video</h5>
	<Grid cols={1} gapX={5} class="mt-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5">
		<Card class="relative">
			<CardBody>
				<img
					src="/assets/images/gallery/img-01.jpg"
					alt=""
					class="shadow-primary-500/10 aspect-video rounded-md object-cover shadow-lg"
				/>
				<h6 class="mt-4 mb-1 truncate">
					<a href="#!" class="before:absolute before:inset-0 before:content-['']"
						>Adventure is a form of self care</a
					>
				</h6>
				<p class="dark:text-dark-500 text-gray-500">15.6 KB</p>
			</CardBody>
		</Card>
		<Card class="relative">
			<CardBody>
				<iframe
					class="shadow-primary-500/10 aspect-video w-full rounded-md object-cover shadow-lg"
					src="https://www.youtube.com/embed/eSzNNYk7nVU?si=EHJjJ8BjAsp6yMgx"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
				<h6 class="mt-4 mb-1 truncate">Rebuilding iOS 15 with Tailwind CSS</h6>
				<p class="dark:text-dark-500 text-gray-500">23.98 MB</p>
			</CardBody>
		</Card>
		<Card class="relative">
			<CardBody>
				<iframe
					class="shadow-primary-500/10 aspect-video w-full rounded-md object-cover shadow-lg"
					src="https://www.youtube.com/embed/Tmkr2kKUEgU?si=g6q_jn3gzqxK_CMj"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
				<h6 class="mt-4 mb-1 truncate">
					Building Blurry, Animated Background Shapes with Tailwind CSS
				</h6>
				<p class="dark:text-dark-500 text-gray-500">46.32 MB</p>
			</CardBody>
		</Card>
		<Card class="relative">
			<CardBody>
				<img
					src="assets/images/gallery/img-02.jpg"
					alt=""
					class="shadow-primary-500/10 aspect-video rounded-md object-cover shadow-lg"
				/>
				<h6 class="mt-4 mb-1 truncate">
					<a href="#!" class="before:absolute before:inset-0 before:content-['']"
						>Cuteness in every bloom</a
					>
				</h6>
				<p class="dark:text-dark-500 text-gray-500">1.97 KB</p>
			</CardBody>
		</Card>
		<Card class="relative">
			<CardBody>
				<img
					src="assets/images/gallery/img-03.jpg"
					alt=""
					class="shadow-primary-500/10 aspect-video rounded-md object-cover shadow-lg"
				/>
				<h6 class="mt-4 mb-1 truncate">
					<a href="#!" class="before:absolute before:inset-0 before:content-['']"
						>Finding paradise wherever I go</a
					>
				</h6>
				<p class="dark:text-dark-500 text-gray-500">0.587 KB</p>
			</CardBody>
		</Card>
	</Grid>
</div>
