<script lang="ts">
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import { fileManagerData, slidesFile } from './file';
	import Swiper from 'swiper';
	import 'swiper/css';

	//chart
	import { options as fileChart } from './file-chart';
	import { options as storageChart } from './storage-chart';
	import { onMount } from 'svelte';
	import Card from '$lib/components/ui/card/Card.svelte';

	let data = fileManagerData;
	let searchQuery = '';

	// Function to delete file
	const deleteFiles = (item: any) => {
		data = data.filter((file) => file !== item);
	};

	// Computed filtered data based on search query
	$: filteredData = data.filter((item) => {
		return (
			item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.date.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	let swiper;

	onMount(() => {
		swiper = new Swiper('.mySwiper', {
			slidesPerView: 1,
			spaceBetween: 24,
			grabCursor: true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		});
	});

	const files = [
		{
			icon: 'assets/images/file-manager/icons/picture.png',
			name: 'Brand Logo.png',
			date: '14 June, 2024',
			size: '2.6 MB'
		},
		{
			icon: 'assets/images/file-manager/icons/ai-file-format.png',
			name: 'AI Chat Module.ai',
			date: '29 June, 2024',
			size: '29 MB'
		},
		{
			icon: 'assets/images/file-manager/icons/video.png',
			name: 'Domiex Intro.mp4',
			date: '05 July, 2024',
			size: '44 MB'
		},
		{
			icon: 'assets/images/file-manager/icons/document.png',
			name: 'Project guidelines.txt',
			date: '09 July, 2024',
			size: '7 MB'
		},
		{
			icon: 'assets/images/file-manager/icons/office365.png',
			name: 'List of invoice',
			date: '18 July, 2024',
			size: '4.1 MB'
		},
		{
			icon: 'assets/images/file-manager/icons/pdf.png',
			name: 'Features Breakdown',
			date: '18 July, 2024',
			size: '3 MB'
		}
	];
</script>

<Col
	cols={{ span: 12 }}
	sm={{ span: 6 }}
	md={{ span: 4 }}
	class="card relative border-orange-200 bg-orange-100 2xl:col-span-2 dark:border-orange-500/20 dark:bg-orange-500/15"
>
	<CardBody>
		<div
			class="mx-auto flex size-16 items-center justify-center rounded-full bg-orange-500/20 bg-opacity-60"
		>
			<LucideIcon name="Image" class="size-7 text-orange-500" />
		</div>
		<div class="mt-4 flex items-center gap-3">
			<h6 class="grow"><a href="#!" class="before:absolute before:inset-0">Images</a></h6>
			<p class="dark:text-dark-500 shrink-0 text-gray-500">245</p>
		</div>
	</CardBody>
</Col>

<Col
	cols={{ span: 12 }}
	sm={{ span: 6 }}
	md={{ span: 4 }}
	class="bg-primary-100 border-primary-200 dark:bg-primary-500/15 dark:border-primary-500/20 card relative 2xl:col-span-2"
>
	<CardBody>
		<div
			class="bg-primary-500/20 mx-auto flex size-16 items-center justify-center rounded-full bg-opacity-60"
		>
			<LucideIcon name="Image" class="text-primary-500 size-7" />
		</div>
		<div class="mt-4 flex items-center gap-3">
			<h6 class="grow"><a href="#!" class="before:absolute before:inset-0">Documents</a></h6>
			<p class="dark:text-dark-500 shrink-0 text-gray-500">1472</p>
		</div>
	</CardBody>
</Col>

<Col
	cols={{ span: 12 }}
	sm={{ span: 6 }}
	md={{ span: 4 }}
	class="card relative border-yellow-200 bg-yellow-100 2xl:col-span-2 dark:border-yellow-500/20 dark:bg-yellow-500/15"
>
	<CardBody>
		<div
			class="mx-auto flex size-16 items-center justify-center rounded-full bg-yellow-500/20 bg-opacity-60"
		>
			<LucideIcon name="FileText" class="size-7 text-yellow-500" />
		</div>
		<div class="mt-4 flex items-center gap-3">
			<h6 class="grow"><a href="#!" class="before:absolute before:inset-0">PDF Files</a></h6>
			<p class="dark:text-dark-500 shrink-0 text-gray-500">98</p>
		</div>
	</CardBody>
</Col>

<Col
	cols={{ span: 12 }}
	sm={{ span: 6 }}
	md={{ span: 4 }}
	class="card relative border-purple-200 bg-purple-100 2xl:col-span-2 dark:border-purple-500/20 dark:bg-purple-500/15"
>
	<CardBody>
		<div
			class="mx-auto flex size-16 items-center justify-center rounded-full bg-purple-500/20 bg-opacity-60"
		>
			<LucideIcon name="Video" class="size-7 text-purple-500" />
		</div>
		<div class="mt-4 flex items-center gap-3">
			<h6 class="grow"><a href="#!" class="before:absolute before:inset-0">Video</a></h6>
			<p class="dark:text-dark-500 shrink-0 text-gray-500">159</p>
		</div>
	</CardBody>
</Col>

<Col
	cols={{ span: 12 }}
	sm={{ span: 6 }}
	md={{ span: 4 }}
	class="card relative border-sky-200 bg-sky-100 2xl:col-span-2 dark:border-sky-500/20 dark:bg-sky-500/15"
>
	<CardBody>
		<div
			class="mx-auto flex size-16 items-center justify-center rounded-full bg-sky-500/20 bg-opacity-60"
		>
			<LucideIcon name="AudioLines" class="size-7 text-sky-500" />
		</div>
		<div class="mt-4 flex items-center gap-3">
			<h6 class="grow"><a href="#!" class="before:absolute before:inset-0">Audio</a></h6>
			<p class="dark:text-dark-500 shrink-0 text-gray-500">208</p>
		</div>
	</CardBody>
</Col>

<Col
	cols={{ span: 12 }}
	sm={{ span: 6 }}
	md={{ span: 4 }}
	class="card relative border-green-200 bg-green-100 2xl:col-span-2 dark:border-green-500/20 dark:bg-green-500/15"
>
	<CardBody>
		<div
			class="mx-auto flex size-16 items-center justify-center rounded-full bg-green-500/20 bg-opacity-60"
		>
			<LucideIcon name="FolderOpen" class="size-7 text-green-500" />
		</div>
		<div class="mt-4 flex items-center gap-3">
			<h6 class="grow"><a href="#!" class="before:absolute before:inset-0">Others Files</a></h6>
			<p class="dark:text-dark-500 shrink-0 text-gray-500">1569</p>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card 2xl:col-span-6">
	<CardHeader class="flex items-center">
		<CardTitle class="grow">Analytics</CardTitle>
		<Dropdown class="dropdown" alignTo="right-bottom">
			<DropdownButton
				isChevron={true}
				class="dark:border-dark-800 link link-primary btn flex border-gray-200 px-3 py-1.5 text-xs"
			>
				Last Week
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden p-2">
				<a href="#!" class="dropdown-item"> Last Week </a>
				<a href="#!" class="dropdown-item"> Last Month </a>
				<a href="#!" class="dropdown-item"> Last Years </a>
			</DropdownMenu>
		</Dropdown>
	</CardHeader>
	<CardBody>
		<div dir="ltr">
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-500', 'bg-gray-100']}
				options={fileChart}
			/>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} class="card 2xl:col-span-3">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Recent Files</CardTitle>
		<a href="#!" class="link link-primary shrink-0">
			View All
			<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
		</a>
	</CardHeader>
	<CardBody>
		<div class="space-y-3">
			{#each files as file}
				<div class="flex items-center gap-3">
					<div
						class="dark:bg-dark-850 flex size-10 shrink-0 items-center justify-center rounded-md bg-slate-100 p-2"
					>
						<img src={file.icon} loading="lazy" alt="" />
					</div>
					<div class="grow">
						<h6 class="mb-0.5">
							<a href="#!" class="link link-primary text-current">{file.name}</a>
						</h6>
						<p class="dark:text-dark-500 text-sm text-gray-500">{file.date}</p>
					</div>
					<p>{file.size}</p>
				</div>
			{/each}
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} class="card 2xl:col-span-3">
	<CardHeader class="flex items-center gap-3">
		<CardTitle class="grow">Overview Storage</CardTitle>
		<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
			<DropdownButton class="dark:text-dark-500 flex items-center text-gray-500">
				<LucideIcon name="Ellipsis" class="size-5" />
			</DropdownButton>
			<DropdownMenu class="dropdown-menu !fixed hidden p-2">
				<a href="/apps-event-overview" class="dropdown-item">
					<span>Weekly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Monthly</span>
				</a>

				<a href="#!" class="dropdown-item">
					<span>Yearly</span>
				</a>
			</DropdownMenu>
		</Dropdown>
	</CardHeader>
	<CardBody>
		<div dir="ltr">
			<ApexChart
				class="!min-h-full"
				colors={['bg-primary-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-red-400']}
				options={storageChart}
			/>
		</div>
		<div class="mt-5">
			<div class="mb-2 flex items-center gap-3">
				<h6 class="grow text-xs">Use Storage</h6>
				<h6 class="text-xs font-semibold text-red-500">74%</h6>
			</div>
			<div class="progress-bar progress-2">
				<div class="progress-bar-wrap bg-primary-500 w-[74%] text-white"></div>
			</div>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 8 }} class="card xl:row-span-2">
	<CardHeader class="flex flex-wrap items-center justify-between gap-4">
		<CardTitle>Quick Access</CardTitle>
		<div class="flex items-center gap-4">
			<div class="group/form relative grow">
				<input
					type="email"
					bind:value={searchQuery}
					class="form-input ltr:pl-9 ltr:group-[&.right]/form:pl-4 ltr:group-[&.right]/form:pr-9 rtl:pr-9 rtl:group-[&.right]/form:pl-9 rtl:group-[&.right]/form:pr-4"
					placeholder="Search for ..."
				/>
				<button
					class="absolute inset-y-0 flex items-center focus:outline-none ltr:left-3 ltr:group-[&.right]/form:left-auto ltr:group-[&.right]/form:right-3 rtl:right-3 rtl:group-[&.right]/form:left-3 rtl:group-[&.right]/form:right-auto"
				>
					<LucideIcon
						name="Search"
						class="dark:text-dark-500 dark:fill-dark-850 size-4 fill-gray-100 text-gray-500"
					/>
				</button>
			</div>
			<div class="shrink-0">
				<input type="file" id="fileInput" class="hidden" />
				<label for="fileInput" class="btn btn-sub-green"
					><LucideIcon name="CloudUpload" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Upload</label
				>
			</div>
		</div>
	</CardHeader>
	<CardBody>
		<div>
			<div class="table-box overflow-x-auto">
				<table class="flush table">
					<tbody>
						{#if filteredData.length > 0}
							{#each filteredData as item (item.name)}
								<tr class="*:px-3 *:py-2.5">
									<td class="whitespace-nowrap">
										<div class="flex items-center gap-3">
											<img src={item.image} loading="lazy" alt={item.name} class="size-8" />
											<a href="#!">
												<h6>{item.name}</h6>
											</a>
										</div>
									</td>
									<td class="whitespace-nowrap">{item.type}</td>
									<td class="whitespace-nowrap">{item.size}</td>
									<td class="whitespace-nowrap">{item.date}</td>
									<td class="whitespace-nowrap">
										<div class="flex gap-3">
											<a href="#!" class="link link-primary" aria-label="edit">
												<i class="ri-edit-2-line"></i>
											</a>
											<a href="#!" class="link link-primary" aria-label="download">
												<i class="ri-download-2-line"></i>
											</a>
											<a
												href="#!"
												class="link link-red"
												on:click={() => deleteFiles(item)}
												aria-label="delete"
											>
												<i class="ri-delete-bin-6-line"></i>
											</a>
										</div>
									</td>
								</tr>
							{/each}
						{/if}
						{#if filteredData.length === 0}
							<tr>
								<td colspan="10" class="!p-8">
									<TableRowNotFound />
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 4 }}>
	<h6 class="mb-3">My Favorites</h6>
	<div class="swiper mySwiper group/swiper" dir="ltr">
		<div class="swiper-wrapper">
			{#each slidesFile as slide}
				<div class="swiper-slide">
					<div class={`card flex items-center gap-3 p-3 ${slide.bgClass}`}>
						<div class="grow">
							<h6 class="mb-1">
								<a href="#!">{slide.title}</a>
							</h6>
							<p class="dark:text-dark-500 text-sm text-gray-500">{slide.description}</p>
						</div>
						<div>
							<div class="ml-3 flex grow -space-x-3">
								{#each slide.avatars as avatar}
									<a
										href="#!"
										class="transition duration-300 ease-linear hover:z-10 hover:-translate-y-1"
									>
										<img
											class="dark:border-dark-900 size-8 rounded-full border-2 border-white"
											alt=""
											loading="lazy"
											src={`/assets/images/avatar/${avatar}`}
										/>
									</a>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<!-- <div class="swiper-button-next after:font-remix after:text-2xl after:text-primary-500 size-6 bg-white rounded-full opacity-0 group-hover/swiper:opacity-100 transition ease-linear duration-300 after:content-['\ea6e']"></div>
    <div class="swiper-button-prev after:font-remix after:text-2xl after:text-primary-500 size-6 bg-white rounded-full opacity-0 group-hover/swiper:opacity-100 transition ease-linear duration-300 after:content-['\ea64']"></div> -->
	</div>

	<Card class="relative">
		<div class="absolute bottom-0 right-0 opacity-45">
			<div class="dark:from-dark-900 absolute inset-0 bg-gradient-to-r from-white"></div>
			<img
				src="/assets/images/dashboards/ecommerce/pattern.png"
				loading="lazy"
				alt=""
				class="h-40"
			/>
		</div>
		<CardBody class="relative">
			<img
				src="/assets/images/dashboards/file-manager.png"
				loading="lazy"
				alt=""
				class="mx-auto h-32"
			/>
			<h6 class="mb-1 mt-5">Upgrade to Pro</h6>
			<p class="dark:text-dark-500 mb-5 text-gray-500">
				Unlock your plan to Pro to get access all features!
			</p>
			<a href="/pages-pricing" type="button" class="btn btn-primary w-full">Upgrade Now</a>
		</CardBody>
	</Card>
</Col>
