<script lang="ts">
	import { writable } from 'svelte/store'; // Import writable store
	import { formDetails, errors, validateForm } from './signup'; // Import the form, errors, and validation function
	import LucideIcon from '$lib/components/common/LucideIcon.svelte'; // Import the icon component
	import { getContext } from 'svelte';
	import { auth } from '$lib/firebase/firebase.js';

	// Declare writable stores to manage password visibility
	const showPassword = writable(false);
	const showConfirmPassword = writable(false);

	// Function to toggle password visibility
	function toggleShowPassword() {
		showPassword.update((value) => !value); // Toggle password visibility
	}

	// Function to toggle confirm password visibility
	function toggleShowConfirmPassword() {
		showConfirmPassword.update((value) => !value); // Toggle confirm password visibility
	}

	let formData = $state({
		email: '',
		password: ''
	});

	const signIn = async () => {
		signInWithEmailAndPassword(auth, formData.email, formData.password)
			.then(async (userCredential) => {
				// Signed in
				const user = userCredential.user;
				const accessToken = await user.getIdToken();
				console.log(accessToken);
				

				//goto('/dashboards/analytics');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};
</script>

<div
	class="relative flex min-h-screen items-center justify-center from-sky-100 via-green-50 to-pink-50 py-12 ltr:bg-gradient-to-l rtl:bg-gradient-to-r dark:from-sky-500/15 dark:via-green-500/10 dark:to-pink-500/10"
>
	<div class="container">
		<div class="grid grid-cols-12">
			<div
				class="card col-span-12 mb-0 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-4 xl:col-span-4 xl:col-start-5"
			>
				<div class="card-body md:p-10">
					<div class="mb-5 text-center">
						<a href="/index">
							<img src="assets/images/main-logo.png" alt="" class="mx-auto h-8 dark:hidden" />
							<img
								src="assets/images/logo-white.png"
								alt=""
								class="mx-auto hidden h-8 dark:inline-block"
							/>
						</a>
					</div>
					<h4
						class="from-primary-500 vie-purple-500 mb-2 to-pink-500 bg-clip-text text-center leading-relaxed font-bold text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l"
					>
						Create a New Account
					</h4>
					<p class="dark:text-dark-500 mb-5 text-center text-gray-500">
						Already have an account? <a
							href="/auth-signin-basic"
							class="link link-primary font-medium">Sign In</a
						>
					</p>
					<form on:submit|preventDefault={signIn}>
						<div class="mt-5 grid grid-cols-12 gap-4">
							<div class="col-span-12 md:col-span-6">
								<label for="firstNameInput" class="form-label">First Name</label>
								<input
									type="text"
									id="firstNameInput"
									class="form-input w-full"
									placeholder="Enter your first name"
									bind:value={$formDetails.firstName}
									on:input={() => validateForm()}
								/>
								{#if $errors.firstName}
									<p class="text-sm text-red-500">{$errors.firstName}</p>
								{/if}
							</div>
							<div class="col-span-12 md:col-span-6">
								<label for="lastNameInput" class="form-label">Last Name</label>
								<input
									type="text"
									id="lastNameInput"
									class="form-input w-full"
									placeholder="Enter your last name"
									bind:value={$formDetails.lastName}
									on:input={() => validateForm()}
								/>
								{#if $errors.lastName}
									<p class="text-sm text-red-500">{$errors.lastName}</p>
								{/if}
							</div>
							<div class="col-span-12 md:col-span-6">
								<label for="userNameInput" class="form-label">Username</label>
								<input
									type="text"
									id="userNameInput"
									class="form-input w-full"
									placeholder="Enter your username"
									bind:value={$formDetails.userName}
									on:input={() => validateForm()}
								/>
								{#if $errors.userName}
									<p class="text-sm text-red-500">{$errors.userName}</p>
								{/if}
							</div>
							<div class="col-span-12 md:col-span-6">
								<label for="emailInput" class="form-label">Email</label>
								<input
									type="email"
									id="emailInput"
									class="form-input w-full"
									placeholder="Enter your email"
									bind:value={formData.email}
									on:input={() => validateForm()}
								/>
								{#if $errors.email}
									<p class="text-sm text-red-500">{$errors.email}</p>
								{/if}
							</div>
							<!-- Password -->
							<div class="col-span-12">
								<label for="passwordInput" class="form-label">Password</label>
								<div class="relative">
									<!-- Static type, visibility controlled with showPassword store -->
									<input
										id="passwordInput"
										type="password"
										bind:value={$formData.password}
										class="form-input ltr:pr-8 rtl:pl-8"
										placeholder="Enter your password"
									/>
									<button
										type="button"
										on:click={toggleShowPassword}
										class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:right-3 rtl:left-3"
									>
										{#if $showPassword}
											<LucideIcon name="Eye" class="size-5" />
										{:else}
											<LucideIcon name="EyeOff" class="size-5" />
										{/if}
									</button>
								</div>
								{#if $errors.password}
									<p class="text-sm text-red-500">{$errors.password}</p>
									<!-- Show error message -->
								{/if}
							</div>
							<!-- Confirm Password -->
							<div class="col-span-12">
								<label for="confirmPasswordInput" class="form-label">Confirm Password</label>
								<div class="relative">
									<!-- Static type, visibility controlled with showConfirmPassword store -->
									<input
										id="confirmPasswordInput"
										type="password"
										bind:value={$formDetails.confirmPassword}
										class="form-input ltr:pr-8 rtl:pl-8"
										placeholder="Enter your confirm password"
									/>
									<button
										type="button"
										on:click={toggleShowConfirmPassword}
										class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:right-3 rtl:left-3"
									>
										{#if $showConfirmPassword}
											<LucideIcon name="Eye" class="size-5" />
										{:else}
											<LucideIcon name="EyeOff" class="size-5" />
										{/if}
									</button>
								</div>
								{#if $errors.confirmPassword}
									<p class="text-sm text-red-500">{$errors.confirmPassword}</p>
									<!-- Show error message -->
								{/if}
							</div>
							<div class="col-span-12">
								<div class="input-check-group grow items-start">
									<input id="checkboxBasic1" class="input-check shrink-0" type="checkbox" />
									<label for="checkboxBasic1" class="input-check-label leading-normal"
										>By creating an account, you agree to all of our terms condition & policies.</label
									>
								</div>
								<p x-show="errors.terms" class="text-sm text-red-500" x-text="errors.terms"></p>
							</div>
							<!-- Submit Button -->
							<div class="col-span-12">
								<button type="submit" class="btn btn-primary w-full">Sign Up</button>
							</div>
						</div>
					</form>

					<div
						class="dark:text-dark-500 dark:before:border-dark-800 relative my-5 text-center text-gray-500 before:absolute before:top-2.5 before:w-full before:border-b before:border-dashed before:border-gray-200 ltr:before:left-0 rtl:before:right-0"
					>
						<p class="dark:bg-dark-900 relative inline-block bg-white px-2">OR</p>
					</div>

					<div class="space-y-2">
						<button
							type="button"
							class="dark:border-dark-800 btn dark:hover:bg-dark-850 hover:text-primary-500 w-full border-gray-200 hover:bg-gray-50"
						>
							<img
								src="/assets/images/others/google.png"
								alt=""
								class="inline-block h-4 ltr:mr-1 rtl:ml-1"
							/> SignUp Via Google
						</button>
						<button
							type="button"
							class="dark:border-dark-800 btn dark:hover:bg-dark-850 hover:text-primary-500 w-full border-gray-200 hover:bg-gray-50"
						>
							<LucideIcon
								name="Facebook"
								class="text-primary-500 inline-block size-4 ltr:mr-1 rtl:ml-1"
							/> SignUp Via Facebook
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
