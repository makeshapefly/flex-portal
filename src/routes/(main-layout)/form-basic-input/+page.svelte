<script>
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
	let passwordVisible = false;
</script>

<PageHeading title="Basic Input" sub_title="Forms" />
<Grid cols={12} gapX="space">
	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Default</CardTitle>
		</CardHeader>
		<CardBody>
			<label for="basicInput1" class="form-label">Default Input</label>
			<input type="text" id="basicInput1" class="form-input" />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Float Label</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="group relative">
				<input type="text" id="floating_outlined" class="form-input peer pt-4" placeholder=" " />
				<label
					for="floating_outlined"
					class="dark:text-dark-500 dark:bg-dark-900 absolute start-1 top-1/2 z-10 origin-[0] -translate-y-1/2 scale-100 transform bg-white px-2 text-sm text-gray-500 duration-300 group-[&.show]:top-2 group-[&.show]:-translate-y-4 group-[&.show]:scale-[0.85] group-[&.show]:px-2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-[0.85] peer-focus:px-2"
					>Float Label</label
				>
			</div>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Placeholder</CardTitle>
		</CardHeader>
		<CardBody>
			<label for="placeholderInput" class="form-label">Input</label>
			<input type="text" id="placeholderInput" class="form-input" placeholder="Placeholder" />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Value</CardTitle>
		</CardHeader>
		<CardBody>
			<label for="valueInput1" class="form-label">Input</label>
			<input
				type="text"
				id="valueInput1"
				class="form-input"
				placeholder="Placeholder"
				value="Input value"
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Disabled</CardTitle>
		</CardHeader>
		<CardBody>
			<label for="disabledInput" class="form-label">Input</label>
			<input
				type="text"
				id="disabledInput"
				class="form-input"
				placeholder="Placeholder"
				value="Disabled Input"
				disabled
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Valid field</CardTitle>
		</CardHeader>
		<CardBody>
			<label for="validInput" class="form-label">Email</label>
			<input
				type="email"
				id="validInput"
				class="form-input valid:border-green-500 invalid:border-red-500"
				placeholder="Placeholder"
				value="example@gmail.com"
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Invalid Field</CardTitle>
		</CardHeader>
		<CardBody>
			<label for="invalidInput" class="form-label">Email</label>
			<input
				type="email"
				id="invalidInput"
				class="form-input valid:border-green-500 invalid:border-red-500"
				placeholder="Placeholder"
				value="example.com"
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Password Input</CardTitle>
		</CardHeader>
		<CardBody>
			<form action="#!">
				<div>
					<label for="iconNormalWithInput" class="form-label">Password</label>
					<div class="relative">
						<input
							type={passwordVisible ? 'text' : 'password'}
							id="iconNormalWithInput"
							class="form-input ltr:pr-8 rtl:pl-8"
							placeholder="Placeholder"
						/>
						<button
							type="button"
							class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:right-3 rtl:left-3"
							on:click={() => (passwordVisible = !passwordVisible)}
						>
							{#if passwordVisible}
								<LucideIcon name="EyeOff" class="size-5" />
							{:else}
								<LucideIcon name="Eye" class="size-5" />
							{/if}
						</button>
					</div>
				</div>
			</form>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Textarea</CardTitle>
		</CardHeader>
		<CardBody>
			<label for="textareaInput" class="form-label">Textarea Input</label>
			<textarea name="textareaInput" id="textareaInput" rows="3" class="form-input h-auto"
			></textarea>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Textarea Placeholder</CardTitle>
		</CardHeader>
		<CardBody>
			<label for="textareaInput2" class="form-label">Textarea Placeholder</label>
			<textarea
				name="textareaInput2"
				id="textareaInput2"
				rows="3"
				class="form-input h-auto"
				placeholder="Enter your description"
			></textarea>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Textarea Placeholder</CardTitle>
		</CardHeader>
		<CardBody>
			<label for="textareaInput3" class="form-label">Textarea Placeholder</label>
			<textarea
				name="textareaInput3"
				id="textareaInput3"
				rows="3"
				class="form-input h-auto"
				placeholder="Enter your description"
				>Admin dashboard is a single screen that includes all crucial information. In contrast, an
				admin or control panel allows for certain actions.
			</textarea>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Icon with Input</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<label for="iconEmailWithInput" class="form-label">Email</label>
				<div class="group/form relative">
					<input
						type="email"
						id="iconEmailWithInput"
						class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
						placeholder="Placeholder"
					/>
					<button
						class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
					>
						<LucideIcon name="Mail" class="size-4" />
					</button>
				</div>
			</div>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Icon with Input (Right)</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<label for="iconEmailWithInputRight" class="form-label">Email</label>
				<div class="group/form right relative">
					<input
						type="email"
						id="iconEmailWithInput"
						class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
						placeholder="Placeholder"
					/>
					<button
						class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
					>
						<LucideIcon name="Mail" class="size-4" />
					</button>
				</div>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Input Sizes</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="grid grid-cols-12 items-center gap-5">
				<div class="col-span-12 sm:col-span-6 xl:col-span-3">
					<label for="smallInput" class="form-label">Small Input</label>
					<input type="text" id="smallInput" class="form-input input-sm" />
				</div>
				<div class="col-span-12 sm:col-span-6 xl:col-span-3">
					<label for="mediumInput" class="form-label">Medium Input</label>
					<input type="text" id="mediumInput" class="form-input input-md" />
				</div>
				<div class="col-span-12 sm:col-span-6 xl:col-span-3">
					<label for="defaultInput" class="form-label">Default Input</label>
					<input type="text" id="defaultInput" class="form-input" />
				</div>
				<div class="col-span-12 sm:col-span-6 xl:col-span-3">
					<label for="largeInput" class="form-label">Large Input</label>
					<input type="text" id="largeInput" class="form-input input-lg" />
				</div>
			</div>
		</CardBody>
	</Col>
</Grid>
