<script lang="ts">
	import Account from '$lib/components/common/Account.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { closeModal } from '$lib/stores/modal';

	let devices = [
		{
			id: 1,
			name: 'Apple Mac 12.5.1',
			status: 'Online',
			statusClass: 'badge-green',
			location: 'London, United Kingdom',
			ip: '81.64.22.98',
			icon: 'MonitorSmartphone',
			iconClass: 'text-green-500 fill-green-500/10'
		},
		{
			id: 2,
			name: 'Apple iPhone iOS 14.8.5',
			status: 'Offline',
			statusClass: 'badge-gray',
			location: 'Berlin, Germany',
			ip: '225.222.152.154',
			icon: 'Smartphone',
			iconClass: 'text-gray-500 fill-gray-100 dark:text-dark-500 dark:fill-dark-850'
		},
		{
			id: 3,
			name: 'Samsung Phone s24',
			status: 'Offline',
			statusClass: 'badge-gray',
			location: 'Paris, France',
			ip: '225.222.152.154',
			icon: 'Smartphone',
			iconClass: 'text-gray-500 fill-gray-100 dark:text-dark-500 dark:fill-dark-850'
		},
		{
			id: 4,
			name: 'Apple iPhone iOS 14.8.5',
			status: 'Offline',
			statusClass: 'badge-gray',
			location: 'Berlin, Germany',
			ip: '225.222.152.154',
			icon: 'Smartphone',
			iconClass: 'text-gray-500 fill-gray-100 dark:text-dark-500 dark:fill-dark-850'
		},
		{
			id: 5,
			name: 'Samsung Phone s24',
			status: 'Offline',
			statusClass: 'badge-gray',
			location: 'Paris, France',
			ip: '225.222.152.154',
			icon: 'Smartphone',
			iconClass: 'text-gray-500 fill-gray-100 dark:text-dark-500 dark:fill-dark-850'
		}
	];
</script>

<Account variant="logs" />

<Card class="mt-5">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Device and active sessions</CardTitle>
		<ModalTrigger
			modalId="logout-modal"
			text="All Logouts"
			icon="MoveRight"
			color=""
			class="btn-sub-gray btn flex flex-row-reverse px-3 py-1.5 text-xs font-medium"
		/>
	</CardHeader>
	<CardBody>
		<Grid cols={1} gap={5} class="xl:grid-cols-2 2xl:grid-cols-3">
			{#each devices as device}
				<Card class="mb-0">
					<CardBody class="flex items-center gap-3">
						<div class="flex size-12 shrink-0 items-center justify-center">
							<LucideIcon name={device.icon} class={device.iconClass} />
						</div>
						<div class="grow">
							<h6 class="mb-1">
								{device.name}
								<span class={`badge text-xs ltr:ml-1 rtl:mr-1 ${device.statusClass}`}>
									{device.status}
								</span>
							</h6>
							<p class="dark:text-dark-500 text-sm text-gray-500">
								{device.location}. - {device.ip}
							</p>
						</div>
						<Dropdown class="dropdown shrink-0">
							<DropdownButton class="link link-primary flex">
								<LucideIcon name="ChevronRight" />
							</DropdownButton>
							<DropdownMenu class="dropdown-menu !fixed hidden p-2">
								<a href="#!" class="dropdown-item"> Overview </a>
								<ModalTrigger modalId="logout-modal" text="Logout" class="dropdown-item" color="" />
							</DropdownMenu>
						</Dropdown>
					</CardBody>
				</Card>
			{/each}
		</Grid>
	</CardBody>
</Card>

<Modal modalId="logout-modal" size="xs" let:modalId>
	<ModalBody>
		<div class="text-center">
			<div
				class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-red-500 text-red-50 ring-4 ring-red-500/10"
			>
				<LucideIcon name="LogOut" class="size-6" />
			</div>
			<h5 class="mb-2">Logout This Device</h5>
			<p class="dark:text-dark-500 mb-5 text-gray-500">
				Are you sure you want to log out from this device?
			</p>
			<div class="flex items-center justify-end gap-2">
				<button class="btn btn-red">Logout Device</button>
				<button class="btn link link-primary" on:click={() => closeModal()}>Cancel</button>
			</div>
		</div>
	</ModalBody>
</Modal>
