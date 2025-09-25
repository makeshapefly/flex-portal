<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';

	export let project: {
		title: string;
		description: string;
		icon: string;
		iconColor: string;
		tag: string;
		views: number;
		avatars: string[];
	};
</script>

<Card>
	<CardBody>
		<div class="flex gap-3">
			<div
				class={`rounded-modern flex size-12 shrink-0 items-center justify-center bg-gradient-to-t  ${project.iconColor}`}
			>
				<LucideIcon name={project.icon} class={`relative size-7 stroke-1 ${project.iconColor}`} />
			</div>
			<div class="grow">
				<h6 class="mb-1">
					<a href="#!" class="hover:text-primary-500 transition duration-200 ease-linear"
						>{project.title}</a
					>
				</h6>
				<p class="dark:text-dark-500 line-clamp-5 text-gray-500">{project.description}</p>
			</div>
		</div>
		<div class="mt-3 flex items-center gap-3">
			<a href="#!" class="badge badge-gray ltr:mr-auto rtl:ml-auto">#{project.tag}</a>
			<div class="dark:text-dark-500 text-15 shrink-0 text-gray-500">
				<p>
					<LucideIcon name="Eye" class="inline-block size-4" />
					<span class="align-middle">{project.views}</span>
				</p>
			</div>
		</div>
	</CardBody>
	<div class="card-body dark:border-dark-800 flex items-center gap-3 border-t border-gray-200">
		<div class="flex grow -space-x-3 rtl:space-x-reverse">
			{#each project.avatars as avatar}
				<a href="#!" class="transition duration-300 ease-linear hover:z-10">
					<img
						class="dark:border-dark-900 size-7 rounded-full border-2 border-white"
						src={avatar}
						alt=""
					/>
				</a>
			{/each}
		</div>
		<Dropdown class="dropdown" alignTo="right-bottom">
			<DropdownButton class="link link-primary">
				<LucideIcon name="Ellipsis" class="size-5" />
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden p-2">
				<a href="#!" class="dropdown-item"> Overview </a>
				<a href="#!" class="dropdown-item"> Edit </a>
				<a href="#!" class="dropdown-item"> Delete </a>
			</DropdownMenu>
		</Dropdown>
	</div>
</Card>
