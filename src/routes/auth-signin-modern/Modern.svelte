<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import { writable } from 'svelte/store';
	import { validateForm, alert } from './validation';

	let showPassword = false;
	let formData = {
		emailOrUsername: 'admin@example.com',
		password: 'admin@123'
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
						<a href="/index"
							><img src="/assets/images/logo-white.png" alt="" class="mx-auto h-8" /></a
						>
					</div>
					<h4 class="mb-2 text-center leading-relaxed text-white">Welcome Back, Sofia!</h4>
					<p class="mb-5 text-center text-white/75">
						Don't have an account? <a href="/auth-signup-modern" class="font-medium text-white"
							>Sign Up</a
						>
					</p>

					<!-- Form with validation and alert -->
					<form on:submit|preventDefault={validateForm}>
						<!-- Alert Section -->
						{#if $alert.isVisible}
							<div
								class="relative rounded-md py-3 text-sm {$alert.type} ltr:pr-7 ltr:pl-5 rtl:pr-5 rtl:pl-7"
							>
								<span>{$alert.message}</span>
								<a
									href="#!"
									on:click={() =>
										alert.set({ isVisible: false, message: '', type: 'bg-red-100 text-red-500' })}
									class="absolute top-2 text-lg transition duration-200 ease-linear ltr:right-5 rtl:left-5"
									aria-label="Close"
								>
									<i class="ri-close-fill"></i>
								</a>
							</div>
						{/if}

						<div class="mt-5 grid grid-cols-12 gap-5">
							<!-- Email or Username Input -->
							<div class="col-span-12">
								<label for="emailOrUsername" class="form-label text-white/75"
									>Email Or Username</label
								>
								<input
									type="text"
									id="emailOrUsername"
									bind:value={formData.emailOrUsername}
									class="form-input border-none bg-white/10 text-white placeholder:text-white/75"
									placeholder="Enter your email or username"
								/>
							</div>

							<!-- Password Input -->
							<Col cols={{ span: 12 }}>
								<div>
									<label for="password" class="mb-2 block text-sm text-white/75">Password</label>
									<div class="relative">
										{#if showPassword}
											<input
												type="text"
												id="password"
												bind:value={formData.password}
												class="form-input border-none bg-white/10 text-white placeholder:text-white/75 ltr:pr-8 rtl:pl-8"
												placeholder="Enter your password"
											/>
										{:else}
											<input
												type="password"
												id="password"
												bind:value={formData.password}
												class="form-input border-none bg-white/10 text-white placeholder:text-white/75 ltr:pr-8 rtl:pl-8"
												placeholder="Enter your password"
											/>
										{/if}
										<button
											type="button"
											on:click={() => (showPassword = !showPassword)}
											class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:right-3 rtl:left-3"
										>
											{#if showPassword}
												<LucideIcon name="Eye" class="dark:text-dark-500 size-5 text-gray-500" />
											{:else}
												<LucideIcon name="EyeOff" class="dark:text-dark-500 size-5 text-gray-500" />
											{/if}
										</button>
									</div>
								</div>
							</Col>

							<!-- Remember Me Checkbox and Forgot Password Link -->
							<div class="col-span-12">
								<div class="flex items-center">
									<div class="input-check-group grow">
										<input
											id="checkboxBasic1"
											class="input-check input-check-primary border-0 bg-white/10"
											type="checkbox"
										/>
										<label for="checkboxBasic1" class="input-check-label text-white/75"
											>Remember me</label
										>
									</div>
									<a
										href="/auth-forgot-password-modern"
										class="block shrink-0 text-sm font-medium text-white/75 underline transition duration-300 ease-linear hover:text-white ltr:text-right rtl:text-left"
										>Forgot Password?</a
									>
								</div>
							</div>

							<!-- Submit Button -->
							<div class="col-span-12">
								<button type="submit" class="btn btn-primary w-full">Sign In</button>
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
						>
							<img
								src="/assets/images/others/google.png"
								alt=""
								class="inline-block h-4 ltr:mr-1 rtl:ml-1"
							/> SignIn Via Google
						</button>
						<button
							type="button"
							class="btn w-full border-white/10 text-white/75 hover:bg-white/10 hover:text-white"
						>
							<LucideIcon
								name="Facebook"
								class="text-primary-500 inline-block size-4 ltr:mr-1 rtl:ml-1"
							></LucideIcon> SignIn Via Facebook
						</button>
					</div>

					<div class="mt-5 flex items-center gap-3">
						<div class="grow">
							<h6 class="mb-1 text-white">Admin</h6>
							<p class="text-white/75">Email: admin@domiex.com</p>
							<p class="text-white/75">Password: admin@123</p>
						</div>
						<button
							class="btn btn-sub-gray shrink-0"
							on:click={() =>
								(formData = { emailOrUsername: 'admin@domiex.com', password: 'admin@123' })}
							>Login</button
						>
					</div>

					<div class="mt-3 flex items-center gap-3">
						<div class="grow">
							<h6 class="mb-1 text-white">Users</h6>
							<p class="text-white/75">Email: user@domiex.com</p>
							<p class="text-white/75">Password: user@123</p>
						</div>
						<button class="btn btn-sub-gray shrink-0">Login</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
