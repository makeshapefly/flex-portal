<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import Tooltip from '$lib/components/ui/tooltip/Tooltip.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalFooter from '$lib/components/ui/modal/ModalFooter.svelte';
	import { usersData } from '../../../routes/(main-layout)/apps-projects-overview/project-user';
	import TippyTooltip from '../ui/tooltip/TippyTooltip.svelte';

	export let variant = 'overview'; // Default variant (this can be dynamically set)

	// Array of tabs to render
	const tabs = [
		{ name: 'overview', label: 'Overview', icon: 'Eye' },
		{ name: 'roadmap', label: 'RoadMap', icon: 'Sparkles' },
		{ name: 'task', label: 'Tasks', icon: 'AlignLeft' },
		{ name: 'files', label: 'Files', icon: 'FileText' },
		{ name: 'users', label: 'Users', icon: 'UserRound' }
	];

	let currentUser = usersData[0]; // Default user is the first one
	let open = false;

	const selectUser = (user: { name: string; image: string; role: string }) => {
		currentUser = user;
	};

	const isActive = (user: { name: string }) => currentUser.name === user.name;

	const assignedUsers = [
		{ name: 'Ina Payne', image: '/assets/images/avatar/user-5.png' },
		{ name: 'Robert Freeman', image: '/assets/images/avatar/user-11.png' },
		{ name: 'Michelle Wile', image: '/assets/images/avatar/user-13.png' },
		{ name: 'William Keen', image: '/assets/images/avatar/user-14.png' },
		{ name: 'Carol Kincaid', image: '/assets/images/avatar/user-16.png' },
		{ name: 'Rachel Jackson', image: '/assets/images/avatar/user-17.png' }
	];

	const reportToUsers = [
		{ name: 'Leal Bureau', image: '/assets/images/avatar/user-20.png' },
		{ name: 'Julie Seltzer', image: '/assets/images/avatar/user-18.png' }
	];
</script>

