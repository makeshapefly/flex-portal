<script lang="ts">
	import { writable } from 'svelte/store'; // Import writable store
	import { formDetails, errors, validateForm } from '../auth-signup-basic/signup'; // Import the form, errors, and validation function
	import LucideIcon from '$lib/components/common/LucideIcon.svelte'; // Import the icon component

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
</script>

<div
	class="relative flex min-h-screen items-center justify-center bg-[url('../images/others/auth.jpg')] bg-cover bg-center py-12"
>
	<div class="absolute inset-0 bg-gray-950/50"></div>
	<div class="relative container">
		<div class="grid grid-cols-12">
			<div
				class="card col-span-12 mb-0 border-none bg-white/10 shadow-none backdrop-blur-md md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-4 xl:col-span-4 xl:col-start-5"
			>
				<div class="card-body md:p-10">
					<div class="mb-5 text-center">
						<a href="#!"><img src="assets/images/logo-white.png" alt="" class="mx-auto h-8" /></a>
					</div>
					<h4 class="mb-2 text-center leading-relaxed text-white">Create a New Account</h4>
					<p class="mb-5 text-center text-white/75">
						Already have an account? <a href="/auth-signin-modern" class="font-medium text-white"
							>Sign In</a
						>
					</p>
					<form on:submit|preventDefault={validateForm}>
						<div class="mt-5 grid grid-cols-12 gap-4">
							<div class="col-span-12 md:col-span-6">
								<label for="firstNameInput" class="form-label text-white/75">First Name</label>
								<input
									type="text"
									id="firstNameInput"
									class="form-input border-none bg-white/10 text-white placeholder:text-white/75"
									placeholder="Enter your first name"
									bind:value={$formDetails.firstName}
									on:input={() => validateForm()}
								/>
								{#if $errors.firstName}
									<p class="text-sm text-red-500">{$errors.firstName}</p>
								{/if}
							</div>
							<div class="col-span-12 md:col-span-6">
								<label for="lastNameInput" class="form-label text-white/75">Last Name</label>
								<input
									type="text"
									id="lastNameInput"
									class="form-input border-none bg-white/10 text-white placeholder:text-white/75"
									placeholder="Enter your last name"
									bind:value={$formDetails.lastName}
									on:input={() => validateForm()}
								/>
								{#if $errors.lastName}
									<p class="text-sm text-red-500">{$errors.lastName}</p>
								{/if}
							</div>
							<div class="col-span-12 md:col-span-6">
								<label for="userNameInput" class="form-label text-white/75">Username</label>
								<input
									type="text"
									id="userNameInput"
									class="form-input border-none bg-white/10 text-white placeholder:text-white/75"
									placeholder="Enter your username"
									bind:value={$formDetails.userName}
									on:input={() => validateForm()}
								/>
								{#if $errors.userName}
									<p class="text-sm text-red-500">{$errors.userName}</p>
								{/if}
							</div>
							<div class="col-span-12 md:col-span-6">
								<label for="emailInput" class="form-label text-white/75">Email</label>
								<input
									type="email"
									id="emailInput"
									class="form-input border-none bg-white/10 text-white placeholder:text-white/75"
									placeholder="Enter your email"
									bind:value={$formDetails.email}
									on:input={() => validateForm()}
								/>
								{#if $errors.email}
									<p class="text-sm text-red-500">{$errors.email}</p>
								{/if}
							</div>
							<!-- Password -->
							<div class="col-span-12">
								<label for="passwordInput" class="form-label text-white/75">Password</label>
								<div class="relative">
									<!-- Static type, visibility controlled with showPassword store -->
									<input
										id="passwordInput"
										type="password"
										bind:value={$formDetails.password}
										class="form-input border-none bg-white/10 text-white placeholder:text-white/75 ltr:pr-8 rtl:pl-8"
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
								<label for="confirmPasswordInput" class="form-label text-white/75"
									>Confirm Password</label
								>
								<div class="relative">
									<!-- Static type, visibility controlled with showConfirmPassword store -->
									<input
										id="confirmPasswordInput"
										type="password"
										bind:value={$formDetails.confirmPassword}
										class="form-input border-none bg-white/10 text-white placeholder:text-white/75 ltr:pr-8 rtl:pl-8"
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
									<input
										id="checkboxBasic1"
										class="input-check shrink-0 border-0 bg-white/10"
										type="checkbox"
										bind:checked={$formDetails.terms}
									/>
									<label for="checkboxBasic1" class="input-check-label text-white/75"
										>By creating an account, you agree to all of our terms condition & policies.</label
									>
								</div>
								{#if $errors.terms}
									<p class="text-sm text-red-500">{$errors.terms}</p>
								{/if}
							</div>
							<!-- Submit Button -->
							<div class="col-span-12">
								<button type="submit" class="btn btn-primary w-full">Sign Up</button>
							</div>
						</div>
					</form>

					<div class="relative my-5 text-center text-white/75">
						<p>OR</p>
					</div>

					<div class="space-y-2">
						<button
							type="button"
							class="btn w-full border-white/10 text-white/75 hover:bg-white/10 hover:text-white"
							><img
								src="assets/images/others/google.png"
								alt=""
								class="inline-block h-4 ltr:mr-1 rtl:ml-1"
							/> SignIn Vie Google</button
						>
						<button
							type="button"
							class="btn w-full border-white/10 text-white/75 hover:bg-white/10 hover:text-white"
							><LucideIcon
								name="Facebook"
								class="text-primary-500 inline-block size-4 ltr:mr-1 rtl:ml-1"
							/> SignIn Vie Facebook</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
