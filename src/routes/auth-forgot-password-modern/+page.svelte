<script>
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
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
					<h4 class="mb-2 text-center leading-relaxed text-white">Forgot your Password?</h4>
					<p class="mb-5 text-center text-white/75">Enter your email or username to reset it.</p>

					<form action="/auth-two-step-verification-modern">
						<div class="mt-5 grid grid-cols-12 gap-4">
							<div class="col-span-12">
								<label for="emailInput" class="form-label text-white/75">Email or Username</label>
								<input
									type="text"
									id="emailInput"
									class="form-input border-none bg-white/10 text-white placeholder:text-white/75"
									placeholder="Enter your email or username"
									required
								/>
							</div>
							<div class="col-span-12">
								<button
									type="submit"
									class="bg-primary-500 hover:bg-primary-600 w-full rounded-md px-4 py-2 text-white"
									>Reset Password</button
								>
								<p class="mt-3 text-center text-white/75">
									Return to the <a
										href="/auth-signin-modern"
										class="link font-medium !text-white/75 hover:text-white"
										><span class="align-middle">Sign In</span>
										<LucideIcon name="MoveRight" class="inline-block size-4 ltr:ml-1 rtl:mr-1" /></a
									>
								</p>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
