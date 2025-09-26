<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { validateForm, alert } from '../auth-signin-modern/validation';
	import { getContext } from 'svelte';
	import { auth } from '$lib/firebase/firebase.js';
	import { signInWithEmailAndPassword } from "firebase/auth";
	import { getUser } from "$lib/api/user.api";
	import { goto } from '$app/navigation';

	let formData = $state({
		email: '',
		password: ''
	});

	const { user, setToken, setUser } = getContext("user");

	const signIn = async () => {
		signInWithEmailAndPassword(auth, formData.email, formData.password)
			.then(async (userCredential) => {
				// Signed in
				const firebaseUser = userCredential.user;
				const accessToken = await firebaseUser.getIdToken();
				const uid = firebaseUser.uid;
				setToken(accessToken)
				const retrievedUser: WebUser = await getUser(uid, accessToken);
				setUser(retrievedUser)
				//console.log("user is " + user);

				goto('/index');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};

	let showPassword = false;
</script>

<div
	class="relative flex min-h-screen items-center justify-center from-sky-100 via-green-50 to-pink-50 py-12 ltr:bg-gradient-to-l rtl:bg-gradient-to-r dark:from-sky-500/15 dark:via-green-500/10 dark:to-pink-500/10"
>
	<div class="container">
		<Grid cols={12}>
			<Col
				cols={{ span: 12 }}
				md={{ span: 10 }}
				lg={{ span: 6 }}
				xl={{ span: 4 }}
				class="card  mb-0 md:col-start-2 lg:col-start-4 xl:col-start-5"
			>
				<div class="card-body md:p-10">
					<div class="mb-5 text-center">
						<a href="/index">
							<img src="/assets/images/main-logo.png" alt="" class="mx-auto h-8 dark:hidden" />
							<img
								src="/assets/images/logo-white.png"
								alt=""
								class="mx-auto hidden h-8 dark:inline-block"
							/>
						</a>
					</div>
					<h4
						class="from-primary-500 vie-purple-500 mb-2 to-pink-500 bg-clip-text text-center leading-relaxed font-bold text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l"
					>
						Welcome Back, Sofia!
					</h4>
					<p class="dark:text-dark-500 mb-5 text-center text-gray-500">
						Don't have an account? <a
							href="/auth-signup-basic"
							class="link link-primary font-medium">Sign Up</a
						>
					</p>

					<!-- Form -->
					<form on:submit|preventDefault={signIn}>
						{#if $alert.isVisible}
							<div
								class="relative rounded-md py-3 text-sm ltr:pr-7 ltr:pl-5 rtl:pr-5 rtl:pl-7 {$alert.type}"
							>
								<span>{$alert.message}</span>
								<a
									href="#!"
									on:click={() => alert.set({ ...$alert, isVisible: false })}
									class="absolute top-2 text-lg transition duration-200 ease-linear ltr:right-5 rtl:left-5"
									aria-label="Close"
								>
									<i class="ri-close-fill"></i>
								</a>
							</div>
						{/if}
						<Grid cols={12} gap={5} class="mt-5">
							<!-- Email or Username -->
							<Col cols={{ span: 12 }}>
								<label for="emailOrUsername" class="form-label">Email Or Username</label>
								<input
									type="text"
									id="emailOrUsername"
									bind:value={formData.email}
									class="form-input w-full"
									placeholder="Enter your email or username"
								/>
							</Col>

							<!-- Password -->
							<Col cols={{ span: 12 }}>
								<div>
									<label for="password" class="mb-2 block text-sm">Password</label>
									<div class="relative">
										{#if showPassword}
											<input
												type="text"
												id="password"
												bind:value={formData.password}
												class="form-input w-full ltr:pr-8 rtl:pl-8"
												placeholder="Enter your password"
											/>
										{:else}
											<input
												type="password"
												id="password"
												bind:value={formData.password}
												class="form-input w-full ltr:pr-8 rtl:pl-8"
												placeholder="Enter your password"
											/>
										{/if}
										<button
											type="button"
											on:click={() => (showPassword = !showPassword)}
											class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:right-3 rtl:left-3"
										>
											{#if showPassword}
												<LucideIcon name="Eye" class="dark:text-dark-500 text-gray-500" />
											{:else}
												<LucideIcon name="EyeOff" class="dark:text-dark-500 text-gray-500" />
											{/if}
										</button>
									</div>
								</div>
							</Col>

							<!-- Remember Me & Forgot Password -->
							<Col cols={{ span: 12 }}>
								<div class="flex items-center">
									<div class="input-check-group grow">
										<input
											id="checkboxBasic1"
											class="input-check input-check-primary"
											type="checkbox"
										/>
										<label for="checkboxBasic1" class="input-check-label">Remember me</label>
									</div>
									<a
										href="/auth-forgot-password-basic"
										class="text-primary-500 hover:text-primary-600 block shrink-0 text-sm font-medium underline transition duration-300 ease-linear ltr:text-right rtl:text-left"
									>
										Forgot Password?
									</a>
								</div>
							</Col>

							<!-- Submit Button -->
							<Col cols={{ span: 12 }}>
								<button type="submit" class="btn btn-primary w-full">Sign In</button>
							</Col>
						</Grid>
					</form>

					<div
						class="dark:text-dark-500 dark:before:border-dark-800 relative my-5 text-center text-gray-500 before:absolute before:top-2.5 before:w-full before:border-b before:border-dashed before:border-gray-200 ltr:before:left-0 rtl:before:right-0"
					>
						<p class="dark:bg-dark-900 relative inline-block bg-white px-2">OR</p>
					</div>

					<!-- Social Login Buttons -->
					<div class="space-y-2">
						<button
							type="button"
							class="btn dark:border-dark-800 dark:hover:bg-dark-850 hover:text-primary-500 w-full border-gray-200 hover:bg-gray-50"
						>
							<img
								src="/assets/images/others/google.png"
								alt=""
								class="inline-block h-4 ltr:mr-1 rtl:ml-1"
							/> SignIn Via Google
						</button>
						<button
							type="button"
							class="btn dark:border-dark-800 dark:hover:bg-dark-850 hover:text-primary-500 w-full border-gray-200 hover:bg-gray-50"
						>
							<LucideIcon
								name="Facebook"
								class="text-primary-500 inline-block size-4 ltr:mr-1 rtl:ml-1"
							/> SignIn Via Facebook
						</button>
					</div>

					<!-- Admin Login Details -->
					<div class="mt-5 flex items-center gap-3">
						<div class="grow">
							<h6 class="mb-1">Admin</h6>
							<p class="dark:text-dark-500 text-gray-500">Email: admin@example.com</p>
							<p class="dark:text-dark-500 text-gray-500">Password: admin@123</p>
						</div>
						<button class="btn btn-sub-gray shrink-0">Login</button>
					</div>

					<!-- User Login Details -->
					<div class="mt-3 flex items-center gap-3">
						<div class="grow">
							<h6 class="mb-1">Users</h6>
							<p class="dark:text-dark-500 text-gray-500">Email: user@example.com</p>
							<p class="dark:text-dark-500 text-gray-500">Password: user@123</p>
						</div>
						<button class="btn btn-sub-gray shrink-0">Login</button>
					</div>
				</div>
			</Col>
		</Grid>
	</div>
</div>
