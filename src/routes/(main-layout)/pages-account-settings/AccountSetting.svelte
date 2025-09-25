<script lang="ts">
	import Account from '$lib/components/common/Account.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';

	let photoPreview: string | null = null;
	let firstName = 'Sophia';
	let lastName = 'Mia';
	let role = 'UI / UX Designer';
	let birthDate = '';
	let joiningDate = '';
	let email = 'sophia@example.com';
	let phoneNumber = '919876543210';
	let location = 'Argentina';
	let language = '';
	let currency = '';
	let objective = '';

	// Function to handle photo preview
	const handlePhotoChange = (event: any) => {
		const file = event.target.files[0];
		if (file) {
			photoPreview = URL.createObjectURL(file);
		}
	};

	// Form submission
	const handleSubmit = (event: any) => {
		event.preventDefault();
		// Handle form submission logic here
		console.log({
			firstName,
			lastName,
			role,
			birthDate,
			joiningDate,
			email,
			phoneNumber,
			location,
			language,
			currency,
			objective
		});
	};
</script>

<Account variant="settings" />

<Card class="mt-5">
	<CardBody>
		<Grid cols={12} gap={3}>
			<Col cols={{ span: 12 }} xl={{ span: 3 }}>
				<CardTitle>Personal Information</CardTitle>
			</Col>
			<Col cols={{ span: 12 }} xl={{ span: 9 }}>
				<form on:submit={handleSubmit} action="#!">
					<Grid cols={12} gap={5}>
						<!-- Photo Section -->
						<Col cols={{ span: 12 }}>
							<div>
								{#if !photoPreview}
									<!-- svelte-ignore a11y-img-redundant-alt -->
									<img
										class="size-20 rounded-md object-cover"
										src="assets/images/avatar/user-17.png"
										alt="Current profile photo"
									/>
								{:else}
									<!-- svelte-ignore a11y-img-redundant-alt -->
									<img
										src={photoPreview}
										class="size-20 rounded-md object-cover"
										alt="Selected profile photo"
									/>
								{/if}
								<label class="mt-4 block">
									<span class="sr-only">Choose profile photo</span>
									<input type="file" on:change={handlePhotoChange} class="hidden" />
									<span class="btn btn-sub-primary">
										<LucideIcon name="Upload" class="me-1 inline-block size-4" />
										<span class="align-middle">Upload Profile</span>
									</span>
								</label>
							</div>
						</Col>

						<!-- First Name -->
						<Col cols={{ span: 12 }} md={{ span: 6 }}>
							<label for="firstNameInput" class="form-label">First Name</label>
							<input
								type="text"
								id="firstNameInput"
								bind:value={firstName}
								class="form-input"
								placeholder="Enter your first name"
							/>
						</Col>

						<!-- Last Name -->
						<Col cols={{ span: 12 }} md={{ span: 6 }}>
							<label for="lastNameInput" class="form-label">Last Name</label>
							<input
								type="text"
								id="lastNameInput"
								bind:value={lastName}
								class="form-input"
								placeholder="Enter your last name"
							/>
						</Col>

						<!-- Role -->
						<Col cols={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
							<label for="roleInput" class="form-label">Role</label>
							<input
								type="text"
								id="roleInput"
								bind:value={role}
								class="form-input"
								placeholder="Enter your role"
							/>
						</Col>

						<!-- Birth Date -->
						<Col cols={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
							<label for="birthDateInput" class="form-label">Birth of Date</label>
							<input
								type="date"
								id="birthDateInput"
								bind:value={birthDate}
								class="form-input"
								placeholder="Select date"
							/>
						</Col>

						<!-- Joining Date -->
						<Col cols={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
							<label for="joiningDateInput" class="form-label">Joining Date</label>
							<input
								type="date"
								id="joiningDateInput"
								bind:value={joiningDate}
								class="form-input"
								placeholder="Select date"
							/>
						</Col>

						<!-- Email -->
						<Col cols={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
							<label for="emailInput" class="form-label">Email Address</label>
							<input
								type="email"
								id="emailInput"
								bind:value={email}
								class="form-input"
								placeholder="example@srbthemes.com"
							/>
						</Col>

						<!-- Phone Number -->
						<Col cols={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
							<label for="phoneNumberInput" class="form-label">Phone Number</label>
							<input
								type="number"
								id="phoneNumberInput"
								bind:value={phoneNumber}
								class="form-input"
								placeholder="000000000000"
							/>
						</Col>

						<!-- Location -->
						<Col cols={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
							<label for="locationInput" class="form-label">Location</label>
							<input
								type="text"
								id="locationInput"
								bind:value={location}
								class="form-input"
								placeholder="Enter location"
							/>
						</Col>

						<!-- Language -->
						<Col cols={{ span: 12 }} md={{ span: 6 }}>
							<label for="languageSelect" class="form-label">Language</label>
							<select name="" id="" class="form-input">
								<option value="" selected disabled hidden>Select</option>
								<option value="english">English</option>
								<option value="french">French</option>
								<option value="german">German</option>
								<option value="russian">Russian</option>
							</select>
						</Col>

						<!-- Currency -->
						<Col cols={{ span: 12 }} md={{ span: 6 }}>
							<label for="currencySelect" class="form-label">Currency</label>
							<select name="" id="" class="form-input">
								<option value="" selected disabled hidden>Select</option>
								<option value="usd">USD ($)</option>
								<option value="eur">EUR (€)</option>
								<option value="pound">Pound (£)</option>
								<option value="jpy">JPY (¥)</option>
							</select>
						</Col>

						<!-- Objective -->
						<Col cols={{ span: 12 }}>
							<label for="textareaInput2" class="form-label">Objective</label>
							<textarea
								id="textareaInput2"
								bind:value={objective}
								rows="3"
								class="form-input h-auto"
								placeholder="Write your objective"
							></textarea>
						</Col>

						<!-- Submit Button -->
						<Col cols={{ span: 12 }} class="text-right">
							<button type="submit" class="btn btn-primary">Update Profile</button>
						</Col>
					</Grid>
				</form>
			</Col>
		</Grid>
	</CardBody>
</Card>

<Card>
	<div class="card-body">
		<div class="grid grid-cols-12 gap-3 lg:gap-0">
			<div class="col-span-12 xl:col-span-3">
				<h6 class="card-title">Public Account</h6>
			</div>
			<!--end col-span-12 md:d col-->
			<div class="col-span-12 xl:col-span-9">
				<div class="items-center gap-3 md:flex">
					<div class="grow">
						<h6 class="mb-1">Publish your contact information publicly.</h6>
						<p class="dark:text-dark-500 text-gray-500">
							Allow anyone viewing your profile to access your contact information.
						</p>
					</div>
					<label for="publicProfile" class="switch-group">
						<div class="relative">
							<input type="checkbox" id="publicProfile" class="peer sr-only hidden" />
							<div class="switch-wrapper"></div>
							<div
								class="switch-dot switch-primary peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
							></div>
						</div>
					</label>
				</div>
				<div class="mt-4 items-center gap-3 md:flex">
					<div class="grow">
						<h6 class="mb-1">Make Contact Info Public</h6>
						<p class="dark:text-dark-500 text-gray-500">
							Allow anyone viewing your profile to access your contact information.
						</p>
					</div>
					<label for="publicProfile2" class="switch-group">
						<div class="relative">
							<input type="checkbox" id="publicProfile2" class="peer sr-only hidden" />
							<div class="switch-wrapper"></div>
							<div
								class="switch-dot switch-primary peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
							></div>
						</div>
					</label>
				</div>
			</div>
			<!--end col-->
		</div>
		<!--end grid-->
	</div>
</Card>

<Card>
	<CardHeader>
		<CardTitle>Delete Account</CardTitle>
	</CardHeader>
	<CardBody>
		<p class="dark:text-dark-500 mb-3 text-gray-500">
			Please proceed with caution, as deleting your account and all associated data from our
			organization is a permanent action and cannot be undone.
		</p>
		<button class="btn btn-red">Delete Account</button>
	</CardBody>
</Card>
