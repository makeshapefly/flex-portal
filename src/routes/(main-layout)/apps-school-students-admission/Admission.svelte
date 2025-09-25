<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import FlatePicker from '$lib/components/forms/form-picker/FlatePicker.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';

	let openTab = 1;
	let passportImageUrl = '';
	let transcriptImageUrl = '';
	let passportError = '';
	let transcriptError = '';

	const personalForm: any = {
		firstName: '',
		middleName: '',
		lastName: '',
		age: '',
		gender: '',
		dateOfBirth: '',
		Phone: '',
		email: '',
		nationality: '',
		address: '',
		city: '',
		country: '',
		pinCode: ''
	};

	const guardianForm: any = {
		fatherName: '',
		motherName: '',
		otherRelative: '',
		mobile: ''
	};

	const educationalForm: any = {
		schoolName: '',
		year: '',
		schoolGPA: '',
		focus: '',
		instituteName: '',
		instituteGPA: '',
		instituteYear: '',
		major: '',
		awards: '',
		activity: '',
		role: '',
		research: ''
	};

	const personalFormErrors: any = {};
	const guardianFormErrors: any = {};
	const educationalFormErrors: any = {};

	function validateField(form: string, field: string) {
		if (form === 'personalForm') {
			personalFormErrors[field] = personalForm[field]
				? ''
				: `${field.replace(/([A-Z])/g, ' $1')} is required`;
		} else if (form === 'guardianForm') {
			guardianFormErrors[field] = guardianForm[field]
				? ''
				: `${field.replace(/([A-Z])/g, ' $1')} is required`;
		} else if (form === 'educationalForm') {
			educationalFormErrors[field] = educationalForm[field]
				? ''
				: `${field.replace(/([A-Z])/g, ' $1')} is required`;
		}
	}

	function validatePersonalDetails() {
		for (let field in personalFormErrors) {
			validateField('personalForm', field);
		}
		return !Object.values(personalFormErrors).some((error) => error !== '');
	}

	function validateGuardianDetails() {
		for (let field in guardianFormErrors) {
			validateField('guardianForm', field);
		}
		return !Object.values(guardianFormErrors).some((error) => error !== '');
	}

	function validateEducationalBackground() {
		for (let field in educationalFormErrors) {
			validateField('educationalForm', field);
		}
		return !Object.values(educationalFormErrors).some((error) => error !== '');
	}

	function handleFileChosen(type: string, event: Event) {
		const target = event.currentTarget as HTMLInputElement; // Type assertion
		const file = target?.files?.[0]; // Ensure files is not null
		if (file) {
			const fileType = file.type;
			const allowedTypes =
				type === 'passportPhoto' ? ['image/png', 'image/jpeg'] : ['application/pdf', 'image/png'];
			if (allowedTypes.includes(fileType)) {
				const imageUrl = URL.createObjectURL(file);
				if (type === 'passportPhoto') {
					passportImageUrl = imageUrl;
					passportError = '';
				} else {
					transcriptImageUrl = imageUrl;
					transcriptError = '';
				}
			} else {
				if (type === 'passportPhoto') {
					passportError = 'Invalid file type. Only png or jpeg files are allowed.';
					passportImageUrl = '';
				} else {
					transcriptError = 'Invalid file type. Only pdf or png files are allowed.';
					transcriptImageUrl = '';
				}
			}
		} else {
			if (type === 'passportPhoto') {
				passportError = 'No file selected.';
			} else {
				transcriptError = 'No file selected.';
			}
		}
	}

	function validateAndSave() {
		passportError = passportImageUrl ? '' : 'Passport-sized Photograph is required.';
		transcriptError = transcriptImageUrl ? '' : 'High School Transcript is required.';

		if (!passportError && !transcriptError) {
			openTab = 5;
		}
	}

	function submitAdmissionForm() {
		const isValidPersonal = validatePersonalDetails();
		const isValidGuardian = validateGuardianDetails();
		const isValidEducational = validateEducationalBackground();

		if (isValidPersonal && isValidGuardian && isValidEducational) {
			resetForms();
			openTab = 1;
		} else {
			console.log('Form validation failed.');
		}
	}

	function resetForms() {
		personalForm.firstName = '';
		personalForm.middleName = '';
		personalForm.lastName = '';
		personalForm.age = '';
		personalForm.gender = '';
		personalForm.dateOfBirth = '';
		personalForm.Phone = '';
		personalForm.email = '';
		personalForm.nationality = '';
		personalForm.address = '';
		personalForm.city = '';
		personalForm.country = '';
		personalForm.pinCode = '';

		guardianForm.fatherName = '';
		guardianForm.motherName = '';
		guardianForm.otherRelative = '';
		guardianForm.mobile = '';

		educationalForm.schoolName = '';
		educationalForm.year = '';
		educationalForm.schoolGPA = '';
		educationalForm.focus = '';
		educationalForm.instituteName = '';
		educationalForm.instituteGPA = '';
		educationalForm.instituteYear = '';
		educationalForm.major = '';
		educationalForm.awards = '';
		educationalForm.activity = '';
		educationalForm.role = '';
		educationalForm.research = '';

		passportImageUrl = '';
		transcriptImageUrl = '';
		passportError = '';
		transcriptError = '';
	}
