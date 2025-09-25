<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import { passwordForm } from '../auth-reset-password-basic/password';

	// Initialize form data with logic from passwordForm
	let formData = passwordForm();

	// Flags for toggling password visibility
	let showPassword = false;
	let showConfirmPassword = false;

	// Flag for form submission state
	let isSubmitting = false;

	// Function to handle form submission
	const handleSubmit = () => {
		isSubmitting = true;
		formData.validateForm();
		isSubmitting = false;
	};
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
					<h4 class="mb-2 text-center leading-relaxed text-white">Set your new password</h4>
					<p class="mb-5 text-center text-white/75">
						Ensure that your new password is different from any passwords you've previously used.
					</p>
					<form on:submit|preventDefault={handleSubmit}>
						<div class="mt-5 grid grid-cols-12 gap-4">
							<!-- Password Input Field -->
							<div class="col-span-12">
								<label for="passwordInput" class="form-label text-white/75">Password</label>
								<div class="relative">
									{#if showPassword && !isSubmitting}
										<input
											type="text"
											id="passwordInput"
											bind:value={formData.password}
											class="form-input border-none bg-white/10 text-white placeholder:text-white/75 ltr:pr-8 rtl:pl-8"
											placeholder="Enter your password"
										/>
									{:else}
										<input
											type="password"
											id="passwordInput"
											bind:value={formData.password}
											class="form-input border-none bg-white/10 text-white placeholder:text-white/75 ltr:pr-8 rtl:pl-8"
											placeholder="Enter your password"
										/>
									{/if}
									<button
										type="button"
										on:click={() => (showPassword = !showPassword)}
										class="absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:right-3 rtl:left-3"
										disabled={isSubmitting}
									>
										{#if showPassword}
											<LucideIcon name="Eye" class="size-5" />
										{:else}
											<LucideIcon name="EyeOff" class="size-5" />
										{/if}
									</button>
								</div>
								{#if formData.errors.password}
									<p class="text-sm text-red-500">{formData.errors.password}</p>
								{/if}
							</div>

							<!-- Confirm Password Input Field -->
							<div class="col-span-12">
								<label for="confirmPasswordInput" class="form-label text-white/75"
									>Confirm Password</label
								>
								<div class="relative">
									{#if showConfirmPassword && !isSubmitting}
										<input
											type="text"
											id="confirmPasswordInput"
											bind:value={formData.confirmPassword}
											class="form-input border-none bg-white/10 text-white placeholder:text-white/75 ltr:pr-8 rtl:pl-8"
											placeholder="Enter your confirm password"
										/>
									{:else}
										<input
											type="password"
											id="confirmPasswordInput"
											bind:value={formData.confirmPassword}
											class="form-input border-none bg-white/10 text-white placeholder:text-white/75 ltr:pr-8 rtl:pl-8"
											placeholder="Enter your confirm password"
										/>
									{/if}
									<button
										type="button"
										on:click={() => (showConfirmPassword = !showConfirmPassword)}
										class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:right-3 rtl:left-3"
										disabled={isSubmitting}
									>
										{#if showConfirmPassword}
											<LucideIcon name="Eye" class="size-5" />
										{:else}
											<LucideIcon name="EyeOff" class="size-5" />
										{/if}
									</button>
								</div>
								{#if formData.errors.confirmPassword}
									<p class="text-sm text-red-500">{formData.errors.confirmPassword}</p>
								{/if}
							</div>

							<!-- Submit Button -->
							<div class="col-span-12">
								<button
									type="submit"
									class="bg-primary-500 hover:bg-primary-600 w-full rounded-md px-4 py-2 text-white"
									disabled={isSubmitting}>Set Password</button
								>
								<p class="mt-3 text-center text-white/75">
									Return to the
									<a
										href="/auth-signin-basic"
										class="link font-medium !text-white/75 underline hover:text-white"
									>
										<span class="align-middle">Sign In</span>
										<LucideIcon name="MoveRight" class="ml-1 inline-block size-4" />
									</a>
								</p>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
