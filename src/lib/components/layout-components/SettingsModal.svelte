<script lang="ts">
	import {
		layoutStore,
		setLayoutMode,
		setNavigation,
		setContentWidth,
		setLayoutTheme,
		setLayoutDir,
		setSidebarSize,
		setDarkModeColor,
		setSidebarColor,
		setPrimaryColors,
		resetAttributes
	} from '$lib/stores/layout';
	import LucideIcon from '../common/LucideIcon.svelte';
	import Modal from '../ui/modal/Modal.svelte';
	import ModalBody from '../ui/modal/ModalBody.svelte';
	import ModalFooter from '../ui/modal/ModalFooter.svelte';
	import ModalHeader from '../ui/modal/ModalHeader.svelte';
	import DotIndicators from './DotIndicators.svelte';

	type SidebarColors = 'light' | 'dark' | 'brand' | 'purple' | 'sky';

	interface SidebarColorType {
		id: string;
		value: SidebarColors;
		bgColor: string;
	}

	const sidebarColors: SidebarColorType[] = [
		{ id: 'lightSidebarColors', value: 'light', bgColor: 'bg-gray-100' },
		{ id: 'darkSidebarColors', value: 'dark', bgColor: 'bg-gray-800' },
		{ id: 'brandSidebarColors', value: 'brand', bgColor: 'bg-primary-900' },
		{ id: 'purpleSidebarColors', value: 'purple', bgColor: 'bg-purple-950' },
		{ id: 'skySidebarColors', value: 'sky', bgColor: 'bg-sky-950' }
	];

	type PrimaryColors =
		| 'default'
		| 'green'
		| 'violet'
		| 'orange'
		| 'teal'
		| 'fuchsia'
		| 'lime'
		| 'amber';

	interface PrimaryColor {
		id: string;
		value: PrimaryColors;
		bgColor: string;
	}

	const primaryColors: PrimaryColor[] = [
		{ id: 'defaultPrimaryColors', value: 'default', bgColor: 'bg-[#358ffc]' },
		{ id: 'greenPrimaryColors', value: 'green', bgColor: 'bg-[#1acd81]' },
		{ id: 'violetPrimaryColors', value: 'violet', bgColor: 'bg-violet-500' },
		{ id: 'orangePrimaryColors', value: 'orange', bgColor: 'bg-[#f04b1f]' },
		{ id: 'tealPrimaryColors', value: 'teal', bgColor: 'bg-teal-500' },
		{ id: 'fuchsiaPrimaryColors', value: 'fuchsia', bgColor: 'bg-fuchsia-500' },
		{ id: 'limePrimaryColors', value: 'lime', bgColor: 'bg-lime-500' },
		{ id: 'amberPrimaryColors', value: 'amber', bgColor: 'bg-amber-500' }
	];

	type DarkModeColors = 'default' | 'zinc' | 'stone' | 'neutral' | 'gray';

	const darkModeColors: { id: string; value: DarkModeColors; bgColor: string }[] = [
		{
			id: 'noneColors',
			value: 'default',
			bgColor: 'border border-gray-200 dark:border-dark-800'
		},
		{ id: 'zincColors', value: 'zinc', bgColor: 'bg-zinc-950' },
		{ id: 'stoneColors', value: 'stone', bgColor: 'bg-stone-950' },
		{ id: 'neutralColors', value: 'neutral', bgColor: 'bg-neutral-950' },
		{ id: 'defaultColors', value: 'gray', bgColor: 'bg-gray-950' }
	];
</script>