<Card>
	<div class="rounded-md-t bg-primary-500/10 relative h-44 overflow-hidden">
		<div
			class="border-t-primary-500 border-l-primary-500 absolute -top-2 size-96 rotate-45 border-[60px] opacity-10 ltr:right-0 rtl:left-0"
		></div>
		<div
			class="absolute top-20 size-80 rotate-45 border-[60px] border-green-500 opacity-10 ltr:right-8 rtl:left-8"
		></div>
		<div
			class="absolute top-36 size-40 rotate-45 border-[60px] border-pink-500 opacity-10 ltr:right-28 rtl:left-28"
		></div>
	</div>
	<CardBody>
		<div class="relative mb-6">
			<div class="flex flex-wrap gap-5">
				<div
					class="dark:bg-dark-900 dark:border-dark-800 dark:shadow-dark-850 relative -mt-14 flex size-28 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white shadow-lg shadow-gray-100"
				>
					<img src="assets/images/brands/img-02.png" alt="" class="mx-auto size-16" />
				</div>
				<div class="grow">
					<h5 class="mb-1">
						AI Model Development <span class="badge badge-yellow leading-normal ltr:ml-1 rtl:mr-1"
							>In Progress</span
						>
					</h5>
					<p class="dark:text-dark-500 text-gray-500">Create Date: 25 Jan, 2024</p>
				</div>
				<div class="flex shrink-0 items-center gap-3">
					<ModalTrigger modalId="share-project-modal" text="Add User" color="primary" class="btn" />

					<Dropdown class="dropdown" alignTo="right-bottom">
						<DropdownButton class="btn-icon-text btn-icon btn-sub-gray btn">
							<LucideIcon name="Ellipsis" class="size-5" />
						</DropdownButton>
						<DropdownMenu class="dropdown-menu !fixed hidden p-2">
							<a href="#!" class="dropdown-item"> Create Invoice </a>
							<a href="#!" class="dropdown-item"> Generate Billing </a>
							<a href="#!" class="dropdown-item"> Delete Project </a>
							<a href="#!" class="dropdown-item"> Settings </a>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
		</div>

		<Grid cols={12} gap={5} class="mb-5">
			<Col
				cols={{ span: 12 }}
				class="dark:border-dark-800 rounded-md border border-dashed border-gray-200 p-3 text-center sm:col-span-6 md:col-span-3 xl:col-span-2"
			>
				<h6 class="mb-1">31 May, 2024</h6>
				<p class="dark:text-dark-500 text-gray-500">Due Date</p>
			</Col>
			<Col
				cols={{ span: 12 }}
				class="dark:border-dark-800 rounded-md border border-dashed border-gray-200 p-3 text-center sm:col-span-6 md:col-span-3 xl:col-span-2"
			>
				<h6 class="mb-1">$25,000</h6>
				<p class="dark:text-dark-500 text-gray-500">Budget ($)</p>
			</Col>
			<Col
				cols={{ span: 12 }}
				class="dark:border-dark-800 rounded-md border border-dashed border-gray-200 p-3 text-center sm:col-span-6 md:col-span-3 xl:col-span-2"
			>
				<h6 class="mb-1">$8,000</h6>
				<p class="dark:text-dark-500 text-gray-500">Total Spend ($)</p>
			</Col>
			<Col
				cols={{ span: 12 }}
				class="dark:border-dark-800 rounded-md border border-dashed border-gray-200 p-3 text-center sm:col-span-6 md:col-span-3 xl:col-span-2"
			>
				<Dropdown class="dropdown">
					<DropdownButton class="btn flex gap-2 p-0 text-start" isChevron={true}>
						<img
							src={currentUser.image}
							alt={currentUser.name}
							class="size-10 shrink-0 rounded-full"
						/>
						<span class="block grow">
							<span class="dark:text-dark-500 text-gray-500">{currentUser.role}</span>
							<span class="block font-medium">{currentUser.name}</span>
						</span>
					</DropdownButton>
					<DropdownMenu class="dropdown-menu !fixed !w-52 p-2">
						{#each usersData as user (user.name)}
							<a
								href="#!"
								on:click|preventDefault={() => selectUser(user)}
								class:active={isActive(user)}
								class="dropdown-item"
							>
								<img src={user.image} alt={user.name} class="size-8 shrink-0 rounded-full" />
								<h6>{user.name}</h6>
							</a>
						{/each}
					</DropdownMenu>
				</Dropdown>
			</Col>
		</Grid>

		<Grid cols={12} class="gapo-space mb-space">
			<!-- Assigned To Section -->
			<Col cols={{ span: 12 }} md={{ span: 4 }}>
				<h6 class="mb-1">Assigned To:</h6>
				<div class="flex -space-x-3 rtl:space-x-reverse">
					{#each assignedUsers as user}
						<TippyTooltip
							content={user.name}
							img={user.image}
							position="top"
							color="border-blue-500 size-10"
						></TippyTooltip>
					{/each}
				</div>
			</Col>

			<!-- Report To Section -->
			<Col cols={{ span: 12 }} md={{ span: 4 }}>
				<h6 class="mb-1">Report To:</h6>
				<div class="flex -space-x-3 rtl:space-x-reverse">
					{#each reportToUsers as user}
						<TippyTooltip
							content={user.name}
							img={user.image}
							position="top"
							color="border-blue-500 size-10"
						></TippyTooltip>
					{/each}
				</div>
			</Col>
		</Grid>

		<ul class="tabs-pills overflow-x-auto whitespace-normal">
			{#each tabs as tab}
				<li>
					<a
						href={`/apps-projects-${tab.name}`}
						class="nav-item {variant === tab.name ? 'bg-primary-500 text-primary-50' : ''}"
					>
						<LucideIcon name={tab.icon} class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
						<span class="align-middle">{tab.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</CardBody>
</Card>

<Modal modalId="share-project-modal" let:modalId size="md">
	<ModalHeader {modalId}>
		<h6>Share Project</h6>
	</ModalHeader>
	<ModalBody>
		<div class="flex items-center gap-3">
			<input type="text" id="basicInput1" class="form-input grow" placeholder="name@example.com" />
			<button type="button" class="btn btn-primary shrink-0">Send Invite</button>
		</div>
		<div class="mt-5">
			<div class="space-y-3">
				<div class="flex items-center gap-2">
					<img src="/assets/images/avatar/user-5.png" alt="" class="size-7 shrink-0 rounded-full" />
					<h6 class="grow">Ina Payne</h6>
					<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
						<DropdownButton
							isChevron={true}
							class="dark:text-dark-500 flex items-center gap-2 text-gray-500"
						>
							Admin
						</DropdownButton>

						<DropdownMenu class="dropdown-menu !fixed hidden p-2">
							<a href="#!" class="dropdown-item"> Edit </a>
							<a href="#!" class="dropdown-item"> View Only </a>
							<a href="#!" class="dropdown-item"> Admin </a>
						</DropdownMenu>
					</Dropdown>
				</div>

				<div class="flex items-center gap-2">
					<img
						src="/assets/images/avatar/user-11.png"
						alt=""
						class="size-7 shrink-0 rounded-full"
					/>
					<h6 class="grow">Robert Freeman</h6>
					<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
						<DropdownButton
							isChevron={true}
							class="dark:text-dark-500 flex items-center gap-2 text-gray-500"
						>
							View Only
						</DropdownButton>

						<DropdownMenu class="dropdown-menu !fixed hidden p-2">
							<a href="#!" class="dropdown-item"> Edit </a>
							<a href="#!" class="dropdown-item"> View Only </a>
							<a href="#!" class="dropdown-item"> Admin </a>
						</DropdownMenu>
					</Dropdown>
				</div>

				<div class="flex items-center gap-2">
					<img
						src="/assets/images/avatar/user-12.png"
						alt=""
						class="size-7 shrink-0 rounded-full"
					/>
					<h6 class="grow">Michelle Wile</h6>
					<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
						<DropdownButton
							isChevron={true}
							class="dark:text-dark-500 flex items-center gap-2 text-gray-500"
						>
							Edit
						</DropdownButton>

						<DropdownMenu class="dropdown-menu !fixed hidden p-2">
							<a href="#!" class="dropdown-item"> Edit </a>
							<a href="#!" class="dropdown-item"> View Only </a>
							<a href="#!" class="dropdown-item"> Admin </a>
						</DropdownMenu>
					</Dropdown>
				</div>
				<div class="flex items-center gap-2">
					<img
						src="/assets/images/avatar/user-14.png"
						alt=""
						class="size-7 shrink-0 rounded-full"
					/>
					<h6 class="grow">William Keen</h6>
					<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
						<DropdownButton
							isChevron={true}
							class="dark:text-dark-500 flex items-center gap-2 text-gray-500"
						>
							Edit
						</DropdownButton>

						<DropdownMenu class="dropdown-menu !fixed hidden p-2">
							<a href="#!" class="dropdown-item"> Edit </a>
							<a href="#!" class="dropdown-item"> View Only </a>
							<a href="#!" class="dropdown-item"> Admin </a>
						</DropdownMenu>
					</Dropdown>
				</div>
				<div class="flex items-center gap-2">
					<img
						src="/assets/images/avatar/user-16.png"
						alt=""
						class="size-7 shrink-0 rounded-full"
					/>
					<h6 class="grow">Carol Kincaid</h6>
					<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
						<DropdownButton
							isChevron={true}
							class="dark:text-dark-500 flex items-center gap-2 text-gray-500"
						>
							View Only
						</DropdownButton>

						<DropdownMenu class="dropdown-menu !fixed hidden p-2">
							<a href="#!" class="dropdown-item"> Edit </a>
							<a href="#!" class="dropdown-item"> View Only </a>
							<a href="#!" class="dropdown-item"> Admin </a>
						</DropdownMenu>
					</Dropdown>
				</div>
				<div class="flex items-center gap-2">
					<img
						src="/assets/images/avatar/user-17.png"
						alt=""
						class="size-7 shrink-0 rounded-full"
					/>
					<h6 class="grow">Rachel Jackson</h6>
					<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
						<DropdownButton
							isChevron={true}
							class="dark:text-dark-500 flex items-center gap-2 text-gray-500"
						>
							Edit
						</DropdownButton>

						<DropdownMenu class="dropdown-menu !fixed hidden p-2">
							<a href="#!" class="dropdown-item"> Edit </a>
							<a href="#!" class="dropdown-item"> View Only </a>
							<a href="#!" class="dropdown-item"> Admin </a>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
		</div>
	</ModalBody>
	<ModalFooter>
		<p>
			<a href="#!" class="link link-primary"
				><LucideIcon name="Link" class="inline-block size-4 align-middle ltr:mr-1 rtl:ml-1" /><span
					class="align-baseline">Copy URL</span
				></a
			>
		</p>
	</ModalFooter>
</Modal>