</script>

<Col cols={{ span: 12 }} xl={{ span: 8 }} class="2xl:col-span-9">
	<Card>
		<CardHeader>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<ul class="tabs-pills overflow-x-auto">
				<li on:click={() => (openTab = 1)}>
					<a
						href="#!"
						class="nav-item"
						class:bg-primary-500={openTab === 1}
						class:text-primary-50={openTab === 1}
						class:text-gray-500={openTab !== 1}
					>
						Personal Details
					</a>
				</li>
				<li on:click={() => (openTab = 2)}>
					<a
						href="#!"
						class="nav-item"
						class:bg-primary-500={openTab === 2}
						class:text-primary-50={openTab === 2}
						class:text-gray-500={openTab !== 2}
					>
						Guardian Details
					</a>
				</li>
				<li on:click={() => (openTab = 3)}>
					<a
						href="#!"
						class="nav-item"
						class:bg-primary-500={openTab === 3}
						class:text-primary-50={openTab === 3}
						class:text-gray-500={openTab !== 3}
					>
						Educational Background
					</a>
				</li>
				<li on:click={() => (openTab = 4)}>
					<a
						href="#!"
						class="nav-item"
						class:bg-primary-500={openTab === 4}
						class:text-primary-50={openTab === 4}
						class:text-gray-500={openTab !== 4}
					>
						Documents
					</a>
				</li>
				<li on:click={() => (openTab = 5)}>
					<a
						href="#!"
						class="nav-item"
						class:bg-primary-500={openTab === 5}
						class:text-primary-50={openTab === 5}
						class:text-gray-500={openTab !== 5}
					>
						Application Overview
					</a>
				</li>
			</ul>
		</CardHeader>
		<CardBody>
			<div class="w-full">
				{#if openTab === 1}
					<form action="#!" id="personalDetailsForm">
						<h6 class="mb-3">Personal Details</h6>
						<div class="gap-space grid grid-cols-12">
							<div class="col-span-12 sm:col-span-6 2xl:col-span-4">
								<label for="firstNameInput" class="form-label">First Name</label>
								<input
									type="text"
									id="firstNameInput"
									class="form-input"
									bind:value={personalForm.firstName}
									placeholder="Enter your first name"
								/>
							</div>
							<div class="col-span-12 sm:col-span-6 2xl:col-span-4">
								<label for="middleNameInput" class="form-label">Middle Name</label>
								<input
									type="text"
									id="middleNameInput"
									class="form-input"
									bind:value={personalForm.middleName}
									placeholder="Enter your middle name"
								/>
							</div>
							<div class="col-span-12 sm:col-span-6 2xl:col-span-4">
								<label for="lastNameInput" class="form-label">Last Name</label>
								<input
									type="text"
									id="lastNameInput"
									class="form-input"
									bind:value={personalForm.lastName}
									placeholder="Enter your last name"
								/>
							</div>
							<div class="col-span-12 sm:col-span-6 2xl:col-span-4">
								<label for="genderSelect" class="form-label">Gender</label>
								<select id="genderSelect" class="form-input" bind:value={personalForm.gender}>
									<option value="">Select Gender</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
									<option value="other">Other</option>
								</select>
							</div>
							<div class="col-span-12 sm:col-span-6 2xl:col-span-4">
								<label for="ageInput" class="form-label">Age</label>
								<input
									type="number"
									id="ageInput"
									class="form-input"
									bind:value={personalForm.age}
									placeholder="Enter your age"
								/>
							</div>
							<div class="col-span-12 sm:col-span-6 2xl:col-span-4">
								<label for="dateOfBirthInput" class="form-label">Date of Birth</label>
								<FlatePicker
									bind:value={personalForm.dateOfBirth}
									dateFormat="Y-m-d"
									type="text"
									class="form-input"
								/>
							</div>
						</div>

						<h6 class="mt-6 mb-3">Contact Details</h6>
						<div class="gap-space grid grid-cols-12">
							<div class="col-span-12 md:col-span-6">
								<label for="phoneInput" class="form-label">Mobile Number</label>
								<input
									type="number"
									id="phoneInput"
									class="form-input"
									bind:value={personalForm.Phone}
									placeholder="Enter your mobile number"
								/>
							</div>
							<div class="col-span-12 md:col-span-6">
								<label for="alternativeMobileNumberInput" class="form-label"
									>Alternative Mobile Number</label
								>
								<input
									type="number"
									id="alternativeMobileNumberInput"
									class="form-input"
									bind:value={personalForm.Phone}
									placeholder="Enter your mobile number"
								/>
							</div>
							<div class="col-span-12 md:col-span-6">
								<label for="emailInput" class="form-label">Email ID</label>
								<input
									type="email"
									class="form-input"
									id="emailInput"
									bind:value={personalForm.email}
									placeholder="example@example.com"
								/>
							</div>
							<div class="col-span-12 md:col-span-6">
								<label for="nationalityInput" class="form-label">Nationality</label>
								<input
									type="text"
									class="form-input"
									id="nationalityInput"
									bind:value={personalForm.nationality}
									placeholder="Enter your nationality"
								/>
							</div>
							<div class="col-span-12">
								<label for="addressInput" class="form-label">Parament Address</label>
								<input
									type="text"
									id="addressInput"
									class="form-input"
									bind:value={personalForm.address}
									placeholder="Enter your address"
								/>
							</div>
							<div class="col-span-12 md:col-span-4">
								<label for="cityInput" class="form-label">City</label>
								<input
									type="text"
									class="form-input"
									id="cityInput"
									bind:value={personalForm.city}
									placeholder="Enter your city"
								/>
							</div>
							<div class="col-span-12 md:col-span-4">
								<label for="countryInput" class="form-label">Country</label>
								<input
									type="text"
									class="form-input"
									id="countryInput"
									bind:value={personalForm.country}
									placeholder="Enter your country"
								/>
							</div>
							<div class="col-span-12 md:col-span-4">
								<label for="pinCodeInput" class="form-label">Pin Code</label>
								<input
									type="text"
									class="form-input"
									id="pinCodeInput"
									bind:value={personalForm.pinCode}
									placeholder="Enter your pincode"
								/>
							</div>
						</div>
						<div class="mt-5 flex flex-wrap items-center gap-2 ltr:justify-end rtl:justify-start">
							<button
								type="button"
								class="btn btn-primary"
								on:click={() => {
									if (validatePersonalDetails()) {
										openTab = 2;
									}
								}}
							>
								Save to Next
								<LucideIcon
									name="MoveRight"
									class="size-4 ltr:ml-1 ltr:inline-block rtl:mr-1 rtl:hidden"
								/>
							</button>
						</div>
					</form>
				{/if}

				{#if openTab === 2}
					<form action="#!" id="guardianDetailsForm">
						<div class="gap-space grid grid-cols-12">
							<div class="col-span-12 sm:col-span-4">
								<label for="fatherNameInput" class="form-label">Father Name</label>
								<input
									type="text"
									id="fatherNameInput"
									class="form-input"
									bind:value={guardianForm.fatherName}
									placeholder="Enter your father name"
									required
								/>
							</div>
							<div class="col-span-12 sm:col-span-4">
								<label for="montherNameInput" class="form-label">Mother Name</label>
								<input
									type="text"
									id="montherNameInput"
									class="form-input"
									bind:value={guardianForm.motherName}
									placeholder="Enter your mother name"
									required
								/>
							</div>
							<div class="col-span-12 sm:col-span-4">
								<label for="otherRelativeNameInput" class="form-label">Others Relative Name</label>
								<input
									type="text"
									id="otherRelativeNameInput"
									class="form-input"
									bind:value={guardianForm.otherRelativeName}
									placeholder="Enter your relative name"
									required
								/>
							</div>
							<div class="col-span-12 sm:col-span-6">
								<label for="gdmobileNumberInput" class="form-label">Mobile Number</label>
								<input
									type="number"
									id="gdmobileNumberInput"
									class="form-input"
									bind:value={guardianForm.gdmobileNumber}
									placeholder="Enter your mobile number"
									required
								/>
							</div>
							<div class="col-span-12 sm:col-span-6">
								<label for="alternativegdMobileNumberInput" class="form-label"
									>Alternative Mobile Number</label
								>
								<input
									type="number"
									id="alternativegdMobileNumberInput"
									class="form-input"
									bind:value={guardianForm.alternativegdMobileNumber}
									placeholder="Enter your mobile number"
								/>
							</div>
						</div>
						<div class="mt-5 flex flex-wrap items-center gap-2 ltr:justify-end rtl:justify-start">
							<button type="button" class="btn btn-sub-gray" on:click={() => (openTab = 1)}>
								<LucideIcon name="MoveLeft" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
								Previous
							</button>
							<button
								type="button"
								class="btn btn-primary"
								on:click={() => {
									if (validateGuardianDetails()) {
										openTab = 3;
									}
								}}
							>
								Save to Next
								<LucideIcon
									name="MoveRight"
									class="size-4 ltr:ml-1 ltr:inline-block rtl:mr-1 rtl:hidden"
								/>
							</button>
						</div>
					</form>
				{/if}

				{#if openTab === 3}
					<form action="#!" id="educationalBackgroundForm">
						<h6 class="mb-3">High School</h6>
						<div class="gap-space grid grid-cols-12">
							<div class="col-span-12 sm:col-span-4">
								<label for="highSchoolNameInput" class="form-label">Name</label>
								<input
									type="text"
									id="highSchoolNameInput"
									class="form-input"
									bind:value={educationalForm.name}
									placeholder="High school name"
									required
								/>
							</div>
							<div class="col-span-12 sm:col-span-4">
								<label for="graduationYearInput" class="form-label">Graduation Year</label>
								<input
									type="number"
									id="graduationYearInput"
									class="form-input"
									bind:value={educationalForm.year}
									placeholder="Years"
									required
								/>
							</div>
							<div class="col-span-12 sm:col-span-4">
								<label for="gpaInput" class="form-label">GPA</label>
								<input
									type="number"
									id="gpaInput"
									class="form-input"
									bind:value={educationalForm.gpa}
									placeholder="GPA"
									required
								/>
							</div>
							<div class="col-span-12">
								<label for="majorFocusInput" class="form-label">Major/Focus</label>
								<input
									type="text"
									id="majorFocusInput"
									class="form-input"
									bind:value={educationalForm.major}
									placeholder="Major/Focus"
									required
								/>
							</div>
						</div>
						<h6 class="mt-5 mb-3">Undergraduate Institution</h6>
						<div class="gap-space grid grid-cols-12">
							<div class="col-span-12 sm:col-span-4">
								<label for="instituteNameInput" class="form-label">Institute Name</label>
								<input
									type="text"
									id="instituteNameInput"
									class="form-input"
									bind:value={educationalForm.instituteName}
									placeholder="Institute name"
									required
								/>
							</div>
							<div class="col-span-12 sm:col-span-4">
								<label for="underGraduationYearInput" class="form-label">Graduation Year</label>
								<input
									type="number"
									id="underGraduationYearInput"
									class="form-input"
									bind:value={educationalForm.underGraduationYear}
									placeholder="Years"
									required
								/>
							</div>
							<div class="col-span-12 sm:col-span-4">
								<label for="underGpaInput" class="form-label">GPA</label>
								<input
									type="number"
									id="underGpaInput"
									class="form-input"
									bind:value={educationalForm.underGpa}
									placeholder="GPA"
									required
								/>
							</div>
							<div class="col-span-12">
								<label for="underMajorFocusInput" class="form-label">Major/Focus</label>
								<input
									type="text"
									id="underMajorFocusInput"
									class="form-input"
									bind:value={educationalForm.underMajorFocus}
									placeholder="Major/Focus"
									required
								/>
							</div>
						</div>

						<h6 class="mt-5 mb-3">Academic Achievements</h6>
						<div class="gap-space grid grid-cols-12">
							<div class="col-span-12 sm:col-span-4">
								<label for="honorsAwardsInput" class="form-label">Honors/Awards</label>
								<input
									type="text"
									id="honorsAwardsInput"
									class="form-input"
									bind:value={educationalForm.awards}
								/>
							</div>
							<div class="col-span-12 sm:col-span-4">
								<label for="extracurricularActivitiesInput" class="form-label"
									>Extracurricular Activities</label
								>
								<input
									type="text"
									id="extracurricularActivitiesInput"
									class="form-input"
									bind:value={educationalForm.activities}
								/>
							</div>
							<div class="col-span-12 sm:col-span-4">
								<label for="leadershipRolesInput" class="form-label">Leadership Roles</label>
								<input
									type="text"
									id="leadershipRolesInput"
									class="form-input"
									bind:value={educationalForm.leadershipRoles}
								/>
							</div>
							<div class="col-span-12">
								<label for="publicationsResearchInput" class="form-label"
									>Publications/Research</label
								>
								<input
									type="text"
									id="publicationsResearchInput"
									class="form-input"
									bind:value={educationalForm.publications}
								/>
							</div>
						</div>

						<div class="mt-5 flex flex-wrap items-center justify-end gap-2">
							<button type="button" class="btn btn-sub-gray" on:click={() => (openTab = 1)}>
								<LucideIcon name="MoveLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
								Previous
							</button>
							<button
								type="button"
								class="btn btn-primary"
								on:click={() => {
									if (validateEducationalBackground()) {
										openTab = 4;
									}
								}}
							>
								Save to Next
								<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
							</button>
						</div>
					</form>
				{/if}

				{#if openTab === 4}
					<form action="#!">
						<h6 class="mb-3">Passport-sized Photograph</h6>
						<div class="mb-5">
							<label for="passportPhotoInput">
								<div
									class="dark:bg-dark-850 dark:border-dark-800 flex size-36 cursor-pointer items-center justify-center overflow-hidden rounded border border-gray-200 bg-gray-100"
								>
									{#if passportImageUrl}
										<!-- svelte-ignore a11y-missing-attribute -->
										<img src={passportImageUrl} class="h-full w-full object-cover" />
									{:else}
										<div class="dark:text-dark-500 flex flex-col items-center text-gray-500">
											<LucideIcon name="Upload" />
											<div class="mt-2 mb-1">Passport Size</div>
											<p>144 x 144</p>
										</div>
									{/if}
								</div>
							</label>
							<input
								type="file"
								id="passportPhotoInput"
								class="hidden"
								on:change={(e) => handleFileChosen('passportPhoto', e)}
							/>
							{#if passportError}
								<p class="mt-1 text-sm text-red-500">{passportError}</p>
							{/if}
						</div>

						<h6 class="mb-3">High School Transcript</h6>
						<div>
							<label for="transcriptInput">
								<div
									class="dark:bg-dark-850 dark:border-dark-800 flex h-28 cursor-pointer items-center justify-center overflow-hidden rounded border border-gray-200 bg-gray-100 p-4"
								>
									{#if transcriptImageUrl}
										<!-- svelte-ignore a11y-missing-attribute -->
										<img src={transcriptImageUrl} class="h-full w-full object-cover" />
									{:else}
										<div class="dark:text-dark-500 flex flex-col items-center text-gray-500">
											<LucideIcon name="Upload" />
											<div class="mt-2 mb-1">Drag and drop your certificate</div>
											<p>only allowed pdf, png files.</p>
										</div>
									{/if}
								</div>
							</label>
							<input
								type="file"
								id="transcriptInput"
								class="hidden"
								on:change={(e) => handleFileChosen('transcript', e)}
							/>
							{#if transcriptError}
								<p class="mt-1 text-sm text-red-500">{transcriptError}</p>
							{/if}
						</div>

						<div class="mt-5 flex flex-wrap items-center gap-2 ltr:justify-end rtl:justify-start">
							<button type="button" class="btn btn-sub-gray" on:click={() => (openTab = 3)}>
								<LucideIcon name="MoveLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
								Previous
							</button>
							<button type="button" class="btn btn-primary" on:click={validateAndSave}>
								Save to Next
								<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
							</button>
						</div>
					</form>
				{/if}

				{#if openTab === 5}
					<form action="#!">
						<h6 class="mb-3">Application Overview</h6>
						<div class="gap-space grid grid-cols-12">
							<div class="col-span-12 sm:col-span-6">
								<label for="applicationIDInput" class="form-label">Application ID</label>
								<input
									type="text"
									id="applicationIDInput"
									class="form-input"
									value="#PEA-1478A5487956236"
									readonly
								/>
							</div>
							<div class="col-span-12 sm:col-span-6">
								<label for="referenceNumberInput" class="form-label">Reference Number</label>
								<input
									type="text"
									id="referenceNumberInput"
									class="form-input"
									placeholder="#PEA-000A0000000000"
								/>
							</div>
							<div class="col-span-12 sm:col-span-6">
								<label for="dateOfaAplicationSelect" class="form-label"
									>Date of Application Submission</label
								>
								<input
									type="text"
									id="dateOfaAplicationSelect"
									class="form-input"
									value="23 June, 2024"
									readonly
								/>
							</div>
							<div class="col-span-12 sm:col-span-6">
								<label for="dateOfaAplicationSelect" class="form-label">Current Status</label>
								<span class="badge badge-green">Submitted</span>
							</div>
						</div>

						<div class="mt-5 flex flex-wrap items-center gap-2 ltr:justify-end rtl:justify-start">
							<button type="button" class="btn btn-sub-gray" on:click={() => (openTab = 4)}>
								<LucideIcon name="MoveLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
								Previous
							</button>
							<button type="button" class="btn btn-primary" on:click={submitAdmissionForm}>
								Submitted Form
								<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
							</button>
						</div>
					</form>
				{/if}
			</div>
		</CardBody>
	</Card>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 4 }} class="2xl:col-span-3">
	<Card>
		<CardHeader>
			<CardTitle>Fees Structure</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="alert-red alert mb-4">
				<span
					>If the fees are not paid before 01 Aug, 2024, the application will be automatically
					rejected</span
				>
			</div>
			<form action="#!">
				<div class="grid grid-cols-12 items-center gap-3">
					<div class="col-span-12 sm:col-span-4">
						<label for="courseFrees" class="form-label mb-0">Course Frees</label>
					</div>
					<div class="col-span-12 sm:col-span-8">
						<input type="number" id="courseFrees" class="form-input" placeholder="$0" />
					</div>
					<div class="col-span-12 sm:col-span-4">
						<label for="paidAmount" class="form-label mb-0">Paid Amount</label>
					</div>
					<div class="col-span-12 sm:col-span-8">
						<input type="number" id="paidAmount" class="form-input" placeholder="$0" />
					</div>
					<div class="col-span-12 sm:col-span-4">
						<label for="statuSelect" class="form-label mb-0">Status</label>
					</div>
					<div class="col-span-12 sm:col-span-8">
						<select id="statuSelect" class="form-input text-gray-400">
							<option value="" hidden selected disabled>Select status</option>
							<option value="paid">Paid</option>
							<option value="unpaid">Unpaid</option>
						</select>
					</div>
					<div class="col-span-12 sm:col-span-4">
						<label for="paidVia" class="form-label mb-0">Paid Via</label>
					</div>
					<div class="col-span-12 sm:col-span-8">
						<input type="text" id="paidVia" class="form-input" placeholder="N/A" />
					</div>
				</div>
				<div class="mt-5 flex flex-wrap gap-2">
					<button class="btn btn-sub-gray">View Receive</button>
					<button class="btn btn-primary">Add Account</button>
				</div>
			</form>
		</CardBody>
	</Card>
</Col>
