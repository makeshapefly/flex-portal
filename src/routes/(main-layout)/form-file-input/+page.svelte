<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	let imageUrl1 = ''; // For the first uploader
	let imageUrl2 = ''; // For the second uploader

	const fileChosen = (event: Event, callback: (src: string) => void) => {
		const input = event.target as HTMLInputElement;
		if (!input.files || !input.files.length) return;

		const file = input.files[0];
		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = () => {
			if (reader.result) {
				callback(reader.result as string);
			}
		};
	};
</script>

<PageHeading title="File Input" sub_title="Forms" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<Grid cols={12} gap={5}>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<label for="basicInput1" class="form-label">Light File Input</label>
					<input type="file" id="basicInput1" class="form-file form-file-light" />
				</Col>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<label for="basicInput2" class="form-label">Dark File Input</label>
					<input type="file" id="basicInput2" class="form-file" />
				</Col>
			</Grid>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<Grid cols={12} gap={5}>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<label for="basicInput3" class="form-label">Small File Input</label>
					<input type="file" id="basicInput3" class="form-file form-file-sm form-file-light" />
				</Col>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<label for="basicInput4" class="form-label">Medium File Input</label>
					<input type="file" id="basicInput4" class="form-file form-file-md form-file-light" />
				</Col>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<label for="basicInput4" class="form-label">Default File Input</label>
					<input type="file" id="basicInput4" class="form-file form-file-light" />
				</Col>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<label for="basicInput4" class="form-label">Large File Input</label>
					<input type="file" id="basicInput4" class="form-file form-file-lg form-file-light" />
				</Col>
			</Grid>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Upload User Profile 1</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="text-sm">
				<label for="logo1">
					<div
						class="dark:bg-dark-850 dark:border-dark-800 inline-flex size-32 cursor-pointer items-center justify-center overflow-hidden rounded border border-gray-200 bg-gray-100"
					>
						{#if imageUrl1}
							<img src={imageUrl1} alt="Profile Preview 1" class="h-full w-full object-cover" />
						{:else}
							<div class="dark:text-dark-500 flex flex-col items-center text-gray-500">
								<LucideIcon name="Upload" />
								<div class="mt-2">User Profile 1</div>
							</div>
						{/if}
					</div>
				</label>
				<div class="mt-4">
					<label class="block">
						<span class="sr-only">Choose profile photo</span>
						<input
							type="file"
							name="logo1"
							id="logo1"
							on:change={(e) => fileChosen(e, (src) => (imageUrl1 = src))}
							class="dark:text-dark-500 block w-full text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-violet-500/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-500/15 focus:outline-0"
						/>
					</label>
				</div>
			</div>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Upload User Profile 2</CardTitle>
		</CardHeader>
		<CardBody>
			<form class="flex items-center space-x-6">
				<div class="shrink-0">
					{#if imageUrl2}
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img
							class="h-16 w-16 rounded-full object-cover"
							src={imageUrl2}
							alt="Current profile photo 2"
						/>
					{:else}
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img
							class="h-16 w-16 rounded-full object-cover"
							src="assets/images/avatar/user-13.png"
							alt="Current profile photo 2"
						/>
					{/if}
				</div>
				<label class="block">
					<span class="sr-only">Choose profile photo</span>
					<input
						type="file"
						on:change={(e) => fileChosen(e, (src) => (imageUrl2 = src))}
						class="dark:text-dark-500 block w-full text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-violet-500/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-500/15"
					/>
				</label>
			</form>
		</CardBody>
	</Col>
</Grid>
