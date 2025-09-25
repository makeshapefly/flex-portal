<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Lucid from '$lib/components/Icons/Icons-lucide/Lucid.svelte';
	import { fade } from 'svelte/transition';
	import { defaultUser } from './defaultUseriamge';

	// Define the types for the form state
	interface Form {
		imageForm: string;
		firstName: string;
		email: string;
		passwords: string;
		gender: string;
		profession: string;
	}

	let step: any = 1;
	let form: Form = {
		imageForm: '',
		firstName: '',
		email: '',
		passwords: '',
		gender: '',
		profession: ''
	};
	let errors: Record<string, string> = {};
	let passwordStrengthText = '';
	let togglePassword = false;

	const resetForm = () => {
		step = 1;
		form = {
			imageForm: '',
			firstName: '',
			email: '',
			passwords: '',
			gender: '',
			profession: ''
		};
		errors = {};
		passwordStrengthText = '';
		togglePassword = false;
	};

	const validateStep = (currentStep: number | string) => {
		errors = {}; // Clear previous errors

		if (currentStep === 1) {
			if (!form.firstName) errors.firstName = 'Firstname is required.';
			if (!form.email) {
				errors.email = 'Email is required.';
			} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
				errors.email = 'Invalid email format.';
			}
		}
		if (currentStep === 2) {
			if (!form.passwords) {
				errors.passwords = 'Password is required.';
			} else if (form.passwords.length < 8) {
				errors.passwords = 'Password must be at least 8 characters.';
			} else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(form.passwords)) {
				errors.passwords =
					'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
			}
		}
		if (currentStep === 3) {
			if (!form.gender) errors.gender = 'Please select a gender.';
			if (!form.profession) errors.profession = 'Profession is required.';
		}
		if (Object.keys(errors).length === 0) {
			if (step === 3) {
				// If we're at step 3, set the step to 'complete'
				step = 'complete';
			} else {
				step++;
			}
		}
	};

	const checkPasswordStrength = () => {
		const password = form.passwords;
		if (password.length < 8) {
			passwordStrengthText = 'Too weak';
		} else if (password.length < 12) {
			passwordStrengthText = 'Could be stronger';
		} else {
			passwordStrengthText = 'Strong password';
		}
	};

	const handleImageChange = (event: Event) => {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			form.imageForm = URL.createObjectURL(file);
		}
	};

	const clearError = (field: string) => {
		if (errors[field]) delete errors[field];
	};
</script>

