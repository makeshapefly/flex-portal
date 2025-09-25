<script lang="ts">
	import Echart from '$lib/components/common/Echart.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { files, folders as importedFolders } from './file-list';
	import { basicBarChartConfig } from './chart';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';

	let folders = [...importedFolders];
	let newFolderName = '';
	let newFolderDescription = '';
	let showModal = false;
	let folderNameError = '';
	let selectedItems: any[] = [];
	let currentPage = 1;
	const itemsPerPage = 5;
	let sortBy = '';
	let sortDirection = 'asc';
	let newFileName = '';
	let searchQuery = '';
	let filteredFiles = [...files];

	// This function filters the files based on the search query
	function filterFiles() {
		if (!searchQuery) {
			filteredFiles = [...files];
		} else {
			filteredFiles = files.filter(
				(file) =>
					file.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
					file.type.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
	}

	// Watch for changes in the searchQuery to trigger the filtering
	$: searchQuery, filterFiles();

	function sort(field: string) {
		if (sortBy === field) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = field;
			sortDirection = 'asc';
		}
	}

	// Apply sorting to filtered files
	$: sortedFiles = filteredFiles.slice().sort((a: any, b: any) => {
		if (!sortBy) return 0;
		if (sortDirection === 'asc') {
			return a[sortBy] > b[sortBy] ? 1 : -1;
		} else {
			return a[sortBy] < b[sortBy] ? 1 : -1;
		}
	});

	function toggleItem(file: {
		image: string;
		type: string;
		documentName: string;
		size: string;
		lastEdit: string;
	}) {
		const index = selectedItems.indexOf(file);
		if (index === -1) {
			selectedItems = [...selectedItems, file];
		} else {
			selectedItems = selectedItems.filter((item) => item !== file);
		}
	}

	function toggleAll() {
		if (selectedItems.length === displayedFiles.length) {
			selectedItems = [];
		} else {
			selectedItems = [...displayedFiles];
		}
	}

	// Pagination logic
	$: totalReviewsCount = sortedFiles.length;
	$: totalPages = Math.ceil(totalReviewsCount / itemsPerPage);
	$: displayedFiles = sortedFiles.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	$: showingStart = (currentPage - 1) * itemsPerPage + 1; // Start index for current page
	$: showingEnd = Math.min(currentPage * itemsPerPage, totalReviewsCount); // End index for current page

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	function gotoPage(page: number) {
		currentPage = page;
	}

	// Function to delete a folder by index
	function deleteFolder(index: number) {
		folders = folders.filter((_, i) => i !== index);
	}

	// Function to handle adding a new folder
	function addFolder() {
		if (newFolderName.trim() === '') {
			folderNameError = 'Folder name is required'; // Set error message if empty
			return;
		}

		// Create the new folder object
		const newFolder = {
			name: newFolderName,
			description: newFolderDescription || '0 files',
			image: '/assets/images/file-manager/icons/folder.png'
		};

		// Add the new folder to the folders array
		folders = [...folders, newFolder];
		newFolderName = '';
		newFolderDescription = '';
		folderNameError = '';
	}

	// Function to handle file renaming
	function renameFile(file: {
		image: string;
		type: string;
		documentName: string;
		size: string;
		lastEdit: string;
	}) {
		if (newFileName.trim() !== '') {
			const fileIndex = displayedFiles.indexOf(file);
			if (fileIndex !== -1) {
				sortedFiles[fileIndex].documentName = newFileName;
				newFileName = ''; // Reset input field
			}
		}
	}

	// Function to handle file deletion
	function deleteFile(file: {
		documentName: any;
		image?: string;
		type?: string;
		size?: string;
		lastEdit?: string;
	}) {
		sortedFiles = sortedFiles.filter((f) => f !== file);
	}
</script>

<Col cols={{ span: 12 }} xl={{ span: 8 }} class="2xl:col-span-9">
	<div class="flex flex-wrap justify-between gap-4">
		<div class="flex-grow">
			<div class="group/form relative">
				<input
					type="text"
					bind:value={searchQuery}
					class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
					placeholder="Search ..."
				/>
				<div
					class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-hidden ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
				>
					<LucideIcon name="Search" class="size-4" />
				</div>
			</div>
		</div>
		<div class="flex flex-shrink-0 gap-2">
			<!-- Modal for Add Folder -->

			<ModalTrigger modalId="create-folder-modal" icon="Plus" class="btn gap-1" text="Create New" />
			<button type="button" title="btn" class="btn btn-sub-gray btn-icon shrink-0"
				><LucideIcon name="Ellipsis" class="size-4" /></button
			>
			<Modal modalId="create-folder-modal" let:modalId size="md">
				<ModalHeader {modalId}>
					<h6>Create Folder</h6>
				</ModalHeader>
				<ModalBody>
					<div>
						<label for="basicInput1" class="form-label">
							Folder Name <span class="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="basicInput1"
							class="form-input dark:bg-dark-800 dark:border-dark-500"
							bind:value={newFolderName}
							placeholder="Enter folder name"
						/>
						{#if folderNameError}
							<span class="text-red-500">{folderNameError}</span>
						{/if}
					</div>
					<div class="mt-space flex items-center justify-end gap-2">
						<button type="button" class="btn btn-active-red" on:click={() => (showModal = false)}>
							Close <LucideIcon name="X" class="inline-block size-4 ltr:ml-1 rtl:mr-1" />
						</button>
						<button
							type="button"
							class="btn btn-primary"
							on:click={addFolder}
							disabled={newFolderName.trim() === ''}
						>
							Add Folder
						</button>
					</div>
				</ModalBody>
			</Modal>
		</div>
	</div>

	<div class="mt-space">
		<h6 class="mb-3">My Folders ({folders.length})</h6>
		<div class="gap-x-space grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4">
			{#each folders as folder, index (folder.name)}
				<div class="card block">
					<CardBody>
						<Dropdown class="dropdown float-end">
							<!-- Dropdown button -->
							<DropdownButton
								class="dark:text-dark-500 flex items-center text-gray-500"
								title="dropdown-button"
							>
								<i class="ri-more-2-fill size-5"></i>
							</DropdownButton>
							<DropdownMenu class="dropdown-menu !fixed hidden p-2">
								<a href="#!" class="dropdown-item">Open File</a>
								<a href="#!" class="dropdown-item" on:click={() => deleteFolder(index)}>Delete</a>
							</DropdownMenu>
						</Dropdown>

						<!-- File Image -->
						<img src={folder.image} alt="File Icon" />
						<!-- File Details -->
						<div class="mt-4">
							<h6 class="mb-1">{folder.name}</h6>
							<p class="dark:text-dark-500 text-sm text-slate-500">{folder.description}</p>
						</div>
					</CardBody>
				</div>
			{/each}
		</div>
	</div>

	<h6 class="mb-3">Pinned Files</h6>
	<div class="gap-x-space grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4">
		<a href="#!" class="card block overflow-hidden">
			<img src="/assets/images/avatar/user-17.png" alt="" class="h-32 w-full object-cover" />
			<div class="card-body dark:border-dark-800 border-t border-gray-200 text-center">
				<h6 class="mb-1">Profile Images</h6>
				<p class="dark:text-dark-500 text-sm text-slate-500">245 KB</p>
			</div>
		</a>
		<a href="#!" class="card block overflow-hidden">
			<iframe
				class="h-32 w-full"
				title="video"
				src="https://www.youtube.com/embed/UvF56fPGVt4?si=riMC3DQV0WQeBypD"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
			<div class="card-body dark:border-dark-800 border-t border-gray-200 text-center">
				<h6 class="mb-1">The Utility-First Workflow</h6>
				<p class="dark:text-dark-500 text-sm text-slate-500">2.7 MB</p>
			</div>
		</a>
		<a href="#!" class="card block overflow-hidden">
			<img src="/assets/images/email/features-2.png" alt="" class="h-32 w-full object-cover" />
			<div class="card-body dark:border-dark-800 border-t border-gray-200 text-center">
				<h6 class="mb-1">Email Features PDF</h6>
				<p class="dark:text-dark-500 text-sm text-slate-500">2.7 MB</p>
			</div>
		</a>
		<a href="#!" class="card block overflow-hidden">
			<iframe
				class="h-32 w-full"
				title="video"
				src="https://www.youtube.com/embed/nOQyWbPO2Ds?si=pTFhrsaGUoSqMJ6g"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
			<div class="card-body dark:border-dark-800 border-t border-gray-200 text-center">
				<h6 class="mb-1">TailwindCSS Setup</h6>
				<p class="dark:text-dark-500 text-sm text-slate-500">475 MB</p>
			</div>
		</a>
	</div>

	<Card>
		<CardHeader class="flex flex-wrap items-center gap-5">
			<CardTitle class="grow">Recent Files</CardTitle>
			{#if selectedItems.length > 0}
				<button class="btn btn-red btn-icon">
					<LucideIcon name="Trash" class="inline-block size-4" />
				</button>
			{/if}
			<div class="shrink-0">
				<input type="file" id="fileInput" class="hidden" />
				<label for="fileInput" class="btn btn-sub-green">
					<LucideIcon name="CloudUpload" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Upload File
				</label>
			</div>
		</CardHeader>

		<CardBody class="pt-0">
			<div class="table-box overflow-x-auto whitespace-nowrap">
				<table class="flush table">
					<tbody>
						<tr class="dark:bg-dark-850 bg-gray-100">
							<th>
								<div class="input-check-group dark:text-dark-500 text-gray-500">
									<label for="checkboxAll" class="input-check-label hidden"></label>
									<input
										id="checkboxAll"
										class="input-check input-check-primary"
										type="checkbox"
										on:click={toggleAll}
									/>
								</div>
							</th>
							<th on:click={() => sort('type')} class="cursor-pointer !font-medium">Type</th>
							<th on:click={() => sort('documentName')} class="cursor-pointer !font-medium"
								>Document Name</th
							>
							<th on:click={() => sort('size')} class="cursor-pointer !font-medium">Size</th>
							<th on:click={() => sort('lastEdit')} class="cursor-pointer !font-medium"
								>Last Edit</th
							>
							<th class="!font-medium">Action</th>
						</tr>
						{#if sortedFiles.length > 0}
							{#each displayedFiles as file, index}
								<tr class="*:px-3 *:py-2.5">
									<td>
										<div class="input-check-group">
											<label for={`files${index}`} class="input-check-label hidden"></label>
											<input
												id={`files${index}`}
												class="input-check input-check-primary"
												type="checkbox"
												on:click={() => toggleItem(file)}
											/>
										</div>
									</td>
									<td><img src={file.image} alt="" class="h-6" /></td>
									<td><a href="#!">{file.documentName}</a></td>
									<td>{file.size}</td>
									<td>{file.lastEdit}</td>
									<td>
										<div class="flex items-center gap-2">
											<ModalTrigger
												modalId="rename-file-modal"
												icon="Pencil"
												class="btn btn-sub-gray btn-icon !size-8 rounded-md !p-1"
												iconCss="!size-3"
												color="gray"
											></ModalTrigger>
											<ModalTrigger
												modalId="delete-file-modal"
												icon="Trash2"
												iconCss="!size-3.5"
												class="btn btn-sub-gray btn-icon !size-8 rounded-md !p-1"
												color="gray"
											></ModalTrigger>
										</div>
									</td>
								</tr>
							{/each}
						{:else}
							<TableRowNotFound />
						{/if}
					</tbody>
				</table>
			</div>
			{#if sortedFiles.length !== 0}
				<div class="mt-3 grid grid-cols-12 items-center gap-5">
					<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
						<p class="dark:text-dark-500 text-gray-500 ltr:pr-1 rtl:pl-1">
							Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{totalReviewsCount}</b> Results
						</p>
						{#if selectedItems.length > 0}
							<span><b>{selectedItems.length}</b> Row Selected</span>
						{/if}
					</div>
					<div class="col-span-12 md:col-span-6">
						<div class="pagination pagination-primary flex justify-start md:justify-end">
							<button on:click={prevPage} disabled={currentPage === 1} class="pagination-pre">
								<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
								Prev
							</button>
							{#each Array(totalPages) as _, i}
								<button
									on:click={() => gotoPage(i + 1)}
									class="pagination-item {currentPage === i + 1 ? 'active' : ''}"
								>
									<span>{i + 1}</span>
								</button>
							{/each}
							<button
								on:click={nextPage}
								disabled={currentPage === totalPages}
								class="pagination-next"
							>
								Next
								<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
							</button>
						</div>
					</div>
				</div>
			{/if}
		</CardBody>
	</Card>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 4 }} class="2xl:col-span-3">
	<Card>
		<CardBody>
			<Echart config={basicBarChartConfig} class="w-full h-[300px]"/>
			<p class="dark:text-dark-500 text-center text-slate-500">
				Get an additional 500 GB of space for your documents and files.
			</p>
			<div class="mt-space space-y-4">
				<a href="#!" class="flex items-center gap-2">
					<div
						class="dark:bg-dark-850 flex size-12 shrink-0 items-center justify-center rounded-md bg-gray-50 p-2"
					>
						<img src="/assets/images/file-manager/icons/picture.png" alt="" />
					</div>
					<div class="grow">
						<h6 class="mb-1">547 Images</h6>
						<p class="dark:text-dark-500 text-slate-500">24.8 GB</p>
					</div>
					<p class="dark:text-dark-500 shrink-0 text-slate-500">24.7%</p>
				</a>
				<a href="#!" class="flex items-center gap-2">
					<div
						class="dark:bg-dark-850 flex size-12 shrink-0 items-center justify-center rounded-md bg-gray-50 p-2"
					>
						<img src="/assets/images/file-manager/icons/folder-03.png" alt="" />
					</div>
					<div class="grow">
						<h6 class="mb-1">154 My Documents</h6>
						<p class="dark:text-dark-500 text-slate-500">13.8 GB</p>
					</div>
					<p class="dark:text-dark-500 shrink-0 text-slate-500">12.9%</p>
				</a>
				<a href="#!" class="flex items-center gap-2">
					<div
						class="dark:bg-dark-850 flex size-12 shrink-0 items-center justify-center rounded-md bg-gray-50 p-2"
					>
						<img src="/assets/images/file-manager/icons/video.png" alt="" />
					</div>
					<div class="grow">
						<h6 class="mb-1">29 Video</h6>
						<p class="dark:text-dark-500 text-slate-500">19 GB</p>
					</div>
					<p class="dark:text-dark-500 shrink-0 text-slate-500">16.4%</p>
				</a>
				<a href="#!" class="flex items-center gap-2">
					<div
						class="dark:bg-dark-850 flex size-12 shrink-0 items-center justify-center rounded-md bg-gray-50 p-2"
					>
						<img src="/assets/images/file-manager/icons/mp3.png" alt="" />
					</div>
					<div class="grow">
						<h6 class="mb-1">86 Audio</h6>
						<p class="dark:text-dark-500 text-slate-500">5.9 GB</p>
					</div>
					<p class="dark:text-dark-500 shrink-0 text-slate-500">6.7%</p>
				</a>
				<a href="#!" class="flex items-center gap-2">
					<div
						class="dark:bg-dark-850 flex size-12 shrink-0 items-center justify-center rounded-md bg-gray-50 p-2"
					>
						<img src="/assets/images/file-manager/icons/folder-04.png" alt="" />
					</div>
					<div class="grow">
						<h6 class="mb-1">364 Design Templates File</h6>
						<p class="dark:text-dark-500 text-slate-500">6 GB</p>
					</div>
					<p class="dark:text-dark-500 shrink-0 text-slate-500">7.3%</p>
				</a>
				<div class="overflow-hidden rounded-md pt-3">
					<div class="mx-10">
						<img src="/assets/images/file-manager/upgrade.png" alt="" />
					</div>
					<div class="p-space bg-primary-500/10 text-center">
						<h6 class="mb-1">Get More space for files</h6>
						<p class="dark:text-dark-500 mb-3 text-sm text-slate-500">
							We offer your unlimited storage space for all your needs
						</p>
						<button type="button" class="btn btn-primary w-full">Upgrade to Pro</button>
					</div>
				</div>
			</div>
		</CardBody>
	</Card>
</Col>

<!-- edit component -->
<Modal modalId="rename-file-modal" let:modalId>
	<ModalHeader {modalId}>
		<h6>Rename File</h6>
	</ModalHeader>
	<ModalBody>
		<div>
			<label for="renameTitle" class="form-label"
				>Rename Title <span class="text-red-500">*</span></label
			>
			<input
				type="text"
				id="renameTitle"
				class="form-input dark:bg-dark-800 dark:border-dark-500"
				required
				placeholder="Enter new file name"
				bind:value={newFileName}
			/>
		</div>
		<div class="mt-space flex items-center justify-end gap-2">
			<button type="button" class="btn btn-active-red">Close</button>
			<button class="btn btn-primary" on:click={() => renameFile(file)}>Rename File</button>
		</div>
	</ModalBody>
</Modal>

<!-- Delete component  -->
<Modal modalId="delete-file-modal" size="sm" let:modalId>
	<ModalHeader {modalId}>
		<h6>Delete File</h6>
	</ModalHeader>
	<ModalBody>
		<div class="p-7 text-center">
			<div
				class="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-red-500/10 text-red-500 backdrop-blur-xl"
			>
				<LucideIcon name="Trash2" class="size-6"></LucideIcon>
			</div>
			<h5 class="mb-4">Are you sure you want to delete this file?</h5>
			<div class="flex items-center justify-center gap-2">
				<button class="btn btn-red" on:click={() => deleteFile(file)}>Delete</button>
				<button class="btn link link-primary">Cancel</button>
			</div>
		</div>
	</ModalBody>
</Modal>