<Modal modalId="customize" let:modalId position="center" size="xl" transition="fly-top">
	<ModalHeader {modalId}>
		<h6>Domiex Customize</h6>
	</ModalHeader>
	<ModalBody>
		<div>
			<h6 class="mb-3">Select Layout:</h6>
			<div class="gap-space grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				<div class="input-radio-group flex-col gap-0">
					<input
						on:change={() => setLayoutMode('default')}
						value="default"
						id="defaultLayout"
						name="layout"
						type="radio"
						class="input-radio peer hidden"
						bind:group={$layoutStore.layoutMode}
					/>
					<label
						for="defaultLayout"
						class="card peer-checked:border-primary-500 mb-3 block h-28 w-full cursor-pointer overflow-hidden"
					>
						<span class="block h-full">
							<DotIndicators />
							<span class="grid h-[calc(100%_-_8px)] grid-cols-12">
								<span class="dark:bg-dark-850 col-span-2 h-[calc(100%_-_8px)] bg-gray-50"></span>
								<span class="col-span-10 inline-block h-[calc(100%_-_8px)] p-1.5">
									<span class="dark:bg-dark-850 block h-1.5 w-1/3 rounded-md bg-gray-100"></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/2 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-full rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/3 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-2/3 rounded-md bg-gray-100"
									></span>
								</span>
							</span>
						</span>
					</label>
					<label for="defaultLayout" class="form-label cursor-pointer">Default</label>
				</div>
				<div class="input-radio-group flex-col gap-0">
					<input
						on:change={() => setLayoutMode('horizontal')}
						value="horizontal"
						id="horizontalLayout"
						name="layout"
						type="radio"
						class="input-radio peer hidden"
						bind:group={$layoutStore.layoutMode}
					/>
					<label
						for="horizontalLayout"
						class="card peer-checked:border-primary-500 mb-3 block h-28 w-full cursor-pointer overflow-hidden"
					>
						<span class="block h-full">
							<DotIndicators />
							<span class="dark:bg-dark-850 block h-2 bg-gray-50"></span>
							<span class="grid grid-cols-12 gap-0">
								<span class="col-span-12 inline-block p-2">
									<span class="dark:bg-dark-850 block h-1.5 w-1/3 rounded-md bg-gray-100"></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/2 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-full rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/3 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-2/3 rounded-md bg-gray-100"
									></span>
								</span>
							</span>
						</span>
					</label>
					<label for="horizontalLayout" class="form-label cursor-pointer">Horizontal</label>
				</div>
				<div class="input-radio-group hidden flex-col gap-0 lg:flex">
					<input
						on:change={() => setLayoutMode('modern')}
						value="modern"
						id="modernLayout"
						name="layout"
						type="radio"
						class="input-radio peer hidden"
						bind:group={$layoutStore.layoutMode}
					/>
					<label
						for="modernLayout"
						class="card peer-checked:border-primary-500 mb-3 block h-28 w-full cursor-pointer overflow-hidden"
					>
						<span class="flex h-full">
							<span class="dark:bg-dark-850 h-full w-3 shrink-0 bg-gray-50"></span>
							<span class="grow">
								<DotIndicators />
								<span class="block p-1.5">
									<span class="dark:bg-dark-850 block h-1.5 w-1/3 rounded-md bg-gray-100"></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/2 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-full rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/3 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-2/3 rounded-md bg-gray-100"
									></span>
								</span>
							</span>
						</span>
					</label>
					<label for="modernLayout" class="form-label cursor-pointer">Modern</label>
				</div>
				<div class="input-radio-group flex-col gap-0">
					<input
						on:change={() => setLayoutMode('boxed')}
						value="boxed"
						id="boxedLayout"
						name="layout"
						type="radio"
						class="input-radio peer hidden"
						bind:group={$layoutStore.layoutMode}
					/>
					<label
						for="boxedLayout"
						class="card peer-checked:border-primary-500 mb-3 block h-28 w-full cursor-pointer overflow-hidden p-1.5"
					>
						<span class="block h-full">
							<DotIndicators />
							<span class="grid h-[calc(100%_-_8px)] grid-cols-12">
								<span class="dark:bg-dark-850 col-span-2 h-[calc(100%_-_8px)] bg-gray-50"></span>
								<span class="col-span-10 inline-block h-[calc(100%_-_8px)] p-1.5">
									<span class="dark:bg-dark-850 block h-1.5 w-1/3 rounded-md bg-gray-100"></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/2 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-full rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/3 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-2/3 rounded-md bg-gray-100"
									></span>
								</span>
							</span>
						</span>
					</label>
					<label for="boxedLayout" class="form-label cursor-pointer">Boxed</label>
				</div>
				<div class="input-radio-group hidden flex-col gap-0 lg:flex">
					<input
						on:change={() => setLayoutMode('semibox')}
						value="semibox"
						id="semiboxLayout"
						name="layout"
						type="radio"
						class="input-radio peer hidden"
						bind:group={$layoutStore.layoutMode}
					/>
					<label
						for="semiboxLayout"
						class="card peer-checked:border-primary-500 mb-3 block h-28 w-full cursor-pointer overflow-hidden p-1.5"
					>
						<span class="block h-full">
							<DotIndicators />
							<span class="grid h-[calc(100%_-_8px)] grid-cols-12">
								<span class="dark:bg-dark-850 col-span-2 h-[calc(100%_-_8px)] bg-gray-50"></span>
								<span class="col-span-10 inline-block h-[calc(100%_-_8px)] p-1.5">
									<span class="dark:bg-dark-850 block h-1.5 w-1/3 rounded-md bg-gray-100"></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/2 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-full rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/3 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-2/3 rounded-md bg-gray-100"
									></span>
								</span>
							</span>
						</span>
					</label>
					<label for="semiboxLayout" class="form-label cursor-pointer">Semibox</label>
				</div>
			</div>

			{#if $layoutStore.layoutMode === 'modern'}
				<div class="hidden lg:block">
					<h6 class="my-3">Navigation Type</h6>
					<div class="gap-space grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
						<div class="input-radio-group">
							<input
								on:change={() => setNavigation('default')}
								id="defaultType"
								name="navType"
								value="default"
								type="radio"
								class="input-radio input-radio-primary"
								bind:group={$layoutStore.navType}
							/>
							<label for="defaultType" class="input-radio-label">Default</label>
						</div>
						<div class="input-radio-group">
							<input
								on:change={() => setNavigation('floating')}
								id="floatingType"
								name="navType"
								value="floating"
								type="radio"
								class="input-radio input-radio-primary"
								bind:group={$layoutStore.navType}
							/>
							<label for="floatingType" class="input-radio-label">Floating</label>
						</div>
						<div class="input-radio-group">
							<input
								on:change={() => setNavigation('boxed')}
								id="boxedType"
								name="navType"
								type="radio"
								value="boxed"
								class="input-radio input-radio-primary"
								bind:group={$layoutStore.navType}
							/>
							<label for="boxedType" class="input-radio-label">Boxed</label>
						</div>
						<div class="input-radio-group">
							<input
								on:change={() => setNavigation('pattern')}
								id="patternType"
								name="navType"
								type="radio"
								value="pattern"
								class="input-radio input-radio-primary"
								bind:group={$layoutStore.navType}
							/>
							<label for="patternType" class="input-radio-label">Pattern</label>
						</div>
					</div>
				</div>
			{/if}

			<div class="hidden xl:block">
				<h6 class="my-4">Content Width:</h6>
				<div class="gap-space grid grid-cols-2 md:grid-cols-4">
					<div class="input-radio-group flex-col gap-0">
						<input
							on:change={() => setContentWidth('default')}
							value="default"
							id="defaultContent"
							name="contentWidth"
							type="radio"
							class="input-radio peer hidden"
							bind:group={$layoutStore.contentWidth}
						/>
						<label
							for="defaultContent"
							class="card peer-checked:border-primary-500 mb-3 block h-28 w-full cursor-pointer overflow-hidden"
						>
							<span class="block h-full">
								<DotIndicators />
								<span class="grid h-[calc(100%_-_8px)] grid-cols-12">
									<span class="dark:bg-dark-850 col-span-2 h-[calc(100%_-_8px)] bg-gray-50"></span>
									<span class="col-span-10 inline-block h-[calc(100%_-_8px)] px-4 py-1.5">
										<span class="dark:bg-dark-850 block h-1.5 w-1/3 rounded-md bg-gray-100"></span>
										<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/2 rounded-md bg-gray-100"
										></span>
										<span class="dark:bg-dark-850 mt-1 block h-1.5 w-full rounded-md bg-gray-100"
										></span>
										<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/3 rounded-md bg-gray-100"
										></span>
										<span class="dark:bg-dark-850 mt-1 block h-1.5 w-2/3 rounded-md bg-gray-100"
										></span>
									</span>
								</span>
							</span>
						</label>
						<label for="defaultContent" class="form-label cursor-pointer">Default</label>
					</div>
					<div class="input-radio-group flex-col gap-0">
						<input
							on:change={() => setContentWidth('fluid')}
							value="fluid"
							id="fluidLayout"
							name="contentWidth"
							type="radio"
							class="input-radio peer hidden"
							bind:group={$layoutStore.contentWidth}
						/>
						<label
							for="fluidLayout"
							class="card peer-checked:border-primary-500 mb-3 block h-28 w-full cursor-pointer overflow-hidden"
						>
							<span class="block h-full">
								<DotIndicators />
								<span class="grid h-[calc(100%_-_8px)] grid-cols-12">
									<span class="dark:bg-dark-850 col-span-2 h-[calc(100%_-_8px)] bg-gray-50"></span>
									<span class="col-span-10 inline-block h-[calc(100%_-_8px)] p-1.5">
										<span class="dark:bg-dark-850 block h-1.5 w-1/3 rounded-md bg-gray-100"></span>
										<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/2 rounded-md bg-gray-100"
										></span>
										<span class="dark:bg-dark-850 mt-1 block h-1.5 w-full rounded-md bg-gray-100"
										></span>
										<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/3 rounded-md bg-gray-100"
										></span>
										<span class="dark:bg-dark-850 mt-1 block h-1.5 w-2/3 rounded-md bg-gray-100"
										></span>
									</span>
								</span>
							</span>
						</label>
						<label for="fluidLayout" class="form-label cursor-pointer">Fluid</label>
					</div>
				</div>
			</div>

			{#if $layoutStore.layoutMode !== 'horizontal'}
				<div class="hidden lg:block">
					<h6 class="my-4">Sidebar Size:</h6>
					<div class="gap-space grid grid-cols-2 md:grid-cols-5">
						<div class="input-radio-group flex-col gap-0">
							<input
								on:change={() => setSidebarSize('default')}
								id="defaultSidebar"
								name="sidebar"
								type="radio"
								value="default"
								class="input-radio peer hidden"
								bind:group={$layoutStore.sidebarSize}
							/>
							<label
								for="defaultSidebar"
								class="card peer-checked:border-primary-500 mb-3 block h-24 w-full cursor-pointer overflow-hidden"
							>
								<span class="block h-full">
									<DotIndicators />
									<span class="grid h-[calc(100%_-_8px)] grid-cols-12">
										<span class="dark:bg-dark-850 col-span-3 h-[calc(100%_-_8px)] bg-gray-50"
										></span>
										<span class="col-span-9 inline-block h-[calc(100%_-_8px)] px-4 py-1.5">
											<span class="dark:bg-dark-850 block h-1.5 w-1/3 rounded-md bg-gray-100"
											></span>
											<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/2 rounded-md bg-gray-100"
											></span>
											<span class="dark:bg-dark-850 mt-1 block h-1.5 w-full rounded-md bg-gray-100"
											></span>
											<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/3 rounded-md bg-gray-100"
											></span>
											<span class="dark:bg-dark-850 mt-1 block h-1.5 w-2/3 rounded-md bg-gray-100"
											></span>
										</span>
									</span>
								</span>
							</label>
							<label for="defaultSidebar" class="form-label cursor-pointer">Default (Large)</label>
						</div>
						<div class="input-radio-group flex-col gap-0">
							<input
								on:change={() => setSidebarSize('medium')}
								id="mediumSidebar"
								name="sidebar"
								type="radio"
								value="medium"
								class="input-radio peer hidden"
								bind:group={$layoutStore.sidebarSize}
							/>
							<label
								for="mediumSidebar"
								class="card peer-checked:border-primary-500 mb-3 block h-24 w-full cursor-pointer overflow-hidden"
							>
								<span class="block h-full">
									<DotIndicators />
									<span class="grid h-[calc(100%_-_8px)] grid-cols-12">
										<span class="dark:bg-dark-850 col-span-2 h-[calc(100%_-_8px)] bg-gray-50"
										></span>
										<span class="col-span-10 inline-block h-[calc(100%_-_8px)] px-4 py-1.5">
											<span class="dark:bg-dark-850 block h-1.5 w-1/3 rounded-md bg-gray-100"
											></span>
											<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/2 rounded-md bg-gray-100"
											></span>
											<span class="dark:bg-dark-850 mt-1 block h-1.5 w-full rounded-md bg-gray-100"
											></span>
											<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/3 rounded-md bg-gray-100"
											></span>
											<span class="dark:bg-dark-850 mt-1 block h-1.5 w-2/3 rounded-md bg-gray-100"
											></span>
										</span>
									</span>
								</span>
							</label>
							<label for="mediumSidebar" class="form-label cursor-pointer">Medium</label>
						</div>
						<div class="input-radio-group flex-col gap-0">
							<input
								on:change={() => setSidebarSize('small')}
								id="smallSidebar"
								name="sidebar"
								type="radio"
								value="small"
								class="input-radio peer hidden"
								bind:group={$layoutStore.sidebarSize}
							/>
							<label
								for="smallSidebar"
								class="card peer-checked:border-primary-500 mb-3 block h-24 w-full cursor-pointer overflow-hidden"
							>
								<span class="block h-full">
									<DotIndicators />
									<span class="grid h-[calc(100%_-_8px)] grid-cols-12">
										<span class="dark:bg-dark-850 col-span-1 h-[calc(100%_-_8px)] bg-gray-50"
										></span>
										<span class="col-span-11 inline-block h-[calc(100%_-_8px)] px-4 py-1.5">
											<span class="dark:bg-dark-850 block h-1.5 w-1/3 rounded-md bg-gray-100"
											></span>
											<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/2 rounded-md bg-gray-100"
											></span>
											<span class="dark:bg-dark-850 mt-1 block h-1.5 w-full rounded-md bg-gray-100"
											></span>
											<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/3 rounded-md bg-gray-100"
											></span>
											<span class="dark:bg-dark-850 mt-1 block h-1.5 w-2/3 rounded-md bg-gray-100"
											></span>
										</span>
									</span>
								</span>
							</label>
							<label for="smallSidebar" class="form-label cursor-pointer">Small</label>
						</div>
					</div>
				</div>
			{/if}

			<h6 class="my-4">Layout Direction:</h6>
			<div class="gap-space grid grid-cols-2 md:grid-cols-4">
				<div class="input-radio-group flex-col gap-0">
					<input
						on:change={() => setLayoutDir('ltr')}
						id="ltrMode"
						name="layoutDirection"
						type="radio"
						value="ltr"
						class="input-radio peer hidden"
						bind:group={$layoutStore.layoutDir}
					/>
					<label
						for="ltrMode"
						class="card peer-checked:border-primary-500 mb-3 block h-28 w-full cursor-pointer overflow-hidden"
					>
						<span class="block h-full">
							<DotIndicators />
							<span class="grid h-[calc(100%_-_8px)] grid-cols-12">
								<span class="dark:bg-dark-850 col-span-2 h-[calc(100%_-_8px)] bg-gray-50"></span>
								<span class="col-span-10 inline-block h-[calc(100%_-_8px)] px-4 py-1.5">
									<span class="dark:bg-dark-850 block h-1.5 w-1/3 rounded-md bg-gray-100"></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/2 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-full rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/3 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-2/3 rounded-md bg-gray-100"
									></span>
								</span>
							</span>
						</span>
					</label>
					<label for="ltrMode" class="form-label cursor-pointer">LTR</label>
				</div>
				<div class="input-radio-group flex-col gap-0">
					<input
						on:change={() => setLayoutDir('rtl')}
						id="rtlMode"
						name="layoutDirection"
						type="radio"
						value="rtl"
						class="input-radio peer hidden"
						bind:group={$layoutStore.layoutDir}
					/>
					<label
						for="rtlMode"
						class="card peer-checked:border-primary-500 mb-3 block h-28 w-full cursor-pointer overflow-hidden"
					>
						<span class="block h-full">
							<DotIndicators />
							<span class="grid h-[calc(100%_-_8px)] grid-cols-12">
								<span class="col-span-10 inline-block h-[calc(100%_-_8px)] p-1.5">
									<span class="dark:bg-dark-850 ml-auto block h-1.5 w-1/3 rounded-md bg-gray-100"
									></span>
									<span
										class="dark:bg-dark-850 ml-auto mt-1 block h-1.5 w-1/2 rounded-md bg-gray-100"
									></span>
									<span
										class="dark:bg-dark-850 ml-auto mt-1 block h-1.5 w-full rounded-md bg-gray-100"
									></span>
									<span
										class="dark:bg-dark-850 ml-auto mt-1 block h-1.5 w-1/3 rounded-md bg-gray-100"
									></span>
									<span
										class="dark:bg-dark-850 ml-auto mt-1 block h-1.5 w-2/3 rounded-md bg-gray-100"
									></span>
								</span>
								<span class="dark:bg-dark-850 col-span-2 h-[calc(100%_-_8px)] bg-gray-50"></span>
							</span>
						</span>
					</label>
					<label for="rtlMode" class="form-label cursor-pointer">RTL</label>
				</div>
			</div>

			<h6 class="my-4">Layout Mode:</h6>
			<div class="gap-space grid grid-cols-2 md:grid-cols-4">
				<div class="input-radio-group flex-col gap-0">
					<input
						on:change={() => setLayoutTheme('light')}
						id="lightMode"
						name="layoutMode"
						type="radio"
						value="light"
						class="input-radio peer hidden"
						bind:group={$layoutStore.layoutTheme}
					/>
					<label
						for="lightMode"
						class="card peer-checked:border-primary-500 mb-3 block h-28 w-full cursor-pointer overflow-hidden"
					>
						<span class="block h-full">
							<DotIndicators />
							<span class="grid h-[calc(100%_-_8px)] grid-cols-12">
								<span class="dark:bg-dark-850 col-span-2 h-[calc(100%_-_8px)] bg-gray-50"></span>
								<span class="col-span-10 inline-block h-[calc(100%_-_8px)] p-1.5">
									<span class="dark:bg-dark-850 block h-1.5 w-1/3 rounded-md bg-gray-100"></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/2 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-full rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/3 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-2/3 rounded-md bg-gray-100"
									></span>
								</span>
							</span>
						</span>
					</label>
					<label for="lightMode" class="form-label cursor-pointer">Light</label>
				</div>
				<div class="input-radio-group flex-col gap-0">
					<input
						on:change={() => setLayoutTheme('dark')}
						id="darkMode"
						name="layoutMode"
						type="radio"
						value="dark"
						class="input-radio peer hidden"
						bind:group={$layoutStore.layoutTheme}
					/>
					<label
						for="darkMode"
						class="border-dark-700 bg-dark-950 card peer-checked:border-primary-500 mb-3 block h-28 w-full cursor-pointer overflow-hidden"
					>
						<span class="block h-full">
							<DotIndicators />
							<span class="grid h-[calc(100%_-_8px)] grid-cols-12">
								<span class="bg-dark-900 dark:bg-dark-850 col-span-2 h-[calc(100%_-_8px)]"></span>
								<span class="col-span-10 inline-block h-[calc(100%_-_8px)] p-1.5">
									<span class="bg-dark-900 dark:bg-dark-850 block h-1.5 w-1/3 rounded-md"></span>
									<span class="bg-dark-900 dark:bg-dark-850 mt-1 block h-1.5 w-1/2 rounded-md"
									></span>
									<span class="bg-dark-900 dark:bg-dark-850 mt-1 block h-1.5 w-full rounded-md"
									></span>
									<span class="bg-dark-900 dark:bg-dark-850 mt-1 block h-1.5 w-1/3 rounded-md"
									></span>
									<span class="bg-dark-900 dark:bg-dark-850 mt-1 block h-1.5 w-2/3 rounded-md"
									></span>
								</span>
							</span>
						</span>
					</label>
					<label for="darkMode" class="form-label cursor-pointer">Dark</label>
				</div>
				<div class="input-radio-group flex-col gap-0">
					<input
						on:change={() => setLayoutTheme('light')}
						id="autoMode"
						name="layoutMode"
						type="radio"
						value="auto"
						class="input-radio peer hidden"
						bind:group={$layoutStore.layoutTheme}
					/>
					<label
						for="autoMode"
						class="card peer-checked:border-primary-500 relative mb-3 block h-28 w-full cursor-pointer overflow-hidden before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:bg-gray-950"
					>
						<span class="relative block h-full">
							<DotIndicators />
							<span class="grid h-[calc(100%_-_8px)] grid-cols-12">
								<span class="dark:bg-dark-850 col-span-2 h-[calc(100%_-_8px)] bg-gray-50"></span>
								<span class="col-span-10 inline-block h-[calc(100%_-_8px)] p-1.5">
									<span class="dark:bg-dark-850 block h-1.5 w-1/3 rounded-md bg-gray-100/50"></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/2 rounded-md bg-gray-100/50"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-full rounded-md bg-gray-100/50"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/3 rounded-md bg-gray-100/50"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-2/3 rounded-md bg-gray-100/50"
									></span>
								</span>
							</span>
						</span>
					</label>
					<label for="autoMode" class="form-label cursor-pointer">Default System</label>
				</div>
				<div class="input-radio-group flex-col gap-0">
					<input
						on:change={() => setLayoutTheme('black-white')}
						id="blackWhiteMode"
						name="layoutMode"
						type="radio"
						value="black-white"
						class="input-radio peer hidden"
						bind:group={$layoutStore.layoutTheme}
					/>
					<label
						for="blackWhiteMode"
						class="card peer-checked:border-primary-500 mb-3 block h-28 w-full cursor-pointer overflow-hidden grayscale"
					>
						<span class="block h-full">
							<DotIndicators />
							<span class="grid h-[calc(100%_-_8px)] grid-cols-12">
								<span class="dark:bg-dark-850 col-span-2 h-[calc(100%_-_8px)] bg-gray-50"></span>
								<span class="col-span-10 inline-block h-[calc(100%_-_8px)] p-1.5">
									<span class="dark:bg-dark-850 block h-1.5 w-1/3 rounded-md bg-gray-100"></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/2 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-full rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-1/3 rounded-md bg-gray-100"
									></span>
									<span class="dark:bg-dark-850 mt-1 block h-1.5 w-2/3 rounded-md bg-gray-100"
									></span>
								</span>
							</span>
						</span>
					</label>
					<label for="blackWhiteMode" class="form-label cursor-pointer">Black & White</label>
				</div>
			</div>

			{#if $layoutStore.layoutTheme === 'dark'}
				<div>
					<h6 class="darkModeColors my-4">Dark Mode Colors:</h6>
					<div class="darkModeColors flex flex-wrap items-center gap-3">
						{#each darkModeColors as color}
							<div class="input-radio-group">
								<input
									bind:group={$layoutStore.darkModeColor}
									id={color.id}
									name="darkModeColors"
									type="radio"
									value={color.value}
									class="input-radio peer hidden"
									on:change={() => setDarkModeColor(color.value)}
								/>
								<label
									for={color.id}
									class={`rounded-full ${color.bgColor} input-radio-label dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400 flex size-10 items-center justify-center peer-checked:ring-1 peer-checked:ring-offset-2`}
								>
								</label>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			{#if $layoutStore.layoutMode !== 'horizontal'}
				<div>
					<h6 class="my-4">Sidebar Asset Colors:</h6>
					<div class="flex flex-wrap items-center gap-3">
						{#each sidebarColors as color}
							<div class="input-radio-group">
								<input
									on:change={() => setSidebarColor(color.value)}
									bind:group={$layoutStore.sidebarColor}
									id={color.id}
									name="sidebarColors"
									type="radio"
									value={color.value}
									class="input-radio peer hidden"
								/>
								<label
									for={color.id}
									class={`rounded-full ${color.bgColor} input-radio-label dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400 size-10 peer-checked:ring-1 peer-checked:ring-offset-2`}
								></label>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<h6 class="my-4">Primary Asset Colors:</h6>
			<div class="flex flex-wrap items-center gap-3">
				{#each primaryColors as color}
					<div class="input-radio-group">
						<input
							bind:group={$layoutStore.primaryColor}
							id={color.id}
							name="primaryColors"
							type="radio"
							value={color.value}
							class="input-radio peer hidden"
							on:change={() => setPrimaryColors(color.value)}
						/>
						<label
							for={color.id}
							class={`rounded-full ${color.bgColor} input-radio-label dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400 size-10 peer-checked:ring-1 peer-checked:ring-offset-2`}
						></label>
					</div>
				{/each}
			</div>
		</div>
	</ModalBody>
	<ModalFooter class="flex items-center justify-end gap-2">
		<button type="button" class="btn btn-sub-gray" on:click={resetAttributes}
			><LucideIcon name="RotateCcw" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Reset Layouts</button
		>
		<button type="button" class="btn btn-red"
			><LucideIcon name="ShoppingBag" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Buy Now</button
		>
	</ModalFooter>
</Modal>