<div class="mx-auto w-full lg:max-w-[600px]">
	<div class="card">
		<div class="card-body">
			<div>
				{#if step === 'complete'}
					<!-- Success screen after registration is complete -->
					<div class="flex items-center justify-between text-center" in:fade>
						<div>
							<LucideIcon
								name="CircleCheckBig"
								class="mx-auto my-4 size-8 fill-green-500/10 text-green-500"
							/>
							<h4 class="mb-2">Registration Success</h4>
							<div class="mb-8 text-gray-500">
								Thank you. We have sent you an email to <b>{form.email}</b>. Please click the link
								in the message to activate your account.
							</div>
							<button on:click={resetForm} class="btn btn-sub-gray">
								<LucideIcon name="Home" class="-mt-1 inline-block size-4 ltr:mr-1 rtl:ml-1" />
								Back to home</button
							>
						</div>
					</div>
				{:else}
					<!-- Top Navigation -->
					<div class="border-b border-gray-200 py-4">
						<h6 class="mb-1 text-xs text-gray-500 uppercase">Step: {step} of 3</h6>
						<div class="flex flex-col md:flex-row md:items-center md:justify-between">
							<div class="flex-1">
								{#if step === 1}<h5>Your Profile</h5>{/if}
								{#if step === 2}<h5>Your Password</h5>{/if}
								{#if step === 3}<h5>Tell me about yourself</h5>{/if}
							</div>
							<div class="flex items-center md:w-64">
								<div class="w-full rounded-full bg-gray-200">
									<div
										class="h-2 rounded-full bg-green-500"
										style="width: {(step / 3) * 100}%"
									></div>
								</div>
								<h6 class="w-10 text-xs text-gray-500">{Math.floor((step / 3) * 100)}%</h6>
							</div>
						</div>
					</div>
					<!-- Step Content -->
					<div class="pt-10 pb-5">
						{#if step === 1}
							<div in:fade>
								<!-- Profile Step -->
								<div class="mb-5 text-center">
									<div class="relative mx-auto mb-4 h-32 w-32 rounded-full border bg-gray-500">
										<!-- svelte-ignore a11y-missing-attribute -->
										<img
											id="image"
											class="h-32 w-full rounded-full object-cover"
											src={form.imageForm ? form.imageForm : defaultUser}
										/>
									</div>
									<label
										class="dark:border-dark-800 dark:text-dark-500 inine-flex dark:hover:bg-dark-850 inline-block cursor-pointer items-center justify-between rounded-lg border border-gray-200 px-4 py-2 text-left font-medium text-gray-500 shadow-sm hover:bg-gray-100 focus:outline-none"
										><LucideIcon
											name="Camera"
											class="-mt-1 inline-flex size-5 flex-shrink-0 ltr:mr-1 rtl:ml-1"
										/>
										Browse Photo

										<input
											type="file"
											class="hidden"
											accept="image/*"
											on:change={handleImageChange}
										/>
									</label>
									<div class="dark:text-dark-500 mt-1 text-center text-xs text-gray-500">
										Click to add profile picture
									</div>
								</div>
								<div class="mb-5">
									<label for="firstName" class="form-label">Firstname</label>
									<input
										id="firstName"
										type="text"
										class="form-input"
										bind:value={form.firstName}
										on:input={() => clearError('firstName')}
										placeholder="Enter your firstname..."
									/>
									{#if errors.firstName}<p class="text-red-500">{errors.firstName}</p>{/if}
								</div>
								<div class="mb-5">
									<label for="email" class="form-label">Email</label>
									<input
										id="email"
										type="email"
										class="form-input"
										bind:value={form.email}
										on:input={() => clearError('email')}
										placeholder="Enter your email..."
									/>
									{#if errors.email}<p class="text-red-500">{errors.email}</p>{/if}
								</div>
							</div>
						{/if}
						{#if step === 2}
							<!-- Password Step -->
							<div in:fade>
								<label for="password" class="form-label">Set up password</label>

								<div class="dark:text-dark-500 mt-2 mb-4 text-gray-500">
									Please create a secure password including the following criteria below.

									<ul class="mt-2 list-inside list-disc text-sm">
										<li>lowercase letters</li>
										<li>numbers</li>
										<li>capital letters</li>
										<li>special characters</li>
									</ul>
								</div>
								<!-- Conditional rendering for password input -->
								<div class="relative">
									{#if togglePassword}
										<input
											id="password"
											type="text"
											class="form-input"
											bind:value={form.passwords}
											on:input={() => {
												checkPasswordStrength();
												clearError('passwords');
											}}
											placeholder="Your strong password..."
										/>
									{:else}
										<input
											id="password"
											type="password"
											class="form-input"
											bind:value={form.passwords}
											on:input={() => {
												checkPasswordStrength();
												clearError('passwords');
											}}
											placeholder="Your strong password..."
										/>
									{/if}
									<button
										class="absolute top-0 bottom-0 cursor-pointer px-3 py-2 ltr:right-0 rtl:left-0"
										on:click={() => (togglePassword = !togglePassword)}
									>
										<LucideIcon
											name={togglePassword ? 'Eye' : 'EyeOff'}
											class="dark:text-dark-500 size-6 text-gray-500"
										/>
									</button>
								</div>

								<!-- Error Message -->
								{#if errors.passwords}
									<p class="text-red-500">{errors.passwords}</p>
								{/if}

								<!-- Password Strength -->
								<div class="mt-4 flex h-3 items-center">
									<div class="flex h-2 w-2/3 justify-between">
										<!-- First bar (Red - Weak) -->
										<div
											class="dark:bg-dark-800 h-2 w-1/3 rounded-full bg-gray-300 ltr:mr-1 rtl:ml-1"
											class:bg-red-400={[
												'Too weak',
												'Could be stronger',
												'Strong password'
											].includes(passwordStrengthText)}
											class:dark:bg-red-400={[
												'Too weak',
												'Could be stronger',
												'Strong password'
											].includes(passwordStrengthText)}
										></div>

										<!-- Second bar (Orange - Medium) -->
										<div
											class="dark:bg-dark-800 h-2 w-1/3 rounded-full bg-gray-300 ltr:mr-1 rtl:ml-1"
											class:bg-orange-400={['Could be stronger', 'Strong password'].includes(
												passwordStrengthText
											)}
											class:dark:bg-orange-400={['Could be stronger', 'Strong password'].includes(
												passwordStrengthText
											)}
										></div>

										<!-- Third bar (Green - Strong) -->
										<div
											class="dark:bg-dark-800 h-2 w-1/3 rounded-full bg-gray-300"
											class:bg-green-400={passwordStrengthText === 'Strong password'}
											class:dark:bg-green-400={passwordStrengthText === 'Strong password'}
										></div>
									</div>
								</div>
							</div>
							<p class="dark:text-dark-500 mt-5 text-gray-500">
								Exploration for a password strength meter by <a href="#!" class="text-primary-500"
									>SRBThemes</a
								>.
							</p>
						{/if}

						{#if step === 3}
							<!-- Profile Info Step -->
							<div in:fade class="mb-5">
								<label for="gender" class="mb-2 block">Gender</label>
								<div class="flex gap-5">
									<div class="input-radio-group">
										<input
											id="male"
											type="radio"
											bind:group={form.gender}
											value="Male"
											class="input-radio input-radio-primary"
										/>
										<label for="male">Male</label>
									</div>
									<div class="input-radio-group">
										<input
											id="female"
											type="radio"
											class="input-radio input-radio-primary"
											bind:group={form.gender}
											value="Female"
										/>
										<label for="female" class="input-radio-label">Female</label>
									</div>
								</div>
								{#if errors.gender}<p class="mt-1 text-xs text-red-500">{errors.gender}</p>{/if}
							</div>
							<div class="mb-5">
								<label for="profession" class="mb-2 block text-sm">Profession</label>
								<input
									id="profession"
									type="text"
									class="form-input"
									bind:value={form.profession}
									on:input={() => clearError('profession')}
									placeholder="eg. Web Developer"
								/>
								{#if errors.profession}<p class="mt-1 text-xs text-red-500">
										{errors.profession}
									</p>{/if}
							</div>
						{/if}
					</div>
					<!-- Navigation Buttons -->
					<div class="flex justify-between">
						{#if step > 1}
							<div class="w-1/2">
								<button type="button" class="btn btn-sub-gray" on:click={() => step--}>
									<LucideIcon name="MoveLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
									<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
									Previous
								</button>
							</div>
						{/if}
						<div class={`ltr:text-right rtl:text-left ${step === 1 ? 'w-full' : 'w-1/2 '}`}>
							<button
								type="button"
								class={`btn float-end border  ${step === 3 ? 'btn-green' : 'btn-primary'} `}
								on:click={() => validateStep(step)}
							>
								{step === 3 ? 'Complete' : 'Next'}
								<LucideIcon name="MoveLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
								<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
