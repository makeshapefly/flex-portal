<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownItem from '$lib/components/ui/dropdown/DropdownItem.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Dropdown" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Base Dropdown</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-4">
				<Dropdown class="dropdown">
					<DropdownButton class="btn-sub-gray btn flex items-center gap-2" isChevron={true}>
						Dropdown Options
					</DropdownButton>

					<DropdownMenu class="!fixed hidden p-2" transition="scale">
						<DropdownItem link="#!" text="New Task" />

						<a href="#!" class="dropdown-item"> New Task </a>

						<a href="#!" class="dropdown-item"> Edit Task </a>

						<a href="#!" class="dropdown-item">
							<span class="text-red-500">Delete Task</span>
						</a>
					</DropdownMenu>
				</Dropdown>

				<Dropdown class="dropdown" transition="scale">
					<DropdownButton class="flex items-center gap-2" isChevron={true}>
						Dropdown Link Options
					</DropdownButton>

					<DropdownMenu class="dropdown-menu !fixed hidden p-2" transition="scale">
						<a href="#!" class="dropdown-item"> New Task </a>

						<a href="#!" class="dropdown-item"> Edit Task </a>

						<a href="#!" class="dropdown-item">
							<span class="text-red-500">Delete Task</span>
						</a>
					</DropdownMenu>
				</Dropdown>
			</div>
		</CardBody>
	</Col><!--Base-->

	<Col cols={{ span: 12 }} class="card" transition="scale">
		<CardHeader>
			<CardTitle>Position Dropdown</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-4">
				<Dropdown class="dropdown" transition="scale">
					<DropdownButton class="btn-sub-gray btn flex items-center gap-2" isChevron={true}>
						Dropdown Options
					</DropdownButton>

					<DropdownMenu class="!fixed hidden p-2">
						<a href="#!" class="dropdown-item"> New Task </a>

						<a href="#!" class="dropdown-item"> Edit Task </a>

						<a href="#!" class="dropdown-item">
							<span class="text-red-500">Delete Task</span>
						</a>
					</DropdownMenu>
				</Dropdown>

				<Dropdown class="dropdown" alignTo="right-bottom" transition="scale">
					<DropdownButton isChevron={true} class="btn-sub-gray btn flex items-center gap-2">
						Right Dropdown
					</DropdownButton>

					<DropdownMenu class="dropdown-menu !fixed hidden p-2">
						<a href="#!" class="dropdown-item"> New Task </a>

						<a href="#!" class="dropdown-item"> Edit Task </a>

						<a href="#!" class="dropdown-item">
							<span class="text-red-500">Delete Task</span>
						</a>
					</DropdownMenu>
				</Dropdown>

				<Dropdown class="dropdown" alignTo="right-top" transition="scale">
					<DropdownButton isChevron={true} class="btn-sub-gray btn flex items-center gap-2">
						Right Top Dropdown
					</DropdownButton>

					<DropdownMenu class="!fixed hidden p-2">
						<a href="#!" class="dropdown-item"> New Task </a>

						<a href="#!" class="dropdown-item"> Edit Task </a>

						<a href="#!" class="dropdown-item">
							<span class="text-red-500">Delete Task</span>
						</a>
					</DropdownMenu>
				</Dropdown>

				<Dropdown class="dropdown" alignTo="left-top">
					<DropdownButton isChevron={true} class="btn-sub-gray btn flex items-center gap-2">
						Left Top Dropdown Options
					</DropdownButton>
					<DropdownMenu class="!fixed hidden p-2">
						<a href="#!" class="dropdown-item"> New Task </a>

						<a href="#!" class="dropdown-item"> Edit Task </a>

						<a href="#!" class="dropdown-item">
							<span class="text-red-500">Delete Task</span>
						</a>
					</DropdownMenu>
				</Dropdown>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Colored Dropdown</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-4">
				<Dropdown class="dropdown" alignTo="left">
					<DropdownButton isChevron={true} class="btn-primary btn flex items-center gap-2">
						Primary Option
					</DropdownButton>

					<DropdownMenu class="dropdown-menu !fixed hidden p-2">
						<a href="#!" class="dropdown-item dropdown-primary"> New Task </a>

						<a href="#!" class="dropdown-item dropdown-primary"> Edit Task </a>

						<a href="#!" class="dropdown-item dropdown-primary"> Delete Task </a>
					</DropdownMenu>
				</Dropdown>
				<Dropdown class="dropdown">
					<DropdownButton isChevron={true} class="btn-green btn flex items-center gap-2">
						Green Option
					</DropdownButton>

					<DropdownMenu class="!fixed hidden p-2">
						<a href="#!" class="dropdown-item dropdown-green"> New Task </a>

						<a href="#!" class="dropdown-item dropdown-green"> Edit Task </a>

						<a href="#!" class="dropdown-item dropdown-green"> Delete Task </a>
					</DropdownMenu>
				</Dropdown>
				<Dropdown class="dropdown">
					<DropdownButton isChevron={true} class="btn-purple btn flex items-center gap-2">
						Purple Option
					</DropdownButton>

					<DropdownMenu class="!fixed hidden p-2">
						<a href="#!" class="dropdown-item dropdown-purple"> New Task </a>

						<a href="#!" class="dropdown-item dropdown-purple"> Edit Task </a>

						<a href="#!" class="dropdown-item dropdown-purple"> Delete Task </a>
					</DropdownMenu>
				</Dropdown>
				<Dropdown class="dropdown">
					<DropdownButton isChevron={true} class="btn-yellow btn flex items-center gap-2">
						Yellow Option
					</DropdownButton>

					<DropdownMenu class="!fixed hidden p-2">
						<a href="#!" class="dropdown-item dropdown-yellow"> New Task </a>

						<a href="#!" class="dropdown-item dropdown-yellow"> Edit Task </a>

						<a href="#!" class="dropdown-item dropdown-yellow"> Delete Task </a>
					</DropdownMenu>
				</Dropdown>
				<Dropdown class="dropdown">
					<DropdownButton isChevron={true} class="btn-sky btn flex items-center gap-2">
						Sky Option
					</DropdownButton>

					<DropdownMenu class="!fixed hidden p-2">
						<a href="#!" class="dropdown-item dropdown-sky"> New Task </a>

						<a href="#!" class="dropdown-item dropdown-sky"> Edit Task </a>

						<a href="#!" class="dropdown-item dropdown-sky"> Delete Task </a>
					</DropdownMenu>
				</Dropdown>
				<Dropdown class="dropdown">
					<DropdownButton isChevron={true} class="btn-red btn flex items-center gap-2">
						Red Option
					</DropdownButton>

					<DropdownMenu class="dropdown-menu !fixed hidden p-2">
						<a href="#!" class="dropdown-item dropdown-red"> New Task </a>

						<a href="#!" class="dropdown-item dropdown-red"> Edit Task </a>

						<a href="#!" class="dropdown-item dropdown-red"> Delete Task </a>
					</DropdownMenu>
				</Dropdown>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Profile Dropdown</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-4">
				<Dropdown class="dropdown">
					<DropdownButton isChevron={true} class="btn btn-primary flex items-center gap-2">
						Profile
					</DropdownButton>

					<DropdownMenu class="!fixed !w-72" isPrintable={true}>
						<div class="dark:border-dark-800 flex items-center gap-3 border-b border-gray-200 p-4">
							<img
								src="/assets/images/avatar/user-17.png"
								alt=""
								class="size-9 shrink-0 rounded-full"
							/>
							<div class="grow overflow-hidden">
								<h6>Sophia Mia</h6>
								<a href="#!" class="link link-primary truncate">sophia@srbthemes.com</a>
							</div>
							<div class="shrink-0">
								<span class="badge badge-pink">Pro</span>
							</div>
						</div>
						<div class="space-y-4 p-4 *:flex *:items-center">
							<a href="#!" class="link link-primary"
								><i data-lucide="user-round" class="size-4 ltr:mr-1 rtl:ml-1"></i> Account Settings</a
							>
							<a href="#!" class="link link-primary"
								><i data-lucide="venetian-mask" class="size-4 ltr:mr-1 rtl:ml-1"></i> Go Incognito</a
							>
							<a href="#!" class="link link-primary"
								><i data-lucide="headset" class="size-4 ltr:mr-1 rtl:ml-1"></i> Help Center</a
							>
							<a href="#!" class="link link-primary">
								<i data-lucide="moon" class="size-4 ltr:mr-1 rtl:ml-1"></i>
								<span class="grow">Dark Mode</span>
								<label
									for="darkModeProfile"
									class="text-dark flex shrink-0 cursor-pointer items-center select-none dark:text-white"
								>
									<div class="relative">
										<input type="checkbox" id="darkModeProfile" class="peer sr-only" />
										<div class="block h-6 w-10 rounded-full border border-gray-200"></div>
										<div
											class="absolute top-1 left-1 size-4 rounded-full bg-gray-200 transition peer-checked:translate-x-full peer-checked:bg-sky-500"
										></div>
									</div>
								</label>
							</a>
							<a href="#!" class="link link-primary"
								><i data-lucide="phone" class="size-4 ltr:mr-1 rtl:ml-1"></i> Contact Us</a
							>
						</div>
					</DropdownMenu>
				</Dropdown>
			</div>
		</CardBody>
	</Col>
	<!-- Base -->
</Grid>
